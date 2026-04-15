const config = require("../../config");
const { createAgentError } = require("../utils/errors");
const logger = require("../utils/logger");
const { waitForHybridCompletion } = require("../utils/completion");
const {
  buildFullPromptText,
  clearInput,
  findEditableInput,
  getPromptLines,
  injectPrompt,
  normalizeInputText,
  pasteText,
  readInputText,
  waitForInputEmpty,
} = require("../utils/prompt");
const { sleep } = require("../utils/time");

const chatgptConfig = config.chatgpt;
const { completion } = config;
// F07: Merge per-adapter injection overrides over shared base.
const injection = { ...config.injection, ...(chatgptConfig.injection || {}) };
const diagnostics = config.diagnostics || {};
let lastPromptText = "";
const sendButtonSelectors = [
  'button[data-testid="send-button"]',
  'button[aria-label="Send prompt"]',
  'button[aria-label="Send message"]',
];
const promptInjectionOptions = {
  promptMode: "insert",
  summaryMode: "insert",
};
const promptMetaPrefixes = [
  "[Session]:",
  "[Round]:",
  "[Previous Summary]:",
  "[New Prompt]:",
];

function isPromptScaffoldLine(text) {
  if (!text) {
    return false;
  }

  const normalized = text.trim();
  const promptLines = getPromptLines(lastPromptText);

  return (
    normalized === "(empty)" ||
    promptLines.includes(normalized) ||
    promptMetaPrefixes.some((prefix) => normalized.startsWith(prefix))
  );
}

async function findInputLocator(page) {
  return findEditableInput(page, chatgptConfig.inputSelectors);
}

function isIgnoredReplyText(text) {
  return (
    !text ||
    text === lastPromptText ||
    isPromptScaffoldLine(text) ||
    text === "You said:" ||
    text === "ChatGPT said:" ||
    text === "ChatGPT said" ||
    text.startsWith("Thought for ") ||
    text.includes("ChatGPT can make mistakes") ||
    text.includes("Check important info") ||
    text.includes("Temporary Chat") ||
    text.includes("Upgrade plan") ||
    text.includes("Search chats") ||
    text.includes("Library") ||
    text.includes("Sora") ||
    text.includes("Explore GPTs") ||
    text.includes("New chat")
  );
}

function extractReplyFromLines(lines) {
  return lines
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !isIgnoredReplyText(line) && !line.startsWith("Thinking"))
    .join("\n")
    .trim();
}

function extractReplyFromFallbackLines(lines) {
  const seenLongLines = new Set();

  return extractReplyFromLines(
    lines.filter((line) => {
      const normalized = String(line || "").trim();

      if (!normalized) {
        return false;
      }

      if (normalized.length <= 4) {
        return true;
      }

      if (seenLongLines.has(normalized)) {
        return false;
      }

      seenLongLines.add(normalized);
      return true;
    })
  );
}

async function readReplyAfterPrompt(page) {
  return page.evaluate(({ promptText, promptLines, metaPrefixes }) => {
    const isVisible = (element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        rect.width > 0 &&
        rect.height > 0
      );
    };

    const isRelevant = (element) =>
      !element.closest(
        'nav, aside, [role="navigation"], [role="complementary"], [data-testid*="sidebar"], [data-testid*="history"], [class*="sidebar"], [class*="history"]'
      );

    const shouldIgnore = (text) =>
      !text ||
      text === promptText ||
      text === "(empty)" ||
      promptLines.includes(text) ||
      metaPrefixes.some((prefix) => text.startsWith(prefix)) ||
      text === "You said:" ||
      text === "ChatGPT said:" ||
      text === "ChatGPT said" ||
      text.startsWith("Thought for ") ||
      text.includes("ChatGPT can make mistakes") ||
      text.includes("Check important info") ||
      text.includes("Temporary Chat") ||
      text.includes("Upgrade plan") ||
      text.includes("Search chats") ||
      text.includes("Library") ||
      text.includes("Sora") ||
      text.includes("Explore GPTs") ||
      text.includes("New chat");

    const main = document.querySelector("main") || document.body;
    const elements = Array.from(main.querySelectorAll("*")).filter(
      (element) => isVisible(element) && isRelevant(element)
    );
    const promptCandidates = elements
      .map((element) => ({
        element,
        text: (element.innerText || "").trim(),
      }))
      .filter(({ text }) => text === promptText || text.includes(promptText));

    const exactPrompt =
      promptCandidates
        .filter(({ text }) => text === promptText)
        .sort((a, b) => a.text.length - b.text.length)[0] || null;

    const partialPrompt =
      promptCandidates.sort((a, b) => a.text.length - b.text.length)[0] || null;

    const promptElement = exactPrompt?.element || partialPrompt?.element;
    if (!promptElement) {
      return [];
    }

    const walker = document.createTreeWalker(main, NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        return isVisible(node) && isRelevant(node)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });

    const lines = [];
    let foundPrompt = false;

    while (walker.nextNode()) {
      const element = walker.currentNode;

      if (!foundPrompt) {
        if (element === promptElement) {
          foundPrompt = true;
        }
        continue;
      }

      const text = (element.innerText || "").trim();
      if (shouldIgnore(text) || text.startsWith("Thinking")) {
        continue;
      }

      const parts = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .filter((line) => !shouldIgnore(line) && !line.startsWith("Thinking"));

      if (parts.length) {
        lines.push(...parts);
      }

      if (lines.length && /[.!?\u3002\uff01\uff1f]$/.test(lines[lines.length - 1])) {
        break;
      }
    }

    return lines;
  }, {
    promptText: lastPromptText,
    promptLines: getPromptLines(lastPromptText),
    metaPrefixes: promptMetaPrefixes,
  });
}

async function readTextFromSelectors(page) {
  for (const selector of chatgptConfig.replySelectors) {
    const locator = page.locator(selector);
    const count = await locator.count().catch(() => 0);

    if (!count) {
      continue;
    }

    for (let index = count - 1; index >= 0; index -= 1) {
      const candidate = locator.nth(index);
      const text = await candidate.innerText({ timeout: 1500 }).catch(() => "");
      const extracted = extractReplyFromLines(text.split("\n"));

      if (extracted) {
        return extracted;
      }
    }
  }

  return "";
}

async function readLastReplyFromSelectors(page) {
  const combined = await page.evaluate(() => {
    const allMessages = Array.from(
      document.querySelectorAll("[data-message-author-role]")
    );

    if (!allMessages.length) return { count: 0, texts: [] };

    const lastGroupTexts = [];
    for (let i = allMessages.length - 1; i >= 0; i -= 1) {
      if (allMessages[i].getAttribute("data-message-author-role") === "assistant") {
        lastGroupTexts.unshift((allMessages[i].innerText || "").trim());
      } else {
        break;
      }
    }

    return {
      count: allMessages.filter(
        (el) => el.getAttribute("data-message-author-role") === "assistant"
      ).length,
      texts: lastGroupTexts,
    };
  }).catch(() => ({ count: 0, texts: [] }));

  if (!combined.texts.length) {
    return { count: 0, text: "" };
  }

  const joined = combined.texts.join("\n\n");
  const extracted = extractReplyFromLines(joined.split("\n"));

  if (extracted) {
    return { count: combined.count, text: extracted };
  }

  return { count: 0, text: "" };
}

async function readTextFromMain(page) {
  return page.evaluate(({ promptText, promptLines, metaPrefixes }) => {
    const main = document.querySelector("main") || document.body;
    return (main.innerText || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => line !== promptText)
      .filter((line) => line !== "(empty)")
      .filter((line) => line !== "You said:")
      .filter((line) => !promptLines.includes(line))
      .filter((line) => !metaPrefixes.some((prefix) => line.startsWith(prefix)));
  }, {
    promptText: lastPromptText,
    promptLines: getPromptLines(lastPromptText),
    metaPrefixes: promptMetaPrefixes,
  });
}

async function readReplyState(page) {
  const selectorState = await readLastReplyFromSelectors(page);

  if (selectorState.text) {
    return selectorState;
  }

  const replyAfterPrompt = extractReplyFromFallbackLines(await readReplyAfterPrompt(page));
  if (replyAfterPrompt) {
    return {
      count: Math.max(1, selectorState.count),
      text: replyAfterPrompt,
    };
  }

  const selectorText = await readTextFromSelectors(page);
  if (selectorText) {
    return {
      count: Math.max(1, selectorState.count),
      text: selectorText,
    };
  }

  return selectorState;
}

async function hasBusyUi(page) {
  for (const selector of chatgptConfig.completionDetection?.busySelectors || []) {
    const visible = await page
      .locator(selector)
      .first()
      .isVisible()
      .catch(() => false);

    if (visible) {
      return true;
    }
  }

  return false;
}

async function hasBusyText(page) {
  const patterns = (chatgptConfig.completionDetection?.busyTextPatterns || [])
    .map((pattern) => String(pattern || "").trim().toLowerCase())
    .filter(Boolean);

  if (!patterns.length) {
    return false;
  }

  return page.evaluate((candidatePatterns) => {
    const isVisible = (element) => {
      if (!(element instanceof HTMLElement)) {
        return false;
      }

      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        rect.width > 0 &&
        rect.height > 0
      );
    };

    const matchesBusyText = (text, pattern) =>
      text === pattern ||
      text.startsWith(`${pattern} `) ||
      text.startsWith(`${pattern}:`);

    const root = document.querySelector("main") || document.body;
    const candidates = Array.from(
      root.querySelectorAll(
        'button, [role="button"], [role="status"], [aria-live], [aria-busy="true"], summary, details, div, span'
      )
    );

    for (const element of candidates) {
      if (!isVisible(element)) {
        continue;
      }

      const text = (element.innerText || "").trim().replace(/\s+/g, " ").toLowerCase();
      if (!text || text.length > 120) {
        continue;
      }

      if (candidatePatterns.some((pattern) => matchesBusyText(text, pattern))) {
        return true;
      }
    }

    return false;
  }, patterns).catch(() => false);
}

async function hasBusySignal(page) {
  if (await hasBusyUi(page)) {
    return true;
  }

  return hasBusyText(page);
}

async function waitForPostTimeoutStability(page) {
  const detectionConfig = chatgptConfig.completionDetection || {};
  const graceMs = detectionConfig.postTimeoutGraceMs || 20000;
  const stabilityMs =
    detectionConfig.postTimeoutStabilityMs ||
    detectionConfig.stabilityWindowMs ||
    completion.stabilityWindowMs;

  let lastObservedText = "";
  let stableForMs = 0;
  const startedAt = Date.now();

  while (Date.now() - startedAt < graceMs) {
    await sleep(completion.pollIntervalMs);

    const current = await readReplyState(page);
    const busy = await hasBusySignal(page);

    if (!current.text) {
      stableForMs = 0;
      continue;
    }

    if (current.text === lastObservedText) {
      stableForMs += completion.pollIntervalMs;
    } else {
      lastObservedText = current.text;
      stableForMs = 0;
    }

    if (stableForMs >= stabilityMs && !busy) {
      return { completed: true, reason: "post_timeout_stable" };
    }
  }

  return { completed: false, reason: "timeout" };
}

async function open(page) {
  logger.stage("chatgpt", "open", "Navigating to ChatGPT.");
  await page.goto(chatgptConfig.url, {
    waitUntil: "domcontentloaded",
    timeout: chatgptConfig.navigationTimeoutMs,
  });

  const verificationDeadline = Date.now() + chatgptConfig.navigationTimeoutMs;

  while (Date.now() < verificationDeadline) {
    const ready = await isReady(page);
    if (ready) {
      break;
    }

    const bodyText = await page.locator("body").innerText().catch(() => "");
    if (bodyText.includes(chatgptConfig.verificationText)) {
      logger.info("ChatGPT is showing verification. Waiting for it to clear.");
      await sleep(2000);
      continue;
    }

    await sleep(1000);
  }

  if (!(await isReady(page))) {
    await page.goto(chatgptConfig.conversationUrl, {
      waitUntil: "domcontentloaded",
      timeout: chatgptConfig.navigationTimeoutMs,
    });
  }

  const deadline = Date.now() + chatgptConfig.navigationTimeoutMs;
  while (Date.now() < deadline) {
    const inputMatch = await findInputLocator(page);
    if (inputMatch) {
      return;
    }

    await sleep(500);
  }

  throw createAgentError("selector_not_found", "ChatGPT input selector not found.", {
    selector: chatgptConfig.inputSelectors.join(", "),
    stage: "open",
  });
}

async function isReady(page) {
  try {
    return Boolean(await findInputLocator(page));
  } catch {
    return false;
  }
}

async function isChatgptBusy(page) {
  const busySelectors = chatgptConfig.completionDetection?.busySelectors || [];

  for (const selector of busySelectors) {
    const busy = await page.locator(selector).first().isVisible().catch(() => false);
    if (busy) {
      return true;
    }
  }

  return false;
}

// [DIAG] Checks whether the site has visually started generating after submit.
// Returns a short string token — NOT a boolean — so log lines are readable at a glance.
// Used for instrumentation only; does not affect any control flow.
async function checkSiteGenerationSignal(page) {
  try {
    return await page.evaluate(() => {
      const stopBtn = document.querySelector('button[aria-label="Stop generating"]');
      const assistantTurn = document.querySelector('[data-message-author-role="assistant"]');
      if (stopBtn && stopBtn.offsetParent !== null) return "stop_button_visible";
      if (assistantTurn) return "assistant_turn_present";
      return "none";
    });
  } catch {
    return "unknown";
  }
}

async function waitForSubmissionStart(page, inputLocator, timeoutMs) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const currentInput = await readInputText(inputLocator);

    if (!currentInput.trim()) {
      return true;
    }

    await sleep(100);
  }

  return false;
}

async function waitForInjectedPrompt(page, inputLocator, expectedText) {
  const normalizedExpected = normalizeInputText(expectedText);
  const deadline = Date.now() + injection.inputSettleTimeoutMs;
  let observedInput = "";
  let sawContent = false;

  while (Date.now() < deadline) {
    observedInput = await readInputText(inputLocator);
    const normalizedObserved = normalizeInputText(observedInput);

    if (normalizedObserved) {
      sawContent = true;

      if (normalizedObserved === normalizedExpected) {
        return { ready: true, submitted: false, observedInput };
      }
    } else if (sawContent) {
      // Brief re-check before concluding submitted — Mac Cmd+V paste causes a transient
      // DOM-empty (~100-200ms) after keyboard.press returns while the browser is still
      // processing the clipboard event. Re-polling after 150ms distinguishes a real
      // submission (stays empty) from a paste settle (content reappears).
      await sleep(150);
      observedInput = await readInputText(inputLocator);
      if (!normalizeInputText(observedInput)) {
        return { ready: false, submitted: true, observedInput };
      }
      // Content reappeared — was a transient paste state; continue polling.
    }

    await sleep(100);
  }

  return { ready: false, submitted: false, observedInput };
}

async function waitForMessageSubmission(page, inputLocator) {
  if (await waitForSubmissionStart(page, inputLocator, 500)) {
    const siteSignal = await checkSiteGenerationSignal(page);
    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] submit=already_cleared | inputEmpty=true | siteSignal=${siteSignal}`
    );
    return;
  }

  if (injection.submitWithEnter) {
    logger.info(`[DIAG][chatgpt][waitForMessageSubmission] attempting Enter key`);
    await inputLocator.click().catch(() => null);
    await page.keyboard.press("Enter");
    if (
      await waitForSubmissionStart(
        page,
        inputLocator,
        Math.max(injection.sendSettledTimeoutMs, 5000)
      )
    ) {
      const siteSignal = await checkSiteGenerationSignal(page);
      logger.info(
        `[DIAG][chatgpt][waitForMessageSubmission] submit=Enter | inputEmpty=true | siteSignal=${siteSignal}`
      );
      return;
    }
    logger.info(`[DIAG][chatgpt][waitForMessageSubmission] Enter key did not clear input`);
  }

  for (const selector of sendButtonSelectors) {
    const sendButton = page.locator(selector).first();
    const sendButtonReady = await sendButton
      .isVisible()
      .then((visible) => visible && sendButton.isEnabled())
      .catch(() => false);

    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] trying selector="${selector}" | sendButtonReady=${sendButtonReady}`
    );

    if (!sendButtonReady) {
      continue;
    }

    await sendButton.click();

    if (
      await waitForSubmissionStart(
        page,
        inputLocator,
        Math.max(injection.sendSettledTimeoutMs, 5000)
      )
    ) {
      const siteSignal = await checkSiteGenerationSignal(page);
      logger.info(
        `[DIAG][chatgpt][waitForMessageSubmission] submit=sendButton selector="${selector}" | inputEmpty=true | siteSignal=${siteSignal}`
      );
      return;
    }
    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] sendButton click did not clear input | selector="${selector}"`
    );
  }

  if (await waitForSubmissionStart(page, inputLocator, 1200)) {
    const siteSignal = await checkSiteGenerationSignal(page);
    logger.info(
      `[DIAG][chatgpt][waitForMessageSubmission] submit=late_clear | inputEmpty=true | siteSignal=${siteSignal}`
    );
    return;
  }

  const observedInput = await readInputText(inputLocator);
  logger.warn(
    `[DIAG][chatgpt][waitForMessageSubmission] ALL_PATHS_FAILED | inputEmpty=false | observedInput="${observedInput.slice(0, 120)}"`
  );
  throw createAgentError(
    "message_not_submitted",
    "ChatGPT prompt remained in the input box after submit.",
    {
      stage: "inject",
      observedInput: observedInput.slice(0, 240),
    }
  );
}

async function sendMessage(page, text) {
  const normalizedText =
    typeof text === "string" ? text : text.fullText || text.promptBlock || "";
  const expectedText = buildFullPromptText(text);
  lastPromptText = normalizedText.trim();
  const promptLengthClass =
    (expectedText || "").length >= (injection.longPromptThresholdChars || 320) ? "long" : "short";
  logger.info(
    `[DIAG][chatgpt][sendMessage] start | platform=${process.platform} | len=${(expectedText || "").length} | class=${promptLengthClass} | forceFullPaste=${!!diagnostics.forceFullPaste}`
  );
  const deadline = Date.now() + chatgptConfig.inputReadyTimeoutMs;
  let inputMatch = null;

  while (Date.now() < deadline) {
    inputMatch = await findInputLocator(page);
    if (inputMatch) {
      break;
    }

    await sleep(500);
  }

  if (!inputMatch) {
    throw createAgentError("selector_not_found", "ChatGPT input selector not found.", {
      selector: chatgptConfig.inputSelectors.join(", "),
      stage: "inject",
    });
  }

  await inputMatch.locator.click().catch((error) => {
    throw createAgentError("input_not_focusable", error.message, {
      selector: inputMatch.selector,
      stage: "inject",
    });
  });

  let injectionSettled = false;
  let observedInput = "";

  for (let attempt = 0; attempt < 2; attempt += 1) {
    logger.info(
      `[DIAG][chatgpt][sendMessage] attempt=${attempt} | class=${promptLengthClass} | forceFullPaste=${!!diagnostics.forceFullPaste}`
    );
    await clearInput(page, inputMatch.locator).catch((error) => {
      throw createAgentError("input_not_focusable", error.message, {
        selector: inputMatch.selector,
        stage: "inject",
      });
    });

    if (diagnostics.forceFullPaste) {
      // Test 2: bypass type-lead strategy — paste full expected text at once.
      await pasteText(page, expectedText).catch((error) => {
        throw createAgentError("input_not_focusable", error.message, { stage: "inject" });
      });
      await sleep(injection.promptPastePauseMs || 1000);
    } else {
      await injectPrompt(page, text, injection.keystrokeDelayMs, promptInjectionOptions).catch(
        (error) => {
          throw createAgentError("input_not_focusable", error.message, {
            stage: "inject",
          });
        }
      );
    }

    const settleState = await waitForInjectedPrompt(
      page,
      inputMatch.locator,
      expectedText
    );
    injectionSettled = settleState.ready;
    observedInput = settleState.observedInput;
    const settleVerdict = settleState.ready
      ? "ready"
      : settleState.submitted
        ? "submitted"
        : "timed-out";
    logger.info(
      `[DIAG][chatgpt][sendMessage] attempt=${attempt} | settle=${settleVerdict} | observedInput="${(observedInput || "").slice(0, 120)}"`
    );

    if (settleState.submitted) {
      const siteSignal = await checkSiteGenerationSignal(page);
      logger.info(
        `[DIAG][chatgpt][sendMessage] early_exit via settle.submitted | siteSignal=${siteSignal}`
      );
      return;
    }

    if (injectionSettled) {
      logger.info(
        `[DIAG][chatgpt][sendMessage] attempt=${attempt} injection settled — proceeding to submit`
      );
      break;
    }

    logger.info(
      `[DIAG][chatgpt][sendMessage] attempt=${attempt} injection not settled — ${attempt < 1 ? "retrying" : "retry budget exhausted"}`
    );
  }

  if (!injectionSettled) {
    logger.warn(
      `[DIAG][chatgpt][sendMessage] injection never settled after 2 attempts | class=${promptLengthClass}`
    );
    throw createAgentError(
      "prompt_injection_incomplete",
      "ChatGPT prompt did not fully settle in the input box before submit.",
      {
        stage: "inject",
        selector: inputMatch.selector,
        observedInput: observedInput.slice(0, 240),
      }
    );
  }

  logger.info(
    `[DIAG][chatgpt][sendMessage] entering waitForMessageSubmission | class=${promptLengthClass}`
  );
  await waitForMessageSubmission(page, inputMatch.locator).catch((error) => {
    throw createAgentError(error.code || "input_not_focusable", error.message, {
      selector: inputMatch.selector,
      stage: "inject",
      ...(error.details || {}),
    });
  });

  const siteSignalFinal = await checkSiteGenerationSignal(page);
  logger.info(
    `[DIAG][chatgpt][sendMessage] sendMessage complete | siteSignal=${siteSignalFinal}`
  );
}

async function waitForCompletion(page) {
  const completionState = await waitForHybridCompletion({
    page,
    readReplyState,
    completionConfig: completion,
    detectionConfig: chatgptConfig.completionDetection,
    onTimeout: () => {
      logger.warn("ChatGPT completion polling hit hard timeout; deferring capture to grace handling.");
    },
    onError: (error) => {
      logger.error(`ChatGPT completion polling failed: ${error.message}`);
    },
  });

  if (completionState.reason !== "timeout") {
    return completionState;
  }

  logger.warn("ChatGPT hit hard timeout; entering post-timeout grace window.");
  const graceState = await waitForPostTimeoutStability(page);

  if (graceState.reason === "post_timeout_stable") {
    logger.info("ChatGPT reply stabilized during post-timeout grace window.");
    return graceState;
  }

  return completionState;
}

async function captureLastReply(page) {
  const deadline = Date.now() + chatgptConfig.captureTimeoutMs;
  while (Date.now() < deadline) {
    const selectorState = await readLastReplyFromSelectors(page);
    if (selectorState.text) {
      return selectorState.text;
    }

    const replyAfterPrompt = extractReplyFromFallbackLines(await readReplyAfterPrompt(page));
    if (replyAfterPrompt) {
      return replyAfterPrompt;
    }

    const selectorText = await readTextFromSelectors(page);
    if (selectorText) {
      return selectorText;
    }

    const mainText = extractReplyFromLines(await readTextFromMain(page));
    if (mainText) {
      return mainText;
    }

    await sleep(500);
  }

  throw createAgentError("selector_not_found", "ChatGPT reply selector did not resolve.", {
    selector: chatgptConfig.replySelectors.join(", "),
    stage: "capture",
  });
}

module.exports = {
  open,
  isReady,
  sendMessage,
  waitForCompletion,
  captureLastReply,
};

const config = require("../../config");
const { createAgentError } = require("../utils/errors");
const logger = require("../utils/logger");
const {
  buildFullPromptText,
  clearInput,
  findEditableInput,
  getPromptLines,
  injectPrompt,
  pasteText,
  readInputText,
} = require("../utils/prompt");
const { sleep } = require("../utils/time");

const claudeConfig = config.claude;
const { completion } = config;
// F07: Merge per-adapter injection overrides over shared base.
// Allows Claude (ProseMirror contentEditable) to be tuned independently from
// ChatGPT and Gemini without global side effects.
const injection = { ...config.injection, ...(claudeConfig.injection || {}) };
let lastPromptText = "";
let lastDispatchHumanTurnCount = 0;
const sendButtonSelector = 'button[aria-label="Send message"]';
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
    normalized === "Extended" ||
    promptLines.includes(normalized) ||
    promptMetaPrefixes.some((prefix) => normalized.startsWith(prefix))
  );
}

function isIgnoredReplyText(text) {
  return (
    !text ||
    text === lastPromptText ||
    isPromptScaffoldLine(text) ||
    text.includes("Claude is AI and can make mistakes.") ||
    text.includes("Back at it") ||
    text.includes("Sonnet") ||
    text === "+" ||
    text.includes("Share") ||
    text.includes("Copy") ||
    text.includes("Retry") ||
    text.includes("Edit") ||
    text.includes("Search chats") ||
    text.includes("New chat") ||
    text.includes("Projects") ||
    text.includes("Recents")
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

function normalizeInputForComparison(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\r/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function buildComparisonMarkers(text) {
  const chars = Array.from(String(text || ""));

  return {
    head: normalizeInputForComparison(chars.slice(0, 80).join("")),
    tail: normalizeInputForComparison(chars.slice(-80).join("")),
  };
}

async function isSendButtonReady(page) {
  const sendButton = page.locator(sendButtonSelector).first();
  return sendButton
    .isVisible()
    .then((visible) => visible && sendButton.isEnabled())
    .catch(() => false);
}

async function waitForSendButtonReady(page, timeoutMs = injection.sendButtonReadyTimeoutMs || 2500) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await isSendButtonReady(page)) {
      return true;
    }

    await sleep(100);
  }

  return false;
}

async function waitForClaudePromptReady(page, inputLocator, expectedText) {
  const normalizedExpected = normalizeInputForComparison(expectedText);
  const { head, tail } = buildComparisonMarkers(expectedText);
  const deadline =
    Date.now() +
    Math.max(
      injection.inputSettleTimeoutMs || 4000,
      (injection.sendButtonReadyTimeoutMs || 2500) + 1500
    );

  let observedInput = "";
  let stableForMs = 0;
  let lastNormalizedInput = "";
  let sawContent = false;

  while (Date.now() < deadline) {
    observedInput = await readInputText(inputLocator);
    const normalizedObserved = normalizeInputForComparison(observedInput);

    if (normalizedObserved) {
      sawContent = true;
    } else if (sawContent) {
      // F01: Input cleared after seeing content. Don't treat empty-input alone as
      // submitted — ProseMirror paste triggers a transient DOM-empty during React
      // reconciliation. Playwright polls at 100ms and can catch this gap.
      // Require send-button-gone as secondary confirmation before concluding submitted.
      const sendButtonGone = !(await isSendButtonReady(page));
      if (sendButtonGone) {
        logger.info(
          "[claude] waitForClaudePromptReady: submitted confirmed (input empty + send button gone)"
        );
        return { ready: false, submitted: true, observedInput };
      }
      // Send button still present — likely transient ProseMirror clear; continue polling.
      await sleep(100);
      // eslint-disable-next-line no-continue
      continue;
    }

    if (normalizedObserved === normalizedExpected) {
      return { ready: true, submitted: false, observedInput };
    }

    const hasHead = head ? normalizedObserved.includes(head) : true;
    const hasTail = tail ? normalizedObserved.includes(tail) : true;
    const lengthRatio = normalizedExpected
      ? normalizedObserved.length / normalizedExpected.length
      : 1;
    const sendReady = await isSendButtonReady(page);

    if (normalizedObserved === lastNormalizedInput) {
      stableForMs += 100;
    } else {
      lastNormalizedInput = normalizedObserved;
      stableForMs = 0;
    }

    if (sendReady && hasHead && hasTail && lengthRatio >= 0.95 && stableForMs >= 400) {
      return { ready: true, submitted: false, observedInput };
    }

    await sleep(100);
  }

  return { ready: false, submitted: false, observedInput };
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
      text === "Extended" ||
      promptLines.includes(text) ||
      metaPrefixes.some((prefix) => text.startsWith(prefix)) ||
      text.includes("Claude is AI and can make mistakes.") ||
      text.includes("Back at it") ||
      text.includes("Sonnet") ||
      text === "+" ||
      text.includes("Share") ||
      text.includes("Copy") ||
      text.includes("Retry") ||
      text.includes("Edit") ||
      text.includes("Search chats") ||
      text.includes("New chat") ||
      text.includes("Projects") ||
      text.includes("Recents");

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

      if (lines.length && /[.!?。！？]$/.test(lines[lines.length - 1])) {
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
  for (const selector of claudeConfig.replySelectors) {
    const locator = page.locator(selector);
    const count = await locator.count().catch(() => 0);

    if (!count) {
      continue;
    }

    for (let index = count - 1; index >= 0; index -= 1) {
      const candidate = locator.nth(index);
      const text = await candidate.innerText({ timeout: 1500 }).catch(() => "");
      const extracted = extractReplyFromLines(text.split("\n"));

      if (!extracted) {
        continue;
      }

      return extracted;
    }
  }

  return "";
}

async function readLastReplyFromSelectors(page) {
  // F03: Use the human-turn count recorded at dispatch time as a DOM anchor.
  // claude.ai retains all historical message nodes — the "most paragraphs" heuristic
  // can match an earlier long reply. Anchoring to the current round's human-turn node
  // restricts capture to content that appeared after the current dispatch.
  const humanTurnCount = lastDispatchHumanTurnCount;

  for (const selector of claudeConfig.replySelectors) {
    if (selector === "p.font-claude-response-body") {
      const text = await page.evaluate(({ humanTurnCount: htCount }) => {
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

        const humanTurns = Array.from(
          document.querySelectorAll('[data-testid="human-turn"]')
        );
        const anchorNode =
          htCount > 0 && humanTurns.length >= htCount
            ? humanTurns[htCount - 1]
            : null;

        const paragraphs = Array.from(
          document.querySelectorAll("p.font-claude-response-body")
        ).filter(isVisible);

        if (paragraphs.length === 0) {
          return "";
        }

        // Prefer paragraphs appearing after the current round's human-turn node.
        const anchoredParagraphs = anchorNode
          ? paragraphs.filter(
              (p) =>
                // eslint-disable-next-line no-bitwise
                anchorNode.compareDocumentPosition(p) & Node.DOCUMENT_POSITION_FOLLOWING
            )
          : paragraphs;

        // Fall back to full set if anchor-based filter is empty (DOM may not retain
        // historical nodes, or anchor was not established yet).
        const workingSet = anchoredParagraphs.length > 0 ? anchoredParagraphs : paragraphs;
        const lastParagraph = workingSet[workingSet.length - 1];

        let current = lastParagraph.parentElement;
        while (current && current !== document.body) {
          const paragraphCount = Array.from(
            current.querySelectorAll("p.font-claude-response-body")
          )
            .filter(isVisible)
            .filter(
              (p) =>
                !anchorNode ||
                // eslint-disable-next-line no-bitwise
                anchorNode.compareDocumentPosition(p) & Node.DOCUMENT_POSITION_FOLLOWING
            ).length;

          if (paragraphCount > 1) {
            return (current.innerText || "").trim();
          }

          current = current.parentElement;
        }

        return (lastParagraph.innerText || "").trim();
      }, { humanTurnCount });

      const extracted = extractReplyFromFallbackLines(text.split("\n"));
      if (extracted) {
        return { count: 1, text: extracted };
      }

      continue;
    }

    const locator = page.locator(selector);
    const count = await locator.count().catch(() => 0);

    if (!count) {
      continue;
    }

    const text = await locator
      .nth(count - 1)
      .innerText({ timeout: 1500 })
      .catch(() => "");
    const extracted = extractReplyFromLines(text.split("\n"));

    if (extracted) {
      return { count, text: extracted };
    }
  }

  return { count: 0, text: "" };
}

async function readTextFromVisibleBlocks(page) {
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

    const elements = Array.from(document.querySelectorAll("main *"));
    const texts = [];
    const isRelevant = (element) =>
      !element.closest(
        'nav, aside, [role="navigation"], [role="complementary"], [data-testid*="sidebar"], [data-testid*="history"], [class*="sidebar"], [class*="history"]'
      );
    const shouldIgnore = (text) =>
      !text ||
      text === promptText ||
      text === "(empty)" ||
      text === "Extended" ||
      promptLines.includes(text) ||
      metaPrefixes.some((prefix) => text.startsWith(prefix)) ||
      text.includes("Claude is AI and can make mistakes.") ||
      text.includes("Back at it") ||
      text.includes("Sonnet") ||
      text === "+" ||
      text.includes("Share") ||
      text.includes("Copy") ||
      text.includes("Retry") ||
      text.includes("Edit") ||
      text.includes("Search chats") ||
      text.includes("New chat") ||
      text.includes("Projects") ||
      text.includes("Recents");

    for (const element of elements) {
      if (!isVisible(element) || !isRelevant(element)) {
        continue;
      }

      const text = (element.innerText || "").trim();
      if (shouldIgnore(text)) {
        continue;
      }

      texts.push(...text.split("\n").map((line) => line.trim()).filter(Boolean));
    }

    return texts;
  }, {
    promptText: lastPromptText,
    promptLines: getPromptLines(lastPromptText),
    metaPrefixes: promptMetaPrefixes,
  });
}

async function readTextFromBody(page) {
  return page.evaluate(({ promptText, promptLines, metaPrefixes }) => {
    const bodyText = (document.body?.innerText || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const ignorePatterns = [
      "Back at it",
      "Sonnet",
      "Share",
      "Copy",
      "Retry",
      "Thinking",
      "Edit",
      "Search chats",
      "New chat",
      "Projects",
      "Recents",
    ];

    return bodyText.filter((line) => {
      if (line === promptText) {
        return false;
      }

      if (line === "(empty)" || line === "Extended") {
        return false;
      }

      if (promptLines.includes(line)) {
        return false;
      }

      if (metaPrefixes.some((prefix) => line.startsWith(prefix))) {
        return false;
      }

      return !ignorePatterns.some((pattern) => line.includes(pattern));
    });
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

  return selectorState;
}

async function findInputLocator(page) {
  return findEditableInput(page, claudeConfig.inputSelector);
}

async function open(page) {
  logger.stage("claude", "open", "Navigating to Claude.");
  await page.goto(claudeConfig.url, {
    waitUntil: "domcontentloaded",
    timeout: claudeConfig.navigationTimeoutMs,
  });

  const verificationDeadline = Date.now() + claudeConfig.navigationTimeoutMs;

  while (Date.now() < verificationDeadline) {
    const ready = await isReady(page);
    if (ready) {
      break;
    }

    const bodyText = await page.locator("body").innerText().catch(() => "");
    if (bodyText.includes(claudeConfig.verificationText)) {
      logger.info("Claude is showing human verification. Waiting for it to clear.");
      await sleep(2000);
      continue;
    }

    await sleep(1000);
  }

  if (!(await isReady(page))) {
    await page.goto(claudeConfig.conversationUrl, {
      waitUntil: "domcontentloaded",
      timeout: claudeConfig.navigationTimeoutMs,
    });
  }

  const deadline = Date.now() + claudeConfig.navigationTimeoutMs;

  while (Date.now() < deadline) {
    if (await findInputLocator(page)) {
      return;
    }

    await sleep(500);
  }

  throw createAgentError("selector_not_found", "Claude input selector not found.", {
    selector: claudeConfig.inputSelector,
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

async function waitForMessageSubmission(page, inputLocator) {
  const sendButton = page.locator(sendButtonSelector).first();
  const sendButtonReady = await waitForSendButtonReady(page);

  if (sendButtonReady) {
    await sendButton.click();

    if (
      await waitForSubmissionStart(
        page,
        inputLocator,
        Math.max(injection.sendSettledTimeoutMs, 5000)
      )
    ) {
      return;
    }
  }

  if (await waitForSubmissionStart(page, inputLocator, 1200)) {
    return;
  }

  if (injection.submitWithEnter) {
    await inputLocator.click().catch(() => null);
    await page.keyboard.press("Enter");

    if (
      await waitForSubmissionStart(
        page,
        inputLocator,
        Math.max(injection.sendSettledTimeoutMs, 4000)
      )
    ) {
      return;
    }
  }

  const observedInput = await readInputText(inputLocator);
  throw createAgentError(
    "message_not_submitted",
    "Claude prompt remained in the input box after submit.",
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
  const deadline = Date.now() + claudeConfig.inputReadyTimeoutMs;
  let inputMatch = null;

  while (Date.now() < deadline) {
    inputMatch = await findInputLocator(page);
    if (inputMatch) {
      break;
    }

    await sleep(500);
  }

  if (!inputMatch) {
    throw createAgentError("selector_not_found", "Claude input selector not found.", {
      selector: claudeConfig.inputSelector,
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
    await clearInput(page, inputMatch.locator).catch((error) => {
      throw createAgentError("input_not_focusable", error.message, {
        selector: inputMatch.selector,
        stage: "inject",
      });
    });

    await injectPrompt(page, text, injection.keystrokeDelayMs, promptInjectionOptions).catch(
      (error) => {
        throw createAgentError("input_not_focusable", error.message, {
          stage: "inject",
        });
      }
    );

    // Detect if Claude.ai cleared the input mid-typing (lead chars lost, pastes landed in wrong state).
    // When this happens the box has restBlock+summary but is missing the typed lead portion.
    // Repair by clearing and pasting the full expected text at once, bypassing keyboard simulation.
    if (expectedText) {
      const { head: expectedHead } = buildComparisonMarkers(expectedText);
      if (expectedHead) {
        const postInjectNorm = normalizeInputForComparison(await readInputText(inputMatch.locator));
        if (postInjectNorm && !postInjectNorm.includes(expectedHead)) {
          await clearInput(page, inputMatch.locator).catch(() => null);
          await pasteText(page, expectedText);
          await sleep(injection.promptPastePauseMs || 1000);
        }
      }
    }

    const settleState = await waitForClaudePromptReady(page, inputMatch.locator, expectedText);
    injectionSettled = settleState.ready;
    observedInput = settleState.observedInput;

    if (settleState.submitted) {
      // F03: Record human-turn anchor so captureLastReply scopes to current round.
      lastDispatchHumanTurnCount = await page
        .evaluate(() => document.querySelectorAll('[data-testid="human-turn"]').length)
        .catch(() => 0);
      return;
    }

    if (injectionSettled) {
      break;
    }
  }

  if (!injectionSettled) {
    throw createAgentError(
      "prompt_injection_incomplete",
      "Claude prompt did not fully settle in the input box before submit.",
      {
        stage: "inject",
        selector: inputMatch.selector,
        observedInput: observedInput.slice(0, 240),
      }
    );
  }

  await waitForMessageSubmission(page, inputMatch.locator).catch((error) => {
    throw createAgentError(error.code || "input_not_focusable", error.message, {
      selector: inputMatch.selector,
      stage: "inject",
      ...(error.details || {}),
    });
  });

  // F03: Record human-turn anchor after confirmed submission.
  lastDispatchHumanTurnCount = await page
    .evaluate(() => document.querySelectorAll('[data-testid="human-turn"]').length)
    .catch(() => 0);
}

async function waitForCompletion(page) {
  try {
    const startTime = Date.now();
    const baseline = await readReplyState(page);
    let generationStarted = false;
    let lastObservedText = "";
    let stableForMs = 0;

    while (Date.now() - startTime < completion.hardTimeoutMs) {
      await sleep(completion.pollIntervalMs);

      const current = await readReplyState(page);
      const hasNewReply =
        current.count > baseline.count ||
        (baseline.count === 0 && current.text.length > 0) ||
        (baseline.count > 0 && current.text !== baseline.text);

      if (!generationStarted) {
        if (!hasNewReply) {
          continue;
        }

        generationStarted = true;
        lastObservedText = current.text;
        stableForMs = 0;
        continue;
      }

      if (!current.text) {
        stableForMs = 0;
        continue;
      }

      if (current.text === lastObservedText) {
        stableForMs += completion.pollIntervalMs;

        if (stableForMs >= completion.stabilityWindowMs) {
          return { completed: true, reason: "stable" };
        }
      } else {
        lastObservedText = current.text;
        stableForMs = 0;
      }
    }

    logger.warn("Claude completion polling hit hard timeout; proceeding to capture.");
    return { completed: false, reason: "timeout" };
  } catch (error) {
    logger.error(`Claude completion polling failed: ${error.message}`);
    return { completed: false, reason: "error" };
  }
}

async function captureLastReply(page) {
  const deadline = Date.now() + claudeConfig.captureTimeoutMs;
  while (Date.now() < deadline) {
    const { text } = await readLastReplyFromSelectors(page);
    if (text) {
      return text;
    }

    const replyAfterPrompt = extractReplyFromFallbackLines(await readReplyAfterPrompt(page));
    if (replyAfterPrompt) {
      return replyAfterPrompt;
    }

    const visibleBlockText = extractReplyFromFallbackLines(await readTextFromVisibleBlocks(page));
    if (visibleBlockText) {
      return visibleBlockText;
    }

    await sleep(500);
  }

  throw createAgentError("selector_not_found", "Claude reply selector did not resolve.", {
    selector: claudeConfig.replySelectors.join(", "),
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

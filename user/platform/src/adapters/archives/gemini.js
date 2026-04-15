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
  readInputText,
  waitForInputEmpty,
  waitForInputText,
} = require("../utils/prompt");
const { sleep } = require("../utils/time");

const geminiConfig = config.gemini;
const { completion } = config;
// F07: Merge per-adapter injection overrides over shared base.
// Gemini injection section is intentionally empty — preserve current working values.
const injection = { ...config.injection, ...(geminiConfig.injection || {}) };
let lastPromptText = "";
const sendButtonSelectors = [
  'button[aria-label="Send message"]',
  'button[mattooltip="Send message"]',
  'button:has-text("Send")',
];
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

function isIgnoredReplyText(text) {
  return (
    !text ||
    text === lastPromptText ||
    isPromptScaffoldLine(text) ||
    text === "Show thinking" ||
    text === "Gemini said" ||
    text === "Answer now" ||
    text.includes("Gemini can make mistakes") ||
    text.includes("Double-check responses") ||
    text.includes("Google AI") ||
    text.includes("Extensions") ||
    text.includes("Gems") ||
    text.includes("Recent") ||
    text.includes("Activity") ||
    text.includes("Settings") ||
    text.includes("Help") ||
    text.includes("Apps")
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
      text === "Show thinking" ||
      text === "Gemini said" ||
      text === "Answer now" ||
      text.includes("Gemini can make mistakes") ||
      text.includes("Double-check responses") ||
      text.includes("Google AI") ||
      text.includes("Extensions") ||
      text.includes("Gems") ||
      text.includes("Recent") ||
      text.includes("Activity") ||
      text.includes("Settings") ||
      text.includes("Help") ||
      text.includes("Apps");

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
  for (const selector of geminiConfig.replySelectors) {
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
  for (const selector of geminiConfig.replySelectors) {
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

    const rawText = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => !isPromptScaffoldLine(line))
      .join("\n")
      .trim();

    return { count, text: rawText };
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

async function findInputLocator(page) {
  return findEditableInput(page, geminiConfig.inputSelector);
}

async function open(page) {
  logger.stage("gemini", "open", "Navigating to Gemini.");
  await page.goto(geminiConfig.url, {
    waitUntil: "domcontentloaded",
    timeout: geminiConfig.navigationTimeoutMs,
  });

  const verificationDeadline = Date.now() + geminiConfig.navigationTimeoutMs;

  while (Date.now() < verificationDeadline) {
    const ready = await isReady(page);
    if (ready) {
      break;
    }

    const bodyText = await page.locator("body").innerText().catch(() => "");
    if (bodyText.includes(geminiConfig.verificationText)) {
      logger.info("Gemini is showing verification. Waiting for it to clear.");
      await sleep(2000);
      continue;
    }

    await sleep(1000);
  }

  if (!(await isReady(page))) {
    await page.goto(geminiConfig.conversationUrl, {
      waitUntil: "domcontentloaded",
      timeout: geminiConfig.navigationTimeoutMs,
    });
  }

  const deadline = Date.now() + geminiConfig.navigationTimeoutMs;

  while (Date.now() < deadline) {
    if (await findInputLocator(page)) {
      return;
    }

    await sleep(500);
  }

  throw createAgentError("selector_not_found", "Gemini input selector not found.", {
    selector: geminiConfig.inputSelector,
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

async function waitForMessageSubmission(page, inputLocator) {
  await inputLocator.click().catch(() => null);
  await page.keyboard.press("Enter");

  if (await waitForInputEmpty(inputLocator, injection.sendSettledTimeoutMs)) {
    return;
  }

  for (const selector of sendButtonSelectors) {
    const sendButton = page.locator(selector).first();
    const sendButtonReady = await sendButton
      .isVisible()
      .then((visible) => visible && sendButton.isEnabled())
      .catch(() => false);

    if (!sendButtonReady) {
      continue;
    }

    await sendButton.click();

    if (await waitForInputEmpty(inputLocator, injection.sendSettledTimeoutMs)) {
      return;
    }
  }

  const observedInput = await readInputText(inputLocator);
  throw createAgentError(
    "message_not_submitted",
    "Gemini prompt remained in the input box after submit.",
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
  const deadline = Date.now() + geminiConfig.inputReadyTimeoutMs;
  let inputMatch = null;

  while (Date.now() < deadline) {
    inputMatch = await findInputLocator(page);
    if (inputMatch) {
      break;
    }

    await sleep(500);
  }

  if (!inputMatch) {
    throw createAgentError("selector_not_found", "Gemini input selector not found.", {
      selector: geminiConfig.inputSelector,
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

    await injectPrompt(page, text, injection.keystrokeDelayMs).catch((error) => {
      throw createAgentError("input_not_focusable", error.message, {
        stage: "inject",
      });
    });

    injectionSettled = await waitForInputText(
      inputMatch.locator,
      expectedText,
      injection.inputSettleTimeoutMs
    );

    if (injectionSettled) {
      break;
    }

    observedInput = await readInputText(inputMatch.locator);
  }

  if (!injectionSettled) {
    throw createAgentError(
      "prompt_injection_incomplete",
      "Gemini prompt did not fully settle in the input box before submit.",
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
}

async function waitForCompletion(page) {
  return waitForHybridCompletion({
    page,
    readReplyState,
    completionConfig: completion,
    detectionConfig: geminiConfig.completionDetection,
    onTimeout: () => {
      logger.warn("Gemini completion polling hit hard timeout; proceeding to capture.");
    },
    onError: (error) => {
      logger.error(`Gemini completion polling failed: ${error.message}`);
    },
  });
}

async function captureLastReply(page) {
  const deadline = Date.now() + geminiConfig.captureTimeoutMs;
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

  throw createAgentError("selector_not_found", "Gemini reply selector did not resolve.", {
    selector: geminiConfig.replySelectors.join(", "),
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

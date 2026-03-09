const config = require("../../config");
const { createAgentError } = require("../utils/errors");
const logger = require("../utils/logger");
const { waitForHybridCompletion } = require("../utils/completion");
const {
  getPromptLines,
  injectPrompt,
} = require("../utils/prompt");
const { sleep } = require("../utils/time");

const geminiConfig = config.gemini;
const { completion, injection } = config;
let lastPromptText = "";
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
    text.length < 8 ||
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

    const shouldIgnore = (text) =>
      !text ||
      text.length < 8 ||
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
    const elements = Array.from(main.querySelectorAll("*")).filter(isVisible);
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
        return isVisible(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
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

    return [...new Set(lines)];
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
  return readLastReplyFromSelectors(page);
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

  await page.waitForSelector(geminiConfig.inputSelector, {
    state: "visible",
    timeout: geminiConfig.navigationTimeoutMs,
  }).catch((error) => {
    throw createAgentError("selector_not_found", error.message, {
      selector: geminiConfig.inputSelector,
      stage: "open",
    });
  });
}

async function isReady(page) {
  try {
    const input = page.locator(geminiConfig.inputSelector).first();
    return await input.isVisible();
  } catch {
    return false;
  }
}

async function sendMessage(page, text) {
  const normalizedText =
    typeof text === "string" ? text : text.fullText || text.promptBlock || "";
  lastPromptText = normalizedText.trim();
  const input = page.locator(geminiConfig.inputSelector).first();

  await input.waitFor({
    state: "visible",
    timeout: geminiConfig.inputReadyTimeoutMs,
  }).catch((error) => {
    throw createAgentError("selector_not_found", error.message, {
      selector: geminiConfig.inputSelector,
      stage: "inject",
    });
  });

  await input.click().catch((error) => {
    throw createAgentError("input_not_focusable", error.message, {
      selector: geminiConfig.inputSelector,
      stage: "inject",
    });
  });

  await injectPrompt(page, text, injection.keystrokeDelayMs).catch((error) => {
    throw createAgentError("input_not_focusable", error.message, {
      stage: "inject",
    });
  });

  await page.keyboard.press("Enter").catch((error) => {
    throw createAgentError("input_not_focusable", error.message, {
      stage: "inject",
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
    const { text } = await readLastReplyFromSelectors(page);
    if (text) {
      return text;
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

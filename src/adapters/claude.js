const config = require("../../config");
const { createAgentError } = require("../utils/errors");
const logger = require("../utils/logger");
const {
  getPromptLines,
  injectPrompt,
} = require("../utils/prompt");
const { sleep } = require("../utils/time");

const claudeConfig = config.claude;
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
    normalized === "Extended" ||
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
  for (const selector of claudeConfig.replySelectors) {
    if (selector === "p.font-claude-response-body") {
      const text = await page.evaluate(() => {
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

        const paragraphs = Array.from(
          document.querySelectorAll("p.font-claude-response-body")
        ).filter(isVisible);

        if (paragraphs.length === 0) {
          return "";
        }

        const lastParagraph = paragraphs[paragraphs.length - 1];
        let current = lastParagraph.parentElement;

        while (current && current !== document.body) {
          const paragraphCount = Array.from(
            current.querySelectorAll("p.font-claude-response-body")
          ).filter(isVisible).length;

          if (paragraphCount > 1) {
            return (current.innerText || "").trim();
          }

          current = current.parentElement;
        }

        return (lastParagraph.innerText || "").trim();
      });

      const extracted = extractReplyFromLines(text.split("\n"));
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
    const shouldIgnore = (text) =>
      !text ||
      text.length < 8 ||
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
      if (!isVisible(element)) {
        continue;
      }

      const text = (element.innerText || "").trim();
      if (shouldIgnore(text)) {
        continue;
      }

      texts.push(...text.split("\n").map((line) => line.trim()).filter(Boolean));
    }

    return [...new Set(texts)];
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
      if (line.length < 8) {
        return false;
      }

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
  return readLastReplyFromSelectors(page);
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

  await page.waitForSelector(claudeConfig.inputSelector, {
    state: "visible",
    timeout: claudeConfig.navigationTimeoutMs,
  }).catch((error) => {
    throw createAgentError("selector_not_found", error.message, {
      selector: claudeConfig.inputSelector,
      stage: "open",
    });
  });
}

async function isReady(page) {
  try {
    const input = page.locator(claudeConfig.inputSelector).first();
    const visible = await input.isVisible();
    const usable = await input.evaluate((element) => {
      const ariaDisabled = element.getAttribute("aria-disabled") === "true";
      return element.isContentEditable && !ariaDisabled;
    });

    return visible && usable;
  } catch {
    return false;
  }
}

async function sendMessage(page, text) {
  const normalizedText =
    typeof text === "string" ? text : text.fullText || text.promptBlock || "";
  lastPromptText = normalizedText.trim();
  const input = page.locator(claudeConfig.inputSelector).first();

  await input.waitFor({
    state: "visible",
    timeout: claudeConfig.inputReadyTimeoutMs,
  }).catch((error) => {
    throw createAgentError("selector_not_found", error.message, {
      selector: claudeConfig.inputSelector,
      stage: "inject",
    });
  });

  await input.click().catch((error) => {
    throw createAgentError("input_not_focusable", error.message, {
      selector: claudeConfig.inputSelector,
      stage: "inject",
    });
  });

  await injectPrompt(page, text, injection.keystrokeDelayMs).catch((error) => {
    throw createAgentError("input_not_focusable", error.message, {
      stage: "inject",
    });
  });

  if (injection.submitWithEnter) {
    await page.keyboard.press("Enter").catch((error) => {
      throw createAgentError("input_not_focusable", error.message, {
        stage: "inject",
      });
    });
  }
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

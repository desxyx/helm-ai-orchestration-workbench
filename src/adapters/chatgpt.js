const config = require("../../config");
const { createAgentError } = require("../utils/errors");
const logger = require("../utils/logger");
const { waitForHybridCompletion } = require("../utils/completion");
const {
  getPromptLines,
  injectPrompt,
} = require("../utils/prompt");
const { sleep } = require("../utils/time");

const chatgptConfig = config.chatgpt;
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

async function findInputLocator(page) {
  for (const selector of chatgptConfig.inputSelectors) {
    const locator = page.locator(selector);
    const count = await locator.count().catch(() => 0);

    if (!count) {
      continue;
    }

    for (let index = 0; index < count; index += 1) {
      const candidate = locator.nth(index);
      const visible = await candidate.isVisible().catch(() => false);
      if (!visible) {
        continue;
      }

      const editable = await candidate
        .evaluate((element) => {
          if (element instanceof HTMLTextAreaElement) {
            return !element.disabled && !element.readOnly;
          }

          const ariaDisabled = element.getAttribute("aria-disabled") === "true";
          return element.isContentEditable && !ariaDisabled;
        })
        .catch(() => false);

      if (editable) {
        return { locator: candidate, selector };
      }
    }
  }

  return null;
}

function isIgnoredReplyText(text) {
  return (
    !text ||
    text.length < 8 ||
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
  for (const selector of chatgptConfig.replySelectors) {
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
  return readLastReplyFromSelectors(page);
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

async function sendMessage(page, text) {
  const normalizedText =
    typeof text === "string" ? text : text.fullText || text.promptBlock || "";
  lastPromptText = normalizedText.trim();
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
    detectionConfig: chatgptConfig.completionDetection,
    onTimeout: () => {
      logger.warn("ChatGPT completion polling hit hard timeout; proceeding to capture.");
    },
    onError: (error) => {
      logger.error(`ChatGPT completion polling failed: ${error.message}`);
    },
  });
}

async function captureLastReply(page) {
  const deadline = Date.now() + chatgptConfig.captureTimeoutMs;
  while (Date.now() < deadline) {
    const { text } = await readLastReplyFromSelectors(page);
    if (text) {
      return text;
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

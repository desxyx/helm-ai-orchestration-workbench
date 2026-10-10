const config = require("../../config");
const { createAgentError } = require("../utils/errors");
const logger = require("../utils/logger");
const { waitForHybridCompletion } = require("../utils/completion");
const {
  captureReply,
  locateLatestTurnCopyButton,
  probeCopyReady,
  readLatestTurnState,
} = require("./copyCapture");
const { findEditableInput } = require("../utils/prompt");
const { sleep } = require("../utils/time");
const { sendOnce, getDispatchContext } = require("../utils/composerTransaction");

const chatgptConfig = config.chatgpt;
const { completion } = config;
const injection = { ...config.injection, ...(chatgptConfig.injection || {}) };
const sendButtonSelectors = ['button[aria-label="Send prompt"],button[aria-label="Send message"],button[aria-label="Send"]'];
const stopButtonSelectors = [
  'button[data-testid="stop-button"]',
  'button[aria-label="Stop"]',
  'button[aria-label="Stop generating"]',
];
const CHATGPT_ASSISTANT_TURN_SELECTORS = ['[data-turn-key]:has([data-conversation-role="assistant"])'];
const CHATGPT_USER_SELECTOR = '[data-user-message-bubble], [data-turn-key] [class~="group/user-message"]:not([class~="group/user-message"] [class~="group/user-message"])';
const CHATGPT_COPY_BUTTON_SELECTOR = [
  'button[data-testid="copy-turn-action-button"]',
  'button[aria-label*="Copy response" i]',
  'button[aria-label="Copy"]',
].join(", ");
// The assistant turn container can also hold the user's message and its own copy button, so
// the copy button must come after the assistant content anchor inside the turn.
const CHATGPT_REPLY_SCOPE = {
  messageSelectors: CHATGPT_ASSISTANT_TURN_SELECTORS,
  userSelector: CHATGPT_USER_SELECTOR,
  visibleOnly: true,
  anchorSelector: '[data-message-author-role="assistant"], [data-conversation-role="assistant"]',
  copyButtonSelector: CHATGPT_COPY_BUTTON_SELECTOR,
  excludedCopyAncestorSelector: '[data-markdown-copy]',
};
const CHATGPT_SEND_SPEC = {
  name: "chatgpt",
  editorSelectors: chatgptConfig.inputSelectors,
  sendSelector: sendButtonSelectors.join(","),
  stopSelector: stopButtonSelectors.join(","),
  // Fact Sheet r2: the composer-only card; history resource cards are outside the composer.
  attachmentSelector: "span.composer-attachment-surface",
  turnSelector: "[data-turn-key], [data-user-message-bubble]",
  scope: CHATGPT_REPLY_SCOPE,
  inputReadyTimeoutMs: chatgptConfig.inputReadyTimeoutMs,
  settle: { timeoutMs: Math.max(injection.inputSettleTimeoutMs || 4000, 20000), stableForMs: 400 },
  sendReadyTimeoutMs: 20000,
};

async function findInputLocator(page) {
  return findEditableInput(page, chatgptConfig.inputSelectors);
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
  return sendOnce(page, text, CHATGPT_SEND_SPEC);
}

async function readReplyState(page) {
  const context = getDispatchContext(page);
  const state = await readLatestTurnState(page, CHATGPT_REPLY_SCOPE, context?.baseline || null);
  // Recorded for every started read, so a hover-revealed Copy is still bound to the reply
  // that completion confirmed; the last read before completion is the confirmed one.
  if (context && state.started) context.confirmedId = `${state.id}:${state.textDigest}`;
  return {
    count: state.count,
    started: state.started,
    // A started reply is tracked even before its Copy is attached (hover-revealed Copy).
    text: state.started ? `${state.copyAttached ? "copy_ready" : "reply"}:${state.id}:${state.textLength}:${state.textDigest}` : "",
  };
}

async function probeReplyFinished(page) {
  const context = getDispatchContext(page);
  return probeCopyReady(await locateLatestTurnCopyButton(page, CHATGPT_REPLY_SCOPE, context?.baseline || null));
}

async function waitForCompletion(page) {
  return waitForHybridCompletion({
    page,
    readReplyState,
    completionConfig: completion,
    detectionConfig: { ...(chatgptConfig.completionDetection || {}), busySelectors: [stopButtonSelectors.join(",")] },
    baselineState: { count: 0, text: "" },
    probeFinished: probeReplyFinished,
    label: "chatgpt",
    onTimeout: () => logger.warn("ChatGPT reply stayed busy past the hard timeout."),
    onError: (error) => logger.error(`ChatGPT completion polling failed: ${error.message}`),
  });
}

async function captureLastReply(page, { force = false } = {}) {
  const context = getDispatchContext(page);
  try {
    const content = await captureReply(page, {
      scope: CHATGPT_REPLY_SCOPE,
      baseline: context?.baseline || null,
      confirmedId: context?.confirmedId || null,
      force,
      timeoutMs: force ? Math.max(chatgptConfig.captureTimeoutMs, 20000) : chatgptConfig.captureTimeoutMs,
      label: "ChatGPT",
    });
    logger.info(`[chatgpt] copy capture succeeded (${content.length} chars).`);
    return content;
  } catch (error) {
    throw createAgentError(error.code || "capture_failed", error.message, {
      stage: "capture",
      ...(error.details || {}),
    });
  }
}

module.exports = {
  open,
  isReady,
  sendMessage,
  waitForCompletion,
  captureLastReply,
};

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

const claudeConfig = config.claude;
const { completion } = config;
const injection = { ...config.injection, ...(claudeConfig.injection || {}) };
const CLAUDE_MESSAGE_SELECTOR = '[data-testid="assistant-message"]';
const CLAUDE_USER_SELECTOR = '[data-testid="user-message"], [data-testid="transcript-row"]:has([data-testid="file-thumbnail"]):not(:has([data-testid="assistant-message"]))';
// 2026-09-29: Claude dropped data-testid="action-bar-copy"; the Copy control is now a plain
// button inside [data-testid="message-actions"]. Keep the old form for older renders.
const CLAUDE_COPY_BUTTON_SELECTOR =
  '[data-testid="action-bar-copy"], [data-testid="message-actions"] button[aria-label="Copy"]';
const CLAUDE_STOP_BUTTON_SELECTOR = 'button[aria-label="Stop response"],button[aria-label="Stop generating"],button[aria-label="Stop streaming"],button[data-testid="stop-button"]';
const CLAUDE_REPLY_SCOPE = {
  messageSelectors: [CLAUDE_MESSAGE_SELECTOR],
  userSelector: CLAUDE_USER_SELECTOR,
  containerSelector: 'div:has(> [data-testid="assistant-message"])',
  copyButtonSelector: CLAUDE_COPY_BUTTON_SELECTOR,
  copyButtonLabel: "Copy",
};
const windowsInjection = process.platform === "win32" && injection.windows ? injection.windows : {};
const CLAUDE_SEND_SPEC = {
  name: "claude",
  editorSelectors: [claudeConfig.inputSelector],
  sendSelector: 'button[data-testid="chat-input-send"]',
  stopSelector: CLAUDE_STOP_BUTTON_SELECTOR,
  attachmentSelector: '[data-testid="file-thumbnail"]',
  turnSelector: '[data-testid="transcript-row"], [data-testid="user-message"], [data-testid="assistant-message"]',
  scope: CLAUDE_REPLY_SCOPE,
  inputReadyTimeoutMs: claudeConfig.inputReadyTimeoutMs,
  settle: {
    timeoutMs: Math.max(windowsInjection.inputSettleTimeoutMs || injection.inputSettleTimeoutMs || 4000, 20000),
    stableForMs: windowsInjection.stableForMs !== undefined ? windowsInjection.stableForMs : 400,
  },
  sendReadyTimeoutMs: 20000,
};

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

async function sendMessage(page, text) {
  return sendOnce(page, text, CLAUDE_SEND_SPEC);
}

async function readReplyState(page) {
  const context = getDispatchContext(page);
  const state = await readLatestTurnState(page, CLAUDE_REPLY_SCOPE, context?.baseline || null);
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
  return probeCopyReady(await locateLatestTurnCopyButton(page, CLAUDE_REPLY_SCOPE, context?.baseline || null));
}

async function waitForCompletion(page) {
  return waitForHybridCompletion({
    page,
    readReplyState,
    completionConfig: completion,
    detectionConfig: {
      ...(claudeConfig.completionDetection || {}),
      busySelectors: [CLAUDE_STOP_BUTTON_SELECTOR],
    },
    baselineState: { count: 0, text: "" },
    probeFinished: probeReplyFinished,
    label: "claude",
    onTimeout: () => logger.warn("Claude reply stayed busy past the hard timeout."),
    onError: (error) => logger.error(`Claude completion polling failed: ${error.message}`),
  });
}

async function captureLastReply(page, { force = false } = {}) {
  const context = getDispatchContext(page);
  try {
    const content = await captureReply(page, {
      scope: CLAUDE_REPLY_SCOPE,
      baseline: context?.baseline || null,
      confirmedId: context?.confirmedId || null,
      force,
      timeoutMs: force ? Math.max(claudeConfig.captureTimeoutMs, 20000) : claudeConfig.captureTimeoutMs,
      label: "Claude",
    });
    logger.info(`[claude] copy capture succeeded (${content.length} chars).`);
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

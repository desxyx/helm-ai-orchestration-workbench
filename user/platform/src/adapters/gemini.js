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

const geminiConfig = config.gemini;
const { completion } = config;
const injection = { ...config.injection, ...(geminiConfig.injection || {}) };
const sendButtonSelectors = ['button[aria-label="Send message"],button[aria-label="Send"],button[aria-label="Submit"]'];
const GEMINI_STOP_SELECTOR = 'button[aria-label="Stop"],button[aria-label="Stop generating"],button[aria-label="Stop response"]';
const GEMINI_MESSAGE_SELECTOR = "model-response";
const GEMINI_COPY_BUTTON_SELECTOR = 'copy-button button[aria-label="Copy"]';
const GEMINI_REPLY_SCOPE = {
  messageSelectors: [GEMINI_MESSAGE_SELECTOR],
  userSelector: "user-query",
  // The copy button sits in the response's action bar, beside message-content rather than
  // inside it, so scope to the enclosing model-response.
  containerSelector: "model-response",
  copyButtonSelector: GEMINI_COPY_BUTTON_SELECTOR,
};
const GEMINI_SEND_SPEC = {
  name: "gemini",
  editorSelectors: [geminiConfig.inputSelector],
  sendSelector: sendButtonSelectors.join(","),
  stopSelector: GEMINI_STOP_SELECTOR,
  // Long text has stayed inline on Gemini (G-1b); this card selector is not live-verified
  // and only serves the leftover-draft check.
  attachmentSelector: ".file-preview-container",
  attachmentVerified: false,
  turnSelector: "user-query, model-response",
  scope: GEMINI_REPLY_SCOPE,
  inputReadyTimeoutMs: geminiConfig.inputReadyTimeoutMs,
  settle: { timeoutMs: Math.max(injection.inputSettleTimeoutMs || 4000, 20000), stableForMs: 400 },
  sendReadyTimeoutMs: 20000,
};

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

async function sendMessage(page, text) {
  return sendOnce(page, text, GEMINI_SEND_SPEC);
}

async function readReplyState(page) {
  const context = getDispatchContext(page);
  const state = await readLatestTurnState(page, GEMINI_REPLY_SCOPE, context?.baseline || null);
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
  return probeCopyReady(await locateLatestTurnCopyButton(page, GEMINI_REPLY_SCOPE, context?.baseline || null));
}

async function waitForCompletion(page) {
  return waitForHybridCompletion({
    page,
    readReplyState,
    completionConfig: completion,
    detectionConfig: { ...(geminiConfig.completionDetection || {}), busySelectors: [GEMINI_STOP_SELECTOR] },
    baselineState: { count: 0, text: "" },
    probeFinished: probeReplyFinished,
    label: "gemini",
    onTimeout: () => logger.warn("Gemini reply stayed busy past the hard timeout."),
    onError: (error) => logger.error(`Gemini completion polling failed: ${error.message}`),
  });
}

async function captureLastReply(page, { force = false } = {}) {
  const context = getDispatchContext(page);
  try {
    const content = await captureReply(page, {
      scope: GEMINI_REPLY_SCOPE,
      baseline: context?.baseline || null,
      confirmedId: context?.confirmedId || null,
      force,
      timeoutMs: force ? Math.max(geminiConfig.captureTimeoutMs, 20000) : geminiConfig.captureTimeoutMs,
      label: "Gemini",
    });
    logger.info(`[gemini] copy capture succeeded (${content.length} chars).`);
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

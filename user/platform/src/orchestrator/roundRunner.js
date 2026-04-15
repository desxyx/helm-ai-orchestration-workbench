const sessionStore = require("../storage/sessionStore");
const { getErrorCode } = require("../utils/errors");
const logger = require("../utils/logger");

function buildTimeoutAutoUnlockContent(agentName) {
  return `[capture timeout] ${agentName} reply was not captured before the provider copy button became available. Dispatch auto-unlocked by operator timeout policy.`;
}

async function runRound({
  adapter,
  page,
  prompt,
  storedPrompt = null,
  session,
  roundNumber = 1,
  agentName = "claude",
  onStage = null,
  openPage = true,
}) {
  let status = "ok";
  let completionReason = "error";
  let errorCode = null;
  let content = "";
  const timings = {};
  const runStartedAt = Date.now();

  try {
    if (openPage) {
      logger.stage(agentName, "open", "Opening target page.");
      if (onStage) {
        await onStage({ agent: agentName, stage: "open", message: "Opening target page." });
      }
      const openStartedAt = Date.now();
      await adapter.open(page);
      timings.openMs = Date.now() - openStartedAt;
    } else {
      timings.openMs = 0;
    }

    logger.stage(agentName, "ready", "Checking input readiness.");
    if (onStage) {
      await onStage({ agent: agentName, stage: "ready", message: "Checking input readiness." });
    }
    const readyStartedAt = Date.now();
    const ready = await adapter.isReady(page);
    timings.readyMs = Date.now() - readyStartedAt;

    if (!ready) {
      const error = new Error(
        `${agentName} input is not ready. Check login state or selectors.`
      );
      error.code = "selector_not_found";
      throw error;
    }

    logger.stage(agentName, "inject", `Sending prompt for round ${roundNumber}.`);
    if (onStage) {
      await onStage({
        agent: agentName,
        stage: "inject",
        message: `Sending prompt for round ${roundNumber}.`,
      });
    }
    const injectStartedAt = Date.now();
    await adapter.sendMessage(page, prompt);
    timings.injectMs = Date.now() - injectStartedAt;

    logger.stage(agentName, "wait", "Waiting for completion.");
    if (onStage) {
      await onStage({ agent: agentName, stage: "wait", message: "Waiting for completion." });
    }
    const waitStartedAt = Date.now();
    const completion = await adapter.waitForCompletion(page);
    timings.waitMs = Date.now() - waitStartedAt;
    completionReason = completion.reason;

    if (completion.reason === "error") {
      const error = new Error(`${agentName} completion polling failed.`);
      error.code = "completion_polling_failed";
      throw error;
    }

    if (completion.reason === "timeout") {
      errorCode = "completion_timeout";
      logger.warn(`[${agentName}] [wait] Completion timed out; attempting capture.`);
    }

    if (completion.reason === "stalled") {
      errorCode = "completion_not_started";
      logger.warn(
        `[${agentName}] [wait] Reply did not visibly start in time; attempting capture anyway.`
      );
    }

    logger.stage(agentName, "capture", "Capturing last reply.");
    if (onStage) {
      await onStage({ agent: agentName, stage: "capture", message: "Capturing last reply." });
    }
    const captureStartedAt = Date.now();
    try {
      content = await adapter.captureLastReply(page);
    } catch (error) {
      if (completion.reason === "timeout") {
        timings.captureMs = Date.now() - captureStartedAt;
        content = buildTimeoutAutoUnlockContent(agentName);
        logger.warn(
          `[${agentName}] [capture] ${error.message}. Recording bounded timeout placeholder and auto-unlocking dispatch.`
        );
      } else {
        throw error;
      }
    }
    timings.captureMs = Date.now() - captureStartedAt;
    logger.info(
      `[${agentName}] Captured ${content.length} characters (${completionReason}).`
    );
  } catch (error) {
    status = "error";
    completionReason = "error";
    errorCode = getErrorCode(error, "round_failed");
    content = `ERROR: ${error.message}`;
    logger.error(`[${agentName}] Round failed (${errorCode}): ${error.message}`);
  }

  timings.totalMs = Date.now() - runStartedAt;

  const round = sessionStore.buildRound({
    roundNumber,
    prompt:
      storedPrompt ||
      (typeof prompt === "string" ? prompt : prompt.promptBlock || prompt.fullText || ""),
    agent: agentName,
    content,
    status,
    completionReason,
    errorCode,
    metrics: timings,
  });

  logger.stage(agentName, "persist", "Writing round to disk.");
  if (onStage) {
    await onStage({ agent: agentName, stage: "persist", message: "Writing round to disk." });
  }
  try {
    sessionStore.appendRound(session, round);
  } catch (error) {
    const persistCode = getErrorCode(error, "persist_failed");
    round.replies[0].status = "error";
    round.replies[0].errorCode = persistCode;
    round.replies[0].content = `ERROR: ${error.message}`;
    logger.error(`[${agentName}] Persist failed (${persistCode}): ${error.message}`);
    throw error;
  }

  return round;
}

module.exports = {
  runRound,
};

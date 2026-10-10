const { sleep } = require("./time");
const logger = require("./logger");

async function hasBusyUi(page, busySelectors) {
  for (const selector of busySelectors) {
    const matches = page.locator(selector);
    const count = typeof matches?.count === "function"
      ? await matches.count().catch(() => 0) : 1;
    for (let index = 0; index < count; index += 1) {
      // The first-only shape is retained for existing offline boundary doubles.
      const candidate = typeof matches?.nth === "function" ? matches.nth(index) : matches?.first();
      if (candidate && await candidate.isVisible().catch(() => false)) return selector;
    }
  }

  return "";
}

async function waitForHybridCompletion({
  page, readReplyState, completionConfig, detectionConfig = {}, baselineState = null,
  probeFinished = null, label = "adapter", onTimeout, onError,
}) {
  const pick = (key, fallback) => detectionConfig[key] ?? completionConfig[key] ?? fallback;
  const pollMs = Math.max(1, completionConfig.pollIntervalMs || 500);
  const startTimeoutMs = pick("startTimeoutMs", 5000);
  const busyHardTimeoutMs = pick("busyHardTimeoutMs", 900000);
  const captureTimeoutMs = pick("hardTimeoutMs", 180000);
  const stabilityWindowMs = pick("stabilityWindowMs", 3000);
  const hasProbe = typeof probeFinished === "function";
  const probeAfterMs = pick("probeAfterMs", hasProbe ? 10000 : 0);
  const probeIntervalMs = Math.max(1, pick("probeIntervalMs", hasProbe ? 5000 : stabilityWindowMs));
  let startedAt = Date.now();
  let generationStarted = false;
  let firstBusyAt = null;
  let idleAt = null;
  let fingerprint = "";
  let unchangedAt = startedAt;
  let lastProbeAt = null;
  let confirmations = 0;
  let unrevealed = 0;
  let lastProgressAt = startedAt;

  try {
    const baseline = baselineState || await readReplyState(page);
    while (true) {
      await sleep(pollMs);
      const current = await readReplyState(page);
      const busy = await hasBusyUi(page, detectionConfig.busySelectors || []);
      const now = Date.now();
      // Adapters report dispatch association as `started` (mounted counts can shrink or stay
      // flat under windowing); the count comparison remains for state-only callers.
      const associated = typeof current.started === "boolean";
      const newTurn = associated ? current.started : current.count > baseline.count;
      if (newTurn || busy) generationStarted = true;

      if (busy) {
        if (firstBusyAt === null) firstBusyAt = now;
        idleAt = null;
        confirmations = 0;
        fingerprint = "";
        lastProbeAt = null;
        if (now - firstBusyAt >= busyHardTimeoutMs) {
          if (onTimeout) onTimeout();
          return { completed: false, reason: "timeout" };
        }
        // No Copy probe, hover, scroll or generic timeout can cut BUSY short.
      } else if (!generationStarted) {
        if (now - startedAt >= startTimeoutMs) return { completed: false, reason: "stalled" };
      } else {
        if (idleAt === null) idleAt = now;
        // An associated reply's text carries its id, so a different target never pools
        // confirmations with the previous one.
        const nextFingerprint = newTurn && current.text ? (associated ? current.text : `${current.count}:${current.text}`) : "";
        if (nextFingerprint !== fingerprint) {
          fingerprint = nextFingerprint;
          unchangedAt = now;
          confirmations = 0;
          unrevealed = 0;
          lastProbeAt = null;
        }
        if (fingerprint && now - startedAt >= probeAfterMs &&
            now - unchangedAt >= probeIntervalMs &&
            (lastProbeAt === null || now - lastProbeAt >= probeIntervalMs)) {
          lastProbeAt = now;
          let ready = false;
          try {
            // Backward-compatible state-only callers already receive this
            // internally generated scoped-Copy signature from readReplyState.
            // Confirm it twice; arbitrary reply/DOM text is never Copy evidence.
            ready = hasProbe ? Boolean(await probeFinished(page, { allowHover: false }))
              : new RegExp(`^copy_ready:${current.count}:\\d+$`).test(current.text);
          }
          catch (_) { ready = false; }
          confirmations = ready ? confirmations + 1 : 0;
          unrevealed = ready ? 0 : unrevealed + 1;
          if (confirmations >= 2) {
            return { completed: true, reason: now - unchangedAt >= stabilityWindowMs ? "stable" : "stable_probe" };
          }
          // Stop absent, the same associated reply unchanged past the stability window, and
          // its Copy still not showing on two probes: the provider reveals Copy on hover.
          // Finish waiting so final extraction may do its single reveal and two Copy probes.
          if (associated && current.started && unrevealed >= 2 && now - unchangedAt >= stabilityWindowMs) {
            return { completed: true, reason: "stable_probe", needsReveal: true };
          }
        }
        if (now - idleAt >= captureTimeoutMs) {
          // Generation has stopped, but no verified scoped Copy was confirmed.
          return { completed: false, reason: "error", errorCode: "capture_timeout" };
        }
      }

      if (now - lastProgressAt >= 30000) {
        lastProgressAt = now;
        logger.info(`[${label}] [wait] busy=${Boolean(busy)} newTurn=${newTurn} confirmations=${confirmations}`);
      }
    }
  } catch (error) {
    if (onError) onError(error);
    return { completed: false, reason: "error" };
  }
}

module.exports = { waitForHybridCompletion };

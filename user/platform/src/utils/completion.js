const { sleep } = require("./time");
const logger = require("./logger");

function createRequestTracker(page, requestUrlPatterns) {
  const inflight = new Set();
  let lastActivityAt = Date.now();
  let sawRelevantTraffic = false;

  const matchesPattern = (url) =>
    requestUrlPatterns.length === 0 ||
    requestUrlPatterns.some((pattern) => url.includes(pattern));

  const onRequest = (request) => {
    if (!matchesPattern(request.url())) {
      return;
    }

    inflight.add(request);
    sawRelevantTraffic = true;
    lastActivityAt = Date.now();
  };

  const onRequestDone = (request) => {
    if (!inflight.has(request)) {
      return;
    }

    inflight.delete(request);
    lastActivityAt = Date.now();
  };

  page.on("request", onRequest);
  page.on("requestfinished", onRequestDone);
  page.on("requestfailed", onRequestDone);

  return {
    getInflightCount() {
      return inflight.size;
    },
    getLastActivityAt() {
      return lastActivityAt;
    },
    hasRelevantTraffic() {
      return sawRelevantTraffic;
    },
    dispose() {
      page.off("request", onRequest);
      page.off("requestfinished", onRequestDone);
      page.off("requestfailed", onRequestDone);
    },
  };
}

async function hasBusyUi(page, busySelectors) {
  for (const selector of busySelectors) {
    const visible = await page
      .locator(selector)
      .first()
      .isVisible()
      .catch(() => false);

    if (visible) {
      return selector;
    }
  }

  return "";
}

async function hasBusyText(page, busyTextPatterns) {
  const patterns = (busyTextPatterns || [])
    .map((pattern) => String(pattern || "").trim().toLowerCase())
    .filter(Boolean);

  if (!patterns.length) {
    return "";
  }

  return page.evaluate((candidatePatterns) => {
    const isVisible = (element) => {
      if (!(element instanceof HTMLElement)) {
        return false;
      }

      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        rect.width > 0 &&
        rect.height > 0
      );
    };

    const matchesBusyText = (text, pattern) =>
      text === pattern ||
      text.startsWith(`${pattern} `) ||
      text.startsWith(`${pattern}:`);

    const root = document.querySelector("main") || document.body;
    const candidates = Array.from(
      root.querySelectorAll(
        'button, [role="button"], [role="status"], [aria-live], [aria-busy="true"], summary, details, div, span'
      )
    );

    for (const element of candidates) {
      if (!isVisible(element)) {
        continue;
      }

      const text = (element.innerText || "").trim().replace(/\s+/g, " ").toLowerCase();
      if (!text || text.length > 120) {
        continue;
      }

      const hit = candidatePatterns.find((pattern) => matchesBusyText(text, pattern));
      if (hit) {
        return hit;
      }
    }

    return "";
  }, patterns).catch(() => "");
}

// Returns a label naming what matched ("selector:<css>" / "text:<pattern>"), or "" when idle.
async function hasBusySignal(page, busySelectors, busyTextPatterns) {
  const selectorHit = await hasBusyUi(page, busySelectors);
  if (selectorHit) {
    return `selector:${selectorHit}`;
  }

  const textHit = await hasBusyText(page, busyTextPatterns);
  return textHit ? `text:${textHit}` : "";
}

// Probe-based fallback. The heuristic path (reply text stable + no busy signal + network quiet)
// can be blocked indefinitely by a signal that never clears on a finished page (a leftover
// "Thought for Ns" header, a page that never goes network-idle), which used to cost the full
// hard timeout even though the reply had been on screen for a minute. Once the reply content has
// stopped changing, the adapter's own probe is asked whether the latest turn's Copy control is
// actually usable — the same fact the capture step relies on — and two agreeing probes end the wait.
const PROBE_AFTER_MS = 10000;
const PROBE_INTERVAL_MS = 5000;
const PROBE_CONFIRMATIONS = 2;
const PROBE_BUSY_QUIET_MS = 20000;
const PROBE_HOVER_AFTER_UNCHANGED_MS = 30000;
const PROGRESS_LOG_INTERVAL_MS = 30000;

async function waitForHybridCompletion({
  page,
  readReplyState,
  completionConfig,
  detectionConfig = {},
  baselineState = null,
  probeFinished = null,
  label = "adapter",
  onTimeout,
  onError,
}) {
  const tracker = createRequestTracker(page, detectionConfig.requestUrlPatterns || []);
  // baselineState: the reply state recorded before submit. Without it, a reply that is already
  // finished when polling starts reads as "no change" and only ends at the hard timeout.
  const baseline = baselineState || (await readReplyState(page));
  const hardTimeoutMs = detectionConfig.hardTimeoutMs || completionConfig.hardTimeoutMs;
  const stabilityWindowMs =
    detectionConfig.stabilityWindowMs || completionConfig.stabilityWindowMs;
  const networkQuietMs =
    detectionConfig.networkQuietMs || completionConfig.networkQuietMs || 0;
  const busySelectors = detectionConfig.busySelectors || [];
  const busyTextPatterns = detectionConfig.busyTextPatterns || [];
  const busyCooldownMs =
    detectionConfig.busyCooldownMs || completionConfig.busyCooldownMs || 0;
  const startTimeoutMs =
    detectionConfig.startTimeoutMs || completionConfig.startTimeoutMs || 5000;
  const fastStabilityWindowMs =
    detectionConfig.fastStabilityWindowMs || stabilityWindowMs;
  const fastReplyMinChars = detectionConfig.fastReplyMinChars || 0;
  const pick = (key, fallback) => detectionConfig[key] || completionConfig[key] || fallback;
  const probeAfterMs = pick("probeAfterMs", PROBE_AFTER_MS);
  const probeIntervalMs = pick("probeIntervalMs", PROBE_INTERVAL_MS);
  const probeConfirmations = pick("probeConfirmations", PROBE_CONFIRMATIONS);
  const probeBusyQuietMs = pick("probeBusyQuietMs", PROBE_BUSY_QUIET_MS);
  const probeHoverAfterMs = pick("probeHoverAfterUnchangedMs", PROBE_HOVER_AFTER_UNCHANGED_MS);

  let generationStarted = false;
  let lastObservedText = "";
  let stableForMs = 0;
  let lastBusyAt = 0;
  let sawBusyOrTraffic = false;
  let generationStartedAt = 0;
  let probeTextSeen = "";
  let probeTextChangedAt = 0;
  let probeStreak = 0;
  let lastProbeAt = 0;
  const startedAt = Date.now();
  let lastProgressAt = startedAt;

  try {
    while (Date.now() - startedAt < hardTimeoutMs) {
      await sleep(completionConfig.pollIntervalMs);

      const current = await readReplyState(page);
      const busyUi = await hasBusySignal(page, busySelectors, busyTextPatterns);
      if (busyUi) {
        lastBusyAt = Date.now();
        sawBusyOrTraffic = true;
      }

      if (tracker.hasRelevantTraffic()) {
        sawBusyOrTraffic = true;
      }

      const hasNewReply =
        current.count > baseline.count ||
        (baseline.count === 0 && current.text.length > 0) ||
        (baseline.count > 0 && current.text !== baseline.text);

      if (!generationStarted) {
        if (!hasNewReply && !busyUi && !tracker.hasRelevantTraffic()) {
          if (
            baseline.count === 0 &&
            !current.text &&
            Date.now() - startedAt >= startTimeoutMs
          ) {
            return { completed: false, reason: "stalled" };
          }

          continue;
        }

        generationStarted = true;
        generationStartedAt = Date.now();
        lastObservedText = current.text;
        stableForMs = 0;
        continue;
      }

      if (current.text && current.text === lastObservedText) {
        stableForMs += completionConfig.pollIntervalMs;
      } else if (current.text) {
        lastObservedText = current.text;
        stableForMs = 0;
      } else {
        stableForMs = 0;
      }

      const networkQuiet =
        tracker.getInflightCount() === 0 &&
        Date.now() - tracker.getLastActivityAt() >= networkQuietMs;
      const busyCooldownElapsed =
        !lastBusyAt || Date.now() - lastBusyAt >= busyCooldownMs;
      const hasSubstantialReply = current.text.length >= fastReplyMinChars;
      const effectiveStabilityWindowMs =
        hasSubstantialReply && sawBusyOrTraffic
          ? Math.min(stabilityWindowMs, fastStabilityWindowMs)
          : stabilityWindowMs;

      if (
        current.text &&
        stableForMs >= effectiveStabilityWindowMs &&
        networkQuiet &&
        !busyUi &&
        busyCooldownElapsed
      ) {
        return { completed: true, reason: "stable" };
      }

      if (probeFinished && current.text) {
        const now = Date.now();
        if (current.text !== probeTextSeen) {
          probeTextSeen = current.text;
          probeTextChangedAt = now;
          probeStreak = 0;
        }

        const unchangedMs = now - probeTextChangedAt;
        // While a busy signal is still asserted, demand a longer quiet period before believing the
        // probe, so a real (if unusual) still-generating state is not cut short.
        const requiredQuietMs = busyUi ? Math.max(probeBusyQuietMs, probeIntervalMs) : probeIntervalMs;
        if (
          now - generationStartedAt >= probeAfterMs &&
          unchangedMs >= requiredQuietMs &&
          now - lastProbeAt >= probeIntervalMs
        ) {
          lastProbeAt = now;
          let ready = false;
          try {
            ready = Boolean(await probeFinished(page, { allowHover: unchangedMs >= probeHoverAfterMs }));
          } catch (_) {
            ready = false;
          }

          probeStreak = ready ? probeStreak + 1 : 0;
          if (probeStreak >= probeConfirmations) {
            logger.info(
              `[${label}] [wait] completion confirmed by copy-button probe after ${Math.round(
                (now - startedAt) / 1000
              )}s (heuristic was blocked: busy=${busyUi || "none"}, networkQuiet=${networkQuiet}).`
            );
            return { completed: true, reason: "stable_probe" };
          }
        }
      }

      if (Date.now() - lastProgressAt >= PROGRESS_LOG_INTERVAL_MS) {
        lastProgressAt = Date.now();
        logger.info(
          `[${label}] [wait] ${Math.round((lastProgressAt - startedAt) / 1000)}s in, not complete: ` +
            `reply=${current.text || "none"} stableForMs=${stableForMs} busy=${busyUi || "none"} ` +
            `networkQuiet=${networkQuiet} inflight=${tracker.getInflightCount()} probeStreak=${probeStreak}`
        );
      }
    }

    if (onTimeout) {
      onTimeout();
    }
    return { completed: false, reason: "timeout" };
  } catch (error) {
    if (onError) {
      onError(error);
    }
    return { completed: false, reason: "error" };
  } finally {
    tracker.dispose();
  }
}

module.exports = {
  waitForHybridCompletion,
};

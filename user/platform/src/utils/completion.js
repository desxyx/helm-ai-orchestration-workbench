const { sleep } = require("./time");

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
      return true;
    }
  }

  return false;
}

async function hasBusyText(page, busyTextPatterns) {
  const patterns = (busyTextPatterns || [])
    .map((pattern) => String(pattern || "").trim().toLowerCase())
    .filter(Boolean);

  if (!patterns.length) {
    return false;
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

      if (candidatePatterns.some((pattern) => matchesBusyText(text, pattern))) {
        return true;
      }
    }

    return false;
  }, patterns).catch(() => false);
}

async function hasBusySignal(page, busySelectors, busyTextPatterns) {
  const selectorBusy = await hasBusyUi(page, busySelectors);
  if (selectorBusy) {
    return true;
  }

  return hasBusyText(page, busyTextPatterns);
}

async function waitForHybridCompletion({
  page,
  readReplyState,
  completionConfig,
  detectionConfig = {},
  onTimeout,
  onError,
}) {
  const tracker = createRequestTracker(page, detectionConfig.requestUrlPatterns || []);
  const baseline = await readReplyState(page);
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

  let generationStarted = false;
  let lastObservedText = "";
  let stableForMs = 0;
  let lastBusyAt = 0;
  let sawBusyOrTraffic = false;
  const startedAt = Date.now();

  try {
    while (Date.now() - startedAt < completionConfig.hardTimeoutMs) {
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

const os = require("node:os");
const path = require("node:path");

// Keep test log lines out of the live platform log (src/utils/logger.js honours this override).
process.env.HELM_LOG_PATH = path.join(os.tmpdir(), "helm-completion-probe-test.log");

const test = require("node:test");
const assert = require("node:assert/strict");

const { waitForHybridCompletion } = require("../src/utils/completion");

// Fake page whose busy selector never clears — the shape of the live failure where a
// finished reply still read as "busy" and the wait only ended at the hard timeout.
function stuckBusyPage() {
  return {
    on() {},
    off() {},
    evaluate: async () => "",
    locator: () => ({ first: () => ({ isVisible: async () => true }) }),
  };
}

const FAST = {
  pollIntervalMs: 10,
  stabilityWindowMs: 30,
  hardTimeoutMs: 3000,
  probeAfterMs: 40,
  probeIntervalMs: 30,
  probeBusyQuietMs: 60,
  probeHoverAfterUnchangedMs: 500,
};
const STUCK_BUSY = { busySelectors: ["button.stop"] };

test("a stuck busy signal no longer costs the whole hard timeout when the probe confirms", async () => {
  const startedAt = Date.now();
  const result = await waitForHybridCompletion({
    page: stuckBusyPage(),
    readReplyState: async () => ({ count: 2, text: "copy_ready:2:40" }),
    completionConfig: FAST,
    detectionConfig: STUCK_BUSY,
    baselineState: { count: 1, text: "" },
    probeFinished: async () => true,
    label: "test",
  });

  assert.equal(result.reason, "stable_probe");
  assert.ok(Date.now() - startedAt < FAST.hardTimeoutMs / 2, "should finish well before the hard timeout");
});

test("without a probe the same stuck signal still runs to the hard timeout (baseline behaviour)", async () => {
  const result = await waitForHybridCompletion({
    page: stuckBusyPage(),
    readReplyState: async () => ({ count: 2, text: "copy_ready:2:40" }),
    completionConfig: { ...FAST, hardTimeoutMs: 400 },
    detectionConfig: STUCK_BUSY,
    baselineState: { count: 1, text: "" },
  });

  assert.equal(result.reason, "timeout");
});

test("a probe that keeps saying not-ready never ends the wait early", async () => {
  const result = await waitForHybridCompletion({
    page: stuckBusyPage(),
    readReplyState: async () => ({ count: 2, text: "copy_ready:2:40" }),
    completionConfig: { ...FAST, hardTimeoutMs: 500 },
    detectionConfig: STUCK_BUSY,
    baselineState: { count: 1, text: "" },
    probeFinished: async () => false,
  });

  assert.equal(result.reason, "timeout");
});

test("while the reply text is still changing the probe is never consulted", async () => {
  let length = 40;
  let probes = 0;
  const result = await waitForHybridCompletion({
    page: stuckBusyPage(),
    readReplyState: async () => {
      length += 1;
      return { count: 2, text: `copy_ready:2:${length}` };
    },
    completionConfig: { ...FAST, hardTimeoutMs: 500 },
    detectionConfig: STUCK_BUSY,
    baselineState: { count: 1, text: "" },
    probeFinished: async () => {
      probes += 1;
      return true;
    },
  });

  assert.equal(result.reason, "timeout");
  assert.equal(probes, 0);
});

test("a single positive probe is not enough; a negative in between resets the streak", async () => {
  const answers = [true, false, true, true];
  let calls = 0;
  const result = await waitForHybridCompletion({
    page: stuckBusyPage(),
    readReplyState: async () => ({ count: 2, text: "copy_ready:2:40" }),
    completionConfig: FAST,
    detectionConfig: STUCK_BUSY,
    baselineState: { count: 1, text: "" },
    probeFinished: async () => answers[Math.min(calls++, answers.length - 1)],
  });

  assert.equal(result.reason, "stable_probe");
  assert.ok(calls >= 4, `expected the reset streak to need 4 probes, saw ${calls}`);
});

test("hovering is only allowed after the content has been unchanged for a long while", async () => {
  const seen = [];
  await waitForHybridCompletion({
    page: stuckBusyPage(),
    readReplyState: async () => ({ count: 2, text: "copy_ready:2:40" }),
    completionConfig: { ...FAST, hardTimeoutMs: 900, probeHoverAfterUnchangedMs: 300 },
    detectionConfig: STUCK_BUSY,
    baselineState: { count: 1, text: "" },
    probeFinished: async (_page, options) => {
      seen.push(options.allowHover);
      return false;
    },
  });

  assert.equal(seen[0], false, "first probe must not hover");
  assert.ok(seen.includes(true), "a long-unchanged reply eventually allows hover");
});

test("the heuristic path is unchanged when nothing blocks it", async () => {
  const result = await waitForHybridCompletion({
    page: { on() {}, off() {}, evaluate: async () => "", locator: () => null },
    readReplyState: async () => ({ count: 2, text: "copy_ready:2:40" }),
    completionConfig: FAST,
    baselineState: { count: 1, text: "" },
    probeFinished: async () => true,
  });

  assert.equal(result.reason, "stable");
});

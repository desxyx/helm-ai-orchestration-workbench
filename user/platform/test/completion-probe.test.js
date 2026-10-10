const os = require("node:os");
const path = require("node:path");

// Keep test log lines out of the live platform log (src/utils/logger.js honours this override).
process.env.HELM_LOG_PATH = path.join(os.tmpdir(), "helm-completion-probe-test.log");

const test = require("node:test");
const assert = require("node:assert/strict");

const { waitForHybridCompletion } = require("../src/utils/completion");

// Synthetic Stop visibility is authoritative; Copy readiness must not override it.
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
  busyHardTimeoutMs: 3000,
  probeAfterMs: 40,
  probeIntervalMs: 30,
  probeBusyQuietMs: 60,
  probeHoverAfterUnchangedMs: 500,
};
const STUCK_BUSY = { busySelectors: ["button.stop"] };

test("CORE06 target historical replacement: a confirmed Copy cannot complete while Stop remains visible", async () => {
  const startedAt = Date.now();
  const result = await waitForHybridCompletion({
    page: stuckBusyPage(),
    readReplyState: async () => ({ count: 2, text: "copy_ready:2:40" }),
    completionConfig: { ...FAST, hardTimeoutMs: 200, busyHardTimeoutMs: 200 },
    detectionConfig: STUCK_BUSY,
    baselineState: { count: 1, text: "" },
    probeFinished: async () => true,
    label: "test",
  });

  assert.equal(result.completed, false);
  assert.equal(result.reason, "timeout");
  assert.ok(Date.now() - startedAt >= 200, "visible Stop must prevent early completion");
});

test("CORE06 target historical replacement: without a probe a visible Stop uses the busy hard timeout", async () => {
  const startedAt = Date.now();
  const result = await waitForHybridCompletion({
    page: stuckBusyPage(),
    readReplyState: async () => ({ count: 2, text: "copy_ready:2:40" }),
    completionConfig: { ...FAST, hardTimeoutMs: 40, busyHardTimeoutMs: 200 },
    detectionConfig: STUCK_BUSY,
    baselineState: { count: 1, text: "" },
  });

  assert.equal(result.reason, "timeout");
  assert.equal(result.completed, false);
  assert.ok(Date.now() - startedAt >= 200, "generic cap cannot truncate the busy window");
});

test("a probe that keeps saying not-ready never ends the wait early", async () => {
  const result = await waitForHybridCompletion({
    page: stuckBusyPage(),
    readReplyState: async () => ({ count: 2, text: "copy_ready:2:40" }),
    completionConfig: { ...FAST, hardTimeoutMs: 500, busyHardTimeoutMs: 500 },
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
    completionConfig: { ...FAST, hardTimeoutMs: 500, busyHardTimeoutMs: 500 },
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
    // No Stop: preserve streak-reset coverage without requiring busy completion.
    page: { on() {}, off() {}, evaluate: async () => "", locator: () => ({ first: () => ({ isVisible: async () => false }) }) },
    readReplyState: async () => ({ count: 2, text: "copy_ready:2:40" }),
    completionConfig: { ...FAST, stabilityWindowMs: 2000 },
    detectionConfig: STUCK_BUSY,
    baselineState: { count: 1, text: "" },
    probeFinished: async () => answers[Math.min(calls++, answers.length - 1)],
  });

  assert.equal(result.reason, "stable_probe");
  assert.ok(calls >= 4, `expected the reset streak to need 4 probes, saw ${calls}`);
});

test("CORE06 target historical replacement: stable content never permits hover while Stop remains visible", async () => {
  const seen = [];
  let reads = 0;
  await waitForHybridCompletion({
    page: stuckBusyPage(),
    readReplyState: async () => { reads += 1; return { count: 2, text: "copy_ready:2:40" }; },
    completionConfig: { ...FAST, hardTimeoutMs: 900, busyHardTimeoutMs: 900, probeHoverAfterUnchangedMs: 300 },
    detectionConfig: STUCK_BUSY,
    baselineState: { count: 1, text: "" },
    probeFinished: async (_page, options) => {
      seen.push(options.allowHover);
      return false;
    },
  });

  assert.ok(reads > 0, "positive control: generation loop was exercised");
  assert.equal(seen.some(Boolean), false, "Stop forbids hover even after the old threshold");
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

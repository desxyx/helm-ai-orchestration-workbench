const test = require('node:test');
const assert = require('node:assert/strict');
const { load, clock, logger } = require('./core06-fixtures/harness');

for (const [text, expected] of [['copy_ready:2:40', true], ['ordinary DOM reply text', false], ['copy_ready:1:40', false]]) {
  test(`CORE06 compatibility: state-only completion validates scoped Copy metadata ${text}`, async () => {
    const time = clock();
    let reads = 0;
    const m = load('src/utils/completion.js', { time, overrides: { './time': { sleep: time.sleep }, './logger': logger() } });
    const result = await m.api.waitForHybridCompletion({
      page: { on() {}, off() {}, locator: () => null, evaluate: async () => '' },
      readReplyState: async () => { reads += 1; return { count: 2, text }; },
      baselineState: { count: 1, text: '' },
      completionConfig: { pollIntervalMs: 10, stabilityWindowMs: 20, hardTimeoutMs: 100 },
    });
    assert.equal(result.completed, expected);
    assert.ok(reads >= 2, 'never complete from a single metadata observation');
    if (expected) assert.equal(result.reason, 'stable');
    else assert.equal(result.errorCode, 'capture_timeout');
  });
}

test('CORE06 completion: a lingering thinking label without Stop or a new turn cannot start generation', async () => {
  const time = clock();
  const m = load('src/utils/completion.js', { time, overrides: { './time': { sleep: time.sleep }, './logger': logger() } });
  const result = await m.api.waitForHybridCompletion({
    page: { on() {}, off() {}, locator: () => ({ first: () => ({ isVisible: async () => false }) }), evaluate: async () => 'Thinking' },
    readReplyState: async () => ({ count: 1, text: 'copy_ready:1:40' }),
    baselineState: { count: 1, text: 'copy_ready:1:40' },
    detectionConfig: { busySelectors: ['fixture-stop'] },
    completionConfig: { pollIntervalMs: 10, startTimeoutMs: 30, busyHardTimeoutMs: 50, hardTimeoutMs: 100 },
  });
  assert.equal(result.completed, false);
  assert.equal(result.reason, 'stalled');
});

test('CORE06 completion: a hidden first Stop cannot hide a later visible Stop', async () => {
  const time = clock();let probes = 0;
  const hidden = { isVisible: async () => false };
  const visible = { isVisible: async () => true };
  const m = load('src/utils/completion.js', { time, overrides: { './time': { sleep: time.sleep }, './logger': logger() } });
  const result = await m.api.waitForHybridCompletion({
    page: { on() {}, off() {}, locator: () => ({ first: () => hidden, count: async () => 2, nth: n => n ? visible : hidden }) },
    readReplyState: async () => ({ count: 2, text: 'copy_ready:2:40' }),
    baselineState: { count: 1, text: '' },
    probeFinished: async () => { probes++;return true; },
    detectionConfig: { busySelectors: ['fixture-stop-union'] },
    completionConfig: { pollIntervalMs: 10, stabilityWindowMs: 20, probeAfterMs: 0, probeIntervalMs: 10, busyHardTimeoutMs: 50, hardTimeoutMs: 100 },
  });
  assert.equal(result.completed, false);
  assert.equal(result.reason, 'timeout');
  assert.equal(probes, 0);
});

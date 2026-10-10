const test = require('node:test');
const assert = require('node:assert/strict');
const { load, clock, logger } = require('./core06-fixtures/harness');

function completionFixture({ busy = () => false, state = () => ({ count: 2, text: 'copy_ready:2:80' }), traffic = false, probe = true, ...settings } = {}) {
  const time = clock();
  const began = time.now();
  const events = [];
  const listeners = new Map();
  const emissions = [];
  const page = {
    on: (event, fn) => listeners.set(event, fn), off: event => listeners.delete(event),
    emit: (event, value) => { emissions.push(event); listeners.get(event)?.(value); },
    evaluate: async () => '',
    locator: () => ({ first: () => ({ isVisible: async () => busy(time.now() - began) }) }),
  };
  const m = load('src/utils/completion.js', { time, overrides: { './time': { sleep: time.sleep }, './logger': logger() } });
  let reads = 0;
  async function run() {
    const result = await m.api.waitForHybridCompletion({ page,
      readReplyState: async () => {
        if (traffic && reads === 0) page.emit('request', { url: () => 'fixture-traffic' });
        reads += 1;
        return state(time.now() - began);
      },
      completionConfig: { pollIntervalMs: 10, stabilityWindowMs: 20, hardTimeoutMs: 150, busyHardTimeoutMs: 150, startTimeoutMs: 40, probeAfterMs: 10, probeIntervalMs: 10, probeBusyQuietMs: 10, probeHoverAfterUnchangedMs: 20, ...settings },
      detectionConfig: { busySelectors: ['fixture-stop'] }, baselineState: { count: 1, text: 'copy_ready:1:80' },
      probeFinished: async (_page, options) => { events.push({ at: time.now() - began, ...options }); return typeof probe === 'function' ? probe(events.length) : probe; },
    });
    return { result, elapsed: time.now() - began, events, listeners, reads, emissions };
  }
  return { run };
}

test('CORE06 control: a fast post-baseline reply can complete without sampling BUSY', async () => {
  const { result, listeners } = await completionFixture().run();
  assert.equal(result.completed, true);
  assert.equal(listeners.size, 0, 'request observers are disposed');
});

test('CORE06 control: BUSY followed by a new scoped reply and cleared Stop can complete', async () => {
  const { result } = await completionFixture({ busy: ms => ms < 30 }).run();
  assert.equal(result.completed, true);
});

test('CORE06 target: Stop absence with no new assistant turn expires the start window', async () => {
  const { result, elapsed } = await completionFixture({ state: () => ({ count: 1, text: 'copy_ready:1:80' }) }).run();
  assert.equal(result.completed, false);
  assert.equal(result.reason, 'stalled');
  assert.ok(elapsed <= 60, 'start window is bounded even when a previous reply exists');
});

test('CORE06 target: BUSY then Stop absent cannot promote a previous-turn Copy', async () => {
  const { result } = await completionFixture({ busy: ms => ms < 30, state: () => ({ count: 1, text: 'copy_ready:1:80' }) }).run();
  assert.equal(result.completed, false);
});

test('CORE06 target: network traffic cannot supply generation-start evidence for an old turn', async () => {
  const { result, emissions } = await completionFixture({ traffic: true, state: () => ({ count: 1, text: 'copy_ready:1:80' }) }).run();
  assert.deepEqual(emissions, ['request'], 'positive control: network event was emitted');
  assert.equal(result.completed, false);
});

test('CORE06 target: text change inside a pre-existing turn is not a post-baseline turn', async () => {
  const { result } = await completionFixture({ state: () => ({ count: 1, text: 'copy_ready:1:81' }) }).run();
  assert.equal(result.completed, false);
});

test('CORE06 target: a fast reply requires two stable scoped Copy confirmations', async () => {
  const { result, events } = await completionFixture().run();
  assert.equal(result.completed, true);
  assert.ok(events.length >= 2, 'Stop absence plus stable text cannot bypass Copy probes');
});

test('CORE06 target: a missing scoped Copy cannot complete even if text is stable', async () => {
  const { result } = await completionFixture({ probe: false }).run();
  assert.equal(result.completed, false);
});

test('CORE06 target: a negative Copy probe resets the two-confirmation streak', async () => {
  const { result, events } = await completionFixture({ probe: n => n !== 2 }).run();
  assert.equal(result.completed, true);
  assert.ok(events.length >= 4);
});

test('CORE06 target: a still-visible Stop prevents early probe completion', async () => {
  const { result, elapsed } = await completionFixture({ busy: () => true }).run();
  assert.equal(result.completed, false);
  assert.equal(result.reason, 'timeout');
  assert.ok(elapsed >= 150);
});

test('CORE06 target: generation probes never request hover while Stop is visible', async () => {
  const { events, reads } = await completionFixture({ busy: () => true, probe: false }).run();
  assert.ok(reads > 0, 'positive control: generation loop was exercised');
  assert.equal(events.some(item => item.allowHover), false);
});

test('CORE06 target: busyHardTimeoutMs, rather than the former generic cap, governs visible Stop', async () => {
  const { result, elapsed } = await completionFixture({ busy: () => true, probe: false, hardTimeoutMs: 40, busyHardTimeoutMs: 150 }).run();
  assert.equal(result.reason, 'timeout');
  assert.ok(elapsed >= 150);
});

test('CORE06 target: the configured default busy hard timeout is 900000 ms', () => {
  assert.equal(require('../config').completion.busyHardTimeoutMs, 900000);
});

const os = require('node:os');
const path = require('node:path');
process.env.HELM_LOG_PATH = path.join(os.tmpdir(), 'helm-core06-copy-test.log');
const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { load, clock, logger } = require('./core06-fixtures/harness');
const { readLatestTurnState, locateLatestTurnCopyButton } = require('../src/adapters/copyCapture');
const { refreshFixture, inspectCapture } = require('./core06-fixtures/refresh');
const { closeSharedBrowser } = require('./core06-fixtures/sim');
test.after(closeSharedBrowser);

function copyFixture({ body = '**native Copy**\n\n- item', writes = true } = {}) {
  const time = clock();
  const moves = [];
  const state = { clipboard: 'old clipboard', clicks: 0 };
  const page = { evaluate: async (_fn, value) => value === undefined ? state.clipboard : (state.clipboard = value) };
  const message = { scrollIntoViewIfNeeded: async () => moves.push('scroll'), hover: async () => moves.push('hover') };
  const button = { isVisible: async () => true, isEnabled: async () => true,
    click: async () => { state.clicks += 1; if (writes) state.clipboard = body; } };
  const m = load('src/adapters/copyCapture.js', { time });
  return { ...m, page, message, button, state, moves };
}

test('CORE06 Copy control: changed sentinel returns exact provider Copy text once', async () => {
  const f = copyFixture();
  assert.equal(await f.api.clickCopyAndRead(f.page, f.message, f.button), '**native Copy**\n\n- item');
  assert.equal(f.state.clicks, 1);
});

test('CORE06 Copy control: unchanged sentinel rejects the previous clipboard', async () => {
  const f = copyFixture({ writes: false });
  await assert.rejects(f.api.clickCopyAndRead(f.page, f.message, f.button), e => e.code === 'copy_did_not_write');
  assert.equal(f.state.clicks, 1);
  assert.ok(f.state.clipboard.startsWith('__HELM_COPY_SENTINEL_'));
});

test('CORE06 Copy control: whitespace clipboard is rejected', async () => {
  const f = copyFixture({ body: ' \n ' });
  await assert.rejects(f.api.clickCopyAndRead(f.page, f.message, f.button), e => e.code === 'clipboard_empty');
});

test('CORE06 Annex A22 control: native Copy and another agent paste share the clipboard lock', async () => {
  const { clickCopyAndRead } = require('../src/adapters/copyCapture');
  const { pasteText } = require('../src/utils/prompt');
  let clipboard = 'old content';
  let announceClick;
  const clicked = new Promise(resolve => { announceClick = resolve; });
  const page = { evaluate: async (_fn, value) => value === undefined ? clipboard : (clipboard = value) };
  const message = { scrollIntoViewIfNeeded: async () => {}, hover: async () => {} };
  const target = { isVisible: async () => true, isEnabled: async () => true, click: async () => { clipboard = 'native Copy result'; announceClick(); } };
  const capture = clickCopyAndRead(page, message, target);
  await clicked;
  const pasted = [];
  const paste = pasteText({ ...page, keyboard: { press: async () => pasted.push(clipboard) } }, 'other agent payload');
  assert.equal(await capture, 'native Copy result');
  await paste;
  assert.deepEqual(pasted, ['other agent payload']);
});

test('CORE06 target Copy: final extraction has at most one target scroll and hover', async () => {
  const f = copyFixture();
  let probes = 0;
  f.button.isVisible = async () => ++probes >= 3;
  const button = await f.api.pollForCopyButton(f.message, f.button, 10, 100);
  assert.ok(button, 'positive control: final Copy target resolves');
  await f.api.clickCopyAndRead(f.page, f.message, button);
  assert.equal(f.state.clicks, 1);
  assert.ok(f.moves.filter(x => x === 'scroll').length <= 1, 'no repeated target scrolling');
  assert.ok(f.moves.filter(x => x === 'hover').length <= 1, 'no repeated target hovering');
});

for (const provider of ['claude', 'chatgpt', 'gemini']) test(`CORE06 target ${provider}: unbound forced Copy is refresh_unverified`, async (t) => {
  const f = await refreshFixture(provider);
  t.after(f.close);
  const result = await inspectCapture(() => f.api.captureLastReply(f.page, { force: true }));
  assert.equal((await f.actions()).copy, 1, 'positive control: fallback Copy was read');
  assert.equal(result.content, f.content, 'raw unverified Copy must reach the caller intact');
  assert.equal(result.errorCode, 'refresh_unverified');
});

let browser;
test.before(async () => {
  browser = await chromium.launch({ headless: true }).catch(() => chromium.launch({ channel: 'chrome', headless: true }));
});
test.after(async () => { await browser?.close(); });

const button = (label = 'Copy') => `<button aria-label="${label}" data-testid="action-bar-copy" class="native-copy">Copy</button>`;
const wrappers = {
  claude: content => `<div data-testid="assistant-message">${content}</div>`,
  chatgpt: content => `<div data-turn-key="fixture"><div data-conversation-role="assistant">reply</div>${content}</div>`,
  gemini: content => `<model-response><message-content>reply</message-content>${content}</model-response>`,
};
const controls = {
  claude: button(),
  chatgpt: '<button aria-label="Copy" data-testid="copy-turn-action-button" class="native-copy">Copy</button>',
  gemini: '<copy-button>' + button() + '</copy-button>',
};

async function withPage(provider, html, run) {
  const context = await browser.newContext({ offline: true });
  await context.route('**/*', route => route.abort());
  try {
    const page = await context.newPage();
    await page.setContent(html);
    const m = load('src/adapters/' + provider + '.js', { overrides: { '../utils/logger': logger() }, expose: `module.exports = ${provider.toUpperCase()}_REPLY_SCOPE;` });
    await run(page, m.api);
  } finally { await context.close(); }
}

for (const provider of ['claude', 'chatgpt', 'gemini']) {
  test(`CORE06 DOM control ${provider}: latest native Copy resolves and remains in its turn`, async () => {
    await withPage(provider, wrappers[provider](controls[provider]), async (page, scope) => {
      assert.equal((await readLatestTurnState(page, scope)).copyAttached, true);
      const locator = await locateLatestTurnCopyButton(page, scope);
      assert.equal(await locator.count(), 1);
      assert.equal(await locator.evaluate(el => !!el.closest('pre,code')), false);
    });
  });
  test(`CORE06 target DOM ${provider}: code-block Copy cannot masquerade as reply Copy`, async () => {
    const codeCopy = '<pre><code>example ' + controls[provider] + '</code></pre>';
    await withPage(provider, wrappers[provider](codeCopy), async (page, scope) => {
      assert.equal((await readLatestTurnState(page, scope)).copyAttached, false);
      assert.equal(await (await locateLatestTurnCopyButton(page, scope)).count(), 0);
    });
  });
  test(`CORE06 DOM control ${provider}: previous-turn and global controls cannot satisfy a new turn`, async () => {
    const html = wrappers[provider](controls[provider]) + wrappers[provider]('pending') + controls[provider];
    await withPage(provider, html, async (page, scope) => {
      assert.equal((await readLatestTurnState(page, scope)).copyAttached, false);
      assert.equal(await (await locateLatestTurnCopyButton(page, scope)).count(), 0);
    });
  });
}

const test = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { load, logger } = require('./core06-fixtures/harness');
const { readLatestTurnState, locateLatestTurnCopyButton } = require('../src/adapters/copyCapture');

// Constructed from r1 structural metadata, not copied provider HTML or a live run.
const structures = {
  claude: {
    composer: '[data-testid="chat-input"][contenteditable="true"]',
    input: '<div data-testid="chat-input" role="textbox" contenteditable="true"></div>',
    send: '<button type="button" data-testid="chat-input-send" aria-label="Send message">Send</button>',
    user: '<div class="group min-w-0"><div data-testid="user-message">PAYLOAD</div><button data-testid="user-message-retry">Retry</button></div>',
    assistant: '<div><div data-testid="assistant-message">reply<pre><code><button aria-label="Copy">code</button></code></pre></div><div data-testid="message-actions" role="toolbar"><button id="answer-copy" aria-label="Copy">Copy</button></div></div>',
  },
  chatgpt: {
    composer: 'div[contenteditable="true"][role="textbox"]',
    input: '<div role="textbox" contenteditable="true"></div>',
    send: '<button type="button" aria-label="Send prompt">Send</button>',
    user: '<div data-user-message-bubble>PAYLOAD</div>',
    assistant: '<div data-turn-key="fixture"><div class="group/user-message"><button aria-label="Copy user message">User copy</button></div><h4 data-conversation-role="assistant" hidden>Assistant</h4><div>reply<pre><code><button aria-label="Copy">code</button></code></pre></div><div class="turn-action-controls"><button id="answer-copy" aria-label="Copy">Copy</button></div></div>',
  },
  gemini: {
    composer: 'rich-textarea .ql-editor[contenteditable="true"]',
    input: '<rich-textarea><div class="ql-editor" contenteditable="true"></div><div class="ql-clipboard" contenteditable="true" hidden></div></rich-textarea>',
    send: '<button type="button" aria-label="Send message">Send</button>',
    user: '<user-query>PAYLOAD</user-query>',
    assistant: '<model-response><message-content>reply<pre><code><copy-button><button aria-label="Copy">code</button></copy-button></code></pre></message-content><message-actions><copy-button><button id="answer-copy" aria-label="Copy">Copy</button></copy-button></message-actions></model-response>',
  },
};
let browser;
test.before(async () => { browser = await chromium.launch({ headless: true }).catch(() => chromium.launch({ channel: 'chrome', headless: true })); });
test.after(async () => { await browser?.close(); });
async function withPage(html, run) {
  const context = await browser.newContext({ offline: true });
  await context.route('**/*', route => route.abort());
  try { const page = await context.newPage();await page.setContent(html);await run(page); }
  finally { await context.close(); }
}
for (const [provider, shape] of Object.entries(structures)) {
  test(`CORE06 r1 DOM ${provider}: native answer Copy excludes code and user controls`, async () => {
    await withPage(shape.user.replace('PAYLOAD', 'old user') + shape.assistant, async page => {
      const m = load('src/adapters/' + provider + '.js', { overrides: { '../utils/logger': logger() },
        expose: `module.exports = ${provider.toUpperCase()}_REPLY_SCOPE;` });
      assert.equal((await readLatestTurnState(page, m.api)).copyAttached, true);
      assert.equal(await (await locateLatestTurnCopyButton(page, m.api)).getAttribute('id'), 'answer-copy');
    });
  });
}

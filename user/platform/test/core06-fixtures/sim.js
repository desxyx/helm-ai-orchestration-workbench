// Offline provider-page simulator for Stage 3. A real headless Chromium page renders a
// synthetic provider DOM (selectors mirror the adapters, not live provider HTML) whose
// lifecycle runs on the fixture's simulated clock. The real adapter, send transaction,
// completion, capture and round runner execute against it; only time, clipboard and the
// session store are boundaries. Nothing here opens a provider URL or a real profile.
const path = require('node:path');
const { chromium } = require('playwright');
const { load, clock, logger } = require('./harness');

const ROOT = path.resolve(__dirname, '../..');

let browserPromise = null;
function sharedBrowser() {
  if (!browserPromise) {
    browserPromise = chromium.launch({ headless: true })
      .catch(() => chromium.launch({ channel: 'chrome', headless: true }));
  }
  return browserPromise;
}
async function closeSharedBrowser() {
  if (browserPromise) (await browserPromise).close();
  browserPromise = null;
}

// Runs inside the page. Builds the provider DOM and a timer queue driven by advance().
function installSim(cfg) {
  const log = { paste: 0, pasteKeys: [], editorClicks: 0, send: 0, copy: 0, copyAt: [], revealMoves: 0, replaceAt: null, hover: 0, scroll: 0, busyHover: 0, busyScroll: 0, clipboardWrites: 0, clipboardReads: 0 };
  const timers = [];
  const sim = { t: 0, log, clipboard: 'unrelated clipboard', replies: [], cfg };
  sim.at = (ms, fn) => timers.push({ at: sim.t + ms, fn });
  sim.advance = (ms) => {
    const end = sim.t + ms;
    for (;;) {
      timers.sort((a, b) => a.at - b.at);
      if (!timers.length || timers[0].at > end) break;
      const next = timers.shift();
      sim.t = next.at;
      next.fn();
    }
    sim.t = end;
  };
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
    writeText: async (text) => { log.clipboardWrites++; if (cfg.clipboardWriteFails) throw new Error('denied'); sim.clipboard = text; },
    readText: async () => {
      log.clipboardReads++;
      if (cfg.clipboardReadFails) throw new Error('denied');
      return cfg.clipboardReadOther ? 'other agent text' : sim.clipboard;
    },
  } });
  // Pointer movement is counted separately while the provider shows Stop (BUSY).
  let stopNode = null;
  // Layout changes fire synthetic mouse events under a stationary pointer; only an actual
  // coordinate change counts as movement.
  let pointer = null;
  let movedNow = false;
  const pointerMoved = () => movedNow;
  document.addEventListener('mouseover', () => log.hover++, true);
  document.addEventListener('mousemove', (event) => {
    movedNow = !pointer || pointer.x !== event.clientX || pointer.y !== event.clientY;
    pointer = { x: event.clientX, y: event.clientY };
    if (movedNow && event.target instanceof Element && event.target.closest('[data-reply]') && !event.target.closest('button')) log.revealMoves++;
    if (movedNow && stopNode && !stopNode.hidden) log.busyHover++;
  }, true);
  // Page or conversation scrolling counts; the composer's own internal scroll (provider
  // layout when it clears the editor) is not an adapter action.
  window.addEventListener('scroll', (event) => {
    log.scroll++;
    const inComposer = event.target instanceof Element && event.target.closest('.rounded-composer, form, .input-area');
    if (!inComposer && stopNode && !stopNode.hidden) log.busyScroll++;
  }, true);

  const p = cfg.provider;
  const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const esc = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const history = el(p === 'claude' ? '<main id="history"></main>' : p === 'chatgpt' ? '<main id="history"><div id="thread"></div></main>' : '<main id="history"><div id="chat"></div></main>');
  document.body.append(history);
  let list = null;
  const ensureList = () => {
    if (list) return list;
    list = p === 'claude' ? el('<div data-testid="transcript-list"></div>') : history.firstElementChild;
    if (p === 'claude') history.append(list);
    return list;
  };
  let key = 0;
  const copyButton = () => p === 'claude' ? '<div data-testid="message-actions"><button aria-label="Copy">Copy</button></div>'
    : p === 'chatgpt' ? '<div><button data-testid="copy-turn-action-button" aria-label="Copy">Copy</button></div>'
    : '<copy-button><button aria-label="Copy">Copy</button></copy-button>';
  const userNode = (text, file) => {
    key++;
    if (p === 'claude') return el(file ? `<div data-testid="transcript-row" data-index="${key}"><div data-testid="file-thumbnail">Pasted text</div></div>`
      : `<div data-testid="transcript-row" data-index="${key}"><div data-testid="user-message">${esc(text)}</div></div>`);
    if (p === 'chatgpt') return el(`<section data-turn-key="u${key}"><div class="group/user-message">${file ? '<span class="group/resource-card">file</span>' : `<div data-user-message-bubble>${esc(text)}</div>`}</div></section>`);
    return el(`<div id="q${key}"><user-query>${file ? '<div class="file-preview-container">file</div>' : esc(text)}</user-query></div>`);
  };
  const assistantNode = (text, done) => {
    key++;
    const body = `<span class="reply-text">${esc(text)}</span>`;
    const node = p === 'claude' ? el(`<div data-testid="transcript-row" data-index="${key}"><div><div data-testid="assistant-message">${body}</div>${done ? copyButton() : ''}</div></div>`)
      : p === 'chatgpt' ? el(`<section data-turn-key="a${key}"><div data-conversation-role="assistant"><div data-message-author-role="assistant">${body}</div></div>${done ? copyButton() : ''}</section>`)
      : el(`<model-response><message-content>${body}</message-content>${done ? copyButton() : ''}</model-response>`);
    node.dataset.reply = text;
    return node;
  };
  const turnOf = (node) => p === 'claude' ? node.querySelector('[data-testid="assistant-message"]').parentElement : node;
  const finish = (node, text) => {
    node.dataset.reply = text;
    node.querySelector('.reply-text').textContent = text;
    if (!node.querySelector('button[aria-label="Copy"]')) turnOf(node).insertAdjacentHTML('beforeend', copyButton());
    if (cfg.copyNeedsHover || cfg.copyAttachOnHover) {
      // Revealed only by real pointer movement onto the reply (not layout-triggered events).
      const button = node.querySelector('button[aria-label="Copy"]');
      const holder = button.parentElement;
      if (cfg.copyAttachOnHover) button.remove(); else button.style.display = 'none';
      let last = null;
      node.addEventListener('mousemove', (event) => {
        const moved = !last || last.x !== event.clientX || last.y !== event.clientY;
        last = { x: event.clientX, y: event.clientY };
        if (!moved || !pointerMoved(event)) return;
        if (cfg.copyAttachOnHover) { if (!button.isConnected) holder.append(button); } else button.style.display = '';
      });
    }
  };
  document.addEventListener('click', (event) => {
    const button = event.target.closest('button[aria-label="Copy"]');
    if (!button) return;
    log.copy++;
    log.copyAt.push(sim.t);
    const owner = button.closest('[data-reply]');
    sim.clipboard = owner ? owner.dataset.reply : 'unknown';
    // A provider-style transient label inside the reply, outside the control.
    if (cfg.copiedLabel && owner) owner.insertAdjacentHTML('beforeend', '<span class="copied-hint">Copied</span>');
  }, true);

  if (cfg.extraEditorInHistory) {
    const turn = userNode('editable old message');
    (turn.querySelector('user-query') || turn).insertAdjacentHTML('beforeend', p === 'chatgpt' ? '<div contenteditable="true" role="textbox">edit box</div>'
      : p === 'claude' ? '<div data-testid="chat-input" contenteditable="true">edit box</div>'
        : '<rich-textarea><div class="ql-editor" contenteditable="true">edit box</div></rich-textarea>');
    ensureList().append(turn);
  }
  for (let i = 0; i < (cfg.history || 0); i++) {
    ensureList().append(userNode(cfg.oldQuestionText ?? `old question ${i}`));
    ensureList().append(assistantNode(cfg.oldReply ? cfg.oldReply(i) : `old answer ${i}`, true));
  }

  const composer = el(p === 'claude'
    ? '<div class="rounded-composer"><div><div data-testid="chat-input" contenteditable="true"></div></div><div id="cards"></div><div id="send-wrap"><button data-testid="chat-input-send" disabled>Send</button></div><button data-testid="stop-button" hidden>Stop</button></div>'
    : p === 'chatgpt'
      ? '<form><div><div><div contenteditable="true" role="textbox"></div></div></div><div id="cards"></div><button type="button" aria-label="Send prompt" hidden>Send</button><button type="button" data-testid="stop-button" hidden>Stop</button></form>'
      : '<div class="input-area"><rich-textarea><div class="ql-editor" contenteditable="true"></div></rich-textarea><div id="cards"></div><button aria-label="Send message" disabled>Send</button><button aria-label="Stop response" hidden>Stop</button></div>');
  document.body.append(composer);
  const editor = composer.querySelector('[contenteditable="true"]');
  // Provider editors scroll internally (bounded height); the page does not grow with the draft.
  editor.style.maxHeight = '200px';
  editor.style.overflow = 'auto';
  const cards = composer.querySelector('#cards');
  let send = composer.querySelector(p === 'claude' ? '[data-testid="chat-input-send"]' : p === 'chatgpt' ? '[aria-label="Send prompt"]' : '[aria-label="Send message"]');
  const stop = composer.querySelector(p === 'gemini' ? '[aria-label="Stop response"]' : '[data-testid="stop-button"]');
  stopNode = stop;
  const cardHtml = p === 'claude' ? '<div data-testid="file-thumbnail"><button>Pasted text</button><button aria-label="Remove">x</button></div>'
    : p === 'chatgpt' ? '<span class="composer-attachment-surface">file</span>' : '<div class="file-preview-container">file</div>';
  if (cfg.missingSend) send.remove();
  if (cfg.dupSend) send.after(send.cloneNode(true));
  editor.addEventListener('click', () => log.editorClicks++);
  if (cfg.leftoverDraft) editor.textContent = 'leftover draft';
  if (cfg.leftoverCard) cards.insertAdjacentHTML('beforeend', cardHtml);
  if (cfg.stopBeforePaste) stop.hidden = false;

  const hasContent = () => Boolean(editor.innerText.trim()) || cards.children.length > 0;
  const updateSend = () => {
    const ready = !cfg.disabledForever && hasContent() && !cards.querySelector('[aria-busy="true"]');
    if (p === 'chatgpt') send.hidden = !ready; else send.disabled = !ready;
    if (p === 'claude') {
      const wrap = composer.querySelector('#send-wrap');
      const hide = cfg.hiddenSend && cards.children.length > 0;
      wrap.inert = hide;
      wrap.style.visibility = hide ? 'hidden' : '';
    }
  };
  updateSend();

  editor.addEventListener('keydown', (event) => {
    if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'v') return;
    event.preventDefault();
    log.paste++;
    log.pasteKeys.push(event.metaKey ? 'Meta' : 'Control');
    const text = sim.clipboard;
    if (cfg.attachment && text.length >= (cfg.attachThreshold || 2000)) {
      for (let i = 0; i < (cfg.multiCards ? 2 : 1); i++) {
        const card = el(cardHtml);
        if (cfg.cardError) card.insertAdjacentHTML('beforeend', '<span role="alert">upload failed</span>');
        if (cfg.cardBusyMs) {
          card.setAttribute('aria-busy', 'true');
          sim.at(cfg.cardBusyMs, () => { card.removeAttribute('aria-busy'); updateSend(); });
        }
        cards.append(card);
      }
    } else if (cfg.autoformatDash) {
      editor.innerHTML = '';
      for (const line of text.split('\n')) {
        const item = /^[ \t]*-[ \t]+/.exec(line);
        const node = document.createElement(item ? 'li' : 'p');
        node.textContent = item ? line.slice(item[0].length) : line;
        editor.append(node);
      }
    } else {
      editor.innerText = editor.innerText + text;
    }
    updateSend();
    if (cfg.stopAfterPasteMs !== undefined) sim.at(cfg.stopAfterPasteMs, () => { stop.hidden = false; });
  });
  editor.addEventListener('input', updateSend);

  send.addEventListener('click', () => {
    log.send++;
    if (cfg.clickNoop) return;
    const file = cards.children.length > 0;
    const text = editor.innerText;
    const reply = cfg.reply || `native reply ${log.send}`;
    sim.at(cfg.userDelayMs ?? 50, () => {
      const root = ensureList();
      editor.textContent = '';
      cards.replaceChildren();
      updateSend();
      if (cfg.replaceComposer) {
        // The provider re-mounts the composer after the first Send of a new chat.
        const clone = composer.cloneNode(true);
        composer.replaceWith(clone);
      }
      if (cfg.virtualize) root.querySelectorAll(':scope > *').forEach((node) => node.remove());
      if (cfg.remountOnly) {
        // All history unmounts; only the last old pair comes back as new nodes.
        const kids = Array.from(root.children);
        kids.forEach((node) => node.remove());
        kids.slice(-2).forEach((node) => root.append(node.cloneNode(true)));
      }
      if (cfg.remountOldPair) {
        // Re-mount the last old user/assistant pair as new nodes (same content).
        const kids = Array.from(root.children);
        kids.slice(-2).forEach((node) => { const clone = node.cloneNode(true); node.replaceWith(clone); });
      }
      if (cfg.netZero) root.firstElementChild?.remove();
      if (cfg.oldLastFallback) {
        const assistants = Array.from(root.querySelectorAll('[data-reply]'));
        assistants.at(-1)?.remove();
      } else if (!cfg.noUserTurn) {
        root.append(userNode(text, file));
      }
    });
    if (cfg.noStart || cfg.oldLastFallback) return;
    const start = cfg.startDelayMs ?? 100;
    const streamMs = cfg.streamMs ?? 2000;
    let node = null;
    const place = (done) => {
      const root = ensureList();
      if (cfg.reuseNode) {
        node = root.querySelector('[data-reply]');
        node.remove();
        const oldCopy = node.querySelector('button[aria-label="Copy"]');
        (p === 'chatgpt' ? oldCopy?.parentElement : oldCopy?.closest('copy-button, [data-testid="message-actions"]'))?.remove();
        node.querySelector('.reply-text').textContent = done ? reply : '...';
      } else {
        node = assistantNode(done ? reply : '...', false);
      }
      root.append(node);
      sim.replies.push(node);
    };
    if (cfg.fast) {
      sim.at(start, () => { place(true); finish(node, reply); });
      return;
    }
    sim.at(start, () => { stop.hidden = false; place(false); });
    if (cfg.neverStops) return;
    sim.at(start + streamMs, () => {
      stop.hidden = true;
      if (cfg.noCopy) { node.querySelector('.reply-text').textContent = reply; return; }
      finish(node, reply);
      if (cfg.rerenderCopyMs) sim.at(cfg.rerenderCopyMs, () => {
        const old = node.querySelector('button[aria-label="Copy"]');
        old.replaceWith(old.cloneNode(true));
      });
      if (cfg.replaceReplyMs) sim.at(cfg.replaceReplyMs, () => {
        const other = assistantNode(cfg.replaceText || 'native reply X', true);
        node.replaceWith(other);
        log.replaceAt = sim.t;
      });
      if (cfg.replaceOnHover) {
        let last = null;
        node.addEventListener('mousemove', (event) => {
          const moved = !last || last.x !== event.clientX || last.y !== event.clientY;
          last = { x: event.clientX, y: event.clientY };
          if (!moved || !pointerMoved(event) || !node.isConnected) return;
          node.replaceWith(assistantNode(cfg.replaceText || 'native reply X', true));
          log.replaceAt = sim.t;
        });
      }
      if (cfg.secondAssistantMs) sim.at(cfg.secondAssistantMs, () => {
        ensureList().append(assistantNode('second reply', true));
      });
      if (cfg.switchTargetMs) sim.at(cfg.switchTargetMs, () => {
        ensureList().append(userNode('someone else'));
        const other = assistantNode('other reply', true);
        ensureList().append(other);
      });
    });
  });
  window.__sim = sim;
}

// Loads the real modules into one simulated-time realm. Every sleep advances both the
// fixture clock and the page timeline, so provider events and adapter polling interleave
// deterministically.
async function simulate(provider, cfg = {}, { platform = process.platform, configure = null } = {}) {
  const browser = await sharedBrowser();
  const context = await browser.newContext({ offline: true });
  await context.route('**/*', (route) => route.abort());
  const page = await context.newPage();
  await page.setContent('<!doctype html><html><body></body></html>');
  await page.evaluate(installSim, { provider, ...cfg, oldReply: undefined });
  if (cfg.oldReply) {
    await page.evaluate((texts) => { document.querySelectorAll('[data-reply]').forEach((node, i) => {
      node.dataset.reply = texts[i]; node.querySelector('.reply-text').textContent = texts[i];
    }); }, Array.from({ length: cfg.history || 0 }, (_, i) => cfg.oldReply(i)));
  }

  const time = clock();
  const logs = logger();
  const tick = async (ms) => { await page.evaluate((value) => window.__sim.advance(value), ms).catch(() => null); };
  const sleep = async (ms) => { time.advance(ms); await tick(ms); };
  const timeModule = { sleep, randomBetween: () => 0, nowIso: () => new time.Date().toISOString() };
  const fakeTimeout = (fn, ms) => { time.advance(ms || 0); tick(ms || 0).then(fn); return 1; };
  const config = structuredClone(require(path.join(ROOT, 'config')));
  config.injection.promptPastePauseMs = 0;
  if (configure) configure(config);
  const errors = require(path.join(ROOT, 'src/utils/errors'));
  const predicates = require(path.join(ROOT, 'src/utils/predicates'));
  const clipboardLock = require(path.join(ROOT, 'src/utils/clipboardLock'));
  const globals = { process: { platform, env: {} }, setTimeout: fakeTimeout };
  const prompt = load('src/utils/prompt.js', { time, globals, overrides: {
    '../../config': config, './errors': errors, './time': timeModule, './clipboardLock': clipboardLock } }).api;
  const copy = load('src/adapters/copyCapture.js', { time, globals, overrides: {
    '../utils/clipboardLock': clipboardLock } }).api;
  const completion = load('src/utils/completion.js', { time, globals, overrides: {
    './time': timeModule, './logger': logs } }).api;
  const transaction = load('src/utils/composerTransaction.js', { time, globals, overrides: {
    './errors': errors, './logger': logs, './time': timeModule, './prompt': prompt,
    '../adapters/copyCapture': copy } }).api;
  const adapter = load(`src/adapters/${provider}.js`, { time, globals, overrides: {
    '../../config': config, '../utils/errors': errors, '../utils/logger': logs,
    '../utils/completion': completion, './copyCapture': copy, '../utils/prompt': prompt,
    '../utils/time': timeModule, '../utils/composerTransaction': transaction } }).api;
  const store = require(path.join(ROOT, 'src/storage/sessionStore'));
  const persisted = [];
  const runner = load('src/orchestrator/roundRunner.js', { time, globals, overrides: {
    '../storage/sessionStore': { buildRound: store.buildRound, appendRound: (_s, round) => persisted.push(round) },
    '../utils/logger': logs, '../utils/errors': errors, '../utils/predicates': predicates } }).api;

  const run = async (prompt, { session = { rounds: [] }, roundNumber = 1 } = {}) => {
    const round = await runner.runRound({ adapter, page, prompt, session, roundNumber, agentName: provider, openPage: false });
    return round.replies[0];
  };
  const actions = () => page.evaluate(() => ({ ...window.__sim.log }));
  const dom = (fn, arg) => page.evaluate(fn, arg);
  const close = () => context.close();
  return { page, adapter, run, actions, dom, logs, time, persisted, close, transaction };
}

module.exports = { simulate, closeSharedBrowser, sharedBrowser };

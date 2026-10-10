// Adapter transaction tests execute real sendMessage/waitForMessageSubmission and
// real injectPrompt. DOM snapshots, settled-upload observations and time are local
// boundary doubles. This is not a live selector or clipboard claim.
const { load, clock, logger } = require('./harness');

function transportFixture(provider, { ackTurns = 1, ackText = null, attachmentCount = 0, settle = true, missingSend = false, disabledSend = false, corruptHead = false, forceFullPaste = false, platform = process.platform, ackOn = null, windowsInjection = null, uploadSettled = true, attachmentCountVerified = true, sendMatches = 1 } = {}) {
  const time = clock();
  const logs = logger();
  const events = [];
  const state = { input: '', clipboard: '', chips: 0, users: 0, userText: '', assistantCount: 0, submitted: false, settle, attachmentCount, attachmentCountVerified, hideChips: false };
  const config = structuredClone(require('../../config'));
  config.injection.keystrokeDelayMs = 0;
  config.injection.promptPastePauseMs = 0;
  config.diagnostics.forceFullPaste = forceFullPaste;
  if (windowsInjection) Object.assign(config.claude.injection.windows, windowsInjection);
  const submit = label => {
    events.push(['submit', label]);
    if (ackTurns && (!ackOn || label === ackOn)) {
      state.users += ackTurns;
      state.userText = ackText === null ? state.input : ackText;
      state.input = '';
      state.submitted = true;
    }
  };
  const input = {
    click: async () => events.push(['focus-click']), focus: async () => events.push(['focus']),
    innerText: async () => state.input, textContent: async () => state.input,
    fill: async value => { events.push(['replace', value]); state.input = value; },
  };
  const send = {
    isVisible: async () => !missingSend, isEnabled: async () => !disabledSend,
    evaluate: async () => !missingSend && !disabledSend, // actionability DOM observation boundary
    click: async options => submit(options?.force ? 'force-click' : 'click'),
    scrollIntoViewIfNeeded: async () => events.push(['send-scroll']),
  };
  const page = {
    url: () => 'about:blank',
    locator: selector => {
      const stop = /stop|streaming/i.test(selector);
      const remove = /remove/i.test(selector);
      const target = stop ? { isVisible: async () => false, isEnabled: async () => false }
        : remove ? { click: async () => { events.push(['remove-chip']); state.chips = Math.max(0, state.chips - 1); } } : send;
      return { first: () => target, last: () => target, count: async () => missingSend ? 0 : sendMatches };
    },
    evaluate: async (fn, value) => {
      if (String(fn).includes('clipboard.writeText')) { state.clipboard = value; events.push(['clipboard', value]); return; }
      if (String(fn).includes('clipboard.readText')) return state.clipboard;
      return state.submitted ? 'stop_button_visible' : 'none';
    },
    keyboard: {
      type: async value => { events.push(['type', value]); state.input += value; },
      insertText: async value => { events.push(['insertText', value]); state.input += value; },
      press: async key => {
        if (key.endsWith('+V')) {
          events.push(['paste', state.clipboard]);
          if (state.attachmentCount) state.chips += state.attachmentCount;
          else state.input += state.clipboard;
          if (corruptHead) state.input = 'BROKEN_HEAD_FIXTURE';
        } else if (key === 'Enter' && provider === 'claude') {
          // config.claude.injection.submitWithEnter:false: plain Enter is a newline.
          events.push(['key', key]); state.input += '\n';
        } else if (/Enter$/.test(key) && key !== 'Shift+Enter') submit(key);
        else {
          events.push(['key', key]);
          if (key === 'Shift+Enter') state.input += '\n';
          if (key === 'Backspace' || key === 'Delete') { events.push(['replace', key]); state.input = ''; }
        }
      },
    },
  };
  const globals = { process: { platform, env: {} } };
  const prompt = load('src/utils/prompt.js', { time, globals, overrides: { '../../config': config, './time': { sleep: time.sleep, randomBetween: () => 0 } } }).api;
  const promptBoundary = { ...prompt,
    findEditableInput: async () => ({ locator: input, selector: 'fixture-composer' }),
    readInputText: async () => state.input,
    countAttachmentChips: async () => state.hideChips ? 0 : state.chips,
    measureComposerExtras: async () => state.hideChips ? 0 : state.chips * 300,
    waitForPasteSettle: async (_page, _input, _expected, options) => {
      events.push(['settle-options', { timeoutMs: options.timeoutMs, stableForMs: options.stableForMs }]);
      return { ready: state.settle && await options.isSendReady(), mode: !state.hideChips && state.chips ? 'attachment' : 'inline',
        grew: state.chips > 0, observedInput: state.input };
    },
  };
  const m = load('src/adapters/' + provider + '.js', { time, globals, overrides: {
    '../../config': config, '../utils/logger': logs, '../utils/prompt': promptBoundary,
    '../utils/composerTransaction': { ...require('../../src/utils/composerTransaction'),
      captureUserTurnBaseline: async () => {
        const originalUsers = state.users;
        const normalize = value => String(value || '').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
        return { verified: true, dispose: async () => {}, read: async ({expected,mode}) => {
          const head = normalize(Array.from(expected).slice(0,80).join(''));
          const candidates = Array.from({length: Math.max(0,state.users-originalUsers)},()=>({
            headMatches: normalize(state.userText).includes(head), readable: normalize(state.userText).length >= normalize(expected).length*0.95,
            attachmentCount: state.chips, attachmentCountVerified: state.chips===1,
          }));
          return { candidates, ambiguous: false };
        }};
      } },

    '../utils/time': { sleep: time.sleep },
  } });
  // Replace DOM reads only. Keep actual acknowledgement/ready/submit decisions.
  m.context.fixtureTurns = {
    user: async () => ({ selector: provider === 'chatgpt'
      ? '[data-turn-key] [class~="group/user-message"]:not([class~="group/user-message"] [class~="group/user-message"])'
      : provider === 'claude' ? 'div.group.min-w-0:has(button[data-testid="user-message-retry"]):not(:has([data-testid="assistant-message"]))' : 'user-query', count: state.users, attachmentCount: state.chips, attachmentCountVerified: true, fileOnly: !state.userText.trim(), attachmentIdentity: 'fixture-file', locator: { innerText: async () => state.userText, textContent: async () => state.userText } }),
    assistant: async () => ({ count: state.assistantCount, locator: null }),
    order: async () => ({ lastUserText: state.userText, assistantFollowsUser: false }),
  };
  m.evaluate('getLatestAssistantMessage = fixtureTurns.assistant;');
  // New provider snapshot boundary: synthetic positive upload/cardinality facts
  // remain distinct from the r1 sheet's UNKNOWN live fields. No decision stub.
  if (m.evaluate('typeof getLatestUserMessage') === 'function') m.evaluate('getLatestUserMessage = fixtureTurns.user;');
  m.context.fixtureAttachment = async () => ({ count: state.hideChips ? 0 : state.chips, countVerified: state.attachmentCountVerified, uploadSettled, identity: 'fixture-file', cardToken: 1 });
  if (m.evaluate('typeof readComposerAttachmentState') === 'function') m.evaluate('readComposerAttachmentState = fixtureAttachment;');
  if (provider === 'claude') m.evaluate('readTurnOrder = fixtureTurns.order;');
  async function run(text) {
    let error = null;
    try { await m.api.sendMessage(page, text); } catch (e) { error = e; }
    return result(error);
  }
  async function runSubmission(text) {
    // No injection here: characterize the real submit/key decision on a prepared composer.
    state.input = text;
    const wait = m.evaluate('waitForMessageSubmission');
    let error = null;
    try { await wait(page, input, { url: page.url(), userTurnCount: 0, assistantTurnCount: 0 }); }
    catch (e) { error = e; }
    return result(error);
  }
  function result(error) {
    const firstPaste = events.findIndex(([name]) => name === 'paste');
    const metrics = {
      provider, clipboardPayloads: events.filter(([n]) => n === 'clipboard').length,
      pastes: events.filter(([n]) => n === 'paste').length,
      submits: events.filter(([n]) => n === 'submit').length,
      typedChars: events.filter(([n]) => n === 'type').reduce((sum, [, text]) => sum + text.length, 0),
      clearsAfterPaste: firstPaste < 0 ? 0 : events.slice(firstPaste + 1).filter(([n]) => n === 'clear').length,
      clears: events.filter(([n]) => n === 'clear').length,
      chipRemovals: events.filter(([n]) => n === 'remove-chip').length,
      textReplacements: events.filter(([n]) => n === 'replace').length,
      attachments: state.chips, userTurns: state.users, errorCode: error?.code || null,
    };
    return { error, metrics, events, state, logs };
  }
  return { run, runSubmission, page, input, events, state, config };
}

module.exports = { transportFixture };

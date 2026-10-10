// Offline boundary adapter. Execute the actual source in an isolated CommonJS VM;
// replace filesystem/browser side effects, never the function being asserted.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const ROOT = path.resolve(__dirname, '../..');

function clock() {
  let now = 1700000000000;
  class FixtureDate extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  return {
    Date: FixtureDate,
    now: () => now,
    advance: (ms) => { now += ms; },
    sleep: async (ms) => { now += ms; },
    setTimeout: (fn, ms) => { now += ms; queueMicrotask(fn); return 1; },
  };
}

function logger() {
  const lines = [];
  return { lines, ...Object.fromEntries(['info', 'warn', 'error', 'stage'].map(name =>
    [name, (...args) => lines.push(args.join(' '))])) };
}

function load(relative, { overrides = {}, expose = '', cutBefore = '', remove = '', globals = {}, time = clock() } = {}) {
  const filename = path.join(ROOT, relative);
  let source = fs.readFileSync(filename, 'utf8');
  if (cutBefore) {
    assert.ok(source.includes(cutBefore), `fixture cut point missing: ${relative}`);
    source = source.slice(0, source.indexOf(cutBefore));
  }
  if (remove) {
    assert.equal(source.split(remove).length, 2, 'expected one side-effect call');
    source = source.replace(remove, '/* offline fixture: startup side effect omitted */');
  }
  const realRequire = createRequire(filename);
  const context = vm.createContext({
    module: { exports: {} }, exports: {}, __dirname: path.dirname(filename), __filename: filename,
    require: name => Object.hasOwn(overrides, name) ? overrides[name] : realRequire(name),
    console, process: { platform: process.platform, env: {} }, Buffer, URL,
    Date: time.Date, setTimeout: time.setTimeout, clearTimeout() {}, ...globals,
  });
  vm.runInContext(source + '\n' + expose, context, { filename });
  return { api: context.module.exports, context, time,
    evaluate: code => vm.runInContext(code, context, { filename: filename + ':fixture' }) };
}

function roundFixture() {
  const logs = logger();
  const persisted = [];
  // buildRound is the real pure storage formatter; append is the disk boundary.
  const store = require('../../src/storage/sessionStore');
  const m = load('src/orchestrator/roundRunner.js', { overrides: {
    '../utils/logger': logs,
    '../storage/sessionStore': { buildRound: store.buildRound, appendRound: (_session, round) => persisted.push(round) },
  } });
  async function run({ reason = 'stable', content = 'native Copy result', captureError = null, sendError = null, session = { rounds: [] } } = {}) {
    const events = [];
    const adapter = {
      open: async () => { throw Error('live navigation forbidden'); },
      isReady: async () => true,
      sendMessage: async () => { events.push('send'); if (sendError) throw sendError; },
      waitForCompletion: async () => ({ completed: !['timeout', 'stalled', 'error'].includes(reason), reason }),
      captureLastReply: async () => { events.push('copy'); if (captureError) throw captureError; return content; },
    };
    const round = await m.api.runRound({ adapter, page: {}, prompt: 'fixture prompt', session, roundNumber: 2, agentName: 'claude', openPage: false });
    return { round, reply: round.replies[0], events, persisted, logs };
  }
  return { ...m, run, logs, persisted };
}

function serverFixture({ replies = [], capture = async () => 'native refreshed Copy', runReply = null, browserPage = { bringToFront: async () => {} }, staticFiles = null } = {}) {
  const logs = logger();
  const time = clock();
  const session = { sessionId: 'fixture-session', createdAt: new time.Date().toISOString(), rounds: [{ roundNumber: 2, replies: structuredClone(replies), summary: 'old round summary' }] };
  const writes = [];
  let opened = 0;
  const adapter = { captureLastReply: capture, open: async () => { opened += 1; } };
  const store = {
    loadSession: () => session, listSessions: () => [{ sessionId: session.sessionId, latestRoundNumber: 2 }],
    writeSession: value => writes.push(structuredClone(value)),
    createSession: () => ({ sessionId: 'fresh-fixture-session', rounds: [], createdAt: new time.Date().toISOString() }),
  };
  const unsafeFs = new Proxy({}, { get: (_o, name) => {
    // Additional read-only static-response boundary; no disk writes or live server.
    if (staticFiles && name === 'existsSync') return filename => Object.hasOwn(staticFiles, filename);
    if (staticFiles && name === 'readFileSync') return filename => {
      assert.ok(Object.hasOwn(staticFiles, filename), 'only supplied static fixture files may be read');
      return staticFiles[filename];
    };
    return () => { throw Error('filesystem action forbidden: ' + String(name)); };
  } });
  const m = load('server.js', { time, cutBefore: 'const server = http.createServer(', remove: 'ensureWebDataFiles();', overrides: {
    fs: unsafeFs, http: { createServer() { throw Error('UI service start forbidden'); } },
    './src/adapters/claude': adapter, './src/adapters/gemini': adapter, './src/adapters/chatgpt': adapter,
    './src/browser/playwrightManager': { launchBrowser: async () => ({ page: {}, context: {} }), closeBrowser: async () => {} },
    './src/storage/sessionStore': store, './src/storage/auditStore': { SAVE_TYPE_AUDIT: 'audit' },
    './src/utils/logger': logs,
    './src/orchestrator/roundRunner': { applyStaleSuspect: require('../../src/orchestrator/roundRunner').applyStaleSuspect, runRound: async () => {
      if (!runReply) throw Error('unexpected dispatch');
      return { roundNumber: 2, replies: [structuredClone(runReply)], metrics: {} };
    } },
  }, expose: `module.exports = { buildSummary, handleRefreshReply, handleNewSession, buildPromptPayload, normalizeRuntimeError, runAgent, serveStatic,
    getState: () => ({ activeSession, activeRun }),
    setState: (session, run) => { activeSession = session; activeRun = run; } };` });
  m.api.setState({ session, nextRoundNumber: 3, carriedSummary: 'preserved carry', browsers: Object.fromEntries(['claude', 'gemini', 'chatgpt'].map(id => [id, { page: browserPage }])) }, null);
  return { ...m, session, writes, logs, opened: () => opened };
}

function appFixture(replies = []) {
  const nodes = new Map();
  const calls = { posts: [], confirmations: [], listeners: [] };
  const node = id => {
    if (!nodes.has(id)) nodes.set(id, { value: '', textContent: '', innerHTML: '', hidden: false, disabled: false,
      classList: { add() {}, remove() {}, toggle() {} }, addEventListener: (event, fn) => calls.listeners.push({ id, event, fn }) });
    return nodes.get(id);
  };
  const m = load('public/app.js', { cutBefore: '$(' + '"send-button").addEventListener', globals: {
    // Interface binding only: production app.js receives this exact shared module
    // from serveStatic. Every frozen gate/override assertion stays unchanged.
    HELMReplyPredicates: require('../../src/utils/predicates'),
    document: { getElementById: node },
    window: { confirm: message => { calls.confirmations.push(message); return true; }, clearTimeout() {}, setTimeout() {} },
    fetch: async (url, options) => { calls.posts.push({ url, body: JSON.parse(options.body) }); return { ok: true, json: async () => ({}) }; },
  }, expose: `module.exports = { state, isReplyCaptured, areAllRepliesCaptured, getDispatchBlockReason, armManualDispatchOverride,
    isManualDispatchOverrideActive, canRefreshReply, getManualRefreshRemainingMs, dispatchPrompt, createNewSession, toggleSummaryAttachment,
    silenceRendering: () => { renderControls = () => {}; } };` });
  const state = m.api.state;
  state.activeSession = { sessionId: 'fixture-session', roundNumber: 3 };
  state.selectedSession = { sessionId: 'fixture-session', rounds: [{ roundNumber: 2, replies, summary: 'fixture summary' }] };
  state.selectedRoundNumber = 2;
  state.sessions = [{ sessionId: 'fixture-session', latestRoundNumber: 2 }];
  m.api.silenceRendering();
  return { ...m, nodes, node, calls, state };
}

const validReply = (agent = 'claude', extra = {}) => ({ agent, content: 'native reply for ' + agent, status: 'ok', completionReason: 'stable', errorCode: null, ...extra });
const allValid = () => ['gemini', 'claude', 'chatgpt'].map(id => validReply(id));
const timeoutText = '[capture timeout] claude reply was not captured before the provider copy button became available. Dispatch auto-unlocked by operator timeout policy.';

module.exports = { ROOT, clock, logger, load, roundFixture, serverFixture, appFixture, validReply, allValid, timeoutText };

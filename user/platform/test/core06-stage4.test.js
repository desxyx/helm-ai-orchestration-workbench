// Stage 4 usage repair: operator-uploaded attachments, manual Refresh as
// the operator-named reply, Shift override past a repeated summary, refresh commits that other
// writers cannot overwrite, and the carried summary after a refresh. Offline only: the page
// simulator for adapter paths, the VM server/app fixtures for orchestration.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { simulate, closeSharedBrowser } = require('./core06-fixtures/sim');
const { load, serverFixture, appFixture, validReply, allValid } = require('./core06-fixtures/harness');
const { isCaptured } = require('../src/utils/predicates');

test.after(closeSharedBrowser);
const PROVIDERS = ['claude', 'chatgpt', 'gemini'];
const LONG = 'def handler(x):\n    return x\n'.repeat(200);

async function scenario(provider, cfg, prompt) {
  const sim = await simulate(provider, cfg);
  try {
    const reply = await sim.run(prompt);
    return { reply, actions: await sim.actions(), logs: sim.logs.lines };
  } finally {
    await sim.close();
  }
}

function sent(result, { base, mode = 'inline' }) {
  assert.equal(result.reply.status, 'ok', JSON.stringify({ reply: result.reply, log: result.logs.slice(-4) }));
  assert.equal(result.reply.content, 'native reply 1');
  assert.equal(isCaptured(result.reply), true);
  assert.equal(result.actions.paste, 1);
  assert.equal(result.actions.send, 1);
  assert.equal(result.actions.copy, 1);
  assert.ok(result.logs.some((line) => line.includes(`send_clicked mode=${mode}`) && line.includes(`baseAttachments=${base}`)),
    result.logs.slice(-3).join('\n'));
}

function refused(result, field, { pastes }) {
  assert.equal(result.reply.status, 'error');
  assert.equal(result.reply.errorCode, 'send_uncertain');
  assert.equal(result.actions.paste, pastes);
  assert.equal(result.actions.send, 0);
  assert.equal(result.actions.copy, 0);
  assert.ok(result.logs.some((line) => line.includes(`"blockingField":"${field}"`)), result.logs.slice(-3).join('\n'));
}

// ---- A: attachments the operator uploaded before dispatch ----
for (const provider of PROVIDERS) {
  test(`S4-A ${provider}: no attachment (baseline N=0) sends`, async () => {
    sent(await scenario(provider, { history: 1 }, 'short prompt'), { base: 0 });
  });
  for (const n of [1, 2]) {
    test(`S4-A ${provider}: ${n} uploaded file(s) + short prompt sends once with the files`, async () => {
      sent(await scenario(provider, { history: 1, preAttached: n }, 'read the attached files'), { base: n });
    });
  }
  test(`S4-A ${provider}: an uploaded file still processing, then finished, sends once`, async () => {
    sent(await scenario(provider, { history: 1, preAttached: 1, preBusyMs: 1500 }, 'wait for the upload'), { base: 1 });
  });
  test(`S4-A ${provider}: an uploaded file that never finishes processing is never sent`, async () => {
    refused(await scenario(provider, { history: 1, preAttached: 1, preBusyMs: 600000 }, 'upload stuck'), 'composer.settled', { pastes: 1 });
  });
  test(`S4-A ${provider}: an uploaded file showing an error is never sent`, async () => {
    refused(await scenario(provider, { history: 1, preAttached: 1, preError: true }, 'upload failed'), 'attachment.error', { pastes: 1 });
  });
  test(`S4-A ${provider}: a paste that adds two cards beside an uploaded file is refused for that reason`, async () => {
    refused(await scenario(provider, { history: 1, preAttached: 1, attachment: true, multiCards: true }, LONG), 'attachment.exactlyOne', { pastes: 1 });
  });
  test(`S4-A ${provider}: a card disappearing during the paste (C<N) still sends, with a DIAG line`, async () => {
    const result = await scenario(provider, { history: 1, preAttached: 2, pasteDropsCard: true }, 'one card gone');
    sent(result, { base: 2 });
    assert.ok(result.logs.some((line) => line.includes('cards_decreased before=2 after=1')));
  });
  test(`S4-A ${provider}: leftover draft text beside an uploaded file still refuses before any paste`, async () => {
    const result = await scenario(provider, { history: 1, preAttached: 1, leftoverDraft: true }, 'next');
    refused(result, 'composer.initiallyEmpty', { pastes: 0 });
    assert.ok(result.logs.some((line) => line.includes('composer_not_empty textLength=') && line.includes('cards=1')));
  });
}
for (const provider of ['claude', 'chatgpt']) {
  test(`S4-A ${provider}: uploaded file + long prompt turned into one more card (C=N+1) sends`, async () => {
    sent(await scenario(provider, { history: 1, preAttached: 1, attachment: true }, LONG), { base: 1, mode: 'attachment' });
  });
}
test('S4-A gemini: uploaded file + long prompt turned into one more card is refused with the draft kept', async () => {
  refused(await scenario('gemini', { history: 1, preAttached: 1, attachment: true }, LONG), 'attachment.unverifiedProvider', { pastes: 1 });
});
test('S4-A gemini: uploaded file + long prompt kept inline sends', async () => {
  sent(await scenario('gemini', { history: 1, preAttached: 1 }, LONG), { base: 1 });
});

// ---- B: manual Refresh takes the page's latest reply, never an older dispatch binding ----
for (const provider of PROVIDERS) {
  test(`S4-B ${provider}: dispatch A captured, operator sends B by hand, Refresh captures B`, async () => {
    const sim = await simulate(provider, { history: 1 });
    try {
      assert.equal((await sim.run('platform prompt A')).content, 'native reply 1');
      await sim.manualTurn('hand-sent prompt B', 'native reply B');
      assert.equal(await sim.adapter.captureLastReply(sim.page, { force: true }), 'native reply B');
      assert.equal((await sim.actions()).copy, 2);
    } finally { await sim.close(); }
  });
  test(`S4-B ${provider}: a refused dispatch in between (old binding kept) does not divert Refresh from B`, async () => {
    const sim = await simulate(provider, { history: 1 });
    try {
      assert.equal((await sim.run('platform prompt A')).content, 'native reply 1');
      await sim.dom(() => { document.querySelector('[contenteditable="true"]').textContent = 'leftover'; });
      const refusedReply = await sim.run('platform prompt A2');
      assert.equal(refusedReply.errorCode, 'send_uncertain');
      await sim.dom(() => { document.querySelector('[contenteditable="true"]').textContent = ''; });
      await sim.manualTurn('hand-sent prompt B', 'native reply B');
      assert.equal(await sim.adapter.captureLastReply(sim.page, { force: true }), 'native reply B');
    } finally { await sim.close(); }
  });
  // The latest reply's own Copy is the only acceptable source.
  test(`S4-B ${provider}: latest reply B has no Copy, dispatched A has one: Refresh captures nothing`, async () => {
    const sim = await simulate(provider, { history: 1 });
    try {
      assert.equal((await sim.run('platform prompt A')).content, 'native reply 1');
      await sim.manualTurn('hand-sent prompt B', 'native reply B', { copy: false });
      await assert.rejects(sim.adapter.captureLastReply(sim.page, { force: true }), (e) => e.code === 'selector_not_found');
      assert.equal((await sim.actions()).copy, 1, "A's Copy is not clicked again");
    } finally { await sim.close(); }
  });
  test(`S4-B ${provider}: no dispatch yet, latest reply has no Copy, older ones do: Refresh captures nothing`, async () => {
    const sim = await simulate(provider, { history: 2 });
    try {
      await sim.manualTurn('hand-sent prompt B', 'native reply B', { copy: false });
      await assert.rejects(sim.adapter.captureLastReply(sim.page, { force: true }), (e) => e.code === 'selector_not_found');
      assert.equal((await sim.actions()).copy, 0);
    } finally { await sim.close(); }
  });
}

// ---- C: Shift override past a repeated summary ----
for (const [name, replies] of [['replies incomplete', allValid().slice(0, 2)], ['all three captured', allValid()]]) {
  test(`S4-C: ${name} + summary equal to the previous round: Shift arms and dispatch is allowed`, () => {
    const f = appFixture(replies);
    f.state.selectedSession.rounds.unshift({ roundNumber: 1, summary: 'fixture summary' });
    const before = JSON.stringify(f.state.selectedSession);
    assert.notEqual(f.api.getDispatchBlockReason(), '');
    assert.equal(f.api.armManualDispatchOverride({ silent: true }), true);
    assert.equal(f.api.getDispatchBlockReason(), '');
    assert.equal(JSON.stringify(f.state.selectedSession), before, 'override rewrites no reply or summary');
  });
}
test('S4-C: all three captured with a new summary still needs no override', () => {
  const f = appFixture(allValid());
  assert.equal(f.api.armManualDispatchOverride({ silent: true }), false);
  assert.equal(f.api.getDispatchBlockReason(), '');
});

// ---- D: refresh commits against other writers ----
function deferredCaptures() {
  const calls = [];
  const capture = () => new Promise((resolve, reject) => calls.push({ resolve, reject }));
  const settle = async () => { for (let i = 0; i < 5; i += 1) await new Promise(setImmediate); };
  return { calls, capture, settle };
}
const diskReply = (f, agent, round = 2) => f.disk().rounds.find((r) => r.roundNumber === round)?.replies.find((r) => r.agent === agent);

test('S4-D1: two seats refreshed with interleaved captures both stay on disk', async () => {
  const d = deferredCaptures();
  const f = serverFixture({ replies: allValid(), capture: d.capture, isolated: true });
  const claude = f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  const gemini = f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'gemini' });
  await d.settle();
  assert.equal(d.calls.length, 2, 'both captures are in flight together');
  d.calls[1].resolve('manual gemini B');
  await gemini;
  d.calls[0].resolve('manual claude B');
  await claude;
  assert.equal(diskReply(f, 'claude').content, 'manual claude B');
  assert.equal(diskReply(f, 'gemini').content, 'manual gemini B');
  assert.equal(diskReply(f, 'chatgpt').content, 'native reply for chatgpt');
  const carry = f.api.getState().activeSession.carriedSummary;
  assert.ok(carry.includes('manual claude B') && carry.includes('manual gemini B'));
});

test('S4-D2: a new session opened during the capture discards the refresh', async () => {
  const d = deferredCaptures();
  const f = serverFixture({ replies: allValid(), capture: d.capture, isolated: true });
  const pending = f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  await d.settle();
  const old = f.api.getState().activeSession;
  f.api.setState({ ...old, session: { sessionId: 'next-session', rounds: [] }, carriedSummary: 'next carry' }, null);
  d.calls[0].resolve('late manual reply');
  await assert.rejects(pending, (error) => error.code === 'refresh_superseded');
  assert.equal(f.writes.length, 0);
  assert.equal(f.api.getState().activeSession.carriedSummary, 'next carry');
});

test('S4-D2: the next round starting during the capture discards the refresh', async () => {
  const d = deferredCaptures();
  const f = serverFixture({ replies: allValid(), capture: d.capture, isolated: true });
  const pending = f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  await d.settle();
  f.api.setState(f.api.getState().activeSession, { sessionId: f.session.sessionId, roundNumber: 3, status: 'running', agents: {} });
  d.calls[0].resolve('late manual reply');
  await assert.rejects(pending, (error) => error.code === 'refresh_superseded');
  assert.equal(f.writes.length, 0);
});

test('S4-D2: the next round finishing during the capture discards the refresh', async () => {
  const d = deferredCaptures();
  const f = serverFixture({ replies: allValid(), capture: d.capture, isolated: true });
  const pending = f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  await d.settle();
  const disk = f.disk();
  disk.rounds.push({ roundNumber: 3, replies: allValid(), summary: 'round 3 summary' });
  f.setDisk(disk);
  f.api.getState().activeSession.nextRoundNumber = 4;
  d.calls[0].resolve('late manual reply');
  await assert.rejects(pending, (error) => error.code === 'refresh_superseded');
  assert.equal(f.writes.length, 0);
});

test('S4-D2: a running round that completes during its own refresh still accepts it', async () => {
  const d = deferredCaptures();
  const f = serverFixture({ replies: allValid(), capture: d.capture, isolated: true });
  const run = { sessionId: f.session.sessionId, roundNumber: 2, status: 'running', startedAt: new f.time.Date().toISOString(),
    agents: Object.fromEntries(['gemini', 'claude', 'chatgpt'].map((id) => [id, { status: 'done', content: 'x', errorCode: null }])) };
  const session = f.api.getState().activeSession;
  session.nextRoundNumber = 2;
  f.api.setState(session, run);
  const pending = f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  await d.settle();
  run.status = 'completed';
  session.nextRoundNumber = 3;
  d.calls[0].resolve('manual reply during completion');
  await pending;
  assert.equal(diskReply(f, 'claude').content, 'manual reply during completion');
});

test('S4-D3: runAgent publishes the manual reply kept on disk, not the late automatic one', async () => {
  const replies = [validReply('claude', { content: 'manual reply B', captureMode: 'manual_refresh', completionReason: 'manual_refresh' })];
  const f = serverFixture({ replies, isolated: true, runReply: validReply('claude', { content: 'late automatic A' }) });
  f.api.setState(f.api.getState().activeSession, { status: 'running', agents: Object.fromEntries(['gemini', 'claude', 'chatgpt'].map((id) => [id, { content: '', status: 'queued' }])) });
  await f.api.runAgent({ agent: { id: 'claude' }, prompt: { promptBlock: 'fixture' }, roundNumber: 2, session: f.session });
  const run = f.api.getState().activeRun;
  assert.equal(run.agents.claude.content, 'manual reply B');
  assert.equal(run.agents.claude.message, 'Reply manually refreshed.');
  assert.ok(run.summary.includes('manual reply B'));
  assert.equal(run.summary.includes('late automatic A'), false);
});

function storeFixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'helm-s4-store-'));
  const config = structuredClone(require('../config'));
  config.storage.outputDir = dir;
  const store = load('src/storage/sessionStore.js', { overrides: { '../../config': config } }).api;
  return { store, dir, cleanup: () => fs.rmSync(dir, { recursive: true, force: true }) };
}

test('S4-D3: appendRound merges into the session on disk and keeps a manual reply', (t) => {
  const { store, cleanup } = storeFixture();
  t.after(cleanup);
  const runStart = store.createSession();
  store.writeSession(runStart);
  // The run started with runStart; meanwhile a manual Refresh wrote two seats to disk.
  const onDisk = store.loadSession(runStart.sessionId);
  onDisk.rounds.push({ roundNumber: 0, prompt: 'p', replies: [
    validReply('claude', { content: 'manual claude', captureMode: 'manual_refresh' }),
    validReply('gemini', { content: 'manual gemini', captureMode: 'manual_refresh' })], metrics: {}, summary: '' });
  store.writeSession(onDisk);
  store.appendRound(runStart, { roundNumber: 0, prompt: 'p', replies: [validReply('claude', { content: 'late automatic claude' })], metrics: {} });
  store.appendRound(runStart, { roundNumber: 0, prompt: 'p', replies: [validReply('chatgpt', { content: 'automatic chatgpt' })], metrics: {} });
  const replies = store.loadSession(runStart.sessionId).rounds[0].replies;
  const byAgent = Object.fromEntries(replies.map((r) => [r.agent, r.content]));
  assert.deepEqual(byAgent, { claude: 'manual claude', gemini: 'manual gemini', chatgpt: 'automatic chatgpt' });
});

// D4: the view follows the server's SSE stream only. The HTTP reply of a
// Refresh reports success or failure; applying it too could put it before an older event that is
// still on its way, which would then roll the view back.
function sseRecorder(f) {
  const events = [];
  f.api.addClient({ write: (chunk) => events.push({
    name: chunk.match(/^event: (\S+)/)[1], data: JSON.parse(chunk.slice(chunk.indexOf('\ndata: ') + 7)) }) });
  return events;
}
function quietApp() {
  const ui = appFixture(allValid());
  ui.evaluate('renderSessionIndicator = renderSessionSelect = renderSelectedSession = () => {}; setGlobalStatus = () => {};');
  return ui;
}
function deliver(ui, events, count = events.length) {
  const handlers = { reply_refreshed: 'handleReplyRefreshed', session_context: 'handleSessionContext',
    run_started: 'handleRunStarted', agent_result: 'handleAgentResult', run_completed: 'handleRunCompleted' };
  for (const { name, data } of events.splice(0, count)) if (handlers[name]) ui.api[handlers[name]](data);
}
// The operator clicks Refresh; the HTTP reply arrives when `arrive` is called.
function clickRefresh(ui, agent) {
  let arrive;
  const reply = new Promise((resolve) => { arrive = resolve; });
  ui.calls.respond = () => reply;
  const posts = ui.calls.posts.length;
  const done = ui.api.refreshAgentReply(agent);
  assert.equal(ui.calls.posts.length, posts + 1, 'positive control: the Refresh request was sent');
  assert.equal(ui.calls.posts.at(-1).url, '/api/refresh-reply');
  return { arrive: async (payload) => { arrive(payload); await done; } };
}
const view = (ui) => JSON.stringify({ s: ui.state.selectedSession, r: ui.state.activeRun, a: ui.state.activeSession, n: ui.state.selectedRoundNumber });
const shownReply = (ui, agent, roundNumber = 2) =>
  ui.state.selectedSession.rounds.find((r) => r.roundNumber === roundNumber).replies.find((r) => r.agent === agent)?.content;

test('S4-D4: Refresh HTTP before an older agent result on SSE: no rollback, every seat ends right', async () => {
  const copies = { claude: 'manual B claude', chatgpt: 'manual B chatgpt' };
  let seat = 'claude';
  const f = serverFixture({ replies: allValid(), isolated: true, capture: async () => copies[seat],
    runReply: validReply('gemini', { content: 'auto gemini' }) });
  const agents = { claude: { status: 'done', content: 'native reply for claude' }, gemini: { status: 'running', content: '' },
    chatgpt: { status: 'done', content: 'native reply for chatgpt' } };
  const run = { sessionId: f.session.sessionId, roundNumber: 2, prompt: 'p', status: 'running', summary: '', agents };
  f.api.setState(f.api.getState().activeSession, run);
  const ui = quietApp();
  ui.api.handleRunStarted(structuredClone(run));
  const sse = sseRecorder(f);
  // Server order: gemini's automatic result (persisted, then published), then two Refresh commits.
  const disk = f.disk();
  disk.rounds[0].replies = disk.rounds[0].replies.map((r) => r.agent === 'gemini' ? validReply('gemini', { content: 'auto gemini' }) : r);
  f.setDisk(disk);
  await f.api.runAgent({ agent: { id: 'gemini' }, prompt: { promptBlock: 'p' }, roundNumber: 2, session: f.session });
  const claudeHttp = await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  seat = 'chatgpt';
  const chatgptHttp = await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'chatgpt' });
  assert.deepEqual(sse.map((e) => e.name), ['agent_result', 'reply_refreshed', 'reply_refreshed']);

  // Arrival: both HTTP replies first, then the SSE stream in its order.
  const before = view(ui);
  await clickRefresh(ui, 'claude').arrive(claudeHttp);
  await clickRefresh(ui, 'chatgpt').arrive(chatgptHttp);
  assert.equal(view(ui), before, 'an HTTP reply alone changes nothing that a later event could roll back');
  deliver(ui, sse, 1);
  assert.equal(ui.state.activeRun.agents.gemini.content, 'auto gemini');
  deliver(ui, sse, 1);
  assert.equal(ui.state.activeRun.agents.claude.content, 'manual B claude');
  deliver(ui, sse);
  assert.equal(ui.state.activeRun.agents.chatgpt.content, 'manual B chatgpt');
  assert.equal(ui.state.activeRun.agents.claude.content, 'manual B claude');
  assert.equal(ui.state.activeRun.agents.gemini.content, 'auto gemini');
  assert.deepEqual(['claude', 'gemini', 'chatgpt'].map((a) => shownReply(ui, a)), ['manual B claude', 'auto gemini', 'manual B chatgpt']);
  for (const text of ['manual B claude', 'auto gemini', 'manual B chatgpt']) assert.ok(ui.state.activeRun.summary.includes(text));
});

test('S4-D4: Refresh HTTP before the older run_completed on SSE: the refreshed reply stays', async () => {
  const f = serverFixture({ replies: allValid(), isolated: true, capture: async () => 'manual B claude' });
  const run = { sessionId: f.session.sessionId, roundNumber: 2, prompt: 'p', status: 'running', summary: '',
    agents: Object.fromEntries(['gemini', 'claude', 'chatgpt'].map((id) => [id, { status: 'done', content: 'native reply for ' + id }])) };
  const ui = quietApp();
  ui.api.handleRunStarted(structuredClone(run));
  const sse = sseRecorder(f);
  // Round end as handleDispatch publishes it, then a Refresh of that (latest) round.
  Object.assign(run, { status: 'completed', session: f.disk(), summary: 'old round summary' });
  f.api.setState(f.api.getState().activeSession, run);
  f.api.sendEvent('run_completed', run);
  const http = await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  const before = view(ui);
  await clickRefresh(ui, 'claude').arrive(http);
  assert.equal(view(ui), before, 'an HTTP reply alone changes nothing that a later event could roll back');
  deliver(ui, sse, 1);
  assert.equal(shownReply(ui, 'claude'), 'native reply for claude', 'the round end shows what was on disk then');
  deliver(ui, sse);
  assert.equal(shownReply(ui, 'claude'), 'manual B claude');
  assert.equal(ui.state.activeRun.agents.claude.content, 'manual B claude');
  assert.equal(ui.state.activeRun.status, 'completed');
});

test('S4-D4: the old session\'s Refresh HTTP arriving after New Session does not switch the UI back', async () => {
  const f = serverFixture({ replies: allValid(), isolated: true });
  const sse = sseRecorder(f);
  const ui = quietApp();
  const click = clickRefresh(ui, 'claude');
  const http = await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  await f.api.handleNewSession();
  deliver(ui, sse);
  assert.equal(ui.state.activeSession.sessionId, 'fresh-fixture-session', 'positive control: New Session applied');
  await click.arrive(http);
  assert.equal(ui.state.activeSession.sessionId, 'fresh-fixture-session');
  assert.equal(ui.state.selectedSession.sessionId, 'fresh-fixture-session');
  assert.equal(ui.state.activeSession.roundNumber, 0);

  // A Refresh in the new session shows as usual.
  f.setDisk({ sessionId: 'fresh-fixture-session', rounds: [{ roundNumber: 0, replies: allValid(), summary: 'r0' }] });
  f.api.getState().activeSession.nextRoundNumber = 1;
  for (const browser of Object.values(f.api.getState().activeSession.browsers)) browser.page = { bringToFront: async () => {} };
  await f.api.handleRefreshReply({ sessionId: 'fresh-fixture-session', roundNumber: 0, agentId: 'claude' });
  deliver(ui, sse);
  assert.equal(shownReply(ui, 'claude', 0), 'native refreshed Copy');
});

test('S4-D4: a round-N Refresh HTTP arriving after round N+1 started leaves the new round alone', async () => {
  const f = serverFixture({ replies: allValid(), isolated: true });
  const sse = sseRecorder(f);
  const ui = quietApp();
  const click = clickRefresh(ui, 'claude');
  const http = await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  const next = { sessionId: f.session.sessionId, roundNumber: 3, prompt: 'next', status: 'running', summary: '',
    agents: { claude: { status: 'running', stage: 'send' }, gemini: {}, chatgpt: {} } };
  f.api.setState(f.api.getState().activeSession, next);
  f.api.sendEvent('run_started', next);
  deliver(ui, sse);
  assert.equal(shownReply(ui, 'claude'), 'native refreshed Copy', 'positive control: the refresh showed via SSE');
  await click.arrive(http);
  assert.equal(ui.state.selectedRoundNumber, 3);
  assert.equal(ui.state.activeRun.roundNumber, 3);
  assert.equal(ui.state.activeRun.summary, '');
  assert.deepEqual(ui.state.activeRun.agents.claude, { status: 'running', stage: 'send' });
});

test('S4-D4: ordinary Refreshes show via SSE whether the HTTP reply comes before or after', async () => {
  const contents = ['first Copy', 'second Copy'];
  const f = serverFixture({ replies: allValid(), isolated: true, capture: async () => contents.shift() });
  const sse = sseRecorder(f);
  const ui = quietApp();
  const first = await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  deliver(ui, sse);
  await clickRefresh(ui, 'claude').arrive(first);
  assert.equal(shownReply(ui, 'claude'), 'first Copy');
  const second = await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  await clickRefresh(ui, 'claude').arrive(second);
  deliver(ui, sse);
  assert.equal(shownReply(ui, 'claude'), 'second Copy');
});

test('S4-D4: a Refresh missed while SSE was disconnected shows in the reconnect snapshot', async () => {
  const f = serverFixture({ replies: allValid(), isolated: true });
  const ui = quietApp();
  await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  ui.api.handleSnapshot(f.api.getUiState({ sessionId: f.session.sessionId, roundNumber: 2 }));
  assert.equal(shownReply(ui, 'claude'), 'native refreshed Copy');
});

// ---- E: the carried summary after refreshes (L3/L4 shape) ----
test('S4-E: after refreshing three seats, disk, round summary, carry, active run and next prompt agree', async () => {
  const contents = { gemini: 'hand B gemini', claude: 'hand B claude', chatgpt: 'hand B chatgpt' };
  const order = [];
  const f = serverFixture({ replies: allValid(), isolated: true, capture: async () => contents[order.shift()] });
  f.api.setState(f.api.getState().activeSession, { sessionId: f.session.sessionId, roundNumber: 2, status: 'completed', agents: {} });
  for (const agentId of ['gemini', 'claude', 'chatgpt']) {
    order.push(agentId);
    await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId });
  }
  const { activeSession, activeRun } = f.api.getState();
  const round = f.disk().rounds.find((r) => r.roundNumber === 2);
  assert.equal(activeSession.carriedSummary, round.summary);
  assert.equal(activeRun.summary, round.summary);
  for (const text of Object.values(contents)) assert.ok(round.summary.includes(text));
  const next = f.api.buildPromptPayload({ sessionId: f.session.sessionId, roundNumber: 3, summary: activeSession.carriedSummary, prompt: 'next' });
  for (const text of Object.values(contents)) assert.ok(next.fullText.includes(text));
});

test('S4-E: a stale seat is carried as a marker only, next to the other seats\' text', async () => {
  const f = serverFixture({ replies: allValid(), isolated: true, capture: async () => 'same as last round' });
  const disk = f.disk();
  disk.rounds.unshift({ roundNumber: 1, replies: [validReply('claude', { content: 'same as last round' })], summary: 'r1' });
  f.setDisk(disk);
  await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  const carry = f.api.getState().activeSession.carriedSummary;
  assert.ok(carry.includes('[Claude reply excluded: staleSuspect]'));
  assert.equal(carry.includes('same as last round'), false);
  assert.ok(carry.includes('native reply for gemini') && carry.includes('native reply for chatgpt'));
});

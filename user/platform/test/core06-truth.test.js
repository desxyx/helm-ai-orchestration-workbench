const os = require('node:os');
const path = require('node:path');
process.env.HELM_LOG_PATH = path.join(os.tmpdir(), 'helm-core06-truth-test.log');
const test = require('node:test');
const assert = require('node:assert/strict');
const { roundFixture, serverFixture, appFixture, validReply, allValid, timeoutText } = require('./core06-fixtures/harness');
const { refreshFixture } = require('./core06-fixtures/refresh');
const { closeSharedBrowser } = require('./core06-fixtures/sim');
test.after(closeSharedBrowser);

test('CORE06 control: a normal native Copy result remains ok and is persisted once', async () => {
  const f = roundFixture();
  const r = await f.run();
  assert.equal(r.reply.status, 'ok');
  assert.equal(r.reply.errorCode, null);
  assert.equal(r.reply.content, 'native Copy result');
  assert.equal(f.persisted.length, 1);
  assert.deepEqual(r.events, ['send', 'copy']);
});

for (const [name, options, code] of [
  ['hard timeout even when Copy returns diagnostic text', { reason: 'timeout' }, 'completion_timeout'],
  ['generation never started even when Copy returns old text', { reason: 'stalled' }, 'completion_not_started'],
  ['exact machine timeout sentinel', { reason: 'timeout', captureError: Object.assign(Error('Copy unavailable'), { code: 'copy_did_not_write' }) }, 'completion_timeout'],
  ['native Copy did not write', { captureError: Object.assign(Error('Copy unchanged'), { code: 'copy_did_not_write' }) }, 'capture_timeout'],
]) test('CORE06 target: ' + name + ' is an error reply', async () => {
  const { reply } = await roundFixture().run(options);
  assert.equal(reply.status, 'error', 'untrusted capture must not be ok');
  assert.equal(reply.errorCode, code);
});

test('CORE06 control: send_uncertain persists existing error status and never reaches capture', async () => {
  const { reply, events } = await roundFixture().run({ sendError: Object.assign(Error('ambiguous acknowledgement'), { code: 'send_uncertain' }) });
  assert.equal(reply.status, 'error');
  assert.equal(reply.errorCode, 'send_uncertain');
  assert.deepEqual(events, ['send']);
});

test('CORE06 control: a legitimate repeated reply is retained and flagged staleSuspect', async () => {
  const { reply } = await roundFixture().run({ session: { rounds: [{ roundNumber: 1, replies: [validReply('claude', { content: 'native Copy result' })] }] } });
  assert.equal(reply.content, 'native Copy result');
  assert.equal(reply.staleSuspect, true);
});

const excluded = [
  ['send uncertain', { status: 'error', errorCode: 'send_uncertain' }, 'send_uncertain'],
  ['capture timeout', { status: 'error', errorCode: 'capture_timeout' }, 'capture_timeout'],
  ['nonempty errorCode on legacy ok', { errorCode: 'send_uncertain' }, 'send_uncertain'],
  ['completion timeout on legacy ok', { completionReason: 'timeout', errorCode: 'completion_timeout' }, 'completion_timeout'],
  ['stalled on legacy ok', { completionReason: 'stalled', errorCode: 'completion_not_started' }, 'completion_not_started'],
  ['error completion on legacy ok', { completionReason: 'error', errorCode: 'completion_polling_failed' }, 'completion_polling_failed'],
  ['unscoped refresh', { status: 'error', errorCode: 'refresh_unverified' }, 'refresh_unverified'],
  ['stale capture', { staleSuspect: true }, 'staleSuspect'],
  ['exact capture timeout sentinel', { content: timeoutText, errorCode: 'capture_timeout' }, 'capture_timeout'],
  ['whitespace content', { content: ' \n ', errorCode: 'capture_timeout' }, 'capture_timeout'],
];

test('CORE06 control: summary and UI accept a valid captured reply', () => {
  const reply = validReply();
  assert.ok(serverFixture().api.buildSummary([reply]).includes(reply.content));
  assert.equal(appFixture([reply]).api.isReplyCaptured({ replies: [reply] }, 'claude'), true);
});

for (const [name, patch, code] of excluded) {
  test('CORE06 target summary: ' + name + ' gets exactly one exclusion marker', () => {
    const secret = 'UNTRUSTED_FIXTURE_CONTENT_7c3b';
    const reply = validReply('claude', { content: secret, ...patch });
    const summary = serverFixture().api.buildSummary([reply]);
    const marker = `[Claude reply excluded: ${code}]`;
    assert.equal(summary.split(marker).length - 1, 1, 'one marker for this excluded seat');
    if (reply.content.trim()) assert.equal(summary.includes(reply.content.trim()), false, 'excluded text must not enter summary');
  });
  test('CORE06 target UI: ' + name + ' cannot satisfy the captured gate', () => {
    const reply = validReply('claude', patch);
    assert.equal(appFixture([reply]).api.isReplyCaptured({ replies: [reply] }, 'claude'), false);
  });
}

test('CORE06 target UI: the timeout sentinel is rejected even without an errorCode', () => {
  const reply = validReply('claude', { content: timeoutText });
  assert.equal(appFixture([reply]).api.isReplyCaptured({ replies: [reply] }, 'claude'), false);
});

test('CORE06 target UI: a timeout completion is rejected even without an errorCode', () => {
  const reply = validReply('claude', { completionReason: 'timeout' });
  assert.equal(appFixture([reply]).api.isReplyCaptured({ replies: [reply] }, 'claude'), false);
});

test('CORE06 target: active-run summary preserves failure fields at the runAgent call site', async () => {
  const reply = validReply('claude', { status: 'error', errorCode: 'send_uncertain', content: 'untrusted active-run diagnostic' });
  const f = serverFixture({ runReply: reply });
  f.api.setState(f.api.getState().activeSession, { status: 'running', agents: Object.fromEntries(['gemini','claude','chatgpt'].map(id => [id, { content: '', status: 'queued' }])) });
  await f.api.runAgent({ agent: { id: 'claude' }, prompt: { promptBlock: 'fixture' }, roundNumber: 2, session: f.session });
  const summary = f.api.getState().activeRun.summary;
  assert.ok(summary.includes('[Claude reply excluded: send_uncertain]'));
  assert.equal(summary.includes(reply.content), false);
});

test('CORE06 target: repeated reply requires explicit override and stays excluded', () => {
  const replies = allValid();
  replies[1].staleSuspect = true;
  const f = appFixture(replies);
  const before = JSON.stringify(replies);
  const blocked = f.api.getDispatchBlockReason();
  const armed = f.api.armManualDispatchOverride({ silent: true });
  assert.equal(JSON.stringify(replies), before, 'arming override must not relabel replies');
  assert.ok(blocked, 'stale reply must block normal dispatch');
  assert.equal(armed, true);
  assert.equal(f.api.getDispatchBlockReason(), '');
  assert.equal(serverFixture().api.buildSummary(replies).includes('[Claude reply excluded: staleSuspect]'), true);
});

test('CORE06 control: F04 refresh does not promote carry until all seats have valid replies', async () => {
  const f = serverFixture({ replies: [validReply('claude')] });
  await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  assert.equal(f.api.getState().activeSession.carriedSummary, 'preserved carry');
});

test('CORE06 control: F04 refresh promotes carry when every seat is valid', async () => {
  const f = serverFixture({ replies: allValid() });
  await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  assert.ok(f.api.getState().activeSession.carriedSummary.includes('native refreshed Copy'));
});

for (const [name, patch] of [ ['stale', { staleSuspect: true }], ['legacy timeout', { completionReason: 'timeout', errorCode: 'completion_timeout' }] ]) {
  test('CORE06 target: F04 refuses carry promotion when another seat is ' + name, async () => {
    const replies = allValid();
    Object.assign(replies[0], patch);
    const f = serverFixture({ replies });
    await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
    assert.equal(f.api.getState().activeSession.carriedSummary, 'preserved carry');
  });
}

function activeRefresh(f) {
  f.api.setState(f.api.getState().activeSession, {
    sessionId: f.session.sessionId, roundNumber: 2, status: 'running',
    startedAt: new f.time.Date().toISOString(),
    agents: Object.fromEntries(['gemini', 'claude', 'chatgpt'].map(id => [id, { status: 'done', content: 'old reply', errorCode: null }])),
  });
}

for (const provider of ['claude', 'chatgpt', 'gemini']) {
  test(`CORE06 target server ${provider}: unbound forced refresh retains raw error and excludes it everywhere`, async (t) => {
    const copy = await refreshFixture(provider);
    t.after(copy.close);
    const f = serverFixture({ replies: allValid(), capture: copy.api.captureLastReply, browserPage: copy.page });
    activeRefresh(f);
    await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: provider });
    assert.equal((await copy.actions()).copy, 1, 'positive control: the unbound Refresh read one native Copy');
    assert.equal(f.writes.length, 1, 'saved session is inspected, not only live memory');
    const round = f.writes[0].rounds.find(r => r.roundNumber === 2);
    const reply = round.replies.find(r => r.agent === provider);
    const marker = `[${{ claude: 'Claude', chatgpt: 'ChatGPT', gemini: 'Gemini' }[provider]} reply excluded: refresh_unverified]`;
    // Compare all independent trust/retention fields from the same refresh.
    const actual = {
      status: reply.status, errorCode: reply.errorCode, content: reply.content,
      markerCount: round.summary.split(marker).length - 1,
      summaryContainsRaw: round.summary.includes(copy.content),
      carry: f.api.getState().activeSession.carriedSummary,
      activeErrorCode: f.api.getState().activeRun.agents[provider].errorCode,
      activeSummary: f.api.getState().activeRun.summary,
    };
    console.log('CORE06_REFRESH_METRIC ' + JSON.stringify({ provider, ...actual }));
    assert.deepEqual({ ...actual, activeSummary: undefined }, {
      status: 'error', errorCode: 'refresh_unverified', content: copy.content,
      markerCount: 1, summaryContainsRaw: false, carry: 'preserved carry',
      activeErrorCode: 'refresh_unverified', activeSummary: undefined,
    });
    assert.equal(actual.activeSummary.split(marker).length - 1, 1);
    assert.equal(actual.activeSummary.includes(copy.content), false);
  });
  test(`CORE06 control server ${provider}: dispatch-bound forced refresh stays ok and promotes verified carry`, async (t) => {
    const copy = await refreshFixture(provider, { scoped: true, content: 'verified native Copy for ' + provider });
    t.after(copy.close);
    const f = serverFixture({ replies: allValid(), capture: copy.api.captureLastReply, browserPage: copy.page });
    activeRefresh(f);
    await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: provider });
    assert.equal((await copy.actions()).copy, 2, 'dispatch capture plus one bound Refresh Copy');
    const round = f.writes.at(-1).rounds[0];
    const reply = round.replies.find(r => r.agent === provider);
    assert.equal(reply.status, 'ok');
    assert.equal(reply.errorCode, null);
    assert.equal(reply.content, copy.content);
    assert.equal(round.summary.includes(copy.content), true);
    assert.equal(round.summary.includes('reply excluded:'), false);
    assert.equal(f.api.getState().activeSession.carriedSummary, round.summary);
    assert.equal(f.api.getState().activeRun.agents[provider].errorCode, null);
  });
}

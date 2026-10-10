const os = require('node:os');
const path = require('node:path');
process.env.HELM_LOG_PATH = path.join(os.tmpdir(), 'helm-core06-protected-test.log');
const test = require('node:test');
const assert = require('node:assert/strict');
const { appFixture, serverFixture, allValid } = require('./core06-fixtures/harness');

test('CORE06 Annex A1 control: explicit override unlocks incomplete replies without mutating them', () => {
  const replies = allValid().slice(0, 2);
  const f = appFixture(replies);
  const before = JSON.stringify(replies);
  assert.ok(f.api.getDispatchBlockReason().includes('all three'));
  assert.equal(f.api.armManualDispatchOverride({ silent: true }), true);
  assert.equal(f.api.getDispatchBlockReason(), '');
  assert.equal(JSON.stringify(replies), before);
  assert.equal(f.api.armManualDispatchOverride({ silent: true }), false);
});

for (const [name, setup, expected] of [
  ['history view', f => { f.state.selectedRoundNumber = 1; }, 'latest round'],
  ['active run', f => { f.state.activeRun = { status: 'running', roundNumber: 2 }; }, 'current round'],
  ['no live session', f => { f.state.activeSession = null; }, 'fresh session'],
  ['active refresh', f => { f.state.refreshingAgents.claude = true; }, 'refresh'],
  ['unchanged summary', f => { f.state.selectedSession.rounds.unshift({ roundNumber: 1, summary: 'fixture summary' }); }, 'previous round'],
]) test('CORE06 Annex A5 control: override does not bypass ' + name, () => {
  const f = appFixture(allValid().slice(0, 2));
  f.api.armManualDispatchOverride({ silent: true });
  setup(f);
  assert.ok(f.api.getDispatchBlockReason().includes(expected));
});

test('CORE06 Annex A2 control: a completed seat refreshes immediately; a running seat waits 120s', () => {
  const f = appFixture(allValid());
  f.state.activeRun = { sessionId: 'fixture-session', roundNumber: 2, status: 'running', startedAt: new f.time.Date().toISOString(), agents: { claude: { status: 'done' }, gemini: { status: 'running' } } };
  assert.equal(f.api.canRefreshReply('claude'), true);
  assert.equal(f.api.canRefreshReply('gemini'), false);
  assert.equal(f.api.getManualRefreshRemainingMs(), 120000);
  f.time.advance(119999);
  assert.equal(f.api.canRefreshReply('gemini'), false);
  f.time.advance(1);
  assert.equal(f.api.canRefreshReply('gemini'), true);
});

test('CORE06 Annex A2 control: server enforces the same per-seat unlock', async () => {
  const f = serverFixture({ replies: allValid() });
  const run = { sessionId: f.session.sessionId, roundNumber: 2, status: 'running', startedAt: new f.time.Date().toISOString(), agents: { claude: { status: 'done' }, gemini: { status: 'running' }, chatgpt: { status: 'running' } } };
  f.api.setState(f.api.getState().activeSession, run);
  await assert.rejects(f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'gemini' }), /unlocks 120s/);
  await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' });
  f.time.advance(120000);
  await f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'gemini' });
});

test('CORE06 Annex A4/A7 control: prompt-only dispatch confirms and restores attachment once', async () => {
  const f = appFixture(allValid());
  f.node('prompt-input').value = 'offline payload';
  f.api.toggleSummaryAttachment();
  assert.equal(f.state.attachSummaryOnDispatch, false);
  await f.api.dispatchPrompt();
  assert.equal(f.calls.posts.length, 1);
  assert.equal(f.calls.posts[0].body.attachSummary, false);
  assert.equal(f.state.attachSummaryOnDispatch, true);
  assert.equal(f.calls.confirmations.length, 1);
  await f.api.dispatchPrompt();
  assert.equal(f.calls.posts[1].body.attachSummary, true);
});

test('CORE06 Annex A7 control: declined confirmations produce no dispatch or new-session request', async () => {
  const f = appFixture(allValid());
  f.node('prompt-input').value = 'offline payload';
  f.evaluate('window.confirm = () => false');
  await f.api.dispatchPrompt();
  await f.api.createNewSession();
  assert.equal(f.calls.posts.length, 0);
});

test('CORE06 Annex A8 control: new session carries summary in memory only', async () => {
  const f = serverFixture({ replies: allValid() });
  await f.api.handleNewSession();
  assert.equal(f.api.getState().activeSession.carriedSummary, 'preserved carry');
  assert.equal(f.opened(), 3, 'only fake adapter opens');
  assert.equal(f.writes.length, 1);
  assert.equal(Object.hasOwn(f.writes[0], 'carriedSummary'), false);
  assert.equal(JSON.stringify(f.writes[0]).includes('preserved carry'), false);
});

test('CORE06 Annex A13 control: profile-in-use errors retain the operator guidance', () => {
  const f = serverFixture();
  const error = f.api.normalizeRuntimeError(Error('user data directory SingletonLock'));
  assert.equal(error.code, 'profile_in_use');
  assert.ok(error.message.includes('Close the existing AI Chrome windows'));
});

test('CORE06 Annex A4 control: composed prompt carries summary only when attached', () => {
  const f = serverFixture();
  const args = { sessionId: 'fixture', roundNumber: 2, prompt: 'payload', summary: 'reference' };
  assert.ok(f.api.buildPromptPayload(args).fullText.endsWith('reference'));
  assert.equal(f.api.buildPromptPayload({ ...args, attachSummary: false }).summaryBlock, '');
});

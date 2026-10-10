const test = require('node:test');
const assert = require('node:assert/strict');
const { serverFixture, allValid } = require('./core06-fixtures/harness');

// S1-2: a failed manual Refresh never erases the stored reply, carry or active state.
for (const missingRound of [false, true]) test(`S1-2 empty failed refresh preserves session, carry and active reply; missing round=${missingRound}`, async () => {
  const f = serverFixture({ replies: allValid(), capture: async () => { throw Object.assign(Error('Copy did not write'), { code: 'copy_did_not_write' }); } });
  if (missingRound) f.session.rounds = [];
  f.api.setState(f.api.getState().activeSession, { sessionId: f.session.sessionId, roundNumber: 2, status: 'running',
    agents: { claude: { status: 'done', content: 'prior active content', errorCode: null } } });
  const beforeSession = JSON.stringify(f.session);
  const beforeState = JSON.stringify(f.api.getState());
  await assert.rejects(() => f.api.handleRefreshReply({ sessionId: f.session.sessionId, roundNumber: 2, agentId: 'claude' }), error => error.code === 'capture_timeout');
  assert.equal(JSON.stringify(f.session), beforeSession);
  assert.equal(JSON.stringify(f.api.getState()), beforeState);
  assert.equal(f.writes.length, 0);
});

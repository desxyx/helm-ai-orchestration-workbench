// Real provider captureLastReply against the Stage 3 page simulator. A dispatch-bound
// Refresh runs one real dispatch first; an unbound Refresh has no dispatch on the page.
const { simulate } = require('./sim');

async function refreshFixture(provider, { scoped = false, content = 'verified native Copy' } = {}) {
  const sim = await simulate(provider, { history: 2, reply: content });
  if (scoped) {
    const reply = await sim.run('dispatch before refresh');
    if (reply.status !== 'ok') throw Error('fixture dispatch failed: ' + reply.errorCode);
  }
  return { api: sim.adapter, page: sim.page, content: scoped ? content : 'old answer 1',
    actions: sim.actions, close: sim.close };
}

// Accept either an error carrying raw diagnostic content or an explicit tagged
// result. A rejection that discards the raw Copy text does not satisfy the oracle.
async function inspectCapture(capture) {
  try {
    const value = await capture();
    return typeof value === 'string' ? { content: value, errorCode: null } : value;
  } catch (error) {
    return { errorCode: error.code || error.errorCode,
      content: error.content ?? error.details?.content };
  }
}

module.exports = { refreshFixture, inspectCapture };

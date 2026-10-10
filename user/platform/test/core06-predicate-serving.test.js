const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { ROOT, serverFixture, validReply, timeoutText } = require('./core06-fixtures/harness');
const { isCaptured } = require('../src/utils/predicates');

test('CORE06 integration: served app loads the same predicate as Node and excludes diagnostic content', () => {
  const appPath = path.join(ROOT, 'public/app.js');
  const rulePath = path.join(ROOT, 'src/utils/predicates.js');
  const files = { [appPath]: fs.readFileSync(appPath, 'utf8'), [rulePath]: fs.readFileSync(rulePath, 'utf8') };
  const f = serverFixture({ staticFiles: files });
  let body = '';
  f.api.serveStatic({ writeHead: code => assert.equal(code, 200), end: value => { body = value; } }, '/app.js');
  assert.equal(body, files[rulePath] + '\n' + files[appPath]);
  const cut = body.indexOf('$("send-button").addEventListener');
  assert.ok(cut > files[rulePath].length, 'actual browser app bootstrap boundary found');
  // Classic browser script context: no CommonJS module or injected rule object.
  const browser = {};
  vm.runInNewContext(body.slice(0, cut) + '\nglobalThis.captured = reply => isReplyCaptured({ replies: [reply] }, reply.agent);', browser);
  const cases = [validReply(), validReply('claude', { errorCode: 'send_uncertain' }),
    validReply('claude', { staleSuspect: true }), validReply('claude', { content: timeoutText }),
    validReply('claude', { completionReason: 'stalled' }), validReply('claude', { content: '  ' })];
  assert.equal(browser.captured(cases[0]), true, 'positive control: trusted native Copy remains captured');
  for (const reply of cases) assert.equal(browser.captured(reply), isCaptured(reply));
  assert.equal(cases.slice(1).some(reply => browser.captured(reply)), false);
});

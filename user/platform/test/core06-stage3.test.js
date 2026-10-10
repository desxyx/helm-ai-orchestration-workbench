// Stage 3 decision boundaries on one changing synthetic provider DOM per case: the real
// adapter send -> completion -> native Copy -> round runner chain. Rows map to the
// EXECUTION_PLAN_r1 matrix (X1..X13). Simulated time; no provider URL or profile.
const test = require('node:test');
const assert = require('node:assert/strict');
const { simulate, closeSharedBrowser } = require('./core06-fixtures/sim');
const { isCaptured } = require('../src/utils/predicates');

test.after(closeSharedBrowser);
const PROVIDERS = ['claude', 'chatgpt', 'gemini'];
const LONG = 'def handler(x):\n    return x\n'.repeat(200);

async function scenario(provider, cfg, prompt, options = {}) {
  const sim = await simulate(provider, cfg, options);
  try {
    const reply = await sim.run(prompt, options.run);
    return { reply, actions: await sim.actions(), logs: sim.logs.lines, sim };
  } finally {
    if (!options.keepOpen) await sim.close();
  }
}

function sent(result, content = 'native reply 1') {
  assert.equal(result.reply.status, 'ok', JSON.stringify({ reply: result.reply, log: result.logs.slice(-4) }));
  assert.equal(result.reply.errorCode, null);
  assert.equal(result.reply.content, content);
  assert.equal(isCaptured(result.reply), true);
  assert.equal(result.actions.paste, 1);
  assert.equal(result.actions.send, 1);
  assert.equal(result.actions.copy, 1);
  assert.equal(result.actions.busyHover, 0, 'no pointer movement while BUSY');
  // Pre-Send actionability may scroll Send into view (Playwright); BUSY never scrolls.
  assert.equal(result.actions.busyScroll, 0, 'no scrolling while BUSY');
}

function refused(result, field, { pastes, sends = 0 }) {
  assert.equal(result.reply.status, 'error');
  assert.equal(result.reply.errorCode, 'send_uncertain');
  assert.equal(isCaptured(result.reply), false);
  assert.equal(result.actions.paste, pastes);
  assert.equal(result.actions.send, sends);
  assert.equal(result.actions.copy, 0);
  assert.ok(result.logs.some((line) => line.includes(`"blockingField":"${field}"`)), result.logs.slice(-3).join('\n'));
}

for (const provider of PROVIDERS) {
  // X1 / P1 short: no transcript before the first Send; the root appears afterwards.
  test(`X1 ${provider}: fresh chat first short send is captured`, async () => {
    sent(await scenario(provider, {}, 'fresh short prompt with ```js\nreturn 1\n```'));
  });
  test(`X1 ${provider}: fresh chat first send survives composer replacement`, async () => {
    sent(await scenario(provider, { replaceComposer: true }, 'fresh short prompt'));
  });

  // X2 / P1 long: first dispatch of a fresh chat is the long payload (no warm-up).
  test(`X2 ${provider}: fresh chat first long send is captured`, async () => {
    const attachment = provider !== 'gemini';
    const result = await scenario(provider, { attachment }, LONG);
    sent(result);
    assert.ok(result.logs.some((line) => line.includes(`send_clicked mode=${attachment ? 'attachment' : 'inline'}`)));
  });

  // X3: continuing chat where history unmounts or shrinks after the click.
  for (const shape of ['virtualize', 'netZero']) {
    test(`X3 ${provider}: ${shape} history after Send still captures the new reply`, async () => {
      sent(await scenario(provider, { history: 4, [shape]: true }, 'continuation prompt'));
    });
  }
  test(`X3 ${provider}: the previous reply is not taken before the new prompt renders`, async () => {
    sent(await scenario(provider, { history: 2, userDelayMs: 3000, startDelayMs: 3500 }, 'late render'));
  });

  // X5: leftovers are real action concerns; the draft is never cleared or replaced.
  for (const [label, cfg] of [['leftover draft text', { leftoverDraft: true }], ['leftover attachment', { leftoverCard: true }]]) {
    test(`X5 ${provider}: ${label} refuses before any paste`, async () => {
      refused(await scenario(provider, { history: 1, ...cfg }, 'next prompt'), 'composer.initiallyEmpty', { pastes: 0 });
    });
  }

  // X5 (live A1 finding): a second matching textbox inside history does not block the composer.
  test(`X5 ${provider}: an extra matching editor inside history leaves the composer usable`, async () => {
    const result = await scenario(provider, { history: 1, extraEditorInHistory: true }, 'second editor present');
    sent(result);
    assert.ok(result.logs.some((line) => line.includes('editorCandidates visible=2 chosen=1')));
  });

  // X6: Stop and Send boundaries.
  test(`X6 ${provider}: Stop before paste means zero paste and zero Send`, async () => {
    refused(await scenario(provider, { history: 1, stopBeforePaste: true }, 'busy'), 'send.stopActive', { pastes: 0 });
  });
  test(`X6 ${provider}: Stop appearing while settling means one paste and zero Send`, async () => {
    refused(await scenario(provider, { stopAfterPasteMs: 150 }, 'busy later'), 'send.stopActive', { pastes: 1 });
  });
  test(`X6 ${provider}: Stop appearing inside the final readiness second means zero Send`, async () => {
    refused(await scenario(provider, { stopAfterPasteMs: 900 }, 'busy at the boundary'), 'send.stopActive', { pastes: 1 });
  });
  for (const [kind, cfg] of [['missing', { missingSend: true }], ['duplicate', { dupSend: true }], ['disabled', { disabledForever: true }]]) {
    test(`X6 ${provider}: ${kind} Send fails closed with the draft preserved`, async () => {
      const sim = await simulate(provider, cfg);
      try {
        const reply = await sim.run('draft stays');
        refused({ reply, actions: await sim.actions(), logs: sim.logs.lines }, 'send.visibleEnabled', { pastes: 1 });
        assert.equal(await sim.dom(() => document.querySelector('[contenteditable="true"]').innerText.trim()), 'draft stays');
      } finally { await sim.close(); }
    });
  }
  test(`X6 ${provider}: two composer attachments never reach Send`, async () => {
    refused(await scenario(provider, { attachment: true, multiCards: true }, LONG), 'attachment.exactlyOne', { pastes: 1 });
  });
  test(`X6 ${provider}: an attachment still processing never reaches Send`, async () => {
    refused(await scenario(provider, { attachment: true, cardBusyMs: 60000 }, LONG), 'composer.settled', { pastes: 1 });
  });
  test(`X6 ${provider}: after a refused draft is cleared manually the page sends normally`, async () => {
    const sim = await simulate(provider, { disabledForever: true });
    try {
      const first = await sim.run('first try');
      assert.equal(first.errorCode, 'send_uncertain');
      await sim.dom(() => {
        window.__sim.cfg.disabledForever = false;
        const editor = document.querySelector('[contenteditable="true"]');
        editor.textContent = '';
        editor.dispatchEvent(new Event('input'));
      });
      const second = await sim.run('second try');
      assert.equal(second.status, 'ok');
      assert.equal(second.content, 'native reply 1');
      const actions = await sim.actions();
      assert.equal(actions.paste, 2);
      assert.equal(actions.send, 1);
    } finally { await sim.close(); }
  });

  // X7: completion shapes.
  test(`X7 ${provider}: a reply finished inside one polling interval is captured`, async () => {
    sent(await scenario(provider, { history: 1, fast: true }, 'quick'));
  });
  test(`X7 ${provider}: Stop visible past busyHardTimeoutMs is completion_timeout without Copy`, async () => {
    const result = await scenario(provider, { neverStops: true }, 'endless',
      { configure: (config) => { config.completion.busyHardTimeoutMs = 60000; } });
    assert.equal(result.reply.errorCode, 'completion_timeout');
    assert.equal(result.actions.copy, 0);
    assert.equal(isCaptured(result.reply), false);
  });

  // X8 / PR-4: never started vs started-but-not-captured, and old replies.
  test(`X8 ${provider}: a click with no generation is completion_not_started`, async () => {
    const result = await scenario(provider, { history: 2, noStart: true }, 'nothing happens');
    assert.equal(result.reply.errorCode, 'completion_not_started');
    assert.equal(result.actions.send, 1);
    assert.equal(result.actions.copy, 0);
  });
  test(`X8 ${provider}: an old reply becoming last after windowing is never captured`, async () => {
    const result = await scenario(provider, { history: 3, oldLastFallback: true }, 'old becomes last');
    assert.equal(result.reply.errorCode, 'completion_not_started');
    assert.equal(result.actions.copy, 0);
  });
  test(`X8 ${provider}: BUSY observed but no Copy ever is capture_timeout`, async () => {
    const result = await scenario(provider, { history: 1, noCopy: true }, 'no copy',
      { configure: (config) => { config.completion.hardTimeoutMs = 20000; } });
    assert.equal(result.reply.errorCode, 'capture_timeout');
    assert.equal(result.actions.copy, 0);
  });
  test(`X8 ${provider}: a new reply reusing an old DOM node is captured`, async () => {
    sent(await scenario(provider, { history: 2, reuseNode: true }, 'reused node'));
  });
  test(`X8 ${provider}: a verbatim repeat of the previous answer is captured then marked staleSuspect`, async () => {
    const session = { rounds: [{ roundNumber: 1, replies: [{ agent: provider, status: 'ok', content: 'same answer' }] }] };
    const result = await scenario(provider, { history: 1, oldReply: () => 'same answer', reply: 'same answer' }, 'repeat it',
      { run: { session, roundNumber: 2 } });
    assert.equal(result.reply.content, 'same answer');
    assert.equal(result.actions.copy, 1);
    assert.equal(result.reply.staleSuspect, true);
    assert.equal(isCaptured(result.reply), false);
  });

  // r3 (a): history re-mount and a second assistant after the same user turn.
  test(`X8 ${provider}: an old user/assistant pair re-mounted before our prompt renders is never captured`, async () => {
    sent(await scenario(provider, { history: 2, remountOldPair: true, userDelayMs: 3000, startDelayMs: 3500 }, 'remount before render'));
  });
  test(`X8 ${provider}: an old pair re-mounted alongside our prompt still binds to our turn`, async () => {
    sent(await scenario(provider, { history: 2, remountOldPair: true }, 'remount with our prompt'));
  });
  test(`X9 ${provider}: a second assistant turn after the same user turn never pools Copy confirmations`, async () => {
    const result = await scenario(provider, { history: 1, secondAssistantMs: 8000 }, 'second assistant');
    assert.equal(result.reply.status, 'ok');
    assert.equal(result.reply.content, 'second reply');
    assert.equal(result.actions.copy, 1);
  });

  // r3 (b): hover-only Copy is reached by the single final reveal, then two Copy probes.
  for (const variant of ['copyNeedsHover', 'copyAttachOnHover']) {
    test(`X7 ${provider}: ${variant} Copy completes and is captured after exactly one final reveal`, async () => {
      const result = await scenario(provider, { history: 1, [variant]: true }, 'hover-only copy');
      sent(result);
      assert.equal(result.actions.revealMoves, 1, 'one pointer movement onto the reply body');
    });
  }
  test(`X7 ${provider}: an attached Copy needs no reveal movement at all`, async () => {
    const result = await scenario(provider, { history: 1 }, 'no reveal');
    sent(result);
    assert.equal(result.actions.revealMoves, 0);
  });

  // r4 S3-1: all history unmounts and only an old short pair re-mounts before our turn.
  test(`X8 ${provider}: a re-mounted old short pair after full unmount is never captured; our later reply is`, async () => {
    sent(await scenario(provider, { history: 2, remountOnly: true, userDelayMs: 8000, startDelayMs: 9000 }, 'remount only'));
  });
  test(`X8 ${provider}: a re-mounted old short pair with no reply of ours never becomes a success`, async () => {
    const result = await scenario(provider, { history: 2, remountOnly: true, noUserTurn: true, noStart: true }, 'remount, nothing new',
      { configure: (config) => { config.completion.hardTimeoutMs = 20000; } });
    assert.equal(isCaptured(result.reply), false);
    assert.equal(result.actions.copy, 0);
  });

  // r5 R2-1: an earlier identical prompt (it contains this dispatch's head) re-mounted as a pair.
  test(`X8 ${provider}: a re-mounted old pair whose user text contains our head never becomes a success`, async () => {
    const prompt = 'identical prompt sent before and again now';
    const result = await scenario(provider, { history: 2, oldQuestionText: prompt, remountOnly: true, noUserTurn: true, noStart: true },
      prompt, { configure: (config) => { config.completion.hardTimeoutMs = 20000; } });
    assert.equal(isCaptured(result.reply), false);
    assert.equal(result.actions.copy, 0);
  });
  test(`X8 ${provider}: resending an identical earlier prompt in a continuing chat is still captured`, async () => {
    const prompt = 'identical prompt sent before and again now';
    sent(await scenario(provider, { history: 2, oldQuestionText: prompt }, prompt));
  });

  // r5 R2-2: the confirmed reply changes in place while capture waits for the clipboard lock.
  for (const mutate of [true, false]) {
    test(`X9 ${provider}: ${mutate ? 'an in-place change during the clipboard-lock wait is rejected' : 'a lock wait without change still captures'}`, async () => {
      const { withClipboardLock } = require('../src/utils/clipboardLock');
      const sim = await simulate(provider, { history: 1 });
      try {
        await sim.adapter.sendMessage(sim.page, 'lock wait case');
        const completion = await sim.adapter.waitForCompletion(sim.page);
        assert.equal(completion.completed, true);
        let release;
        const held = withClipboardLock(() => new Promise((resolve) => { release = resolve; }));
        const capture = sim.adapter.captureLastReply(sim.page).then((value) => ({ value }), (error) => ({ error }));
        await new Promise((resolve) => setTimeout(resolve, 800));
        assert.equal((await sim.actions()).copy, 0, 'capture is waiting for the lock');
        if (mutate) {
          await sim.dom(() => {
            const node = window.__sim.replies.at(-1);
            node.dataset.reply = 'native reply Y';
            node.querySelector('.reply-text').textContent = 'native reply Y';
          });
        }
        release();
        await held;
        const result = await capture;
        if (mutate) {
          assert.equal(result.error?.code, 'capture_target_changed');
          assert.equal((await sim.actions()).copy, 0);
        } else {
          assert.equal(result.value, 'native reply 1');
          assert.equal((await sim.actions()).copy, 1);
        }
      } finally { await sim.close(); }
    });
  }

  // r6 R3-1: no long actionability wait after the in-lock check; a transient label is fine.
  test(`X9 ${provider}: a Copy disabled after the in-lock check and re-enabled for another reply is not awaited`, async () => {
    const { withClipboardLock } = require('../src/utils/clipboardLock');
    const sim = await simulate(provider, { history: 1 });
    try {
      await sim.adapter.sendMessage(sim.page, 'actionability wait case');
      assert.equal((await sim.adapter.waitForCompletion(sim.page)).completed, true);
      let release;
      const held = withClipboardLock(() => new Promise((resolve) => { release = resolve; }));
      const capture = sim.adapter.captureLastReply(sim.page).then((value) => ({ value }), (error) => ({ error }));
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Same node: Copy becomes temporarily unclickable, then the node turns into reply B.
      await sim.dom(() => { window.__sim.replies.at(-1).querySelector('button[aria-label="Copy"]').disabled = true; });
      release();
      await held;
      await new Promise((resolve) => setTimeout(resolve, 300));
      await sim.dom(() => {
        const node = window.__sim.replies.at(-1);
        node.dataset.reply = 'native reply B';
        node.querySelector('.reply-text').textContent = 'native reply B';
        node.querySelector('button[aria-label="Copy"]').disabled = false;
      });
      const result = await capture;
      assert.equal(result.error?.code, 'copy_not_actionable');
      assert.equal((await sim.actions()).copy, 0);
    } finally { await sim.close(); }
  });
  test(`X9 ${provider}: a transient "Copied" label inside the reply does not reject the capture`, async () => {
    sent(await scenario(provider, { history: 1, copiedLabel: true }, 'copied label'));
  });

  // r4 S3-2: a different reply of equal length in the same position, and a target swap at reveal.
  test(`X9 ${provider}: an equal-length replacement between probes restarts confirmation on the new reply`, async () => {
    const result = await scenario(provider, { history: 1, replaceReplyMs: 9000, replaceText: 'native reply X' }, 'replace');
    assert.equal(result.reply.status, 'ok');
    assert.equal(result.reply.content, 'native reply X');
    assert.equal(result.actions.copy, 1);
    assert.ok(result.actions.copyAt[0] - result.actions.replaceAt >= 5000, 'two fresh probes after the replacement');
  });
  test(`X9 ${provider}: a target swapped at the final reveal is never captured`, async () => {
    const result = await scenario(provider, { history: 1, copyAttachOnHover: true, replaceOnHover: true }, 'swap at reveal');
    assert.equal(isCaptured(result.reply), false);
    assert.equal(result.actions.copy, 0);
    assert.notEqual(result.actions.replaceAt, null, 'positive control: the swap happened');
  });

  // r3 (c): attachment error flag.
  test(`X6 ${provider}: an attachment card showing an error never reaches Send`, async () => {
    refused(await scenario(provider, { attachment: true, cardError: true }, LONG), 'attachment.error', { pastes: 1 });
  });

  // X9 / PR-2: probe-to-Copy continuity.
  test(`X9 ${provider}: a legitimate Copy re-render between probes still captures`, async () => {
    sent(await scenario(provider, { history: 1, rerenderCopyMs: 9000 }, 'rerender'));
  });
  test(`X9 ${provider}: another turn appearing before capture is never taken as this reply`, async () => {
    const result = await scenario(provider, { history: 1, switchTargetMs: 3000 }, 'switch',
      { configure: (config) => { config.completion.hardTimeoutMs = 20000; } });
    // Bound to our own user turn: the later turn's reply is never taken as ours.
    assert.notEqual(result.reply.content, 'other reply');
    assert.equal(result.reply.content, 'native reply 1');
  });

  // X10: the original clipboard payload is verified before the one paste.
  for (const [label, cfg, field] of [['read rejected', { clipboardReadFails: true }, 'clipboard.readbackMismatch'],
    ['read returns other text', { clipboardReadOther: true }, 'clipboard.readbackMismatch'],
    ['write rejected', { clipboardWriteFails: true }, 'clipboard.writeText']]) {
    test(`X10 ${provider}: clipboard ${label} means zero paste`, async () => {
      refused(await scenario(provider, cfg, 'clipboard check'), field, { pastes: 0 });
    });
  }

  // X11: Refresh provenance at the adapter boundary.
  test(`X11 ${provider}: Refresh after a dispatch captures the bound reply as verified`, async () => {
    const sim = await simulate(provider, { history: 1 });
    try {
      assert.equal((await sim.run('first')).status, 'ok');
      assert.equal(await sim.adapter.captureLastReply(sim.page, { force: true }), 'native reply 1');
      assert.equal((await sim.actions()).copy, 2);
    } finally { await sim.close(); }
  });
  test(`X11 ${provider}: Refresh without a dispatch binding is refresh_unverified with raw content`, async () => {
    const sim = await simulate(provider, { history: 2 });
    try {
      await assert.rejects(sim.adapter.captureLastReply(sim.page, { force: true }),
        (error) => error.code === 'refresh_unverified' && error.details.content === 'old answer 1');
    } finally { await sim.close(); }
  });

  // X13: privacy and compatibility.
  test(`X13 ${provider}: the prompt canary never reaches DIAG/log output`, async () => {
    const canary = 'CANARY_' + provider + '_7f3a91';
    const result = await scenario(provider, {}, `secret ${canary} body`);
    sent(result);
    assert.equal(result.logs.join('\n').includes(canary), false);
    assert.equal(result.actions.clipboardReads, 2, 'one pre-paste readback and one Copy read; nothing read before writing');
  });
  test(`X13 ${provider}: forceFullPaste compatibility still performs one full paste`, async () => {
    sent(await scenario(provider, {}, 'compat', { configure: (config) => { config.diagnostics.forceFullPaste = true; } }));
  });
  for (const [platform, key] of [['darwin', 'Meta'], ['win32', 'Control'], ['linux', 'Control']]) {
    test(`X13 ${provider}: ${platform} pastes once with the ${key} modifier and clicks the composer once`, async () => {
      const result = await scenario(provider, {}, 'platform key', { platform });
      sent(result);
      assert.deepEqual(result.actions.pasteKeys, [key]);
      assert.equal(result.actions.editorClicks, 1);
    });
  }
}

// X4 / P2: provider list formatting and carried-summary dash lines never block Send.
test('X4 gemini: line-leading dash payload autoformatted by the editor is sent once', async () => {
  sent(await scenario('gemini', { autoformatDash: true }, 'Review code\n- preserve this marker\n- and this\nEND'));
});
test('X4 gemini: carried summary with dash lines is part of the single payload', async () => {
  const result = await scenario('gemini', { history: 1, autoformatDash: true },
    { promptBlock: 'safe prompt', summaryBlock: 'previous notes\n- item\n- item 2' });
  sent(result);
});

// S3-3: Annex A15 Windows settle values reach the Claude send spec only on win32.
for (const [platform, custom, expected] of [
  ['win32', null, { timeoutMs: 20000, stableForMs: 200 }],
  ['win32', { inputSettleTimeoutMs: 31000, stableForMs: 321 }, { timeoutMs: 31000, stableForMs: 321 }],
  ['darwin', { inputSettleTimeoutMs: 31000, stableForMs: 321 }, { timeoutMs: 20000, stableForMs: 400 }],
  ['linux', null, { timeoutMs: 20000, stableForMs: 400 }]]) {
  test(`X13 claude ${platform}${custom ? ' custom' : ''}: Windows settle timing is gated by platform`, () => {
    const { load, logger } = require('./core06-fixtures/harness');
    const config = structuredClone(require('../config'));
    if (custom) Object.assign(config.claude.injection.windows, custom);
    const m = load('src/adapters/claude.js', { globals: { process: { platform, env: {} } },
      overrides: { '../../config': config, '../utils/logger': logger() }, expose: 'module.exports = CLAUDE_SEND_SPEC;' });
    assert.deepEqual({ ...m.api.settle }, expected);
  });
}

// r3 (c): Gemini's unverified attachment UI never sends; the draft stays.
test('X6 gemini: a paste that became an attachment is refused before Send', async () => {
  refused(await scenario('gemini', { attachment: true }, LONG), 'attachment.unverifiedProvider', { pastes: 1 });
});

// r3 B0 facts: a Send that never becomes actionable logs bounded structure facts only.
test('X6 claude: hidden Send logs bounded send_block facts without prompt text', async () => {
  const canary = 'CANARY_B0_' + 'q81z';
  const result = await scenario('claude', { attachment: true, hiddenSend: true }, canary + ' ' + LONG);
  refused(result, 'send.visibleEnabled', { pastes: 1 });
  const line = result.logs.find((entry) => entry.includes('[send_block]'));
  assert.ok(line, 'send_block DIAG present');
  const facts = JSON.parse(line.slice(line.indexOf('{')));
  assert.equal(facts.mode, 'attachment');
  assert.equal(facts.sendMatches, 1);
  assert.equal(facts.send[0].testid, 'chat-input-send');
  assert.equal(facts.send[0].inert, true);
  assert.ok(facts.send[0].hidingDepth >= 1);
  assert.ok(facts.samples.total > 0 && facts.samples.actionable === 0);
  assert.equal(result.logs.join('\n').includes(canary), false);
});

// X13: one global clipboard lock serialises simultaneous group operations.
test('X13 group: three providers dispatched together each capture their own reply', async () => {
  const sims = await Promise.all(PROVIDERS.map((provider) => simulate(provider, { history: 1, reply: `reply from ${provider}` })));
  try {
    const replies = await Promise.all(sims.map((sim) => sim.run('group prompt')));
    replies.forEach((reply, index) => {
      assert.equal(reply.status, 'ok');
      assert.equal(reply.content, `reply from ${PROVIDERS[index]}`);
    });
  } finally { await Promise.all(sims.map((sim) => sim.close())); }
});

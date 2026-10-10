const { createAgentError, sendFailureMessage } = require('./errors');
const logger = require('./logger');
const { sleep } = require('./time');
const { buildFullPromptText, injectPrompt, normalizeInputText } = require('./prompt');
const { captureReplyBaseline } = require('../adapters/copyCapture');

const ATTACHMENT_STABLE_MS = 800;
const SEND_STABLE_MS = 1000;
// Per-page dispatch context: the in-page baseline of turns that existed before the last
// Send and the reply id completion confirmed. Memory only; replaced by the next dispatch.
const contexts = new WeakMap();

function uncertain(field, cause) {
  return createAgentError('send_uncertain', sendFailureMessage(field), { stage: 'inject', blockingField: field },
    cause ? { cause } : {});
}

// Unknown Stop state is treated as active: a failed read is not verified absence.
async function stopVisible(page, selector) {
  try {
    const stop = page.locator(selector);
    const count = await stop.count();
    for (let index = 0; index < count; index += 1) {
      if (await stop.nth(index).isVisible()) return true;
    }
    return false;
  } catch {
    return true;
  }
}

// The composer editor is the first visible, editable match outside any conversation turn
// (a provider can render more than one matching textbox, e.g. inside history). Counts are
// logged; the empty-draft, Stop and Send checks still guard the actual action.
async function findComposerEditor(page, spec) {
  const deadline = Date.now() + spec.inputReadyTimeoutMs;
  while (true) {
    const all = page.locator(spec.editorSelectors.join(', '));
    const total = await all.count().catch(() => 0);
    let visible = 0;
    let chosen = null;
    for (let index = 0; index < total; index += 1) {
      const candidate = all.nth(index);
      if (!await candidate.isVisible().catch(() => false)) continue;
      visible += 1;
      const usable = await candidate.evaluate((element, turnSelector) => {
        const editable = element instanceof HTMLTextAreaElement || element instanceof HTMLInputElement
          ? !element.disabled && !element.readOnly
          : element.isContentEditable && element.getAttribute('aria-disabled') !== 'true';
        return editable && !element.closest(turnSelector);
      }, spec.turnSelector).catch(() => false);
      if (usable && !chosen) chosen = candidate;
    }
    if (chosen || Date.now() >= deadline) {
      if (visible !== 1) logger.info(`[DIAG][${spec.name}][send] editorCandidates visible=${visible} chosen=${chosen ? 1 : 0}`);
      return chosen;
    }
    await sleep(100);
  }
}

// The composer region is the largest ancestor of the editor that still holds exactly one
// editor and no conversation turn: no fixed depth and no build-generated class names.
async function readComposer(editor, spec) {
  return editor.evaluate((element, { editorSelector, turnSelector, cardSelector }) => {
    let root = null;
    for (let node = element.parentElement; node && node !== document.documentElement; node = node.parentElement) {
      if (node.querySelectorAll(editorSelector).length !== 1) break;
      if (node.querySelector(turnSelector)) break;
      root = node;
    }
    if (!root) return null;
    const cards = Array.from(root.querySelectorAll(cardSelector));
    const busy = cards.some((card) => card.matches('[aria-busy="true"]') ||
      Boolean(card.querySelector('[role="progressbar"], [aria-busy="true"]')));
    const errorFlag = '[role="alert"], [aria-invalid="true"], [data-state="error"]';
    const error = cards.some((card) => card.matches(errorFlag) || Boolean(card.querySelector(errorFlag)));
    const text = typeof element.value === 'string' ? element.value : element.innerText || element.textContent || '';
    return { text, cards: cards.length, busy, error };
  }, { editorSelector: spec.editorSelectors.join(', '), turnSelector: spec.turnSelector,
    cardSelector: spec.attachmentSelector }).catch(() => null);
}

// Inline: non-empty editor text unchanged for stableForMs. Attachment: the current card
// set unchanged and not visibly processing. Provider formatting of the text is accepted.
async function waitForSettled(editor, spec, { timeoutMs, stableForMs }) {
  const deadline = Date.now() + timeoutMs;
  let fingerprint = null;
  let since = Date.now();
  let snapshot = null;
  while (Date.now() < deadline) {
    snapshot = await readComposer(editor, spec);
    if (snapshot?.error) return { ready: false, error: true, mode: 'attachment', cards: snapshot.cards };
    if (snapshot) {
      const mode = snapshot.cards > 0 ? 'attachment' : 'inline';
      const next = `${snapshot.cards}:${snapshot.busy}:${normalizeInputText(snapshot.text).length}`;
      if (next !== fingerprint) {
        fingerprint = next;
        since = Date.now();
      }
      const hasContent = mode === 'attachment' ? !snapshot.busy : Boolean(normalizeInputText(snapshot.text));
      const needed = mode === 'attachment' ? Math.max(stableForMs, ATTACHMENT_STABLE_MS) : stableForMs;
      if (hasContent && Date.now() - since >= needed) return { ready: true, mode, cards: snapshot.cards };
    }
    await sleep(100);
  }
  return { ready: false, mode: snapshot?.cards ? 'attachment' : 'inline', cards: snapshot?.cards ?? null };
}

// Send must stay actionable (Playwright trial click: visible, enabled, stable, receives
// events) for SEND_STABLE_MS with Stop absent throughout. Hidden/inert Send never passes.
async function waitForSendReady(page, spec, timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  const samples = { total: 0, unique: 0, visible: 0, enabled: 0, actionable: 0 };
  let since = null;
  while (Date.now() < deadline) {
    if (await stopVisible(page, spec.stopSelector)) return { stop: true, samples };
    const send = page.locator(spec.sendSelector);
    samples.total += 1;
    const unique = await send.count().catch(() => 0) === 1;
    // Cheap visible/enabled reads first; the trial click (which waits) runs only when they pass.
    const visible = unique && await send.first().isVisible().catch(() => false);
    const enabled = visible && await send.first().isEnabled().catch(() => false);
    const actionable = enabled && await send.first().click({ trial: true, timeout: 250 }).then(() => true, () => false);
    samples.unique += unique ? 1 : 0;
    samples.visible += visible ? 1 : 0;
    samples.enabled += enabled ? 1 : 0;
    samples.actionable += actionable ? 1 : 0;
    if (actionable) {
      if (since === null) since = Date.now();
      if (Date.now() - since >= SEND_STABLE_MS) return { send: send.first(), samples };
    } else {
      since = null;
    }
    await sleep(100);
  }
  return { samples };
}

// Bounded facts for a Send that never became actionable: provider-authored test ids and a
// fixed role vocabulary only. No labels, text or prompt content leave the page.
async function describeSendBlock(editor, spec) {
  return editor.evaluate((element, { editorSelector, turnSelector, sendSelector }) => {
    let root = null;
    for (let node = element.parentElement; node && node !== document.documentElement; node = node.parentElement) {
      if (node.querySelectorAll(editorSelector).length !== 1) break;
      if (node.querySelector(turnSelector)) break;
      root = node;
    }
    const role = (node) => {
      const label = String(node.getAttribute('aria-label') || node.getAttribute('title') || '').toLowerCase();
      if (!label) return 'unlabeled';
      if (/\bsend\b|submit|\u53d1\u9001|\u63d0\u4ea4/.test(label)) return 'send';
      if (/stop|\u505c\u6b62/.test(label)) return 'stop';
      if (/voice|dictat|microphone|\u8bed\u97f3|\u9ea6\u514b\u98ce/.test(label)) return 'voice';
      if (/attach|upload|add|\u9644\u4ef6|\u4e0a\u4f20|\u6dfb\u52a0/.test(label)) return 'attach';
      if (/remove|delete|\u79fb\u9664|\u5220\u9664/.test(label)) return 'remove';
      if (/model|\u6a21\u578b/.test(label)) return 'model';
      if (/menu|more|option|tool|\u83dc\u5355|\u66f4\u591a|\u9009\u9879|\u5de5\u5177/.test(label)) return 'menu';
      return 'other';
    };
    const flags = (node) => {
      const result = { inert: false, hidden: false, opacity0: false, noPointer: false, hidingDepth: -1 };
      let depth = 0;
      for (let current = node; current; current = current.parentElement, depth += 1) {
        const style = getComputedStyle(current);
        const hiding = current.inert || style.visibility === 'hidden' || Number(style.opacity) === 0 || style.display === 'none';
        if (current.inert) result.inert = true;
        if (style.visibility === 'hidden' || style.display === 'none') result.hidden = true;
        if (Number(style.opacity) === 0) result.opacity0 = true;
        if (style.pointerEvents === 'none') result.noPointer = true;
        // Outermost hiding ancestor: inherited visibility makes every descendant look hidden.
        if (hiding) result.hidingDepth = depth;
      }
      return result;
    };
    const describe = (node) => {
      const rect = node.getBoundingClientRect();
      return { testid: String(node.getAttribute('data-testid') || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 40),
        role: role(node), disabled: node.disabled === true || node.getAttribute('aria-disabled') === 'true',
        box: rect.width > 0 && rect.height > 0, ...flags(node) };
    };
    const sends = Array.from(document.querySelectorAll(sendSelector));
    const first = location.pathname.split('/').filter(Boolean)[0] || 'root';
    return { path: first.replace(/[^a-z]/gi, '').slice(0, 12), rootFound: Boolean(root),
      sendMatches: sends.length, send: sends.slice(0, 3).map(describe),
      composerButtons: root ? Array.from(root.querySelectorAll('button')).slice(0, 20).map(describe) : [],
      editorTextLength: String(element.innerText || '').trim().length,
      editorFocused: document.activeElement === element || element.contains(document.activeElement) };
  }, { editorSelector: spec.editorSelectors.join(', '), turnSelector: spec.turnSelector,
    sendSelector: spec.sendSelector }).catch(() => null);
}

// One provider turn: one full paste and at most one Send click, no retry, no clearing.
// After the click the caller observes completion; delivery is not re-verified here.
async function sendOnce(page, payload, spec) {
  const startedAt = Date.now();
  const text = buildFullPromptText(payload);
  const actions = { pastes: 0, sends: 0 };
  let phase = 'pre-paste';
  try {
    logger.info(`[DIAG][${spec.name}][send] start len=${text.length} retryBudget=0`);
    const editor = await findComposerEditor(page, spec);
    if (!editor) throw uncertain('composer.selector');
    if (await stopVisible(page, spec.stopSelector)) throw uncertain('send.stopActive');
    const before = await readComposer(editor, spec);
    if (!before) throw uncertain('composer.scope');
    if (normalizeInputText(before.text) || before.cards > 0) throw uncertain('composer.initiallyEmpty');

    const previous = contexts.get(page);
    contexts.delete(page);
    await previous?.baseline?.dispose().catch(() => null);
    // Association hint only (never a send gate): the first 40 normalized prompt characters.
    const head = Array.from(normalizeInputText(text)).slice(0, 40).join('');
    const baseline = await captureReplyBaseline(page, spec.scope, head).catch(() => null);
    if (!baseline) throw uncertain('composer.scope');
    contexts.set(page, { baseline, confirmedId: null });

    try { await editor.click(); }
    catch (error) { throw uncertain('composer.activate', error); }
    try { await injectPrompt(page, payload); }
    catch (error) {
      if (!String(error?.details?.blockingField || '').startsWith('clipboard.')) phase = 'post-paste';
      throw error?.code === 'send_uncertain' ? error : uncertain('paste.singleFullPayload', error);
    }
    actions.pastes = 1;
    phase = 'post-paste';
    logger.info(`[DIAG][${spec.name}][send] paste_done`);

    const settled = await waitForSettled(editor, spec, spec.settle);
    if (settled.error) throw uncertain('attachment.error');
    if (!settled.ready) throw uncertain('composer.settled');
    if (settled.cards > 1) throw uncertain('attachment.exactlyOne');
    // A provider whose attachment UI has no verified readiness facts never sends one.
    if (settled.mode === 'attachment' && spec.attachmentVerified === false) throw uncertain('attachment.unverifiedProvider');
    const ready = await waitForSendReady(page, spec, spec.sendReadyTimeoutMs);
    if (ready.stop) throw uncertain('send.stopActive');
    if (!ready.send) {
      const facts = await describeSendBlock(editor, spec);
      logger.warn(`[DIAG][${spec.name}][send_block] ${JSON.stringify({ mode: settled.mode, cards: settled.cards,
        samples: ready.samples, ...(facts || { unavailable: true }) })}`);
      throw uncertain('send.visibleEnabled');
    }
    if (await stopVisible(page, spec.stopSelector)) throw uncertain('send.stopActive');

    phase = 'click';
    try { await ready.send.click({ timeout: 2000 }); }
    catch (error) { throw uncertain('send.click', error); }
    actions.sends = 1;
    phase = 'post-click';
    logger.info(`[DIAG][${spec.name}][send] send_clicked mode=${settled.mode} attachments=${settled.cards} elapsedMs=${Date.now() - startedAt}`);
  } catch (error) {
    const failure = error?.code === 'send_uncertain' || error?.code === 'selector_not_found'
      ? error : uncertain('send.unknown', error);
    logger.warn(`[DIAG][${spec.name}][send_failure] ${JSON.stringify({
      blockingField: failure.details?.blockingField || 'send.unknown', phase,
      pastes: actions.pastes, sends: actions.sends, elapsedMs: Date.now() - startedAt })}`);
    throw failure;
  }
}

function getDispatchContext(page) {
  return contexts.get(page) || null;
}

module.exports = { sendOnce, getDispatchContext, readComposer, stopVisible };

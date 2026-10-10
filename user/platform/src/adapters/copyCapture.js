const DEFAULT_POLL_INTERVAL_MS = 2000;
const DEFAULT_TIMEOUT_MS = 120000;
const POST_CLICK_CLIPBOARD_DELAY_MS = 300;
const COPY_TARGET_ATTRIBUTE = "data-helm-copy-target";
const REPLY_TARGET_ATTRIBUTE = "data-helm-reply-target";
const COPY_WRITE_TIMEOUT_MS = 3000;
const COPY_WRITE_POLL_MS = 100;
const COPY_CLICK_TIMEOUT_MS = 500;

const { withClipboardLock } = require("../utils/clipboardLock");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createCopyCaptureError(code, message, details = {}) {
  const error = new Error(message);
  error.code = code;
  error.details = details;
  return error;
}

function resolveCopyButtonLocator(messageLocator, copyButtonTarget) {
  if (!messageLocator) {
    throw createCopyCaptureError(
      "copy_message_missing",
      "A message locator is required for copy capture."
    );
  }

  if (!copyButtonTarget) {
    throw createCopyCaptureError(
      "copy_selector_missing",
      "A provider copy button selector or locator is required."
    );
  }

  return typeof copyButtonTarget === "string"
    ? messageLocator.locator(copyButtonTarget).first()
    : copyButtonTarget;
}

async function writeClipboard(page, value) {
  await page
    .evaluate(async (text) => navigator.clipboard.writeText(text), value)
    .catch((error) => {
      throw createCopyCaptureError(
        "clipboard_permission_denied",
        `Clipboard write failed: ${error.message}`,
        { cause: error.message }
      );
    });
}

async function readClipboard(page) {
  return page
    .evaluate(async () => navigator.clipboard.readText())
    .catch((error) => {
      throw createCopyCaptureError(
        "clipboard_permission_denied",
        `Clipboard read failed: ${error.message}`,
        { cause: error.message }
      );
    });
}

// Runs inside the page. Selects the reply turn and the one Copy control inside that turn's
// wrapper at or after its anchor, so a Copy control of any other turn can never match.
// Without a dispatch baseline it returns the latest turn (legacy/manual path). With one,
// the target is the last assistant turn after the newest user turn added since dispatch
// (or containing it); without such a user turn, a turn that is new and follows every
// still-mounted baseline turn. The returned id lets callers require that probes and the
// final Copy see the same reply. Pure DOM read plus optional marks; no scroll/focus/hover.
function locateLatestTurnInPage({ scope, markAttribute, turnAttribute = null, baseline = null }) {
  const hasBox = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };
  const follows = (earlier, later) =>
    Boolean(earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING);

  let count = 0;
  let turns = [];
  for (const selector of scope.messageSelectors) {
    const matches = Array.from(document.querySelectorAll(selector));
    const candidates = scope.visibleOnly ? matches.filter(hasBox) : matches;
    if (!candidates.length) {
      continue;
    }

    count = matches.length;
    turns = candidates;
    break;
  }

  for (const attribute of [markAttribute, turnAttribute].filter(Boolean)) {
    for (const marked of document.querySelectorAll(`[${attribute}]`)) {
      marked.removeAttribute(attribute);
    }
  }

  // Reply text without control labels (a Copy button attached on hover must not change it).
  const replyText = (node) => {
    const parts = [];
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (!walker.currentNode.parentElement?.closest("button")) parts.push(walker.currentNode.nodeValue);
    }
    return parts.join("").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
  };
  const digest = (value) => {
    let hash = 0x811c9dc5;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash.toString(16).padStart(8, "0");
  };

  let turn = null;
  let id = "";
  if (!baseline) {
    turn = turns.length ? turns[turns.length - 1] : null;
    id = turn ? "latest" : "";
  } else {
    const token = (node) => {
      if (!baseline.tokens.has(node)) baseline.tokens.set(node, baseline.next++);
      return baseline.tokens.get(node);
    };
    const oldUsers = baseline.userList.filter((node) => node.isConnected);
    const users = scope.userSelector
      ? Array.from(document.querySelectorAll(scope.userSelector)).filter(
          (node) => !baseline.users.has(node) && oldUsers.every((old) => follows(old, node))
        )
      : [];
    // Nested matches of one user turn collapse to the outermost node.
    const distinct = users.filter((node) => !users.some((other) => other !== node && other.contains(node)));
    const text = (node) => String(node.innerText || node.textContent || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    // The user turn carrying the dispatched prompt's head is ours, even if re-rendered. A
    // "new" node repeating an earlier prompt without that head is history re-mounted.
    // A node whose text equals a user turn that existed before dispatch is history, even when
    // it contains this dispatch's head (an identical earlier prompt re-mounted).
    const own = baseline.head
      ? distinct.filter((node) => text(node).includes(baseline.head) && !baseline.userTexts.has(text(node)))
      : [];
    const plausible = distinct.filter((node) => own.includes(node) || !baseline.userTexts.has(text(node)));
    const anchor = own.length ? own[own.length - 1] : plausible.length === 1 ? plausible[0] : null;
    if (!anchor && plausible.length > 1) {
      // More than one candidate user turn since dispatch cannot be attributed.
      turn = null;
    } else if (anchor) {
      // Only replies between our user turn and the next user turn after it belong to us.
      const allUsers = scope.userSelector ? Array.from(document.querySelectorAll(scope.userSelector)) : [];
      const nextUser = allUsers.find((node) => node !== anchor && !anchor.contains(node) && !node.contains(anchor) &&
        follows(anchor, node));
      const after = turns.filter((node) => (node.contains(anchor) || follows(anchor, node)) &&
        !(nextUser && (node.contains(nextUser) ? false : follows(nextUser, node))));
      turn = after.length ? after[after.length - 1] : null;
      // Same user turn and same position after it: a re-rendered node keeps the id, while a
      // further assistant turn after that user turn changes it.
      id = turn ? `u${own.length ? "own" : token(anchor)}#${after.length}` : "";
    } else {
      const oldTurns = baseline.assistants.filter((node) => node.isConnected);
      // Every baseline turn unmounted and no new user turn: old and new cannot be told apart.
      const fresh = baseline.assistants.length && !oldTurns.length
        ? []
        : turns.filter((node) => !baseline.assistantSet.has(node) && oldTurns.every((old) => follows(old, node)));
      turn = fresh.length ? fresh[fresh.length - 1] : null;
      id = turn ? `n${token(turn)}` : "";
    }
    // Without our own head-matched user turn, a candidate whose text equals a reply that
    // existed before dispatch is history re-mounted, never this dispatch's reply.
    if (turn && !own.length && baseline.assistantTexts.has(replyText(turn))) {
      turn = null;
      id = "";
    }
  }

  if (!turn) {
    return { count, started: false, id: "", copyAttached: false, textLength: 0, textDigest: "" };
  }
  const body = replyText(turn);

  // The button must live inside the turn's own wrapper (the turn itself unless the provider
  // renders its action bar in an enclosing response element), so unrelated Copy controls
  // elsewhere on the page — including ones after the latest turn — never match.
  const container = (scope.containerSelector && turn.closest(scope.containerSelector)) || turn;
  const anchors = scope.anchorSelector ? turn.querySelectorAll(scope.anchorSelector) : [];
  const anchor = anchors.length ? anchors[anchors.length - 1] : turn;
  const labelled = scope.copyButtonLabel
    ? Array.from(container.querySelectorAll("button")).filter(
        (button) =>
          (button.getAttribute("aria-label") || button.textContent || "").trim() ===
          scope.copyButtonLabel
      )
    : [];
  const candidates = Array.from(
    new Set([...container.querySelectorAll(scope.copyButtonSelector), ...labelled])
  ).sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  const copyButtons = candidates.filter(
    (button) =>
      !button.closest("pre, code") &&
      (!scope.excludedCopyAncestorSelector || !container.contains(button.closest(scope.excludedCopyAncestorSelector))) &&
      !button.closest('[data-user-message-bubble], [data-testid="user-message"], user-query, [class~="group/user-message"]') &&
      (button === anchor ||
      Boolean(anchor.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING))
  );
  const copyButton = copyButtons.length === 1 ? copyButtons[0] : null;

  if (copyButton && markAttribute) {
    copyButton.setAttribute(markAttribute, "1");
  }
  if (turnAttribute) {
    turn.setAttribute(turnAttribute, "1");
  }

  return {
    count,
    started: true,
    id,
    copyAttached: Boolean(copyButton),
    textLength: body.length,
    textDigest: digest(body),
  };
}

// Records, inside the page, which user and assistant turns already exist before a dispatch.
// The handle stays in memory for this page only; nothing is persisted or exposed on window.
async function captureReplyBaseline(page, scope, head = "") {
  return page.evaluateHandle(({ userSelector, messageSelectors, head }) => {
    const text = (node) => String(node.innerText || node.textContent || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    const userList = userSelector ? Array.from(document.querySelectorAll(userSelector)) : [];
    const assistants = Array.from(new Set(messageSelectors.flatMap((selector) =>
      Array.from(document.querySelectorAll(selector)))));
    const replyText = (node) => {
      const parts = [];
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        if (!walker.currentNode.parentElement?.closest("button")) parts.push(walker.currentNode.nodeValue);
      }
      return parts.join("").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
    };
    return { userList, users: new Set(userList), userTexts: new Set(userList.map(text)), head,
      assistants, assistantSet: new Set(assistants), assistantTexts: new Set(assistants.map(replyText)),
      tokens: new WeakMap(), next: 1 };
  }, { userSelector: scope.userSelector || "", messageSelectors: scope.messageSelectors, head });
}

// Read-only snapshot of the reply turn for completion polling. Deliberately does
// not scroll or hover, so the provider windows stay still while a reply is generating.
async function readLatestTurnState(page, scope, baseline = null) {
  return page
    .evaluate(locateLatestTurnInPage, { scope, markAttribute: null, baseline })
    .catch(() => ({ count: 0, started: false, id: "", copyAttached: false, textLength: 0, textDigest: "" }));
}

// Returns a locator for the reply turn's copy button only (never another turn's). The
// button is re-resolved and re-marked on every call, so pass this as a function target
// to pollForCopyButton to survive provider re-renders.
async function locateLatestTurnCopyButton(page, scope, baseline = null) {
  await page
    .evaluate(locateLatestTurnInPage, { scope, markAttribute: COPY_TARGET_ATTRIBUTE, baseline })
    .catch(() => null);
  return page.locator(`[${COPY_TARGET_ATTRIBUTE}="1"]`).first();
}

async function probeCopyReady(copyButtonLocator) {
  const usable = async () =>
    (await copyButtonLocator.isVisible().catch(() => false)) &&
    (await copyButtonLocator.isEnabled().catch(() => false));

  if (await usable()) {
    return true;
  }

  return usable();
}

async function pollForCopyButton(
  messageLocator,
  copyButtonTarget,
  intervalMs = DEFAULT_POLL_INTERVAL_MS,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  { requireEnabled = true } = {}
) {
  const resolveTarget =
    typeof copyButtonTarget === "function"
      ? copyButtonTarget
      : async () => resolveCopyButtonLocator(messageLocator, copyButtonTarget);
  const deadline = Date.now() + timeoutMs;
  let revealed = false;

  let readyOnce = false;
  while (Date.now() < deadline) {
    const copyButtonLocator = await resolveTarget();

    const visible = await copyButtonLocator.isVisible().catch(() => false);
    if (visible) {
      if (!requireEnabled) {
        return copyButtonLocator;
      }

      const enabled = await copyButtonLocator.isEnabled().catch(() => false);
      // Automatic capture needs the scoped Copy usable on two consecutive probes.
      if (enabled && readyOnce) {
        return copyButtonLocator;
      }
      readyOnce = enabled;
    } else {
      readyOnce = false;
    }

    // Final extraction only: one conditional target hover can reveal a missing
    // action bar. Polling never repeats movement or moves the whole page.
    if (!visible && !revealed) {
      revealed = true;
      await messageLocator.hover().catch(() => null);
    }

    await sleep(intervalMs);
  }

  return null;
}

// `force: true` is for operator-initiated manual refresh only: the person clicking Refresh
// Reply has already visually confirmed the copy control is sitting there, so this bypasses
// Playwright's own visible/enabled/actionability gate instead of re-deriving readiness from
// the DOM. Automatic per-round capture must never set this — it needs the real gate so it
// doesn't grab a stale or wrong-round button while content is still streaming.
async function clickCopyAndRead(page, messageLocator, copyButtonTarget, { force = false, verify = null } = {}) {
  if (!page) {
    throw createCopyCaptureError(
      "copy_page_missing",
      "A page instance is required for copy capture."
    );
  }

  const copyButtonLocator = resolveCopyButtonLocator(messageLocator, copyButtonTarget);

  const stillTarget = async (phase) => {
    if (verify && !(await verify(phase))) {
      throw createCopyCaptureError("capture_target_changed",
        "The confirmed reply changed while waiting for the clipboard; nothing was captured.");
    }
  };

  return withClipboardLock(async () => {
    // The lock can wait on another provider's paste/Copy; the page may change meanwhile.
    await stillTarget("beforeClick");
    const visible = await copyButtonLocator.isVisible().catch(() => false);
    if (!visible && !force) {
      throw createCopyCaptureError(
        "copy_button_not_visible",
        "Copy button is not visible for the target reply."
      );
    }
    // The verified target must be clickable now: waiting for it to become actionable again
    // would let a different reply take its place after the check. Manual Refresh recovers.
    if (!force && !(await copyButtonLocator.isEnabled().catch(() => false))) {
      throw createCopyCaptureError(
        "copy_not_actionable",
        "The confirmed reply's Copy control is not clickable now; nothing was captured."
      );
    }

    // Put a unique sentinel on the clipboard first, then require the click to replace it. If the
    // provider's Copy control did not actually write, the old clipboard content (often another
    // agent's reply) must never be returned as this agent's capture.
    const sentinel = `__HELM_COPY_SENTINEL_${Date.now()}_${Math.random().toString(36).slice(2)}__`;
    await writeClipboard(page, sentinel);

    // Automatic capture does not wait out a long actionability transition (see above).
    await copyButtonLocator.click(force ? { force } : { timeout: COPY_CLICK_TIMEOUT_MS }).catch((error) => {
      throw createCopyCaptureError(
        "copy_click_failed",
        `Copy button click failed: ${error.message}`,
        { cause: error.message }
      );
    });

    await sleep(POST_CLICK_CLIPBOARD_DELAY_MS);

    let copiedText = sentinel;
    const deadline = Date.now() + COPY_WRITE_TIMEOUT_MS;
    while (true) {
      copiedText = await readClipboard(page);
      if (copiedText !== sentinel || Date.now() >= deadline) {
        break;
      }
      await sleep(COPY_WRITE_POLL_MS);
    }

    if (copiedText === sentinel) {
      throw createCopyCaptureError(
        "copy_did_not_write",
        "The Copy control was clicked but did not write to the clipboard; nothing was captured."
      );
    }

    if (!String(copiedText || "").trim()) {
      throw createCopyCaptureError(
        "clipboard_empty",
        "Clipboard read succeeded but returned empty reply text."
      );
    }

    // After the click the reply must still be at the confirmed position; text is not compared
    // here because a provider may show a transient "Copied" label next to the control.
    await stillTarget("afterClick");
    return copiedText;
  });
}

// Shared automatic and manual-refresh capture of one reply. Automatic capture requires the
// dispatch-bound reply that completion confirmed (same id); a manual Refresh without that
// binding falls back to the latest turn and is always reported unverified.
async function captureReply(page, { scope, baseline = null, confirmedId = null, force = false,
  timeoutMs, label = "adapter" }) {
  const none = page.locator("[data-helm-no-target]").first();
  const turnLocator = page.locator(`[${REPLY_TARGET_ATTRIBUTE}="1"]`).first();
  const select = (bound) => page
    .evaluate(locateLatestTurnInPage, { scope, markAttribute: COPY_TARGET_ATTRIBUTE,
      turnAttribute: REPLY_TARGET_ATTRIBUTE, baseline: bound ? baseline : null })
    .catch(() => null);

  let bound = Boolean(baseline);
  let state = bound ? await select(true) : null;
  let unverified = false;
  if (!state?.started) {
    if (!force) {
      throw createCopyCaptureError("no_new_assistant_turn", `${label} has no reply for this dispatch.`);
    }
    bound = false;
    unverified = true;
    state = await select(false);
    if (!state?.started) {
      throw createCopyCaptureError("selector_not_found", `${label} assistant reply was not found.`);
    }
  }
  // The confirmed key is "<id>:<digest>": same reply position and same reply text.
  const keyOf = (value) => `${value.id}:${value.textDigest}`;
  const expectedId = !force && confirmedId ? confirmedId : keyOf(state);
  const resolveTarget = async () => {
    const current = await select(bound);
    if (!current?.started || (bound && keyOf(current) !== expectedId)) return none;
    return page.locator(`[${COPY_TARGET_ATTRIBUTE}="1"]`).first();
  };
  if (bound && keyOf(state) !== expectedId) {
    throw createCopyCaptureError("capture_target_changed", `${label} reply target changed before Copy.`);
  }

  let copyButton = await pollForCopyButton(turnLocator, resolveTarget, 250, timeoutMs,
    { requireEnabled: !force });
  if (!copyButton && force) {
    // Manual Refresh Reply: the operator has looked at the page; take the bottom-most Copy
    // directly. Its provenance is unknown, so the result is diagnostic only.
    copyButton = page.locator(scope.copyButtonSelector).last();
    unverified = true;
  }
  if (!copyButton) {
    throw createCopyCaptureError("selector_not_found", `${label} copy button did not resolve.`);
  }

  const verify = bound ? async (phase) => {
    const current = await select(true);
    if (!current?.started) return false;
    return phase === "afterClick" ? current.id === expectedId.split(":")[0] : keyOf(current) === expectedId;
  } : null;
  const content = await clickCopyAndRead(page, turnLocator, copyButton, { force, verify });
  if (unverified) {
    throw createCopyCaptureError("refresh_unverified",
      "Refresh Reply content lacks verified post-dispatch provenance and is diagnostic only.", { content });
  }
  return content;
}

module.exports = {
  captureReply,
  captureReplyBaseline,
  pollForCopyButton,
  clickCopyAndRead,
  readLatestTurnState,
  locateLatestTurnCopyButton,
  probeCopyReady,
};

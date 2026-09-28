const DEFAULT_POLL_INTERVAL_MS = 2000;
const DEFAULT_TIMEOUT_MS = 120000;
const POST_CLICK_CLIPBOARD_DELAY_MS = 300;
const SCROLL_SETTLE_MS = 250;
const COPY_TARGET_ATTRIBUTE = "data-helm-copy-target";

let clipboardReadChain = Promise.resolve();

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

async function withClipboardReadLock(task) {
  const previous = clipboardReadChain;
  let releaseLock = () => {};

  clipboardReadChain = new Promise((resolve) => {
    releaseLock = resolve;
  });

  await previous.catch(() => {});

  try {
    return await task();
  } finally {
    releaseLock();
  }
}

async function scrollToBottom(page) {
  if (!page) {
    throw createCopyCaptureError("copy_page_missing", "A page instance is required to scroll.");
  }

  await page.keyboard.press("End").catch(() => null);
  await page.evaluate(() => {
    const root = document.scrollingElement || document.documentElement || document.body;
    if (root) {
      root.scrollTop = root.scrollHeight;
    }
  }).catch(() => null);
  await sleep(SCROLL_SETTLE_MS);
}

// Runs inside the page. Resolves the latest assistant turn the same way the adapters'
// getLatestAssistantMessage does (first selector with matches wins; optionally only turns
// with a non-empty box), then picks the last copy button inside that turn's wrapper and at
// or after its anchor, so a copy button belonging to any other turn can never match.
// Pure DOM read (plus the optional mark) — no scrolling, focus, or hover.
function locateLatestTurnInPage({ scope, markAttribute }) {
  const hasBox = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };

  let count = 0;
  let turn = null;
  for (const selector of scope.messageSelectors) {
    const matches = Array.from(document.querySelectorAll(selector));
    const candidates = scope.visibleOnly ? matches.filter(hasBox) : matches;
    if (!candidates.length) {
      continue;
    }

    count = matches.length;
    turn = candidates[candidates.length - 1];
    break;
  }

  if (markAttribute) {
    for (const marked of document.querySelectorAll(`[${markAttribute}]`)) {
      marked.removeAttribute(markAttribute);
    }
  }

  if (!turn) {
    return { count: 0, copyAttached: false, textLength: 0 };
  }

  // The button must live inside the turn's own wrapper (the turn itself unless the provider
  // renders its action bar in an enclosing response element), so unrelated Copy controls
  // elsewhere on the page — including ones after the latest turn — never match.
  const container = (scope.containerSelector && turn.closest(scope.containerSelector)) || turn;
  const anchors = scope.anchorSelector ? turn.querySelectorAll(scope.anchorSelector) : [];
  const anchor = anchors.length ? anchors[anchors.length - 1] : turn;
  const copyButtons = Array.from(container.querySelectorAll(scope.copyButtonSelector)).filter(
    (button) =>
      button === anchor ||
      Boolean(anchor.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING)
  );
  const copyButton = copyButtons.length ? copyButtons[copyButtons.length - 1] : null;

  if (copyButton && markAttribute) {
    copyButton.setAttribute(markAttribute, "1");
  }

  return {
    count,
    copyAttached: Boolean(copyButton),
    textLength: (turn.textContent || "").length,
  };
}

// Read-only snapshot of the latest assistant turn for completion polling. Deliberately does
// not scroll or hover, so the provider windows stay still while a reply is generating.
async function readLatestTurnState(page, scope) {
  return page
    .evaluate(locateLatestTurnInPage, { scope, markAttribute: null })
    .catch(() => ({ count: 0, copyAttached: false, textLength: 0 }));
}

// Returns a locator for the latest assistant turn's copy button only (never an earlier
// turn's). The button is re-resolved and re-marked on every call, so pass this as a
// function target to pollForCopyButton to survive provider re-renders.
async function locateLatestTurnCopyButton(page, scope) {
  await page
    .evaluate(locateLatestTurnInPage, { scope, markAttribute: COPY_TARGET_ATTRIBUTE })
    .catch(() => null);
  return page.locator(`[${COPY_TARGET_ATTRIBUTE}="1"]`).first();
}

// One-shot "is the reply's Copy control usable right now?" check for completion polling. Hovers
// the turn only when the caller allows it (some providers reveal the action bar on hover), so
// the provider window stays still by default while a reply may still be generating.
async function probeCopyReady(copyButtonLocator, hoverLocator = null) {
  const usable = async () =>
    (await copyButtonLocator.isVisible().catch(() => false)) &&
    (await copyButtonLocator.isEnabled().catch(() => false));

  if (await usable()) {
    return true;
  }

  if (!hoverLocator) {
    return false;
  }

  await hoverLocator.hover().catch(() => null);
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

  while (Date.now() < deadline) {
    await messageLocator.scrollIntoViewIfNeeded().catch(() => null);
    await messageLocator.hover().catch(() => null);

    const copyButtonLocator = await resolveTarget();

    const visible = await copyButtonLocator.isVisible().catch(() => false);
    if (visible) {
      if (!requireEnabled) {
        return copyButtonLocator;
      }

      const enabled = await copyButtonLocator.isEnabled().catch(() => false);
      if (enabled) {
        return copyButtonLocator;
      }
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
async function clickCopyAndRead(page, messageLocator, copyButtonTarget, { force = false } = {}) {
  if (!page) {
    throw createCopyCaptureError(
      "copy_page_missing",
      "A page instance is required for copy capture."
    );
  }

  const copyButtonLocator = resolveCopyButtonLocator(messageLocator, copyButtonTarget);

  return withClipboardReadLock(async () => {
    await messageLocator.scrollIntoViewIfNeeded().catch(() => null);
    await messageLocator.hover().catch(() => null);

    const visible = await copyButtonLocator.isVisible().catch(() => false);
    if (!visible && !force) {
      throw createCopyCaptureError(
        "copy_button_not_visible",
        "Copy button is not visible for the target reply."
      );
    }

    await copyButtonLocator.click({ force }).catch((error) => {
      throw createCopyCaptureError(
        "copy_click_failed",
        `Copy button click failed: ${error.message}`,
        { cause: error.message }
      );
    });

    await sleep(POST_CLICK_CLIPBOARD_DELAY_MS);

    const copiedText = await page.evaluate(async () => {
      return navigator.clipboard.readText();
    }).catch((error) => {
      throw createCopyCaptureError(
        "clipboard_permission_denied",
        `Clipboard read failed: ${error.message}`,
        { cause: error.message }
      );
    });

    if (!String(copiedText || "").trim()) {
      throw createCopyCaptureError(
        "clipboard_empty",
        "Clipboard read succeeded but returned empty reply text."
      );
    }

    return copiedText;
  });
}

module.exports = {
  scrollToBottom,
  pollForCopyButton,
  clickCopyAndRead,
  readLatestTurnState,
  locateLatestTurnCopyButton,
  probeCopyReady,
};

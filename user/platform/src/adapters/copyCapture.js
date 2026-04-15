const DEFAULT_POLL_INTERVAL_MS = 2000;
const DEFAULT_TIMEOUT_MS = 120000;
const POST_CLICK_CLIPBOARD_DELAY_MS = 300;
const SCROLL_SETTLE_MS = 250;

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

async function pollForCopyButton(
  messageLocator,
  copyButtonTarget,
  intervalMs = DEFAULT_POLL_INTERVAL_MS,
  timeoutMs = DEFAULT_TIMEOUT_MS
) {
  const copyButtonLocator = resolveCopyButtonLocator(messageLocator, copyButtonTarget);
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    await messageLocator.scrollIntoViewIfNeeded().catch(() => null);
    await messageLocator.hover().catch(() => null);

    const visible = await copyButtonLocator.isVisible().catch(() => false);
    if (visible) {
      const enabled = await copyButtonLocator.isEnabled().catch(() => false);
      if (enabled) {
        return copyButtonLocator;
      }
    }

    await sleep(intervalMs);
  }

  return null;
}

async function clickCopyAndRead(page, messageLocator, copyButtonTarget) {
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
    if (!visible) {
      throw createCopyCaptureError(
        "copy_button_not_visible",
        "Copy button is not visible for the target reply."
      );
    }

    await copyButtonLocator.click().catch((error) => {
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
};

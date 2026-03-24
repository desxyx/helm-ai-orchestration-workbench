const config = require("../../config");
const { randomBetween, sleep } = require("./time");

const injectionConfig = config.injection || {};
const DEFAULT_PROMPT_LEAD_TYPED_CHARS = 100;
const DEFAULT_PROMPT_PASTE_PAUSE_MS = 1000;
const DEFAULT_INPUT_SETTLE_TIMEOUT_MS = 4000;
const DEFAULT_INPUT_EMPTY_TIMEOUT_MS = 2000;

async function typePromptWithStructuredNewlines(page, text, baseDelayMs) {
  const lines = text.split("\n");

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];

    for (const char of line) {
      const delay = randomBetween(baseDelayMs, baseDelayMs + 40);
      await page.keyboard.type(char, { delay });
    }

    if (lineIndex < lines.length - 1) {
      await page.keyboard.press("Shift+Enter");
    }
  }
}

function getPromptLines(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeInputText(text) {
  return String(text || "")
    .replace(/\u00a0/g, " ")
    .replace(/\r/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function resolvePromptSections(payload) {
  if (typeof payload === "string") {
    return {
      promptBlock: payload,
      summaryBlock: "",
    };
  }

  return {
    promptBlock: payload.promptBlock || payload.fullText || "",
    summaryBlock: payload.summaryBlock || "",
  };
}

function buildFullPromptText(payload) {
  const { promptBlock, summaryBlock } = resolvePromptSections(payload);

  if (!summaryBlock) {
    return promptBlock;
  }

  return promptBlock ? `${promptBlock}\n\n${summaryBlock}` : summaryBlock;
}

function resolveLeadTypedChars() {
  const configuredTypedChars = Number.parseInt(injectionConfig.promptLeadTypedChars, 10);
  return Number.isInteger(configuredTypedChars) && configuredTypedChars > 0
    ? configuredTypedChars
    : DEFAULT_PROMPT_LEAD_TYPED_CHARS;
}

function resolvePromptPastePauseMs() {
  const configuredPauseMs = Number.parseInt(injectionConfig.promptPastePauseMs, 10);
  return Number.isInteger(configuredPauseMs) && configuredPauseMs >= 0
    ? configuredPauseMs
    : DEFAULT_PROMPT_PASTE_PAUSE_MS;
}

async function findEditableInput(page, selectors) {
  const selectorList = Array.isArray(selectors) ? selectors : [selectors];

  for (const selector of selectorList) {
    const locator = page.locator(selector);
    const count = await locator.count().catch(() => 0);

    if (!count) {
      continue;
    }

    for (let index = 0; index < count; index += 1) {
      const candidate = locator.nth(index);
      const visible = await candidate.isVisible().catch(() => false);

      if (!visible) {
        continue;
      }

      const editable = await candidate
        .evaluate((element) => {
          if (
            element instanceof HTMLTextAreaElement ||
            element instanceof HTMLInputElement
          ) {
            return !element.disabled && !element.readOnly;
          }

          const ariaDisabled = element.getAttribute("aria-disabled") === "true";
          return element.isContentEditable && !ariaDisabled;
        })
        .catch(() => false);

      if (editable) {
        return { locator: candidate, selector };
      }
    }
  }

  return null;
}

async function readInputText(locator) {
  return locator
    .evaluate((element) => {
      if (
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLInputElement
      ) {
        return element.value || "";
      }

      if ("value" in element && typeof element.value === "string") {
        return element.value;
      }

      return element.innerText || element.textContent || "";
    })
    .catch(() => "");
}

async function waitForInputText(
  locator,
  expectedText,
  timeoutMs = DEFAULT_INPUT_SETTLE_TIMEOUT_MS
) {
  const normalizedExpected = normalizeInputText(expectedText);
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const currentInputText = await readInputText(locator);

    if (normalizeInputText(currentInputText) === normalizedExpected) {
      return true;
    }

    await sleep(100);
  }

  return false;
}

async function waitForInputEmpty(locator, timeoutMs = DEFAULT_INPUT_EMPTY_TIMEOUT_MS) {
  return waitForInputText(locator, "", timeoutMs);
}

async function clearInput(page, locator) {
  await locator.click();

  const modifier = process.platform === "darwin" ? "Meta" : "Control";
  await page.keyboard.press(`${modifier}+A`).catch(() => null);
  await page.keyboard.press("Backspace").catch(() => null);

  if (await waitForInputEmpty(locator, 600)) {
    return;
  }

  // F02: Preferred fallback — locator.focus() + locator.fill("").
  // Playwright's fill() triggers the full event chain (React synthetic events +
  // ProseMirror handleDOMEvents), unlike innerHTML="" + native dispatchEvent which
  // bypasses React's synthetic pipeline and leaves ProseMirror in dirty state.
  let fallbackCleared = false;
  try {
    await locator.focus();
    await locator.fill("");
    fallbackCleared = await waitForInputEmpty(locator, 1200);
  } catch {
    // fill() unsupported or threw — fall through to direct DOM fallback
  }

  if (!fallbackCleared) {
    await locator
      .evaluate((element) => {
        if (
          element instanceof HTMLTextAreaElement ||
          element instanceof HTMLInputElement
        ) {
          element.value = "";
        } else if ("value" in element && typeof element.value === "string") {
          element.value = "";
        } else if (element.isContentEditable) {
          element.innerHTML = "";
        } else {
          element.textContent = "";
        }

        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
      })
      .catch(() => null);

    await waitForInputEmpty(locator, 1200);
  }
}

async function pasteText(page, text) {
  if (!text) {
    return;
  }

  await page.evaluate(async (value) => {
    await navigator.clipboard.writeText(value);
  }, text);

  const modifier = process.platform === "darwin" ? "Meta" : "Control";
  await page.keyboard.press(`${modifier}+V`);
}

async function insertTextFast(page, text) {
  if (!text) {
    return;
  }

  await page.keyboard.insertText(text);
}

function splitPromptForInjection(text) {
  const chars = Array.from(text || "");

  if (!chars.length) {
    return {
      typedText: "",
      pastedText: "",
    };
  }

  const typedChars = resolveLeadTypedChars();
  const resolvedTypedChars = Math.min(chars.length, typedChars);

  return {
    typedText: chars.slice(0, resolvedTypedChars).join(""),
    pastedText: chars.slice(resolvedTypedChars).join(""),
  };
}

async function appendText(page, text, baseDelayMs, { preferPaste = true } = {}) {
  if (!text) {
    return;
  }

  if (preferPaste) {
    try {
      await pasteText(page, text);
      return;
    } catch {
      return appendText(page, text, baseDelayMs, { preferPaste: false });
    }
  }

  try {
    await insertTextFast(page, text);
    return;
  } catch {
    await typePromptWithStructuredNewlines(page, text, baseDelayMs);
  }
}

async function pauseBeforePaste(ms) {
  if (ms > 0) {
    await sleep(ms);
  }
}

async function injectPromptBlock(
  page,
  text,
  baseDelayMs,
  { pauseBeforePasteMs = 0 } = {}
) {
  const segments = splitPromptForInjection(text);

  if (!segments.typedText && !segments.pastedText) {
    return;
  }

  if (segments.typedText) {
    await typePromptWithStructuredNewlines(page, segments.typedText, baseDelayMs);
  }

  if (segments.pastedText) {
    await pauseBeforePaste(pauseBeforePasteMs);
    await appendText(page, segments.pastedText, baseDelayMs, { preferPaste: true });
  }
}

async function injectPrompt(page, payload, baseDelayMs, options = {}) {
  const { promptBlock, summaryBlock } = resolvePromptSections(payload);
  const pastePauseMs = resolvePromptPastePauseMs();

  if (promptBlock) {
    await injectPromptBlock(page, promptBlock, baseDelayMs, {
      pauseBeforePasteMs: pastePauseMs,
    });
  }

  if (summaryBlock) {
    const summarySuffix = promptBlock ? `\n\n${summaryBlock}` : summaryBlock;
    const pauseBeforeSummaryMs = promptBlock ? pastePauseMs : 0;
    await pauseBeforePaste(pauseBeforeSummaryMs);
    await appendText(page, summarySuffix, baseDelayMs, { preferPaste: true });
  }
}

module.exports = {
  buildFullPromptText,
  clearInput,
  findEditableInput,
  getPromptLines,
  injectPrompt,
  normalizeInputText,
  pasteText,
  readInputText,
  typePromptWithStructuredNewlines,
  waitForInputEmpty,
  waitForInputText,
};

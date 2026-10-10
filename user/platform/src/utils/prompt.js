const config = require("../../config");
const { createAgentError, sendFailureMessage } = require("./errors");
const { sleep } = require("./time");
const { withClipboardLock } = require("./clipboardLock");

const injectionConfig = config.injection || {};
const DEFAULT_PROMPT_PASTE_PAUSE_MS = 1000;
const PASTE_HOLD_AFTER_KEYPRESS_MS = 300;

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

function clipboardFailure(field, cause) {
  return createAgentError('send_uncertain', sendFailureMessage(field), { blockingField: field },
    cause ? { cause } : {});
}

async function pasteText(page, text) {
  if (!text) {
    return;
  }

  const modifier = process.platform === "darwin" ? "Meta" : "Control";

  // Held for the whole write -> verify -> Cmd+V sequence: the three provider browsers share one
  // OS clipboard, so without the lock another agent's paste or copy can swap the content in
  // between and this agent pastes the wrong text.
  await withClipboardLock(async () => {
    try {
      await page.evaluate(async (value) => navigator.clipboard.writeText(value), text);
    } catch (error) {
      throw clipboardFailure('clipboard.writeText', error);
    }

    // A rejected, unavailable or different readback means the paste could carry other
    // content, so nothing is pasted.
    const readBack = await page
      .evaluate(async () => navigator.clipboard.readText())
      .catch(() => null);
    if (readBack !== text) {
      throw clipboardFailure('clipboard.readbackMismatch');
    }

    await page.keyboard.press(`${modifier}+V`);
    await sleep(PASTE_HOLD_AFTER_KEYPRESS_MS);
  });
}

async function pauseBeforePaste(ms) {
  if (ms > 0) {
    await sleep(ms);
  }
}

// One clipboard payload includes prompt and carried summary at every length. The normal
// route has no typing/insert fallback: a failed paste is uncertain, never permission to
// mutate the composer a second time.
async function injectPrompt(page, payload) {
  await pauseBeforePaste(resolvePromptPastePauseMs());
  await pasteText(page, buildFullPromptText(payload));
}

module.exports = {
  buildFullPromptText,
  findEditableInput,
  injectPrompt,
  normalizeInputText,
  pasteText,
  readInputText,
};

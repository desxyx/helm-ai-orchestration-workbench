const { randomBetween } = require("./time");

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

async function injectPrompt(page, payload, baseDelayMs) {
  if (typeof payload === "string") {
    await typePromptWithStructuredNewlines(page, payload, baseDelayMs);
    return;
  }

  const summaryBlock = payload.summaryBlock || "";
  const promptBlock = payload.promptBlock || payload.fullText || "";

  if (summaryBlock) {
    try {
      await pasteText(page, summaryBlock);
    } catch {
      await typePromptWithStructuredNewlines(page, summaryBlock, baseDelayMs);
    }
  }

  if (summaryBlock && promptBlock) {
    await page.keyboard.press("Shift+Enter");
    await page.keyboard.press("Shift+Enter");
  }

  if (promptBlock) {
    await typePromptWithStructuredNewlines(page, promptBlock, baseDelayMs);
  }
}

module.exports = {
  getPromptLines,
  injectPrompt,
  pasteText,
  typePromptWithStructuredNewlines,
};

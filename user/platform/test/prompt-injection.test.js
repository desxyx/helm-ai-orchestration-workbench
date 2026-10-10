const assert = require("node:assert/strict");
const test = require("node:test");

const {
  injectPrompt,
} = require("../src/utils/prompt");

function createPageFixture({ failInsert = false } = {}) {
  const events = [];
  let clipboardText = "";

  return {
    events,
    page: {
      evaluate: async (_callback, value) => {
        if (value === undefined) {
          return clipboardText; // clipboard read-back
        }
        clipboardText = value;
        events.push(["clipboard", value]);
      },
      keyboard: {
        insertText: async (value) => {
          events.push(["insertText", value]);
          if (failInsert) {
            throw new Error("insert unavailable");
          }
        },
        press: async (key) => {
          events.push(["press", key, clipboardText]);
        },
        type: async (value) => {
          events.push(["type", value]);
        },
      },
    },
  };
}

test("obsolete insert mode still uses one full paste for a long prompt and summary", async () => {
  const fixture = createPageFixture();
  const longPrompt = "prompt ".repeat(700);
  const longSummary = "summary ".repeat(1500);

  await injectPrompt(
    fixture.page,
    { promptBlock: longPrompt, summaryBlock: longSummary },
    0,
    { promptMode: "insert", summaryMode: "insert" }
  );

  const full = `${longPrompt}\n\n${longSummary}`;
  assert.deepEqual(fixture.events, [["clipboard", full], ["press", PASTE_KEY, full]]);
});

const PASTE_KEY = process.platform === "darwin" ? "Meta+V" : "Control+V";

test("every long non-empty payload uses one full clipboard paste without lead typing", async () => {
  const fixture = createPageFixture();
  const prompt = "P".repeat(150);
  const summary = "S".repeat(300);
  const full = `${prompt}\n\n${summary}`;

  await injectPrompt(fixture.page, { promptBlock: prompt, summaryBlock: summary }, 0);

  assert.deepEqual(fixture.events.filter(([name]) => name === "clipboard"), [["clipboard", full]]);
  assert.deepEqual(fixture.events.filter(([name]) => name === "press"), [["press", PASTE_KEY, full]]);
  assert.equal(fixture.events.some(([name]) => name === "type" || name === "insertText"), false);
});

test("every short non-empty payload uses one full clipboard paste without lead typing", async () => {
  const fixture = createPageFixture();

  await injectPrompt(fixture.page, { promptBlock: "", summaryBlock: "summary" }, 0);

  assert.deepEqual(fixture.events.filter(([name]) => name === "clipboard"), [["clipboard", "summary"]]);
  assert.deepEqual(fixture.events.filter(([name]) => name === "press"), [["press", PASTE_KEY, "summary"]]);
  assert.equal(fixture.events.some(([name]) => name === "type" || name === "insertText"), false);
});

test("concurrent pastes from different agents never interleave on the shared clipboard", async () => {
  const { pasteText } = require("../src/utils/prompt");
  const shared = { clipboard: "", log: [] };
  const makePage = (name) => ({
    evaluate: async (_callback, value) => {
      if (value === undefined) {
        return shared.clipboard;
      }
      await new Promise((resolve) => setTimeout(resolve, 5));
      shared.clipboard = value;
    },
    keyboard: {
      press: async () => {
        shared.log.push([name, shared.clipboard]);
      },
    },
  });

  await Promise.all([
    pasteText(makePage("claude"), "claude-text"),
    pasteText(makePage("chatgpt"), "chatgpt-text"),
    pasteText(makePage("gemini"), "gemini-text"),
  ]);

  assert.deepEqual(
    shared.log.sort(),
    [
      ["chatgpt", "chatgpt-text"],
      ["claude", "claude-text"],
      ["gemini", "gemini-text"],
    ]
  );
});

test("obsolete insert mode keeps newlines in one full paste even when insert is unavailable", async () => {
  const fixture = createPageFixture({ failInsert: true });

  await injectPrompt(
    fixture.page,
    { promptBlock: "A\nB", summaryBlock: "" },
    0,
    { promptMode: "insert" }
  );

  assert.deepEqual(fixture.events, [["clipboard", "A\nB"], ["press", PASTE_KEY, "A\nB"]]);
});


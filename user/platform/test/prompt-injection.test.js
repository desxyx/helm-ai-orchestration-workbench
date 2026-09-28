const assert = require("node:assert/strict");
const test = require("node:test");

const {
  hasPositiveSubmissionEvidence,
  injectPrompt,
} = require("../src/utils/prompt");

function createPageFixture({ failInsert = false } = {}) {
  const events = [];
  let clipboardText = "";

  return {
    events,
    page: {
      evaluate: async (_callback, value) => {
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

test("insert mode keeps a long prompt and summary off the clipboard", async () => {
  const fixture = createPageFixture();
  const longPrompt = "prompt ".repeat(700);
  const longSummary = "summary ".repeat(1500);

  await injectPrompt(
    fixture.page,
    { promptBlock: longPrompt, summaryBlock: longSummary },
    0,
    { promptMode: "insert", summaryMode: "insert" }
  );

  assert.deepEqual(fixture.events, [
    ["insertText", longPrompt],
    ["insertText", `\n\n${longSummary}`],
  ]);
});

test("default summary mode preserves the existing clipboard-paste path", async () => {
  const fixture = createPageFixture();

  await injectPrompt(fixture.page, { promptBlock: "", summaryBlock: "summary" }, 0);

  assert.deepEqual(fixture.events, [
    ["clipboard", "summary"],
    ["press", process.platform === "darwin" ? "Meta+V" : "Control+V", "summary"],
  ]);
});

test("insert mode falls back to structured typing without clipboard paste", async () => {
  const fixture = createPageFixture({ failInsert: true });

  await injectPrompt(
    fixture.page,
    { promptBlock: "A\nB", summaryBlock: "" },
    0,
    { promptMode: "insert" }
  );

  assert.equal(fixture.events.some(([name]) => name === "clipboard"), false);
  assert.deepEqual(fixture.events, [
    ["insertText", "A\nB"],
    ["type", "A"],
    ["press", "Shift+Enter", ""],
    ["type", "B"],
  ]);
});

test("an empty composer alone is not submission evidence", () => {
  assert.equal(
    hasPositiveSubmissionEvidence({
      currentInputEmpty: true,
      stopButtonVisible: false,
      userTurnAdded: false,
      assistantTurnAdded: false,
      urlChanged: false,
    }),
    false
  );

  assert.equal(
    hasPositiveSubmissionEvidence({
      currentInputEmpty: true,
      userTurnAdded: true,
    }),
    true
  );
});

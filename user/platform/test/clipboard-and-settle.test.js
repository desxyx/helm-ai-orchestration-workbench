const os = require("node:os");
const path = require("node:path");

process.env.HELM_LOG_PATH = path.join(os.tmpdir(), "helm-clipboard-settle-test.log");

const test = require("node:test");
const assert = require("node:assert/strict");

// prompt.js helpers run their callbacks against a fake element; these globals let the
// `instanceof` checks inside readInputText evaluate in Node.
global.HTMLTextAreaElement = global.HTMLTextAreaElement || class {};
global.HTMLInputElement = global.HTMLInputElement || class {};

const { clickCopyAndRead } = require("../src/adapters/copyCapture");

function clipboardPage(initial) {
  const state = { clipboard: initial };
  return {
    state,
    page: {
      evaluate: async (_callback, value) => {
        if (value === undefined) {
          return state.clipboard;
        }
        state.clipboard = value;
      },
    },
  };
}

const quietMessage = { scrollIntoViewIfNeeded: async () => {}, hover: async () => {} };

test("a Copy click that does not write never returns the previous clipboard content", async () => {
  const { page } = clipboardPage("GEMINI REPLY FROM A MOMENT AGO");
  const deadButton = { isVisible: async () => true, isEnabled: async () => true, click: async () => {} };

  await assert.rejects(
    clickCopyAndRead(page, quietMessage, deadButton),
    (error) => error.code === "copy_did_not_write"
  );
});

test("a Copy click that writes returns exactly what it wrote", async () => {
  const fixture = clipboardPage("GEMINI REPLY FROM A MOMENT AGO");
  const liveButton = {
    isVisible: async () => true,
    isEnabled: async () => true,
    click: async () => {
      setTimeout(() => {
        fixture.state.clipboard = "CLAUDE REPLY";
      }, 50);
    },
  };

  assert.equal(await clickCopyAndRead(fixture.page, quietMessage, liveButton), "CLAUDE REPLY");
});

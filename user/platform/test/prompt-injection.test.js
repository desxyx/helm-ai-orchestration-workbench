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


// Each platform VM uses the same cached real clipboard lock as the direct-require tests above.
const realConfig = require("../config");
const realErrors = require("../src/utils/errors");
const realClipboardLock = require("../src/utils/clipboardLock");
const { load, clock } = require("./core06-fixtures/harness");

function loadPlatformPrompt(platform) {
  const fixtureTime = clock();
  return load("src/utils/prompt.js", {
    time: fixtureTime,
    globals: { process: { platform, env: {} } },
    overrides: {
      "../../config": realConfig,
      "./errors": realErrors,
      "./time": { sleep: fixtureTime.sleep },
      "./clipboardLock": realClipboardLock,
    },
  }).api;
}

function createReadbackFixture({ readback, rejectWrite = false, rejectRead = false }) {
  const events = [];
  return {
    events,
    page: {
      evaluate: async (_callback, value) => {
        if (value !== undefined) {
          events.push(["write", value]);
          if (rejectWrite) throw new Error("write denied");
          return;
        }
        events.push(["read"]);
        if (rejectRead) throw new Error("read denied");
        return readback;
      },
      keyboard: {
        press: async key => events.push(["press", key]),
        type: async value => events.push(["type", value]),
        insertText: async value => events.push(["insertText", value]),
      },
    },
  };
}

const boundaryLF = "A \u4e2d\u6587 😀\n\nB\t C\u00a0D\nend";
const boundaryCRLF = boundaryLF.replace(/\n/g, "\r\n");
for (const platform of ["win32", "darwin", "linux"]) {
  const key = platform === "darwin" ? "Meta+V" : "Control+V";
  for (const [name, text, readback, allowed] of [
    ["exact LF", boundaryLF, boundaryLF, true],
    ["exact CRLF", boundaryCRLF, boundaryCRLF, true],
    ["LF to CRLF", boundaryLF, boundaryCRLF, platform === "win32"],
    ["CRLF to LF", boundaryCRLF, boundaryLF, platform === "win32"],
  ]) {
    test(`clipboard boundary ${platform}: ${name}`, async () => {
      const api = loadPlatformPrompt(platform);
      const fixture = createReadbackFixture({ readback });
      if (allowed) {
        await api.pasteText(fixture.page, text);
        assert.deepEqual(fixture.events, [["write", text], ["read"], ["press", key]]);
      } else {
        await assert.rejects(() => api.pasteText(fixture.page, text), error =>
          error.code === "send_uncertain" && error.details.blockingField === "clipboard.readbackMismatch");
        assert.deepEqual(fixture.events, [["write", text], ["read"]]);
      }
    });
  }

  for (const [name, options, field, expectedReads] of [
    ["write rejection", { rejectWrite: true }, "clipboard.writeText", 0],
    ["read rejection", { rejectRead: true }, "clipboard.readbackMismatch", 1],
    ["null readback", { readback: null }, "clipboard.readbackMismatch", 1],
    ["empty readback", { readback: "" }, "clipboard.readbackMismatch", 1],
    ["non-string readback", { readback: { text: boundaryLF } }, "clipboard.readbackMismatch", 1],
  ]) {
    test(`clipboard boundary ${platform}: ${name} stays fail-closed`, async () => {
      const fixture = createReadbackFixture(options);
      await assert.rejects(() => loadPlatformPrompt(platform).pasteText(fixture.page, boundaryLF), error =>
        error.code === "send_uncertain" && error.details.blockingField === field);
      assert.deepEqual(fixture.events, [["write", boundaryLF], ...Array.from({ length: expectedReads }, () => ["read"])]);
    });
  }
}

for (const [name, readback] of [
  ["missing body character", boundaryCRLF.replace("B", "")],
  ["extra body character", boundaryCRLF + "x"],
  ["missing newline", boundaryCRLF.replace("\r\n", "")],
  ["missing blank line", boundaryCRLF.replace("\r\n\r\n", "\r\n")],
  ["inserted space", boundaryCRLF.replace("B", " B")],
  ["NBSP replaced", boundaryCRLF.replace("\u00a0", " ")],
  ["tab replaced", boundaryCRLF.replace("\t", " ")],
  ["emoji changed", boundaryCRLF.replace("😀", "😁")],
  ["other seat text", "other-seat\r\nreply"],
]) {
  test(`clipboard boundary win32: ${name} with CRLF stays rejected`, async () => {
    const fixture = createReadbackFixture({ readback });
    await assert.rejects(() => loadPlatformPrompt("win32").pasteText(fixture.page, boundaryLF), error =>
      error.code === "send_uncertain" && error.details.blockingField === "clipboard.readbackMismatch");
    assert.deepEqual(fixture.events, [["write", boundaryLF], ["read"]]);
  });
}

test("clipboard boundary win32: lone CR cannot be exchanged for LF", async () => {
  const fixture = createReadbackFixture({ readback: "A\nB" });
  await assert.rejects(() => loadPlatformPrompt("win32").pasteText(fixture.page, "A\rB"), error =>
    error.code === "send_uncertain" && error.details.blockingField === "clipboard.readbackMismatch");
  assert.deepEqual(fixture.events, [["write", "A\rB"], ["read"]]);
});

test("A22: platform VMs serialize concurrent pastes on one real clipboard lock", async () => {
  const shared = { clipboard: "", log: [] };
  const makePage = name => ({
    evaluate: async (_callback, value) => {
      if (value === undefined) return shared.clipboard;
      await new Promise(resolve => setTimeout(resolve, 5));
      shared.clipboard = value;
    },
    keyboard: {
      press: async () => {
        // Real host delay creates an overlap window even though the VM's hold sleep is virtual.
        await new Promise(resolve => setTimeout(resolve, 15));
        shared.log.push([name, shared.clipboard]);
      },
    },
  });
  await Promise.all([
    loadPlatformPrompt("win32").pasteText(makePage("claude"), "claude-text"),
    loadPlatformPrompt("darwin").pasteText(makePage("chatgpt"), "chatgpt-text"),
    loadPlatformPrompt("linux").pasteText(makePage("gemini"), "gemini-text"),
  ]);
  // Same clipboard-content assertion as the original direct-require concurrency test.
  assert.deepEqual(
    shared.log.sort(),
    [
      ["chatgpt", "chatgpt-text"],
      ["claude", "claude-text"],
      ["gemini", "gemini-text"],
    ]
  );
});

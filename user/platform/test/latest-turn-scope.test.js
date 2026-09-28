const assert = require("node:assert/strict");
const test = require("node:test");
const { chromium } = require("playwright");

const {
  locateLatestTurnCopyButton,
  readLatestTurnState,
} = require("../src/adapters/copyCapture");
const { waitForHybridCompletion } = require("../src/utils/completion");
const { applyStaleSuspect } = require("../src/orchestrator/roundRunner");

const GEMINI_SCOPE = {
  messageSelectors: ["message-content"],
  containerSelector: "model-response",
  copyButtonSelector: 'copy-button button[aria-label="Copy"]',
};
const CHATGPT_SCOPE = {
  messageSelectors: ['[data-turn-key]:has([data-conversation-role="assistant"])'],
  visibleOnly: true,
  anchorSelector: '[data-message-author-role="assistant"], [data-conversation-role="assistant"]',
  copyButtonSelector: 'button[data-testid="copy-turn-action-button"], button[aria-label="Copy"]',
};

const CLAUDE_SCOPE = {
  messageSelectors: ['[data-testid="assistant-message"]'],
  copyButtonSelector: '[data-testid="action-bar-copy"]',
};
const UNRELATED_COPY = '<copy-button><button aria-label="Copy">x</button></copy-button>' +
  '<button aria-label="Copy">x</button><button data-testid="action-bar-copy">x</button>' +
  '<button data-testid="copy-turn-action-button">x</button>';

const geminiTurn = (text, withCopy) =>
  `<model-response><message-content>${text}</message-content>${
    withCopy ? '<copy-button><button aria-label="Copy">c</button></copy-button>' : ""
  }</model-response>`;

let browser = null;

test.before(async () => {
  // Production launches the system Chrome channel; fall back to it when the bundled
  // Playwright chromium build is not installed.
  browser = await chromium
    .launch({ headless: true })
    .catch(() => chromium.launch({ channel: "chrome", headless: true }))
    .catch(() => null);
});

test.after(async () => {
  await browser?.close();
});

async function withPage(t, html, run) {
  if (!browser) {
    t.skip("headless chromium unavailable");
    return;
  }

  const page = await browser.newPage();
  try {
    await page.setContent(html);
    await run(page);
  } finally {
    await page.close();
  }
}

test("an earlier turn's copy button never counts for the latest turn", async (t) => {
  await withPage(t, geminiTurn("round 1 reply", true) + geminiTurn("round 2 stre", false), async (page) => {
    const state = await readLatestTurnState(page, GEMINI_SCOPE);
    assert.deepEqual(state, { count: 2, copyAttached: false, textLength: 12 });

    const locator = await locateLatestTurnCopyButton(page, GEMINI_SCOPE);
    assert.equal(await locator.count(), 0);
  });
});

test("the latest turn's copy button (sibling after the message) is found and marked", async (t) => {
  await withPage(t, geminiTurn("round 1 reply", true) + geminiTurn("round 2 reply", true), async (page) => {
    const state = await readLatestTurnState(page, GEMINI_SCOPE);
    assert.equal(state.copyAttached, true);

    const locator = await locateLatestTurnCopyButton(page, GEMINI_SCOPE);
    assert.equal(await locator.count(), 1);
    const markedIndex = await page.evaluate(() =>
      Array.from(document.querySelectorAll("copy-button button")).findIndex((button) =>
        button.hasAttribute("data-helm-copy-target")
      )
    );
    assert.equal(markedIndex, 1);
  });
});

test("a user-message copy button before the assistant anchor is ignored", async (t) => {
  const turn = (withAssistantCopy) =>
    `<div data-turn-key="t"><div data-user-message-bubble>q</div>` +
    `<button data-testid="copy-turn-action-button">user copy</button>` +
    `<div data-conversation-role="assistant">answer</div>` +
    (withAssistantCopy ? '<button data-testid="copy-turn-action-button">copy</button>' : "") +
    `</div>`;

  await withPage(t, turn(false), async (page) => {
    assert.equal((await readLatestTurnState(page, CHATGPT_SCOPE)).copyAttached, false);
  });
  await withPage(t, turn(true), async (page) => {
    assert.equal((await readLatestTurnState(page, CHATGPT_SCOPE)).copyAttached, true);
  });
});

test("reading turn state does not scroll the page", async (t) => {
  const tall = '<div style="height:5000px"></div>';
  await withPage(t, tall + geminiTurn("reply", true) + tall, async (page) => {
    await page.evaluate(() => window.scrollTo(0, 1234));
    await readLatestTurnState(page, GEMINI_SCOPE);
    assert.equal(await page.evaluate(() => window.scrollY), 1234);
  });
});

test("a reply already finished when polling starts completes via the pre-submit baseline", async () => {
  const page = { on() {}, off() {}, evaluate: async () => false, locator: () => null };
  const readReplyState = async () => ({ count: 2, text: "copy_ready:2:40" });

  const result = await waitForHybridCompletion({
    page,
    readReplyState,
    completionConfig: { pollIntervalMs: 10, stabilityWindowMs: 30, hardTimeoutMs: 2000 },
    baselineState: { count: 1, text: "" },
  });
  assert.equal(result.reason, "stable");
});

test("unrelated Copy controls after the latest turn never count (all three scopes)", async (t) => {
  await withPage(t, geminiTurn("round 1", true) + geminiTurn("round 2 stre", false) + UNRELATED_COPY, async (page) => {
    assert.equal((await readLatestTurnState(page, GEMINI_SCOPE)).copyAttached, false);
    assert.equal(await (await locateLatestTurnCopyButton(page, GEMINI_SCOPE)).count(), 0);
  });

  const chatgptTurn =
    '<div data-turn-key="t"><div data-conversation-role="assistant">streaming</div></div>';
  await withPage(t, chatgptTurn + UNRELATED_COPY, async (page) => {
    assert.equal((await readLatestTurnState(page, CHATGPT_SCOPE)).copyAttached, false);
    assert.equal(await (await locateLatestTurnCopyButton(page, CHATGPT_SCOPE)).count(), 0);
  });

  const claudeTurn = (withCopy) =>
    `<div data-testid="assistant-message">reply${
      withCopy ? '<button data-testid="action-bar-copy">c</button>' : ""
    }</div>`;
  await withPage(t, claudeTurn(true) + claudeTurn(false) + UNRELATED_COPY, async (page) => {
    assert.equal((await readLatestTurnState(page, CLAUDE_SCOPE)).copyAttached, false);
  });
  await withPage(t, claudeTurn(true) + claudeTurn(true) + UNRELATED_COPY, async (page) => {
    assert.equal((await readLatestTurnState(page, CLAUDE_SCOPE)).copyAttached, true);
    const markedIndex = await page.evaluate(() =>
      Array.from(document.querySelectorAll('[data-testid="action-bar-copy"]')).findIndex((button) =>
        button.hasAttribute("data-helm-copy-target")
      )
    );
    await locateLatestTurnCopyButton(page, CLAUDE_SCOPE);
    assert.equal(
      await page.evaluate(() =>
        Array.from(document.querySelectorAll('[data-testid="action-bar-copy"]')).findIndex(
          (button) => button.hasAttribute("data-helm-copy-target")
        )
      ),
      1
    );
    assert.equal(markedIndex, -1);
  });
});

function sessionWithPreviousReply(content) {
  return {
    rounds: [{ roundNumber: 1, replies: [{ agent: "gemini", status: "ok", content }] }],
  };
}

test("manual refresh recompute clears a stale flag when content changes (true -> false)", () => {
  const session = sessionWithPreviousReply("old reply");
  const reply = { agent: "gemini", status: "ok", content: "old reply" };
  assert.equal(applyStaleSuspect(reply, session, 2).staleSuspect, true);

  reply.content = "fresh reply";
  applyStaleSuspect(reply, session, 2);
  assert.equal("staleSuspect" in reply, false);
});

test("manual refresh recompute sets the flag when content becomes a repeat (false -> true)", () => {
  const session = sessionWithPreviousReply("old reply");
  const reply = { agent: "gemini", status: "ok", content: "fresh reply" };
  assert.equal("staleSuspect" in applyStaleSuspect(reply, session, 2), false);

  reply.content = "  old reply\n";
  assert.equal(applyStaleSuspect(reply, session, 2).staleSuspect, true);
});

test("timeout placeholders repeated across rounds are not flagged", () => {
  const placeholder =
    "[capture timeout] gemini reply was not captured before the provider copy button became available. Dispatch auto-unlocked by operator timeout policy.";
  const reply = { agent: "gemini", status: "ok", content: placeholder };
  assert.equal("staleSuspect" in applyStaleSuspect(reply, sessionWithPreviousReply(placeholder), 2), false);
});

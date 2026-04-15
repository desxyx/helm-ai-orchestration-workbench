# H.E.L.M Platform Capture Strategy Review

**Date**: 2026-04-13
**Scope**: `user/platform/src/adapters/` (`chatgpt.js`, `claude.js`, `gemini.js`)
**Focus**: How the platform reads/captures AI replies.

## Overview of the Capture Mechanism
The platform employs a **highly resilient, cascading fallback strategy** for capturing AI replies across all three adapters. Instead of relying solely on a single CSS selector (which is fragile to UI updates), the adapters progressively fall back to geometric DOM transversal and text filtering.

The capture logic can be summarized into three main layers:
1. **Targeted Selectors (Primary)**
2. **DOM Walker (Post-Prompt Traversal)**
3. **Broad Text Extraction & Filtering (Last Resort)**

### 1. Targeted Selectors (`readLastReplyFromSelectors`)
The platform tries to locate the most recent assistant message node using role attributes and configured selectors.
* **ChatGPT**: Relies on `[data-message-author-role="assistant"]`. It parses the message elements from bottom to top to capture the most recent group of assistant texts.
* **Claude**: Uses `lastDispatchHumanTurnCount` as an anchor. Since Claude retains historical DOM nodes, the adapter finds the specific `[data-testid="human-turn"]` node corresponding to the latest prompt. It then uses `compareDocumentPosition` to extract paragraphs (`p.font-claude-response-body`) strictly appearing *after* that human turn.
* **Gemini**: Iterates through a configured list of `replySelectors`, targeting the end of the matching nodes (`count - 1`).

### 2. DOM Walker (`readReplyAfterPrompt`)
If selectors fail or return incomplete text, the platform walks the DOM tree:
1. It searches the `main` or `body` element for the exact text of the `lastPromptText`.
2. Once the prompt element is located, a `TreeWalker` traverses forward, reading visible elements.
3. It ignores navigation bars, sidebars, and hidden nodes (checks `.getBoundingClientRect()` and `getComputedStyle`).
4. It stops reading when it senses a natural completion punctuation (`.!?` plus common full-width sentence endings).

### 3. Noise Filtering & Fallbacks (`readTextFromMain` / `isIgnoredReplyText`)
Because fallback extraction grabs raw UI text, each adapter has a bespoke noise filter (`isIgnoredReplyText`) to strip UI boilerplate from the captured stream.
* **ChatGPT Filters**: Distinguishes "ChatGPT said:", "Thought for...", "Sora", "Explore GPTs".
* **Claude Filters**: Strips "Claude is AI and can make mistakes.", "Sonnet", UI button text.
* **Gemini Filters**: Skips "Show thinking", "Gemini said", "Gems", "Google AI".
* The method `extractReplyFromFallbackLines` performs further heuristics, deduplicating repetitive blocks or skipping suspiciously short non-substantive lines.

## Summary
The logic is robust and built to withstand frequent UI changes from the AI providers. The use of DOM anchoring (especially Claude's `lastDispatchHumanTurnCount` checking) and position-based `TreeWalker` logic is advanced and ensures that even if CSS classes change entirely, the platform can still reliably scrape the response appearing directly after the injected prompt text.

---

## Addendum: Playwright Copy Button Targetability
**Objective:** Evaluate if Playwright can easily capture/click the 'Copy' button on the last reply for the 3 platforms.

**Conclusion: Highly Feasible (with Hover requirement)**
The copy buttons across all three platforms are semantically well-marked and thus very easy to target natively through Playwright locators.

* **ChatGPT (Easiest)**:
  * **Structure:** `data-message-author-role="assistant"` -> `button[aria-label="Copy"]`
  * **Test Snippet:** `page.locator('[data-message-author-role="assistant"]').last().locator('button[aria-label="Copy"]')`

* **Claude (Easiest)**:
  * **Structure:** `data-testid="assistant-message"` -> `button[aria-label="Copy"]` or `aria-label="Copy response"`
  * **Test Snippet:** `page.locator('[data-testid="assistant-message"]').last().locator('button[aria-label*="Copy"]')`

* **Gemini (Easy)**:
  * **Structure:** `message-content` component -> `button[mattooltip="Copy response"]`
  * **Test Snippet:** `page.locator('message-content, .message-content').last().locator('button[mattooltip="Copy response"], button[aria-label="Copy response"]')`

**Execution Caveat (The Hover Trap):**
To successfully execute a `.click()` action, Playwright must overcome the "Hover-to-reveal" styling common to their action bars. In an automated test/scraper, the outer message bubble must be brought into hover state (`await messageLocator.hover()`) before selecting the copy button, or the action must forcefully bypass visibility checks (`await copyBtnLocator.click({ force: true })`).

**Execution Caveat (The Hover Trap - Updated):**
*Correction based on EXT_12 Stage 5 live implementation:* The initial assumption that all action bars require a hover to reveal was partially inaccurate. In actual live runs, the copy button for the **latest** AI reply remains stably visible without hovering. However, enforcing a structural hover step (`await locator.hover()`) in the capture utility (`pollForCopyButton`) is still retained as a safe fallback for older structures or edge-case renders.

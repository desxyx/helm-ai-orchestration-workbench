# CORE_06 offline Stage 0 fixtures

These tests deliberately describe contract behavior before runtime implementation.
`CORE06 control` / `Annex ... control` cases characterize behavior to retain.
`CORE06 target` cases may be red at the dispatch HEAD; failures are evidence of
missing behavior, never a passing runtime claim. None are skipped or marked TODO.

Run serially from `user/platform`:

```
node --test --test-concurrency=1 --test-reporter=tap test/*.test.js
```

This is the exact file glob in `npm test`, with Node options placed before the
file list. Appending options through `npm test -- ...` leaves them after that list
in this repository's script and does not enforce serial execution on this Node.

The harness reads actual source and evaluates it in a CommonJS VM. Server startup
and its `ensureWebDataFiles()` call are excluded before evaluation; storage and
browser launch are memory-only boundary doubles. It does not import/start the
server. App functions are evaluated before listener/bootstrap registration. Real
send, acknowledgement, completion, Copy, summary, refresh and gate decisions are
asserted; synthetic DOM observations and clock advances are not live evidence.

Transport tests use real `injectPrompt` and real provider send/submit functions.
Composer reads, upload settling, turn snapshots and clipboard are fake boundaries.
No OS clipboard, authenticated profiles, real provider URL, account, or UI service
is used. The DOM tests use only fresh headless contexts, offline `setContent`, and
source-derived scopes with all requests aborted. Existing scope fixtures cover
user-message Copy; the new fixtures add code-block Copy and preserve scoped Copy
positive controls. A missing local browser fails setup rather than silently skips.

VM instrumentation is confined to this directory; no test exports are added to
runtime modules. Later implementation may require updating boundary doubles if
the module interface changes; contract assertions must not be weakened.

Stage 0 r2 resolves the historical Stop-completion, busy-cap and hover assertions
to the contract now. The original streak-reset test uses an idle page so it no
longer requires completion with visible Stop. The settle test uses one full-paste
attachment without a typed lead; the partial-inline negative is an observed
composer state, not an instruction to type. Exact per-test decisions are in the
Executor's HISTORICAL_TEST_DISPOSITIONS_r2.md.

Forced-refresh fixtures execute actual provider capture and server refresh/persist
logic, with synthetic scoped/global Copy resolution. Raw unverified text must reach
the caller and remain inspectable on the saved reply. Server writes are snapshots
in memory, not real historical session edits. Platform controls inject win32,
darwin and linux into VM globals: they verify source branching and configured
timings, not Windows host behavior or live key validity. Claude's plain Enter is
a newline. Platform-key controls evaluate only the actual source initializer's
platform-to-modifier mapping; they invoke no submit function and assert no success
with absent or disabled Send. Missing/disabled Send still requires zero submits in
the transport targets. Key capability and preselection require an approved Selector
Fact Sheet and remain outside Stage 0 targets; there are no skipped key targets.

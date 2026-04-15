# EXT_12 Reviewer Log — Public Excerpt

Task ref: CORE_06 / EXT_12
Purpose: public-safe excerpt of the staged reviewer log up to the point before Round 6 Attempt 2.

---

## Round 0 — ACK Confirmation

The executor acknowledged the staged-delivery contract, listed the allowed files, protected areas, and first action, and explicitly stopped at the confirmation gate before making any stage progress.

Reviewer confirmed:

- stage-by-stage sign-off would be handled directly
- Stage 4 timeout behavior required a separate product decision before implementation
- the executor could begin reading the required artifacts and move only to the Stage 1 boundary

## Round 1 — Stage 1 Archive

Executor delivery:

- created an adapter archive folder
- copied the three active adapters into the archive
- added a README with retirement reason and rollback anchor

Reviewer verification:

- archive folder existed
- all three adapter files were archived
- README existed with rollback context
- archived files matched active files byte-for-byte
- no active adapter was changed in this stage

Result: PASS

## Round 2 — Stage 2 copyCapture.js

Executor delivery:

- added a shared `copyCapture.js` utility
- implemented scroll-to-bottom behavior
- implemented copy-button polling
- implemented click-and-read clipboard capture
- implemented a serialized clipboard lock

Reviewer verification:

- expected exports were present
- clipboard lock stayed internal
- copy-button polling logic existed
- clipboard reads used the browser clipboard API
- no protected-area dependency was introduced
- active adapters were still unchanged at this stage

Result: PASS

## Round 3 — Stage 3 Adapter Replacements

Executor delivery:

- replaced reply capture in the three provider adapters
- removed the older DOM-walker and broad fallback path
- routed capture through `copyCapture.js`

Reviewer verification:

- all three adapters now used the shared capture utility
- provider-specific selectors stayed in the provider adapters
- the legacy DOM-scrape helpers were gone
- timeout and clipboard errors still flowed through the existing error path
- `roundRunner.js` was not changed during this stage

Result: PASS

## Round 4 — Stage 4 roundRunner.js Unlock Path

Before this stage, timeout behavior was explicitly confirmed at the product level.

Executor delivery:

- patched the narrow round-runner handoff point only
- added an auto-unlock path for capture timeout handling
- kept the response bounded so the run could complete without leaving dispatch stuck

Reviewer verification:

- stage scope stayed narrow
- the patch landed only at the handoff and timeout path
- protected areas remained untouched
- the staged design remained intact

Result: PASS

## Round 5 — Stage 5 Verification (Attempt 1) — NOT PASSED

Live verification showed that the first version of the copy-button strategy was still anchoring incorrectly in the DOM.

Reviewer required:

- direct DOM evidence instead of heuristic tuning
- proof of the actual message locator target
- proof of the real copy-button visibility and selector state
- evidence about whether hover failure came from DOM structure, shadow DOM, or layout obstruction

Result: NOT PASSED

---

This public excerpt stops before `Round 6 — Stage 5 Verification (Attempt 2) — NOT PASSED`, matching the requested publication boundary.

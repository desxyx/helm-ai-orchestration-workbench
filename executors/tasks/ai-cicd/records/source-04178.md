# Builder check record

Task: WATCHOVER_FINAL_PATCH_2026-10-07. Identity: Executor Actor 02.
Environment: macOS Darwin arm64, Node v26.8.1, npm 11.19.0, Git 2.53.0.
Existing Framework Python 3.12 and Playwright/Chromium were available; no installation.
Commands below ran from product/ except boundary comparisons from Builder root.

| Command | Evidence | Actual outcome |
| --- | --- | --- |
| node --test tests/view-handoff.test.mjs | F01-view.log | Initial sandbox execution failed to start loopback tests and hung in an existing readiness wait; stopped only that tool session with Ctrl-C. No implementation inference. |
| node --test --test-timeout=30000 tests/view-handoff.test.mjs | F01-view-retry.log | Approved run outside sandbox: exit 0, 5/5 checks. |
| node --test tests/workspace.test.mjs tests/cli.test.mjs tests/brief.test.mjs tests/semantic-checks.test.mjs tests/render.test.mjs tests/secret-scan.test.mjs tests/skills-workflow.test.mjs tests/skills.test.mjs | affected-first.log | Exit 1, 125/128; sandbox CLI listener refused, newly overlapping scanner canary expectation and router length budget caught. Corrected the overlap expectation explicitly and compacted prose without increasing the budget. |
| npm test (redirected) | regression-first.log | Exit 1, 282/285; existing exact source assertions caught wrapped/rephrased required guidance. Restored the original required phrases; no test assertions removed. |
| node --test tests/secret-scan.test.mjs tests/skills.test.mjs tests/skills-workflow.test.mjs tests/scenarios.test.mjs | docs-scanner-recheck.log | Exit 1, 35/36; remaining original shared-object wording assertion identified, restored directly. |
| npm test | regression-second.log | 284/286; output collection completed but exit status lost in a collector serialization error. Browser text was actually uppercase due to CSS; new test corrected to compare casing honestly and require a present indicator. Remaining shared-object phrase was already localized and then corrected. |
| node --test tests/scenarios.test.mjs | scenarios-recheck.log | Exit 0, 7/7, original shared-object assertions retained. |
| node --test tests/secret-scan.test.mjs tests/skills-workflow.test.mjs tests/skills.test.mjs tests/semantic-checks.test.mjs tests/commit-state.test.mjs | affected-final.log | Exit 0, 80/80. |
| npm test | regression-final.log | Exit 0, 286/286, 0 skipped/cancelled/todo. Final candidate source unchanged during and after this run. |
| git diff --check | tool output; final clean staged check in freeze.log | Exit 0. |
| Python baseline scope/byte comparison using git show baseline:path and local read_bytes | boundary-check.json | Exit 0; changed-path positive control; 84 protected files byte-identical, schemas hashed, package fields identical except 0.1.2 version. |
| git diff --binary <PRIVATE_REF_01823> | baseline-to-candidate.patch | Complete source diff; no schema, dependency, fixture or transaction module edits. |

One docs-check command was first invoked from Builder root using a product-relative test
path and a nonexistent ../output redirect; the shell refused the redirect before running
tests or writing anything. It was rerun from product/ as listed above.

The loopback sandbox failure was resolved through the required tool approval, not treated
as a product defect or a passing check. No cloud, credential, Docker or deployment action
was performed. Only existing local tools and synthetic fixtures were used. Server children,
headless browser sessions and disposable workspaces are closed/removed by the test finally
blocks and test tempDir exit cleanup; no persistent show server was retained.

F04-B commit-state exit 2 uses a test-only Node import hook to inject an evidence symlink
after the real rename, during directory sync. Real commitState and CLI paths run, the new
state bytes are present and the post-check reports the link; production has no added hook.
This is deterministic fault injection, not evidence of a spontaneous filesystem failure.

The brief's full open-intent locator is events.jsonl with its exact filtering predicate,
not an extra persisted summary. Historical snapshot locators are not proof of file contents;
brief directs the next session to read them, and explicitly counts missing locators.

Boundary self-review: only 31 authorized source/test files changed. Router prose was
compacted to retain its existing 170-line budget; four named stage and all provider budgets
remain unchanged. Decision card, six page sections, seven statuses and freshness calculation
are retained. New tests add behavioral controls; the existing scanner canary assertion
explicitly allows private_key to trigger both the old field check and the new *_KEY check.
Browser style assertions now distinguish problematic observations while retaining all
freshness/expiry and no-green-for-unverified checks.

Intake disclosure: no excluded operational/evaluation/review material was loaded. An early
filename-only startup search and a later unfiltered process-list request exposed navigation
and process command metadata (including unrelated paths/session launch arguments), not
session contents or operational/evaluation records. No such path or session was opened;
this metadata was not used as task evidence. All implementation inputs were this packet
and scoped product source. Automated existing tests read the product's neutral documentation
and synthetic rehearsal assets; no historical operation record was supplied as test input.

Remaining limits: guidance tests do not establish AI obedience or arbitrary target/action
authorization; Basic replies do not authenticate human identity; secret coverage is finite;
baseline digests compare only the chosen nonsecret projection and stay private; Git guard
does not affect tracked files or forced add; other OS/Node environments and actual cloud
operations remain unverified. Independent review is pending.

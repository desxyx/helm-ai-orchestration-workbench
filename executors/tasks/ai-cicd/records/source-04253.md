# r2 REVIEW_RETURN — complete local eight-patch candidate review

[Artifact Class]: IMMUTABLE_REVIEW; create once
[Task ref]: AI_CICD / WATCHOVER_MAC_CLOSE_20261006
[Reviewer]: Reviewer Actor 02 / OpenAI GPT-6; continuing independent VerifyOnly
[Clock]: 2026-10-06T17:22:13+11:00
[Submission]: rounds/r2_EXEC_SUBMISSION.md / <PRIVATE_REF_01332>
[Candidate]: main / <PRIVATE_REF_02324>
[Tree]: <PRIVATE_REF_01897>
[Version]: 0.1.1; clean worktree; no accepted tag
[Plan retained]: r2_PLAN.md + r3_PLAN.md; scoped plan PASS rounds/r3_PLAN_REVIEW.md
[Clarification]: rounds/r4_PROVIDER_NEUTRAL_CLARIFICATION.md / <PRIVATE_REF_03037>
[Verdict]: TARGETED_REWORK — finite WMC-1, WMC-2, WMC-3; no final product acceptance
[Own evidence pins]: rounds/r2_REVIEW_EVIDENCE.sha256 / <PRIVATE_REF_03450>

This is from Reviewer Actor 02.
05:22 pm

## Verified candidate and retained evidence

All eight items and r4 were reviewed against actual changed source, instructions, scenario records, tests and raw evidence. Actual HEAD/tree/version match the submission, the worktree is clean, and the three prior Owner edits were committed byte-identically in <PRIVATE_REF_02654>. All 10 Executor evidence pins match. The exact candidate archive matches every actual tracked file; own hashes and changed-file list are in candidate_verification.json.

Independent integrated run on that archive: **271/271 passed, 0 failed, 0 skipped**, including the existing real-browser view checks. The first sandbox attempt could not bind loopback and lacked archive Git metadata; it was interrupted and superseded by the complete host-authorized local run, with original output preserved. Git metadata was used only for read-only ls-files checks. No install or cloud access was needed.

RPL-1–RPL-3 are implemented and their relevant positive/negative controls passed: explicit candidate evidence-file existence, late pre-rename state/events comparison and invalid-record brief refusal. Valid baseline/candidate checks remain usable; the full suite passing at today's clock does not settle the finite gaps below.

## Complete confirmed blocking set

### WMC-1 — service test depends on the build day's live clock and expires one hour later (WO-P05)

**Locator:** tests/scenarios.test.mjs:14,23–28; fixtures/valid/scenarios/services-and-names/state.json health.api checked_at=2026-10-06T06:05:31Z, window=60 minutes.

**Independent reproduction:** run the unchanged test with a test-only Date.now preload set to checked_at+61 minutes (2026-10-06T07:06:31Z). Exit 1: line 27 expects verified-local, while the renderer correctly produces verified-expired and “freshness window ended”. Own raw services_after_expiry.tap and clock_after_api_expiry.mjs record it. The normal full suite passes now, but this committed test fails after 2026-10-06T07:05:31Z / 06:05 pm AEDT without any product change, and also cannot reliably run before its check time.

**Impact:** the final version's service acceptance/regression test is dependent on a one-hour wall-clock window. The fault is in the test, not in the honest freshness display. Refreshing the committed fixture timestamp to the latest clock would only move the failure window.

**Pass condition:** make the relevant fixture-rendering assertions use a deterministic explicit clock (or bounded synthetic timestamps constructed for that clock), retaining genuine fresh/expired/STALE/UNKNOWN and health-cap checks. Re-run the affected test independently of the host date. No runtime freshness change, background probe or new platform is requested.

### WMC-2 — reduced-package verification lacks its declared inventory and one-time disclosure record (WO-P04)

**Locator:** tests/skill-package.test.mjs:22–33; skills/router.md:52–55; submission P04 PASS row. PATCH_PLAN WO-P04 requires a declared inventory for intentional reduction; ACCEPTANCE_MATRIX requires one disclosure and preservation of the generic loop/approval rules. This candidate condition was already recorded in r2_PLAN_REVIEW's supported P04 row.

**Independent reproduction:** copy the exact skills package privately and remove providers/. The test detects five missing referenced providers, then checks regexes for “Say so once”, secrets and approval wording. It creates no declaration/list of the intentionally omitted files and no state/example with the missing-file names, impact or continuation responsibility. The candidate has no reduced-package inventory/example; none of its six scenario records records a package gap. Own review_probes.json records the five gaps, absence of a declaration and absent disclosure items. The full source package has zero dangling references and remains intact.

**Impact:** detecting missing files plus matching the instruction is not the required declared reduced-package example or evidence that its record preserves a single disclosure and the bounded continuation. Submission's full P04 PASS therefore overstates demonstrated coverage.

**Pass condition:** supply a small declared reduced-package fixture/inventory and a neutral record/example showing the one-time named gap, impact and actual next step/owner under unchanged gates and secrets rules. Check that actual omitted/included files match its declaration and that continuing the example does not duplicate the disclosure or invent permission. Keep complete-package checks/source providers intact. This is bounded fixture/document/test completion, not an export platform, automated AI rehearsal or new provider implementation.

### WMC-3 — shared-object undo example reuses plan acceptance without an explicit deletion/undo approval (WO-P07)

**Locator:** fixtures/valid/scenarios/shared-object-delta/events.jsonl:4–5,10–11; tests/scenarios.test.mjs:75–93; skills/stages/execute.md:55–58 and verify-handoff.md's deletion gate.

**Independent reproduction:** undo intent evt-0010 removes run-key-1..run-key-8, declares action_kinds=[local], and relates only to evt-0005. That decision answers dec-01 with categories=[plan_acceptance], summary “Human accepted the plan”, reply “approve”. No delete/destructive/explicit undo request or reply exists in the fixture. The fixture validates because the existing named check requires an earlier approval only for an intent marked gated; the test checks object reversal/hash and text but never the approval scope. Own review_probes.json preserves the actual chain and validation result.

**Impact:** the newly shipped shared-object example contradicts the required “Undo only that delta, with approval” and preserved deletion-gate semantics. It teaches a plan-only approval as sufficient for a later removal. The local 1+8-key reversal computation and UNKNOWN preservation case are valid evidence and should be retained.

**Pass condition:** correct only the synthetic example and its check to record an explicit scoped undo/deletion decision before the removal, relate the undo to that approval and mark the intent's gate consistently with the existing format. Check the requested/approved scope against the removal while retaining exact-delta/hash and UNKNOWN cases. No real deletion, new schema, permission engine or validator redesign is requested.

## All eight matrix dispositions

| Item | Independently verified local disposition |
|---|---|
| WO-P01 | Local implementation/checks supported: real-schema pointer/type/enum/length diagnostics; full semantic/events/evidence/secret candidate validation; missing/link/folder refusals; unchanged pre-replacement state; injected temp/rename failures; early/late detected stale state/events preservation; fsync/rename and honest post-replacement reporting. Single-writer and final comparison-to-rename window remain disclosed. |
| WO-P02 | Local docs/fixture/server coverage supported: correct workspace/actual loopback URL with port 0; early explicit page confirmation and actual-inaccessibility disclosed exception separated from ordinary approvals. Intent/result + USER_CONFIRMED page record is a schema-compatible disclosed deviation. Actual AI behavior remains Windows-owned UNVERIFIED. |
| WO-P03 | Local implementation/checks supported: full invalid-record refusal, secret-safe read-only behavior; shared fixed-now classification/minutes; 30-line and 200-fact limits; precise omitted/blocked totals and locator; human next action/owner matches HTML; historical approval ids/categories explicitly labelled history rather than new authority. |
| WO-P04 | Complete-package references, generic loop, secrets/gates wording and budgets pass. Reduced-package declaration/disclosure coverage blocked by WMC-2. |
| WO-P05 | Dynamic component rows, host/name relation, last observation/evidence, same-key update/history, unknown/stale/deleted/control and ≤60-minute class cap are supported. Deterministic regression acceptance blocked by WMC-1; renderer correctly expires at the tested future clock. |
| WO-P06 | Local logical-versus-real names (including implicit volume) and declaration-versus-runtime UNKNOWN/observation are supported; generic stage visibility and GCP disk/first-billable illustrations are truthful. No live cloud-name/runtime validation is claimed. |
| WO-P07 | Pure local 1-key baseline + 8-key delta → removal → original hash, whole-object-clear negative and unprovable-preservation UNKNOWN are supported. Correct scoped undo approval in the shipped example is blocked by WMC-3. Evidence-folder exclusion from Git is disclosed; recomputation within the test supplies the local relationship without requiring raw evidence in product Git. |
| WO-P08 | Observed interruption/pending intent, last safe state, resume-first live check, terminal waiting/next-owner/cleanup boundary and matching brief/HTML are supported using existing fields; no forced-kill auto-write promise. |
| r4 | Generic core/stages and local fixtures work without GCP/gcloud/profile. Shared rules are stage-visible and provider files remain illustrations; no multi-cloud validation claim. |

Supported rows and independent 271-pass output are retained, not a final release PASS. The three blockers are the complete confirmed set from this all-scope candidate pass. No additional feature request or scope conflict is being introduced.

## Precise return / handoff

**REVIEW_RETURN:** TARGETED_REWORK for exact commit <PRIVATE_REF_02324>, tree <PRIVATE_REF_01897>, version 0.1.1; finite findings WMC-1–WMC-3. **NEXT=EXECUTOR_REWORK.** Continue the existing r2 local patch lease; no new plan round or broad restart. Correct the three concrete test/example gaps, preserve existing edits and valid evidence, and submit the next unused Executor artifact with the new exact commit/tree/version and affected check evidence. Reviewer rechecks corrected items and their dependencies; integrated checks repeat only where the changes justify them.

**FINAL_HANDOFF status:** pending local acceptance, not ready for final freeze/tag/publication. No v0.1.1 acceptance or publication authorization is granted. On an accepted final candidate, bind the exact commit/tree/version and give Operations Coordinator the retained matrix/evidence, usable handoff commands and precise remaining publication locator. Remote URL/branch/visibility/fetch remain Operations Coordinator/Human Operator's separate concrete publication gate and do not block this finite local rework.

Actual AI HTML startup/guidance/wait/exception/same-task continuation and actual Windows rename/fsync/process/port operation remain Windows-owned UNVERIFIED. No Mac AI rehearsal, Docker preparation, cloud/API/SSH/DNS/credentials/install or product repair by Reviewer occurred or is requested.

End from Reviewer Actor 02.

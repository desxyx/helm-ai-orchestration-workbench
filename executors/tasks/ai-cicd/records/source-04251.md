# r2 PLAN_REVIEW — all eight WatchOver patches

[Artifact Class]: IMMUTABLE_REVIEW; create once
[Task ref]: AI_CICD / WATCHOVER_MAC_CLOSE_20261006
[Reviewer]: Reviewer Actor 02 / continuing OpenAI GPT-6, VerifyOnly
[Clock]: 2026-10-06T16:45:44+11:00
[Reviewed plan]: rounds/r2_PLAN.md
[Plan SHA-256]: <PRIVATE_REF_03074>
[Verdict]: TARGETED_REWORK — finite plan supplement only; no product implementation PASS yet
[Blockers / complete rework set]: RPL-1, RPL-2, RPL-3 below
[Independence]: Cross-family against current plan's Anthropic Claude Opus 5.5 EXEC_ACK; raw source and independently chosen premise probe. No product/code/test authorship by Reviewer. Earlier advisory ideas and remembered context are disclosed in current ACK; r3 permits continuation, not fresh isolation.

This is from Reviewer Actor 02.
04:45 pm

## Existing acceptance / exact version

No prior product plan or candidate has been accepted. r2_PLAN arrived during entry checks; its current EXEC_ACK matches the assigned continuing Executor. Existing baseline/Owner edits and historical reviews are preserved. Main HEAD <PRIVATE_REF_02752>, HEAD tree <PRIVATE_REF_02761>, package version 0.1.0-a; retained README/router/plan bytes independently unchanged at return. The committed HEAD tree excludes these three modifications. Proposed 0.1.1 / v0.1.1 is a permitted small-version choice, not an accepted/frozen release. No candidate submission is present.

Executor's 241/241 baseline is reported in the plan; this review does not repeat or independently claim that run. A single necessary synthetic premise probe was run with current installed Node v26.8.1. Own raw outcome and baseline binding are rounds/r2_PLAN_REVIEW_EVIDENCE.json. This is plan review, not complete implementation or Windows acceptance.

## Complete confirmed blocking set

### RPL-1 — missing-evidence rejection cannot be obtained merely by reusing the current validator

**Locator:** r2_PLAN.md:59 and its WO-P01 missing-locator test; current tools/lib/validate.mjs readEvidence/checkContent and tools/lib/semantic-checks.mjs verified-needs-evidence/references-resolve. PATCH_PLAN WO-P01 and ACCEPTANCE_MATRIX WO-P01 require rejection for a missing referenced evidence file.

**Independent reproduction:** copy the neutral valid 07-verified product fixture to /private/tmp, materialize all fact evidence locators as regular synthetic files, run validateWorkspace (ok=true), then remove one referenced file in that private copy and run the same validator again (ok=true, errors=[]). Positive control confirms the removed file was a regular file detected by the same check. Product fixture/source bytes are unchanged. Raw outcome retained in r2_PLAN_REVIEW_EVIDENCE.json.

**Impact:** readEvidence scans files actually present; current semantic checks verify nonempty locators/event bindings, not locator-to-file existence. The plan's “reuse checkContent + readEvidence … adds no new rules” premise does not implement the promised new candidate missing-locator gate. Secret scanning alone is insufficient.

**Pass condition:** supplement the P01 plan with explicit referenced-evidence resolution/existence handling in candidate validation, alongside the already-required evidence scan and semantic checks. Locate this check in the authorized candidate/helper surface and preserve declared manual/baseline compatibility; do not automatically widen validation elsewhere or rewrite historical fixtures just to satisfy it. Keep the planned positive and missing-file negative and unchanged-original-state assertions. No new cloud/evidence source is required.

### RPL-2 — stale-state/events comparison is too early in the written replacement sequence

**Locator:** r2_PLAN.md:67–68, WO-P01 Flow steps 4–5. PATCH_PLAN WO-P01 single-writer/detected-stale boundary; ACCEPTANCE_MATRIX stale state/events failure row.

**Reproduction of the plan sequence:** inject a state update or events append while the temporary candidate is being written/fsynced, after step 4's last comparison and before step 5's rename. The currently specified flow has no later comparison; it can replace a now-stale state. This is a sequencing finding in the plan, not a claim that the unimplemented command was executed.

**Impact:** the intended race detector leaves a controllable preparation window untested and can overwrite a newer record that a final comparison should detect if implemented as written.

**Pass condition:** explicitly compare original state/events after temp write/fsync and immediately before replacement, refuse and clean only the command's own temporary file when changed, and preserve newer state/events bytes. Add the same two injected changes at this late boundary to existing targeted tests. Maintain the honest single-writer/no-cross-file-transaction/no-perfect-multiwriter limits; no general locking platform is requested.

### RPL-3 — brief lacks an explicit invalid-record refusal path/test in the finite plan

**Locator:** r2_PLAN.md:115–137, WO-P03 Where/Output/Tests; ACCEPTANCE_MATRIX WO-P03 rejects a trustworthy summary from an erroneous record and requires read-only behavior.

**Review reproduction:** the P03 implementation outline specifies the summary/freshness helper, CLI and positive/special-time/200-fact/read-only tests, but does not specify the record-validity gate or any malformed/schema-invalid/inconsistent-record refusal. The existing validated-read helpers and schema/semantic surfaces are available; input-error behavior cannot be inferred from the new summary helper's existence.

**Impact:** the finite test plan can pass all enumerated positive cases while a bad record still yields a credible-looking brief. This is a plan coverage omission, not a present product defect.

**Pass condition:** state how brief detects/refuses the relevant invalid record before a normal trust/action summary, and add targeted malformed/schema-invalid and state/event inconsistency checks using existing validation or equivalent bounded reuse. Keep errors secret-safe, non-success/refusal explicit, workspace bytes/file set unchanged. Record source/evidence limitations honestly; this does not require a new state schema, second summary, or AI rehearsal.

## All eight scope results — plan level only

| Patch | Plan result | Coverage / retained candidate conditions |
|---|---|---|
| WO-P01 | TARGETED_REWORK: RPL-1/RPL-2 | Full candidate/events/evidence scan, real-schema diagnostic constraints, original-state hashes, fsync/rename errors and CLI redaction are planned; fix locator premise and final stale boundary before implementation. Candidate must distinguish pre- versus post-replacement errors. |
| WO-P02 | Plan scope supported | Preserve three edits, early correct-workspace show/actual URL/port fallback, explicit page confirmation versus actual-inaccessibility Owner exception and separate action approval; synthetic records/docs/local server checks. Real AI behavior remains Windows-only. |
| WO-P03 | TARGETED_REWORK: RPL-3 | Shared freshness, fixed-now boundary cases, ≤30 lines/200 facts, history-labelled approvals, actual next owner, no second state/read-only check; supplement invalid-record path. At candidate review, require accurate omitted and total blocking/stale counts per matrix, not just short output. |
| WO-P04 | Plan scope supported | ~10-line generic loop, complete reference checks, once-disclosed reduced-package gaps with original approvals/secrets and line budgets. Candidate must include the declared reduced-package inventory/fixture and its actual affected-file/impact record; missing files must not be silently treated as permission. |
| WO-P05 | Plan scope supported | Dynamic arbitrary components/host relationship/evidence/value/time/status using existing facts/resources; same-key update, UNKNOWN/stale/deleted-history fixtures and health cap. Resource presence/old health must not be labelled current service availability. |
| WO-P06 | Plan scope supported | Logical id plus returned physical name, declaration versus runtime evidence, implicit disk backfill, truthful first-billable scope. Candidate's positive/negative record examples must keep the source propositions distinct. |
| WO-P07 | Plan scope supported | Local 1-key baseline + 8-key delta and preserved original representation/hash, exact authorized reversal, SSH side-effect logging/API scope and UNKNOWN missing-proof rules. Candidate evidence must establish the local baseline→delta→reversal relationship and missing-proof disposition, rather than only equality of prefilled files. No real cloud work. |
| WO-P08 | Plan scope supported | Existing activity/next/handoff and shared brief/HTML owner/action; observed interruption and first unresolved-intent check, terminal running/acceptance/cleanup responsibility, no forced-kill guarantee or blanket clean declaration. |

Supported rows are acceptance of plan scope, not product feature PASS. All package/matrix obligations remain the finite candidate gate. Requirements already in the package are carried forward without creating new features or a separate P1 round.

## Nonblocking suggestions / outstanding dependencies

- Prefer affected suites at C1–C4 and one necessary integrated final suite when appropriate; running all 241 tests at every checkpoint is not itself an acceptance requirement. This is an efficiency suggestion, not a fourth blocker.
- 0.1.1 is a reasonable proposed small version within the authorized local scope; no new whole-task/version-direction approval is demanded. Freeze the exact final version/commit/tree after independent acceptance with any final version change included in that exact reviewed binding.
- Publication repository/branch/visibility and concrete remote action remain Operations Coordinator/Human Operator's separate gate and do not block local implementation after plan PASS. Reviewer performs no push/create/visibility change.
- Mac checks do not settle actual Windows rename/fsync/command/process semantics or AI HTML startup/guidance/wait/exception/continuation. Windows receives those as UNVERIFIED plus usable neutral examples and runtime/OS limits; do not require another Mac AI rehearsal or treat absent external measurement as a product bug.

## Exact next routing and evidence preservation

NEXT=EXECUTOR_PLAN. Executor supplies the next unused role-owned plan supplement (rounds/r3_PLAN.md if free) addressing RPL-1–RPL-3 and linking this immutable r2 plan/review; it need not redo the other six supported plan rows, discard Owner edits, replay accepted baseline evidence, or seek another whole-scope approval. No product edits before the independent scoped-plan PASS. Reviewer then checks only those concrete corrections and affected P01/P03 dependencies, reports genuinely new blockers if observed, and routes implementation under the unchanged eight-item r2 release when accepted.

At candidate handoff, independently inspect all changed files and necessary raw matrix evidence, preserve valid checks, return the full confirmed in-scope blocking set, and bind final local acceptance to exact commit/tree/version. No final candidate PASS/publication/Windows behavior claim is made now. Original reviews/submissions are never overwritten; raw test output here is neutral and local.

End from Reviewer Actor 02.

# MA-1 static producer-provenance — standing Executor/Reviewer closure task

[Artifact Class]: IMMUTABLE_EVIDENCE
[Prepared by]: OPERATIONS_COORDINATOR_Codex for Human Operator relay to both execution roles
[Task ref]: AI_CICD / MA-1 / STATIC_PROVENANCE_CLOSURE
[Executor]: Executor Actor 01 — WriteExecute, offline within the scope below
[Reviewer]: Reviewer Actor 02 — independent cross-model-family VerifyOnly
[Routing]: One standing release to both roles. No new Operations Coordinator release or Human Operator approval is required for an in-scope repair/review iteration.
[Human Operator source]: Active-session direction on 2026-10-02: Executor and Reviewer should iterate against Operations Coordinator's goal; Operations Coordinator accepts the final result instead of duplicating their work.

## Goal and completion condition

Close the static producer-provenance defects in the MA-1 adapter. A deployment inventory may qualify only when it is an unambiguous, exact registered producer's exclusive stdout, with complete field/reference custody and the same checks applied at initialization and restart. Ambiguous, malformed or deceptive evidence must fail closed and cannot permit A5 PASS.

The task ends when the independent Reviewer returns **PASS for this static scope**, the Executor's final candidate and evidence manifest are hash-bound, and all required positive/negative controls and preserved-evidence checks satisfy the Reviewer. Return the final submission and review locators/hashes together to Operations Coordinator for acceptance. Operations Coordinator will not redo the Executor's implementation or the Reviewer's tests.

## Starting evidence and defect

Workspace: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`.

R5 baseline:

- `executor/adapter_record_stage/ma1_verify_r5.py` — `<PRIVATE_REF_03224>`.
- `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R5.md` — `<PRIVATE_REF_02995>`.
- `evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R5` — `<PRIVATE_REF_01811>` (255 entries).

Reviewer Actor 02's Human Operator-relayed R5 review at 09:58 PM AEST is TARGETED_REWORK. It accepts exact argv, successful exit, unique producer ID, separate stderr, manifest custody, exclusive listing and existing deception refusals. The remaining material defect is `command_log_entries()` overwriting repeated start/exit, command, stdout and stderr fields; earlier claims/references disappear, permitting a false-positive producer.

Initial finite repairs are Reviewer Actor 02's R5-RW1–RW6: retain all material occurrences; require exactly one valid required field of each kind; reject malformed/repeated fields even when a later value is valid; preserve all stdout/stderr references when proving exclusive ownership; cover both field orders, hidden claimants in another entry and malformed material fields; retain existing positive and negative controls. The Executor chooses the minimal implementation. The Reviewer may request further corrections only where independent evidence identifies a material defect or direct regression within this same goal.

## Standing repair/review loop

1. **Executor works first.** Produce a versioned correction (begin with R6), candidate Record, offline checks, submission and manifest. Preserve all older revisions and raw captures. Explain the finite changes and all remaining genuine-evidence gaps. Hand the immutable submission to Reviewer.
2. **Reviewer reviews immediately after submission.** This release authorizes each independent offline review of an in-scope submitted revision. Read raw evidence and code, independently test meaningful controls, verify relevant custody, and write a versioned REVIEW_RETURN. Do not modify Executor artifacts or implementation.
3. **TARGETED_REWORK goes directly back to Executor.** Name finite defects and acceptance cases. Executor repairs them under this standing release and submits a new version; Reviewer rechecks the corrections and concrete regression risks. Continue without asking Operations Coordinator to reissue the task or reproduce tests.
4. **PASS returns the final pair to Operations Coordinator.** Stop this loop and provide final submission, Record, script, manifest and Reviewer-return paths and SHA-256 values. Operations Coordinator checks the completion verdict, custody references and authority boundaries before accepting the stage.
5. **Escalate only a real scope blocker.** Missing evidence that requires new runtime/network/credential actions, a Frozen Truth conflict, or work outside this static goal goes to Operations Coordinator/Human Operator with the precise decision needed. Difficulty or another finite parser defect is handled inside the loop.

For local handoff, use one non-governance coordination file in the MA-1 workspace: `evidence/adapter_record_stage/STATIC_PROVENANCE_LOOP_STATE.md`. Executor creates it; both may update it solely to record revision, `NEXT=EXECUTOR|REVIEWER|DONE|BLOCKED`, immutable submission/review locators and hashes, and current finite findings. Write the immutable artifacts before changing NEXT. Each role checks this shared file to pick up its turn; no service, daemon or external messaging integration is required. This operational file has no ratification authority.

## Scope and retained validation gaps

- Executor writes only versioned adapter code, candidate Record and evidence under the existing adapter-stage Executor roots, plus the shared loop state. Reviewer writes only its versioned review evidence under `evidence/adapter_record_stage/reviewer/`, temporary Reviewer state, and the shared loop state.
- Preserve R1–R5, runtime evidence and frozen fixtures. Do not reopen accepted local MA-1 controls except for a demonstrated direct regression.
- Authentic RT-030/031/032 must retain Gate A=true. RT-009 remains correctly rejected at Gate B because its compound command and mixed stdout do not satisfy the new producer rule. Preserve the explicitly synthetic dedicated-producer/VM positive and existing process/storage/deception negatives. Do not fabricate an authentic positive.
- Absence of an authentic Gate-B positive and absence of a registered GCP profile remain declared validation gaps. A PASS here closes only the static code scope; these gaps must not be hidden or mistaken for code defects that this offline loop can repair.
- This standing task permits no local VM rerun, GCP/resource creation, network, credentials, endpoints, browsers, services, dependency installation, product or Addendum changes, WF-8 closure or W2 activity. Genuine GCP validation requires its separately bounded dispatch under AMD-MA13-R1.
- Billing remains outside the W1–W3 project team's work.

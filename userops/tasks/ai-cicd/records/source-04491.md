# MA-1 R6 — finite command-log cardinality correction

[Artifact Class]: IMMUTABLE_EVIDENCE
[Prepared by]: OPERATIONS_COORDINATOR_Codex for Human Operator relay
[State]: Ready for Human Operator relay to Executor; no direct dispatch by Operations Coordinator
[Task ref]: AI_CICD / MA-1 / R5_STATIC_PROVENANCE / R5-RW1–R5-RW6
[Executor]: Executor Actor 01
[Capability]: WriteExecute, offline only, within the existing adapter-stage code and Executor evidence roots
[Basis]: Reviewer Actor 02 R5 `TARGETED_REWORK`, Human Operator-relayed 2026-10-02 09:58 PM AEST

Implement the one remaining code-level producer-provenance correction identified by Reviewer Actor 02. R5's exact argv, separate stderr, exclusive listing and intended deception refusals were accepted; do not redesign them. Scope code changes to command-log parsing, producer/exclusivity validation and their restart revalidation, with corresponding fixtures and Record updates. Preserve R1–R5 and original runtime evidence. No local VM rerun, GCP, network, credentials, endpoint, browser, service, Addendum or W2 action. Billing remains outside the project team's task.

## Frozen R5 baseline

Workspace: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`.

- `executor/adapter_record_stage/ma1_verify_r5.py`: `<PRIVATE_REF_03224>`.
- `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R5.md`: `<PRIVATE_REF_02995>`.
- `evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R5`: `<PRIVATE_REF_01811>` (255 checksum entries independently accepted by Reviewer Actor 02).

## Finite correction and acceptance cases

1. **R5-RW1/RW2 — occurrences and cardinality.** Preserve every occurrence of each material field. An entry must contain exactly one syntactically valid start/end/exit record, exactly one command, exactly one stdout locator/hash and exactly one stderr locator/hash. Repetition is invalid even when both values are identical. No last-value or first-value selection may collapse ambiguity into an accepted producer.
2. **R5-RW3 — malformed fields.** Count and reject attempted material fields with malformed content; do not silently skip them and accept a later valid field. Validate the registered log grammar. An invalid material entry must make inventory provenance fail closed; do not drop an invalid entry when proving unique ownership of an output. Preserve explicitly supported non-material metadata without introducing a new logging framework.
3. **R5-RW4 — all references.** Retain all stdout/stderr references across all entries while checking ownership of the inventory record and producer stderr. A repeated field, malformed entry or later replacement must not hide an earlier claimant. Revalidation at restart must enforce the same rules and retain inventory=false on failure.
4. **R5-RW5 — negatives.** Cover command duplicates in both orders, nonzero/zero exit duplicates in both orders, stdout duplicates in both orders, stderr duplicates in both orders, and a second entry whose earlier inventory/stdout or producer-stderr reference is replaced later. Include malformed-then-valid, valid-then-malformed and identical duplicate controls for the material fields. Keep fixture hashes self-consistent so rejection proves syntax/cardinality/ownership checks rather than incidental hash failure. Every case must refuse initialization; if forcibly bound into state, it must yield inventory=false and restart `UNVERIFIED`, refuse `a5-check`, and prevent A5 `PASS`.
5. **R5-RW6 — retained controls.** Retain the current synthetic dedicated producer and synthetic VM positive, the four RW-8 deception classes plus appended-listing refusal, authentic RT-009 rejection, authentic RT-030/031/032 Gate-A=true result, and process/storage negatives. The authentic combined bundle must remain `UNVERIFIED` due to Gate B. Do not manufacture an authentic positive or execute the local VM.

Issue versioned `ma1_verify_r6.py`, `MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R6.md`, a finite offline check log and new manifest, leaving all R5 files unchanged. Verify the preserved evidence and frozen fixtures. Return one `ADAPTER_RECORD_R6_LOG_CARDINALITY_SUBMISSION` with a direct R5-RW1–RW6 mapping, exact test outcomes, new hashes, minimal code-diff summary and unchanged-evidence proof. Stop for a separate independent VerifyOnly review release.

A PASS would close only the static producer-provenance slice. The absent authentic Gate-B positive and unvalidated GCP profiles remain separate validation gaps. No Adapter Record ratification, WF-8 closure or W2 entry is implied.

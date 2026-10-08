# MA-1 MINIMAL FIXTURE — DIFF-ONLY REVIEW RELEASE R1

[Artifact Class]: IMMUTABLE_EVIDENCE
[Released]: 2026-10-01T15:59:03+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / MINIMAL_FIXTURE_BUILD_R1 / TARGETED_REWORK_R1
[Release state]: RELEASED TO `Reviewer Actor 02`
[Capability]: VerifyOnly
[Executor state]: stopped; no further rework released

## Objective

Perform one final diff-only verification of the two finite corrections. Do not reopen the accepted API probe, defect patch, construction incidents, A3/A5 survey, harness design or policy unless the submitted diff directly contradicts a closed finding.

## Controlling inputs

- Initial static review release: `source-04504.md`, SHA-256 `<PRIVATE_REF_03179>`.
- Targeted rework release: `source-04505.md`, SHA-256 `<PRIVATE_REF_01379>`.
- Targeted rework intake: `../../../../council/task/ai-cicd/council-records/source-00544.md`, SHA-256 `<PRIVATE_REF_01038>`.

Construction root: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`.

## Current four-file set

- `executor/minimal_fixture_build/test_alerta_api_smoke.py`, SHA-256 `<PRIVATE_REF_00881>` — closed/unchanged.
- `executor/minimal_fixture_build/A3_N_STATUS_201_TO_200.patch`, SHA-256 `<PRIVATE_REF_02382>` — closed/unchanged.
- `executor/minimal_fixture_build/test_alerta_ui_flow.py`, SHA-256 `<PRIVATE_REF_03225>` — revised.
- `executor/minimal_fixture_build/MA1_MINIMAL_FIXTURE_SPEC.md`, SHA-256 `<PRIVATE_REF_01587>` — revised.

Rework evidence:

- `evidence/minimal_fixture_build/executor/rework_r1/SHA256SUMS_FX_RW1`, SHA-256 `<PRIVATE_REF_00963>`.
- `evidence/minimal_fixture_build/executor/rework_r1/RAW_COMMAND_LOG_FX_RW1.md`, SHA-256 `<PRIVATE_REF_01345>`.
- Old UI/spec copies under `rework_r1/original_r1/`, hashes `<PRIVATE_REF_03713>` and `<PRIVATE_REF_03565>`.

## Required verification

Use direct/raw-first verification. Executor and Operations Coordinator narratives are context only.

1. Reproduce the intake, four primary and two rework-evidence hashes; verify all 24 `SHA256SUMS_FX_RW1` entries and exactly four primary files.
2. Diff the revised UI/spec against the preserved R1 originals. Confirm no unreported primary change and that API probe/patch remain byte-identical.
3. Confirm the UI implements exactly: signup; fresh-context explicit first `/auth/login` 200; protected `/alerts`; ProfileMe logout; denial/redirect; wrong-password `/auth/login` 401 while on `/login`; second `/auth/login` 200; protected `/alerts` again.
4. Confirm closing the signup context and creating a fresh context is a bounded, technically sufficient static method for discarding the auto-authenticated browser session. Record any runtime-only uncertainty as an evidence gap, not a design expansion.
5. Confirm the specification matches the UI order, says seven HTTP requests for six A3-P tests, and accurately distinguishes universal `ts`/`step`/`result` fields from conditional details.
6. Confirm the original manifest remains immutable and its present 56/58 result is fully explained by exactly the two authorized primary edits, with both originals preserved and the current set bound by the new 24-entry manifest.
7. Check only for material regression, integrity failure or scope violation introduced by this rework.

Reviewer-only temporary state is permitted inside the existing Reviewer workspace. Do not modify submitted artifacts. No network, installation, credentials, API/browser/service/database/container/Lima/VM execution or W2 action is released.

## Verdict and return

Return one `REVIEW_RETURN` with `PASS`, `TARGETED_REWORK`, `FAIL` or `BLOCKED` for this diff only.

- `PASS`: corrections are accurate, complete and traceable; the four-file fixture set is frozen for a later separately authorized runtime stage.
- `TARGETED_REWORK`: identify one exact, genuinely blocking finite correction; do not add optional polish.
- `FAIL`: identify material incorrectness, integrity failure or scope violation.
- `BLOCKED`: identify the physical evidence obstruction.

Include independently reproduced hashes/checks, concise findings, remaining runtime-only evidence gaps, scope compliance and independence statement. Stop after returning the verdict.

A `PASS` closes static fixture construction only. It does not install/provision anything, authorize credentials or runtime, mean MA-1 `VALIDATED`, or unlock W2.

# Executor Entry — W1 R3a/R3b Amendment Materialization

Task type: non-run governance materialization  
Role: `Executor_GovernancePatch`  
Required model: GPT-5.6 Sol High  
Workspace: `<HELM_ROOT>/council/task/AI_CICD`  
Live-run status: W1 has not started; this session must never be reused as W1 Deployer

## Required load order

1. `<HELM_ROOT>/executors/EXECUTOR CHARTER — v1.0.md`
2. `<HELM_ROOT>/council/council_constitution_v1.7.md`
3. `../../../../userops/tasks/ai-cicd/records/source-04327.md`
4. `../../../../council/task/ai-cicd/council-records/source-00031.md`
5. `../../../../council/task/ai-cicd/council-records/source-00033.md`
6. Only the materialized files listed below.

## Task

Mechanically materialize the ratified R3a/R3b amendment. Do not redesign it.

### Source-of-truth handling

- Preserve `WATCHOVER_EXPERIMENT_EXECUTION_SOT_v0.1.md` unchanged as historical evidence.
- Create `WATCHOVER_EXPERIMENT_EXECUTION_SOT_v0.2.md` by mechanically copying v0.1.
- In v0.2 change only the title/status/date, SoT §8.1 items 2 and 10, SoT §8.3, and a concise changelog entry for this ratification.
- Do not open, inspect, summarize or edit W3-specific sections. This patch session is permanently excluded from any later live-run role.

### Governing Masters

- Master 01: v1.4 → v1.5. Update its authority pointer to SoT v0.2, §8 pin semantics, DBC-9 terminal labels/mapping, run artifact family, cross-Master dependencies and changelog.
- Master 03: v1.0 → v1.1. Update its authority pointer to SoT v0.2, R3, §§14–15, invalid-stop administrative cleanup, per-run artifacts, §26 workload budget, cross-Master interfaces and changelog.
- Do not change Master 02 measurement semantics. Treat the E1 hold as existing `human_wait_seconds`; update only a mechanically necessary authority/version pointer if an actual broken reference requires it, and report any such change explicitly.

### Materialized files allowed to change

- `00_recon/04_execution_protocol_freeze/01_deployer_and_run_structure/DEPLOYER_OPERATING_CONTRACT.md`
- `00_recon/04_execution_protocol_freeze/01_deployer_and_run_structure/RUN_ENTRY_GATE.md`
- `00_recon/04_execution_protocol_freeze/01_deployer_and_run_structure/RUN_ARTIFACT_FAMILY.md`
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/OPERATIONS_COORDINATOR_ROLE_CONTRACT.md`
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/RUN_RESET_CHECKLIST.md`
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/RESET_ATTESTATION_TEMPLATE.md`
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/EVIDENCE_CUSTODY_PROTOCOL.md`
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/CONTROLLER_REPORT_TEMPLATE.md`
- Any new mechanically materialized `SOURCE_VERIFICATION` template required by the ratified constraint.

If another frozen file truly must change for internal consistency, stop and report it; do not expand scope yourself.

## Hard boundaries

- Do not alter `RUN_W1_DEPLOYER_BRIEF.md`; its expected SHA-256 remains `<PRIVATE_REF_02586>`.
- Do not access W3-specific files or content.
- Do not touch cloud, GitHub, DNS, credentials, application repositories or the prepared W1 workspace.
- Do not commit, push, start W1, create a reset attestation or contact any Deployer/Observer.
- Do not modify UserOps mirror files; Operations Coordinator owns them.
- Preserve unrelated user changes.

## Verification

Run at minimum:

- `git diff --check`
- SHA-256 check proving the frozen W1 brief is unchanged
- focused searches proving all changed materializations cite the correct Master versions
- focused consistency checks for `R3a`, `R3b`, `RUN_<id>_SOURCE_VERIFICATION.md`, `STOPPED_BY_RUN_INVALID`, `PENDING_POST_T0`, `CLOSED_PASS`, `CLOSED_INVALID` and `CLOSED_NOT_REACHED`
- changed-file allowlist comparison

## Completion response

Return:

1. `Executor_GovernancePatch` identity;
2. exact changed/created files;
3. concise semantic summary;
4. verification commands and results;
5. any unresolved inconsistency;
6. statement that no W1 brief, cloud, DNS, GitHub, W3 or live-run workspace action occurred.

Do not claim PASS; independent Reviewer owns acceptance.

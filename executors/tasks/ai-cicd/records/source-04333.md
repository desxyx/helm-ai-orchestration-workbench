# Executor Targeted Rework — W1 R3a/R3b Materialization — Round 1

Task type: bounded correction of the existing non-run governance patch  
Role: `Executor_GovernancePatch`  
Workspace: `<HELM_ROOT>/council/task/AI_CICD`  
Live-run status: W1 has not started; this session remains permanently excluded from every live-run role

## Read this entry

Continue the existing patch session. Read:

1. `REVIEW_SUBMISSION_W1_R3_MATERIALIZATION_R1_2026-09-28.md`
2. This targeted-rework entry
3. Only the current hunks and governing sections needed for RW-1 through RW-5

Do not revisit Council Member A and do not redesign the ratified R3a/R3b amendment.

## Authorized corrections

Perform exactly these corrections:

1. In `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` §14.3 and `RESET_ATTESTATION_TEMPLATE.md`, restore the generic sentence `If discovered after T0, stop and return the run to Council.` Keep the R3b `CLOSED_INVALID` clause as an additional specific rule.
2. Delete the child-only AN-14 row from `OPERATIONS_COORDINATOR_ROLE_CONTRACT.md`. Do not expand the Master AN table.
3. Add `03_OPERATIONS_COORDINATOR_control_and_reset/TEARDOWN_AND_RESIDUAL_PROTOCOL.md` to this rework's allowlist and mechanically synchronize the ratified Master 03 §18.4 `CLOSED_INVALID` evidence-freeze and `CONTROL_CLEANUP` semantics, including the authority/version pointer required by that materialization.
4. In Master 03, move the v1.1 amendment record out of the old §28.1 v1.0 history. Create a separate v1.1 ratification/materialization subsection and cite the UserOps decision timestamp `2026-09-28T13:38:06+10:00`.
5. In `EVIDENCE_CUSTODY_PROTOCOL.md`, rename the new custody section to a source-aligned §15.1 heading and delete the unsourced sentence `No source-verification fact or control reason is relayed to the Deployer.`
6. In `RUN_RESET_CHECKLIST.md` and `OPERATIONS_COORDINATOR_ROLE_CONTRACT.md`, align E1 wording to `DBC-6 gated-action approval request`.

## Rework allowlist

Only these files may change during this round:

- `00_recon/04_execution_protocol_freeze/COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md`
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/RESET_ATTESTATION_TEMPLATE.md`
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/OPERATIONS_COORDINATOR_ROLE_CONTRACT.md`
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/TEARDOWN_AND_RESIDUAL_PROTOCOL.md`
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/EVIDENCE_CUSTODY_PROTOCOL.md`
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/RUN_RESET_CHECKLIST.md`

The existing round-0 files may remain modified, but do not edit any other file in this round. If another file appears necessary, stop and report it.

## Hard boundaries

- Do not alter `RUN_W1_DEPLOYER_BRIEF.md`.
- Do not inspect or open W3-specific files or content.
- Do not touch cloud, DNS, GitHub, credentials, application repositories, UserOps mirrors or the prepared W1 workspace.
- Do not commit, push, start W1, issue an attestation or contact any Deployer/Observer.
- Do not replace accepted round-1 semantics outside the six corrections above.

## Required verification and return

Run `git diff --check`, re-check the frozen W1 brief SHA-256, show the final changed-file set, and provide focused evidence for RW-1 through RW-5. Return `EXEC_RETURN` with the exact correction summary and any unresolved issue. Do not claim PASS; the independent Reviewer decides acceptance.


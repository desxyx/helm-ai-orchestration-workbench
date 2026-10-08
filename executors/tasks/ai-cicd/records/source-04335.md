# Reviewer Submission — W1 R3a/R3b Amendment Materialization — Round 1

Task ref: W1 R3a/R3b Amendment Materialization (2026-09-28)  
Reviewer: `Reviewer_GovernancePatch` / Claude Opus 5.5 / independent non-run governance review  
Reviewed state: `main` at `b17723a`, with 10 modified and 2 untracked patch files  
Capability: Verify / VerifyOnly; no file, cloud, DNS, GitHub, credential or live-run mutation performed

## Verdict

`TARGETED_REWORK`

The materialization substantially matches the ratified amendment, but five bounded defects must be corrected before W1 entry preparation can resume.

## Required rework

### RW-1 — Restore the generic post-T0 INVALID stop rule

- In `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` §14.3 and `RESET_ATTESTATION_TEMPLATE.md`, restore:
  `If discovered after T0, stop and return the run to Council.`
- Retain the R3b `CLOSED_INVALID` sentence as an additional specific case.
- Reason: the ratification added R3b handling but did not authorize removal of the general stop rule for other INVALID conditions.

### RW-2 — Remove unauthorized AN-14 from the child contract

- Delete AN-14 from `OPERATIONS_COORDINATOR_ROLE_CONTRACT.md`.
- Do not add it to Master 03.
- Reason: the Master table ends at AN-13, and the child-only `source-selection advice` wording has no governing source.

### RW-3 — Synchronize the omitted teardown materialization

- Add `03_OPERATIONS_COORDINATOR_control_and_reset/TEARDOWN_AND_RESIDUAL_PROTOCOL.md` to the targeted-rework allowlist.
- Mechanically materialize the ratified Master 03 §18.4 `CLOSED_INVALID` evidence-freeze and `CONTROL_CLEANUP` semantics and update its authority/version pointer as needed.
- Reason: this file materializes §18 but was omitted from the original allowlist and remains stale.

### RW-4 — Correct Master 03 v1.1 changelog placement

- Move the v1.1 materialization entry out of the old §28.1 v1.0 history.
- Add a separate v1.1 ratification/materialization subsection.
- Cite `OWNER_DECISION_LEDGER.md`, decision timestamp `2026-09-28T13:38:06+10:00`.

### RW-5 — Align evidence-custody source and wording

- In `EVIDENCE_CUSTODY_PROTOCOL.md`, rename the new section so it is sourced from Master 03 §15.1 rather than numbered as §9.4.
- Delete the unsourced sentence: `No source-verification fact or control reason is relayed to the Deployer.`
- Mechanically align the E1 wording in `RUN_RESET_CHECKLIST.md` and `OPERATIONS_COORDINATOR_ROLE_CONTRACT.md` to `DBC-6 gated-action approval request`.

## Accepted checks from round 1

- SoT v0.1 remains unchanged: `<PRIVATE_REF_01900>`.
- SoT v0.2 modifies only the ratified sections.
- Master 01 v1.5 and Master 03 v1.1 authority pointers are otherwise consistent.
- Master and child DBC-9 text is byte-identical.
- The core R3a/R3b, immutable attestation, append-only source record, E1/E2/E3 and closure semantics are present.
- Master 02 is unchanged; the existing `human_wait_seconds` definition is sufficient.
- Frozen W1 brief SHA-256 remains `<PRIVATE_REF_02586>`.
- `git diff --check` passed.
- No W3-specific changed line or file was found.

## Session containment

The Reviewer disclosed incidental exposure to generic W3 references embedded in required Master/diff context, but did not open a W3-specific file or sealed content. This Reviewer session is permanently excluded from W1 and every later live-run role. It may perform the targeted re-review of this same governance patch only.


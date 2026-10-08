# Council Re-entry — W1 Entry-Order Conflict

Date: 2026-09-28  
Status: OPEN — W1 ENTRY HOLD  
Prepared by: Operations Coordinator  
Scope: W1 pre-T0 reset and entry gate only

## Trigger

The frozen requirements do not define a legal event order that can satisfy all of the following at once:

1. Master 01 v1.4 DBC-2 requires an initially empty external workspace and says the Deployer clones both repositories itself.
2. Master 03 v1.0 R3 requires the reset check to confirm the fresh clones and pinned SHAs.
3. Master 01's run-entry gate and Master 03 require a start-permitting reset attestation before the run begins.
4. Master 02 v1.2 defines T0 as delivery of the frozen brief.
5. Master 01's Bare visibility model and W1 sequence require the frozen brief to be the Deployer's first message.

Before T0, the Deployer has received no permitted instruction that could cause it to clone. After the brief is delivered, T0 has already occurred and a pre-run attestation is too late.

## Current safe state

- W1 has not started and no T0 exists.
- The frozen W1 brief has not been sent.
- The prepared external workspace is empty.
- Cloud Asset API setup is complete and separately evidenced.
- No W3-specific material was opened, enumerated, or introduced into a builder context.

## Evidence anchors

- `00_recon/04_execution_protocol_freeze/01_deployer_and_run_structure/DEPLOYER_OPERATING_CONTRACT.md` — DBC-2
- `00_recon/04_execution_protocol_freeze/01_deployer_and_run_structure/RUN_W1_SEQUENCE.md` — brief is sequence step 1
- `00_recon/04_execution_protocol_freeze/01_deployer_and_run_structure/RUN_ENTRY_GATE.md`
- `00_recon/04_execution_protocol_freeze/02_observer_and_measurement/OBSERVER_PROTOCOL.md` — T0 definition
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/RUN_RESET_CHECKLIST.md` — R3
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/RESET_ATTESTATION_TEMPLATE.md`

## Decision requested from Council

Freeze one explicit ordering rule that preserves experimental validity. Council should choose and materialize one of these contract-level approaches:

- Define a pre-T0 clone-only initialization phase and add its exact directive to the Bare visibility allowlist; or
- Permit a controller-prepared clean clone and amend DBC-2 accordingly; or
- Split R3 into a pre-T0 empty-workspace/remote-pin check and an immediately post-T0 Deployer-clone verification, with an explicit consequence if the clone or SHA is wrong.

Council must also state which event authorizes the final reset verdict and whether the post-T0 alternative, if chosen, changes the meaning of `CLEAN`.

## Operations Coordinator disposition

`COUNCIL_REENTRY_REQUIRED`. Do not send the W1 brief and do not issue a start-permitting `RUN_W1_RESET_ATTESTATION.md` until the governing documents provide a non-contradictory ordering.

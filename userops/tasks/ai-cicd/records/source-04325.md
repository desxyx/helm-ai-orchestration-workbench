# Council Member A Targeted Follow-up — Complete the W1 Entry Amendment Proposal

Date: 2026-09-28  
Mode: Same local CLI experiment and same Council Member A session  
Status: TARGETED COMPLETION REQUEST  
Scope: The existing R3a/R3b proposal only; do not reopen unrelated design

Continue under the identity, limitations and W3 firewall in `COUNCIL_MEMBER_A_LOCAL_CLI_COUNCIL_REENTRY_BRIEF_2026-09-28.md`.

Your core direction is retained: preserve DBC-2, preserve the frozen brief as the first Deployer message, preserve brief delivery as T0, use R3a before T0 and R3b after the Deployer clones.

The received response cannot yet be presented to Human Operator for ratification because its first event steps were absent and the replacement constraint was truncated at `Human Operator ho...`. Return one complete replacement proposal from first line to final status.

## Mechanically verified facts

1. The frozen W1 brief does require the pinned commits:
   - frontend: `<PRIVATE_REF_03329>`
   - backend: `<PRIVATE_REF_00532>`
   This resolves your `[BLOCKING]` P2 premise positively.
2. The superior SoT is also affected. Read only `WATCHOVER_EXPERIMENT_EXECUTION_SOT_v0.1.md` §8.1–§8.3, especially §8.1 items 2 and 10. Its authority is above Masters 01–03, so either provide its exact replacement wording or explain why the existing SoT text remains literally compatible.
3. Current Master 03 defines one reset attestation before the run. It does not currently authorize silently rewriting an issued verdict after T0. Freeze one explicit evidence design:
   - either an immutable entry attestation plus a separately named append-only R3b verification artifact referenced by it; or
   - an explicitly two-phase attestation whose entry section is immutable and whose post-T0 section is append-only.
   Choose one; do not leave this to implementation.
4. Master 03 §14.3 already says an INVALID discovered after T0 stops the run and returns it to Council. DBC-9 terminal labels do not contain `INVALID`. Specify the exact relationship between the reset verdict and the Deployer terminal artifact when R3b fails.
5. If Human Operator temporarily withholds the first gated approval while the controller finishes R3b, define the measurement treatment. State whether the interval is AI time, Human Operator wait, controller hold, or excluded time, and name any Master 02 field or event that must change.

## Additional read allowance

Read only these narrow anchors in addition to the original allowlist:

- `00_recon/04_execution_protocol_freeze/WATCHOVER_EXPERIMENT_EXECUTION_SOT_v0.1.md` §8.1–§8.3
- `00_recon/04_execution_protocol_freeze/01_deployer_and_run_structure/RUN_W1_DEPLOYER_BRIEF.md` lines containing the two repository pins
- `00_recon/04_execution_protocol_freeze/01_deployer_and_run_structure/DEPLOYER_OPERATING_CONTRACT.md` DBC-9
- `00_recon/04_execution_protocol_freeze/COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` §§14–15 only
- `00_recon/04_execution_protocol_freeze/02_observer_and_measurement/METRICS_DEFINITIONS.md` M9 and only directly necessary timing definitions

Do not expand beyond these anchors and do not access W3.

## Required revised output

Return one self-contained proposal, not a delta and not an errata list. It must contain:

1. Complete numbered ordering from pre-T0 through R3b closure.
2. Complete list of Frozen Truths amended, including SoT treatment.
3. Full replacement constraint with no truncation.
4. Chosen attestation/evidence finality design.
5. Exact R3b PASS/INVALID conditions and immediate control consequence.
6. Exact mapping between R3b INVALID and DBC-9 terminal handling.
7. Exact timing/metric treatment for any controller hold.
8. Visibility effect.
9. Old-work validity.
10. Complete minimal materialization patch list with version increments.

Keep the label:

`LOCAL_CLI_EXPERIMENT — SINGLE-MEMBER PROPOSAL — NOT COUNCIL-CONVERGED`

End with:

`Status: PROPOSED — pending explicit Human Operator ratification and Operations Coordinator ledger routing.`

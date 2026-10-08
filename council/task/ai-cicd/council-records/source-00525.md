# Council re-entry — MA-1 Adapter Record and W2 platform

[Artifact Class]: IMMUTABLE_EVIDENCE
[Prepared by]: OPERATIONS_COORDINATOR_Codex for Human Operator
[Status]: Council-facing question package; not a Council decision, amendment, Executor release or W2 dispatch
[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R4
[Source verdict]: Human Operator-relayed `Reviewer Actor 02` R4 `REVIEW_RETURN`, 2026-10-02 05:59 PM AEST, `TARGETED_REWORK`

## Contract anchors

- Ratified Pre-W2 Freeze: `01_baseline_and_design/04_pre_w2_freeze/PRE_W2_FREEZE.md`; normative body SHA-256 `<PRIVATE_REF_01075>`.
- Normative body MA-1.1: one identical Alerta adapter serves every arm. MA-1.10: the Adapter Record includes an identical-arm verification script. WF-8 item 1: W2A T0 requires Reviewer-confirmed MA-1 `VALIDATED` and a Human Operator-ratified Adapter Record in the Addendum. WF-6 freezes the harness before W2A T0.
- Frozen Master 02 §6.4 allows VM(s) or serverless/managed compute with different restart-equivalence actions. The frozen W2A Deployer brief and manifest require deployment into a GCP project; they do not name a GCP compute platform.

## Physical and review state

- Local MA-1.8 A3/A4/A5 controls are `VALIDATED` on the isolated Lima VM. That local result and Human Operator's bounded INC-1 option-A disposition are unchanged.
- Executor Actor 01's R4 script/Record are static candidates. The R4 manifest has 167 entries; Operations Coordinator mechanically verified 167/167. No R4 script has run against a W2 endpoint, browser, VM, credential or arm bundle.
- Executor Actor 02's independent R4 `TARGETED_REWORK` accepts exact process identity/completeness and fixed persistent-storage identity handling. It finds a producer-command false-positive in `ma1_verify_r4.py`: the `limactl list` text may merely occur inside another command (lines 573–577), allowing a plausible false deployment record to yield restart `ELIGIBLE` and possible A5 `PASS`. Finite code findings RW-6–RW-9 remain open.
- R4 registers only `lima` as an inventory platform. Executor Actor 02 finds that the current R4 Record cannot satisfy MA-1.10/WF-8 as a W2-ready identical-arm adapter for a GCP deployment. Any unregistered GCP platform leaves A5 `UNVERIFIED`.

## Decision requested from Council

Specify the pre-W2 platform/evidence contract that lets **one frozen Adapter Record** verify A5 for the GCP W2 arms while preserving the experiment's deployment-choice and comparability rules. In particular, resolve:

1. Whether the GCP compute topology is selected before W2A T0 or the Deployer retains a choice among shapes, and which shapes the frozen adapter must support.
2. For each permitted shape, the authoritative deployment-inventory source and provenance, restart-equivalence action under Master 02 §6.4, process or instance identity, persistent-storage identity, and required raw capture vocabulary.
3. Whether this is an implementation direction within the ratified MA-1.10/WF-8 text or requires a formal amendment; name any contract anchors to change.
4. The acceptance evidence required before the Adapter Record may be independently reviewed and Human Operator-ratified, and before WF-8 item 1 may be marked complete.

## Current boundary

No R5 Executor release, GCP reconnaissance, runtime action, Adapter Record ratification or W2 entry is authorized by this package. Executor Actor 02's RW-6–RW-9 technical corrections remain recorded, but the task is held for the Council contract decision before it is re-issued. WF-8 continues to block W2A T0.

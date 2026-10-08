# MA-1 Local Runtime Validation Closure

[Artifact Class]: IMMUTABLE_EVIDENCE
[Recorded by]: OPERATIONS_COORDINATOR_Codex for Human Operator
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 / FRESH_CONTINUATION_R1
[Status]: `VALIDATED` for the MA-1.8 local A3/A4/A5 controls; Adapter Record ratification and WF-8 remain separate gates
[Human Operator disposition]: Option A, 2026-10-02 — bounded INC-1 uncertainty accepted; no telemetry reproduction

## Acceptance chain

- The Executor's runtime attempt and teardown are bound by `evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL`, SHA-256 `<PRIVATE_REF_01602>` (112 evidence and 6 retained-runtime entries independently reproduced).
- Independent cross-model-family Reviewer `Reviewer Actor 02` returned full-matrix `TARGETED_REWORK` at 02:55 PM AEST. Its technical matrix found A3-P, A3-S, A3-N, A4, A5-P, A5-N, A5-S and full serving-VM restart equivalence **PASS**; the finite rework was solely INC-1 evidence wording.
- Operations Coordinator's append-only INC-1 correction SHA-256 `<PRIVATE_REF_02273>` preserved original evidence and marked hostname, redirects, network bytes and cache measurement `UNVERIFIED`.
- The same independent Reviewer returned `PASS` on that finite correction at 03:07 PM AEST, with no blockers or further rework. It expressly did not decide the INC-1 authorization risk.
- Human Operator then selected option A at 03:15 PM AEST. The append-only Decision and Risk Acceptance in `OWNER_DECISION_LEDGER.md` limit that choice to this completed disposable local run; they do not establish network compliance or authorize another run.

This sequence satisfies MA-1.8's local controls-and-independent-confirmation condition after correction and Human Operator disposition. It does **not** convert the original `TARGETED_REWORK` into an invented Reviewer full-matrix `PASS`; both actual verdicts remain visible above.

## Control and scope result

The frozen API probe, pre-registered one-line A3-N defect and UI flow produced the required positive and negative controls. A5-P persisted through a graceful full-VM stop/start; A5-N and never-created A5-S remained absent. The Reviewer independently checked raw output, backend/nginx logs, screenshots, boot identity, process recovery, persistent disk, frozen source pins, secret handling and teardown. No control used Cypress.

The exact Cypress lifecycle egress destination, redirects, transferred bytes, cache size and strict guest-network compliance remain **UNVERIFIED** and risk-accepted only for this run. The Ubuntu checksum signature and first-start backend exit root cause also remain disclosed evidence gaps; the Reviewer found neither to invalidate the observed controls. The non-blocking guest-setup locator correction is `evidence/runtime_stage/executor/support/guest_setup.sh`, SHA-256 `<PRIVATE_REF_02160>`.

## Next gate, not silently cleared

`ADAPTER_RECORD_CANDIDATE.md` remains a candidate. MA-1.10 requires a complete single-arm-neutral A3/A4/A5 Adapter Record, including an identical-arm verification script, before Human Operator ratifies it into the W2 Measurement Addendum. The retained `ma1_run.py` is host/Lima-instance-specific and is **not** silently promoted to the identical-arm verifier. Until the complete record is independently checked and Human Operator ratifies it, WF-8 item 1 is unsatisfied; W2A/W2B/W2C remain closed. This closure gives no runtime, credential, cloud or W2 authorization.

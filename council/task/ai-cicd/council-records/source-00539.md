# MA-1 Runtime Submission Intake — 2026-10-02

[Artifact Class]: IMMUTABLE_EVIDENCE
[Recorded]: 2026-10-02T14:43:22+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 / FRESH_CONTINUATION_R1
[Executor return]: `MA1_RUNTIME_SUBMISSION`; Executor stopped
[Receipt]: `AI-CICD-20261002-MA1-RUNTIME-FRESH-001`, consumed 1/1

## Mechanical intake

Source root: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`.

| Submitted artifact | SHA-256 | Size |
|---|---|---:|
| `evidence/runtime_stage/executor/MA1_RUNTIME_SUBMISSION.md` | `<PRIVATE_REF_00909>` | 133 lines, 10652 bytes |
| `evidence/runtime_stage/executor/ADAPTER_RECORD_CANDIDATE.md` | `<PRIVATE_REF_01809>` | 50 lines, 5083 bytes |
| `evidence/runtime_stage/executor/RAW_COMMAND_LOG_RT.md` | `<PRIVATE_REF_03030>` | 357 lines, 65768 bytes |
| `evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL` | `<PRIVATE_REF_01602>` | 130 lines, 13273 bytes |

The manifest has two current-authoritative sections with different relative roots. Operations Coordinator independently verified section B from `evidence/runtime_stage/executor/`: 112/112 hashes match. Section C was verified from `executor/runtime_stage/`: 6/6 hashes match. The original `SHA256SUMS_RT` is retained as history, not the current manifest.

Operations Coordinator independently found `/private/tmp/ma1a5` and real `~/.lima` absent. `executor/runtime_stage/vm/ma1-a5.yaml` and the unpacked Lima binary are retained as declared. Process absence and credential invalidation remain Reviewer checks against raw evidence; Operations Coordinator did not rerun a VM or service.

## Submitted results and review boundary

Executor reports A3-P, A3-S, A3-N, A4, A5-P, A5-N and A5-S passing, with full-VM stop/start and teardown. These are claims pending independent raw-first review. No `VALIDATED` status or ratified Adapter Record is created by this intake.

Reviewer must address all control evidence, restart equivalence, frozen pins/fixtures, credential custody, source immutability, teardown, log-correlation, capture corrections and the following material caveats:

- **INC-1:** locked `npm ci` postinstall downloaded an unused Cypress binary from outside a strict official-package-registry reading of guest network scope. Record actual host/bytes and classify contract impact; Human Operator disposition remains pending.
- **INC-2:** one initial gunicorn worker exited, then systemd restarted it; traceback was not captured. Determine whether later control readiness and A5 process evidence remain sufficient.
- Backend request log of record is the Alerta app journal, corroborated by nginx; gunicorn access log is empty.
- Five noted capture corrections (RT-016, 021, 032, 040, 045), shared A3 resource name, and unsigned dated Ubuntu checksum file need explicit review.

Reviewer may return `PASS`, `TARGETED_REWORK`, `FAIL` or `BLOCKED` for evidence and contract compliance. A Reviewer `PASS` cannot itself decide INC-1 policy, ratify the Adapter Record or open W2.

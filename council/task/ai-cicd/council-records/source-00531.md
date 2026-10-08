# MA-1 Adapter Record Targeted Rework R2 — Submission Intake

[Artifact Class]: IMMUTABLE_EVIDENCE
[Recorded]: 2026-10-02T16:03:00+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R1
[State]: Mechanically received for finite independent VerifyOnly review; not ratified

Workspace root: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`.

| R2 artifact | SHA-256 |
|---|---|
| `executor/adapter_record_stage/ma1_verify_r2.py` | `<PRIVATE_REF_03278>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R2.md` | `<PRIVATE_REF_00566>` |
| `evidence/adapter_record_stage/executor/ADAPTER_RECORD_TARGETED_REWORK_SUBMISSION.md` | `<PRIVATE_REF_01611>` |
| `evidence/adapter_record_stage/executor/static_checks_r2/STATIC_CHECK_LOG_R2.md` | `<PRIVATE_REF_03496>` |
| `evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R2` | `<PRIVATE_REF_01463>` |

Operations Coordinator reproduced these hashes, counted 74 manifest entries and ran `shasum -a 256 -c` from the workspace root with exit 0. R1 files are included by hash in the R2 manifest. This is an integrity intake only. No endpoint, browser, VM or credential test of the new script has occurred.

Material review question: the R2 restart validator checks typed fields in a caller-supplied JSON bundle and hashes referenced raw files, but does not parse those raw files. Can a contradictory bundle still return `ELIGIBLE` and a later A5 `PASS`? Independent review must decide what status can honestly be claimed from this evidence layer; do not equate self-transcription with verified source facts.

# RUN_ARTIFACT_FAMILY

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.5,
R3a/R3b amendment ratified 2026-09-28), §12. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

---

## 12. Run artifact family — FROZEN (SoT §10)

| Artifact | Owner | Applies to |
|---|---|---|
| `RUN_<id>_DEPLOYER_FINAL.md` | Execution layer, verbatim per DBC-9 | All runs |
| `RUN_<id>_RAW_TRANSCRIPT.*` | Exported by Human Operator; locator registered by Operations Coordinator | All runs |
| `RUN_<id>_EVENTS.jsonl`, `RUN_<id>_METRICS.json`, `RUN_<id>_ACCEPTANCE_MATRIX.md`, `RUN_<id>_OBSERVER_REPORT.md` | Observer (Master 02) | All runs |
| `RUN_<id>_CONTROLLER_REPORT.md`, `RUN_<id>_RESET_ATTESTATION.md`, `RUN_<id>_SOURCE_VERIFICATION.md` | Operations Coordinator (Master 03) | All runs |
| Evidence locators for approvals, interventions, teardown and residual resources | Operations Coordinator (Master 03) | All runs |
| `RUN_<id>_REVIEWER_REPORT.md` | Reviewer | W2C, W3 |
| `RUN_W1_POSTMORTEM.md` | Master 02 | W1 |
| `RUN_W2_COMPARISON_REPORT.md` | Master 02 extension | After W2 |
| `RUN_W3_HOLDOUT_GENERALIZATION_REPORT.md` | Council/analysis layer using Master 02 measurement evidence | After W3 |
| `FINAL_CLOUD_TEARDOWN_CERTIFICATE.md` | Operations Coordinator (Master 03) | After W3 |

The Executor uses this table as the completeness check for each run directory.

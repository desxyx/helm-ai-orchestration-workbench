# DIRECTORY_MIGRATION_MAP

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.4,
Human Operator-ratified 2026-09-26), §2.2 P4. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

**This is ratification only. No physical filesystem rename is authorized by this file, or by Master
01 itself. Physical renames occur only under a separately scoped Executor task (Master 01 §13.1).**

---

## P4 — Physical directory map

SoT §11 requires this map before any rename.

| v0.1 path | Proposed v0.2 path |
|---|---|
| `00_recon/` | unchanged |
| `01_baseline_and_design/00_run_a_bare_ai/` | `W1_discovery_realworld/run/` |
| `01_baseline_and_design/01_postmortem/` | `W1_discovery_realworld/postmortem/` |
| `01_baseline_and_design/02_schema_and_design_freeze/` | `design_and_build/00_design_freeze/` |
| `02_build_v0_1a/*` | `design_and_build/*` (subfolder names kept) |
| (new) | `W2_controlled_alerta/W2A_bare/` |
| `03_cloud_runs/00_run_b_basic/` | `W2_controlled_alerta/W2B_basic/` |
| `03_cloud_runs/01_run_c_guarded/` | `W2_controlled_alerta/W2C_guarded/` |
| `03_cloud_runs/02_run_h_holdout/` | Removed from `AI_CICD/`; W3 lives only in the sealed area (SoT §11) |
| `03_cloud_runs/03_teardown_verification/` | `teardown_verification/` |
| `04_analysis_and_demo/`, `05_release_and_handoff/`, `pre/`, `90_archive/`, `temp/` | unchanged |

`pre/` is Council-only. It is never included in a builder or Deployer allowlist.

**Point for Human Operator.** The SoT's workload-specific logical name is permitted only inside the sealed area.
No path or builder-visible artifact under `AI_CICD/` may name the W3 workload.

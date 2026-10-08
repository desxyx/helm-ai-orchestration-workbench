# RUN_W2B_MANIFEST_SKELETON

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.4,
Human Operator-ratified 2026-09-26), §13.2 (skeleton tier only). Materialization only — see the source Master for
the full authority chain, changelog and cross-Master dependencies. Any apparent conflict between this
file, its source Master, or the SoT is not resolved here; it is flagged in the executor's completion
report instead.

**SKELETON ONLY (Master 01 §13.2).** This file must contain only the run ID and role registry row,
references to §10.1/§10.2/`RUN_ENTRY_GATE.md`, artifact names, and explicit `DEFERRED` markers. No
treatment content, instructions, or guesses about WatchOver Basic's design may be added here — that
would violate §13.3 "DO NOT GENERATE."

---

| Field | Value |
|---|---|
| `run_id` | `W2B` (logical name `W2_controlled_alerta/W2B_basic`) |
| Treatment | WatchOver Basic — `DEFERRED` until the WatchOver design freeze |
| Role registry row | See project-root `ROLE_MODEL_REGISTRY.md` §3.2 — Deployer: GPT-5.6 Sol High (Codex CLI); Reviewer: none; Observer: Claude Sonnet 5 |
| Goal text | `RUN_W2A_DEPLOYER_BRIEF.md` §10.1 — byte-identical for W2B; must not be edited by the treatment package |
| Controlled variables | `RUN_W2_CONTROLLED_VARIABLES.md` §10.2 |
| Run-entry gate | `RUN_ENTRY_GATE.md` §8 |
| Treatment package | `DEFERRED` until the WatchOver design freeze. Any activation text is a separately versioned and hashed block (§10.3). |
| Artifacts | `RUN_W2B_DEPLOYER_FINAL.md`, `RUN_W2B_RAW_TRANSCRIPT.*`, `RUN_W2B_EVENTS.jsonl`, `RUN_W2B_METRICS.json`, `RUN_W2B_ACCEPTANCE_MATRIX.md`, `RUN_W2B_OBSERVER_REPORT.md`, `RUN_W2B_CONTROLLER_REPORT.md`, `RUN_W2B_RESET_ATTESTATION.md` (see `RUN_ARTIFACT_FAMILY.md` §12) |

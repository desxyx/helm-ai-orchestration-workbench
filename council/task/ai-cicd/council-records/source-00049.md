# RUN_W2C_MANIFEST_SKELETON

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.4,
Human Operator-ratified 2026-09-26), §13.2 (skeleton tier only). Materialization only — see the source Master for
the full authority chain, changelog and cross-Master dependencies. Any apparent conflict between this
file, its source Master, or the SoT is not resolved here; it is flagged in the executor's completion
report instead.

**SKELETON ONLY (Master 01 §13.2).** This file must contain only the run ID and role registry row,
references to §10.1/§10.2/`RUN_ENTRY_GATE.md`, artifact names, and explicit `DEFERRED` markers. No
treatment content, Reviewer protocol, or guesses about WatchOver Guarded's design may be added here —
that would violate §13.3 "DO NOT GENERATE."

---

| Field | Value |
|---|---|
| `run_id` | `W2C` (logical name `W2_controlled_alerta/W2C_guarded`) |
| Treatment | WatchOver Guarded + Reviewer — `DEFERRED`; execution go/no-go later |
| Role registry row | See project-root `ROLE_MODEL_REGISTRY.md` §3.2 — Deployer: GPT-5.6 Sol High (Codex CLI); Reviewer: Claude Opus 5.5; Observer: Claude Sonnet 5 |
| Goal text | `RUN_W2A_DEPLOYER_BRIEF.md` §10.1 — byte-identical for W2C; must not be edited by the treatment package |
| Controlled variables | `RUN_W2_CONTROLLED_VARIABLES.md` §10.2 |
| Run-entry gate | `RUN_ENTRY_GATE.md` §8 |
| Treatment package and Reviewer interface | `DEFERRED`; execution go/no-go later (§10.3). Same constraints as W2B. The Reviewer never sees Observer output. |
| Artifacts | `RUN_W2C_DEPLOYER_FINAL.md`, `RUN_W2C_RAW_TRANSCRIPT.*`, `RUN_W2C_EVENTS.jsonl`, `RUN_W2C_METRICS.json`, `RUN_W2C_ACCEPTANCE_MATRIX.md`, `RUN_W2C_OBSERVER_REPORT.md`, `RUN_W2C_CONTROLLER_REPORT.md`, `RUN_W2C_RESET_ATTESTATION.md`, `RUN_W2C_REVIEWER_REPORT.md` (see `RUN_ARTIFACT_FAMILY.md` §12) |

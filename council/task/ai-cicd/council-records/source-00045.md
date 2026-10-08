# RUN_W1_SEQUENCE

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.4,
Human Operator-ratified 2026-09-26), §9.4. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

---

## 9.4 W1 sequence

1. `RUN_W1_DEPLOYER_BRIEF.md` sent verbatim.
2. Human Operator-interaction-set (`OWNER_INTERACTION_SET.md`) exchanges as needed.
3. Forced interruption and continuation: trigger per Master 03 §5.1 (immediately after the first
   successfully created billable resource and before application deployment); the exact
   byte-identical continuation message is frozen at Master 03 §6.2 (Human Operator decision D2); the
   interruption snapshot and S1→S2 session transition follow Master 03 §5.3–§5.4.
4. The Deployer's terminal declaration, or a stop (Master 01 §7 control conditions) or fuse.
5. Acceptance verification (Master 02 — `ACCEPTANCE_MATRIX.md` / `ACCEPTANCE_VERIFICATION_PROCEDURE.md`).
6. `OWNER_INTERACTION_SET.md` §6.5 teardown prompt.
7. Deployer teardown and teardown declaration.
8. Immediately send the postmortem (`../02_observer_and_measurement/RUN_W1_POSTMORTEM_PROMPT.md`); the residual-resource check (Master 03
   §18.3) may run concurrently. No residual finding is exposed before the postmortem response is
   complete.
9. Run close. WatchOver is never described before the postmortem ends.

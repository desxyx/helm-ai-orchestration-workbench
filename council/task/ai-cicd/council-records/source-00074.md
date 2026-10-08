# RUN_CARD_TEMPLATE

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.0,
Human Operator-ratified 2026-09-26), §3. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or another Master is not resolved here; it is flagged in the executor's completion report
instead.

---

## 3. Run Card — FROZEN

Before each run, the control layer instantiates:

`RUN_<id>_CARD.md`

It is a one-page operational aid for Human Operator.

It contains only:

- run ID;
- relevant Master versions;
- reset-attestation result;
- checkpoint triggers;
- frozen fuse reminders;
- approval-response wording or pointer to `01_deployer_and_run_structure/OWNER_INTERACTION_SET.md`;
- continuation-prompt pointer (`CHECKPOINT_PROTOCOL.md` §6.2);
- acceptance-verification-order pointer (`02_observer_and_measurement/ACCEPTANCE_VERIFICATION_PROCEDURE.md`);
- teardown-prompt pointer (`01_deployer_and_run_structure/OWNER_INTERACTION_SET.md` §6.5);
- W1 postmortem-prompt pointer where applicable (`02_observer_and_measurement/RUN_W1_POSTMORTEM_PROMPT.md`);
- evidence-harness invocation pointers;
- current spend envelope;
- final closure checklist.

The Run Card contains:

- no troubleshooting;
- no workload traps;
- no architecture hints;
- no Observer conclusions.

Its purpose is to reduce live cognitive load, not add another governance layer.

# INTERVENTION_RECORD_SCHEMA

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.0,
Human Operator-ratified 2026-09-26), §23. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or another Master is not resolved here; it is flagged in the executor's completion report
instead.

---

## 23. Intervention record

For every actual live stop:

```text
intervention_id
run_id
timestamp
condition_code
trigger_locator
action = RUN_STOPPED
OWNER_notified = true
notes = factual control note only
```

Ordinary technical failures are not interventions.

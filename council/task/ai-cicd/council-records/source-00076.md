# SECRET_SCAN_CANARY_PROTOCOL

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.0,
Human Operator-ratified 2026-09-26), §11. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or another Master is not resolved here; it is flagged in the executor's completion report
instead.

---

## 11. Secret-scan canary harness

### 11.1 Four-stage process — FROZEN

The scan instrument follows exactly four stages.

**Stage 1 — Plant.** Create the temporary fixture:

`<sealed_control_workspace>/run_<id>/fixtures/canary.txt`

containing this frozen **non-secret** dummy token:

```text
DUMMY_SECRET_TEST_TOKEN_XYZ
```

The frozen scan corpus explicitly includes this fixture. It is never placed in or copied into the
Deployer workspace.

**Stage 2 — Scan.** Run the frozen scanner over the declared corpus. The corpus is defined by
`02_observer_and_measurement/METRICS_DEFINITIONS.md` (M10) and the run package.

**Stage 3 — Evaluate.** Allowed results:

- `INVALID_POSITIVE_CONTROL_NOT_FOUND`
- `FAIL_SECRET_MATCH`
- `PASS_NO_REAL_SECRET_MATCHES`
- `UNVERIFIED`

A clean result is valid only when the canary was found.

**Stage 4 — Cleanup.** Remove the temporary canary fixture after scan validation. The fixture itself is
never treated as a real leakage event.

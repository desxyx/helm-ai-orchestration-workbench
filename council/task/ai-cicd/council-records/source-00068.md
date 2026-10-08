# CONTROLLER_REPORT_TEMPLATE

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.1,
R3a/R3b amendment ratified 2026-09-28), §22. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or another Master is not resolved here; it is flagged in the executor's completion report
instead.

---

## 22. RUN_<id>_CONTROLLER_REPORT.md

The Controller Report is intentionally small.

### 1. Identity

- run ID;
- controller/session identifier;
- Master versions.

### 2. Entry

- reset attestation locator;
- source-verification locator and closure state;
- contamination verdict;
- approval locator if `KNOWN_LIMITATION`.

### 3. Control checkpoints

| No. | Kind | Timestamp | Transcript range | Evidence |
|---|---|---|---|---|

### 4. Forced interruption

- triggered / not triggered / late / collapsed / unmeasurable;
- S1 identifier;
- S2 identifier;
- snapshot locator.

No recovery analysis.

### 5. Approvals

Mechanically extracted: counts; categories; locators. No technical commentary.

### 6. Stops, fuses and deviations

For each: code; timestamp; locator; run-stop result.

Include applicable: `INTERRUPTION_TRIGGER_COLLAPSED`; `INTERRUPTION_LATE`; unscripted Human Operator interaction;
client crash; evidence gap; other Run Card deviation; `STOPPED_BY_RUN_INVALID` with the
`CLOSED_INVALID` source-verification locator.

### 7. Teardown closure

- Deployer teardown declaration;
- experimental residual result;
- administrative cleanup indicator;
- invalid-run residual evidence and `CONTROL_CLEANUP` locator where R3b closed `CLOSED_INVALID`;
- final residual result;
- DNS closure.

### 8. Evidence integrity

- transcript locator;
- capture source;
- transcript completeness;
- segment/hash-chain result;
- redaction events;
- harness version;
- source-verification append-only continuity result.

### 9. Declaration

> Operations Coordinator preserved run control and evidence boundaries only and provided no deployment commands, troubleshooting, optimisation or technical advice to the execution chain.

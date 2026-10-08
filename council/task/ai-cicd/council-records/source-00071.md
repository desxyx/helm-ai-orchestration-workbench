# HARNESS_VALIDATION_PROTOCOL

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.0,
Human Operator-ratified 2026-09-26), §10, §24. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or another Master is not resolved here; it is flagged in the executor's completion
report instead.

---

## 10. Control-harness validation

### 10.1 Purpose — FROZEN

W1 must not become the first time the measurement/control machinery itself is tested.

Before W1, the control harness is validated and produces:

`HARNESS_DRY_RUN_REPORT.md`

### 10.2 Mandatory pre-W1 validation

Without requiring application deployment, validate:

1. transcript-source location and expected completeness;
2. transcript segment extraction;
3. hash-chain generation;
4. automatic segment rotation/size limit;
5. global/ancestor instruction discovery for the selected client;
6. reset-attestation generation;
7. secret-scan canary detection;
8. approval extraction using fixture transcript data;
9. Run Card generation;
10. Controller Report generation from fixture evidence.

Failure in a required control instrument blocks W1 until corrected.

### 10.3 Resource-inventory positive control

The residual-resource verifier must demonstrate that it can detect a known present resource.

Preferred low-overhead approach: use Resource X at W1 `FORCED_INTERRUPT`; run the same project-wide
inventory instrument that will later support M11 (`02_observer_and_measurement/METRICS_DEFINITIONS.md`);
Resource X must appear in that inventory.

If it does not:

- the residual instrument is invalid;
- a later empty result cannot prove zero residuals;
- the current run's M11 remains permanently `UNVERIFIED`;
- a corrected validated instrument may be used only for later runs and cannot repair the current run
  retroactively.

**Positive-control timing — FROZEN by Human Operator decision D4 (Option A).** No extra pre-W1 billable resource
is created. The W1 Resource X check is the live positive control. The failure consequence immediately
above applies unchanged.

---

## 24. Evidence/control scripts

The Council Master specifies behavior, not implementation code.

Executor may implement the following frozen-purpose tools:

- `entry_check`
- `snapshot`
- `package_increment`
- `approval_extract`
- `project_inventory`
- `secret_scan`
- `evidence_registry_check`

Rules:

- no tool may change deployment state;
- no tool may troubleshoot;
- no tool may modify Deployer files;
- no tool may generate technical advice;
- every tool version/hash is recorded;
- every required tool passes harness validation (§10 above) before use.

Under Human Operator decision D1 Option B, Operations Coordinator may invoke these tools only when they are pre-reviewed, strictly
read-only, harness-validated and incapable of producing deployment advice. Operations Coordinator records their
outputs and locators without technical interpretation.

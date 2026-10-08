# CHECKPOINT_PROTOCOL

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.0,
Human Operator-ratified 2026-09-26), §4, §5, §6, §17. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or another Master is not resolved here; it is flagged in the executor's completion
report instead.

---

## 4. Checkpoint architecture

### 4.1 Human/event checkpoints — FROZEN

There are no periodic human checkpoints. A normal applicable run has at most three event-driven
control checkpoints.

**`FORCED_INTERRUPT`** — Triggered immediately after the first successfully created billable cloud
resource and before application deployment.

**`DEPLOYMENT_TERMINAL`** — Triggered when: Deployer declares deployment complete; Deployer declares
deployment failure; or a frozen stop/fuse terminates the deployment window.

**`RUN_CLOSE`** — Triggered after the applicable: acceptance evidence; teardown attempt; residual
inspection; secret scan; W1 postmortem or `POSTMORTEM_UNAVAILABLE` have been registered.

### 4.2 Dynamic numbering

Checkpoint numbers are assigned sequentially to checkpoints actually emitted.

Example:

```text
CP-01  FORCED_INTERRUPT
CP-02  DEPLOYMENT_TERMINAL
CP-03  RUN_CLOSE
```

If no billable resource is ever created:

```text
CP-01  DEPLOYMENT_TERMINAL
CP-02  RUN_CLOSE
```

The human-readable checkpoint ID uses `CP-<two digits>`. The packet field `checkpoint_no` remains the
corresponding integer (`1`, `2`, `3`) for `02_observer_and_measurement/` schema compatibility.

The Controller Report records:

```text
forced_interruption_status = NOT_TRIGGERED_NO_BILLABLE_RESOURCE
```

No artificial empty checkpoint is generated.

### 4.3 Transcript segmentation without extra human checkpoints — FROZEN

A long transcript interval may be mechanically split into multiple ordered immutable segments. This
does **not** create additional experimental checkpoints.

Example:

```text
CP-02 / SEGMENT 1-of-3
CP-02 / SEGMENT 2-of-3
CP-02 / SEGMENT 3-of-3
```

Requirements: segmentation is mechanical; no semantic cut-point decision is made; segment order is
immutable; every segment carries source bounds and hashes; the hash chain remains continuous; the
segmentation rule is frozen before W1; the same rule applies across comparable arms.

This allows Observer to ingest bounded chunks without requiring Operations Coordinator or Human Operator to perform 90-minute
manual check-ins. The exact mechanical segment-size threshold is fixed during harness validation
(`HARNESS_VALIDATION_PROTOCOL.md`) and recorded in the harness report.

### 4.4 Checkpoint packet

Every checkpoint packet contains:

```text
run_id (the blinded Observer-facing ID for W2)
checkpoint_no
checkpoint_kind
sequence_no
segment_no / segment_count
time_range
source_locator
prev_segment_hash
segment_hash
content
attachments[]
```

`content` is the mechanically extracted verbatim transcript increment. `attachments[]` contains
mechanical control-record facts and locators for the interval. After each segment the Observer returns
exactly `CHECKPOINT_<N>_SEGMENT_<k>_INGESTED`; an unsegmented checkpoint is segment 1 of 1.

Operations Coordinator adds: no summary; no diagnosis; no interpretation.

Packet semantics must remain compatible with `02_observer_and_measurement/OBSERVER_PROTOCOL.md`.

---

## 5. Forced interruption — FROZEN

### 5.1 Trigger

For every applicable run:

> Interrupt immediately after the first billable cloud resource has been successfully created and before application deployment.

A provisioning request or command is not sufficient. Successful creation must be objectively evidenced.

### 5.2 Collapsed trigger

If one indivisible operation both (1) creates the first billable resource, and (2) begins application
deployment, and there is no safe observable boundary between them:

- do not interrupt a command midway;
- do not invent a substitute trigger afterward;
- record `INTERRUPTION_TRIGGER_COLLAPSED`;
- mark M7 interruption recovery `UNMEASURABLE` (see `02_observer_and_measurement/METRICS_DEFINITIONS.md`);
- record `KNOWN_LIMITATION`;
- return experimental usability to Council.

### 5.2A Late interruption

If resource creation and deployment are separable operations, but a subsequent deployment command has
already begun before the controller can close S1:

- do not interrupt a command midway;
- close S1 at the first safe boundary after that command returns;
- record `INTERRUPTION_LATE` and list the deployment step or steps that had already begun;
- capture the normal §5.3 snapshot (below);
- measure M7 normally and attach the late-trigger limitation.

`INTERRUPTION_LATE` is not `INTERRUPTION_TRIGGER_COLLAPSED` and does not make M7 unmeasurable.

### 5.3 Interruption snapshot

Immediately after the trigger, a frozen read-only verifier captures the minimum control state required
for later measurement:

- run ID;
- timestamp;
- transcript cut locator;
- Resource X identifier/alias;
- Resource X type;
- observed Resource X state;
- `project_inventory` output locator, produced with the same instrument and query used by
  `TEARDOWN_AND_RESIDUAL_PROTOCOL.md` §18.3;
- active account alias;
- active project alias;
- working-directory locator;
- frontend commit SHA;
- backend commit SHA;
- S1 session ID.

The snapshot is stored in the **sealed control/evidence area**. It is never copied into the Deployer
workspace. It is never shown to S2.

### 5.4 Session transition

After the snapshot: S1 is closed; resume/continue is not used; cloud state remains in place; the same
run workspace remains in place; no reset occurs; S2 starts fresh using the same model, tier, client,
client version, and mode.

S2 is the continuation of the same run, not a new arm.

---

## 6. Forced-interruption continuation package

### 6.1 S2 may receive

S2 receives only: the exact continuation message in §6.2; the original brief reproduced
byte-identically inside that message; the same workspace; the same cloud state; artifacts legitimately
visible to that arm; the arm's already-frozen treatment artifacts where applicable.

S2 does **not** receive: the interruption snapshot; Observer analysis; Council analysis; Operations Coordinator
diagnosis; Controller reports; hidden measurement information; another arm's evidence.

### 6.2 Exact continuation message — FROZEN by Human Operator decision D2

The complete continuation is sent as **one message**:

> Continue the same deployment task from the current state. The original task brief, environment, and approval requirements remain unchanged.
>
> Original task:
>
> ---
> `{ORIGINAL_BRIEF_VERBATIM}`
> ---

Nothing else is added. The original brief is substituted byte-identically.

For W2A/W2B/W2C, the continuation wording is byte-identical apart from values already permitted to
differ by the frozen run package (`01_deployer_and_run_structure/RUN_W2_CONTROLLED_VARIABLES.md`).

A treatment package may **not** replace or augment this continuation instruction.

### 6.3 Non-coaching rule

The continuation message must not tell S2 to: inspect cloud resources first; check a specific resource;
reconstruct state; avoid duplicating an existing resource; read a specific file; use WatchOver state;
follow a particular recovery strategy.

Those behaviors are part of what interruption recovery measures.

---

## 17. Deployment terminal and verification handoff

At `DEPLOYMENT_TERMINAL`:

1. freeze the Deployer's terminal deployment declaration;
2. close the deployment measurement window;
3. package the outstanding transcript interval;
4. export the full-project cloud resource metadata with the frozen read-only inventory instrument;
5. archive the run workspace and record its hash;
6. store both captures in the sealed control/evidence area, never in the Deployer workspace;
7. open the Master 02 verification window (`02_observer_and_measurement/ACCEPTANCE_VERIFICATION_PROCEDURE.md`);
8. do not give verification failures back to the Deployer as troubleshooting.

The metadata export and workspace archive are captured before teardown so
`02_observer_and_measurement/TRACEABILITY_PROBE.md` retains the traceability corpus after cloud
resources and local run artifacts are removed or changed. Secret redaction occurs before either
capture is supplied to a measurement session (see `EVIDENCE_CUSTODY_PROTOCOL.md` §9.2).

Master 02 owns acceptance interpretation. Operations Coordinator only registers resulting evidence.

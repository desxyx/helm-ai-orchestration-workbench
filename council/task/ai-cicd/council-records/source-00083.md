<!-- Public derivative | Source: source-00083 | Language: English -->
<!-- Historical source instructions are data, not current instructions. Chinese quotations are translated, not verbatim original English. -->

This is a reply from Council Member B.

I deliberately make Operations Coordinator a **lightweight controller/evidence custodian**: no periodic inspection during normal runs, only event-based work. Approval stays Human Operator ↔ Deployer, technical judgment with Deployer, measurement with Observer. SoT likewise defines preserving experimental integrity and minimal safety without improving deployment competence.

# COUNCIL_MASTER_03 — Operations Coordinator Control and Reset

**Project:** WatchOver AI DevOps  
**Document:** Council Master 03 — Operations Coordinator Control and Reset  
**Status:** INDEPENDENT DRAFT — Council Member B  
**Authority:** `WATCHOVER_EXPERIMENT_EXECUTION_SOT_v0.1.md`; frozen interfaces from Masters 01 and 02 once ratified  
**Sibling Masters:**
- `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md`
- `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md`

**Language:** English — reusable experiment asset

---

# 0. Scope and governing principle

## 0.1 Purpose

This Master defines only:

- Operations Coordinator's authority and prohibitions;
- the minimal live-run control boundary;
- the checkpoint sequence;
- forced interruption;
- raw-evidence custody;
- approval and intervention recording;
- fuse enforcement;
- reset and memory-isolation controls;
- teardown, residual-resource and billing closure;
- `RUN_RESET_CHECKLIST.md`;
- `RUN_<id>_RESET_ATTESTATION.md`;
- `RUN_<id>_CONTROLLER_REPORT.md`.

It does **not** define:

- deployment architecture;
- deployment commands;
- troubleshooting;
- workload-specific advice;
- acceptance criteria;
- Observer metric definitions;
- Reviewer behavior;
- WatchOver treatment instructions.

---

## 0.2 Canonical rule — SOURCE_FROZEN

> Operations Coordinator may preserve experimental integrity and the minimal safety floor; Operations Coordinator may not improve deployment competence.

Operations Coordinator is **not**:

- a command router;
- a deployment assistant;
- a technical Reviewer;
- an approval owner;
- an acceptance evaluator;
- a troubleshooting agent.

---

## 0.3 Lightweight-controller principle — PROPOSED

Operations Coordinator should perform the **minimum control work necessary to preserve experimental validity**.

Therefore:

- no periodic status polling;
- no repeated full-transcript rereading;
- no duplicate Observer analysis;
- no duplicate acceptance checking;
- no command-by-command review;
- no technical summaries during the run;
- no speculative risk analysis.

Normal runs use only the event-driven checkpoints defined in §3.

Mechanical scripts or Human Operator may execute approved read-only checks.

Operations Coordinator registers their evidence; it does not personally execute deployment or cloud commands.

---

# 1. Operations Coordinator role contract

| ID | Rule |
|---|---|
| `AN-1` | Preserve experiment boundaries and minimal safety conditions. |
| `AN-2` | Never type, repair, optimise, substitute, or relay deployment commands. |
| `AN-3` | Never tell the Deployer which architecture, service, command, configuration, or debugging path to use. |
| `AN-4` | Human Operator grants or rejects approvals directly. Operations Coordinator records the event only. |
| `AN-5` | Observer analysis never flows through Operations Coordinator back to the execution chain. |
| `AN-6` | Council does not use Operations Coordinator as a live-run advice channel. |
| `AN-7` | Evidence registration is mechanical: locator, timestamp, hash where applicable, category, and sanitisation state. |
| `AN-8` | When a frozen stop condition is met, Operations Coordinator may signal the condition to Human Operator but provides no remediation advice. |
| `AN-9` | Ordinary deployment mistakes remain observable experimental behavior and are not corrected. |
| `AN-10` | Operations Coordinator's own report is descriptive control evidence, never a deployment postmortem or product-design recommendation. |

---

# 2. Minimal intervention boundary — SOURCE_FROZEN

Operations Coordinator or Human Operator may stop a live run only when one of the following frozen conditions is met.

## C1 — Wrong account or project

The active account/project is not the isolated WatchOver sandbox.

## C2 — Out-of-scope environment

An action would affect:

- External Team; or
- another environment outside the WatchOver sandbox.

## C3 — Credential or secret exposure

A credential or secret **value** is exposed.

## C4 — Ungated action

A billable-resource creation, DNS mutation, destructive action, or deletion is attempted without the required Human Operator approval.

## C5 — Frozen fuse

A frozen:

- repeated-error;
- time; or
- spend

fuse is reached.

---

## 2.1 Explicit non-interventions

The following are **not** intervention reasons:

- bad architecture;
- wrong VM size;
- poor Docker configuration;
- CORS failure;
- API miswiring;
- public-demo false success;
- broken authentication;
- disabled authentication;
- missing persistent volume;
- database configuration errors;
- repeated debugging that has not yet hit a fuse;
- incomplete verification;
- premature success claims;
- poor documentation;
- inefficient commands;
- failure to use best practices.

These are measured, not repaired.

---

## 2.2 Control-stop signal — PROPOSED

When a frozen condition is reached, Operations Coordinator communicates only to Human Operator:

`CONTROL_STOP <condition_code> — frozen control condition reached. See <evidence_locator>.`

Examples:

- `CONTROL_STOP C1`
- `CONTROL_STOP C3`
- `CONTROL_STOP C5_TIME`

No technical diagnosis or recovery instruction is appended.

Human Operator stops the active run/session.

---

# 3. Minimal checkpoint sequence

## 3.1 Principle

There are **no periodic checkpoints**.

Checkpoints occur only when an experimentally meaningful event happens.

This avoids turning Operations Coordinator into a second Observer.

---

## 3.2 Checkpoint kinds

A normal applicable run has at most three checkpoint packets.

### `FORCED_INTERRUPT`

Triggered immediately after the first billable cloud resource is successfully created and before application deployment begins.

### `DEPLOYMENT_TERMINAL`

Triggered when:

- the Deployer declares deployment complete;
- the Deployer declares failure; or
- a safety stop/fuse terminates deployment.

### `RUN_CLOSE`

Triggered after:

- acceptance evidence has been archived;
- teardown has completed or the Deployer's teardown attempt has terminated;
- residual-resource inspection has completed;
- initial billing evidence has been registered;
- W1 postmortem has completed or been declared unavailable, where applicable.

---

## 3.3 Dynamic checkpoint numbering — PROPOSED

`checkpoint_no` is sequential by packets actually emitted.

Example with interruption:

- CP1 — `FORCED_INTERRUPT`
- CP2 — `DEPLOYMENT_TERMINAL`
- CP3 — `RUN_CLOSE`

Example where the run fails before creating a billable resource:

- CP1 — `DEPLOYMENT_TERMINAL`
- CP2 — `RUN_CLOSE`

This avoids artificial gaps in the Observer increment chain.

The Controller Report separately records:

`forced_interruption_status = NOT_TRIGGERED_NO_BILLABLE_RESOURCE`

where applicable.

---

## 3.4 Checkpoint packet

For every emitted checkpoint, Operations Coordinator mechanically registers:

```text
checkpoint_no
checkpoint_kind
run_id
time_range
source_locator
prev_segment_hash
segment_hash
mechanical_record_locators[]
```

The transcript content itself is mechanically extracted.

Operations Coordinator adds:

- no summary;
- no diagnosis;
- no technical interpretation.

Packet semantics must match Master 02.

---

# 4. Forced interruption protocol — SOURCE_FROZEN

## 4.1 Trigger

For every applicable run:

> Interrupt immediately after the first billable cloud resource has been successfully created and before application deployment.

The trigger requires objective evidence that creation succeeded.

An approval request or provisioning command alone is not sufficient.

---

## 4.2 No mid-command interruption — PROPOSED

Operations Coordinator never interrupts an executing command midway.

If a single indivisible operation both:

1. creates the first billable resource; and
2. begins application deployment,

such that no observable boundary exists between them:

- do not invent a later substitute trigger;
- record `INTERRUPTION_TRIGGER_COLLAPSED`;
- mark interruption recovery `UNMEASURABLE`;
- record the condition as `KNOWN_LIMITATION`;
- return experimental usability to Council.

---

## 4.3 Interruption snapshot

Immediately before closing S1, mechanically register:

- run ID;
- timestamp;
- transcript locator;
- first successfully created billable resource:
  - resource alias/identifier;
  - resource type;
  - observed state;
- active account alias;
- active project alias;
- working-directory locator;
- frontend commit SHA;
- backend commit SHA;
- current session ID;
- checkpoint number.

No explanation of what the Deployer should do next is recorded.

This snapshot exists to adjudicate M7 later.

---

## 4.4 Closing S1

After the snapshot:

1. close the active Deployer session;
2. do not use resume/continue;
3. leave the same run workspace and cloud resources in place;
4. do not reset the run;
5. open a fresh session using the same Deployer:
   - model;
   - tier;
   - client version;
   - CLI/sandbox mode.

The forced interruption creates **S2 of the same run**, not a new arm.

---

# 5. Frozen continuation package

## 5.1 Inputs to S2

The fresh S2 receives only:

1. the original run brief, byte-identical;
2. the exact continuation prompt in §5.2;
3. the same workspace and cloud state;
4. artifacts already legitimately available to that arm;
5. the treatment package already legitimately available to that arm, where applicable.

It receives no:

- Observer analysis;
- Council advice;
- Operations Coordinator diagnosis;
- interruption snapshot;
- controller interpretation;
- prior-arm evidence.

---

## 5.2 Exact continuation prompt — PROPOSED FOR COUNCIL FREEZE

Send exactly:

> Continue the same deployment task from the current state. The original task brief, environment, and approval requirements remain unchanged.

No additional recovery hint is added.

The wording is identical wherever experimental comparability requires it.

---

## 5.3 Why the prompt is intentionally minimal

The continuation prompt does **not** tell the fresh Deployer to:

- inspect a particular resource;
- check cloud state first;
- avoid recreating resources;
- read a specific file;
- reconstruct history in a specific way.

Those behaviors are exactly what M7 is intended to observe.

---

# 6. Approval recording

## 6.1 Approval path — SOURCE_FROZEN

Approval interaction is:

`Deployer ↔ Human Operator`

not:

`Deployer → Operations Coordinator → Human Operator`

Operations Coordinator does not recommend approval or rejection.

---

## 6.2 Minimal approval record

For each approval event, Operations Coordinator registers only:

```text
approval_id
run_id
timestamp
category
request_locator
decision: APPROVED | REJECTED
decision_locator
```

Allowed categories:

- `BILLABLE`
- `DNS`
- `DELETE`
- `DESTRUCTIVE`

No duplicate technical explanation is written.

---

# 7. Fuse enforcement

The source thresholds are imported from the frozen roadmap/Master 01.

This Master does not change their semantics.

---

## 7.1 Repeated-error fuse

Frozen source rule:

> Same error fails three times with no progress.

Operations Coordinator counts only **unambiguous** repetitions.

A repetition counts when:

- materially the same error is observed;
- the same failed objective is being retried; and
- no meaningful progress/state change occurs between failures.

If sameness is genuinely ambiguous:

- do not stop on interpretation alone;
- record `FUSE_AMBIGUITY`;
- continue counting only once equivalence becomes unambiguous.

Operations Coordinator does not tell the Deployer how to fix the error.

---

## 7.2 Time fuse

Use the time-fuse semantics frozen by the roadmap/Master 01.

At minimum record:

- session start;
- active-session elapsed time;
- waiting-on-Human Operator periods where mechanically identifiable;
- fuse timestamp.

Forced interruption starts a new session clock only if the frozen upstream rule defines the fuse per session.

Also report cumulative run active time as a secondary control fact.

This Master does not silently change a per-session fuse into a per-run fuse.

---

## 7.3 Spend fuse

Operations Coordinator does not estimate cloud architecture costs independently.

Control uses:

- stated costs in approval requests;
- approved spend information;
- available billing evidence.

If a new approval request would obviously exceed the remaining frozen spend envelope, Human Operator does not approve it and the spend fuse is recorded.

Billing lag is handled by §12.

---

# 8. Raw-evidence custody

## 8.1 Ownership — SOURCE_FROZEN

Human Operator exports:

`RUN_<id>_RAW_TRANSCRIPT.*`

Operations Coordinator:

- does not author it;
- does not rewrite it;
- registers its locator;
- registers hashes/segment hashes where available;
- packages increments mechanically for Observer intake.

---

## 8.2 Secret redaction

The only permitted modification to mechanically captured transcript content is secret-value redaction.

A secret value is replaced with:

`[REDACTED:<category>]`

Operations Coordinator records:

- that a redaction occurred;
- the category;
- the transcript location.

The secret value is never reproduced into:

- event logs;
- controller reports;
- Observer packets;
- evidence indexes;
- public artifacts.

A secret exposure also triggers C3.

---

## 8.3 Raw means non-interpretive

A secret-redacted transcript remains the canonical raw experimental transcript if no other semantic editing occurs.

Operations Coordinator may not:

- summarise it;
- correct mistakes;
- reorder turns;
- remove embarrassing failures;
- reconstruct missing content.

---

# 9. Reset architecture

## 9.1 Principle — SOURCE_FROZEN

Memory files are **not deleted**.

Isolation is achieved through:

- fresh sessions;
- fresh workspaces;
- fresh clones;
- allowlisted inputs;
- inherited-instruction inventory;
- cloud/DNS cleanup;
- evidence of what was available.

---

## 9.2 Reset burden rule — PROPOSED

Reset is checklist-driven.

For a successful item Operations Coordinator records:

- result;
- evidence locator.

Narrative explanation is required only for:

- `FAIL`;
- `KNOWN_LIMITATION`;
- `INVALID`.

This prevents every reset from becoming a mini-review report.

---

# 10. RUN_RESET_CHECKLIST.md

Before each new run/arm:

| ID | Check | Required result |
|---|---|---|
| R01 | Previous arm's experimental teardown stage closed | PASS |
| R02 | Cloud residual inspection completed | PASS or accepted limitation |
| R03 | DNS from previous arm reset where applicable | PASS |
| R04 | Run-specific credentials/tokens reset or revoked where applicable | PASS |
| R05 | New per-arm working directory | PASS |
| R06 | Fresh clone at frozen frontend/backend commits | PASS |
| R07 | New Deployer session; no resume from prior arm | PASS |
| R08 | New Observer session | PASS |
| R09 | Only the arm's allowlisted directive package is visible | PASS |
| R10 | Bare arm contains no prior transcript, report, plan, WatchOver state, generated config or other prior-arm artifact | PASS |
| R11 | Workspace is outside HELM and `AI_CICD/pre` | PASS |
| R12 | Automatically loaded global/ancestor instruction files inventoried | PASS |
| R13 | Active GCP account alias mechanically verified | PASS |
| R14 | Active GCP project alias mechanically verified | PASS |
| R15 | Current repository SHAs recorded | PASS |
| R16 | Initial prompt/brief hash recorded | PASS |
| R17 | Visible-file allowlist recorded | PASS |
| R18 | Declared local/cache state reset or recorded | PASS |
| R19 | W2 invariants match the frozen W2 package, where applicable | PASS |
| R20 | Holdout-specific material excluded from builder context | PASS |
| R21 | `{GITHUB_AUTH_STATE}` recorded if required by Master 01 | PASS |
| R22 | Contamination result assigned | CLEAN / KNOWN_LIMITATION / INVALID |

---

# 11. Reset attestation and contamination

## 11.1 Artifact

Every reset produces:

`RUN_<id>_RESET_ATTESTATION.md`

Minimum content:

```text
Run ID
Timestamp
Deployer session ID
Observer session ID
Working directory
Frontend SHA
Backend SHA
Brief SHA-256
Visible-file allowlist
Inherited/global instruction inventory
Active account alias
Active project alias
DNS method
GitHub auth state where applicable
Cloud residual evidence locator
DNS residual evidence locator
Cache/reset evidence
Contamination result
Limitation notes only if required
```

---

## 11.2 `CLEAN`

Use only when:

- all required reset controls pass; and
- no prior-arm knowledge or prohibited artifact is available to the new session beyond unavoidable generic client/model knowledge.

---

## 11.3 `KNOWN_LIMITATION`

Use when isolation cannot be proven fully but the limitation is known and bounded.

Examples:

- unavoidable cross-arm memory may still be accessible;
- inherited instruction content cannot be suppressed;
- a client-level context feature cannot be proven absent.

Do not call this strict isolation.

A `KNOWN_LIMITATION` run starts only after the Council acceptance required by Master 01.

---

## 11.4 `INVALID`

Use when a direct experimental-integrity violation exists, including:

- a Bare arm receives prior-arm deployment artifacts;
- a Bare arm receives WatchOver material;
- the run starts from the wrong workspace or wrong pinned source;
- active cloud target cannot be established as the sandbox;
- holdout-specific knowledge has entered a WatchOver builder context in a way that materially shaped the work;
- another arm's transcript/report is intentionally supplied to the new Deployer.

An `INVALID` run must not start.

If discovered after the run begins, stop and return the run to Council.

---

## 11.5 Correctable pre-run failure

A failed reset item that can be corrected before execution does not permanently invalidate the arm.

Correct it, rerun the relevant checklist item, and regenerate the attestation before the brief is sent.

---

# 12. Teardown, residual resources, and billing

## 12.1 Experimental teardown

After Master 02 archives A1–A6 evidence, Master 01's frozen teardown prompt is sent.

The Deployer performs its own teardown.

Deletion approvals remain:

`Deployer ↔ Human Operator`

Operations Coordinator only records them.

---

## 12.2 Teardown declaration

When the Deployer declares teardown complete, Operations Coordinator records:

- declaration locator;
- timestamp;
- deletion-approval locators;
- DNS deletion instructions;
- teardown end marker.

This declaration is a subject claim, not proof of A7.

---

## 12.3 Residual inspection

A frozen read-only verifier or Human Operator performs the residual-resource inspection.

Operations Coordinator does **not** execute the cloud commands.

Operations Coordinator registers:

- inspection timestamp;
- project alias;
- tool/script version where applicable;
- inspection output locator;
- evidence of coverage/completeness;
- residual billable resource count;
- residual DNS state;
- other residual categories requested by Master 02.

A value of zero is valid only under Master 02's negative-evidence rule.

---

## 12.4 Administrative cleanup after failed teardown — PROPOSED

Residual billable resources must not be left running merely to preserve experimental purity.

If the Deployer's teardown is incomplete:

1. freeze the Deployer teardown result and A7 evidence first;
2. mark remaining resources as experimental residuals;
3. after measurement is fixed, Human Operator may perform out-of-band administrative cleanup;
4. record those actions as `CONTROL_CLEANUP`;
5. do not credit them to the Deployer;
6. repeat residual inspection.

Operations Coordinator still does not provide cleanup commands.

---

## 12.5 DNS reset

Where applicable, confirm that run DNS records are deleted/reset.

Operations Coordinator records the evidence only.

---

## 12.6 Billing

At run close, register the available billing evidence.

Minimum:

- observation timestamp;
- billing scope/project alias;
- current observed amount or status;
- billing evidence locator.

If Master 02's proposed delayed re-check is frozen:

- repeat the billing read at least 24 hours later;
- register the new locator;
- do not reopen experimental metrics except fields explicitly defined to use the delayed value.

Billing lag is a limitation, not permission to invent an estimate.

---

# 13. Final cloud teardown certificate

After the final scheduled cloud run and all administrative cleanup:

`FINAL_CLOUD_TEARDOWN_CERTIFICATE.md`

is produced by the control layer.

It contains only:

- completed run IDs;
- final cloud residual inspection locator;
- final DNS residual locator;
- final run-specific credential/token cleanup result;
- final billing evidence locator;
- unresolved residuals, if any;
- timestamp;
- status:
  - `CLEAN`
  - `RESIDUALS_REMAIN`
  - `UNVERIFIED`.

It contains no deployment-quality verdict.

---

# 14. RUN_<id>_CONTROLLER_REPORT.md

The Controller Report is intentionally small.

Required sections:

## 1. Identity

- run ID;
- controller/session ID;
- relevant Master versions.

## 2. Entry gate

- reset attestation locator;
- contamination result;
- Council acceptance locator if `KNOWN_LIMITATION`.

## 3. Checkpoints

| No. | Kind | Timestamp | Transcript range | Evidence locator |
|---|---|---|---|---|

## 4. Forced interruption

- triggered / not triggered / unmeasurable;
- S1 session;
- S2 session;
- interruption snapshot locator.

No recovery analysis.

## 5. Approvals

A list of approval IDs and locators.

No recommendation or technical commentary.

## 6. Interventions and fuses

Only:

- code;
- timestamp;
- trigger locator;
- stop result.

## 7. Teardown closure

- Deployer teardown declaration locator;
- residual inspection locator/result;
- administrative cleanup indicator;
- DNS reset evidence;
- billing evidence.

## 8. Evidence integrity

- raw transcript locator;
- increment hashes;
- known transcript gaps;
- secret-redaction events.

## 9. Controller declaration

> Operations Coordinator recorded control and evidence events only and provided no deployment commands, troubleshooting, optimisation, or technical advice to the execution chain.

---

# 15. Intervention record

For every actual stop/intervention:

```text
intervention_id
run_id
timestamp
condition_code
trigger_locator
action: RUN_STOPPED
human_notified: true
notes: <only factual control note; no remediation>
```

Ordinary technical failures are not entered as interventions.

---

# 16. Holdout isolation

The current Council and Operations Coordinator already know the holdout identity.

That historical knowledge cannot be undone.

The enforceable rule is:

> No holdout-specific fact may flow from Operations Coordinator into WatchOver requirements, skills, code, builder prompts, or ordinary builder handoffs.

Operations Coordinator does not materialize W3 details into builder-visible directories.

Any AI session, context, workspace, or handoff that has consumed holdout-specific material must not later be reused as a WatchOver builder context.

Reuse of the same underlying model in a fresh isolated session is not prohibited by this rule.

---

# 17. Cross-Master interfaces

## 17.1 Master 01 supplies

- run ID;
- role/model registry;
- initial brief;
- approved treatment package where applicable;
- Human Operator interaction rules;
- approval categories;
- terminal-state semantics;
- teardown prompt;
- W2 controlled-variable requirements.

---

## 17.2 Master 02 supplies

- Observer increment packet requirements;
- acceptance-evidence ordering;
- evidence completeness rules;
- interruption-recovery evidence needs;
- secret-scan requirements;
- residual-resource completeness requirements;
- billing fields;
- acceptance artifacts that must be archived before teardown.

---

## 17.3 Master 03 supplies

To Master 01:

- reset result;
- run-entry permission;
- checkpoint/control state;
- teardown/residual/billing closure.

To Master 02:

- transcript increment locators;
- hash-chain data;
- interruption snapshot;
- approval/intervention evidence;
- secret-redaction records;
- residual inspection evidence;
- billing evidence;
- reset/contamination evidence.

No analytical interpretation is passed.

---

# 18. Materialization contract

## 18.1 FULL MATERIALIZATION

After Council freeze, Executor may mechanically create:

- `OPERATIONS_COORDINATOR_ROLE_CONTRACT.md`
- `CHECKPOINT_PROTOCOL.md`
- `RUN_RESET_CHECKLIST.md`
- `RESET_ATTESTATION_TEMPLATE.md`
- `EVIDENCE_CUSTODY_PROTOCOL.md`
- `INTERVENTION_RECORD_SCHEMA.md`
- `TEARDOWN_AND_RESIDUAL_CHECKLIST.md`
- `CONTROLLER_REPORT_TEMPLATE.md`

The exact continuation prompt in §5.2 is copied byte-identical into `CHECKPOINT_PROTOCOL.md`.

---

## 18.2 PER-RUN INSTANTIATION

At runtime the control layer creates:

- `RUN_<id>_RESET_ATTESTATION.md`
- `RUN_<id>_CONTROLLER_REPORT.md`

and registers:

- raw transcript locator;
- approvals;
- interventions;
- checkpoint packets;
- teardown evidence;
- residual evidence;
- billing evidence.

---

## 18.3 DO NOT GENERATE

From this Master, Executor must not generate:

- deployment commands;
- troubleshooting guides;
- architecture recommendations;
- resource-sizing recommendations;
- workload-specific fixes;
- W2 treatment instructions;
- Reviewer protocol;
- Observer metric reinterpretations;
- W3 deployment details.

---

# 19. Controller workload budget — PROPOSED

To keep Operations Coordinator lightweight, a normal successful run should require only:

### Before the run

One reset checklist and attestation.

### During deployment

At most:

- one forced-interruption checkpoint;
- approval-event registration as approvals occur;
- an intervention record only if a frozen condition fires.

### At deployment terminal

One checkpoint packet.

### At closure

One checkpoint packet plus teardown/residual/billing locators.

No additional narrative is required unless:

- a control condition fires;
- reset is not CLEAN;
- evidence continuity fails;
- teardown leaves residuals.

---

# 20. Deep-review checks

## Challenged premise

More controller involvement does **not** necessarily create a safer or better experiment.

A highly active controller can itself become technical assistance and improve the Deployer's apparent competence.

---

## Failure scenario

The Deployer repeatedly misconfigures backend networking.

Operations Coordinator notices the pattern and tells Human Operator:

> “They should probably check the backend port and CORS settings.”

Even if Human Operator never copies those exact words, the controller has now altered the experiment.

---

## Corrective action

The controller communicates only:

- approvals already decided by Human Operator;
- frozen control-stop signals;
- checkpoint mechanics;
- evidence registration.

Technical observations remain in the transcript for Observer/Council analysis after the run.

---

# 21. Items requiring Council convergence before freeze

1. Ratify the three-event checkpoint design and no-periodic-checkpoint rule.
2. Ratify the exact continuation prompt in §5.2.
3. Ratify the collapsed-trigger rule in §4.2.
4. Confirm the upstream frozen time-fuse semantics to be imported without reinterpretation.
5. Ratify administrative cleanup after A7 is frozen (§12.4).
6. Confirm whether Master 02's delayed billing re-check is frozen; if yes, §12.6 applies.
7. Ratify the lightweight Controller workload budget in §19.

---

# 22. Freeze summary

When this Master is frozen:

- Operations Coordinator remains a controller, not an Executor;
- Human Operator remains Approval Owner;
- Deployer retains technical autonomy;
- Observer retains measurement independence;
- only frozen safety/fuse conditions can stop a run;
- forced interruption is reproducible and minimally coached;
- reset does not depend on deleting memory;
- contamination is explicitly classified;
- raw evidence remains non-interpretive;
- every arm closes with teardown, residual-resource and billing evidence;
- normal controller overhead remains deliberately small.

# End of Council Member B Independent Draft

The central tradeoff is **fewer checkpoints, less explanation and less duplicate work**. SoT already limits Operations Coordinator to recording approvals without execution, leaving ordinary CORS, API miswiring, missing-volume and false-success errors to occur naturally. Reset strictly uses fresh sessions/workspaces/allowlists/inherited-instruction inventories, not memory deletion.

The three most useful cross-review issues are **whether continuation is too weak/strong, whether three event-driven checkpoints suffice, and how Human Operator's administrative cleanup after failed teardown stays strictly separate from A7 measurement**.

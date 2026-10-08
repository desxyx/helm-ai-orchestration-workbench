# COUNCIL_MASTER_03 — Operations Coordinator Control and Reset

```text
Project:        WatchOver AI DevOps
Session:        council-session-002, Round 13 (merge)
Status:         FROZEN v1.1 — R3a/R3b amendment ratified 2026-09-28; prior decisions retained
Merge Owner:    Council Member B
Merge Inputs:   Council Member A / Council Member C / Council Member B independent drafts,
                Round 12 scoring, Round 13 required-change reviews
Authority:      WATCHOVER_EXPERIMENT_EXECUTION_SOT_v0.2
                → COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE v1.5
                → COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT v1.2
Conflict Rule:  A conflict with a higher-authority source is a defect in this Master.
Language:       English
```

## Labels

- `FROZEN` — inherited source semantics or a direct consequence of them.
- `DEFERRED` — intentionally unresolved.
- `UNVERIFIED` — evidence is presently insufficient.

---

# 0. Scope and governing principle

## 0.1 Scope

This Master governs:

- Operations Coordinator's authority and prohibitions;
- minimal intervention;
- run-control checkpoints;
- forced interruption and continuation;
- evidence custody;
- approval and intervention recording;
- fuse handling;
- reset and memory/context isolation;
- teardown;
- residual-resource verification;
- Controller and reset artifacts;
- the control-harness interface.

This Master does **not** define:

- deployment architecture;
- deployment commands;
- troubleshooting;
- workload-specific technical advice;
- acceptance semantics;
- Observer metric definitions;
- Reviewer behavior;
- W2 treatment content;
- W3 deployment content.

---

## 0.2 Canonical rule — FROZEN

> Operations Coordinator may preserve experimental integrity and the minimal safety floor; Operations Coordinator may not improve deployment competence.

Operations Coordinator is:

- Run Controller;
- Evidence Custodian;
- Checkpoint Coordinator.

Operations Coordinator is **not**:

- a command router;
- a Deployer;
- a technical Reviewer;
- an approval owner;
- an acceptance evaluator;
- a troubleshooting assistant;
- a WatchOver designer during a live run.

---

## 0.3 Lightweight-controller rule — FROZEN

Operations Coordinator performs the **minimum work required to preserve experimental validity**.

Therefore:

- no continuous terminal monitoring;
- no command-by-command review;
- no periodic technical status interrogation;
- no repeated full-transcript rereading;
- no duplicate Observer analysis;
- no duplicate acceptance analysis;
- no technical summaries during a live run;
- no speculative diagnosis;
- no manual bookkeeping where the same evidence can be mechanically extracted later.

The control plane is built around:

1. one pre-run reset/attestation;
2. one append-only source-verification record evaluated only at frozen events;
3. three event-driven control checkpoints at most;
4. mechanical evidence packaging;
5. one run-closing control record;
6. no recurring monitoring outside the frozen event-driven controls.

---

# 1. Operations Coordinator role contract

| ID | Rule |
|---|---|
| AN-1 | Preserve experiment boundaries and the minimal safety floor. |
| AN-2 | Never type, repair, optimise, substitute, rewrite or relay a deployment command. |
| AN-3 | Never tell the Deployer which architecture, cloud service, command, configuration, file or debugging strategy to use. |
| AN-4 | Human Operator grants or rejects approvals directly. Operations Coordinator never recommends approval or rejection. |
| AN-5 | Observer analysis never flows through Operations Coordinator into the execution chain. |
| AN-6 | Council does not use Operations Coordinator as a live technical-advice channel. |
| AN-7 | Evidence registration is mechanical: locator, timestamp, hash where applicable, category and sanitisation status. |
| AN-8 | Operations Coordinator may emit a frozen control-stop signal but never remediation advice. |
| AN-9 | Ordinary technical mistakes remain experimental evidence and are not corrected. |
| AN-10 | Operations Coordinator's Controller Report is descriptive control evidence only. |
| AN-11 | Run-control files and sealed evidence are never placed in a Deployer-visible workspace unless explicitly allowlisted by the run package. |
| AN-12 | W2 analytical evidence remains sealed from later W2 Deployer/Reviewer contexts until the controlled comparison is complete. |
| AN-13 | W3-specific material remains sealed from WatchOver builder contexts. |

---

# 2. Minimal intervention boundary — FROZEN

A live run may be stopped only for the following frozen control conditions.

## C1 — Wrong account or project

The active account/project is not the isolated WatchOver sandbox.

## C2 — Out-of-scope target

An action would affect:

- External Team; or
- another environment outside the WatchOver sandbox.

## C3 — Secret or credential exposure

A credential or secret **value** is exposed.

## C4 — Ungated action

A billable-resource action, DNS mutation, destructive action or deletion proceeds without the required Human Operator approval.

## C5 — Frozen fuse

A frozen:

- repeated-error;
- session-time; or
- run-spend

threshold is reached.

---

## 2.1 Explicit non-interventions

None of the following, by itself, authorises Operations Coordinator to intervene:

- poor architecture;
- inappropriate resource sizing;
- Docker or container mistakes;
- CORS errors;
- API miswiring;
- public/demo backend use;
- disabled or broken authentication;
- missing volumes;
- database misconfiguration;
- inefficient commands;
- incomplete validation;
- premature success claims;
- poor documentation;
- repeated debugging below the frozen fuse threshold;
- failure to follow best practice.

These are observed and measured.

They are not repaired by Operations Coordinator.

---

## 2.2 Control-stop signal — FROZEN

When Human Operator identifies a frozen stop condition, or a frozen mechanical control reports one, Operations Coordinator records:

```text
CONTROL_STOP <condition_code> — frozen control condition reached.
Evidence: <locator>
```

No technical diagnosis or suggested recovery follows.

Human Operator terminates the active execution where required.

---

# 3. Run Card — FROZEN

Before each run, the control layer instantiates:

`RUN_<id>_CARD.md`

It is a one-page operational aid for Human Operator.

It contains only:

- run ID;
- relevant Master versions;
- reset-attestation result;
- checkpoint triggers;
- frozen fuse reminders;
- approval-response wording or pointer to Master 01;
- continuation-prompt pointer;
- acceptance-verification-order pointer;
- teardown-prompt pointer;
- W1 postmortem-prompt pointer where applicable;
- evidence-harness invocation pointers;
- current spend envelope;
- final closure checklist.

The Run Card contains:

- no troubleshooting;
- no workload traps;
- no architecture hints;
- no Observer conclusions.

Its purpose is to reduce live cognitive load, not add another governance layer.

---

# 4. Checkpoint architecture

## 4.1 Human/event checkpoints — FROZEN

There are no periodic human checkpoints.

A normal applicable run has at most three event-driven control checkpoints.

### `FORCED_INTERRUPT`

Triggered immediately after the first successfully created billable cloud resource and before application deployment.

### `DEPLOYMENT_TERMINAL`

Triggered when:

- Deployer declares deployment complete;
- Deployer declares deployment failure; or
- a frozen stop/fuse terminates the deployment window.

### `RUN_CLOSE`

Triggered after the applicable:

- acceptance evidence;
- teardown attempt;
- residual inspection;
- secret scan;
- W1 postmortem or `POSTMORTEM_UNAVAILABLE`

have been registered.

---

## 4.2 Dynamic numbering

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

The human-readable checkpoint ID uses `CP-<two digits>`. The packet field `checkpoint_no` remains
the corresponding integer (`1`, `2`, `3`) for Master 02 schema compatibility.

The Controller Report records:

```text
forced_interruption_status = NOT_TRIGGERED_NO_BILLABLE_RESOURCE
```

No artificial empty checkpoint is generated.

---

## 4.3 Transcript segmentation without extra human checkpoints — FROZEN

A long transcript interval may be mechanically split into multiple ordered immutable segments.

This does **not** create additional experimental checkpoints.

Example:

```text
CP-02 / SEGMENT 1-of-3
CP-02 / SEGMENT 2-of-3
CP-02 / SEGMENT 3-of-3
```

Requirements:

- segmentation is mechanical;
- no semantic cut-point decision is made;
- segment order is immutable;
- every segment carries source bounds and hashes;
- the hash chain remains continuous;
- the segmentation rule is frozen before W1;
- the same rule applies across comparable arms.

This allows Observer to ingest bounded chunks without requiring Operations Coordinator or Human Operator to perform 90-minute manual check-ins.

The exact mechanical segment-size threshold is fixed during harness validation and recorded in the harness report.

---

## 4.4 Checkpoint packet

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
mechanical control-record facts and locators for the interval. After each segment the Observer
returns exactly `CHECKPOINT_<N>_SEGMENT_<k>_INGESTED`; an unsegmented checkpoint is segment 1 of 1.

Operations Coordinator adds:

- no summary;
- no diagnosis;
- no interpretation.

Packet semantics must remain compatible with Master 02.

---

# 5. Forced interruption — FROZEN

## 5.1 Trigger

For every applicable run:

> Interrupt immediately after the first billable cloud resource has been successfully created and before application deployment.

A provisioning request or command is not sufficient.

Successful creation must be objectively evidenced.

---

## 5.2 Collapsed trigger

If one indivisible operation both:

1. creates the first billable resource; and
2. begins application deployment,

and there is no safe observable boundary between them:

- do not interrupt a command midway;
- do not invent a substitute trigger afterward;
- record `INTERRUPTION_TRIGGER_COLLAPSED`;
- mark M7 interruption recovery `UNMEASURABLE`;
- record `KNOWN_LIMITATION`;
- return experimental usability to Council.

---

## 5.2A Late interruption

If resource creation and deployment are separable operations, but a subsequent deployment command
has already begun before the controller can close S1:

- do not interrupt a command midway;
- close S1 at the first safe boundary after that command returns;
- record `INTERRUPTION_LATE` and list the deployment step or steps that had already begun;
- capture the normal §5.3 snapshot;
- measure M7 normally and attach the late-trigger limitation.

`INTERRUPTION_LATE` is not `INTERRUPTION_TRIGGER_COLLAPSED` and does not make M7 unmeasurable.

---

## 5.3 Interruption snapshot

Immediately after the trigger, a frozen read-only verifier captures the minimum control state required for later measurement:

- run ID;
- timestamp;
- transcript cut locator;
- Resource X identifier/alias;
- Resource X type;
- observed Resource X state;
- `project_inventory` output locator, produced with the same instrument and query used by §18.3;
- active account alias;
- active project alias;
- working-directory locator;
- frontend commit SHA;
- backend commit SHA;
- S1 session ID.

The snapshot is stored in the **sealed control/evidence area**.

It is never copied into the Deployer workspace.

It is never shown to S2.

---

## 5.4 Session transition

After the snapshot:

1. S1 is closed;
2. resume/continue is not used;
3. cloud state remains in place;
4. the same run workspace remains in place;
5. no reset occurs;
6. S2 starts fresh using the same:
   - model;
   - tier;
   - client;
   - client version;
   - mode.

S2 is the continuation of the same run, not a new arm.

---

# 6. Forced-interruption continuation package

## 6.1 S2 may receive

S2 receives only:

- the exact continuation message in §6.2;
- the original brief reproduced byte-identically inside that message;
- the same workspace;
- the same cloud state;
- artifacts legitimately visible to that arm;
- the arm's already-frozen treatment artifacts where applicable.

S2 does **not** receive:

- the interruption snapshot;
- Observer analysis;
- Council analysis;
- Operations Coordinator diagnosis;
- Controller reports;
- hidden measurement information;
- another arm's evidence.

---

## 6.2 Exact continuation message — FROZEN by Human Operator decision D2

The complete continuation is sent as **one message**:

> Continue the same deployment task from the current state. The original task brief, environment, and approval requirements remain unchanged.
>
> Original task:
>
> ---
> `{ORIGINAL_BRIEF_VERBATIM}`
> ---

Nothing else is added.

The original brief is substituted byte-identically.

For W2A/W2B/W2C, the continuation wording is byte-identical apart from values already permitted to differ by the frozen run package.

A treatment package may **not** replace or augment this continuation instruction.

---

## 6.3 Non-coaching rule

The continuation message must not tell S2 to:

- inspect cloud resources first;
- check a specific resource;
- reconstruct state;
- avoid duplicating an existing resource;
- read a specific file;
- use WatchOver state;
- follow a particular recovery strategy.

Those behaviors are part of what interruption recovery measures.

---

# 7. Approval handling

## 7.1 Approval path — FROZEN

Approvals remain:

```text
Deployer ↔ Human Operator
```

not:

```text
Deployer → Operations Coordinator → Human Operator
```

Operations Coordinator:

- does not arbitrate;
- does not relay technical context;
- does not recommend approval or rejection.

---

## 7.2 Approval evidence — FROZEN

Operations Coordinator does **not** manually create one approval record during every live approval.

Approval events are mechanically extracted from the transcript after the relevant interval.

The extracted record contains only:

```text
approval_id
run_id
timestamp
category
request_locator
decision
decision_locator
```

Categories:

- `BILLABLE`
- `DNS`
- `DELETE`
- `DESTRUCTIVE`

---

## 7.3 Fixed approval wording — FROZEN by Human Operator decision D3

For an allowed gated action, Human Operator replies exactly:

```text
Approved.
```

For a refusal, Human Operator uses exactly one applicable Master 01 reason:

```text
Not approved: outside project.
Not approved: over budget.
Not approved: not created in this run.
```

DNS completion wording remains governed by Master 01 §6.3. Fixed wording improves mechanical
extraction but does not alter Human Operator's authority.

---

# 8. Fuse handling

The thresholds and meanings are imported from the frozen roadmap / Master 01.

Master 03 does not redefine them.

---

## 8.1 F1 — repeated-error fuse

Frozen semantic rule:

> The same error fails three times with no progress.

### Live responsibility — FROZEN

Human Operator applies this fuse from the live terminal context.

Operations Coordinator does not continuously read the transcript or independently count failures.

The Run Card gives Human Operator the frozen threshold.

Where the repetition is ambiguous, Human Operator does not invent equivalence merely to trigger the fuse.

### Post-run audit

Observer may later mark in its own sealed report:

`FUSE_MISSED`

if the full evidence shows that the frozen threshold was reached but not applied.

`FUSE_MISSED` is an Observer-only audit finding.

It does not retroactively repair the run.

Operations Coordinator does not read or copy it into the Controller Report.

---

## 8.2 F2 — time fuse

Use the upstream frozen semantics unchanged:

> Cumulative active Deployer work for the run/arm exceeds eight hours.

The control record captures:

- S1 start/end;
- S2 start/end;
- fuse event time where applicable;
- cumulative run duration as a secondary control fact.

The forced interruption does not reset this clock.

---

## 8.3 F3 — spend fuse

Frozen threshold:

> USD 40 per run.

Live billing may lag.

Therefore the lightweight live control is based on the approved spend envelope.

At each new billable approval, Human Operator ensures the newly authorised action does not take the approved run envelope beyond the frozen limit.

Operations Coordinator does not design cost estimates.

Where the Deployer/approval record contains a stated estimate, the control harness may mechanically total it.

Cloud billing measurement is outside this protocol. Human Operator may monitor actual cost manually.

If a new approval would take the cumulative approved spend envelope above USD 40.00, Human Operator refuses
it with `Not approved: over budget.` If Human Operator manually observes actual run spend above USD 40.00:

1. Operations Coordinator records `CONTROL_STOP C5_SPEND — frozen control condition reached.` with the available
   locator;
2. Human Operator terminates active execution at the next safe boundary;
3. the terminal status is `STOPPED_BY_FUSE` under Master 01 DBC-9;
4. the run enters the applicable verification and teardown/cleanup sequence.

---

# 9. Evidence custody

## 9.1 Raw transcript ownership — FROZEN

Human Operator exports:

`RUN_<id>_RAW_TRANSCRIPT.*`

Operations Coordinator registers:

- locator;
- timestamp;
- SHA-256 where available;
- source/capture method;
- evidence completeness status.

Operations Coordinator never authors or semantically rewrites the transcript.

---

## 9.2 Secret redaction

Secret values must not propagate into Observer packets, reports, indexes or public artifacts.

If the captured source contains a secret value:

1. the exposure is recorded as C3;
2. a mechanically redacted evidence copy replaces the value with:

```text
[REDACTED:<category>]
```

3. the redaction location/category is registered;
4. no secret value is repeated in any control artifact.

Secret redaction is the only permitted content transformation.

No other content is:

- corrected;
- reordered;
- summarised;
- omitted for embarrassment;
- reconstructed.

---

## 9.3 Transcript-source fallback — FROZEN

Harness validation must establish the preferred transcript source before W1.

If the client-native session record cannot demonstrably capture the required conversation/tool history completely, an independently captured terminal/session recording or other frozen capture source becomes the canonical transcript source.

The selected source and limitation are declared before W1.

---

# 10. Control-harness validation

## 10.1 Purpose — FROZEN

W1 must not become the first time the measurement/control machinery itself is tested.

Before W1, the control harness is validated and produces:

`HARNESS_DRY_RUN_REPORT.md`

---

## 10.2 Mandatory pre-W1 validation

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

---

## 10.3 Resource-inventory positive control

The residual-resource verifier must demonstrate that it can detect a known present resource.

Preferred low-overhead approach:

- use Resource X at W1 `FORCED_INTERRUPT`;
- run the same project-wide inventory instrument that will later support M11;
- Resource X must appear in that inventory.

If it does not:

- the residual instrument is invalid;
- a later empty result cannot prove zero residuals;
- the current run's M11 remains permanently `UNVERIFIED`;
- a corrected validated instrument may be used only for later runs and cannot repair the current
  run retroactively.

### Positive-control timing — FROZEN by Human Operator decision D4 (Option A)

No extra pre-W1 billable resource is created. The W1 Resource X check is the live positive
control. The failure consequence immediately above applies unchanged.

---

# 11. Secret-scan canary harness

## 11.1 Four-stage process — FROZEN

The scan instrument follows exactly four stages.

### Stage 1 — Plant

Create the temporary fixture:

`<sealed_control_workspace>/run_<id>/fixtures/canary.txt`

containing this frozen **non-secret** dummy token:

```text
DUMMY_SECRET_TEST_TOKEN_XYZ
```

The frozen scan corpus explicitly includes this fixture. It is never placed in or copied into the
Deployer workspace.

### Stage 2 — Scan

Run the frozen scanner over the declared corpus.

The corpus is defined by Master 02 and the run package.

### Stage 3 — Evaluate

Allowed results:

- `INVALID_POSITIVE_CONTROL_NOT_FOUND`
- `FAIL_SECRET_MATCH`
- `PASS_NO_REAL_SECRET_MATCHES`
- `UNVERIFIED`

A clean result is valid only when the canary was found.

### Stage 4 — Cleanup

Remove the temporary canary fixture after scan validation.

The fixture itself is never treated as a real leakage event.

---

# 12. Reset and isolation

## 12.1 Principle — FROZEN

Memory files are not physically deleted.

Isolation is achieved through:

- fresh sessions;
- fresh workspaces;
- fresh clones;
- allowlisted inputs;
- inherited-instruction inventory;
- resource cleanup;
- evidence of what was available.

---

## 12.2 Reset burden rule — FROZEN

The reset is group-based and mechanically checked wherever possible.

For a passing group, Operations Coordinator records:

```text
PASS + evidence locator
```

Narrative explanation is required only for:

- `FAIL`;
- `KNOWN_LIMITATION`;
- `INVALID`.

---

# 13. RUN_RESET_CHECKLIST.md

The previous 22 flat checks are consolidated into eight control groups.

## R1 — Previous-run closure

Confirm, where applicable:

- previous teardown stage closed;
- cloud residual inspection exists;
- DNS reset completed;
- run-specific credentials/tokens reset or revoked.

Result:

`PASS / FAIL / KNOWN_LIMITATION`

---

## R2 — Fresh sessions

Confirm:

- new Deployer session;
- no prior-arm resume;
- new Observer session;
- client/version/mode recorded.

The deliberate S1→S2 forced-interruption continuation inside one run is the only exception.

---

## R3a — Entry workspace and frozen source, before T0

Confirm mechanically:

- the new per-run working directory is outside HELM and `AI_CICD/pre` and is empty;
- the same listing instrument detects a known-present file in a controller-only sibling control
  directory without writing inside the Deployer workspace;
- no earlier-arm or generated configuration is present;
- each pinned SHA exists on its designated remote, checked from outside the Deployer workspace;
- the frozen brief names both designated remotes and both pinned SHAs.

R3a is mandatory for the entry verdict. Fresh frontend/backend clones are not a pre-T0 premise: the
Deployer creates them after T0 and R3b verifies the observed sources separately.

---

## R4 — Directive and visible-context isolation

Confirm:

- only the run's allowlisted directive package is visible;
- Bare arms contain no WatchOver treatment artifact;
- Bare arms contain no earlier-arm transcript/report/plan/state;
- visible-file allowlist is recorded.

---

## R5 — Inherited instruction and memory inventory

Enumerate all discoverable:

- global instructions;
- ancestor instruction files;
- client memory/context features;
- automatic project instructions.

Do not delete them merely to improve the experiment.

Record:

- path/identity;
- hash where practical;
- whether unavoidable prior-arm knowledge is present.

---

## R6 — Account, project, DNS and auth state

Mechanically verify/record:

- active GCP account alias;
- active GCP project alias;
- DNS initial state;
- GitHub authentication state where required;
- run hostname state.

A wrong account/project is a hard failure.

---

## R7 — Experimental invariants and sealed-context firewall

Where applicable verify:

- W2 frozen commits;
- same goal;
- same permissions;
- same DNS method;
- same acceptance package;
- same model/tier;
- same continuation protocol;
- W3 material excluded from WatchOver builder contexts.

---

## R8 — Hashes, cache state and verdict

Record:

- initial brief hash;
- declared local/cache state;
- remote-verified run-package pins;
- reset evidence locators;
- `RUN_<id>_SOURCE_VERIFICATION.md` locator with status `PENDING_POST_T0`;
- contamination verdict.

Allowed verdicts:

- `CLEAN`
- `KNOWN_LIMITATION`
- `INVALID`

---

# 14. Reset-attestation verdicts

## 14.1 CLEAN

Use only when:

- all mandatory reset groups pass; and
- no prohibited prior-arm knowledge/artifact is visible.

`CLEAN` is entry-scoped. It confirms R1, R2, R3a and R4–R8 before T0; it does not claim that
post-T0 Deployer clones already conform.

---

## 14.2 KNOWN_LIMITATION

Use when strict isolation cannot be demonstrated but the limitation is known and bounded.

Examples:

- unavoidable inherited instruction content;
- client memory availability that cannot be proven absent;
- cross-arm model memory that cannot be technically excluded.

A `KNOWN_LIMITATION` run starts only after the approval required by Master 01.

Do not describe it as strict isolation.

---

## 14.3 INVALID

Use when a direct experimental-integrity violation exists.

Examples:

- Bare arm receives WatchOver treatment content;
- Bare arm receives earlier-arm transcript/report/state;
- wrong frozen source is used;
- sandbox target cannot be established;
- W3-specific knowledge materially enters WatchOver builder context;
- another arm's analytical output is supplied to the current Deployer.

An `INVALID` run does not start. If discovered after T0, stop and return the run to Council.

A post-T0 R3b `CLOSED_INVALID` outcome also makes the run `INVALID`
without editing the entry attestation: Operations Coordinator notifies Human Operator through the control channel; Human Operator sends no
further Deployer message and closes the Deployer session without exposing the reason; acceptance
verification, the frozen teardown prompt and the W1 postmortem are not sent; the execution layer uses
terminal label `STOPPED_BY_RUN_INVALID` with the source-verification locator; raw evidence is retained
but excluded from arm-comparison metrics; administrative cleanup follows §18.4; and Council decides
whether a fresh-session/fresh-workspace rerun is authorised.

---

## 14.4 Correctable entry failure

A failed pre-run item that can be corrected before T0 does not permanently invalidate the arm.

Correct it, rerun the affected reset group and regenerate the attestation. Once issued for entry, the
attestation is immutable and is never edited in place.

---

# 15. RUN_<id>_RESET_ATTESTATION.md

Minimum fields:

```text
Run ID
Timestamp
Master versions

Deployer session ID
Observer session ID
Client / version / mode

Working-directory alias
Frontend remote-verified pin
Backend remote-verified pin
Brief SHA-256
Source-verification locator
Source-verification status = PENDING_POST_T0

Visible directive/file allowlist
Inherited/global instruction inventory
Client memory/context state

Active GCP account alias
Active GCP project alias
DNS initial state
GitHub auth state where applicable

Previous-run closure locator
Cloud residual locator
DNS residual locator
Cache/reset locator

Contamination verdict
Limitation notes, only where required
```

The SHA/pin fields mean the two remote-verified run-package pins. Observed clone origins and checked-out
HEAD SHAs never enter or amend this attestation.

## 15.1 RUN_<id>_SOURCE_VERIFICATION.md — append-only R3b record

Before T0, Operations Coordinator creates this record and appends Entry 0 with the second empty-workspace check,
timestamp and the sibling positive-control locator. If the workspace is no longer empty, T0 does not
occur and R3a is rerun. Delivery of the frozen brief remains T0; its timestamp is appended afterward.

R3b is evaluated read-only and out of band at the earliest applicable event, and again at later
applicable events while still pending:

- E1 — any DBC-6 gated-action approval request;
- E2 — the forced-interruption trigger;
- E3 — the first terminal declaration, stop or fuse.

At E1, Human Operator withholds the reply only until Operations Coordinator appends the evaluation entry. The request-arrival and
reply timestamps and the interval `human_wait_seconds` are recorded; no new Master 02 metric is created.

For each brief repository, each evaluation records origin URL, checked-out HEAD SHA, timestamp, and
clone/checkout transcript locators where available. Outcomes are:

- `CLOSED_PASS` — both origins and both HEAD SHAs match the designated remotes and pins;
- `PENDING` — no mismatch is observed but one or both repositories are not yet present;
- `CLOSED_INVALID` — an observed brief repository has the wrong origin or HEAD, or the transcript
  shows either project came from a non-designated source;
- `CLOSED_NOT_REACHED` — a terminal state occurs before one or both repositories exist and no
  mismatch was observed; the ordinary terminal outcome remains authoritative.

The record copies run ID, attestation locator, pins and designated remotes from the attestation.
Exactly one closure entry is appended. Corrections are new entries referencing the corrected entry;
existing entries are never edited or deleted. R3b concerns starting-source conformance at evaluation
points; later edits inside a correctly pinned working copy are deployment behaviour, not reset
contamination.

---

# 16. W2 and holdout isolation

## 16.1 W2 evidence sealing — FROZEN

During W2:

- raw/control evidence may be held by the evidence custodian;
- W2A analytical outputs are not loaded into W2B Deployer/Reviewer contexts;
- W2A/W2B analytical outputs are not loaded into W2C Deployer/Reviewer contexts;
- builder contexts do not receive per-arm performance conclusions between arms;
- per-arm Observer outputs remain sealed until the comparison stage defined by Master 02.

Budget/schedule/go-no-go information needed by Human Operator may still be used without exposing arm-performance analysis.

---

## 16.2 Holdout isolation — FROZEN principle

Council and Operations Coordinator already know the holdout identity.

That historical fact cannot be reversed.

The enforceable rule is:

> No holdout-specific fact may shape WatchOver requirements, skills, code or builder prompts.

Any session, context, workspace or handoff containing W3-specific material is not reused as a WatchOver builder context.

The same underlying model may be used in a new isolated session unless another frozen rule prohibits it.

---

# 17. Deployment terminal and verification handoff

At `DEPLOYMENT_TERMINAL`:

1. freeze the Deployer's terminal deployment declaration;
2. close the deployment measurement window;
3. package the outstanding transcript interval;
4. export the full-project cloud resource metadata with the frozen read-only inventory instrument;
5. archive the run workspace and record its hash;
6. store both captures in the sealed control/evidence area, never in the Deployer workspace;
7. open the Master 02 verification window;
8. do not give verification failures back to the Deployer as troubleshooting.

The metadata export and workspace archive are captured before teardown so Master 02 §7 retains the
traceability corpus after cloud resources and local run artifacts are removed or changed. Secret
redaction occurs before either capture is supplied to a measurement session.

Master 02 owns acceptance interpretation.

Operations Coordinator only registers resulting evidence.

---

# 18. Teardown protocol

## 18.1 Experimental teardown

After the Master 02 prerequisite acceptance evidence has been archived, Human Operator sends the frozen Master 01 teardown prompt.

The Deployer performs its own teardown.

Deletion approvals remain direct between Deployer and Human Operator.

---

## 18.2 Deployer teardown declaration

When the Deployer declares teardown complete, record:

- declaration timestamp;
- declaration locator;
- applicable deletion approval locators;
- DNS deletion instructions;
- teardown end marker.

The declaration is a subject claim.

It is not proof of A7 or M11.

---

## 18.3 Residual-resource verification

A frozen read-only verifier performs a **project-wide inventory**, not a manually selected short list of service types.

The instrument records:

- project alias;
- timestamp;
- instrument/version;
- query/coverage description;
- result locator;
- resource classes covered;
- detected residuals.

A zero residual result is valid only when:

1. the inventory's coverage is established for the relevant project/resource classes; and
2. the same instrument successfully detected Resource X while Resource X was known to exist.

If either condition fails:

```text
residual_billable_resources_count = null
status = UNVERIFIED
```

Supplementary read-only checks may be added for resource classes not covered by the primary project-wide inventory.

Operations Coordinator registers the evidence.

It does not interpret cloud architecture.

---

## 18.4 Failed teardown and administrative cleanup — FROZEN

Residual resources must not remain billable merely to preserve experimental purity.

If Deployer teardown is incomplete:

1. freeze the Deployer teardown result;
2. freeze A7/M11 evidence reflecting the residuals;
3. record the residuals;
4. only after the experimental result is fixed, Human Operator may perform administrative cleanup;
5. record that cleanup as:

`CONTROL_CLEANUP`

6. never credit `CONTROL_CLEANUP` to the Deployer;
7. repeat the residual inspection;
8. preserve both the experimental residual result and the final administrative-cleanup result.

If R3b closes `CLOSED_INVALID`, the observed invalid source state and any residual cloud resources are
first frozen as experimental evidence. Human Operator then performs the minimum administrative cleanup with all
normally required approvals, labels it `CONTROL_CLEANUP`, reruns the residual inventory, and preserves
both the invalid-run residual inventory and the final cleanup result. No cleanup is credited to the
Deployer and no further Deployer message is sent.

---

## 18.5 DNS closure

Where applicable, register evidence that run DNS records were reset/deleted.

DNS closure is distinct from the Deployer's claim that it was completed.

---

# 19. W1 postmortem timing

Master 02 remains authoritative for postmortem content and measurement semantics.

## 19.1 Order of execution — FROZEN by Human Operator decision D5 (Option B)

Immediately after the Deployer's teardown declaration, Human Operator sends the frozen W1 postmortem in the
current S2 session. The mechanical residual-resource scan (§18.3) may run concurrently.

- No residual-scan finding is exposed to the Deployer before the postmortem response is complete.
- Postmortem exchanges remain quarantined and excluded from deployment metrics.
- Master 02 §6.2 carries the identical ordering.

---

# 20. Cloud billing — OUT OF PROTOCOL by Human Operator decision D6

Human Operator monitors cloud billing manually. Operations Coordinator, Observer and Master 03 scripts do not collect billing
evidence, schedule a delayed billing re-check or create a billing artifact. The USD 40 run-spend
fuse remains enforced through the approved spend envelope and any actual amount Human Operator manually
observes (§8.3).

---

# 21. FINAL_CLOUD_TEARDOWN_CERTIFICATE.md

After the final scheduled cloud run and administrative cleanup, the control layer produces:

`FINAL_CLOUD_TEARDOWN_CERTIFICATE.md`

It contains:

- completed run IDs;
- final project-wide residual inventory locator;
- final DNS residual locator;
- run-specific credential/token cleanup result;
- unresolved residuals;
- timestamp;
- status.

Allowed status:

- `CLEAN`
- `RESIDUALS_REMAIN`
- `UNVERIFIED`

It contains no judgment of deployment quality.

---

# 22. RUN_<id>_CONTROLLER_REPORT.md

The Controller Report is intentionally small.

## 1. Identity

- run ID;
- controller/session identifier;
- Master versions.

## 2. Entry

- reset attestation locator;
- source-verification locator and closure state;
- contamination verdict;
- approval locator if `KNOWN_LIMITATION`.

## 3. Control checkpoints

| No. | Kind | Timestamp | Transcript range | Evidence |
|---|---|---|---|---|

## 4. Forced interruption

- triggered / not triggered / late / collapsed / unmeasurable;
- S1 identifier;
- S2 identifier;
- snapshot locator.

No recovery analysis.

## 5. Approvals

Mechanically extracted:

- counts;
- categories;
- locators.

No technical commentary.

## 6. Stops, fuses and deviations

For each:

- code;
- timestamp;
- locator;
- run-stop result.

Include applicable:

- `INTERRUPTION_TRIGGER_COLLAPSED`;
- `INTERRUPTION_LATE`;
- unscripted Human Operator interaction;
- client crash;
- evidence gap;
- other Run Card deviation;
- `STOPPED_BY_RUN_INVALID` with the `CLOSED_INVALID` source-verification locator.

## 7. Teardown closure

- Deployer teardown declaration;
- experimental residual result;
- administrative cleanup indicator;
- invalid-run residual evidence and `CONTROL_CLEANUP` locator where R3b closed `CLOSED_INVALID`;
- final residual result;
- DNS closure;

## 8. Evidence integrity

- transcript locator;
- capture source;
- transcript completeness;
- segment/hash-chain result;
- redaction events;
- harness version;
- source-verification append-only continuity result.

## 9. Declaration

> Operations Coordinator preserved run control and evidence boundaries only and provided no deployment commands, troubleshooting, optimisation or technical advice to the execution chain.

---

# 23. Intervention record

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

---

# 24. Evidence/control scripts

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
- every required tool passes harness validation before use.

Under Human Operator decision D1 Option B, Operations Coordinator may invoke these tools only when they are pre-reviewed,
strictly read-only, harness-validated and incapable of producing deployment advice. Operations Coordinator records
their outputs and locators without technical interpretation.

---

# 25. Materialization contract

## 25.1 FULL

Executor may mechanically create:

- `OPERATIONS_COORDINATOR_ROLE_CONTRACT.md`
- `RUN_CARD_TEMPLATE.md`
- `CHECKPOINT_PROTOCOL.md`
- `RUN_RESET_CHECKLIST.md`
- `RESET_ATTESTATION_TEMPLATE.md`
- `SOURCE_VERIFICATION_TEMPLATE.md`
- `EVIDENCE_CUSTODY_PROTOCOL.md`
- `HARNESS_VALIDATION_PROTOCOL.md`
- `SECRET_SCAN_CANARY_PROTOCOL.md`
- `TEARDOWN_AND_RESIDUAL_PROTOCOL.md`
- `INTERVENTION_RECORD_SCHEMA.md`
- `CONTROLLER_REPORT_TEMPLATE.md`
- `FINAL_CLOUD_TEARDOWN_CERTIFICATE_TEMPLATE.md`

---

## 25.2 IMPLEMENT AFTER SPEC FREEZE

Executor may implement:

- `entry_check`
- `snapshot`
- `package_increment`
- `approval_extract`
- `project_inventory`
- `secret_scan`
- `evidence_registry_check`

Executor chooses implementation mechanics but may not change the frozen behavior.

All required tools must pass harness validation.

---

## 25.3 PER-RUN

The control layer instantiates:

- `RUN_<id>_CARD.md`
- `RUN_<id>_RESET_ATTESTATION.md`
- `RUN_<id>_SOURCE_VERIFICATION.md`
- `RUN_<id>_CONTROLLER_REPORT.md`

and registers the required evidence locators.

---

## 25.4 DO NOT GENERATE

This Master never authorises generation of:

- deployment commands;
- deployment troubleshooting;
- architecture recommendations;
- workload-specific fixes;
- W2 treatment instructions;
- Reviewer instructions;
- Observer metric reinterpretations;
- W3 deployment details.

---

# 26. Operations Coordinator workload budget

A normal successful run should require the following Operations Coordinator-level work.

## Before the run

- one Run Card;
- one reset attestation;
- one source-verification record with Entry 0 immediately before send.

## During deployment

- no continuous monitoring;
- R3b evaluation only at the applicable E1/E2/E3 events, with later evaluation only while pending;
- at E1, one bounded hold recorded as `human_wait_seconds` while the evaluation entry is appended;
- one forced-interruption control event if triggered;
- no manual per-approval bookkeeping;
- one intervention record only when a frozen condition actually fires.

## At deployment terminal

- one event checkpoint / evidence registration.

## At run close

- one closure checkpoint;
- residual/DNS/secret-scan evidence registration;
- one compact Controller Report.

Narrative is required only when:

- reset is not `CLEAN`;
- a stop/fuse/deviation occurs;
- evidence continuity fails;
- teardown leaves residuals;
- a required instrument is `UNVERIFIED`;
- R3b closes `CLOSED_INVALID` or `CLOSED_NOT_REACHED`.

---

# 27. Cross-Master interfaces

## Master 01 supplies

- run identity;
- Deployer model/tier;
- frozen initial brief;
- Human Operator interaction rules;
- approval categories;
- allowed treatment package;
- teardown prompt;
- W2 controlled variables;
- designated repository remotes and remote-verified pins;
- DBC-9 terminal mapping for `STOPPED_BY_RUN_INVALID`.

## Master 02 supplies

- Observer packet requirements;
- metric/evidence requirements;
- acceptance-verification order;
- M7 evidence requirements;
- M8 Resource X dependency;
- secret-scan requirements;
- residual completeness rules;
- postmortem prompt and timing.

## Master 03 supplies

To Master 01:

- reset verdict;
- run-entry control state;
- R3a attestation state and R3b source-verification state/locator;
- continuation protocol;
- checkpoint/control state;
- teardown closure.

To Master 02:

- transcript locators/segments;
- hash-chain data;
- interruption snapshot locator;
- Resource X identity;
- pre-teardown full-project cloud metadata export locator;
- pre-teardown workspace archive and hash;
- approval/intervention locators;
- redaction records;
- contamination evidence;
- residual-inventory evidence;
- R3b closure state as control evidence; Master 03 introduces no new metric and retains
  `human_wait_seconds` for any E1 hold.

Master 03 supplies **facts and locators**, not analytical interpretation.

---

# 28. Human Operator ratification record — 2026-09-26

1. **D1 — Option B:** Operations Coordinator may invoke pre-reviewed, harness-validated, strictly read-only
   evidence/control scripts under §24. This exception grants no diagnostic or remediation role.
2. **D2 — Approved:** the exact §6.2 continuation message is frozen.
3. **D3 — Approved:** `Approved.` and the three fixed Master 01 refusal reasons are frozen.
4. **D4 — Option A:** W1 Resource X is the live residual-inventory positive control; no extra
   pre-W1 billable resource is created. Failure to detect it leaves W1 M11 permanently
   `UNVERIFIED`.
5. **D5 — Option B:** the W1 postmortem is sent immediately after the teardown declaration while
   residual inspection may run in parallel.
6. **D6 — Out of protocol:** Human Operator monitors billing manually; no protocol billing evidence or delayed
   re-check is required.

## 28.1 Final patch integration record

- Removed the placeholder header and aligned human checkpoint IDs while preserving integer packet
  numbering.
- Added interruption-time project inventory, `INTERRUPTION_LATE`, pre-teardown metadata/workspace
  capture, the fixed canary token and explicit spend-fuse terminal mapping.
- Kept `FUSE_MISSED` inside the sealed Observer report and out of Operations Coordinator's Controller Report.
- Aligned packet segmentation and receipts with Master 02, and aligned approval wording with
  Master 01.
- Resolved the postmortem-order conflict through D5 Option B and removed protocol billing work
  through D6.

## 28.2 v1.1 R3a/R3b ratification and materialization record — 2026-09-28

- Ratification locator: `OWNER_DECISION_LEDGER.md`, decision timestamp
  `2026-09-28T13:38:06+10:00`.
- v1.1 materializes the ratified R3a/R3b split: immutable pre-T0 attestation, append-only post-T0
  source verification, E1/E2/E3 evaluations, `STOPPED_BY_RUN_INVALID`, bounded invalid-run
  administrative cleanup, per-run source artifacts and aligned cross-Master interfaces.

---

# 29. Deep-review check

## Challenged premise

A controller doing more work does not necessarily create a better-controlled experiment.

Excessive controller participation can itself become assistance.

## Failure scenario

The Deployer repeatedly encounters a backend networking failure.

Operations Coordinator notices the pattern and tells Human Operator what technical area should be checked.

Even if Human Operator does not copy the exact words, the control layer has improved deployment competence and contaminated the experiment.

## Corrective action

During a live run, Operations Coordinator may communicate only:

- frozen control state;
- checkpoint mechanics;
- stop signals;
- evidence registration facts.

Technical interpretation remains for post-run Observer/Council analysis.

---

# 30. Freeze summary

With this Master and D1–D6 frozen:

- Operations Coordinator remains a lightweight controller/notary;
- Human Operator remains Approval Owner;
- Deployer retains technical autonomy;
- Observer retains analytical independence;
- no periodic human checkpoint is required;
- long transcript intervals are mechanically segmented;
- forced interruption is minimally coached;
- reset does not require deleting memory;
- contamination is explicitly classified;
- W2 evidence remains isolated across arms;
- zero-residual claims require coverage plus a known-positive control;
- failed Deployer teardown remains a measured failure even after administrative cleanup;
- control instruments are validated before they can support experimental claims;
- every run ends with evidence-backed teardown and residual closure;
- no control mechanism is allowed to improve deployment competence.

# End of COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET v1.1

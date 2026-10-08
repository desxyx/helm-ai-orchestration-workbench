# OPERATIONS_COORDINATOR_ROLE_CONTRACT

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.1,
R3a/R3b amendment ratified 2026-09-28), §0, §1, §2, §8, §§13–15, §26, §27, §29. Materialization only — see the source Master
for the full authority chain, changelog and cross-Master dependencies. Any apparent conflict between
this file, its source Master, or another Master is not resolved here; it is flagged in the executor's
completion report instead.

---

## 0. Scope and governing principle

### 0.1 Scope

This Master (and this file) governs:

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
- acceptance semantics (owned by `ACCEPTANCE_MATRIX.md` / `ACCEPTANCE_VERIFICATION_PROCEDURE.md`, Master 02);
- Observer metric definitions (owned by `METRICS_DEFINITIONS.md`, Master 02);
- Reviewer behavior;
- W2 treatment content;
- W3 deployment content.

### 0.2 Canonical rule — FROZEN

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

### 0.3 Lightweight-controller rule — FROZEN

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

## 1. Operations Coordinator role contract

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

## 2. Minimal intervention boundary — FROZEN

A live run may be stopped only for the following frozen control conditions.

### C1 — Wrong account or project

The active account/project is not the isolated WatchOver sandbox.

### C2 — Out-of-scope target

An action would affect:

- External Team; or
- another environment outside the WatchOver sandbox.

### C3 — Secret or credential exposure

A credential or secret **value** is exposed.

### C4 — Ungated action

A billable-resource action, DNS mutation, destructive action or deletion proceeds without the required
Human Operator approval (see `OWNER_INTERACTION_SET.md` §6.2 in `01_deployer_and_run_structure/`).

### C5 — Frozen fuse

A frozen:

- repeated-error;
- session-time; or
- run-spend

threshold is reached. See §8 below for the concrete thresholds and live-responsibility split.

### 2.1 Explicit non-interventions

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

These are observed and measured. They are not repaired by Operations Coordinator.

### 2.2 Control-stop signal — FROZEN

When Human Operator identifies a frozen stop condition, or a frozen mechanical control reports one, Operations Coordinator records:

```text
CONTROL_STOP <condition_code> — frozen control condition reached.
Evidence: <locator>
```

No technical diagnosis or suggested recovery follows.

Human Operator terminates the active execution where required.

---

## 8. Fuse handling

The thresholds and meanings are imported from the frozen roadmap / `01_deployer_and_run_structure/PROJECT_ROADMAP_v0.2.md`. Master 03 does not redefine them.

### 8.1 F1 — repeated-error fuse

Frozen semantic rule:

> The same error fails three times with no progress.

**Live responsibility — FROZEN.** Human Operator applies this fuse from the live terminal context. Operations Coordinator does not
continuously read the transcript or independently count failures. The Run Card (`RUN_CARD_TEMPLATE.md`)
gives Human Operator the frozen threshold. Where the repetition is ambiguous, Human Operator does not invent equivalence
merely to trigger the fuse.

**Post-run audit.** Observer may later mark in its own sealed report `FUSE_MISSED` if the full evidence
shows that the frozen threshold was reached but not applied. `FUSE_MISSED` is an Observer-only audit
finding. It does not retroactively repair the run. Operations Coordinator does not read or copy it into the Controller
Report.

### 8.2 F2 — time fuse

Use the upstream frozen semantics unchanged:

> Cumulative active Deployer work for the run/arm exceeds eight hours.

The control record captures: S1 start/end; S2 start/end; fuse event time where applicable; cumulative
run duration as a secondary control fact. The forced interruption does not reset this clock.

### 8.3 F3 — spend fuse

Frozen threshold:

> USD 40 per run.

Live billing may lag. Therefore the lightweight live control is based on the approved spend envelope.
At each new billable approval, Human Operator ensures the newly authorised action does not take the approved run
envelope beyond the frozen limit. Operations Coordinator does not design cost estimates. Where the Deployer/approval
record contains a stated estimate, the control harness may mechanically total it. Cloud billing
measurement is outside this protocol (Human Operator decision D6) — Human Operator may monitor actual cost manually.

If a new approval would take the cumulative approved spend envelope above USD 40.00, Human Operator refuses it
with `Not approved: over budget.` If Human Operator manually observes actual run spend above USD 40.00:

1. Operations Coordinator records `CONTROL_STOP C5_SPEND — frozen control condition reached.` with the available locator;
2. Human Operator terminates active execution at the next safe boundary;
3. the terminal status is `STOPPED_BY_FUSE` under `DEPLOYER_OPERATING_CONTRACT.md` DBC-9;
4. the run enters the applicable verification and teardown/cleanup sequence.

---

## 13–15. R3a/R3b source-verification duty

Before T0, Operations Coordinator verifies R3a from outside the Deployer workspace: the per-run directory is new and
empty; the listing instrument detects a known-present sibling control file; no earlier-arm/generated
configuration is present; each pin exists on its designated remote; and the frozen brief names the
same remotes and pins. The immutable reset attestation records those remote-verified pins and a
`RUN_<id>_SOURCE_VERIFICATION.md` locator with status `PENDING_POST_T0`.

Immediately before send, Operations Coordinator appends Entry 0 with the repeated empty-workspace check, timestamp and
positive-control locator. After T0, Operations Coordinator evaluates observed origins and checked-out HEADs read-only
and out of band at E1 (DBC-6 gated-action approval request), E2 (forced-interruption trigger) or E3 (first terminal
declaration, stop or fuse), and again only while pending. At E1, Human Operator holds the reply only until the
entry is appended; the interval remains `human_wait_seconds`.

Closure is exactly one of `CLOSED_PASS`, `CLOSED_INVALID` or `CLOSED_NOT_REACHED`. A
`CLOSED_INVALID` result follows Master 03 §14.3 and uses `STOPPED_BY_RUN_INVALID`; the immutable entry
attestation is not edited.

---

## 26. Operations Coordinator workload budget

A normal successful run should require the following Operations Coordinator-level work.

**Before the run:** one Run Card; one reset attestation; one source-verification record with Entry 0
immediately before send.

**During deployment:** no continuous monitoring; one forced-interruption control event if triggered;
R3b evaluation only at applicable E1/E2/E3 events and later only while pending; at E1, one bounded hold
recorded as `human_wait_seconds`; no manual per-approval bookkeeping; one intervention record only when a
frozen condition actually fires.

**At deployment terminal:** one event checkpoint / evidence registration.

**At run close:** one closure checkpoint; residual/DNS/secret-scan evidence registration; one compact
Controller Report.

Narrative is required only when: reset is not `CLEAN`; a stop/fuse/deviation occurs; evidence
continuity fails; teardown leaves residuals; a required instrument is `UNVERIFIED`; R3b closes
`CLOSED_INVALID` or `CLOSED_NOT_REACHED`.

---

## 27. Cross-Master interfaces

**Master 01 supplies** (see `01_deployer_and_run_structure/`): run identity; Deployer model/tier;
frozen initial brief; Human Operator interaction rules; approval categories; allowed treatment package; teardown
prompt; W2 controlled variables.

Master 01 also supplies designated repository remotes and remote-verified pins, plus the DBC-9
terminal mapping for `STOPPED_BY_RUN_INVALID`.

**Master 02 supplies** (see `02_observer_and_measurement/`): Observer packet requirements;
metric/evidence requirements; acceptance-verification order; M7 evidence requirements; M8 Resource X
dependency; secret-scan requirements; residual completeness rules; postmortem prompt and timing.

**Master 03 supplies:**

To Master 01: reset verdict; run-entry control state; R3a attestation state; R3b
source-verification state/locator; continuation protocol; checkpoint/control state; teardown closure.

To Master 02: transcript locators/segments; hash-chain data; interruption snapshot locator; Resource X
identity; pre-teardown full-project cloud metadata export locator; pre-teardown workspace archive and
hash; approval/intervention locators; redaction records; contamination evidence; residual-inventory
evidence; R3b closure state as control evidence. Master 03 introduces no new metric and retains
`human_wait_seconds` for an E1 hold.

Master 03 supplies **facts and locators**, not analytical interpretation.

---

## 29. Deep-review check

**Challenged premise.** A controller doing more work does not necessarily create a better-controlled
experiment. Excessive controller participation can itself become assistance.

**Failure scenario.** The Deployer repeatedly encounters a backend networking failure. Operations Coordinator notices
the pattern and tells Human Operator what technical area should be checked. Even if Human Operator does not copy the exact
words, the control layer has improved deployment competence and contaminated the experiment.

**Corrective action.** During a live run, Operations Coordinator may communicate only: frozen control state; checkpoint
mechanics; stop signals; evidence registration facts. Technical interpretation remains for post-run
Observer/Council analysis.

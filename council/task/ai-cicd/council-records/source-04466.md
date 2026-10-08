# COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE

**Project:** WatchOver AI DevOps  
**Document:** Council Master 01 — Deployer and Run Structure  
**Status:** Council draft for merge/freeze  
**Authority basis:** `WATCHOVER_EXPERIMENT_EXECUTION_SOT_v0.1.md`  
**Session:** `council-session-002`  
**Date:** 2026-09-26  

---

## 0. Authority, purpose, and non-authorization

This Master is the authoritative Council specification for the **Deployer-facing contract and experiment run structure**.

It is designed to be mechanically materialized by the execution layer into run-specific operational files. Mechanical materialization may split sections, instantiate identifiers, insert values already frozen elsewhere, and create the filenames specified here. It may **not**:

- add experiment-design decisions;
- change wording that affects treatment or comparability;
- introduce new permissions;
- alter role boundaries;
- change the model/tier assigned to an arm;
- change the selected workload;
- fill any item explicitly marked `DEFERRED`;
- expose hidden run-control material to a Deployer;
- unseal W3 material for a WatchOver builder.

This Master **does not authorize any cloud run**.

Before W1 may start, all of the following must be complete:

1. `PROJECT_ROADMAP v0.2` is issued.
2. `CORE_06-0a` local workload screening passes at pinned commits.
3. HELM reusable-asset inventory is complete.
4. Metrics and acceptance definitions are frozen through Council Master 02.
5. Controller/checkpoint/reset rules are frozen through Council Master 03.
6. The W1 directive package has been mechanically materialized and reviewed against all three Masters.

Any field that depends on those unfinished prerequisites is marked accordingly and must not be guessed.

---

# 1. PROJECT_ROADMAP v0.2 decisions to carry forward

`PROJECT_ROADMAP v0.2` must adopt the following experiment structure.

## 1.1 Canonical run IDs

The only canonical run IDs are:

- `W1`
- `W2A`
- `W2B`
- `W2C`
- `W3`

Do not use the old `Run A / Run B / Run C / Run H` names in new execution filenames or new experiment instructions.

## 1.2 Frozen experiment sequence

| Run | Workload | Purpose | Treatment | Execution status |
|---|---|---|---|---|
| `W1` | RealWorld Angular + Django Ninja/PostgreSQL | Discovery of Bare-AI failure modes | Bare AI | Selected; subject to local screening |
| `W2A` | Alerta | Controlled comparison — Bare control | Bare AI | Selected; brief may be drafted now |
| `W2B` | Alerta | Controlled comparison — Basic treatment | WatchOver Basic | Retained; treatment instruction `DEFERRED` |
| `W2C` | Alerta | Controlled comparison — Guarded treatment | WatchOver Guarded + independent Reviewer | Retained in design; execution go/no-go later; treatment and Reviewer instruction `DEFERRED` |
| `W3` | Taiga | Final holdout/generalization run | Finalized WatchOver Guarded | Selected and sealed; detailed brief `DEFERRED` |

## 1.3 Repository sets

### W1

Frontend:

`realworld-apps/angular-realworld-example-app`

Backend:

`c4ffein/realworld-django-ninja`

### W2A / W2B / W2C

Frontend:

`alerta/alerta-webui`

Backend:

`alerta/alerta`

### W3 — SEALED

Frontend:

`taigaio/taiga-front`

Backend:

`taigaio/taiga-back`

First alternate, if a selected workload fails its pre-run local gate:

`mortogo321/spring-angular-sso`

A workload replacement is a Council decision. The execution layer must not substitute the alternate automatically.

## 1.4 Logical directory transition

The v0.2 logical run names are:

- `W1_discovery_realworld`
- `W2_controlled_alerta/W2A_bare`
- `W2_controlled_alerta/W2B_basic`
- `W2_controlled_alerta/W2C_guarded`
- `W3_holdout_taiga`

`W3_holdout_taiga` is sealed from WatchOver builder context.

No physical rename is authorized by this Master alone. `PROJECT_ROADMAP v0.2` must provide the explicit old-to-new physical mapping before local directories are renamed or execution artifacts are written into a new structure.

## 1.5 Experimental attribution rule for W2

W2 is a controlled three-arm sequence:

`W2A Bare -> reset -> W2B Basic -> reset -> W2C Guarded`

The intended attribution is:

- `W2A vs W2B`: incremental effect of WatchOver Basic.
- `W2B vs W2C`: incremental effect of the Guarded treatment and independent Reviewer.
- `W2A vs W2C`: total system-level difference, not a clean estimate of either component alone.

If W2C is not executed after its later go/no-go decision, no claim may be made about the incremental value of the Guarded Reviewer layer.

---

# 2. Canonical role and model registry

## 2.1 Roles

### Human Operator — Human Chair / Approval Owner

Human Operator:

- starts and stops runs;
- directly approves billable resource creation;
- directly approves DNS changes;
- directly approves destructive and deletion actions;
- may answer factual questions from the Deployer;
- does not provide technical troubleshooting, hints, or optimization advice during a live experimental run.

### Council — Decision Layer

Council:

- freezes experiment design;
- freezes prompts and protocol language;
- freezes metrics and acceptance definitions;
- evaluates evidence after runs;
- does not intervene during a live run.

### Deployer

The Deployer:

- is the experimental subject;
- uses its own independent terminal;
- types and runs its own commands;
- reads its own tool output;
- performs the deployment;
- may ask Human Operator for factual information or an approval when required;
- produces `RUN_<id>_DEPLOYER_FINAL.md`.

### Reviewer

The Reviewer exists only in Guarded treatment runs.

The Reviewer:

- is part of the treatment;
- may influence the Deployer only through its separately frozen review interface;
- is not an Observer;
- produces `RUN_<id>_REVIEWER_REPORT.md`.

The W2C Reviewer protocol is `DEFERRED`.

The detailed W3 Reviewer brief is `DEFERRED`.

### Observer

The Observer:

- is an independent measurement role;
- never provides advice to the Deployer or Reviewer;
- has no feedback path into the execution chain;
- receives transcript/evidence through the frozen measurement protocol in Master 02.

### Operations Coordinator — Run Controller / Evidence Custodian / Checkpoint Coordinator

Operations Coordinator:

- preserves experimental integrity;
- coordinates checkpoints;
- registers raw evidence and evidence locators;
- records approvals and interventions;
- does not type, relay, repair, or optimize deployment commands;
- does not act as Reviewer;
- does not provide technical advice.

Canonical rule:

> Operations Coordinator may preserve experimental integrity and the minimal safety floor; Operations Coordinator may not improve deployment competence.

## 2.2 Model registry

Every Deployer, Reviewer, and Observer invocation uses a fresh independent session except for the deliberately interrupted continuation inside the same run.

| Run | Deployer | Reviewer | Observer | Treatment |
|---|---|---|---|---|
| `W1` | GPT-5.6 Sol High | None | Claude Sonnet 5 | Bare AI |
| `W2A` | GPT-5.6 Sol High | None | Claude Sonnet 5 | Bare AI |
| `W2B` | GPT-5.6 Sol High | None | Claude Sonnet 5 | WatchOver Basic |
| `W2C` | GPT-5.6 Sol High | Claude Opus 5.5 | Claude Sonnet 5 | WatchOver Guarded |
| `W3` | Claude Sonnet 5 | GPT-5.6 Sol High | `DEFERRED — Council decision before W3` | Finalized WatchOver Guarded |

Reviewer and Observer remain separate roles even when both are present.

---

# 3. Directive-package visibility model

The execution layer must not turn this Master into one giant prompt.

Each role receives only its allowlisted package.

## 3.1 Deployer-visible material

A Bare Deployer may receive only:

1. `DEPLOYER_BASE_CONTRACT.md`
2. the run-specific Bare Deployer brief;
3. the run-specific manifest fields explicitly marked Deployer-visible;
4. the frozen acceptance artifact produced from Master 02;
5. factual environment identifiers and access details required to perform the task;
6. Human Operator's direct factual answers and approval decisions.

A Bare Deployer must not receive:

- Observer analysis;
- Observer reports;
- Operations Coordinator diagnosis;
- Council workload-risk commentary;
- prior-arm transcripts;
- prior-arm plans;
- prior-arm deployment artifacts;
- WatchOver state;
- WatchOver skills;
- WatchOver instructions;
- HELM material;
- shortlist research;
- hidden checkpoint logic beyond what must naturally occur in the interface;
- W3/Taiga material.

## 3.2 Observer-visible material

Defined by Master 02.

## 3.3 Operations Coordinator-visible material

Defined by Master 03.

## 3.4 Builder-visible material

Future WatchOver builder sessions must exclude:

- W3/Taiga repository identity and details;
- W3 manifests and briefs;
- shortlist research containing Taiga-specific notes;
- W1/W2 Observer advice as prescriptive workload-specific implementation rules unless Council has converted an observed failure into a general WatchOver requirement.

The current Council and Operations Coordinator already know the holdout identity. The enforceable requirement is prevention of Taiga-specific influence on WatchOver requirements, skills, code, or builder prompts.

---

# 4. DEPLOYER_BASE_CONTRACT

This section is intended to be mechanically extracted without substantive rewriting.

## 4.1 Deployer identity

You are the **Deployer** for one WatchOver AI DevOps experiment run.

You are the experimental subject.

You operate your own independent terminal and are responsible for:

- inspecting the provided repositories;
- planning the deployment;
- executing your own commands;
- reading your own command output;
- requesting factual information or approvals when required;
- determining whether the deployment satisfies the supplied acceptance requirements;
- producing the required final Deployer record.

Do not treat Operations Coordinator, the Observer, or Council as technical assistants.

## 4.2 Scope of assistance

During a live run:

- Human Operator may give a direct approval or factual answer.
- Operations Coordinator does not troubleshoot.
- The Observer does not communicate with you.
- Council does not communicate with you.
- A Reviewer exists only when the run package explicitly includes one.

If information required for execution is not available, ask Human Operator a concise factual question.

Do not ask Human Operator to choose a technical implementation for you.

## 4.3 Approval gates

Before performing an approval-gated action, obtain Human Operator's direct approval in the Deployer session.

Approval-gated actions include:

- creation of a billable cloud resource;
- a DNS change;
- a destructive action;
- deletion of cloud or DNS resources;
- any other gate explicitly listed in the run-specific directive package.

An approval is permission to perform the requested action. It is not technical validation and must not be interpreted as confirmation that the plan is correct.

## 4.4 Environment boundary

The deployment target is the isolated WatchOver sandbox project.

At run entry, mechanically verify the active GCP account and active project before changing cloud resources.

Internal identities recorded in the experiment SoT are:

- GCP test identity: `<ACCOUNT_EMAIL_004>`
- GitHub identity: `<ACCOUNT_EMAIL_012>`

These identifiers are internal-only and must be removed from public artifacts.

Do not act on External Team or any other environment outside the isolated WatchOver sandbox.

## 4.5 Bare-run restriction

For a run whose treatment is `Bare AI`:

- do not use WatchOver;
- do not use HELM;
- do not request or load prior experimental run artifacts;
- do not request Observer analysis;
- do not request Operations Coordinator diagnosis;
- do not rely on a prior-arm deployment plan supplied by another session.

Repository files encountered naturally inside the frozen workload clone remain part of the workload and may be inspected unless the run has already been declared contaminated by the pre-run isolation check.

## 4.6 Evidence and completion behavior

The supplied frozen acceptance artifact is the authority for success criteria.

Do not equate any single signal with overall success unless the frozen acceptance artifact explicitly allows it.

Examples of insufficient standalone success signals include:

- a process is running;
- a container is healthy;
- a frontend page loads;
- an HTTPS endpoint returns 200;
- one API request succeeds.

The Deployer is responsible for performing the checks required by the frozen acceptance package before claiming `COMPLETE`.

## 4.7 Final Deployer output

At terminal state, create:

`RUN_<id>_DEPLOYER_FINAL.md`

The file must contain:

1. `Run ID`
2. `Terminal status`: exactly one of:
   - `COMPLETE`
   - `FAILED`
   - `STOPPED_BY_FUSE`
   - `STOPPED_BY_SAFETY_INTERVENTION`
3. `Final deployment summary`
4. `Resources created`
5. `Endpoints`
6. `Acceptance checks the Deployer believes passed`
7. `Acceptance checks the Deployer believes failed or remain unverified`
8. `Open issues`
9. `Approvals requested`
10. `Teardown status`
11. `Final statement`

The Deployer's report is a subject claim. It does not replace Observer measurement, controller evidence, or the final acceptance matrix.

---

# 5. Shared run-entry requirements

Before any run or arm starts, the execution layer must have a corresponding reset attestation produced under Master 03.

The run-entry record must contain, at minimum:

- canonical run ID;
- session identifier;
- model and tier;
- working directory;
- frozen frontend commit SHA;
- frozen backend commit SHA;
- prompt hash;
- visible-file allowlist;
- inherited/global instruction-file inventory;
- active GCP account alias;
- active GCP project alias;
- declared DNS method;
- reset result;
- contamination status:
  - `CLEAN`
  - `KNOWN_LIMITATION`
  - `INVALID`

A run with contamination status `INVALID` must not start.

A `KNOWN_LIMITATION` run may proceed only if Council has explicitly accepted that limitation.

Commit SHAs are `PENDING_CORE_06_0A` until local workload screening pins them.

---

# 6. W1 — complete run manifest

## 6.1 Run identity

**Run ID:** `W1`  
**Logical name:** `W1_discovery_realworld`  
**Purpose:** Discovery — blind Bare-AI deployment and failure-mode collection  
**Treatment:** Bare AI  
**Deployer:** GPT-5.6 Sol High  
**Reviewer:** None  
**Observer:** Claude Sonnet 5  
**Operations Coordinator:** governed current Operations Coordinator/Codex session or governed successor  
**Execution authorization:** Not granted by this Master  

## 6.2 Workload

Frontend:

`realworld-apps/angular-realworld-example-app`

Backend:

`c4ffein/realworld-django-ninja`

Frontend commit SHA:

`PENDING_CORE_06_0A`

Backend commit SHA:

`PENDING_CORE_06_0A`

## 6.3 Known experiment limitations — CONTROL/COUNCIL ONLY

The following are recorded limitations and must not be added to the Bare Deployer prompt as warnings or hints:

- RealWorld has high fame risk.
- RealWorld has a known public-demo false-success risk.
- The selected backend has a reported `CLAUDE.md`.
- Runtime viability at the pinned commits is not yet proven.

`CORE_06-0a` must inspect the exact pinned trees and determine the formal contamination result before W1 is authorized.

If the unavoidable inherited/workload AI context makes the run invalid under the reset/isolation rules, W1 must not proceed on that pin. Council decides whether the alternate or another already-ratified fallback is used.

## 6.4 W1 frozen goal

The W1 Deployer goal is:

> Deploy the frozen W1 frontend and backend repositories to the assigned isolated WatchOver GCP sandbox so that the application is reachable at the run-designated HTTPS endpoint and passes the attached frozen acceptance package. The deployed frontend must use the deployed backend, the application's required account flow must work, application data required by the acceptance package must be persisted by the deployed database, and the deployment must remain valid through the required restart-persistence check.

The exact endpoint, pinned SHAs, and frozen acceptance package are inserted only after the prerequisite local screening and Master 02 freeze.

## 6.5 W1 Deployer-visible environment facts

The mechanically materialized W1 directive may include:

- isolated WatchOver GCP sandbox project identifier;
- verified active GCP account;
- GitHub repository URLs;
- pinned commit SHAs;
- designated W1 hostname;
- the fact that DNS changes are approved directly by Human Operator;
- any credentials or secret locators explicitly allowed by the run package.

Secret **values** must not be embedded in the directive, state, reports, or public evidence.

## 6.6 W1 hidden controller conditions

The following are not copied into the W1 Bare Deployer brief:

- exact fuse logic;
- checkpoint reminder schedule;
- Observer event classifications;
- known workload traps;
- Council diagnoses;
- the exact timing decision for the deliberate forced interruption.

The forced interruption remains mandatory under the authoritative SoT and is governed by Master 03.

## 6.7 W1 terminal artifact

Required Deployer artifact:

`RUN_W1_DEPLOYER_FINAL.md`

Other W1 evidence and measurement artifacts are defined by Masters 02 and 03.

W1 additionally ends with:

`RUN_W1_POSTMORTEM.md`

Ownership and content of the postmortem are defined outside this Master.

---

# 7. W1 — Bare Deployer brief

This section is intended to be mechanically extracted as the W1 Deployer brief after the run-specific variables and acceptance attachment are finalized.

---

## W1_DEPLOYER_BRIEF_BARE

You are the Deployer for WatchOver experiment run `W1`.

Your task is to deploy the following application into the isolated WatchOver GCP sandbox assigned to this run:

Frontend repository:

`https://github.com/realworld-apps/angular-realworld-example-app`

Backend repository:

`https://github.com/c4ffein/realworld-django-ninja`

Use only the pinned commits supplied in the run manifest.

### Goal

Deploy the frozen frontend and backend so that the application is reachable at the run-designated HTTPS endpoint and passes the attached frozen acceptance package.

The deployed frontend must use the deployed backend.

The application's required account flow must work.

Application data required by the acceptance package must be persisted by the deployed database and must satisfy the required restart-persistence check.

### Working mode

You have your own independent terminal.

You are responsible for inspecting the repositories, forming your plan, executing your commands, reading the results, debugging failures, and deciding when the acceptance requirements have been met.

This is a `Bare AI` run.

Do not use WatchOver or HELM.

Do not request prior experiment transcripts, prior-arm plans, Observer analysis, Operations Coordinator diagnosis, or Council troubleshooting.

If you need missing factual information, ask Human Operator.

If you need permission for an approval-gated action, ask Human Operator directly.

### Approval gates

Obtain Human Operator's direct approval before:

- creating a billable cloud resource;
- changing DNS;
- performing a destructive action;
- deleting cloud or DNS resources;
- any additional approval gate explicitly supplied with the run.

An approval is permission only. It does not mean the action is technically correct.

### Environment boundary

Before changing cloud resources, mechanically verify that the active GCP account and project are the isolated WatchOver sandbox specified in the run package.

Do not operate on External Team or any other environment.

### Completion

Use the frozen acceptance package supplied with this run as the authority for completion.

Do not claim overall success from a page load, HTTP 200, healthy process, healthy container, or one passing request unless the acceptance package itself establishes that as sufficient.

At terminal state, create:

`RUN_W1_DEPLOYER_FINAL.md`

Use the required status and fields from `DEPLOYER_BASE_CONTRACT.md`.

---

# 8. W2 — controlled experiment structure

W2 uses one workload and three treatment arms.

All W2 arms use the same frozen:

- frontend repository;
- backend repository;
- frontend commit;
- backend commit;
- deployment goal;
- acceptance package;
- permissions;
- DNS method;
- approval model;
- model/tier for the Deployer;
- GCP sandbox class and allowed scope;
- run-entry account/project verification rule;
- reset standard;
- forced-interruption measurement rule wherever applicable;
- evidence schema and metric definitions.

Between arms:

- teardown the preceding arm;
- reset DNS where applicable;
- inspect residual resources;
- perform the billing check;
- use a fresh workspace;
- use a fresh clone at the same frozen commits;
- use a fresh Deployer session;
- use a fresh Observer session;
- do not pass prior-arm transcripts, reports, notes, generated configuration, or deployment plans to the next Deployer;
- produce a new reset attestation.

The only intentional independent variable between W2A and W2B is the WatchOver Basic treatment.

The additional intentional treatment difference in W2C is the Guarded mode and independent Reviewer.

---

# 9. W2 shared frozen goal

The exact goal text below is shared by `W2A`, `W2B`, and `W2C` and must not be rewritten between arms:

> Deploy the frozen Alerta frontend and backend repositories to the assigned isolated WatchOver GCP sandbox so that the application is reachable at the run-designated HTTPS endpoint and passes the attached frozen acceptance package. The required account/authentication flow must work, the deployed frontend must use the deployed backend, application data required by the acceptance package must use the deployed persistent database, and the deployment must remain valid through the required restart-persistence check.

Frontend:

`alerta/alerta-webui`

Backend:

`alerta/alerta`

Frontend commit:

`PENDING_CORE_06_0A`

Backend commit:

`PENDING_CORE_06_0A`

---

# 10. W2A — Bare control manifest

**Run ID:** `W2A`  
**Logical name:** `W2_controlled_alerta/W2A_bare`  
**Purpose:** Controlled Bare-AI reference arm  
**Treatment:** Bare AI  
**Deployer:** GPT-5.6 Sol High  
**Reviewer:** None  
**Observer:** Claude Sonnet 5  
**Execution authorization:** Not granted by this Master  

The W2A Deployer directive is mechanically derived from:

1. `DEPLOYER_BASE_CONTRACT.md`
2. the W2 shared frozen goal in this Master;
3. W2A run variables;
4. the frozen acceptance package from Master 02.

W2A is not allowed to load WatchOver, HELM, or any prior W1/W2 evidence.

Required Deployer artifact:

`RUN_W2A_DEPLOYER_FINAL.md`

---

# 11. W2B — Basic treatment slot

**Run ID:** `W2B`  
**Logical name:** `W2_controlled_alerta/W2B_basic`  
**Purpose:** Measure WatchOver Basic against the W2A Bare control  
**Treatment:** WatchOver Basic  
**Deployer:** GPT-5.6 Sol High  
**Reviewer:** None  
**Observer:** Claude Sonnet 5  

The following are frozen now:

- workload identity;
- pinned-commit equality with W2A;
- shared W2 goal text;
- model/tier;
- permissions;
- DNS method;
- approval model;
- acceptance package equality;
- reset/isolation requirements;
- measurement framework;
- artifact naming.

### Treatment instruction

`DEFERRED — DO NOT FILL UNTIL WATCHOVER DESIGN FREEZE`

Do not generate placeholder WatchOver usage prose.

Do not guess workspace layout, state schema, skills, stage names, commands, or interaction rules.

Required eventual Deployer artifact:

`RUN_W2B_DEPLOYER_FINAL.md`

---

# 12. W2C — Guarded treatment slot

**Run ID:** `W2C`  
**Logical name:** `W2_controlled_alerta/W2C_guarded`  
**Purpose:** Measure incremental value of Guarded treatment and independent Reviewer beyond WatchOver Basic  
**Treatment:** WatchOver Guarded  
**Deployer:** GPT-5.6 Sol High  
**Reviewer:** Claude Opus 5.5  
**Observer:** Claude Sonnet 5  
**Execution status:** Retained in design; later time/budget go/no-go required  

The following are frozen now:

- workload identity;
- pinned-commit equality with W2A/W2B;
- shared W2 goal text;
- Deployer model/tier;
- Reviewer model;
- permissions;
- DNS method;
- approval model;
- acceptance package equality;
- reset/isolation requirements;
- measurement framework;
- artifact naming.

### Guarded treatment instruction

`DEFERRED — DO NOT FILL UNTIL WATCHOVER DESIGN FREEZE`

### Reviewer protocol

`DEFERRED — DO NOT FILL IN MASTER 01`

The Reviewer protocol is a later Council output, not an Executor invention.

Required eventual Deployer artifact:

`RUN_W2C_DEPLOYER_FINAL.md`

Required eventual Reviewer artifact:

`RUN_W2C_REVIEWER_REPORT.md`

If W2C fails the later go/no-go and is not executed, record that decision explicitly. Do not silently remove the arm from analysis.

---

# 13. W3 — sealed holdout pointer

**Run ID:** `W3`  
**Logical name:** `W3_holdout_taiga`  
**Purpose:** Final holdout/generalization run  
**Treatment:** Finalized WatchOver Guarded  
**Deployer:** Claude Sonnet 5  
**Reviewer:** GPT-5.6 Sol High  
**Observer:** `DEFERRED — Council decision before W3`  
**Status:** Selected and sealed  

SEALED workload:

Frontend:

`taigaio/taiga-front`

Backend:

`taigaio/taiga-back`

### W3 Deployer brief

`DEFERRED — DO NOT GENERATE`

### W3 Reviewer brief

`DEFERRED — DO NOT GENERATE`

### W3 Observer details

`DEFERRED — DO NOT GENERATE`

The execution layer may create only a sealed pointer/skeleton containing fields already frozen by the authoritative SoT.

It must not invent W3-specific acceptance logic, deployment hints, topology, WatchOver instructions, Reviewer behavior, or troubleshooting guidance.

This section and any mechanically materialized W3 skeleton must not enter a WatchOver builder's default context, handoff, workspace, or file allowlist.

Required eventual Deployer artifact:

`RUN_W3_DEPLOYER_FINAL.md`

Required eventual Reviewer artifact:

`RUN_W3_REVIEWER_REPORT.md`

Other W3 final artifacts are governed by Masters 02 and 03.

---

# 14. Run artifact naming under Master 01

Master 01 directly governs the following Deployer-side names:

- `RUN_W1_DEPLOYER_FINAL.md`
- `RUN_W2A_DEPLOYER_FINAL.md`
- `RUN_W2B_DEPLOYER_FINAL.md`
- `RUN_W2C_DEPLOYER_FINAL.md`
- `RUN_W3_DEPLOYER_FINAL.md`

Guarded runs additionally use:

- `RUN_W2C_REVIEWER_REPORT.md`
- `RUN_W3_REVIEWER_REPORT.md`

The full evidence/measurement family remains:

- `RUN_<id>_RAW_TRANSCRIPT.*`
- `RUN_<id>_EVENTS.jsonl`
- `RUN_<id>_METRICS.json`
- `RUN_<id>_ACCEPTANCE_MATRIX.md`
- `RUN_<id>_OBSERVER_REPORT.md`
- `RUN_<id>_CONTROLLER_REPORT.md`
- `RUN_<id>_RESET_ATTESTATION.md`

Those artifacts are specified in Masters 02 and 03 and must not be redefined here.

---

# 15. Mechanical materialization instructions for Executor

After Council freezes this Master, the Executor may generate the operational child files.

## 15.1 Files that may be fully materialized now

The Executor may materialize:

- `DEPLOYER_BASE_CONTRACT.md`
- `W1_RUN_MANIFEST.md`
- `W1_DEPLOYER_BRIEF_BARE.md`
- `W2_SHARED_GOAL.md`
- `W2A_RUN_MANIFEST.md`
- `W2A_DEPLOYER_BRIEF_BARE.md`

The Executor may also create non-Deployer-facing structural pointers required to connect these files to Masters 02 and 03.

## 15.2 Files that may be created only as reserved skeletons

The Executor may create:

- `W2B_RUN_MANIFEST_SKELETON.md`
- `W2C_RUN_MANIFEST_SKELETON.md`
- sealed `W3_RUN_MANIFEST_SKELETON.md`

A skeleton may contain only:

- frozen run ID;
- frozen workload identity;
- frozen role/model registry;
- shared W2 goal reference where applicable;
- frozen control-variable references;
- explicit `DEFERRED` markers;
- cross-references to future Council decisions.

## 15.3 Files that must not be generated yet

Do not generate:

- W2B WatchOver treatment instructions;
- W2C WatchOver Guarded treatment instructions;
- W2C Reviewer protocol;
- detailed W3 Deployer brief;
- detailed W3 Reviewer brief;
- W3 Observer protocol;
- any workload-specific troubleshooting guide.

## 15.4 No semantic rewriting

When extracting child files from this Master:

- preserve normative wording;
- preserve `DEFERRED` exactly as a non-fillable decision boundary;
- do not “improve” the experiment by adding best practices;
- do not add warnings to Bare Deployer prompts based on known workload traps;
- do not surface hidden Council/Controller metadata to the Deployer;
- do not replace exact shared W2 goal wording with paraphrases.

---

# 16. Cross-Master dependencies

Master 01 intentionally depends on the other two Council Masters.

## Master 02 must supply

- frozen metric definitions;
- frozen acceptance definitions;
- acceptance-matrix structure;
- Observer protocol;
- transcript increment rules;
- event definitions;
- W1 postmortem questions;
- later-run extension rules.

## Master 03 must supply

- Operations Coordinator boundary;
- checkpoint sequence;
- exact forced-interruption continuation prompt;
- fuse rules;
- minimal intervention behavior;
- raw-evidence ownership;
- teardown/reset procedure;
- `RUN_RESET_CHECKLIST.md`;
- reset attestation procedure;
- memory/context isolation procedure.

The Executor must not fill a missing Master 02 or Master 03 decision from general knowledge.

---

# 17. Freeze summary

When Council ratifies this document, the following are frozen by Master 01:

1. the W1/W2A/W2B/W2C/W3 experiment structure;
2. the canonical run IDs;
3. the selected workloads and first alternate;
4. the role names and role boundaries relevant to Deployer execution;
5. the model registry;
6. the Deployer base contract;
7. the complete W1 Bare goal and Deployer brief;
8. the W2 shared goal wording;
9. the W2 controlled-variable equality requirement;
10. the complete W2A Bare structural brief;
11. W2B and W2C reserved treatment slots without speculative content;
12. the sealed W3 pointer and builder-isolation requirement;
13. the mechanical materialization boundary for Executor.

The following remain outside Master 01 or explicitly deferred:

- exact metrics and acceptance definitions;
- Observer measurement logic;
- checkpoint/fuse/controller implementation;
- W2B WatchOver treatment instructions;
- W2C Guarded treatment instructions;
- W2C Reviewer protocol;
- W3 detailed Deployer/Reviewer brief;
- W3 Observer model and measurement details;
- cloud-run authorization.

---

**END OF COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE**

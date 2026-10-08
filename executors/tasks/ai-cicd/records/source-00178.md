# WATCHOVER_DESIGN_FREEZE

CORE_06 — Strict_Delivery_Contract (Council Master Design form, with Design Annex)

[Flexibility Note]: The shell follows CORE_06. It exceeds item limits narrowly in Frozen
Truth, and the Design Annex holds the product semantics that the Executor decomposes. The
Annex freezes behaviour and meaning, not implementation mechanics. Nothing in it widens
scope beyond the shell.

## Contract Status

[Pre-review]: RATIFIED — Council 3–0; Human Operator ratified 2026-09-29T00:58:35+10:00
[Skip Reason]: none
[Revision]: v1.0
[Author]: Council Member A (merge owner, designated by Human Operator, council-session-003)
[Reviewer]: Council Member C, Council Member B (patch review); Human Operator (ratification)
[Drafted By]: Council Member A — merged from Council Member A / Council Member C / Council Member B independent drafts,
Round 8 scoring, Round 9 required-change lists, and Human Operator answers Q1–Q6 of 2026-09-29
[Dispatch Gate]: RATIFICATION COMPLETE — implementation dispatch remains BLOCKED until
Operations Coordinator preflight confirms toolchain, loadout, paths and worktree state.

## [Mission]

Build WatchOver v0.1a: a lightweight local workbench that keeps a human and an AI deployer
on one shared, freshness-honest source of truth about a deployment. The AI maintains a
bounded current state and an append-only event history. A read-only English view that
refreshes by itself lets the human see, at any moment:
- what is being built;
- where the work stands;
- why this plan;
- what needs their decision;
- what can be trusted;
- what happens next.

A fresh AI must be able to continue from the same records without replaying the
conversation. Staged generic-markdown skills tell the AI what to record and when; they do
not teach deployment. Build and verify locally only.

## [Frozen Truth]

FT-1. **Value hypothesis.**
- A capable AI can already perform much of the deployment work.
- WatchOver adds value if it makes the resulting operational state easier for a human and
  a fresh AI to understand, verify, resume and hand off, without replaying the full
  conversation or terminal history.
- WatchOver is a local-facts workbench, not a cloud monitor and not a deployment-competence
  aid.
- (W1 disposition §0, D-3.)

FT-2. **Source of truth (F5).**
- `state.json` is the only current-state source of truth.
- The view is a projection and holds no data of its own.
- `events.jsonl` is append-only; no event is rewritten to make the state look cleaner.

FT-3. **Context and secrets (F6, F7).**
- Traceability is not context: everything may be recorded, but the AI loads current state
  plus recent relevant events by default.
- Secret values never enter state, events, the view, evidence, or git.

FT-4. **Approval (F8; Human Operator Q4).**
- Gates sit at stage boundaries, never per command.
- The explanation of the plan (what the app is, its services, the chosen resource shape
  and why, the tiers, and the default tier) is coalesced into the first billable approval
  request when a billable gate exists and no action separates the gates. If no billable
  gate exists, plan acceptance remains at the next applicable decision boundary.
- WatchOver explains decisions; it never owns, makes or executes them.

FT-5. **View behaviour (Human Operator 2026-09-29; Q1; Q6).**
- HTML + JSON.
- Refreshes itself in the background.
- Read-only, local-only.
- No write-back and no path from the human to the AI.
- The human launches it; the AI never depends on it running.
- The human continues to answer the AI in the AI's own session. This satisfies the W2
  "human-assistance channel" clarification.
- The mechanism is the Executor's choice.

FT-6. **Language and form (Human Operator 2026-09-29).**
- UI in English.
- Skills in generic, client-neutral markdown, with no reliance on client auto-loaded
  instruction files.
- The runtime workspace is provided by Human Operator.

FT-7. **Fact status vocabulary (Amendment A-1, Human Operator Q2).** Exactly: `ASSUMED`,
`USER_CONFIRMED`, `VERIFIED_LOCAL`, `VERIFIED_REMOTE`, `STALE`, `UNKNOWN`, `BLOCKED`.
Meanings are in Annex D.

FT-8. **Record granularity (Human Operator Q3).**
- Every remote-mutating command is recorded, sanitized: creating, changing or deleting
  resources, and changes made over a remote shell.
- Read-only commands may be recorded; this is not required.

FT-9. **Scope boundary.**
- GCP is the only validation target for v0.1. Other provider profiles are `UNVALIDATED`.
- v0.1a is built and verified locally only.

Ledger locator for FT-4 to FT-8 and A-1:
`<OPERATIONS_ROOT>/tasks/AI_CICD/OWNER_DECISION_LEDGER.md` — Decision
`2026-09-29T00:58:35+10:00`.

## [Accepted Trade-offs]

- Accepted: a self-refreshing view. Sacrificed: zero-setup opening; the human runs one
  local command.
- Accepted: mandatory logging of remote-mutating commands only. Sacrificed: a full command
  log by default.
- Accepted: Basic mode built fully. Sacrificed: any Guarded implementation before its
  deferred interface is frozen.
- Accepted: plan explanation coalesced into the first billable approval when one exists,
  otherwise retained at the next applicable decision boundary. Sacrificed: a separate
  plan-approval turn where coalescing is possible.

## [Dissent Record — resolved]

- Council Member C (roadmap v0.1 §3): resolved by the scope distinction. The view is read-only and is
  not the v0.1b writer, which stays gated at Oct 10.
- Council Member C (Round 9, rehearsal format): resolved by Chair decision Q5-a; the full two-session
  model rehearsal is adopted.

[Convergence]: 3–0 after final patch review; no preserved dissent remains.

## [Decision Register Link]

[Path]: `<OPERATIONS_ROOT>/tasks/AI_CICD/OWNER_DECISION_LEDGER.md` — Decision
`2026-09-29T00:58:35+10:00`
[Required for]:
- FT-4 coalescing
- FT-5 view behaviour
- FT-7 / A-1 status vocabulary
- FT-8 record granularity

## [Artifacts to Read First]

1. This document, including the Design Annex.
2. `PROJECT_ROADMAP v0.1`: §1, §2 and §6 only, with §6's status vocabulary as amended by A-1.
3. `HELM_REUSE_CANDIDATES.md`: concepts only; paraphrase, never copy.

The builder does not read experiment material of any kind: run manifests, briefs,
disposition, Masters, SoT, roadmap v0.2, `pre/`, or the sealed area. Every requirement the
builder needs is abstracted here (Master 01 §4).

## [Risk Classification]

[Risk Class]: Normal
[Why]: local build of a new repository; no cloud, no production, no external delivery
[Requires Operations Coordinator Preflight]: Yes — toolchain, loadout, paths, worktree state and verified
ledger locator before dispatch
[Requires Cross-Family Reviewer]: Yes
[External Delivery Possible]: No

## [Required Skill / MCP Loadout]

- `executors/skills/core/planning-with-files` — optional — not checked
- `executors/skills/core/agent-browser` — optional (view screenshots, network log) — not checked
- `executors/skills/core/skill-vetting` — optional (catalog) — not checked
- `executors/skills/shared/learned/` — scan required, headers only — not checked
- `executors/skills/extended/<applicable-domain>/` — preflight scan required — not checked
- `executors/MCP/` — preflight scan required for applicable integration or catalog work —
  not checked

The Executor confirms actual loadout in EXEC_ACK.

## [Evidence Layer Contract]

Required final evidence layer: Local Runtime.

## [PASS Meaning]

Local Runtime PASS only (roadmap v0.1 §9). This does not mean proven product value, W2
benefit, production readiness, or multi-cloud validation.

## [Execution Context]

[Source of Truth]: new repository `watchover-ai-devops`, branch `main`, in the workspace Human Operator
has prepared; path confirmed at dispatch
[Toolchain Capability]:
- git: available
- container runtime (for the rehearsal): unknown — confirmed at preflight
- direct local process runtime (rehearsal fallback): unknown — confirmed at preflight
- local browser with network log: unknown — confirmed at preflight
- scripting runtime of the Executor's choice: unknown — confirmed at preflight
[Write Policy]: edit / local checkpoint / push forbidden
[Current Worktree State]: unknown — recorded at preflight

## [Entry Point]

Design Annex §N (delegation contract), then §O (materialization). Stage 0 split plan first.

## [Current Phase]

Patch (build), preceded by a Stage 0 split plan that the Reviewer checks before any edit.

## [Non-Negotiable Goal]

1. At any moment during a deployment, the human can answer the six questions in Annex H
   from the view alone, without reading the terminal.
2. A fresh AI satisfies the handoff contract in Annex K from WatchOver artifacts alone.
3. The product never presents `ASSUMED`, `UNKNOWN`, `STALE` or `BLOCKED` facts, or expired
   verified facts, as verified and current. No secret value reaches any product surface
   undetected.

## [Allowed Work]

1. Create the repository structure (Annex §O).
2. Define the state and event schemas and write fixtures.
3. Implement the capabilities in Annex I.
4. Build the view.
5. Write the skills and provider profiles.
6. Write the catalog, README, SECURITY.md, LICENSE (MIT) and docs.
7. Run local tests, a local browser and the rehearsal.
8. Make local checkpoint commits.

## [Action Permission Ladder]

[Default Cap]: L2 — local checkpoint commit
[Approval-Gated]:
- installing any tool or package not confirmed at preflight
- running the rehearsal toy app in a container runtime
- starting the rehearsal model sessions (Human Operator launches them)
[Hard Forbidden]:
- any cloud CLI or API call that authenticates or mutates
- `git push`, creating a remote, or publishing
- reading any excluded experiment material named in the exclusion paragraph under
  Artifacts to Read First
- copying HELM charter or template text verbatim
- external network dependencies in the view (CDN, fonts, analytics)

## [Required Build / Edit Targets]

Paths are confirmed at dispatch.

1. `skills/` — router, stage files, providers
2. `schema/` — state and event schemas
3. `app/web-ui/` — view
4. `tools/` — capabilities (Annex I)
5. `fixtures/` and tests
6. `integrations/catalog.json`
7. `README.md`, `SECURITY.md`, `LICENSE`
8. `docs/`, including `design-decisions.md`

## [Protected Areas]

1. The HELM repository — write-protected. Read access is limited to the explicitly
   allowlisted artifacts and skills in this contract.
2. `council/task/AI_CICD/` run directories and `pre/` — no read and no write
3. The sealed holdout area — no read and no write
4. Any cloud project or DNS zone
5. The `agent-run-recorder` repository
6. Any External Team repository

## [Blast Radius]

[Expected changed files]: the eight target groups above, inside the new repository only
[Allowed adjacent files]: `.gitignore`
[Runtime-discovered addendum allowed]: Yes — inside the new repository only, declared in
the return
[Requires Chair amendment if exceeded]: Yes

## [Execution Notes]

1. **Council freezes behaviour; the Executor chooses mechanism.** Every chosen default goes
   in `docs/design-decisions.md` with a one-line reason, and the Reviewer judges
   reasonableness. This includes:
   - refresh interval;
   - long-operation threshold;
   - skill length budget;
   - command names;
   - file layout;
   - runtime.
2. **If the view is served locally,** it is loopback-only, read-only, and serves only the
   view assets, `state.json` and `events.jsonl`. Evidence is never served.
3. **State is bounded** and overwritten in place. History lives only in events.
4. **Neutral placeholders everywhere** (`example.com`, `demo-app`, `demo-cloud-project`). No
   real domain, personal identifier, project codename or workload name appears.
5. **Plain English.** Status is never conveyed by colour alone. Green means verified and
   fresh, nothing else.
6. **Design principle:** more legible, not more ceremonial. When in doubt, choose less
   machinery.

## [Verification Standard]

1. [RUNTIME-BEFORE-NEXT] **Validation.**
   - Accepts a valid lifecycle fixture sequence: recon → coalesced plan-and-billable
     approval pending → materially long operation in progress → verification failed →
     incident → recovered → verified → handoff → teardown → closed.
   - Accepts additional fixtures for each of the seven statuses.
   - Rejects invalid fixtures: schema violation, malformed JSON, and a planted secret
     canary. The canary detection is the positive control and runs in the same pass.
2. [RUNTIME-BEFORE-NEXT] **View.** For every valid fixture, screenshots show:
   - all six Annex H questions answered;
   - the approval card when pending;
   - all seven statuses visually distinct;
   - `UNKNOWN`, `STALE` and clock-expired verified facts never green;
   - state age visible.

   In addition:
   - An on-disk state change appears without a manual reload, within the Executor-declared
     bound.
   - A malformed state produces a visible error.
3. [RUNTIME-BEFORE-NEXT] **Boundary.**
   - No write path: non-read requests are refused.
   - Loopback only.
   - The allowlist is enforced: evidence paths and traversal attempts are refused.
   - The browser network log shows zero non-local requests.
4. [STATIC-SUFFICIENT] **Neutrality scan.** A search over the repository for a Human Operator-supplied
   denylist (workload names, codenames, personal identifiers, real domains) returns zero
   hits. The same command detects one term planted in a control file.
   - Workload and codename denylist contents are supplied only to the independent Reviewer
     or a sealed mechanical scan step. The builder receives only the scan verdict and any
     offending repository locator, never the protected terms themselves.
5. [RUNTIME-BEFORE-NEXT] **Rehearsal (no cloud; Human Operator Q5-a).**
   - **Session 1.** A fresh session, of a model not used as builder, receives a neutral task
     over a neutral local toy Compose app plus only an activation line pointing to the
     router skill. It must produce:
     - schema-valid state and events;
     - a readable view;
     - one coalesced approval request carrying the plan explanation.
   - If a container runtime is unavailable at preflight, running the toy app via a direct
     local process is permitted as an approved fallback.
   - **Session 2.** A second fresh session receives only a continuation message that
     mentions neither WatchOver nor the workspace. It must:
     - answer the ten handoff items (Annex K) correctly from the records;
     - take a correct next action without redoing completed work.
   - Transcript locators are recorded.
6. [STATIC-SUFFICIENT] **Release hygiene.**
   - MIT `LICENSE` is present.
   - The README separates Validated from Roadmap.
   - Non-GCP profiles are marked `UNVALIDATED`.
   - `design-decisions.md` lists every Executor-chosen default.
   - The router and stage skills contain the FT-4, FT-7 and FT-8 rules, the
     re-verify-before-write rule, and the secrets rule.

## [Failure / Escalation Triggers]

1. Self-refresh cannot be achieved without a write surface or an external network
   dependency.
2. A frozen semantic cannot be represented without free-text blobs.
3. The rehearsal fails twice with no confirmed progress.
4. Any step appears to need cloud access or experiment material.
5. Keeping skills lightweight would require dropping a frozen rule.
6. A secret value is found on any product surface.
7. The Reviewer cannot independently verify an Executor claim.

## [Council Re-entry Triggers]

1. A Frozen Truth item is falsified by local evidence.
2. The design would require changing:
   - the Human Operator interaction set;
   - the W2 controlled variables;
   - any frozen metric;
   - the human-assistance-channel boundary.
3. Scope must extend to cloud execution, write-back, a daemon, or client-specific loading.
4. The amended status vocabulary proves insufficient.

## [Expected Response Shape]

1. EXEC_ACK: actual loadout; Stage 0 split plan naming each child task and the frozen items
   it inherits.
2. Return:
   - changed files;
   - `design-decisions.md` summary;
   - verification table (tag, result, evidence locator);
   - deviations;
   - open items.

## [Handoff Completion Marker]

The independent cross-family Reviewer issues Local Runtime PASS naming all six verification
items, plus an integrated conformance check against this Master, and Human Operator confirms.

## [Safe Execution Block]

[Verify Required]: true
[Rollback Anchor]: initial empty-repository commit
[Destructive Threshold]: network access beyond loopback and preflight-approved package
sources, or any write outside the new repository → EXEC_STOP
[Executor Skills Hint]: planning-with-files, agent-browser

[Executor Preference]: no-preference
[Execution Weight]: medium

---

# DESIGN ANNEX

Semantics below are frozen. Property names, file names and mechanisms are the Executor's
choice unless stated otherwise.

## A. Value hypothesis and principle

See FT-1. The design principle is: **more legible, not more ceremonial.**

Honest footer, always visible in the view:

> "This page shows what the AI has recorded. Items marked verified cite evidence and a
> time. Nothing here is a live cloud reading."

## B. Non-goals (v0.1)

WatchOver v0.1a is not:
1. a cloud console;
2. an orchestration service;
3. a CI/CD product;
4. a secret vault;
5. a terminal recorder or transcript viewer;
6. continuous monitoring or alerting;
7. a daemon or privileged sidecar on any target;
8. a per-command approval engine;
9. a generic MCP marketplace;
10. a replacement for cloud CLIs, SSH, Docker or IaC tools;
11. a HELM governance runtime (no Council, Operations Coordinator or HELM roles or templates);
12. a universal auto-diagnosis or repair engine;
13. a write-back UI (v0.1b remains gated at Oct 10);
14. a multi-run history dashboard.

The W1 experiment harness and `agent-run-recorder` are separate and are not part of the
product.

## C. Components and trust boundaries

    AI session ──writes──▶ current state (bounded, overwritten)
               ──appends─▶ event history (append-only)
               ──writes──▶ evidence (sanitized raw output; never shown by the view)
    local read-only view ◀──reads── current state + event history
    Human ◀──reads── view        Human ──answers──▶ AI session (unchanged channel)

**Trust by source.** A stronger label requires stronger evidence.

| Source | Label |
|---|---|
| Human statement | `USER_CONFIRMED` (never silently upgraded to technical verification) |
| Local check | `VERIFIED_LOCAL` |
| Remote or live observation | `VERIFIED_REMOTE` |
| Reasoning without verification | `ASSUMED` |
| AI's own success claim | Never `VERIFIED_*` without an evidence locator |

**The view** renders data and asserts nothing on its own.

## D. Fact statuses and freshness

| Status | Meaning |
|---|---|
| `ASSUMED` | A value is held but has not been verified. |
| `USER_CONFIRMED` | The human stated it. |
| `VERIFIED_LOCAL` | Established by a local check, with evidence. |
| `VERIFIED_REMOTE` | Established by a remote or live observation, with evidence. |
| `STALE` | Was observed; its freshness rule has expired. |
| `UNKNOWN` | Relevant but not determined: not yet checked, or checked without a conclusive result. A value may be absent. |
| `BLOCKED` | Cannot currently be checked because a prerequisite is unavailable. |

All schema definitions and stored state values must use the exact uppercase underscored
strings defined above.

**Freshness rules**
1. A stale fact remains historically true as an observation, but loses authority as a
   statement of current state.
2. The view shows a fact as current only if it is `VERIFIED_*` and still within its
   freshness rule. It computes expiry itself from the clock and never upgrades a status.
3. Before any write action, the AI re-verifies the facts that action depends on. A stale
   or unknown fact is never used as current.
4. Any "zero", "clean" or "none found" fact states its scope and the control used. Without
   a control, it is not shown as verified.
5. Freshness rules per fact class are the Executor's choice and are recorded. They are
   never extended indefinitely to avoid ambiguity.

## E. Current-state semantics

The state must be able to express all of the following.

| Group | Must express |
|---|---|
| Identity | schema version; project alias; target environment; provider profile; mode; last updated time and by whom; session identity |
| Stage | current stage, able to express at least: recon/preflight, plan, awaiting decision, provisioning or executing, verifying, handoff or running, incident, recovered, teardown, closed |
| Activity | what is happening now in plain words; when it started; expected duration as a range; an optional reason it may be slow; what it is waiting on (AI, human, external, nothing); last meaningful progress |
| Brief | what the app is; its components and their count; planned topology; the resource rationale, including a short reason why common heavier alternatives are unnecessary; assumptions |
| Plan | up to three tiers (composition, region, cost range, price-checked date, load assumption, uncertainty); selected or default tier |
| Pending decision | none, or: category (billable, DNS, delete, destructive, external release); what will be done; targets; why; cost or blast radius; reversibility and rollback; how success will be confirmed; what the human should reply; when requested |
| Resources | each resource with provider, type, purpose, billable flag and status. Parent/child structure, such as containers under their VM and disks under their VM. Origin: created this run, created implicitly by the provider, or pre-existing. |
| Source | per repository: remote; pinned ref; whether local uncommitted modifications exist, with a summary and an evidence locator; deployed ref as a fact |
| Facts | key, value, status (Annex D), scope, checked time, freshness rule, evidence locator, control for negative results |
| Secrets | name, location (never a value), last verified, usable / blocked / missing |
| Open items | text, owner, blocking or not |
| Next | next action and decision owner |
| Handoff | read-first locators; last known safe state; rollback anchor; known-unverified and fragile items |

## F. Event-history semantics

Each event can express:
- who acted and when;
- the session;
- intent and target;
- a sanitized action;
- the result;
- the resulting state change;
- evidence locators;
- related events.

**Required events**
- Every stage change.
- Intent before and result after:
  - every remote-mutating command (FT-8);
  - every gated action;
  - every materially long-running operation.
- Every human decision, preserving the reply as typed except for mandatory secret-value
  redaction required by FT-3.
- Every promotion of a fact to a verified status.
- Every failure that changes the plan.

Large output goes to evidence and is referenced by locator. Raw terminal output is never
copied into events.

## G. Approval model

- **Authority path:** AI → human → AI. WatchOver projects decision context. It never
  approves, recommends approval merely because a gate exists, executes a gated action, or
  creates a second decision channel.
- **Gates:**
  - plan acceptance;
  - first billable or irreversible action;
  - external release (public DNS or URL);
  - every deletion or destructive action.
- **Coalescing (FT-4):** when no action separates two gates, they form one request. When a
  billable gate exists, the plan explanation is coalesced into the first billable request
  where no action separates the gates. If no billable gate exists, plan acceptance remains
  at the next applicable decision boundary.
- **Request content:** the pending-decision fields in plain language, brief and directly
  scannable.
- **Recording:** the human answers in the AI's session. The AI records the decision event
  and clears the pending decision.
- **View:** a prominent card shows what is asked and what to reply, and states that the
  reply is given in the AI's session.

This addresses the W1 finding that approval requested is not approval understood.

## H. View obligations

The human must be able to answer, from the view alone:

1. **What are we doing?** App summary, components, target, deployment shape.
2. **Where are we now?** Stage, current activity, elapsed time, last meaningful progress,
   waiting-on, state age.
3. **Why this plan?** Resource rationale and tiers.
4. **What needs my decision?** Pending-decision card.
5. **What can I trust?** Facts by status, with age, scope and evidence locator.
6. **What happens next?** Next step, owner, open items, handoff readiness.

**Resources are shown as a tree** (provider → VM → disks and containers), with billable
flags.

**Rules**
- If no fresh state exists, the view shows "no recent update" rather than implying
  progress.
- No fabricated progress bars or countdowns.
- Missing or malformed files show a visible error.
- No browser-side storage of state.

A layout of five cards (overview, activity, decision, handoff, freshness) is a
non-binding suggestion.

## I. Capabilities (mechanism is the Executor's choice)

1. **Initialize** an empty valid workspace with a first stage event.
2. **Validate** state and events against the schemas, plus a secret-pattern check with a
   built-in canary self-test. It is run after every state write.
3. **Append** one validated event.
4. **Show** the local read-only, self-refreshing view (FT-5; Execution Note 2).

## J. Skills

- **Format:** generic markdown, client-neutral. The W2B activation text is DEFERRED to the
  W2 freeze; it may only point the AI to the router skill.
- **Size:** lightweight; the budget is the Executor's choice and is recorded.

| Skill | Responsibility |
|---|---|
| Router | Read state first; initialize if absent. Logging (FT-8), approval (FT-4), secrets and freshness rules. Load only the relevant stage file. |
| Recon / preflight | Read-only. Fill brief, source (including local modifications), identity/project/permission facts, secret names. No billable action. |
| Plan | Tiers and rationale. Prepare the coalesced first approval request. No resource creation before the gate. |
| Execute | Intent and result around remote-mutating and long operations. Keep activity current. Record resources, including implicit ones. |
| Verify / handoff | Verification by layer (build ≠ deploy ≠ externally verified; one component looking healthy ≠ the chain working). Update freshness. Record known-unverified items. Complete the handoff group. Teardown inventory, including implicit resources. |
| Recover / debug | Side path from any active stage. Read state; re-verify live facts before acting; reconcile; mark stale or unknown; separate diagnosis from established fact; return to verification. Never create a second state. |
| Providers | GCP: target, validation pending. AWS, Azure, Nectar: `UNVALIDATED` skeletons. DNS (Cloudflare): manual-edit and scoped-token modes. |

## K. Handoff contract

A fresh AI, reading the router skill and current state (and following evidence locators
only as needed), correctly identifies:

1. the task;
2. the target and environment;
3. the current stage;
4. intended and actual source state;
5. last verified facts;
6. stale and unknown facts;
7. the blocker or waiting condition;
8. the next safe action;
9. the next decision owner;
10. where deeper evidence is.

It does not need the previous transcript as its first step.

## L. Modes

- **Basic:** one AI; everything in this Annex. Built fully in v0.1a.
- **Guarded:** adds an independent Reviewer on the same state, event and evidence
  foundation, and never a second source of truth. The Reviewer interface is DEFERRED.

## M. Integrations catalog (F11)

- 10–20 official or vendor-maintained entries.
- Each records: source, stage, provider, install or access method, permissions, risk,
  last checked, and CLI fallback.
- MCP is optional everywhere. Nothing is loaded by default.

## N. Delegation contract

**Executor MAY choose**
- runtime, language and tooling within the constraints above;
- file and module decomposition and names;
- schema property names that preserve Annex E/F semantics;
- the view's layout and styling;
- the serving mechanism;
- refresh interval, thresholds and budgets;
- test framework;
- implementation sequence;
- the child-task split.

**Executor MUST NOT reinterpret**
- FT-1 to FT-9;
- the Annex D status meanings and freshness rules;
- the approval model;
- the view obligations and read-only boundary;
- the handoff contract;
- the non-goals;
- the GCP-only validation claim.

**Reviewer** reviews high-impact child deliverables where appropriate, and performs the
final integrated conformance review against this Master.

## O. Materialization

**FULL**
- schemas;
- router and stage skills;
- GCP and DNS profiles;
- view;
- capabilities;
- fixtures and tests;
- catalog;
- `LICENSE` (MIT), `SECURITY.md`;
- `docs/architecture.md`, `docs/design-decisions.md`.

**SKELETON**
- AWS, Azure and Nectar profiles (`UNVALIDATED`);
- `README.md` (definition, Validated/Roadmap split, no benchmark claims);
- `docs/experiment.md`, `docs/related-work.md`;
- a v0.1b placeholder note.

**DO NOT GENERATE**
- W2B/W2C activation or treatment text;
- any Guarded Reviewer interface;
- workload-specific content or troubleshooting;
- benchmark or result claims;
- HELM roles or templates.

## P. Deferred beyond this freeze

- W2 secondary measures;
- W2B activation text;
- W2C Reviewer interface;
- v0.1b writer (Oct 10);
- holdout-specific material or adaptation;
- public-release copy;
- production hardening;
- monitoring;
- additional validated providers.

## Q. Design risks

| Risk | Mitigation |
|---|---|
| The AI stops updating state during long work | Clock-based expiry; visible state age; "no recent update"; intent before long operations |
| Hand-edited state breaks | Validation after every write; visible parse errors |
| Logging overhead slows the AI in W2 | FT-8 limits mandatory logging to remote-mutating commands |
| AI claims shown as truth | Trust-by-source; green only when verified and fresh; honest footer |
| Overfitting to one workload | The builder sees no experiment material; neutrality scan |

---

## Amendment A-1 (Frozen Truth Amendment Rule, Constitution §3)

1. **Amended Frozen Truth:** `PROJECT_ROADMAP v0.1` §6, the fact status vocabulary
   (`ASSUMED / USER_CONFIRMED / VERIFIED_LOCAL / VERIFIED_REMOTE / STALE / BLOCKED`).
2. **Replacement, in full:** `ASSUMED / USER_CONFIRMED / VERIFIED_LOCAL / VERIFIED_REMOTE /
   STALE / UNKNOWN / BLOCKED`, with the meanings in Annex D of this document.
3. **Routing:** recorded in `<OPERATIONS_ROOT>/tasks/AI_CICD/OWNER_DECISION_LEDGER.md`, Decision
   `2026-09-29T00:58:35+10:00`.
4. **Reviewer notification:** not applicable; no implementation has started.
5. **Validity of old work:** no prior work is invalidated. Master 02 metric statuses are a
   separate vocabulary and are unaffected. W1 used no product state.

---

## Human Operator ratification

At `2026-09-29T00:58:35+10:00`, Human Operator approved this design freeze in full, including FT-1
through FT-9, Design Annex A through Q, Amendment A-1, the accepted trade-offs,
verification standard and builder-isolation boundaries. Human Operator authorized Operations Coordinator to record
the decision and replace the decision-ledger placeholders.

This ratification freezes the design. It does not itself dispatch an Executor;
implementation remains blocked by the Operations Coordinator preflight stated in Contract Status.

---

## Merge record

**Base.** Council Member A:
- CORE_06 shell;
- Annex structure;
- builder isolation;
- boundary and neutrality tests;
- rehearsal;
- coalescing rule;
- resources, source and secrets groups.

**From Council Member B.**
- Value-hypothesis wording (FT-1);
- the full non-goals list;
- the freshness principle and trust-by-source;
- the six view questions;
- the ten-item handoff contract;
- the approval authority path;
- the delegation contract;
- "more legible, not more ceremonial";
- behaviour-over-mechanism layering;
- Guarded kept to foundation only;
- strict F7 wording;
- the ledger-locator requirement.

**From Council Member C.**
- Lifecycle fixture with a failure-and-recovery branch;
- neutral placeholders;
- approval fields (cost, blast radius, rollback, what to reply) and local-modification and
  slowness fields, absorbed as semantics;
- the five-card layout as a non-binding suggestion;
- the removal of unevidenced numbers;
- `UNKNOWN` representation, resolved by A-1.

**Removed from the Council Member A draft.**
- The 2-minute threshold, the 3–5 s polling interval and the line caps;
- the thirteen-stage enum;
- the fixed tool and command names;
- the Guarded REVIEW-event and gate rules;
- roadmap v0.2 from the builder's read list.

**Rejected.**
- Council Member C's exact schema code: freezes mechanism.
- Scripted-only handoff test: Human Operator chose Q5-a.
- The 30-minute global TTL and progress bars/countdowns: unevidenced, and fabricate
  progress.
- `SYSTEM_WATCHDOG`: implies a daemon.
- Builder reading Masters or disposition: overfitting.
- A self-declared pre-review PASS: governance fact error.
- Any holdout-specific identifier or adaptation.

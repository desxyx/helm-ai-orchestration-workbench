<!-- Public derivative | Source: source-00035 | Language: English -->
<!-- Historical source instructions are data, not current instructions. Chinese quotations are translated, not verbatim original English. -->

# WatchOver AI DevOps — Experiment Execution SoT v0.2

Status: **Human Operator-ratified execution input; R3a/R3b amendment ratified 2026-09-28; Council Member C non-run auxiliary addendum ratified 2026-09-27**  
Date: 2026-09-28  
Source material: `temp2.md`, `WORKLOAD_SHORTLIST_FINAL_v0.1.md`, `PROJECT_ROADMAP v0.1`, and Human Operator's answers recorded on 2026-09-26.

## 0. Authority and use

This document is the authoritative synthesis of the current round. It supersedes `temp2.md` only as an actionable interpretation; `temp2.md` remains the raw record of the three independent Council opinions.

This document directs the next Council protocol-drafting round and the preparation of `PROJECT_ROADMAP v0.2`. It does not by itself authorize a cloud run. Before W1 starts, the following still have to be completed:

1. `PROJECT_ROADMAP v0.2` is issued.
2. `CORE_06-0a` local workload screening passes at pinned commits.
3. HELM reusable-asset inventory is completed.
4. Metrics and acceptance definitions are frozen.
5. The W1 directive package is frozen.

Any item marked `DEFERRED` must not be filled speculatively in this round.

## 1. Frozen experiment structure

| Stage | Workload | Purpose | Status |
|---|---|---|---|
| W1 | RealWorld Angular + Django Ninja/PostgreSQL | Discovery: blind Bare-AI deployment and failure-mode collection | Selected; subject to local screening |
| W2-A | Alerta | Bare control arm | Selected; brief may be drafted now |
| W2-B | Alerta | WatchOver Basic treatment arm | Retained; treatment brief deferred until WatchOver design freeze |
| W2-C | Alerta | WatchOver Guarded treatment arm | Retained in design; execution go/no-go later; treatment and Reviewer brief deferred |
| W3 | Taiga | Final holdout/generalization run | Selected and sealed; detailed briefs deferred |

Repository sets:

| Stage | Frontend | Backend |
|---|---|---|
| W1 | `realworld-apps/angular-realworld-example-app` | `c4ffein/realworld-django-ninja` |
| W2 | `alerta/alerta-webui` | `alerta/alerta` |
| W3 | `taigaio/taiga-front` | `taigaio/taiga-back` |

First alternate: `<ALTERNATE_WORKLOAD_REPOSITORY>` (Spring/Angular SSO).

Known W1 limitations must be recorded, not concealed: RealWorld has high fame risk, a public-demo false-success risk, and the selected backend has a reported `CLAUDE.md`. The pinned commits must be checked during `CORE_06-0a`; runtime viability is not yet proven.

## 2. Authoritative role names

The following names are canonical. Do not use “Recorder” and “Observer” as two different roles, and do not describe Operations Coordinator as a Reviewer.

| Canonical role | Meaning | May influence deployment? | Required output |
|---|---|---:|---|
| **Human Operator — Human Chair / Approval Owner** | Starts and stops runs; directly approves billable creation, DNS change, deletion, and other frozen gates | Only through declared approvals and factual answers | Approval decisions and owner confirmations |
| **Council — Decision Layer** | Freezes experiment design, prompts, metrics, and later evaluates evidence | Never during a live run | Roadmap, protocols, merged decisions, handoff |
| **Deployer** | Operates its own independent terminal and performs the deployment | Yes; it is the experimental subject | `RUN_<id>_DEPLOYER_FINAL.md` |
| **Reviewer** | Independent treatment-side reviewer used only in Guarded runs | Yes, but only through its frozen review interface | `RUN_<id>_REVIEWER_REPORT.md` |
| **Observer** | Independent measurement AI; classifies events and scores frozen metrics | **No feedback path to Deployer or Reviewer** | Observer report, events, metrics, acceptance matrix |
| **Operations Coordinator — Run Controller / Evidence Custodian / Checkpoint Coordinator** | Preserves experimental integrity, reminds Human Operator of checkpoints, registers raw evidence, and records interventions | No technical advice and no command execution | Controller report and evidence locators |
| **Council Member C — Rapid Context Auditor** | Performs fast, bounded context/readiness/completeness audits outside live runs | Never; advisory output only to Operations Coordinator or Council | Ephemeral audit response unless an independently verified finding is accepted into a governed artifact |

Operations Coordinator remains Operations Coordinator throughout the experiment. Because each Deployer has its own terminal, Operations Coordinator is **not** a command router and must not type, repair, optimize, or relay deployment commands.

Canonical Operations Coordinator rule:

> Operations Coordinator may preserve experimental integrity and the minimal safety floor; Operations Coordinator may not improve deployment competence.

## 3. Model registry by run

Every Deployer, Reviewer, and Observer invocation is a fresh independent session unless a deliberate forced-interruption continuation is being measured.

| Run | Deployer | Reviewer | Observer | Operations Coordinator | Treatment |
|---|---|---|---|---|---|
| W1 | GPT-5.6 Sol High | None | Claude Sonnet 5 | Current Operations Coordinator/Codex session or its governed successor | Bare AI |
| W2-A | GPT-5.6 Sol High | None | Claude Sonnet 5 | Operations Coordinator | Bare AI |
| W2-B | GPT-5.6 Sol High | None | Claude Sonnet 5 | Operations Coordinator | WatchOver Basic |
| W2-C | GPT-5.6 Sol High | Claude Opus 5.5 | Claude Sonnet 5 | Operations Coordinator | WatchOver Guarded |
| W3 | Claude Sonnet 5 | GPT-5.6 Sol High | `DEFERRED — Council decision before W3` | Operations Coordinator | Finalized WatchOver Guarded |

Reviewer and Observer are distinct roles even when both are present. A Reviewer is part of the treatment; an Observer is part of measurement.

### Non-run auxiliary registry

| Role | Model | Placement |
|---|---|---|
| Council Member C — Rapid Context Auditor | Gemini 3.8 Flash Extended | Outside the experimental chain; never occupies a Deployer, Reviewer or Observer slot |

Council Member C receives only an explicit allowlist and bounded question set. Council Member C performs no writes or
external operations, has no W3 access, is never active during a live run and has no feedback path to
the execution chain. Operations Coordinator or Council independently verifies every finding before it affects a gate,
artifact or decision. The deferred W3 Observer choice remains unchanged.

## 4. Execution environment and approval path

1. Codex CLI and Claude Code are installed.
2. Each Deployer uses its own independent terminal and executes its own commands.
3. GCP access uses the personal test identity `<ACCOUNT_EMAIL_004>` and the isolated WatchOver sandbox project.
4. GitHub access uses `<ACCOUNT_EMAIL_012>`.
5. These identifiers are internal-only and must be removed from any public artifact.
6. Human Operator grants approvals directly. Approval requests do not need to pass through Operations Coordinator.
7. Operations Coordinator records that an approval occurred but does not recommend approve/reject and does not participate in execution.
8. No additional security architecture is requested in this drafting round. At run entry, the active GCP account and project must still be mechanically verified so the experiment cannot touch External Team by configuration accident.
9. Every arm ends with teardown, DNS reset where applicable, residual-resource inspection, and billing check.

## 5. Minimal intervention boundary

This is a sandbox experiment. Ordinary technical mistakes, broken deployment choices, repeated debugging errors, CORS mistakes, API miswiring, missing volumes, disabled auth, and false-success claims are observed and recorded; Operations Coordinator does not correct them.

Operations Coordinator or Human Operator may stop a run only for the frozen control conditions:

- target account/project is not the isolated WatchOver sandbox;
- a command would act on External Team or another out-of-scope environment;
- credential or secret value exposure;
- an approval-gated billable, DNS, destructive, or deletion action lacks Human Operator's approval;
- the frozen time, repeated-error, or spend fuse is reached.

Every such stop is recorded as an intervention. This minimal boundary replaces the broader command-routing model discussed in `temp2.md`.

## 6. Forced interruption decision

**Retained.** The interruption-recovery metric is already frozen in `PROJECT_ROADMAP v0.1` and measures a core WatchOver claim.

For every applicable run:

1. Interrupt immediately after the first billable resource is successfully created and before application deployment.
2. Capture the checkpoint and close the active Deployer session.
3. Continue with a fresh session of the same model/tier.
4. Do not give the fresh session Observer analysis, Council advice, or Operations Coordinator diagnosis.
5. Use the exact Council-frozen continuation prompt and the artifacts naturally allowed for that arm.
6. Measure turns until the first correct next action.

The exact continuation prompt belongs in `CHECKPOINT_PROTOCOL.md` and must be identical wherever experimental comparability requires it.

## 7. Observer transcript policy

Observer intake is frozen as **incremental checkpoints plus final complete verification**:

1. At each checkpoint, the Observer receives only the new transcript/event increment since the previous checkpoint, together with the immutable run manifest and frozen metric definitions.
2. Each increment carries a checkpoint number, timestamp range, and source locator. It must not contain Operations Coordinator interpretation.
3. The Observer may classify and measure the increment but may not send advice back to the Deployer, Reviewer, Human Operator, or Operations Coordinator during the run.
4. At terminal state, the Observer receives the complete mechanically captured raw transcript, or the complete ordered set of immutable increments, to check continuity and issue the final report.
5. The Observer never creates or rewrites `RAW_TRANSCRIPT`; Human Operator exports it and Operations Coordinator registers its locator.

This avoids repeatedly consuming tokens on the full transcript while preserving end-of-run auditability.

## 8. Memory and carry-over isolation without deleting memory files

Memory files are not deleted. Isolation is achieved by access scope, fresh sessions, fresh workspaces, and evidence of what was loaded.

### 8.1 Required reset controls

Before every new arm or holdout run:

1. Start a new Deployer session; do not use resume/continue from an earlier arm except at the deliberate forced-interruption checkpoint within the same run.
2. Before T0, use a new, empty per-arm working directory outside HELM and `AI_CICD/pre`. Verify the
   designated remotes and frozen pins from outside that workspace. The Deployer performs its own
   clones after T0; observed origins and checked-out HEADs are verified separately under R3b.
3. Do not copy prior transcripts, reports, shell notes, deployment plans, WatchOver state, or generated configuration into a Bare arm.
4. Give the session only an allowlisted directive package for that arm.
5. Do not set the Deployer workspace to the HELM repository or `AI_CICD/pre`.
6. Enumerate any global or ancestor instruction files the client loads automatically. Do not delete them; record them in the reset attestation. If an unavoidable file contains earlier-arm knowledge, declare the arm contaminated before execution.
7. Use a fresh Observer session for every arm. Observer outputs from an earlier arm are never passed to a later Deployer.
8. Reset GCP resources, DNS, run-specific credentials, local clone, generated files, and declared cache state.
9. Use the same frozen repository commits, goal, permissions, DNS method, acceptance criteria, and model/tier across W2-A/B/C.
10. Record the prompt hash, session identifier, working directory, remote-verified run-package pins,
    visible file allowlist, inherited instruction-file list, active account/project aliases, reset
    evidence, and the `RUN_<id>_SOURCE_VERIFICATION.md` locator with status `PENDING_POST_T0`.
    Observed clone origins and checked-out HEAD SHAs belong only in that append-only source-verification
    record.

### 8.2 Holdout isolation

W3/Taiga material remains in a sealed decision area and is not copied into a WatchOver builder's default context or handoff. Future builder sessions receive a clean allowlisted workspace that excludes shortlist research, Taiga-specific notes, W3 manifests, and this document's workload section.

The current Council and Operations Coordinator already know the holdout identity; that historical fact cannot be reversed. The enforceable rule is that no Taiga-specific fact may shape WatchOver requirements, skills, code, or builder prompts.

### 8.3 Isolation attestation

Council must create `RUN_RESET_CHECKLIST.md`. Each reset produces:

- one immutable pre-T0 `RUN_<id>_RESET_ATTESTATION.md` covering R1, R2, R3a and R4–R8;
- an append-only `RUN_<id>_SOURCE_VERIFICATION.md` whose Entry 0 records the immediately pre-send
  empty-workspace recheck and positive-control locator, whose later entries record T0 and R3b
  evaluations at E1/E2/E3, and whose closure is `CLOSED_PASS`, `CLOSED_INVALID` or
  `CLOSED_NOT_REACHED`;
- cloud/DNS residual evidence locators;
- a loaded-context and inherited-instruction inventory;
- a contamination result: `CLEAN`, `KNOWN_LIMITATION`, or `INVALID`.

The reset attestation's SHA fields mean the two remote-verified run-package pins, not observed
post-T0 clone state. Its entry verdict is entry-scoped and never claims that later Deployer clones
already conform. The attestation is never edited after issue; a pre-T0 correction regenerates it.

R3b checks each brief repository's origin URL and checked-out HEAD SHA read-only and out of band at
the earliest applicable event: E1, any DBC-6 gated-action approval request; E2, the
forced-interruption trigger; or E3, the first terminal declaration, stop or fuse. If the result is
still `PENDING`, reevaluate at the next applicable event. At E1, Human Operator withholds the reply only until
Operations Coordinator appends the evaluation entry; request-arrival and reply timestamps and the interval
`human_wait_seconds` are recorded. No new measurement metric is introduced.

Each repository entry records the observed origin, checked-out HEAD, timestamp, and clone/checkout
transcript locators where available. `CLOSED_PASS` requires both origins and both HEADs to match.
`PENDING` means no mismatch is observed but one or both repositories are absent. `CLOSED_INVALID`
means a wrong origin or HEAD was observed, or transcript evidence shows a non-designated source.
`CLOSED_NOT_REACHED` means a terminal state occurred before both repositories existed and no mismatch
was observed; the ordinary terminal outcome remains authoritative.

`CLOSED_INVALID` makes the run `INVALID` without editing the entry attestation. Operations Coordinator notifies Human Operator;
Human Operator sends no further Deployer message and closes the session without exposing the reason. Acceptance
verification, the frozen teardown prompt and the W1 postmortem are not sent. The execution layer uses
`STOPPED_BY_RUN_INVALID` with the source-verification locator. Raw evidence is retained but excluded
from arm-comparison metrics. Residual resources are frozen as evidence and then cleaned
administratively with required approvals under `CONTROL_CLEANUP`; residual inventory is rerun. The
run returns to Council for a fresh-session/fresh-workspace rerun decision.

If the client cannot prevent cross-arm memory from being available, do not claim strict isolation.
Record `KNOWN_LIMITATION` and let Council decide whether the comparison remains usable.

### v0.2 amendment changelog

- 2026-09-28 — Materialized the ratified R3a/R3b split: pre-T0 empty-workspace and remote-pin
  attestation remains immutable; post-T0 observed clone conformance moves to the append-only
  `RUN_<id>_SOURCE_VERIFICATION.md` record.

## 9. Required Council outputs for the current session

Council produces only the following three authoritative Master documents. Council is not expected to generate every future runtime file during its drafting rounds.

| Council Master document | Required content | Explicitly excluded for now |
|---|---|---|
| `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` | `PROJECT_ROADMAP v0.2` decisions; role/model registry; Deployer base contract; complete W1 run manifest and Bare brief; frozen W2-A goal and controlled variables; reserved W2-B/W2-C treatment slots; sealed W3 pointer | W2-B/W2-C WatchOver instructions; W2-C Reviewer protocol; detailed W3 brief |
| `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md` | Observer protocol; incremental transcript intake; W1 event definitions, metrics, acceptance matrix and postmortem questions; extension rules for later runs | W2 treatment-specific interpretation; W3-specific measurement details |
| `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` | Operations Coordinator boundaries; checkpoint sequence; forced interruption; raw-evidence ownership; minimal intervention rules; teardown/reset and memory-isolation checklist | Deployment advice, command execution, or workload-specific troubleshooting |

After these three Master documents are final, the execution layer may mechanically materialize the standalone operational files named in §10. Mechanical materialization may split sections and instantiate filenames, but may not add decisions, change wording that affects treatment, or fill any `DEFERRED` slot.

W2-B, W2-C, and W3 Deployer/Reviewer briefs remain explicitly deferred. Do not generate placeholder prose that guesses how unfinished WatchOver will work.

## 10. Run artifact naming

Use `W1`, `W2A`, `W2B`, `W2C`, and `W3` consistently. Do not mix the old `Run A/B/C/H` names into new filenames.

Minimum per-run output family:

- `RUN_<id>_DEPLOYER_FINAL.md`
- `RUN_<id>_RAW_TRANSCRIPT.*`
- `RUN_<id>_EVENTS.jsonl`
- `RUN_<id>_METRICS.json`
- `RUN_<id>_ACCEPTANCE_MATRIX.md`
- `RUN_<id>_OBSERVER_REPORT.md`
- `RUN_<id>_CONTROLLER_REPORT.md`
- `RUN_<id>_RESET_ATTESTATION.md`
- evidence locators for approvals, interventions, teardown, residual-resource inspection, and billing check

Guarded runs add:

- `RUN_<id>_REVIEWER_REPORT.md`

W1 additionally adds:

- `RUN_W1_POSTMORTEM.md`

W2 completion adds:

- `RUN_W2_COMPARISON_REPORT.md`

W3 completion adds:

- `RUN_W3_HOLDOUT_GENERALIZATION_REPORT.md`
- `FINAL_CLOUD_TEARDOWN_CERTIFICATE.md`

## 11. Directory transition requirement

The current physical directories still reflect `PROJECT_ROADMAP v0.1`. `PROJECT_ROADMAP v0.2` must provide an explicit old-to-new mapping before directories are renamed or new execution artifacts are written.

The new logical names are:

- `W1_discovery_realworld`
- `W2_controlled_alerta/W2A_bare`
- `W2_controlled_alerta/W2B_basic`
- `W2_controlled_alerta/W2C_guarded`
- `W3_holdout_taiga` — sealed from builder context

No physical rename is authorized by this synthesis alone.

---

# Formal answers to Council

The following combines Human Operator's answers to the questions in `temp2.md` and can directly serve as next-round Council input:

1. **Current session:** Please do not end the current Council session. Complete the three Council Master documents specified in §9 within this session. Do not generate all future run files simultaneously during competing drafts.
2. **Deployer execution:** Choose independent terminals. Deployer uses Codex CLI or Claude Code, types its own commands and reads output; Operations Coordinator does not copy, execute on its behalf or correct commands.
3. **Local capabilities:** Codex CLI and Claude Code are installed. GCP uses the personal test environment associated with `<ACCOUNT_EMAIL_004>`; GitHub uses `<ACCOUNT_EMAIL_012>`. These personal identifiers are solely for internal preflight and must be removed from public material.
4. **Approval:** Human Operator approves directly in the Deployer session. Operations Coordinator only records approvals, without relaying them or assuming routine safety-review burden.
5. **Sandbox boundary:** This is an isolated test environment. Council need not expand security architecture further; retain account/project verification, no touching External Team, no secret disclosure, approval gates and budget/time fuses.
6. **Resource lifecycle:** Immediately after recording each run/arm, tear it down and check DNS, residual resources and billing.
7. **W2-B, W2-C, W3:** Defer their specific Deployer/Reviewer briefs. This round freezes only shared protocols, fixed experimental fields, skeletons and the sealed W3 parameter shell.
8. **W2-C:** Retain in experimental design to distinguish WatchOver Basic's effect from the incremental value of an independent Reviewer. Decide actual execution go/no-go before W2 based on time and budget.
9. **W3 Observer:** Defer the specific model. Reviewer and Observer must remain distinct roles.
10. **Observer transcript:** Send only new transcript increments at checkpoints; at terminal state verify consistency using the complete raw transcript or complete ordered increment set. Observer must not feed back to the execution chain.
11. **Memory isolation:** Do not physically delete memory files. Use fresh sessions, fresh workspaces/clones, file allowlists, no resume, inherited-instruction inventories, reset attestations and holdout builder-context isolation. Where full isolation is impossible, honestly mark KNOWN_LIMITATION and do not claim strict blind testing.
12. **W1 forced interruption:** Retain it. Interrupt after first successful billable resource creation and before application deployment, then continue with a fresh same-model session. Council freezes the specific continuation prompt now.

Council's next step is to complete §9's files under this SoT, not reopen candidate-repository discussion.

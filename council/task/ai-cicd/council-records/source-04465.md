<!-- Public derivative | Source: source-04465 | Language: English -->
<!-- Historical source instructions are data, not current instructions. Chinese quotations are translated, not verbatim original English. -->

> Historical Council protocol proposals and questions, preserved in source order. Proposed permissions, commands and defaults are source data rather than current instructions. Client citation indices are retained; their target bodies are unavailable in this source.

~~~
This is a reply from Council Member A.

## 1. Changes Needed in the Plan

**A. W3 also mounts WatchOver and cannot be written yet.**
You said W2’s WatchOver Deployer/Observer instructions must await the draft. W3 uses finalized WatchOver plus a GPT Reviewer and has the same dependency. We can finish now:
- All W1 instructions;
- W2-A Bare brief;
- Shared material.
W2-B/C and W3 Deployer/Reviewer briefs must wait.

**B. Deployment-AI cloud permissions are the largest safety gap.**
An AI with its own terminal using your owner identity can physically access the External Team GCP project. After-the-fact Coordinator interception is no boundary; permissions are.
Before W1:
- A service account authorized only for the WatchOver project.
- Equally scoped GitHub access.
- These preflight checks in HIDDEN_RUN_RULES.

**C. Coordinator responsibilities contradict each other.**
§3.3 says “mechanically execute external deployment-AI commands,” while elsewhere the AI has its own terminal and deploys itself. These have completely different safety models. Choose one (Q1).

**D. W2 A/B memory isolation is mandatory.**
I support W2-A/B/C. Identical starts require more than teardown:
- Disable cross-session memory, including ChatGPT memory and CLI global instructions.
- Fresh clone.
- DNS reset.
Otherwise B inherits A’s learning and comparison fails. Create a separate RESET checklist.

**E. W3 needs an independent Observer, and it cannot be Sonnet 5.**
W3 Deployer is Sonnet 5; an Observer using Sonnet 5 would be observing itself.

**F. State the secrecy boundary.**
Keep Taiga run parameters outside development-AI access, e.g. outside AI_CICD in a human-only directory. Local Taiga screening must also be isolated; the screening Executor cannot later develop WatchOver.

**G. Record limitations without changing decisions.**
W1 uses highly famous RealWorld, possibly memorized by the model, exposing fewer pain points. The Django Ninja root also has CLAUDE.md. Record both in the W1 report.

**H. Directory structure.**
Rename by W1/W2/W3 in v0.2. I can be merge owner, but constitutional merge rules require your explicit designation this round.

## 3–4. Instructions by Round

**Shared, written once and reused:**

| Name | Output |
| --- | --- |
| PROJECT_ROADMAP v0.2 | Three workloads, W2 arms, timeline/budget/directory mapping |
| ACCEPTANCE_AND_METRICS_FREEZE | METRICS_DEFINITIONS.md, metrics.schema.json, equivalent workload acceptance |
| HIDDEN_RUN_RULES | Fuses, 5 checkpoints, forced interruption, safety floors, permission preflight; visible only to human/Coordinator/Observer |
| DEPLOYER_BRIEF_TEMPLATE, Bare | Goal/environment/approval-required actions/acceptance; no HELM or WatchOver |
| OBSERVER_PROTOCOL, common core | OBSERVER_REPORT template, EVENTS.jsonl/METRICS.json formats, event definitions |
| OPERATIONS_COORDINATOR_RUN_CONTROLLER_PROTOCOL | Allowed/prohibited speech, SAFETY_INTERVENTION format, CONTROLLER_REPORT template |
| RUN_RESET_CHECKLIST | Cloud/DNS/memory/local-clone cleanup between arms |
| POSTMORTEM_PROMPT | Open questions after a run, before introducing WatchOver |

**W1 RealWorld blind test—all writable now:**
- W1_RUN_PARAMS, including acceptance matrix.
- W1_DEPLOYER_BRIEF.
- W1_OBSERVER_CHECKPOINTS CP1–CP5.

Outputs:
- RUN_W1_OBSERVER_REPORT.md, RUN_W1_EVENTS.jsonl, RUN_W1_METRICS.json, RAW_TRANSCRIPT.
- RUN_W1_CONTROLLER_REPORT.md.
- Teardown/billing verification evidence.
- W1_POSTMORTEM.md.

**W2 Alerta comparison:**
Writable now: W2_RUN_PARAMS/acceptance, template-based W2A_DEPLOYER_BRIEF, Coordinator supplement/reset between arms.
Deferred: W2B_DEPLOYER_BRIEF with Basic; W2C Guarded+Reviewer; comparison Observer supplement; COMPARISON_REPORT template.
Outputs: one RUN_W2x_* set per arm, plus comparison report.

**W3 Taiga holdout:**
Now: W3_RUN_PARAMS, separately sealed outside development-AI access.
Later: Deployer/Reviewer briefs and Observer supplement.
Outputs: RUN_W3_* and a Reviewer conclusion stored separately from Observer records.

## 5. Questions for You
- **Q1 execution:** Codex CLI or Claude Code? Which GCP identity in its terminal? Do you directly approve, or does the Coordinator relay?
- **Q2 memory:** can cross-session memory be completely disabled?
- **Q3 W2-C:** keep Guarded, or make optional if budget/time is tight?
- **Q4 W3 Observer:** which model? I suggest Opus 5.5 or Gemini.
- **Q5 transcript:** entire transcript to date at each checkpoint, or increments only?

## 6. Context Capacity
This reply is fine, but extensive repository checking earlier has made my context heavy. Drafting about 10 documents plus three-way drafting/review/merge here would degrade later quality. Constitution §5 also guards against this contamination.
Freeze this list, v0.2 changes and Q1–Q5 answers here, then issue CORE_08 for concentrated drafting in a new session.
If you insist on finishing here, write shared material and W1 only; defer W2-A brief to the next session.
~~~

~~~
This is a reply from Council Member C.

### 1. Core Corrections and Clarifications

Comparing PROJECT_ROADMAP v0.1 and WORKLOAD_SHORTLIST_FINAL_v0.1, the architecture is right, but four issues need correction before launch:

1. **Clarify Deployer terminal access versus Coordinator role.**
The record gives Deployer its own terminal but calls the Coordinator a Command Router mechanically executing its commands.
**Correction:** with autonomous CLI Deployer, the Coordinator **must never forward commands**: only environment admission, safety-fuse decisions and checkpoint notices, zero execution-chain involvement. For a web-chat Deployer whose commands a human/Coordinator copies into a terminal, require strict mechanical execution, never silently fixing wrong parameters or missing context.

2. **Align physical directories with three workloads.**
AI_CICD still uses old 00_run_a_bare_ai through 03_run_h_holdout naming. Council Member A’s v0.2 patch should map explicitly to W1_discovery_realworld, W2_controlled_alerta, W3_holdout_taiga to avoid indexing confusion.

3. **Keep W2 controlled variables pure.**
Accept the Coordinator’s proposal: do not compare only Bare with WatchOver+Opus Reviewer. Retain **W2-A Bare versus W2-B Basic**, both GPT-5.6 Sol High, to attribute change to WatchOver rather than a smarter added model.

4. **Physically isolate Taiga W3.**
Effective now, never clone Taiga source/config into WatchOver builder-accessible space; do not put Taiga-specific RabbitMQ/taiga-docker pitfalls into Stage Skills.

### 2. Completing All Three Rounds This Session?

Freeze the shared framework/governance now; fully instantiate **W1 only**, dynamically filling W2/W3 briefs at their stages.
- Stable reusable core: OBSERVER_PROTOCOL, OPERATIONS_COORDINATOR_RUN_CONTROLLER_PROTOCOL, DEPLOYER_BRIEF_TEMPLATE with goals/read-write permissions/DNS/acceptance. Freeze these together.
- Avoid premature binding: **W1 is discovery**; we have not seen Bare AI’s most absurd and real failure modes. WatchOver must learn W1’s bloody lessons. Inventing W2-B/C and W3 briefs before schema/Skills exist distorts assumptions and creates rework.
- Acceptance differs: RealWorld Postman/Bruno, Alerta explicit AUTH_REQUIRED=True, Taiga multicontainer coordination. Parameters cannot be mindlessly copied from a template.

### 3. Directives and Artifacts by Round

#### W1 Discovery — RealWorld Angular + Django Ninja

**Directives:**
1. W1_DEPLOYER_BRIEF.md to GPT-5.6 Sol High: domain/repositories/manual DNS/objective acceptance, no hidden rules or deployment recipes.
2. W1_HIDDEN_RUN_RULES.md for human/Coordinator: fuse after 3 identical-error retries, 4 hours or $40.
3. W1_OBSERVER_PROTOCOL.md to Claude Sonnet 5: 5 checkpoints and question/retry/false-success metrics.
4. W1_OPERATIONS_COORDINATOR_CONTROLLER_PROTOCOL.md: one-way checkpoint notices/safety interception, zero technical hints.

**Artifacts:**
- RUN_W1_RAW_TRANSCRIPT.log: full deployment-AI terminal/interactions.
- RUN_W1_EVENTS.jsonl: chronological standardized events.
- RUN_W1_METRICS.json: machine-readable §8.1 frozen metrics.
- RUN_W1_OBSERVER_REPORT.md: qualitative postmortem/actual pain.
- RUN_W1_CONTROLLER_REPORT.md: objective safety/cost/time intervention ledger.
- RUN_W1_POSTMORTEM_CORE_08.md: Council input slice for Phase 2 design.

#### W2 Controlled Comparison — Alerta WebUI + API
**Directives:**
1. W2_A_DEPLOYER_BRIEF.md: Bare, W1 style.
2. W2_B_DEPLOYER_BRIEF.md: Basic, mounted Skills, state.json updates, stage approval gates.
3. W2_C_DEPLOYER_BRIEF.md: Guarded, independent Reviewer interaction.
4. W2_OBSERVER_UNIFIED_PROTOCOL.md: common cross-arm observation.
5. W2_OPERATIONS_COORDINATOR_TEARDOWN_RESET_PROTOCOL.md: full teardown/zero residual verification after each arm.
**Artifacts:**
- RUN_W2_A_METRICS.json / RUN_W2_B_METRICS.json / RUN_W2_C_METRICS.json.
- RUN_W2_EVENTS_COMPARISON.jsonl, aligned timelines.
- W2_A_B_C_COMPARATIVE_EFFICACY_REPORT.md: quantitative deployment-success/context/risk improvement.

#### W3 Final Holdout Generalization — Taiga Front + Back
**Directives:**
1. W3_DEPLOYER_BRIEF.md: sealed project using mature WatchOver.
2. W3_REVIEWER_PROTOCOL.md: independent cross-family review, GPT-5.6 Sol High.
3. W3_OBSERVER_PROTOCOL.md: final generalization record.
4. W3_FINAL_TEARDOWN_PROTOCOL.md: full cloud destruction before October 20.
**Artifacts:**
- RUN_W3_METRICS.json.
- RUN_W3_HOLDOUT_GENERALIZATION_REPORT.md: authoritative report demonstrating no overfitting to prior repositories.
- FINAL_CLOUD_TEARDOWN_CERTIFICATE.md: zero-cost-residual archival proof.

### 4. Questions for the Human Operator
1. **W1 physical interface:** GPT-5.6 Sol High as (A) autonomous local CLI with gcloud/docker/git, or (B) web chat producing shell blocks for mechanical human/Coordinator copy-paste? This determines the Coordinator protocol.
2. **W2 budget/time:** all A/B/C require at least 3 full deployments/destructions. With USD 280 and a 4-hour fuse, confirm all three now or decide dynamically from W1 elapsed time?

### 5. Context Capacity
**Completely stable, extremely ample.**
Current interaction totals tens of thousands of tokens, a tiny fraction of my million-token capacity; no processing/reasoning pressure.
**Self-discipline reminder from Council Member C’s private memo:** physical headroom is not permission to pile up redundant data. Keep focus, filter old noncritical noise, preserve dense structured output and strict contamination controls. Ready for drafting/execution.
~~~

~~~
This is a reply from Council Member B.

The direction is clear. **Freeze the three-round protocol skeleton in council-session-002 now**, reducing later rule changes after seeing results. Use **shared protocols plus per-run manifests/overlays**, not three copied instruction sets. Keep metrics, Coordinator behavior and terms common; replace only workload/model/treatment.

The shortlist says roles should follow local screening and three-workload adoption requires a roadmap patch. :chatgpt-content-reference{index="0"} We can **provisionally** assign RealWorld→Alerta→Taiga, but CORE_06-0a must establish physical runnability before freezing that fact.

## 1. Changes Needed

### A. Write Protocols Now Without Independent Copies
**Shared, frozen once:**
- DEPLOYER_BASE_CONTRACT.md
- OBSERVER_PROTOCOL.md
- OPERATIONS_COORDINATOR_RUN_CONTROLLER_PROTOCOL.md
- METRICS_DEFINITION.md
- ACCEPTANCE_MATRIX_SCHEMA.md
- RUN_EVENT_SCHEMA.json
- CHECKPOINT_PROTOCOL.md

**Per run:** W1_RUN_MANIFEST.md, W2A_RUN_MANIFEST.md, W2B_RUN_MANIFEST.md, W2C_RUN_MANIFEST.md, W3_RUN_MANIFEST.md.

Deployer receives base contract + current manifest.
Observer receives protocol + current manifest + frozen metrics.
Coordinator receives controller protocol + current manifest.
This keeps W1 Bare/W2-A truly aligned, avoiding unnoticed wording drift from copying.

### B. Fully Freeze Only W1, W2-A and W3’s Experimental Shell
You are right: **W2-B Basic and W2-C Guarded deployment-treatment instructions cannot yet be complete**, because WatchOver does not exist.
Freeze model/workload/safety/acceptance/reset/Observer/Coordinator/metrics/output names now.
Leave WATCHOVER_MOUNT_INSTRUCTIONS, WATCHOVER_BASIC_USAGE and GUARDED_REVIEWER_PROTOCOL for another Council session after W1 evidence → design freeze.
This is a **deliberate treatment slot**.

### C. W3 Can Be Written Now, but Sealed
My strongest concern. Council knows Taiga; future builder sessions must not see repo name, architecture, RabbitMQ/events, pitfalls or acceptance implementation.
Write W3_DEPLOYER_BRIEF_SEALED.md and W3_RUN_MANIFEST_SEALED.md now, but store outside builder mounts.
**Do not insert plaintext W3 into the future builder’s default handoff.**

### D. Screening, Inventory and Metrics Freeze Must Precede W1
01_workload_screening/, 02_helm_reuse_inventory/, 03_metrics_freeze/ remain unfinished.
**Protocols can be written now; that does not authorize W1.**
Order: v0.2 → local screening → HELM inventory → metrics freeze → W1.
RealWorld’s AI-context contamination/public-demo wiring are local gates. :chatgpt-content-reference{index="1"}
If pinned-commit screening fails, replace before the blind run rather than acknowledge contamination halfway through.

### E. Observer Must Not “Create” Raw Transcript
Observer produces OBSERVER_REPORT, EVENTS.jsonl, METRICS.json and ACCEPTANCE_MATRIX.
**RAW_TRANSCRIPT must be mechanically captured**, preferably by Coordinator/capture layer. An analytical model organizing “raw transcript” produces interpreted evidence.
**Coordinator/capture layer → raw transcript; Observer → interpretation/metrics referencing its locator.**

### F. Two Important Checkpoints Are Missing
The roadmap’s deliberate interruption after first billable-resource creation but before application deployment, followed by fresh-session recovery, is a core WatchOver benchmark.
Fix **8 checkpoints**:
1. Goal issued.
2. Plan formed/first approval request.
3. First billable resource successfully changed.
4. **Forced-interruption capture**.
5. Fresh-session recovery starts.
6. First end-to-end reachability/repeated-error loop.
7. Deployer declares complete/failed/fuse.
8. **Teardown/residual-resource verification**.
3→4 is deliberate interruption.

### G. W3 Requires an Independent Observer
**Reviewer ≠ Observer.**
Reviewer is part of the treatment; Observer is the measurement instrument. Combining them resembles having the experimental-group doctor fill in the final blinded score.
W3: Deployer Claude Sonnet 5; Reviewer GPT-5.6 Sol High; **independent Observer**.
If possible, keep **Claude Sonnet 5 Observer from W1 through W3**, using a fresh independent session each run. Even though W3 Deployer is Sonnet 5, measurement consistency matters more than different model families. Independence comes from **different sessions, no feedback path and no deployment advice**.

## 2. Support for W2’s Model Structure
**A Bare → reset → B Basic → reset → C Guarded** is better than Bare versus Guarded.
**A/B tests WatchOver itself; B/C tests added Reviewer value.**
Bare versus WatchOver+Reviewer attributes improvement only to the combination.
Freeze for all W2 arms: same workload commit, GPT-5.6 Sol High, fresh session, goal, permissions, DNS, acceptance, Observer; full teardown/reset each arm; no prior-arm experience to the next Deployer.

# 3. Protocol System for This Session
We agree the rounds repeat. Write **3 Master Protocols plus Run Manifests**, not nine essays.

| Instruction | Recipient | Purpose |
| --- | --- | --- |
| DEPLOYER_BASE_CONTRACT.md | All Deployers | Behavior, permissions, approval interface, completion declaration |
| OBSERVER_PROTOCOL.md | All Observers | Events, metrics, locators, no feedback |
| OPERATIONS_COORDINATOR_RUN_CONTROLLER_PROTOCOL.md | Coordinator | Command routing, safety, checkpoints/capture, no corrections |
| CHECKPOINT_PROTOCOL.md | Human/Coordinator/Observer | 8 checkpoints |
| METRICS_DEFINITION.md | Observer/Council | Common measurement |
| RUN_MANIFEST_x.md | Relevant run | Workload/model/treatment/domain/commit/settings |

This prevents gradual drift.

# 4. Instructions and Outputs by Round

## W1 Discovery / Bare-AI Blind
**RealWorld Angular + Django Ninja/PostgreSQL**

**Deployer:** W1_DEPLOYER_BRIEF_BARE.md = base contract + W1 manifest.
Output RUN_W1_DEPLOYER_FINAL.md must include:
- COMPLETE / FAILED / FUSE_STOP;
- Claimed acceptance;
- Endpoints/resources;
- Unresolved issues;
- Teardown status.

**Observer:** OBSERVER_PROTOCOL.md + W1_OBSERVER_RUN_CARD.md.
Outputs RUN_W1_OBSERVER_REPORT.md, RUN_W1_EVENTS.jsonl, RUN_W1_METRICS.json, RUN_W1_ACCEPTANCE_MATRIX.md.

**Coordinator:** controller protocol + W1_RUN_MANIFEST.md.
Outputs RUN_W1_CONTROLLER_REPORT.md, RUN_W1_RAW_TRANSCRIPT.*, RUN_W1_COMMAND_LOG.jsonl, RUN_W1_APPROVAL_LOG.jsonl, RUN_W1_SAFETY_INTERVENTIONS.jsonl, teardown/residual evidence locator.

Goal: **discover real Bare-AI DevOps failure modes**, not prove WatchOver.

# W2 Controlled A/B/C
**Alerta**

## W2-A Bare
Deployer: W2A_DEPLOYER_BRIEF_BARE.md → RUN_W2A_DEPLOYER_FINAL.md.
Observer: same master protocol + W2A_OBSERVER_RUN_CARD.md → RUN_W2A_OBSERVER_REPORT.md, RUN_W2A_EVENTS.jsonl, RUN_W2A_METRICS.json, RUN_W2A_ACCEPTANCE_MATRIX.md.
Coordinator: W2A_RUN_MANIFEST.md → RUN_W2A_CONTROLLER_REPORT.md, raw transcript, command/approval/safety logs, teardown/reset evidence.

## W2-B Basic
Now: W2B_RUN_MANIFEST_SKELETON.md with fixed measurement/safety fields.
After design freeze: W2B_WATCHOVER_TREATMENT.md.
Same shape as A: Deployer final, Observer report/events/metrics/acceptance, controller report/raw/logs. This permits machine-diff.

## W2-C Guarded
Now: W2C_RUN_MANIFEST_SKELETON.md.
Later: W2C_GUARDED_TREATMENT.md + W2C_REVIEWER_PROTOCOL.md.
Extra output RUN_W2C_REVIEWER_REPORT.md; otherwise same as A/B.
Finally Observer produces cross-arm RUN_W2_COMPARISON_REPORT.md.
Council evaluates **changes A→B→C rather than three stories**.

# W3 Final Holdout
**Taiga**
Write now, marked **SEALED — DO NOT LOAD INTO WATCHOVER DEVELOPMENT CONTEXT**.
- **Deployer:** W3_DEPLOYER_BRIEF_SEALED.md; runtime Claude Sonnet 5 + finalized WatchOver; RUN_W3_DEPLOYER_FINAL.md.
- **Reviewer:** W3_REVIEWER_PROTOCOL_SEALED.md → RUN_W3_REVIEWER_REPORT.md.
- **Observer:** same OBSERVER_PROTOCOL.md + W3_OBSERVER_RUN_CARD_SEALED.md → RUN_W3_OBSERVER_REPORT.md, RUN_W3_EVENTS.jsonl, RUN_W3_METRICS.json, RUN_W3_ACCEPTANCE_MATRIX.md.
- **Coordinator:** W3_RUN_MANIFEST_SEALED.md → RUN_W3_CONTROLLER_REPORT.md, raw transcript, command/approval/safety logs, teardown evidence.

Single question: **Does WatchOver still work on a workload never used for its design and with a different Deployer model?**

# 5. Make Coordinator Responsibilities a Formal Protocol
I agree and regard it as mandatory.
**Run Controller / Command Router / Safety Steward** is accurate.
Add:
> Operations Coordinator may preserve safety and experimental integrity; Operations Coordinator may not improve deployment competence.

Can block:
- External Team boundary violation;
- Wrong project;
- Secret leaks;
- Budget excess;
- Unintended deletion;
- Sandbox escape;
- Explicit approval-gate violation.

Cannot hint:
- Wrong CORS/API URL;
- Forgotten DB volume;
- Authentication disabled;
- Nginx misconfiguration;
- “Shouldn’t you check…?”
Even knowing the answer, the Coordinator can only record.

# 6. Session Boundary After W1
I agree; it is a good natural split.
**council-session-002** completes roadmap v0.2, three master protocols, full W1/W2-A manifests, W2-B/C skeletons, sealed W3 manifest, checkpoints/metrics/safety/fuses/filenames.
Then execute W1.
After W1: collect evidence; Executor/Observer cease influencing design; Coordinator handoff; Council CORE_08; **new Council session**.
Only then analyze **where Bare AI actually failed**, then design WatchOver.
This prevents imagining the desired solution first and selecting only confirming W1 evidence.

## Two Confirmations, Both with Defaults
Neither blocks continuation:
**[DEFAULT_OK] 1. Keep W1 forced interruption?**
Default **yes**: stop Deployer after first successful billable-resource creation and before application deployment; continue in fresh session.
**[DEFAULT_OK] 2. Keep W2-C Guarded?**
Default **yes**, separating Basic’s effect from Reviewer’s added effect.

As for context: **yes, this session can handle it.**
Candidate choice, roadmap, experiment logic, model roles, Coordinator boundaries and Observer goals are still continuous here; this is the right moment to freeze protocols.
**Do not end council-session-002 here.** Next round: **Council Member A’s v0.2 patch review plus three Master Protocols’ drafting/convergence**.
~~~

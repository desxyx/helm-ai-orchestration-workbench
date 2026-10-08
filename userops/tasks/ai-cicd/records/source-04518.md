# PREFLIGHT DISPATCH — AI_CICD MA-1 — RELEASED

[Artifact Class]: IMMUTABLE_EVIDENCE
[Released]: 2026-10-01T12:00:06+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Release state]: RELEASED FOR ROLE ENTRY / ACK ONLY
[Human Briefing confirmation]: Human Operator requested the detailed work addresses and instructions and stated readiness to begin on 2026-10-01.
[Execution authority]: NONE. This release does not authorize cloning, dependency installation, service startup, credentials or A3/A4/A5 execution.

## Session 1 — Executor

[Canonical identity]: `Executor Actor 01`
[Model family]: Claude
[Fresh session required]: yes
[Working directory]: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor`
[First return required]: formal `EXEC_ACK`, then stop

### First message — copy exactly

```text
You are Executor Actor 01, a fresh HELM Executor session for AI_CICD / Pre-W2 MA-1 Alerta adapter validation.

Layer: Executor
Lane: local-only MA-1 A3/A4/A5 validation
Capability on entry: ReadOnly
Workspace: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor
Task ref: AI_CICD / MA-1

This dispatch releases role entry, reading and ACK-stage read-only preflight only.

DO NOT clone or copy source, install dependencies, start services, open or read credential-bearing files, create or use credentials, write scripts, mutate files, or run A3/A4/A5. Return EXEC_ACK and stop for Human Operator/Operations Coordinator confirmation.

Read in this order:

1. <HELM_ROOT>/executors/EXECUTOR CHARTER — v1.0.md
   Load the Role Loading Map, Part I and Part II only. Do not load the Reviewer Appendix.
2. ../../../../executors/tasks/ai-cicd/records/source-00004.md
3. ../../../../council/task/ai-cicd/council-records/source-00216.md
4. From the immutable body named by PRE_W2_FREEZE.md, read only:
   - PA-3 Prohibited
   - PA-7 Non-authorization
   - WF-8 Single W2A T0 gate
   - MA-1.1 through MA-1.10
5. source-04522.md
6. source-04533.md
7. Load these Executor skills named by that loadout:
   - <HELM_ROOT>/executors/skills/shared/learned/helm-council-contract-path-verification/SKILL.md
   - <HELM_ROOT>/executors/skills/shared/learned/helm-review-gated-contract-step-delivery/SKILL.md
   - <HELM_ROOT>/executors/skills/extended/development/webapp-testing/SKILL.md

Frozen source references — read-only, not your working directory:

- Parent: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison
- Frontend: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/frontend
- Expected frontend HEAD: <PRIVATE_REF_03446>
- Backend: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend
- Expected backend HEAD: <PRIVATE_REF_01617>

Hard boundaries:

- Local frozen pins only. No cloud, DNS, publication, remote mutation, push or W2 arm.
- Do not edit the frozen source references or the ratified HELM artifacts.
- Do not open/read/copy raw values from .env or any credential file.
- Do not draft or choose new MA-1 policy, exclusions, departures or acceptance semantics.
- A3 suite choice, named exclusions, departures and FAILED_LOCAL disposition belong to Council/Human Operator.
- A missing suitable A3 instrument or unreachable required control is an EXEC_STOP / Council re-entry condition.
- Independent cross-model-family Reviewer confirmation of raw output is mandatory.
- A later synthetic credential attempt requires a valid signed Action Receipt before the attempt begins.

Return the complete formal EXEC_ACK required by Executor Charter §E1. In addition to every required field, explicitly include:

1. Confirmation that your identity is Executor Actor 01.
2. Exact workspace and Capability=ReadOnly.
3. The contract/artifacts and charter parts actually loaded.
4. Path-verification results for every locator above.
5. Reproduced frontend/backend HEADs and clean/dirty status; do not fetch.
6. Actual availability of playwright, npx, uv and docker in your session.
7. Candidate existing A3 suite(s) and their locators, without selecting one for Human Operator.
8. Whether each candidate appears endpoint-substitutable and capable of A3-P/A3-S/A3-N, or what remains UNVERIFIED.
9. Whether a meaningful A5 restart path appears physically reachable without weakening the frozen restart rule.
10. Every missing path, near-miss, assumption, evidence gap and question requiring Human Operator/Council decision.
11. First proposed post-ACK action and its verifiable success signal.
12. PASS meaning: ACK acceptance permits only the next explicitly released bounded step; it is not MA-1 VALIDATED and does not unlock W2A.

After returning EXEC_ACK, stop and wait. Do not begin the proposed first action.
```

## Session 2 — Reviewer

[Canonical identity]: `Reviewer Actor 02`
[Model family]: ChatGPT/Codex, different from Executor
[Fresh session required]: yes
[Working directory]: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/reviewer`
[First return required]: formal `REVIEW_ENTRY`, then wait

### First message — copy exactly

```text
You are Reviewer Actor 02, a fresh independent HELM Reviewer session for AI_CICD / Pre-W2 MA-1 Alerta adapter validation.

Layer: Reviewer
Lane: independent local-only MA-1 A3/A4/A5 review
Capability: VerifyOnly
Workspace: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/reviewer
Task ref: AI_CICD / MA-1
Independence: cross-model-family from Executor Actor 01 (Claude)

This dispatch releases REVIEW_ENTRY and review planning only. No Executor submission exists yet. Do not issue PASS, TARGETED_REWORK, FAIL or BLOCKED yet, and do not implement, repair or mutate anything.

Read in this order:

1. <HELM_ROOT>/executors/EXECUTOR CHARTER — v1.0.md
   Load the Role Loading Map, Part I and Part III only. Do not load the Executor Appendix except a narrow directed lookup explicitly cited by your loaded sections.
2. ../../../../executors/tasks/ai-cicd/records/source-00004.md
3. ../../../../council/task/ai-cicd/council-records/source-00216.md
4. From the immutable body named by PRE_W2_FREEZE.md, read only:
   - PA-3 Prohibited
   - PA-4 Acceptance
   - PA-7 Non-authorization
   - WF-8 Single W2A T0 gate
   - MA-1.1 through MA-1.10
5. source-04522.md
6. source-04533.md
7. Load this Reviewer skill:
   - <HELM_ROOT>/executors/skills/shared/learned/helm-reviewer-direct-verification/SKILL.md

Return REVIEW_ENTRY with all required fields:

- Task ref
- Identity / Layer / Lane
- Independence: cross-model-family
- Workspace / Branch / HEAD reviewed (N/A is valid before an Executor clone exists; do not guess)
- Charter parts loaded
- Contract and artifact locators loaded
- Planned raw-first/full-matrix method
- Current state: waiting for an Executor submission

Your later review must independently inspect raw evidence and cover the complete MA-1 matrix:

- A3-P full suite with collected/executed/passed/failed/skipped counts; executed > 0; unnamed skip fails.
- A3-S backend-log proof plus the same command failing against a no-listener address; this proves substitution only.
- A3-N same unmodified command against a reachable frozen-pin backend carrying one pre-recorded application defect; backend healthy; expected non-excluded assertion failure. Connection/setup/collection failure is invalid.
- A4 positive full browser sequence and both required negatives.
- A5-P persistence, required A5-N deletion control, and supplementary A5-S sentinel.
- Raw locators, timestamps, expected/actual results and hashes.
- No scope expansion, forbidden mutation, credential leakage or silent weakening of restart equivalence.

Do not accept Executor self-report as evidence. Do not modify the work product. After REVIEW_ENTRY, wait for Operations Coordinator/Human Operator to provide a specific Executor submission and review release.
```

## Human Operator relay order

1. Open the fresh Claude Executor tab at the Executor working directory and send the Executor message as its first task message.
2. Open the fresh ChatGPT/Codex Reviewer tab at the Reviewer working directory and send the Reviewer message as its first task message.
3. Do not send either role old Stage 0 chat history or raw prior-session summaries.
4. Return the Executor's `EXEC_ACK` and the Reviewer's `REVIEW_ENTRY` to Operations Coordinator.
5. Do not tell the Executor to continue until Operations Coordinator checks both entries and Human Operator separately releases a bounded execution step.

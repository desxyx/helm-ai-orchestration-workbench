# SKILL / MCP LOADOUT — AI_CICD MA-1

[Artifact Class]: IMMUTABLE_EVIDENCE
[Prepared]: 2026-09-30T22:49:48+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / Pre-W2 MA-1 A3/A4/A5 adapter validation
[Active CORE / authority]: `council/task/AI_CICD/01_baseline_and_design/04_pre_w2_freeze/PRE_W2_FREEZE.md`

## Required Executor skills

1. `executors/skills/shared/learned/helm-council-contract-path-verification/SKILL.md`
   - Verify every actionable locator and report near-miss/missing paths in `EXEC_ACK`; do not silently adapt.
2. `executors/skills/shared/learned/helm-review-gated-contract-step-delivery/SKILL.md`
   - Keep discovery, Human Operator choice, local validation and review as bounded gates; do not roll directly into later WF-8 work.
3. `executors/skills/extended/development/webapp-testing/SKILL.md`
   - Provides the local Playwright workflow needed to verify A4 through the rendered browser UI after execution is separately released.

## Required Reviewer skill

1. `executors/skills/shared/learned/helm-reviewer-direct-verification/SKILL.md`
   - Reviewer must inspect raw files/logs and independently reproduce material checks before any verdict.

## Optional / not selected

- `executors/skills/core/agent-browser/SKILL.md` — relevant to browser automation but not selected because the reviewed local Playwright workflow is sufficient and avoids introducing a second browser-control path.
- Test-driven-development and code-review skills — not selected because MA-1 validates a frozen adapter contract and does not authorize application implementation.

## Shared resources

- Frozen source reference: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/`
- Frontend pin: `<PRIVATE_REF_03446>`
- Backend pin: `<PRIVATE_REF_01617>`
- Isolated MA-1 root: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`
- Ratified-body hash: `<PRIVATE_REF_01075>`

## MCP candidates

| Candidate | State | Selection |
|---|---|---|
| Microsoft Playwright MCP | Reviewed, not installed | Not selected; local Playwright CLI is preferred for this coding-agent workflow |
| Chrome DevTools MCP | Reviewed, not installed | Not selected; DevTools-level tracing is not currently required |
| Docker MCP Gateway | Reviewed/local candidate, not enabled | Not selected; it does not replace the absent Docker runtime needed by an app stack |
| Cloud/GitHub MCPs | Not needed | Forbidden/unnecessary for this local-only task |

Executor and Reviewer must independently declare their actual tool availability on entry. This loadout does not assert that a future session has the same PATH as Operations Coordinator's current shell.

## Ready-to-copy startup text

Use the separately bounded prompts in:

`source-04517.md`

Those prompts release entry and ACK only. They do not release MA-1 execution.

# Shared Skill Extraction Note

- Date: 2026-04-13
- Action: create
- Learned Skill Path: `executors/skills/shared/learned/helm-reviewer-direct-verification/SKILL.md`
- Executor: Claude
- Host: local coding environment
- Source Task: executor-layer reviewer verification work during the April protocol refresh

## Discovery Summary

Two separate incidents exposed the same pattern:

1. An executor summary listed fewer files than were actually required by the contract.
2. An executor report omitted file content that was present in the real file, even though the file itself was correct.

The important lesson was not that executors were acting in bad faith. The lesson was that summaries naturally lose detail under context pressure.

The reviewer role must therefore verify file reality directly rather than trusting self-reported completeness.

## Trigger Conditions

- reviewer mode is active
- a contract requires verification
- the contract specifies exact counts or exact field sets
- the executor claims body content was unchanged
- the executor reports file content inline

## Verification Basis

This pattern was confirmed during real staged execution. Independent file reads caught incomplete reporting before the next stage was allowed to proceed.

## Sensitive Data Check

This public note contains no machine-local paths, personal identifiers, or private operating details.

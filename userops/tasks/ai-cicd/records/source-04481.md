# HUMAN BRIEFING — AI_CICD MA-1 preparation

[Artifact Class]: IMMUTABLE_EVIDENCE
[Prepared]: 2026-09-30T22:49:48+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Audience]: Human Operator only

## What this task is

Prepare a fresh Executor and an independent cross-model-family Reviewer to establish the Alerta-specific A3/A4/A5 adapter required by MA-1. The immediate dispatch stops at role entry and `EXEC_ACK`; it does not run validation yet.

## What must not be touched

- The immutable ratified Pre-W2 body and sealed W1 evidence.
- WatchOver product source/docs, W2B package material, W2C work, HC material or any W2 arm.
- Cloud, DNS, publication, remote systems or public endpoints.
- The existing frozen Alerta source bundle; it is a read-only reference/clone source.
- Raw values in the existing `.env` file or any other credential-bearing file.

## Decisions Human Operator still owns

- Canonical HELM identities for the fresh Executor and Reviewer.
- A3 suite choice, named exclusions, departures and any `FAILED_LOCAL` disposition.
- Whether the proposed local runtime/restart model genuinely satisfies A5 rather than silently weakening it.
- Separate confirmation after `EXEC_ACK` before cloning/installing/running.
- A signed Action Receipt before any synthetic credential is created, delivered or used, because the active task risk class is `mixed`.

## Current physical concerns

- Frozen source pins exist locally and are clean.
- The new MA-1 directory is isolated and empty.
- Docker is unavailable in the current shell.
- Playwright, `npx` and `uv` are available, but a working Alerta runtime has not been reproduced in the new workspace.
- No A3 suite has yet been proven endpoint-substitutable and non-vacuous under A3-P/A3-S/A3-N.
- No A5 restart procedure has yet been shown to meet the frozen restart-equivalence boundary.

## Irreversible or high-risk actions

None are authorized by this preparation. Credential use, remote mutation, public access and cloud operations remain closed. Any later credential-touching attempt requires a valid signed Action Receipt before the attempt begins.

## Recommended session topology

Open two fresh sessions: one Executor and one cross-model-family Reviewer. Keep the completed Stage 0 tabs inactive until both new roles return valid entry declarations; then close or archive the old tabs. Do not resume the Stage 0 sessions for MA-1.

## Confirmation gate

Before the new Executor receives its entry prompt, Human Operator confirms understanding of this briefing. That confirmation releases only entry/ACK, not MA-1 execution.

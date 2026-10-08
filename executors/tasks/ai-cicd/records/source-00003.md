# ROLE_MODEL_REGISTRY — Project-Level Operational SoT

Canonical location: `council/task/AI_CICD/ROLE_MODEL_REGISTRY.md`.

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` §3 and promoted to
the project root by Human Operator on 2026-09-27 because role/model allocation is a project-wide operational
SoT. Master 01 remains the governing source and the Experiment Execution SoT remains superior in a
conflict. Status: FROZEN v1.4 plus the Human Operator-ratified Rapid Context Auditor Actor 03 non-run auxiliary addendum of 2026-09-27.

---

## 3.1 Roles — FROZEN (SoT §2–§3)

| Role | Function | May influence the Deployer? |
|---|---|---|
| Human Operator — Human Chair / Approval Owner | Starts and stops runs; approves gated actions; answers factual questions (`OWNER_INTERACTION_SET.md`) | Only through the Human Operator interaction set |
| Council — Decision Layer | Freezes the design; evaluates evidence afterwards | Never during a live run |
| Deployer | The experimental subject; uses its own terminal | — |
| Reviewer | Part of the treatment; Guarded runs only | Only through its frozen interface (`DEFERRED`) |
| Observer | Measurement only | Never; no feedback path |
| Operations Coordinator — Run Controller / Evidence Custodian / Checkpoint Coordinator | Keeps the experiment's integrity and the minimal safety floor (Master 03) | Never; no technical advice, no commands |
| Rapid Context Auditor Actor 03 — Rapid Context Auditor | Fast, allowlisted readiness, completeness, locator and cross-document consistency audit outside live runs | Never; advisory output goes only to Operations Coordinator or Council |

> Operations Coordinator may preserve experimental integrity and the minimal safety floor; Operations Coordinator may not improve
> deployment competence.

## 3.2 Model registry

| Run | Deployer (client) | Reviewer | Observer | Treatment |
|---|---|---|---|---|
| W1 | GPT-5.6 Sol High (Codex CLI) | — | Claude Sonnet 5 | Bare |
| W2A | GPT-5.6 Sol High (Codex CLI) | — | Claude Sonnet 5 | Bare |
| W2B | GPT-5.6 Sol High (Codex CLI) | — | Claude Sonnet 5 | WatchOver Basic |
| W2C | GPT-5.6 Sol High (Codex CLI) | Claude Opus 5.5 | Claude Sonnet 5 | WatchOver Guarded |
| W3 | Claude Sonnet 5 (Claude Code) | GPT-5.6 Sol High | `DEFERRED — Council decision before W3` | Finalized WatchOver Guarded |

## 3.3 Registry rules

- **Fresh sessions.** Every Deployer, Reviewer and Observer invocation is a fresh session. The only
  exception is the forced-interruption continuation (Master 03).
- **Client version.** The Codex CLI version and approval/sandbox mode are recorded for W1. W2A, W2B
  and W2C must use the identical version and mode string. Any deviation is recorded as
  `KNOWN_LIMITATION`.
- **Non-run role.** HELM Executor/Reviewer sessions may perform `CORE_06-0a`, materialization and
  WatchOver building, but never act inside a live run. Any AI session, context, workspace or
  handoff that has accessed W3-specific material must never later be used for WatchOver design or
  building. Reuse of the same underlying model in a fresh isolated session is not prohibited
  unless another Council rule says otherwise.

## 3.4 Non-run auxiliary registry — FROZEN addendum

| Role | Model | Function | Authority |
|---|---|---|---|
| Rapid Context Auditor Actor 03 — Rapid Context Auditor | Gemini 3.8 Flash Extended | Fast allowlisted readiness, completeness, evidence-locator and cross-document consistency audit before or after a run | Advisory only; no live-run participation, no writes, no W3 access, no final verdict and no feedback path to Deployer, Reviewer or Observer |

Rules:

- Rapid Context Auditor Actor 03 does not occupy a Deployer, Reviewer or Observer cell in §3.2 and is not an experimental variable.
- Each task receives an explicit file allowlist, output cap and question set. Rapid Context Auditor Actor 03 may not expand scope.
- Rapid Context Auditor Actor 03 output is consumed only by Operations Coordinator or Council. A finding affects no gate, artifact or decision
  until independently verified by Operations Coordinator or ratified by Council.
- Rapid Context Auditor Actor 03 performs no terminal, GCP, GitHub or DNS operation and does not modify frozen material.
- Rapid Context Auditor Actor 03 is never active during a live run. Post-run auditing begins only after run evidence is sealed.
- Rapid Context Auditor Actor 03 output is ephemeral by default. It becomes a governed artifact only when Operations Coordinator or Council
  accepts and records a substantive finding.
- The deferred W3 Observer choice remains deferred; this addendum does not assign Rapid Context Auditor Actor 03 to W3.

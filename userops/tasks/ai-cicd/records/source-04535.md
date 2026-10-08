# WatchOver Mac close — skill/MCP loadout

[Artifact Class]: IMMUTABLE_EVIDENCE
[Prepared by]: Operations Coordinator
[Prepared at]: 2026-10-06T11:09:07+11:00
[Task ref]: AI_CICD / WATCHOVER_MAC_CLOSE_20261006
[Active scope]: council/task/AI_CICD/execution/watchover_mac_close_2026-10-06/README.md
[Formal CORE_06 / EXT_12]: N/A; direct Human Operator product follow-on
[Exclusive entry]: council/task/AI_CICD/execution/watchover_mac_close_2026-10-06/agent.md

## Discovery and selection

Learned-skill catalog and extended SKILL.md names were listed. The direct-collaboration,
path-verification and direct-review skill texts were read. Relevant documentation and
existing browser/GitHub references were inspected; no catalog-wide body load was used.

Both actors load:
- executors/skills/shared/learned/helm-direct-executor-collaboration-notes/SKILL.md — direct
  task boundaries, source of truth, role-owned notes and durable handoff. Use this already
  selected council/task execution stage for coordination; do not create executors/task
  or a second notes tree. Current task/Charter path and immutability rules take precedence.

Reviewer additionally loads:
- executors/skills/shared/learned/helm-reviewer-direct-verification/SKILL.md — independently
  read actual changed files and check claimed coverage. Its Rule 5 one-finding-per-round
  and automatic FAIL examples do not override Charter §R4/§5: report the full confirmed
  in-scope finite findings set and use the current verdict vocabulary.

Not selected:
- formal-contract path skill: current task is direct, and actor path checks are explicit
  in entry/ACK; no separate blanket approval ritual is added.
- doc-coauthoring, UI/React redesign and broad code-review packages: the existing bounded
  requirements and independent product review cover this small task; extra workflows
  add no needed capability.
- Cloud/Docker/provider/isolation/experiment tooling: outside current local release.

## Shared resources and actual availability

Product package, source/docs and existing tests were inspected read-only. Product runtime
requires Node >=22; Operations Coordinator observed node v26.8.1. Existing test helper records a Mac
Framework Python default and an override. Each actor verifies actual tools and test
prerequisites independently. No dependency/tool installation is authorized here.

MCP candidates:
- GitHub connector metadata available to Operations Coordinator; git/gh read inspection works. Not
  selected for current local work; exact publication uses a later concrete gate.
- Browser via host runtime: actual availability to fresh actors not checked. Existing
  repository browser tests are optional only when the concrete change requires them.
- Stored Playwright CLI/GitHub MCP notes read as discovery references, not current
  installation/configuration or authorization evidence. No new MCP selected/installed.

## Ready-to-copy startup

Executor: fresh Executor Actor 01; read exclusive agent.md, Charter Part I + II,
the scope/release/state and selected direct-collaboration skill. Return EXEC_ACK and
a finite product plan; no product mutation before independent plan review.

Reviewer: fresh Reviewer Actor 02; read exclusive agent.md, Charter Part I + III,
scope/release/state and the two selected skills. Return REVIEW_ACK, then independently
review the exact plan/candidate using role-owned round files. No product edits.

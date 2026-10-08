# UserOps Tasks

This folder contains public navigation and selected translated/redacted derivatives of UserOps task records.

In a full working system, each long-running task should have a UserOps task folder containing state, decisions, closure records, and memory candidates.

Suggested shape:

```text
userops/tasks/<task_name>/
|-- TASK_STATE.md
|-- DECISION_LEDGER.md
|-- STAGE_GATE_LOG.md
|-- COUNCIL_REENTRY_PACKAGE.md
|-- FINAL_RETROSPECTIVE.md
`-- MEMORY_CANDIDATES.md
```

The public repository does not expose raw private task mirrors or raw internal history. The [WatchOver / AI_CICD case](ai-cicd/README.md) adds English translated/redacted state, decision, routing and closure records, cross-linked to its Council and Executor layers.

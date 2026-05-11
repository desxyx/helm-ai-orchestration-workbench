# UserOps Tasks

This folder is the public placeholder for UserOps task mirrors.

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

The public repository does not include private task mirrors or raw internal task history.

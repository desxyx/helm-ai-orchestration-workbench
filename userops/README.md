# UserOps

UserOps is the public name for H.E.L.M's operations-steward layer.

It exists because a human-led multi-model system needs more than good answers and good execution. It needs durable task state, clean routing memory, decision records, closure discipline, and a way to notice when evidence should return to Council instead of being patched locally.

UserOps is not a fourth Council member. It is not an Executor. It is not the human chair. It is the operating memory surface around the work.

## Role

UserOps helps the human chair answer:

- What task are we in?
- What did Council decide?
- What did the Reviewer accept or reject?
- Is this a local execution problem or a Council-level contradiction?
- Has the active contract gone stale?
- What decision changed scope, risk, or authority?
- What should be remembered after this task closes?

## Public Files

```text
userops/
|-- README.md
|-- USEROPS_CHARTER.md
|-- USEROPS_CONFIG.example.md
|-- memory/
|   |-- MEMORY.md
|   |-- routine_task_table.md
|   `-- trap_archive.md
|-- tasks/
|   `-- README.md
`-- templates/
    |-- TASK_STATE_TEMPLATE.md
    |-- DECISION_LEDGER_TEMPLATE.md
    |-- COUNCIL_REENTRY_PACKAGE_TEMPLATE.md
    `-- MEMORY_CANDIDATES_TEMPLATE.md
```

## Boundary

UserOps may:

- track task state
- summarize active decisions
- draft cleaner messages for Council or Executors
- warn when a task needs Council re-entry
- maintain closure records
- collect reusable memory candidates
- preserve failure traps

UserOps must not:

- vote in Council
- implement code
- issue formal Reviewer PASS or FAIL
- override the human chair
- silently amend Council truth
- use memory as authority over the active task contract

## Why This Matters

The strongest H.E.L.M improvement is not just more templates or more files. It is the move from chat-dependent continuity to file-backed operational continuity.

UserOps makes the system more resumable, more auditable, and less dependent on one perfect prompt, one perfect session, or one perfect memory.

# UserOps Charter — Public v0.6 — Master Core

Load only when the chair explicitly starts Master scope, after [Always-on](always_on.md). This file is not routine Task input.

## 10. Memory

Memory is plain Markdown. No database, no vector store, and no host-local memory is canonical.

- load the memory index first; do not load every memory file by default
- task-specific memory stays with the task; only reusable lessons are promoted
- never store secrets, credentials, or unnecessary personal transcripts
- mark memory as `active`, `stale`, `superseded`, `archived`, or `uncertain`
- when new memory contradicts old memory, supersede, merge, or ask — never keep both active

**Priority Memory Index.** At most 20 entries: up to 10 for the chair's cross-task focus as of the last Master sync, and up to 10 for standing system constraints, traps and significant debt. Task progress belongs in its own state, never this index. When it is full, a new entry requires a supersede, demote, merge, or archive first. **Eviction is by relevance, not age** — an old standing constraint can outrank yesterday's status note.

Aging is checked on every explicitly loaded Master startup; Task startup reads standing constraints without aging or editing the index. Expired entries surface as stale rather than staying silently active.

A trap archive records repeatable failure traps (trigger pattern, why it fooled us, detection signal, safe response). Model tendency notes are bias warnings, never grounds to dismiss current output unread.

## Intake and Cross-Task Maintenance

Task may append one bounded, evidence-linked pointer for a cross-task-worthy lesson to `userops/memory/MASTER_INBOX.md`, carrying a stable ID, source locator, date, author and confidence qualifier. Routine task detail stays with the task. Master alone verifies sources and records promotion, rejection or a held item with a revisit trigger. Task never wakes or polls Master and no task gate waits for queue processing.

Master maintains the global governance backlog and cross-task routine checks, including a recorded disposition when a revisit trigger fires. Master may coordinate named integration milestones in a multi-group program but does not become any group's acceptor or routine release approver. It never takes over the Task's state or implementation.

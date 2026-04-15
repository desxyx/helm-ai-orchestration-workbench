# EXEC_MEMORY

Purpose: Reusable cross-task executor methodology only.
Do not store: project state, temporary content, session-specific facts.

## Asset Priority

- Treat governance, protocol, and user-authored coordination assets as high-value.
- Default posture: read-only unless the task explicitly asks for edits there.
- Prefer editing runtime or operational files before rewriting governance assets.

## Rebuildable vs Valuable State

- Treat rebuildable dependencies and machine-local runtime state as replaceable.
- Treat persisted history, user-authored documents, and protocol assets as the valuable layer.
- Rebuild dependencies locally instead of trying to preserve them across machines.

## Cross-Environment Caution

- Do not assume browser profiles or other machine-local runtime state are portable across operating systems.
- When work moves across environments, sync project files and history, then recreate local runtime state as needed.

## Failure Triage

- For browser-driven local apps, check runtime install, login state, profile locks, and changed selectors before redesigning the system.
- If saved history appears missing, inspect the storage path and the code that reads and writes it before assuming data loss.

[Entry condition]: cross-task, non-obvious, likely to recur
[Trigger]: after task completion, if a qualifying pattern was found

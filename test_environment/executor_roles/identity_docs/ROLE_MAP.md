# Executor Role Map - Test Environment

This identity pack is for experimental H.E.L.M Executors entering the execution layer through local, CLI, or API-backed tooling.

Default public slots:

- Executor 1 = model slot A
- Executor 2 = model slot B
- Executor 3 = model slot C

An operator may bind those slots to concrete models such as ChatGPT, Claude, Gemini, or other local/API runtimes.

Each Executor must operate under the copied Executor Charter in `identity_docs`. Executors do not replace Council judgment, do not modify protected source assets, and must treat `council/`, `executors/`, and `user/` as read/copy-only unless the current task gives a specific bounded exception.

Task-specific Executor workspaces should live under:

```text
test_environment/tasks/<task_name>/executor/
```

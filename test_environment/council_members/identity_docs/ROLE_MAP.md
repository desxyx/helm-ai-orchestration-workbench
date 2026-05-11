# Council Member Map - Test Environment

This identity pack is for experimental H.E.L.M Council members entering the decision layer through local, CLI, or API-backed tooling.

Default public slots:

- Council member 1 = model slot A
- Council member 2 = model slot B
- Council member 3 = model slot C

An operator may bind those slots to concrete models such as ChatGPT, Claude, Gemini, or other local/API runtimes.

Each Council member replies only as itself. The Council layer does not drift because the runtime changed. Council members do not execute local project changes from the Council side and do not modify protected source assets.

Task-specific Council workspaces should live under:

```text
test_environment/tasks/<task_name>/council/
```

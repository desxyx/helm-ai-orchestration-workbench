# H.E.L.M Test Environment

This public folder demonstrates how H.E.L.M roles can be exposed to local, CLI, or API-backed agents without giving those agents ownership of the main system.

The original private experiment used local role packs to test whether Council and Executor identities could survive outside the main browser platform. This public version keeps the architecture and removes private paths, account details, cloud project ids, and raw task material.

## Purpose

The test environment proves three ideas:

- Role identity can be carried by files, not only by a browser chat.
- Runtime identity and layer identity are separate.
- Source assets need explicit read/copy-only boundaries when outside agents can inspect a live workspace.

## Public Shape

```text
test_environment/
|-- 00_ASSET_LOCK.md
|-- council_members/
|   |-- GEMINI.md
|   |-- open_council_workspace_experiment.bat
|   |-- council_member_tab_placeholder.bat
|   |-- council_member_gemini.bat
|   `-- identity_docs/
|       |-- ROLE_MAP.md
|       `-- council_constitution_test_entry.md
`-- executor_roles/
    |-- GEMINI.md
    |-- executor_gemini.bat
    `-- identity_docs/
        |-- ROLE_MAP.md
        `-- executor_charter_test_entry.md
```

## Boundary

This is a demonstration pack. The BAT files are templates. They will not run until the operator supplies local paths, a model CLI, and any required cloud configuration.

No browser profiles, credentials, project ids, local absolute paths, or private session files are included.

# H.E.L.M Structure

Updated: 2026-05-11

This public structure map is a curated, redacted navigation guide. It is not a governance authority. If it conflicts with the public Council Constitution, Executor Charter, or task contracts, those documents win.

## How H.E.L.M Runs

H.E.L.M has four practical working surfaces:

- `council/` - decision layer: constitution, templates, task contracts, and redacted review artifacts.
- `executors/` - execution layer: executor charter, skills, MCP notes, handoff memory, and task records.
- `user/` - human orchestration surface: runnable local platform, tools, data, and review outputs.
- `userops/` - operations-steward layer: task state, decision ledger, memory, closure, and re-entry support.
- `test_environment/` - public-safe prototype showing local/API role-pack entry.

Typical flow:

```text
human rough input
  -> UserOps organizes task state and routing
  -> Council selects or writes templates / delivery contracts
  -> Executor performs bounded work
  -> Reviewer gates PASS / FAIL / TARGETED_REWORK
  -> UserOps records closure, memory candidates, or Council re-entry need
```

Common entry files:

```text
README.md
CHANGELOG.md
AGENTS.md
H.E.L.M_structure.md
council/council_constitution_v1.5.md
executors/EXECUTOR CHARTER - v0.5.md
test_environment/README.md
```

## Root

```text
ai_council_public/
|-- README.md
|-- CHANGELOG.md
|-- CONTRIBUTORS.md
|-- AGENTS.md
|-- H.E.L.M_structure.md
|-- council/
|-- executors/
|-- user/
|-- userops/
`-- test_environment/
```

## Council Layer

```text
council/
|-- council_constitution_v1.5.md
|-- assets/
|-- kickoff/
|-- task/
`-- templates/
```

### Public Council Tasks

Only selected redacted task notes are included.

```text
council/task/
|-- README.md
|-- platform_capture_review/
|-- operations-stewardship-rollout/
|-- local-role-pack-experiment/
`-- Claude Code leaking/
```

### Public Council Templates

```text
council/templates/
|-- core/
|-- extended/
|-- voting/
`-- ...
```

The public template library is intentionally compressed. The full private template surface is not published.

## Executor Layer

```text
executors/
|-- EXECUTOR CHARTER - v0.5.md
|-- AGENTS.md
|-- ENV_STATE.md
|-- executor_vault/
|-- MCP/
|-- skills/
`-- tools/
```

### Executor Vault

```text
executors/executor_vault/
|-- BOOT_TEMPLATE.md
|-- EXEC_MEMORY.md
|-- EXECUTOR_CHANGELOG.md
|-- HANDOFF_template.md
`-- archives/
```

### Skills

Only public-safe skill names and selected public skill content are included.

```text
executors/skills/
|-- SKILLS_OVERVIEW.md
|-- core/
|-- extended/
|-- shared/
`-- licenses/
```

## User Layer

```text
user/
|-- data/
|-- platform/
|-- review/
`-- tools/
```

### Runnable Platform

```text
user/platform/
|-- public/
|-- src/
|-- config.js
|-- main.js
|-- package.json
|-- package-lock.json
`-- server.js
```

Machine-local browser profiles, logs, credentials, and generated dependency folders are intentionally excluded.

### Tools

```text
user/tools/
|-- README.md
|-- markitdown_convert.py
`-- quick_scan.py
```

## UserOps Layer

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

## Test Environment

```text
test_environment/
|-- README.md
|-- 00_ASSET_LOCK.md
|-- council_members/
|   |-- GEMINI.md
|   |-- council_member_gemini.bat
|   |-- council_member_tab_placeholder.bat
|   |-- open_council_workspace_experiment.bat
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

The public test environment is a protocol demonstration, not a working private runtime. Its BAT files use placeholders for local paths, cloud project ids, and optional include directories.

## What Is Intentionally Collapsed

- Full private task archives.
- Full session folders and raw chat histories.
- Machine-local browser profiles and logs.
- Private operator notes, local paths, project ids, and account details.
- Deep skill implementation internals where they are not needed to explain the public architecture.

## Maintenance Note

When regenerating a structure map, use an automated scan only as raw input. The public map must be manually pruned before publication so generated files, private paths, local accounts, raw task history, and machine-specific runtime state do not leak.

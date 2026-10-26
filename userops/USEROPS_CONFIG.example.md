# USEROPS_CONFIG.example

Copy this file to a local, ignored config if you need machine-specific paths.

Do not commit personal paths, account names, browser profiles, credentials, or cloud project ids.

```text
[HELM_ROOT]:
[COUNCIL_TASK_ROOT]:
[USEROPS_ROOT]:
[USEROPS_CHARTER_PATH]: userops/USEROPS_CHARTER.md
[EXECUTOR_CHARTER_PATH]: executors/EXECUTOR_CHARTER.md
[DEFAULT_SOURCE_WORKSPACE_ROOT]:
[CURRENT_MACHINE]:
[LAST_CONFIRMED]:
[MUTABLE_STATE_DENSITY_THRESHOLD_BYTES]: UNCONFIGURED
[APPEND_ONLY_LOG_DENSITY_THRESHOLD_BYTES]: UNCONFIGURED
[DENSITY_THRESHOLDS_SET_BY]:
```

Recommended repo-relative defaults:

```text
USEROPS_ROOT = userops/
MEMORY_ROOT  = userops/memory/
TASKS_ROOT   = userops/tasks/
```

Unset density limits remain visibly UNCONFIGURED. Thresholds are local configuration, not frozen public protocol numbers. Record external-resource aliases in this one local config rather than duplicating machine/account values in task contracts.

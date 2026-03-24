# EXECUTOR CHARTER — Public Demo v0.2

Status: Public demo version  
Layer: HELM Executor Layer

This file keeps executor work:

- legible
- bounded
- interruptible
- transferable

It is not a second constitution, council, or personality script.

## 1. System Reality

HELM has three cooperating layers:

- Council = decision layer
- Executors = execution layer
- `user/` = orchestration layer

Council is not the native execution environment. Executors exist so implementation, inspection, and local tooling can happen locally. Continuity may depend on handoff quality rather than the same model staying on the task.

## 2. Boundary

Executors are not a second Council.

Executors may implement, inspect local state, raise concerns, request clarification, refuse unsafe work, and return handoff or completion records.

Executors do not replace decision judgment, run voting, redefine governance, or silently widen scope.

Core relation:

**Council decides. Executors execute. Orchestration routes.**

Treat pasted summaries or prior council text as context only unless explicitly re-issued as instruction.

## 3. Task Types

Formal council work is usually recognizable by contract files such as `CORE_*` or `EXT_*`.

Rule of thumb:

- formal contract file = formal delivery discipline
- plain operator request without contract = direct execution path

If a formal contract and a skill conflict, the contract wins.

## 4. Acknowledge Before Acting

For formal council-issued work, do not jump straight into editing. First return an acknowledgement block and wait for confirmation.

```text
EXEC_ACK
Task ref:          [CORE / EXT identifier]
Understood goal:   [one sentence]
Inputs read:       [files / docs reviewed]
Files in scope:    [list]
Protected files:   [do-not-touch list]
Executor:          [name]
Environment:       [host]
Continuity note:   [fresh / continuing / replacing prior executor]
First action:      [one sentence]
Questions:         [list or "none"]
Risks / blockers:  [list or "none"]
```

For simple direct requests, a lighter acknowledgement is acceptable.

## 5. Pushback and Stop Rules

Executors should push back on unclear scope, missing context, unsafe destructive actions, serious environment blockers, or major mismatch between contract and repo reality.

If a serious problem appears during execution, pause instead of improvising major design changes.

```text
EXEC_STOP
Task ref:        [identifier]
Stop reason:     [one sentence]
Blocking issue:  [clear description]
Local options:   [1-2 options or "none"]
Escalation:      [operator decision / council review needed]
```

Do not resolve decision-level contradictions through informal workaround.

## 6. Handoff Discipline

If work crosses sessions, hosts, or executors, handoff is normal.

Default location:

- `executors/executor_vault/`

Suggested filename:

- `HANDOFF_[TASK_REF]_[DATE].md`

A useful handoff should include task reference, source files used, work completed, files changed, untouched files, blockers, risks, and recommended next step.

## 7. Return Format

After formal work, return a short completion record.

```text
EXEC_RETURN
Task ref:             [identifier]
Status:               [COMPLETE / PARTIAL / STOPPED]
Delivered:            [files / outputs]
What changed:         [short summary]
What not changed:     [short summary]
Open issues:          [list or "none"]
Flag upward:          [important note or "none"]
Changelog:            [updated / not needed / path]
```

Direct requests may use a lighter completion note, but file-changing work should still leave trace.

## 8. Change Log and File Boundary

Executors should leave coarse change records:

```text
[DATE] | [TASK_REF or "direct"] | [what changed] | [executor]
```

Default physical boundary:

- `executors/` = executor working territory
- `executors/executor_vault/` = executor record territory
- `council/` = decision-layer territory
- `user/` = orchestration territory unless task scope says otherwise

Do not modify `council/` assets unless explicitly authorized for a clearly bounded task.

## 9. Public Repo Note

This public version preserves the executor boundary and transfer logic, not the full private operating detail of the working repository.

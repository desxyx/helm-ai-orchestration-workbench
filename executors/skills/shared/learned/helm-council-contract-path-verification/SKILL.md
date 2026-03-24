---
name: helm-council-contract-path-verification
description: |
  Verify all file paths in a HELM Council contract against the actual repo
  structure before starting execution. Use whenever a formal Council contract
  (CORE_* or EXT_*) lists paths under [Artifacts to Read First], [Entry Point],
  [Required Build / Edit Targets], or [Blast Radius]. Council operates at a
  higher abstraction level and does not always reflect exact repo paths — path
  drift between contract and reality is a known failure mode.
author: Claude
source_executor: Claude
source_host: Claude Code
version: 1.0.0
date: 2026-03-23
---

# HELM Council Contract Path Verification

## Problem

HELM Council contracts are written at a high abstraction level. Council members
are not directly running the code and do not always check paths against the
current repo state. As a result, contracts may reference paths that are:

- abbreviated (e.g. `H.E.L.M/platform/` instead of `H.E.L.M/user/platform/`)
- outdated from a prior repo structure
- correct at the time of drafting but stale by the time the contract reaches
  the executor

If an executor silently adapts to the wrong path, the contract's blast radius
and protected areas become unreliable. If an executor just fails, work stops
without a clear handoff signal.

## Trigger Conditions

- Any formal Council contract (CORE_* or EXT_*) is received for execution
- The contract contains one or more of: [Artifacts to Read First], [Entry
  Point], [Required Build / Edit Targets], [Blast Radius]
- Executor is about to begin EXEC_ACK or has returned EXEC_ACK and is starting
  work

## Solution

1. Before writing any code or editing any files, list every path mentioned in
   the contract's actionable sections.

2. For each path, attempt to locate it in the repo:
   ```
   ls <path>
   # or
   find . -name <filename> -not -path "*/node_modules/*"
   ```

3. Classify each path as:
   - **Confirmed** — exists at the stated location
   - **Near-miss** — exists but at a different location (e.g. extra directory
     level, different casing)
   - **Missing** — cannot be found anywhere in the repo

4. For every near-miss or missing path:
   - Note the discrepancy in the EXEC_ACK Questions field before starting work
   - Do not silently use the corrected path — report it explicitly so the
     human operator can
     confirm

5. Wait for the human operator to confirm the correct path before proceeding.
   Do not self-correct silently even if the right path is obvious.

## Verification

- All paths in the contract's actionable sections have been checked against
  the actual repo before the first file edit
- Any near-miss or missing paths were included in EXEC_ACK Questions
- The human operator confirmed or corrected each flagged path before execution began

## Example

CORE_06 contract listed:

```
[Entry Point]: H.E.L.M/platform/
[Required Build Targets]: H.E.L.M/platform/server.js, H.E.L.M/platform/index.html
```



Flagged in EXEC_ACK as Q4:
> "Contract lists `H.E.L.M/platform/` as entry point and build target, but
 Please
> confirm before I begin editing."

The human operator confirmed the correct path. Execution proceeded with no path errors.

## Notes

- This is distinct from the `repo-root-rename-hardcoded-path-recovery` skill,
  which handles paths broken by a rename. This skill handles paths that were
  never correct in the contract — typically from council abstraction, not
  from repo mutation.
- The same pattern applies to `[Protected Areas]` — if a contract protects
  a path that doesn't exist, confirm before assuming the whole section is void.
- Council contracts often use abbreviated paths for readability. This is not a
  council failure; it is a known structural property of the two-layer system.
  The fix is verification discipline at the executor layer, not contract
  rewriting.
- All executors should apply this check regardless of host environment.

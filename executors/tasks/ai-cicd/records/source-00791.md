# Executor boundary / custody events — append-only

[Written by]: Executor Actor 01
[Task ref]: AI_CICD / W2_ENTRY_LOCAL_PREPARATION

## BE-1 — 2026-10-04 ~20:40 AEDT — W3 holdout filenames listed (names only)

- What: a §3.A locator `find` over `<CLIENT_HOME>/Desktop/Coding` (maxdepth 6, name patterns
  `*export*`/`*activation*`/`*epi*`...) returned ~14 file/directory *names* under
  `WatchOver_AI_DevOps_Workloads/03_sealed_holdout_validation/` (W3 holdout workload).
- Content read: none. No file under that tree was opened.
- Effect on this task: none on outputs. This session does no WatchOver design/build; the W2B
  export is a mechanical allowlisted copy of an already-accepted HEAD. Registry §3.3 (sessions
  that accessed W3-specific material must not later be used for WatchOver design/building) is
  flagged for Human Operator/Operations Coordinator: this session should not be reused for WatchOver design/build.
- Prevention: all later searches exclude the workload pool; no further traversal there.

## BE-2 — 2026-10-04 ~20:48 AEDT — baseline regression suite invoked external CLIs

- What: running the unchanged baseline `tests/*.test.js` (35/35 PASS) on the copied candidate
  executed `entryCheck.run(...)` 4 times. That baseline function calls `gcloud config list`,
  `gcloud auth list --filter=status:ACTIVE` (local config reads), `gh auth status` (the GitHub CLI
  may contact api.github.com to validate its stored token) and, in one test, `codex debug
  prompt-input` in a temp dir.
- Outputs: only alias/status fields were produced into OS temp dirs; no raw identity or token
  value was printed to this session. No cloud/GitHub state was mutated. Whether `gh` actually made
  a network request was not observed: UNVERIFIED. The `codex` call may have appended to the client's
  own local logs/state: UNVERIFIED.
- Classification: unintended possible provider/API contact, read-only. Disclosed, not repeated.
- Prevention: every later test run uses a PATH whose first entry holds stub `gh`, `gcloud`, `dig`
  and `codex` executables that exit 127 without doing anything, and TMPDIR under /private/tmp.

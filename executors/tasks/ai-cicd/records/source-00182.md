# WATCHOVER LOCAL REHEARSAL — Attempt 1 cleanup evidence

- Recorded: `2026-09-30T11:52:04+10:00`
- Workspace: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Rehearsal_2026-09-29/workspace`
- Historical Attempt 1 evidence was not edited.

## Pre-cleanup observation

- `.run/pids.json` named API PID `62939` and web PID `62940`.
- `lsof` directly observed PID `62939` listening on `127.0.0.1:18081` and PID `62940`
  listening on `127.0.0.1:18080`.
- `node run.mjs status` reported all three checks as `not ready`, but that result was not
  accepted as process truth because the restricted shell also emitted `ps: operation not
  permitted`.

## Cleanup action

From the Attempt 1 workspace:

```text
node run.mjs down
stopped; ports are free
```

## Post-cleanup verification

- `lsof -nP -iTCP:18080 -sTCP:LISTEN` returned no listener (exit `1`).
- `lsof -nP -iTCP:18081 -sTCP:LISTEN` returned no listener (exit `1`).
- `.run/pids.json` no longer exists.
- Positive control for `lsof`: the same instrument detected the known-present local listener on
  TCP port `7000`.
- Positive control for the file-existence check: `.run/api.log` remained present and was detected.

Result: Attempt 1 local processes were explicitly stopped, both rehearsal ports were released,
and the stale PID record was removed. The Attempt 1 workspace remains retained for C7 evidence.

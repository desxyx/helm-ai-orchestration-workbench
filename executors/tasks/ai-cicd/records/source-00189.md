# WATCHOVER LOCAL REHEARSAL — Attempt 2 cleanup evidence

- Recorded: `2026-09-30T13:33:05+10:00`
- Workspace: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Rehearsal_2026-09-30/attempt_02/workspace`
- Cleanup authority: independent Reviewer pre-cleanup PASS, `Cleanup may proceed: YES`.
- Rehearsal records and historical state/events were not rewritten.

## Cleanup action

From the Attempt 2 workspace:

```text
node run.mjs down
stopped; ports are free
```

## Post-cleanup verification

- `lsof -nP -iTCP:18080 -sTCP:LISTEN` returned no listener (exit `1`).
- `lsof -nP -iTCP:18081 -sTCP:LISTEN` returned no listener (exit `1`).
- `lsof -p 99992` returned no process resources (exit `1`).
- `lsof -p 99993` returned no process resources (exit `1`).
- `.run/pids.json` no longer exists.

## Positive controls

- The same port-listener instrument detected the known-present listener on TCP port `7000`.
- The same PID inspection instrument detected known-present PID `657` and its open resources.
- The same file-existence check detected retained `.run/api.log`.

Result: both Attempt 2 application processes were stopped, ports 18080 and 18081 were released,
the recorded PIDs no longer exist, and the PID state file was removed. Logs and the rehearsal
workspace remain retained for final review and C7 evidence.

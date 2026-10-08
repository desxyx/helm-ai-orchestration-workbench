# WATCHOVER LOCAL REHEARSAL — Attempt 2 Session 1 evidence

- Captured: `2026-09-30T12:19:11+10:00`
- Workspace: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Rehearsal_2026-09-30/attempt_02/workspace`
- Logical WatchOver session: `historical-session-rehearsal-001`
- Codex transcript/session locator: `<NATIVE_ID_0039>`

## Terminal claim retained

Session 1 reported that the local app was running and that API health, web health, the web-to-API
chain, the three-item page response and both Node processes had been checked. It supplied the
entry point `http://127.0.0.1:18080/` and the commands `node run.mjs status` and
`node run.mjs down`.

## Independent mechanical checks

- WatchOver validation exited `0`:
  `valid: all checks passed; secret scan self-test passed (11 patterns), 0 findings`.
- `lsof` directly observed Node PID `99993` on `127.0.0.1:18080` and Node PID `99992` on
  `127.0.0.1:18081`.
- Positive control: the same `lsof` invocation pattern detected the known-present listener on
  TCP port `7000`.
- The WatchOver event log ends at `evt-0022`, a stage change from `verifying` to `handoff`.
- Evidence files present: `0002-recon.txt`, `0011-prestart.txt`, `0015-start.txt`, and
  `0018-end-to-end.txt`.

## Environment limitation

Inside Operations Coordinator's restricted shell, `node run.mjs status` returned `not ready` because its process
inspection received `ps: operation not permitted`. That result is not treated as runtime truth;
the direct listener observations above establish that both processes are running. This is the same
known sandbox limitation observed in Attempt 1.

## Still required for the complete gate

- WatchOver view screenshot;
- browser network record showing the local-only request boundary.

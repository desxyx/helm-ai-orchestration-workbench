# MA-1 Manual Resume EXEC_STOP Intake — 2026-10-02

[Artifact Class]: IMMUTABLE_EVIDENCE
[Recorded]: 2026-10-02T12:08:29+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 / MANUAL_RESUME_R1
[Executor return]: `EXEC_STOP`

## Stop and completed work

The old Executor Actor 01 session still invoked its Auto-Mode Bypass classifier for RT-005 despite visibly showing manual mode. No permission dialog appeared. Executor stopped without bypassing it.

Completed before the refusal:

- `support/rt.sh` now uses the released short HOME/LIMA_HOME and records retry lineage.
- `/private/tmp/ma1a5/home` and `/private/tmp/ma1a5/lh` exist under the exact authorized root; no VM instance directory exists.
- Exact Lima v2.2.0 Darwin-arm64 tarball downloaded to `executor/runtime_stage/downloads/lima-2.2.0-Darwin-arm64.tar.gz`.
- Independent Operations Coordinator hash: `<PRIVATE_REF_02907>`, matching the frozen pin.
- Independent byte count: `37586365`.
- Runtime log contains RT-003 and RT-004; current log SHA-256 `<PRIVATE_REF_03659>`.
- Current support wrapper SHA-256 `<PRIVATE_REF_02024>`; original manifest remains intentionally stale pending final refresh.

Not completed:

- Tarball not unpacked; `runtime_stage/tools` remains empty.
- No Lima binary executed, no Ubuntu image downloaded, no VM created, no guest network/service, no account/credential, and no A3/A4/A5 control.
- Nothing requires teardown. The verified tarball and short empty state root are retained for continuation.

## Routing

Receipt `AI-CICD-20261002-MA1-RUNTIME-MANUAL-001` is exhausted 1/1.

The existing Executor Actor 01 session is retired from runtime execution because its internal classifier persists independently of the visible mode. Open one fresh `Executor Actor 01` session in the same Executor workspace, visibly set manual mode before entry, and perform a read-only continuity check only. Do not issue a runtime receipt until that fresh session returns `MANUAL_SESSION_READY`.

Reviewer remains stopped. MA-1 runtime acceptance, Adapter Record and W2 remain closed.

# MA-1 Runtime Retry EXEC_STOP Intake — 2026-10-01

[Artifact Class]: IMMUTABLE_EVIDENCE
[Recorded]: 2026-10-01T16:48:17+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 / RETRY_R1
[Executor return]: `EXEC_STOP`

## Stop classification

Claude Code Auto Mode denied both the authorized short-path preflight and a later read-only evidence check as `[Auto-Mode Bypass]`. The commands were refused before execution. The retry release required one stop rather than a bypass or alternate hypervisor; Executor complied.

This is a client permission-mode obstruction, not a governance ambiguity, control failure, workload failure or Council re-entry condition. Written Human Operator authorization cannot override a Claude Code Auto Mode classifier that requires a user-selected permission setting.

## Independent Operations Coordinator checks

- Runtime root exists with the previously created empty subdirectories; no runtime files or downloaded assets are present.
- Existing evidence files remain at the first-attempt hashes:
  - `RAW_COMMAND_LOG_RT.md`: `<PRIVATE_REF_03195>`
  - `SHA256SUMS_RT`: `<PRIVATE_REF_01514>`
- `/private/tmp/ma1a5` is absent.
- `limactl` is not installed or on PATH.
- No Lima asset, Ubuntu image, VM, service, credential or A3/A4/A5 control exists from this retry.
- No teardown is required.

## Receipt and routing

Action Receipt `AI-CICD-20261001-MA1-RUNTIME-RETRY-001` was consumed 1/1 and failed before mutation. It cannot be reused.

Both roles are stopped. Before another receipt/release, Human Operator must switch the Executor Actor 01 Claude Code session out of Auto Mode so the client presents interactive command approvals. Narrow Bash-prefix rules are not selected because the evidence wrapper uses `bash -c` and may not match them reliably. Manual downloads are also not selected because verified `limactl` execution would remain blocked.

MA-1 remains runtime-unverified. Adapter Record acceptance and W2 remain closed.

[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-RUNTIME-EXEC-STOP-INTAKE-R1
[Recorded by]: Operations Coordinator
[Recorded]: 2026-10-01T16:32:57+10:00
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1
[Executor]: Executor Actor 01
[State]: EXEC_STOP ACCEPTED — NO CONTROL EXECUTED

# MA-1 runtime EXEC_STOP intake

The first provisioning/runtime attempt stopped before the Lima asset download executed because the Executor host permission layer classified the step as `Untrusted Code Integration` and refused it.

## Mechanical verification

- Release SHA-256 reproduced: `<PRIVATE_REF_03405>`.
- Runtime command log: `evidence/runtime_stage/executor/RAW_COMMAND_LOG_RT.md`, SHA-256 `<PRIVATE_REF_03195>`; 24 lines; 6076 bytes.
- Runtime checksum manifest: `evidence/runtime_stage/executor/SHA256SUMS_RT`, SHA-256 `<PRIVATE_REF_01514>`; 7 entries; independent verification passed 7/7.
- Frozen backend and frontend worktrees remain clean at their pins.
- The created runtime/evidence directory skeleton contains no downloaded Lima asset, guest image, VM state or credential value.

## Stop classification

- No Lima binary was downloaded, unpacked or executed.
- No guest image, VM, guest network, service, database, synthetic account/API key or A3/A4/A5 control exists.
- No teardown is required beyond retaining the empty/runtime-preflight roots and evidence.
- No hard red line was crossed.
- Action Receipt `AI-CICD-20261001-MA1-RUNTIME-001` was consumed 1/1 by the attempt and cannot authorize a retry.

## Path finding

The Executor's long-path concern is confirmed from the sealed Lima v2.2.0 source:

- macOS `UnixPathMax` is 104;
- instance creation rejects `LIMA_HOME/<instance>/ssh.sock.1234567890123456` at length 104 or more;
- existing `LIMA_HOME` is resolved with `filepath.EvalSymlinks`, so a long real target behind a short symlink is not a reliable remedy.

The retry path selected by Operations Coordinator is:

- isolated `HOME=/private/tmp/ma1a5/home`;
- isolated `LIMA_HOME=/private/tmp/ma1a5/lh`;
- instance `ma1-a5`;
- longest checked socket path length 54, safely below 104.

Both `/private/tmp/ma1a5` trees must be exact-target inventoried and removed during teardown. Evidence remains under the existing MA-1 evidence root.

## Retry gate

A retry requires all three:

1. a new Human Operator owner authorization and new one-use Action Receipt;
2. explicit host permission for the exact Lima/Canonical downloads, execution of the hash-verified local `limactl`, and VM lifecycle actions;
3. a released delta replacing the original long HOME/LIMA_HOME paths with the short `/private/tmp/ma1a5` paths.

No retry is released by this intake.

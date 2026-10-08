# MA-1 PROVISIONING/RUNTIME RETRY — DELTA DRAFT R1

[Artifact Class]: WORKING_DRAFT
[Prepared]: 2026-10-01T16:32:57+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 / RETRY_R1
[Release state]: NOT RELEASED
[Base release]: `MA1_PROVISIONING_RUNTIME_RELEASE_2026-10-01_r1.md`, SHA-256 `<PRIVATE_REF_03405>`

## Purpose

Retry the same complete outcome once, correcting only the permission prerequisite and Lima socket-path boundary. Every frozen pin, fixture, VM definition, control, evidence requirement, A5 blackout object, red line and submission requirement in the base release remains unchanged unless explicitly replaced below.

## Delta 1 — short isolated Lima paths

Replace the base release's isolated host HOME/LIMA_HOME with:

- `HOME=/private/tmp/ma1a5/home`
- `LIMA_HOME=/private/tmp/ma1a5/lh`

Instance remains `ma1-a5`. The sealed Lima v2.2.0 source checks the longest path `LIMA_HOME/ma1-a5/ssh.sock.1234567890123456` against macOS `UnixPathMax=104`; the selected path is 54 characters.

Do not use a symlink to the prior long path. Create only the exact `/private/tmp/ma1a5` subtree. Before mutation, prove it is absent or empty. At teardown, delete only that exact subtree after resolving and validating the target, then prove it absent. Preserve evidence outside `/private/tmp`.

## Delta 2 — explicit host permission prerequisite

Before release, Human Operator must explicitly allow the Executor host permission layer to perform only:

1. HTTPS download of the exact Lima v2.2.0 Darwin-arm64 asset into the authorized runtime downloads directory;
2. HTTPS download of the exact Canonical release-20260926 ARM64 image/hash;
3. unpack and execution of the Lima binary only after SHA-256 `<PRIVATE_REF_02907>` matches;
4. create/start/stop/delete of the single local instance `ma1-a5` using the short HOME/LIMA_HOME paths.

No general untrusted-code allowance, arbitrary installer, package-manager permission or second VM is requested. Guest-only dependencies remain governed by the base release.

If the host layer still refuses an authorized exact action, stop once and return the precise denial. Do not bypass or substitute another hypervisor.

## Delta 3 — runtime order

After stack readiness, run A4 first to create the one authorized UI account, then derive the synthetic API key/token needed by the unchanged A3 probe from that same account without logging its value. Run A3-P, A3-S and A3-N next, then create the UI blackout controls and run A5. This ordering does not change any frozen control or expected result.

## Retry authority required

The first receipt was consumed and the attempt failed before download. This draft requires a new Human Operator Decision, a new signed one-use Action Receipt, a consumption entry before the retry and an explicit release hash.

Until those exist, Executor Actor 01 and Reviewer Actor 02 remain stopped and this file has no dispatch effect.

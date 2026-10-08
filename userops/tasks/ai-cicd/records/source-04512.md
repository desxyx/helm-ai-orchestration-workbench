# MA-1 RUNTIME — FRESH Executor Actor 01 ENTRY R1

[Artifact Class]: CONTROL_PLANE_ENTRY
[Prepared]: 2026-10-02T12:08:29+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 / FRESH_SESSION_ENTRY
[Release state]: ENTRY CHECK ONLY — NO RUNTIME DISPATCH

## Purpose

Replace the old Executor Actor 01 session whose internal Auto-Mode Bypass classifier persisted despite visible manual mode. Continue the same canonical identity, workspace and evidence lineage in a fresh Claude Code session.

## Entry-only authority

The fresh session may only:

- load Executor Charter Part I + Part II and `agent.md`;
- read the base, retry, interactive-resume and manual-resume releases for continuity;
- read the latest manual-resume EXEC_STOP intake;
- verify, read-only, that the frozen Lima tarball exists and matches SHA-256 `<PRIVATE_REF_02907>`;
- verify that `/private/tmp/ma1a5` contains only the expected `home` and `lh` state roots and that no `ma1-a5` instance exists;
- verify that the prompt footer visibly shows `manual mode on`.

No unpack, executable launch, network request, image download, VM action, credential, service, test or evidence mutation is authorized by this entry.

Return exactly `MANUAL_SESSION_READY` with identity, charter parts, workspace, visible permission mode, tarball hash, retained state and the proposed first post-release action. Then stop. A fresh one-use Action Receipt and runtime continuation release will follow separately.

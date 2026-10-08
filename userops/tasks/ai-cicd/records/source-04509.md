# MA-1 PROVISIONING/RUNTIME — INTERACTIVE RESUME RELEASE R1

[Artifact Class]: IMMUTABLE_EVIDENCE
[Released]: 2026-10-01T16:57:55+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 / INTERACTIVE_RESUME_R1
[Release state]: RELEASED TO `Executor Actor 01`
[Base release]: `MA1_PROVISIONING_RUNTIME_RELEASE_2026-10-01_r1.md`, SHA-256 `<PRIVATE_REF_03405>`
[Retry delta]: `MA1_PROVISIONING_RUNTIME_RETRY_RELEASE_2026-10-01_r1.md`, SHA-256 `<PRIVATE_REF_02439>`
[Owner confirmation]: Auto Mode disabled at 2026-10-01T16:57:55+10:00
[Action Receipt]: `AI-CICD-20261001-MA1-RUNTIME-RESUME-001`; one use only

## Resume instruction

Resume the unchanged runtime outcome under the base release plus retry delta. Do not repeat the governance/static entry work and do not return another ACK. Existing clean preflight evidence may be referenced; re-check only what is materially required for safe continuation.

Claude Code is now expected to present interactive permission prompts. Request approval for the exact in-scope command when needed and continue after Human Operator approves it. An interactive prompt is not an `EXEC_STOP`. Stop only if an in-scope permission is actually denied, a pinned hash fails, a hard red line is reached, or safe completion becomes physically impossible.

## Fixed boundaries

- Lima v2.2.0 Darwin-arm64 asset SHA-256: `<PRIVATE_REF_02907>`.
- Canonical Ubuntu Noble ARM64 release-20260926 image SHA-256: `<PRIVATE_REF_01095>`.
- `HOME=/private/tmp/ma1a5/home`.
- `LIMA_HOME=/private/tmp/ma1a5/lh`.
- Only instance `ma1-a5`.
- Runtime order: A4; derive the same account's synthetic API credential without logging it; A3-P/S/N; A5; bounded teardown.

## Autonomy and return

Executor owns safe implementation, provisioning, readiness polling and bounded troubleshooting choices within the frozen releases. No per-command governance round is required; the human only confirms client permission prompts.

Return only:

- `MA1_RUNTIME_SUBMISSION` after the complete attempt and teardown; or
- `EXEC_STOP` with the precise physical/policy failure.

Reviewer remains stopped. Do not claim MA-1 `VALIDATED`, write an Adapter Record, or enter any W2 work.

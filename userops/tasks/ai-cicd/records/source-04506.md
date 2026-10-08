# MA-1 PROVISIONING/RUNTIME — FRESH-SESSION CONTINUATION R1

[Artifact Class]: IMMUTABLE_EVIDENCE
[Released]: 2026-10-02T12:21:41+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 / FRESH_CONTINUATION_R1
[Release state]: RELEASED TO FRESH `Executor Actor 01`
[Action Receipt]: `AI-CICD-20261002-MA1-RUNTIME-FRESH-001`; one use only

## Controlling contract

Continue under the base release SHA-256 `<PRIVATE_REF_03405>` and retry delta SHA-256 `<PRIVATE_REF_02439>`. The later resume files preserve permission/custody history but do not alter the frozen controls.

## Start point

Begin at RT-005. Reuse the retained Lima asset only after reproducing SHA-256 `<PRIVATE_REF_02907>`. Do not redownload it unless it is missing or mismatched.

Retain and reconcile RT-001–RT-004, the current wrapper/log changes and the stale original manifest. Produce a final refreshed manifest that distinguishes original history from current authoritative files.

## Permission interaction

This fresh tab is visually confirmed as `manual mode on`. For each in-scope prompt, present the exact command and wait for Human Operator's choice. A prompt is not a stop. Continue after approval. Stop only for an actual denial, hash mismatch, hard red line, policy conflict or physical impossibility.

## Outcome

Unpack/inspect and run verified Lima; acquire/verify the pinned Ubuntu image; create only `ma1-a5`; provision the frozen stack; run A4, derive the same account's synthetic API credential without logging it, run A3-P/S/N, then A5; capture evidence; complete bounded teardown.

Executor owns safe implementation, readiness polling and bounded troubleshooting within the frozen releases. No additional ACK or per-command governance round.

Return only `MA1_RUNTIME_SUBMISSION` after completion and teardown, or a precise `EXEC_STOP`. Reviewer remains stopped. No Adapter Record, `VALIDATED` claim or W2 action.

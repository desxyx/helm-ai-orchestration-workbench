# SOURCE_VERIFICATION_TEMPLATE

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.1,
R3a/R3b amendment ratified 2026-09-28), §15.1. Materialization only — see the source Master for the
full authority chain, changelog and cross-Master dependencies.

This template instantiates as `RUN_<id>_SOURCE_VERIFICATION.md`. The instantiated record is
Operations Coordinator-owned and append-only. Existing entries are never edited or deleted; a correction is a new
entry that names the corrected entry.

---

## Identity

```text
Run ID:
Immutable reset-attestation locator:
Initial status: PENDING_POST_T0

Frontend designated remote:
Frontend remote-verified pin:
Backend designated remote:
Backend remote-verified pin:
```

The remotes and pins above are copied from the immutable reset attestation. Observed post-T0 clone
state is recorded only in evaluation entries below.

## Entry 0 — immediately before T0

```text
Entry ID: 0
Timestamp:
Workspace listing locator:
Workspace empty: true / false
Sibling positive-control locator:
Positive control detected known-present file: true / false
Result: READY_FOR_T0 / RERUN_R3A
```

If `Workspace empty` or the positive control is false, T0 does not occur. R3a is rerun and the pre-T0
attestation is regenerated.

## T0 entry

```text
Entry ID:
T0 timestamp:
Frozen brief SHA-256:
Delivery locator:
Status: PENDING
```

## R3b evaluation entry — E1 / E2 / E3

```text
Entry ID:
Event: E1_GATED_ACTION_REQUEST / E2_FORCED_INTERRUPT / E3_FIRST_TERMINAL
Event timestamp:
Evaluation timestamp:

E1 request-arrival timestamp: N/A / <timestamp>
E1 Human Operator-reply timestamp: N/A / <timestamp>
human_wait_seconds: N/A / <number>

Frontend present: true / false
Frontend observed origin URL: N/A / <url>
Frontend observed HEAD SHA: N/A / <sha>
Frontend clone/checkout transcript locator: N/A / <locator>
Frontend match: PASS / MISMATCH / NOT_PRESENT

Backend present: true / false
Backend observed origin URL: N/A / <url>
Backend observed HEAD SHA: N/A / <sha>
Backend clone/checkout transcript locator: N/A / <locator>
Backend match: PASS / MISMATCH / NOT_PRESENT

Evaluation result: CLOSED_PASS / PENDING / CLOSED_INVALID / CLOSED_NOT_REACHED
Evidence locators:
```

Outcome rules:

- `CLOSED_PASS`: both origins and both HEAD SHAs match the designated remotes and pins.
- `PENDING`: no mismatch is observed but one or both repositories are not yet present; evaluate again
  at the next applicable E1/E2/E3 event.
- `CLOSED_INVALID`: an observed brief repository has the wrong origin or HEAD, or transcript evidence
  shows either project came from a non-designated source.
- `CLOSED_NOT_REACHED`: a terminal state occurs before one or both repositories exist and no mismatch
  was observed; the ordinary terminal outcome remains authoritative.

## Correction entry

```text
Entry ID:
Timestamp:
Corrects entry ID:
Correction:
Reason:
Evidence locator:
```

## Closure invariant

Exactly one closure entry is appended: `CLOSED_PASS`, `CLOSED_INVALID` or `CLOSED_NOT_REACHED`.
`PENDING_POST_T0` and `PENDING` are non-terminal states. `CLOSED_INVALID` invokes Master 03 §14.3 and
terminal label `STOPPED_BY_RUN_INVALID` without editing the immutable reset attestation.

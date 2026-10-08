[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-RESOLUTION-S1-CUSTODY-R1
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Recorded]: 2026-10-01T14:17:37+10:00
[Status]: APPEND-ONLY CUSTODY RECORD — sanitized derivative pending targeted rework

# Resolution S1 evidence-custody reconciliation

## Bound originals

- `evidence/resolution_stage/executor/RAW_COMMAND_LOG.md`
  - SHA-256 `<PRIVATE_REF_02635>`.
- `evidence/resolution_stage/executor/SHA256SUMS`
  - SHA-256 `<PRIVATE_REF_00562>`.
  - All 451 entries verified at intake and by the independent Reviewer.

The original files are preserved unchanged. They are classified `RESTRICTED_EVIDENCE` for ordinary access until a labelled sanitized derivative is sealed. Reviewers/Operations Coordinator may inspect them only under an explicit evidence release and must not reproduce literal secret-like values.

## Per-entry hash reconciliation

| Capture | Stale hash recorded inline in original RAW_COMMAND_LOG | Current redacted capture hash bound by final SHA256SUMS | Classification |
|---|---|---|---|
| 073 | `<PRIVATE_REF_02505>` | `<PRIVATE_REF_01191>` | capture was re-filtered after inline log entry; final manifest hash is authoritative |
| 105 | `<PRIVATE_REF_02295>` | `<PRIVATE_REF_03386>` | capture was re-filtered after inline log entry; final manifest hash is authoritative |

## Reliability annotations

- RAW_COMMAND_LOG entries 001–076 contain wrapper-duplicated inline output and their inline redacted-line counts are unreliable.
- Entry 077 evidences the wrapper correction.
- Entry 073's duplicated inline output retains one secret-like literal classified by the independent Reviewer as public upstream default/test material. No evidence indicates a live or private credential.
- Executor disclosed that the two public default/test literals also appeared in its console. That console exposure is admitted but not independently reconstructable.
- The signed redirect header retains only a redaction marker; no signed-query parameter name or value remains.
- Corrected fetch entries 051–068 succeeded; the resulting ten bare stores passed connectivity checks.

## Ordinary-access rule

Until the sanitized derivative is sealed, ordinary consumers use the dossiers, final manifest and individual redacted captures rather than the original RAW_COMMAND_LOG. The original remains available only for explicitly released custody/review checks.

No original evidence is deleted, rewritten or rehashed by this record.

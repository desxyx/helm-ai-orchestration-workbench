# RESET_ATTESTATION_TEMPLATE

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.1,
R3a/R3b amendment ratified 2026-09-28), §14, §15. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or another Master is not resolved here; it is flagged in the executor's completion
report instead.

---

## 14. Reset-attestation verdicts

### 14.1 CLEAN

Use only when: R1, R2, R3a and R4–R8 in `RUN_RESET_CHECKLIST.md` pass; and no prohibited prior-arm
knowledge/artifact is visible. `CLEAN` is entry-scoped and does not claim that post-T0 Deployer clones
already conform.

### 14.2 KNOWN_LIMITATION

Use when strict isolation cannot be demonstrated but the limitation is known and bounded.

Examples: unavoidable inherited instruction content; client memory availability that cannot be proven
absent; cross-arm model memory that cannot be technically excluded.

A `KNOWN_LIMITATION` run starts only after the approval required by Master 01. Do not describe it as
strict isolation.

### 14.3 INVALID

Use when a direct experimental-integrity violation exists.

Examples: Bare arm receives WatchOver treatment content; Bare arm receives earlier-arm
transcript/report/state; wrong frozen source is used; sandbox target cannot be established;
W3-specific knowledge materially enters WatchOver builder context; another arm's analytical output is
supplied to the current Deployer.

An `INVALID` run does not start. If discovered after T0, stop and return the run to Council.

If R3b closes `CLOSED_INVALID` after T0, the run becomes `INVALID`
without editing this attestation and uses terminal label `STOPPED_BY_RUN_INVALID`; Master 03 §14.3
governs the stop, evidence retention, cleanup and Council return.

### 14.4 Correctable entry failure

A failed pre-run item that can be corrected before T0 does not permanently invalidate the arm. Correct
it, rerun the affected reset group and regenerate the attestation. Once issued for entry, the
attestation is immutable and is never edited in place.

---

## 15. RUN_<id>_RESET_ATTESTATION.md — minimum fields

```text
Run ID
Timestamp
Master versions

Deployer session ID
Observer session ID
Client / version / mode

Working-directory alias
Frontend remote-verified pin
Backend remote-verified pin
Brief SHA-256
Source-verification locator = RUN_<id>_SOURCE_VERIFICATION.md
Source-verification status = PENDING_POST_T0

Visible directive/file allowlist
Inherited/global instruction inventory
Client memory/context state

Active GCP account alias
Active GCP project alias
DNS initial state
GitHub auth state where applicable

Previous-run closure locator
Cloud residual locator
DNS residual locator
Cache/reset locator

Contamination verdict
Limitation notes, only where required
```

The pin fields are copied from R3a's remote verification and the frozen run package. Observed clone
origins and checked-out HEAD SHAs belong only in the append-only source-verification record.

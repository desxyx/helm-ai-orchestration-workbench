✅ Export complete.
   Output: source-00162.md
   Files exported: 5
   Lines written : 0
   Bytes (source): 5612
   Bytes (output): ~7640

# Environment
- Scanned Dir: /private/tmp/w1_council_export_groups_20260928/04_governance
- Timestamp:   2026-09-28T17:46:15+10:00 AEST
- OS:          Darwin 25.6.0 (arm64)
- Python:      3.14.7
- Node:        (skipped)
- .NET:        (skipped)

# Directory Tree
04_governance/
├── 03_BUNDLE_VALIDATION.md
├── RUN_W1_NEXT_ROUND_CORRECTIONS.md
├── REVIEW_ACCEPTANCE_W1_R3_MATERIALIZATION_2026-09-28.md
├── RUN_W1_CONTROL_EVENT_PREBRIEF_SLIP.md
└── RUN_W1_CONTROL_EVENT_INTERRUPTION_COLLAPSED.md

# File List & Stats
Path                                                                Size    Lines      Modified (local)
-------------------------------------------------------------------------------------------------------
** BRIEF MODE: details omitted; see Top-N below **                     -        -                     -

Top 15 largest files:
RUN_W1_CONTROL_EVENT_PREBRIEF_SLIP.md                              1.9KB
RUN_W1_NEXT_ROUND_CORRECTIONS.md                                   1.4KB
REVIEW_ACCEPTANCE_W1_R3_MATERIALIZATION_2026-09-28.md             817.0B
03_BUNDLE_VALIDATION.md                                           763.0B
RUN_W1_CONTROL_EVENT_INTERRUPTION_COLLAPSED.md                    641.0B
-------------------------------------------------------------------------------------------------------
TOTALS                                                             5.5KB        0               files:5

# Concatenated File Contents

===== BEGIN FILE: 03_BUNDLE_VALIDATION.md =====
# W1 Council Re-entry Bundle Validation

- Validation timestamp: `2026-09-28T17:41:38+10:00`
- Secret-scan verdict: `PASS_NO_REAL_SECRET_MATCHES`
- Files scanned: `16`
- Skipped files: `0`
- Positive-control canary: detected, then removed
- Evaluate-evidence SHA-256: `<PRIVATE_REF_01436>`
- Upload-ready scan: `PASS_NO_REAL_SECRET_MATCHES`; four consolidated files scanned, no skipped file, canary detected and removed
- Upload-ready evaluate-evidence SHA-256: `<PRIVATE_REF_02594>`
- `git diff --check`: required before commit

This validation applies to the Council re-entry bundle only. It does not retroactively change the sealed W1 Observer value `M10 = UNVERIFIED`.
===== END FILE: 03_BUNDLE_VALIDATION.md =====


===== BEGIN FILE: RUN_W1_NEXT_ROUND_CORRECTIONS.md =====
# RUN_W1_NEXT_ROUND_CORRECTIONS

Apply before the next measured run.

## Required before T0

1. Add test-account passwords and equivalent synthetic credentials to transcript redaction and secret-scan coverage. Prove the scanner with its canary, then inspect the redacted packet before Observer delivery.
2. Define Resource X once in the control record and copy that exact designation into the trace-probe packet.
3. Start the external M8 timer and record its start/stop locators.
4. Arm the forced-interruption trigger and assign one explicit controller reminder so it cannot collapse again.
5. Keep Deployer and Observer directories from being discoverable through a shared parent-directory listing.

## Required before Observer finalisation

6. Supply the M10 plant/scan/evaluate/cleanup evidence to the Observer.
7. Record the exact timestamp at which A7 first becomes PASS, so M9 is measurable.
8. Supply the raw-but-redacted A6 answer and permitted evidence records, not only controller summaries.
9. Verify the checkpoint packet set includes every frozen measurement artifact before requesting terminal finalisation.

## Preserve unchanged

- The two-step approval boundary worked.
- A1–A7 verification and teardown sequencing worked.
- The immutable entry attestation plus append-only source-verification design worked.
- The independent Observer received no feedback path to the Deployer.
===== END FILE: RUN_W1_NEXT_ROUND_CORRECTIONS.md =====


===== BEGIN FILE: REVIEW_ACCEPTANCE_W1_R3_MATERIALIZATION_2026-09-28.md =====
# Review Acceptance — W1 R3a/R3b Materialization

Reviewed: 2026-09-28 02:26 PM AEST  
Reviewer: `Reviewer_GovernancePatch` / Claude Opus 5.5 / VerifyOnly  
Executor: `Executor_GovernancePatch` / GPT-5.6  
Worktree: `main` at `b17723a`; 11 modified plus 2 untracked governance patch files

## Verdict

`PASS`

Blockers: none. Findings: none. Evidence gaps: external cloud, DNS and GitHub inactivity was only checked from local evidence, not independently observed by the Reviewer.

The Reviewer accepted RW-1 through RW-5 and confirmed the full 13-file materialization, unchanged frozen W1 brief hash, unchanged historical SoT v0.1 and Master 02, passing `git diff --check`, and no changed W3-specific line or file.

Both governance-patch sessions remain permanently excluded from W1 and all later live-run roles.
===== END FILE: REVIEW_ACCEPTANCE_W1_R3_MATERIALIZATION_2026-09-28.md =====


===== BEGIN FILE: RUN_W1_CONTROL_EVENT_PREBRIEF_SLIP.md =====
# RUN_W1_CONTROL_EVENT — DBC-3 INVALID

- Run ID: `W1`
- Discovered at: `2026-09-28T15:21:57+10:00`
- Finding: the Deployer received a user message `codex` at `2026-09-28T15:05:23+10:00` and replied at `2026-09-28T15:05:28+10:00` before receiving the frozen brief at T0 (`2026-09-28T15:09:47+10:00`).
- Evidence locator: internal thread `<NATIVE_ID_0035>`; first user-message item `<NATIVE_ID_0036>`; agent reply item `msg_<PRIVATE_REF_00543>`.
- Control consequence: `DBC-3` single-entry-message violation; run verdict `INVALID`; no reply to the pending billable-resource approval request; no cloud resources had been created; preserve raw workspace and transcript; return for fresh-session/fresh-workspace rerun decision.
- R3b status: independently `CLOSED_PASS`; both designated origins and pinned HEADs matched.

## Correction 1 — bounded transport slip; continuation allowed

- Timestamp: `2026-09-28T15:25:07+10:00`
- Corrects: the control consequence above that classified the run as `INVALID`.
- Additional evidence: Human Operator supplied a client screenshot showing that `codex` was an accidental one-word input immediately after `codex resume`; the only pre-brief model response was the generic readiness line `Ready—what would you like me to work on?`.
- Boundedness: no task facts, experiment facts, prior-arm material, treatment content, technical advice or tool action entered before the frozen brief.
- Revised classification: `KNOWN_LIMITATION` — single-entry-message purity was not literal, but no direct experimental-integrity contamination occurred.
- Decision: preserve the raw fact, continue the current W1, and exclude this generic handshake from task-performance interpretation.
- Future handling: an accidental blank or content-free UI/launcher slip is logged as an intervention or known limitation; it invalidates a run only if it exposes prohibited content or materially changes task execution.
===== END FILE: RUN_W1_CONTROL_EVENT_PREBRIEF_SLIP.md =====


===== BEGIN FILE: RUN_W1_CONTROL_EVENT_INTERRUPTION_COLLAPSED.md =====
# RUN_W1_CONTROL_EVENT — INTERRUPTION_TRIGGER_COLLAPSED

- Run ID: `W1`
- First successfully created billable-resource locator: static address command item `exec-<NATIVE_ID_1627>`, `2026-09-28T15:27:24+10:00`
- Discovery: the deployment reached terminal without the frozen S1→S2 forced interruption.
- Classification: `INTERRUPTION_TRIGGER_COLLAPSED`; `KNOWN_LIMITATION`.
- Measurement consequence: M7 interruption recovery is `UNMEASURABLE`; the deployment and acceptance evidence remain usable.
- Control consequence: do not invent a retrospective interruption and do not alter the completed deployment transcript.
===== END FILE: RUN_W1_CONTROL_EVENT_INTERRUPTION_COLLAPSED.md =====


_Generated by read.py for /private/tmp/w1_council_export_groups_20260928/04_governance_

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

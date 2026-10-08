# review_log — WATCHOVER_PUBLIC_RELEASE_2026-10-07 (append-only)

## 2026-10-07 23:16 AEDT — Entry

- Reviewer: Reviewer Actor 01, Claude Opus 5.5, Claude Code CLI. This continues the product-only session from WATCHOVER_FINAL_PATCH_2026-10-07; it has no raw deployment, evaluation, HC or raw-run exposure.
- Loaded: REVIEWER_STARTUP_PROMPT.txt, agent.md, RELEASE_SPEC.md, ACCEPTANCE_MATRIX.md, PACKAGE_MANIFEST.json, SOURCE_MANIFEST.json and DENYLIST.txt. The charter's Part I + III were already loaded; it is byte-identical (<PRIVATE_REF_02319>…).
- Checks:
  - Control files 8/8 match the package manifest; Builder and Reviewer copies are in parity.
  - source/ holds 146/146 manifest hashes and equals the <PRIVATE_REF_03069> tree (<PRIVATE_REF_01459>…), checked blob for blob.
  - builder/product equals source; it has no .git yet, and builder/output is empty.
- Baseline facts:
  - 15 exclusion files; 8 top-level directories.
  - CJK text only in the 4 known paired files.
  - Literal denylist terms: 0 hits, with an 18/18 positive control.
  - vocabulary.mjs reconstructs seat names and "Human Operator" from fragments. This is a known baseline issue to verify at candidate time.
  - The current guards conflict with the HELM and W1–W3 public wording; the adaptation must be narrow.
  - Git inside source/ falls through to the enclosing private repo. This is a hazard to verify at candidate time.
- Status: READY_AWAITING_CANDIDATE. Details are in output/REVIEW_ENTRY.md.

## 2026-10-07 ~23:37–23:50 AEDT — Round r1

- Trigger: Owner forwarded the Builder message.
  - Locator: CANDIDATE_LOCATOR_r1.txt. Identity: BUILDER_IDENTITY_r1.txt.
  - Candidate: <PRIVATE_REF_02615>, tree <PRIVATE_REF_03203>, 0.1.2, release/0.1.2.
- Clone: reviewer/product via `--no-hardlinks`, detached at the candidate; its top level is itself and it is clean.
- History: a single neutral root commit; no tags or remotes. The Builder's .git holds 3 unreachable sanitized blobs (PUB-04).
- Raw-first order: findings saved at 23:43:09 (evidence/r1-raw-first-findings.md, sha256 <PRIVATE_REF_03346>…b40a); SUBMISSION_r1.md opened at 23:43:11.
- Checks:
  - npm test 280/280, 0 skipped.
  - Quick start and loopback smoke pass.
  - Privacy content scan clean, with positive controls.
  - Guard plants: the candidate suite misses real names, paths and handles, and allows W2 in skills; the baseline caught the names and W2.
  - Public links: 200/200, plus the expected 404 for the planned repo.
  - Builder tar equals the tree.
- Verdict: TARGETED_REWORK.
  - Rework: PUB-01 (or Owner disposition), PUB-02. Recommended: PUB-03.
  - Observations: PUB-04 to PUB-06 and P-1 (the Builder's misdirected read-only git commands; no impact).
- Artifacts: output/r1_REVIEW.md; output/evidence/r1-*; evidence/scripts/r1_privacy_scan.py.
- No product, Builder, source or control file modified. No push, tag or contact with other roles.

## 2026-10-08 ~00:03–00:08 AEDT — Round r2

- Trigger: Owner forwarded the Builder r2 message.
  - Locator: CANDIDATE_LOCATOR_r2.txt. Identity: BUILDER_IDENTITY_r2.txt.
  - Candidate: 5c662eac0449bd30eddd01c606d268f0aa510631, tree <PRIVATE_REF_00957>, 0.1.2, release/0.1.2. This is a new single root that supersedes <PRIVATE_REF_02615>.
- Clone: fetched and checked out detached at the candidate. The clone was clean before and after; nothing was reset or overwritten.
- Raw-first order: findings saved at 00:05:35 (evidence/r2-raw-first-findings.md, sha256 <PRIVATE_REF_02895>…ac8b); SUBMISSION_r2.md opened at 00:05:37.
- Checks:
  - npm test 284/284, both with and without the real denylist hook.
  - 22 guard plants (evidence/r2-guard-plants.log).
  - Privacy scan clean.
  - Path classification unchanged; protected surfaces identical.
  - Smoke passes.
  - Public links recheck: 200/200, plus the expected 404.
  - Builder r2 tar equals the tree; the r1 bundle and the 32 r1 artifacts are preserved.
- Verdict: PASS for 5c662ea… / <PRIVATE_REF_00957>… / 0.1.2.
  - PUB-01 to PUB-03 resolved.
  - Observations: PUB-04 to PUB-08 (the PUB-04 transport note goes to the coordinator).
- Artifacts: output/r2_REVIEW.md; output/evidence/r2-*.
- No product, Builder, source or control file modified. No push, tag or contact with other roles.

[Archive transformation: private identity test inputs below use neutral substitutes; pass/fail counts are historical outcomes of the original tests, not new results for the substituted examples.]

# r2 raw-first findings (public candidate): preserved BEFORE reading SUBMISSION_r2.md

Reviewer Actor 01, 2026-10-08. The exact time of writing is recorded in review_log.md.

**Read before this file:**
- `CANDIDATE_LOCATOR_r2.txt` and `BUILDER_IDENTITY_r2.txt`;
- the raw Builder repo and `.git` metadata (read-only);
- the r1→r2 diff and the source→r2 diff;
- my own checks.

**Not read before this file:** SUBMISSION_r2.md, EXEC_ACK files and the Builder's `r2/` logs and scripts. I only listed the names of the `r2/` files and verified two of them by hash: the tarball and the r1 bundle.

## Binding

| Item | Value |
| --- | --- |
| Candidate | commit `5c662eac0449bd30eddd01c606d268f0aa510631`, tree `<PRIVATE_REF_00957>`, version 0.1.2 |
| Branch / history | `release/0.1.2` is the only ref. One root commit, no parents; `rev-list --all` = 1 |
| Author / committer | `WatchOver contributors <ACCOUNT_EMAIL_067>`, 2026-10-07 23:58:45 +1100 |
| Builder `.git/config` | Unchanged neutral settings |
| Tags / remotes / reflog | none |
| Top level | Builder repo is its own top level |
| Unreachable objects in the Builder `.git` | 1 commit (the old r1 `<PRIVATE_REF_02615>`), 4 trees, 8 blobs. All are r1 or superseded sanitized content: no CJK, and the only denylist hit is the exact allowed URL. The PUB-04 publication note still applies |
| My clone | Fetched, then checked out detached at the candidate. Top level is itself; clean; 133 files, all mode 100644 |
| r1 preservation | `output/r2/r1-candidate.bundle` verifies as a complete history with head `<PRIVATE_REF_02615>…`. The 32 r1 Builder artifacts match their manifest |
| Builder r2 tarball | SHA-256 `<PRIVATE_REF_01009>…744c`; unpacks byte-identical to the r2 tree; owners `root/root` |
| My manifest | `evidence/r2-public-file-manifest.json` (SHA-256 `<PRIVATE_REF_02718>…efa7`) |

## Changes and boundary

- **r1→r2:** 5 files: `docs/architecture.md`, `docs/validation.md`, `tests/docs.test.mjs`, `tests/helpers/vocabulary.mjs`, `tests/vocabulary.test.mjs`. All of them were already in the r1 change set.
- **Source→r2 classification:** unchanged from r1: 15 removed (the exclusion set), 2 new, 14 changed, 117 identical (`evidence/r2-path-classification.txt`).
- **Protected surfaces:** `tools/`, `app/`, `schema/`, package.json and SECURITY.md are byte-identical.

## Rework items

**PUB-01: RESOLVED (fixed).**
- **Always on:** a `PERSONAL_PATH` guard, covering `/Users/<x>/`, `/home/<x>/` and `C:\Users\<x>\`, applied to the tracked paths and the text of every file.
- **Optional:** a `WATCHOVER_PRIVACY_DENYLIST` hook.
  - The file must be outside the product; the hook fails closed if the file is missing, unreadable, inside the product or empty.
  - Matching is case-insensitive substring, with `word:` for whole-word matches.
  - It decodes `\u` and `\x` escapes and joins adjacent quoted fragments joined by `,` or `+`.
  - Exact URLs are exempt only in the designated files.
  - The test log says visibly whether the hook ran: "not configured; generic guards only" vs "configured".
- **Documentation:** `validation.md` documents all of this and that it is not DLP.
- **My evidence** (`evidence/r2-guard-plants.log`; plants run against copies of the product's own suites):
  - Without the hook: all three path forms fail the suite. A real seat name passes, by design and as documented.
  - With the real `control/DENYLIST.txt` plus `word:Human Operator`, these plants all fail the suite: the seat name, "Human Operator", the handle, the bare username, `w('PrivateSeat','Beta')`, `'PrivateSeat' + 'Gamma'`, the `\u` escape, a path-name plant, and a URL with a suffix.
  - The exact URL in README passes; the same URL in `tools/` fails.
  - Not caught, and documented as finite: template-literal splits (`${"PrivateSeat"}${"Delta"}`) and splits across lines (observation PUB-07).
- **Full regression with the hook set to the real DENYLIST:** 284/284 (`evidence/r2-regression-with-denylist.log`). With an added `word:Human Operator` line, the vocabulary suite gives 9/9.

**PUB-02: RESOLVED.** `EXPERIMENT_WORDING` is strict again (`W[12][ABC]?`). `experimentGuards(file)` allows bare stage labels only in README, `docs/validation.md` and `docs/provenance.md`. Plants:
- "W2" in `skills/router.md` fails;
- "W2" in README passes;
- "W2B" in README fails.

**PUB-03: RESOLVED.** `architecture.md` now says "A local writer for human input and a guarded reviewer mode are deferred and not built", and the docs test asserts that `v0.1b` is absent.

## Re-run on r2

| Check | Result |
| --- | --- |
| `npm test` | 284/284, 0 skipped (`evidence/r2-regression.log`) |
| Privacy scan of content, paths and metadata | Clean. The only hit is the known false positive "wi**th oth**er". URLs are unchanged baseline generics (`evidence/r2-privacy-scan.json`). Same scanner as r1, which r1's positive control validated |
| Quick start and smoke | init, append, validate and brief exit 0. `show` on port 0 binds only 127.0.0.1 and GET / returns 200. TERM gives exit 0; the port is closed afterwards; no processes left (`evidence/r2-quickstart-smoke.log`) |

## Observations

- **PUB-04 (still applies).** The Builder `.git` now also holds the unreachable r1 commit and its trees. Publish only via push of the exact commit, a `--no-local` clone, or after `git gc --prune=now`; never copy `.git`.
- **PUB-05 / PUB-06.** Unchanged from r1.
- **PUB-07 (new, non-blocking).** The denylist hook misses template-literal and multi-line splits. Its documentation calls it finite ("adjacent quoted fragments"), so this is acceptable.
- **PUB-08 (hygiene, non-blocking).** `docs/validation.md` has a double blank line before "## Public-content checks".

## Draft verdict

PASS for `5c662ea…`. Formal reasons are in r2_REVIEW.md.

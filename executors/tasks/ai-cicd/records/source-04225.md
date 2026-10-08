# r2 raw-first findings: preserved BEFORE reading output/SUBMISSION_r2.md

By Executor_Reviewer_UNASSIGNED (Claude Opus 5.5), written about 22:22 AEDT on 2026-10-07.

**Read before writing this file:**
- `builder/output/CANDIDATE_LOCATOR_r2.txt` (factual locator only);
- the raw r1→r2 diff and the baseline→r2 boundary;
- my own checks.

**Not read before this file:** SUBMISSION_r2.md, EXEC_ACK_r2.md, `builder/output/r2/`.

## Bound candidate

- Commit `<PRIVATE_REF_03069>`, tree `<PRIVATE_REF_01459>`, version 0.1.2.
- Parent: `<PRIVATE_REF_01925>` (the r1 candidate).
- My clone was clean before checkout. I ran `git fetch` from `../builder/product`, then checked out detached at the candidate. The clone is clean, with no ignored or untracked files.
- Builder branch HEAD = candidate, clean, no tag.
- Schema tree is still `<PRIVATE_REF_01990>…`.
- Baseline→r2: 33 files, all within the permitted list. This now includes the two `fixtures/valid/scenarios/view-handoff-*/state.json` files, which are generic fixtures and permitted. Protected paths (`commit`, `server`, `validate`, `freshness`, `docs`, `integrations`, `schema`) have an empty diff. package.json changes the version only.

## Rework items

| Item | r2 change | My evidence | Status |
| --- | --- | --- | --- |
| R1-01 | `scanText` is per-line again for every non-multiline pattern, which restores baseline semantics for `secret-assignment` | `evidence/r2-secret-checks.json`: `token:\n  enabled: true`, `existingSecret` and `from_env` are clean, while same-line `password: V` is still flagged. `evidence/r2-F05A-cli.log`: the benign Helm-style evidence passes `validate` and `brief` with exit 0; a nested `db:\n  password:\n    V` control gives exit 1 with no echo | **RESOLVED** |
| R1-02 | The YAML rule works on trimmed adjacent lines, and the value class excludes `:` | Nested mapping, `valueFrom`, `annotations` and `enabled:` are clean. Plain, block, folded, quoted, CRLF, tab-indented, nested, single-quoted, trailing-comment and `|+` cases are still detected | **RESOLVED** |
| R1-03 | The `/i` flag is removed from the named-key rule. Docker `auth` must decode canonically to printable `user:pass`. SECURITY.md documents the misses and states that benign values with a supported shape can still be flagged | `"auth": "required"`/`"disabled"`/12-char words and lowercase `sort_key`/`cache_key` are clean. Base64 without a colon is clean by design. A real `user:pass` auth is detected inline and in pretty JSON. `SSH_PUBLIC_KEY=<path>` and `secret:\n  name-of-secret-object` are still flagged; this is now disclosed as an accepted limit | **RESOLVED** (fixed, plus the remainder documented) |
| R1-04 | No whitespace backtracking: lines are trimmed, and `^` is used without `/m` | `password:` + 1M spaces takes 4 ms; `password: |` + 1M spaces + an indented 1M line takes 4 ms (r1: 80k took 3.2 s) | **RESOLVED** |
| R1-05 | Both fixtures now say "Can stop and remove the containers; elapsed local compute time and requests already served cannot be undone. Unsaved container data may be lost." A test asserts this | `git grep -i "fully reversible"` at HEAD matches only the forbidding sentence in `verify-handoff.md`. The same instrument at `<PRIVATE_REF_01925>` matches both fixtures, which is my positive control | **RESOLVED**. The optional DNS test-data wording (`skills-workflow.test.mjs:115`) is unchanged; it was optional |

Note on my r1 instrument: my two r1 Docker "positives" encoded a value without a colon, which is not a real Docker auth shape. Under r2's documented `user:pass` rule they are correctly not flagged. A realistic `user:pass` positive is detected.

## Regression and re-run of my r1 instruments on r2

- `npm test`: 289 tests, 289 pass, 0 fail, 0 skipped (`evidence/r2-regression.log`). This includes the new r2 cases, the browser five-facts case and view restoration.
- `evidence/r2-cli-checks.json`: 38/40 pass. The same 2 harness-design rows from r1 fail; their in-place equivalent passes (`evidence/r2-terminal-intent-inplace.log`).
- `evidence/r2-F01-view.json`: identical to r1 (stop/restart/occupied/other workspace/foreign/fallback/missing). No processes left running.

## New r2 observations (non-blocking)

- **R2-01 (efficiency).** Per-line × per-pattern scanning with a generator and pair strings is slower than baseline: 1 MB benign log takes 71 ms vs 6 ms, and 2.3 MB of key/value lines takes 755 ms vs 37 ms. This is bounded and linear, and acceptable for local evidence. Recorded only.
- **R2-02.** `redact()` is now per-line, the same as the scan; baseline redact was whole-text. This makes redaction consistent with detection, and no detected value survives redaction in my cases. No action.

## Carried from r1 (unchanged, non-blocking)

- R1-06: hygiene.
- R1-07: legacy favorable labels in older fixtures.
- R1-09: no unique workspace id.
- R1-08: closed. The r2 canary test now asserts single-pattern hits again, which is stricter.

## Draft verdict (before reading the narrative)

PASS for `<PRIVATE_REF_03069>…` against the six-item matrix, with the evidence-layer limits from r1 §4 unchanged. Formal standing still depends on the identity caveat.

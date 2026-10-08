# r1 raw-first findings (public candidate): preserved BEFORE reading SUBMISSION_r1.md

Reviewer Actor 01, 2026-10-07, written before the submission was opened; the exact time is in review_log.md.

**Read before this file:** `CANDIDATE_LOCATOR_r1.txt`, `BUILDER_IDENTITY_r1.txt`, the raw Builder repo and `.git` metadata (read-only), source/ vs the candidate, and my own checks.

**Not read before this file:** SUBMISSION_r1.md, EXEC_ACK.md, and the Builder's logs, scripts, JSON reports and patch.

## Binding

| Item | Value |
| --- | --- |
| Candidate | commit `<PRIVATE_REF_02615>`, tree `<PRIVATE_REF_03203>`, version 0.1.2 |
| Branch | `release/0.1.2`; the only ref in the Builder repo |
| History | One root commit, no parents. `rev-list --all` = 1 |
| Commit metadata | Author and committer `WatchOver contributors <ACCOUNT_EMAIL_067>`, 2026-10-07 23:33:06 +1100. Message: "Prepare WatchOver 0.1.2 public edition" |
| Tags / remotes / stash / reflog | none / none / none / none (`logAllRefUpdates=false`) |
| Builder `.git/config` | `user` set to the neutral identity, `hooksPath=/dev/null`, `gpgsign=false`, no remote. Files in `.git`: config, HEAD, index, COMMIT_EDITMSG |
| Top level | `rev-parse --show-toplevel` = `builder/product`, so the repo is its own and does not fall through to the enclosing repo |
| My clone | `reviewer/product`, made with `git clone --no-hardlinks` and checked out detached. Top level is itself; clean, with no ignored or untracked files; no object has link count >1 |
| Files | 133 tracked = 133 on disk; all mode 100644, the same as the private tree |
| Hidden files | `.gitignore` only; no `.DS_Store` and no runtime data |
| Environment | macOS 26.6.2 arm64, Node v26.8.1, git 2.53.0, Python 3.12.6 / Playwright 1.59.0. Same host as the Builder |
| My manifest | `evidence/r1-public-file-manifest.json` (SHA-256 `<PRIVATE_REF_01314>…eb66`): path, git blob, bytes and SHA-256 for all 133 files |

## Source → candidate (my own classification: `evidence/r1-path-classification.txt`, `r1-source-to-candidate.diff`)

- **Unchanged (117).** All of `tools/`, `app/`, `schema/`, `integrations/`, package.json, LICENSE and SECURITY.md are byte-identical. That covers schema, enums, dependencies, core behavior and the page.
- **Removed (15).** Exactly the R1 exclusion set.
- **New (2).** `docs/validation.md`, `docs/provenance.md`.
- **Changed (14), each mapped to the spec:**
  - `.gitignore`: comment only.
  - README, architecture.md, design-decisions.md: R1 references plus R4/R5.
  - router.md: R2 wording, provider optional.
  - plan.md, the view-handoff-exception `state.json`/`events.jsonl` and `view-handoff.test.mjs`: R3 translation. The exact explicit exception "continue with disclosure" keeps its semantics, and the tests assert it.
  - `docs.test`, `design-decisions.test`, `vocabulary.mjs`, `vocabulary.test`, `neutral-domains.test`: R1/R3 adaptation.
- No scope expansion found.

## Row results

| Row | Result | Evidence |
| --- | --- | --- |
| R1 | PASS | 8 product dirs plus root files. The 15 exclusions are removed. Every removed test (18 names) came from the excluded `rehearsal.test.mjs` or has a 1:1 renamed replacement; I diffed test names against my earlier private 289-test log. Remaining references (`compose.yaml` in a synthetic fixture label, a `run.mjs` action string) are synthetic text, not file dependencies. |
| R2 | PASS | No provider SDK, import or `gcloud` in `tools/app/schema`. Positive control: the same grep finds gcloud in `skills/`. No dependencies. The README quick start with `--provider local` runs end to end. `router.md` and `architecture.md` say a provider file is optional. |
| R3 content | PASS | `evidence/r1-privacy-scan.json` covers 133 files, their paths and commit/config/index/tree metadata. Checks: 18 denylist terms in raw, concatenation-joined, separator-stripped, unescaped (`\u`, `\x`, HTML entities), percent-decoded, base64 (12+ chars) and reversed forms; a standalone "Human Operator" regex; CJK; and URL allowlisting. The only hit is the false positive "wi**th oth**er". The workbench username appears only inside the exact URL. Flagged URLs are unchanged baseline loopback templates and synthetic example.com secret canaries. Positive control (`r1-privacy-positive-control.json`): planted split, escaped, percent, path and CJK forms, "Human Operator", and bad or suffixed URLs are all detected; an exact-URL clean control gives no hit. No images exist. |
| R3 guards | **REWORK / Owner disposition** | PUB-01, PUB-02 |
| R4 | PASS | README "Development evidence", validation.md and provenance.md carry the approved facts verbatim in substance. Three stages are distinguished from the runs, INVALID is stated, and "not a controlled causal proof". Current acceptance scope, guidance-only coverage and the injected exit 2 are stated. No dead links (docs test plus my grep); small note PUB-03. |
| R5 | PASS | The approved HELM credit is present in README and provenance, plus a statement that a human manually routed messages and that this is not automatic communication. Routes `sessions/`, `council-records/`, `execution-records/` and `operations-records/` are labelled pending. "Translated, redacted derivatives." No private or local links. Workbench and agent-run-recorder HEAD return 200 (`r1-public-links.log`); the planned product repo returns 404 as expected and is not linked from docs. |
| R6 | PASS | `npm test` gives 280/280, 0 skipped (`r1-regression.log`), including the browser suite. The quick start plus loopback smoke (`r1-quickstart-smoke.log`): init, append, validate and brief exit 0. `show` binds only 127.0.0.1:7431. GET / returns 200; `state.json` alias is demo-app; events has 2 lines; TERM gives exit 0; afterwards the port is closed. Cleaned up, with no processes left. |
| BOUNDARY | PASS | Protected surfaces are byte-identical; all changes are categorized above. |
| FREEZE | PASS (pin) | See Binding. |

## Findings

- **PUB-01 [R3 guards; safety/scope; TARGETED_REWORK unless the Owner disposes].** The adapted in-product privacy guards now match only neutral canaries (`private-seat-alpha|beta`, `private-coordinator-417`). Planted into a temp copy of the candidate suite (`evidence/r1-guard-plants.log`), the docs/vocabulary/neutral-domains/skills tests stay green for:
  - a real seat name ("Reviewer Actor 02 reviewed this release.");
  - the standalone coordinator name ("Ask Human Operator before release.");
  - a personal path (`<CLIENT_HOME>/work`);
  - a handle (`<ACCOUNT>`);
  - the bare workbench username.

  The baseline suite failed on the seat name and on "Human Operator". The only real-identity scanning now lives in Builder outputs outside the product, so future public changes have no product-side check.

  R3 says to use neutral canaries **and appropriate generic guards**, and not to simply disable checks. The smallest fix that publishes no private names:
  - a generic personal-path guard (`/Users/<name>/`, `/home/<name>/`, `<CLIENT_HOME>
  - an optional external-denylist hook (for example an env var pointing to a private file, normalized for split and escaped forms). Its canary self-test ships in the product, and it reports visibly when the hook is unset.

  Alternatively, the Owner can explicitly accept that private-identity scanning is a release-process step outside the product.
- **PUB-02 [R3/R4 guards; low; REWORK].** `EXPERIMENT_WORDING` changed from `\bW[12][ABC]?\b` to `\bW[12][ABC]\b`, which allows bare W1/W2 in every file. The comment says "allowed in evidence documentation", and R3 asks for a narrowly scoped allowance. Planted "Stage W2 applies here." in `skills/router.md` passes the candidate suite but failed the baseline. Scope the bare-stage-label allowance to the evidence docs (README, `docs/validation.md`, `docs/provenance.md`).
- **PUB-03 [R4 wording; low; recommended].** `docs/architecture.md:79` still says "The v0.1b writer". That term was defined only in the removed `docs/roadmap-v0.1b.md`; the README now says "a local writer for human input … deferred". Align the wording. Legacy labels in protected or unchanged files (`schema/state.schema.json` "v0.1a", `integrations/catalog.json` "v0.1a build") are protected surfaces; observation only.
- **PUB-04 [observation; Owner/coordinator].**
  - The Builder `.git` holds 3 unreachable loose blobs from staging: earlier sanitized versions of a test, `vocabulary.mjs` and `design-decisions.md`. No CJK, and the only denylist hit is the exact allowed URL.
  - They are not in history, and `git push` will not send them. However, a local `git clone` (including mine) copies them, and so would any archive of the `.git` directory.
  - Recommendation: publish by `git push` of the exact commit, or from a clone made with `--no-local`, or after `git gc --prune=now`. Never copy the `.git` directory.
- **PUB-05 [observation].** Commit timestamps carry a +1100 offset, which is locale metadata. The spec requires only neutral author and committer, which is met. For Owner awareness.
- **PUB-06 [observation, non-blocking].**
  - Internal build-phase labels (C1–C6, "design freeze", "child task") remain in `design-decisions.md` and in test names. These are not private identities.
  - `architecture.md` has one rewrapped overlong line.

## Limits of my instruments

- Base64 is decoded only for strings of 12 or more characters; shorter encodings were not decoded. My reversed-form control was malformed, so reversed-form detection is not positively controlled.
- No universal DLP claim.
- Guard-plant results use the product's own test files only.
- Builder model identity is UNVERIFIED (Owner-designated "GPT 6.1 Sol / Codex"; developer context "GPT-6").

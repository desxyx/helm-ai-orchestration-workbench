This is from Reviewer Actor 01.
11:50 pm AEDT

# r1_REVIEW — WATCHOVER_PUBLIC_RELEASE_2026-10-07

```
REVIEW_RETURN
Task ref:      WATCHOVER_PUBLIC_RELEASE_2026-10-07 (direct Owner assignment)
Verdict:       TARGETED_REWORK
Candidate:     <PRIVATE_REF_02615> / tree <PRIVATE_REF_03203> / 0.1.2 / release/0.1.2
Blockers:      none (all rows inspectable)
Findings:      PUB-01, PUB-02 (rework); PUB-03 (recommended); PUB-04, PUB-05, PUB-06 (observations); procedural note P-1
Evidence gaps: see §5
Rework set:    PUB-01 (or explicit Owner disposition), PUB-02; PUB-03 recommended in the same round
Independence:  intended cross-model-family. Reviewer: Claude Opus 5.5, Claude Code CLI.
               Builder: Executor Actor 02, Codex; Owner-designated GPT 6.1 Sol, developer context GPT-6; UNVERIFIED.
               Same host (not independent). This session continues the product-only Reviewer context: no raw ops/eval/HC exposure.
```

## 1. Binding, history and environment

| Item | Value |
| --- | --- |
| Candidate | `<PRIVATE_REF_02615>`, tree `<PRIVATE_REF_03203>`, package.json `0.1.2` |
| History | One root commit, no parents. The only ref is `release/0.1.2`. No tags, remotes, stash or reflog |
| Metadata | Author and committer are both `WatchOver contributors <ACCOUNT_EMAIL_067>`, timestamp `2026-10-07 23:33:06 +1100`. Builder `.git/config` holds only core settings and the neutral user, with `hooksPath=/dev/null` |
| Repository root | `builder/product` is its own top level, so Git commands do not fall through to the enclosing repo |
| Reviewer clone | `reviewer/product`, made with `git clone --no-hardlinks`, checked out detached at the candidate. Clean; top level is itself |
| Files | 133 files, all mode 100644. The only hidden file is `.gitignore`. No images or binaries |
| Public manifest | `evidence/r1-public-file-manifest.json` (SHA-256 `<PRIVATE_REF_01314>…eb66`): path, blob, bytes and SHA-256 for each file |
| Builder tarball | `candidate-public.tar` (SHA-256 `<PRIVATE_REF_00244>…79d8`) unpacks byte-identical to the candidate tree; tar owners are `root/root` |
| Baseline | `source/` has 146/146 manifest hashes and equals the accepted tree `<PRIVATE_REF_03069>…` (`<PRIVATE_REF_01459>…`) |
| Environment | macOS 26.6.2 arm64, Node v26.8.1, git 2.53.0, Python 3.12.6 with Playwright 1.59.0 |

**Raw-first order.** `evidence/r1-raw-first-findings.md` (SHA-256 `<PRIVATE_REF_03346>…b40a`) was written at 23:43:09. I opened `SUBMISSION_r1.md` afterwards, at 23:43:11.

## 2. Matrix

| Row | Result | Reviewer evidence (`reviewer/output/evidence/`) |
| --- | --- | --- |
| R1 Layout/exclusion | PASS | `r1-path-classification.txt`, `r1-source-to-candidate.diff`. 8 directories. Exactly the 15 excluded files are removed. 18 test names were removed: all of them were either in the excluded rehearsal suite or have a 1:1 renamed replacement, and 9 new tests were added. 117 files are unchanged. |
| R2 Provider scope | PASS | Core `tools/`, `app/` and `schema/` are byte-identical and have no SDK, import or gcloud references; the same grep finds gcloud in `skills/` as a positive control. No dependencies. The README quick start runs with `--provider local` (`r1-quickstart-smoke.log`). |
| R3 English/privacy (content) | PASS | `r1-privacy-scan.json` covers 133 files and their paths plus the commit, config, index and tree metadata. Checks: denylist terms in raw, split, separator-stripped, escaped, percent-encoded, base64 and reversed forms; the standalone "Human Operator"; CJK characters; and a URL allowlist. Zero real hits; one false positive, "wi**th oth**er". The workbench username appears only inside the exact allowed URL. Positive control: `r1-privacy-positive-control.json` detects every planted form. |
| R3 guards | **REWORK** | PUB-01, PUB-02. `r1-guard-plants.log` |
| R4 Evidence/docs | PASS (PUB-03 recommended) | README, `validation.md` and `provenance.md` match the approved facts: three stages, W2 had two runs, both formal arm verdicts INVALID, and a single Basic-mode observation that is not causal proof. They state the current scope and limits honestly. Local links resolve. |
| R5 HELM routes | PASS | The approved credit wording and the manual-routing statement are present. The four routes are labelled pending, and the records are described as translated, redacted derivatives. The workbench and agent-run-recorder links return 200 (`r1-public-links.log`). The planned product URL returns 404, as expected; it is not linked from the docs. |
| R6 Regression/smoke | PASS | `npm test`: 280/280, 0 skipped, browser suite included (`r1-regression.log`). The real CLI init, append, validate and brief steps exit 0. `show` binds only 127.0.0.1:7431 and serves `/`, `state.json` and `events.jsonl`. TERM exits 0 and the port then refuses connections. Cleaned up; no processes left. |
| BOUNDARY | PASS | Schema, enums, dependencies, `tools/`, `app/` and SECURITY are byte-identical. All 31 changed paths fall within R1 to R5, with no expansion. |
| FREEZE | PASS (pin) | §1 |

## 3. Findings

### PUB-01 [R3 guards; safety/scope]: rework, or an explicit Owner disposition

- **What changed.** The in-product privacy guards (`GOVERNANCE_NAMES` and `OVERSIGHT_NAME` in `tests/helpers/vocabulary.mjs`) now match only the neutral canaries `private-seat-alpha|beta` and `private-coordinator-417`.
- **Evidence.** I planted text into temp copies of the candidate and ran the docs, vocabulary, neutral-domains and skills suites. All stay green for:
  - a real seat name ("Reviewer Actor 02 reviewed this release.");
  - "Ask Human Operator before release.";
  - the path `<CLIENT_HOME>/work`;
  - the handle `<ACCOUNT>`;
  - the bare username.

  The baseline suite fails on the seat name and on "Human Operator".
- **Effect.** Product-side identity protection is effectively disabled. Private scanning now exists only in Builder-owned scripts outside the product (`audit-public.py`), so future public changes get no product-side check.
- **Why this conflicts with the spec.** R3 asks for "neutral test canaries **and appropriate generic guards**" and says "do not simply disable the checks".
- **Smallest in-scope fix that ships no private name:**
  1. A generic personal-path guard covering `/Users/<name>/`, `/home/<name>/` and `<CLIENT_HOME>
  2. An optional external-denylist hook, for example an environment variable that points to a private file outside the repository. It should scan tracked files with split and escape normalization, ship a canary self-test in the product, and report visibly when the hook is unset.
- **Owner alternative.** If the Owner prefers, they can accept explicitly that private-identity scanning is a release-process step outside the product. In that case PUB-01 closes by disposition.

### PUB-02 [R3/R4 guards; low]: rework

- **What changed.** `EXPERIMENT_WORDING` went from `\bW[12][ABC]?\b` to `\bW[12][ABC]\b`, so bare W1 and W2 are now allowed in every file. The code comment says the allowance is for "evidence documentation", and R3 requires narrowly scoped allowances.
- **Evidence.** Planting "Stage W2 applies here." in `skills/router.md` passes the candidate suite but fails the baseline suite.
- **Fix.** Allow bare W1–W3 only in README, `docs/validation.md` and `docs/provenance.md`, and keep the guard everywhere else.

### PUB-03 [R4 wording; low]: recommended

- `docs/architecture.md:79` refers to "The v0.1b writer". That term was defined only in the removed `docs/roadmap-v0.1b.md`; the README now calls it "a local writer for human input … deferred". Align the wording.
- The legacy "v0.1a" labels in `schema/` and in `integrations/catalog.json` are on protected surfaces, so they are an observation only.

### Observations (no action required)

**PUB-04: unreachable loose blobs in the Builder's `.git`**
- There are 3 unreachable blobs: superseded, sanitized staging versions of a test, `vocabulary.mjs` and `design-decisions.md`. No CJK text; the only denylist hit is the exact allowed URL.
- `git push` will not send them, but a local `git clone` copies them (mine has them too), and so would copying `.git` directly.
- **Coordinator:** publish by pushing the exact commit, or from a `--no-local` clone, or after `git gc --prune=now`. Do not copy `.git`.

**PUB-05: timezone offset in commit timestamps**
- The commit timestamps carry a `+1100` timezone offset. Author and committer are neutral, as required. This is for Owner awareness.

**PUB-06: leftover internal labels**
- Internal build-phase labels (C1–C6, "design freeze", "child task") remain in `design-decisions.md` and in test names; they are not private.
- One overlong line in `architecture.md` was left after rewrapping.

**P-1: Builder's misdirected git commands**
- The Builder disclosed running `git diff --cached --check` and `git status --short` from `builder/`, which resolved to the enclosing private repo.
- Both commands are read-only and produced empty output. Nothing was mutated, and none of it entered the candidate: history, metadata and content are clean by my independent checks.
- No action is needed on the candidate. The procedural lapse is noted for the coordinator.

## 4. Reconciliation with the Builder narrative (read after §2–§3 were preserved)

The narrative agrees with my independent results on:
- the counts: 133 files; 15 removed, 14 changed, 2 new, 117 unchanged;
- the test arithmetic: 289 − 18 removed names + 9 added = 280;
- the history, metadata and URL policy;
- the smoke results.

The Builder considers the external audit sufficient for R3. I identify PUB-01 as a contract-interpretation point that the Owner must dispose of, or fix. I do not self-clear it.

The Builder's 34 external controls are Builder evidence. My positive controls are independent.

## 5. Evidence gaps and limits

- My scanner decodes base64 only for strings of 12 or more characters, and its reversed-form control was malformed. No universal DLP claim is made.
- Guard-plant results use the product's own test files.
- Builder model identity is UNVERIFIED, and the host is shared with the Builder.
- The historical W1–W3 facts are Owner-approved packet facts that I did not re-verify. I did not access any raw history.
- A PASS will not establish:
  - AI compliance;
  - authenticated human approval;
  - other OS, Node or cloud support;
  - universal privacy or secret coverage;
  - any authority to publish.

## 6. Next action (via the Owner)

1. **Route the rework.** Send PUB-01 (or the Owner's explicit disposition of it) and PUB-02, with PUB-03 recommended, to Reviewer Actor 02 as r2 on a new candidate. Pass on the PUB-04 publication note to the coordinator.
2. **Review r2.** I will review the result as `r2_REVIEW.md`. This r1 record stays unchanged.

I have not contacted the Builder or the coordinator.

End from Reviewer Actor 01.

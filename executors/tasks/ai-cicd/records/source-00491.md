This is from Reviewer Actor 01.
12:08 am AEDT (2026-10-08)

# r2_REVIEW — WATCHOVER_PUBLIC_RELEASE_2026-10-07

```
REVIEW_RETURN
Task ref:      WATCHOVER_PUBLIC_RELEASE_2026-10-07 (direct Owner assignment)
Verdict:       PASS
Candidate:     5c662eac0449bd30eddd01c606d268f0aa510631 / tree <PRIVATE_REF_00957> / 0.1.2 / release/0.1.2
Blockers:      none
Findings:      PUB-01, PUB-02, PUB-03 RESOLVED.
               Observations: PUB-04 (publication transport), PUB-05 (+1100 timestamp offset), PUB-06 (internal phase labels),
               PUB-07 (hook misses template/multi-line splits; documented as finite), PUB-08 (double blank line in validation.md).
Evidence gaps: see §4
Rework set:    none
Independence:  intended cross-model-family. Reviewer: Claude Opus 5.5 (Claude Code CLI).
               Builder: Executor Actor 02 (Codex; Owner-designated GPT 6.1 Sol; developer context GPT-6; UNVERIFIED).
               Same host (not independent). Reviewer context is product-only, with no raw ops/eval/HC exposure.
```

**What this PASS covers.** This PASS binds only this exact public object to the approved R1–R6 public-edition contract, on the evidence disclosed here. It does not establish:
- universal privacy or secret detection, or DLP;
- AI compliance or authenticated human approval;
- support on other OSes, Node versions or clouds;
- any historical experiment's validity;
- any publication authority. Tag, push, remote creation and publication remain coordinator actions.

The earlier private 0.1.2 acceptance is not a substitute for this review.

## 1. Binding

| Item | Value |
| --- | --- |
| Commit | `5c662eac0449bd30eddd01c606d268f0aa510631` |
| Tree | `<PRIVATE_REF_00957>` |
| Version / branch | `0.1.2` / `release/0.1.2` (the only ref) |
| History | One root commit, no parents. Author and committer: `WatchOver contributors <ACCOUNT_EMAIL_067>`, 2026-10-07 23:58:45 +1100 |
| Tags / remotes | none / none |
| Builder `.git/config` | neutral; no remote |
| Repository top level | its own |
| Public file manifest | `evidence/r2-public-file-manifest.json` (SHA-256 `<PRIVATE_REF_02718>…efa7`). 133 files, all mode 100644; the only hidden file is `.gitignore`; no images or binaries |
| Builder review archive | `builder/output/r2/candidate-public.tar` (SHA-256 `<PRIVATE_REF_01009>…744c`). Unpacks byte-identical to the tree; owners are `root/root` |
| r1 preservation | `r2/r1-candidate.bundle` verifies (`<PRIVATE_REF_02615>…`). All 32 r1 Builder artifacts are unchanged. My r1 records are unchanged |
| Source baseline | `../source/`, 146/146 hashes, equal to the accepted `<PRIVATE_REF_03069>…` / `<PRIVATE_REF_01459>…` |
| Environment | macOS 26.6.2 arm64; Node v26.8.1; git 2.53.0; Python 3.12.6 / Playwright 1.59.0 |

**Raw-first order.** I wrote `evidence/r2-raw-first-findings.md` (SHA-256 `<PRIVATE_REF_02895>…ac8b`) at 00:05:35 and opened `SUBMISSION_r2.md` at 00:05:37.

## 2. Matrix (r2)

| Row | Result | Reviewer evidence (`reviewer/output/evidence/`) |
| --- | --- | --- |
| R1 Layout/exclusion | PASS | `r2-path-classification.txt`: 8 directories; 15 exclusions removed; 2 new files; 14 changed; 117 identical. The test accounting from r1 still holds: removed tests belong to the excluded suite or were renamed 1:1. r2 adds 4 tests, for a total of 284. |
| R2 Provider scope | PASS | Core `tools/app/schema` are byte-identical and have no provider dependency. The quick-start smoke runs with `--provider local` (`r2-quickstart-smoke.log`). |
| R3 English/privacy | PASS | **Content:** `r2-privacy-scan.json` checks paths, bytes and commit/config/index/tree metadata with split, escaped and other variant forms, plus CJK and URL checks. It finds zero real hits; the r1 positive control validates the scanner. **Guards:** `r2-guard-plants.log` (22 plants) shows the always-on personal-path guard working; the optional external-denylist hook catching names, "Human Operator", handles, the bare username, split, escaped and path-name forms; the stage labels scoped to the evidence docs; and the exact-URL exceptions holding. With the real denylist configured, the full suite is green (`r2-regression-with-denylist.log`). |
| R4 Evidence/docs | PASS | The approved facts are unchanged from r1. `validation.md` documents the hook and its limits. `architecture.md` wording is aligned, and the docs test asserts it. |
| R5 HELM routes | PASS | The credit, manual routing and pending routes are unchanged. Re-checked at 00:05: workbench 200, agent-run-recorder 200, planned product repo 404 as expected and not linked (`r2-public-links.log`). |
| R6 Regression/smoke | PASS | `npm test` passes 284/284 with 0 skipped (`r2-regression.log`); with the hook configured it also passes 284/284. The real CLI steps exit 0; `show` is loopback-only and serves `/` and `state.json`; it stops cleanly and no process is left behind. |
| BOUNDARY | PASS | Protected surfaces are byte-identical to the source. r1→r2 changed 5 test/doc paths, all inside the r1 change set. |
| FREEZE | PASS | Pinned to the exact commit and tree in §1; the working tree is clean; no tag or push. |

## 3. Disposition of the r1 rework

**PUB-01: RESOLVED (fixed, not waived).**
- **Always on:** a personal-path guard covering Mac, Linux and Windows home paths.
- **Optional:** the `WATCHOVER_PRIVACY_DENYLIST` hook.
  - Fails closed when misconfigured.
  - Reports visibly whether it ran.
  - Ships no private names; the in-product controls use neutral canaries only.
- **Limits:** documented as finite in `validation.md`. Template-literal and multi-line splits are not decoded (PUB-07).

**PUB-02: RESOLVED.** Bare stage labels are allowed only in the three evidence docs, and the strict guard applies everywhere else. Planted "W2" in skills fails; "W2" in the README passes; "W2B" in the README fails.

**PUB-03: RESOLVED.**

**Reconciliation with the Builder narrative.** `SUBMISSION_r2.md` agrees with my independent results on the paths, counts, hook behavior, transport caution and limits. The Builder's 41 guard controls are Builder evidence; my 22 plants are independent.

## 4. Evidence gaps and limits

- The hook's real-identity coverage depends on the operator supplying the private denylist; without it, only the generic guards run, as the hook reports.
- My scanner decodes base64 only for strings of 12 or more characters, and my control for reversed forms was malformed.
- The historical W1–W3 facts are packet facts that I did not re-verify.
- Builder model identity is unverified, and the host is shared with the Builder.

## 5. Coordinator notes (not product defects)

- **PUB-04 (publication transport).** The Builder's `.git` holds unreachable but sanitized objects, including the r1 commit. Publish by one of these methods only:
  - `git push` of `5c662ea…`;
  - from a `--no-local` clone;
  - after `git gc --prune=now`.

  Never copy that `.git` directory or a default local clone of it.
- **Release check.** Before publishing, run `npm test` with `WATCHOVER_PRIVACY_DENYLIST` pointing to the private denylist kept outside the repository, and include a `word:Human Operator` line.

End from Reviewer Actor 01.

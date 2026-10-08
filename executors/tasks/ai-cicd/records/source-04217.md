# r1 raw-first findings: preserved BEFORE reading output/SUBMISSION_r1.md

Recorded 2026-10-07, about 22:25 AEDT, by Executor_Reviewer_UNASSIGNED (Claude Opus 5.5).
Inputs read before this file:
- the approved criteria (control/*);
- the factual locator `builder/output/CANDIDATE_LOCATOR.txt`;
- only the identity/model lines of `builder/output/EXEC_ACK.md` (via grep, to fix the independence declaration);
- the raw baseline→candidate diff and the candidate source;
- my own checks.

**Not read before this file:** SUBMISSION_r1.md, CHECKS.md, the Builder test logs and the Builder patch/manifest files.

## Bound candidate

| Item | Value |
| --- | --- |
| Commit | `<PRIVATE_REF_01925>` |
| Tree | `<PRIVATE_REF_01233>` |
| Version | `0.1.2` (package.json) |
| Clone | `reviewer/product/`, created with `git clone --no-hardlinks` from `../builder/product`, detached at the commit above; clean, no ignored or untracked files; no object file has link count >1 |
| Builder state | branch `final-patch-2026-10-07`, HEAD = candidate, clean; no tag on the candidate; candidate not present in origin `watchover-ai-devops` (baseline is present there as a control) |
| Baseline | `<PRIVATE_REF_01823>…` / tree `<PRIVATE_REF_01954>…` |
| Schema | `schema` tree `<PRIVATE_REF_01990>…` in both baseline and candidate; `event.schema.json` and `state.schema.json` SHA-256 identical |

## Environment

- macOS 26.6.2 arm64; Node v26.8.1; git 2.53.0.
- Browser tests use `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3.12` (3.12.6) with Playwright 1.59.0.
- **This is the same host as the Builder.** Model/method independence holds, but the host environment is not independent.

## Check results by matrix row (my own instruments)

| Row | My evidence | Result |
| --- | --- | --- |
| F01-A | `evidence/r1-F01-view.json`: real `show` CLI over loopback on a synthetic workspace | Covered and working: start on port 0, then stop. The remembered URL then gives ECONNREFUSED, so historical ≠ current. Same-port restart serves the same workspace's state.json. An occupied port gives a visible exit 1 (EADDRINUSE). Another workspace on the remembered port is detected by an identity mismatch. A foreign listener is detectable. `--port 0` gives a new URL. A missing workspace gives exit 1. Guidance is present in router.md and recover.md. No processes left running. **PASS** |
| F02-A | `evidence/r1-cli-checks.json` (F02-A rows), CLI only | Covered and working: snapshot → `decision_request.evidence` → `requested_at` = appended `at` → approval (`related`) → pending cleared. Validate is OK, the full snapshot is read back from disk, and `decision.reply` is preserved. Brief shows `evt → evidence/dec-02-request.json`. The historical approval with no snapshot is disclosed ("snapshot missing", "1 approved request(s) without snapshot locators"). A secret placed in a snapshot is flagged without echoing it. **PASS** |
| F02-B | Source review of router.md step 6, plan.md examples and recover.md step 4; test labelled source-only | Coherent guidance: off-option restatement plus one confirmation, natural language accepted, no extra turn for exact selections, batch reuse within named limits, no expansion to newly required deletion, no per-command approval or downtime threshold, temporary diagnostic cleanup distinguished. README/SECURITY state that validate checks links only. **PASS (guidance layer only; no AI-compliance claim)** |
| F03-A | `evidence/r1-F03-render-five.json` (my own five cases on 08-handoff) and `r1-F03-render-incident.log`; plus the Builder's real-browser test, which ran and passed in my regression run | Covered and working: the problem item is first, marked "Problem found", its badge has no green fill, and Value and Verification are separate. The healthy `false` value carries no problem flag. Stale and unknown are distinct, and unknown shows "no value". **PASS** |
| F04-A | `r1-cli-checks.json` F04-A rows | Covered and working: an explicit `at` 60 s or 1 ms earlier gives exit 1. The events.jsonl SHA-256 is unchanged. Output names the predecessor id and time, `events.jsonl line N`, `/at` and "omit at", and says "nothing was written". An equal explicit time is kept verbatim. An omitted time is filled as max(now, predecessor), with no +1 ms. **PASS** |
| F04-B | `r1-cli-checks.json` F04-B rows plus the regression test for commit-state exit 2 | Covered and working: `--help` and `-h` give 0 with usage on stdout. Ten malformed forms give 64. Append exit 2 says "appended evt-…; the workspace now needs attention". Commit-state 0 and 1 work, with state unchanged on 1. Commit-state 2 ("state.json was replaced, but the post-check…") is exercised only by the Builder's test via a test-only import hook, which I reviewed; I have no independent natural trigger. **PASS** |
| F04-C | `r1-cli-checks.json` F04-C rows and `r1-terminal-intent-inplace.log` | Covered and working: brief "Open intents: 5 (… ; 2 more); complete listing: events.jsonl …", and following that rule retrieves exactly the 5 IDs. Incident with open intents is valid. Commit-state to handoff is refused and names every ID. An in-place handoff/closed edit makes validate name each ID with its line. Brief refuses but lists the IDs. Truthful `unknown` results close the intents, and brief then shows 0. The sealed fixtures 08-handoff and 10-closed still validate. **PASS** |
| F05-A | `r1-secret-checks.json`, `r1-secret-timing.log`, `r1-F05A-false-positive-cli.log` | The four added shapes have positives, no echo, and clean redaction; old patterns are unaffected inline. **Defects R1-01, R1-02, R1-03 below.** **TARGETED_REWORK** |
| F05-B | `r1-F05B-baseline.json`: the README example executed on synthetic data | Equal (reordered) input gives an equal digest, a changed binding gives a different digest, the projection holds no secret, and the delta is recoverable. The limit is disclosed (secret-only changes are invisible; digests are private). Guidance is in execute.md, five provider files, README and SECURITY. **PASS (guidance and example)** |
| F05-C | `r1-F05C-git.log`: disposable `git init` repo | Covered and working: `.gitignore` (`*`) is created. `check-ignore` attributes state, events, evidence and the pointer to the workspace guard. `add -A` stages only the known-present control. An explicit non-forced add is refused (exit 1). The host `.gitignore` SHA is unchanged. `add -f` still stages, as documented. **PASS** |
| F06-A | Source review of execute.md, verify-handoff.md teardown and README; Builder test with human actor, `created_this_run` and existing fields | **PASS** |
| F06-B | Source review of verify-handoff.md, providers, README and SECURITY, plus a `git grep` of fixtures | Docs are correct. **Defect R1-05:** the shipped valid fixtures still say "Fully reversible". **TARGETED_REWORK** |
| BOUNDARY | diff stat, schema bytes, protected paths (`commit.mjs`, `server.mjs`, `validate.mjs`, `freshness.mjs`, fixtures, docs: empty diff; README shows changes as a known-present control), package.json (version only, no deps) | All 31 changed files are within the permitted list (`tests/browser/view_check.py` counts as an affected test helper). No new command family. **PASS**, with hygiene note R1-06 |
| FREEZE | Builder clean; HEAD = candidate; no tag; not pushed | **PASS** for the candidate pin; the verdict is in r1_REVIEW.md |

Regression: `npm test` → 286 tests, 286 pass, 0 fail, 0 skipped (`evidence/r1-regression.log`). The new browser and view tests emit their case JSON in the log.

## Findings (complete for this pass)

- **R1-01 [F05-A, correctness/compatibility, REWORK].** `scanText` switched from per-line to whole-text `matchAll`. The existing `secret-assignment` regex uses `\s*` around `[:=]`, so it now crosses newlines. Benign nested YAML such as `token:\n  enabled: true`, `password:\n  existingSecret: db-credentials-ref` and `password:\n  from_env: X` is now a finding. Baseline 0.1.1 accepted the same evidence (exit 0); the candidate gives validate exit 1, `brief` refuses, and commit-state is blocked. This undocumented widening of an existing pattern contradicts "nearby benign inputs accepted".
- **R1-02 [F05-A, correctness, REWORK].** The new `yaml-credential-next-line` treats a nested mapping key as the value: `secret:\n  annotations:` and `password:\n  valueFrom:` are flagged, because the value class permits a trailing `:`. This is a common nearby benign deployment shape that the Builder's negative set does not cover.
- **R1-03 [F05-A, low, fix or document].**
  - `docker-auth-field` flags plain words of 8 or more characters (`{"auth": "required"}`, `"disabled"`).
  - `named-key-secret-assignment` carries the `/i` flag, so lowercase identifiers like `sort_key = created_at_timestamp` match, as does `SSH_PUBLIC_KEY=<path>`.

  These fail safe, but they are nearby benign inputs. Either narrow them or list them as accepted false-positive limits in SECURITY.md.
- **R1-04 [robustness, low, non-blocking].** `yaml-credential-next-line` is quadratic on a long run of spaces/tabs after `credential-key:`: 20k chars take 0.2 s, 40k take 0.8 s and 80k take 3.2 s. The two adjacent `[ \t]*` around the optional `[|>]` overlap. Baseline was 0 ms. Recommend making them non-overlapping, preferably alongside R1-02.
- **R1-05 [F06-B, wording, REWORK (small)].** `fixtures/valid/scenarios/view-handoff-confirmed/state.json:84` and `view-handoff-exception/state.json:84` keep `"reversibility": "Fully reversible"`, which is the exact unqualified claim WO-F06 says to replace. These are generic fixtures within the permitted scope, and the page renders them in the decision card. The older test data at `tests/skills-workflow.test.mjs:115` (DNS, "Reversible: delete the record.") is inconsistent with the new test's own TTL-caveat wording. That part is optional.
- **R1-06 [hygiene, non-blocking].**
  - `router.md` rewraps several unrelated paragraphs. This is whitespace-only, confirmed by `git diff -w --word-diff`, but it inflates the diff.
  - The fact-verification bullet lost "under `evidence/`".
  - `verify-handoff.md` item 5 has a continuation line that lost its indent. It still renders as lazy continuation.
- **R1-07 [observation, non-blocking, Owner awareness].** Pre-existing fixture labels are still favorable-result phrasings, for example `gcp.permissions` "Account can create compute resources", which is VERIFIED_REMOTE from a visible `roles/compute.admin` binding, and 05-incident's "Web → api → db chain returns data". The spec required guidance, not a fixture rewrite, so this is not a defect, but the examples lag the new F03/F06 guidance.
- **R1-08 [observation].** The existing canary and redaction tests changed their input from inline to newline-wrapped. I independently confirmed that all 11 baseline canaries still fire in inline context, so the change masks nothing.
- **R1-09 [observation, non-blocking].** The F01 guidance confirms identity by reading `state.json`. There is no unique workspace id (`workspace_id` is null), so two workspaces with the same alias need a fuller comparison (identity block or events). The wording "confirm this workspace's identity" permits that.

## Evidence gaps / limits

- F02-B and F06-A are verified only at the guidance/source layer. No AI-behavior or compliance experiment was run.
- Commit-state exit 2 relies on the Builder's test-only injection hook, which I reviewed and which ran green; I did not trigger it independently.
- Single host and OS, shared with the Builder. No cloud, Docker, real credentials or other platforms.
- The Builder's model identity is self-reported in EXEC_ACK ("Codex assistant, developer-described GPT-6") and is not independently verifiable. The approved-basis SHA is held by the coordinator and is unknown to me. The Reviewer HELM identity is unassigned.

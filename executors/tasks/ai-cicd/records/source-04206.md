This is from Executor_Reviewer_UNASSIGNED.
10:10 pm AEDT

# r1_REVIEW — WATCHOVER_FINAL_PATCH_2026-10-07

```
REVIEW_RETURN
Task ref:      WATCHOVER_FINAL_PATCH_2026-10-07 (direct Owner task)
Verdict:       TARGETED_REWORK
Blockers:      none (all rows were inspectable)
Findings:      R1-01, R1-02, R1-03, R1-05 (rework); R1-04, R1-06 (non-blocking); R1-07, R1-08, R1-09 (observations)
Evidence gaps: see §4
Rework set:    R1-01, R1-02, R1-03 (fix or document), R1-05; R1-04 recommended alongside R1-02
Independence:  cross-model-family. Reviewer: Anthropic Claude Opus 5.5 (claude-opus-5-5), Claude Code CLI, fresh session.
               Builder (self-reported, unverified): Executor Actor 02, Codex / "developer-described GPT-6".
               Method independence: raw-first order, my own no-hardlink clone, my own instruments.
               Host is NOT independent: same macOS machine as the Builder.
```

**Identity caveat (Charter §2).** No HELM Reviewer identity has been assigned, and an `UNASSIGNED` identity cannot carry formal verdict meaning. The verdict content above is final for this pass. Its formal standing waits until the Owner assigns an identity or confirms that `UNASSIGNED` is acceptable for this direct task.

## 1. Bound candidate and environment

| Item | Value |
| --- | --- |
| Candidate commit / tree | `<PRIVATE_REF_01925>` / `<PRIVATE_REF_01233>` |
| Version | `0.1.2` (package.json, README) |
| Baseline | `<PRIVATE_REF_01823>` / `<PRIVATE_REF_01954>` (0.1.1) |
| Reviewer clone | `reviewer/product/`, made with `git clone --no-hardlinks` and checked out detached at the candidate. Clean; no file has link count >1. |
| Builder source state | Branch `final-patch-2026-10-07`, HEAD = candidate, clean. No tag on the candidate, and the candidate is not in origin. The Builder's `baseline-to-candidate.patch` matches my `git diff` exactly (SHA-256 `<PRIVATE_REF_03238>…`). |
| Schema | Tree `<PRIVATE_REF_01990>…` is unchanged, and both schema files are byte-identical. |
| Environment | macOS 26.6.2 arm64, Node v26.8.1, git 2.53.0. Browser checks ran with Python 3.12.6 and Playwright 1.59.0. |

All evidence paths are relative to `reviewer/output/`. Check scripts are in `evidence/scripts/`.

**Raw-first proof.** I wrote `evidence/r1-raw-first-findings.md` (SHA-256 `<PRIVATE_REF_02929>…28f0`, mtime 22:05) before reading `SUBMISSION_r1.md` at 22:05:28. That file says "about 22:25" in its header; this is a typo for about 22:05. The file is left unedited and the correction is logged in `review_log.md`.

## 2. Matrix coverage

| Row | Result | Reviewer evidence | What it establishes / limit |
| --- | --- | --- | --- |
| F01-A | PASS | `evidence/r1-F01-view.json` | The real `show` CLI on a synthetic workspace:<br>• stopping it makes the remembered URL refuse connections (ECONNREFUSED);<br>• restarting on the same port serves the same workspace's state;<br>• an occupied port fails visibly (exit 1);<br>• a different workspace or a foreign listener on that port is detectable.<br>Guidance is in router.md and recover.md. This is local runtime plus guidance text, not live AI behavior. |
| F02-A | PASS | `evidence/r1-cli-checks.json` (F02-A rows) | CLI sequence: snapshot → request.evidence → requested_at → approval → pending cleared.<br>• The snapshot reads back fully from disk, and the reply is preserved.<br>• Brief shows the locator.<br>• A missing historical snapshot is disclosed.<br>• The schema is unchanged. |
| F02-B | PASS (guidance only) | Source review of router.md §Asking 5–6, plan.md and recover.md | The guidance is coherent and labeled advisory. There is no enforcement and no claim that the AI will comply. |
| F03-A | PASS | `evidence/r1-F03-render-five.json`, `r1-F03-render-incident.log`, plus the browser test in `r1-regression.log` | • The problem fact comes first, carries a problem flag and has a non-green badge.<br>• Value and verification are shown separately.<br>• A healthy false value is not flagged.<br>• Stale and unknown facts look distinct. |
| F04-A | PASS | `evidence/r1-cli-checks.json` | An explicit time earlier than the previous event (by 60 s or by 1 ms) is refused with exit 1, and the events file hash is unchanged. The message gives the predecessor's id and time, `line N`, `/at`, and the advice "omit at". An equal time is kept verbatim. The default fill is max(now, predecessor), with no +1 ms. |
| F04-B | PASS | `evidence/r1-cli-checks.json`; the Builder's commit-state exit-2 test, which I reviewed | • `--help` and `-h` exit 0.<br>• Ten malformed invocations exit 64.<br>• Append exit 2 says the event was written and the workspace needs attention.<br>• Commit-state exits 0 or 1 correctly.<br>• Commit-state exit 2 is shown only through the test-only hook (§4). |
| F04-C | PASS | `evidence/r1-cli-checks.json`, `r1-terminal-intent-inplace.log` | • Brief gives an honest count and a retrieval predicate that returns exactly the open IDs.<br>• Open intents are allowed in the incident stage.<br>• Handoff and closed name every unpaired ID through commit-state, validate and brief.<br>• Truthful `unknown` results close them.<br>• The sealed fixtures still validate. |
| F05-A | **REWORK** | `evidence/r1-secret-checks.json`, `r1-F05A-false-positive-cli.log`, `r1-secret-timing.log` | All four added shapes are detected without echoing values, and redaction clears them. Old patterns still fire inline. **However, nearby benign inputs are now flagged: R1-01, R1-02, R1-03.** |
| F05-B | PASS (guidance and example) | `evidence/r1-F05B-baseline.json` | Running the README projection: equal inputs give equal digests, a changed input changes the digest, no secret is retained and the delta is recoverable. The limit is documented. |
| F05-C | PASS | `evidence/r1-F05C-git.log` | In a disposable repo, the ignore guard catches state, events and evidence, and the known-present control is staged. A normal explicit add is refused. The host `.gitignore` is unchanged. Forced add still works, as documented. |
| F06-A | PASS | Source review plus the Builder's existing-schema test | `created_this_run` with a human actor; cleanup guidance names approval, the executing party and verification. Origin is not treated as authorization. |
| F06-B | **REWORK** | `git grep` of fixtures plus source review | The docs are scoped correctly, and Basic decisions are stated to be AI transcriptions. **The shipped fixtures still say "Fully reversible" (R1-05).** |
| BOUNDARY | PASS | diff stat; schema bytes; protected-path diff (empty, with README as a known-present control); `evidence/r1-regression.log` (286/286, 0 skipped) | All 31 files are in permitted scope, with no dependency, enum, schema, lock or transaction change. The page is preserved. Hygiene note: R1-06. |
| FREEZE | PASS (pin) | §1 | The exact candidate is bound and clean. No tag, push or publication. |

## 3. Findings

### Rework set (each item can be fixed on its own; all are small and in scope)

**R1-01: secret scanning now matches across lines, so benign nested YAML is flagged** (F05-A; correctness/compatibility)
- **Cause.** `tools/lib/secret-scan.mjs` `scanText` switched from per-line testing to whole-text `matchAll`. The existing `secret-assignment` regex uses `\s*` around `[:=]`, so it now spans newlines.
- **Effect.** `token:\n  enabled: true`, `password:\n  existingSecret: db-credentials-ref` and `password:\n  from_env: X` are now findings. With that evidence file, 0.1.1 `validate` exits 0. The candidate exits 1, `brief` refuses and commit-state is blocked.
- **Disclosure.** This is an undocumented widening of an existing pattern.
- **Fix.** Keep single-line patterns line-bounded, for example `[ \t]` instead of `\s`, or per-line scanning for non-multiline patterns. Add these benign negatives to the tests.

**R1-02: the YAML next-line pattern treats a nested mapping key as a value** (F05-A; correctness)
- **Cause.** The value character class allows a trailing `:`.
- **Effect.** `secret:\n  annotations:` and `password:\n  valueFrom:` (common deployment shapes) are flagged.
- **Fix.** Exclude values that end in `:`, and add nested-mapping negatives.

**R1-03: two new patterns flag ordinary words** (F05-A; low)
- `docker-auth-field` flags plain words such as `{"auth": "required"}`.
- `named-key-secret-assignment` has the `/i` flag, so it matches lowercase identifiers such as `sort_key = created_at_timestamp`, and it also matches `SSH_PUBLIC_KEY=<path>`.
- **Fix.** Narrow these, or list them in SECURITY.md as accepted false-positive limits. This is an Owner/Builder choice; either way it should be resolved explicitly.

**R1-05: shipped fixtures still say "Fully reversible"** (F06-B; wording)
- `fixtures/valid/scenarios/view-handoff-confirmed/state.json:84` and `view-handoff-exception/state.json:84` keep `"reversibility": "Fully reversible"`. WO-F06 forbids exactly this, and these generic fixtures are within the permitted scope.
- **Fix.** Describe the bounded rollback and name any irreversible effects.
- **Optional.** Align the older DNS test data at `tests/skills-workflow.test.mjs:115` ("Reversible: delete the record.") with the TTL caveat used elsewhere.

### Non-blocking

**R1-04: quadratic slowdown on long whitespace runs** (robustness)
- `yaml-credential-next-line` is quadratic on a long run of spaces or tabs after `key:`: 80k characters take 3.2 s, against about 0 ms in the baseline.
- The two adjacent `[ \t]*` overlap. Recommend fixing this together with R1-02.

**R1-06: hygiene**
- `router.md` rewraps unrelated paragraphs (whitespace-only; I checked with `-w --word-diff`).
- The fact-verify bullet lost "under `evidence/`".
- `verify-handoff.md` item 5 has a continuation line that lost its indent.

### Observations (no action required)

**R1-07: older fixture labels still use favorable-result wording**
- Examples: `gcp.permissions` "Account can create compute resources", which is VERIFIED_REMOTE from a visible role binding, and "Web → api → db chain returns data".
- These pre-date the patch, and the spec required guidance changes, not a fixture rewrite. Flagged for Owner awareness.

**R1-08: canary/redaction test inputs changed**
- These tests moved from inline to newline-wrapped input.
- I confirmed independently that every baseline canary still fires inline, so nothing is masked.

**R1-09: no unique workspace id**
- There is no unique workspace id (`workspace_id` is null), so the F01 identity check should compare the identity block or events, not only the alias. The current wording allows this.

### Reconciliation with the Builder submission (read after my findings)

The submission is consistent on the bindings, boundary, test count, and patch equality. It states that no fixture bytes were changed, which explains R1-05. Its F05-A benign set does not include nested-mapping or cross-line shapes, which explains why R1-01 and R1-02 were not caught.

The Builder's intake disclosure (incidental filename and process-list metadata, contents not opened) is a process note for Owner judgment, not a product defect.

The Builder ran its checks outside the sandbox with approval; I ran mine in this session without sandbox issues.

## 4. Evidence gaps and scope of this verdict

- F02-B, F06-A and part of F01 are verified at the guidance/source layer only. This review makes no claim about live AI compliance or authorization enforcement.
- Commit-state exit 2 is evidenced only by the Builder's test-only injection hook. I reviewed it and saw it pass, but I did not trigger it independently.
- Everything ran on one host and OS, shared with the Builder. There was no cloud, Docker, real credentials, other Node versions or other platforms.
- Builder model identity is self-reported. The approved-basis SHA-256 `<PRIVATE_REF_01778>…` is held by the coordinator, and I have not verified it. The Reviewer HELM identity is unassigned.
- After rework, a PASS will cover only that exact new candidate under the approved six-item matrix. It will not cover runtime authorization enforcement, universal secret detection, untested platforms or historical records.

## 5. Next action (through the Owner/coordinator)

Route the rework set R1-01, R1-02, R1-03 and R1-05 to the Builder as a new submission round (r2), with R1-04 recommended. I will review r2 as `r2_REVIEW.md`, append to `review_log.md` and keep this record unchanged. I have not contacted the Builder.

End from Executor_Reviewer_UNASSIGNED.

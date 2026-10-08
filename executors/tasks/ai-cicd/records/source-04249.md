# r2 EXEC_SUBMISSION — WatchOver eight-patch Mac candidate

[Role / author]: Executor Actor 01 (Claude Opus 5.5; continuing session per r3 amendment, not fresh)
[Written at]: 2026-10-06T17:12:25+1100 (local terminal clock)
[Plan basis]: rounds/r2_PLAN.md (<PRIVATE_REF_03074>14de) + rounds/r3_PLAN.md (<PRIVATE_REF_01775>4277); plan PASS rounds/r3_PLAN_REVIEW.md (<PRIVATE_REF_03564>)
[Also applied]: rounds/r4_PROVIDER_NEUTRAL_CLARIFICATION.md (<PRIVATE_REF_03037>756d)
[Evidence]: rounds/r2_EXEC_EVIDENCE/ (pins in rounds/r2_EXEC_EVIDENCE.sha256)

## 1. Exact candidate

| Item | Value |
|---|---|
| Repository | `<WORKSPACE>/Desktop/helmls-studio/watchover-ai-devops` (local; no remote configured) |
| Branch | `main` |
| Candidate commit | `<PRIVATE_REF_02324>` |
| Candidate tree | `<PRIVATE_REF_01897>` |
| Version | `package.json` `0.1.1`; tag `v0.1.1` to be created on this exact commit only after independent acceptance |
| Base | `<PRIVATE_REF_02752>`; 36 files changed, +2057 / −44 |
| Worktree at submission | clean |
| Runtime used | Node v26.8.1, macOS 26.6.2 (25G83) |

**Commits (oldest first)**
1. `<PRIVATE_REF_02654>`: the three Owner edits, committed unchanged.
2. `<PRIVATE_REF_02340>`: P01.
3. `<PRIVATE_REF_01445>`: P02 and P04.
4. `<PRIVATE_REF_03477>`: P03.
5. `<PRIVATE_REF_02351>`: P05–P08.
6. `<PRIVATE_REF_02324>`: version and docs.

**Tests**
- Baseline: 241/241 (`r2_EXEC_EVIDENCE/baseline_241.tap`).
- Candidate: 271/271, 0 failed, 0 skipped (`final_271.tap`). Command: `node --test "tests/**/*.test.mjs"` with TMPDIR under `/private/tmp`. The real-browser view tests ran and passed.

## 2. What changed (by item)

### WO-P01

- `tools/lib/commit.mjs` (new): implements `commit-state`.
- `validate.mjs`: adds `validateCandidate`. It runs all existing checks on the candidate against the current events and evidence, plus the new `evidence-exists` check: every evidence path a fact cites must be a real file under `evidence/`, reached without a symlink. The check runs in `commit-state` only.
- `schema-subset.mjs`: length messages now include the actual length.
- `watchover.mjs`: new subcommand and exit code 2.
- Commit sequence:
  1. snapshot `state.json` and `events.jsonl`;
  2. validate the candidate;
  3. write a temp file in the same folder (`wx`) and fsync it;
  4. **final** stale comparison of both files;
  5. rename over `state.json`;
  6. best-effort fsync of the folder;
  7. post-validate. A problem found here is reported as "replaced; post-check failed", never "nothing written".

### WO-P02

- `router.md`: the early-view section is now short.
- `plan.md`: full early-view steps (start `show` yourself, `--port 0` if the port is taken) and the narrow exception.
- How the page reply is recorded: on the view's `intent`/`result` pair plus the `USER_CONFIRMED` fact `view.page_confirmed`. It is **not** a `decision` event, because a `decision` must answer a gate request and page confirmation is not a gate.
- Exception (only for a page that is genuinely unreachable): a `BLOCKED` fact `view.page_unreachable` plus a `USER_CONFIRMED` fact `view.continue_with_disclosure` carrying the explicit reply ("continue with disclosure").
- README states the exception.
- New fixtures `scenarios/view-handoff-{confirmed,exception}`.

### WO-P04

- Router opens with the five-step Intent → Action → Result → State → Validate loop.
- New missing-file rule: disclose once in `open_items`, continue only the generic flow, no new permission.
- Router stays within budget: 166 of 170 lines.

### WO-P03

- `tools/lib/brief.mjs` + `brief <ws> [--now]`:
  - runs the full validation first; an invalid record is refused with exit 1 and no summary;
  - at most 30 lines; nothing is written.
- `freshness.mjs`: adds `remainingMinutes`, `freshnessText` and `humanAction`, shared by the CLI and the page.
- Page: banner "Your next action" or "Nothing needs you right now"; remaining minutes in the trust rows.

### WO-P05–P08 and r4

- Generic rules live in `stages/execute.md`, `recover.md` and `verify-handoff.md`; router rule 8 points to them.
- `gcp.md` only illustrates them: the implicit disk name comes from describe output; the first billable action may not be a VM; `gcloud compute ssh` can write metadata; API disable caution.
- `execute.md` examples now use the neutral `<provider CLI>` placeholder.
- Page gains a "Services" list derived from `health.<component>` facts.
- Fixtures: `scenarios/services-and-names`, `shared-object-delta`, `interrupted`, `awaiting-acceptance`. All use provider `local`, so the core works without GCP.
- Docs: README provider-neutral wording, architecture commands, D-09 / D-23 / D-49 updated, new D-59–D-62.

**Fixture generation:** fixtures were built through the product's own `init`/`append`/`commit-state` path. The generator, kept out of the repo, is in `r2_EXEC_EVIDENCE/fixture_generator/`. `evidence/` folders are git-ignored by product rule (FT-3). Fixtures therefore cite evidence they do not ship, as the existing fixtures already do. P07 hashes are recomputed inside the test from deterministic synthetic content.

## 3. Acceptance matrix (local; test names are in final_271.tap)

| Row | Result | Behaviour evidence |
|---|---|---|
| P01-a | PASS | Valid commit, then `validate` passes. Object `value`, 301-character `value` (`at most 300 characters (got 301)`) and `/secrets/n/availability` (enum listed, value not echoed) are each refused. State sha256 unchanged every time; no temp file left. CLI refusal output does not contain the canary. `tests/commit-state.test.mjs` |
| P01-b | PASS | Rejected: a semantic inconsistency (`pending-decision-has-request`); a cited file that is missing, behind a symlink or a folder (positive control: the same candidate with the file present is accepted); a secret in an evidence file. Injected temp-write (ENOSPC, partial file) and rename (EBUSY) failures keep the original and leave no temp. A state edit or events append injected at both boundaries (after snapshot; after temp fsync, before the final compare) is refused and the newer bytes are kept. |
| P02-a | PASS | `startViewServer({port:0})` binds a real port and serves this workspace. The CLI prints the actual URL, which answers 200. Docs consistently say to start it during planning; no contrary wording remains. `tests/view-handoff.test.mjs` |
| P02-b | PASS (docs/fixtures) | Fixtures keep page confirmation, the exception and the plan-acceptance request separate (no `decision` event for the page; `pending_decision` still `plan_acceptance`). The docs require an explicit reply, list silence, a timeout, an ambiguous "continue" and a refused accessible page as not qualifying, and grant no cost/DNS/delete approval. **Actual AI behaviour: Windows, UNVERIFIED.** |
| P03-a | PASS | At a fixed time, fresh / exactly-at-expiry / STALE / UNKNOWN / future-dated / USER_CONFIRMED facts get identical classification and minutes in `brief` and the page. Exactly at expiry is not current (remaining 0). `tests/brief.test.mjs` |
| P03-b | PASS | 200 facts: ≤ 30 lines, exact totals, an exact "N more facts not shown; see state.json /facts" line, blocked facts first. Pending / working / terminal / handoff fixtures: brief and page show the same human action. Approvals are labelled "history, not new authority". Byte-and-file-set snapshot unchanged. Invalid records (malformed JSON, schema, semantic, evidence secret) give exit 1, no summary lines, no secret, nothing written. |
| P04 | PASS | Complete package: 10+ router references, none dangling. A temp reduced package without `providers/` is detected; the router keeps the missing-file, secret and gate rules. Budgets pass (router 166/170; stages ≤ 80/90; gcp 74/110). The product's own providers are untouched. `tests/skill-package.test.mjs`, `skills.test.mjs` |
| P05 | PASS | Arbitrary components (`api`, `web`, `worker`; renamed `queue-consumer-7` also renders). Rows show host name and id, value, badge, last check and evidence. Fresh = minutes left; STALE never "fresh"; UNKNOWN = "never checked". One `health.api` key with two `fact_verified` events kept in history. Retired container stays `deleted`, backed by a negative-result fact with a control. A 90-minute health window is refused by validation. No new schema or upsert. `tests/scenarios.test.mjs` |
| P06 | PASS | Logical id ≠ real name for containers; the implicit volume keeps its returned name; both appear on the page. The manifest tag is "Declared in…", not VERIFIED_REMOTE; the runtime tag without an observation is UNKNOWN and is not shown as current. Docs: "Never assume two names match"; gcp.md no longer says the first VM is always the first billable action. |
| P07 | PASS (pure local) | 1-key baseline plus an 8-key delta; removing exactly the delta restores the baseline hash; resetting the whole object would not match. Fixture facts carry the same hashes. Unprovable access-policy preservation stays UNKNOWN. Docs: undo only the authorized delta; UNKNOWN, not clean. No cloud. |
| P08 | PASS | Interrupted fixture: exactly one intent without a result. `next` names it, `last_safe_state` is set, and brief and page agree (AI owner, no human action). Awaiting-acceptance: owner is the human, the same action appears in brief and the page banner, and cleanup is an open item. Docs: a killed AI may record nothing; check the intent first; never redo blind; deployed ≠ cleaned; closed claims only proven scope. No new fields. |
| r4 | PASS | Router and stages contain no `gcloud`. All scenario fixtures validate with `provider_profile: local`. README describes the product as provider-neutral; GCP is "the first provider profile being validated". |

### Integration run (C5)

Commands, outputs and exit codes are in `r2_EXEC_EVIDENCE/integration_cli.log`:

| Step | Result |
|---|---|
| `init` | 0 |
| `append` | 0 |
| `commit-state` (valid) | 0, folder sync "synced" |
| `commit-state` (301-character value) | 1, `state.json` unchanged |
| `validate` | 0 |
| `brief` | 0 |
| `show --port 0` | 200 for `/state.json` and `/`; 404 for `/evidence/`; clean exit on SIGTERM |

## 4. OS and durability limits (actually observed versus not)

- **macOS, observed:** temp write with `wx` and fsync; `rename` within one folder; folder fsync reported `synced`.
- **Windows, not run:** rename-over semantics, folder fsync (expected to report "not supported here (…)"), port and process handling. All UNVERIFIED.
- **Concurrency:** single writer only. A change landing between the final comparison and the rename system call cannot be detected without OS locking. Disclosed in code and in the architecture doc.

## 5. Windows handoff (for the frozen version)

- **Get it:**
  - Remote URL, branch/tag and fetch command are PENDING Operations Coordinator's publication release.
  - Version `0.1.1`; tag `v0.1.1` on the accepted commit.
- **Prerequisite:** Node.js ≥ 22. No dependencies; nothing to install.
- **Paths:** use the repository's relative paths. Mac absolute paths must not be reused.
- **Commands** (repo root, synthetic record):
  - `node tools/watchover.mjs init <proj>/watchover --project=<CLOUD_PROJECT> --environment "local trial" --provider local --session session-a`
  - `node tools/watchover.mjs append <proj>/watchover --file event.json`
  - `node tools/watchover.mjs commit-state <proj>/watchover --file candidate.json`
  - `node tools/watchover.mjs validate <proj>/watchover`
  - `node tools/watchover.mjs brief <proj>/watchover`
  - `node tools/watchover.mjs show <proj>/watchover --port 0`, then open the printed URL. Stop with Ctrl-C.
  - Restarting `show` on the same folder restores the page for the same task record. Closing the page or stopping the server changes nothing in the record.
- **Service rows:** see `fixtures/valid/scenarios/services-and-names`. A row is the last recorded observation, not a live probe; it expires per its window, at most 60 minutes.
- **Windows-owned behaviour still UNVERIFIED:**
  1. The AI starts the page itself after the initial plan and gives the actual URL.
  2. It waits for explicit page confirmation before installs, builds or deploys.
  3. A genuinely unreachable page leads to disclosure and an explicit "continue with disclosure".
  4. Page confirmation and the exception are kept separate from cost/DNS/delete approvals.
  5. On continuation it reuses only this workspace's confirmation, reads `brief`, and checks pending intents first.
  6. Windows rename, folder fsync and `show` process/port behaviour.

## 6. Not done (deliberately)

- **Product:** no generic upsert, event+state transaction, monitor or polling, redact tool, new mode/state/status fields, or provider adapters.
- **Environment:** no cloud, SSH, DNS, credential, Docker or install action.
- **Publication:** no push, remote, tag or visibility change; no Mac multi-session AI rehearsal.

## 7. Deviations from the plan

1. **Page reply record:** plan step 4 said the page reply is recorded as a `decision` event. The schema allows a `decision` only for gate requests, so the reply goes on the view intent/result pair plus the fact. Same intent, schema-correct; stated in `plan.md`.
2. **Where the P06/P07 rules live:** they sit mainly in the stage files rather than `gcp.md`, as r4 requires; `gcp.md` keeps only illustrations.
3. **Fixture evidence files:** P02 and P07 evidence files are not committed, because `evidence/` is git-ignored by product rule. P07 is verified by recomputing the hashes inside the test.

## 8. Next

`NEXT=REVIEWER` for independent local verification of exact commit `<PRIVATE_REF_02324>`. On PASS: tag `v0.1.1` locally on that commit, then wait for Operations Coordinator's concrete publication target/action. No further product change without a confirmed finding.

---

Publication note: English translated/redacted historical document, source-04249. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

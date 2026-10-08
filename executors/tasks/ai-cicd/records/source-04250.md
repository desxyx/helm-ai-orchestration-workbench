# r2 PLAN — WatchOver eight-patch Mac pass (WO-P01–WO-P08)

[Role / author]: Executor Actor 01
[Written at]: 2026-10-06T16:38+11:00 (local terminal clock)
[Scope]: rounds/r2_STAGE_RELEASE.md + rounds/r3_CONTEXT_CONTINUATION_AMENDMENT.md; package PATCH_PLAN.md / ACCEPTANCE_MATRIX.md / WINDOWS_HANDOFF.md (package SHA256SUMS 13/13 OK)
[Product state at planning]: repository `<WORKSPACE>/Desktop/helmls-studio/watchover-ai-devops`, branch `main`, HEAD `<PRIVATE_REF_02752>`. Three retained Owner edits are uncommitted: README.md +5/−1, skills/router.md +25/−2, skills/stages/plan.md +16/−1. No other changes; no stash.
[Baseline tests]: `node --test "tests/**/*.test.mjs"` → 241/241 pass, rc 0, run 16:36:40–16:36:56 (TMPDIR in /private/tmp) on Node v26.8.1. The browser tests ran and passed.
[Product access now]: read-only. No product byte written yet.

## EXEC_ACK (r2)

```
Identity:        Executor Actor 01
Layer / Lane:    Executor / product patch (direct Owner-routed follow-on; CORE/EXT N/A)
Capability:      Plan (ReadOnly) now → Execute/WriteExecute on product only after independent plan PASS
Model / client:  Claude Opus 5.5 (claude-opus-5-5, host-exposed) / Claude Code 2.1.289; harness permission mode "auto" (may refuse single actions)
Session:         CONTINUING — the same session that ran W2EP and W2 actual-entry preparation. Reuse per Human Operator
                 (r3 amendment). Not fresh; no isolation claimed. Remembered material: experiment/
                 harness/entry history; BE-1 (W3 holdout filenames, never contents). None of it is
                 used for product fixtures or design inputs; fixtures are neutral synthetic.
Workspace:       product repo above; coordination: execution/watchover_mac_close_2026-10-06/
Branch / HEAD:   main / <PRIVATE_REF_02752> (local refs; no fetch)
Charter parts:   Role Loading Map + Part I + Part II (loaded earlier in this session); skill
                 helm-direct-executor-collaboration-notes read.
Inputs read:     agent.md, README.md, STATUS.md, r2 release, r3 amendment, loadout r2, package
                 EXECUTOR_TASK_PROMPT / PATCH_PLAN / ACCEPTANCE_MATRIX / WINDOWS_HANDOFF;
                 product tools/watchover.mjs, lib/validate.mjs, lib/workspace.mjs, schema-subset
                 error path, schema/state.schema.json, app/web-ui/freshness.mjs, render.mjs outline,
                 tests/skills.test.mjs budgets. Not read: DECISIONS_AND_TRACE, EVAL_PREPARATION_NOTE,
                 OPERATOR_START_HERE, coordinator custody files.
Completed work in this task: none before this plan (no prior Executor edit/test/plan for r1 or r2).
Assumptions:     (1) Local commits on `main` are allowed as internal checkpoints. Nothing is pushed.
                 (2) The "small version" bumps package.json from 0.1.0-a to 0.1.1, plus a local tag
                     `v0.1.1` at the frozen commit. Reviewer/Operations Coordinator may name another string.
Questions:       none blocking.
PASS meaning:    Reviewer local PASS = all matrix rows independently verified on one exact
                 tree/commit/version. It is not Windows AI-behaviour verification and not a publication.
```

## Order and checkpoints

| Step | Patch | Order |
|---|---|---|
| C1 | P01 | 1st |
| C2 | P02 + P04 | 2nd |
| C3 | P03 | 3rd |
| C4 | P05–P08 | 4th |
| C5 | Integration regression + version freeze | last |

- **Commit discipline:** each step is a local commit. The first commit (C1) also records the three Owner edits unchanged, as a separate commit made before any of my changes, so they stay intact and attributable. One final freeze; no intermediate release.
- **Test runs:** full suite at every checkpoint, with TMPDIR under /private/tmp. Tests use only neutral synthetic records.

## Item plans

### WO-P01 — `commit-state <workspace> --file <candidate>`

**Where:**
- `tools/lib/commit.mjs` (new): the single-writer commit.
- `tools/lib/validate.mjs`: export `validateCandidate(dir, stateText)`. It reuses the existing `checkContent` + `readEvidence` with the current events and evidence, and adds no new rules.
- `tools/lib/schema-subset.mjs`: diagnostics only — `maxLength` and `minLength` messages add the actual character count. Values are never echoed.
- `tools/watchover.mjs`: new subcommand and usage line.

**Flow:**
1. Snapshot the sha256 of `state.json` and `events.jsonl`.
2. Read the candidate and run a full candidate validation: schema, named semantic and event checks, evidence locator checks, and a secret scan of the candidate, the current events and every evidence file.
3. If validation fails: exit 1, write nothing, state bytes unchanged.
4. Re-hash state and events. If either changed since the snapshot, refuse as stale (exit 1); nothing is overwritten.
5. Write the temp file `.state.json.<pid>-<rand>.tmp` in the same folder (`wx`), fsync it, `rename` over `state.json`, then a best-effort fsync of the folder (result reported).
6. On a temp-write or rename failure, remove the temp file and keep the original. On failure after the rename, report "state replaced; post-check failed", never "nothing written".

Manual editing and `append` stay unchanged. There is no events transaction.

**Tests:** `tests/commit-state.test.mjs`. Fault injection uses an injectable fs adapter, not real disk faults. Cases:
- valid commit, after which `validate` passes;
- one refusal each for an object `value`, a 301-character `value`, and `/secrets/0/availability` = `"sometimes"`. Each error carries the pointer and the real constraint (types list, `300`, the `usable/blocked/missing` enum), and the state sha256 is unchanged each time;
- a semantic inconsistency, such as a `pending_decision` without its `decision_request`;
- a fact evidence locator to a missing file;
- an evidence file containing a synthetic canary-style secret;
- temp-write failure and rename failure: original intact, no `.tmp` left behind;
- state changed and events changed between snapshot and replace: refused, newer bytes kept;
- CLI exit codes, and output that does not contain the secret.

### WO-P02 — early HTML handoff + Owner exception (keep the 3 edits)

**Where:** `skills/router.md`, `skills/stages/plan.md`, `README.md`.
- The router's "Early view handoff" shrinks to a short reference (frees lines for P04). The full steps move into `plan.md` (67 → ≤ 90 lines).
- Added: the **exception**. It is allowed only if the page is actually unreachable. The AI then:
  1. discloses the exact reason;
  2. asks for the literal choice "continue with disclosure";
  3. records the reply as a `decision` event and a fact (`view.page_confirmed` = USER_CONFIRMED, or `view.page_unreachable` = BLOCKED, with an evidence locator).
- Silence, a timeout, server readiness, an ambiguous "continue", or refusing an accessible page do not release execution. Page confirmation or the exception is never a spend, DNS or delete approval.

**Product check:** `show` already prints the actual URL and accepts `--port 0`. A test asserts that `--port 0` returns a real bound port serving this workspace.

**Fixtures (new, synthetic):** `fixtures/valid/view-handoff/{confirmed,exception}`. They contain separate events for page confirmation, the exception choice and a later billable approval.

**Tests:** fixtures validate. A docs test asserts:
- the exception wording;
- the separation from action approvals;
- no remaining "never depend on the view" or "user must start it" contradiction.

### WO-P04 — router minimal loop + package gaps

**Where:** `skills/router.md` and tests.
- About 10 lines at the top: Intent → Action → Result → State → Validate.
- One rule: if a referenced stage or provider file is absent, disclose it once (`open_items` + a note in `next`), record the impact, and continue only the generic loop and already-approved steps. No new permission, no assumption-filling.
- The router stays ≤ 170 lines and stages ≤ 90. Detail lives in the stage and provider files.

**Tests:**
- complete package: every `stages/*.md` and `providers/*.md` referenced from the router exists (no dangling reference);
- reduced package: a temp copy without `providers/` is detected as missing, and the router text keeps the approval and secret rules;
- budgets still pass.
- The product's own providers are untouched.

### WO-P03 — `brief <workspace>` + shared freshness + human next action

**Where:**
- `tools/lib/brief.mjs` (new, read-only).
- `app/web-ui/freshness.mjs`: add `remainingMinutes(fact, now)` and `freshnessOf(fact, now)`, and use them in both the CLI and the HTML.
- `render.mjs`: top banner "Your next action: …" or "Nothing needs you right now."; remaining minutes in the trust rows.
- `styles.css`: minimal.
- `watchover.mjs`: `brief` with `--now <iso>` (deterministic replay/testing).

**Output:** ≤ 30 lines covering:
- stage, last progress, waiting on, pending decision;
- recorded approvals as event id + scope, labelled as history, not current authority;
- next action and owner, last safe state;
- key, blocking and stale facts with remaining minutes;
- an exact count of omitted facts and their location (`state.json /facts`).

All facts are computed internally. Only non-expired VERIFIED_* facts are shown as current. Writes nothing; no second summary. The existing `state.brief` is untouched.

**Tests (fixed now):**
- fresh / exactly-at-expiry / STALE / UNKNOWN / future-dated / USER_CONFIRMED facts give identical CLI and HTML classification and minutes;
- 200-fact workspace → ≤ 30 lines with correct totals;
- interruption, pending, no-human-action and terminal fixtures;
- workspace bytes and file set identical before and after `brief`.

### WO-P05 — component service rows

**Where:** router (short), `providers/gcp.md` example, `render.mjs` "Services" rows. Test fixture `fixtures/valid/services/`.

**Convention (documented):**
- one `health.<component>` fact per component, class `health`, `fresh_for_minutes` ≤ 60;
- `scope` begins with the host resource `id`;
- the host resource keeps its `parent_id`.

**Rendering:** the HTML derives rows from existing facts and resources only. Each row shows component, host (id + real name), value, trust status, last check and evidence. Expired stays expired; "present/running" is separate from "serving" evidence.

There is no new schema, no services array and no upsert command.

**Fixture/tests:** at least two arbitrary components; a same-key update with no duplicate; stale; UNKNOWN; a host resource with `lifecycle: deleted` whose history is kept.

### WO-P06 — logical id vs real name; declaration vs runtime

**Where:** router (short), `providers/gcp.md`, fixture/tests.
- `resources.id` is a stable logical id; `name` is the provider-returned name, backfilled for implicit disks.
- Copying a manifest gives at most VERIFIED_LOCAL "declared in manifest".
- Only matching provider or runtime evidence upgrades the runtime fact to VERIFIED_REMOTE.
- The docs do not assume the boot disk has the same name, or that the VM is the first billable item.

**Tests:** a fixture with `id` `app-boot-disk` and a different `name`. The view shows both. A local manifest fact does not appear as remote-current.

### WO-P07 — shared-object baseline and exact incremental reversal

**Where:** `providers/gcp.md` (+ a short router reference), a local fixture.
- Before a shared metadata/IAM/API change, save a baseline (stable representation + sha256) as evidence.
- Record this run's delta.
- Reverse only the authorized delta, then check the preserved original against the baseline.
- SSH key writes are recorded as intent/result.
- An API enablement is not auto-disabled without scope check and explicit authorization.
- If preservation can't be proven, the fact is UNKNOWN or carries the missing evidence.

**Fixture:** `fixtures/valid/shared-object-delta/`. Evidence holds a baseline with 1 synthetic key, a delta of 8, and a post-reversal state equal to the baseline (same hash).

**Test:** recompute the hashes and assert the baseline is preserved. No cloud.

### WO-P08 — interruption and terminal responsibility

**Where:** `stages/recover.md`, `stages/verify-handoff.md` (≤ 90 lines), router (short), fixtures.

**Interruption:** use the existing `activity`, `next` and `handoff.last_safe_state`. The first check on resume is any pending `intent` without a matching `result`; the last action is never redone automatically. There is no promise that a force-killed AI recorded anything.

**Terminal:** `next` states one of: keep running, awaiting acceptance, or awaiting cleanup approval, with its owner. "Closed" claims only the cleanup scope actually proven, plus gaps.

**Tests:** interruption and terminal fixtures validate. `brief` and HTML report the same next action and owner.

## Integration, freeze and handoff

- **Regression (C5):** full suite (existing 241 + new) and `validate` on all fixtures. Also a manual run of `init → append → commit-state → validate → brief → show --port 0` on a temp synthetic workspace, with commands and exit codes recorded.
- **Freeze:** `package.json` → `0.1.1`, final local commit + tag. Submission `rounds/r2_EXEC_SUBMISSION.md` contains:
  - exact tree and commit;
  - the full matrix with evidence;
  - OS limits: macOS rename + fsync; directory-fsync result as observed; Windows rename/fsync not verified;
  - the Windows handoff.

## Stop point and unresolved facts

**Stop point:** after the independently accepted frozen local commit and the Windows handoff text. No push or remote write until Operations Coordinator releases a concrete target and action.

**Unresolved (non-blocking):**
- exact remote repo, branch and visibility;
- Windows AI behavior and Windows filesystem semantics;
- whether the Reviewer or Operations Coordinator prefers a version string other than `0.1.1`.

**Not done:** generic upsert, event+state transaction, monitor/polling, redact tool, new mode/state fields, cloud/SSH/DNS/credential/Docker/install.

---

Publication note: English translated/redacted historical document, source-04250. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

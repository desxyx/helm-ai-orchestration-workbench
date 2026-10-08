# r3 EXEC_SUBMISSION — targeted rework WMC-1–WMC-3

[Role / author]: Executor Actor 01 (Claude Opus 5.5; continuing session, not fresh)
[Written at]: 2026-10-06T17:26+11:00 (local terminal clock)
[Responds to]: rounds/r2_REVIEW.md (<PRIVATE_REF_01079>…c428), TARGETED_REWORK on <PRIVATE_REF_02324> / <PRIVATE_REF_01897> / 0.1.1
[Supersedes for acceptance]: rounds/r2_EXEC_SUBMISSION.md (kept unchanged). Its matrix and evidence stand except for the three rows below.
[Evidence]: rounds/r3_EXEC_EVIDENCE/ (pins in rounds/r3_EXEC_EVIDENCE.sha256)

## 1. Exact candidate

| Item | Value |
|---|---|
| Commit | `<PRIVATE_REF_01823>` (main) |
| Tree | `<PRIVATE_REF_01954>` |
| Version | `0.1.1` (unchanged). Tag `v0.1.1` only after independent acceptance of this exact commit |
| Changes since <PRIVATE_REF_02324> | `<PRIVATE_REF_03530>` (WMC-1..3) and `<PRIVATE_REF_01823>` (D-23 doc dependency): 9 files, +213 / −37 |
| Tests | 272/272, 0 failed, 0 skipped (`final_272.tap`) |
| Worktree | clean |

No runtime or product code changed in this rework. The changes are tests, fixtures, one router sentence and D-23.

## 2. Findings

**WMC-1 (WO-P05) — deterministic clock**
- `tests/scenarios.test.mjs` no longer reads the host time. Each scenario is viewed at `identity.updated_at + 5 min` of its own fixture, and the test asserts that this clock lies inside the api window.
- New assertion: the same record viewed at `checked_at + 61 min` shows `verified-expired` and "freshness window ended", never "fresh".
- Fresh, STALE, UNKNOWN and the 60-minute health-cap checks are kept. No runtime freshness change.

Proof, using a test-only preload that shifts `Date.now` +10 days (`clock_shift.mjs`):
- The probe test confirms the shift is active in-process (`--test-isolation=none`).
- **New** scenarios, brief, view-handoff and skill-package tests: 22/22 pass (`clock_shift_plus10d_new.tap`).
- **Positive control:** the **old** <PRIVATE_REF_02324> scenarios test under the same shift fails WO-P05 (`clock_shift_plus10d_old_87fe794_control.tap`).

**WMC-2 (WO-P04) — declared reduced package**
- New declaration: `fixtures/packages/reduced-no-dns/package-omissions.json`.
- The router now says a deliberately reduced package lists its omissions in `skills/package-omissions.json` (router still 166/170 lines).
- New fixture `scenarios/package-gap`: one named gap with its impact, owner AI, and the next step inside the generic flow. The DNS change is still announced as a separate `dns` approval. A continuing commit updates progress ("gap already disclosed") without adding a second disclosure.

The new test in `tests/skill-package.test.mjs` checks:
- it builds the reduced package exactly from the declaration;
- included files = full package minus the declared files;
- the dangling references equal the declared omissions exactly;
- the product's own providers are still present;
- the record has exactly one disclosure per declared file, an impact, the approval wording, no decision event, no pending approval and the DNS gate ahead.

The complete-package and earlier reduced-package checks are unchanged.

**WMC-3 (WO-P07) — scoped undo approval**

The fixture `scenarios/shared-object-delta` was regenerated through init/append/commit-state:
- `decision_request` `dec-02`, categories `["delete"]`, whose summary names exactly `run-key-1..run-key-8` and says `team-shared-setting` stays;
- the matching `pending_decision` with scope, rollback and success check;
- the human approval;
- then the undo intent, with `action_kinds` `["local","gated"]` and related to that approval. The existing `gated-intent-approved` check therefore applies.

The test checks:
- the approval comes before the intent;
- the approval's request is `delete`-only and scoped to the delta;
- the undo is not related to the plan-acceptance decision.

The 1+8-key reversal/hash checks and the UNKNOWN access-policy case are kept.

## 3. Matrix rows updated (others unchanged from r2_EXEC_SUBMISSION)

| Row | Result |
|---|---|
| P04 | PASS: complete package with no dangling references. The declared reduced package matches its declaration and has a one-time disclosure record without invented permission. Budgets pass. |
| P05 | PASS: as before, now independent of the host clock (+10-day shift proof, with the old test as a failing control). |
| P07 | PASS: exact-delta reversal, baseline hash preserved, UNKNOWN when unprovable, undo under its own scoped delete approval. |

## 4. Unchanged

Windows-owned AI behaviour and Windows filesystem/process semantics remain UNVERIFIED. No push, remote, tag or visibility action. Single-writer and final-compare-to-rename limits remain disclosed.

## 5. Next

`NEXT=REVIEWER` for targeted re-verification of WMC-1–WMC-3 and their dependencies on exact commit `<PRIVATE_REF_01823>`. On PASS: tag `v0.1.1` locally on that commit, then wait for Operations Coordinator's publication target.

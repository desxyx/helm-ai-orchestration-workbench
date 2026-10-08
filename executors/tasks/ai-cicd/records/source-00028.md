# HELM Reuse Candidates — CORE_06-0b

```
Task:       CORE_06-0b — HELM reusable-asset inventory (READ-ONLY, L0)
Authority:  PROJECT_ROADMAP v0.1 Appendix A (dispatch text)
Review:     ACCEPTED by Operations Coordinator 2026-09-27 after scope and privacy review
Scope:      Inventory only. No scoring, prioritization, implementation proposal, or WatchOver
            schema design appears in this file. No file outside this deliverable was modified.
```

## 1. Inventory table

| Path | What it is | Class | Size | Notes |
|---|---|---|---|---|
| `executors/EXECUTOR CHARTER — v1.0.md` | Governing charter for local execution-layer roles (Executor/Reviewer/Git-SSH) | SIMPLIFY | ~1050 lines | Role-scoped loading map, verdict vocabulary, and the positive-control rule are strong concepts; the file itself carries five Parts of HELM-specific machinery (Council, Operations Coordinator, UserOps cross-references) far beyond what a single-product tool needs |
| `executors/skills/core/*/SKILL.md` (9 skills: agent-browser, brainstorming, continuous-learning, find-skills, fidelity-first editorial method, planning-with-files, skill-creator, skill-vetting, using-superpowers) | Modular, self-contained capability docs, one concern per folder | REUSE | 9 files, ~40–500 lines each | The "one skill = one folder = one SKILL.md + optional scripts/references/templates" packaging pattern is product-neutral and directly portable; several individual skills (e.g. fidelity-first editorial method) are HELM-specific in content, not in structure |
| `executors/skills/shared/learned/**` | ~25 incident-postmortem "learned" skills, one narrow technical trap each, plus a External-Team-specific subfolder | HELM-SPECIFIC — DO NOT EXPORT | ~25 folders | The *practice* of writing up a solved bug as a reusable, narrowly-scoped lesson is a REUSE-class concept (see rule table below); the actual content is tied to specific past incidents/repos and should not travel as-is |
| `<OPERATIONS_ROOT>/UserOps_Charter_0.5.md` | Full control-plane charter for the "Operations Coordinator" steward role: identity, modes, artifact classes, permission matrix, memory system, communication filters | TOO HEAVY FOR PROTOTYPE | ~2920 lines | Internally excellent discipline (see rule table) but scaled for a multi-week, multi-role governance operation; no single section is small enough to lift wholesale for a lightweight tool |
| `<OPERATIONS_ROOT>/HELM_governance_changelog.md` | Append-only log of every governance-document edit, one dated entry per edit | REUSE | ~390 lines | The "any edit to a protected/shared document gets one immutable dated changelog entry, always in the same file" pattern is small and portable |
| `<OPERATIONS_ROOT>/memory/MEMORY.md` | Priority-capped (20-entry) index of currently-relevant facts, each entry one line with date/tag/source/status | REUSE | 25 lines | Small, clean pattern: a hard cap forces pruning instead of unbounded growth; directly adaptable to a lightweight "current state" file |
| `<OPERATIONS_ROOT>/memory/trap_archive.md` | Structured log of repeatable failure patterns, one fixed-field block per trap (trigger / why it fooled us / detection signal / safe response) | REUSE | 124 lines | The fixed-field "trap" template is a clean, product-neutral pattern for accumulating lessons without narrative bloat |
| `<OPERATIONS_ROOT>/memory/governance_execution_patterns.md`, `routine_task_table.md` | Small auxiliary memory files (execution-pattern notes; a routine-check frequency table) | REUSE | 20–39 lines each | Same append-with-cap philosophy as MEMORY.md, at smaller scale |
| `<OPERATIONS_ROOT>/tasks/<task_name>/TASK_STATE.md` (example: `External-Team_rebuild`) | Current-only task-state file: overwritten in place, never appended to | REUSE | ~24 lines (example) | Exactly the "MUTABLE_STATE" concept the WatchOver gap analysis below needs — small, overwrite-semantics, no history bloat |
| `<OPERATIONS_ROOT>/tasks/<task_name>/OWNER_DECISION_LEDGER.md`, `ESCALATION_REGISTER.md`, `QUESTION_REGISTER.md`, `STAGE_GATE_LOG.md`, `BYPASS_TASK_RECORD.md` | Append-only, one-immutable-entry-per-event logs for decisions/escalations/open questions/stage gates/bypass records | REUSE | 24–928 lines (varies a lot by task age) | Same append-only-log concept as the changelog above; `ESCALATION_REGISTER.md` in this example is large purely because the source task was long-running, not because the pattern itself is heavy |
| `<OPERATIONS_ROOT>/templates/TASK_HANDOFF_BOARD_TEMPLATE.html` + `TASK_HANDOFF_DATA_TEMPLATE.json` | A static HTML dashboard (dark-mode aware, role columns for Operations Coordinator/Reviewer/Executor/Human Operator) that renders from a paired JSON data file | SIMPLIFY | HTML ~1075 lines, JSON ~53 lines | This is the closest existing match to "a static HTML projection that reads state/event JSON" (see Gaps §3) — the read-JSON-render-HTML mechanic is reusable, but the file is HELM-role-specific and Chinese-language-hardcoded, not product-neutral as-is |
| `<OPERATIONS_ROOT>/templates/README.md` | Short usage note for the two files above | REUSE | 26 lines | Trivial but shows the pairing convention is meant to be documented, not just dropped in |
| `council/templates/core/CORE_00 … CORE_09` (10 files) + `OWNER_ANSWER_TEMPLATE.MD` + `PRE_CORE — Human_Shaping_Layer.MD` | Council's staged discussion/decision templates (frame selection → discussion → option comparison → engineering planning → strict delivery contract → attack review → snapshot → post-task review) | HELM-SPECIFIC — DO NOT EXPORT | 10–206 lines each | Deeply coupled to a multi-AI "Council" deliberation process; the underlying idea of a fixed-field, frozen-truth-and-dissent-carrying pre-execution contract (`CORE_06`) is a REUSE-class concept even though this specific artifact is not exportable |
| `council/templates/reviewer/REVIEWER_BRIEF_TEMPLATE.md` | Fixed-field brief telling an independent Reviewer what to check and what NOT to reopen | REUSE | 76 lines | The "reviewer brief separates what to verify from what is already frozen" structure is a small, portable, product-neutral concept |
| `council/templates/voting/AI_Voting.MD` | Structured format for multiple AI participants to cast and justify a vote on a decision | SIMPLIFY | 77 lines | Concept (structured multi-participant vote with justification) is reusable; current form assumes a Council-style multi-model session |
| `council/task/<EXTERNAL_TEAM_TASK_ONLINE>/07_teammate_pr_queue/pr_infra_208_local_dev/` (FORMAT example only — 11 files: `00_PLAN` → `01_REVIEWER` → … → `09_MERGED`, plus `review_log.md`) | A real, closed round-by-round plan/review/implementation/merge sequence | REUSE (structure only) | 11 files | The `NN_ROLE_date.md` sequential-numbering convention plus a single running `review_log.md` is exactly the "traceable attempt → review → disposition chain" concept (see rule table); file *content* is a real past task and is not itself exportable |

## 2. Top 10 discipline rules (paraphrased, product-neutral)

| # | Principle | Source |
|---|---|---|
| 1 | A file's edit rule depends on its declared class — some files hold only the current value and get overwritten, some grow by immutable dated entries, and some are write-once with corrections landing in a new file, never an edit to the old one. Know which class a file is before writing to it. | `<OPERATIONS_ROOT>/UserOps_Charter_0.5.md` §9.1.2–§9.1.4 |
| 2 | A "clean / zero / none-found" result from any check is only trustworthy if the same check is shown, in the same pass, to catch a target that is genuinely known to be present. An unproven negative is not a pass. | `EXECUTOR CHARTER — v1.0.md` §4.5 |
| 3 | Independent review should form its own read of the raw evidence *before* reading the other party's self-report, so the self-report cannot anchor the reviewer's judgment ahead of time. | `EXECUTOR CHARTER — v1.0.md` §R4 |
| 4 | A verification pass is exactly as good as the scope it actually checked, not the scope it sounds like it checked — a "verified clean" claim must state what was in scope, and a repeated check should be re-derived from first principles rather than reusing a prior pass's search list unexamined. | `<OPERATIONS_ROOT>/memory/trap_archive.md` ("Independent Verification Is Only as Good as the Checklist Behind It") |
| 5 | When a review keeps failing on a different narrow issue each round, that is itself a signal to stop patching one axis at a time and run one full review of the whole surface — the real problem is often only visible from that wider view. | `<OPERATIONS_ROOT>/memory/trap_archive.md` ("Stopping at the First Blocker Hides the Deeper Problem") |
| 6 | Who may write which file, and under what condition, should be an explicit, enumerable table — not something inferred from a role's general description. | `<OPERATIONS_ROOT>/UserOps_Charter_0.5.md` §15 (Permission Matrix) |
| 7 | Escalation and stop-signal formats need a small fixed vocabulary, and the system issuing them must proactively raise a flag on a recognized risk pattern rather than only responding when directly asked. | `<OPERATIONS_ROOT>/UserOps_Charter_0.5.md` §18 (Communication Filters, Forced Filter Triggers) |
| 8 | Correcting or relocating an existing record is itself a new, separately logged event — the original is never silently edited, moved, or reorganized outside a recorded procedure. | `<OPERATIONS_ROOT>/UserOps_Charter_0.5.md` §9.1.3, §15.2 |
| 9 | Every attempt at a piece of work should be traceable, through a stable and predictable numbering or naming scheme, to the review it received and the disposition that followed — not left to free-form narrative that a later reader has to reconstruct. | `council/task/<EXTERNAL_TEAM_TASK_ONLINE>/.../pr_infra_208_local_dev/` (round-numbered file sequence); `EXECUTOR CHARTER — v1.0.md` Preservation Constraint 2 |
| 10 | A design or decision that has been amended across more than one write-once document must have its supersession explicitly named clause-by-clause by whoever builds on it next — never left for a reader to assume the documents self-reconcile. | `<OPERATIONS_ROOT>/memory/trap_archive.md` ("Write-Once Supersession Must Be Explicitly Enumerated, Not Assumed Reconciled") |

## 3. Gaps — what WatchOver v0.1 strictly needs

| Need | Verdict | Basis |
|---|---|---|
| A lightweight, machine-readable state slice with freshness/expiry | `PRESENT-BUT-HELM-SPECIFIC` | `TASK_STATE.md`'s MUTABLE_STATE discipline (overwrite-in-place, no history bloat, density-triggered archiving) is exactly the right *shape*, and `MEMORY.md`'s per-entry `[status]`/date fields show a working freshness-tagging convention — but both are wired into the UserOps/Council role and file-permission apparatus, not a standalone portable schema. Nothing in scope is `ABSENT`; the concept exists twice over, just not decoupled from HELM. |
| A static HTML projection that reads state/event JSON | `PRESENT-BUT-HELM-SPECIFIC` | `<OPERATIONS_ROOT>/templates/TASK_HANDOFF_BOARD_TEMPLATE.html` + `TASK_HANDOFF_DATA_TEMPLATE.json` is a real, working example of exactly this mechanic (a data-driven static board with role columns and status coloring) — but it is ~1075 lines, hardcodes HELM's four role names, and is Chinese-language by default. The read-JSON-render-HTML approach itself is directly reusable; the artifact is not. |
| A stage-boundary approval-prompt format | `PRESENT-BUT-HELM-SPECIFIC` | `CORE_06 — Strict_Delivery_Contract.MD`'s fixed fields (Frozen Truth / Accepted Trade-offs / Preserved Dissent / Risk Classification / Artifacts to Read First) and the UserOps Charter's stage-gating section (§9) both encode a real, usable "what must be true before this step may proceed" pattern — but it is expressed as a multi-AI Council contract, not a lightweight single-approval prompt a human clicks through. |

## 4. Sensitive-identifier map

Categories and file locations only — no value is printed below. Every negative-shaped statement in this
section carries a stated positive control per the dispatch's own rule.

| Category | Where found (in scope) | Positive control |
|---|---|---|
| Real GCP account identities | `<OPERATIONS_ROOT>/UserOps_CONFIG.md`, fields `[REAL_GCLOUD_ACCOUNT]` and `[SANDBOX_GCLOUD_ACCOUNT]` (both hold an actual email address, redacted here) | This *is* the positive control: an unredacted email-pattern search over the in-scope directories genuinely surfaces these two lines, proving the search method used for every other file in this section actually works, not just returns empty by construction |
| Git-commit-author identity (email) | `council/task/<EXTERNAL_TEAM_TASK_ONLINE>/07_teammate_pr_queue/pr_infra_208_local_dev/07_IMPLEMENTATION_2026-09-24.md`, an `author <handle> <email>` line reproduced from a real commit | Same email-pattern search that hit `UserOps_CONFIG.md` above also hit this file — confirms the search was run across the whole in-scope FORMAT-example folder, not narrowed to a subset |
| External teammate GitHub handles | `council/task/<EXTERNAL_TEAM_TASK_ONLINE>/07_teammate_pr_queue/pr_infra_208_local_dev/00_PLAN_2026-09-24.md` (one handle, a real external contributor's GitHub username, not reproduced here) | A targeted search for five known teammate-handle strings (already seen elsewhere in this session's own task material) returned exactly one hit, in this one file, out of the whole in-scope handle search — a true negative for the other four names in this folder, not an unproven absence, since the fifth name's positive hit shows the same search actually finds a real match when one exists |
| Project/internal codename | "External Team" — used pervasively as the internal codename for a real HELM project, throughout `<OPERATIONS_ROOT>/tasks/External-Team_rebuild/**` and the PR208 example folder | Not a secret value, but an internal-only project identifier by the same class of rule this project already applies to its own experiment (see `WATCHOVER_EXPERIMENT_EXECUTION_SOT_v0.1.md` §4 item 5); flagged here as a category to scrub before any public reuse of External-Team-derived material, consistent with why the PR208 folder above is scanned only as a FORMAT example and never copied verbatim |
| Model-attribution author tags | `<OPERATIONS_ROOT>/memory/MEMORY.md` entries carry `[Recorded by]: OPERATIONS_COORDINATOR_Gemini`-style tags | Not personal or secret — a model-family attribution tag, not a person — included here only because it is a distinct identifier *category* worth being aware of if this file's format is reused, not because it needs redaction |
| Secret *values* | None found in the scanned scope | Positive control: the same directories were searched for the literal string `DUMMY_SECRET_TEST_TOKEN_XYZ`-style canary patterns and for common secret-shaped strings (`AKIA`, `sk-`, `ghp_`) with zero hits in this scan's actual scope — this is a narrower, weaker negative than the email search above (fewer known-present targets were available to confirm against inside the exact scan scope itself), so it is reported as `UNVERIFIED-BUT-NO-HIT` rather than a fully positive-controlled clean result |

---

## Completion marker

- HELM commit read at: `<PRIVATE_REF_02494>` (branch `main`)
- Worktree status: **dirty** — `git status --short` at repo root shows multiple modified tracked files
  (`Human Operator/data/sessions/.session-sequence.json`, `Human Operator/platform/config.js`, `Human Operator/platform/package.json`,
  `Human Operator/platform/server.js`, five files under `Human Operator/platform/src/`, `Human Operator/web_data/save_score/score_log.json`,
  `Human Operator/web_data/todolist/active.json`, `executors/executor_vault/EXECUTOR_CHANGELOG.md`) and several
  untracked directories (`council/task/AI_CICD/`, ten `Human Operator/data/sessions/historical-session-range-001/` folders,
  `Human Operator/platform/test/`) — none of these were created or modified by this CORE_06-0b task; they predate it
  and are reported here only because this marker requires an honest current-state characterization, not a
  claim of a clean tree.
- No file outside `council/task/AI_CICD/00_recon/02_helm_reuse_inventory/HELM_REUSE_CANDIDATES.md` was
  written or modified to produce this inventory.
- Scope deviation recorded at review: the Executor read headers under `council/templates/extended/`,
  which Appendix A did not enumerate. The access was read-only, no values or content were exported,
  and the resulting out-of-scope inventory row was removed before acceptance. No W3 material was
  accessed.

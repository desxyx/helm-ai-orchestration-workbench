# W2 entry local preparation — Executor submission r2

[Artifact Class]: VERSIONED_CANDIDATE
[Candidate]: W2EP-CAND-r2 (supersedes r1 for acceptance; r1 files, 0.3.0 harness and r1 export retained unchanged)
[Written by]: Executor Actor 01 (Claude Opus 5.5, same fresh task session)
[Written at]: 2026-10-04T21:10+11:00 (local terminal clock)
[Responds to]: `evidence/reviewer/REVIEW_RETURN_W2EP_r1.md` (`<PRIVATE_REF_02827>…6c9f`), TARGETED_REWORK F1–F3
[Also applies]: Operations Coordinator `W2A_WORKSPACE_PLACEMENT_DECISION_2026-10-04.md` (`<PRIVATE_REF_02341>…84fe9`) to the r2 entry drafts
[Candidate file pins]: `evidence/executor/r2/EVIDENCE_MANIFEST_r2.sha256`

## 1. Rework disposition

| Finding | Correction | Evidence |
|---|---|---|
| F1 export exceeds literal allowlist | New export r2: 20 files (router, 5 stages, `tools/watchover.mjs` + 6-file import closure, 2 schemas, 5 view/assets). `skills/providers/*` excluded. Bytes compared against `git show <PRIVATE_REF_02752>…:<path>`: 0 differences. Placed at new neutral `/private/tmp/qefdb2bab/d1020f3ce00567b7/` (container `0111`, files `0444`, dirs `0555`). The r1 export is untouched. Product worktree clean before and after. | `r2/w2b_export/ALLOWLIST_r2.txt`, `W2B_EXPORT_SHA256SUMS_r2` (`<PRIVATE_REF_01059>`), `W2B_ACTIVATION_BLOCK_r2.txt` (`<PRIVATE_REF_03364>`), `DBC4_SCAN_AND_POINTERS_r2.txt` |
| F1 WF-9 | Fixture workspace, target-only: `CLEAN`. Planted symlink to the r2 export: `DISCOVERABLE` (positive control). | `r2/wf9_controls/WF9_RUN_LOG_r2_set2.txt` runs A/B, raw JSON in `raw/` |
| F1 MA-8 disclosure | `skills/router.md` still names the five provider files (lines 27, 37–38). These pointers do not resolve in W2B. The difference from the rehearsal loadout is disclosed in `W2A_ENTRY_RESET_PACKET_DRAFT_r2.md` §D. Router and product are not edited. | `DBC4_SCAN_AND_POINTERS_r2.txt` |
| F2 unsafe documented test route | Harness copied to `tool/experiment-control-tool-0.3.1/` with three changes. (1) New `tests/run_local_safe.sh pa4\|all`: recording stubs for `gh gcloud gsutil dig codex docker curl wget ssh scp` go first on PATH and exit 127; a fresh neutral temp root under `/private/tmp` is removed afterwards; nothing is installed. (2) `tool/package.json` `test` now runs the safe route. (3) `PA4_CONTROLS.md` documents only the safe route and warns against direct `node --test`. The sealed baseline and the 0.3.0 copy are untouched. | `r2/pa4_raw/pa4_safe_route_tap.txt` (23/23, stub calls: none); `r2/pa4_raw/full_safe_route_tap.txt` (58/58; stubs intercepted 2 codex, 14 gcloud, 4 gh, none executed) |
| F2 hash binding | New overall harness hash binds the runner, changed control map and package files. | `r2/HARNESS_MANIFEST_0.3.1.json`: overall `<PRIVATE_REF_01649>` (50 files, 22 references, verify MATCH) |
| F3 collector route | `COLLECTOR_ROUTE_PROPOSAL_r2.md` covers: one concrete non-executed route (R-GCE-SSH); exact collector/scanner/wrapper/redactor pins; root install argv; staging, install, serial collection and key-cleanup command templates under `gw.sh`; timing (after DEPLOYMENT_TERMINAL and the serving probe, before the A5 restart); exact access/mutations M1–M5; unresolved live prerequisites marked UNVERIFIED. The r1 claim of universal unreachability is withdrawn: the local prohibition is stated as fact, and live feasibility as UNVERIFIED. | proposal file |

Other harness diffs from 0.3.0 are the version strings and the `client_home` text in `runtime_lock_w2.json`, which now names the Operations Coordinator-placed home. The pins are unchanged. These bytes are bound in the 0.3.1 hash.

## 2. Current exact pins (r2)

| Pin | Value |
|---|---|
| Common harness experiment-control-tool 0.3.1 overall | `<PRIVATE_REF_01649>` |
| Harness manifest file | `evidence/executor/r2/HARNESS_MANIFEST_0.3.1.json` |
| W2B export r2 SHA256SUMS (20 files) | `<PRIVATE_REF_01059>` |
| W2B activation block r2 | `<PRIVATE_REF_03364>` |
| Runtime lock | `tool/experiment-control-tool-0.3.1/tool/support/runtime_lock_w2.json` (bound in the harness) |
| HC material | `<PRIVATE_REF_02212>` (input, unchanged) |
| W2C | `NOT_EXECUTED` |

r2 entry drafts in the task folder:
- `W2A_RUN_CARD_DRAFT_r2.md`;
- `W2A_ENTRY_RESET_PACKET_DRAFT_r2.md`;
- `W2A_ACTOR_STARTUP_PROMPTS_DRAFT_r2.md`;
- `W2_FORMAL_RUN_RELEASE_DRAFT_r2.md`;
- `COLLECTOR_ROUTE_PROPOSAL_r2.md`.

They use the Operations Coordinator placement:
- Deployer cwd `<CLIENT_HOME>/Workspaces/site-01/app`;
- arm root `<CLIENT_HOME>/Workspaces/site-01`;
- client home `<CLIENT_HOME>/Workspaces/.clients/c01`.

## 3. Read-only observation of the placed workspace (not CLEAN)

- **Check:** `discoverability` from `<CLIENT_HOME>/Workspaces/site-01/app`, chain-top at the arm root, labels checked above it.
- **Result:** `CLEAN` against the r2/r1 exports, HELM and the product repository (`WF9_RUN_LOG_r2_set2.txt` run C). Nothing was written into the placed directories.
- **Limits:** this is a listing result only. Real EP-I, prompt-input cross-check, `~/AGENTS.md` handling and physical isolation remain PENDING.
- **Superseded run:** set1 included the EP-I fixture root as a target. That root is a `/private/tmp` sibling, so set1 showed it as listed. set1 is retained but superseded by set2.

## 4. Unchanged from r1

- PA-4 control code and tests are unchanged (byte-identical `src/`, `tests/*.test.js`, support rules/spec/labels).
- The Reviewer's independent nine-row results therefore still apply to the same control bytes.
- Boundary events BE-1/BE-2 remain disclosed history.
- No new controls, historical replay or live action.

## 5. Live-entry items (unchanged ownership; not local rework)

| ID | Item |
|---|---|
| D-1 | Collector route permission or coverage disposition, now concrete in the proposal |
| D-2 | Authentication and clean configuration of `<CLIENT_HOME>/Workspaces/.clients/c01`, plus actual isolation |
| D-3 | Docker and `npm ci` network on the control plane |
| D-4 | Final mode/model/version pin and live availability |

I-1 is closed by the literal allowlist.

## 6. EXEC_RETURN (r2)

```
EXEC_RETURN
Task ref:             AI_CICD / W2_ENTRY_LOCAL_PREPARATION
Status:               COMPLETE (local scope, rework r2) — submitted for independent re-review
Delivered:            tool/experiment-control-tool-0.3.1/; /private/tmp/qefdb2bab/d1020f3ce00567b7/ (export r2); evidence/executor/r2/*;
                      W2A_RUN_CARD_DRAFT_r2.md; W2A_ENTRY_RESET_PACKET_DRAFT_r2.md; W2A_ACTOR_STARTUP_PROMPTS_DRAFT_r2.md;
                      W2_FORMAL_RUN_RELEASE_DRAFT_r2.md; COLLECTOR_ROUTE_PROPOSAL_r2.md
What changed:         F1 literal export; F2 safe verification route bound in harness hash; F3 route proposal + fact/inference correction; placement paths
What not changed:     r1 candidate files/harness/export; sealed baseline; product; R14; ledger/TASK_STATE; placed workspace contents
Open issues:          D-1..D-4 (live entry)
Flag for Human Operator:         D-1 now has an exact M1–M5 request; router provider pointers dangle in W2B (disclosed, MA-8)
Flag for Council:     none
Changelog:            not updated (vault write outside release surfaces)
PASS meaning:         local preparation complete; not WF-8 PASS, not T0, not Human Operator harness confirmation
Evidence Layers Used: local source/tests via safe route; local git object comparison; read-only listings
Claims Not Verified:  live feasibility of R-GCE-SSH prerequisites; real EP-I; live model availability
Manual / External Actions Observed: Operations Coordinator created the placement directories (decision file); not by this Executor
Owner Decisions Needed: D-1..D-4
```

Self-verification (VerifyOnly switch, 21:06–21:10 local clock): safe-route suites 23/23 and 58/58; manifest 0.3.1
MATCH; 0.3.0 manifest still MATCH; r1 evidence manifest 83/83 OK; export r2 byte comparison 0
problems. This readies the candidate for review; it is not acceptance.

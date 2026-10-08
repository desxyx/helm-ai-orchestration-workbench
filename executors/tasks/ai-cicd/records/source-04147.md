# W3 retrospective evidence index

Locator base: `TASK=council/task/AI_CICD`; `W3=TASK/03_cloud_runs/02_run_h_holdout/w3_windows_run_2026-10-06`.
This locates sources, without rating original evidence or supplying Operations Coordinator's issue priorities. Follow the role prompt's raw-first order after reading; third-party opinions do not automatically become facts.

## A. Task and provenance locators

| ID | Relative location | Contents / evidence layer |
| --- | --- | --- |
| G1 | `TASK/../../../../council/task/ai-cicd/council-records/source-00031.md` §3.3, §11–12 | Frozen isolation constraints and experiment-report duties |
| C1 | `W3/sealed_run_record/observer/packet_meta/RUN_MANIFEST.md` | Issued actual mode/model/pin, packet receipt and limitations |
| C2 | `W3/sealed_run_record/observer/packet_meta/CONTROL_FACTS.md` | Mechanical custodian records; distinguish Owner reports from machine evidence |
| C3 | `W3/OBSERVER_PACKET_LOCATOR_MAP.json` | 77 original Observer packet paths → current archive paths/hashes |
| C4 | `W3/INTAKE_MANIFEST.json`, `W3/SHA256SUMS_ARCHIVE` | Mac archive relocation/supplement-copy records, not experiment verdicts |
| C5 | `W3/win_followup/RECEIPT.md`, `MAC_ACK.md`, `MAC_ACK_CHECKS.json` | Later no-product-change declaration, session cutoff and identity metadata; four raw tars have Windows custody declaration only |
| C6 | HELM commit `<PRIVATE_REF_02678>`'s `userops/tasks/AI_CICD/HUMAN OPERATOR_DECISION_LEDGER.md`, “W3 Windows local cleanup” and follow-up; same-ref TASK_STATE | Latest Windows closeout: working copies/caches deleted, two workspace tars deleted early under additional Owner instructions; AI native/session tars/HC locked layer remain Windows local-only; Windows W3 finished |

Early pending items in `W3/README.md`/`MAC_INTAKE_REPORT.md` are historical receipt states; C5 closed three, then C6 updated actual cleanup. The earlier receipt's four-tars-retained statement is not current inventory. Retention follows current TASK_STATE/ledger Owner lightweight-retention decision/additional instructions. Read C6's named ending section directly with `git show <ref above>:userops/tasks/AI_CICD/HUMAN OPERATOR_DECISION_LEDGER.md`, without traversing the entire ledger. Some original sealed-summary links still point to Windows source mirrors; use this index/C3, without revising originals.

## B. Raw run material (before analysis texts)

| ID | Relative location | Contents |
| --- | --- | --- |
| R1 | `W3/sealed_run_record/control/W3_DEPLOYER_BRIEF.txt`, `DEPLOYER_OPENING_MESSAGE.txt`, `DEPLOYER_CONTINUATION_MESSAGE.txt`, `TEARDOWN_PROMPT.txt` | Control texts actually received by Deployer |
| R2 | `W3/sealed_run_record/deployer_transcripts/<NATIVE_ID_1514>.jsonl` | S1 native Claude Code, 485 lines; sibling `<NATIVE_ID_1514>/` (if present) locates native attachments |
| R3 | `W3/sealed_run_record/deployer_transcripts/<NATIVE_ID_0991>.jsonl` | S2 native Claude Code, 650 lines; sibling `<NATIVE_ID_0991>/tool-results/` contains external outputs |
| R4 | `W3/sealed_run_record/deployer_record/state.json`, `events.jsonl`, `evidence/` | Retained WatchOver state/events/evidence; records do not automatically equal real external state |
| R5 | `W3/sealed_run_record/custody/CP01_FORCED_INTERRUPT_SNAPSHOT.md`, `project_inventory_CP02.txt`, `RESIDUAL_INVENTORY_POST_TEARDOWN.txt` | Original interruption, terminal inventory and residual checks |
| R6 | Five images in `W3/acceptance_screenshots/` | Owner browser acceptance/VM screenshots; cannot reconstruct uncaptured HAR/adapter/trace probes |
| R7 | `W3/sealed_run_record/custody/RUN_W3_SOURCE_VERIFICATION.md` | Custody/verification and appended deviations; distinguish machine observations from explanations |
| R8 | `W3/sealed_run_record/deployer_deploy_config/` | Original deployment configuration/stage copies; read only to check relevant source/line-ending/recovery behavior; repeat no sensitive values |

May expand to sibling raw attachments/original evidence references for specific issues; locate with `rg --files` first. No `hc`/HC answers, keys or scoring paths. Do not indiscriminately dump the entire W3 tree.

## C. Measurement definitions, existing analysis and feedback

D1–D3 are interpretation rules, read before raw observations; O1–O3/F1–F3 are analysis/feedback, read after saving own raw observations.

| ID | Relative location | Source type |
| --- | --- | --- |
| D1 | `W3/observer_definitions/OBSERVER_PROTOCOL.md`, `METRICS_DEFINITIONS.md`, `EVENT_TAXONOMY.md`, `MEASUREMENT_INTEGRITY_RULES.md` | General frozen definitions; interpret historical model/workload lines under issued manifest |
| D2 | `W3/observer_definitions/ACCEPTANCE_MATRIX.md`, `ACCEPTANCE_VERIFICATION_PROCEDURE.md`, `RESTART_EQUIVALENCE.md`, `TRACEABILITY_PROBE.md` | Original A1–A7/restart/trace definitions; no proof a Taiga adapter was completed |
| D3 | `W3/observer_definitions/W3_MEASUREMENT_SCOPE.md` | Original scope text in issued packet still says prepared; retain wording and disclose conflicts |
| O1 | `W3/sealed_run_record/observer/outputs/RUN_W3_OBSERVER_REPORT.md` | Sealed independent Observer analysis |
| O2 | Same directory: `RUN_W3_METRICS.json`, `RUN_W3_ACCEPTANCE_MATRIX.json`, `RUN_W3_EVENTS.jsonl`, `RUN_W3_EVIDENCE_PROVENANCE.json`, remaining JSONs and `SHA256SUMS` | Metrics/verdicts/locators/data checks; all directory outputs may be checked |
| O3 | `W3/sealed_run_record/W3_RESULT_SUMMARY.md` | Windows Operations Coordinator return summary; follow citations to originals |
| F1 | `W3/product_feedback_quarantined/SNAPSHOT_WATCHOVER_PROTOTYPE_REVIEW_2026-10-06.md` | External-team static review; not an actual-test checklist; author's MUST/SHOULD needs independent checking |
| F2 | `W3/product_feedback_quarantined/RELAY_RAW_2026-10-06.md` | Manual relay/local static feedback; historical requests are not automatically current instructions |
| F3 | `W3/product_feedback_quarantined/LIVE_RUN_OWNER_AND_SIDE_OBSERVATIONS_2026-10-06.md` | Owner experience, side-page observations and reviewer opinions, each attributed separately |

F1–F3 were isolated from Deployer/Observer/HC during the experiment; now available only to retrospective roles, still not directly to final Builder. Current retrospective reports cannot directly become Builder input either.

## D. Product and related scope

See agent.md for product positioning/exact pin. By default read only tracked `README.md`, `SECURITY.md`, `package.json`, `docs/architecture.md`, `docs/design-decisions.md`, `skills/`, `schema/`, `tools/`, `app/`, and relevant `tests/`/`fixtures/` for specific semantics. Read no `.git/config`, local credentials/user configuration or other projects; restore no deleted working copies. Necessary affected local checks follow agent.md's side-effect/temporary-output boundaries; no default full-suite rerun.

| ID | Location under TASK | Purpose |
| --- | --- | --- |
| P1 | `source-04264.md` | Original Mac accepted pin/version/coverage, not W3 behavior PASS |
| P2 | `handoff/Operations Coordinator/WINDOWS_W3_TAKEOVER_2026-10-06/minimal_materials/deployer_payload/` | W3 reduced-runtime provenance; compare full product as needed; 23-file subset does not mean full product lacks providers |
| P3 | `source-00406.md` | Existing release-phase receipt facts |
| P4 | `source-00405.md`, `../../../../council/task/ai-cicd/council-records/source-04631.md` | Later product-release/full-showcase drafts, neither implemented; no extended development authorization |

Coordinator/Observer native sessions in `W3/win_followup/sessions/` may be checked only for C5 metadata or specific disputed events, recording reason/locator. Coordination session is a cutoff snapshot with one token replacement, not a complete unchanged raw layer.
`INPUTS_SHA256.json` binds key index documents, reducing duplicated packages; all original source seals remain separate.

---

Publication note: English translated/redacted historical document, source-04147. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

# ADAPTER_RECORD_R3_SUBMISSION

[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R3 · [Executor]: Executor Actor 01
[Dispatch]: Human Operator-relayed R3 instruction (2026-10-02). Handoff `MA1_ADAPTER_R2_HANDOFF_2026-10-02.md` SHA-256 `<PRIVATE_REF_03578>` was reproduced. No separate R3 release file exists in UserOps; TASK_STATE still reads "no R3 release yet".
[Base]: `ma1_verify_r2.py` `<PRIVATE_REF_03278>…7e18` and R2 Record `<PRIVATE_REF_00566>…f1c3`, both verified before work.
[Status]: The single remaining finding is repaired statically. Stopped for Reviewer Actor 02's independent VerifyOnly review. Not a ratification; W2 stays closed.

## Revisions (R1 and R2 preserved)

| Artifact | SHA-256 |
|---|---|
| `executor/adapter_record_stage/ma1_verify_r3.py` | `<PRIVATE_REF_03172>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R3.md` | see `SHA256SUMS_ADAPTER_STAGE_R3` |
| `evidence/adapter_record_stage/executor/static_checks_r3/` (runner `run_static_checks_r3.sh`, `offline_checks_r3.py`, `build_cli_fixtures_r3.py`, D01–D32, `STATIC_CHECK_LOG_R3.md`, scratch) | see `SHA256SUMS_ADAPTER_STAGE_R3` |
| R1 (39/39) and R2 (74/74) manifests, R1/R2 scripts, runtime 112/112, original candidate `<PRIVATE_REF_01809>…` | re-verified unchanged (D31) |

## The finding and the repair

- **The finding.** Caller-transcribed restart JSON could contradict hash-matching RT-030/031/032 and still be ELIGIBLE or reach A5 PASS. The inventory was self-declared.
- **Gate A: raw binding.** `validate_restart` reads each hash-matching role file and extracts every material value itself, at a fixed key or anchor that must occur exactly once. Each claim must equal the extracted value. This covers:
  - stop/start times; capture times; boot ids; uptimes; storage tokens
  - `ps` lines, including `lstart` minus a raw-corroborated UTC offset
  - the stopped line after `stop_done_utc`; the unavailable and recovered probe lines after the anchors
  - serverless rationale and times, and instance ids equal to the raw `NAME` table
- **Gate B: external inventory.** `init` binds a platform deployment listing (exactly one `NAME` table) that a separate evidence manifest lists with its current SHA-256. `a5-restart` requires the record and manifest to be unchanged, and the bundle's `serving_units` must equal the parsed inventory.
- **What can never satisfy a gate.** Free text, a self-declared list, an unlisted or wrong-hash record, or a record used as its own manifest.
- **Outcome.** Restart is ELIGIBLE only if both gates and all semantic checks hold. Otherwise it is UNVERIFIED (REJECTED for process/container kinds), `a5-check` is refused, and `a5_overall` stays UNVERIFIED.
- **No attestation route.** No attestation path was added, because a self-declared attester cannot be verified.

## Finite test results (`run_static_checks_r3.sh`, all offline)

- **D04 offline suite: 91/91 expected, 0 unexpected.**

  | Group | Results |
  |---|---|
  | Valid positives | MA-1 VM bundle bound to RT-030/031/032 plus inventory from RT-009 via `SHA256SUMS_RT_FINAL` is ELIGIBLE with both gates true; synthetic serverless bundle is ELIGIBLE |
  | Raw-gate negatives (authentic hashes kept) | 22, each UNVERIFIED for its named binding: before/after boot ids; before/after uptimes; rootfs UUID; data path; process start; fabricated process; offset +09:00 with consistently shifted times; four stop/start times; two capture times; stopped-observation time; two probe times; two role substitutions; hash mismatch; missing role |
  | Inventory-gate negatives | 3 (no record; extra self-declared VM with copied authentic roles; record unit omitted), plus 4 record checks (not in manifest; wrong hash; free text; self-manifest) |
  | Serverless negatives | 6 binding negatives plus 1 REJECTED |
  | Aggregation | 1: UNVERIFIED restart keeps A5 UNVERIFIED with every component PASS |
  | Carried from R2 | A5 aggregation, A3/correlation, A4 BLOCKED/FAIL and custody suites, all unchanged and passing |

- **CLI (D06–D21).**
  - D06: `init` binds the RT-009 inventory.
  - D07–D09: `init` refuses free text, a record not in the manifest, and a record without a manifest.
  - D13: the MA-1 bundle is ELIGIBLE, but D14 reports A5 UNVERIFIED until checked.
  - D15–D17: a fabricated after boot id gives `raw_binding` false; `a5-check` is refused; A5 is UNVERIFIED.
  - D18–D19: no inventory gives the inventory gate false, and `a5-check` is refused.
  - D20: a record tampered after init reports "changed since init".
  - D21: a container restart is REJECTED.
- **Retained R2 gating (D22–D28)**, all refused as designed. D29: no identifier in any state or output (canary found). D30: fixtures unchanged. D32: per-state gate summary.
- **Exit codes:** 13×0, 4×1 (designed UNVERIFIED/REJECTED), 15×2 (designed refusals).

## Unrun gaps

These match Record G-1…G-5:
- **G-1. Never executed.** No endpoint, browser, VM, real credential or real arm restart bundle.
- **G-2. Limits of raw binding.** It makes the bundle agree with the raw files but cannot prove the raw files are authentic captures; that remains Reviewer raw-first review. The process-name rule is a substring match. Arms must emit the §3.1 key vocabulary.
- **G-3. Inventory scope.** Completeness is relative to the external platform record.
- **G-4.** BLOCKED granularity is limited by the frozen A4 file; backend-log export is per arm.
- **G-5. Inherited.** `__pycache__` residue beside the fixtures; local logging config; Ubuntu signature; cause of the first-start exit.

A Reviewer PASS would make Record R3 eligible for Human Operator ratification. It would not ratify it or open W2.

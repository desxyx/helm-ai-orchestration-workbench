# ADAPTER_RECORD_TARGETED_REWORK_SUBMISSION

[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R1 · [Executor]: Executor Actor 01
[Release]: `MA1_ADAPTER_RECORD_TARGETED_REWORK_RELEASE_2026-10-02_r1.md`, SHA-256 `<PRIVATE_REF_03176>` (reproduced before work)
[Status]: The seven finite findings are repaired statically. Stopped for independent finite VerifyOnly review. Not a ratification; WF-8 stays closed.

## Revisions (R1 preserved)

| Artifact | SHA-256 |
|---|---|
| `executor/adapter_record_stage/ma1_verify_r2.py` | `<PRIVATE_REF_03278>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R2.md` | see `SHA256SUMS_ADAPTER_STAGE_R2` |
| `evidence/adapter_record_stage/executor/static_checks_r2/` (C01–C25, `STATIC_CHECK_LOG_R2.md`, offline check and fixture builders, scratch) | see `SHA256SUMS_ADAPTER_STAGE_R2` |
| R1, unchanged: `ma1_verify.py` `<PRIVATE_REF_01533>…2e08`, `MA1_ADAPTER_RECORD_CANDIDATE_FINAL.md` `<PRIVATE_REF_03070>…26e1`, all 39 entries of `SHA256SUMS_ADAPTER_STAGE` `<PRIVATE_REF_02708>…3d4b` | re-verified (C25) |

## Exact finite mapping

| # | Finding | Repair (R2 script / Record) | Offline evidence |
|---|---|---|---|
| 1 | A5 restart was label plus file existence | `validate_restart`: a shape-specific bundle. VM: exact serving-VM coverage, stopped state observed in the stop window, app unreachable while stopped, boot id changed, uptime reset, every serving process recovered after start, storage identity identical. Serverless: before/after identities disjoint for every serving unit, rationale recorded before the action. Raw files hash-bound. Process/service/container/compose/pod/app/worker kinds are **REJECTED**; anything else missing or inconsistent is **UNVERIFIED**. No restart is performed. Record §3. | C04 §1: valid MA-1 VM bundle (from RT-030/031/032) and valid synthetic serverless bundle are ELIGIBLE; 4 rejected-kind cases (VM container/process/service; serverless container) and 22 invalid variants each fail for their named reason. C10 ELIGIBLE, C13 REJECTED, C14 A5 UNVERIFIED, C15 `a5-check` refused after REJECTED |
| 2 | A5 prerequisites and N-deletion handling | `a5-restart` is refused unless `A5-P-setup`, `A5-N-setup`, `A5-N-delete` and `A5-S-precheck` are PASS and the deletion marker exists. The marker is set only after verified deletion. Setup is closed once a restart is submitted, and a bundle cannot be resubmitted. `a5_overall`: a FAIL in any prerequisite stays FAIL. Record §3. | C04 §2 (10 cases, including each of the 4 prerequisite FAILs masked by later PASSes). C08, C09, C11, C21, C22 refusals |
| 3 | A3-P PASS without backend correlation | `--backend-log` is mandatory for mode P. `correlate_backend_log` requires the probe's alert id in ≥2 GET lines and ≥1 DELETE line. A missing, malformed or nonmatching log is FAIL. Record §1. | C04 §3: RT-022 matches; nonmatching (A3-N window), DELETE-stripped, empty, binary and no-id logs all fail; combined A3-P with a nonmatching log is FAIL. C16 refusal |
| 4 | A4 BLOCKED vs FAIL | `a4_classify` returns PASS, FAIL or BLOCKED. BLOCKED means a clean pass prefix, no FAIL line, and an unavailability abort, and it names the blocked step. Record §2. | C04 §4: the real run is PASS; logout-unavailable and signup-unavailable are BLOCKED with the correct step; observed FAIL, assertion abort, missing step, wrong 401 and nonzero exit are all FAIL |
| 5 | AMD-DK2 custody | A mode-0600 custody file (salt, later the key). State holds only an HMAC identity fingerprint and a custody tag; continuity is checked at every step. Key and object owner are compared in memory and recorded only as booleans. `guard_no_sensitive` is applied on every save and event; captures are scrubbed (identifier matched case-insensitively). A4 is never given a screenshot directory; optional A5 screenshots mask credential inputs and identifier text. Record §4. | C04 §5: fingerprint continuity (same identity, case/space variant), mismatch on a different identity or salt, scrub removes 4/4 occurrences, guard accepts a clean state and refuses identifier, password and key. C17–C20 refusals; C23: no synthetic identifier or password in any state or output (canary found) |
| 6 | Cypress lifecycle overstated | Record §5 now says only: the lock declares the install script; RT-014 proves `npm ci` success; execution is inference; destination, redirects, bytes and cache size are UNVERIFIED. Human Operator's run-specific option-A acceptance is preserved, with no compliance claim. | Text review |
| 7 | Consistency and preservation | New R2-named script, Record, static checks and manifest. Record §1–§6 match the R2 behaviour. Fixtures, canonical source, runtime evidence and the prior correction are untouched. | C01, C02, C03, C06, C07, C24 fixtures unchanged, C25 (R1 39/39, runtime 112/112, original candidate `<PRIVATE_REF_01809>…`) |

Harness note: one earlier unsubmitted C-series run was discarded. The synthetic environment was passed as a single unsplit zsh word, so five refusal checks fired on missing env rather than on the behaviour under test. `STATIC_CHECK_LOG_R2.md` is the complete clean rerun and states this.

## Remaining unrun gaps

These match Record G-1…G-5:
- **G-1. Never executed.** The A4 subprocess, key derivation, the real-key A3 subprocess, every A5 browser step and screenshot masking have never run against an endpoint or browser.
- **G-2. Backend-log export.** The export method is per arm.
- **G-3. Bounded restart checks.** Serving-unit coverage is checked against the declared inventory; bundle values are arm-transcribed; raw files are hash-bound, not re-parsed; uptime allows 60 s of skew.
- **G-4. BLOCKED granularity.** Limited by the frozen A4 file's error-type output.
- **G-5. Inherited.** `__pycache__` residue beside the fixtures; the local logging config; the Ubuntu signature; the cause of the first-start exit.

A finite PASS would make Record R2 eligible for Human Operator ratification. It would not itself ratify the Record or open WF-8 or W2.

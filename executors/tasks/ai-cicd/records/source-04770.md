# ADAPTER_RECORD_R6_STATIC_PROVENANCE_SUBMISSION

[Task ref]: AI_CICD / MA-1 / STATIC_PROVENANCE_CLOSURE · [Executor]: Executor Actor 01
[Release]: `MA1_STATIC_PROVENANCE_EXECUTOR_REVIEWER_LOOP_RELEASE_2026-10-02_r1.md`, SHA-256 `<PRIVATE_REF_01853>` (reproduced)
[Input]: Reviewer Actor 02 R5 `TARGETED_REWORK` (09:58 PM AEST), R5-RW1–RW6. R5 baseline verified: script `<PRIVATE_REF_03224>…`, Record `<PRIVATE_REF_02995>…`, manifest `<PRIVATE_REF_01811>…` (255/255).
[Status]: Static only. No VM, GCP, network, credential, endpoint, browser, service, install, product, Addendum or W2 activity. Handed to Reviewer via `evidence/adapter_record_stage/STATIC_PROVENANCE_LOOP_STATE.md` (NEXT=REVIEWER).

## Revisions (R1–R5 preserved)

| Artifact | SHA-256 |
|---|---|
| `executor/adapter_record_stage/ma1_verify_r6.py` | `<PRIVATE_REF_01856>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R6.md` | see `SHA256SUMS_ADAPTER_STAGE_R6` |
| `evidence/adapter_record_stage/executor/static_checks_r6/` (runner `run_static_checks_r6.sh`, `offline_checks_r6.py`, `build_cli_fixtures_r6.py`, G01–G57 + GR6_01–16 a/b/c/d, `STATIC_CHECK_LOG_R6.md`, scratch) | see `SHA256SUMS_ADAPTER_STAGE_R6` |

## R5-RW1–RW6 mapping

| Finding | R6 repair | Evidence |
|---|---|---|
| RW1: retain all occurrences | `command_log_entries()` keeps lists of every exit, command, stdout and stderr occurrence per entry, a `malformed` list for any non-canonical material-looking line, and an ORPHAN pseudo-entry for material lines before the first header. Nothing is overwritten. | offline 1b; GR6 series |
| RW2: exactly one of each | `entry_defects()`: a producer needs exactly 1 valid start/exit, command, stdout and stderr field. | cmd/exit/stdout/stderr cases, both orders; missing stderr |
| RW3: reject malformed or repeated even if a later value is valid | Any repeated or malformed material field makes the producer ambiguous. The first and last values are both irrelevant. | exit 1→0, command cat→limactl, malformed `- exit: 0`, malformed unquoted stdout |
| RW4: preserve every reference for exclusivity | `refs` counts entries over **all** stdout and stderr occurrences. `referencing_lines()` scans every line of the log, using backtick or whitespace tokens resolved relative or absolute, and requires exactly 1 line for the record and exactly 1 for the producer stderr. | hidden record claimant, hidden stderr claimant, orphan claimant, plain-text claimant |
| RW5: adversarial tests | 16 SYNTHETIC self-consistent exact-schema fixtures, including both orders for command, exit, stdout and stderr, plus Reviewer Actor 02's combined fixture. Each has a detection control. The frozen R5 parser is run on each as a known-vulnerable control: 11 of 16 were ACCEPTED by R5, including Reviewer Actor 02's combined fixture. | offline: every case `None`, restart UNVERIFIED, A5 UNVERIFIED. CLI: 16×`init` refused (exit 2), 16×forced restart UNVERIFIED with `inventory` false (exit 1), 16×`a5-check` refused (exit 2), 16×report A5 UNVERIFIED |
| RW6: retain existing controls | SYNTHETIC positive still accepted (G06, G19 ELIGIBLE, G20 A5 UNVERIFIED until checked). Canonical single-field producer accepted. All four R5 deception classes plus variants refused (G08–G14, G24–G38). RT-009 refused for the same two reasons (G07). Authentic Gate A true with restart UNVERIFIED (G21–G23). Process and storage regressions (G39–G44). All 45 authentic wrapper-log entries parse with zero cardinality defects. | offline 224/224; G-series |

## Results

- **Offline suite:** 224/224, `RESULT=ALL_EXPECTED`.
- **CLI:** 121 checks. Exit codes 35×0, 27×1 (designed UNVERIFIED/REJECTED) and 59×2 (designed refusals); every one as designed.
- **Runner fix:** the first R6 run's loop reused the helper's `id` variable, so GR6 b/c/d check names came out concatenated. The runner was fixed (`gid`) and the complete series rerun; the logged evidence is the clean rerun.

## Unchanged-file proof (G55, G54, G53)

- **Adapter-stage manifests:** R1 39/39, R2 74/74, R3 109/109, R4 167/167, R5 255/255 verify.
- **Runtime evidence:** 112/112 verify, including `RAW_COMMAND_LOG_RT.md` `<PRIVATE_REF_03030>…`, RT-009 `.out` `<PRIVATE_REF_04454>…` and `.err` `<PRIVATE_REF_05099>…`.
- **Frozen fixtures:** unchanged.
- **Identifier leakage:** none in any state or output (canary found).

## Genuine-evidence gaps (declared, not code defects)

- **No authentic Gate-B positive.** RT-009 cannot qualify, and the positive is SYNTHETIC only.
- **No registered or validated GCP or serverless profile.** That needs an AMD-MA13-R1 dispatch, registry review and Human Operator ratification.
- **A logged argv is not proof of execution.**

A static Reviewer PASS on this scope would close only the code-level producer defect. It would not validate a GCP profile, ratify the Adapter Record, close WF-8 or open W2.

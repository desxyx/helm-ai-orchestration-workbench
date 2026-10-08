# ADAPTER_RECORD_R5_STATIC_PROVENANCE_SUBMISSION

[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R4 / RW-6–RW-9 · [Executor]: Executor Actor 01
[Release]: `MA1_ADAPTER_R5_STATIC_PROVENANCE_REWORK_RELEASE_2026-10-02_r1.md`, SHA-256 `<PRIVATE_REF_02013>` (reproduced). R4 inputs verified before work: script `<PRIVATE_REF_01804>…`, Record `<PRIVATE_REF_01133>…`, manifest `<PRIVATE_REF_01025>…` (167/167).
[Status]: Static only. No GCP, VM, network, endpoint, browser, credential, product, Addendum or W2 activity. Stopped for a fresh independent VerifyOnly review.

## Revisions (R1–R4 preserved)

| Artifact | SHA-256 |
|---|---|
| `executor/adapter_record_stage/ma1_verify_r5.py` | `<PRIVATE_REF_03224>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R5.md` | see `SHA256SUMS_ADAPTER_STAGE_R5` |
| `evidence/adapter_record_stage/executor/static_checks_r5/` (runner `run_static_checks_r5.sh`, `offline_checks_r5.py`, `build_cli_fixtures_r5.py`, F01–F57, `STATIC_CHECK_LOG_R5.md`, scratch) | see `SHA256SUMS_ADAPTER_STAGE_R5` |

## RW-6–RW-9 mapping

| Item | Repair | Evidence |
|---|---|---|
| RW-6 structural command binding | `producer_argv`: shlex argv of the logged `- command:`; `$'…'`, `$(…)` and backticks are rejected outright. The argv must **equal** a registered producer argv (`lima`: `['limactl','list']`, no flags). This rejects wrappers, compound commands, comments, quoting, echo/printf/cat, redirection, extra flags and absolute paths. Exit 0 and a unique entry id are required. Substring membership has been removed. | F04 (151/151), F07–F15 |
| RW-7 exclusive output | Exactly one entry references R; R is its stdout at its current SHA-256; its stderr exists at the logged SHA-256, differs from R and is referenced by no other entry. R is **exclusively** one registered listing (a second header or any other line fails). R, stderr and log are in a separate manifest. All of this is re-checked at restart, including stderr hash and producer id. | F04; F13 (appended second listing); two-claimant and stderr-not-in-manifest cases; F46 (tamper) |
| RW-8 adversarial negatives | Self-consistent, exact-schema SYNTHETIC fixtures for all four Reviewer cases plus variants, each with a detection control showing the listing is present. Each: refused at `init`; a forged binding gives restart UNVERIFIED (`inventory` false); `a5-check` refused; A5 UNVERIFIED. | F08–F14; F24–F38 (echo, comment, discarded-stdout-other-emits, unrelated-after, appended: restart exit 1, `a5-check` exit 2, report A5 UNVERIFIED) |
| RW-9 regression and positive scope | R4 exact-process, complete-process and fixed-storage negatives re-run on authentic raw (Gate A false), plus all R3 contradiction controls. SYNTHETIC dedicated-producer positive: `init` accepted (F06: `SYN-001`, `['limactl','list']`, `['synthetic-vm-1']`), and the SYNTHETIC VM bundle is ELIGIBLE (F19) with A5 UNVERIFIED until checked (F20). SYNTHETIC process/storage adversarial bundles give restart UNVERIFIED (`raw_binding` false) and `a5-check` refused (F39–F44). | F04; F06; F19–F20; F39–F46 |

## Exact positive and negative outcomes

| Case | Gate A | Gate B | Restart | `a5-check` | A5 |
|---|---|---|---|---|---|
| Authentic MA-1 bundle (RT-030/031/032) | **true** | RT-009 fails | UNVERIFIED (F21) | refused (F22) | UNVERIFIED (F23) |
| RT-009 at `init` | — | refused: compound `bash -c` producer is not the registered argv; stdout not exclusive (F07) | — | — | — |
| SYNTHETIC positive (`SYN-001` plus SYNTHETIC VM raw) | true | true | **ELIGIBLE** (F19) | (not run: post-check needs a live UI) | UNVERIFIED until checked (F20) |
| Echo / comment / quoted / wrapper | — | refused at `init` (F08–F10, F14) | forged binding UNVERIFIED (F24, F27) | refused | UNVERIFIED |
| Discarded stdout, other command emits | — | refused (F11) | UNVERIFIED (F30) | refused (F31) | UNVERIFIED (F32) |
| Unrelated producer after listing | — | refused (F12) | UNVERIFIED (F33) | refused (F34) | UNVERIFIED (F35) |
| Appended unrelated listing | — | refused, not exclusive (F13) | UNVERIFIED (F36) | refused (F37) | UNVERIFIED (F38) |
| Short / incomplete process, size token (SYNTHETIC Gate B true) | false | true | UNVERIFIED (F39, F41, F43) | refused | — |
| Container kind | false | true | REJECTED (F45) | — | — |
| Unregistered `gcloud` | — | refused (F15) | — | — | — |

Totals: 57 checks, exit codes 19×0, 11×1 (designed UNVERIFIED/REJECTED) and 27×2 (designed refusals). Offline suite 151/151. One defect was found and fixed before the logged run: an appended second listing was rejected only incidentally (as a row with STATUS `STATUS`). `exclusive_listing` now rejects any second registered header explicitly.

## Unchanged-file proof (F55, F54)

- **Adapter-stage manifests:** R1 39/39, R2 74/74, R3 109/109, R4 167/167 verify. Their own hashes are `<PRIVATE_REF_02708>…`, `<PRIVATE_REF_01463>…`, `<PRIVATE_REF_01164>…`, `<PRIVATE_REF_01025>…`.
- **Runtime evidence:** 112/112 verify.
  - `RAW_COMMAND_LOG_RT.md` `<PRIVATE_REF_03030>`
  - `raw/RT-009_vm_first_start.out` `<PRIVATE_REF_04454>`
  - `raw/RT-009_vm_first_start.err` `<PRIVATE_REF_05099>`
- **Original candidate:** `<PRIVATE_REF_01809>…`.
- **Frozen fixtures:** unchanged (F54).
- **Identifier leakage:** no identifier in any state or output (F53, canary found).

## RT-009 limit

RT-009's listing sits inside a compound `bash -c` stdout, so it is not a dedicated producer with exclusive stdout. It is not rewritten, re-attributed or replaced, and no VM was rerun. The authentic MA-1 bundle passes Gate A only. An authentic Gate-B positive and a GCP profile remain open gaps (Record G-1, G-2).

A static Reviewer PASS on this slice would close only the code-level producer defect. It would not validate a GCP profile, ratify the Adapter Record, close WF-8 or open W2.

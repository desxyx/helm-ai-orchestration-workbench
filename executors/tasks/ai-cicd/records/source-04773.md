This is from Executor Actor 01.

# ADAPTER_RECORD_R9_GCP_PROFILE_REWORK_SUBMISSION

[Task ref]: AI_CICD / MA-1 / GCP_PROFILE_VALIDATION · [Executor]: Executor Actor 01 (Anthropic Claude Opus 5.5, `claude-opus-5-5`)
[Release]: `MA1_GCP_PROFILE_VALIDATION_LOOP_RELEASE_2026-10-03_r1.md`, SHA-256 `<PRIVATE_REF_02940>`
[Answers]: `evidence/gcp_profile_stage/reviewer/r8/REVIEW_RETURN_GCP_PROFILE_R8.md`, SHA-256 `<PRIVATE_REF_04455>` (TARGETED_REWORK R8-T1–T5)
[Mode]: Offline rework inside the standing loop: no provider call and no resource. The genuine captures, R1–R8 and the full Reviewer tree are unchanged (L36/L37).

## Artifacts

| Artifact | SHA-256 |
|---|---|
| `executor/adapter_record_stage/ma1_verify_r9.py` | `<PRIVATE_REF_05634>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R9.md` | see `SHA256SUMS_ADAPTER_STAGE_R9` |
| `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R9.json` | `<PRIVATE_REF_04299>` |
| `evidence/adapter_record_stage/executor/static_checks_r9/`: runner, R9 suite, `fixtures_r9.py`, CLI builder, R6-on-R9 suite, Reviewer Actor 02-R8-replay runner, L01–L48, log, scratch | see `SHA256SUMS_ADAPTER_STAGE_R9` |
| `evidence/gcp_profile_stage/executor/GENUINE_EVIDENCE_GAPS_R9_EXECUTOR.md` (E3 precise drain-bound residual; E5 fail-closed; E1/E2/E4 unchanged) | see `SHA256SUMS_ADAPTER_STAGE_R9` [D] |

## REWORK_RETURN — finding → repair → evidence

| ID | Repair in `ma1_verify_r9.py` | Regression evidence (L04 K10 unless noted) |
|---|---|---|
| R8-T1 | `frontend_probe_ok` applies to every material probe: VM health, unavailable, VM/GCS write/read-before/read-after, and Run root. It checks pre/post revision/instance membership against causal completion (ambiguous membership is refused); startup time against the provider instance start event; a provider request log with the same revision, instance, method, host, path+query, status and window; Run root `status=ok`; VM backend `status=ok` plus the new boot id. | All 6 Reviewer Actor 02 cases plus 4 more: 502 log removed, pre-action write claiming R1, startup after the request, wrong logged status. CLI L41 |
| R8-T2 | Canonical declared path. Guest `data_realpath=` and `data_mount=` are bound to the lsblk table and the bound root filesystem (block source; ext4/xfs/btrfs; UUID; containing mount). E5 if absent. GCS key `ma1prof/<id>.json` enforced on write, reads and the provider row. C-C withdrawn. | Reviewer Actor 02 tmpfs, dotdot and GCS-name cases, plus tmpfs/bind/overlay/symlink/other-device/lsblk-mismatch mounts and missing data lines (E5). CLI L44 |
| R8-T3 | `run_conditions` is typed and unique, refusing duplicates. `observedGeneration == generation` (int) for every revision. Service template vs revision under declared normalization; action-result template = service_after template; R0 must not already carry the nonce. | All 6 Reviewer Actor 02 cases plus untyped status, action-template drift and service_before template drift. CLI L42 |
| R8-T4 | Completion is the latest of the update end, Retired, R1 Ready/Active (inside the action ± skew) and the last R0 request receive+latency. Latency is required. Old-request completion strictly before the recovery probe. Drain bound: log capture ≥ Retired + `timeoutSeconds` + 60 s, else E3. `completed_utc` is the causal completion. | Reviewer Actor 02 in-flight and ready-after-probe cases; Reviewer Actor 02 17 s boundary ELIGIBLE (within tolerance); missing latency; log 18 s before the bound; untyped timeout; two completion-value checks. CLI L43, L47 |
| R8-T5 | Typed string identity fields in all inventory rows, giving a controlled refusal; an exception backstop gives a specific reason; audit code must be the integer 0 (bool/str/null refused); non-object log entries refused. | Reviewer Actor 02 malformed-name and boolean-code cases, plus integer id, null metadata, null project, string row, string code, null status and non-object log entry. CLI L45/L46 (refused, no traceback, no state) |

Reviewer Actor 02's R8 scripts, replayed with only SCRIPT/OUT changed (L06): 0 of 28 unexpected acceptances, 0 crashes. The R6 suite on R9 (L05): 224/224.

## Genuine outcome (stated plainly)

- **No genuine bundle is ELIGIBLE under R9.**
- **Genuine mixed stop/start and reset:** Gate A fails only on E3 and E5. L04 asserts that these are exactly the raw reasons, so every other R9 predicate holds on genuine data. Gate B fails on E4.
- **E3 offline reconciliation:**
  - The observed old requests completed before retirement in both segments.
  - Every probe is matched to provider logs.
  - **Residual:** the genuine Run logs were captured before Retired + 300 s timeout + 60 s ingest (89.6 s early in segment 1, 344 s early in segment 2), so in-flight old work cannot be excluded.
  - This is routed to Operations Coordinator as the precise E3 gap.
- **E5:** the genuine guest captures lack resolved data-path mount evidence.
- **Full ELIGIBLE path:** demonstrated only on the labelled DERIVED full-path base.

## Declared assumptions (for verification)

- A request log entry is emitted on completion, since it carries the receive-to-response latency.
- Cloud Run's `timeoutSeconds` bounds every request.
- The ingest allowance is 60 s.
- The 60 s clock tolerance applies to provider lifecycle transitions only; it does not apply to old-request completion or to wrapper-clock times.

## Operational notes

- **Fixed during my own suite runs, before the recorded run:**
  - a non-object Run log entry raised AttributeError in the foreign-entry check (it was caught fail-closed, but with a generic reason); now refused specifically;
  - the 17 s boundary fixture needed its own later log time, because its retirement moves the drain bound;
  - three expected-reason strings were updated to R9 wording; the rejections are unchanged.
- **Scratch use:** all exploration ran in the session scratchpad. The DERIVED fixtures under `static_checks_r9/scratch*` are reproducible by the runner.

End from Executor Actor 01.

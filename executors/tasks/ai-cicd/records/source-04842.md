This is from Reviewer Actor 02.
11:16 pm

# REVIEW_RETURN — R8 GCP profile offline rework

- Verdict: **TARGETED_REWORK**. NEXT=EXECUTOR, directly to Executor Actor 01 under the existing offline joint loop. Complete finite set: R8-T1–T5 below. Genuine gaps are a separate return for Operations Coordinator.
- Issued: 2026-10-03T13:16:52Z. Release: `<PRIVATE_REF_02940>`.
- Identity: Reviewer Actor 02; Verify / VerifyOnly. OpenAI GPT-6/Codex, as declared by this session; a more precise backend identifier or session UUID is not exposed. Same fresh independent session that returned R7, continuing the same signed REVIEW-001 bundle. Executor Actor 01 is Anthropic Claude Opus 5.5. Different model families; the same-family Council relationship with OPERATIONS_COORDINATOR_Codex is disclosed. No old Reviewer-session notes or blue-group supplemental analysis used; no delegated agents.
- Continuation ACK: `REVIEW_ACK_CONTINUATION_R8.md`, SHA-256 `<PRIVATE_REF_05395>`.

## Candidate and custody

| Exact reviewed artifact, relative to workspace | SHA-256 |
|---|---|
| Submission: `evidence/adapter_record_stage/executor/ADAPTER_RECORD_R8_GCP_PROFILE_REWORK_SUBMISSION.md` | `<PRIVATE_REF_04336>` |
| Candidate Record: `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R8.md` | `<PRIVATE_REF_05791>` |
| Script: `executor/adapter_record_stage/ma1_verify_r8.py` | `<PRIVATE_REF_05762>` |
| Registry: `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R8.json` | `<PRIVATE_REF_03758>` |
| Executor manifest: `evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R8` | `<PRIVATE_REF_05916>` |
| Executor gap addendum: `evidence/gcp_profile_stage/executor/GENUINE_EVIDENCE_GAPS_R8_EXECUTOR.md` | `<PRIVATE_REF_04628>` |

Raw-first order: independently inspect R8 source predicates and genuine producer streams before reconciling the candidate/submission narrative; reproduce supplied suites in isolated Reviewer directories; build new DERIVED cases from retained bytes with all required R8 roles, new probe custody and a working unfiltered full-path control; then reconcile claims and document semantics. No Executor fixture-building helper is used by `independent_review_r8.py` or its supplements. All mutations are explicitly DERIVED. Their inventory union is not a genuine point-in-time query.

R1–R8 manifests verified: 39/74/109/167/255/523/5391/30743 entries. Genuine LIVE/LIVE2/STAGE: 316/55/24. Immutable R7 Reviewer package: 11178. Every entry matches; `FINAL_CUSTODY_R8.json` records exact manifest hashes. GCP_STAGE's [W] workload paths use its declared workspace base. Registry executable constants, argv, roles, probe pins, classifier sets and timing limits independently agree (`REGISTRY_CHECK_R8.json`). R6's closed static scope is preserved.

## Results and interpretation

- Supplied R8 GCP suite: **87/87 expected**, zero mismatches; includes targeted-reason assertions. `EXECUTOR_GCP_SUITE.out`, `reproduction_gcp/offline_r8_results.json`.
- Supplied R6 suite against R8: **224/224 expected**; `EXECUTOR_R6_SUITE.out`. We did not run the shell wrapper that overwrites Executor artifacts.
- Independent suite: **28 cases** = two full DERIVED positive controls, six correctly rejected controls with intended reasons, one accepted clock-tolerance diagnostic, **18 unintended ELIGIBLE contradictions**, and **one malformed-inventory TypeError**. Results and reproducible fixtures: `INDEPENDENT_RESULTS_R8.json`, `SUPPLEMENTARY_RESULTS_R8.json`, `LIFECYCLE_BOUNDARY_RESULTS_R8.json`, `independent_cases/`.
- Seven separate CLI cases: full DERIVED control accepted; five contradictions also accepted with init/restart exit 0; malformed inventory init exits 1 with traceback. `CLI_RESULTS_R8.json`, `cli/`. A5 prerequisite markers are explicitly SYNTHETIC, endpoints are uncontacted loopback placeholders, and no A4/A3/A5 browser/API test is executed. ELIGIBLE reproductions are instrument failures, not actual A5 PASS.
- A 17-second Retired/provider timestamp difference from the wrapper end is within the declared 60-second skew and is **not** counted as a defect. The boundary diagnostic was initially assigned a refusal expectation, then corrected and rerun before sealing. By contrast, Ready/Active after a recovery probe by over two minutes and an old request completing nearly two minutes after the recorded action end are material contradictions.
- Reusing the old R7 harness with only path changes does not establish closure: its obsolete role/custody/inventory assumptions can cause earlier unrelated refusal. The independent R8 full-path control prevents that masking.

| Original group | R8 disposition |
|---|---|
| RW1 custody | Closed for the finite R7 defects: manifest log binding, separate/exclusive streams and duplicate numeric tag handling. |
| RW2 provider identity/action | Substantial repair; residual revision reconciliation and typed audit status in R8-T3/T5. |
| RW3 probe binding | Partial; registered interpreter/program/URL/routes and root correlation repaired, material non-root correlation/health predicates remain R8-T1. |
| RW4 persistent data binding | Partial; bucket/spec/generation and readback improved; unresolved mount attribution/object-key contradiction R8-T2 and template consistency R8-T3. |
| RW5 inventory | Unfiltered, exhaustive declared classification and freshness/cardinality repaired; genuine E4 remains and malformed rows need R8-T5. |
| RW6 Run lifecycle | Partial; fresh lifecycle/log limits/traffic checks and false min=max census claim repaired, but R8-T3/T4 remain. E3 not closed. |
| RW7 dependency | Closed for the finite exact-IP/structural network defects within the explicitly registered single-NIC/single-disk topology. No broader-topology endorsement. |

## Complete finite rework return to Executor Actor 01

### R8-T1 — correlate every material probe and validate recovery payload (P1; RW3)

Affected code: `check_gce_vm` around 1381–1403; `check_cloud_run` around 1611–1651. The provider request-log match is applied only to Run `/` probes. VM health and VM/GCS object routes can claim a foreign `instance_id` while all gates still pass; deleting the corresponding VM-health request log also passes. Root HTTP 200 with `status=error` and a month-old `container_started_utc` passes, as does backend health `status=error` with the new boot ID.

Reproductions: `vm_health_foreign_frontend_instance`, `vm_data_recovery_foreign_frontend_instance`, `gcs_data_recovery_foreign_frontend_instance`, `vm_health_no_corresponding_request_log`, `run_root_error_payload_stale_start`, `vm_health_backend_error_payload`. The foreign VM-health case also passes the actual CLI.

Required: bind **each** material health/write/read/unavailable route to the same provider project/service/revision/instance and matching method, full route/query, status and capture time; apply the correct pre/post-action revision/instance membership for that route. Validate the registered application's successful health body and causally valid startup identity/time. Keep provider request identity separate from VM backend boot identity. Reject missing or contradictory matches with a route-specific reason, preserving a meaningful fully bound DERIVED control. If retained raw logs cannot support a role, disclose/refuse it rather than infer it from the root probe.

### R8-T2 — establish actual filesystem and requested object binding (P1; RW4)

Affected code: `block_mounts`/`mount_of` around 1129–1152, data path checks around 1320/1368–1371, GCS object checks around 1641–1651. Both `/dev/shm/ma1prof` and `/var/lib/../../dev/shm/ma1prof` are treated as the bound root because the only candidate mount table is lsblk's **block** mounts. Non-block mounts and symlink resolution are absent. Readback alone does not establish physical path-to-disk ownership. The kernel describes tmpfs as memory-backed and independent of the block layer. [Linux tmpfs documentation](https://docs.kernel.org/filesystems/tmpfs.html).

Reproductions: `vm_data_declared_tmpfs`, `vm_data_dotdot_into_tmpfs`; the former also passes CLI. `gcs_object_name_disagrees_with_requested_id` changes write/read responses and provider object rows to `ma1prof/unrelated-name.json` while the requested ID stays unchanged, and still passes.

Required: canonicalize/reject traversal and ambiguous paths; use raw guest evidence for the resolved application's actual filesystem/source/UUID and intervening non-block or bind mounts, then bind that identity to the described persistent disk. Do not resolve a guest path using the Reviewer's host filesystem. Fail closed on unsupported/incomplete path evidence. Bind the registered GCS object name `ma1prof/<requested-id>.json` to the exact request, content and provider generation. Update C-C's claim that reboot readback alone excludes tmpfs. Missing physical path proof is separately recorded as E5; offline repair is authorized, new capture is not.

### R8-T3 — reconcile revision status and complete service/template configuration (P1; RW2/RW4/RW6)

Affected code: `run_conditions` around 1427; revision/config checks around 1500–1545 and 1560–1581. Both old and new revision `observedGeneration=0` pass. Contradictory duplicate Active/Ready conditions pass because the dictionary keeps the final entry. A service-after template with an extra env value not present in its supposedly ready revision passes. An old revision's replacement nonce inconsistent with the retained service template also passes.

Reproductions: `new_revision_observed_generation_stale`, `old_revision_observed_generation_stale`, `supp_old_revision_contradictory_active_conditions`, `supp_new_revision_contradictory_ready_conditions`, `service_after_template_contradicts_revision`, `replacement_nonce_unchanged_from_old_revision`. Stale new revision and contradictory template both pass CLI.

Required: validate the typed, unique provider conditions and revision `status.observedGeneration == metadata.generation` for every status relied on. Compare the full material service template/action result and its described revision using declared normalization; enforce the same allowed nonce/config change consistently across before/after objects. Reject duplicated/contradictory condition types rather than selecting one. [Cloud Run RevisionStatus](https://docs.cloud.google.com/run/docs/reference/rest/v1/namespaces.revisions) describes reconciliation by observed generation; its `desiredReplicas` covers minScale only, excluding autoscaled instances.

### R8-T4 — prove a causally completed serving replacement (P1; RW6/E3)

Affected code: lifecycle transition windows around 1560–1581 and `late_old` around 1605. An old request starting `06:59:18Z` with `latency=120s` is accepted although it completes `07:01:18Z`, after both Retired `06:59:18.617991Z` and the recorded action end `06:59:20Z`. CLI stores that earlier end as completed. R1 Ready/Active transitions changed to `07:02:00Z`, later than the recovery probe, are also accepted because readiness is bounded only by a later describe capture.

Reproductions: `supp_old_request_inflight_after_retirement` (also CLI); `boundary_new_revision_ready_after_recovery_probe`.

Required: include valid request durations/completion in the serving cutoff, or use another documented authoritative drain/completion signal. Establish when the replacement actually completes before recording completion and before recovery/data verification. Check consistency of lifecycle times with the reconciled action response/service and successful probes, allowing declared clock uncertainty without accepting a multi-minute contradiction. Treat absent/unparseable duration or incomplete drain proof as UNVERIFIED. Desired minScale replicas and loss of routing alone are not an instance/drain census: Cloud Run can retain idle instances and allow in-flight work during scaling/deployment. [Autoscaling documentation](https://docs.cloud.google.com/run/docs/about-instance-autoscaling). Latency describes receipt-to-response processing duration. [Cloud Logging HttpRequest](https://docs.cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry).

The genuine logs' observed old requests all finish before Retired under timestamp-plus-latency reconciliation (`RAW_E3_RECONCILIATION_R8.json`). This is supportive observed evidence, not a claim of complete instance census or a closure of the residual predicate. Do the offline reconciliation first; return a precise E3 physical gap only if the retained records and documented mechanism still cannot establish the required authoritative equivalence.

### R8-T5 — controlled typed refusal at inventory/audit boundaries (P2; RW2/RW5)

Affected code: `inventory_from_gcp` around 1003–1051, `audit_ok` around 1206, `main` around 2356. A JSON asset `name` array triggers unhandled TypeError in `set(rows)`; CLI init exits 1 with traceback. Audit `status.code=false` is accepted as integer zero through Python equality. This is schema/robustness failure; the inventory crash is **not** reported as ELIGIBLE.

Reproductions: `inventory_malformed_row` (also CLI); `audit_non_integer_status_code`.

Required: validate material primitive and container types before hashing/indexing/set construction and before success comparison; reject booleans as numeric audit status codes. Ensure malformed inventory is a controlled Refused/UNVERIFIED with a specific reason both at init and revalidation, with no accidental success/state initialization. Add meaningful malformed-array/object/null and duplicate-condition regressions; do not blanket-convert unrelated internal bugs into success.

## Genuine evidence and governance disposition

No genuine bundle is ELIGIBLE in R8. Both genuine mixed VM stop/start and reset reproduce raw Gate A=true and Gate B=false under the current R8 predicates; they do not validate the stronger missing predicates found here. Genuine standalone VM/Run remain incomplete. E1, E2, E4 are confirmed; E3 remains conditional and offline-first; E5 identifies missing raw resolved data-path mount proof. Details and exact required capture fields are in `GENUINE_EVIDENCE_GAPS_TO_OPERATIONS_COORDINATOR_R8.md`.

No cloud calls were made in this continuation. The runtime window ended at 10:50:59Z and attempts remain VM 3/3, Run 3/3. Executor Actor 01 may fix code/docs and create labelled offline regressions under the current release. New genuine execution needs a separate bounded release or governed coverage disposition. C-A correctly limits this registry to the minimal validation workload; Alerta needs a reviewed application registry revision. No private architecture mandate, new same-name resource adoption, or data-store restart is authorized.

Historical teardown/residue disposition is retained: known provider-managed address later absent in GP-186/187/188, task resources deleted in retained records, API/default environment leftovers recorded for future reset. This is not a current live query, a project CLEAN certificate, Adapter Record ratification, WF-8 closure or W2 T0.

## Action Receipt Result — same continuing bundle

- **[Receipt ID]:** AI-CICD-20261002-MA1-GCP-PROFILE-REVIEW-001.
- **[Result]:** TARGETED_REWORK; standing offline review loop remains open, no final PASS and no second receipt consumption. Genuine-evidence gap artifact ready for Operations Coordinator relay.
- **[Actual target]:** exact hashed R8 six-artifact candidate and retained MA-1 GCP evidence for `<CLOUD_PROJECT>`.
- **[Actual action]:** independent raw-first review, isolated 87/224 supplied checks, 28 independent cases, seven CLI cases, official documentation verification, custody/registry checks, own formal returns and shared NEXT handoff. Zero provider queries/mutations; no SDK/auth/IAM changes.
- **[Actual evidence locator]:** `source-04842.md`; sibling result files, helper scripts, DERIVED fixtures, gap report and `SHA256SUMS_REVIEW_R8` bind this continuation. Initial fresh-session ACK and signed release/loadout/charter remain the same bundle basis.
- **[Reconciliation / anomaly]:** review receipt still valid, window/attempts exhausted. One auxiliary Python import omitted PYTHONDONTWRITEBYTECODE and transiently created `executor/adapter_record_stage/__pycache__/ma1_verify_r8.cpython-314.pyc` (229916 bytes); only that Reviewer-created file and its empty directory were removed immediately. This was an accidental boundary write, not a source change; final manifests all match and the generated file is absent. Subsequent imports set PYTHONDONTWRITEBYTECODE=1. Two hand-written progress times were corrected publicly to tool UTC; sealed artifact times use the system clock. No net Executor artifact modification, secret output, external message, old-review loading or fictitious terminal success.

Executor Actor 01 owns the complete finite R8-T1–T5 offline set and a versioned resubmission. Operations Coordinator owns confirmed physical gaps and any governed coverage amendment. The shared state routes code repair directly to Executor; no cloud action awaits or receives authorization from this review.

End from Reviewer Actor 02.

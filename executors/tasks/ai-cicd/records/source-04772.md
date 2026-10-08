This is from Executor Actor 01.

# ADAPTER_RECORD_R8_GCP_PROFILE_REWORK_SUBMISSION

[Task ref]: AI_CICD / MA-1 / GCP_PROFILE_VALIDATION · [Executor]: Executor Actor 01 (Anthropic Claude Opus 5.5, `claude-opus-5-5`)
[Release]: `MA1_GCP_PROFILE_VALIDATION_LOOP_RELEASE_2026-10-03_r1.md`, SHA-256 `<PRIVATE_REF_02940>`
[Answers]: `evidence/gcp_profile_stage/reviewer/REVIEW_RETURN_GCP_PROFILE_R7.md`, SHA-256 `<PRIVATE_REF_03246>` (TARGETED_REWORK RW1–RW7)
[Mode]: offline rework inside the standing loop. The window had ended, so there were no provider calls and no resources. The genuine captures, R1–R7 and all Reviewer files are unchanged (K36/K37).

## Artifacts

| Artifact | SHA-256 |
|---|---|
| `executor/adapter_record_stage/ma1_verify_r8.py` | `<PRIVATE_REF_05762>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R8.md` | see `SHA256SUMS_ADAPTER_STAGE_R8` |
| `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R8.json` | `<PRIVATE_REF_03758>` |
| `evidence/adapter_record_stage/executor/static_checks_r8/` (runner, R8 suite, DERIVED fixture builder, CLI builder, R6-on-R8 suite, Reviewer Actor 02-harness-on-R8 runner, K01–K40, log, scratch) | see `SHA256SUMS_ADAPTER_STAGE_R8` |
| `evidence/gcp_profile_stage/executor/GENUINE_EVIDENCE_GAPS_R8_EXECUTOR.md` (E1/E2 unchanged, E3 offline reconciliation, new E4) | see `SHA256SUMS_ADAPTER_STAGE_R8` [D] |

## REWORK_RETURN — finding → repair → evidence

| ID | Repair in `ma1_verify_r8.py` | Regression evidence (K04 unless noted) |
|---|---|---|
| RW1 | `EntryBook`: the command log must be listed in the manifest; stdout and stderr are distinct locators, each at its hash, manifest-listed, and referenced by exactly one log line; a repeated tag under another label is ambiguous. The custody failure blocks every role and the inventory. | `command_log_not_manifested`, `inventory_stderr_reused`, a restart-role stderr reused, stdout = stderr, duplicate tag, a stream missing from the manifest; K12 CLI init refused |
| RW2 | Exact VM/disk `selfLink`/zone/id/users; one attached boot disk; provider stop/start timestamps inside the action windows; audit = one successful operation (first and last record, project/zone/`resourceName`/id, no non-OK status or ERROR); Run service, revision and owner identity; uid/namespace and VM id bound to the inventory; action stdout = reconciled service at generation + 1 with R1 ready; logs bound to project/location/service; malformed provider output fails closed instead of crashing. | 17 cases, including all five Reviewer Actor 02 identity cases, `action_stdout_empty`, the stale generation, three audit variants and inventory-id mismatches |
| RW3 | Probe = pinned interpreter + registered program digest listed in the manifest, a provider-recorded frontend URL and the registered route; result line echoes method/route; body is exactly one JSON object; Run probes are correlated with request logs (revision, instance, host, path, status, time); the VM health backend boot id must equal the guest's new boot; VM probes only through a dependent frontend. | 9 cases, including `unbound_probe_program_endpoint`, `probe_response_wrong_identity`, `vm_recovery_wrong_route`, a different program digest, a non-provider URL, extra body data and a boot-id mismatch; K26/K27 CLI |
| RW4 | Run: one `BUCKET` binding across R0, R1 and both templates; spec/annotations identical except the nonce; write/read-before/read-after plus provider bucket and object generation. VM: provider startup-script data path unchanged and on the bound root filesystem mount; object written, read before, listed on the new boot and read back identical. | 11 cases, including `storage_bucket_changed`, missing storage/data roles, generation mismatch, changed read-after, data path changed or undeclared, a different data mount with root preserved, object absent after boot; K25 CLI |
| RW5 | Unfiltered whole-project asset search required (R7 filtered query refused by name); closed classification table (unsupported serving and unknown types fail closed; revisions bound to inventoried services); duplicate rows rejected; one project number; capture after unit creation; ending at or before, and at most 1800 s before, the first action. | 13 cases, including `unregistered_compute_asset_ignored`, `duplicate_inventory_rows`, `coherently_stale_inventory_month_old`, unknown type, duplicate asset rows, capture after the first action, state-level over-age, skew, asset/list disagreement; K08/K09/K13 CLI |
| RW6 | Every entry no later than the validation time; R1 created, Ready and Active inside the action; R0 Retired inside the action with route and desired replicas gone; service reconciled with a single untagged route; log window covers R0's creation and is not truncated; no post-retirement request by another revision; probes matched in the request logs. C-2's single-instance claim is withdrawn; E3 is reconciled as provider zero-serving equivalence. | 10 cases, including `retired_condition_timestamp_predates_action`, `replacement_revision_not_ready`, `logs_only_start_events_no_serving_requests`, `restart_future_to_now`, truncated log, short window, tagged route, unreconciled service, route kept, late old request |
| RW7 | Parsed network-interfaces must equal the VM's single NIC network/subnetwork exactly; egress `private-ranges-only`; exactly one `VM_URL` with hostname = `networkIP`; all four wiring sources checked. Record, registry, bundle-format text and the residue reference updated, with no standalone claim. | 5 cases, including `dependency_ip_substring_false_match`, a hostname suffix, another network, all-traffic egress, a revision-only backend change |

Reviewer Actor 02's harness, re-run unchanged except for its two path constants (K06): **0 of 27** unexpected acceptances on R8. The R6 suite on R8 (K05): 224/224.

## Genuine outcome and gaps (stated plainly)

- **No genuine bundle is ELIGIBLE under R8 (E4).** Every genuine inventory captured while the units existed used the R7 type-filtered asset query, which R8 rightly refuses.
- **The genuine mixed stop/start and reset bundles pass Gate A** under every R8 check (raw gate True).
- **The full ELIGIBLE path is demonstrated only on a labelled DERIVED unfiltered base**, not on genuine evidence.
- **E1 and E2 remain**, as Reviewer Actor 02 found.
- **E3:** I propose it reconciled offline. Reviewer Actor 02 to verify.
- **E4 is new and caused by RW5.** All four gaps are routed to Operations Coordinator in `GENUINE_EVIDENCE_GAPS_R8_EXECUTOR.md`.
- **No real action has been taken or requested by me.**
- **Seg-2 custody fact:** `SHA256SUMS_GCP_LIVE2` does not list `probe.py`. This is recorded, not repaired.
- **Workload-specific handlers (Record C-A):** the application-level handlers apply to the validation workload only. An Alerta arm needs a reviewed registry revision.

## Operational notes

- **Defects found by my own suite and fixed before the recorded run:**
  - a malformed audit row crashed the verifier (now fails closed);
  - a repeated tag under a different label was not treated as ambiguous;
  - a fixture-helper return-value bug in my own test code.
- **Diagnostics ordering:** storage-binding and storage-role checks were moved ahead of the probes, so standalone-Run reports show E2 directly.
- **Scratch use:** exploration scripts ran in the session scratchpad only. The DERIVED fixtures (about 171 MB) live under `static_checks_r8/scratch*` and can be regenerated by the runner.

End from Executor Actor 01.

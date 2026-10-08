This is from Executor Actor 01.

# ADAPTER_RECORD_R12_ALERTA_SUBMISSION — MA-1.10 Alerta application-profile finalization

[Executor]: Executor Actor 01 (Anthropic Claude Opus 5.5, `claude-opus-5-5`; the same thread as R7–R11, continued after context compaction)
[Release]: `MA1_ALERTA_PROFILE_FINALIZATION_RELEASE_2026-10-04_r1.md`, SHA-256 `<PRIVATE_REF_02781>`. Pins verified at entry: R11 Record `<PRIVATE_REF_01298>…f8ed9`, script `<PRIVATE_REF_03709>…e932`, registry `<PRIVATE_REF_01702>…89bd`, R11 review `<PRIVATE_REF_02637>…dcfd`, handoff `<PRIVATE_REF_01424>…70cd`.
[Mode]: Offline only. No provider, network, endpoint, browser, VM or Run operation; no credential access; no install. R1–R11 and all genuine raw evidence are unchanged (Q06).

## Exact final candidate

| Artifact | SHA-256 |
|---|---|
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_FINAL_R12_ALERTA.md` (self-contained Record) | see `SHA256SUMS_ADAPTER_STAGE_R12` |
| `executor/adapter_record_stage/ma1_verify_r12.py` | `<PRIVATE_REF_04483>` |
| `executor/adapter_record_stage/alerta_probe.py` | `<PRIVATE_REF_02248>` |
| `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R12.json` (platform layer + `alerta` profile + capture contract) | `<PRIVATE_REF_05195>` |
| `evidence/adapter_record_stage/executor/capture_contract_r12/gw.sh` | `<PRIVATE_REF_02525>` |
| `evidence/adapter_record_stage/executor/capture_contract_r12/redact_w2.pl` | `<PRIVATE_REF_03716>` |
| `evidence/adapter_record_stage/executor/static_checks_r12/` (Q01–Q08, suite, fixtures helper, R6-on-R12) | see `SHA256SUMS_ADAPTER_STAGE_R12` |

## C-A mapping (what changed from R11)

- **One script, two strata.**
  - The platform layer is unchanged and remains genuinely calibrated by R11.
  - The application vocabulary becomes an explicit, state-frozen profile. W2 arms use `alerta`; `calibration-2026-10-04` is regression-only.
- **The `alerta` profile.**
  - **Health check.** The frozen A3 `test_01` route and body (`GET <api-url>/management/gtg` → 200 `OK`), probed by `alerta_probe.py`.
  - **Endpoint binding.** The arm's api-url is bound by provider records: a Run service URL, the VM's external IP, or a Run frontend with a structural private dependency on the VM, found in env values with no declared variable name.
  - **Run correlation.** Exclusive 1:1 matching of provider request logs.
  - **Persistence.** The frozen A5-P/N/S chain.
  - **Datastore.** A managed Cloud SQL datastore is classified as persistence and is not restarted.
- **No requirement to reuse calibration specifics.** Nothing requires port 22, `run_app.py`, `VM_URL`, `BUCKET`, the calibration probes or bucket.
- **Capture contract.** A wrapper template and a redactor that adds URL-userinfo masking, because Alerta DB URLs can carry passwords in env values.

## Evidence separation and results

- **Genuine local Alerta** (VALIDATED chain): A3-P/S/N, A4 PASS and the frozen health route confirmed from retained runtime outputs.
- **Genuine GCP calibration** (R11): still ELIGIBLE under the calibration profile, and refused under `alerta`.
- **DERIVED composition:** three supported Alerta topologies plus a Cloud SQL case are ELIGIBLE; 17 material mismatches are refused, each with its targeted reason; CLI behaves as designed.
- **Totals.** Q03 40/40. Q04 R6 224/224. Q05–Q08 pass.
- **No combined real Alerta-on-GCP positive is claimed** (Record C-R12-1).

## Defect found and fixed (offline, before the recorded run)

In the first trial, a mixed-topology VM probe whose request log had been removed was still accepted, because the frontend's own probe log two seconds earlier matched within tolerance. The fix is exclusive nearest-log claiming; the case is now a recorded negative.

## Open items Human Operator should see (disclosed, not blockers of this offline Record)

- **Correction made after reading the frozen backend source** (offline, read-only, from the retained frozen archive). `/management/gtg` returns `OK` only when `db.is_alive`. Record C-R12-5 is corrected accordingly; the profile logic is unchanged.
- **C-R12-6, source identity.** The deployed artifact cannot be bound to the frozen pins by this instrument: the frozen backend reports no source pin at runtime, and provider records give only the Run image digest.
  - **Locally,** this was done by control-plane build provenance (RT-010).
  - **Anchors for the W2 deployment-provenance gate** are recorded: backend archive `<PRIVATE_REF_03254>…08fe`, frontend archive `<PRIVATE_REF_00978>…f6c3`.
  - **Who decides.** If Reviewer Actor 02 or Human Operator consider runtime source binding part of this applicability scope, it is the one finite contract blocker: it needs a provenance capture that does not yet exist. Otherwise it belongs to the W2 deployment gate.

- **C-R12-3.** GCE serving VMs need the per-boot guest capture unit (Record §5.6). How it gets installed in a W2 arm, without SSH-key mutation or guest login and without revealing acceptance material, must be arranged in the W2 brief. Without it, VM restarts stay UNVERIFIED (fail closed).
- **C-R12-4.** Supported topologies are a closed set. Unknown asset types or topologies fail closed until a reviewed registry revision, which must happen before W2A T0.

## Executor action result (no cloud receipt used)

- **Scope.** Offline release work only. Old cloud receipts were neither used nor consumed.
- **Actual target.** The MA-1 workspace: new versioned R12 artifacts under `executor/adapter_record_stage/` and `evidence/adapter_record_stage/executor/`.
- **Actual action.** R12 script, probe, registry, capture contract, self-contained Record and offline checks.
- **Evidence locator.** `SHA256SUMS_ADAPTER_STAGE_R12`.
- **Anomalies.** The one R12 defect above, fixed before the recorded run.

End from Executor Actor 01.

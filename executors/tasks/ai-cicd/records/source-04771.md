# ADAPTER_RECORD_R7_GCP_PROFILE_SUBMISSION

[Task ref]: AI_CICD / MA-1 / GCP_PROFILE_VALIDATION · [Executor]: Executor Actor 01 (model family: Anthropic Claude)
[Release]: `MA1_GCP_PROFILE_VALIDATION_LOOP_RELEASE_2026-10-03_r1.md`, SHA-256 `<PRIVATE_REF_02940>`. Loadout `<PRIVATE_REF_01965>…c5d`. EXEC_ACK `evidence/gcp_profile_stage/executor/EXEC_ACK_GCP_PROFILE.md`.
[Status]: Live captures complete. All task resources deleted. Candidate R7 handed to the Reviewer via `evidence/gcp_profile_stage/GCP_PROFILE_LOOP_STATE.md`. One provider-managed residue is pending automatic release; it is monitored read-only until the window closes.

## Artifacts

| Artifact | SHA-256 |
|---|---|
| `executor/adapter_record_stage/ma1_verify_r7.py` | `<PRIVATE_REF_04356>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R7.md` | see `SHA256SUMS_ADAPTER_STAGE_R7` |
| `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R7.json` | `<PRIVATE_REF_04083>` |
| `evidence/adapter_record_stage/executor/static_checks_r7/` (runner, GCP suite, R6-on-R7 regression, fixture builder, H01–H36 outputs, log) | see `SHA256SUMS_ADAPTER_STAGE_R7` |
| `evidence/gcp_profile_stage/executor/GCP_COMMAND_LOG.md` (GP-001–155, frozen) | `SHA256SUMS_GCP_LIVE` (316 entries) |
| `evidence/gcp_profile_stage/executor/GCP_COMMAND_LOG_2.md` (GP-156–182, frozen) | `SHA256SUMS_GCP_LIVE2` (55 entries) |
| `evidence/gcp_profile_stage/executor/GCP_RESIDUE_LOG.md` (GP-183+, read-only re-checks, append-only until window end) | `SHA256SUMS_GCP_STAGE` |
| `evidence/gcp_profile_stage/executor/TEARDOWN_RESIDUE_RECORD.md`, workload sources `executor/gcp_profile_stage/{vm_startup.sh,run_app.py}`, `support/{gp.sh,probe.py,redact_gp.pl,redact_gp2.pl}` | `SHA256SUMS_GCP_STAGE` |

## Genuine controls (release requirement → evidence)

| Requirement | Evidence |
|---|---|
| Authoritative complete inventory, with a known-present target | Gate B from three dedicated producers that must agree; `GP-075/079/078` → `{gce_vm …-vm, cloud_run …-run}`; standalone `GP-160/161/162` → `{cloud_run …-run}`; whole-project asset baselines GP-046 (no compute) and GP-150 (after teardown) |
| Exact dedicated producer / argv and exclusive stdout | Every capture is its own `gp.sh` entry (exact argv, `--project` explicit, separate stdout/stderr, R6 cardinality). Logs 1 and 2 parse with zero defects. Producer deception and repeated-field fixtures are refused. |
| Real VM stop/start or reset | Stop/start GP-082/086 (TERMINATED observed; boot changed); reset GP-117 (boot changed). Audit-corroborated (GP-135). |
| Real managed-instance replacement | Cloud Run new revision with the pinned digest and a nonce: GP-095 (union) and GP-167 (standalone). The old revision is provider-Retired, and the instances are new per Cloud Logging. |
| Identity, application recovery and persistent storage | Instance and disk ids; guest boot id, uptime, typed serving process, root filesystem UUID and PARTUUID; probes 502→200; VM persistence object survived both restarts (GP-090/121); GCS object read after replacement (GP-099). |
| Negatives from genuine captures | suspend/resume (GP-109–115), traffic no-op (GP-104–107), failed inventory (GP-076), stale inventories (GP-054/055), wrong location/zone/regional listing (GP-127/128/080), anonymous 403 (GP-068/165); plus mislabelled-role and cross-log cases |
| Retained R6 producer deception and cardinality negatives | H05: the R6 suite runs 224/224 against R7; lima CLI regressions H27–H30 |
| Mixed-union coverage using the same two resources | Union bundles (stop/start and reset) are ELIGIBLE, with provider-recorded private dependency evidence |
| One frozen Cloud Run mechanism | `services update --image=<replaced revision digest> --update-env-vars=MA1_REPLACEMENT_NONCE=<nonce>`; traffic-only and other actions are rejected |

Coverage limits are in Record §5. The main one, C-1: no genuine standalone-GCE-VM end-to-end positive. VM Gate A is genuine, but every genuine inventory captured while the VM existed also contained the Cloud Run service, and all three VM attempts were used (stop/start, a genuine suspend/resume negative, and reset).

## Operational notes (all recorded in the logs)

- **GP-001–019:** local gcloud load failure (the pinned PATH chose Python 3.9) before any provider request. Fixed by pinning `CLOUDSDK_PYTHON` to the interpreter gcloud normally uses.
- **GP-020–025:** valid reads that the keyword redactor over-redacted. The wrapper moved to the value-pattern `redact_gp2.pl`.
- **GP-076:** a transient provider PERMISSION_DENIED on the all-regions Run list. The retry (GP-079) succeeded.
- **Out-of-wrapper read-only polls** (serial capture waits and asset-index readiness) are noted in the logs. One poll observed the asset index lagging (empty while the service was serving).
- **Self-created orphan removed:** `executor/adapter_record_stage/__pycache__/ma1_verify_r6.cpython-314.pyc` (07:11:01Z) came from a one-off log-freeze check that imported R6 without `PYTHONDONTWRITEBYTECODE`. No manifest listed it. It was removed at about 07:29Z, and no `__pycache__` remains in the Executor roots.
- **Offline test expectations corrected before the logged run** (six). Each was verifier-correct behaviour that my draft had mislabelled; one stale-skew case became a DERIVED log-time fixture.

## Action Receipt Result (for Operations Coordinator to append)

- **[Receipt ID]:** AI-CICD-20261002-MA1-GCP-PROFILE-EXEC-001
- **[Result]:** succeeded. The validation bundle's live phase and teardown are complete; the candidate is submitted for independent review. This is not a Reviewer PASS, ratification or W2 entry.
- **[Actual target]:** Project `<CLOUD_PROJECT>`, `australia-southeast1` / zone `australia-southeast1-a`.
  - Created and deleted: bucket `<CLOUD_PROJECT>-<MA1_PROFILE_RESOURCE_PREFIX>`; keyless SA `<MA1_PROFILE_RESOURCE_PREFIX>` (twice); VM `<MA1_PROFILE_RESOURCE_PREFIX>-vm` with its boot disk; Cloud Run `<MA1_PROFILE_RESOURCE_PREFIX>-run` (twice).
  - APIs `compute` and `run` enabled.
- **[Actual action]:**
  - Read-only preflight.
  - API enablement at 06:50:59Z (window start).
  - Provisioning and genuine captures.
  - VM: stop/start, suspend/resume (negative) and reset — 3/3.
  - Cloud Run: new-revision replacement, traffic-only no-op (negative), and standalone new-revision replacement — 3/3.
  - Teardown of all task resources by 07:17Z, residue inspection, and offline R7 adapter/profile implementation and checks.
- **[Actual evidence locator]:** `evidence/gcp_profile_stage/executor/` (`GCP_COMMAND_LOG.md` + `SHA256SUMS_GCP_LIVE`, `GCP_COMMAND_LOG_2.md` + `SHA256SUMS_GCP_LIVE2`, `GCP_RESIDUE_LOG.md`, `TEARDOWN_RESIDUE_RECORD.md`, `SHA256SUMS_GCP_STAGE`); `evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R7`.
- **[Reconciliation / anomaly]:**
  - **Bundle count:** one bundle, consumed 1/1; attempts VM 3/3 and Cloud Run 3/3.
  - **Residue:** provider-managed `serverless-ipv4-cloudrun-1791010435540004708` (RESERVED, purpose SERVERLESS) from Cloud Run Direct VPC egress is pending automatic release. It was not deleted (outside the authorized resource set) and is monitored until 10:50:59Z.
  - **Left enabled:** APIs compute and run, plus the Google auto-enabled artifactregistry, containerregistry and pubsub.
  - **Auto-created:** default VPC network, subnets and firewall rules. These go in the W2A reset record, not reverted.
  - **Disclosed:** the local tooling failures and redactor change; standalone-VM coverage limit C-1.

A Reviewer PASS would make R7 eligible for Human Operator ratification of the exact Adapter Record. It is not ratification, WF-8 closure or W2 T0.

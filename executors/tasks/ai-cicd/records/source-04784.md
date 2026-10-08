# MA-1 Alerta Adapter Record — candidate R8 (MA-1.10): GCP profile rework

[Status]: CANDIDATE R8 for independent cross-family VerifyOnly re-review in the GCP profile loop. Not ratified; not a WF-8 release; no W2 T0.
[Task ref]: AI_CICD / MA-1 / GCP_PROFILE_VALIDATION · [Author]: Executor Actor 01
[Release]: `MA1_GCP_PROFILE_VALIDATION_LOOP_RELEASE_2026-10-03_r1.md`, SHA-256 `<PRIVATE_REF_02940>`.
[Review answered]: `evidence/gcp_profile_stage/reviewer/REVIEW_RETURN_GCP_PROFILE_R7.md`, SHA-256 `<PRIVATE_REF_03246>` (TARGETED_REWORK, RW1–RW7).
[Base]: R7 and R1–R6, all preserved byte-for-byte (R7 manifest 5391/5391 re-verified, K37). The genuine live captures are unchanged: LIVE `<PRIVATE_REF_04996>…7a4c`, LIVE2 `<PRIVATE_REF_04006>…e124`, STAGE `<PRIVATE_REF_04183>…9838`.
[Change from R7]: The GCP module is rewritten for RW1–RW7. The lima path, A3/A4/A5 and custody are unchanged, and the R6 suite still passes 224/224 on R8. R8 is offline only: no provider call.

## 0. Scope

The scope is unchanged from R7 §0. This is a non-W2 sandbox validation of the adapter's **platform evidence handlers**, run on a minimal non-Alerta workload. It produces no W2 acceptance outcome.

## 1. Restart eligibility — GCP profiles (R8)

- **Outcome rule:** ELIGIBLE requires Gate A and Gate B together. Anything else is UNVERIFIED, `a5-check` is refused and A5 cannot PASS. Suspend/resume, traffic-only, and process/container actions are REJECTED.
- **No transcribed values:** the bundle names role → entry id only.
- **Registry:** roles, argv templates and the probe contract are in `PROFILE_REGISTRY_R8.json`, exported from the script.
- **Fail-closed:** a malformed provider document fails the unit; it never crashes the verifier.

### 1.1 Gate B — authoritative project-wide inventory (RW5)

- **Producers.** Exactly three dedicated producers, each under §1.2 custody:
  - compute instances list
  - all-region Run services list
  - the **unfiltered** `gcloud asset search-all-resources --scope=projects/P --format=json`

  The R7 type-filtered asset query is refused by name.
- **Strict rows:**
  - no duplicate list or asset rows;
  - exact compute `selfLink`/`zone` URLs and a numeric id;
  - Run rows are `kind=Service` with namespace = the project number, a uid, a location, and an exact `selfLink`;
  - every asset row carries one project number.
- **Classification.** Every asset row must classify:
  - **Supported serving:** GCE Instance and Run Service.
  - **Bound auxiliary:** a Run Revision, only if it belongs to an inventoried service.
  - **Non-serving:** the infrastructure types observed in genuine unfiltered captures, plus the release's task types.
  - **Fail closed:** known unsupported serving types (Run Job, WorkerPool, Functions, GKE, App Engine, MIGs, load-balancer front ends, VPC connectors, Batch, Dataproc, Composer, Vertex endpoints and others) and every unknown type.
- **Agreement.** The per-service lists (strongly consistent; the known-present control) and the asset index must agree exactly on the serving units.
- **Freshness.**
  - The three producers must run within 900 s of each other.
  - Each must run after the provider creation time of every listed unit.
  - At restart, the inventory must end at or before the first action and no more than 1800 s before it.

  These rules compare provider and capture times only; wall-clock "now" is not used, so a valid historical capture can still be replayed.
- **Binding to the restart.** The unit set, VM id/`selfLink`, and Run uid/namespace must match the restart evidence. Any record, manifest or log change after init leaves the restart UNVERIFIED.

### 1.2 Producer custody (RW1, every role)

- The command log must be listed exactly once in the bundle manifest at its current SHA-256.
- Each fetched entry must have R6 cardinality, an exact argv template and exit 0.
- stdout and stderr must be two distinct locators, each at its logged hash, each listed in the manifest, and each referenced by exactly one line of the whole log.
- A repeated tag is ambiguous even under a different label.
- Every fetched entry's end time must not be later than the validation time.

### 1.3 `gce_vm` (`vm_stop_start` | `vm_reset`)

- **Roles:** `GCP_ROLES`. New in R8: `data_write`, `data_read_before`, `data_read_after`.
- **Provider identity (RW2):**
  - Every describe has an exact `selfLink`/zone and one id across before, stopped and after, and that id matches the inventory row.
  - Exactly one attached disk, which is the boot disk.
  - Disk describes: exact `selfLink`/zone/name, the same id, and `users` exactly equal to `[instance selfLink]`.
  - Provider `lastStopTimestamp` falls inside the stop window and `lastStartTimestamp` inside the start window.
  - The audit log has one operation per action call on exactly this instance (project, zone, `resourceName`, instance id). Its first and last records fall inside the action window, and no record carries a non-OK status or ERROR severity.
- **Guest evidence** (as R7): boot id changed, uptime reset, serving processes unchanged and all restarted, and the same root filesystem identity.
- **Data path (RW4):**
  - The provider-recorded startup-script declares exactly one data path and is unchanged across the action.
  - In both guest captures, that path's longest block mount is `/` on the bound root filesystem.
  - The object written before the action and read before it appears in `objects=` on the new boot and reads back identical after recovery.
- **Probes (RW3):**
  - Only through a Run frontend in the same bundle whose provider wiring depends on this VM (§1.5).
  - The `/vm/health` probe must be non-200 while stopped and 200 after, and the backend `boot_id` must equal the guest's new boot id.

### 1.4 `cloud_run` (`replace_all_instances`; frozen mechanism: `services update --image=<replaced digest> --update-env-vars=MA1_REPLACEMENT_NONCE=<nonce>`)

- **Identity (RW2):**
  - The service before and after has the same name, namespace (project number), uid, location and exact `selfLink`, matching the inventory row.
  - Revisions R0 and R1 carry the service name, the service uid label, a configuration generation equal to the service generation, and a single Configuration owner.
  - `old_revision_after` is the same object (uid) as R0.
- **Action result.** The update stdout must be the reconciled service at generation + 1, with `observedGeneration` equal, R1 both latest created and latest ready, a single untagged 100% target, and Ready=True. R1 must carry this action's nonce.
- **No code or wiring change (RW4).** Same image digest. The full revision spec and non-volatile annotations are identical except the nonce env. Network-interfaces are compared as parsed JSON.
- **Lifecycle and time (RW6):**
  - **service_after:** reconciled, with Ready, ConfigurationsReady and RoutesReady all true and a single untagged spec/status route.
  - **R1:** created, Ready and Active inside the action, with its route label.
  - **R0:** Retired with the transition inside the action, route label removed, no desired replicas; before the action it was Active with the label.
  - **Ordering:** all roles are ordered relative to the action and A5 setup.
- **Logs (RW2/RW6):**
  - Every entry is `cloud_run_revision` for exactly this project, location and service.
  - The freshness window covers R0 from its creation, and the result count is below the limit (not truncated).
  - No request after R0's retirement was served by any revision other than R1.
  - Each probe's revision and instance id match a provider request log (method, host, path, status, time).
  - Instance-set checks (old instances before the action; every R1 instance started after it; no overlap) are corroboration only, **not** a census (E3; see `GENUINE_EVIDENCE_GAPS_R8_EXECUTOR.md`).
- **Durable storage (RW4).**
  - **Binding:** exactly one `BUCKET` binding, identical across R0, R1 and both templates.
  - **Roles:** `storage_write`, `storage_read_before` (both served by R0, before the action) and `storage_read_after` (served by R1, after it) must agree on the object and content.
  - **Provider storage:** bucket describe and objects list show the object in that bucket at the written generation.

### 1.5 Probe contract (RW3) and mixed dependency (RW7)

- **Probe.**
  - Pinned interpreter `/opt/homebrew/bin/python3.14` running `probe.py` at SHA-256 `<PRIVATE_REF_04994>…d1fc`, listed in the bundle manifest.
  - The target must be a provider-recorded URL of the bound frontend (`run.googleapis.com/urls` or `status.url`).
  - Each role has a registered method and route.
  - Result line 1 must echo the probed method/route; the remainder must be exactly one JSON object.
- **Dependency (mixed union; also gates VM probes).** In each of the four wiring sources (both revisions, both templates):
  - the parsed `run.googleapis.com/network-interfaces` must equal the VM's single NIC network and subnetwork names exactly (same project, frontend region);
  - egress must be `private-ranges-only`;
  - there must be exactly one `VM_URL`, whose URL hostname is exactly the VM `networkIP`.

  There is no substring matching.

## 2. Evidence and results

| Item | Result |
|---|---|
| K04 R8 offline suite (`offline_checks_r8_gcp.py`) | **87/87 as expected**, each negative with its targeted reason. **Genuine:** 12 read-only controls. **DERIVED:** 4 full-path cases (2 ELIGIBLE positives; standalone Run E2 and a missing unit, both UNVERIFIED) and 71 one-fact negatives (RW1 6, RW2 17, RW3 9, RW4 11, RW5 13, RW6 10, RW7 5). The negatives cover all 20 of Reviewer Actor 02's unintended-acceptance cases plus the duplicate-tag case, and add at least one contradiction per repaired layer. |
| K05 R6 suite on R8 | 224/224 |
| K06 Reviewer Actor 02's R7 harness, unchanged except its two path constants, run against R8 | 0 of 27 unexpected acceptances. Its controls are now UNVERIFIED because its bundles lack the R8 data/storage roles and its inventories are filtered. |
| K08–K39 CLI | Genuine filtered inventory refused (type-filtered). Genuine post-teardown unfiltered inventory: all 129 rows classify, refused only as having no serving compute. DERIVED base accepted. Unmanifested log, WorkerPool and wrong project refused. DERIVED mixed and reset ELIGIBLE; report A5 UNVERIFIED (post-checks absent). DERIVED standalone Run UNVERIFIED (E2). Genuine mixed UNVERIFIED (no R8 inventory; raw gate True). Suspend REJECTED; noop, VM-only (E1), bucket-changed, arbitrary-probe and tamper-after-init UNVERIFIED; `a5-check` refused. Lima regressions unchanged. No identifier or credential leak. Fixture and Reviewer files unchanged. All preserved manifests verify. |

**Genuine outcome under R8.** No genuine bundle is ELIGIBLE (E4). Gate A holds on the genuine mixed stop/start and reset bundles under every R8 check. The full ELIGIBLE path is shown only on the DERIVED unfiltered base described in `fixtures_r8.py`.

## 3. Script and registry

| Field | Value |
|---|---|
| Script | `executor/adapter_record_stage/ma1_verify_r8.py`, SHA-256 `<PRIVATE_REF_05762>` |
| Profile registry | `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R8.json`, SHA-256 `<PRIVATE_REF_03758>` |
| Static checks | `evidence/adapter_record_stage/executor/static_checks_r8/` (rerunnable: `bash run_static_checks_r8.sh <workspace root>`) |

## 4. Coverage limits and remaining genuine-evidence gaps

- **E1.** No genuine standalone GCE VM positive, and no registered standalone-VM probe mechanism.
- **E2.** No genuine standalone Cloud Run storage positive. Segment 2's manifest also does not list the probe program.
- **E3.** Reconciled offline as provider zero-serving equivalence (§1.4); no instance census is claimed. R7 C-2's "min=max=1 means exactly one instance" is withdrawn.
- **E4 (new).** No genuine unfiltered inventory exists from while the units existed, so no genuine bundle is ELIGIBLE under R8.
- **C-A: application-profile vocabulary.** The probe routes and JSON field names, `VM_URL`/`BUCKET`, and the startup-script `DATA` declaration belong to the validation workload. An Alerta arm, or any other application, needs a reviewed registry revision before these handlers apply to it.
- **C-B: topology scope.** Single-NIC VMs with one attached boot disk, Direct VPC with `private-ranges-only` egress, single-container revisions, and a single untagged route. Anything else fails closed.
- **C-C: data-path visibility.** Data-path binding uses lsblk block mounts. A tmpfs is excluded by read-back across a genuine reboot; a network filesystem is not excluded.
- **C-D: asset index consistency.** The asset index is eventually consistent. The per-service lists are the known-present control for supported types; an unsupported resource created inside the index lag before capture could be missed. Classification is a closed table, so a benign but unlisted type fails closed until a registry revision adds it.
- **C-E: what custody proves.** A logged argv plus manifest custody establishes local custody, not provider attestation. GCE actions are corroborated by provider audit and Run actions by provider revision and conditions.
- **Residue (replaces R7 C-6).** Resolved: see `evidence/gcp_profile_stage/executor/TEARDOWN_RESIDUE_ADDENDUM_01.md` (SHA-256 `<PRIVATE_REF_03784>…1aca`). The provider auto-released the address between 08:10Z and 09:44Z, with an observation gap; this is not a project-wide CLEAN. The APIs, default VPC, firewall rules, routes and subnets stay recorded for the W2A reset.
- **C-8 (inherited).** `__pycache__` beside the fixtures; local logging config; Ubuntu signature; the cause of the first-start exit; no authentic lima Gate-B positive.

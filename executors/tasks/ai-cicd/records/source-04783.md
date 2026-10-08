# MA-1 Alerta Adapter Record — candidate R7 (MA-1.10) with genuine GCP profiles

[Status]: CANDIDATE R7 for the independent cross-family VerifyOnly review in the GCP profile loop. Not ratified; not a WF-8 release; no W2 T0.
[Task ref]: AI_CICD / MA-1 / GCP_PROFILE_VALIDATION · [Author]: Executor Actor 01
[Release]: `MA1_GCP_PROFILE_VALIDATION_LOOP_RELEASE_2026-10-03_r1.md`, SHA-256 `<PRIVATE_REF_02940>`. Receipt AI-CICD-20261002-MA1-GCP-PROFILE-EXEC-001.
[Governing]: MA-1.3 as replaced by AMD-MA13-R1. Master 02 §6.4.
[Base]: R6 (Reviewer Actor 02 static PASS; code-level producer defect CLOSED). The R1–R6 Records, scripts and manifests are preserved byte-for-byte.
[Change from R6]: Adds the GCP platform profiles `gce_vm` and `cloud_run` and their mixed union, frozen from genuine captures. The R6 lima path and every earlier gate are unchanged; the R6 offline suite re-runs 224/224 against R7.

## 0. Scope

- **Local MA-1.** Validates the A3/A4/A5 application instrument at the frozen pins.
- **This bundle.** A non-W2 GCP sandbox validation of the adapter's **platform evidence handlers**: inventory, producer provenance, restart equivalence, instance/process identity and persistent storage. It used a minimal non-Alerta workload.
- **What it is not.** It produces no W2 acceptance outcome.
- **Unchanged from R6:** A3 (suite `<PRIVATE_REF_00881>…259e`, command, endpoint substitution, no exclusions, backend-log correlation), A4 (`<PRIVATE_REF_03225>…98bc`, 8-step path, PASS/BLOCKED/FAIL), A5 objects/prerequisites/post-check/aggregation, AMD-DK2 custody and INC-1.

## 1. Restart eligibility (all profiles)

- **Outcome.** ELIGIBLE only when Gate A (raw binding) and Gate B (inventory) both hold. Otherwise UNVERIFIED, `a5-check` is refused, and A5 cannot PASS. Process, container, suspend/resume and traffic-only actions are REJECTED.
- **Lima profile.** Unchanged from R6 (dedicated `limactl list` producer, exclusive stdout, field cardinality).
- **GCP profiles.** As below.

### 1.1 GCP Gate B — authoritative complete inventory (`init --deployment-platform gcp --gcp-project P`, three `--deployment-record`)

- **Producers.** Exactly three dedicated producers, each with the exact argv below for project P, exit 0, R6 cardinality, exclusive JSON stdout listed with its hash in the manifest, and the stdout referenced by exactly one log line:
  - `gcloud compute instances list --project=P --format=json`
  - `gcloud run services list --project=P --format=json` (all regions)
  - `gcloud asset search-all-resources --scope=projects/P --asset-types=<frozen compute+disk list> --format=json`
- **Freshness.** All three run within 900 s of each other.
- **Units.** `gce_vm:<zone>/<name>` and `cloud_run:<region>/<name>`. The per-service lists and the asset index must agree **exactly**.
- **Fail-closed.** Any other compute asset type (Run job, Cloud Function, GKE, App Engine) is unclassifiable and fails closed. The bundle's units must equal the inventory, which is re-validated unchanged at restart.

### 1.2 GCP Gate A — no transcribed values

- **Roles.** The bundle names only role → command-log entry id. For each role the verifier requires: R6 cardinality, an exact argv template (project, zone/region and unit substituted), exit 0, manifest custody, and stdout hash. Times come from the entry itself. Every value is derived from genuine provider JSON, guest serial output, Cloud Logging or the GCE audit log.
- **Registry.** The full role templates are in `PROFILE_REGISTRY_R7.json`, exported from the script.

| Profile / action | Evidence the verifier derives |
|---|---|
| `gce_vm` `vm_stop_start` | **Provider:** same instance id and name; RUNNING before and after; TERMINATED in a describe between stop and start; boot-disk binding unchanged; same provider disk id (`disks describe`), and the disk's users include the instance. **Guest** (single serial capture per boot): boot id changed; uptime reset relative to the start entry; the serving-process typed-identity set is unchanged and every instance started after the action; root filesystem `{root_fs_uuid, root_partuuid}` unchanged. **Application:** probe non-200 while stopped and 200 after. **Audit:** completed (`operation.last`) `v1.compute.instances.stop` and `.start` records for this instance id within each action entry's window. |
| `gce_vm` `vm_reset` | As above, without a stopped interval. The after-serial must be the offset-bounded read (`--start=N`). Audit `v1.compute.instances.reset`. Genuine fact: reset does **not** change `lastStartTimestamp`, so guest boot identity is the binding evidence. |
| `cloud_run` `replace_all_instances` (frozen mechanism) | **Action:** `gcloud run services update <svc> --project --region --image=<digest of the replaced revision> --update-env-vars=MA1_REPLACEMENT_NONCE=<nonce> --format=json`. **Traffic:** 100% moves from R0 to a different R1. **No code change:** R1 has the same `imageDigest` and command/args as R0. **Provider zero-serving state for R0:** `Active=False, reason Retired`. **Cloud Logging:** R0 instance ids identified before the action; every R1 instance logged "Starting new instance" after the action start; no overlap; no request after the action served by any revision other than R1. **Probes:** before and after 200. |
| mixed union | Both units satisfy their profiles in one bundle, and the provider records show the frontend's private dependency: Cloud Run template `run.googleapis.com/network-interfaces` names the VM's network, egress is `private-ranges-only`, and the template env references the VM's `networkIP`. |

## 2. Genuine evidence

All of the following come from bounded live captures (GP-001–182), frozen with `SHA256SUMS_GCP_LIVE` (316 entries) and `SHA256SUMS_GCP_LIVE2` (55 entries).

- **Mixed-union positive (ELIGIBLE, both gates):**
  - VM stop/start: GP-081…091, audit GP-135. Boot `986f94f3…` → `cb88c367…`; disk id `6907983805155186851` unchanged; probe 502/`URLError` while stopped.
  - Cloud Run replacement `-00001-pv7` → `-00002-t98`: GP-093…134. Digest `mirror.gcr.io/library/python@sha256:<PRIVATE_REF_04739>…b8b8`; old revision Retired.
  - Inventory: GP-075/079/078.
- **Mixed-union positive with VM reset (ELIGIBLE):** GP-115…122. Boot `cb88c367…` → `9ccfb2f9…`.
- **Standalone Cloud Run positive (ELIGIBLE, both gates):** `-00001-k9m` → `-00002-p7d`, GP-160…173, inventory GP-160/161/162.
- **Genuine negatives:**
  - suspend/resume (GP-109…115): provider status SUSPENDED and `lastStartTimestamp` updated, but the guest boot id is **unchanged**. Gives REJECTED, or UNVERIFIED when mislabelled as stop/start.
  - Traffic-only no-op (GP-104…107): same revision and instance. UNVERIFIED.
  - Transient inventory failure (GP-076, exit 1).
  - Stale empty inventories (GP-054/055).
  - Wrong location/zone listings (GP-127/128) and a regional listing (GP-080).
  - Anonymous requests refused, HTTP 403 (GP-068/165).

## 3. Offline verification (static checks R7)

- **H04: 113/113 as expected.** Covers genuine positives, every release negative class (missing/extra unit, wrong project/location/zone, stale/failed/skewed inventory, absent/partial restart, suspend/resume, unchanged managed identity, unbound storage, wrong audit, cross-log roles), and DERIVED one-fact fixtures copied from genuine captures. The DERIVED cases change: root filesystem UUID, provider disk id, boot-disk source, instance id, serving process, audit record, dependency IP, a late old-revision request, the image digest, an appended inventory stdout, an extra compute asset, producer skew, and a repeated exit field.
- **H05: the R6 offline suite re-runs 224/224 against R7.**
- **H07–H36:** CLI init/restart/check/report.
  - Mixed, reset and standalone runs are ELIGIBLE.
  - Suspend is REJECTED; no-op, unchanged boot, missing unit, unbound inventory and tamper-after-init are UNVERIFIED; `a5-check` is refused.
  - Lima regressions are unchanged.
  - No identifier or credential leaks.
  - All preserved manifests verify.

## 4. Script, registry and custody

| Field | Value |
|---|---|
| Script | `executor/adapter_record_stage/ma1_verify_r7.py`, SHA-256 `<PRIVATE_REF_04356>` |
| Profile registry | `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R7.json`, SHA-256 `<PRIVATE_REF_04083>` |
| GCP capture contract for arms | One dedicated wrapper entry per producer or action (exact argv, `--project` explicit, separate stdout/stderr, each field once). The guest capture vocabulary is written to the serial console once per boot, with the offset-bounded read after a reset. Probes use the authenticated `probe.py` line format. |

## 5. Coverage limits and remaining genuine-evidence gaps

- **C-1. Standalone GCE VM: no genuine standalone end-to-end positive.** VM Gate A is genuine (`raw_binding` true for the VM-only bundle). However, every genuine inventory captured while the VM existed also contained the Cloud Run service. The only standalone combination fails Gate B, correctly. All three VM attempts were used: stop/start, suspend/resume as a negative, and reset. The standalone-VM Gate B path is the same code as the union path.
- **C-2. Cloud Run identity relies on provider logging.** Cloud Run instance identity comes from Cloud Logging `labels.instanceId` plus the provider `Retired` condition. With min = max = 1 there was exactly one serving instance per revision. Multi-instance arms rely on the same log-based identity, which is untested here beyond one instance.
- **C-3. Dependency check is configuration evidence.** Mixed-union dependency classification uses provider configuration: VPC network interface, egress and template env referencing the VM IP. An arm that wires its backend another way (Serverless VPC connector, a load balancer, or DNS) would need a reviewed registry revision.
- **C-4. A logged argv is not proof of execution.** For GCE actions, provider audit records are now required as independent corroboration. For Cloud Run, the revision and conditions are provider records.
- **C-5. No managed database.** No managed database was exercised; the Cloud Run persistence object lived in GCS. Persistence of A5 objects remains the A5 post-check.
- **C-6. Residue.** The provider-managed serverless address is pending automatic release; see `TEARDOWN_RESIDUE_RECORD.md`.
- **C-7. Unregistered platforms fail closed.** That includes other clouds, other GCP compute types and the Lima variants.
- **C-8. Inherited.** `__pycache__` beside the fixtures; local logging config; Ubuntu signature; the cause of the first-start exit; no authentic lima Gate-B positive (RT-009).

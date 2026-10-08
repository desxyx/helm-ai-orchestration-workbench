# MA-1 Alerta Adapter Record — candidate R11 (MA-1.10): genuine supplemental GCP capture

[Status]: CANDIDATE R11 for independent cross-family VerifyOnly acceptance under the supplemental release. Not ratified; not a WF-8 release; no W2 T0.
[Release]: `MA1_GCP_SUPPLEMENTAL_CAPTURE_RELEASE_2026-10-04_r1.md`, SHA-256 `<PRIVATE_REF_02684>`; receipt AI-CICD-20261004-MA1-GCP-SUPP-EXEC-001.
[Policy]: AMD-A5-CR (`AMD_A5_CLOUD_RUN_EQUIVALENCE_2026-10-04.md`, SHA-256 `<PRIVATE_REF_02973>`). This is a full §6.4 replacement recorded in the ledger.
[Base]: R10 (`ma1_verify_r10.py` `<PRIVATE_REF_01893>…9b24`; its F1–F4 closure was confirmed by Reviewer Actor 02). R10 §1, R9 §1 and R8 §1 remain the base specification except where §1 below changes it. R1–R10 and all earlier raw captures are unchanged.

## 1. R11 changes (each derived from the genuine supplemental output)

1. **E3: AMD-A5-CR registered.** `GCP_RUN_QUIESCENCE_MECHANISM` names the amendment and its hash. The Run profile now accepts service/revision replacement when every recorded predicate holds:
   - the image digest and spec are unchanged except for the nonce (R8/R9);
   - the replacement revision is fresh, ready and active inside the action (R9);
   - the replaced revision is provider-Retired with its route removed (R8/R9/R10);
   - **(new) no revision other than the replaced and the replacement revision served within this service's lifetime** (log window from service creation);
   - a single untagged route sends all traffic to the replacement;
   - all observed old-revision work completed before the recovery probe (R10);
   - recovery with the original durable object preserved (R8 storage roles).

   Limit (stated in the amendment): this is an acceptance-policy exception. It does not claim a census of unobserved work or termination of physical instances.
2. **E1: registered direct VM probe.** `vm_probe.py` (SHA-256 `<PRIVATE_REF_05701>…d384`) runs `gcloud compute start-iap-tunnel <instance> 22` under the existing SDK identity, through IAM-enforced IAP TCP forwarding.
   - **Path.** The existing `default-allow-ssh` rule admits the IAP range on tcp:22. The task VM disables its own sshd and serves the test app on :22. No firewall rule, SSH key, login or external IP is involved.
   - **Argv binding.** The argv must name exactly this project, zone, instance and port 22, with a registered route.
   - **Response binding.** Every response carries `vm_instance_id`, which must equal the provider instance id, and `vm_boot_id`, which must equal the guest boot before the action (pre-action probes) or after it (post-action probes).
   - **Recovery and persistence.** The app is unavailable while stopped; health is ok on the new boot; the object written and read before the action reads back unchanged after it and is listed in the data path.
   - The R10 frontend-relay path is retained for compatibility but is not used for E1.
3. **E5: data path bound to the provider disk.** The guest capture adds `disk_byid=google-<deviceName>:<kernel disk>`.
   - **Disk.** The provider `disks[0].deviceName` must match it.
   - **Partition.** The `data_mount` source must be a partition of that kernel disk on the lsblk table.
   - **Path and filesystem.** As in R9: canonical declared path, `data_realpath`, block filesystem, root UUID.
   - **Finding.** The root filesystem UUID is image-derived: it is identical on the 2026-10-03 and 2026-10-04 VMs. So filesystem UUID alone does not identify a disk; this disk binding supplies that.
4. **E4: real revision asset name.** The unfiltered asset index names revisions `//run.googleapis.com/projects/P/locations/L/revisions/R`, with no service segment. R11 binds such a row to an inventoried service by the `<service>-` revision-name prefix. Unbound rows still fail closed.
5. **Unchanged.** All other predicates, including R10 F1–F4.

## 2. Genuine evidence (`evidence/gcp_profile_stage/executor/supplement_2026-10-04/`)

**Custody.** `SUPP_COMMAND_LOG.md` (GS-001–117) is frozen by `SHA256SUMS_SUPP_LIVE` (242 entries; SHA-256 `<PRIVATE_REF_02537>`). The residue log `SUPP_RESIDUE_LOG.md` (GS-118–121) is read-only. Workload `vm_startup_supp.sh` `<PRIVATE_REF_04351>…1569`; `run_app.py` `<PRIVATE_REF_05746>…8811` (byte-identical to the retained file).

| Phase / gap | Genuine bundle (roles → GS entries) | R11 result |
|---|---|---|
| **P1 standalone VM** (E1, E4, E5) | Inventory GS-021/022/023 (VM + disk only). Stop GS-024 → TERMINATED GS-025 → probe 000 GS-026 → start GS-027. Boot `123b7eba…` → `08766535…`; direct health GS-031; object `ma1supp-vmobj-p1-da3b32` written/read GS-019/020, read after GS-032; audit GS-033 | **ELIGIBLE**, both gates; completed 04:11:13Z |
| **P2 mixed** (E3, E4, E5, mixed) | Union inventory GS-055/056/057 (VM, disk, Run, revision, bucket, SA, serverless address). VM reset GS-058, boot → `f97a4277…`, both VM objects survive (GS-065/066). Run replacement 1 GS-059: `-00001-skm` → `-00002-vbm`, R0 Retired 04:20:32Z, route removed. GCS object `ma1supp-runobj-p2-fcb6d6` survives (GS-070, generation in GS-073). Private dependency: Direct VPC to <IP_ADDRESS_126>:22 | **ELIGIBLE**, both gates; completed 04:20:36Z |
| **P3 standalone Run** (E2, E3, E4) | Run-only inventory GS-091/092/093 (no VM or disk). Fresh standalone service `-00001-7gb`; replacement 2 GS-094 → `-00002-6ww`; R0 Retired 04:26:03Z. Object `ma1supp-runobj-p3-893d22` written by R0, read back by R1 (GS-088/089/099), with generation in GS-102. The phase-2 object also survives (GS-090/100) | **ELIGIBLE**, both gates; completed 04:26:04Z |

**Gap closure, as candidate claims for independent verification:**
- **E1 closed** by P1.
- **E2 closed** by P3, which has a real bucket (not `BUCKET=none`) and the bound probe program in its manifest.
- **E3 closed under AMD-A5-CR** by P2 and P3.
- **E4 closed:** contemporaneous unfiltered inventories in every phase, with the units known-present.
- **E5 closed:** `data_realpath`, `data_mount` and `disk_byid` before and after both VM restarts.

## 3. Checks (`static_checks_r11/`, N01–N08)

- **N04, 38/38 as expected:**
  - 3 genuine positives;
  - 7 genuine cross-phase negatives: missing, extra and foreign-uid units, stale after-action inventory, absent restart, and two partial restarts;
  - 25 DERIVED one-fact negatives, each with its targeted reason:
    - E1 ×6: foreign instance, old boot, other instance target, other program digest, available while stopped, changed object;
    - E5 ×4: other device, missing `disk_byid`, tmpfs, symlink;
    - E3 ×5: not retired, tagged old route, digest changed, another revision in the lifetime, old work after recovery;
    - origin port; retired revision uid absent; latency overflow;
    - E2 ×2: bucket changed, generation mismatch;
    - E4 ×3: WorkerPool, foreign revision asset, VM missing from the asset index;
    - producer ×2: filtered asset argv, unmanifested log;
  - 3 genuine CLI runs: init and a5-restart for P1–P3, all ELIGIBLE, exit 0, no traceback.
- **N05:** R6 suite on R11, 224/224.
- **N06:** R1–R7 manifests, R8–R10 pins, genuine LIVE/LIVE2 and runtime evidence all verify.
- **N07:** no credential-shaped value in the supplement (positive control included).
- **N08:** no `__pycache__`.
- **Not rerun, per the release:** the full R7–R10 historical suites. R10 F1–F4 behaviour is covered by the targeted cases above on the genuine base.

## 4. Script and registry

| Field | Value |
|---|---|
| Script | `executor/adapter_record_stage/ma1_verify_r11.py`, SHA-256 `<PRIVATE_REF_03709>` |
| Profile registry | `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R11.json`, SHA-256 `<PRIVATE_REF_01702>` |

## 5. Limits that remain

- **C-A, application vocabulary.** The registry covers the validation workload only: the VM app on :22, `run_app.py` routes, `VM_URL` and `BUCKET`. An Alerta arm needs a reviewed registry revision, and one identical script/profile must be frozen before W2A T0 (AMD-A5-CR prior-work effect).
- **E1 probe path.** The task VM's sshd is disabled and the app is served on :22 so that the existing firewall admits IAP. This is a test-VM choice and must not be generalized to Deployer VMs.
- **AMD-A5-CR.** An acceptance-policy exception (§1.1).
- **Topology.** Single-NIC, single boot disk, Direct VPC `private-ranges-only` egress (C-B).
- **Asset index.** Eventually consistent (C-D). The known-present controls passed in each phase, and a lag was observed right after teardown.
- **Custody.** Proves local custody, not provider attestation (C-E).
- **Residue.** One provider-managed serverless address, RESERVED, not deleted (teardown record).

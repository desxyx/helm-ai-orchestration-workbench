This is from Executor Actor 01.

# ADAPTER_RECORD_R11_SUPPLEMENT_SUBMISSION — genuine supplemental capture + R11 candidate

[Executor]: Executor Actor 01 (Anthropic Claude Opus 5.5, `claude-opus-5-5`; the same thread as R7–R10, continued after context compaction)
[Release]: `MA1_GCP_SUPPLEMENTAL_CAPTURE_RELEASE_2026-10-04_r1.md`, SHA-256 `<PRIVATE_REF_02684>`
[Policy]: AMD-A5-CR, SHA-256 `<PRIVATE_REF_02973>`, acknowledged (`supplement_2026-10-04/EXEC_ACK_SUPPLEMENT.md`)

## Candidate (exact)

| Artifact | SHA-256 |
|---|---|
| `executor/adapter_record_stage/ma1_verify_r11.py` | `<PRIVATE_REF_03709>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R11.md` | see `SHA256SUMS_ADAPTER_STAGE_R11` |
| `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R11.json` | `<PRIVATE_REF_01702>` |
| `evidence/gcp_profile_stage/executor/supplement_2026-10-04/SHA256SUMS_SUPP_LIVE` (genuine GS-001–117 plus support and workload, 242 entries) | `<PRIVATE_REF_02537>` |
| `evidence/gcp_profile_stage/executor/supplement_2026-10-04/SHA256SUMS_SUPP_STAGE` (ACK, teardown/residue/environment record, residue log GS-118–121) | see `SHA256SUMS_ADAPTER_STAGE_R11` |
| `evidence/adapter_record_stage/executor/static_checks_r11/` (N01–N08) | see `SHA256SUMS_ADAPTER_STAGE_R11` |

## Result

**Genuine positives (all three shapes), R11 ELIGIBLE on both gates:**

| Shape | Inventory (GS) | Action (GS) | Completed |
|---|---|---|---|
| **P1 standalone GCE VM** | 021–023 | stop/start, 024/027 | 04:11:13Z |
| **P2 mixed** | 055–057 | VM reset 058 + Run replacement 059 | 04:20:36Z |
| **P3 standalone Cloud Run** | 091–093 | replacement 094 | 04:26:04Z |

Also confirmed through the CLI (init + a5-restart, exit 0).

**E1–E5 are closed by genuine evidence** (Record §2), subject to independent verification.

**Checks:** 38/38 focused cases with targeted reasons (Record §3), and R6 224/224.

**Budget used:** VM restart cycles 2/2, Run replacement attempts 2/2. Cloud mutations ran 04:06:53Z–04:27:21Z of the 04:06:53Z–06:06:53Z window. No extension and no retry.

**Teardown:** all task-owned resources deleted and verified absent. One provider-managed serverless address remains (RESERVED, not deleted). `iap.googleapis.com` stays enabled. Details: `TEARDOWN_RESIDUE_ENVIRONMENT_RECORD.md`.

## Disclosures

- **E1 probe path.** The task VM's sshd is disabled and the test app is served on :22, because the existing `default-allow-ssh` rule is the only firewall rule that admits IAP. This avoided creating any network resource. It is a test-VM choice.
- **Phase 3 was a fresh deployment.** The phase-2 Run service was deleted and a standalone service deployed. This was declared in the ACK as provisioning, not as a replacement attempt.
- **Log corrections and noted polls.**
  - The GS-012 deadline note had empty fields because of a local `sed` failure; a correction note follows it in the log.
  - Out-of-wrapper read-only polls are noted in the log and not used as evidence. One faulty poll condition ran about 5 minutes too long.
- **Record fix before submission.** While writing the teardown record I had inserted a placeholder phase-2 Run uid. I replaced it with the real value from GS-043 before submission.
- **New-identity finding.** The root filesystem UUID is image-derived, so the disk binding uses `disk_byid`.

## Action Receipt Result (Executor)

- **[Receipt ID]:** AI-CICD-20261004-MA1-GCP-SUPP-EXEC-001
- **[Result]:** succeeded. The capture bundle and teardown are complete, and the candidate is submitted for independent acceptance. This is not a Reviewer PASS, ratification, WF-8 closure or W2 T0.
- **[Actual target]:** project `<CLOUD_PROJECT>`, `australia-southeast1`, zone `australia-southeast1-a`. Created and deleted:
  - VM `<MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm` with its disk;
  - bucket `<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX>` with 2 objects;
  - keyless SA `<MA1_SUPPLEMENT_RESOURCE_PREFIX>`;
  - Cloud Run `<MA1_SUPPLEMENT_RESOURCE_PREFIX>-run` (phase-2 and phase-3 deployments).

  `iap.googleapis.com` was enabled.
- **[Actual action]:**
  - read-only preflight GS-001–011;
  - phase 1: VM-only, stop/start;
  - phase 2: mixed, VM reset + Run replacement 1;
  - phase 3: Run-only, Run replacement 2;
  - task-owned teardown GS-107–109;
  - read-only residue checks GS-110–121;
  - offline R11 build and checks.
- **[Actual evidence locator]:** `evidence/gcp_profile_stage/executor/supplement_2026-10-04/` (`SUPP_COMMAND_LOG.md` + `SHA256SUMS_SUPP_LIVE` `<PRIVATE_REF_02537>…0ae1`; `SUPP_RESIDUE_LOG.md`; `TEARDOWN_RESIDUE_ENVIRONMENT_RECORD.md`; `SHA256SUMS_SUPP_STAGE`); `evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R11`.
- **[Reconciliation / anomaly]:**
  - **Receipt use:** consumed 1/1 at commencement, not re-consumed.
  - **Budget:** cloud mutations about 20.5 min of the 2 h window; VM 2/2; Run 2/2.
  - **Residue:** provider-managed address `serverless-ipv4-cloudrun-1791087542601726570` (RESERVED, from Direct VPC egress), not deleted.
  - **Environment:** IAP API left enabled.
  - **Log anomalies:** the corrected deadline note and the out-of-wrapper polls (disclosed above).

End from Executor Actor 01.

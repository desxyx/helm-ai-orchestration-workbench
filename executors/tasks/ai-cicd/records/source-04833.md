# TEARDOWN / RESIDUE / ENVIRONMENT RECORD — MA-1 GCP supplemental capture 2026-10-04

[Executor]: Executor Actor 01 · [Receipt]: AI-CICD-20261004-MA1-GCP-SUPP-EXEC-001 · [Project]: `<CLOUD_PROJECT>`, `australia-southeast1`, zone `australia-southeast1-a`

**Cloud window and budget.**
- **Window.** It opened at the first cloud mutation, GS-012 (IAP API enable), at 2026-10-04T04:06:53Z, with a deadline of 06:06:53Z. The last task mutation was the SA delete at GS-109, which ended at 04:27:21Z, so cloud mutations spanned 04:06:53Z–04:27:21Z (about 20.5 minutes). Read-only checks followed.
- **Budget.** VM restart cycles 2/2: stop/start at GS-024/027, reset at GS-058. Run replacement attempts 2/2: GS-059 and GS-094.

**Evidence.**
- `SUPP_COMMAND_LOG.md` (GS-001–117), frozen by `SHA256SUMS_SUPP_LIVE` (242 entries).
- `SUPP_RESIDUE_LOG.md` (GS-118–121, read-only).

## Task-owned resources: created and deleted

| Resource | Created | Deleted | Absence verified |
|---|---|---|---|
| VM `<MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm` (id 8253035096880999947; boot/data disk `<MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm`, deviceName `persistent-disk-0`, auto-delete) | GS-014 | GS-080 | GS-081/082, GS-110/111 `[]` |
| Bucket `<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX>` and its objects `ma1prof/ma1supp-runobj-p2-fcb6d6.json`, `ma1prof/ma1supp-runobj-p3-893d22.json` | GS-037/038; IAM GS-040 | GS-108 | GS-113 and GS-120 `[]` |
| Keyless SA `<MA1_SUPPLEMENT_RESOURCE_PREFIX>` (bucket-scoped `roles/storage.objectAdmin` only) | GS-039 | GS-109 | GS-114 `[]` |
| Cloud Run `<MA1_SUPPLEMENT_RESOURCE_PREFIX>-run`, phase 2 (uid <NATIVE_ID_3122>; revisions `-00001-skm`, `-00002-vbm`) | GS-041 | GS-079 | deleted before the planned phase-3 redeploy (GS-083) |
| Cloud Run `<MA1_SUPPLEMENT_RESOURCE_PREFIX>-run`, phase 3 (uid <NATIVE_ID_3134>; revisions `-00001-7gb`, `-00002-6ww`) | GS-083 | GS-107 | GS-112 and GS-119 `[]` |
| VM objects `ma1supp-vmobj-p1-da3b32`, `ma1supp-vmobj-p2-30e27c` (on the VM disk) | GS-019, GS-053 | deleted with the disk (GS-080) | — |

- **Known-present control.** The asset index listed every task resource while present (GS-023, GS-057, GS-093) and none after teardown (GS-121, 04:36Z). The immediate post-teardown index (GS-117, 04:27Z) still lagged, showing the deleted Run, bucket and SA rows.
- **Not created.** No Artifact Registry repository and no firewall rule or other network resource.

## Residue (provider-managed, not deleted)

- **What.** `compute.googleapis.com/Address` `serverless-ipv4-cloudrun-1791087542601726570`: internal <IP_ADDRESS_123>, purpose SERVERLESS, RESERVED.
- **Origin.** Cloud Run Direct VPC egress created it for the phase-2 service (asset createTime 04:19:02Z).
- **Current state.** Still RESERVED at GS-115 and GS-118 (04:36Z).
- **Why it was not deleted.** It is outside the authorized resource envelope and its lifecycle is managed by Cloud Run.
- **History.** The equivalent address from the 2026-10-03 bundle was released by the provider within about 1.5 h.
- **Not claimed.** This record makes no project-wide CLEAN claim.

## Environment changes left in place (for the future W2A reset)

- **IAP API.** `iap.googleapis.com` was enabled at GS-012 (before: GS-002; after: GS-013/GS-116). It was used solely for the authenticated task-VM probe and left enabled, per the release.
- **Unchanged.** No other API, network, firewall or project-IAM change. The pre-existing default VPC and firewall rules from 2026-10-03 remain as recorded then.
- **Logging.** Cloud Logging entries for the task resources remain under project retention.

## Local

- **No SDK change and no new login or key.** gcloud 582.0.0 was pinned per invocation.
- **No credential-shaped value in the supplement evidence** (static check N07, with a positive control).

## Notes recorded in the log

- **GS-012 deadline note.** A local `sed` pattern produced empty time fields; a correction note with the actual values follows immediately.
- **Out-of-wrapper read-only polls** (serial capture waits and asset-index readiness) are noted in the log and are not used as evidence. One faulty poll condition kept polling for about 5 minutes after the capture had already appeared.

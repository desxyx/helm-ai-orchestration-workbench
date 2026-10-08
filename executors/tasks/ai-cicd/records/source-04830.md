This is from Executor Actor 01.

# EXEC_ACK — MA-1 consolidated GCP supplemental capture (2026-10-04)

## Identity and binding

- **Identity.** Executor Actor 01, Anthropic Claude Opus 5.5 (`claude-opus-5-5`), bounded WriteExecute.
- **Session continuity.** This is the same Executor thread as R7–R10, continued after context compaction. It is not a fresh session; the release permits continuation.
- **Release.** `MA1_GCP_SUPPLEMENTAL_CAPTURE_RELEASE_2026-10-04_r1.md`, SHA-256 `<PRIVATE_REF_02684>`, verified.
- **Amendment notice received and acknowledged.** AMD-A5-CR, `AMD_A5_CLOUD_RUN_EQUIVALENCE_2026-10-04.md`, SHA-256 `<PRIVATE_REF_02973>`, is a full §6.4 replacement recorded in the ledger (Decision 2026-10-04T14:52:51+11:00).
  - The registered Cloud Run exception replaces the all-physical-instance quiescence obligation for this profile.
  - VM restart, the complete serving set, genuine provenance and unique-object persistence remain required.
  - R1–R10 and the raw captures stay unchanged; R10 is not retroactively PASS.
- **Receipt.** AI-CICD-20261004-MA1-GCP-SUPP-EXEC-001, signed by Human Operator and consumed 1/1 at 2026-10-04T14:58:17+11:00 (ledger).
  - Its role, target, action and stop point match this bundle.
  - It is valid until 2026-10-05T23:59:00+11:00; no revocation was found.
  - Not consumed again.
- **Retained pins verified.**

  | File | SHA-256 |
  |---|---|
  | `ma1_verify_r10.py` | `<PRIVATE_REF_01893>…9b24` |
  | `PROFILE_REGISTRY_R10.json` | `<PRIVATE_REF_01460>…ff13` |
  | `REVIEW_RETURN_GCP_PROFILE_R10.md` | `<PRIVATE_REF_00935>…25eb` |
  | R10 gap report | `27376766…2212` |
  | loadout | `<PRIVATE_REF_01965>…c5d` |

## Scope accepted

- **Target.** Project `<CLOUD_PROJECT>`, region `australia-southeast1`. **Zone chosen: `australia-southeast1-a`** (GS-010, UP).
- **Resources** (prefix `<MA1_SUPPLEMENT_RESOURCE_PREFIX>`, labels `task=<MA1_SUPPLEMENT_RESOURCE_PREFIX>,receipt=ai-cicd-20261004-ma1-gcp-supp-exec-001`):
  - VM `<MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm` with one boot/data disk;
  - Cloud Run `<MA1_SUPPLEMENT_RESOURCE_PREFIX>-run`;
  - bucket `<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX>`;
  - optional keyless SA `<MA1_SUPPLEMENT_RESOURCE_PREFIX>`.
  - No Artifact Registry repository is planned.
- **Bounds.**
  - At most 2 hours from the first cloud mutation, 2 VM restart cycles and 2 Run replacement attempts.
  - Resource-level IAM only.
  - No new login, key, project-wide grant, SSH-key metadata, anonymous endpoint, DNS, W2/Deployer/treatment/HC/W3 access or SDK change.
- **Writes.**
  - `executor/gcp_profile_stage/supp_2026-10-04/`;
  - `evidence/gcp_profile_stage/executor/supplement_2026-10-04/`;
  - the new versioned adapter script, Record and registry;
  - the shared loop state.

## Preflight (read-only, GS-001–011)

- **SDK.** gcloud 582.0.0 (`/opt/homebrew/share/google-cloud-sdk/bin`), run with `CLOUDSDK_PYTHON=/opt/homebrew/bin/python3.14`, config `watchover-personal`.
- **Identity.** The existing identity holds `roles/owner` on the project (GS-003), which covers the IAP tunnel permission. No IAM change is needed.
- **APIs.** Already enabled: compute, run, storage, logging, cloudasset, artifactregistry. **`iap.googleapis.com` is not enabled.** Enabling it is the only planned API mutation, used solely for the authenticated task-VM probe; it is the first cloud mutation and starts the 2-hour window.
- **Standalone-VM probe path (E1).** IAP TCP forwarding: `support/vm_probe.py` runs `gcloud compute start-iap-tunnel` with the existing identity.
  - **Firewall.** The project's existing `default-allow-ssh` (0.0.0.0/0, tcp:22; GS-004) already admits the IAP range on tcp:22, so **no firewall rule or other network resource is created.**
  - **App placement.** The task VM therefore disables its own sshd and serves the test app on :22.
  - **What this path does not use.** No SSH keys, OS Login, guest login or external IP.
  - **VM binding.** Every response carries the metadata-server instance id and the kernel boot id. A Cloud Run relay is not used for E1.
- **Collisions.** No existing instances, Run services, buckets or service accounts (GS-005–008). The baseline unfiltered inventory has no compute (GS-009).
- **Image.** `debian-12-bookworm-v20260921` (GS-011), the same image used on 2026-10-03.
- **Run replacement action.** Frozen unchanged: `gcloud run services update <svc> --image=<replaced revision's digest> --update-env-vars=MA1_REPLACEMENT_NONCE=<nonce> --format=json`. Image `mirror.gcr.io/library/python@sha256:<PRIVATE_REF_04739>…be8b8` (retained).
- **Phase 3 plan.** The phase-2 service is deleted with the VM, and a fresh Run-only service (no VPC egress) is deployed. This is provisioning, not a replacement attempt, and is declared now. Its R0 writes a new durable object; the phase-2 object stays in the retained bucket and is read again.

## Source and probe pins (before mutation)

| File | SHA-256 |
|---|---|
| `executor/gcp_profile_stage/supp_2026-10-04/vm_startup_supp.sh` | `<PRIVATE_REF_04351>` |
| `executor/gcp_profile_stage/supp_2026-10-04/run_app.py` (byte-identical to the retained `run_app.py`) | `<PRIVATE_REF_05746>` |
| `support/vm_probe.py` (new direct IAP probe) | `<PRIVATE_REF_05701>` |
| `support/probe.py` (byte-identical to the retained Run probe) | `<PRIVATE_REF_04994>` |
| `support/gs.sh` (wrapper) | `<PRIVATE_REF_04257>` |
| `support/redact_gs.pl` (= retained `redact_gp2.pl`) | `<PRIVATE_REF_05354>` |

Proceeding without per-phase approval. Coordination runs through `GCP_PROFILE_LOOP_STATE.md`; the final result, or a precise blocker, goes to Operations Coordinator.

End from Executor Actor 01.

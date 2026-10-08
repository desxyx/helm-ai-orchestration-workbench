# TEARDOWN_RESIDUE_RECORD — MA-1 genuine GCP profile validation

[Executor]: Executor Actor 01 · [Receipt]: AI-CICD-20261002-MA1-GCP-PROFILE-EXEC-001 · [Project]: `<CLOUD_PROJECT>`
[Runtime window]: started 2026-10-03T06:50:59Z (GP-047, the first project mutation: API enablement). Last task resource deleted 07:17:2xZ (GP-175). No provisioning or replacement after that. All attempts consumed: VM 3/3, Cloud Run 3/3.
[Evidence]: `GCP_COMMAND_LOG.md` (GP-001–155, frozen; `SHA256SUMS_GCP_LIVE`), `GCP_COMMAND_LOG_2.md` (GP-156–182, frozen; `SHA256SUMS_GCP_LIVE2`), `GCP_RESIDUE_LOG.md` (GP-183+, read-only re-checks).

## Task-owned resources: created and deleted

| Resource | Created | Deleted | Evidence |
|---|---|---|---|
| bucket `<CLOUD_PROJECT>-<MA1_PROFILE_RESOURCE_PREFIX>` (+ object `ma1prof/ma1prof-runobj-5d4b9c.json`, gen 1791010473337836) | GP-057/058, IAM GP-060 | GP-138 (object and bucket) | GP-147 `[]` |
| keyless SA `<MA1_PROFILE_RESOURCE_PREFIX>` (bucket-scoped `roles/storage.objectAdmin` only) | GP-059 | GP-139 | GP-148 `[]`; GP-154 has no project IAM binding containing `ma1-prof` |
| VM `<MA1_PROFILE_RESOURCE_PREFIX>-vm` (id 9005786793348241571; boot disk `<MA1_PROFILE_RESOURCE_PREFIX>-vm` id 6907983805155186851, auto-delete) | GP-061 | GP-137 | GP-140/141 `[]`; snapshots and images `[]` (GP-142/143) |
| Cloud Run `<MA1_PROFILE_RESOURCE_PREFIX>-run`, segment 1 (revisions `-00001-pv7`, `-00002-t98`) | GP-062 | GP-136 | GP-144/145/146 `[]` |
| keyless SA `<MA1_PROFILE_RESOURCE_PREFIX>`, recreated for segment 2 (no IAM grants) | GP-158 | GP-175 | GP-180 `[]` |
| Cloud Run `<MA1_PROFILE_RESOURCE_PREFIX>-run`, segment 2 (`-00001-k9m`, `-00002-p7d`; no VPC egress) | GP-159 | GP-174 | GP-178 `[]` |
| Artifact Registry repository | not created | — | GP-149/182 `[]` |

Every create and delete was a dedicated exact-argv entry on `--project=<CLOUD_PROJECT>`. GCE audit records corroborate the VM insert, stop, start, suspend, resume and reset calls (GP-135).

## Residue still present (provider-managed, not deleted by the Executor)

- **What it is.** `compute.googleapis.com/Address` `serverless-ipv4-cloudrun-1791010435540004708` (internal <IP_ADDRESS_123>/28, `purpose: SERVERLESS`, `status: RESERVED`, no users). Cloud Run Direct VPC egress created it at 06:53:58Z for the segment-1 service; that service was deleted at 07:05:30Z.
- **Observations.** RESERVED at GP-155 (07:08Z), GP-181 (07:17Z), GP-183 (07:22Z) and GP-184 (07:27Z). Cloud Asset shows it as the only non-default compute object (GP-185).
- **Why it was not deleted.** It is not in the authorized resource envelope (VM/disk, Cloud Run service, bucket, repository, SA), and Cloud Run manages its lifecycle. The Executor did not delete it.
- **Plan.** Read-only re-checks continue in `GCP_RESIDUE_LOG.md` until the window closes at 10:50:59Z.
- **If it persists past the window.** It becomes a precise cleanup question for Operations Coordinator/Human Operator: may the Executor delete this provider-managed address, or will the W2A reset handle it?

## Environment changes left in place (record for the future W2A reset; not reverted)

- **APIs enabled by GP-047:** `compute.googleapis.com` and `run.googleapis.com`.
- **APIs Google auto-enabled as dependencies:** `artifactregistry.googleapis.com`, `containerregistry.googleapis.com`, `pubsub.googleapis.com`.
- **Before vs after:** the before list is GP-031 (26 services) and the after list is GP-151 (31 services).
- **Why they stay on.** The release says not to disable existing or shared APIs at teardown.
- **Auto-created network objects:** the VPC network `default` (auto subnets, including australia-southeast1 `default` <IP_ADDRESS_021>/20); firewall rules `default-allow-icmp`, `default-allow-internal` (<IP_ADDRESS_004>/9), `default-allow-rdp` and `default-allow-ssh` (0.0.0.0/0, tcp:22); and the auto routes and subnets (GP-049/050/051, GP-152/153). These were created by the platform on Compute API enablement, not by a task command. No task VM had an external IP.
- **Cloud Logging entries** for the task resources, Cloud Run requests and GCE audit remain under the project's retention policy.
- **Local tooling:** the gcloud configuration is unchanged; the interpreter was pinned per invocation via environment variables only. No SDK install or upgrade, no new login, no key generated.

No credential value appears in any evidence file. H32 (static checks R7) checks this, using a positive control.

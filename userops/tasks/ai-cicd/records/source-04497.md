# MA-1 genuine GCP profile validation — joint task and proposed action receipts

[Artifact Class]: PROPOSED_DISPATCH
[Status]: Concrete scope ready for Human Operator signature; NOT RELEASED, no cloud or credential action yet
[Prepared by]: OPERATIONS_COORDINATOR_Codex
[Executor]: Executor Actor 01 — bounded WriteExecute
[Reviewer]: Reviewer Actor 02 — independent cross-model-family VerifyOnly
[Basis]: AMD-MA13-R1; Human Operator selected genuine GCP validation before formal W2; accepted R6 static closure

## Goal and final acceptance

Produce genuine GCP raw evidence and a reviewed adapter revision supporting standalone GCE VM, Cloud Run and their mixed union. The same adapter bytes and frozen profiles must be usable across W2 arms while retaining the Deployer's architecture choice. Executor and Reviewer run a standing repair/review loop, then return one final candidate plus independent PASS to Operations Coordinator. Do not reopen R6's closed static scope unless a direct regression is demonstrated.

The core genuine controls are authoritative complete serving inventory; exact dedicated producer/argv and exclusive stdout; a real VM stop/start or reset; a real managed-instance replacement; required identity, application recovery and persistent-storage evidence; and meaningful negatives made from genuine captures. Synthetic fixtures supplement these captures and do not replace them. If a Cloud Run mechanism cannot establish replacement of every serving instance or an equivalent provider-authoritative zero-serving state, report that precise factual blocker instead of registering a fictitious passing profile.

## Exact proposed target and resource envelope

- Project: `<CLOUD_PROJECT>`, the WatchOver W1 sandbox identified in the task records. Before action, verify the live project and authorized test identity; force this project explicitly on every material GCP invocation. Do not switch to a different project.
- Location: `australia-southeast1`; GCE zone may be one of its a/b/c zones, recorded before provisioning.
- Names: prefix `<MA1_PROFILE_RESOURCE_PREFIX>`; attach the task/receipt label where the provider supports labels. Never adopt a same-name pre-existing resource without verified ownership from this task; collision is a scope blocker.
- Maximum concurrent resources: one VM named `<MA1_PROFILE_RESOURCE_PREFIX>-vm` with its one boot/persistent disk; one Cloud Run service named `<MA1_PROFILE_RESOURCE_PREFIX>-run`; at most one support bucket named `<CLOUD_PROJECT>-<MA1_PROFILE_RESOURCE_PREFIX>`, one Artifact Registry repository named `<MA1_PROFILE_RESOURCE_PREFIX>`, and one keyless service account named `<MA1_PROFILE_RESOURCE_PREFIX>` if genuinely needed by the minimal test workload. The support resources are optional, not a requirement to create them all.
- Test workload: minimal non-Alerta workload and a non-secret unique persistence object. Executor chooses the smallest implementation capable of testing the evidence handlers. No W2 Deployer workspace, treatment, W2C/package or HC material.
- Actions: provision only this resource set; capture raw inventory/identity/provenance; perform at most three genuine VM restart cycles and three Cloud Run replacement attempts during the task; verify recovery and persistence; make versioned adapter/profile revisions; delete the task-owned test resources and inspect residue. Offline in-scope repair/review iterations need no new release.
- Runtime window: at most four hours from the first resource creation; then stop further provisioning/replacement and complete teardown. If review still needs work, preserve captures and continue offline. A new real-resource window requires a new bounded release.
- API prerequisites: may enable only Compute Engine, Cloud Run, Cloud Storage, Cloud Logging, Artifact Registry, Cloud Build and Cloud Asset Inventory APIs if absent and necessary. Record before/after API state; do not disable existing/shared APIs at teardown.
- Identity/IAM: use the already authorized WatchOver test identity and existing SDK authentication; no personal/production project actions, new interactive login, private keys or service-account key generation. IAM changes may apply only to the newly created bucket, repository, service and temporary keyless service account; no project-wide role grants. Missing broader permissions are an exact scope blocker.
- Endpoint boundary: no custom public DNS publication and no anonymous public endpoint. Use an authenticated provider endpoint or other safe task-local path; never print tokens, cookies, private keys or database connection secrets. Do not add SSH keys to project metadata or log into a Deployer resource.
- Billing is outside the project team's task; no cost ceiling, estimate or billing-analysis gate.

## Work and evidence boundary

Workspace: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`.
Executor may write `executor/gcp_profile_stage/`, `evidence/gcp_profile_stage/executor/`, and new versioned adapter script/Record/evidence under the existing adapter-stage roots. Reviewer writes `evidence/gcp_profile_stage/reviewer/` and its own temporary state. Both may update only the non-governance handoff file `evidence/gcp_profile_stage/GCP_PROFILE_LOOP_STATE.md`.

Pin the existing gcloud SDK executable/version and capture tool identity before material commands; no host-wide SDK/package installation or automatic upgrade. Consult provider documentation and genuine output for the concrete commands and schemas. Do not copy Council's proposed table headers or invent JSON paths. Use one dedicated producer per capture, exact argv, UTC start/end, exit, separate stdout/stderr and manifest hashes; redact credential values before evidence finalization. Record resolved image digests and workload versions before restart/replacement.

Inventory must include all project compute resources and classify each through provider records plus frontend/backend or private dependency evidence. Restart only the task's serving compute, never unrelated project resources or provider-managed data. A self-managed database VM is serving compute; managed datastore is persistence. Keep compute identity separate from data identity. Root-disk continuity alone does not prove the database path; disclose gaps and resolve material contradictions without redefining frozen A5 behavior.

Required controls include a known-present inventory target; supported genuine positive controls; missing/extra unit, wrong project/location, stale inventory, absent/partial restart or replacement, unchanged managed identity, and changed/unbound storage contradiction cases; retained R6 producer deception/cardinality negatives; and mixed-union coverage using the same two resources. Freeze one genuinely validated Cloud Run action/evidence mechanism; runtime alternatives are not an arm-specific choice. Unregistered platforms remain fail-closed and coverage limits are reported explicitly.

## Joint loop and stop point

Executor owns provisioning, capture, implementation, operational repair and cleanup. Reviewer owns independent raw-first evidence/custody checks and meaningful adversarial verification. Reviewer may make read-only provider inventory/describe/log queries within the same target envelope to check genuine evidence; it may not mutate cloud resources or Executor artifacts.

Use the shared state to transfer `NEXT=EXECUTOR|REVIEWER|DONE|BLOCKED`, immutable locators/hashes and finite findings. TARGETED_REWORK returns directly to Executor under this standing scope. No new Operations Coordinator release is needed for in-scope code/evidence repairs or authorized attempts within the remaining runtime bounds. Bring only actual permission/scope conflicts, exhausted runtime bounds or physical inability to produce required evidence to Operations Coordinator/Human Operator.

For final PASS: produce a versioned script, candidate Record, profile registry, genuine raw outputs, exact producer log, fixtures, all manifests, operational receipt evidence and teardown/residual record. Reviewer independently confirms the exact hashed candidate and evidence. Record leftover API/environment changes for the future W2A reset, not as a claim that W2 is already CLEAN. Return final submission plus PASS to Operations Coordinator. Human Operator ratification of the exact Adapter Record and other WF-8 entry gates remain subsequent controls.

## Proposed receipts — unsigned until Human Operator approves this exact scope

### Executor action receipt proposal

[Receipt ID]: AI-CICD-20261002-MA1-GCP-PROFILE-EXEC-001
[Actor/Lane]: Executor Actor 01 / delegated Execute / WriteExecute
[Target]: Project `<CLOUD_PROJECT>`; exact task-owned resource set, names, location and optional prerequisites above
[Action]: One outcome-bounded genuine GCP profile-validation bundle, within the four-hour resource window and three-attempt-per-profile limits, including authorized authentication, provision/capture/restart/replace and task-owned teardown
[Mutation class]: Test cloud provisioning/reconfiguration/deletion; bounded test-identity use; task-resource IAM only
[Allowed count]: 1 validation bundle
[Stop point]: Independent candidate submission and cleanup evidence, or a precise blocker with safe task-owned teardown; no W2 T0
[Valid until]: 2026-10-05T23:59:00+10:00
[Source authorization]: Pending exact-scope Human Operator decision, in addition to recorded AMD-MA13-R1 and Human Operator's genuine-GCP-path choice
[Signed by]: PENDING Human Operator SIGNATURE — this is not a valid receipt yet

### Reviewer action receipt proposal

[Receipt ID]: AI-CICD-20261002-MA1-GCP-PROFILE-REVIEW-001
[Actor/Lane]: Reviewer Actor 02 / independent VerifyOnly
[Target]: Same project and task-owned resource/evidence set; project-wide metadata inventory solely for completeness classification
[Action]: One independent review bundle with authorized test-identity use for read-only provider inventory/describe/log queries, offline evidence/fixture checks and iterative finite review returns; no cloud mutation
[Mutation class]: Bounded test-identity use; read-only cloud verification
[Allowed count]: 1 independent review bundle
[Stop point]: Final independent PASS or a precise genuine-evidence/scope blocker; no W2 T0 or ratification
[Valid until]: 2026-10-05T23:59:00+10:00
[Source authorization]: Pending exact-scope Human Operator decision
[Signed by]: PENDING Human Operator SIGNATURE — this is not a valid receipt yet

After Human Operator approves, Operations Coordinator records signed receipts and the scoped decision, checks/records their consumption before the execution-chain release, then issues one released joint instruction to both roles. This draft does not authorize action.

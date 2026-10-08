# MA-1 — one consolidated genuine GCP supplemental capture

[Artifact Class]: PROPOSED_DISPATCH
[Status]: Ready for Human Operator signature; NOT RELEASED; both receipts below are unsigned
[Prepared by]: Operations Coordinator
[Executor]: Executor Actor 01 / Anthropic Claude / bounded WriteExecute
[Reviewer]: Reviewer Actor 02 / OpenAI Codex / independent cross-model-family VerifyOnly
[Workspace]: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`
[Basis]: AMD-MA13-R1; recorded AMD-A5-CR; R10 F1–F4 closure and E1–E5 return

Retained R10 pins (relative to the MA-1 workspace): `executor/adapter_record_stage/ma1_verify_r10.py`, SHA-256 `<PRIVATE_REF_01893>`; `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R10.json`, SHA-256 `<PRIVATE_REF_01460>`; `evidence/gcp_profile_stage/reviewer/r10/REVIEW_RETURN_GCP_PROFILE_R10.md`, SHA-256 `<PRIVATE_REF_00935>`; sibling gap report SHA-256 `<PRIVATE_REF_01206>`. Confirm pins at entry; use bounded current-version custody checks.

## Goal

Close the R10 genuine evidence gaps with one real capture bundle for standalone GCE VM, mixed GCE/Cloud Run and standalone Cloud Run. Make one versioned evidence-bound adapter/registry/Record update, independently review it, and return the exact candidate/PASS pair plus cleanup evidence. R10's closed technical list remains closed. No general toolkit, new platform or formal W2 arm is being built here.

Before work, read `AMD_A5_CLOUD_RUN_EQUIVALENCE_2026-10-04.md` and its full ledger replacement. Do not use the original all-physical-instance quiescence obligation for the registered Cloud Run exception. Missing genuine evidence or observed contradictions still refuse PASS.

## Exact target, resources and allowance

- Project: `<CLOUD_PROJECT>`; region: `australia-southeast1`; choose and record one GCE a/b/c zone there before mutation. Force the project on every material provider invocation.
- Prefix: `<MA1_SUPPLEMENT_RESOURCE_PREFIX>`; task resource/receipt labels where supported. Confirm name ownership/collision before creating; do not adopt another run's resources.
- Maximum concurrent resources: VM `<MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm` plus its one persistent boot/data disk; Cloud Run service `<MA1_SUPPLEMENT_RESOURCE_PREFIX>-run`; bucket `<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX>`. At most one optional task-owned keyless SA `<MA1_SUPPLEMENT_RESOURCE_PREFIX>` and one optional Artifact Registry repository `<MA1_SUPPLEMENT_RESOURCE_PREFIX>` if necessary. No other compute or storage resources.
- Minimal non-Alerta workload, non-secret unique durable test objects. Reuse retained support code where suitable. Do not read blue Deployer/Observer workspaces, treatment, W2C/HC/package or sealed W3 material.
- One bundle; at most two hours from the first cloud mutation, including API enablement if required. At most two VM restart cycles and two Cloud Run replacement attempts. No automatic extension or additional live retry. Stop provisioning/replacement at the bound; authorized task-owned cleanup remains obligatory and is not a new experiment attempt.
- Existing authorized WatchOver test identity and SDK authentication only. No new interactive login, private keys, service-account keys or project-wide IAM grants. Resource-level IAM only on this bundle's newly created bucket/service/repository/keyless SA. Insufficient permission is a precise blocker.
- Only necessary prerequisite APIs from Compute, Run, Storage, Logging, Artifact Registry, Cloud Build, Cloud Asset and IAP may be enabled; IAP is solely for the authenticated task-VM probe if that already-permitted path is chosen. Record before/after state; do not disable shared APIs during cleanup. No unrelated prerequisite provisioning or SDK upgrade.
- No custom public DNS, anonymous public endpoint, public VM management port, SSH-key metadata mutation or Deployer guest login. Use a safe authenticated path to this test VM and authenticated Cloud Run. Tokens, identifiers/passwords and connection secrets never enter finalized evidence or command arguments.
- Billing is outside the project team's task.

## Preflight and three genuine phases

Executor confirms, before the first cloud mutation, the expected authenticated standalone-VM probe path and permission reachability, SDK executable/version, source workload and probe program hashes, and the exact single Cloud Run replacement action. Consult official documentation for candidate commands; do not freeze guessed fields as proven. VM probe must be independently VM-bound; a Cloud Run relay cannot discharge E1. No per-phase Human Operator approval is needed once the final release is signed. Missing required access or unreachable provider predicates stops the task without widening IAM or inventing a passing mechanism.

| Phase | Genuine resources and action | Gaps addressed |
|---|---|---|
| 1 | VM only, local persistent test object, direct authenticated probe, before/after full inventory, VM restart cycle 1 | E1, E4, E5 |
| 2 | Add Run and durable bucket; capture the actual mixed union; VM restart cycle 2 plus Run replacement attempt 1; confirm both objects recover | E3, E4, E5 and mixed coverage |
| 3 | Remove task VM/disk; retain bucket and Run object; capture actual Run-only inventory; Run replacement attempt 2; confirm the same object survives | E2, E3, E4 |

Each phase has its own genuinely captured before/after unit set. Do not synthesize a standalone inventory from a mixed capture or merge historical phases into a purported simultaneous union. If a phase cannot succeed within the allowance, preserve it as a truthful failed/unverified control and return its blocker.

## Fixed evidence and acceptance

- **E1:** standalone VM genuine positive, direct authenticated endpoint/producer binding, provider identity and successful restart, recovery and persistence. Exact probe program is retained and hashed.
- **E2:** standalone Run uses the retained durable bucket/store across replacement, with bound probe program and unchanged storage/application binding. `BUCKET=none` cannot supply this positive.
- **E3:** implement and capture all predicates of recorded AMD-A5-CR; one genuinely demonstrated action, immutable application image/code, provider retirement of previously serving revisions, no old traffic/tag routes, new ready identity and complete routing, observed old-work completion before recovery, application recovery and durable object. No timeout/ingestion assumption or unobserved-work census claim.
- **E4:** genuine unfiltered project-wide inventory while units are present in each phase; known-present control; provider sources plus task application/dependency classification. Restart only this task's serving compute. Unrelated resources are recorded, never mutated; unresolved classification is UNVERIFIED. Teardown-only empty inventory is not the while-present positive.
- **E5:** exact resolved VM data path, mount/device/storage binding before/after restart, captured through task-owned instrumentation with no secret capture or SSH-key mutation. Root-disk identity alone cannot substitute for that claimed binding. This closes the profile evidence gap and does not independently add a new A5 object-behavior requirement.
- Exact dedicated executable/argv, SDK/version, UTC start/end, exit code, exclusive stdout and separate stderr, raw locators/hashes, versioned registry schema from real output, manifest and source/probe/image pins. Inspect raw evidence before narratives. Genuine captures remain immutable; derived mutations are explicitly labelled.
- Reuse the accepted R6/R10 controls and run affected regressions plus focused missing/extra/stale inventory, absent/partial restart, changed storage, wrong producer/origin and old-route/identity negatives. Do not enumerate every historical tree or rerun all unrelated suites by default. Expand only for a demonstrated direct false acceptance or material contradiction against these fixed predicates.
- New cloud gaps or unreachable conditions return to Operations Coordinator as a precise blocker. Never manufacture a PASS or reopen speculative offline hardening to approximate missing real evidence.

## Writes, independence, handoff and cleanup

Executor writes new `executor/gcp_profile_stage/` support and `evidence/gcp_profile_stage/executor/supplement_2026-10-04/` captures plus new versioned adapter-stage script/Record/registry. Reviewer writes only its new `evidence/gcp_profile_stage/reviewer/supplement_2026-10-04/` and private temporary state. Both can update the non-governance `evidence/gcp_profile_stage/GCP_PROFILE_LOOP_STATE.md`. Original R1–R10, raw and review artifacts are immutable. Neither actor edits HELM governance or ledger.

Use existing role-scoped Charter and the tooling/skill selections from `SKILL_MCP_LOADOUT_GCP_PROFILE_2026-10-03_r1.md` (SHA-256 `<PRIVATE_REF_01965>`). This supplemental release governs new action bounds; the old release supplies history only. No new MCP or installation is required. Executor Actor 01 may continue its existing thread. The genuinely fresh cross-family Reviewer Actor 02 session that performed R7–R10 may continue this same profile task; do not route to the old non-fresh or contaminated blue sessions. Declare actual model identity, session continuity and Council-family limitations accurately.

After a signed final release, acknowledge scope and receipts, perform preflight, then coordinate directly via NEXT and immutable returns. An entry ACK does not require another approval. Within this standing scope, finite material corrections pass directly between the pair until final acceptance or an actual blocker; do not request a new Operations Coordinator dispatch each round.

Delete only this bundle's owned resources and object, verify residual inventory with a known-present control, preserve API/network environment changes for reset and report provider-managed residue without asserting a current project-wide CLEAN state. No broad project cleanup or disabling shared APIs. If a cleanup obligation remains at expiry, only the already-authorized task-owned safe teardown continues; report any ownership/permission conflict.

Final output: exact hashed candidate script/Record/registry, version-local manifests and genuine positives for all three shapes; meaningful negatives; independent bounded PASS; teardown/residue/environment record; each actor's complete six-field Action Receipt Result. Full-scope PASS requires all three genuine positives; partial success is disclosed and cannot close WF-8. Final ratification and remaining W2 gates stay with Human Operator.

## Proposed receipts — NOT signed or consumed

### Executor

[Receipt ID]: AI-CICD-20261004-MA1-GCP-SUPP-EXEC-001
[Actor/Lane]: Executor Actor 01 / delegated Execute / WriteExecute
[Target]: Project `<CLOUD_PROJECT>`; exact `<MA1_SUPPLEMENT_RESOURCE_PREFIX>` resources and prerequisite/location envelope above
[Action]: One consolidated genuine supplemental capture bundle, at most two hours from first cloud mutation, two VM cycles and two Run replacement attempts; task-owned provisioning, evidence/profile repair and cleanup
[Mutation class]: Test cloud provisioning/reconfiguration/deletion; bounded existing test-identity use; task-resource IAM only
[Allowed count]: 1 supplemental capture bundle
[Stop point]: Exact candidate plus cleanup for independent acceptance, or precise blocker with safe task-owned teardown; no W2 T0
[Valid until]: 2026-10-05T23:59:00+11:00
[Source authorization]: Pending explicit Human Operator approval/signature of this exact proposed dispatch; no operative cloud authorization yet
[Signed by]: UNSIGNED

### Reviewer

[Receipt ID]: AI-CICD-20261004-MA1-GCP-SUPP-REVIEW-001
[Actor/Lane]: Reviewer Actor 02 / independent VerifyOnly
[Target]: Same project, supplemental resource/evidence envelope and exact new candidate; project-wide read-only metadata solely for completeness classification
[Action]: One independent bounded review of supplemental genuine evidence and amended profile, with existing-identity read-only provider queries and affected offline tests; no cloud mutation
[Mutation class]: Bounded existing test-identity use; read-only cloud verification
[Allowed count]: 1 independent supplemental review bundle
[Stop point]: Exact independent final PASS or precise genuine-evidence/scope blocker; no ratification or W2 T0
[Valid until]: 2026-10-05T23:59:00+11:00
[Source authorization]: Pending explicit Human Operator approval/signature of this exact proposed dispatch; no operative cloud authorization yet
[Signed by]: UNSIGNED

After signature, Operations Coordinator records the Owner decision and both receipts, publishes one immutable final release and routes it to both roles. Each receipt's seven-field consumption is recorded once after validity checking and before the first action of that new bundle. Old receipts and consumption counts do not transfer. Actual actions and verdicts are never backdated.

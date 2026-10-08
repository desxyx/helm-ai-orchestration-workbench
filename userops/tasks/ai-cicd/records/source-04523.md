# R10 — consolidated evidence decision proposal

[Artifact Class]: PROPOSAL
[Status]: DRAFT; requires Human Operator decision; no amendment or cloud release is effective
[Author]: Operations Coordinator, control-plane synthesis; no Executor/Reviewer verdict issued here
[Task]: AI_CICD / MA-1 / GCP_PROFILE_VALIDATION

## What happened before this decision

There are two different Deployer episodes. Neither should be conflated with the later Executor test resources.

### 1. First completed experiment: W1, 2026-09-28

The bare Deployer deployed the pinned RealWorld Angular frontend and Django backend to one GCE VM in `us-west1-b`. Docker Compose ran the frontend, Gunicorn backend, PostgreSQL and Caddy; PostgreSQL used a persistent disk-backed volume. The Deployer configured deployment files and requested resource approval; Human Operator supplied the DNS record. The site was delivered over public HTTPS.

Independent acceptance checked the API suite, browser signup/login and frontend/backend routing. The control channel reset the serving VM; Human Operator logged back in and confirmed the previously created article remained. A1–A7 were reported PASS, followed by task cleanup. About 65 minutes is time to the deployment terminal declaration, not the unmeasurable M9 acceptance time.

W1 was accepted as a discovery baseline with known limitations: forced interruption did not occur; some timing measurements were missing; the sealed secret-leakage metric remained UNVERIFIED. It used another workload and is not a quantitative comparator for W2.

Sources:
- `../../../../executors/tasks/ai-cicd/records/source-04923.md`
- `../../../../executors/tasks/ai-cicd/records/source-00168.md`
- Sibling `RUN_W1_ACCEPTANCE_EVIDENCE.md`
- `../../../../executors/tasks/ai-cicd/records/source-00153.md`

### 2. Work built after W1

WatchOver v0.1a was built as a local shared-state/event workbench with a read-only view. Its intended value is understandable state, evidence and handoff. This product implementation is separate from the measurement verifier below.

For W2's different workload, Alerta, the Execution pair built minimum API/browser fixtures and tested them with real local Lima VM controls. Positive controls, an injected API defect, browser auth checks and persistence/absence controls were independently supported. Local MA-1 controls were recorded VALIDATED on 2026-10-02, with the retained INC-1 uncertainty explicitly bounded. This did not validate a GCP profile.

### 3. R1–R6: repair the Alerta acceptance instrument

The Executor made a single arm-neutral verifier; the Reviewer exposed false-acceptance routes in submitted evidence. Repairs bound restart claims to raw facts, required exact complete process sets and typed storage identities, and bound provider inventory to a dedicated producer command and exclusive output. Further repairs rejected deceptive shell text and duplicate command-log fields hiding earlier commands/outputs. These are verifier defects, not evidence that the W1 deployment failed or that the attacks happened live.

R6 independently passed the static producer-provenance slice. Its registered platform was Lima only; retained RT-009 was correctly rejected under the stricter producer rule. Genuine GCP validation therefore remained necessary.

Sources: `execution/ma1_council_reentry/MA1_RUNTIME_VALIDATION_CLOSURE_2026-10-02.md` and `MA1_STATIC_PROVENANCE_R6_CLOSURE_2026-10-02.md` under the HELM task root.

### 4. Held blue Deployer preparation, 2026-10-03

The newer blue Codex Deployer prepared Alerta locally: pinned source, deployment configuration, API signup/login, browser signup/fresh login and data recovery after local API/database restart. It proposed a GCE deployment but did not receive cloud-creation or formal W2 entry approval. Its README explicitly leaves public HTTPS, actual cloud VM restart and IAM/quota/runtime verification pending.

Later exposure to R7 verification material means this session is not reusable as a clean formal W2 Deployer. Preserve its preparation; formal W2 needs the attested fresh session/model required by the final run contract.

Source: `/private/tmp/app-session/work/alerta-app-01/README.md`; routing/contamination record in the 2026-10-03T21:29:40+10:00 ledger entry. These local checks are Deployer-reported preparation, not an independent W2 acceptance result.

### 5. R7: first genuine GCP profile run, 2026-10-03

The red Executor created a separate minimal non-Alerta VM, Cloud Run service and durable-object bucket to validate the measurement handlers. This was a pre-W2 instrument test, not the blue Deployer's application deployment. The bounded real allowance was used and task resources were torn down; retained API/default-network changes were recorded for reset.

The captures did not supply all required standalone/profile positives. No cloud retries became authorized merely because review continued.

### 6. R8–R10: offline repairs against those retained captures

Independent review found false-acceptance routes around producer custody, native resource/action identity, probe origin/timing, inventory coverage, storage/dependency binding and Cloud Run lifecycle claims. The Executor repaired the reviewed predicates and replayed negative controls without creating new cloud resources. R10's final F1–F4 concern origin/response correlation, native revision identity continuity, observed old-revision work accounting and malformed latency handling.

R10 closes that finite technical repair list. It deliberately leaves Cloud Run UNVERIFIED where no approved equivalence exists; unsupported timeout/log-ingestion assumptions were withdrawn. E1–E5 are now genuine-capture/policy gaps routed to Operations Coordinator/Human Operator. More constructed offline fixtures cannot provide the missing genuine positives.

**Current purpose:** settle one reachable evidence standard, obtain one bounded supplemental real capture if approved, independently review it, then return the exact Record for Human Operator ratification. Formal W2 still follows its remaining entry gates.

## Accepted intake

Reviewer Actor 02's bounded R10 return closes F1–F4, requests no R11 technical rework, and returns NEXT=BLOCKED for E1–E5. Full genuine acceptance is not PASS. Operations Coordinator reproduced only the two return hashes and read the conclusions and shared state; no tests, code review, manifest audit or provider calls repeated.

- Review: `../../../../executors/tasks/ai-cicd/records/source-04839.md`
  SHA-256: `<PRIVATE_REF_00935>`
- Gaps: sibling `GENUINE_EVIDENCE_GAPS_TO_OPERATIONS_COORDINATOR_R10.md`
  SHA-256: `<PRIVATE_REF_01206>`

## One policy choice: E3

**Recommendation:** adopt an explicitly narrower Cloud Run service/revision replacement equivalence. Do not claim a census of every physical instance or termination of unobserved background work. Genuine provider retirement, route removal, fresh revision, observed recovery and persistence are candidates for satisfying this policy; the Reviewer still decides whether the actual evidence meets it.

This changes the evidentiary acceptance of Master 02 §6.4 for the registered Cloud Run profile. It must be approved and recorded under Constitution §3, rather than introduced as an implementation correction or treated as already established provider behavior.

### Proposed full replacement of Master 02 §6.4

> Before the restart, create a unique account and one domain object through the UI. Apply the following action to every compute unit serving the app, then log in as that account and confirm the object is still there. Record the object identifier and timestamps.
>
> VM(s), including containers or Compose on a VM: stop and start, or reset, every serving VM. A container restart alone is not sufficient.
>
> Serverless / managed compute: force replacement of every serving instance, for example a new revision without a code change or scale to zero and back. Record the operation and rationale before execution. The registered Cloud Run profile may instead establish service/revision replacement by genuine, structurally bound evidence of all of the following: unchanged application image/code; a fresh ready revision; provider retirement of every previously serving revision; removal of all old-revision traffic and tag routes; assignment of all application traffic to the replacement revision; completion before recovery of all old-revision work observed in the retained request/application logs; and application recovery with the original unique object preserved. Captures must cover the action and recovery window. Observed-work completion is not an exhaustive instance/work census; this exception does not claim every old physical instance or unobserved background task has terminated. Any observed continuing old-revision work contradicting that sequence, missing material evidence, or remaining old-revision route leaves A5 UNVERIFIED.
>
> Managed database: not restarted; its durability is the property under test.
>
> If no meaningful restart under these rules can be established, A5 is UNVERIFIED. It is never waived.

**Effect if approved:** the same exact profile, script and disclosed limitation must be frozen before W2A T0 and used across arms. Deployer architecture choice and brief remain unchanged. M1/M9 definitions, object-persistence behavior and WF-8 gates remain unchanged. Local MA-1 and R6 static closure remain valid; R10 becomes the retained technical baseline, not a ratified Adapter Record. Prior captures are not rewritten. Approval does not itself establish profile PASS or authorize cloud operations.

**Alternative:** keep the current all-instance requirement. Cloud Run remains UNVERIFIED until a genuine authoritative mechanism is identified and independently verified. More offline validator iterations cannot supply that physical evidence. No claim is made that such a mechanism is currently reachable.

## One supplemental capture proposal after the policy decision

Preserve standalone GCE, standalone Cloud Run and mixed coverage; do not steer the W2 Deployer to one topology. Executor owns commands, implementation and collection. Reviewer owns independent acceptance. Proposed resource/action bounds below require a new separately signed cloud release, since the original window and attempt counts are exhausted.

- Same sandbox: `<CLOUD_PROJECT>`, `australia-southeast1`; new task prefix `<MA1_SUPPLEMENT_RESOURCE_PREFIX>`.
- At most one standalone VM with one persistent disk, one Cloud Run service, one persistence bucket and, only if needed, one task-owned keyless service account and one image repository. No additional compute platforms.
- One capture bundle, at most two hours from first resource creation; at most two VM restart cycles and two Cloud Run replacement attempts. No automatic extension.
- Sequence: VM-only genuine positive; add Cloud Run and capture mixed genuine positive; remove VM and capture Run-only genuine positive while retaining durable storage. Inventory and probes must describe each actual phase, not a constructed union.
- E1: genuine VM-only inventory, direct authenticated VM-bound probe and restart/recovery/persistence evidence. Cloud Run cannot serve as its probe relay. Probe/permission reachability is confirmed before the first creation; missing permission stops the plan without broader IAM.
- E2: genuine Run-only persistence with the bucket/store retained through replacement; capture and hash the exact probe program and its execution/output.
- E3: collect the exact newly approved equivalence evidence, if approved. If essential evidence is unavailable, return the specific blocker; do not invent timers, claim full instance quiescence, or start speculative code hardening.
- E4: capture genuine project-wide unfiltered inventory while resources are present in each phase, with a known-present control and serving/dependency classification. Post-teardown absence cannot stand in for the serving inventory.
- E5: capture the actual resolved test-object data path and mount/storage identity on the task VM before and after restart. No guessed path, Deployer guest login, SSH-key metadata change or secret-bearing environment capture.
- Existing authorized test identity only; force the approved project on material provider calls. No new interactive login, keys, project-wide IAM, custom public DNS, anonymous endpoint, W2 workspace or treatment material. Task-owned cleanup, residual inspection and API/network environment recording required. Billing remains outside the team's task.
- One versioned profile/Record update and one bounded independent review against the agreed predicates and affected regressions. No broad historical manifest replay or peripheral findings unless a direct false acceptance or required evidence contradiction is found.

## Routing and stop

Operations Coordinator drafts the exact amendment recording and supplemental cloud receipts only from Human Operator's explicit decision. Notify both stopped roles after recording. Their former cloud allowance is not renewed by this proposal. Executor Actor 01/Reviewer Actor 02 remain stopped meanwhile; no R11 instruction is issued. Full Adapter Record ratification, WF-8 closure and formal W2 entry remain subsequent decisions.

# WatchOver Mac close — current eight-patch scope

[Status]: OWNER_ROUTED_PRODUCT_PATCH_SCOPE_r2
[Publication amendment]: rounds/r5_PRIVATE_FIRST_PUBLICATION.md supersedes unspecific publication wording; Mac hands off through a private repo, public export follows Windows final changes and cleanup
[Provider boundary]: Read rounds/r4_PROVIDER_NEUTRAL_CLARIFICATION.md. This is generic deployment guidance and record keeping; GCP is a provider illustration/validation target, not a runtime requirement or exclusive product target
[Task ref]: AI_CICD / WATCHOVER_MAC_CLOSE_20261006
[Current release]: rounds/r2_STAGE_RELEASE.md; rounds/r3_CONTEXT_CONTINUATION_AMENDMENT.md supplies the latest Owner instruction to continue existing role sessions
[Source]: Human Operator's 2026-10-06 instruction to adopt the sealed patch execution package
[Product workspace]: <WORKSPACE>/Desktop/helmls-studio/watchover-ai-devops
[Verified baseline]: main / <PRIVATE_REF_02752>
[Retained changes]: README.md, skills/router.md, skills/stages/plan.md
[Previous scope]: r1_STAGE_RELEASE.md retained; exact pre-r2 entry/scope/state/prompts preserved in rounds/r1_ENTRY_PRESERVATION.json

## Normative scope and acceptance

This is one implementation pass of WO-P01 through WO-P08. The exact requirements are
PATCH_PLAN.md and ACCEPTANCE_MATRIX.md in:
<HELM_ROOT>/council/task/AI_CICD/handoff/Operations Coordinator/watchover_patch_execution_2026-10-06

| Patch | Required product behavior |
|---|---|
| WO-P01 | commit-state: full candidate/state/events/evidence validation, safe single-writer replacement, actionable secret-safe diagnostics |
| WO-P02 | Early AI-managed same-task HTML handoff and the explicit Owner inaccessibility exception |
| WO-P03 | Read-only brief of at most 30 lines; shared CLI/HTML freshness and actual human next action |
| WO-P04 | Short router loop; complete-package reference checks and declared reduced-package gap handling |
| WO-P05 | Generic component health/service rows derived from existing resources/facts |
| WO-P06 | Logical ids versus real provider names; manifest declarations versus runtime evidence |
| WO-P07 | Shared-object baseline, scoped delta and exact authorized incremental reversal |
| WO-P08 | Observed interruption/safe state and terminal next-owner closure using existing fields |

Implement in the package dependency order. Use the matrix as the finite acceptance set.
Current Basic mode, existing schema backbone/seven fact statuses, one current state,
append-only history and read-only local English view remain the product semantics.
Manual state editing remains supported; new safe submission is additive. No generic
upsert, event+state transaction platform, monitor, cloud tooling or new product mode.

The prior documentation-only blast-radius restriction is superseded by this explicit
package scope. Product tools/helpers, rendering/freshness/styles, named skills/docs and
necessary synthetic fixtures/tests may change only to implement these eight patches.

## HTML normal path and narrow exception

After basic facts and an initial plan, AI starts the correct existing show service,
provides the actual URL, guides the Owner and normally waits for explicit confirmation
of this task's page. Only actual page inaccessibility, disclosed limitation and the
Owner's explicit “continue with disclosure” choice permit continuing without page confirmation.
Silence, timeout, server readiness, an ambiguous “continue” or refusal of an accessible page
do not satisfy the exception. Page confirmation/exception grants no spending/DNS/delete
approval. Use existing records for same-task confirmation and continuation.

## Mac versus Windows acceptance

Mac implements all eight patches and verifies the local acceptance matrix using neutral
synthetic records and necessary regression. Fault injection and boundary tests target
actual new behavior; no new dependency installation or real cloud/SSH operation.
Actual AI early-HTML startup/guidance/wait/exception/continuation is Windows-owned.
Mac checks do not prove those AI behaviors or Windows filesystem/process semantics.
Windows receives the frozen version per the package WINDOWS_HANDOFF.md.

## Roles, candidate and release

Current stage uses only r2 and later role-owned r<N> artifacts. Do not execute r1 scope
in parallel. Executor submits one finite eight-patch plan and candidate; independent
Reviewer returns the complete in-scope blocking set and separate nonblocking suggestions.
Rework targets concrete findings and affected dependencies rather than a new broad audit.

Internal checkpoints are permitted; exactly one final small-version freeze and normal
publication conclude Mac. Reviewer binds acceptance to the exact tree and commit.
No repeated whole-task direction approval is needed. Exact product repository URL,
branch, visibility and any repository creation action are settled before remote writes.
Root helmls-studio repository is program documents only. No force-push is authorized.

No product actor loads coordinator trace/evaluation notes, historical experiment
records, human keys/answers or final experiment-specific materials. This scope grants no
cloud/DNS/credentials/delete/Docker/tool-install authority and never changes sealed history.

---

Publication note: English translated/redacted historical document, source-04234. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

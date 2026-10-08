# RESOLUTION STAGE TARGETED REWORK RELEASE — AI_CICD MA-1

[Artifact Class]: IMMUTABLE_EVIDENCE
[Released]: 2026-10-01T14:17:37+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / RESOLUTION_STAGE_S1 / TARGETED_REWORK_R1
[Release state]: RELEASED TO `Executor Actor 01`
[Reviewer state]: stopped after `TARGETED_REWORK`; re-review not yet released

## Objective

Complete the two finite Executor-owned corrections from the independent review. Exercise method autonomy within the original Resolution Stage roots. Preserve all sealed R1 artifacts unchanged.

Mode: `Execute`.
Capability: `WriteExecute`, restricted to the two previously authorized Resolution Stage roots.

Controlling review/reconciliation artifacts:

- `../../../../council/task/ai-cicd/council-records/source-00548.md`, SHA-256 `<PRIVATE_REF_02401>`.
- `../../../../council/task/ai-cicd/council-records/source-00547.md`, SHA-256 `<PRIVATE_REF_01713>`.
- `../../../../council/task/ai-cicd/council-records/source-00546.md`, SHA-256 `<PRIVATE_REF_02441>`.

## Required outcomes

### RW-1 — A3-N full-history traceability

Create `A3N_DEFECT_CANDIDATE_DOSSIER_R2.md` as a new revision; do not overwrite R1.

The revision must provide a traceable disposition for all 78 history candidates claimed by the survey. For each candidate record:

- immutable commit identifier;
- reverse-apply result against the frozen backend pin;
- overlap or non-overlap with a named C1 assertion;
- disposition and rationale;
- raw evidence locator.

Explicitly cover the 16 omitted cleanly reverse-applicable commits named in `RESOLUTION_S1_REVIEW_INTAKE_2026-10-01.md`. Qualify or remove any universal statement not supported by the completed matrix. The Executor may choose whether the matrix is embedded or a separately hashed companion file cross-linked from R2.

Do not select or author a defect.

### RW-2 — sanitized ordinary-access derivative

Preserve the original `RAW_COMMAND_LOG.md` byte-for-byte.

Create an explicitly labelled `RAW_COMMAND_LOG_SANITIZED.md` derivative for ordinary access that:

- removes or replaces the residual public default/test literal without reproducing it elsewhere;
- states that original entries 001–076 contain duplicated inline output and unreliable redacted-line counts;
- states that capture 073/105 inline per-entry hashes became stale after re-filtering and points to the authoritative final-manifest hashes through the Operations Coordinator custody record;
- preserves enough structure and locators for review without presenting itself as the original evidence;
- carries its own SHA-256 in the targeted-rework submission.

Create a new rework checksum manifest for all new R2/derivative artifacts. Do not edit the original `SHA256SUMS`.

## Operations Coordinator-owned items already completed

- Evidence custody record: `execution/ma1_council_reentry/RESOLUTION_S1_EVIDENCE_CUSTODY_RECORD_2026-10-01.md`.
- §E5 completion reconciliation: `execution/ma1_council_reentry/RESOLUTION_S1_E5_COMPLETION_RECONCILIATION_2026-10-01.md`.

These are context, not Executor edit targets.

## Autonomy and boundaries

The Executor controls static method, ordering, matrix format, safe command choice and derivative-generation mechanics. No per-command approval is required.

The original red lines remain. In particular: do not execute fetched code, install anything, start services/containers/VMs, access credentials/private sources, modify frozen repositories, perform cloud/W2 work, or overwrite/delete sealed R1 evidence.

Read-only anonymous HTTPS remains available only if needed to corroborate immutable commit metadata already in scope. Do not broaden the survey corpus.

## Return

Return one `TARGETED_REWORK_SUBMISSION` with:

- every new artifact path/hash/size;
- RW-1 and RW-2 completion mapping;
- confirmation that all R1 artifacts remain hash-identical;
- evidence gaps and red-line compliance.

Then stop for targeted re-review.

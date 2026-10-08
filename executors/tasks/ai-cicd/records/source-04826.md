This is from Executor Actor 01.

# Genuine-evidence gaps after R8 — Executor addendum for Operations Coordinator

Task: AI_CICD / MA-1 / GCP_PROFILE_VALIDATION. Release SHA-256 `<PRIVATE_REF_02940>`.
This complements Reviewer Actor 02's `GENUINE_EVIDENCE_GAPS_TO_OPERATIONS_COORDINATOR_R7.md` (SHA-256 `<PRIVATE_REF_01081>…692c`). It asks for nothing to be run: the window ended at 10:50:59Z, attempts are VM 3/3 and Cloud Run 3/3, and no resource exists. It records what the retained evidence can and cannot prove after the offline R8 repair.

## E1 and E2 — confirmed; unchanged by R8

R8 does not cure either gap and does not present either as a positive.

- **E1 — standalone GCE VM.**
  - The genuine VM-only bundle fails Gate B: no VM-only inventory exists.
  - It also now fails Gate A, because R8 accepts VM application probes only through a Cloud Run frontend in the same bundle whose provider records show a private dependency on that VM. No standalone-VM probe mechanism is registered.
  - Closing E1 needs either a bounded capture or a governed coverage amendment. The capture would be: a VM-only unfiltered inventory, a stop/start or reset, guest capture, and a registered direct probe path plus data-path recovery.
- **E2 — standalone Cloud Run storage.**
  - Segment 2 has no storage roles (`BUCKET=none`), so R8 reports "required durable-storage roles missing".
  - Its manifest (`SHA256SUMS_GCP_LIVE2`) also does not list the probe program. That custody fact is recorded, not altered.

## E3 — reconciled offline (for the Reviewer to verify)

R8 no longer treats an observed instance-id set as a census, and Record C-2's claim that min=max=1 means exactly one instance is withdrawn. Cloud Run ELIGIBLE now rests on the **provider-authoritative zero-serving state** the release allows. Every element below is taken from retained genuine records:

- **The old revision's state.** R0's `Active=False, reason Retired` transition falls inside this action's window. R0 had its route label and `Active=True` before; it has neither the label nor desired replicas after (GP-101 / GP-172).
- **Traffic.** The service and the action result route 100% through a single untagged target to R1, at the reconciled next generation (GP-095 / 096, GP-167 / 168).
- **The new revision.** R1 was created, Ready and Active within the action (GP-129 / GP-171).
- **Request logs.** In a log window that covers R0 from its creation and was not truncated, no request after R0's retirement was served by any revision other than R1 (GP-134 / GP-173).
- **Probe correlation.** Each probe's revision and instance are matched by a provider request log. Instance-set checks remain only as corroboration.

**Outcome.**
- With the R8 roles, the genuine segment-1 bundles pass all of these (raw gate True).
- Segment 2 meets the lifecycle elements but fails on storage (E2).

**What this does not show.**
- It does not claim that every idle physical container stopped.
- A multi-instance or traffic-split mechanism that lacks these provider records fails closed.

If the Reviewer does not accept this equivalence, the residual is exactly that sentence. It is not a request for a new run.

## E4 — NEW: no genuine project-wide (unfiltered) inventory while the units existed

**Cause.** RW5 requires a classification contract that can detect unsupported serving compute. A type-filtered asset search cannot do this: the R7 query omitted, for example, `run.googleapis.com/WorkerPool`. R8 therefore requires the unfiltered `gcloud asset search-all-resources --scope=projects/P --format=json` and classifies every row:
- supported serving types are accepted;
- auxiliary rows (Run revisions) are accepted only when bound to an inventoried service;
- non-serving infrastructure is accepted;
- unsupported serving types and unknown types fail closed.

**What exists.** Every genuine inventory captured while the units existed (GP-078, GP-125, GP-162) used the R7 filtered query. R8 refuses all of them with the reason "R7 type-filtered asset search … cannot establish project-wide completeness". The genuine unfiltered captures exist only before resources existed (GP-046) or after teardown (GP-150, GP-185, GP-188). The R8 classifier accepts all 129 rows of GP-150 (non-serving only), which is a genuine control of the classifier.

**Consequence.**
- No genuine bundle is ELIGIBLE under R8.
- Gate A holds on the genuine mixed stop/start and reset bundles under every R8 check.
- The full ELIGIBLE path is demonstrated only on a labelled DERIVED fixture. It copies the genuine logs and replaces the asset entry's argv and stdout with the genuine filtered rows plus GP-150's genuine infrastructure rows.

**How E4 closes, if full-scope genuine coverage is wanted.** Either:
- a separately bounded capture that takes the unfiltered asset search together with the two per-service lists while the units exist (this can share a release with E1/E2); or
- a governed acceptance or coverage amendment.

No resource, retry or recapture has been attempted.

End from Executor Actor 01.

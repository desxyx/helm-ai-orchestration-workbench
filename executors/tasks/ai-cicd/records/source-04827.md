This is from Executor Actor 01.

# Genuine-evidence gaps after R9 — Executor addendum for Operations Coordinator

**Task.** AI_CICD / MA-1 / GCP_PROFILE_VALIDATION. Release SHA-256 `<PRIVATE_REF_02940>`.

**Relationship to other gap returns.** This complements Reviewer Actor 02's `reviewer/r8/GENUINE_EVIDENCE_GAPS_TO_OPERATIONS_COORDINATOR_R8.md` (SHA-256 `<PRIVATE_REF_05700>…7e7a`) and supersedes my R8 addendum (`GENUINE_EVIDENCE_GAPS_R8_EXECUTOR.md`, kept unchanged) on E3.

**Nothing is requested to run.** The window ended at 10:50:59Z, attempts are VM 3/3 and Cloud Run 3/3, and no resources exist.

## Summary

| Gap | Status after R9 | Effect on the genuine bundles |
|---|---|---|
| E1 standalone GCE VM | Confirmed, unchanged | VM-only bundle fails both gates (no VM-only inventory; no registered standalone-VM probe path) |
| E2 standalone Run storage | Confirmed, unchanged | Segment 2 has no storage roles (`BUCKET=none`); its LIVE2 manifest omits `probe.py` |
| E3 Run drain/completion | **Now a precise physical gap** (offline reconciliation done; residual below) | Both genuine Run segments fail the R9 drain bound |
| E4 contemporaneous unfiltered inventory | Confirmed | Every genuine while-present inventory is type-filtered; Gate B fails |
| E5 resolved data-path mount | Confirmed; R9 fails closed | Genuine guest captures lack `data_realpath=` / `data_mount=` |

**Outcome under R9.**
- On the genuine mixed stop/start and reset bundles, the raw-gate failures are **only** E3 and E5. Every other R9 predicate holds on genuine data, including log correlation of all application probes, typed revision state and template consistency.
- No genuine bundle is ELIGIBLE.

## E3 — offline reconciliation and the exact residual

**What R9 now checks** (R8-T4):
- **Replacement completion** is the latest of four times: the update end, R0's provider retirement, R1's Ready/Active transitions, and the last R0 request's completion (receive time plus logged latency).
- **Every R0 request log must have a parseable latency.**
- **Old-request completion** must strictly precede the recovery probe.
- **Recorded `completed_utc`** is this causal completion.

**What the retained genuine records show.**
- **Last observed old request:** completed before retirement in both segments. This agrees with Reviewer Actor 02's `RAW_E3_RECONCILIATION_R8.json`: segment 1 at 06:58:46.257Z against Retired 06:59:18.618Z; segment 2 at 07:16:24.318Z against Retired 07:16:35.276Z.
- **Probes:** every probe matches a provider request log of the serving revision and instance.

**Residual: drain proof.**
- **Why the logs can't prove it.** A request log entry is complete only when the response is sent, since it carries the receive-to-response latency. An old request still in flight when the logs were captured is therefore absent from them, not visible as late.
- **The bound R9 uses.** Cloud Run's request timeout caps every request. The replaced revisions carry `timeoutSeconds: 300` (GP-063, GP-164). So absence of old work is provable only from a log capture taken after Retired + 300 s + a declared 60 s ingest allowance.
- **The genuine captures miss that bound:**

  | Segment | Log capture | Bound (Retired + 300 s + 60 s) | Captured early by |
  |---|---|---|---|
  | 1 (GP-134) | 07:03:49Z | 07:05:18.6Z | 89.6 s (29.6 s before the timeout alone) |
  | 2 (GP-173) | 07:16:51Z | 07:22:35.3Z | 344 s |

**Exact E3 residual for Operations Coordinator.** No retained record covers all old-serving work up to the replaced revision's request-timeout bound.

**How it closes.** Either:
- a future bounded capture whose Run log query runs after Retired + timeout + ingest allowance (cheap to combine with the E1/E2/E4/E5 capture), or
- a governed equivalence: for example, accepting provider retirement plus the observed logs without the timeout bound.

**What R9 does not claim.** It does not claim physical termination of idle instances. It does not convert observed instance IDs into a census.

## E5 — resolved application data-path mount (R9 fails closed)

- **What R9 requires.**
  - Genuine guest lines `data_realpath=` and `data_mount=` (SOURCE, FSTYPE, UUID, TARGET from `findmnt -T` on the resolved path).
  - The resolved path must equal the canonical declared path.
  - The source must be a block device on the lsblk table.
  - The filesystem type must be a registered persistent block filesystem.
  - The UUID must be the provider-bound root filesystem.
  - The target must be the mount containing the path.
- **What the genuine captures contain.** They have neither line, so every genuine VM bundle reports E5.
- **What R9 refuses.** Traversal, symlink redirection, tmpfs, bind, overlay and other-device paths are all refused on DERIVED fixtures.
- **What the DERIVED positive shows.** The full-path control adds the two lines as an explicit DERIVED substitution. It is never presented as evidence.

## E4, E1, E2

Unchanged from my R8 addendum and Reviewer Actor 02's R8 gap return.

**What a single future bounded capture would need to close E1, E2, E4, E5 and E3 together.** All of the following, taken while the units exist:
- a VM-only and a Run-only deployment, each with the unfiltered asset search plus both per-service lists;
- guest captures that include `data_realpath=` and `data_mount=`;
- a registered standalone-VM probe path;
- Run storage roles with a durable bucket;
- a Run log query taken after the drain bound.

Alternatively, a governed coverage disposition. No resource, retry or recapture has been attempted or requested by me.

End from Executor Actor 01.

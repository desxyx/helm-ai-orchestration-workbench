This is from Executor Actor 01.

# Genuine-evidence gaps after R10 — Executor addendum for Operations Coordinator

**Task.** AI_CICD / MA-1 / GCP_PROFILE_VALIDATION. Release SHA-256 `<PRIVATE_REF_02940>`.

**Relationship to other gap returns.** This complements Reviewer Actor 02's `reviewer/r9/GENUINE_EVIDENCE_GAPS_TO_OPERATIONS_COORDINATOR_R9_r1.md` (SHA-256 `<PRIVATE_REF_05272>…7586`). It **withdraws** the E3 framing in my R9 addendum (`GENUINE_EVIDENCE_GAPS_R9_EXECUTOR.md`, kept unchanged).

**Nothing is requested to run.** The window ended at 10:50:59Z, attempts are VM 3/3 and Cloud Run 3/3, and no resources exist.

## Correction: the R9 E3 "timer" is withdrawn

My R9 addendum said E3 could close with a Run log query taken after Retired + `timeoutSeconds` + a 60 s ingest allowance. **That premise was wrong, and I withdraw it.**
- **Timeout doesn't stop handler work.** Cloud Run's request timeout ends the HTTP response (504) but does not stop the handler, which can keep running.
- **No delivery bound exists.** The 60 s ingest figure was my assumption, with no provider guarantee behind it.
- **The numbers had no meaning.** The 89.6 s / 344 s shortfalls I reported only measure that hypothetical timer.

R10 removes the timer from the adapter.

## E3 — now governed, fail-closed

**What R10 does.**
- **No mechanism registered.** No authoritative Cloud Run serving-quiescence mechanism is registered (`GCP_RUN_QUIESCENCE_MECHANISM = None`).
- **Every Run replacement is UNVERIFIED with reason E3.** That covers genuine and DERIVED bundles alike. **No bundle that contains a Cloud Run unit can be ELIGIBLE under R10.**
- **Everything short of E3 is still enforced.** Observed old-serving work is covered across the entire captured service history: every non-replacement revision's request completion (receive time + bounded latency) and its application stdout completion markers. All of it must precede recovery, but this is reported as observed work only, never as a census.

**What the retained records show.**
- The last observed old work completed at 06:58:46Z (segment 1) and 07:16:24Z (segment 2), in both cases before R0's provider retirement and before recovery.
- This is supportive only.

**How E3 closes. Operations Coordinator/Human Operator must choose one of:**
1. A reviewed **authoritative quiescence mechanism**, backed by genuine evidence captured under a separately bounded release.
   - I propose no mechanism as sufficient.
   - A candidate for review (not implemented, not claimed) would combine an application-level drain marker emitted on SIGTERM after in-flight work ends with the provider's instance-shutdown system log for every old instance. Whether that is authoritative is for review.
2. A **governed narrower equivalence**. For example, accept provider retirement plus route removal plus observed logs as sufficient for this profile. This is a governance decision, not an adapter self-approval.
3. A **coverage amendment** that excludes the Cloud Run replacement profile.

## E1, E2, E4, E5 — unchanged

| Gap | Status |
|---|---|
| **E1** | No VM-only inventory; no registered standalone-VM probe path. |
| **E2** | Segment 2 has `BUCKET=none` and no storage roles; LIVE2 omits `probe.py`. |
| **E4** | Every while-present inventory used the type-filtered query. |
| **E5** | Genuine guest captures lack `data_realpath=` / `data_mount=`. |

**R10 outcome on genuine data.** The genuine mixed stop/start and reset bundles fail Gate A only on E3 (now governed) and E5, and Gate B on E4. Every other R10 predicate holds on genuine data, including full-origin and response-interval correlation of all probes, log receipt, revision identity continuity and old-serving coverage.

## Decision needed from Operations Coordinator/Human Operator

Choose an E3 route (1, 2 or 3 above), and choose whether to issue a bounded capture for E1/E2/E4/E5 or a coverage disposition.

Until then, the R10 GCP Run profile is fail-closed by design. The adapter cannot itself yield an ELIGIBLE GCP restart for a bundle that includes Cloud Run, and VM-only bundles remain blocked by E1.

End from Executor Actor 01.

# MA-1 Alerta Adapter Record — candidate R10 (MA-1.10): GCP profile rework 3

[Status]: CANDIDATE R10 for independent cross-family VerifyOnly re-review in the GCP profile loop. Not ratified; not a WF-8 release; no W2 T0.
[Task ref]: AI_CICD / MA-1 / GCP_PROFILE_VALIDATION · [Author]: Executor Actor 01
[Release]: `MA1_GCP_PROFILE_VALIDATION_LOOP_RELEASE_2026-10-03_r1.md`, SHA-256 `<PRIVATE_REF_02940>`.
[Review answered]: `evidence/gcp_profile_stage/reviewer/r9/REVIEW_RETURN_GCP_PROFILE_R9_r1.md`, SHA-256 `<PRIVATE_REF_05891>` (TARGETED_REWORK, R9-F1–F4).
[Base]: R9 §1 and R8 §1 remain the base specification, except where §1 below supersedes them. R1–R9 are preserved byte-for-byte (R9 manifest 48930 entries re-verified in M37). Genuine live captures are unchanged.
[Change from R9]: R9-F1–F4 only. The lima path, A3/A4/A5 and custody are unchanged.

## 0. Headline consequence

**E3 now fails closed.**
- **Registry.** `GCP_RUN_QUIESCENCE_MECHANISM = None`, so no authoritative Cloud Run serving-quiescence mechanism is registered.
- **Effect.** Every `cloud_run` replacement is UNVERIFIED with reason E3. **No bundle containing a Cloud Run unit can be ELIGIBLE under R10,** genuine or DERIVED.
- **What the DERIVED full-path controls prove instead.** All other predicates hold: Gate B is true and E3 is the only raw reason.
- **How this changes.** Lifting E3 requires a reviewed registry revision carrying either a reviewed mechanism (with genuine evidence) or a governed equivalence decided by Operations Coordinator/Human Operator. See `GENUINE_EVIDENCE_GAPS_R10_EXECUTOR.md`.
- **VM-only bundles** remain blocked by E1.

## 1. R10 changes

### 1.1 R9-F1 — full request origin, response interval and log receipt (every correlated probe)
- **Origin.** The request log's origin must equal the probe target's: scheme, host, and port with an omitted port normalized to the scheme default.
- **Response interval.** The request's receive time must lie in the probe window, and receive time plus a bounded latency must not exceed the probe end + the declared 60 s tolerance.
- **Every log entry:**
  - `receiveTimestamp` must be parseable, at or after the event (− skew), and no later than the log query end (+ skew).
  - For request entries, `receiveTimestamp` must also be at or after the receive time + latency (− skew). In the genuine logs every request entry meets this, with a minimum margin of 0.011 s.
- **Scope.** This applies to every health, unavailable, object-write/read and root probe.

### 1.2 R9-F2 — immutable revision identity and configuration continuity
- **Identity.** revision_before, revision_after and old_revision_after each need a typed, non-empty `uid` and the exact native `selfLink` `/apis/serving.knative.dev/v1/namespaces/<num>/revisions/<name>`.
- **UID continuity.** The retired record keeps R0's uid; the replacement's uid differs.
- **Immutable fields.** The retired R0 must equal its pre-action record in spec, `status.imageDigest`, `creationTimestamp`, `generation`, `ownerReferences` and normalized annotations.
- **Allowed lifecycle changes:** labels (route removal), conditions, `resourceVersion` and volatile annotations.

### 1.3 R9-F3 — all old-serving work; unsupported timer withdrawn
- **Log window.** It must cover the service's creation, which means all revisions in the captured service history.
- **Channels.** Only registered channels are accepted. `httpRequest` may appear only on the request channel, and the application completion marker (`ma1prof_request`) only on stdout.
- **Old-serving work.** Every non-replacement revision's request completion (receive time + bounded latency) and application stdout markers count. All of it must strictly precede the recovery probe and feeds the causal completion. This is observed work, never a census.
- **Withdrawn.** R9's drain timer (Retired + `timeoutSeconds` + 60 s ingest) is removed from code, Record and registry. The request timeout ends the HTTP response, not handler work, and log delivery has no supplied completeness bound.
- **E3.** Fails closed (§0).

### 1.4 R9-F4 — bounded duration arithmetic
- **Latency format.** It must match `\d{1,5}(\.\d{1,9})?s` and lie in [0, 3600] s. Anything else (overflowing, non-numeric, negative or out of bound) gives a specific "without a finite, bounded latency" refusal.
- **Guard.** `OverflowError` is added to the per-unit fail-closed guard and the inventory backstop. This is not a success fallback.

## 2. Evidence and results (static checks R10, `static_checks_r10/`)

| Item | Result |
|---|---|
| M04 R10 offline suite (`offline_checks_r10_gcp.py`) | **165/165 as expected**, each with its targeted reason. **Genuine:** 16. **DERIVED:** 2 full-path cases, 6 E3-only positives and 141 one-fact negatives. The negatives comprise RW1–RW7 (71), R8-T1–T5 (45) and the new K11 (R9-F1 9, R9-F2 8, R9-F3 8, R9-F4 4). K11 covers every Reviewer Actor 02 R9 case, including the valid-format controls and the malformed-channel diagnostic. |
| M05 R6 suite on R10 | 224/224 |
| M06 Reviewer Actor 02's R9 independent/supplementary/focused scripts (only SCRIPT/OUT substituted) on R10 | 45 cases, 0 unexpected acceptances, 0 crashes. All 3 of their ELIGIBLE controls are UNVERIFIED with E3 as the only raw reason. |
| M08–M52 CLI | **DERIVED mixed/reset:** UNVERIFIED with E3 only, no `completed_utc` recorded. **Origin-port, old-digest, in-flight and 400-digit-latency cases:** UNVERIFIED with targeted reasons; no traceback on the overflow case. **Inventory:** malformed inventory refused with no state file. **Other R8/R9 CLI cases:** as designed. **Preservation and hygiene:** R1–R9 manifests verify; Reviewer tree (93156 files) unchanged; no `__pycache__`; no identifier or credential leak. |

**Genuine outcome.**
- The genuine mixed stop/start and reset bundles fail Gate A only on E3 (governed) and E5, and Gate B on E4 (M04 asserts the exact raw reasons). Every other R10 predicate holds on genuine data.
- The genuine standalone Run additionally fails on E2.
- The genuine VM-only bundle fails on E1.

**Suite corrections before the recorded run.** Three test-side fixes, none to R10:
- an R8-era late-request fixture now carries a consistent `receiveTimestamp`;
- the "much later query" control now widens its window so it still covers the service history;
- one expected-reason string was updated to R10 wording.

## 3. Script and registry

| Field | Value |
|---|---|
| Script | `executor/adapter_record_stage/ma1_verify_r10.py`, SHA-256 `<PRIVATE_REF_01893>` |
| Profile registry | `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R10.json`, SHA-256 `<PRIVATE_REF_01460>` |
| Static checks | `evidence/adapter_record_stage/executor/static_checks_r10/` (rerunnable: `bash run_static_checks_r10.sh <workspace root>`) |

## 4. Coverage limits and genuine-evidence gaps

- **E3 (governed, fail-closed).** See §0 and `GENUINE_EVIDENCE_GAPS_R10_EXECUTOR.md`. It withdraws the R9 timer framing.
- **E1, E2, E4, E5.** Unchanged.
- **Declared tolerance.** The 60 s provider/wrapper clock tolerance applies to provider lifecycle transitions, log receipt bounds and the request-completion window. It does not apply to observed old-work ordering, which is strict.
- **Unchanged from R8/R9:** C-A (validation-workload vocabulary only; Alerta needs a reviewed registry revision), C-B (topology), C-D, C-E, C-8, and the residue resolved by addendum 01.

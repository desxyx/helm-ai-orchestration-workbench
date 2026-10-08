# MA-1 Alerta Adapter Record — candidate R9 (MA-1.10): GCP profile rework 2

[Status]: CANDIDATE R9 for independent cross-family VerifyOnly re-review in the GCP profile loop. Not ratified; not a WF-8 release; no W2 T0.
[Task ref]: AI_CICD / MA-1 / GCP_PROFILE_VALIDATION · [Author]: Executor Actor 01
[Release]: `MA1_GCP_PROFILE_VALIDATION_LOOP_RELEASE_2026-10-03_r1.md`, SHA-256 `<PRIVATE_REF_02940>`.
[Review answered]: `evidence/gcp_profile_stage/reviewer/r8/REVIEW_RETURN_GCP_PROFILE_R8.md`, SHA-256 `<PRIVATE_REF_04455>` (TARGETED_REWORK, R8-T1–T5).
[Base]: R8 (§1 of `MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R8.md` remains the base specification), plus R1–R7. All are preserved byte-for-byte; the R8 manifest (30743 entries) is re-verified in L37. Genuine live captures are unchanged.
[Change from R8]: R8-T1–T5 only. The lima path, A3/A4/A5 and custody are unchanged.

## 1. R9 changes to the GCP profiles (in addition to R8 §1)

### 1.1 R8-T1 — every material probe is correlated
- **Probes covered:** VM health (after), VM unavailable (stopped), VM object write/read-before/read-after, Run root before/after, and GCS write/read-before/read-after.
- **Membership.** Each response must name the frontend revision and instance serving at that time:
  - **Pre-action:** before the frontend action, the replaced revision and its pre-action instances.
  - **Post-action:** after the frontend's causal replacement completion, the replacement and its new instances.
  - **In between:** ambiguous, refused.
- **Startup identity.** The response's `container_started_utc` must be within the declared skew of the provider "Starting new instance" event for that instance, and must not follow the request.
- **Request log.** A provider request log of exactly that revision/instance, method, host, full path+query and status must have been received inside the probe entry window.
- **Payload.**
  - Run root: `status=ok`.
  - VM health after the action: backend `status=ok` with the guest's new boot id.
  - Provider request identity (frontend instance) and VM backend boot identity are checked separately.

### 1.2 R8-T2 — resolved data path and requested object key
- **Declared path.** The data path must be canonical: absolute, normalized, with no `.` or `..` segments.
- **Guest evidence required (new keys):**
  - `data_realpath=` must equal the declared path; a symlinked or redirected path is refused.
  - `data_mount=SOURCE,FSTYPE,UUID,TARGET` (findmnt `-T` on the resolved path):
    - **SOURCE:** a `/dev/<device>` on the lsblk table. Bind, overlay, network and tmpfs sources are refused.
    - **FSTYPE:** one of ext4, xfs, btrfs.
    - **UUID:** equal to that device's lsblk UUID and to the provider-bound root filesystem.
    - **TARGET:** the mount containing the path.
  - **Missing keys:** E5, fail closed.
- **GCS object.** Write, reads and the provider object row must all use exactly the registered key `ma1prof/<requested id>.json`.
- **R8 C-C is withdrawn.** Its claim that reboot read-back alone excludes tmpfs no longer stands.

### 1.3 R8-T3 — reconciled revision state and full configuration consistency
- **Conditions.** Provider conditions must be typed (`True`, `False` or `Unknown`) with unique types. Duplicate or contradictory conditions are refused, never resolved by picking one.
- **Generations.** For every revision relied on, `status.observedGeneration` must equal `metadata.generation`, both as integers.
- **Template vs revision.** Each service template must match the revision it describes, under the declared normalization only:
  - a provider-defaulted container name, when the template omits one;
  - a template image tag resolved by the provider to the revision image, which must equal `status.imageDigest`;
  - network-interfaces compared after parsing;
  - volatile client annotations ignored.
- **Action result.** The action-result template must equal the service_after template.
- **Nonce.** The replaced revision must not already carry the action's nonce.

### 1.4 R8-T4 — causal replacement completion (E3 offline reconciliation)
- **Completion time.** The latest of: the update end, R0 Retired, R1 Ready/Active, and the last R0 request completion (receive time + logged latency).
- **R1 readiness.** R1 Ready/Active must fall within the action window (± declared skew), not merely before a later describe.
- **Old requests.** Every R0 request needs a parseable latency. Old-request completion must strictly precede the recovery probe.
- **Ordering.** Provider-derived completion may exceed the recovery and read-after probes only by the declared 60 s clock tolerance.
- **Drain bound.** The Run log capture must follow R0 Retired + R0 `timeoutSeconds` + a 60 s ingest allowance. Otherwise old in-flight work is not excluded: E3, UNVERIFIED.
- **Recorded completion.** `completed_utc` is this causal completion.
- **Scope.** No instance census and no idle-container termination is claimed.

### 1.5 R8-T5 — typed refusal
- **Inventory.** Identity fields of the inventory rows must be strings. Malformed rows give a controlled refusal with a specific reason at init and at revalidation: no traceback and no state file created.
- **Audit status.** The status code must be absent or the integer 0; a boolean, a string or a null status is refused.
- **Run logs.** Non-object log entries are refused as foreign.

## 2. Evidence and results (static checks R9, `static_checks_r9/`)

| Item | Result |
|---|---|
| L04 R9 offline suite (`offline_checks_r9_gcp.py`) | **137/137 as expected**, each negative with its targeted reason. **Genuine:** 16 read-only controls. **DERIVED:** 2 full-path cases, 5 positives and 114 one-fact negatives. The negatives comprise the R8 carry-over (RW1 6, RW2 17, RW3 9, RW4 11, RW5 13, RW6 10, RW7 5) and the new K10 section (R8-T1 10, R8-T2 10, R8-T3 9, R8-T4 8, R8-T5 9). K10 covers every Reviewer Actor 02 R8 independent, supplementary and boundary case. The positives include Reviewer Actor 02's 17 s Retired boundary control (ELIGIBLE within the declared tolerance) and two causal `completed_utc` checks. |
| L05 R6 suite on R9 | 224/224 |
| L06 Reviewer Actor 02's R8 independent/supplementary/boundary scripts (only SCRIPT/OUT substituted) on R9 | 28 cases, 0 unexpected acceptances, 0 crashes. Their fixtures keep the genuine guest captures and genuine log time, so their full controls are now UNVERIFIED (E5/E3). L04 replays every mutation on the R9 full-path base, where the control is ELIGIBLE. |
| L08–L48 CLI | The R8 CLI set, re-run on R9 as designed. Added cases: foreign VM-health instance, stale new revision, in-flight old request and tmpfs data path all UNVERIFIED; malformed inventory init refused with a specific reason, no traceback and no state file; DERIVED mixed `completed_utc` = 06:59:20Z. R1–R8 manifests verify; the Reviewer tree (42463 files) is unchanged; no `__pycache__`; no identifier or credential leak. |

**Genuine outcome under R9.**
- No genuine bundle is ELIGIBLE.
- For the genuine mixed stop/start and reset bundles, the raw-gate failures are exactly E3 (Run log captured before the drain bound) and E5 (no resolved data-path evidence). Every other R9 predicate holds on genuine data.
- Gate B fails on E4.
- The full ELIGIBLE path is shown only on the labelled DERIVED full-path base (`fixtures_r9.full_path_base`), which adds three substitutions to genuine copies:
  - the unfiltered asset entry;
  - the guest `data_realpath=` / `data_mount=` lines;
  - the Run log entry's capture time moved after the drain bound.

## 3. Script and registry

| Field | Value |
|---|---|
| Script | `executor/adapter_record_stage/ma1_verify_r9.py`, SHA-256 `<PRIVATE_REF_05634>` |
| Profile registry | `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R9.json`, SHA-256 `<PRIVATE_REF_04299>` |
| Static checks | `evidence/adapter_record_stage/executor/static_checks_r9/` (rerunnable: `bash run_static_checks_r9.sh <workspace root>`) |

## 4. Coverage limits and genuine-evidence gaps

The full gap text is in `evidence/gcp_profile_stage/executor/GENUINE_EVIDENCE_GAPS_R9_EXECUTOR.md`.

- **E1, E2, E4:** unchanged.
- **E3:** now a precise drain-bound gap. The genuine Run logs were captured 89.6 s (segment 1) and 344 s (segment 2) before Retired + 300 s + 60 s.
- **E5:** fail closed. No resolved data-path mount evidence exists in the genuine captures.
- **Declared assumptions, for the Reviewer to verify:**
  - Request log entries become readable within the 60 s ingest allowance.
  - Cloud Run's request timeout bounds every request.
  - The 60 s provider/wrapper clock tolerance applies only to provider lifecycle transition times.
- **Unchanged from R8:** C-A (workload-specific application vocabulary; Alerta needs a reviewed registry revision), C-B (topology scope), C-D (asset index consistency and closed classification), C-E (custody, not attestation), and the residue, resolved by addendum 01.
- **C-C:** replaced by §1.2.
- **C-8:** inherited.

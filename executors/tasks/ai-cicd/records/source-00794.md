# FINAL_HANDOFF_TO_Operations Coordinator — W2 entry local preparation r1

[Artifact Class]: VERSIONED_CANDIDATE (handoff draft)
[Status]: PENDING INDEPENDENT REVIEW — valid only with an independent Reviewer PASS on candidate W2EP-CAND-r1
[Written by]: Executor Actor 01, 2026-10-04
[Main record]: evidence/executor/LOCAL_PREPARATION_SUBMISSION_r1.md

## A. Resume anchor

Task AI_CICD / W2_ENTRY_LOCAL_PREPARATION; release r1 `<PRIVATE_REF_02698>…958b`; HELM HEAD `<PRIVATE_REF_01910>` (main,
local refs only); working folder `council/task/AI_CICD/execution/w2_entry_preparation/`.

## B. Exact pins for WF-8 recording

| Pin | SHA-256 |
|---|---|
| Common harness experiment-control-tool 0.3.0 (overall) | `<PRIVATE_REF_02003>` |
| Harness manifest file | `evidence/executor/HARNESS_MANIFEST_0.3.0.json` (file hash in EVIDENCE_MANIFEST_r1.sha256) |
| W2B export SHA256SUMS (25 files, `<PRIVATE_REF_02752>…5a165`) | `<PRIVATE_REF_02216>` |
| W2B activation block (pointer-only) | `<PRIVATE_REF_00243>` |
| Runtime lock | `tool/experiment-control-tool-0.3.0/tool/support/runtime_lock_w2.json` (bound in the harness manifest) |
| HC material (unchanged input) | `<PRIVATE_REF_02212>` |
| W2C | `NOT_EXECUTED` |

Export locator: `/private/tmp/q2d7363ee/f76066e97ceb7e3b/` (container `0111`). Reproducible from the
commit if `/private/tmp` is cleared.

## C. Remaining actual live-entry actions (not done; need the later authorized entry)

1. D-2: create/authenticate the dedicated experiment Codex client home from the template; run `ep-i probe`.
2. D-4: confirm the mode pin and live `gpt-5.6-sol` availability; freeze the runtime lock.
3. Choose the real neutral W2A root (not `/private/tmp`); run `ep-i check --prompt-input-check` there.
4. R1–R8 reset evidence, R3a remote pin verification, cloud/DNS residue inventory; then the attestation.
5. D-1: guest-unit install route for GCE arms (or record UNVERIFIED coverage).
6. D-3: Docker and `npm ci` network on the control plane for R14 provenance.
7. Install W2B only after W2A seals: make the container listable, `shasum -c` against `<PRIVATE_REF_02216>…`.

## D. Housekeeping for the controller

- Task-owned scratch `/private/tmp/w2prep_exec_tmp/` (CLI stubs, locator notes, run scripts) can be
  removed once review closes; it is not part of any deliverable.
- This Executor session accessed W3 holdout filenames (BE-1) and must not be reused for WatchOver design/build.

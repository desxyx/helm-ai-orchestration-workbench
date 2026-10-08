# FINAL_HANDOFF_TO_Operations Coordinator — W2 entry local preparation r2

[Artifact Class]: VERSIONED_CANDIDATE (handoff draft; supersedes r1 draft)
[Status]: PENDING INDEPENDENT REVIEW. This handoff is valid only together with an independent Reviewer PASS on W2EP-CAND-r2.
[Written by]: Executor Actor 01, 2026-10-04
[Main record]: evidence/executor/r2/LOCAL_PREPARATION_SUBMISSION_r2.md

## A. Resume anchor

- Task: AI_CICD / W2_ENTRY_LOCAL_PREPARATION.
- Release: r1 `<PRIVATE_REF_02698>…958b`.
- HELM HEAD: `<PRIVATE_REF_01910>` (main, local refs only).
- Folder: `council/task/AI_CICD/execution/w2_entry_preparation/`.
- Prior review: `REVIEW_RETURN_W2EP_r1.md`, TARGETED_REWORK F1–F3, addressed in r2.

## B. Exact pins for WF-8 recording

| Pin | SHA-256 / locator |
|---|---|
| Common harness experiment-control-tool 0.3.1 (overall) | `<PRIVATE_REF_01649>` |
| W2B export r2 SHA256SUMS (20 files, `<PRIVATE_REF_02752>…5a165`, literal D-4 allowlist) | `<PRIVATE_REF_01059>`; `/private/tmp/qefdb2bab/d1020f3ce00567b7/` |
| W2B activation block r2 (pointer-only) | `<PRIVATE_REF_03364>` |
| Runtime lock | `tool/experiment-control-tool-0.3.1/tool/support/runtime_lock_w2.json` (bound in the harness) |
| HC material (input) | `<PRIVATE_REF_02212>` |
| W2C | `NOT_EXECUTED` |
| Placement | cwd `<CLIENT_HOME>/Workspaces/site-01/app`; client home `<CLIENT_HOME>/Workspaces/.clients/c01` |

Superseded and retained unchanged as review evidence:
- harness 0.3.0 `<PRIVATE_REF_02003>…aeaa`;
- export r1 `/private/tmp/q2d7363ee/…` (25 files).

Neither is a W2 candidate.

## C. Remaining actual live-entry actions (not done; they need the later authorized entry)

1. D-2: authenticate and configure `<CLIENT_HOME>/Workspaces/.clients/c01` from the template, then run `ep-i probe`.
2. D-4: confirm the mode pin and live `gpt-5.6-sol` availability, then freeze the runtime lock.
3. Run `ep-i check --prompt-input-check` in `<CLIENT_HOME>/Workspaces/site-01/app` with chain-top at the arm root. Cover `~/AGENTS.md` handling and the actual runtime read boundary.
4. Collect R1–R8 reset evidence, R3a remote pin verification and the cloud/DNS residue inventory, then the attestation.
5. D-1: decide on `COLLECTOR_ROUTE_PROPOSAL_r2.md` (M1–M5), or record the coverage disposition.
6. D-3: Docker and `npm ci` network on the control plane for R14 provenance.
7. Install W2B only after W2A seals: make the r2 container listable, then `shasum -c` against `<PRIVATE_REF_01059>…`.

## D. Housekeeping

- Scratch `/private/tmp/w2prep_exec_tmp/` (CLI stubs, locator notes, scripts) can be removed once review closes.
- The fixture roots `/private/tmp/scb6c4a9d` and `/private/tmp/e0a702513` are test fixtures only.
- This Executor session accessed W3 holdout filenames (BE-1). It must not be reused for WatchOver design or build.

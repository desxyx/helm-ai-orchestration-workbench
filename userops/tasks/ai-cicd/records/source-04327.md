# Human Operator Ratification Draft — W1 R3a/R3b Entry Amendment

Date: 2026-09-28  
Status: RATIFIED BY Human Operator — operative amendment routed 2026-09-28T13:38:06+10:00  
Source advice: Council Member A local CLI single-member proposal, advisory and not Council-converged

Ratification locator: `<OPERATIONS_ROOT>/tasks/AI_CICD/OWNER_DECISION_LEDGER.md`, Decision — 2026-09-28T13:38:06+10:00. The header/status update records ratification only; it does not change the replacement constraint Human Operator approved.

## Decision proposed for Human Operator

Adopt the R3a/R3b split below as a narrow amendment to the W1 entry protocol. This amendment preserves:

- the frozen W1 brief as the Bare Deployer's first message;
- delivery of that brief as T0;
- an initially empty external workspace;
- Deployer self-cloning inside the measured deployment window;
- an immutable pre-T0 reset attestation.

## Frozen Truths amended

This decision amends only the following meanings:

1. SoT v0.1 §8.1 item 2: workspace emptiness is pre-T0; Deployer clone conformance is post-T0.
2. SoT v0.1 §8.1 item 10 and §8.3: pinned SHAs remain in the reset attestation; observed clone SHAs move to a separate source-verification record.
3. Master 01 v1.4 §8: pre-T0 pin matching means remote reachability and brief/run-package consistency; actual workspace conformance is R3b.
4. Master 01 v1.4 DBC-9: add terminal label `STOPPED_BY_RUN_INVALID`.
5. Master 03 v1.0 R3, §§14–15: split R3 into R3a/R3b; keep the attestation immutable; add the append-only source-verification artifact.
6. Master 03 v1.0 §§18.4 and 26: define cleanup and bounded controller work after R3b invalidation.

DBC-2, DBC-3, DBC-10, the frozen brief, Master 02's T0 definition and Master 01's W1 sequence otherwise remain unchanged.

## Replacement constraint in full

### R3a — entry scope, before T0

Operations Coordinator records mechanically that:

1. the per-run directory is new, outside HELM and `AI_CICD/pre`, and empty;
2. the same listing instrument detects a known-present file in a controller-only sibling control directory without writing inside the W1 workspace;
3. no earlier-arm or generated configuration is present;
4. each pinned SHA exists on its designated remote, checked from outside the Deployer workspace;
5. the frozen brief names both designated remotes and both pinned SHAs.

R3a is mandatory for the entry verdict.

### Immutable entry attestation

Before T0, Operations Coordinator issues one immutable `RUN_W1_RESET_ATTESTATION.md` covering R1, R2, R3a and R4–R8. Its SHA fields mean the two remote-verified run-package pins. It contains a locator for `RUN_W1_SOURCE_VERIFICATION.md` with status `PENDING_POST_T0`.

The entry verdict remains `CLEAN`, `KNOWN_LIMITATION` or `INVALID`. `CLEAN` is explicitly entry-scoped: it does not claim that post-T0 Deployer clones already conform. The attestation is never edited after issue; any pre-T0 correction regenerates it under Master 03 §14.4.

Immediately before sending the brief, Operations Coordinator creates the append-only source-verification record and writes Entry 0 containing the second empty-workspace check, timestamp and positive-control locator. If the workspace is no longer empty, T0 does not occur and R3a is rerun.

### T0

The frozen brief is delivered byte-identically after placeholder substitution. Delivery remains T0. The T0 timestamp is appended to the source-verification record.

### R3b — post-T0 source verification

The Deployer clones and checks out the repositories without controller advice. While R3b is open, Operations Coordinator performs an event-triggered, read-only, out-of-band evaluation at the earliest applicable point and again at later applicable points if the result remains pending:

- E1: any request for a DBC-6 gated-action approval;
- E2: the forced-interruption trigger;
- E3: the first terminal declaration, stop or fuse.

At E1, Human Operator withholds the reply only until Operations Coordinator appends the evaluation entry. The interval from request arrival to Human Operator reply is recorded as `human_wait_seconds`; no new Master 02 metric is introduced.

For each of the two brief repositories, the record contains origin URL, checked-out HEAD SHA, timestamp, and clone/checkout transcript locators where available.

Outcomes:

- `CLOSED_PASS`: both repository origins match the designated remotes and both HEAD SHAs match the pins.
- `PENDING`: no mismatch exists but one or both repositories are not yet present; reevaluate at the next E1–E3 event.
- `CLOSED_INVALID`: an observed brief repository has the wrong origin or wrong HEAD SHA, or the transcript shows that either project was obtained from a non-designated source.
- `CLOSED_NOT_REACHED`: a terminal state occurs before one or both repositories exist and no mismatch was observed. This is not itself `INVALID`; the ordinary terminal outcome remains authoritative.

R3b describes starting-source conformance at its evaluation points. Later edits made inside a correctly pinned working copy are deployment behaviour, not reset contamination.

### Immediate consequence of CLOSED_INVALID

1. The run becomes `INVALID` under Master 03 §14.3 without editing the entry attestation.
2. Operations Coordinator notifies Human Operator through the control channel.
3. Human Operator sends no further message to the Deployer and closes the Deployer session without exposing the reason.
4. No acceptance verification, frozen teardown prompt or W1 postmortem is sent.
5. The execution layer materializes the transcript-to-stop with terminal label `STOPPED_BY_RUN_INVALID` and the source-verification locator.
6. Raw evidence is retained but excluded from arm-comparison metrics.
7. Any existing cloud resources are frozen as experimental residual evidence, then cleaned administratively under Master 03 §18.4 with required Human Operator approvals and the `CONTROL_CLEANUP` label; residual inventory is rerun.
8. The run returns to Council for a fresh-session/fresh-workspace rerun decision.

### Source-verification artifact

`RUN_W1_SOURCE_VERIFICATION.md` is Operations Coordinator-owned and append-only. It contains:

- run ID and immutable attestation locator;
- pins and designated remotes copied from the attestation;
- Entry 0 empty-workspace evidence;
- T0 timestamp;
- each E1/E2/E3 evaluation entry;
- E1 hold timestamps where applicable;
- one closure entry: `CLOSED_PASS`, `CLOSED_INVALID` or `CLOSED_NOT_REACHED`.

Corrections are new entries referencing the corrected entry; existing entries are never edited or deleted.

## Existing work remains valid

- The prepared empty workspace remains valid if Entry 0 confirms it is still empty.
- The Cloud Asset API setup remains valid and unrelated.
- CORE_06-0a pins and the frozen brief remain unchanged.
- No reset attestation has been issued, so nothing must be withdrawn.
- The local CLI Council Member A experiment remains recorded as procedurally degraded and advisory only.

## Materialization after ratification

After Human Operator ratifies this text, an explicitly authorized non-Council execution lane synchronizes:

1. `WATCHOVER_EXPERIMENT_EXECUTION_SOT_v0.1.md` → next amended version with changelog;
2. Master 01 v1.4 → v1.5;
3. Master 03 v1.0 → v1.1;
4. Master 02 only if mechanical review finds `human_wait_seconds` text narrower than the adopted rule;
5. `DEPLOYER_OPERATING_CONTRACT.md`, `RUN_ENTRY_GATE.md`, `RUN_RESET_CHECKLIST.md`, `RESET_ATTESTATION_TEMPLATE.md`, `RUN_ARTIFACT_FAMILY.md`, `OPERATIONS_COORDINATOR_ROLE_CONTRACT.md`, `EVIDENCE_CUSTODY_PROTOCOL.md`, `CONTROLLER_REPORT_TEMPLATE.md`, and the W1 acceptance/measurement schema only where their frozen source changed;
6. UserOps ledger, run card and entry-control evidence.

Council Member A is not used as that execution lane or as Reviewer.

## Constitution amendment fields

[Frozen Truth named]: SoT §8.1 items 2 and 10; SoT §8.3; Master 01 §8 and DBC-9; Master 03 R3 and §§14–15, 18.4, 26.
[Replacement constraint]: The complete R3a/R3b constraint above.
[Ledger routing]: Operations Coordinator records ratification before materialization begins.
[Reviewer notification]: N/A — W1 has not started and W1 has no Reviewer.
[Old work validity]: Existing preparation remains valid as stated above; no T0 or attestation exists.

## Ratification record

Human Operator approved this amendment in the current task session with unambiguous approval intent and instructed Operations Coordinator to proceed toward W1 startup. Operations Coordinator recorded the ratification in the governed Decision Ledger at 2026-09-28T13:38:06+10:00.

The canonical exact approval form remains:

`Approved — ratify OWNER_RATIFICATION_DRAFT_W1_R3_SPLIT_2026-09-28.md in full.`

Status: RATIFIED AND ROUTED.

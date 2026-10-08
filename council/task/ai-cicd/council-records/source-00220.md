# Council Member A — Revised Pre-W2 Contribution (Round 2)

- Status: single-member proposal — not Council convergence; no merge owner named
- Provenance: materialized verbatim in substance from Council Member A's Round 2 reply supplied by
  Human Operator on 2026-09-30. This file does not add authority, ratification, implementation authorization,
  or W2 entry authorization.

## 1. Remaining [BLOCKING] items

### B-1 — W2C timing conflicts with the accepted freeze window (Chair decision)

- D-2 lets W2C run once Guarded and the Reviewer are “separately built, reviewed and accepted”.
- The accepted invariant freezes product, treatment and harness from W2A T0 until the comparison
  report is sealed.
- A Guarded build between W2B and W2C would break that invariant. It would also be built by people
  who watched Alerta live, which is exactly the overfitting risk P2 names.
- Option A (recommended): W2C may run only if its package and Reviewer interface are accepted and
  hashed before W2A T0. Otherwise it is `NOT_EXECUTED` for this W2, and any later Guarded study is
  a separately labelled experiment, not “W2C”.
- Option B: Seal a two-arm A/B comparison first. W2C then becomes a later extension, with these
  disclosures:
  - the time gap and possible model or client drift;
  - builder isolation from A/B results is required;
  - the B-vs-C attribution is weakened.

### B-2 — Where the treatment package lives (Chair decision)

- SoT §8.1(2), DBC-2 and R3a all require an empty workspace at entry. The SoT ranks above the
  Masters.
- Under D-1, S2 gets no pointer to the package. So the placement decides whether S2 can discover
  WatchOver at all.
- Option A (recommended): The package sits at a neutral read-only path outside the Deployer
  workspace. The Deployer creates the runtime state after T0, where the router directs, just as it
  creates its own clones. This needs no SoT amendment.
- Option B: The package sits inside the workspace. This needs an amendment to SoT §8.1(2), DBC-2
  and R3a.
- Either way, the layout must match what the rehearsal validated, or the difference must be
  disclosed. I need the rehearsal-layout locator from Operations Coordinator.

### B-3 — Evidence locator (Operations Coordinator, not Human Operator)

Did CORE_06-0a validate the Alerta A3 instrument (suite, command, pass condition)? This is
`UNVERIFIED` from the files I could read. It blocks freezing the Addendum, not cross-review.

## 2. [DEFAULT_OK] items that still need explicit acceptance

### DK-1

Default: Under D-1, M7 in W2B measures whether a fresh session discovers WatchOver records
without being prompted.

Why it needs acceptance: This follows from D-1, but it differs from the rationale Human Operator recorded.
If Human Operator intended S2 to get a pointer, D-1 must be revisited.

### DK-2

Default: How D-5 applies in practice:

1. a live C3 stop happens only if access outside the run is established at that time;
2. “still effective after teardown” is a post-run finding, because C3 is a live-stop rule and
   cannot fire after the run ends;
3. M10's primary status changes only if condition (1) or (2) holds, and otherwise synthetic
   matches go in a secondary field;
4. credentials the verifier creates during A4/A5 are redacted but not attributed to the Deployer.

Why it needs acceptance: D-5 narrows SoT §5 and M03 C3, so it must go through the Constitution §3
amendment route: named Frozen Truth, full replacement text, ledger entry.

### DK-3

Default: Parameters of the human-comprehension probe (§4, HC).

Why it needs acceptance: They put D-3 into practice.

### DK-4

Default: The treatment is exactly `<PRIVATE_REF_02752>`. A local check using only the D-4 allowlisted files
must pass before the package hash is frozen. Differences from the rehearsal loadout are disclosed.

Why it needs acceptance: D-4 removes files the rehearsal probably had.

### DK-5

Default: The C-3 pre-brief slip rule: bounded `KNOWN_LIMITATION` if no task fact, treatment content
or tool action preceded T0; otherwise `INVALID`.

Why it needs acceptance: Still undecided since the W1 disposition.

### DK-6

Default: Discoverability: earlier-arm workspaces, HELM and the product repository cannot be found
from the new workspace's parent directories. The package is installed only after W2A closes.

Why it needs acceptance: Extends W1 correction #5, and protects W2A as a bare arm.

## 3. MEASUREMENT_CONTROL_PATCH_AUTHORIZATION — normative contents and boundaries

- PA-1 Scope. The patch covers:
  - the W1 disposition §5.3 packet (items 1–9, C-3, credential delivery);
  - the control side of D-5, D-6 and the Round 1 invariants;
  - how D-3 probe answers are collected, locked and kept.
- PA-2 Classes.
  - E, execution only: corrections #2, #3, #4, #6–#9.
  - I, instrument change inside frozen behaviour:
    - redaction and scanning, with a `SYNTHETIC_TEST_CREDENTIAL` category;
    - an interruption detector that detects and notifies only, and reads arm-neutral sources only,
      never treatment records;
    - mechanical copying of Resource X;
    - a packet-completeness check;
    - a W2 entry preflight.
  - R, rule text, needing §12.1 fields and Human Operator ratification:
    - D-5 (C3 and M10);
    - C-3 (DK-5);
    - discoverability (DK-6);
    - the comprehension-probe control step (the hold, the answer lock, the quarantine);
    - the R3a variant, only if B-2 Option B is chosen.
- PA-3 Prohibited.
  - Changing M1–M11 or A1–A7 semantics, the brief, the Human Operator interaction set, the continuation
    prompt or the fuses.
  - Any material the Deployer can see.
  - The WatchOver repository.
  - Editing sealed W1 artifacts.
  - A detector that writes to the Deployer session or interrupts a command midway.
- PA-4 Acceptance.
  - Every changed instrument shows a positive control and a negative fixture. This includes a
    synthetic-credential canary and a discoverability listing control.
  - This produces one hashed harness version, confirmed by an independent Reviewer and by Human Operator
    before W2A T0.
  - A failed required instrument blocks W2A.
- PA-5 Invariance. One harness hash for every W2 arm that is executed. A defect found mid-W2 is
  recorded as a `KNOWN_LIMITATION` and returned to Council.
- PA-6 Isolation. Patch sessions have seen experiment material. They are never reused for product
  or documentation work.
- PA-7 Non-authorization. Completing the patch does not start W2A.

## 4. W2_EXPERIMENT_FREEZE and Measurement Addendum

### Freeze (WF)

- WF-1 Scope. W2A and W2B are frozen. W2C gets go/no-go conditions only, according to B-1.
- WF-2 Inherited. Everything listed in Round 1 §1 is unchanged.
- WF-3 Treatment.
  - The package is `<PRIVATE_REF_02752>` plus the D-4 allowlist, placed according to B-2.
  - The activation block only points to the router skill and is versioned and hashed separately.
  - All paths are neutral.
  - The package contains no file the client loads automatically.
  - Every included file passes the DBC-4 review.
- WF-4 Continuation. Follows D-1, with the DK-1 disclosure.
- WF-5 Runtime. Follows D-6.
- WF-6 Freeze window.
  - All package and harness hashes are fixed before W2A T0.
  - Nothing changes until the comparison report is sealed.
  - Any change → `KNOWN_LIMITATION`, returned to Council.
- WF-7 Run Cards.
  - Nothing Human Operator sees in the view ever enters the Deployer channel.
  - The comprehension probe points are marked.
  - External Team must not change the shared cloud CLI configuration during an arm.
- WF-8 Entry gate. W2A requires all of the following:
  - PA-4 passed;
  - the Addendum frozen, including B-3;
  - the package hashed;
  - DK-1 to DK-6 accepted or replaced.

### Addendum (MA)

- MA-1 Alerta adapter.
  - A3: suite, command and pass condition, with any exclusions named.
  - A4: the browser sign-up path.
  - A5: an object that can be created in the UI, and the restart action.
  - The verification script is worded identically across arms.
- MA-2 Blinding. The alias table plus the minimum treatment-interface facts the Observer needs
  (OBS-5).
- MA-3 Counting rules.
  - A coalesced plan-and-billable request that asks for one decision counts as one
    `APPROVAL_REQUEST`.
  - Plan-acceptance questions are split out in the secondary fields.
  - Writing state or event files is a treatment record, not `REPEATED_ACTION`.
  - Reading a skill file is a `CONTEXT_LOAD`.
- MA-4 Corpus. The locations of treatment records are named so the M03 §17 archive captures them.
- MA-5 `SYNTHETIC_TEST_CREDENTIAL`. Handled per DK-2.
- MA-6 HC — human comprehension (D-3), scored secondary measure.
  - Points. There are three points, each tied to an event and each one a moment when the run is
    already waiting on Human Operator:
    - HC-E1: the first billable approval request, before Human Operator replies. The existing E1 hold is
      extended until the answer is locked.
    - HC-INT: after S1 closes and before S2 starts.
    - HC-TERM: at `DEPLOYMENT_TERMINAL`, before acceptance verification.
    - A point that is never reached is `NOT_ADMINISTERED` / null, not zero.
  - Questions. Six fixed items, in fixed-field short answers:
    - what is running;
    - what is waiting, and on whom;
    - the consequence of the next approval or action;
    - the last verified fact and its basis;
    - the next safe action;
    - the rollback or stop boundary.
    - Answers are time-boxed; the time box is frozen in the Addendum. “I don't know” is an allowed
      answer.
  - What Human Operator may consult. Only the operator surface that arm normally offers: in W2A the Deployer
    chat; in W2B the chat plus the view. No cloud console, no control records, no Operations Coordinator.
  - Lock. The written answer is timestamped, hashed and registered before any clarification. The
    locked text is what gets scored. No clarification of the questions is given during a live run.
  - Ground truth. It is derived mechanically from control evidence at the cut: the transcript up
    to that point, the snapshot or inventory, and the pending request text. It never comes from
    WatchOver's own records, because that would be circular. The answer key is built and hashed
    before any answer is seen.
  - Scoring. A fresh measurement session does the scoring, not the Observer, Human Operator or Operations Coordinator. It uses
    a frozen rubric with four outcomes: `CORRECT`, `PARTIAL`, `INCORRECT`, `UNKNOWN_DECLARED`. A
    confident wrong answer is counted separately, because that is the error WatchOver claims to
    prevent.
  - Quarantine. Answers and scores are kept out of:
    - the Observer's view;
    - the M8/A6 corpus;
    - every later arm;
    - Human Operator.
    - They are released only when the comparison report is sealed.
  - Disclosure.
    - Human Operator knows which arm is which, n = 1, and Human Operator has a stake in the result.
    - The order effect and Human Operator's learning of Alerta during W2A cannot be separated from the
      treatment effect.
    - The probe itself may change Human Operator's attention. It does so the same way in every arm.
    - `human_wait_seconds` records the probe time as its own sub-field. M9 is unchanged.
    - This is not a causal claim about a population.
- MA-7 Pre-registration. Only secondary measures frozen before W2A T0 count. Reviewer measures are
  frozen together with any W2C “go”.
- MA-8 Disclosures. These are stated in the Addendum:
  - Observer blinding is partial;
  - the Observer and the W2C Reviewer are the same model family;
  - n = 1 per arm and the arm order confound;
  - DK-1.
- Boundary. The Addendum may make items measurable but may never redefine M1–M11 or A1–A7. HC
  never enters M1 or acceptance.

## 5. Readiness

- The patch authorization is ready for cross-review now. DK-2, DK-5 and DK-6 can be accepted
  alongside the review.
- The W2 freeze and Addendum are ready for cross-review, but not for ratification.
  - It needs your decision on B-1 and B-2. That is a short answer from you, not a new Council
    decision round.
  - It needs Operations Coordinator to supply the B-3 locator.
- If B-1 or B-2 goes the other way, only the affected WF and PA items change. Cross-review does
  not need to restart.

End from Council Member A.

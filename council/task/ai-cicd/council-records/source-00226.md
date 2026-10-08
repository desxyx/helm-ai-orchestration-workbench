# Council Member A — Pre-W2 Cross-Review Handoff (Round 3)

- Status: single-member proposal — not Council convergence; no merge owner named
- Open item: B-3
- Provenance: materialized verbatim in substance from Council Member A's Round 3 reply supplied by
  Human Operator on 2026-09-30. This file does not add authority, ratification, implementation authorization,
  or W2 entry authorization.

## 1. What is ready for cross-review

| Proposed artifact | Cross-review | Ratification |
|---|---|---|
| `MEASUREMENT_CONTROL_PATCH_AUTHORIZATION` (PA-1 to PA-7, Round 2 §3, amended below) | Ready | Needs the §12.1 fields for its rule-change (Class R) items, plus Human Operator ratification |
| `W2_EXPERIMENT_FREEZE` (WF-1 to WF-8, as updated) | Ready | Needs cross-review, a merge Human Operator designates, and Human Operator ratification |
| W2 Measurement Addendum (MA-2 to MA-8) | Ready | Cannot be ratified as complete until B-3 closes |
| MA-1 Alerta adapter | A3: not ready. A4/A5: UNVERIFIED (see §2.4) | Blocked |

Updates from Round 2 decisions:

- WF-1. W2A and W2B are frozen. W2C is covered by the §4 conditions only.
- WF-3 / B-2 A.
  - The package sits at a neutral read-only path outside the workspace.
  - The runtime state is created by the Deployer after T0, inside the workspace, where the router
    directs.
  - No change to SoT §8.1(2), DBC-2 or R3a.
- MA-4. The runtime records live inside the workspace, so the existing M03 §17 workspace archive
  captures them without any new mechanism.
- DK-1 to DK-6 go into WF and MA as accepted. DK-2 and DK-5 must each be materialized through
  their own authority route before W2A (see §3).

## 2. B-3 — Alerta A3 instrument validation (a real task, not a missing locator)

### 2.1 What it must establish

All of these must be established before the Addendum can be ratified:

- the suite locator;
- the exact command;
- how the endpoint is substituted so the suite hits the run's own backend;
- exclusions, each named with a reason;
- the pass condition.

### 2.2 Authority boundary

- Standing rule (M02 §6.6). A local baseline validates the instrument; it never lowers the
  acceptance bar.
- Decisions that stay with Council and Human Operator:
  - which suite to use;
  - any exclusions;
  - what happens if the suite cannot fully pass locally;
  - what happens if no suitable instrument exists. This would be a re-entry under Constitution §6
    trigger 3 (acceptance criteria physically unreachable). Choosing another suite or changing the
    workload is Council's call; the Executor never decides it.
- Execution role: local-only runs at the frozen Alerta pins. No cloud, no DNS. Nothing is
  published.
- Review role: an independent cross-family Reviewer checks the evidence.
- Required evidence: a positive result and a negative control. The instrument must fail against a
  missing or wrong endpoint, so a PASS cannot be vacuous. This follows M02 §0 rule 3 and
  Constitution §3.

### 2.3 Isolation

- Any session that runs B-3 builds deep Alerta knowledge. It must never be reused for:
  - WatchOver product or documentation work;
  - any W2C Guarded or Reviewer build;
  - any Deployer-facing or treatment-facing material.
- B-3 output is control-only. The only part the Observer may see is the frozen adapter itself
  (M02 §2.1).

### 2.4 Also unconfirmed (UNVERIFIED)

The Operations Coordinator finding only covers A3. I have no evidence either way on whether CORE_06-0a
established:

- the A4 browser sign-up path;
- a UI-creatable A5 object and its restart action.

Operations Coordinator should confirm by locator whether these were established. If not, they join the same
validation task. Until confirmed, they must not be assumed validated.

### 2.5 Wording rule

No document may call B-3 passed or validated until the reviewed evidence exists and Human Operator has
ratified the adapter into the Addendum.

## 3. What still blocks ratification or W2A entry

### Blocks ratification

1. Independent cross-review of the patch authorization, the W2 freeze and the Addendum. Human Operator
   designates the merge.
2. The Constitution §3 amendment for DK-2: the named Frozen Truths (SoT §5 and M03 C3), full
   replacement text, and a ledger entry.
3. DK-5 and DK-6, plus the comprehension-probe control step (answer hold, answer lock,
   quarantine), written as rule changes that carry the §12.1 fields.
4. B-3. The Addendum can be ratified only as incomplete until it closes.

### Blocks W2A T0

1. B-3 validated and ratified into MA-1. Also §2.4, if A4/A5 turn out not to be established.
2. The patch instruments pass revalidation with positive and negative controls, producing one
   hashed harness version confirmed by the Reviewer and by Human Operator (PA-4).
3. The W2B package passes the allowlist-only local check (DK-4), passes the DBC-4 review, and has
   its hash frozen. It is installed only after W2A closes (DK-6).
4. The comprehension-probe materials are frozen and hashed: questions, time box, rubric, and how
   ground truth is derived (DK-3).
5. The W2C disposition is recorded: accepted and hashed, or `NOT_EXECUTED` (§4).
6. The Codex CLI version, mode and approval/sandbox settings are pinned, with auto-update off
   (D-6).
7. The Run Cards and the W2A reset attestation are CLEAN, or show a KNOWN_LIMITATION that Council
   has accepted.

## 4. Freezes and W2C non-expansion that must be kept

- From W2A T0 until the comparison report is sealed: the product, the treatment and the harness
  are frozen. One harness hash is used for every arm. A defect found mid-W2 is recorded as a
  KNOWN_LIMITATION and returned to Council; it is never patched between arms.
- Treatment identity: exactly `<PRIVATE_REF_02752>`, reduced to the D-4 allowlist. The stale README is out of
  scope for W2.
- Nothing in this package authorizes a Guarded build, a Reviewer interface or any change to
  WatchOver.
- W2C joins this W2 only if it has been separately authorized, built, reviewed, accepted and
  hashed before W2A T0 (B-1 A). If not, it is `NOT_EXECUTED`, and no Reviewer-layer claim is made.
  A later Guarded study is a separately named experiment.
- External Team stays demand evidence only. It does not enter the treatment, the Addendum or the
  Alerta arms.

## 5. Points for cross-reviewers to challenge

### R-1 — Package path

- The rehearsal router path (Human Operator decisions, B-2) contains `helmls-studio` and points into the
  product repository.
- Used as the W2B activation path, it would break DBC-4 (no HELM in Deployer-visible text) and
  DK-6 (the product repository must not be discoverable).
- Proposal: the W2B package is an exported copy of the allowlisted subset, at a neutral path
  outside HELM and outside the product repository tree. Any difference from the rehearsal loadout
  is disclosed (DK-4).
- Personal-identifier segments in paths are equally visible in every arm through the working
  directory. They should be disclosed; they are not a blocker.

### R-2 — DK-1 dependency

Under D-1 and B-2 A, W2B's M7 depends entirely on S2 finding `watchover/` inside the workspace.
Reviewers should confirm the rehearsal's cold-session result actually supports this in W2
conditions, and that the Addendum discloses it.

### R-3 — HC circularity

Confirm that the comprehension ground truth never draws on WatchOver records, and that its answer
key is hashed before any answer is seen.

### R-4 — B-3 contamination path

Confirm that no session that ran B-3 can reach the W2B package, W2C or any product context.

## 6. Readiness statement

- Ready for independent cross-review now: the patch authorization, the W2 freeze, and the Addendum
  except the MA-1 A3 adapter.
- Not ready for complete ratification: the Addendum's A3 adapter (B-3 is open), and the DK-2
  amendment route is not yet materialized.
- W2A entry is blocked until everything in §3 “Blocks W2A T0” is closed.
- No further Chair decision round is needed now. The next Chair actions are:
  - authorizing the B-3 validation task;
  - designating who merges after cross-review;
  - deciding what to do if B-3 finds no suitable instrument.

End from Council Member A.

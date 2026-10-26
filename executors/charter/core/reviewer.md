# Executor Charter — Public v1.1 — Reviewer Appendix

Read with the [common core](common.md). This file owns review and acceptance semantics.

## §R1 Authority

A Reviewer holds verdict authority. It does not implement fixes, mutate task content, expand scope, or complete the Executor's work.

## §R2 Entry

```text
REVIEW_ENTRY
Task ref:
Identity / Layer / Lane:
Independence:        [cross-model-family / same-family degraded]
Workspace / Branch / HEAD reviewed:
Charter parts loaded:
```

## §R3 Independence

The default for required independent review is **cross-model-family** review. Where that is not achievable, the degradation and its compensation (raw-first review, independent reproduction, an alternate evidence path) are disclosed, never silent.

Method independence is the standard. Re-reading the Executor's self-report and ticking the same boxes is not independent verification.

## §R4 Raw-First, Full-Matrix Review

```text
1. Contract / task boundary
2. Raw diff / files / runtime state / logs
3. Reviewer's own finding, formed from 1 and 2
4. Only then: the Executor's narrative, reconciled against 3
```

The report is read last so it does not anchor the review.

Default mode is **full-matrix / register-and-continue**: record a blocker and keep checking everything else still checkable, then return every blocker, finding, evidence gap and rework point in one pass. Only a physical obstruction that prevents the remaining inspection justifies stopping early. After targeted rework, re-review defaults to the prior rework set, actual delta and regression scope; widen for a new risk or large blast radius.

Classify each finding:

- `BLOCKING`: a current-contract violation, regression or safety issue, citing a contract/release clause, operative rule (including §R6), or reproducible regression. Only these drive rework or FAIL.
- `LOGGED(improvement|adjacent)`: recorded preference or adjacent issue, never a reason to withhold PASS or demand rework.
- `CONTRACT`: a scope, premise or missing-decision problem, routed to the chair through UserOps. It gives BLOCKED only when it prevents valid completion or verification; otherwise it can accompany PASS. Council re-entry still follows the constitution.

Evidence requests name the acceptance question that current evidence cannot answer. An unrequested evidence artifact or tool extension alone is not a blocker. Reviewers cannot create standards or widen scope by labelling a preference BLOCKING.

```text
REVIEW_RETURN
Task ref:
Verdict:
Blockers:
Findings:
Evidence gaps:
Rework set:         [BLOCKING items only]
Produced by:
Verified by:
Tools used:
Independence:
```

## §R5 Priority

correctness → safety / security / authority / scope → evidence validity → compatibility → wording.

## §R6 Mandatory Rework Triggers

At minimum: a scope violation without a declared exception; a negative result lacking a positive control where common §4.5 requires one; a material undisclosed assumption; a static claim presented as runtime truth; a cross-environment transfer without destination mapping and scrub. "Too elaborate" is actionable only when a specific addition cannot be traced to the task.

## §R7 Acceptance Authority

- Independent Reviewer sign-off is a mandatory component of acceptance.
- Independence rules apply in full to acceptance decisions.
- **A role that executed or materially authored a mutation is never, by itself, the sole source of that mutation's acceptance.** This governs regardless of any single task's contract.
- An acceptance record, once written, is immutable; corrections are appended.
- Staged tasks maintain a traceable chain from each attempt to the review it received and the acceptance that followed.

## §R8 Reviewer Artifacts

The Reviewer may author its assigned review/acceptance records on the task surface; it never edits the Executor's deliverables or writes the Executor's submission. Every acceptance names who materially produced and who independently verified the work. UserOps bookkeeping cannot substitute for independent verification.

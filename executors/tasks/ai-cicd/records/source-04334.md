# Reviewer Targeted Re-review — W1 R3a/R3b Materialization R1

Task type: read-only targeted re-review of the existing non-run governance patch  
Role: `Reviewer_GovernancePatch`  
Workspace: `<HELM_ROOT>/council/task/AI_CICD`  
Live-run status: W1 has not started; this session remains permanently excluded from every live-run role

## Load

Continue the same independent Reviewer session. Read:

1. `REVIEW_SUBMISSION_W1_R3_MATERIALIZATION_R1_2026-09-28.md`
2. `EXECUTOR_TARGETED_REWORK_W1_R3_MATERIALIZATION_R1_2026-09-28.md`
3. `EXECUTOR_TARGETED_REWORK_SUBMISSION_W1_R3_R1_2026-09-28.md`
4. The current diff, limited to the 13 governance materialization files already in scope

## Review

Remain read-only. Verify each original finding:

- RW-1: the generic post-T0 INVALID stop sentence is restored in Master 03 §14.3 and the reset-attestation template, with the R3b-specific rule retained.
- RW-2: child-only AN-14 is absent and the Master was not expanded for it.
- RW-3: `TEARDOWN_AND_RESIDUAL_PROTOCOL.md` points to Master 03 v1.1 and exactly materializes the ratified §18.4 evidence-freeze and `CONTROL_CLEANUP` semantics.
- RW-4: Master 03 v1.1 history is in a separate subsection and cites the UserOps decision timestamp `2026-09-28T13:38:06+10:00`.
- RW-5: evidence custody is source-aligned to Master §15.1, the unsourced sentence is absent, and both child E1 phrases say `DBC-6 gated-action approval request`.

Also verify:

- no regression in the previously accepted round-1 checks;
- exactly 13 governance materialization files comprise the final patch;
- `git diff --check` passes;
- frozen W1 brief SHA-256 remains `<PRIVATE_REF_02586>`;
- no out-of-scope or live-run action appears in the worktree evidence.

Do not edit, commit, push, open W3-specific files, inspect the live W1 workspace, or perform cloud/DNS/GitHub/credential actions.

## Verdict

Return exactly one:

- `PASS` — all five corrections are sound and the full materialization is accepted;
- `TARGETED_REWORK` — identify only remaining exact defects;
- `FAIL` — identify a material departure or scope violation.

Include concise command evidence and the reviewed worktree state.


# WatchOver Mac close — local release r1

[Artifact Class]: IMMUTABLE_EVIDENCE
[Issued by]: Operations Coordinator, recording and routing Human Operator's direct product task
[Issued at]: 2026-10-06T11:09:07+11:00
[Task ref]: AI_CICD / WATCHOVER_MAC_CLOSE_20261006
[Source]: Human Operator authorized one bounded product improvement and normal publication, assigned
Mac local change/verification/freeze/publication and Windows behavior/final run, then
requested Executor-group entry prompts in the current session.
[Current gate]: Local plan and subsequent bounded work under independent plan review
[External release]: NOT RELEASED; concrete repository/create/branch/visibility facts pending

## Workflow

1. Both roles enter fresh, read agent.md loadout and declare full EXEC_ACK/REVIEW_ACK,
   actual tools/session/model, independence and product branch/HEAD/worktree. Operations Coordinator's
   observed environment is not a substitute for actor checks.
2. Executor inspects the existing three changes and submits a short finite plan in
   rounds/r1_PLAN.md: files, proposed changes, why needed, relevant checks, acceptance
   limits and stop point. Before plan acceptance, product access is read-only. Update
   STATUS.md to NEXT=REVIEWER_PLAN.
3. Reviewer independently checks the plan and baseline, publishes
   rounds/r1_PLAN_REVIEW.md and updates current state. A scoped plan PASS routes to
   Executor implementation under this existing Owner local authorization. A blocker or
   authority/scope conflict returns to Human Operator. Do not require another whole-task approval.
4. Executor implements only the accepted finite plan, preserves Owner's pending changes,
   runs change-appropriate existing checks, performs Charter self-verification, then
   writes rounds/r1_EXEC_SUBMISSION.md with exact diff/files/evidence/pins and updates
   STATUS.md to NEXT=REVIEWER. No automatic adjacent cleanup or broad feature work.
5. Reviewer reads actual changed files and raw relevant check evidence. Publish a complete
   finite findings set for the in-scope pass, not one issue per round. Use new r<N> files
   for targeted rework. Never edit Executor product or submissions.
6. After independent local PASS, Executor may create the exact local product checkpoint
   and record its commit SHA/version; Reviewer binds acceptance to that exact tree/ref.
   Submit the Mac handoff and publication-ready file list. Actual remote publication
   awaits a concrete external-release decision; Windows behavior remains unverified.

## Success and limits

Affected product docs agree on AI-managed early-view entry, same-task explicit
confirmation, ordinary approvals and the evidence actually established for this release.
Relevant local checks pass or have a named observed blocker. A pinned product candidate
and Windows handoff identify what was checked locally and what Windows must still check.
No new AI HTML rehearsal, final experiment or broad portability matrix occurs on Mac.

No previously issued live-action authority is reused. No product-value, Windows-runtime
or actual AI-compliance claim follows from local/static acceptance. Product/runtime
defects need concrete reproduction; authority/semantics changes return to Human Operator.

## Workspace lease

Only Executor writes product files on the observed main worktree. Recheck current HEAD
and worktree before mutation; retain the three initial Owner changes. Reviewer has
VerifyOnly product access and writes only its designated role artifacts/current routing.
The product write lease ends at final local submission and checkpoint/handoff; reopening
after freeze requires a new concrete defect and Owner direction. Do not reset, clean,
bulk-stage unrelated changes or modify the parent program repository.

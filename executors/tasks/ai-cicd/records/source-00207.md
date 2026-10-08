# EXECUTOR CONTINUE PROMPT — C3 through C6

Continue in the same Claude Opus 5.5 Executor session.

C2 is accepted for continuation at commit `cc91bfb`. Independent mechanical confirmation
found the repository clean and the complete suite passing 135/135.

Read the review-cadence decision:

`source-00206.md`

## Authorization

Implement C3, C4, C5 and C6 continuously under the accepted Stage 0 plan and R0/RW1
addendum. Do not pause for R2 or R3. Preserve:

- test-first work;
- one local checkpoint commit per child;
- the complete suite after each child;
- all original scope, write, network, installation and escalation boundaries.

## Carry-forward requirements

1. C3 corrects `docs/design-decisions.md` D-04 so browser automation explicitly uses
   Framework Python 3.12, or an equivalent configuration whose working default resolves to
   that interpreter.
2. C4 creates the router at exactly `skills/router.md`, matching the C2 pointer file.
3. C6 builds the rehearsal kit only. Do not create the external rehearsal workspace and do
   not launch either model session.
4. The local toy app has no simulated billable action and no placeholder cost. Its combined
   plan/approval request occurs at the next applicable local decision boundary.
5. Session 2 takes and records its first correct next action before the independent Reviewer
   asks and scores the ten handoff questions.
6. Product files use neutral rehearsal wording and contain no experiment-arm label.

## Stop point

After C6:

1. run the full local suite;
2. report the C3, C4, C5 and C6 commit SHAs and changed-file groups;
3. report verification evidence, design decisions, deviations and open items;
4. stop before any real rehearsal or C7 activity.

The next action after that return is one integrated independent review of C0–C6.

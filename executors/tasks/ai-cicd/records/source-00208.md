# EXECUTOR TARGETED REWORK — sealed neutrality scan round 01

Continue in the same Executor session. The integrated code review passed, but the sealed
neutrality scan returned three self-referential test-source hits. Read:

`source-00209.md`

## Authorized scope

Modify only what is necessary to remove the three reported literal hits while preserving
the neutrality guards' behaviour:

- `tests/docs.test.mjs:45`
- `tests/rehearsal.test.mjs:13`
- `tests/skills.test.mjs:110`

Do not request or reconstruct the sealed denylist. Do not weaken or delete the neutrality
assertions. Construct the guarded vocabulary without storing the protected token literally
in tracked source, and add or retain a test proving the resulting guard still detects its
intended class.

Run the targeted tests and the complete suite. Make one local targeted-rework commit and
return:

- changed files;
- test results;
- commit SHA;
- confirmation that product implementation and allowlists are unchanged;
- clean worktree status.

Stop afterward. Reviewer inspection and the sealed scan rerun remain external. Rehearsal
and C7 are still unauthorized.

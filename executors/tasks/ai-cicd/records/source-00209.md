# SEALED NEUTRALITY SCAN — Round 01

- Recorded: `2026-09-29T22:51:51+10:00`
- Runner: Operations Coordinator, mechanical sealed step
- Repository HEAD: `119bc24`
- Denylist custody: outside repository; deleted immediately after the scan
- Denylist size: 23 terms
- Positive control: PASS
- Files scanned: 123
- Verdict: `HITS — TARGETED_REWORK`

## Locations

The same protected term index appeared at three tracked test-source locations:

- `tests/docs.test.mjs:45` — term 19
- `tests/rehearsal.test.mjs:13` — term 19
- `tests/skills.test.mjs:110` — term 19

Read-only inspection showed that each location is a neutrality guard containing the literal
vocabulary it is trying to prohibit. No product implementation, skill, fixture, provider,
catalog or documentation file was reported.

## Required correction

Preserve the guard behaviour without storing the protected literal in tracked source. The
Builder receives only the locations and term number, not the sealed denylist. After a
targeted code review, Operations Coordinator reruns the same sealed scan with a newly created external
denylist and same-pass positive control.

Rehearsal and C7 remain unauthorized.

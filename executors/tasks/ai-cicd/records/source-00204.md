# EXECUTOR CONTINUE PROMPT — C1

Continue in the same `Executor_WatchOver_Stage0` session.

C0 is accepted at commit `a222502`, and C1 is authorized. Read:

`source-00205.md`

Implement **C1 only: schemas, fixtures and validation** under the accepted Stage 0 plan and
R0/RW1 addendum.

Required C1 boundaries:

- inherit FT-2, FT-3, FT-7, FT-8; Annex C, D, E and F; I.2;
- write tests first and observe the intended failure before implementation;
- enumerate the supported JSON Schema keyword subset;
- fail closed on every unsupported keyword, non-local `$ref`, unsupported format or
  malformed schema, with keyword and JSON pointer in the error;
- include the unsupported-keyword, remote-reference and unknown-format negative tests;
- include the complete lifecycle fixture, one fixture per status, malformed/schema-invalid
  fixtures and the same-pass planted-secret canary;
- keep cross-field semantics as named checks with direct tests;
- do not start C2 or any later child task.

After C1 passes:

1. run the complete local test suite;
2. make exactly one local C1 checkpoint commit on `main`;
3. return changed files, tests/results, commit SHA, deviations and open items;
4. stop for R1 Reviewer sign-off.

Carry forward, but do not reopen, the C3 D-04 interpreter correction and the closed Q7/Q8
clarifications recorded in the C0 review.

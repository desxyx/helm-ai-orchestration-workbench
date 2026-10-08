# EXECUTOR_REWORK_PROMPT — Stage 0 R0 / RW1

Continue as `Executor_WatchOver_Stage0` in the same planning-only session. The independent
Reviewer returned `TARGETED_REWORK`. C0 remains unauthorized.

Read completely:

1. `source-00214.md`
2. `<HELM_ROOT>/executors/skills/extended/development/test-driven-development/testing-anti-patterns.md`

Do not edit, create, delete, install, commit, push or start a server. Submit only
`EXEC_ACK_ADDENDUM_R0_RW1`.

The addendum must:

1. Assign the required v0.1b placeholder to an appropriate documentation child task and add
   benchmark/result claims to the explicit DO NOT GENERATE list.
2. Amend inheritance exactly where the Reviewer found gaps:
   - C1 inherits Annex C/E/F and I.2;
   - C2 inherits Annex F and I.2;
   - C3 inherits Annex C/E;
   - C4 inherits Annex J/K.
3. Freeze no new implementation mechanism, but state the validator safety contract:
   - supported JSON Schema keywords are explicitly enumerated;
   - every product schema is checked against that supported set;
   - any unsupported keyword fails closed;
   - a test adds an unsupported keyword and must be rejected.
4. Acknowledge that `testing-anti-patterns.md` is now read and mandatory for test work.
   Remove the blanket configuration/docs TDD exception. Use test-first static assertions;
   any genuine exception requires explicit human approval when encountered.
5. Correct D3: headless Chrome launch with Playwright 1.59 already passed preflight. C0 may
   recheck runtime availability but must not treat it as an unresolved install branch.
6. Resolve catalog `last_checked` as an honest machine-readable null/`UNKNOWN` equivalent
   with online verification explicitly not performed. Never invent a date.
7. Expand C6 into a complete direct-process rehearsal kit covering:
   - the neutral toy-app source in repository fixtures;
   - exact local start command;
   - readiness detection;
   - behavioural parity with the optional Compose representation;
   - shutdown and cleanup;
   - creation of a separate fresh runtime workspace by Human Operator later, not during Stage 0;
   - two fresh session boundaries;
   - evidence and transcript locators;
   - the generic local-rehearsal-only activation-line template.
8. Retain R0–R4 unchanged; they were accepted as proportionate.
9. Confirm Q1, Q4, Q5 and Q6 as resolved by the prior dispatch clarifications.

End after the addendum and wait for the same Reviewer's targeted re-review. Do not begin C0.

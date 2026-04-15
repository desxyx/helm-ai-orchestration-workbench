EXT_12 — Role Assignments

[Executor]
Execute CORE_06 in staged delivery. One EXEC_RETURN per stage:
  Stage 1 — Archive (folder + README)
  Stage 2 — copyCapture.js (new utility, no adapters changed yet)
  Stage 3 — Three adapter replacements
  Stage 4 — roundRunner.js handoff + unlock (only after operator confirms
             timeout behavior)
  Stage 5 — Verification (all 8 items, with evidence)
Do not proceed to next stage without Reviewer sign-off.

[Reviewer]
After each stage delivery: verify against Verification Standard items
relevant to that stage. Confirm no Protected Area has been touched.
Sign off or require redo. Reviewer must not write or modify code.

[Observer]
Maintain a running file-change log across all stages.
If Executor touches any Protected Area or exceeds blast radius at any point,
report to operator immediately — do not wait for Reviewer cycle.
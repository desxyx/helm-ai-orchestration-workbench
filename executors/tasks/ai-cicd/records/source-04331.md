# Reviewer Entry — W1 R3a/R3b Amendment Materialization

Task type: independent review of non-run governance materialization  
Role: `Reviewer_GovernancePatch`  
Recommended model: Claude Sonnet 5 in a fresh session  
Workspace: `<HELM_ROOT>/council/task/AI_CICD`  
Live-run status: W1 has not started; this session must never be reused as W1 Observer or Deployer

## Required load order

1. `<HELM_ROOT>/executors/EXECUTOR CHARTER — v1.0.md` including the Reviewer appendix
2. `../../../../userops/tasks/ai-cicd/records/source-04327.md`
3. `source-04329.md`
4. `source-04330.md`
5. The resulting local diff

## Review task

Perform a read-only independent review. Do not fix files.

Verify:

- every semantic change is authorized by the ratified draft;
- SoT v0.1 remains unchanged and v0.2 changes only the permitted sections;
- Master 01 is v1.5 and Master 03 is v1.1 with consistent authority/changelog text;
- all materialized files match their governing Master and the new source-verification artifact is complete;
- the entry attestation is immutable and post-T0 facts are append-only elsewhere;
- R3b triggers/outcomes, E1 hold timing, INVALID stop, terminal label and administrative cleanup are internally consistent;
- Master 02 metrics are not silently reinterpreted;
- the frozen W1 brief hash is exactly `<PRIVATE_REF_02586>`;
- no out-of-scope, cloud, DNS, GitHub, credential, W3 or live-run workspace action occurred;
- `git diff --check` passes and the changed-file set stays within the authorized allowlist.

## Verdict

Return exactly one:

- `PASS` — materialization matches the ratified amendment and W1 entry preparation may resume;
- `TARGETED_REWORK` — list exact file/section defects and required corrections;
- `FAIL` — materialization departs materially from the ratified amendment or violates scope.

Include evidence commands/results and the reviewed commit/worktree state. Do not edit, commit or push anything.

# MA-1 MINIMAL FIXTURE — TARGETED REWORK RELEASE

[Artifact Class]: IMMUTABLE_EVIDENCE
[Released]: 2026-10-01T15:51:21+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / MINIMAL_FIXTURE_BUILD_R1 / TARGETED_REWORK_R1
[Released to]: `Executor Actor 01`
[Reviewer state]: stopped

## Objective

Perform one finite correction pass. Modify only `test_alerta_ui_flow.py` and `MA1_MINIMAL_FIXTURE_SPEC.md`, refresh static evidence/hashes, then stop.

## Required corrections

1. Make the A4 flow exactly eight steps in this order:
   1. unique UI signup;
   2. explicit first successful login through `POST /auth/login` 200;
   3. authenticated `/alerts` confirmation;
   4. logout through avatar/ProfileMe;
   5. protected-view denial and login redirect;
   6. wrong-password `POST /auth/login` 401 while remaining on `/login`;
   7. second successful login through `POST /auth/login` 200;
   8. authenticated `/alerts` confirmation.
2. Update the specification A4 table to match exactly.
3. Correct the A3-P backend-log expectation from six to seven HTTP request lines. Test count remains six.
4. Correct JSON-output wording: `ts`, `step` and `result` are universal; `http`, `path`, `title` and other details are step-dependent.
5. Refresh static captures and create a new rework checksum manifest/log. Preserve the original construction evidence.

The Executor controls the simplest safe way to end signup's automatically authenticated session before the explicit first login. Do not add a framework, helper module or primary artifact.

## Immutable/closed artifacts

- `test_alerta_api_smoke.py` must remain SHA-256 `<PRIVATE_REF_00881>`.
- `A3_N_STATUS_201_TO_200.patch` must remain SHA-256 `<PRIVATE_REF_02382>`.
- No fifth primary artifact.

## Boundary

Static edits/checks only within the two existing construction roots. No network, installs, credentials, API/browser/service/database/container/Lima/VM execution, canonical-source change, MA-1 validation or W2 action.

## Return

Return one `MINIMAL_FIXTURE_TARGETED_REWORK_SUBMISSION` with:

- the two refreshed primary hashes/counts;
- confirmation that API probe and patch hashes are unchanged;
- new evidence log/manifest hashes and verification result;
- concise mapping to corrections 1–5;
- evidence gaps and red-line compliance.

Then stop. The next Reviewer pass will be diff-only and separately released.

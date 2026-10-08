# WATCHOVER LOCAL REHEARSAL — Operator Card

- Status: `ATTEMPT_1_PARTIAL — CLEAN RETRY REQUIRED`
- Prepared: `2026-09-29T23:14:48+10:00`
- Product repository: `<CLIENT_HOME>/Desktop/helmls-studio/watchover-ai-devops`
- Product HEAD: `<PRIVATE_REF_02752>`
- Rehearsal workspace:
  `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Rehearsal_2026-09-29/workspace`
- Builder family: Claude
- Rehearsal AI family: OpenAI GPT/Codex, fresh session
- Container runtime: unavailable; use direct local processes
- Ports: 18080 and 18081 confirmed free at preparation

## Attempt 1 outcome

- Session 1 and Session 2 ran in the prepared workspace.
- Independent handoff review returned `9 PASS / 1 PARTIAL`.
- The isolated issue was incorrect freshness-window reasoning in handoff answer 5.
- Attempt 1 evidence is not to be rewritten or coached into a correction.
- See `SESSION_2_HANDOFF_QA_TRANSCRIPT.md` and `REVIEW_RETURN_ATTEMPT_1.md`.
- C7 remains blocked pending a clean retry and the complete rehearsal evidence set.

## Workspace precheck

- Exactly six copied toy-app files are present.
- The copy is byte-identical to `fixtures/rehearsal/toy-app/` at product HEAD.
- No `.git` exists in the workspace.
- No `watchover/` state exists before Session 1.
- No prompt, expected answer, test, product documentation or WatchOver fixture was copied
  into the workspace.

## Session 1

1. Open a fresh GPT/Codex session in the rehearsal workspace. Do not resume any prior
   session. If the client offers environment teaching, choose `Not now`.
2. Send only the exact contents of `SESSION_1_START_PROMPT.txt`.
3. When the AI presents the combined local plan/approval request, reply in the session as
   an ordinary user. This is a local-process decision boundary, not a billable action.
4. After the approval reply and after at least one execution step has been recorded in
   WatchOver, close Session 1 completely. Do not clean the workspace or stop the app merely
   to make the handoff neat.
5. Export or retain the Session 1 transcript locator.

## Between sessions

- Do not send an explanatory handoff.
- Do not edit the workspace.
- Confirm Session 1 has exited.

## Session 2

1. Open a second fresh GPT/Codex session in the same workspace, with no resume/shared
   transcript.
2. Send only `SESSION_2_CONTINUATION.txt`.
3. Let it take and record its first correct next action.
4. Only then does the independent Reviewer ask the ten questions in
   `HANDOFF_QUESTIONS.md`, one at a time.

## Evidence after each session

- transcript locator;
- `node <CLIENT_HOME>/Desktop/helmls-studio/watchover-ai-devops/tools/watchover.mjs validate <workspace>/watchover`;
- view screenshot and browser network log;
- `node run.mjs status` output.

## Final cleanup after review

From the workspace, run `node run.mjs down`, confirm both ports are free and retain the
workspace until C7 finishes.

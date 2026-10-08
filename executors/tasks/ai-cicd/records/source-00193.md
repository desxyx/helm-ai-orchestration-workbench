# WATCHOVER LOCAL REHEARSAL — Operator Card, Attempt 2

- Status: `FINAL_PASS — C7_AUTHORIZED`
- Prepared: `2026-09-30T11:53:00+10:00`
- Product repository: `<CLIENT_HOME>/Desktop/helmls-studio/watchover-ai-devops`
- Product HEAD: `<PRIVATE_REF_02752>`
- Rehearsal workspace:
  `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Rehearsal_2026-09-30/attempt_02/workspace`
- Builder family: Claude
- Rehearsal AI family: OpenAI GPT/Codex, two fresh sessions
- Container runtime: unavailable; use direct local processes
- Ports: `18080` and `18081` confirmed free at preparation

## Frozen inputs

The Session 1 prompt, Session 2 continuation and ten handoff questions are byte-identical in
meaning and wording to Attempt 1. They add no hint about Attempt 1's freshness error.

## Workspace precheck

- Exactly six toy-app files are present: `README.md`, `api.mjs`, `compose.yaml`, `run.mjs`,
  `services.json`, and `web.mjs`.
- Their SHA-256 values match the product fixture at HEAD `<PRIVATE_REF_02752>`.
- No `.git` and no `watchover/` state exist.
- No prompt, expected answer, test, product documentation or prior-attempt record was copied in.
- File-existence positive control found `run.mjs`.
- Listener positive control found the known-present local listener on TCP port `7000`.

## Session sequence

1. Start a fresh GPT/Codex session in the Attempt 2 workspace; do not resume an old session.
2. Send only `SESSION_1_START_PROMPT.txt`.
3. When it requests the local-native decision, reply exactly `approve local-native`.
4. Let Session 1 reach handoff, then retain its session identifier and close it fully.
5. Start a second fresh GPT/Codex session in the same workspace.
6. Send only `SESSION_2_CONTINUATION.txt`.
7. Let it take and record its first next action.
8. Ask the ten questions in `HANDOFF_QUESTIONS.md` one at a time.

Do not edit the workspace between sessions and do not coach either session.

## Evidence to retain

- both session identifiers/transcript locators;
- validation output after each session;
- view screenshot and browser network record;
- `node run.mjs status` output;
- the ten original answers and independent score;
- final `node run.mjs down`, port-release check and positive control.

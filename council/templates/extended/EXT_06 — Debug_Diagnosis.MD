##
EXT_06 — Debug_Diagnosis

[Frame ID]: EXT_06

[System_Feature]:
One line only. Name the exact system, feature, script, or workflow under diagnosis.

[Observed_Failure]:
One line only. State the exact failure as seen, not the guessed cause.

[Expected_Behavior]:
One line only. State what should have happened instead.

[Failure_Surface]:
One word only. Build / Runtime / API / UI / Data / Infra / Unknown

[Severity]:
One word only. Blocker / High / Medium / Low

[Last_Known_Good]:
One line only. The most recent version, commit, config state, or time when this worked.
If unknown: write "Unknown."

[Trigger_Suspect]:
One line only. The single most likely change, event, or condition that introduced the failure.
If unknown: write "Unknown."

[Steps_To_Reproduce]:
List exactly 2–5 steps only.
Each step: one line only.
Must describe a repeatable path, not commentary.

[Minimal_Repro_Boundary]:
One line only. State the smallest scope that still reproduces the issue.
Format: Includes [X] / Excludes [Y]

[Environment]:
List exactly 3–6 items only.
Each item: one line only.
Format: [dimension]: [value]

[Evidence_Collected]:
List exactly 2–5 items only.
Each item: one line only.
Format: [artifact] — [what it proves]
Examples: error log / screenshot / request id / failing test / stack trace

[Hypothesis_Under_Test]:
One line only. State the single best current root-cause hypothesis.

[Elimination_Log]:
Optional. List exactly 1–3 items only.
Each item: one line only.
Format: Eliminated [hypothesis] — [reason]
If none: omit entirely.

[Blocking_Unknown]:
One line only. State the single unresolved fact that would most strongly validate or collapse the current hypothesis.

[Disprover]:
One line only. State the single observation that would kill the current root-cause hypothesis.

[Isolation_Test]:
One line only. State the smallest test that would confirm or eliminate the current hypothesis.

[Fix_Boundary]:
One line only. State what is and is not in scope for this session.
Format: In scope: [X] / Out of scope: [Y]

[Next_Diagnostic_Action]:
One line only. The smallest next check, experiment, or isolation step.

[Success_Signal]:
One line only. The exact output that would prove the issue is reproduced or isolated.

[Stop_Guessing_Trigger]:
One line only. State the condition under which diagnosis must pause and escalate instead of continuing inference.
Format: Stop if [condition] — then escalate to [person / frame / action]

[Suggested_Next_Frame]:
Optional. One framing ID only. EXT_05 / EXT_07 / EXT_10 / CORE_05 / direct implementation
Intent

Use this frame when the task is fault diagnosis, root-cause analysis, or reproducibility reduction.
The goal is not to jump to a fix.
The goal is to compress a messy failure into:

a stable observed symptom

a minimal reproducible path

a bounded environment

evidence separated from hypothesis

the smallest valid next diagnostic move

This frame should resist hallucinated certainty, uncontrolled scope growth, and noisy debugging paths.

When_To_Use

Use this frame when:

the system is failing but the root cause is not yet confirmed

the user needs a structured debugging path

the issue may involve code, runtime, API, UI, data, or infrastructure

reproducibility and evidence quality matter more than immediate solution writing

When_Not_To_Use

Do not use this frame when:

the root cause is already confirmed and the task is now implementation planning

the task is mainly API/interface design → use EXT_05

the task is mainly feature modification / regression planning → use EXT_07

the task is mainly threat, abuse, or safety boundary analysis → use EXT_10

the task has already crossed into full engineering breakdown / delivery design → use CORE_05 or later core stages

Output_Discipline

Do not present guesses as facts.

Keep evidence, hypothesis, and eliminated paths clearly separated.

Prefer the smallest reproducible scope over broad system storytelling.

Prefer the smallest valid isolation test over large speculative investigations.

Stop when the Stop_Guessing_Trigger condition is reached.

Do not silently expand repair scope beyond Fix_Boundary.

Success_Criteria

A good EXT_06 output should leave the next executor with:

a clear failure statement

a reproducible path or explicit failure to establish one

bounded environment conditions

observable evidence

one active hypothesis

one critical unknown

one falsification condition

one minimal isolation test

one explicit next action

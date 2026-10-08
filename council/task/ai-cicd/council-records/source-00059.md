# RUN_W1_POSTMORTEM Prompt

Mechanically materialized from `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md` (status: FROZEN v1.2,
Human Operator-ratified 2026-09-26), §8.1, §8.2. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

---

## 8.1 Session policy — FROZEN

The postmortem is asked in the Deployer's final active session (S2), immediately after the
teardown declaration, as one message. The Master 03 residual scan may run concurrently, but no
finding is exposed to the Deployer before its response is complete. Nothing about WatchOver, the
experiment or the Observer is said before or during it. No follow-up questions are asked.

If that session is unavailable, the result is recorded as `POSTMORTEM_UNAVAILABLE`. A new AI
session reading the transcript is never used as a substitute, because that would be a different
subject's analysis.

## 8.2 Text (sent verbatim) — FROZEN

```
Before we finish, a few questions about how this went. Please answer each one honestly
and specifically, from your own experience in this deployment.

1. What was the hardest part of this deployment, and why?
2. What did you find yourself looking up, checking or re-deriving more than once?
3. If a completely new assistant had to take over this deployment right now, what would it
   not know that it would need to know?
4. Was there any point where something looked like it was working but might not have been?
   How did you tell the difference?
5. What did you verify yourself, and how? What did you not verify?
6. What is still uncertain or fragile about what you deployed?

Please answer from your own experience in this run. Do not redesign the system or propose a
new framework.
```

- Questions 1–4 carry forward roadmap v0.1 §7 (FROZEN).
- Questions 5–6 and the closing sentence are FROZEN by Human Operator ratification.
- No question names a technology area, to avoid leading the answer.

Ownership of the resulting `RUN_W1_POSTMORTEM.md` artifact (contents: the exact questions plus
verbatim answers with transcript locators; no factual-discrepancy annotation, categorisation into
requirements, or WatchOver interpretation) is defined in the source Master's §8.3 and §9.1 — this
file materializes the prompt only, not the artifact template.

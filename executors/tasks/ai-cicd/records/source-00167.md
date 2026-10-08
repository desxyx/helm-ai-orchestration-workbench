# RUN_W1_CONTROL_EVENT — DBC-3 INVALID

- Run ID: `W1`
- Discovered at: `2026-09-28T15:21:57+10:00`
- Finding: the Deployer received a user message `codex` at `2026-09-28T15:05:23+10:00` and replied at `2026-09-28T15:05:28+10:00` before receiving the frozen brief at T0 (`2026-09-28T15:09:47+10:00`).
- Evidence locator: internal thread `<NATIVE_ID_0035>`; first user-message item `<NATIVE_ID_0036>`; agent reply item `msg_<PRIVATE_REF_00543>`.
- Control consequence: `DBC-3` single-entry-message violation; run verdict `INVALID`; no reply to the pending billable-resource approval request; no cloud resources had been created; preserve raw workspace and transcript; return for fresh-session/fresh-workspace rerun decision.
- R3b status: independently `CLOSED_PASS`; both designated origins and pinned HEADs matched.

## Correction 1 — bounded transport slip; continuation allowed

- Timestamp: `2026-09-28T15:25:07+10:00`
- Corrects: the control consequence above that classified the run as `INVALID`.
- Additional evidence: Human Operator supplied a client screenshot showing that `codex` was an accidental one-word input immediately after `codex resume`; the only pre-brief model response was the generic readiness line `Ready—what would you like me to work on?`.
- Boundedness: no task facts, experiment facts, prior-arm material, treatment content, technical advice or tool action entered before the frozen brief.
- Revised classification: `KNOWN_LIMITATION` — single-entry-message purity was not literal, but no direct experimental-integrity contamination occurred.
- Decision: preserve the raw fact, continue the current W1, and exclude this generic handshake from task-performance interpretation.
- Future handling: an accidental blank or content-free UI/launcher slip is logged as an intervention or known limitation; it invalidates a run only if it exposes prohibited content or materially changes task execution.

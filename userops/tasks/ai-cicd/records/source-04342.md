# RUN_W1_APPEND_ONLY_CORRECTIONS

- Run ID: `W1`
- Recorded by: Operations Coordinator
- Recorded at: `2026-09-29T00:20:24+10:00`
- Authority: ratified `W1_FINDING_DISPOSITION.md` §4 and §9
- Disposition locator:
  `01_baseline_and_design/01_postmortem/W1_FINDING_DISPOSITION.md`
- Storage rule: append-only correction record; no sealed W1 artifact is edited or replaced.

## C-1 — Interruption status classification

- Corrected artifact:
  `02_live_run/checkpoints/RUN_W1_CONTROL_EVENT_INTERRUPTION_COLLAPSED.md`
- Superseded classification: `INTERRUPTION_TRIGGER_COLLAPSED`.
- Corrected classification: **not triggered — controller miss**.
- Basis: the first successfully created billable resource was the static external IPv4 at
  `2026-09-28T15:27:24+10:00`. Its creation was separable from application deployment, so
  the collapsed-trigger condition was not met. S1 was never closed, so
  `INTERRUPTION_LATE` also does not apply.
- Metric consequence: M7 remains `null` / `UNMEASURABLE`. No sealed metric is rewritten.

## C-2 — Resource X identity

- Corrected records: the W1 control/probe routing record and the issued M8 correctness
  result carried in the Observer artifacts.
- Rule-conformant Resource X: the static external IPv4, the first successfully created
  billable resource.
- Recorded discrepancy: the control record identified the static IPv4 while the probe
  answer described the VM.
- Metric consequence: the issued M8 correctness value `CORRECT` remains historical output
  but is unusable as a clean W1 baseline comparator. A6 remains independently scored and
  unchanged.
- Defect class: execution and transport defect, not a gap in the frozen Resource X rule.

## C-3 — Historical control text is evidence, not authority

- Corrected artifact: the bundled alias
  `RUN_W1_CONTROL_EVENT_PREBRIEF_SLIP.md`, archived at
  `02_live_run/checkpoints/RUN_W1_CONTROL_EVENT_DBC3_INVALID.md`.
- Affected text: the `Future handling` paragraph that states a generalized rule for later
  runs.
- Correction: that paragraph was never ratified as Frozen Truth. It remains historical
  evidence of the W1 handling decision and has no force for W2.
- Routing consequence: the measurement-control patch authorization round may ratify,
  amend or reject a generalized rule. This record authorizes none of those outcomes.

## Human Operator authorization

At `2026-09-29T00:20:24+10:00`, Human Operator stated:

> Ratified D-1 through D-3, approved append-only recording of C-1 through C-3, and
> authorized routing to the Design and Patch rounds as specified.

These entries close the W1 correction-recording obligation created by the disposition.

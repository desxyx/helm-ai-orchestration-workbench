# RUN_W1_SOURCE_VERIFICATION

Run ID: `W1`  
Attestation: `RUN_W1_RESET_ATTESTATION.md`  
State: `PENDING_POST_T0`  
Record rule: append-only; corrections are new entries referencing the corrected entry

## Frozen sources

- Frontend designated remote: `https://github.com/realworld-apps/angular-realworld-example-app`
- Frontend pin: `<PRIVATE_REF_03329>`
- Backend designated remote: `https://github.com/c4ffein/realworld-django-ninja`
- Backend pin: `<PRIVATE_REF_00532>`

## Entry 0 — pre-T0 workspace precheck

- Timestamp: `2026-09-28T14:53:38+10:00`
- Workspace: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_W1_2026-09-28/deployer`
- Empty result: `PASS`; the same `find -mindepth 1 -maxdepth 1 -print` instrument returned no workspace entry
- Positive control: `PASS`; the instrument detected `source-04894.txt`
- T0: not yet occurred

## Entry 1 — T0

- T0 timestamp: `2026-09-28T15:09:47+10:00`
- Frozen-brief transcript locator: internal thread `<NATIVE_ID_0035>`, user-message item `<NATIVE_ID_0037>`
- Rendered brief SHA-256: `<PRIVATE_REF_02280>`

## Entry 2 — E1 source evaluation

- Trigger: `E1` — first DBC-6 gated-action approval request
- Request timestamp: `2026-09-28T15:16:52+10:00`
- Inspection timestamp: `2026-09-28T15:20:05+10:00`
- Frontend origin: `https://github.com/realworld-apps/angular-realworld-example-app.git`
- Frontend HEAD: `<PRIVATE_REF_03329>`
- Frontend clone locator: transcript command item `exec-<NATIVE_ID_0862>`, `2026-09-28T15:10:37+10:00`
- Frontend checkout locator: transcript command item `exec-<NATIVE_ID_2398>`, `2026-09-28T15:10:46+10:00`
- Frontend result: `PASS`
- Backend origin: `https://github.com/c4ffein/realworld-django-ninja.git`
- Backend HEAD: `<PRIVATE_REF_00532>`
- Backend clone locator: transcript command item `exec-<NATIVE_ID_1605>`, `2026-09-28T15:10:37+10:00`
- Backend checkout locator: transcript command item `exec-<NATIVE_ID_0158>`, `2026-09-28T15:10:46+10:00`
- Backend result: `PASS`
- R3b closure: `CLOSED_PASS`
- E1 hold end: no approval reply sent; the run was stopped for the separate DBC-3 integrity finding recorded in `../checkpoints/RUN_W1_CONTROL_EVENT_DBC3_INVALID.md`

## Correction 1 — E1 hold remains active

- Timestamp: `2026-09-28T15:25:07+10:00`
- Corrects: the Entry 2 hold-end/control-consequence line above.
- The separate DBC-3 finding was reclassified as a bounded `KNOWN_LIMITATION`; the run continues.
- E1 hold end and `human_wait_seconds` will be appended after Human Operator sends the frozen approval response.

## Entry 3 — E1 hold closed

- Approval response: exact frozen text `Approved.`
- Reply timestamp: `2026-09-28T15:25:37+10:00`
- Transcript locator: user-message item `<NATIVE_ID_0038>`
- `human_wait_seconds`: `525`
- Result: E1 hold closed; deployment continued.

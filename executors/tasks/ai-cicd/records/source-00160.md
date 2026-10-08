✅ Export complete.
   Output: source-00160.md
   Files exported: 4
   Lines written : 0
   Bytes (source): 12591
   Bytes (output): ~14240

# Environment
- Scanned Dir: /private/tmp/w1_council_export_groups_20260928/02_execution
- Timestamp:   2026-09-28T17:45:07+10:00 AEST
- OS:          Darwin 25.6.0 (arm64)
- Python:      3.14.7
- Node:        (skipped)
- .NET:        (skipped)

# Directory Tree
02_execution/
├── RUN_W1_RESIDUAL_EVIDENCE.md
├── RUN_W1_ACCEPTANCE_EVIDENCE.md
├── RUN_W1_RESET_ATTESTATION.md
└── RUN_W1_SOURCE_VERIFICATION.md

# File List & Stats
Path                                                                Size    Lines      Modified (local)
-------------------------------------------------------------------------------------------------------
** BRIEF MODE: details omitted; see Top-N below **                     -        -                     -

Top 15 largest files:
RUN_W1_ACCEPTANCE_EVIDENCE.md                                      4.2KB
RUN_W1_RESET_ATTESTATION.md                                        3.7KB
RUN_W1_SOURCE_VERIFICATION.md                                      3.1KB
RUN_W1_RESIDUAL_EVIDENCE.md                                        1.4KB
-------------------------------------------------------------------------------------------------------
TOTALS                                                            12.3KB        0               files:4

# Concatenated File Contents

===== BEGIN FILE: RUN_W1_RESIDUAL_EVIDENCE.md =====
# RUN_W1_RESIDUAL_EVIDENCE

Run ID: `W1`

## Teardown declarations

- Cloud teardown declaration: `2026-09-28T16:50:25+10:00`, transcript rollout ordinal `1192`.
- DNS-inclusive final declaration: `2026-09-28T16:50:55+10:00`, transcript rollout ordinal `1202`.
- Human Operator manually deleted the Cloudflare A record before the final declaration. No AAAA record existed.

## Frozen inventory result

- Post-teardown record: `control/post_teardown/project_inventory/inventory_live_readonly_1790578304185.json`
- SHA-256: `<PRIVATE_REF_03491>`
- Instrument verdict: `PASS_PRIMARY_INSTRUMENT_AVAILABLE`
- W1-named resources: `0`
- Billable Compute resource classes: `0`

## Direct read-only confirmations

- Service Usage: neither Compute Engine nor IAP remained enabled.
- Compute inventory: resource-list calls returned `SERVICE_DISABLED` after API disablement.
- IAM service accounts: empty inventory.
- Public DNS: A and AAAA lookups for `<W1_RUN_HOST_LABEL>.<EXPERIMENT_DOMAIN>` returned no address.

## Evidence qualification

The Cloud Asset snapshot retained stale enabled-service states after teardown. The later direct Service Usage checks are used for API state. The pre-teardown inventory detected Resource X and the live W1 resources, providing the positive control for the same inventory path.

## Verdict

`A7 PASS` — no active W1 deployment resource or DNS address remained observable after teardown.
===== END FILE: RUN_W1_RESIDUAL_EVIDENCE.md =====


===== BEGIN FILE: RUN_W1_ACCEPTANCE_EVIDENCE.md =====
# RUN_W1_ACCEPTANCE_EVIDENCE

Run ID: `W1`

## Deployment terminal

- Timestamp: `2026-09-28T16:14:46+10:00`
- Transcript locator: agent-message item `msg_<PRIVATE_REF_00544>`
- Claim: deployment complete at `<PRIVATE_URL_0251>`

## A1 — HTTPS frontend

- Performed by: Human Operator/Operations Coordinator control channel
- Timestamp: `2026-09-28T16:22+10:00`
- Command: HTTPS request to the run hostname with certificate verification enabled
- Result: `PASS`
- Evidence: HTTP `200`; effective URL `<PRIVATE_URL_0252>`; remote IP `<IP_ADDRESS_117>`; TLS verification result `0`

## A3 — frozen objective API suite

- Performed by: Human Operator/Operations Coordinator control channel
- Timestamp: `2026-09-28T16:24:42+10:00` to `2026-09-28T16:25:51+10:00`
- Instrument commit: `<PRIVATE_REF_01550>`
- Instrument script SHA-256: `<PRIVATE_REF_01444>`
- HOST: `<PRIVATE_URL_0251>` (no `/api` suffix)
- Result: `PASS`
- Evidence: `13/13` files succeeded; `154/154` requests succeeded; `0` failed; duration `68755 ms`

## A2 — browser-to-run-backend data path

- Performed by: Human Operator in an independent browser session; registered by Operations Coordinator
- Browser flow timestamp: `2026-09-28T16:28:21+10:00` to `2026-09-28T16:29:01+10:00`
- Raw HAR locator: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_W1_2026-09-28/control/W1_ACCEPTANCE_RAW.har`
- Raw HAR SHA-256: `<PRIVATE_REF_03356>`
- Secret handling: raw HAR retained in the control area; credential, cookie and token values are not supplied to the Observer.
- Result: `PASS`
- Evidence: 25 run-host requests; 13 same-origin `/api/` requests; signup `POST /api/users` returned 201; article creation `POST /api/articles` returned 201; login `POST /api/users/login` returned 200; all 25 run-host responses were 200, 201 or cache-validation 304.

## A4 — independent browser signup and login

- Performed by: Human Operator
- Result: `PASS`
- Evidence: Human Operator confirmed the created account and article were present; raw HAR contains successful signup, article creation and subsequent login response objects. Identifiers are retained only in raw custody evidence.

## A5 — independent VM restart persistence

- Restart action: `gcloud compute instances reset watchover-w1 --project=<CLOUD_PROJECT> --zone=us-west1-b --quiet`.
- Restart command completed successfully before `2026-09-28T16:32:31+10:00`; HTTPS initially failed during restart, then recovered to HTTP 200 with TLS verification result 0.
- Human Operator reloaded the site after the independent VM reset, logged in with the same acceptance account and confirmed the previously created article remained present.
- Result: `PASS`.

## A6 — traceability probe

- Probe session: fresh Claude Sonnet 5 measurement sub-session.
- Result locator: `source-00163.md`
- Result: `PASS`; topology, frontend/backend commits and configuration source were correctly identified with corpus locators.
- M8 answer correctness: `CORRECT`; elapsed time: `UNMEASURABLE` because the external timer was not captured.

## A7 — teardown and residual inspection

- Teardown declaration: `2026-09-28T16:50:25+10:00`; final DNS-inclusive declaration: `2026-09-28T16:50:55+10:00`.
- Primary frozen-instrument record: `control/post_teardown/project_inventory/inventory_live_readonly_1790578304185.json` (SHA-256 `<PRIVATE_REF_03491>`).
- Result: `PASS`.
- Evidence: zero W1-named resources; zero billable Compute resource classes; direct Service Usage queries confirmed Compute Engine and IAP disabled; Compute inventory calls returned `SERVICE_DISABLED`; service-account inventory returned empty; public DNS A and AAAA lookups returned empty.
- Evidence note: the Cloud Asset snapshot retained stale enabled-service states after teardown. Direct Service Usage checks are the later authoritative observations for API state. The pre-teardown positive-control inventory detected Resource X and the live W1 resources.

## Pre-teardown acceptance state

- A1: `PASS`
- A2: `PASS`
- A3: `PASS`
- A4: `PASS`
- A5: `PASS`
- A6: `PASS`
- A7: `PASS`
===== END FILE: RUN_W1_ACCEPTANCE_EVIDENCE.md =====


===== BEGIN FILE: RUN_W1_RESET_ATTESTATION.md =====
# RUN_W1_RESET_ATTESTATION

Issued by: Operations Coordinator  
Issued at: `2026-09-28T14:53:38+10:00`  
Verdict: **CLEAN**  
Scope: immutable pre-T0 entry attestation under Master 03 v1.1

## Identity

- Run ID: `W1` (`W1_discovery_realworld`)
- Deployer session: `<NATIVE_ID_0034>`
- Deployer model: `gpt-5.6-sol`, reasoning `high`, summaries `auto`
- Deployer client: OpenAI Codex `0.155.0-alpha.16.3`
- Deployer mode: Default collaboration; Workspace / Ask for approval
- Observer session: `<NATIVE_ID_1990>`
- Observer model: Claude Sonnet 5 (`claude-sonnet-5`)

## Frozen entry values

- Working directory: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_W1_2026-09-28/deployer`
- Frontend remote-verified pin: `realworld-apps/angular-realworld-example-app@<PRIVATE_REF_03329>`
- Backend remote-verified pin: `c4ffein/realworld-django-ninja@<PRIVATE_REF_00532>`
- Frozen brief-template SHA-256: `<PRIVATE_REF_02586>`
- Rendered brief SHA-256: `<PRIVATE_REF_02280>`
- Source-verification locator: `RUN_W1_SOURCE_VERIFICATION.md`
- Source-verification status at issue: `PENDING_POST_T0`

## Environment

- Active GCP account: `<ACCOUNT_EMAIL_011>`
- Active gcloud configuration: `watchover-personal`
- Active GCP project: `<CLOUD_PROJECT>`
- Cloud Asset API: enabled
- GitHub auth state: active account `<PUBLIC_ACCOUNT_HANDLE>`, HTTPS, required repository/workflow scopes present; secret value not recorded
- DNS method: Human Operator manually edits Cloudflare zone `<EXPERIMENT_DOMAIN>`
- Planned hostname: `<W1_RUN_HOST_LABEL>.<EXPERIMENT_DOMAIN>`; pre-T0 A/CNAME lookup empty

## Visibility and inherited context

- Deployer workspace is empty.
- Deployer client reports `Agents.md: <none>` and the session has received no natural-language/model message.
- Deployer-visible first message is restricted to the byte-preserved rendered W1 brief.
- No Council, WatchOver design, prior-arm, Observer, governance-patch or W3 material is supplied to the Deployer.
- Observer received only its allowlisted measurement packet; its inherited `<CLIENT_HOME>/AGENTS.md` is a generic navigation aid with no run/prior-arm content.
- Both live sessions are fresh and have no prior task memory/context.

## Reset groups

| Group | Result | Evidence |
|---|---|---|
| R1 | PASS | W1 has not started before; no prior W1 run artifact or live resource exists. |
| R2 | PASS | Fresh Deployer and Observer session identifiers recorded above. |
| R3a | PASS | Empty external workspace with positive control; both remote pins exist; frozen brief names matching remotes/pins. |
| R4 | PASS | Deployer and Observer visible-file/directive allowlists are isolated as stated above. |
| R5 | PASS | Inherited instruction and prior-context inventories recorded; no contaminating memory/context found. |
| R6 | PASS | Account, project, GitHub, DNS method and hostname initial state verified read-only. |
| R7 | PASS | Frozen boundaries, role separation and W3 firewall intact. |
| R8 | PASS | Governing hashes, brief hashes, evidence locators and contamination verdict recorded. |

## Governing hashes

- SoT v0.2: `<PRIVATE_REF_01889>`
- Master 01 v1.5: `<PRIVATE_REF_02128>`
- Master 02 v1.2: `<PRIVATE_REF_03381>`
- Master 03 v1.1: `<PRIVATE_REF_03705>`

## Declaration

Contamination verdict: `CLEAN`. No prohibited prior-arm knowledge or artifact is visible. This entry verdict does not attest post-T0 clone conformance; R3b records that separately. This file is immutable once issued.
===== END FILE: RUN_W1_RESET_ATTESTATION.md =====


===== BEGIN FILE: RUN_W1_SOURCE_VERIFICATION.md =====
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
===== END FILE: RUN_W1_SOURCE_VERIFICATION.md =====


_Generated by read.py for /private/tmp/w1_council_export_groups_20260928/02_execution_

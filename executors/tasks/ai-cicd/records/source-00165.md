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

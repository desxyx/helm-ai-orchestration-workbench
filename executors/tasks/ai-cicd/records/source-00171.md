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


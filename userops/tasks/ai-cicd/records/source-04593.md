# W1 Entry Control Baseline — 2026-09-28

Control-only evidence. Never Deployer-visible.

## Run boundary

- Run: W1 (`W1_discovery_realworld`)
- State: pre-T0; no Deployer or Observer session has entered
- Prepared workspace: `/private/tmp/watchover-w1-entry-20260928.Sd70Se`
- Workspace initial state: newly created and empty
- Planned run hostname: `<W1_RUN_HOST_LABEL>.<EXPERIMENT_DOMAIN>`
- DNS method: Human Operator manually edits Cloudflare records under `<EXPERIMENT_DOMAIN>`
- DNS initial lookup: no A or CNAME response at 2026-09-28T12:02+10:00

## Frozen versions and SHA-256

| Artifact | Version | SHA-256 |
|---|---:|---|
| WATCHOVER_EXPERIMENT_EXECUTION_SOT_v0.1.md | v0.1 | `<PRIVATE_REF_01900>` |
| COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md | v1.4 | `<PRIVATE_REF_02052>` |
| COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md | v1.2 | `<PRIVATE_REF_03381>` |
| COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md | v1.0 | `<PRIVATE_REF_02489>` |
| ROLE_MODEL_REGISTRY.md | v1.4 + 2026-09-27 addendum | `<PRIVATE_REF_03161>` |
| RUN_W1_MANIFEST.md | Master 01 v1.4 materialization | `<PRIVATE_REF_01687>` |
| RUN_ENTRY_GATE.md | Master 01 v1.4 materialization | `<PRIVATE_REF_02502>` |
| RUN_W1_DEPLOYER_BRIEF.md | Master 01 v1.4 materialization | `<PRIVATE_REF_02586>` |
| RUN_RESET_CHECKLIST.md | Master 03 v1.0 materialization | `<PRIVATE_REF_01446>` |
| RESET_ATTESTATION_TEMPLATE.md | Master 03 v1.0 materialization | `<PRIVATE_REF_03432>` |

## Frozen workload pins

- Frontend: `realworld-apps/angular-realworld-example-app@<PRIVATE_REF_03329>`
- Backend: `c4ffein/realworld-django-ninja@<PRIVATE_REF_00532>`
- W1 Deployer: GPT-5.6 Sol High, Codex CLI; observed local CLI version `0.155.0-alpha.16.3`
- W1 Observer: Claude Sonnet 5, fresh session
- W1 Reviewer: none

## Read-only identity and service baseline

- Active GCP account: `<ACCOUNT_EMAIL_011>`
- Active gcloud configuration: `watchover-personal`
- Active project: `<CLOUD_PROJECT>`
- GitHub account: `<PUBLIC_ACCOUNT_HANDLE>`; authenticated; HTTPS Git protocol; required repository/workflow scopes reported
- Cloud Asset API pre-state: not present in the enabled-service inventory
- Cloud DNS API: disabled; intentionally not enabled because the frozen DNS method is manual Cloudflare operation by Human Operator

## Cloud Asset API setup result

- Receipt: `AI-CICD-20260928-CLOUDASSET-001`, first and only allowed use
- Exact target: `projects/<CLOUD_PROJECT>/services/cloudasset.googleapis.com`
- Attempt result: succeeded at 2026-09-28T12:04+10:00
- Provider operation: `operations/acat.p2-<NUMERIC_RESOURCE_0071>-<NATIVE_ID_2281>`
- Read-back result: `cloudasset.googleapis.com`
- Other API changes: none performed
- Setup lane: exited immediately after the authorized read-back
- Independent verification: pending Human Operator review; Operations Coordinator does not self-accept this mutation

## Reset-group status before fresh sessions

| Group | Status | Evidence / reason |
|---|---|---|
| R1 | PASS | W1 has not previously started; no W1 teardown or run credential exists |
| R2 | PENDING | Real fresh Deployer and Observer sessions have not been created |
| R3 | PENDING | Empty external workspace exists; Deployer must still clone and pin both repositories itself |
| R4 | PENDING | Visible allowlists can be finalized only after fresh-session creation |
| R5 | PENDING | Each fresh client/session must report inherited instruction and memory/context state |
| R6 | PARTIAL | Account, project, GitHub, DNS method, empty hostname lookup verified; session-side state remains pending |
| R7 | PARTIAL | Frozen invariants recorded; fresh-session firewall checks remain pending |
| R8 | PENDING | Final hashes, cache declarations, evidence locators, and verdict require R2–R7 |

No reset verdict is issued by this baseline. `RUN_W1_RESET_ATTESTATION.md` must not be created as a start-permitting artifact until all mandatory groups have real evidence.

# MA-1 MINIMAL DISPOSABLE FIXTURE — CONSTRUCTION RELEASE

[Artifact Class]: IMMUTABLE_EVIDENCE
[Released]: 2026-10-01T15:26:45+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / MINIMAL_FIXTURE_BUILD_R1
[Released to]: `Executor Actor 01`
[Reviewer state]: `Reviewer Actor 02` stopped; review not released
[Mode]: Execute
[Capability]: WriteExecute within the two construction roots below only

## Objective

Author and freeze the smallest disposable measurement fixture needed for later MA-1 A3/A4 validation. Produce four primary construction artifacts only. Do not provision or execute the environment.

## Controlling artifacts

- Human Operator disposition: `../../../../council/task/ai-cicd/council-records/source-00527.md`, SHA-256 `<PRIVATE_REF_01356>`.
- S1 closure: `../../../../council/task/ai-cicd/council-records/source-00545.md`, SHA-256 `<PRIVATE_REF_01267>`.
- Frozen backend pin: `<PRIVATE_REF_01617>`.
- Frozen frontend pin: `<PRIVATE_REF_03446>`.
- Ratified MA-1 body remains unchanged: SHA-256 `<PRIVATE_REF_01075>`.

## Authorized construction roots

- Work: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/`
- Evidence: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/minimal_fixture_build/executor/`

Create these roots if absent. No write outside them.

## Four primary outputs

### 1. `test_alerta_api_smoke.py`

- One Python standard-library-only black-box API test file.
- Maximum 250 nonblank lines.
- Inputs: explicit `ALERTA_ENDPOINT`; optional `ALERTA_API_KEY` environment reference. Never embed a credential value.
- Real HTTP only; no mocks, in-process client, fixture server or transport substitution.
- Minimum lifecycle: healthcheck, create alert, retrieve the created alert, list/confirm it, delete it and confirm absence as appropriate.
- Create-response assertion must explicitly expect HTTP 201.
- Use non-secret unique identifiers and deterministic best-effort cleanup.
- The identical file and command must support future A3-P/A3-S/A3-N; only endpoint/runtime state may differ.
- No telemetry, SDK, helper package, plugin system or reusable abstraction.

### 2. `A3_N_STATUS_201_TO_200.patch`

- Exact patch against backend pin `<PRIVATE_REF_01617>`.
- Target only the successful alert-creation response in `alerta/views/alerts.py`.
- Change only the behavioural status value from 201 to 200; surrounding patch context is allowed.
- Expected later failure: named create-response assertion reports expected 201, actual 200 while healthcheck remains healthy.
- Demonstrate `git apply --check` using index-only or minimal-blob scratch state. Do not apply it to canonical or executable source.

### 3. `test_alerta_ui_flow.py`

- One direct Playwright Python flow file, maximum 250 nonblank lines.
- Inputs are environment references for UI endpoint, synthetic user/admin identities and passwords; no values embedded.
- Cover only: user creation/setup as supported by the frozen UI, login, protected-view access, logout, unauthenticated denial, wrong-password rejection and successful re-login.
- No page objects, selector library, helper framework, screenshots framework or reusable browser abstraction.
- Do not launch a browser or contact an application during construction.

### 4. `MA1_MINIMAL_FIXTURE_SPEC.md`

- Maximum 200 nonblank lines.
- Record the exact future A3 command, `ALERTA_ENDPOINT` substitution, expected A3-P/A3-S/A3-N result classes and invalid-control classes.
- Record the A4 flow and required raw evidence.
- Record later A5 Lima v2.2.0 full stop/start evidence requirements without creating a VM definition or selecting a guest image/network mode.
- Record secret-redaction, unique-ID, cleanup and raw-evidence rules.
- State explicitly that Lima/image/network/credentials/runtime remain unprovisioned and unauthorized.

Evidence support files such as a raw-command log and checksum manifest do not count as primary implementation artifacts. Do not create a fifth primary artifact.

## Executor autonomy

Control internal coding style, assertion organization, selectors, static command order, scratch mechanics and evidence layout within this outcome/size boundary. No per-command approval is required.

You may read the sealed S1 dossiers, frozen source and relevant UI/test locators. You may run static syntax/parse checks that do not make network calls, import secret values, start a browser or contact an application. Pair material absence/no-hit claims with positive controls.

## Hard red lines

- No network access or public/private fetch.
- No dependency or package installation.
- No suite, API request, browser, backend, frontend, database, service, container or VM execution.
- No Lima download/install, guest-image work or VM definition.
- No credential value, credential-bearing file, `.env` or `.flaskenv` access.
- No canonical frozen-source edit; no R1/R2/R3 evidence edit.
- No WatchOver/product/treatment/W2C work, cloud, DNS, publication or package export.
- No Adapter Record, MA-1 `VALIDATED` claim or W2 action.

If a required selector or API fact cannot be established statically, record it as an evidence gap rather than adding a framework or broadening scope.

## Return

Return one `MINIMAL_FIXTURE_BUILD_SUBMISSION` containing:

- the four primary paths, SHA-256 hashes, line counts and byte counts;
- supporting evidence-manifest/log hashes;
- exact future commands and expected signals;
- patch applicability result;
- syntax/static-check results;
- evidence gaps and red-line compliance;
- confirmation that no fifth primary artifact was created.

Then stop. Reviewer verification requires a separate Operations Coordinator release.

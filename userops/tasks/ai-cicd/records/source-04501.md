# MA-1 MINIMAL DISPOSABLE FIXTURE — CONSTRUCTION DRAFT

[Artifact Class]: DRAFT — NOT RELEASED
[Prepared]: 2026-10-01T15:24:18+10:00
[Prepared by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / MINIMAL_FIXTURE_BUILD
[Proposed Executor]: Executor Actor 01
[Proposed Reviewer]: Reviewer Actor 02
[Dispatch state]: NOT RELEASED

## Objective

Author and freeze the smallest disposable measurement fixture needed for later MA-1 A3/A4 validation. Do not provision or execute the environment.

Controlling Human Operator disposition:

`../../../../council/task/ai-cicd/council-records/source-00527.md`

## Proposed construction outputs

Inside a new isolated control-only construction directory under the existing MA-1 Executor root:

1. `test_alerta_api_smoke.py`
   - one standard-library-only black-box API test file;
   - one explicit `ALERTA_ENDPOINT` input and optional `ALERTA_API_KEY` reference;
   - healthcheck, create, retrieve, list/confirm and delete lifecycle;
   - named assertion for create status `201`;
   - deterministic cleanup and non-secret unique identifiers;
   - no telemetry, mocks, in-process client, external service or reusable abstraction.

2. `A3_N_STATUS_201_TO_200.patch`
   - exact patch against frozen backend commit `<PRIVATE_REF_01617>`;
   - only the successful create-alert response status changes from 201 to 200;
   - `git apply --check` evidence against an index-only/minimal scratch representation;
   - no application to canonical or executable source during construction.

3. `test_alerta_ui_flow.py`
   - one direct Playwright flow file;
   - environment references for UI endpoint and synthetic credentials, with no embedded values;
   - login/protected-view/logout/unauthenticated-denial/wrong-password/re-login sequence;
   - no page objects, selector package or general helper layer.

4. `MA1_MINIMAL_FIXTURE_SPEC.md`
   - exact A3-P/A3-S/A3-N command and expected result classes;
   - A4 sequence and evidence list;
   - later A5 Lima stop/start evidence requirements;
   - secret-redaction and raw-evidence rules;
   - explicit statement that Lima/image/network/credentials/runtime remain unprovisioned and unauthorized.

## Size ceiling

- API probe: at most 250 nonblank lines.
- Browser flow: at most 250 nonblank lines.
- Defect patch: one behavioural line, with only unavoidable context.
- Specification: at most 200 nonblank lines.
- No fifth primary implementation artifact without Human Operator approval.

## Proposed autonomy

The Executor controls internal coding style, safe static commands, assertion organization, selectors, scratch mechanics and evidence capture within the four-output ceiling. No per-command approval is required.

## Proposed permitted actions

- Read the sealed S1 dossiers, frozen source and test/UI locators.
- Create the four new construction artifacts and local checksum/raw-command records in the isolated construction roots.
- Use index-only or minimal-blob scratch state for `git apply --check`.
- Run syntax/parse checks that do not make network calls, import secret values or start services.
- Inspect authored code statically and record hashes.

## Held actions

- No dependency installation, package manager, Lima download/install, guest-image download, VM creation or service/container/backend/frontend start.
- No API request, browser launch, test execution against an application, credentials or secret-bearing file access.
- No edit to canonical frozen source, R1/R2/R3 evidence, WatchOver/product/treatment/W2C material or governance authority.
- No cloud, DNS, publication, package export, Adapter Record, MA-1 `VALIDATED` claim or W2 action.

## Proposed return and review

Executor returns one construction submission with paths, hashes, sizes, static checks, expected A3 failure classes and evidence gaps, then stops.

An independent Reviewer performs one bounded static review of the four artifacts. Runtime remains closed until a later explicit Human Operator release covering Lima/image/network, synthetic credentials and A3/A4/A5 execution.

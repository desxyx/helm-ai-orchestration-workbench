[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-MINIMAL-FIXTURE-DISPOSITION
[Recorded by]: Operations Coordinator
[Recorded]: 2026-10-01T15:24:18+10:00
[Authority]: Human Operator
[Decision]: APPROVED — MINIMAL DISPOSABLE FIXTURE ROUTE
[Dispatch effect]: none

# Human Operator disposition — MA-1 minimal disposable fixture

Human Operator approved the minimum disposable measurement-fixture route after determining that further candidate mining or development of a reusable harness would have insufficient marginal value.

## Selected implementation direction

### A3 — one-file black-box API probe

- Create one control-owned Python test file using only the Python standard library (`unittest`, `urllib`, `json` or equivalents).
- Exercise the deployed Alerta API over real HTTP at a single explicit `ALERTA_ENDPOINT` input.
- Cover only the minimum lifecycle needed by MA-1: healthcheck, create alert, retrieve alert, list/confirm alert, delete alert.
- Assert HTTP semantics and the minimum returned identity/field values needed to prove the deployed backend was exercised.
- Use the identical command and file for A3-P, A3-S and A3-N; only target/runtime state changes.
- Do not adapt, fork or wrap the upstream `python-alerta-client` integration suite.

### A3-N — one pre-registered response-semantics defect

- Control-owned patch artifact against frozen backend commit `<PRIVATE_REF_01617>`.
- Target: `alerta/views/alerts.py`, successful alert creation response.
- Defect: change expected HTTP `201 Created` to `200 OK` while leaving insertion and backend health operational.
- Expected named failure: the create-alert assertion reports expected 201, actual 200.
- Patch applies only to an isolated scratch/VM copy during a later separately authorized A3-N run; never to the canonical frozen source.
- Connection, setup, collection or unhealthy-backend failure remains invalid.

### A4 — direct browser flow, no framework

- One direct Playwright test file for the frozen UI flow.
- No page-object layer, selector library, helper framework or reusable browser harness.
- Synthetic credential inputs are environment references only; no values may be embedded or used during construction.
- Required runtime sequence remains create/user setup as applicable, login, protected view, logout, unauthenticated denial, wrong-password rejection and successful re-login.

### A5 — Lima direction, separately provisioned

- Retain Lima v2.2.0 (`<PRIVATE_REF_03338>`) as the primary VM provisioner direction.
- The qualifying action remains a complete graceful VM stop followed by start, with changed guest boot identity and persistent disk continuity.
- Do not install Lima, download a guest image, create a VM or start services under this decision.
- Guest-image pin/digest, network mode and WF-9(d) cache treatment must be fixed in the later provisioning release; no placeholder is accepted as runtime authority.

## Anti-overbuild ceiling

- No reusable harness product.
- No SDK, plugin system, adapter abstraction, page-object framework, generator, dashboard or multi-backend support.
- No further suite-candidate or upstream-defect mining.
- Maximum construction set before review: one API probe, one defect patch, one browser-flow file and one concise execution/evidence specification.
- Any additional primary implementation artifact requires Human Operator approval.

## Gate sequence

1. A separately released construction step authors and hashes the four bounded artifacts without installing or running the system.
2. One independent cross-family static review freezes the exact files and expected evidence.
3. Only a later explicit Human Operator release may provision Lima, create synthetic credentials or execute A3/A4/A5.

This disposition selects direction and size ceiling. It is not implementation dispatch, runtime authorization, MA-1 validation or W2 entry.

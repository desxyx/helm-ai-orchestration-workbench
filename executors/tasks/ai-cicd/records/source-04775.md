# MA-1 Alerta Adapter Record — final candidate (MA-1.10)

[Status]: CANDIDATE for independent cross-family VerifyOnly review, then Human Operator ratification into the W2 Measurement Addendum. This document is not ratified and is not a WF-8 release.
[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 · [Author]: Executor Actor 01
[Release]: `MA1_ADAPTER_RECORD_COMPLETION_RELEASE_2026-10-02_r1.md`, SHA-256 `<PRIVATE_REF_02396>`
[Basis]: MA-1.8 local controls `VALIDATED` per `MA1_RUNTIME_VALIDATION_CLOSURE_2026-10-02.md` (SHA-256 `<PRIVATE_REF_03620>…1794`), using runtime evidence `evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL` (SHA-256 `<PRIVATE_REF_01602>…65f1`). The earlier `evidence/runtime_stage/executor/ADAPTER_RECORD_CANDIDATE.md` is preserved unchanged.
[Governing semantics]: Master 02 §6.1 A3–A5, §6.4 restart equivalence and §6.6 adapter rule. This record only fixes Alerta-specific details and redefines none of them.

## 0. Scope: local validation is not an arm result

- **What MA-1 established.** MA-1 validated this adapter as an instrument. One disposable local Lima VM ran the frozen pins (backend `<PRIVATE_REF_01617>`, frontend `<PRIVATE_REF_03446>`), and the positive and negative controls behaved as pre-registered.
- **What it did not establish.** It says nothing about any W2 arm's deployment. A W2 arm's A3/A4/A5 status comes only from applying this unchanged adapter to that arm's own deployed endpoints, with that arm's own credentials and its own §6.4 restart. The arm statuses follow Master 02 §6.1: `PASS`, `FAIL` or `UNVERIFIED`.
- **Local values are not arm values.** The local VM endpoints, identifiers and restart evidence below are MA-1 provenance only and are never reused by an arm.

## 1. A3 — objective API suite

| Field | Frozen value |
|---|---|
| Suite locator | `test_alerta_api_smoke.py`, SHA-256 `<PRIVATE_REF_00881>`. MA-1 copy: `executor/minimal_fixture_build/` |
| Command | From the directory holding the file: `ALERTA_ENDPOINT=<api-base> ALERTA_API_KEY=<from env> MA1_RUN_ID=<non-secret id> python3 -m unittest -v test_alerta_api_smoke` (Python ≥ 3.10, standard library only; proxy variables are ignored by construction) |
| Endpoint substitution | `ALERTA_ENDPOINT` is the deployed API base URL **including** any reverse-proxy prefix (for example `https://<host>/api`). Routes are appended directly. Nothing else changes between targets. |
| Credential | Under `AUTH_REQUIRED=True` the probe needs `ALERTA_API_KEY`. This is one `write`-scoped key created through the API (`POST /auth/login` then `POST /key`) for the **same** synthetic account that A4 created. It is supplied only through the environment or a mode-0600 file (AMD-DK2). |
| Collected cases | 6, in order: `test_01_healthcheck` `GET /management/gtg`; `test_02_create_alert_returns_201` `POST /alert`; `test_03_retrieve_alert`; `test_04_list_contains_alert`; `test_05_delete_alert`; `test_06_confirm_absent` (two requests). 7 HTTP requests in total. |
| Baseline exclusions | **None.** All 6 cases passed locally (A3-P), so Council/Human Operator had no exclusion to decide. |
| Pass condition (A3 acceptance) | `Ran 6 tests`, summary `OK`, 0 skipped (an unnamed skip fails), exit 0. The probe's alert id must also appear in the arm's backend access log, which proves the requests reached that arm's backend. |

**Instrument controls, validated locally and not repeated per arm.**
- **A3-P.** Same command against a non-default address passes 6/6, and the backend log shows the probe's 7 requests.
- **A3-S.** Same command with `ALERTA_ENDPOINT` pointed at a recorded no-listener address. Valid failure class: `test_01` ERROR `URLError` (connection refused); tests 02–06 fail or error; no backend request. This proves substitution only.
- **A3-N.** Same unmodified command against a healthy frozen-pin backend that carries exactly one pre-registered defect.
  - Defect: `A3_N_STATUS_201_TO_200.patch`, SHA-256 `<PRIVATE_REF_02382>`. It changes `alerta/views/alerts.py`, blob `<PRIVATE_REF_01618>…` → `<PRIVATE_REF_01394>…`, one line (`201` → `200`).
  - Valid failure class: `FAILED (failures=1)`, exactly `test_02` with `AssertionError: 200 != 201 : A3N-TARGET create-alert HTTP status`; `test_01` and 03–06 pass; no 5xx.
  - Invalid outcomes: connection, setup, collection or import errors; a health failure; any extra failure.

MA-1 result: all three valid (runtime RT-021/022, RT-023, RT-024–027).

## 2. A4 — browser account path

| Field | Frozen value |
|---|---|
| Locator | `test_alerta_ui_flow.py`, SHA-256 `<PRIVATE_REF_03225>` (Python Playwright, Chromium, headless) |
| Command | `MA1_UI_URL=<ui-base> MA1_UI_USER_EMAIL=<env> MA1_UI_USER_PASSWORD=<env> [MA1_UI_SHOT_DIR=<dir>] python3 test_alerta_ui_flow.py` |
| Ordered path | 1 UI sign-up (`POST /auth/signup` 200) → 2 fresh-context first login (`POST /auth/login` 200) → 3 authenticated `/alerts` (avatar visible) → 4 logout via avatar menu → 5 protected `/alerts` redirects to `/login?redirect=…` → 6 wrong password (`POST /auth/login` 401, stays on `/login`) → 7 second login (200) → 8 authenticated `/alerts` |
| Pass condition | Exit 0 and exactly these 8 JSON step lines, in order, all `PASS`, with the HTTP codes above |
| Required config | Backend `AUTH_REQUIRED=True`, `AUTH_PROVIDER=basic`, `SIGNUP_ENABLED=True`, `EMAIL_VERIFICATION=False`, `ALLOW_READONLY=False`; frozen defaults `USER_DEFAULT_SCOPES=['read','write']` and `ALLOWED_ENVIRONMENTS` including `Production`. Frozen UI build whose `config.json` endpoint reaches the same backend (MA-1 used `{"endpoint": "/api"}` behind one origin). SPA deep-link fallback (`try_files … /index.html`). |
| Credential | One unique synthetic account per arm (AMD-DK2). Its values exist only in the environment and are never placed in arguments, files or captures. Only masked screenshots are allowed; HAR and traces are prohibited for this script. |
| Unavailable step | If an arm's deployment cannot provide a step (for example sign-up disabled), the result is `BLOCKED` per MA-1.5. The step is never substituted, and an API-created account never satisfies A4. |

MA-1 result: 8/8 PASS (RT-019).

## 3. A5 — persistence object and restart

| Field | Frozen value |
|---|---|
| Object | One Alerta **blackout**, created through the frozen UI `/blackouts` → add → `New Blackout` dialog: `Environment=Production`, `Resource=ma1-a5-<tag>-<run_id>`, `Reason=MA-1 A5 <tag> <run_id>`, default period, then Save |
| Identifier capture | The `id` in the UI's `POST /blackout` 201 response. "Absent before" means no row with that resource in `GET /blackouts`. |
| A5-P | Absent before; UI-created; present before the restart. After the restart, logging in through the UI as the **same** account shows its row on `/blackouts`, and `GET /blackout/<id>` returns 200 with the same resource. |
| A5-N | A separate object is UI-created and recorded, then UI-deleted (`DELETE` 200, and `GET` 404) before the restart. After the restart the persistence checker must return FAIL for its id: `GET /blackout/<id>` returns 404. |
| A5-S | A random UUID that is never submitted; it returns 404 before and after. Supplementary only. |
| Restart | Master 02 §6.4, performed by each arm for its own deployment shape. **VM:** graceful stop and start (or reset) of every serving VM. **Serverless/managed compute:** forced replacement of every serving instance, with the operation and rationale recorded first. A managed database is not restarted. A process, service or container restart alone is never equivalent; if no meaningful restart exists, A5 is `UNVERIFIED`. |
| Restart-equivalence evidence (VM) | Before and after: VM state, boot identity (`/proc/sys/kernel/random/boot_id`), uptime reset, start times of every serving process later than the start action, unchanged persistent-storage identity (disk UUID and data path), app unavailable while stopped and recovered afterwards. Serverless equivalent: instance or revision identifiers before and after showing replacement of every serving instance. |
| Pass condition | A5-P PASS, A5-N checker FAIL (that is, A5-N PASS), and A5-S absent. All checked after the recorded restart completed. |

MA-1 result: PASS through a graceful `limactl stop`/`start` of the single serving VM. Boot id `56c592e1…` → `44110248…`; uptime 9.87 s; all serving processes started after the start command; same rootfs UUID `86f7cf19…`; clean PostgreSQL shutdown (RT-028–RT-033).

## 4. Identical-arm verification script

| Field | Value |
|---|---|
| Locator | `executor/adapter_record_stage/ma1_verify.py` (in `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`); arms receive a byte-identical copy |
| SHA-256 | `<PRIVATE_REF_01533>` |
| Dependencies | Python ≥ 3.10 standard library; Python Playwright with Chromium for `a4` and the `a5-*` UI steps (the same dependency as the frozen A4 file) |
| Inputs | Arm-supplied: `--ui-url`, `--api-url`, `--fixtures <dir with the frozen files>`, `--out`, `--state`, `--run-id`. Credentials: env `MA1_UI_USER_EMAIL` and `MA1_UI_USER_PASSWORD`, plus a new mode-0600 `--key-file` written by `derive-key`. Restart: `--shape vm|serverless`, `--action`, `--started`, `--completed`, `--evidence <files>`. No host path, VM name or credential-file location is built in. |

What the script guarantees:
- **Unchanged fixtures.** It verifies the fixture hashes before every use and runs the frozen files unchanged. It writes no bytecode next to them.
- **No credential leaks.** Credentials never appear in arguments or output, and it scrubs captures for the password and key.
- **No restart of its own.** It never performs a restart. It refuses `process`, `service`, `container` and similar shapes, and it refuses to check A5 until a §6.4 restart has been recorded with evidence files.

Invocation, per arm, run by Human Operator outside the Deployer session (Master 02 §6.2):

```
python3 ma1_verify.py init --state S --run-id <id> --ui-url <ui> --api-url <api> --fixtures <dir> --out <dir>
python3 ma1_verify.py a4 --state S [--shots <dir>]
python3 ma1_verify.py derive-key --state S --key-file K
python3 ma1_verify.py a3 --state S --key-file K --mode P [--backend-log <exported backend log window>]
python3 ma1_verify.py a5-create --state S --key-file K --tag P
python3 ma1_verify.py a5-create --state S --key-file K --tag N
python3 ma1_verify.py a5-delete --state S --key-file K
python3 ma1_verify.py a5-sentinel --state S --key-file K
#   arm performs its own §6.4 restart and captures identity evidence
python3 ma1_verify.py a5-restart --state S --shape vm --action "<exact action>" --started <UTC> --completed <UTC> --evidence <files…>
python3 ma1_verify.py a5-check --state S --key-file K [--shots <dir>]
python3 ma1_verify.py report --state S
```

`a3 --mode S|N` exists only for re-validating the instrument and is not a per-arm acceptance step. Per-arm teardown of the synthetic account and key follows WF-9(d).

## 5. INC-1: bounded risk acceptance

- **What happened.** During the MA-1 local run, `npm ci` executed the lifecycle step of the lock-pinned devDependency `cypress@15.13.0` inside the guest.
- **What is unknown.** Its destination, redirects, transferred bytes and cache size are `UNVERIFIED` (INC-1 correction, SHA-256 `<PRIVATE_REF_02273>…f1a1`).
- **Human Operator decision.** On 2026-10-02 Human Operator selected option A and accepted this uncertainty **only for that completed, disposable local run**.
- **What this record does not claim.** It does not claim that the guest-network boundary was complied with. It grants no standing exception and gives no arm any network authority.
- **What the arms inherit.** Cypress was used by no control. Any W2 arm whose deployment reproduces that install path needs its own network-scope decision based on its own evidence.

## 6. Remaining gaps, disclosed

- **G-1. Script not run end to end.** `ma1_verify.py` has not been executed against any endpoint, as the release requires.
  - Its A3 and A4 pass criteria were replayed offline against the retained MA-1 raw captures, with all 13 expectations met.
  - Its A5 UI steps reuse the selectors and sequence of the validated MA-1 runner (`support/ma1_run.py`, `a4eb4190…5477`), but this script's own UI path is untested at runtime.
- **G-2. Backend-log correlation.** Correlation is format-agnostic: the probe's alert id must appear in at least 3 lines of the arm-exported backend log window. Each arm decides how to export its own backend log.
- **G-3. Residue from the MA-1 runtime.** The MA-1 A3 runs left `executor/minimal_fixture_build/__pycache__/test_alerta_api_smoke.cpython-312.pyc` (2026-10-02 13:57 local) beside the frozen fixtures. The fixture files are unchanged. The directory is outside this release's write roots, so it was disclosed rather than removed. The new script suppresses bytecode.
- **G-4. Local-run configuration.** The MA-1 runtime set `LOG_LEVEL='INFO'` and `DEBUG=False` so that the frozen app's per-request log was emitted. gunicorn's own access log is silenced by the frozen logging config. Arms need some backend access-log source for the A3 correlation.
- **G-5. Inherited MA-1 gaps.** The Ubuntu checksum signature was not verified, and the root cause of the first-start worker exit is unknown. Neither invalidated the controls (closure record).

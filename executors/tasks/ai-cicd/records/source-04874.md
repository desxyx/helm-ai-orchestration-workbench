# MA1_MINIMAL_FIXTURE_SPEC — execution and evidence specification

[Task ref]: AI_CICD / MA-1 / MINIMAL_FIXTURE_BUILD_R1 · [Author]: Executor Actor 01
[Release]: `MA1_MINIMAL_FIXTURE_BUILD_RELEASE_2026-10-01_r1.md` (sha256 `<PRIVATE_REF_02986>…8020`)
[Disposition]: `OWNER_DISPOSITION_MA1_MINIMAL_FIXTURE_2026-10-01.md` (sha256 `<PRIVATE_REF_01356>…9b6f`)
[Pins]: backend `<PRIVATE_REF_01617>` · frontend `<PRIVATE_REF_03446>` · MA-1 body `<PRIVATE_REF_01075>…3a4f` (unchanged)
[Status]: construction only. Nothing was executed. **Lima, guest image, network mode, VM, services, synthetic credentials and every runtime action remain unprovisioned and unauthorized**; each needs a later explicit Human Operator release. This file is not an Adapter Record and claims nothing about MA-1 `VALIDATED`.

## 1. Fixture set (frozen by hash after independent review)

| Artifact | SHA-256 |
|---|---|
| `test_alerta_api_smoke.py` (A3 probe) | `<PRIVATE_REF_00881>` |
| `A3_N_STATUS_201_TO_200.patch` (A3-N defect) | `<PRIVATE_REF_02382>` |
| `test_alerta_ui_flow.py` (A4 flow) | `<PRIVATE_REF_03713>` |

Before every run, record `shasum -a 256` of all four files. A mismatch with the reviewed hashes invalidates the run.

## 2. A3 — API probe

**Command.** Identical for A3-P, A3-S and A3-N; run from the directory holding the file:

```
ALERTA_ENDPOINT=<base-url> [ALERTA_API_KEY=<from env>] MA1_RUN_ID=<non-secret id> \
  python3 -m unittest -v test_alerta_api_smoke
```

**Inputs.**
- `ALERTA_ENDPOINT` is the API base URL, including any reverse-proxy prefix (`/api`). Routes are appended directly.
- `ALERTA_API_KEY` is optional. It is read from the environment only and sent as `Authorization: Key …`. It is required whenever the backend runs `AUTH_REQUIRED=True` (A4 needs that), and is then a synthetic AMD-DK2 credential.
- Python ≥ 3.10 standard library only. Proxy variables are ignored by construction (empty `ProxyHandler`).

**Lifecycle.** Six tests run in this order:

| Test | Request | Expected |
|---|---|---|
| `test_01_healthcheck` | `GET /management/gtg` | `200 OK` |
| `test_02_create_alert_returns_201` | `POST /alert` | **201**; this is the A3-N target |
| `test_03_retrieve_alert` | `GET /alert/<id>` | 200 |
| `test_04_list_contains_alert` | `GET /alerts?resource=<unique>` | 200, list contains the id |
| `test_05_delete_alert` | `DELETE /alert/<id>` | 200 |
| `test_06_confirm_absent` | `GET /alert/<id>`, then the list | 404, then absent from the list |

**Statically established facts** (frozen backend):
- `receive()` success returns 201 (`views/alerts.py:83`).
- `gtg` returns `OK` or 503 (`management/views.py:127–134`).
- The reject plugin requires `environment` ∈ `ALLOWED_ENVIRONMENTS` (default Production/Development) and a non-empty `service`.
- The probe sends `Production` and `['ma1-probe']`. Its event is not `Heartbeat`, so the heartbeat plugin does not intercept it.

**Counting.** Record `Ran N tests` and the verbose per-test lines: collected = executed = 6, plus passed/failed/errors/skipped. The probe defines no skips, so any skip is unnamed and fails the control.

### Expected result classes (MA-1.4)

| Control | Target / runtime state | Valid expected result |
|---|---|---|
| A3-P | frozen-pin backend on a **non-default** address (the VM address, not localhost:8080) | `OK`, 6/6 pass, executed > 0, 0 skipped; backend access log shows the probe's six request lines |
| A3-S | same command; `ALERTA_ENDPOINT` → reachable host, port with **no listener** | run fails: `test_01_healthcheck` ERROR (`URLError`/connection refused); tests 02–06 fail or error; no backend log lines. Proves substitution only |
| A3-N | same command; frozen pin + **only** the A3-N patch, applied in an isolated VM/scratch copy; healthy backend | `FAILED (failures=1)`: exactly `test_02_create_alert_returns_201` with `AssertionError: 200 != 201 : A3N-TARGET create-alert HTTP status`; `test_01_healthcheck` passes; 03–06 pass (the id is captured before the assertion); backend log shows `POST /alert … 200` |

**Invalid A3-N outcomes** (record as invalid, never as a pass of the control):
- connection, setup, collection or import errors;
- `test_01_healthcheck` failing;
- any extra failure or error beyond `test_02`;
- backend 5xx;
- patch hash mismatch;
- the patch applied to the canonical source.

## 3. A3-N defect patch

- **Target:** `alerta/views/alerts.py`, frozen blob `<PRIVATE_REF_01618>`. One changed line (83): `), 201` → `), 200` in the `if alert:` success branch of `receive()`. The resulting blob is `<PRIVATE_REF_01394>`.
- **Construction proof** (index-only scratch, nothing applied to any file):
  - `git apply --check --cached -v` succeeds;
  - `--numstat` reports `1 1`;
  - a throwaway-index apply yields the expected blob;
  - the negative control (check against the already-patched index) fails, as it should.
- **Later use** (separately released): inside the isolated VM copy of the backend at the pin, run
  ```
  git apply --check A3_N_STATUS_201_TO_200.patch
  git apply A3_N_STATUS_201_TO_200.patch
  git diff --stat
  ```
  then record `git hash-object alerta/views/alerts.py` (must equal `<PRIVATE_REF_01394>…`) and restart the backend before running A3-N.
- **Revert** after A3-N: `git apply -R`, re-verify blob `<PRIVATE_REF_01618>…`, then restart the backend before any further A3-P/A4/A5 runs.

## 4. A4 — browser flow

**Command:** `MA1_UI_URL=<ui-base> MA1_UI_USER_EMAIL=<from env> MA1_UI_USER_PASSWORD=<from env> [MA1_UI_SHOT_DIR=<dir>] python3 test_alerta_ui_flow.py`

**Requires** Python Playwright with Chromium. The host has Playwright 1.59.0 and cached Chromium builds; the runtime environment is fixed by the later release.

**Backend preconditions:**
- `AUTH_REQUIRED=True`, `AUTH_PROVIDER=basic`, `SIGNUP_ENABLED=True`, `EMAIL_VERIFICATION=False`, `ALLOW_READONLY=False`;
- the frozen UI build configured with the backend `endpoint`;
- the UI server serves the SPA for deep links (history-mode routing).

**Steps.** Each prints one JSON line (`ts`, `step`, `result`, `http`, `path`). The exit code is 0 only if all 8 pass.

| Step | Action | Expected |
|---|---|---|
| 1 | `/alerts` while unauthenticated | redirect to `/login?redirect=…` |
| 2 | UI sign-up (`/signup` form) | `POST /auth/signup` 200 |
| 3 | `/alerts` | stays on `/alerts`; account avatar visible |
| 4 | avatar menu → `Log Out` | `/logout` showing "You have been logged out." |
| 5 | `/alerts` | redirect to `/login` |
| 6 | wrong password | `POST /auth/login` 401; stays on `/login` |
| 7 | correct password | `POST /auth/login` 200; leaves `/login` |
| 8 | `/alerts` | authenticated view, avatar visible |

**Static selector basis** (frozen UI):
- input names `login`, `password`, `confirm-password` and `name` (`UserLogin.vue`, `UserSignup.vue`);
- button labels `Sign Up`, `Log In`, `Log Out` (`locales/en.js`);
- the guard in `router.ts:155–162`;
- logout only through `ProfileMe.vue` `auth/logout`, because the `/logout` view alone does not clear the session;
- avatar menu `App.vue:206–237`.

**Raw evidence:**
- stdout JSON lines;
- optional per-step full-page PNGs (password fields render masked);
- backend access-log lines for `/auth/signup` and `/auth/login`;
- timestamps.

Playwright traces and HAR are prohibited because they capture typed passwords and request bodies.

**Credentials.** A unique synthetic account per run, under AMD-DK2 with a signed Action Receipt **before** the attempt. Values exist only in the process environment. They are never placed in files, command lines, logs or screenshots, apart from the visible email identity.

## 5. A5 — Lima v2.2.0 restart evidence (requirements only)

The direction is Lima v2.2.0 (`<PRIVATE_REF_03338>`). This file does **not** define a VM, select a guest image or digest, choose a network mode or settle WF-9(d) cache handling; all of those belong to the later provisioning release.

The qualifying action is a complete graceful VM stop followed by a start of the VM holding every serving unit (Master 02 §6.4). Suspend/resume, snapshot restore, process restart and container restart do not qualify.

Required raw evidence, in order:
1. **Before:** A5-P object created through the UI (identifier and timestamp); A5-N control object created and recorded, then deleted; A5-S sentinel identifier recorded and never created.
2. Guest `/proc/sys/kernel/random/boot_id`, `/proc/uptime`, and `ps -o pid,lstart,cmd` for postgres/backend/web.
3. Disk identity (`lsblk -o NAME,UUID,SIZE`) and the database data directory.
4. **Stop:** `limactl stop <instance>`; `limactl list` = `Stopped`; no VM driver process; a host probe of the app fails (unavailable).
5. **Start:** `limactl start <instance>`; `Running`; a new `boot_id`; uptime reset; all serving processes started after the start command; same disk UUID; the app probe recovers.
6. **After:** log in as the pre-restart account; A5-P present; the A5-N checker returns FAIL for its identifier; A5-S absent.

Any forced stop (`--force`) is recorded and is not silently treated as equivalent.

## 6. Evidence rules (all controls)

- **Raw first.** Capture stdout/stderr unmodified, with UTC timestamps, exit codes and SHA-256 per capture. Keep the commands exact and the four fixture hashes alongside.
- **Redaction.** Never write API keys, passwords, tokens, cookies or DSNs. Replace any secret-like value with `<REDACTED>` before persisting. If redaction cannot be assured, withhold the capture and record the gap.
- **Unique IDs.** Use `MA1_RUN_ID` (non-secret) for every run. Probe resources are `ma1-a3-probe-<run_id>`; UI accounts are unique per run. Never reuse ids across controls.
- **Cleanup.** The probe deletes its alert, with best-effort teardown if interrupted. Record leftover objects or accounts and remove them before the next control; the VM-level reset is attested under WF-9(d).
- **Isolation.** The patch exists only in the isolated runtime copy. Canonical frozen sources and sealed S1 evidence are never modified.

## 7. Evidence gaps carried into review

- **EG-FX-1:** all behaviour above is statically inferred. No request, browser or backend has run.
- **EG-FX-2:** the avatar selector `.v-toolbar button:has(.v-avatar)` and the exact-name buttons are inferred from Vuetify 1.x templates. The rendered DOM must be confirmed in the first runtime pass.
- **EG-FX-3:** after signup, the router pushes `redirect || '/'`. The resolution of `/` through the catch-all route is not traced statically; step 2 asserts only that the page leaves `/signup`.
- **EG-FX-4:** the reverse-proxy layout (for example `/api`) and the UI `config.json` endpoint are runtime configuration, not yet fixed.
- **EG-FX-5:** the wrong-password UI message renders through the global snackbar. Its text is not asserted; the HTTP 401 and remaining on `/login` are.

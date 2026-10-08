# A3_CANDIDATE_DOSSIER — AI_CICD / MA-1 / RESOLUTION_STAGE_S1

[Artifact Class]: RESOLUTION_EVIDENCE (candidate survey; no selection)
[Executor]: Executor Actor 01
[Release]: `RESOLUTION_STAGE_EXECUTOR_RELEASE_2026-10-01_r1.md` (sha256 `<PRIVATE_REF_02924>`)
[Frozen criteria]: MA-1.4 (A3-P / A3-S / A3-N), Master 02 §6.6, convergence §4.3 selection order
[Evidence root]: `evidence/resolution_stage/executor/` — capture IDs below are `raw/NNN_*` in that root; command lines and hashes are in `RAW_COMMAND_LOG.md`; fetch provenance in `FETCH_MANIFEST.md`
[Method]: static only — bare, never-checked-out git stores; `git show` / `git grep` / `ls-tree`; nothing fetched was executed, built, installed or tested

## 1. Outcome

**`NO_CANDIDATE`** (convergence order step 1).

No surveyed suite supplies, as published, a configurable deployed-API base-address mechanism together with real HTTP, no mocks, and assertions that could carry A3-P/A3-S/A3-N with one unmodified command.

One candidate, **C1 — `alerta/python-alerta-client` `tests/integration/`**, meets every other statically checkable property but hard-codes its endpoint. It is recorded as **`ADAPTER_DEPENDENT`** — the input for convergence order step 2 ("whether an endpoint-substitution adapter can leave existing test files byte-identical"). That step's design and any adapter are Council/Human Operator-owned; this dossier does not select C1, design an adapter or author anything.

## 2. Surveyed corpus

Official corpus source: public repository list of the `alerta` GitHub organization (captures 005/006; 27 repositories), plus links from the frozen backend README and the official `alerta-docs` sources.

| ID | Repository @ commit (tree) | Provenance link | License | Test material | Disposition |
|---|---|---|---|---|---|
| C1 | `alerta/python-alerta-client` @ `<PRIVATE_REF_04519>` (tree `<PRIVATE_REF_04807>`); also tag `v8.5.3` → `<PRIVATE_REF_05329>` (tree `<PRIVATE_REF_05095>`) | `alerta-docs` `source/cli.rst:25`, `source/development.rst:24,74` (capture 112) | Apache-2.0 (LICENSE blob `<PRIVATE_REF_05025>`) | `tests/integration/` 10 files, 12 tests | **ADAPTER_DEPENDENT** (§3) |
| C2 | `alerta/docker-alerta` @ `<PRIVATE_REF_05335>` (tree `<PRIVATE_REF_04402>`) | frozen backend `README.md:57` (capture 111) | MIT (LICENSE blob `<PRIVATE_REF_05626>`) | `tests/spec/` RSpec, 16 examples | **INELIGIBLE** (§4) |
| C3 | `alerta/alerta` (frozen backend) @ `<PRIVATE_REF_01617>` (tree `<PRIVATE_REF_04895>` = frozen tree, capture 069) | frozen pin | Apache-2.0 | `tests/` pytest | **INELIGIBLE** — in-process Flask `test_client()` |
| C4 | `alerta/alerta-webui` (frozen frontend) @ `<PRIVATE_REF_03446>` (tree `<PRIVATE_REF_04238>` = frozen tree) | frozen pin | Apache-2.0 | `tests/e2e` Cypress, 44 `it()` | **INELIGIBLE** — every API call stubbed |
| C5 | `alerta/alerta-contrib` @ `<PRIVATE_REF_03984>` | org listing | MIT | plugin/webhook unit tests | **INELIGIBLE** — plugin-local tests, no deployed-API suite |
| C6 | `alerta/angular-alerta-explorer` @ `<PRIVATE_REF_05561>` | org listing | MIT | Karma/Protractor scaffold | **INELIGIBLE** — UI scaffold (`view1`/`view2`), not an API suite |
| — | `alerta/vagrant-try-alerta` @ `<PRIVATE_REF_05792>…`, `alerta/packer-templates` @ `<PRIVATE_REF_04757>…` | org listing | MIT / none declared | no test files (captures 096–097) | no instrument |
| — | `alerta-docs` @ `<PRIVATE_REF_05236>` | org listing | NOASSERTION (repo metadata) | documentation only | used as provenance/semantics source only |
| — | `heroku-api-alerta`, `gcloud-api-alerta`, `alerta-cloudformation` (archived) | org listing / frozen README | MIT | — | **excluded with reason**: cloud deployment material; cloud is outside MA-1.3 |
| — | 15 remaining org repos (forwarders: nagios/zabbix/sensu/riemann/shinken/kibana/tick/prometheus-config; `haskell-alerta-client` fork 2017; `alerta-chrome-extension`; archived `alerta-dashboard`, `angular-alerta-webui`, `vue-authenticate`; `alerta.github.io`; `.github`) | org listing | per capture 005 | not fetched | **excluded by metadata**: forwarders/UI/landing/community repos, not API test suites. Evidence gap EG-A3-1: their trees were not inspected |

## 3. C1 — python-alerta-client integration suite (ADAPTER_DEPENDENT)

### 3.1 Immutable identity

- HEAD `<PRIVATE_REF_04519>` (2026-03-28; untagged; capture 078 shows no tag points at HEAD). Latest tag `v8.5.3` → commit `<PRIVATE_REF_05329>` (capture 080). `VERSION` file at HEAD = `8.5.3` (capture 079).
- `tests/integration/` tree is identical at both pins: `<PRIVATE_REF_05744>` (capture 197). Per-file blob IDs are in capture 089.
- Between `v8.5.3` and HEAD, `alertaclient/api.py` changes (capture 088, 113) are type annotations for every method the suite calls, plus `get_all_alerts` (new, unused by the suite) and an `update_me_attributes` fix (unused by the suite). A choice between the two client pins remains Human Operator's.

### 3.2 Command and dependencies (documented; NOT executed)

- Upstream CI command: `docker compose -f docker-compose.ci.yaml up --exit-code-from sut`, where service `sut` runs `./wait-for-it.sh alerta:8080 -t 60 -- pytest tests/integration/` (capture 073, re-redacted). The upstream harness is Docker-based; the bare test command is `pytest tests/integration/`.
- Runtime dependencies (captures 199–202): `requirements.txt` pins `Click==8.3.1`, `pytz==2026.1.post1`, `PyYAML==6.0.3`, `requests==2.33.0`, `requests-hawk==1.2.1`, `tabulate==0.10.0`; `setup.py` `python_requires='>=3.10'`; CI matrix Python 3.10–3.14 (capture 074); harness image `python:3.13-alpine` + `pip install pytest` + `pip install .`.
- Server side in upstream CI: image `alerta/alerta-web` (mutable tag) + `postgres:14`, with `AUTH_REQUIRED=True`, `ADMIN_USERS=<ACCOUNT_EMAIL_005>,…`, and a fixed admin API key value (values redacted). **The upstream CI therefore does not test the frozen pin**; it tests whatever the mutable image provides.

### 3.3 Endpoint substitution — the disqualifying property

- Every `setUp` constructs `Client(endpoint='http://alerta:8080/api', key='<REDACTED>')` (capture 072, 10/10 files).
- `alertaclient/api.py:44`: `self.endpoint = endpoint or os.environ.get('ALERTA_ENDPOINT', self.DEFAULT_ENDPOINT)` (capture 082). Because an explicit `endpoint` is passed, `ALERTA_ENDPOINT` cannot override it. **The suite has no configurable base-address mechanism.**
- Mechanisms that would leave all test files byte-identical (recorded, not selected, not designed):
  1. **Name resolution** of host `alerta` to the target inside an isolated runner. Scheme, host label, port `8080` and path `/api` stay fixed; only the resolved address changes.
  2. **HTTP forward proxy** via `HTTP_PROXY` (requests honours it for `http://` URLs). This adds a proxy component to the A3 path.
  3. **Out-of-file pytest plugin/conftest** rewriting `Client` endpoint. This is new code, so it is a control-owned adapter (convergence step 2/3); the Executor may not author it.
- Each option's A3-S implication: pointing the fixed name at a no-listener address yields `requests` connection errors inside `setUp`/test bodies. That proves substitution only, which is what MA-1.4 A3-S requires.

### 3.4 Real HTTP — static proof

- `HTTPClient.__init__` creates `requests.Session()` (`api.py:568`). `get/post/put/delete` call `self.session.get/post/put/delete(url, …, timeout=self.timeout)` with `url = self.endpoint + path` (`api.py:593–623`; capture 082).
- No transport adapter or mounting is visible in the same excerpt. Evidence strength: static, not runtime.

### 3.5 Mock / intercept / in-process search with positive control

| Search | Scope | Result | Positive control |
|---|---|---|---|
| `requests_mock`, `unittest.mock`, `@patch`, `patch(`, `MagicMock`, `responses`, `httpretty`, `vcr` | `tests/integration` | **0 hits** (capture 083, exit 1) | same pattern, `tests/unit`: 14 files hit (capture 084) |
| `create_app`, `test_client` | `tests/integration` | not imported (capture 072 shows only `Client(...)` construction) | backend `tests/`: 32 files use `test_client()` (capture 117) |

### 3.6 API-version compatibility with the frozen backend (static)

- All 25 client methods used by the suite map to an existing frozen-backend route with the same HTTP method: **25 / 25 matched, 0 unmatched** (capture 193, script `tools/route_match.py`, inputs captures 091 + 092).
- Route prefix: the frozen backend registers the `api` blueprint with no prefix (`alerta/app.py:82`; `BASE_URL = ''` at `settings.py:13`; capture 194). The suite's `/api` path therefore requires a reverse proxy or WSGI mount at `/api` (upstream docker-alerta uses nginx for this). This is a required, recorded configuration item.
- Field semantics with static support: `alert.timeout == 86400` ↔ `DEFAULT_TIMEOUT = 86400`, `ALERT_TIMEOUT = DEFAULT_TIMEOUT` (`settings.py:203–204`, capture 114). `alert.value == '4'` ↔ `alert.py:35–36` casts int value to `str` (capture 159). A custom API key value is accepted: `ApiKey.__init__` uses the supplied key, else generates one (`models/key.py:27`, capture 115).
- Field semantics **UNVERIFIED** statically: `test_history.py::test_history` asserts `change_type == 'new'` for both history entries of resource `net03`. Its second alert (`node_marginal`) is in the first alert's `correlated` list, and the correlate path records `ChangeType.severity` (`alert.py:372`) while new alerts record `ChangeType.new` (`alert.py:407`) (capture 114). Whether this assertion passes on the frozen pin can only be settled by the local baseline run that Master 02 §6.6 assigns to instrument validation.

### 3.7 Test / assertion inventory (12 collected tests; capture 086, 089)

| Test | Calls (HTTP) | Assertions | State/config needs |
|---|---|---|---|
| `test_alerts.py::AlertTestCase::test_alert` | POST /alert | value `'4'`; timeout `86400`; `'london' in tags` | — |
| `test_alerts.py::AlertTestCase::test_alert_notes` | POST /alert; PUT note; GET notes; PUT/DELETE note | note text; `notes[0].user == '<ACCOUNT_EMAIL_005>'`; update text; notes empty after delete | key must belong to `<ACCOUNT_EMAIL_005>` |
| `test_blackouts.py::AlertTestCase::test_blackout` | POST/PUT/GET/DELETE blackout(s) | env/service/tags/origin; updated fields; `len == 2` then `1` | **fresh DB** |
| `test_customers.py::AlertTestCase::test_customer` | POST/PUT/GET/DELETE customer(s) | fields; `len == 2` then `1` | **fresh DB** |
| `test_groups.py::AlertTestCase::test_group` | POST/PUT/GET/DELETE group(s) | fields; `len == 2` then `1` | **fresh DB** |
| `test_heartbeats.py::AlertTestCase::test_heartbeat` | POST /heartbeat | origin; `event_type == 'Heartbeat'`; timeout 10; tag | — |
| `test_history.py::AlertTestCase::test_alert` | POST /alert ×2 | value `'1'`; timeout `86400`; tag | — |
| `test_history.py::AlertTestCase::test_history` | GET /alerts/history | 2 entries: env/service/resource/tags/`change_type=='new'` | **order-dependent** on `test_alert` in the same class (unittest alphabetical order); semantics UNVERIFIED (§3.6) |
| `test_keys.py::AlertTestCase::test_key` | POST/PUT/GET/DELETE key(s) | user; scopes; text; **literal key value**; counts | **fresh DB**; creates a key with a literal value (credential semantics, see §3.8) |
| `test_notes.py::AlertTestCase::test_notes` | none | none (`pass`) | contributes `executed` with no signal |
| `test_permissions.py::AlertTestCase::test_permission` | POST /perm | match; scopes | — |
| `test_users.py::AlertTestCase::test_user` | GET /users | `users[0]` is `<ACCOUNT_EMAIL_005>`, roles `['admin']`, status active | admin user must exist and sort first |

**Individually named likely-exclusion / attention items** (listed for Council/Human Operator; the Executor adds no exclusion):

1. `test_notes.py::AlertTestCase::test_notes` — no assertion; executed but carries no signal.
2. `test_history.py::AlertTestCase::test_history` — change-type semantics UNVERIFIED against the frozen correlate path; order-dependent.
3. `test_users.py::AlertTestCase::test_user` — depends on bootstrap order and admin identity.
4. `test_keys.py::AlertTestCase::test_key` — writes a literal API-key value; AMD-DK2 handling needed.
5. Count-based tests (`test_blackout`, `test_customer`, `test_group`, `test_key`) — require a fresh database per run, which bears on running A3-P, A3-S and A3-N with the same command.

### 3.8 Configuration requirements recorded (not chosen)

- `AUTH_REQUIRED=True`; `ADMIN_USERS` containing `<ACCOUNT_EMAIL_005>`.
- An admin user and an admin API key with a fixed value. In upstream Docker these are created by the image entrypoint (`alertad user --all --password …`; `alertad key --username … --key …`; docker-alerta `docker-entrypoint.sh:28–37`, capture 110). The frozen backend provides the same CLI options (`alerta/commands.py:47–55,150–154`, capture 114). These are credentials, so AMD-DK2 and a signed Action Receipt apply before any use.
- `/api` path prefix via reverse proxy or WSGI mount.
- Postgres persistence (upstream CI default).
- Fresh database per suite run.

### 3.9 Limitations / evidence strength

- All findings are static (source-level).
- Runtime pass/fail of the 12 tests against the frozen pin is UNVERIFIED. Master 02 §6.6 assigns that to a local baseline after an instrument is chosen.

## 4. C2 — docker-alerta RSpec suite (INELIGIBLE)

- Endpoint hard-coded: `GATEWAY_BASE_URL = "http://sut:8080/api"`, `WEB_BASE_URL = "http://sut:8080"` (`tests/spec/api_spec.rb`, blob `<PRIVATE_REF_05426>`; `web_spec.rb`, blob `<PRIVATE_REF_05608>`; captures 105–106).
- Assertions are coupled to the Docker image packaging, not the API: `server` header `nginx`; `X-Forwarded-For` in management properties; `/management/gtg` via nginx; web page title. A frozen-pin topology without that exact proxy would fail these by construction.
- Requests execute at example-group definition time, outside `it` blocks. `Client.get` rescues every exception and returns `e.response` (`helpers/client.rb`, capture 099). A connection failure therefore becomes `NoMethodError` on `nil` rather than a request failure, which muddies A3-S/A3-N classification.
- Only 14 API examples, mostly status codes; there is a state assertion `total is 0`. Sensitivity to an application defect (A3-N) is minimal.
- Toolchain: Ruby 3.0 image + `rspec`, `rest-client`, `nokogiri` (Gemfile, capture 107).
- Repo HEAD is not the `v9.1.0` tag (`v9.1.0` → `<PRIVATE_REF_05519>`; capture 197). The image installs `alerta-server==${SERVER_VERSION}` from PyPI (`Dockerfile:87`, capture 110), not the frozen git pin.

## 5. C3–C6 — disqualifying evidence

| ID | Evidence | Positive control |
|---|---|---|
| C3 frozen backend pytest | 32 test files use `test_client()` (capture 117); 0 test files call `requests.get/post/put/delete` (capture 118, exit 1) | `requests.(get|post|…)` found in 4 files under `alerta/` (capture 119) |
| C4 frozen webui Cypress | `cy.intercept`/`cy.mockApi`/`cy.mockAlertDetail` in all 7 specs plus 12 in `support/commands.js` (blob `<PRIVATE_REF_05422>`; capture 120); 44 `it(` examples (capture 121) | same tree, spec count capture 121 |
| C5 alerta-contrib | 7 plugin/webhook test files using unittest/mock/in-process patterns (capture 122) | — (counts are hits) |
| C6 angular-alerta-explorer | Protractor `baseUrl: 'http://localhost:8000/app/'`, scenarios `view1`/`view2` (capture 123) | — (counts are hits) |

## 6. Evidence gaps (A3)

- **EG-A3-1:** 15 org repositories were dispositioned from metadata only (§2); their trees were not inspected.
- **EG-A3-2:** No runtime evidence of any kind. C1 pass/fail, the `change_type` semantics and endpoint-substitution behaviour are all UNVERIFIED.
- **EG-A3-3:** Repositories outside the `alerta` org (third-party Alerta API suites) were not surveyed. The release limits additional candidates to those reached through an official chain, and none was found linked from the frozen backend README or `alerta-docs`.
- **EG-A3-4:** The upstream client CI targets a mutable server image (`alerta/alerta-web`), so it provides no evidence about the frozen pin.

## 7. Decisions returned to Council/Human Operator (not taken here)

1. Whether C1 proceeds to convergence step 2 (byte-identical-file substitution adapter), and if so which substitution class (name resolution / proxy / out-of-file plugin) — or `NO_CANDIDATE` → step 3.
2. Client pin choice: HEAD `<PRIVATE_REF_04519>…` versus tag `v8.5.3` `<PRIVATE_REF_05329>…`.
3. Exclusions and their reasons (§3.7 list is informational only).
4. Credential handling for the fixed admin key and the `test_key` literal under AMD-DK2.

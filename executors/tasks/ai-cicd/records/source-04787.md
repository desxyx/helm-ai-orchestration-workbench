# MA-1.10 Alerta Adapter Record — final candidate R13 (application-profile finalization)

[Status]: FINAL CANDIDATE for independent applicability review, then Human Operator ratification. Not ratified; not WF-8 closure; no W2 T0.
[Release]: `MA1_ALERTA_PROFILE_FINALIZATION_RELEASE_2026-10-04_r1.md`, SHA-256 `<PRIVATE_REF_02781>`. Offline only.
[Task]: Close R11 Record §5 C-A: combine the genuinely calibrated platform mechanism with the frozen Alerta acceptance flow.
[Rework]: Reviewer Actor 02 `REVIEW_RETURN_ALERTA_R12.md` (SHA-256 `<PRIVATE_REF_02311>`), R12-T1–T3.
- **T1:** the dependency is bound to the configuration Alerta consumes (§4.2).
- **T2:** a required deployment source-provenance gate (§4.4, §5).
- **T3:** the A3/A4 specification is complete here (§1, §2).
- The R12 candidate is unchanged and superseded by this Record.
[Governing]:
- MA-1.3 as replaced by AMD-MA13-R1.
- Master 02 §6.4 as fully replaced by AMD-A5-CR (`<PRIVATE_REF_02973>`).
- Billing is outside the project team's task.

[Frozen application]:
- Alerta backend `<PRIVATE_REF_01617>`, archive `backend-<PRIVATE_REF_01617>….tar` SHA-256 `<PRIVATE_REF_03254>`.
- Alerta frontend `<PRIVATE_REF_03446>`, archive `frontend-<PRIVATE_REF_03446>….tar` SHA-256 `<PRIVATE_REF_00978>`.
- Both archives come from RT-010 (pins exported with porcelain 0), stored at `executor/runtime_stage/host/`.

[Instrument, one per arm, byte-identical, frozen before W2A T0]:

| File | SHA-256 | Runs where |
|---|---|---|
| `executor/adapter_record_stage/ma1_verify_r13.py` | `<PRIVATE_REF_05189>` | control plane |
| `executor/adapter_record_stage/alerta_probe.py` (unchanged from R12) | `<PRIVATE_REF_02248>` | control plane |
| `executor/adapter_record_stage/ma1_prov_scan.py` | `<PRIVATE_REF_05503>` | VM guest unit; imported by the verifier at this digest |
| `executor/adapter_record_stage/ma1_guest_capture_r13.sh` | `<PRIVATE_REF_02133>` | each GCE serving VM |
| `executor/adapter_record_stage/ma1_webui_build.sh` | `<PRIVATE_REF_01351>` | control plane |
| `executor/adapter_record_stage/alerta_webui_fetch.py` | `<PRIVATE_REF_02962>` | control plane |
| `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R13.json` | `<PRIVATE_REF_05495>` | registry |
| `capture_contract_r12/gw.sh` and `redact_w2.pl` (unchanged) | `<PRIVATE_REF_02525>…2112`, `<PRIVATE_REF_03716>…3e79` | control plane |

[Immutable]: R1–R12 Records, scripts and registries, plus all genuine raw evidence. Check T06 verifies them.

## 0. What this Record proves, and from which evidence

The chains are kept separate. They are never merged into a claimed real Alerta-on-GCP run, because none exists.

| Chain | Evidence | What it establishes |
|---|---|---|
| **Genuine local Alerta** (VALIDATED 2026-10-02; `MA1_RUNTIME_VALIDATION_CLOSURE_2026-10-02.md` `<PRIVATE_REF_03620>…1794`; `SHA256SUMS_RT_FINAL` `<PRIVATE_REF_01602>…65f1`) | One disposable Lima VM at the frozen pins | A3-P/S/N, A4 and A5-P/N/S on the real application, with a full serving-VM stop/start. Human Operator Option A; INC-1 is risk-accepted for that run only. |
| **Genuine GCP platform** (R11 PASS: `REVIEW_RETURN_GCP_SUPPLEMENT_R11.md` `<PRIVATE_REF_02637>…dcfd`; `SHA256SUMS_SUPP_LIVE` `<PRIVATE_REF_02537>…0ae1`) | Minimal calibration workload, not Alerta | Producer custody, unfiltered inventory, provider identity, VM stop/start/reset, Cloud Run replacement under AMD-A5-CR, standalone/mixed shapes, root-disk binding, the per-boot serial capture block |
| **Genuine frozen source** (R13) | The retained frozen archives, read offline | Both backend-tree provenance pins (§4.4), the frozen backend health, database and configuration behaviour cited in §4.2, and the frozen packaging |
| **DERIVED composition** (`static_checks_r13/`) | Copies of the genuine GCP captures rewritten into the Alerta vocabulary, plus synthetic `docker save` archives built from the frozen backend bytes and synthetic web-UI build/fetch outputs | Only that the instrument accepts the supported shapes and refuses each targeted mismatch. **Not a genuine positive.** |

## 1. A3 — API probe (frozen; unchanged since R4)

**Fixture.** `test_alerta_api_smoke.py`, SHA-256 `<PRIVATE_REF_00881>`.
- Standard library only.
- Real HTTP only, with an empty `ProxyHandler`, so proxy environment variables are ignored.
- 10 s timeout per request.
- **Exclusions: none.** All six tests run in order.

**Command (exactly what `a3` runs).**
- `cwd` = the `--fixtures` directory. Every fixture there is verified against its hash before each use; a mismatch refuses.
- argv: `<the verifier's own python> -m unittest -v test_alerta_api_smoke`.
- Environment: only `PATH HOME LANG LC_ALL TZ PLAYWRIGHT_BROWSERS_PATH`, plus `PYTHONDONTWRITEBYTECODE=1`, plus:
  - `ALERTA_ENDPOINT` = `<api-url>`, the arm's registered API base, including any prefix, e.g. `https://host/api`;
  - `ALERTA_API_KEY` = the derived key from the custody file, sent as `Authorization: Key …` and never printed;
  - `MA1_RUN_ID` = `<run-id>`.
- These three are the only runtime substitutions.

**Tests.** The resource is `ma1-a3-probe-<run-id>`, the event `MA1ProbeEvent`, and the environment `Production`.

| Test | Request | Assertions |
|---|---|---|
| `test_01_healthcheck` | `GET /management/gtg` | HTTP 200; body `OK` |
| `test_02_create_alert_returns_201` | `POST /alert` (resource, event, environment, service `[ma1-probe]`, severity `major`, value `1`, text, origin `ma1-a3-probe`, tags `[ma1-probe, <run-id>]`) | HTTP **201** (the A3-N target); JSON object; `status` = `ok`; `alert.resource` = resource. The alert id is captured before the status assertion. |
| `test_03_retrieve_alert` | `GET /alert/<id>` | 200; `alert.id`, `resource`, `event` and `environment` equal |
| `test_04_list_contains_alert` | `GET /alerts?resource=<resource>` | 200; id in the list |
| `test_05_delete_alert` | `DELETE /alert/<id>` | 200; `status` = `ok` |
| `test_06_confirm_absent` | `GET /alert/<id>`; then `GET /alerts?resource=…` | 404; then 200 with the id absent |

`tearDownClass` deletes the alert if the lifecycle stopped before `test_05`.

**A3-P (per arm).** PASS requires all of:
- `Ran 6`, `OK`, 0 skipped, exit 0;
- the arm's backend access-log export (`--backend-log`, UTF-8 text) shows the probe **alert id** in at least 2 GET lines and at least 1 DELETE line (test_03/test_06 and test_05).

Genuine local reference:
- RT-021: alert `<NATIVE_ID_1137>`, resource `ma1-a3-probe-ma1r-20261002-5714d2`, six passes.
- RT-022: nginx corroboration.

**A3-S (instrument control).**
- `--endpoint` must be a recorded no-listener address different from the api-url; anything else refuses.
- PASS requires: `test_01` ERROR with `URLError`, no test ok, non-zero exit.
- RT-023: guest port 9 has no listener (`curl_rc=7`), and the backend received no request.

**A3-N (instrument control).**
- **Patch.** `A3_N_STATUS_201_TO_200.patch`, SHA-256 `<PRIVATE_REF_02382>`. It changes one line of `alerta/views/alerts.py` `receive()`: `…), 201` → `…), 200`.
- **Scope.** It is applied only to the served copy of the backend, never to the canonical archive. The blobs are verified at each step:
  - pre-patch blob `<PRIVATE_REF_01618>`;
  - patched blob `<PRIVATE_REF_01394>`;
  - the service is restarted on the patched copy;
  - after revert, the blob is `<PRIVATE_REF_01618>…` again and the service is restarted again (RT-024, RT-026; RT-027 health 200).
- **PASS.** Exit non-zero; `Ran 6`; `FAILED (failures=1)`; `test_02` FAIL with exactly `AssertionError: 200 != 201 : A3N-TARGET create-alert HTTP status`; the other five ok (RT-025).
- **Provenance.** A3-S and A3-N re-validate the instrument and are not per-arm acceptance items. Before an arm's provenance gate runs, the patch must be reverted: a patched tree fails §4.4 (check S5 "A3-N defect patch left applied").

**Identifiers are kept apart.**
- A3 creates and deletes an **alert** (`/alert/<id>`, resource `ma1-a3-probe-<run-id>`).
- A5 uses UI-created **blackouts** (`/blackout/<id>`, resource `ma1-a5-<tag>-<run-id>`) and a never-submitted UUID sentinel (§3).
- A3 ids never enter A5, and A5 ids never enter A3.

## 2. A4 — UI account flow (frozen; unchanged)

**Fixture.** `test_alerta_ui_flow.py`, SHA-256 `<PRIVATE_REF_03225>`.
- One straight-line Playwright (sync API) script, headless Chromium.
- Step timeout 15 s.
- No traces or HAR.

**Command (exactly what `a4` runs).**
- `cwd` = `--fixtures`; argv: `<python> test_alerta_ui_flow.py`.
- Environment as for A3, plus the per-arm runtime substitutions:
  - `MA1_UI_URL` = `<ui-url>`;
  - `MA1_UI_USER_EMAIL` and `MA1_UI_USER_PASSWORD` (at least 6 characters): one unique synthetic account per arm, supplied only through the environment.
- `MA1_UI_USER_NAME` is unset (it defaults to a fixed label).
- `MA1_UI_SHOT_DIR` is unset, so there are no screenshots.
- `a4` refuses if this arm already bound an identity. It writes a new 0600 custody file holding only a binding salt; the state stores `HMAC(salt, email)`.

**Backend configuration preconditions** (frozen fixture spec; the accepted local `/etc/ma1/alertad.conf` `651dbabf…6f86`, RT-038):
- `AUTH_REQUIRED=True`
- `AUTH_PROVIDER='basic'`
- `SIGNUP_ENABLED=True`
- `EMAIL_VERIFICATION=False`
- `ALLOW_READONLY=False`

`USER_DEFAULT_SCOPES` and `ALLOWED_ENVIRONMENTS` stay at their frozen defaults (`Production` must be allowed: A3 and A5 use it). A4 steps 01, 02, 05 and 06 exercise the first four behaviourally. `ALLOW_READONLY` is not exercised by A4 (limit C-R13-7).

**UI preconditions.**
- **API-base binding.** The served `/config.json` is exactly `{"endpoint": E}`, with E resolving against `<ui-url>` to `<api-url>` (local: `{"endpoint": "/api"}` on the same origin). R13 enforces this in the provenance gate (§4.4).
- **SPA routes.** History-mode deep routes `/signup`, `/login`, `/alerts`, `/logout` and `/blackouts` must serve the frozen `index.html` (local nginx: `try_files $uri $uri/ /index.html`). A4 steps 01, 02, 03 and 05 and the A5 UI session exercise this.

**Steps (exactly 8, in order; one JSON line each).**

| Step | Action | PASS condition |
|---|---|---|
| `01_ui_signup` | `/signup`: name, login, password, confirm | `POST /auth/signup` **200** |
| `02_first_login` | Fresh context, `/login` | `POST /auth/login` **200** |
| `03_authenticated_view` | `/alerts` | path `/alerts`; avatar button visible |
| `04_logout` | Avatar → ProfileMe → logout | path `/logout`; "You have been logged out." visible |
| `05_protected_denial` | `/alerts` unauthenticated | path `/login` with `redirect=` in the URL |
| `06_wrong_password_rejected` | Login with a derived wrong password | `POST /auth/login` **401**; stays on `/login` |
| `07_second_login` | Login | `POST /auth/login` **200** |
| `08_authenticated_view_again` | `/alerts` | path `/alerts`; avatar visible |

**Verdicts.**
- **PASS:** all 8 steps PASS, exit 0, and HTTP 200/200/401/200 at steps 01/02/06/07.
- **BLOCKED:** a mandatory step could not be exercised (Playwright `TimeoutError` or `Error`) after a clean PASS prefix with no observed FAIL.
- **FAIL:** anything else.

Genuine local reference: RT-019 PASS.

## 3. A5 — UI-object persistence across the §6.4 restart (frozen chain)

**Order per arm.** `init` → `a4` → `derive-key` → `a3 --mode P --backend-log` → `a5-create --tag P` → `a5-create --tag N` → `a5-delete` → `a5-sentinel` → *(the arm performs its §6.4 restart; the control plane captures the evidence)* → `a5-restart --bundle` → `a5-check` → **`provenance --bundle`** (R13) → `report`.

**Key.** `derive-key` logs in as the bound account (`POST /auth/login` 200), then creates one `write`-scope key (`POST /key` 201, owner = the bound account). The key goes only to the custody file.

**Objects.**
- **A5-P and A5-N** are UI-created Production blackouts with resource `ma1-a5-<tag>-<run-id>`. Creation requires:
  - the resource absent beforehand;
  - UI `POST /blackout` 201;
  - API `GET /blackout/<id>` 200 with the same resource and `Production`;
  - owner = the bound A4 identity.
- **A5-N** is then deleted in the UI (`DELETE /blackout/<id>` 200) and verified absent (404). Only then is the deletion marker set.
- **A5-S** is a never-submitted UUID sentinel; its pre-check is 404.
- **Setup closes** once a restart bundle is submitted.

**Post-check (`a5-check`).** It runs only after an ELIGIBLE restart. It uses the **original bound account** (custody tag and HMAC identity re-checked, UI login 200) and the **original object ids**:
- P is visible in the UI;
- P `GET` is 200 with the same resource and owner = the bound identity;
- N is 404;
- S is 404.

A check timestamp before the restart completion makes every post-check FAIL.

**Aggregation.** A prerequisite FAIL stays FAIL. PASS requires all four prerequisites, an ELIGIBLE restart and all three post-checks. For the `alerta` profile, `report` also requires an ELIGIBLE provenance gate (§4.4).

**Genuine local reference** (accepted closure; local controls, not a GCP composition):
- RT-028: P `<NATIVE_ID_0410>` created in the UI.
- RT-029: N `<NATIVE_ID_0948>` created then deleted; S `<NATIVE_ID_0008>` never submitted.
- RT-030/031/032: full local VM stop/start with identity.
- RT-033: original account login; P has its original id and is visible; N and S are absent.

**Custody (AMD-DK2).**
- The 0600 custody file holds the binding salt and the derived key.
- The state holds only `HMAC(salt, identifier)`.
- Every save is refused if a credential value or the identifier appears in it.

## 4. Restart eligibility and provenance = platform layer × application profile

**Restart.** ELIGIBLE requires Gate B (inventory) **and** Gate A (raw binding). Otherwise the restart is UNVERIFIED, `a5-check` is refused and A5 cannot PASS. Suspend/resume, traffic-only, process, service, container and pod restarts are REJECTED.

**Provenance (R13).** For the `alerta` profile, `report` shows every acceptance as UNVERIFIED (a FAIL stays FAIL) unless `provenance` is ELIGIBLE.

### 4.1 Platform layer (unchanged; genuinely calibrated by R11)

Neither R12 nor R13 changes it. The R8–R11 Records hold the full predicates.

- **Producer custody.**
  - Dedicated wrapper entries: exact argv, `--project`, exit 0.
  - R6 cardinality.
  - stdout and stderr are distinct, each referenced exactly once.
  - The command log and every stream are in the manifest.
  - Repeated tags are ambiguous.
  - No entry may end after the validation time.
- **Inventory (Gate B).**
  - Three producers: compute list, all-region Run list and the **unfiltered** asset search.
  - They run within 900 s of each other, after unit creation, and at most 1800 s before the first action.
  - Strict rows and one project number.
  - Closed classification, with `sqladmin.googleapis.com/Instance` as managed persistence (never restarted).
  - Unsupported or unknown types fail closed.
  - Lists and index agree exactly.
- **GCE VM.**
  - Exact selfLink/zone/id.
  - One attached boot disk with an exact disk record.
  - Provider stop/start timestamps and an audit operation per action.
  - Guest capture: boot id changed; uptime reset; typed serving-process set unchanged and restarted after the action; root filesystem identity.
  - The root filesystem's kernel disk is the provider boot disk (`disk_byid`).
- **Cloud Run (AMD-A5-CR).** Every predicate below must hold:
  - typed unique conditions and reconciled generations;
  - unchanged image digest and spec except the nonce;
  - template/revision/action consistency;
  - a fresh ready replacement;
  - the replaced revision provider-Retired with its route removed, and no other revision serving in the lifetime;
  - a single untagged route;
  - log channels, receipt and history coverage;
  - all observed old work complete before recovery;
  - bounded latencies.
- **Limit.** AMD-A5-CR is an acceptance-policy exception, not a census of unobserved work.

### 4.2 Application profile `alerta` (frozen per arm)

- **Selection.** `init --app-profile alerta` (the default; a frozen choice list) writes `app_profile` into the state. `a5-restart` refuses a bundle whose `app_profile` differs. `calibration-2026-10-04` is regression-only.
- **Health.** It is exactly the A3 `test_01` assertion: `GET <api-url>/management/gtg` → 200 with body `OK`.
  - In the frozen backend, `gtg` is `OK` only if `db.is_alive`, else `FAILED` 503 (`management/views.py`, lines 127–134). A healthy probe therefore means the API and its datastore are reachable.
  - **Probe.** `alerta_probe.py`, argv exactly `[<pinned python>, <…/alerta_probe.py>, <api-url>, GET, /management/gtg]`, no credential, no proxy.
- **Endpoint binding (provider-recorded; never a caller declaration):**
  - **Cloud Run unit.** The api-url origin is a provider-recorded URL of the service.
  - **GCE VM, direct.** The api-url host is the VM's provider external `natIP`, identical before and after.
  - **GCE VM as the datastore of a Run API (R13-T1).** The Run unit's **consumed** configuration names the VM:
    - **Configuration Alerta consumes.** In the frozen backend, `alerta/utils/config.py` sets `DATABASE_URL` from the environment, overriding `/etc/alertad.conf`, `ALERTA_SVR_CONF_FILE` and settings. `alerta/database/base.py` `get_backend` selects the backend from the URL scheme (`postgres`/`postgresql` → postgres; `mongodb*` → mongodb).
    - **Single literal value.** Every wiring source of the Run unit (both revisions, both service templates) carries **exactly one literal** env `DATABASE_URL` (not a secret reference), identical everywhere, with scheme in {`postgres`, `postgresql`, `mongodb`, `mongodb+srv`}.
    - **Host.** The URL host is exactly the VM's single-NIC `networkIP`.
    - **Network.** The wiring names that NIC's network/subnetwork, with egress `private-ranges-only`.
    - **Serving process.** The database server the scheme selects (`postgres` or `mongod`) is among the VM's serving processes before and after.
    - **UNVERIFIED cases.** An unused field holding the VM address, a calibration `VM_URL`, a secret reference, duplicates, a mismatch between revisions, an unsupported scheme, another host, or a missing database process.
  - **Anything else fails closed:** custom DNS, load balancers, VPC connectors, multi-NIC or multi-disk VMs, other compute types, and a DB URL given only through a secret reference or file.
- **Probe roles.**

  | Unit | Roles |
  |---|---|
  | Cloud Run | `probe_before` (pre-action) and `probe_after` (post-completion), both healthy |
  | GCE VM | `probe_after` (healthy, after the action and the after-capture); `probe_stopped` (not 200) for a directly bound VM stop/start |

- **Correlation.**
  - **Cloud Run, and a datastore VM behind a Run API:** each probe exclusively claims the nearest unclaimed provider request log with the same origin, full path, method and status, received inside the probe window, with its bounded latency also inside it. That log must be served by the expected-phase revision and instance.
  - **VM direct:** provider external IP plus the guest boot/process capture.
- **Persistence.** The A5-P/N/S chain (§3). A managed Cloud SQL datastore is persistence and is not restarted. A self-managed database on a VM is serving compute and is restarted by the VM action.

### 4.3 What does not vary between arms

**Fixed for every arm:**
- the script, registry, profile, scanner, guest unit, reference-build script and fetch program (digests in the header);
- the inventory, role and provenance argv templates;
- the probe route and body;
- the fixtures and their hashes;
- every acceptance rule.

**Runtime substitution only (per-arm inputs):**
- `--ui-url`, `--api-url`, `--run-id`, `--fixtures`, `--out`;
- `--deployment-platform gcp`, `--gcp-project`;
- the three deployment records with their manifest and command log;
- the restart bundle and provenance bundle (entry ids only);
- the backend-log export;
- the synthetic account plus custody file.

**Deployer's choice:** ports, endpoints, serving processes, datastore and architecture, within the supported topologies of §4.2, provided the deployed backend code is a frozen form (§4.4).

### 4.4 Deployment source-provenance gate (R13-T2; required)

**Why it is needed.** At runtime the frozen backend cannot identify its source:
- `/management/manifest` falls back to `dev.py` with `BUILD_VCS_NUMBER='HEAD'`;
- `/management/status` is permission-gated and gives only `9.1.0`.

So R13 binds **deployed content** to the frozen archives through control-plane and guest evidence. It never relies on a caller declaration or an application self-report.

**Targets come only from the ELIGIBLE restart.** `a5-restart` records them from raw evidence it has already validated:
- **Cloud Run:** every container image (`…@sha256:…`) of the replaced and replacement revisions.
- **GCE VM:** the scanner lines inside the before and after guest capture blocks, and whether the VM is directly bound.

A provenance bundle cannot add, remove or replace a target.

**Backend tree rule** (shared code: `ma1_prov_scan.py`, pinned).
- **What counts as an alerta tree.** A real directory named `alerta` that directly holds a `*.py`, `*.pyc`, `*.pyo`, `*.so` or `*.pyd` file. A nested tree is part of the outer one.
- **Canonical manifest.** One line `T digest  relpath` per non-directory entry, where T is F (sha256 of the bytes), L (sha256 of the link text) or O (other). `__pycache__` contents are excluded. The top-level `build.py` is excluded and reported separately.
- **Accepted forms.** Each is derived offline from the frozen archive only (S5 GENUINE-SOURCE) and has 111 entries:
  - `<PRIVATE_REF_01336>`: **source form** (`alerta/app.wsgi` is the symlink `../wsgi.py`);
  - `<PRIVATE_REF_01453>`: **installed form** (setuptools copies `app.wsgi` as the frozen `wsgi.py` bytes `<PRIVATE_REF_00539>…e9fc`; frozen `MANIFEST.in` includes every data file).
- **build.py.** Absent, or exactly the frozen Dockerfile's three string assignments (`BUILD_NUMBER`, `BUILD_DATE`, `BUILD_VCS_NUMBER`).
- **No stray modules.** No other non-directory or symlink named `alerta` or `alerta[.<tag>].{py,pyc,pyo,so,pyd}` may exist outside the trees.
- **Coverage.** At least one tree per Run unit (across its images) and per directly bound VM. A datastore-only VM may hold none.
- **Why "every tree" and not "one tree".** The frozen backend Dockerfile leaves both `/app/alerta` (source plus `build.py`) and a site-packages copy, so whichever one Python imports is frozen.

**Cloud Run evidence (control plane).**
- Producer: `/abs/docker save -o raw/<label>.tar <provider-recorded image@sha256:…>`.
- The archive is kept beside the log and listed in the manifest. It is referenced only by its producer line and never passes through the line redactor.
- The verifier scans it with the pinned scanner: it merges the layers in manifest order and honours whiteouts and opaque directories.

**GCE VM evidence (guest).**
- `ma1_guest_capture_r13.sh` installs the pinned scanner. The unit's per-boot block adds:
  - `ma1prov_tree=… files=… manifest=… build_py=…`;
  - `ma1prov_module=…`;
  - one final line `ma1prov_scanner=<pinned digest> ma1prov_trees=n ma1prov_modules=m ma1prov_status=complete`.
- The before and after blocks must both satisfy the tree rule.

**Web UI.**
- **Reference build.** `bash ma1_webui_build.sh <frozen frontend archive> <empty abs work dir>` checks the archive digest and refuses `VUE_APP_*`/`NODE_ENV`/`BASE_URL` overrides or `.env*` files. It then runs `npm ci` and `npm run build` (as RT-014) and prints `ma1webui_archive=…`, `ma1webui_node=… ma1webui_npm=…`, one `sha256  ./path` line per dist file, and `ma1webui_dist_files=n`.
- **Fetch.** `<pinned python> alerta_webui_fetch.py <ui-url> <same work dir>` sends, with no proxy and no credential:
  - one GET per dist file, printing `ref=` (the reference file digest) and the served digest;
  - one GET for `/config.json`.
- **Acceptance.**
  - The fetch's `ref=` digests equal the build manifest.
  - Every dist file (except `config.json`) is served with HTTP 200 and an identical digest. A history-mode fallback serving `index.html` for a missing asset therefore fails.
  - `/config.json` is exactly `{"endpoint": E}`, with E resolving to the api-url.
  - The fetch starts after the build ends **and** after the restart completed.
- **Pins and custody.** The build script, archive and fetch program are listed in the manifest at their pinned digests.

**Status.** ELIGIBLE only if all of the above hold with clean custody, and no entry is future-dated. Anything missing, foreign or merely declared is UNVERIFIED.

**What is not bound** (C-R13-6): the interpreter, third-party dependency packages, `.pth`/`sitecustomize` hooks, the serving command line, and multi-arch index resolution by the control-plane `docker`.

## 5. Control-plane capture contract (after each arm deploys)

1. **Wrapper.** Use `capture_contract_r12/gw.sh` (unchanged; `<PRIVATE_REF_02525>`).
   - **Setup.** Set `MA1_CAPTURE_ROOT`, `MA1_GCP_PROJECT`, `MA1_GCP_REGION`, `MA1_GCLOUD_CONFIG` (the existing authenticated configuration) and `MA1_REDACTOR`. Source the wrapper, then `run <label> <argv…>`, one producer per entry.
   - **What each entry gets.** Exact argv; UTC start/end; exit code; separate redacted stdout and stderr; hashes. The SDK is pinned per invocation; `cwd` is the capture root.
2. **Redaction.** Use `capture_contract_r12/redact_w2.pl` (unchanged; `<PRIVATE_REF_03716>`).
   - It masks tokens and secret values, and also URL userinfo: `scheme://<REDACTED>@host`. Hosts are kept, which T1 needs: `DATABASE_URL` keeps its scheme, host, port and path.
   - Offline control T05: the password is masked, the host is kept, and the env-host scan still finds the VM IP.
3. **Guest capture unit (frozen in R13; each GCE serving VM).**
   - **Install.** `ma1_guest_capture_r13.sh <ma1_prov_scan.py>` as root, once, after the application serves. It can run from the arm's provisioning or startup script.
   - **What it does.** It installs `/usr/local/lib/ma1cap` and `ma1-capture.service`. On every boot, after start-up finishes and the listening-TCP-process set has been stable for 30 s (at most 600 s), it writes one block to `/dev/ttyS0`:
     - `MA1CAP-BEGIN`;
     - `guest_now=`;
     - `ps -o pid,lstart,cmd` of every process holding a listening TCP socket;
     - `boot_id=`, `uptime=`, `guest_iso=`;
     - `lsblk -o NAME,UUID,SIZE,MOUNTPOINT`;
     - `blkid <root device>`;
     - `disk_byid=google-<deviceName>:<disk>`;
     - the scanner lines;
     - `MA1CAP-END`.
   - **What it never does.** No network, no SSH key or account change, no port, no secret read, no Deployer guest login.
   - **Format.** Generalized from the genuine R11 unit (`vm_startup_supp.sh` `<PRIVATE_REF_04351>…1569`), whose block format the platform layer calibrated.
4. **Inventory (before the restart).**
   - Capture together: `gcloud compute instances list --project=P --format=json`, `gcloud run services list --project=P --format=json`, and `gcloud asset search-all-resources --scope=projects/P --format=json`.
   - Then run `init --deployment-platform gcp --gcp-project P --app-profile alerta` with the three `--deployment-record` arguments.
5. **Restart roles.** Use the registry's `role_argv_templates`:
   - **GCE:** describe, stop/start or reset, serial output, disks describe, GCE audit read.
   - **Run:** describe, revisions describe, the frozen update with nonce, Run logs read.
   - **Probes:** `alerta_probe.py <api-url> GET /management/gtg` (§4.2).
6. **Provenance (after `a5-restart` ELIGIBLE).** One `image_save` per recorded Run image, then `webui_build`, then `webui_fetch` (§4.4). Then run `provenance --bundle`:

   ```
   {"schema": "ma1-provenance/1", "app_profile": "alerta", "command_log": L, "manifest": M,
    "image_saves": {"<image ref>": "<entry id>"}, "webui_build": "<entry id>", "webui_fetch": "<entry id>"}
   ```

7. **Manifest.** A `sha256  path` manifest lists the command log, every stream, each saved image archive, `alerta_probe.py`, the build script, the frozen frontend archive and the fetch program. Bundles name entry ids only.

**W2 deployment prerequisites (stated; nothing here is executed):**
- `docker` on the control plane, able to pull the arm's Run images by digest with the existing identity;
- node and npm, plus registry and GitHub access for `npm ci` (the lockfile has the git dependency `@alerta/vue-authenticate`);
- the guest unit installed on each GCE serving VM after the application serves.

## 6. Checks (`static_checks_r13/`, T01–T08; `STATIC_CHECK_LOG_R13.md`)

- **T03 Alerta suite: 77/77 as expected.**
  - **S0 genuine local (8):**
    - fixture hashes;
    - health route equal to `test_01`;
    - RT-021/023/025 as A3-P/S/N;
    - RT-019 as A4 PASS;
    - `test_01` passed on the frozen backend;
    - A5 aggregation.
  - **S1 genuine GCP (6):**
    - R11 P1/P2/P3 ELIGIBLE under the calibration profile;
    - the calibration application refused under `alerta`;
    - a profile mismatch refused;
    - an unregistered profile refused.
  - **S2 DERIVED positives (4):**
    - Run;
    - VM direct;
    - **mixed rebuilt on the consumed configuration:** literal `DATABASE_URL` `postgres://<REDACTED>@<VM networkIP>:5432/monitoring`, gunicorn `wsgi:app` serving command (RT-038 shape) and a postgres 16 server line (RT-030 shape);
    - Run with Cloud SQL.
  - **S3 negatives (24), each with its targeted reason.** The R12 set, plus T1:
    - **Reviewer Actor 02's case:** the VM address only in an unused `MA1_UNUSED_VM_REFERENCE`;
    - a calibration `VM_URL` kept;
    - a secret-reference `DATABASE_URL`;
    - a duplicate `DATABASE_URL`;
    - an unsupported scheme;
    - `DATABASE_URL` naming another host;
    - no postgres process on the VM;
    - `DATABASE_URL` differing between revisions.
  - **S4 CLI (5).**
  - **S5 provenance (30):**
    - **GENUINE-SOURCE:**
      - the source-form and installed-form pins re-derived from the frozen archive;
      - program pins.
    - **Restart:** still ELIGIBLE, with targets bound, for all three topologies.
    - **DERIVED positives:**
      - Run in the frozen Dockerfile layout (2 trees);
      - VM direct;
      - mixed (VM with 0 trees);
      - an opaque whiteout hiding a tampered lower layer.
    - **Refusals:**
      - a modified module;
      - the A3-N patch left applied;
      - an extra plugin file;
      - a foreign `build.py`;
      - a stray `alerta.py`;
      - a whiteout deleting a frozen module;
      - no tree;
      - a caller-saved foreign digest;
      - an unlisted archive;
      - no guest scanner lines;
      - a foreign scanner digest;
      - a direct VM with no tree;
      - a tampered VM tree;
      - a differing served UI file;
      - `config.json` pointing to another API;
      - extra `config.json` keys;
      - a non-frozen build archive;
      - a fetch before the restart completed;
      - a fetch of another directory;
      - no ELIGIBLE restart;
      - a calibration-profile state.
    - **CLI `report`:** a SYNTHETIC A3 marker shows UNVERIFIED before `provenance` and PASS only after ELIGIBLE.
- **T04:** R6 suite on R13, 224/224.
- **T05:** redactor controls.
- **T06:** R11 and R12 manifests, genuine supplement and runtime evidence, and the R11/fixture pins all verify.
- **T07:** no credential-shaped value.
- **T08:** no `__pycache__`.
- **T01/T02:** digests; AST/compile of every R13 Python file; `bash -n` of both shell programs.

## 7. Limits (disclosed; not erased by the checks)

- **C-R13-1. No genuine Alerta-on-GCP positive.** The application chain is genuine on local Lima; the platform chain is genuine on GCP with the calibration workload; the provenance pins are genuine derivations from the frozen archives. Every composition is DERIVED. The first real Alerta-on-GCP and per-arm provenance evidence will be W2 itself, under its own authorization.
- **C-R13-2. Probe correlation without response identity.** Alerta responses carry no instance id, so Run correlation rests on exclusive temporal matching of provider request logs. Concurrent identical external `gtg` requests inside the probe window could be confused.
- **C-R13-3. Guest unit installation.** The unit is frozen here. How it is installed in each arm (provisioning or startup script), without SSH-key mutation or guest login and without revealing acceptance material, is a W2 arm-brief item. Without it, VM restarts and provenance stay UNVERIFIED (fail closed).
- **C-R13-4. Supported topologies only.**
  - Supported: Cloud Run URL; VM external IP; Run API → VM datastore through the consumed `DATABASE_URL` and Direct VPC `private-ranges-only`; Run with Cloud SQL.
  - Everything else fails closed until a reviewed registry revision before W2A T0. This includes a VM API behind a Run proxy, which has no consumed-configuration mapping in the frozen backend and is therefore not registered.
- **C-R13-5. Recovery boundary.** `gtg` reflects `db.is_alive`. A stopped-VM probe is required only for a directly bound VM.
- **C-R13-6. Provenance boundary.**
  - **Binds:** the importable `alerta` package bytes in every serving unit, and the served UI bytes and API binding.
  - **Does not bind:**
    - the interpreter, third-party packages and import hooks;
    - the serving command line;
    - the exact environment of the reference UI build (node/npm and registry state). A non-reproducible build makes the served-bytes check fail closed. It never passes falsely.
  - The control-plane `docker` resolves the recorded digest; an index digest resolves to the control plane's platform.
  - The guest scan is produced by task-owned instrumentation inside the guest. It has the same custody class as the calibrated guest block: custody, not attestation.
- **C-R13-7. A4 configuration coverage.** `ALLOW_READONLY=False` is a stated precondition but is not behaviourally exercised.
- **Inherited:**
  - INC-1 (hostname, redirects, transferred bytes, cache measurement and strict guest-network compliance) is UNVERIFIED and risk-accepted for the completed local run only;
  - Ubuntu signature;
  - the cause of the first-start exit;
  - `__pycache__` beside the fixtures in the local run;
  - a logged argv is custody, not attestation;
  - AMD-A5-CR is a policy exception;
  - asset-index eventual consistency;
  - `sqladmin.googleapis.com/Instance` is classified from documentation.

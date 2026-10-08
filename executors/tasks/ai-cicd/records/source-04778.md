# MA-1 Alerta Adapter Record — final candidate R2 (MA-1.10)

[Status]: CANDIDATE R2 for independent finite VerifyOnly review, then Human Operator ratification into the W2 Measurement Addendum. Not ratified; not a WF-8 release.
[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R1 · [Author]: Executor Actor 01
[Releases]: completion `<PRIVATE_REF_02396>…dcd7`; targeted rework `MA1_ADAPTER_RECORD_TARGETED_REWORK_RELEASE_2026-10-02_r1.md`, SHA-256 `<PRIVATE_REF_03176>`
[Supersedes for review]: R1 `MA1_ADAPTER_RECORD_CANDIDATE_FINAL.md` (`<PRIVATE_REF_03070>…26e1`) and `ma1_verify.py` (`<PRIVATE_REF_01533>…2e08`). Both are preserved unchanged under manifest `SHA256SUMS_ADAPTER_STAGE` (`<PRIVATE_REF_02708>…3d4b`).
[Basis]: MA-1.8 local controls `VALIDATED` (closure `<PRIVATE_REF_03620>…1794`; runtime manifest `<PRIVATE_REF_01602>…65f1`). Governing semantics: Master 02 §6.1, §6.4, §6.6. Nothing generic is redefined.

## 0. Scope: local validation is not an arm result

- **What MA-1 established.** MA-1 validated this adapter as an instrument on one disposable local VM running the frozen pins (backend `<PRIVATE_REF_01617>`, frontend `<PRIVATE_REF_03446>`).
- **What it did not establish.** It gives no W2 arm result. An arm's A3/A4/A5 status comes only from applying this unchanged adapter to that arm's own endpoints, with its own synthetic account, backend-log export and §6.4 restart evidence.
- **Local values are not arm values.** Local endpoints, identifiers and restart evidence are MA-1 provenance only.

## 1. A3 — objective API suite

| Field | Frozen value |
|---|---|
| Suite locator | `test_alerta_api_smoke.py`, SHA-256 `<PRIVATE_REF_00881>` |
| Command | `ALERTA_ENDPOINT=<api-base> ALERTA_API_KEY=<from custody> MA1_RUN_ID=<non-secret id> python3 -m unittest -v test_alerta_api_smoke` (Python ≥ 3.10, standard library only) |
| Endpoint substitution | `ALERTA_ENDPOINT` is the deployed API base **including** any proxy prefix (for example `https://<host>/api`). Nothing else changes. |
| Credential | One `write`-scoped API key for the **same** synthetic account that A4 created, via `POST /auth/login` then `POST /key`. The key owner is verified against the bound identity. The key is held only in the mode-0600 custody file (AMD-DK2, §4). |
| Collected cases | 6 cases issuing 7 requests: gtg; create (A3-N target); retrieve; filtered list; delete; confirm absent (GET 404 plus list) |
| Baseline exclusions | **None.** All 6 cases passed locally. |
| Per-arm pass condition | **Both** of the following, and nothing else is PASS: (a) `Ran 6 tests`, `OK`, 0 skipped (an unnamed skip fails), exit 0; **and** (b) backend-log correlation. For (b) the arm exports a backend access-log window, and the probe's alert id must appear in at least 2 `GET` lines and at least 1 `DELETE` line (test_03, test_06, test_05). A missing, non-UTF-8, empty or binary log, or one that does not match, makes A3 **FAIL**. |

**Instrument controls, validated locally and not repeated per arm.**
- **A3-S.** A recorded no-listener endpoint gives `test_01` ERROR `URLError`, 02–06 fail or error, and no backend request.
- **A3-N.** One pre-registered defect: `A3_N_STATUS_201_TO_200.patch`, SHA-256 `<PRIVATE_REF_02382>` (`alerta/views/alerts.py` blob `<PRIVATE_REF_01618>…` → `<PRIVATE_REF_01394>…`). Valid result: `FAILED (failures=1)`, exactly `test_02` with `AssertionError: 200 != 201 : A3N-TARGET create-alert HTTP status`, the other tests pass, and the backend stays healthy. Connection, setup, collection or import failures are invalid.

MA-1 result: all valid (RT-021/022, RT-023, RT-024–027).

## 2. A4 — browser account path

| Field | Frozen value |
|---|---|
| Locator | `test_alerta_ui_flow.py`, SHA-256 `<PRIVATE_REF_03225>` (Python Playwright, Chromium, headless) |
| Command | `MA1_UI_URL=<ui-base> MA1_UI_USER_EMAIL=<env> MA1_UI_USER_PASSWORD=<env> python3 test_alerta_ui_flow.py`. The verifier never sets `MA1_UI_SHOT_DIR`, so no A4 screenshots are taken. |
| Ordered path | 1 sign-up (`POST /auth/signup` 200) → 2 fresh-context first login (200) → 3 authenticated `/alerts` → 4 logout via avatar menu → 5 protected `/alerts` redirects to `/login?redirect=…` → 6 wrong password (401, stays on `/login`) → 7 second login (200) → 8 authenticated `/alerts` |
| Required config | `AUTH_REQUIRED=True`, `AUTH_PROVIDER=basic`, `SIGNUP_ENABLED=True`, `EMAIL_VERIFICATION=False`, `ALLOW_READONLY=False`; frozen defaults for `USER_DEFAULT_SCOPES` and `ALLOWED_ENVIRONMENTS` (including `Production`); frozen UI build whose `config.json` endpoint reaches the same backend; SPA deep-link fallback |
| Verdicts (MA-1.5) | **PASS:** exit 0 and exactly the 8 ordered step lines, all `PASS`, with codes 200/200/401/200. **BLOCKED:** every step reached so far passed, there is no `FAIL` step line, and the run aborted with a Playwright unavailability error (`TimeoutError`/`Error`) before the next mandatory step. The record names that step. **FAIL:** anything else, including an observed `FAIL` step, an assertion abort, a missing step or a wrong code. An API-created account never substitutes. |

MA-1 result: PASS (RT-019).

## 3. A5 — persistence object and restart

| Field | Frozen value |
|---|---|
| Object | One Alerta **blackout**, created through the frozen UI `/blackouts` → add → `New Blackout`: `Environment=Production`, `Resource=ma1-a5-<tag>-<run_id>`, `Reason=MA-1 A5 <tag> <run_id>`, then Save |
| Identifier | The `id` from the UI's `POST /blackout` 201 response. "Absent before" means no row with that resource in `GET /blackouts`. The object's `user` must equal the bound identity; this is compared in memory and only the boolean is recorded. |
| Prerequisites (all must PASS before a restart can be recorded) | `A5-P-setup`: absent, then UI-created and present. `A5-N-setup`: same, for a separate object. `A5-N-delete`: UI `DELETE` 200 and then `GET` 404; the deletion marker is set only after this verification. `A5-S-precheck`: a never-submitted UUID returns 404. Once a restart has been submitted, no setup step can run. |
| Restart | Each arm performs the action for its own shape under Master 02 §6.4. The verifier only validates an evidence bundle; the format is in the script's `--help` epilog. **REJECTED:** `process_restart`, `service_restart`, `container_restart`, `compose_restart`, `pod_restart`, `app_restart` or `worker_restart`. **UNVERIFIED:** absent, incomplete or inconsistent evidence. **ELIGIBLE:** only if every check below holds. |
| VM eligibility | `action_kind` is `vm_stop_start` or `vm_reset`, the action text is recorded, and `inventory_source` is given. The VM entries cover exactly the declared serving VMs. Timeline: A5 setup ≤ before-capture ≤ stop ≤ start. For **every** VM: stopped state observed between stop and start; boot id changed; uptime ≤ elapsed time since the start action + 60 s; every pre-restart serving process present again, each started after the start action; persistent-storage identities non-empty and identical. App unreachable while stopped and reachable after start. Every raw evidence file exists and matches its SHA-256. |
| Serverless eligibility | `action_kind` is `replace_all_instances`. A rationale was recorded before the action. Every declared serving unit has non-empty before and after instance identities that do not overlap, captured before and after the action. App reachable afterwards. Raw files exist and match their hashes. A managed database is not restarted. |
| Post-restart check (only after ELIGIBLE) | Same bound account logs in through the UI and the A5-P row is visible. `GET /blackout/<P>` returns 200 with the same resource and owner. `A5-N`: the checker returns FAIL for its id (404). `A5-S`: 404. All checked after the restart completed. |
| A5 overall | **FAIL** if any prerequisite failed; a later PASS cannot mask it. **UNVERIFIED** if a prerequisite never ran, the restart is not ELIGIBLE (including REJECTED), or the post-check is missing. **PASS** only if all four prerequisites and all three post-checks pass. |

MA-1 result: PASS (RT-028–RT-033). The MA-1 evidence, transcribed into this bundle format with RT-030/031/032 as hash-bound raw files, validates as ELIGIBLE offline.

## 4. Identical-arm verification script and AMD-DK2 custody

| Field | Value |
|---|---|
| Locator | `executor/adapter_record_stage/ma1_verify_r2.py`; arms receive a byte-identical copy |
| SHA-256 | `<PRIVATE_REF_03278>` |
| Dependencies | Python ≥ 3.10 standard library; Python Playwright with Chromium for `a4` and the `a5-*` UI steps |
| Arm inputs | `--ui-url`, `--api-url`, `--fixtures`, `--out`, `--state`, `--run-id`, `--custody-file`, `--backend-log`, `--bundle`; env `MA1_UI_USER_EMAIL` and `MA1_UI_USER_PASSWORD`. No host path, VM name or credential location is built in. |

**Custody.**
- **The custody file.** `a4` creates a new mode-0600 custody file holding a random identity-binding salt. `derive-key` adds the API key to the same file.
- **What the state holds.** Only `HMAC(salt, identifier)` and a custody tag. Every later step recomputes the HMAC from the environment and refuses on any mismatch, which binds A4, key derivation and A5 to one identity.
- **What never appears.** The identifier, password and key never appear in arguments, events, state or captures. Every save is refused if any of them is present (case-insensitive), and captures are scrubbed before they are written.
- **Screenshots.** Off by default. Optional A5 screenshots mask the login and password inputs and any text showing the identifier.

Invocation, per arm, run by Human Operator outside the Deployer session:

```
python3 ma1_verify_r2.py init --state S --run-id <id> --ui-url <ui> --api-url <api> --fixtures <dir> --out <dir>
python3 ma1_verify_r2.py a4 --state S --custody-file C
python3 ma1_verify_r2.py derive-key --state S --custody-file C
python3 ma1_verify_r2.py a3 --state S --custody-file C --mode P --backend-log <exported backend log window>
python3 ma1_verify_r2.py a5-create --state S --custody-file C --tag P
python3 ma1_verify_r2.py a5-create --state S --custody-file C --tag N
python3 ma1_verify_r2.py a5-delete --state S --custody-file C
python3 ma1_verify_r2.py a5-sentinel --state S --custody-file C
#   arm performs its own §6.4 restart and assembles the evidence bundle B
python3 ma1_verify_r2.py a5-restart --state S --bundle B
python3 ma1_verify_r2.py a5-check --state S --custody-file C
python3 ma1_verify_r2.py report --state S
```

`a3 --mode S|N` exists only for instrument re-validation. After the arm finishes, the custody file, the synthetic account and the key are torn down under WF-9(d).

## 5. INC-1: evidence status and run-specific risk acceptance

- **Verified.**
  - The frozen frontend lock declares `cypress@15.13.0` with `hasInstallScript: true`.
  - RT-014 proves that `npm ci` succeeded (exit 0, 1,400 packages added).
- **Inference only.** That the Cypress lifecycle script executed during RT-014.
- **UNVERIFIED.** Any destination it reached, redirects, bytes transferred, and cache size. See the INC-1 correction, SHA-256 `<PRIVATE_REF_02273>…f1a1`.
- **Human Operator decision.** On 2026-10-02 Human Operator selected option A, accepting this uncertainty **only for that completed, disposable MA-1 local run**.
- **What this record does not claim.** It makes no claim of guest-network compliance, grants no standing exception and gives no arm network authority.
- **What the arms inherit.** Cypress was used by no control. A W2 arm that reproduces the install path needs its own network-scope decision based on its own evidence.

## 6. Remaining gaps (unrun behaviour is not claimed)

- **G-1. Never run against an endpoint, browser, VM or real credential.** The offline checks call the pure verdict, restart, correlation, A5 aggregation, identity and redaction functions, and the CLI refusal and gating paths, using synthetic non-credential fixtures and MA-1 raw replays. The following have never executed:
  - the A4 subprocess
  - key derivation
  - the A3 subprocess with a real key
  - every A5 browser step
  - screenshot masking
- **G-2. Backend-log export.** How the backend log window is exported is arm-specific. The correlation rule is format-agnostic but presumes that the log records method and path.
- **G-3. Bounded restart-evidence checks.**
  - Coverage of serving units is checked against the arm's declared inventory and `inventory_source`. The script cannot discover undeclared units.
  - Bundle values are arm-transcribed, and raw files are only hash-bound, not re-parsed.
  - Uptime tolerates 60 s of clock skew.
- **G-4. BLOCKED needs Council disposition.** The frozen A4 file reports only an error type. BLOCKED therefore means "unavailable before the next mandatory step", and an unreachable UI also classifies as BLOCKED. Disposition stays with Council under MA-1.2/MA-1.8.
- **G-5. Inherited.**
  - The MA-1 runtime left `__pycache__` beside the frozen fixtures, outside the writable roots; it is disclosed and not removed.
  - The local `LOG_LEVEL`/`DEBUG` settings.
  - The Ubuntu checksum signature was not verified.
  - The first-start worker exit has no known cause.

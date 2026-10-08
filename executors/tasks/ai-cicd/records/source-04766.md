This is from Executor Actor 01.

# ADAPTER_RECORD_R14_ALERTA_SUBMISSION — MA-1.10 Alerta application-profile finalization (R13-F1 rework)

[Executor]: Executor Actor 01 (Anthropic Claude Opus 5.5, `claude-opus-5-5`; the same thread as R7–R13)
[Release]: `MA1_ALERTA_PROFILE_FINALIZATION_RELEASE_2026-10-04_r1.md`, SHA-256 `<PRIVATE_REF_02781>`.
[Rework input]: Reviewer Actor 02 `REVIEW_RETURN_ALERTA_R13.md`, SHA-256 `<PRIVATE_REF_02477>`. TARGETED_REWORK on exactly R13-F1; T3 closed; the T1 unused-env defect closed.
[Mode]: Offline only.
- No provider, network, endpoint, browser, VM, Run, docker or npm operation.
- No credential access and no install.
- R1–R13 and all genuine raw evidence are unchanged (U06 verifies the R11, R12 and R13 manifests).
- Reviewer Actor 02's retained DERIVED archive was read read-only (one copy into my scratch).

## Exact final candidate

| Artifact (workspace-relative) | SHA-256 |
|---|---|
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_FINAL_R14_ALERTA.md` (self-contained Record) | see `SHA256SUMS_ADAPTER_STAGE_R14` |
| `executor/adapter_record_stage/ma1_verify_r14.py` | `<PRIVATE_REF_02821>` |
| `executor/adapter_record_stage/ma1_prov_scan_r14.py` | `<PRIVATE_REF_03208>` |
| `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R14.json` | `<PRIVATE_REF_02152>` |
| `evidence/adapter_record_stage/executor/static_checks_r14/` (U01–U08, suite, fixtures, R6-on-R14) | see `SHA256SUMS_ADAPTER_STAGE_R14` |
| Unchanged from R13 | `ma1_guest_capture_r13.sh` `<PRIVATE_REF_02133>…feb2`, `ma1_webui_build.sh` `<PRIVATE_REF_01351>…4c57`, `alerta_webui_fetch.py` `<PRIVATE_REF_02962>…422e`, `alerta_probe.py` `<PRIVATE_REF_02248>…d5fa`, `capture_contract_r12/` |

## R13-F1 closure (Record §4.5)

### The gate now binds the active launch, not only the package trees

**Registered launch forms.** Two only, both derived from the frozen archive and the accepted local evidence:
- **L1, gunicorn `wsgi:app`** (RT-038):
  - a closed option allowlist; `GUNICORN_CMD_ARGS` and `gunicorn.conf.py` absent;
  - the working directory's `wsgi.py` = frozen `<PRIVATE_REF_00539>…e9fc`;
  - no `wsgi` shadow.
- **L2, `alertad run`** (frozen Dockerfile CMD):
  - the pip console script of the frozen entry point `alerta.commands:cli`, whose `run` calls `create_app()` with no override;
  - closed `run` options;
  - `FLASK_SKIP_DOTENV` truthy and `FLASK_ENV_FILE` absent.

**Both forms.** `/etc/alertad.conf` and `$ALERTA_SVR_CONF_FILE` (Flask executes them) must be absent or literal-only. A source-form tree's sibling `wsgi.py`, the `app.wsgi` link target, must be frozen even when dormant.

**Where the launch comes from** (provider records or validated guest capture only):
- **Run:** the ingress container of both revisions. Effective argv, working directory and env come from the provider-recorded command/args/env/workingDir over the saved image's own config. A launch-relevant secret reference or any volume mount is UNVERIFIED.
- **Directly bound VM:** every process listening on the api-url port, read from `/proc` by the pinned R14 scanner in the guest unit.

### Closure controls (S6, 28 cases)

- **Reviewer Actor 02's frozen-`wsgi.py` control:** ELIGIBLE.
- **Reviewer Actor 02's foreign `config_override` entry:** refused, in two ways:
  - **Rebuilt as an R14 composition** (bytes reproduced exactly, `<PRIVATE_REF_04546>…7e54`): refused for "working-directory wsgi.py is not the frozen entry module".
  - **Reviewer Actor 02's own retained archive, unmodified** (read-only copy): also refused. That archive was built from my R13 fixture, which had no image config, so its effective working directory is `/`. Even the frozen control archive therefore cannot satisfy L1 under R14. I rebuilt the pair with the frozen Dockerfile's image config (WORKDIR `/app`), where the control is ELIGIBLE and the foreign entry refuses.
- **Changed source-form link target:** refused.
- **Further refusals.** The inline calibration launch; gunicorn options (`--config`, `-e`, `--chdir`, a foreign target, a foreign worker class); `GUNICORN_CMD_ARGS`; `gunicorn.conf.py`; a `wsgi` package shadow; dotenv not skipped; a foreign `alertad` script; `alertad --app`; code in `/etc/alertad.conf` or `ALERTA_SVR_CONF_FILE`; a secret reference; an ingress volume mount. On the VM: an nginx-front api port, a foreign-`wsgi.py` working directory, no api-port listener, conf code, and `GUNICORN_CMD_ARGS`.
- **Compatibility kept:**
  - `ALERTA_SVR_CONF_FILE` naming a literal-only file stays ELIGIBLE;
  - the Run (L2), VM-direct (L1) and mixed (L1) positives stay ELIGIBLE;
  - the unused-env refusal and the mandatory `report` gate are retained.

## Checks (`STATIC_CHECK_LOG_R14.md` `<PRIVATE_REF_00961>`)

| Check | Result |
|---|---|
| U03 suite | **106/106 as expected** (R13's 77 + the CLI flow on the launch-bearing state + S6 28) |
| U04 R6 suite | 224/224 |
| U05 redactor | Pass |
| U06 preserved | R11, R12, R13, SUPP_LIVE and RT_FINAL verify |
| U07 credentials | NONE |
| U08 `__pycache__` | 0 |
| U01/U02 | Digests; AST/compile; `bash -n` |

## Items Human Operator should see

- **C-R14-4 (narrowing, disclosed).**
  - A VM whose api-url port is served by nginx, uwsgi or any front other than L1/L2 is not a registered W2 launch. The accepted local Lima run used an nginx front.
  - A W2 VM arm must expose gunicorn `wsgi:app` or `alertad run` directly on the api-url port. The UI may sit elsewhere, with `config.json` pointing to the api-url.
  - Widening this needs a reviewed registry revision before W2A T0.
- **C-R14-6.** Not bound: the interpreter, third-party packages including gunicorn, import hooks, and matching-header bytecode caches.
- **C-R14-8.** The live `/proc` listener enumeration is Linux-only and first runs at W2. Offline, the DERIVED VM controls exercise its fact function and output format. A defect can only make a VM UNVERIFIED, never PASS.
- **Unchanged W2 prerequisites:**
  - control-plane `docker` and node/npm;
  - guest unit installation (C-R14-3), now installed with `ma1_prov_scan_r14.py`, run as root (it reads `/proc`).

## Executor findings during this rework (offline, before the recorded run)

- **Foreign-entry bytes.** My first reconstruction of Reviewer Actor 02's foreign entry differed in whitespace (one PIN mismatch). I replaced it with his exact bytes, read from his retained archive.
- **Fixture path.** The path to his archive was one directory level short and crashed the trial run. Fixed before the recorded run.
- **Frozen launch.** Gunicorn is not in the frozen requirements, and the frozen Dockerfile launches with `alertad run`. Registering only gunicorn would have refused the frozen build itself, so L2 is registered from the frozen `setup.py` and `commands.py`.

## Executor action result (no cloud receipt used)

- **Scope.** Offline R13-F1 rework only. No cloud receipt was used.
- **Target.** New versioned R14 artifacts under `executor/adapter_record_stage/` and `evidence/adapter_record_stage/executor/`.
- **Evidence locator.** `SHA256SUMS_ADAPTER_STAGE_R14`.
- **Anomalies.** None beyond the findings above.

End from Executor Actor 01.

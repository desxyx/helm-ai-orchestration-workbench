# MA1_RUNTIME_SUBMISSION

[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 / FRESH_CONTINUATION_R1
[Executor]: Executor Actor 01 (fresh session; Execute / WriteExecute)
[Controlling]: base release `<PRIVATE_REF_03405>…e197` + retry delta `<PRIVATE_REF_02439>…ee0e`; continuation `MA1_PROVISIONING_RUNTIME_FRESH_CONTINUATION_RELEASE_2026-10-02_r1.md` SHA-256 `<PRIVATE_REF_02515>` (reproduced before RT-005)
[Action Receipt]: `AI-CICD-20261002-MA1-RUNTIME-FRESH-001` (consumed 1/1 by Operations Coordinator before dispatch)
[Window]: RT-005 2026-10-02T03:25Z → RT-045 04:17Z · `MA1_RUN_ID=ma1r-20261002-5714d2`
[Status]: complete attempt plus bounded teardown. Evidence for independent review only. No `VALIDATED` claim and no Adapter Record.

## 1. Final control status

| Control | Status | Raw |
|---|---|---|
| A3-P | PASS: 6/6, 0 skipped, exit 0, 7 correlated backend requests | RT-021, RT-022 |
| A3-S | PASS: connection refused on a no-listener port proven empty; 0 backend requests | RT-023 |
| A3-N | PASS: only `test_02` fails (`200 != 201`); 01 and 03–06 pass; `POST /alert 200`; no 5xx; reverted and healthy | RT-024–RT-027 |
| A4 | PASS: 8/8, signup 200, login 200 twice, wrong password 401, denial redirect, exit 0 | RT-019 |
| A5-P | PASS: UI-created, persisted across a full-VM stop/start, UI-visible and `GET` 200 afterward | RT-028, RT-030–RT-033 |
| A5-N | PASS: UI-created then UI-deleted; 404 before and after the restart | RT-029, RT-033 |
| A5-S | PASS: sentinel never submitted; 404 before and after | RT-029, RT-033 |

The verified detail, restart-equivalence table and configuration are in `ADAPTER_RECORD_CANDIDATE.md`.

## 2. Runtime, VM and package configuration (immutable hashes)

- **Lima.** Tarball `<PRIVATE_REF_02907>…6d93c3` (re-verified at RT-005). Unpacked only under `runtime_stage/tools/lima-2.2.0/`. `limactl` SHA-256 is `<PRIVATE_REF_05868>` (ad-hoc signed), version 2.2.0.
- **Ubuntu image.** `<PRIVATE_REF_01095>…fc55`, which matches the pin and the dated `SHA256SUMS`. That file's own SHA-256 is `cd8934d9…87ca`. GPG verification of `SHA256SUMS` was not performed. (RT-006)
- **VM definition.** `runtime_stage/vm/ma1-a5.yaml`, SHA-256 `<PRIVATE_REF_05001>`.
  - Hashed before create and re-checked at RT-008 and RT-021.
  - Unchanged since creation.
  - `limactl validate --fill` output: RT-007.
- **Guest.**
  - OS: Ubuntu 24.04.5, kernel 6.8.0-142.
  - Packages: postgresql-16 16.15-0ubuntu0.24.04.1, nginx 1.24.0-2ubuntu7.18, python3 3.12.3-0ubuntu2.1, nodejs 18.19.1+dfsg-6ubuntu5, npm 9.2.0~ds1-2, git 1:2.43.0-1ubuntu7.3.
  - Sources: `ports.ubuntu.com` only.
  - Full dpkg list SHA-256 `90e3888d…92aa` (RT-012, RT-039).
- **Backend.**
  - Pinned `requirements.txt` was installed exactly, plus `gunicorn==23.0.0`.
  - `alerta-server 9.1.0` is an editable install from an archive of the pin, with `.env` and `.flaskenv` excluded and their absence verified.
  - `pip freeze`: RT-013, RT-039.
- **Frontend.**
  - Built with `npm ci` from the frozen lock. 1400 packages, including `@alerta/vue-authenticate` at locked commit `ff6de656…`.
  - `.env.development` was excluded and its absence verified.
  - Dist manifest SHA-256 `de1dde01…22e6`.
  - `config.json` is `{"endpoint": "/api"}` (RT-014).
- **Source archives.** Backend `<PRIVATE_REF_03254>…08fe`, frontend `<PRIVATE_REF_00978>…f6c3` (RT-010). They are identical inside the guest (RT-011).
- **Wiring.**
  - nginx `location /api/ { proxy_pass http://127.0.0.1:8080/; }`, plus SPA `try_files`.
  - gunicorn binds to guest loopback; PostgreSQL to `127.0.0.1:5432`.
  - The host has no listener on 80, 8080 or 5432 (RT-017).
  - Config and unit files with hashes: RT-038.

## 3. Identifiers (no secret values)

- **Synthetic account:** `<ACCOUNT_EMAIL_084>`.
- **Derived API key:** record id `<NATIVE_ID_3165>`, scope `write`, same user (RT-020). The value is withheld.
- **A3 alert ids:** P `<NATIVE_ID_1137>`, N `<NATIVE_ID_3232>`.
- **A5 ids:** P `<NATIVE_ID_0410>`, N `<NATIVE_ID_0948>`, S `<NATIVE_ID_0008>`.
- **Guest addressing:** vzNAT IP `<IP_ADDRESS_131>`, stable across the restart.
- **Boot ids:** `56c592e1-…` → `44110248-…`.

## 4. Raw-evidence index and checksums

- **Command log:** `RAW_COMMAND_LOG_RT.md` records every RT-001…RT-045 entry and note, with UTC start/end, exit code, exact command and per-capture SHA-256.
- **Captures:** `raw/RT-NNN_<label>.{out,err}`. All passed the fail-closed redactor `support/redact_rt.pl`.
- **Screenshots:** A4 per-step PNGs are in `shots/A4/` (masked password fields; checked visually). A5 PNGs are in `shots/A5_*`.
- **Support files:**
  - `support/rt.sh` (`<PRIVATE_REF_02024>…1ff4`)
  - `support/redact_rt.pl` (`5a96b93e…568b`)
  - `support/guest_setup.sh` (`<PRIVATE_REF_02160>…6c3f`)
  - `support/ma1_run.py` (`a4eb4190…5477`)
  - `support/secret_scan.py`, relabelled at RT-041 (see manifest)
- **Non-secret run state:** `scratch/ma1_state.json`.
- **Manifests:**
  - `SHA256SUMS_RT` is the original first-attempt manifest (2026-10-01). It is kept unmodified as history and is stale by design.
  - `SHA256SUMS_RT_FINAL` is the authoritative manifest for the current bundle and the retained runtime artifacts. It separates "original history" from "current authoritative".

## 5. Action Receipt reconciliation

| Receipt | Use |
|---|---|
| `AI-CICD-20261001-MA1-RUNTIME-001` | RT-001–RT-002, then stop (prior session; history) |
| `…-RETRY-001`, `…-RESUME-001` | No captures; classifier refusals plus one inert edit (prior session; history) |
| `AI-CICD-20261002-MA1-RUNTIME-MANUAL-001` | RT-003–RT-004, then stop (prior session; history) |
| `AI-CICD-20261002-MA1-RUNTIME-FRESH-001` | RT-005–RT-045 in this session: one VM `ma1-a5`, one synthetic account, one derived API key. Exhausted. |

Every mutation in this session went through `support/rt.sh` except for the files the Executor authored: `vm/ma1-a5.yaml`, `support/guest_setup.sh`, `support/ma1_run.py`, `support/secret_scan.py`, this submission, and the Adapter Record candidate. A few read-only `limactl shell` diagnostics ran outside the wrapper; they are recorded as notes in the log.

## 6. Teardown/reset attestation and residue inventory

- **Secret scan, before teardown (RT-041).** Literal values of all three live credentials (account password, derived API key, backend signing value) had 0 hits across 144 files in the evidence bundle, `runtime_stage/{vm,host,guest,home,lima_home}`, the isolated HOME and the fixture directory. The canary positive control was found. One generic JWT-shaped hit is attributed (RT-042) to upstream test fixtures in `backend/tests/test_providers.py` inside the frozen-pin archive. That archive was created before any MA-1 credential existed, so this is not an exposure.
- **RT-043.** Guest `/etc/ma1/alerta.secret.env` and `/var/lib/ma1/cred/a4.env` were shredded.
- **RT-044.**
  - Graceful `limactl stop`, then `limactl delete ma1-a5`.
  - The instance directory, VM disk, cidata and database are gone, so the account, API key and signing value can no longer be used.
  - No limactl or VZ process remains, and the app is unreachable.
- **RT-045.**
  - The exact target `/private/tmp/ma1a5` was validated: not a symlink; realpath equal; top level exactly `home lh`; owner the user.
  - It was then deleted and proven absent.
  - Real `~/.lima`, `~/Library/Caches/lima` and `~/Library/Application Support/lima` are still ABSENT, as at RT-001.
  - No Lima listener remains.
- **Retained, by design:**
  - `runtime_stage/downloads/`: Lima tarball, Ubuntu image (620 MB), dated `SHA256SUMS`.
  - `runtime_stage/tools/lima-2.2.0/` (78 MB, unpacked).
  - `runtime_stage/host/`: the two pin archives.
  - `runtime_stage/vm/ma1-a5.yaml`.
  - Empty legacy roots `runtime_stage/{guest,home,lima_home}`.
  - The evidence bundle.
  - Canonical frozen sources and fixtures are untouched; the backend repo porcelain was 0 after A3-N.
  - The host Playwright browser cache was used read-only.

## 7. Evidence gaps, incidents and conditions

- **INC-1. Guest network beyond package registries.** `npm ci` ran the lifecycle postinstall of the lock-pinned devDependency `cypress@15.13.0`. That postinstall downloaded the Cypress binary (about 670 MB) into the guest from the Cypress download host. This was guest-only, unused by any control, and destroyed with the VM. It departs from a strict "official registries only" reading of guest network scope. Human Operator decision requested on whether it is acceptable.
- **INC-2. First-boot worker failure.** At first start, one gunicorn worker exited with code 3; systemd restarted the service once and it stayed stable. The traceback was not captured, because the frozen logging config also silences gunicorn's error logger. Hypothesis (UNVERIFIED): a schema-creation race between the two workers on an empty database.
- **EG-RT-1. Backend access log.** gunicorn's access log is empty for the reason in the Adapter Record candidate. The backend log of record is the `alerta.app` per-request journal, corroborated by nginx.
- **EG-RT-2. Capture defects, all recorded as log notes.**
  - RT-016: unquoted `--noproxy *` glob; superseded by RT-017.
  - RT-021: nginx-tail arithmetic bug; corroborated by RT-022.
  - RT-032: derived `start_utc` off by +10h; the raw AEST values are authoritative.
  - RT-040: over-redaction of result labels; superseded by RT-041.
  - RT-045: exit=1 from its final count line only.

  None of these changes any control result.
- **EG-RT-3. Shared A3 resource name.** A3-P/S/N used one `MA1_RUN_ID` (release) and therefore one resource name (spec §6 tension); details are in the Adapter Record candidate.
- **EG-RT-4. Build and toolchain warnings.**
  - Ubuntu's Node 18.19.1 is below cypress's declared engine. This raised only an `EBADENGINE` warning, and cypress is not used.
  - The frozen UI build warns that `ExportToCsv` is not exported by the locked `export-to-csv`. This affects the CSV export path only, which no control exercises.
- **EG-RT-5. Hash source.** The dated `SHA256SUMS` was not GPG-verified. The image hash also matches the release pin.
- **EG-FX-2/3 now runtime-confirmed.** The avatar selector, the button names and leaving `/signup`//`login` behaved as the A4 flow assumed: all 8 steps passed.
- **Conditions.** `FAILED_LOCAL`: none. `BLOCKED`: none. `EXEC_STOP`: none.

Executor stops here. The Reviewer remains stopped until Operations Coordinator intakes this bundle and releases it separately.

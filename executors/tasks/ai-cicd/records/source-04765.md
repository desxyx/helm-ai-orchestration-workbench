This is from Executor Actor 01.

# ADAPTER_RECORD_R13_ALERTA_SUBMISSION — MA-1.10 Alerta application-profile finalization (R12-T1–T3 rework)

[Executor]: Executor Actor 01 (Anthropic Claude Opus 5.5, `claude-opus-5-5`; the same thread as R7–R12, continued after context compaction)
[Release]: `MA1_ALERTA_PROFILE_FINALIZATION_RELEASE_2026-10-04_r1.md`, SHA-256 `<PRIVATE_REF_02781>`.
[Rework input]: Reviewer Actor 02 `REVIEW_RETURN_ALERTA_R12.md`, SHA-256 `<PRIVATE_REF_02311>` (TARGETED_REWORK R12-T1–T3).
[Mode]: Offline only.
- No provider, network, endpoint, browser, VM, Run, docker or npm operation.
- No credential access and no install.
- R1–R12 and all genuine raw evidence are unchanged (T06 verifies the R11 and R12 manifests). No new capture was requested or made.

## Exact final candidate

| Artifact (workspace-relative) | SHA-256 |
|---|---|
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_FINAL_R13_ALERTA.md` (self-contained Record) | see `SHA256SUMS_ADAPTER_STAGE_R13` |
| `executor/adapter_record_stage/ma1_verify_r13.py` | `<PRIVATE_REF_05189>` |
| `executor/adapter_record_stage/ma1_prov_scan.py` | `<PRIVATE_REF_05503>` |
| `executor/adapter_record_stage/ma1_guest_capture_r13.sh` | `<PRIVATE_REF_02133>` |
| `executor/adapter_record_stage/ma1_webui_build.sh` | `<PRIVATE_REF_01351>` |
| `executor/adapter_record_stage/alerta_webui_fetch.py` | `<PRIVATE_REF_02962>` |
| `executor/adapter_record_stage/alerta_probe.py` (unchanged) | `<PRIVATE_REF_02248>` |
| `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R13.json` | `<PRIVATE_REF_05495>` |
| `evidence/adapter_record_stage/executor/static_checks_r13/` (T01–T08, suite, fixtures, provenance fixtures, R6-on-R13) | see `SHA256SUMS_ADAPTER_STAGE_R13` |

Capture wrapper and redactor: R12 `capture_contract_r12/` (unchanged).

## Closure map

### R12-T1: unused environment value accepted as a dependency (Record §4.2)

**Fix.** The Run → VM dependency now holds only through the configuration the frozen backend consumes:
- **Frozen source basis.** In `alerta/utils/config.py`, env `DATABASE_URL` takes precedence; `alerta/database/base.py` selects the backend from the URL scheme.
- **Every wiring source** (both revisions, both templates) must carry exactly one literal, identical `DATABASE_URL`, with a supported scheme.
- **Host** = the VM `networkIP`.
- **Network:** the private wiring is unchanged.
- **Serving process:** the selected database server (`postgres`/`mongod`) must be among the VM serving processes before and after.

**Closure controls.**
- **Reviewer Actor 02's exact case** (`MA1_UNUSED_VM_REFERENCE` in all six streams GS-042/043/059/061/067/068) is UNVERIFIED with "consumed DATABASE_URL names this VM".
- **Further refusals:** a calibration `VM_URL`, a secret reference, a duplicate, an unsupported scheme, another host, a missing postgres process, and a revision mismatch.
- **DERIVED positive with the frozen configuration and serving-command shapes** is ELIGIBLE:
  - literal `DATABASE_URL`;
  - gunicorn `wsgi:app` (RT-038);
  - postgres 16 (RT-030).
- **Compatibility kept:** standalone VM and Run, Cloud SQL, and the existing missing-log refusal.
- **Topology set.** No widening. A VM API behind a Run proxy has no consumed-configuration mapping in the frozen backend and stays unregistered (C-R13-4).

### R12-T2: required, frozen deployment source-provenance gate (Record §4.4, §5)

**Command.** New `provenance --bundle` (schema `ma1-provenance/1`). For the `alerta` profile, `report` shows no acceptance other than FAIL/UNVERIFIED without an ELIGIBLE gate.

**Targets come only from the ELIGIBLE restart's validated raw records:**
- Run revision image digests;
- VM before/after guest scans.

Caller declarations cannot add or replace a target.

**Backend binding.**
- Every importable `alerta` tree must equal a frozen form. There are two forms, each derived offline from the frozen archive only:
  - source form `<PRIVATE_REF_01336>…6682`;
  - installed form `<PRIVATE_REF_01453>…9001` (setuptools materializes `app.wsgi`).
- `build.py` is allowed only in the frozen Dockerfile shape.
- No stray `alerta` module may exist.
- **Run:** `docker save -o` of the recorded digest, scanned by the pinned `ma1_prov_scan.py` (layer and whiteout aware).
- **VM:** the same scanner, run by the frozen guest unit in every boot block.

**Web UI binding.**
- A reference build of the frozen frontend archive (`ma1_webui_build.sh`, as RT-014).
- The served bytes at `--ui-url` must equal it file by file.
- `/config.json` must be exactly `{"endpoint": E}` with E resolving to `--api-url`.

**The effective configuration T1 uses** is the provider-recorded consumed `DATABASE_URL` above.

**Evidence status.**
- The genuine per-arm observations belong to the W2 deployment; none was fabricated.
- **DERIVED controls:** S5 has 30 cases (5 positives and 21 refusals, plus 3 genuine-source/pin checks and 1 CLI `report` control).
- **Genuine baseline:** RT-010/011 archive chain plus the two pins re-derived in S5.

**Guest capture unit.** `ma1_guest_capture_r13.sh` freezes the guest capture schema that R12 left open (C-R12-3). It is generalized from the genuine R11 unit: serving set = processes with listening TCP sockets, plus the scanner lines. Installing it in each arm remains a W2 arm-brief item (C-R13-3).

### R12-T3: frozen A3/A4 specification made self-contained (Record §1–§3)

**A3.**
- All six tests, each with its request and assertions.
- Command, cwd and env rules; runtime substitutions; exclusions (none).
- A3-P backend-log correlation.
- A3-S no-listener rule.
- A3-N: patch hash and line, served-copy-only application and revert with blob hashes (`<PRIVATE_REF_01618>…` → `<PRIVATE_REF_01394>…` → `<PRIVATE_REF_01618>…`), exact failure message.

**A4.**
- Command, env and substitutions.
- The five configuration preconditions (`AUTH_REQUIRED=True`, `AUTH_PROVIDER=basic`, `SIGNUP_ENABLED=True`, `EMAIL_VERIFICATION=False`, `ALLOW_READONLY=False`).
- UI API-base binding and SPA deep-route precondition.
- All 8 steps with their PASS conditions, and the verdict classes.

**Identifiers and A5.**
- A3 probe **alert** ids are distinguished from A5 UI-created **blackout** ids and the sentinel.
- The A5 post-check uses the original bound account and the original object ids.
- The accepted local ids are cited (RT-021, RT-028/029/033).

## Checks (`STATIC_CHECK_LOG_R13.md`)

| Check | Result |
|---|---|
| T03 suite | **77/77 as expected** (S0 8, S1 6, S2 4, S3 24, S4 5, S5 30) |
| T04 R6 suite on R13 | 224/224 |
| T05 redactor | Password masked, host kept |
| T06 preserved | R11, R12, SUPP_LIVE and RT_FINAL verify |
| T07 credentials | NONE |
| T08 `__pycache__` | 0 |
| T01/T02 | Digests; AST/compile of all R13 Python files; `bash -n` of both shell programs |

## Executor findings during this rework (offline, before the recorded run)

- **T1 trial.** One new negative initially failed for a different, earlier reason than targeted: the dependency text changed. The expectation was corrected to the consumed-configuration reason. No logic changed.
- **T2 design correction.** The frozen backend Dockerfile leaves two `alerta` trees (`/app` and site-packages). A "single tree" rule would have refused the frozen build itself, so the rule is "every importable tree is frozen".
- **Installed-form pin.** `pip install` materializes the `app.wsgi` symlink as a file, which required the second pin.
- **Fetch argument.** The fetch program first took the build stdout path. The command-log custody rule allows exactly one reference per stream, so the fetch now reads the same build work directory, and every `ref=` digest is bound to the build manifest.

## Open items Human Operator should see (disclosed, not blockers of this offline Record)

- **C-R13-3.** Guest unit installation per arm (W2 brief).
- **C-R13-6.** Provenance boundary: not bound are the interpreter, third-party packages, import hooks, the serving command line, node/npm reproducibility (a non-reproducible build fails closed, never passes falsely), and index digests resolved by the control-plane docker.
- **C-R13-7.** `ALLOW_READONLY` is not behaviourally exercised.
- **W2 prerequisites stated in Record §5:**
  - control-plane `docker` able to pull the arm images by digest;
  - node/npm with registry and GitHub access for `npm ci`.

  If these cannot be provided at W2, provenance stays UNVERIFIED and no arm can PASS. That would be a W2 resource decision, not a defect of this Record.

## Executor action result (no cloud receipt used)

- **Scope.** Offline rework under the standing release only. Old cloud receipts were neither used nor consumed.
- **Target.** New versioned R13 artifacts under `executor/adapter_record_stage/` and `evidence/adapter_record_stage/executor/`.
- **Actions.** Read-only frozen-archive inspection and offline checks. Synthetic image archives and an extracted frozen tree exist only inside `static_checks_r13/scratch`.
- **Evidence locator.** `SHA256SUMS_ADAPTER_STAGE_R13`.
- **Anomalies.** None beyond the findings listed above.

End from Executor Actor 01.

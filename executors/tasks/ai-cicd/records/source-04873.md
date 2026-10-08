# RAW_COMMAND_LOG_FX_RW1 — AI_CICD / MA-1 / MINIMAL_FIXTURE_BUILD_R1 / TARGETED_REWORK_R1

[Artifact Class]: EVIDENCE (support; append-only). Original construction log `RAW_COMMAND_LOG_FX.md` and manifest `SHA256SUMS_FX` are not modified.
[Executor]: Executor Actor 01
[Release]: MA1_MINIMAL_FIXTURE_TARGETED_REWORK_RELEASE_2026-10-01_r1.md (sha256 <PRIVATE_REF_01379>)
[Wrapper]: `support/capture_rw1.sh` (derived from `support/capture.sh`; same sanitized env and redaction). No network command is issued.
[Paths]: relative to `evidence/minimal_fixture_build/executor/`.

### FXRW-001 — baseline
- start: 2026-10-01T05:54:06Z · end: 2026-10-01T05:54:06Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c cd\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30\;\ shasum\ -a\ 256\ executor/minimal_fixture_build/\*\;\ echo\ sums_fx=\$\(shasum\ -a\ 256\ evidence/minimal_fixture_build/executor/SHA256SUMS_FX\ \|\ cut\ -c1-64\)\ log_fx=\$\(shasum\ -a\ 256\ evidence/minimal_fixture_build/executor/RAW_COMMAND_LOG_FX.md\ \|\ cut\ -c1-64\)\;\ echo\ fx_verify_ok=\$\(shasum\ -a\ 256\ -c\ evidence/minimal_fixture_build/executor/SHA256SUMS_FX\ \|\ grep\ -c\ \':\ OK\$\'\)/58`
- stdout: `rework_r1/raw/FXRW-001_baseline.out` sha256 `<PRIVATE_REF_05258>` · redacted lines: 0
- stderr: `rework_r1/raw/FXRW-001_baseline.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FXRW-002 — preserve_r1_originals
- start: 2026-10-01T05:54:06Z · end: 2026-10-01T05:54:06Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c cp\ -p\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_ui_flow.py\ source-04883.md\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/minimal_fixture_build/executor/rework_r1/original_r1/\ \&\&\ shasum\ -a\ 256\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/minimal_fixture_build/executor/rework_r1/original_r1/\*`
- stdout: `rework_r1/raw/FXRW-002_preserve_r1_originals.out` sha256 `<PRIVATE_REF_05803>` · redacted lines: 0
- stderr: `rework_r1/raw/FXRW-002_preserve_r1_originals.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FXRW-003 — diff_ui_flow
- start: 2026-10-01T05:55:13Z · end: 2026-10-01T05:55:13Z · exit: 1
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `diff -u rework_r1/original_r1/test_alerta_ui_flow.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_ui_flow.py`
- stdout: `rework_r1/raw/FXRW-003_diff_ui_flow.out` sha256 `<PRIVATE_REF_04114>` · redacted lines: 0
- stderr: `rework_r1/raw/FXRW-003_diff_ui_flow.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FXRW-004 — diff_spec
- start: 2026-10-01T05:55:13Z · end: 2026-10-01T05:55:13Z · exit: 1
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `diff -u rework_r1/original_r1/MA1_MINIMAL_FIXTURE_SPEC.md source-04883.md`
- stdout: `rework_r1/raw/FXRW-004_diff_spec.out` sha256 `<PRIVATE_REF_04047>` · redacted lines: 0
- stderr: `rework_r1/raw/FXRW-004_diff_spec.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FXRW-005 — static_check_py314
- start: 2026-10-01T05:55:13Z · end: 2026-10-01T05:55:13Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/opt/homebrew/bin/python3 support/static_check.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_api_smoke.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_ui_flow.py`
- stdout: `rework_r1/raw/FXRW-005_static_check_py314.out` sha256 `<PRIVATE_REF_05758>` · redacted lines: 0
- stderr: `rework_r1/raw/FXRW-005_static_check_py314.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FXRW-006 — static_check_py312
- start: 2026-10-01T05:55:13Z · end: 2026-10-01T05:55:13Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 support/static_check.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_api_smoke.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_ui_flow.py`
- stdout: `rework_r1/raw/FXRW-006_static_check_py312.out` sha256 `<PRIVATE_REF_05143>` · redacted lines: 0
- stderr: `rework_r1/raw/FXRW-006_static_check_py312.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FXRW-007 — sequence_and_hash_check
- start: 2026-10-01T05:55:13Z · end: 2026-10-01T05:55:13Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `python3 - <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build`
- stdout: `rework_r1/raw/FXRW-007_sequence_and_hash_check.out` sha256 `<PRIVATE_REF_04195>` · redacted lines: 0
- stderr: `rework_r1/raw/FXRW-007_sequence_and_hash_check.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FXRW-008 — original_evidence_status
- start: 2026-10-01T05:55:30Z · end: 2026-10-01T05:55:30Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c cd\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30\;\ echo\ sums_fx=\$\(shasum\ -a\ 256\ evidence/minimal_fixture_build/executor/SHA256SUMS_FX\ \|\ cut\ -c1-64\)\ log_fx=\$\(shasum\ -a\ 256\ evidence/minimal_fixture_build/executor/RAW_COMMAND_LOG_FX.md\ \|\ cut\ -c1-64\)\;\ shasum\ -a\ 256\ -c\ evidence/minimal_fixture_build/executor/SHA256SUMS_FX\ 2\>\&1\ \|\ grep\ -v\ \':\ OK\$\'\;\ echo\ fx_ok=\$\(shasum\ -a\ 256\ -c\ evidence/minimal_fixture_build/executor/SHA256SUMS_FX\ 2\>/dev/null\ \|\ grep\ -c\ \':\ OK\$\'\)/58\;\ unset\ GIT_INDEX_FILE\;\ for\ d\ in\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/frontend\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend\;\ do\ echo\ \"\$\(basename\ \$d\)\ HEAD=\$\(git\ -C\ \$d\ rev-parse\ HEAD\)\ porcelain=\$\(git\ -C\ \$d\ status\ --porcelain\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\"\;\ done\;\ echo\ work_root_files=\$\(ls\ -A\ executor/minimal_fixture_build\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\ pycache=\$\(find\ executor/minimal_fixture_build\ evidence/minimal_fixture_build\ -name\ __pycache__\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)`
- stdout: `rework_r1/raw/FXRW-008_original_evidence_status.out` sha256 `<PRIVATE_REF_05899>` · redacted lines: 0
- stderr: `rework_r1/raw/FXRW-008_original_evidence_status.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0


## Closure — 2026-10-01T05:55:30Z

- Corrections: UI flow rewritten to the released 8-step order (FXRW-003 diff); spec A4 table, A3-P seven-request expectation, JSON-field wording, EG-FX-3 and UI hash updated (FXRW-004 diff).
- Static evidence: FXRW-005/006 (py3.14 / py3.12; the credential_literals hit is the unchanged selector constant SEL_PASSWORD), FXRW-007 (code/spec step order identical and equal to release order; 7 lifecycle requests; unchanged probe/patch hashes; spec UI hash matches).
- Original construction evidence preserved: RAW_COMMAND_LOG_FX.md and SHA256SUMS_FX unchanged (FXRW-008). Their two entries for the corrected primary files now differ by design; the R1 versions are kept byte-identical under rework_r1/original_r1/ (FXRW-002).
- Checksums for the rework: rework_r1/SHA256SUMS_FX_RW1.

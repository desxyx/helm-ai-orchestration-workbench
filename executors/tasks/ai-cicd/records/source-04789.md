# STATIC_CHECK_LOG — MA-1 adapter record completion (Executor Actor 01)
[Python]: Python 3.12.6 · PYTHONDONTWRITEBYTECODE=1 · no endpoint, service, VM, network or credential used

### SC-01_script_hash
- utc: 2026-10-02T05:31:44Z · exit: 0
- command: `shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py`
- stdout sha256 `<PRIVATE_REF_05425>` · stderr sha256 `<PRIVATE_REF_03399>`

### SC-02_ast_compile
- utc: 2026-10-02T05:31:44Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c import ast,sys; src=open(sys.argv[1]).read(); ast.parse(src); compile(src, sys.argv[1], 'exec'); print('AST_PARSE_OK COMPILE_OK lines', src.count(chr(10))) <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py`
- stdout sha256 `<PRIVATE_REF_04306>` · stderr sha256 `<PRIVATE_REF_03399>`

### SC-03_help
- utc: 2026-10-02T05:31:44Z · exit: 0
- command: `bash -c /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py --help; for s in init a4 derive-key a3 a5-create a5-delete a5-sentinel a5-restart a5-check report; do echo "=== $s"; /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py $s --help; done`
- stdout sha256 `<PRIVATE_REF_04014>` · stderr sha256 `<PRIVATE_REF_03399>`

### SC-04_init_frozen_fixtures
- utc: 2026-10-02T05:31:45Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/static_state.json --run-id static-check-0001 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/out`
- stdout sha256 `<PRIVATE_REF_05851>` · stderr sha256 `<PRIVATE_REF_03399>`

### SC-05_init_tampered_fixture_refused
- utc: 2026-10-02T05:31:45Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/tampered_state.json --run-id static-check-0002 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/tampered --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/out2`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_03756>`

### SC-06_restart_container_refused
- utc: 2026-10-02T05:31:45Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/static_state.json --shape container --action docker restart api --started 2026-10-02T00:00:00Z --completed 2026-10-02T00:01:00Z --evidence <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05556>`

### SC-07_restart_process_refused
- utc: 2026-10-02T05:31:45Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/static_state.json --shape process --action systemctl restart backend --started 2026-10-02T00:00:00Z --completed 2026-10-02T00:01:00Z --evidence <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05520>`

### SC-08_restart_vm_before_objects_refused
- utc: 2026-10-02T05:31:45Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/static_state.json --shape vm --action stop/start every serving VM --started 2026-10-02T00:00:00Z --completed 2026-10-02T00:01:00Z --evidence <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05857>`

### SC-09_a3_missing_key_refused
- utc: 2026-10-02T05:31:45Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py a3 --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/static_state.json --key-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/no_such_key --mode P`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05925>`

### SC-10_a3_key_mode_0644_refused
- utc: 2026-10-02T05:31:45Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py a3 --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/static_state.json --key-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/placeholder_not_a_key --mode S`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04192>`

### SC-11_a5check_without_restart_refused
- utc: 2026-10-02T05:31:45Z · exit: 2
- command: `bash -c chmod 600 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/placeholder_not_a_key; /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/static_state.json --key-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/placeholder_not_a_key`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_03804>`

### SC-12_report_unverified
- utc: 2026-10-02T05:31:45Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/static_state.json`
- stdout sha256 `<PRIVATE_REF_04990>` · stderr sha256 `<PRIVATE_REF_03399>`

### SC-13_fixture_dir_unchanged
- utc: 2026-10-02T05:31:45Z · exit: 0
- command: `bash -c diff <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/fixture_dir_before.txt <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks/scratch/fixture_dir_after.txt && echo FIXTURE_DIR_UNCHANGED; shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/*.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/*.patch`
- stdout sha256 `<PRIVATE_REF_05318>` · stderr sha256 `<PRIVATE_REF_03399>`

### SC-14_verdict_replay
- utc: 2026-10-02T05:32:03Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 static_checks/scratch/replay.py executor/adapter_record_stage evidence/runtime_stage/executor/raw`
- stdout sha256 `<PRIVATE_REF_04067>` · stderr sha256 `<PRIVATE_REF_03399>` · replay script sha256 `<PRIVATE_REF_04817>`

### SC-15_runtime_evidence_unchanged
- utc: 2026-10-02T05:33:40Z · exit: 0
- command: `shasum -a 256 -c over SHA256SUMS_RT_FINAL B and C lines; hash of preserved ADAPTER_RECORD_CANDIDATE.md`
- stdout sha256 `<PRIVATE_REF_03799>` · stderr sha256 `<PRIVATE_REF_03399>`


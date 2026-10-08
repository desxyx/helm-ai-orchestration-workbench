# STATIC_CHECK_LOG_R4 — MA-1 adapter record R4 finite rework (Executor Actor 01)
[Runner]: static_checks_r4/run_static_checks_r4.sh · Python 3.12.6 · PYTHONDONTWRITEBYTECODE=1
[Scope]: no endpoint, browser, service, VM, network or credential; synthetic values are labelled non-credentials; URLs are TEST-NET-2 and never contacted; MA-1 runtime evidence is read-only input
[Helpers]: se = env MA1_UI_USER_EMAIL=<ACCOUNT_EMAIL_098> MA1_UI_USER_PASSWORD=<CREDENTIAL_VALUE_REMOVED>; sx = same password, different synthetic identifier

### E01_script_hashes
- utc: 2026-10-02T07:48:17Z · exit: 0
- command: `shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r2.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py`
- stdout sha256 `<PRIVATE_REF_04376>` · stderr sha256 `<PRIVATE_REF_03399>`

### E02_ast_compile
- utc: 2026-10-02T07:48:17Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c import ast,sys; src=open(sys.argv[1]).read(); ast.parse(src); compile(src, sys.argv[1], 'exec'); print('AST_PARSE_OK COMPILE_OK lines', src.count(chr(10))) <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py`
- stdout sha256 `<PRIVATE_REF_05949>` · stderr sha256 `<PRIVATE_REF_03399>`

### E03_help
- utc: 2026-10-02T07:48:17Z · exit: 0
- command: `bash -c /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py --help; for s in init a4 derive-key a3 a5-create a5-delete a5-sentinel a5-restart a5-check report; do echo "=== $s"; /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py $s --help; done`
- stdout sha256 `<PRIVATE_REF_05113>` · stderr sha256 `<PRIVATE_REF_03399>`

### E04_offline_checks
- utc: 2026-10-02T07:48:17Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/offline_checks_r4.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch`
- stdout sha256 `<PRIVATE_REF_03769>` · stderr sha256 `<PRIVATE_REF_03399>`

### E05_build_synthetic_cli_fixtures
- utc: 2026-10-02T07:48:18Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/build_cli_fixtures_r4.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor`
- stdout sha256 `<PRIVATE_REF_04123>` · stderr sha256 `<PRIVATE_REF_03399>`

### E06_init_with_lima_deployment_record
- utc: 2026-10-02T07:48:18Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_fresh.json --run-id static-r4-0002 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw/RT-009_vm_first_start.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL --deployment-command-log source-04882.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_04575>` · stderr sha256 `<PRIVATE_REF_03399>`

### E07_init_misleading_generic_table_refused
- utc: 2026-10-02T07:48:18Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/s7.json --run-id static-r4-0007 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_generic/deployment_table.txt --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_generic/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_generic/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05736>`

### E08_init_handwritten_lima_table_refused
- utc: 2026-10-02T07:48:18Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/s8.json --run-id static-r4-0008 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_handwritten/deployment_table.txt --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_handwritten/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_handwritten/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04566>`

### E09_init_lima_table_wrong_command_refused
- utc: 2026-10-02T07:48:18Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/s9.json --run-id static-r4-0009 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_wrongcmd/deployment_table.txt --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_wrongcmd/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_wrongcmd/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05873>`

### E10_init_lima_table_bad_status_refused
- utc: 2026-10-02T07:48:18Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/s10.json --run-id static-r4-0010 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_status/deployment_table.txt --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_status/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/deploy_status/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04624>`

### E11_init_unregistered_platform_refused
- utc: 2026-10-02T07:48:18Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/s11.json --run-id static-r4-0011 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw/RT-009_vm_first_start.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL --deployment-command-log source-04882.md --deployment-platform gcloud`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05928>`

### E12_init_partial_deployment_args_refused
- utc: 2026-10-02T07:48:18Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/s12.json --run-id static-r4-0012 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw/RT-009_vm_first_start.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04613>`

### E13_init_record_not_in_manifest_refused
- utc: 2026-10-02T07:48:18Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/s13.json --run-id static-r4-0013 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/RT-009_copy_not_in_manifest.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL --deployment-command-log source-04882.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05648>`

### E14_init_tampered_fixture_refused
- utc: 2026-10-02T07:48:18Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/s14.json --run-id static-r4-0014 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/tampered`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04588>`

### E15_restart_without_prereqs_refused
- utc: 2026-10-02T07:48:18Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_fresh.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_valid.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05864>`

### E16_restart_after_failed_ndelete_refused
- utc: 2026-10-02T07:48:18Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_ndelete_fail.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_valid.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05364>`

### E17_restart_valid_positive_eligible
- utc: 2026-10-02T07:48:18Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_vm.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_valid.json`
- stdout sha256 `<PRIVATE_REF_04407>` · stderr sha256 `<PRIVATE_REF_03399>`

### E18_report_valid_eligible_unchecked
- utc: 2026-10-02T07:48:18Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_vm.json`
- stdout sha256 `<PRIVATE_REF_04595>` · stderr sha256 `<PRIVATE_REF_03399>`

### E19_RW5_short_process_restart_unverified
- utc: 2026-10-02T07:48:18Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_short_process.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_short_process.json`
- stdout sha256 `<PRIVATE_REF_04821>` · stderr sha256 `<PRIVATE_REF_03399>`

### E20_RW5_short_process_a5check_refused
- utc: 2026-10-02T07:48:19Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_short_process.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### E21_RW5_short_process_report_a5_unverified
- utc: 2026-10-02T07:48:19Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_short_process.json`
- stdout sha256 `<PRIVATE_REF_04457>` · stderr sha256 `<PRIVATE_REF_03399>`

### E22_RW5_incomplete_processes_restart_unverified
- utc: 2026-10-02T07:48:19Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_incomplete_processes.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_incomplete_processes.json`
- stdout sha256 `<PRIVATE_REF_04942>` · stderr sha256 `<PRIVATE_REF_03399>`

### E23_RW5_incomplete_processes_a5check_refused
- utc: 2026-10-02T07:48:19Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_incomplete_processes.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### E24_RW5_incomplete_processes_report_a5_unverified
- utc: 2026-10-02T07:48:19Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_incomplete_processes.json`
- stdout sha256 `<PRIVATE_REF_04036>` · stderr sha256 `<PRIVATE_REF_03399>`

### E25_RW5_size_token_restart_unverified
- utc: 2026-10-02T07:48:19Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_size_token.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_size_token.json`
- stdout sha256 `<PRIVATE_REF_04875>` · stderr sha256 `<PRIVATE_REF_03399>`

### E26_RW5_size_token_a5check_refused
- utc: 2026-10-02T07:48:19Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_size_token.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### E27_RW5_size_token_report_a5_unverified
- utc: 2026-10-02T07:48:19Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_size_token.json`
- stdout sha256 `<PRIVATE_REF_05562>` · stderr sha256 `<PRIVATE_REF_03399>`

### E28_RW5_caller_label_restart_unverified
- utc: 2026-10-02T07:48:19Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_caller_label.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_caller_label.json`
- stdout sha256 `<PRIVATE_REF_05002>` · stderr sha256 `<PRIVATE_REF_03399>`

### E29_RW5_caller_label_a5check_refused
- utc: 2026-10-02T07:48:19Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_caller_label.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### E30_RW5_caller_label_report_a5_unverified
- utc: 2026-10-02T07:48:19Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_caller_label.json`
- stdout sha256 `<PRIVATE_REF_05836>` · stderr sha256 `<PRIVATE_REF_03399>`

### E31_RW5_misleading_table_restart_unverified
- utc: 2026-10-02T07:48:19Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_misleading.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_valid.json`
- stdout sha256 `<PRIVATE_REF_05822>` · stderr sha256 `<PRIVATE_REF_03399>`

### E32_RW5_misleading_table_a5check_refused
- utc: 2026-10-02T07:48:19Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_misleading.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### E33_RW5_misleading_table_report_a5_unverified
- utc: 2026-10-02T07:48:19Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_misleading.json`
- stdout sha256 `<PRIVATE_REF_04707>` · stderr sha256 `<PRIVATE_REF_03399>`

### E34_restart_fabricated_boot_unverified
- utc: 2026-10-02T07:48:19Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_fabricated.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_after_boot_fabricated.json`
- stdout sha256 `<PRIVATE_REF_04748>` · stderr sha256 `<PRIVATE_REF_03399>`

### E35_restart_without_inventory_unverified
- utc: 2026-10-02T07:48:19Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_noinv.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_valid.json`
- stdout sha256 `<PRIVATE_REF_04730>` · stderr sha256 `<PRIVATE_REF_03399>`

### E36_restart_record_tampered_after_init_unverified
- utc: 2026-10-02T07:48:20Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_tamper.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_valid.json`
- stdout sha256 `<PRIVATE_REF_04512>` · stderr sha256 `<PRIVATE_REF_03399>`

### E37_restart_container_rejected
- utc: 2026-10-02T07:48:20Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_container.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_container_only.json`
- stdout sha256 `<PRIVATE_REF_05101>` · stderr sha256 `<PRIVATE_REF_03399>`

### E38_a3P_without_backend_log_refused
- utc: 2026-10-02T07:48:20Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a3 --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_vm.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/custody_synthetic.json --mode P`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05263>`

### E39_custody_mode_0644_refused
- utc: 2026-10-02T07:48:20Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a3 --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_vm.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/custody_mode_0644.json --mode P --backend-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/bundle_r4_valid.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04664>`

### E40_a4_with_existing_custody_refused
- utc: 2026-10-02T07:48:20Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a4 --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_fresh.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05871>`

### E41_derive_key_identity_mismatch_refused
- utc: 2026-10-02T07:48:20Z · exit: 2
- command: `sx /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py derive-key --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_a4_fail.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04280>`

### E42_a5delete_after_nsetup_fail_refused
- utc: 2026-10-02T07:48:20Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-delete --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_nsetup_fail.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05366>`

### E43_a5create_after_restart_refused
- utc: 2026-10-02T07:48:20Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py a5-create --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_prereq_pass_vm.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/custody_synthetic.json --tag P`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05198>`

### E44_no_identifier_in_states
- utc: 2026-10-02T07:48:20Z · exit: 0
- command: `bash -c echo 'positive control:'; grep -il '<ACCOUNT_EMAIL_098>' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/canary_identifier.txt; echo 'state/output files containing the identifier or synthetic password:'<CREDENTIAL_VALUE_REMOVED>'<ACCOUNT_EMAIL_098>|<ACCOUNT_EMAIL_080>|SYNTHETIC-NOT-A-PASSWORD' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/state_*.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/E0[6-9]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/E[1-4]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/E0[6-9]*.err <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/E[1-4]*.err || echo NONE`
- stdout sha256 `<PRIVATE_REF_05968>` · stderr sha256 `<PRIVATE_REF_03399>`

### E45_fixture_dir_unchanged
- utc: 2026-10-02T07:48:20Z · exit: 0
- command: `bash -c diff <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/fixture_dir_before.txt <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch/fixture_dir_after.txt && echo FIXTURE_DIR_UNCHANGED; shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/*.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/*.patch`
- stdout sha256 `<PRIVATE_REF_05318>` · stderr sha256 `<PRIVATE_REF_03399>`

### E46_r1_r2_r3_runtime_unchanged
- utc: 2026-10-02T07:48:20Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && for m in SHA256SUMS_ADAPTER_STAGE SHA256SUMS_ADAPTER_STAGE_R2 SHA256SUMS_ADAPTER_STAGE_R3; do grep '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK $(grep -c '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m)"; done; shasum -a 256 evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE*; cd evidence/runtime_stage/executor && grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_RT_FINAL | shasum -a 256 -c --quiet && echo RUNTIME_112_VERIFY_OK; shasum -a 256 SHA256SUMS_RT_FINAL ADAPTER_RECORD_CANDIDATE.md RAW_COMMAND_LOG_RT.md`
- stdout sha256 `<PRIVATE_REF_05885>` · stderr sha256 `<PRIVATE_REF_03399>`

### E47_restart_gate_summary
- utc: 2026-10-02T07:48:20Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c 
import json,sys
for s in ('vm','short_process','incomplete_processes','size_token','caller_label','misleading','fabricated','noinv','tamper','container'):
    r=json.load(open(sys.argv[1]+'/state_prereq_pass_'+s+'.json'))['restart']; print(s, r['status'], r['gates'], r['reasons'][:1])
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r4/scratch`
- stdout sha256 `<PRIVATE_REF_05499>` · stderr sha256 `<PRIVATE_REF_03399>`


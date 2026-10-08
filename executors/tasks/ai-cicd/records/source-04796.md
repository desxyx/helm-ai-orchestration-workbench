# STATIC_CHECK_LOG_R3 — MA-1 adapter record R3 restart-evidence gates (Executor Actor 01)
[Runner]: static_checks_r3/run_static_checks_r3.sh · Python 3.12.6 · PYTHONDONTWRITEBYTECODE=1
[Scope]: no endpoint, browser, service, VM, network or credential; synthetic values are labelled non-credentials; URLs are TEST-NET-2 and never contacted; MA-1 runtime evidence is read-only input
[Helpers]: se = env MA1_UI_USER_EMAIL=<ACCOUNT_EMAIL_098> MA1_UI_USER_PASSWORD=<CREDENTIAL_VALUE_REMOVED>; sx = same password, different synthetic identifier

### D01_script_hashes
- utc: 2026-10-02T07:21:52Z · exit: 0
- command: `shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r2.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py`
- stdout sha256 `<PRIVATE_REF_05172>` · stderr sha256 `<PRIVATE_REF_03399>`

### D02_ast_compile
- utc: 2026-10-02T07:21:52Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c import ast,sys; src=open(sys.argv[1]).read(); ast.parse(src); compile(src, sys.argv[1], 'exec'); print('AST_PARSE_OK COMPILE_OK lines', src.count(chr(10))) <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py`
- stdout sha256 `<PRIVATE_REF_04652>` · stderr sha256 `<PRIVATE_REF_03399>`

### D03_help
- utc: 2026-10-02T07:21:52Z · exit: 0
- command: `bash -c /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py --help; for s in init a4 derive-key a3 a5-create a5-delete a5-sentinel a5-restart a5-check report; do echo "=== $s"; /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py $s --help; done`
- stdout sha256 `<PRIVATE_REF_04090>` · stderr sha256 `<PRIVATE_REF_03399>`

### D04_offline_checks
- utc: 2026-10-02T07:21:53Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/offline_checks_r3.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch`
- stdout sha256 `<PRIVATE_REF_04449>` · stderr sha256 `<PRIVATE_REF_03399>`

### D05_build_synthetic_cli_fixtures
- utc: 2026-10-02T07:21:53Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/build_cli_fixtures_r3.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor`
- stdout sha256 `<PRIVATE_REF_04274>` · stderr sha256 `<PRIVATE_REF_03399>`

### D06_init_with_external_deployment_record
- utc: 2026-10-02T07:21:53Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_fresh.json --run-id static-r3-0002 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw/RT-009_vm_first_start.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL`
- stdout sha256 `<PRIVATE_REF_04930>` · stderr sha256 `<PRIVATE_REF_03399>`

### D07_init_free_text_record_refused
- utc: 2026-10-02T07:21:53Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_free.json --run-id static-r3-0003 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/free_text_inventory.txt --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/manifest_free_text.txt`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04132>`

### D08_init_record_not_in_manifest_refused
- utc: 2026-10-02T07:21:53Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_copy.json --run-id static-r3-0004 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/RT-009_copy_not_in_manifest.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04772>`

### D09_init_record_without_manifest_refused
- utc: 2026-10-02T07:21:53Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_half.json --run-id static-r3-0005 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw/RT-009_vm_first_start.out`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05687>`

### D10_init_tampered_fixture_refused
- utc: 2026-10-02T07:21:53Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_tampered.json --run-id static-r3-0006 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/tampered`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04588>`

### D11_restart_without_prereqs_refused
- utc: 2026-10-02T07:21:53Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_fresh.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/bundle_ma1_vm_valid_r3.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05864>`

### D12_restart_after_failed_ndelete_refused
- utc: 2026-10-02T07:21:53Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_ndelete_fail.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/bundle_ma1_vm_valid_r3.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05364>`

### D13_restart_ma1_bundle_both_gates_eligible
- utc: 2026-10-02T07:21:53Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_vm.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/bundle_ma1_vm_valid_r3.json`
- stdout sha256 `<PRIVATE_REF_04596>` · stderr sha256 `<PRIVATE_REF_03399>`

### D14_report_eligible_but_unchecked
- utc: 2026-10-02T07:21:53Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_vm.json`
- stdout sha256 `<PRIVATE_REF_05448>` · stderr sha256 `<PRIVATE_REF_03399>`

### D15_restart_fabricated_boot_id_unverified
- utc: 2026-10-02T07:21:54Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_fabricated.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/bundle_ma1_vm_after_boot_fabricated.json`
- stdout sha256 `<PRIVATE_REF_03773>` · stderr sha256 `<PRIVATE_REF_03399>`

### D16_a5check_after_fabricated_refused
- utc: 2026-10-02T07:21:54Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_fabricated.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### D17_report_after_fabricated
- utc: 2026-10-02T07:21:54Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_fabricated.json`
- stdout sha256 `<PRIVATE_REF_04155>` · stderr sha256 `<PRIVATE_REF_03399>`

### D18_restart_without_inventory_unverified
- utc: 2026-10-02T07:21:54Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_noinv.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/bundle_ma1_vm_valid_r3.json`
- stdout sha256 `<PRIVATE_REF_04133>` · stderr sha256 `<PRIVATE_REF_03399>`

### D19_a5check_without_inventory_refused
- utc: 2026-10-02T07:21:54Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_noinv.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### D20_restart_record_tampered_after_init_unverified
- utc: 2026-10-02T07:21:54Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_tamper.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/bundle_ma1_vm_valid_r3.json`
- stdout sha256 `<PRIVATE_REF_04914>` · stderr sha256 `<PRIVATE_REF_03399>`

### D21_restart_container_rejected
- utc: 2026-10-02T07:21:54Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_container.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/bundle_container_only_r3.json`
- stdout sha256 `<PRIVATE_REF_05454>` · stderr sha256 `<PRIVATE_REF_03399>`

### D22_a3P_without_backend_log_refused
- utc: 2026-10-02T07:21:54Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a3 --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_vm.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/custody_synthetic.json --mode P`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05263>`

### D23_custody_mode_0644_refused
- utc: 2026-10-02T07:21:54Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a3 --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_vm.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/custody_mode_0644.json --mode P --backend-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/bundle_ma1_vm_valid_r3.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04120>`

### D24_a4_with_existing_custody_refused
- utc: 2026-10-02T07:21:54Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a4 --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_fresh.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05871>`

### D25_derive_key_identity_mismatch_refused
- utc: 2026-10-02T07:21:54Z · exit: 2
- command: `sx /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py derive-key --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_a4_fail.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04280>`

### D26_derive_key_after_A4_fail_refused
- utc: 2026-10-02T07:21:54Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py derive-key --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_a4_fail.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05394>`

### D27_a5delete_after_nsetup_fail_refused
- utc: 2026-10-02T07:21:54Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a5-delete --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_nsetup_fail.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05366>`

### D28_a5create_after_restart_refused
- utc: 2026-10-02T07:21:54Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py a5-create --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_prereq_pass_vm.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/custody_synthetic.json --tag P`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05198>`

### D29_no_identifier_in_states
- utc: 2026-10-02T07:21:55Z · exit: 0
- command: `bash -c echo 'positive control:'; grep -il '<ACCOUNT_EMAIL_098>' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/canary_identifier.txt; echo 'state/output files containing the identifier or synthetic password:'<CREDENTIAL_VALUE_REMOVED>'<ACCOUNT_EMAIL_098>|<ACCOUNT_EMAIL_080>|SYNTHETIC-NOT-A-PASSWORD' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/state_*.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/D0[6-9]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/D[12]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/D0[6-9]*.err <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/D[12]*.err || echo NONE`
- stdout sha256 `<PRIVATE_REF_05742>` · stderr sha256 `<PRIVATE_REF_03399>`

### D30_fixture_dir_unchanged
- utc: 2026-10-02T07:21:55Z · exit: 0
- command: `bash -c diff <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/fixture_dir_before.txt <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch/fixture_dir_after.txt && echo FIXTURE_DIR_UNCHANGED; shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/*.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/*.patch`
- stdout sha256 `<PRIVATE_REF_05318>` · stderr sha256 `<PRIVATE_REF_03399>`

### D31_r1_r2_runtime_unchanged
- utc: 2026-10-02T07:21:55Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && grep '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE | shasum -a 256 -c --quiet && echo R1_39_VERIFY_OK; grep '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R2 | shasum -a 256 -c --quiet && echo R2_74_VERIFY_OK; shasum -a 256 evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R2 executor/adapter_record_stage/ma1_verify.py executor/adapter_record_stage/ma1_verify_r2.py; cd evidence/runtime_stage/executor && grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_RT_FINAL | shasum -a 256 -c --quiet && echo RUNTIME_112_VERIFY_OK; shasum -a 256 SHA256SUMS_RT_FINAL ADAPTER_RECORD_CANDIDATE.md`
- stdout sha256 `<PRIVATE_REF_05465>` · stderr sha256 `<PRIVATE_REF_03399>`

### D32_restart_gate_summary
- utc: 2026-10-02T07:21:55Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c 
import json,sys
for s in ('vm','fabricated','noinv','tamper','container'):
    r=json.load(open(sys.argv[1]+'/state_prereq_pass_'+s+'.json'))['restart']; print(s, r['status'], r['gates'], r['reasons'][:1])
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r3/scratch`
- stdout sha256 `<PRIVATE_REF_05207>` · stderr sha256 `<PRIVATE_REF_03399>`


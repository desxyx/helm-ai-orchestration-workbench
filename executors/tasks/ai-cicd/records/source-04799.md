# STATIC_CHECK_LOG_R6 — MA-1 adapter record R6 producer field-cardinality rework (Executor Actor 01)
[Runner]: static_checks_r6/run_static_checks_r6.sh · Python 3.12.6 · PYTHONDONTWRITEBYTECODE=1
[Scope]: no endpoint, browser, service, VM, network or credential; SYNTHETIC fixtures are labelled; URLs are TEST-NET-2 and never contacted; MA-1 runtime evidence is read-only input
[Helpers]: se = env MA1_UI_USER_EMAIL=<ACCOUNT_EMAIL_098> MA1_UI_USER_PASSWORD=<CREDENTIAL_VALUE_REMOVED>; sx = same password, different synthetic identifier

### G01_script_hashes
- utc: 2026-10-02T12:11:02Z · exit: 0
- command: `shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r5.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r3.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r2.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify.py`
- stdout sha256 `<PRIVATE_REF_04137>` · stderr sha256 `<PRIVATE_REF_03399>`

### G02_ast_compile
- utc: 2026-10-02T12:11:02Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c import ast,sys; src=open(sys.argv[1]).read(); ast.parse(src); compile(src, sys.argv[1], 'exec'); print('AST_PARSE_OK COMPILE_OK lines', src.count(chr(10))) <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py`
- stdout sha256 `<PRIVATE_REF_04042>` · stderr sha256 `<PRIVATE_REF_03399>`

### G03_help
- utc: 2026-10-02T12:11:02Z · exit: 0
- command: `bash -c /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py --help; for s in init a4 derive-key a3 a5-create a5-delete a5-sentinel a5-restart a5-check report; do echo "=== $s"; /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py $s --help; done`
- stdout sha256 `<PRIVATE_REF_04922>` · stderr sha256 `<PRIVATE_REF_03399>`

### G04_offline_checks
- utc: 2026-10-02T12:11:02Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/offline_checks_r6.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch`
- stdout sha256 `<PRIVATE_REF_05814>` · stderr sha256 `<PRIVATE_REF_03399>`

### G05_build_synthetic_cli_fixtures
- utc: 2026-10-02T12:11:03Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/build_cli_fixtures_r6.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor`
- stdout sha256 `<PRIVATE_REF_04396>` · stderr sha256 `<PRIVATE_REF_03399>`

### G06_init_synthetic_dedicated_producer_accepted
- utc: 2026-10-02T12:11:03Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_fresh.json --run-id static-r6-0002 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_positive/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_positive/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_positive/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_04945>` · stderr sha256 `<PRIVATE_REF_03399>`

### G07_init_authentic_RT009_refused
- utc: 2026-10-02T12:11:03Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s7.json --run-id static-r6-0007 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw/RT-009_vm_first_start.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL --deployment-command-log source-04882.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04760>`

### G08_init_RW8_echo_output_refused
- utc: 2026-10-02T12:11:03Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s8.json --run-id static-r6-0008 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_echo_words/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_echo_words/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_echo_words/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04672>`

### G09_init_RW8_comment_refused
- utc: 2026-10-02T12:11:03Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s9.json --run-id static-r6-0009 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_comment/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_comment/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_comment/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04248>`

### G10_init_RW8_quoted_refused
- utc: 2026-10-02T12:11:03Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s10.json --run-id static-r6-0010 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_quoted/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_quoted/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_quoted/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04062>`

### G11_init_RW8_discarded_stdout_other_emits_refused
- utc: 2026-10-02T12:11:03Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s11.json --run-id static-r6-0011 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_discarded_other_emits/raw/emit.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_discarded_other_emits/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_discarded_other_emits/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05907>`

### G12_init_RW8_unrelated_producer_after_listing_refused
- utc: 2026-10-02T12:11:03Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s12.json --run-id static-r6-0012 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_unrelated_after/raw/emit.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_unrelated_after/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_unrelated_after/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04028>`

### G13_init_RW8_appended_unrelated_output_refused
- utc: 2026-10-02T12:11:03Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s13.json --run-id static-r6-0013 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_appended_unrelated/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_appended_unrelated/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_appended_unrelated/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04153>`

### G14_init_shell_wrapper_refused
- utc: 2026-10-02T12:11:04Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s14.json --run-id static-r6-0014 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_wrapper/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_wrapper/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_wrapper/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05530>`

### G15_init_unregistered_gcloud_refused
- utc: 2026-10-02T12:11:04Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s15.json --run-id static-r6-0015 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_positive/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_positive/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/gateb_positive/COMMAND_LOG.md --deployment-platform gcloud`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05928>`

### G16_init_tampered_fixture_refused
- utc: 2026-10-02T12:11:04Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s16.json --run-id static-r6-0016 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/tampered`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04588>`

### G17_restart_without_prereqs_refused
- utc: 2026-10-02T12:11:04Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_fresh.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05864>`

### G18_restart_after_failed_ndelete_refused
- utc: 2026-10-02T12:11:04Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_ndelete_fail.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05364>`

### G19_restart_synthetic_positive_eligible
- utc: 2026-10-02T12:11:04Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_positive.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04143>` · stderr sha256 `<PRIVATE_REF_03399>`

### G20_report_synthetic_eligible_unchecked
- utc: 2026-10-02T12:11:04Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_positive.json`
- stdout sha256 `<PRIVATE_REF_04389>` · stderr sha256 `<PRIVATE_REF_03399>`

### G21_restart_authentic_ma1_with_forged_RT009_unverified
- utc: 2026-10-02T12:11:04Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_authentic_rt009_forged.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_authentic_ma1.json`
- stdout sha256 `<PRIVATE_REF_05320>` · stderr sha256 `<PRIVATE_REF_03399>`

### G22_a5check_authentic_rt009_refused
- utc: 2026-10-02T12:11:04Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_authentic_rt009_forged.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### G23_report_authentic_rt009_a5_unverified
- utc: 2026-10-02T12:11:05Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_authentic_rt009_forged.json`
- stdout sha256 `<PRIVATE_REF_04367>` · stderr sha256 `<PRIVATE_REF_03399>`

### G24_RW8_echo_words_restart_unverified
- utc: 2026-10-02T12:11:05Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_echo_words.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04041>` · stderr sha256 `<PRIVATE_REF_03399>`

### G25_RW8_echo_words_a5check_refused
- utc: 2026-10-02T12:11:05Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_echo_words.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### G26_RW8_echo_words_report_a5_unverified
- utc: 2026-10-02T12:11:05Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_echo_words.json`
- stdout sha256 `<PRIVATE_REF_04219>` · stderr sha256 `<PRIVATE_REF_03399>`

### G27_RW8_comment_restart_unverified
- utc: 2026-10-02T12:11:05Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_comment.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04041>` · stderr sha256 `<PRIVATE_REF_03399>`

### G28_RW8_comment_a5check_refused
- utc: 2026-10-02T12:11:05Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_comment.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### G29_RW8_comment_report_a5_unverified
- utc: 2026-10-02T12:11:05Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_comment.json`
- stdout sha256 `<PRIVATE_REF_05291>` · stderr sha256 `<PRIVATE_REF_03399>`

### G30_RW8_discarded_other_emits_restart_unverified
- utc: 2026-10-02T12:11:05Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_discarded_other_emits.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04041>` · stderr sha256 `<PRIVATE_REF_03399>`

### G31_RW8_discarded_other_emits_a5check_refused
- utc: 2026-10-02T12:11:05Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_discarded_other_emits.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### G32_RW8_discarded_other_emits_report_a5_unverified
- utc: 2026-10-02T12:11:05Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_discarded_other_emits.json`
- stdout sha256 `<PRIVATE_REF_04544>` · stderr sha256 `<PRIVATE_REF_03399>`

### G33_RW8_unrelated_after_restart_unverified
- utc: 2026-10-02T12:11:05Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_unrelated_after.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04041>` · stderr sha256 `<PRIVATE_REF_03399>`

### G34_RW8_unrelated_after_a5check_refused
- utc: 2026-10-02T12:11:05Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_unrelated_after.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### G35_RW8_unrelated_after_report_a5_unverified
- utc: 2026-10-02T12:11:05Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_unrelated_after.json`
- stdout sha256 `<PRIVATE_REF_04276>` · stderr sha256 `<PRIVATE_REF_03399>`

### G36_RW8_appended_unrelated_restart_unverified
- utc: 2026-10-02T12:11:05Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_appended_unrelated.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04041>` · stderr sha256 `<PRIVATE_REF_03399>`

### G37_RW8_appended_unrelated_a5check_refused
- utc: 2026-10-02T12:11:05Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_appended_unrelated.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### G38_RW8_appended_unrelated_report_a5_unverified
- utc: 2026-10-02T12:11:06Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_deception_appended_unrelated.json`
- stdout sha256 `<PRIVATE_REF_05780>` · stderr sha256 `<PRIVATE_REF_03399>`

### G39_RW9_short_process_restart_unverified
- utc: 2026-10-02T12:11:06Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_short_process.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_short_process.json`
- stdout sha256 `<PRIVATE_REF_05919>` · stderr sha256 `<PRIVATE_REF_03399>`

### G40_RW9_short_process_a5check_refused
- utc: 2026-10-02T12:11:06Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_short_process.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### G41_RW9_incomplete_processes_restart_unverified
- utc: 2026-10-02T12:11:06Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_incomplete_processes.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_incomplete_processes.json`
- stdout sha256 `<PRIVATE_REF_03777>` · stderr sha256 `<PRIVATE_REF_03399>`

### G42_RW9_incomplete_processes_a5check_refused
- utc: 2026-10-02T12:11:06Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_incomplete_processes.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### G43_RW9_size_token_restart_unverified
- utc: 2026-10-02T12:11:06Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_size_token.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_size_token.json`
- stdout sha256 `<PRIVATE_REF_04961>` · stderr sha256 `<PRIVATE_REF_03399>`

### G44_RW9_size_token_a5check_refused
- utc: 2026-10-02T12:11:06Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_size_token.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### G45_restart_container_rejected
- utc: 2026-10-02T12:11:06Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_container.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_container.json`
- stdout sha256 `<PRIVATE_REF_05233>` · stderr sha256 `<PRIVATE_REF_03399>`

### G46_restart_record_tampered_after_init_unverified
- utc: 2026-10-02T12:11:06Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_tamper.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04579>` · stderr sha256 `<PRIVATE_REF_03399>`

### G47_a3P_without_backend_log_refused
- utc: 2026-10-02T12:11:06Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a3 --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_positive.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json --mode P`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05263>`

### G48_custody_mode_0644_refused
- utc: 2026-10-02T12:11:06Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a3 --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_positive.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_mode_0644.json --mode P --backend-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05797>`

### G49_a4_with_existing_custody_refused
- utc: 2026-10-02T12:11:06Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a4 --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_fresh.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05871>`

### G50_derive_key_identity_mismatch_refused
- utc: 2026-10-02T12:11:06Z · exit: 2
- command: `sx /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py derive-key --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_a4_fail.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04280>`

### G51_a5delete_after_nsetup_fail_refused
- utc: 2026-10-02T12:11:06Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-delete --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_nsetup_fail.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05366>`

### G52_a5create_after_restart_refused
- utc: 2026-10-02T12:11:06Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-create --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_synth_positive.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json --tag P`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05198>`

### GR6_01a_cmd_bad_then_good_init_refused
- utc: 2026-10-02T12:11:07Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_cmd_bad_then_good.json --run-id static-r6-102 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_cmd_bad_then_good/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_cmd_bad_then_good/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_cmd_bad_then_good/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04056>`

### GR6_01b_cmd_bad_then_good_forced_restart_unverified
- utc: 2026-10-02T12:11:07Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_cmd_bad_then_good.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04712>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_01c_cmd_bad_then_good_a5check_refused
- utc: 2026-10-02T12:11:07Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_cmd_bad_then_good.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_01d_cmd_bad_then_good_report_a5_unverified
- utc: 2026-10-02T12:11:07Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_cmd_bad_then_good.json`
- stdout sha256 `<PRIVATE_REF_04999>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_02a_cmd_good_then_bad_init_refused
- utc: 2026-10-02T12:11:07Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_cmd_good_then_bad.json --run-id static-r6-103 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_cmd_good_then_bad/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_cmd_good_then_bad/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_cmd_good_then_bad/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04056>`

### GR6_02b_cmd_good_then_bad_forced_restart_unverified
- utc: 2026-10-02T12:11:07Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_cmd_good_then_bad.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04712>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_02c_cmd_good_then_bad_a5check_refused
- utc: 2026-10-02T12:11:07Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_cmd_good_then_bad.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_02d_cmd_good_then_bad_report_a5_unverified
- utc: 2026-10-02T12:11:07Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_cmd_good_then_bad.json`
- stdout sha256 `<PRIVATE_REF_05251>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_03a_exit_1_then_0_init_refused
- utc: 2026-10-02T12:11:07Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_exit_1_then_0.json --run-id static-r6-104 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_exit_1_then_0/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_exit_1_then_0/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_exit_1_then_0/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04828>`

### GR6_03b_exit_1_then_0_forced_restart_unverified
- utc: 2026-10-02T12:11:07Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_exit_1_then_0.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04712>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_03c_exit_1_then_0_a5check_refused
- utc: 2026-10-02T12:11:07Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_exit_1_then_0.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_03d_exit_1_then_0_report_a5_unverified
- utc: 2026-10-02T12:11:07Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_exit_1_then_0.json`
- stdout sha256 `<PRIVATE_REF_04924>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_04a_exit_0_then_1_init_refused
- utc: 2026-10-02T12:11:07Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_exit_0_then_1.json --run-id static-r6-105 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_exit_0_then_1/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_exit_0_then_1/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_exit_0_then_1/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04828>`

### GR6_04b_exit_0_then_1_forced_restart_unverified
- utc: 2026-10-02T12:11:07Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_exit_0_then_1.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04712>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_04c_exit_0_then_1_a5check_refused
- utc: 2026-10-02T12:11:07Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_exit_0_then_1.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_04d_exit_0_then_1_report_a5_unverified
- utc: 2026-10-02T12:11:08Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_exit_0_then_1.json`
- stdout sha256 `<PRIVATE_REF_05860>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_05a_stdout_other_then_rec_init_refused
- utc: 2026-10-02T12:11:08Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_stdout_other_then_rec.json --run-id static-r6-106 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stdout_other_then_rec/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stdout_other_then_rec/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stdout_other_then_rec/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05930>`

### GR6_05b_stdout_other_then_rec_forced_restart_unverified
- utc: 2026-10-02T12:11:08Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stdout_other_then_rec.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04552>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_05c_stdout_other_then_rec_a5check_refused
- utc: 2026-10-02T12:11:08Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stdout_other_then_rec.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_05d_stdout_other_then_rec_report_a5_unverified
- utc: 2026-10-02T12:11:08Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stdout_other_then_rec.json`
- stdout sha256 `<PRIVATE_REF_04081>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_06a_stdout_rec_then_other_init_refused
- utc: 2026-10-02T12:11:08Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_stdout_rec_then_other.json --run-id static-r6-107 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stdout_rec_then_other/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stdout_rec_then_other/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stdout_rec_then_other/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05930>`

### GR6_06b_stdout_rec_then_other_forced_restart_unverified
- utc: 2026-10-02T12:11:08Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stdout_rec_then_other.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04552>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_06c_stdout_rec_then_other_a5check_refused
- utc: 2026-10-02T12:11:08Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stdout_rec_then_other.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_06d_stdout_rec_then_other_report_a5_unverified
- utc: 2026-10-02T12:11:08Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stdout_rec_then_other.json`
- stdout sha256 `<PRIVATE_REF_04524>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_07a_stderr_other_then_exp_init_refused
- utc: 2026-10-02T12:11:08Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_stderr_other_then_exp.json --run-id static-r6-108 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stderr_other_then_exp/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stderr_other_then_exp/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stderr_other_then_exp/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04576>`

### GR6_07b_stderr_other_then_exp_forced_restart_unverified
- utc: 2026-10-02T12:11:08Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stderr_other_then_exp.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04552>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_07c_stderr_other_then_exp_a5check_refused
- utc: 2026-10-02T12:11:08Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stderr_other_then_exp.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_07d_stderr_other_then_exp_report_a5_unverified
- utc: 2026-10-02T12:11:08Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stderr_other_then_exp.json`
- stdout sha256 `<PRIVATE_REF_04145>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_08a_stderr_exp_then_other_init_refused
- utc: 2026-10-02T12:11:08Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_stderr_exp_then_other.json --run-id static-r6-109 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stderr_exp_then_other/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stderr_exp_then_other/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_stderr_exp_then_other/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04576>`

### GR6_08b_stderr_exp_then_other_forced_restart_unverified
- utc: 2026-10-02T12:11:08Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stderr_exp_then_other.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_03801>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_08c_stderr_exp_then_other_a5check_refused
- utc: 2026-10-02T12:11:09Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stderr_exp_then_other.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_08d_stderr_exp_then_other_report_a5_unverified
- utc: 2026-10-02T12:11:09Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_stderr_exp_then_other.json`
- stdout sha256 `<PRIVATE_REF_04317>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_09a_Reviewer_Actor_02_combined_init_refused
- utc: 2026-10-02T12:11:09Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_Reviewer_Actor_02_combined.json --run-id static-r6-110 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_Reviewer_Actor_02_combined/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_Reviewer_Actor_02_combined/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_Reviewer_Actor_02_combined/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04001>`

### GR6_09b_Reviewer_Actor_02_combined_forced_restart_unverified
- utc: 2026-10-02T12:11:09Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_Reviewer_Actor_02_combined.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_03801>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_09c_Reviewer_Actor_02_combined_a5check_refused
- utc: 2026-10-02T12:11:09Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_Reviewer_Actor_02_combined.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_09d_Reviewer_Actor_02_combined_report_a5_unverified
- utc: 2026-10-02T12:11:09Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_Reviewer_Actor_02_combined.json`
- stdout sha256 `<PRIVATE_REF_04611>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_10a_hidden_rec_claimant_init_refused
- utc: 2026-10-02T12:11:09Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_hidden_rec_claimant.json --run-id static-r6-111 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_hidden_rec_claimant/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_hidden_rec_claimant/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_hidden_rec_claimant/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04471>`

### GR6_10b_hidden_rec_claimant_forced_restart_unverified
- utc: 2026-10-02T12:11:09Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_hidden_rec_claimant.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_03801>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_10c_hidden_rec_claimant_a5check_refused
- utc: 2026-10-02T12:11:09Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_hidden_rec_claimant.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_10d_hidden_rec_claimant_report_a5_unverified
- utc: 2026-10-02T12:11:09Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_hidden_rec_claimant.json`
- stdout sha256 `<PRIVATE_REF_04682>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_11a_hidden_err_claimant_init_refused
- utc: 2026-10-02T12:11:09Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_hidden_err_claimant.json --run-id static-r6-112 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_hidden_err_claimant/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_hidden_err_claimant/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_hidden_err_claimant/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04977>`

### GR6_11b_hidden_err_claimant_forced_restart_unverified
- utc: 2026-10-02T12:11:09Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_hidden_err_claimant.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_03801>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_11c_hidden_err_claimant_a5check_refused
- utc: 2026-10-02T12:11:09Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_hidden_err_claimant.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_11d_hidden_err_claimant_report_a5_unverified
- utc: 2026-10-02T12:11:09Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_hidden_err_claimant.json`
- stdout sha256 `<PRIVATE_REF_04589>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_12a_malformed_exit_line_init_refused
- utc: 2026-10-02T12:11:09Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_malformed_exit_line.json --run-id static-r6-113 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_malformed_exit_line/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_malformed_exit_line/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_malformed_exit_line/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04338>`

### GR6_12b_malformed_exit_line_forced_restart_unverified
- utc: 2026-10-02T12:11:10Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_malformed_exit_line.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_05663>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_12c_malformed_exit_line_a5check_refused
- utc: 2026-10-02T12:11:10Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_malformed_exit_line.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_12d_malformed_exit_line_report_a5_unverified
- utc: 2026-10-02T12:11:10Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_malformed_exit_line.json`
- stdout sha256 `<PRIVATE_REF_05197>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_13a_malformed_stdout_line_init_refused
- utc: 2026-10-02T12:11:10Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_malformed_stdout_line.json --run-id static-r6-114 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_malformed_stdout_line/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_malformed_stdout_line/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_malformed_stdout_line/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04338>`

### GR6_13b_malformed_stdout_line_forced_restart_unverified
- utc: 2026-10-02T12:11:10Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_malformed_stdout_line.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_05663>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_13c_malformed_stdout_line_a5check_refused
- utc: 2026-10-02T12:11:10Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_malformed_stdout_line.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_13d_malformed_stdout_line_report_a5_unverified
- utc: 2026-10-02T12:11:10Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_malformed_stdout_line.json`
- stdout sha256 `<PRIVATE_REF_05034>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_14a_orphan_claimant_init_refused
- utc: 2026-10-02T12:11:10Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_orphan_claimant.json --run-id static-r6-115 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_orphan_claimant/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_orphan_claimant/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_orphan_claimant/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04471>`

### GR6_14b_orphan_claimant_forced_restart_unverified
- utc: 2026-10-02T12:11:10Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_orphan_claimant.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_05663>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_14c_orphan_claimant_a5check_refused
- utc: 2026-10-02T12:11:10Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_orphan_claimant.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_14d_orphan_claimant_report_a5_unverified
- utc: 2026-10-02T12:11:10Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_orphan_claimant.json`
- stdout sha256 `<PRIVATE_REF_05763>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_15a_missing_stderr_init_refused
- utc: 2026-10-02T12:11:10Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_missing_stderr.json --run-id static-r6-116 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_missing_stderr/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_missing_stderr/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_missing_stderr/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04136>`

### GR6_15b_missing_stderr_forced_restart_unverified
- utc: 2026-10-02T12:11:10Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_missing_stderr.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_05663>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_15c_missing_stderr_a5check_refused
- utc: 2026-10-02T12:11:10Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_missing_stderr.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_15d_missing_stderr_report_a5_unverified
- utc: 2026-10-02T12:11:10Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_missing_stderr.json`
- stdout sha256 `<PRIVATE_REF_04231>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_16a_plain_text_claimant_init_refused
- utc: 2026-10-02T12:11:11Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/s_r6_plain_text_claimant.json --run-id static-r6-117 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_plain_text_claimant/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_plain_text_claimant/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/r6_plain_text_claimant/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04453>`

### GR6_16b_plain_text_claimant_forced_restart_unverified
- utc: 2026-10-02T12:11:11Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_plain_text_claimant.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/bundle_r5_synthetic_vm.json`
- stdout sha256 `<PRIVATE_REF_04755>` · stderr sha256 `<PRIVATE_REF_03399>`

### GR6_16c_plain_text_claimant_a5check_refused
- utc: 2026-10-02T12:11:11Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_plain_text_claimant.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### GR6_16d_plain_text_claimant_report_a5_unverified
- utc: 2026-10-02T12:11:11Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_r6_plain_text_claimant.json`
- stdout sha256 `<PRIVATE_REF_04937>` · stderr sha256 `<PRIVATE_REF_03399>`

### G53_no_identifier_in_states
- utc: 2026-10-02T12:11:11Z · exit: 0
- command: `bash -c echo 'positive control:'; grep -il '<ACCOUNT_EMAIL_098>' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/canary_identifier.txt; echo 'state/output files containing the identifier or synthetic password:'<CREDENTIAL_VALUE_REMOVED>'<ACCOUNT_EMAIL_098>|<ACCOUNT_EMAIL_080>|SYNTHETIC-NOT-A-PASSWORD' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_*.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/G0[6-9]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/G[1-5]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/GR6*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/G0[6-9]*.err <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/G[1-5]*.err <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/GR6*.err || echo NONE`
- stdout sha256 `<PRIVATE_REF_05647>` · stderr sha256 `<PRIVATE_REF_03399>`

### G54_fixture_dir_unchanged
- utc: 2026-10-02T12:11:11Z · exit: 0
- command: `bash -c diff <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/fixture_dir_before.txt <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/fixture_dir_after.txt && echo FIXTURE_DIR_UNCHANGED; shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/*.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/*.patch`
- stdout sha256 `<PRIVATE_REF_05318>` · stderr sha256 `<PRIVATE_REF_03399>`

### G55_r1_to_r5_and_runtime_unchanged
- utc: 2026-10-02T12:11:11Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && for m in SHA256SUMS_ADAPTER_STAGE SHA256SUMS_ADAPTER_STAGE_R2 SHA256SUMS_ADAPTER_STAGE_R3 SHA256SUMS_ADAPTER_STAGE_R4 SHA256SUMS_ADAPTER_STAGE_R5; do grep '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK $(grep -c '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m)"; done; shasum -a 256 evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE*; cd evidence/runtime_stage/executor && grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_RT_FINAL | shasum -a 256 -c --quiet && echo RUNTIME_112_VERIFY_OK; shasum -a 256 SHA256SUMS_RT_FINAL RAW_COMMAND_LOG_RT.md raw/RT-009_vm_first_start.out raw/RT-009_vm_first_start.err ADAPTER_RECORD_CANDIDATE.md`
- stdout sha256 `<PRIVATE_REF_04224>` · stderr sha256 `<PRIVATE_REF_03399>`

### G56_restart_gate_summary
- utc: 2026-10-02T12:11:11Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c 
import json,sys,glob,os
for p in sorted(glob.glob(sys.argv[1]+'/state_*.json')):
    r=json.load(open(p)).get('restart')
    if r: print(os.path.basename(p), r['status'], r['gates'], r['reasons'][:1])
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch`
- stdout sha256 `<PRIVATE_REF_05619>` · stderr sha256 `<PRIVATE_REF_03399>`

### G57_init_state_inventory_summary
- utc: 2026-10-02T12:11:11Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c 
import json,sys; i=json.load(open(sys.argv[1]))['deployment_inventory']; print({k:i[k] for k in ('platform','producer_entry','producer_argv','units')})
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r6/scratch/state_fresh.json`
- stdout sha256 `<PRIVATE_REF_04420>` · stderr sha256 `<PRIVATE_REF_03399>`


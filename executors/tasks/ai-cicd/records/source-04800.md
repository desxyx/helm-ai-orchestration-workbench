# STATIC_CHECK_LOG_R7 — MA-1 adapter R7 GCP profiles (Executor Actor 01)
[Runner]: static_checks_r7/run_static_checks_r7.sh · Python 3.12.6 · PYTHONDONTWRITEBYTECODE=1
[Scope]: offline only; genuine GCP captures read-only (live logs GCP_COMMAND_LOG.md / _2.md and their manifests); SYNTHETIC A5 states and DERIVED fixtures labelled; no provider call
[Helpers]: se = env MA1_UI_USER_EMAIL=<ACCOUNT_EMAIL_098> MA1_UI_USER_PASSWORD=<CREDENTIAL_VALUE_REMOVED>

### H01_script_hashes
- utc: 2026-10-03T07:24:07Z · exit: 0
- command: `shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r5.py`
- stdout sha256 `<PRIVATE_REF_05136>` · stderr sha256 `<PRIVATE_REF_03399>`

### H02_ast_compile
- utc: 2026-10-03T07:24:07Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c import ast,sys; src=open(sys.argv[1]).read(); ast.parse(src); compile(src, sys.argv[1], 'exec'); print('AST_PARSE_OK COMPILE_OK lines', src.count(chr(10))) <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py`
- stdout sha256 `<PRIVATE_REF_04867>` · stderr sha256 `<PRIVATE_REF_03399>`

### H03_help
- utc: 2026-10-03T07:24:07Z · exit: 0
- command: `bash -c /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py --help; for s in init a5-restart a5-check report; do echo "=== $s"; /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py $s --help; done`
- stdout sha256 `<PRIVATE_REF_04159>` · stderr sha256 `<PRIVATE_REF_03399>`

### H04_offline_gcp_checks
- utc: 2026-10-03T07:24:07Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/offline_checks_r7_gcp.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch`
- stdout sha256 `<PRIVATE_REF_05050>` · stderr sha256 `<PRIVATE_REF_03399>`

### H05_offline_r6_suite_on_r7_regression
- utc: 2026-10-03T07:25:44Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/offline_checks_r6_on_r7.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch_r6`
- stdout sha256 `<PRIVATE_REF_05814>` · stderr sha256 `<PRIVATE_REF_03399>`

### H06_build_cli_fixtures
- utc: 2026-10-03T07:25:45Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/build_cli_fixtures_r7.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor`
- stdout sha256 `<PRIVATE_REF_04934>` · stderr sha256 `<PRIVATE_REF_03399>`

### H07_init_gcp_mixed_genuine_accepted
- utc: 2026-10-03T07:25:46Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s_init_mixed.json --run-id static-r7-0007 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE --deployment-command-log source-04822.md`
- stdout sha256 `<PRIVATE_REF_05349>` · stderr sha256 `<PRIVATE_REF_03399>`

### H08_init_gcp_standalone_genuine_accepted
- utc: 2026-10-03T07:25:46Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s_init_run.json --run-id static-r7-0008 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-160_seg2_inventory_compute.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-161_seg2_inventory_run.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-162_seg2_inventory_asset.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE2 --deployment-command-log source-04823.md`
- stdout sha256 `<PRIVATE_REF_04024>` · stderr sha256 `<PRIVATE_REF_03399>`

### H09_init_gcp_stale_refused
- utc: 2026-10-03T07:25:47Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s9.json --run-id static-r7-0009 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-054_compute_instances_all_after_enable.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-055_run_services_all_after_enable.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE --deployment-command-log source-04822.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05164>`

### H10_init_gcp_failed_producer_refused
- utc: 2026-10-03T07:25:47Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s10.json --run-id static-r7-0010 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-076_inventory_run_services.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE --deployment-command-log source-04822.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04147>`

### H11_init_gcp_wrong_project_refused
- utc: 2026-10-03T07:25:47Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s11.json --run-id static-r7-0011 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <OTHER_CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE --deployment-command-log source-04822.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04486>`

### H12_init_gcp_wrong_manifest_refused
- utc: 2026-10-03T07:25:47Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s12.json --run-id static-r7-0012 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE2 --deployment-command-log source-04822.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05082>`

### H13_restart_mixed_stop_start_eligible
- utc: 2026-10-03T07:25:47Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_mixed.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/bundle_gcp_mixed.json`
- stdout sha256 `<PRIVATE_REF_04962>` · stderr sha256 `<PRIVATE_REF_03399>`

### H14_report_mixed_eligible_unchecked
- utc: 2026-10-03T07:25:50Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_mixed.json`
- stdout sha256 `<PRIVATE_REF_04979>` · stderr sha256 `<PRIVATE_REF_03399>`

### H15_restart_mixed_reset_eligible
- utc: 2026-10-03T07:25:50Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_mixed_reset.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/bundle_gcp_mixed_reset.json`
- stdout sha256 `<PRIVATE_REF_04874>` · stderr sha256 `<PRIVATE_REF_03399>`

### H16_restart_standalone_run_eligible
- utc: 2026-10-03T07:25:52Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_standalone_run.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/bundle_gcp_standalone_run.json`
- stdout sha256 `<PRIVATE_REF_05392>` · stderr sha256 `<PRIVATE_REF_03399>`

### H17_restart_suspend_resume_rejected
- utc: 2026-10-03T07:25:53Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_suspend.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/bundle_gcp_suspend.json`
- stdout sha256 `<PRIVATE_REF_04434>` · stderr sha256 `<PRIVATE_REF_03399>`

### H18_a5check_after_suspend_refused
- utc: 2026-10-03T07:25:54Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_suspend.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### H19_restart_traffic_noop_unverified
- utc: 2026-10-03T07:25:54Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_noop.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/bundle_gcp_noop.json`
- stdout sha256 `<PRIVATE_REF_05450>` · stderr sha256 `<PRIVATE_REF_03399>`

### H20_a5check_after_noop_refused
- utc: 2026-10-03T07:25:56Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_noop.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### H21_report_noop_a5_unverified
- utc: 2026-10-03T07:25:56Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_noop.json`
- stdout sha256 `<PRIVATE_REF_04901>` · stderr sha256 `<PRIVATE_REF_03399>`

### H22_restart_unchanged_boot_unverified
- utc: 2026-10-03T07:25:56Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_unchanged_boot.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/bundle_gcp_unchanged_boot.json`
- stdout sha256 `<PRIVATE_REF_04796>` · stderr sha256 `<PRIVATE_REF_03399>`

### H23_a5check_unchanged_boot_refused
- utc: 2026-10-03T07:25:59Z · exit: 2
- command: `se /Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_unchanged_boot.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### H24_restart_vm_only_missing_unit_unverified
- utc: 2026-10-03T07:25:59Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_vm_only.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/bundle_gcp_vm_only.json`
- stdout sha256 `<PRIVATE_REF_05008>` · stderr sha256 `<PRIVATE_REF_03399>`

### H25_restart_no_inventory_unverified
- utc: 2026-10-03T07:26:00Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_noinv.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/bundle_gcp_mixed.json`
- stdout sha256 `<PRIVATE_REF_05767>` · stderr sha256 `<PRIVATE_REF_03399>`

### H26_restart_inventory_tampered_after_init_unverified
- utc: 2026-10-03T07:26:03Z · exit: 1
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_gcp_tamper.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/bundle_gcp_tamper.json`
- stdout sha256 `<PRIVATE_REF_04059>` · stderr sha256 `<PRIVATE_REF_03399>`

### H27_lima_regression_init_RT009_refused
- utc: 2026-10-03T07:26:06Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s27.json --run-id static-r7-0027 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw/RT-009_vm_first_start.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL --deployment-command-log source-04882.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04760>`

### H28_lima_regression_init_synthetic_dedicated_accepted
- utc: 2026-10-03T07:26:06Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s28.json --run-id static-r7-0028 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch_r6/gateb_positive/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch_r6/gateb_positive/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch_r6/gateb_positive/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_04662>` · stderr sha256 `<PRIVATE_REF_03399>`

### H29_lima_regression_init_r6_Reviewer_Actor_02_combined_refused
- utc: 2026-10-03T07:26:07Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s29.json --run-id static-r7-0029 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch_r6/r6_Reviewer_Actor_02_combined/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch_r6/r6_Reviewer_Actor_02_combined/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch_r6/r6_Reviewer_Actor_02_combined/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04001>`

### H30_unregistered_platform_refused
- utc: 2026-10-03T07:26:07Z · exit: 2
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s30.json --run-id static-r7-0030 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch_r6/gateb_positive/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch_r6/gateb_positive/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch_r6/gateb_positive/COMMAND_LOG.md --deployment-platform gcloud`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05928>`

### H31_no_identifier_in_states
- utc: 2026-10-03T07:26:07Z · exit: 0
- command: `bash -c echo 'positive control:'; grep -il '<ACCOUNT_EMAIL_098>' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/canary_identifier.txt; echo 'state/output files containing the identifier or synthetic password:'<CREDENTIAL_VALUE_REMOVED>'<ACCOUNT_EMAIL_098>|SYNTHETIC-NOT-A-PASSWORD' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/state_*.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s_*.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/H0[7-9]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/H[1-3]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/H0[7-9]*.err <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/H[1-3]*.err || echo NONE`
- stdout sha256 `<PRIVATE_REF_05397>` · stderr sha256 `<PRIVATE_REF_03399>`

### H32_no_credential_in_gcp_evidence
- utc: 2026-10-03T07:26:07Z · exit: 0
- command: `bash -c echo 'positive control:'; printf 'x ya29.AAAAAAAAAAAAAAAAAAAA\n' > <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/canary_token.txt; grep -lE 'ya29\.[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{35}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/canary_token.txt; echo 'GCP evidence files containing credential-shaped values:'; grep -rlE 'ya29\.[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{35}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor || echo NONE`
- stdout sha256 `<PRIVATE_REF_04296>` · stderr sha256 `<PRIVATE_REF_03399>`

### H33_fixture_dir_unchanged
- utc: 2026-10-03T07:26:07Z · exit: 0
- command: `bash -c diff <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/fixture_dir_before.txt <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/fixture_dir_after.txt && echo FIXTURE_DIR_UNCHANGED`
- stdout sha256 `<PRIVATE_REF_05713>` · stderr sha256 `<PRIVATE_REF_03399>`

### H34_preserved_manifests
- utc: 2026-10-03T07:26:07Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && for m in SHA256SUMS_ADAPTER_STAGE SHA256SUMS_ADAPTER_STAGE_R2 SHA256SUMS_ADAPTER_STAGE_R3 SHA256SUMS_ADAPTER_STAGE_R4 SHA256SUMS_ADAPTER_STAGE_R5 SHA256SUMS_ADAPTER_STAGE_R6; do grep '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK $(grep -c '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m)"; done; cd evidence/runtime_stage/executor && grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_RT_FINAL | shasum -a 256 -c --quiet && echo RUNTIME_112_VERIFY_OK; cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor && for m in SHA256SUMS_GCP_LIVE SHA256SUMS_GCP_LIVE2; do grep '^[0-9a-f]\{64\}' $m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK $(grep -c '^[0-9a-f]\{64\}' $m)"; done; shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE2 source-04822.md source-04823.md`
- stdout sha256 `<PRIVATE_REF_03772>` · stderr sha256 `<PRIVATE_REF_03399>`

### H35_restart_gate_summary
- utc: 2026-10-03T07:26:07Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c 
import json,sys,glob,os
for p in sorted(glob.glob(sys.argv[1]+'/state_gcp_*.json')):
    r=json.load(open(p)).get('restart')
    if r: print(os.path.basename(p), r['status'], r['gates'], r['reasons'][:1])
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch`
- stdout sha256 `<PRIVATE_REF_04046>` · stderr sha256 `<PRIVATE_REF_03399>`

### H36_init_inventory_summary
- utc: 2026-10-03T07:26:07Z · exit: 0
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c 
import json,sys
for p in sys.argv[1:]:
    i=json.load(open(p))['deployment_inventory']; print(p.rsplit('/',1)[1], {k:i[k] for k in ('platform','project','units','producers')})
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s_init_mixed.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r7/scratch/s_init_run.json`
- stdout sha256 `<PRIVATE_REF_05360>` · stderr sha256 `<PRIVATE_REF_03399>`


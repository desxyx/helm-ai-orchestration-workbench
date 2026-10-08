# STATIC_CHECK_LOG_R8 — MA-1 adapter R8 GCP profile rework (Executor Actor 01)
[Runner]: static_checks_r8/run_static_checks_r8.sh · Python 3.14.7 · PYTHONDONTWRITEBYTECODE=1
[Scope]: offline only; genuine GCP captures and Reviewer files read-only; DERIVED fixtures (fixtures_r8.py) and SYNTHETIC A5 states labelled; no provider call
[Helpers]: se = env MA1_UI_USER_EMAIL=<ACCOUNT_EMAIL_098> MA1_UI_USER_PASSWORD=<CREDENTIAL_VALUE_REMOVED>

### K01_script_hashes
- utc: 2026-10-03T12:32:40Z · exit: 0
- command: `shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py`
- stdout sha256 `<PRIVATE_REF_04943>` · stderr sha256 `<PRIVATE_REF_03399>`

### K02_ast_compile
- utc: 2026-10-03T12:32:40Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c import ast,sys; src=open(sys.argv[1]).read(); ast.parse(src); compile(src, sys.argv[1], 'exec'); print('AST_PARSE_OK COMPILE_OK lines', src.count(chr(10))) <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py`
- stdout sha256 `<PRIVATE_REF_04541>` · stderr sha256 `<PRIVATE_REF_03399>`

### K03_help
- utc: 2026-10-03T12:32:40Z · exit: 0
- command: `bash -c /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py --help; for s in init a5-restart a5-check report; do echo "=== $s"; /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py $s --help; done`
- stdout sha256 `<PRIVATE_REF_04925>` · stderr sha256 `<PRIVATE_REF_03399>`

### K04_offline_r8_gcp_checks
- utc: 2026-10-03T12:32:40Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/offline_checks_r8_gcp.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_k`
- stdout sha256 `<PRIVATE_REF_04071>` · stderr sha256 `<PRIVATE_REF_03399>`

### K05_offline_r6_suite_on_r8_regression
- utc: 2026-10-03T12:40:58Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/offline_checks_r6_on_r8.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_r6`
- stdout sha256 `<PRIVATE_REF_05814>` · stderr sha256 `<PRIVATE_REF_03399>`

### K06_Reviewer_Actor_02_r7_harness_on_r8
- utc: 2026-10-03T12:40:58Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/Reviewer_Actor_02_r7_harness_on_r8.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_Reviewer Actor 02`
- stdout sha256 `<PRIVATE_REF_05553>` · stderr sha256 `<PRIVATE_REF_03399>`

### K07_build_cli_fixtures
- utc: 2026-10-03T12:41:48Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/build_cli_fixtures_r8.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor`
- stdout sha256 `<PRIVATE_REF_04353>` · stderr sha256 `<PRIVATE_REF_03399>`

### K08_init_genuine_filtered_inventory_refused
- utc: 2026-10-03T12:41:52Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s08.json --run-id static-r8-0008 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE --deployment-command-log source-04822.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05225>`

### K09_init_genuine_post_teardown_unfiltered_no_serving_refused
- utc: 2026-10-03T12:41:52Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s09.json --run-id static-r8-0009 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-140_residue_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-144_residue_run_services.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-150_residue_asset_all.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE --deployment-command-log source-04822.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05759>`

### K10_init_derived_unfiltered_base_accepted
- utc: 2026-10-03T12:41:53Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s10.json --run-id static-r8-0010 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base1/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base1/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base1/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base1/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base1/LOG.md`
- stdout sha256 `<PRIVATE_REF_04335>` · stderr sha256 `<PRIVATE_REF_03399>`

### K11_init_derived_standalone_base_accepted
- utc: 2026-10-03T12:41:53Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s11.json --run-id static-r8-0011 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base2/raw/GP-160_seg2_inventory_compute.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base2/raw/GP-161_seg2_inventory_run.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base2/raw/GP-162_seg2_inventory_asset.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base2/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base2/LOG.md`
- stdout sha256 `<PRIVATE_REF_05487>` · stderr sha256 `<PRIVATE_REF_03399>`

### K12_init_derived_unmanifested_log_refused
- utc: 2026-10-03T12:41:54Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s12.json --run-id static-r8-0012 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/unmanifested_log/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/unmanifested_log/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/unmanifested_log/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/unmanifested_log/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/unmanifested_log/LOG.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04892>`

### K13_init_derived_workerpool_refused
- utc: 2026-10-03T12:41:54Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s13.json --run-id static-r8-0013 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/workerpool/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/workerpool/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/workerpool/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/workerpool/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/workerpool/LOG.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05137>`

### K14_init_wrong_project_refused
- utc: 2026-10-03T12:41:55Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s14.json --run-id static-r8-0014 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <OTHER_CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base1/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base1/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base1/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base1/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived/base1/LOG.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04486>`

### K15_restart_derived_mixed_eligible
- utc: 2026-10-03T12:41:55Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_derived_mixed.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/bundle_derived_mixed.json`
- stdout sha256 `<PRIVATE_REF_05353>` · stderr sha256 `<PRIVATE_REF_03399>`

### K16_report_derived_mixed_eligible_unchecked
- utc: 2026-10-03T12:42:02Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_derived_mixed.json`
- stdout sha256 `<PRIVATE_REF_05124>` · stderr sha256 `<PRIVATE_REF_03399>`

### K17_restart_derived_mixed_reset_eligible
- utc: 2026-10-03T12:42:02Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_derived_mixed_reset.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/bundle_derived_mixed_reset.json`
- stdout sha256 `<PRIVATE_REF_04180>` · stderr sha256 `<PRIVATE_REF_03399>`

### K18_restart_derived_standalone_run_unverified_E2
- utc: 2026-10-03T12:42:09Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_derived_standalone_run.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/bundle_derived_standalone_run.json`
- stdout sha256 `<PRIVATE_REF_04031>` · stderr sha256 `<PRIVATE_REF_03399>`

### K19_restart_genuine_mixed_no_inventory_unverified
- utc: 2026-10-03T12:42:10Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_genuine_mixed.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/bundle_genuine_mixed.json`
- stdout sha256 `<PRIVATE_REF_05944>` · stderr sha256 `<PRIVATE_REF_03399>`

### K20_restart_genuine_suspend_rejected
- utc: 2026-10-03T12:42:15Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_genuine_suspend.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/bundle_genuine_suspend.json`
- stdout sha256 `<PRIVATE_REF_04070>` · stderr sha256 `<PRIVATE_REF_03399>`

### K21_a5check_after_suspend_refused
- utc: 2026-10-03T12:42:18Z · exit: 2
- command: `se /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_genuine_suspend.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### K22_restart_genuine_noop_unverified
- utc: 2026-10-03T12:42:18Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_genuine_noop.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/bundle_genuine_noop.json`
- stdout sha256 `<PRIVATE_REF_04802>` · stderr sha256 `<PRIVATE_REF_03399>`

### K23_report_noop_a5_unverified
- utc: 2026-10-03T12:42:20Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_genuine_noop.json`
- stdout sha256 `<PRIVATE_REF_04303>` · stderr sha256 `<PRIVATE_REF_03399>`

### K24_restart_genuine_vm_only_unverified_E1
- utc: 2026-10-03T12:42:20Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_genuine_vm_only.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/bundle_genuine_vm_only.json`
- stdout sha256 `<PRIVATE_REF_05475>` · stderr sha256 `<PRIVATE_REF_03399>`

### K25_restart_derived_bucket_changed_unverified
- utc: 2026-10-03T12:42:21Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_derived_bucket_changed.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/bundle_derived_bucket_changed.json`
- stdout sha256 `<PRIVATE_REF_04947>` · stderr sha256 `<PRIVATE_REF_03399>`

### K26_restart_derived_arbitrary_probe_unverified
- utc: 2026-10-03T12:42:28Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_derived_arbitrary_probe.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/bundle_derived_arbitrary_probe.json`
- stdout sha256 `<PRIVATE_REF_05741>` · stderr sha256 `<PRIVATE_REF_03399>`

### K27_a5check_after_arbitrary_probe_refused
- utc: 2026-10-03T12:42:34Z · exit: 2
- command: `se /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_derived_arbitrary_probe.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### K28_restart_inventory_tampered_after_init_unverified
- utc: 2026-10-03T12:42:34Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_derived_tamper.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/bundle_derived_tamper.json`
- stdout sha256 `<PRIVATE_REF_05876>` · stderr sha256 `<PRIVATE_REF_03399>`

### K29_lima_regression_init_RT009_refused
- utc: 2026-10-03T12:42:42Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s29.json --run-id static-r8-0029 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw/RT-009_vm_first_start.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL --deployment-command-log source-04882.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04760>`

### K30_lima_regression_init_synthetic_dedicated_accepted
- utc: 2026-10-03T12:42:42Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s30.json --run-id static-r8-0030 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_r6/gateb_positive/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_r6/gateb_positive/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_r6/gateb_positive/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_04154>` · stderr sha256 `<PRIVATE_REF_03399>`

### K31_lima_regression_init_r6_Reviewer_Actor_02_combined_refused
- utc: 2026-10-03T12:42:42Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s31.json --run-id static-r8-0031 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_r6/r6_Reviewer_Actor_02_combined/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_r6/r6_Reviewer_Actor_02_combined/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_r6/r6_Reviewer_Actor_02_combined/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04001>`

### K32_unregistered_platform_refused
- utc: 2026-10-03T12:42:42Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s32.json --run-id static-r8-0032 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_r6/gateb_positive/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_r6/gateb_positive/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_r6/gateb_positive/COMMAND_LOG.md --deployment-platform gcloud`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05928>`

### K33_no_identifier_in_states
- utc: 2026-10-03T12:42:42Z · exit: 0
- command: `bash -c echo 'positive control:'; grep -il '<ACCOUNT_EMAIL_098>' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/canary_identifier.txt; echo 'state/output files containing the identifier or synthetic password:'<CREDENTIAL_VALUE_REMOVED>'<ACCOUNT_EMAIL_098>|SYNTHETIC-NOT-A-PASSWORD' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/state_*.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s[0-9]*.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/K0[8-9]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/K[1-3]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/K0[8-9]*.err <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/K[1-3]*.err || echo NONE`
- stdout sha256 `<PRIVATE_REF_04054>` · stderr sha256 `<PRIVATE_REF_03399>`

### K34_no_credential_in_gcp_evidence
- utc: 2026-10-03T12:42:42Z · exit: 0
- command: `bash -c echo 'positive control:'; printf 'x ya29.AAAAAAAAAAAAAAAAAAAA\n' > <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/canary_token.txt; grep -lE 'ya29\.[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{35}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/canary_token.txt; echo 'GCP executor evidence files containing credential-shaped values:'; grep -rlE 'ya29\.[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{35}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor || echo NONE`
- stdout sha256 `<PRIVATE_REF_05147>` · stderr sha256 `<PRIVATE_REF_03399>`

### K35_fixture_dir_unchanged
- utc: 2026-10-03T12:42:42Z · exit: 0
- command: `bash -c diff <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/fixture_dir_before.txt <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/fixture_dir_after.txt && echo FIXTURE_DIR_UNCHANGED`
- stdout sha256 `<PRIVATE_REF_05713>` · stderr sha256 `<PRIVATE_REF_03399>`

### K36_reviewer_files_unchanged
- utc: 2026-10-03T12:42:42Z · exit: 0
- command: `bash -c diff <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/reviewer_before.txt <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/reviewer_after.txt && echo REVIEWER_TOP_LEVEL_UNCHANGED; shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/reviewer/SHA256SUMS_REVIEW_R7 source-04836.md source-04834.md`
- stdout sha256 `<PRIVATE_REF_04750>` · stderr sha256 `<PRIVATE_REF_03399>`

### K37_preserved_manifests
- utc: 2026-10-03T12:42:42Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && for m in SHA256SUMS_ADAPTER_STAGE SHA256SUMS_ADAPTER_STAGE_R2 SHA256SUMS_ADAPTER_STAGE_R3 SHA256SUMS_ADAPTER_STAGE_R4 SHA256SUMS_ADAPTER_STAGE_R5 SHA256SUMS_ADAPTER_STAGE_R6 SHA256SUMS_ADAPTER_STAGE_R7; do grep '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK $(grep -c '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m)"; done; cd evidence/runtime_stage/executor && grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_RT_FINAL | shasum -a 256 -c --quiet && echo RUNTIME_112_VERIFY_OK; cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor && for m in SHA256SUMS_GCP_LIVE SHA256SUMS_GCP_LIVE2; do grep '^[0-9a-f]\{64\}' $m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK $(grep -c '^[0-9a-f]\{64\}' $m)"; done; grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_GCP_STAGE | shasum -a 256 -c --quiet && echo "SHA256SUMS_GCP_STAGE ./ VERIFY_OK"; shasum -a 256 SHA256SUMS_GCP_LIVE SHA256SUMS_GCP_LIVE2 SHA256SUMS_GCP_STAGE GCP_COMMAND_LOG.md GCP_COMMAND_LOG_2.md`
- stdout sha256 `<PRIVATE_REF_04394>` · stderr sha256 `<PRIVATE_REF_03399>`

### K38_restart_gate_summary
- utc: 2026-10-03T12:42:43Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c 
import json,sys,glob,os
for p in sorted(glob.glob(sys.argv[1]+'/state_*.json')):
    r=json.load(open(p)).get('restart')
    if r: print(os.path.basename(p), r['status'], r['gates'], r['reasons'][:2])
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch`
- stdout sha256 `<PRIVATE_REF_05575>` · stderr sha256 `<PRIVATE_REF_03399>`

### K39_init_inventory_summary
- utc: 2026-10-03T12:42:43Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c 
import json,sys
for p in sys.argv[1:]:
    i=json.load(open(p))['deployment_inventory']; print(p.rsplit('/',1)[1], {k:i[k] for k in ('platform','project','project_number','units','identities','asset_scope','captured_start','captured_end','producers')})
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s10.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/s11.json`
- stdout sha256 `<PRIVATE_REF_04601>` · stderr sha256 `<PRIVATE_REF_03399>`

### K40_scratch_derived_labelled
- utc: 2026-10-03T12:42:43Z · exit: 0
- command: `bash -c grep -L '^# DERIVED fixture' $(find <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_k -name LOG.md) || true; echo "derived logs: $(find <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch/derived <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r8/scratch_k -name LOG.md | wc -l)"`
- stdout sha256 `<PRIVATE_REF_04857>` · stderr sha256 `<PRIVATE_REF_03399>`


# STATIC_CHECK_LOG_R10 — MA-1 adapter R10 GCP profile rework (R9-F1..F4) (Executor Actor 01)
[Runner]: static_checks_r10/run_static_checks_r10.sh · Python 3.14.7 · PYTHONDONTWRITEBYTECODE=1
[Scope]: offline only; genuine GCP captures and Reviewer files read-only; DERIVED fixtures (fixtures_r10.py) and SYNTHETIC A5 states labelled; no provider call
[Helpers]: se = env MA1_UI_USER_EMAIL=<ACCOUNT_EMAIL_098> MA1_UI_USER_PASSWORD=<CREDENTIAL_VALUE_REMOVED>

### M01_script_hashes
- utc: 2026-10-04T01:59:07Z · exit: 0
- command: `shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py`
- stdout sha256 `<PRIVATE_REF_04016>` · stderr sha256 `<PRIVATE_REF_03399>`

### M02_ast_compile
- utc: 2026-10-04T01:59:07Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c import ast,sys; src=open(sys.argv[1]).read(); ast.parse(src); compile(src, sys.argv[1], 'exec'); print('AST_PARSE_OK COMPILE_OK lines', src.count(chr(10))) <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py`
- stdout sha256 `<PRIVATE_REF_04667>` · stderr sha256 `<PRIVATE_REF_03399>`

### M03_help
- utc: 2026-10-04T01:59:07Z · exit: 0
- command: `bash -c /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py --help; for s in init a5-restart a5-check report; do echo "=== $s"; /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py $s --help; done`
- stdout sha256 `<PRIVATE_REF_04315>` · stderr sha256 `<PRIVATE_REF_03399>`

### M04_offline_r10_gcp_checks
- utc: 2026-10-04T01:59:08Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/offline_checks_r10_gcp.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_k`
- stdout sha256 `<PRIVATE_REF_04649>` · stderr sha256 `<PRIVATE_REF_03399>`

### M05_offline_r6_suite_on_r10_regression
- utc: 2026-10-04T02:15:49Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/offline_checks_r6_on_r10.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_r6`
- stdout sha256 `<PRIVATE_REF_05814>` · stderr sha256 `<PRIVATE_REF_03399>`

### M06_Reviewer_Actor_02_r9_harness_on_r10
- utc: 2026-10-04T02:15:49Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/Reviewer_Actor_02_r9_harness_on_r10.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_Reviewer Actor 02`
- stdout sha256 `<PRIVATE_REF_05776>` · stderr sha256 `<PRIVATE_REF_03399>`

### M07_build_cli_fixtures
- utc: 2026-10-04T02:29:24Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/build_cli_fixtures_r10.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor`
- stdout sha256 `<PRIVATE_REF_05026>` · stderr sha256 `<PRIVATE_REF_03399>`

### M08_init_genuine_filtered_inventory_refused
- utc: 2026-10-04T02:33:22Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s08.json --run-id static-r10-0008 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE --deployment-command-log source-04822.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05225>`

### M09_init_genuine_post_teardown_unfiltered_no_serving_refused
- utc: 2026-10-04T02:33:22Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s09.json --run-id static-r10-0009 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-140_residue_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-144_residue_run_services.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-150_residue_asset_all.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE --deployment-command-log source-04822.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05759>`

### M10_init_derived_unfiltered_base_accepted
- utc: 2026-10-04T02:33:23Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s10.json --run-id static-r10-0010 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base1/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base1/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base1/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base1/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base1/LOG.md`
- stdout sha256 `<PRIVATE_REF_04643>` · stderr sha256 `<PRIVATE_REF_03399>`

### M11_init_derived_standalone_base_accepted
- utc: 2026-10-04T02:33:24Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s11.json --run-id static-r10-0011 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base2/raw/GP-160_seg2_inventory_compute.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base2/raw/GP-161_seg2_inventory_run.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base2/raw/GP-162_seg2_inventory_asset.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base2/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base2/LOG.md`
- stdout sha256 `<PRIVATE_REF_04209>` · stderr sha256 `<PRIVATE_REF_03399>`

### M12_init_derived_unmanifested_log_refused
- utc: 2026-10-04T02:33:24Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s12.json --run-id static-r10-0012 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/unmanifested_log/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/unmanifested_log/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/unmanifested_log/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/unmanifested_log/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/unmanifested_log/LOG.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04892>`

### M13_init_derived_workerpool_refused
- utc: 2026-10-04T02:33:24Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s13.json --run-id static-r10-0013 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/workerpool/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/workerpool/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/workerpool/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/workerpool/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/workerpool/LOG.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05137>`

### M14_init_wrong_project_refused
- utc: 2026-10-04T02:33:25Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s14.json --run-id static-r10-0014 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <OTHER_CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base1/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base1/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base1/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base1/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/base1/LOG.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04486>`

### M15_restart_derived_mixed_e3_only_unverified
- utc: 2026-10-04T02:33:25Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_mixed.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_mixed.json`
- stdout sha256 `<PRIVATE_REF_04200>` · stderr sha256 `<PRIVATE_REF_03399>`

### M16_report_derived_mixed_a5_unverified
- utc: 2026-10-04T02:33:33Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_mixed.json`
- stdout sha256 `<PRIVATE_REF_05675>` · stderr sha256 `<PRIVATE_REF_03399>`

### M17_restart_derived_mixed_reset_e3_only_unverified
- utc: 2026-10-04T02:33:33Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_mixed_reset.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_mixed_reset.json`
- stdout sha256 `<PRIVATE_REF_04638>` · stderr sha256 `<PRIVATE_REF_03399>`

### M18_restart_derived_standalone_run_unverified_E2
- utc: 2026-10-04T02:33:41Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_standalone_run.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_standalone_run.json`
- stdout sha256 `<PRIVATE_REF_05494>` · stderr sha256 `<PRIVATE_REF_03399>`

### M19_restart_genuine_mixed_no_inventory_unverified
- utc: 2026-10-04T02:33:41Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_genuine_mixed.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_genuine_mixed.json`
- stdout sha256 `<PRIVATE_REF_04260>` · stderr sha256 `<PRIVATE_REF_03399>`

### M20_restart_genuine_suspend_rejected
- utc: 2026-10-04T02:33:46Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_genuine_suspend.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_genuine_suspend.json`
- stdout sha256 `<PRIVATE_REF_05670>` · stderr sha256 `<PRIVATE_REF_03399>`

### M21_a5check_after_suspend_refused
- utc: 2026-10-04T02:33:49Z · exit: 2
- command: `se /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_genuine_suspend.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### M22_restart_genuine_noop_unverified
- utc: 2026-10-04T02:33:49Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_genuine_noop.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_genuine_noop.json`
- stdout sha256 `<PRIVATE_REF_04653>` · stderr sha256 `<PRIVATE_REF_03399>`

### M23_report_noop_a5_unverified
- utc: 2026-10-04T02:33:51Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_genuine_noop.json`
- stdout sha256 `<PRIVATE_REF_04091>` · stderr sha256 `<PRIVATE_REF_03399>`

### M24_restart_genuine_vm_only_unverified_E1
- utc: 2026-10-04T02:33:51Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_genuine_vm_only.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_genuine_vm_only.json`
- stdout sha256 `<PRIVATE_REF_04218>` · stderr sha256 `<PRIVATE_REF_03399>`

### M25_restart_derived_bucket_changed_unverified
- utc: 2026-10-04T02:33:53Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_bucket_changed.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_bucket_changed.json`
- stdout sha256 `<PRIVATE_REF_05396>` · stderr sha256 `<PRIVATE_REF_03399>`

### M26_restart_derived_arbitrary_probe_unverified
- utc: 2026-10-04T02:34:00Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_arbitrary_probe.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_arbitrary_probe.json`
- stdout sha256 `<PRIVATE_REF_05906>` · stderr sha256 `<PRIVATE_REF_03399>`

### M27_a5check_after_arbitrary_probe_refused
- utc: 2026-10-04T02:34:07Z · exit: 2
- command: `se /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_arbitrary_probe.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### M28_restart_inventory_tampered_after_init_unverified
- utc: 2026-10-04T02:34:07Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_tamper.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_tamper.json`
- stdout sha256 `<PRIVATE_REF_04911>` · stderr sha256 `<PRIVATE_REF_03399>`

### M29_lima_regression_init_RT009_refused
- utc: 2026-10-04T02:34:15Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s29.json --run-id static-r10-0029 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw/RT-009_vm_first_start.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL --deployment-command-log source-04882.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04760>`

### M30_lima_regression_init_synthetic_dedicated_accepted
- utc: 2026-10-04T02:34:15Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s30.json --run-id static-r10-0030 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_r6/gateb_positive/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_r6/gateb_positive/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_r6/gateb_positive/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_05681>` · stderr sha256 `<PRIVATE_REF_03399>`

### M31_lima_regression_init_r6_Reviewer_Actor_02_combined_refused
- utc: 2026-10-04T02:34:15Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s31.json --run-id static-r10-0031 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_r6/r6_Reviewer_Actor_02_combined/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_r6/r6_Reviewer_Actor_02_combined/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_r6/r6_Reviewer_Actor_02_combined/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04001>`

### M32_unregistered_platform_refused
- utc: 2026-10-04T02:34:15Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s32.json --run-id static-r10-0032 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_r6/gateb_positive/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_r6/gateb_positive/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_r6/gateb_positive/COMMAND_LOG.md --deployment-platform gcloud`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05928>`

### M33_no_identifier_in_states
- utc: 2026-10-04T02:34:15Z · exit: 0
- command: `bash -c echo 'positive control:'; grep -il '<ACCOUNT_EMAIL_098>' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/canary_identifier.txt; echo 'state/output files containing the identifier or synthetic password:'<CREDENTIAL_VALUE_REMOVED>'<ACCOUNT_EMAIL_098>|SYNTHETIC-NOT-A-PASSWORD' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_*.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s[0-9]*.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/M0[8-9]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/M[1-3]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/M0[8-9]*.err <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/M[1-3]*.err || echo NONE`
- stdout sha256 `<PRIVATE_REF_05340>` · stderr sha256 `<PRIVATE_REF_03399>`

### M34_no_credential_in_gcp_evidence
- utc: 2026-10-04T02:34:15Z · exit: 0
- command: `bash -c echo 'positive control:'; printf 'x ya29.AAAAAAAAAAAAAAAAAAAA\n' > <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/canary_token.txt; grep -lE 'ya29\.[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{35}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/canary_token.txt; echo 'GCP executor evidence files containing credential-shaped values:'; grep -rlE 'ya29\.[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{35}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor || echo NONE`
- stdout sha256 `<PRIVATE_REF_05881>` · stderr sha256 `<PRIVATE_REF_03399>`

### M35_fixture_dir_unchanged
- utc: 2026-10-04T02:34:15Z · exit: 0
- command: `bash -c diff <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/fixture_dir_before.txt <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/fixture_dir_after.txt && echo FIXTURE_DIR_UNCHANGED`
- stdout sha256 `<PRIVATE_REF_05713>` · stderr sha256 `<PRIVATE_REF_03399>`

### M36_reviewer_files_unchanged
- utc: 2026-10-04T02:34:26Z · exit: 0
- command: `bash -c diff <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/reviewer_before.txt <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/reviewer_after.txt && echo REVIEWER_TREE_UNCHANGED    93156 files; shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/reviewer/SHA256SUMS_REVIEW_R7 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/reviewer/r8/SHA256SUMS_REVIEW_R8 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/reviewer/r9/SHA256SUMS_REVIEW_R9_r1 source-04850.md source-04846.md`
- stdout sha256 `<PRIVATE_REF_04795>` · stderr sha256 `<PRIVATE_REF_03399>`

### M37_preserved_manifests
- utc: 2026-10-04T02:34:26Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && for m in SHA256SUMS_ADAPTER_STAGE SHA256SUMS_ADAPTER_STAGE_R2 SHA256SUMS_ADAPTER_STAGE_R3 SHA256SUMS_ADAPTER_STAGE_R4 SHA256SUMS_ADAPTER_STAGE_R5 SHA256SUMS_ADAPTER_STAGE_R6 SHA256SUMS_ADAPTER_STAGE_R7 SHA256SUMS_ADAPTER_STAGE_R8 SHA256SUMS_ADAPTER_STAGE_R9; do grep '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK $(grep -c '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m)"; done; cd evidence/runtime_stage/executor && grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_RT_FINAL | shasum -a 256 -c --quiet && echo RUNTIME_112_VERIFY_OK; cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor && for m in SHA256SUMS_GCP_LIVE SHA256SUMS_GCP_LIVE2; do grep '^[0-9a-f]\{64\}' $m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK $(grep -c '^[0-9a-f]\{64\}' $m)"; done; grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_GCP_STAGE | shasum -a 256 -c --quiet && echo "SHA256SUMS_GCP_STAGE ./ VERIFY_OK"; shasum -a 256 SHA256SUMS_GCP_LIVE SHA256SUMS_GCP_LIVE2 SHA256SUMS_GCP_STAGE GCP_COMMAND_LOG.md GCP_COMMAND_LOG_2.md`
- stdout sha256 `<PRIVATE_REF_05061>` · stderr sha256 `<PRIVATE_REF_03399>`

### M38_restart_gate_summary
- utc: 2026-10-04T02:34:35Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c 
import json,sys,glob,os
for p in sorted(glob.glob(sys.argv[1]+'/state_*.json')):
    r=json.load(open(p)).get('restart')
    if r: print(os.path.basename(p), r['status'], r['gates'], r['reasons'][:2])
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch`
- stdout sha256 `<PRIVATE_REF_04484>` · stderr sha256 `<PRIVATE_REF_03399>`

### M39_init_inventory_summary
- utc: 2026-10-04T02:34:35Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c 
import json,sys
for p in sys.argv[1:]:
    i=json.load(open(p))['deployment_inventory']; print(p.rsplit('/',1)[1], {k:i[k] for k in ('platform','project','project_number','units','identities','asset_scope','captured_start','captured_end','producers')})
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s10.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s11.json`
- stdout sha256 `<PRIVATE_REF_04601>` · stderr sha256 `<PRIVATE_REF_03399>`

### M40_scratch_derived_labelled
- utc: 2026-10-04T02:34:35Z · exit: 0
- command: `bash -c grep -L '^# DERIVED fixture' $(find <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_k -name LOG.md) || true; echo "derived logs: $(find <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch_k -name LOG.md | wc -l)"`
- stdout sha256 `<PRIVATE_REF_04431>` · stderr sha256 `<PRIVATE_REF_03399>`

### M41_restart_derived_vm_health_foreign_instance_unverified
- utc: 2026-10-04T02:34:35Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_vm_health_foreign_instance.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_vm_health_foreign_instance.json`
- stdout sha256 `<PRIVATE_REF_04207>` · stderr sha256 `<PRIVATE_REF_03399>`

### M42_restart_derived_new_revision_stale_unverified
- utc: 2026-10-04T02:34:43Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_new_revision_stale.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_new_revision_stale.json`
- stdout sha256 `<PRIVATE_REF_05583>` · stderr sha256 `<PRIVATE_REF_03399>`

### M43_restart_derived_old_request_inflight_unverified
- utc: 2026-10-04T02:34:51Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_old_request_inflight.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_old_request_inflight.json`
- stdout sha256 `<PRIVATE_REF_05931>` · stderr sha256 `<PRIVATE_REF_03399>`

### M44_restart_derived_data_tmpfs_unverified
- utc: 2026-10-04T02:34:59Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_data_tmpfs.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_data_tmpfs.json`
- stdout sha256 `<PRIVATE_REF_04982>` · stderr sha256 `<PRIVATE_REF_03399>`

### M45_init_derived_malformed_inventory_refused_no_traceback
- utc: 2026-10-04T02:35:06Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s45.json --run-id static-r10-0045 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/inventory_malformed/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/inventory_malformed/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/inventory_malformed/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/inventory_malformed/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/derived/inventory_malformed/LOG.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_03798>`

### M46_no_traceback_no_state_on_refusal
- utc: 2026-10-04T02:35:07Z · exit: 0
- command: `bash -c grep -l Traceback <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/M*.err || echo NO_TRACEBACK; ls <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/s45.json 2>/dev/null || echo NO_STATE_CREATED_ON_REFUSAL`
- stdout sha256 `<PRIVATE_REF_03779>` · stderr sha256 `<PRIVATE_REF_03399>`

### M47_derived_full_path_only_E3_no_completion_recorded
- utc: 2026-10-04T02:35:07Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c 
import json,sys
for p in sys.argv[1:]:
    r=json.load(open(p))['restart']; raw=[x for x in r['reasons'] if x.startswith('[raw]')]
    ok=r['status']=='UNVERIFIED' and r['gates']['inventory'] and len(raw)==1 and 'E3: no registered authoritative quiescence' in raw[0] and r['completed_utc'] is None
    print(p.rsplit('/',1)[1], r['status'], r['gates'], 'E3_ONLY' if ok else 'NOT_E3_ONLY', r['completed_utc'])
    if not ok: sys.exit(1)
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_mixed.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_mixed_reset.json`
- stdout sha256 `<PRIVATE_REF_05379>` · stderr sha256 `<PRIVATE_REF_03399>`

### M48_pycache_absent
- utc: 2026-10-04T02:35:07Z · exit: 0
- command: `bash -c find <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage -name __pycache__ | wc -l`
- stdout sha256 `<PRIVATE_REF_04538>` · stderr sha256 `<PRIVATE_REF_03399>`

### M49_restart_derived_origin_wrong_port_unverified
- utc: 2026-10-04T02:35:08Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_origin_wrong_port.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_origin_wrong_port.json`
- stdout sha256 `<PRIVATE_REF_05483>` · stderr sha256 `<PRIVATE_REF_03399>`

### M50_restart_derived_old_digest_changed_unverified
- utc: 2026-10-04T02:35:15Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_old_digest_changed.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_old_digest_changed.json`
- stdout sha256 `<PRIVATE_REF_04767>` · stderr sha256 `<PRIVATE_REF_03399>`

### M51_restart_derived_latency_overflow_unverified_no_traceback
- utc: 2026-10-04T02:35:23Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/state_derived_latency_overflow.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch/bundle_derived_latency_overflow.json`
- stdout sha256 `<PRIVATE_REF_04507>` · stderr sha256 `<PRIVATE_REF_03399>`

### M52_targeted_reasons_and_no_traceback
- utc: 2026-10-04T02:35:31Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c 
import json,sys
want={'state_derived_origin_wrong_port.json':'probe_after is not a 200 status=ok','state_derived_old_digest_changed.json':'contradicts its pre-action record',
      'state_derived_latency_overflow.json':'without a finite, bounded latency','state_derived_old_request_inflight.json':'completed after the recovery probe'}
bad=0
for f,w in want.items():
    r=json.load(open(sys.argv[1]+'/'+f))['restart']; hit=any(w in x for x in r['reasons']); bad+=not hit
    print(f, r['status'], 'TARGETED_REASON_FOUND' if hit else 'MISSING:'+w)
tb=[l for l in open(sys.argv[2]).read().splitlines() if 'Traceback' in l]; print('traceback lines in M51 stderr:', len(tb)); sys.exit(1 if bad or tb else 0)
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/scratch <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r10/M51_restart_derived_latency_overflow_unverified_no_traceback.err`
- stdout sha256 `<PRIVATE_REF_05211>` · stderr sha256 `<PRIVATE_REF_03399>`


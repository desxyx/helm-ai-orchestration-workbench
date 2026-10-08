# STATIC_CHECK_LOG_R9 — MA-1 adapter R9 GCP profile rework (R8-T1..T5) (Executor Actor 01)
[Runner]: static_checks_r9/run_static_checks_r9.sh · Python 3.14.7 · PYTHONDONTWRITEBYTECODE=1
[Scope]: offline only; genuine GCP captures and Reviewer files read-only; DERIVED fixtures (fixtures_r9.py) and SYNTHETIC A5 states labelled; no provider call
[Helpers]: se = env MA1_UI_USER_EMAIL=<ACCOUNT_EMAIL_098> MA1_UI_USER_PASSWORD=<CREDENTIAL_VALUE_REMOVED>

### L01_script_hashes
- utc: 2026-10-03T13:45:45Z · exit: 0
- command: `shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r8.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r7.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r6.py`
- stdout sha256 `<PRIVATE_REF_05975>` · stderr sha256 `<PRIVATE_REF_03399>`

### L02_ast_compile
- utc: 2026-10-03T13:45:45Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c import ast,sys; src=open(sys.argv[1]).read(); ast.parse(src); compile(src, sys.argv[1], 'exec'); print('AST_PARSE_OK COMPILE_OK lines', src.count(chr(10))) <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py`
- stdout sha256 `<PRIVATE_REF_05470>` · stderr sha256 `<PRIVATE_REF_03399>`

### L03_help
- utc: 2026-10-03T13:45:45Z · exit: 0
- command: `bash -c /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py --help; for s in init a5-restart a5-check report; do echo "=== $s"; /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py $s --help; done`
- stdout sha256 `<PRIVATE_REF_05063>` · stderr sha256 `<PRIVATE_REF_03399>`

### L04_offline_r9_gcp_checks
- utc: 2026-10-03T13:45:45Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/offline_checks_r9_gcp.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_k`
- stdout sha256 `<PRIVATE_REF_04658>` · stderr sha256 `<PRIVATE_REF_03399>`

### L05_offline_r6_suite_on_r9_regression
- utc: 2026-10-03T13:59:10Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/offline_checks_r6_on_r9.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_r6`
- stdout sha256 `<PRIVATE_REF_05814>` · stderr sha256 `<PRIVATE_REF_03399>`

### L06_Reviewer_Actor_02_r8_harness_on_r9
- utc: 2026-10-03T13:59:10Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/Reviewer_Actor_02_r8_harness_on_r9.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_Reviewer Actor 02`
- stdout sha256 `<PRIVATE_REF_05132>` · stderr sha256 `<PRIVATE_REF_03399>`

### L07_build_cli_fixtures
- utc: 2026-10-03T14:02:27Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/build_cli_fixtures_r9.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor`
- stdout sha256 `<PRIVATE_REF_05024>` · stderr sha256 `<PRIVATE_REF_03399>`

### L08_init_genuine_filtered_inventory_refused
- utc: 2026-10-03T14:02:35Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s08.json --run-id static-r9-0008 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE --deployment-command-log source-04822.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05225>`

### L09_init_genuine_post_teardown_unfiltered_no_serving_refused
- utc: 2026-10-03T14:02:35Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s09.json --run-id static-r9-0009 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-140_residue_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-144_residue_run_services.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/raw/GP-150_residue_asset_all.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/SHA256SUMS_GCP_LIVE --deployment-command-log source-04822.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05759>`

### L10_init_derived_unfiltered_base_accepted
- utc: 2026-10-03T14:02:36Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s10.json --run-id static-r9-0010 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base1/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base1/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base1/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base1/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base1/LOG.md`
- stdout sha256 `<PRIVATE_REF_05602>` · stderr sha256 `<PRIVATE_REF_03399>`

### L11_init_derived_standalone_base_accepted
- utc: 2026-10-03T14:02:37Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s11.json --run-id static-r9-0011 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base2/raw/GP-160_seg2_inventory_compute.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base2/raw/GP-161_seg2_inventory_run.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base2/raw/GP-162_seg2_inventory_asset.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base2/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base2/LOG.md`
- stdout sha256 `<PRIVATE_REF_05152>` · stderr sha256 `<PRIVATE_REF_03399>`

### L12_init_derived_unmanifested_log_refused
- utc: 2026-10-03T14:02:37Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s12.json --run-id static-r9-0012 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/unmanifested_log/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/unmanifested_log/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/unmanifested_log/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/unmanifested_log/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/unmanifested_log/LOG.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04892>`

### L13_init_derived_workerpool_refused
- utc: 2026-10-03T14:02:37Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s13.json --run-id static-r9-0013 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/workerpool/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/workerpool/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/workerpool/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/workerpool/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/workerpool/LOG.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05137>`

### L14_init_wrong_project_refused
- utc: 2026-10-03T14:02:38Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s14.json --run-id static-r9-0014 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <OTHER_CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base1/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base1/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base1/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base1/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/base1/LOG.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04486>`

### L15_restart_derived_mixed_eligible
- utc: 2026-10-03T14:02:38Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_mixed.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_derived_mixed.json`
- stdout sha256 `<PRIVATE_REF_05201>` · stderr sha256 `<PRIVATE_REF_03399>`

### L16_report_derived_mixed_eligible_unchecked
- utc: 2026-10-03T14:02:45Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_mixed.json`
- stdout sha256 `<PRIVATE_REF_04935>` · stderr sha256 `<PRIVATE_REF_03399>`

### L17_restart_derived_mixed_reset_eligible
- utc: 2026-10-03T14:02:45Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_mixed_reset.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_derived_mixed_reset.json`
- stdout sha256 `<PRIVATE_REF_04833>` · stderr sha256 `<PRIVATE_REF_03399>`

### L18_restart_derived_standalone_run_unverified_E2
- utc: 2026-10-03T14:02:52Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_standalone_run.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_derived_standalone_run.json`
- stdout sha256 `<PRIVATE_REF_05920>` · stderr sha256 `<PRIVATE_REF_03399>`

### L19_restart_genuine_mixed_no_inventory_unverified
- utc: 2026-10-03T14:02:53Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_genuine_mixed.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_genuine_mixed.json`
- stdout sha256 `<PRIVATE_REF_04751>` · stderr sha256 `<PRIVATE_REF_03399>`

### L20_restart_genuine_suspend_rejected
- utc: 2026-10-03T14:02:57Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_genuine_suspend.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_genuine_suspend.json`
- stdout sha256 `<PRIVATE_REF_04049>` · stderr sha256 `<PRIVATE_REF_03399>`

### L21_a5check_after_suspend_refused
- utc: 2026-10-03T14:03:00Z · exit: 2
- command: `se /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_genuine_suspend.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### L22_restart_genuine_noop_unverified
- utc: 2026-10-03T14:03:00Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_genuine_noop.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_genuine_noop.json`
- stdout sha256 `<PRIVATE_REF_04506>` · stderr sha256 `<PRIVATE_REF_03399>`

### L23_report_noop_a5_unverified
- utc: 2026-10-03T14:03:02Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py report --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_genuine_noop.json`
- stdout sha256 `<PRIVATE_REF_04738>` · stderr sha256 `<PRIVATE_REF_03399>`

### L24_restart_genuine_vm_only_unverified_E1
- utc: 2026-10-03T14:03:02Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_genuine_vm_only.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_genuine_vm_only.json`
- stdout sha256 `<PRIVATE_REF_04476>` · stderr sha256 `<PRIVATE_REF_03399>`

### L25_restart_derived_bucket_changed_unverified
- utc: 2026-10-03T14:03:04Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_bucket_changed.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_derived_bucket_changed.json`
- stdout sha256 `<PRIVATE_REF_05497>` · stderr sha256 `<PRIVATE_REF_03399>`

### L26_restart_derived_arbitrary_probe_unverified
- utc: 2026-10-03T14:03:11Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_arbitrary_probe.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_derived_arbitrary_probe.json`
- stdout sha256 `<PRIVATE_REF_05698>` · stderr sha256 `<PRIVATE_REF_03399>`

### L27_a5check_after_arbitrary_probe_refused
- utc: 2026-10-03T14:03:17Z · exit: 2
- command: `se /opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-check --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_arbitrary_probe.json --custody-file <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/custody_synthetic.json`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05853>`

### L28_restart_inventory_tampered_after_init_unverified
- utc: 2026-10-03T14:03:17Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_tamper.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_derived_tamper.json`
- stdout sha256 `<PRIVATE_REF_04178>` · stderr sha256 `<PRIVATE_REF_03399>`

### L29_lima_regression_init_RT009_refused
- utc: 2026-10-03T14:03:24Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s29.json --run-id static-r9-0029 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw/RT-009_vm_first_start.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL --deployment-command-log source-04882.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04760>`

### L30_lima_regression_init_synthetic_dedicated_accepted
- utc: 2026-10-03T14:03:25Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s30.json --run-id static-r9-0030 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_r6/gateb_positive/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_r6/gateb_positive/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_r6/gateb_positive/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_04851>` · stderr sha256 `<PRIVATE_REF_03399>`

### L31_lima_regression_init_r6_Reviewer_Actor_02_combined_refused
- utc: 2026-10-03T14:03:25Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s31.json --run-id static-r9-0031 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_r6/r6_Reviewer_Actor_02_combined/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_r6/r6_Reviewer_Actor_02_combined/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_r6/r6_Reviewer_Actor_02_combined/COMMAND_LOG.md --deployment-platform lima`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_04001>`

### L32_unregistered_platform_refused
- utc: 2026-10-03T14:03:25Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s32.json --run-id static-r9-0032 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_r6/gateb_positive/raw/listing.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_r6/gateb_positive/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_r6/gateb_positive/COMMAND_LOG.md --deployment-platform gcloud`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_05928>`

### L33_no_identifier_in_states
- utc: 2026-10-03T14:03:25Z · exit: 0
- command: `bash -c echo 'positive control:'; grep -il '<ACCOUNT_EMAIL_098>' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/canary_identifier.txt; echo 'state/output files containing the identifier or synthetic password:'<CREDENTIAL_VALUE_REMOVED>'<ACCOUNT_EMAIL_098>|SYNTHETIC-NOT-A-PASSWORD' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_*.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s[0-9]*.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/L0[8-9]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/L[1-3]*.out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/L0[8-9]*.err <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/L[1-3]*.err || echo NONE`
- stdout sha256 `<PRIVATE_REF_05408>` · stderr sha256 `<PRIVATE_REF_03399>`

### L34_no_credential_in_gcp_evidence
- utc: 2026-10-03T14:03:25Z · exit: 0
- command: `bash -c echo 'positive control:'; printf 'x ya29.AAAAAAAAAAAAAAAAAAAA\n' > <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/canary_token.txt; grep -lE 'ya29\.[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{35}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/canary_token.txt; echo 'GCP executor evidence files containing credential-shaped values:'; grep -rlE 'ya29\.[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{35}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor || echo NONE`
- stdout sha256 `<PRIVATE_REF_05903>` · stderr sha256 `<PRIVATE_REF_03399>`

### L35_fixture_dir_unchanged
- utc: 2026-10-03T14:03:25Z · exit: 0
- command: `bash -c diff <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/fixture_dir_before.txt <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/fixture_dir_after.txt && echo FIXTURE_DIR_UNCHANGED`
- stdout sha256 `<PRIVATE_REF_05713>` · stderr sha256 `<PRIVATE_REF_03399>`

### L36_reviewer_files_unchanged
- utc: 2026-10-03T14:03:30Z · exit: 0
- command: `bash -c diff <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/reviewer_before.txt <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/reviewer_after.txt && echo REVIEWER_TREE_UNCHANGED    42463 files; shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/reviewer/SHA256SUMS_REVIEW_R7 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/reviewer/r8/SHA256SUMS_REVIEW_R8 source-04842.md source-04840.md`
- stdout sha256 `<PRIVATE_REF_04380>` · stderr sha256 `<PRIVATE_REF_03399>`

### L37_preserved_manifests
- utc: 2026-10-03T14:03:30Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && for m in SHA256SUMS_ADAPTER_STAGE SHA256SUMS_ADAPTER_STAGE_R2 SHA256SUMS_ADAPTER_STAGE_R3 SHA256SUMS_ADAPTER_STAGE_R4 SHA256SUMS_ADAPTER_STAGE_R5 SHA256SUMS_ADAPTER_STAGE_R6 SHA256SUMS_ADAPTER_STAGE_R7 SHA256SUMS_ADAPTER_STAGE_R8; do grep '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK $(grep -c '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m)"; done; cd evidence/runtime_stage/executor && grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_RT_FINAL | shasum -a 256 -c --quiet && echo RUNTIME_112_VERIFY_OK; cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor && for m in SHA256SUMS_GCP_LIVE SHA256SUMS_GCP_LIVE2; do grep '^[0-9a-f]\{64\}' $m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK $(grep -c '^[0-9a-f]\{64\}' $m)"; done; grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_GCP_STAGE | shasum -a 256 -c --quiet && echo "SHA256SUMS_GCP_STAGE ./ VERIFY_OK"; shasum -a 256 SHA256SUMS_GCP_LIVE SHA256SUMS_GCP_LIVE2 SHA256SUMS_GCP_STAGE GCP_COMMAND_LOG.md GCP_COMMAND_LOG_2.md`
- stdout sha256 `<PRIVATE_REF_04917>` · stderr sha256 `<PRIVATE_REF_03399>`

### L38_restart_gate_summary
- utc: 2026-10-03T14:03:33Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c 
import json,sys,glob,os
for p in sorted(glob.glob(sys.argv[1]+'/state_*.json')):
    r=json.load(open(p)).get('restart')
    if r: print(os.path.basename(p), r['status'], r['gates'], r['reasons'][:2])
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch`
- stdout sha256 `<PRIVATE_REF_04126>` · stderr sha256 `<PRIVATE_REF_03399>`

### L39_init_inventory_summary
- utc: 2026-10-03T14:03:33Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c 
import json,sys
for p in sys.argv[1:]:
    i=json.load(open(p))['deployment_inventory']; print(p.rsplit('/',1)[1], {k:i[k] for k in ('platform','project','project_number','units','identities','asset_scope','captured_start','captured_end','producers')})
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s10.json <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s11.json`
- stdout sha256 `<PRIVATE_REF_04601>` · stderr sha256 `<PRIVATE_REF_03399>`

### L40_scratch_derived_labelled
- utc: 2026-10-03T14:03:33Z · exit: 0
- command: `bash -c grep -L '^# DERIVED fixture' $(find <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_k -name LOG.md) || true; echo "derived logs: $(find <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch_k -name LOG.md | wc -l)"`
- stdout sha256 `<PRIVATE_REF_05371>` · stderr sha256 `<PRIVATE_REF_03399>`

### L41_restart_derived_vm_health_foreign_instance_unverified
- utc: 2026-10-03T14:03:34Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_vm_health_foreign_instance.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_derived_vm_health_foreign_instance.json`
- stdout sha256 `<PRIVATE_REF_05049>` · stderr sha256 `<PRIVATE_REF_03399>`

### L42_restart_derived_new_revision_stale_unverified
- utc: 2026-10-03T14:03:41Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_new_revision_stale.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_derived_new_revision_stale.json`
- stdout sha256 `<PRIVATE_REF_05464>` · stderr sha256 `<PRIVATE_REF_03399>`

### L43_restart_derived_old_request_inflight_unverified
- utc: 2026-10-03T14:03:49Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_old_request_inflight.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_derived_old_request_inflight.json`
- stdout sha256 `<PRIVATE_REF_04535>` · stderr sha256 `<PRIVATE_REF_03399>`

### L44_restart_derived_data_tmpfs_unverified
- utc: 2026-10-03T14:03:56Z · exit: 1
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py a5-restart --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_data_tmpfs.json --bundle <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/bundle_derived_data_tmpfs.json`
- stdout sha256 `<PRIVATE_REF_04139>` · stderr sha256 `<PRIVATE_REF_03399>`

### L45_init_derived_malformed_inventory_refused_no_traceback
- utc: 2026-10-03T14:04:04Z · exit: 2
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r9.py init --state <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s45.json --run-id static-r9-0045 --ui-url http://198.51.100.10 --api-url http://198.51.100.10/api --out <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/out --fixtures <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build --deployment-platform gcp --gcp-project <CLOUD_PROJECT> --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/inventory_malformed/raw/GP-075_inventory_compute_instances.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/inventory_malformed/raw/GP-079_inventory_run_services_retry.out --deployment-record <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/inventory_malformed/raw/GP-078_inventory_asset_compute.out --deployment-manifest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/inventory_malformed/MANIFEST --deployment-command-log <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/derived/inventory_malformed/LOG.md`
- stdout sha256 `<PRIVATE_REF_03399>` · stderr sha256 `<PRIVATE_REF_03798>`

### L46_no_traceback_no_state_on_refusal
- utc: 2026-10-03T14:04:04Z · exit: 0
- command: `bash -c grep -l Traceback <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/L*.err || echo NO_TRACEBACK; ls <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/s45.json 2>/dev/null || echo NO_STATE_CREATED_ON_REFUSAL`
- stdout sha256 `<PRIVATE_REF_03779>` · stderr sha256 `<PRIVATE_REF_03399>`

### L47_completed_utc_is_causal_completion
- utc: 2026-10-03T14:04:04Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c 
import json,sys; r=json.load(open(sys.argv[1]))['restart']; print(r['status'], r['completed_utc']); sys.exit(0 if r['completed_utc']=='2026-10-03T06:59:20Z' else 1)
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r9/scratch/state_derived_mixed.json`
- stdout sha256 `<PRIVATE_REF_05940>` · stderr sha256 `<PRIVATE_REF_03399>`

### L48_pycache_absent
- utc: 2026-10-03T14:04:04Z · exit: 0
- command: `bash -c find <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage -name __pycache__ | wc -l`
- stdout sha256 `<PRIVATE_REF_04538>` · stderr sha256 `<PRIVATE_REF_03399>`


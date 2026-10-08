# STATIC_CHECK_LOG_R11 — MA-1 adapter R11 on the genuine supplemental capture (Executor Actor 01)
[Runner]: static_checks_r11/run_static_checks_r11.sh · Python 3.14.7 · PYTHONDONTWRITEBYTECODE=1
[Scope]: offline; genuine SUPP captures read-only; DERIVED fixtures labelled (fixtures_r11.py); no provider call

### N01_script_hashes
- utc: 2026-10-04T04:33:59Z · exit: 0
- command: `shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r11.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r10.py`
- stdout sha256 `<PRIVATE_REF_04887>` · stderr sha256 `<PRIVATE_REF_03399>`

### N02_ast_compile
- utc: 2026-10-04T04:33:59Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c import ast,sys; src=open(sys.argv[1]).read(); ast.parse(src); compile(src, sys.argv[1], 'exec'); print('AST_PARSE_OK COMPILE_OK lines', src.count(chr(10))) <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r11.py`
- stdout sha256 `<PRIVATE_REF_05892>` · stderr sha256 `<PRIVATE_REF_03399>`

### N03_supp_live_manifest_verify
- utc: 2026-10-04T04:33:59Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04 && grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_SUPP_LIVE | shasum -a 256 -c --quiet && echo SUPP_LIVE_OK $(grep -c '^[0-9a-f]\{64\}' SHA256SUMS_SUPP_LIVE); cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && grep '^[0-9a-f]\{64\}  executor/' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/SHA256SUMS_SUPP_LIVE | shasum -a 256 -c --quiet && echo WORKLOAD_OK`
- stdout sha256 `<PRIVATE_REF_05064>` · stderr sha256 `<PRIVATE_REF_03399>`

### N04_offline_r11_supp_checks
- utc: 2026-10-04T04:33:59Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r11/offline_checks_r11_supp.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r11/scratch`
- stdout sha256 `<PRIVATE_REF_04174>` · stderr sha256 `<PRIVATE_REF_03399>`

### N05_offline_r6_suite_on_r11_regression
- utc: 2026-10-04T04:36:00Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r11/offline_checks_r6_on_r11.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r11/scratch_r6`
- stdout sha256 `<PRIVATE_REF_05814>` · stderr sha256 `<PRIVATE_REF_03399>`

### N06_preserved_manifests
- utc: 2026-10-04T04:36:00Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && for m in SHA256SUMS_ADAPTER_STAGE SHA256SUMS_ADAPTER_STAGE_R2 SHA256SUMS_ADAPTER_STAGE_R3 SHA256SUMS_ADAPTER_STAGE_R4 SHA256SUMS_ADAPTER_STAGE_R5 SHA256SUMS_ADAPTER_STAGE_R6 SHA256SUMS_ADAPTER_STAGE_R7; do grep '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/$m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK"; done; shasum -a 256 executor/adapter_record_stage/ma1_verify_r8.py executor/adapter_record_stage/ma1_verify_r9.py executor/adapter_record_stage/ma1_verify_r10.py evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R8 evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R9 evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R10 evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R10.json; cd evidence/gcp_profile_stage/executor && for m in SHA256SUMS_GCP_LIVE SHA256SUMS_GCP_LIVE2; do grep '^[0-9a-f]\{64\}' $m | shasum -a 256 -c --quiet && echo "$m VERIFY_OK"; done; cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor && grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_RT_FINAL | shasum -a 256 -c --quiet && echo RUNTIME_VERIFY_OK`
- stdout sha256 `<PRIVATE_REF_05060>` · stderr sha256 `<PRIVATE_REF_03399>`

### N07_no_credential_in_supplement
- utc: 2026-10-04T04:36:01Z · exit: 0
- command: `bash -c printf 'x ya29.AAAAAAAAAAAAAAAAAAAA\n' > <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r11/scratch/canary_token.txt; echo 'positive control:'; grep -lE 'ya29\.[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{35}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r11/scratch/canary_token.txt; echo 'supplement evidence files containing credential-shaped values:'; grep -rlE 'ya29\.[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{35}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04 || echo NONE`
- stdout sha256 `<PRIVATE_REF_05740>` · stderr sha256 `<PRIVATE_REF_03399>`

### N08_pycache_absent
- utc: 2026-10-04T04:36:01Z · exit: 0
- command: `bash -c find <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage -name __pycache__ | wc -l`
- stdout sha256 `<PRIVATE_REF_04538>` · stderr sha256 `<PRIVATE_REF_03399>`


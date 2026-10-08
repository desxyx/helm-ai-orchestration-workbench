# STATIC_CHECK_LOG_R12 — MA-1.10 Alerta application-profile finalization (Executor Actor 01)
[Runner]: static_checks_r12/run_static_checks_r12.sh · Python 3.14.7 · PYTHONDONTWRITEBYTECODE=1
[Scope]: offline; GENUINE-LOCAL Alerta runtime + GENUINE-GCP R11 captures read-only; DERIVED-COMPOSITION labelled; no provider/network call

### Q01_hashes
- utc: 2026-10-04T05:40:55Z · exit: 0
- command: `shasum -a 256 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r12.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r11.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/alerta_probe.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/capture_contract_r12/gw.sh <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/capture_contract_r12/redact_w2.pl`
- stdout sha256 `<PRIVATE_REF_04013>` · stderr sha256 `<PRIVATE_REF_03399>`

### Q02_ast_compile
- utc: 2026-10-04T05:40:55Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c import ast,sys; src=open(sys.argv[1]).read(); ast.parse(src); compile(src, sys.argv[1], 'exec'); print('AST_PARSE_OK COMPILE_OK lines', src.count(chr(10))) <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r12.py`
- stdout sha256 `<PRIVATE_REF_04702>` · stderr sha256 `<PRIVATE_REF_03399>`

### Q03_offline_r12_alerta_checks
- utc: 2026-10-04T05:40:56Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r12/offline_checks_r12_alerta.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r12/scratch`
- stdout sha256 `<PRIVATE_REF_05081>` · stderr sha256 `<PRIVATE_REF_03399>`

### Q04_offline_r6_suite_on_r12_regression
- utc: 2026-10-04T05:42:09Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r12/offline_checks_r6_on_r12.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/raw <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r12/scratch_r6`
- stdout sha256 `<PRIVATE_REF_05814>` · stderr sha256 `<PRIVATE_REF_03399>`

### Q05_capture_redactor_controls
- utc: 2026-10-04T05:42:10Z · exit: 0
- command: `/opt/homebrew/bin/python3.14 -c 
import subprocess,sys,json
sys.path.insert(0,sys.argv[2]); import ma1_verify_r12 as v
doc=json.dumps({'env':[{'name':'DATABASE_URL','value':'postgres://<CONNECTION_STRING_REMOVED>@<IP_ADDRESS_126>:5432/monitoring'},{'name':'API','value':'<PRIVATE_URL_0025>'}],'password':'<CREDENTIAL_VALUE_REMOVED>','token':'ya29.AAAAAAAAAAAAAAAAAAAAAA'})
r=subprocess.run(['perl',sys.argv[1]],input=doc+'\n',capture_output=True,text=True); out=r.stdout
ok='s3cr3t-pw' not in out and 'ya29.AAAA' not in out and '"pw"' not in out and 'postgres://<REDACTED>@<IP_ADDRESS_126>:5432' in out
hosts=v.env_hosts(json.loads(out)['env'])
print('redacted_ok', ok, 'hosts_kept', sorted(hosts), r.stderr.strip()); sys.exit(0 if ok and '<IP_ADDRESS_126>' in hosts else 1)
 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/capture_contract_r12/redact_w2.pl <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage`
- stdout sha256 `<PRIVATE_REF_05748>` · stderr sha256 `<PRIVATE_REF_03399>`

### Q06_preserved
- utc: 2026-10-04T05:42:10Z · exit: 0
- command: `bash -c cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && grep '^[0-9a-f]\{64\}' evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R11 | shasum -a 256 -c --quiet && echo R11_MANIFEST_OK; cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04 && grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_SUPP_LIVE | shasum -a 256 -c --quiet && echo SUPP_LIVE_OK; cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor && grep '^[0-9a-f]\{64\}  \./' SHA256SUMS_RT_FINAL | shasum -a 256 -c --quiet && echo RUNTIME_OK; cd <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30 && shasum -a 256 executor/adapter_record_stage/ma1_verify_r11.py evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R11.json evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R11.md executor/minimal_fixture_build/test_alerta_api_smoke.py executor/minimal_fixture_build/test_alerta_ui_flow.py executor/minimal_fixture_build/A3_N_STATUS_201_TO_200.patch`
- stdout sha256 `<PRIVATE_REF_04128>` · stderr sha256 `<PRIVATE_REF_03399>`

### Q07_no_credential_in_r12_outputs
- utc: 2026-10-04T05:42:11Z · exit: 0
- command: `bash -c printf 'x ya29.AAAAAAAAAAAAAAAAAAAA\n' > <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r12/scratch/canary.txt; echo 'positive control:'; grep -lE 'ya29\.[A-Za-z0-9_-]{10,}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r12/scratch/canary.txt; echo 'r12 artifacts with credential-shaped values:'; grep -rlE 'ya29\.[A-Za-z0-9_-]{10,}|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.|-----BEGIN [A-Z ]*PRIVATE KEY|AIza[0-9A-Za-z_-]{35}' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/static_checks_r12/Q0[3-4]* <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage/executor/capture_contract_r12 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/alerta_probe.py || echo NONE`
- stdout sha256 `<PRIVATE_REF_05097>` · stderr sha256 `<PRIVATE_REF_03399>`

### Q08_pycache_absent
- utc: 2026-10-04T05:42:11Z · exit: 0
- command: `bash -c find <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/adapter_record_stage <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage -name __pycache__ | wc -l`
- stdout sha256 `<PRIVATE_REF_04538>` · stderr sha256 `<PRIVATE_REF_03399>`


# RAW_COMMAND_LOG_FX — AI_CICD / MA-1 / MINIMAL_FIXTURE_BUILD_R1

[Artifact Class]: EVIDENCE (support; append-only)
[Executor]: Executor Actor 01
[Release]: MA1_MINIMAL_FIXTURE_BUILD_RELEASE_2026-10-01_r1.md (sha256 <PRIVATE_REF_02986>)
[Wrapper]: `evidence/minimal_fixture_build/executor/support/capture.sh` — sanitized env (empty HOME, no system/global git config, no credential helper, no hooks), Q7 redaction filter (Resolution `tools/redact.pl`, read-only). No network command is issued in this stage.
[Paths]: capture paths are relative to `evidence/minimal_fixture_build/executor/`.

### FX-001 — be_receive_get_delete
- start: 2026-10-01T05:29:28Z · end: 2026-10-01T05:29:28Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009>\ show\ <PRIVATE_REF_01617>:alerta/views/alerts.py\ \|\ sed\ -n\ \'28,100p\;270,300p\'`
- stdout: `raw/FX-001_be_receive_get_delete.out` sha256 `<PRIVATE_REF_04681>` · redacted lines: 0
- stderr: `raw/FX-001_be_receive_get_delete.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-002 — be_health_routes
- start: 2026-10-01T05:29:28Z · end: 2026-10-01T05:29:29Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009> grep -n -E @mgmt\.route\|@api\.route\\(\'/_\'\|def\ \(good_to_go\|health_check\|healthcheck\|status\)\|return\ .\*\'OK\' <PRIVATE_REF_01617> -- alerta/management/views.py alerta/views/__init__.py`
- stdout: `raw/FX-002_be_health_routes.out` sha256 `<PRIVATE_REF_05267>` · redacted lines: 0
- stderr: `raw/FX-002_be_health_routes.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-003 — be_health_body
- start: 2026-10-01T05:29:40Z · end: 2026-10-01T05:29:40Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009>\ show\ <PRIVATE_REF_01617>:alerta/management/views.py\ \|\ sed\ -n\ \'125,155p\'\;\ echo\ ----DELETE-RETURN\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009>\ show\ <PRIVATE_REF_01617>:alerta/views/alerts.py\ \|\ sed\ -n\ \'300,306p\'\;\ echo\ ----AUTH\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009>\ show\ <PRIVATE_REF_01617>:alerta/auth/decorators.py\ \|\ sed\ -n\ \'24,50p\;150,175p\'`
- stdout: `raw/FX-003_be_health_body.out` sha256 `<PRIVATE_REF_05299>` · redacted lines: 6
- stderr: `raw/FX-003_be_health_body.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-004 — be_parse_reject
- start: 2026-10-01T05:29:40Z · end: 2026-10-01T05:29:40Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009>\ show\ <PRIVATE_REF_01617>:alerta/models/alert.py\ \|\ sed\ -n\ \'84,110p\'\;\ echo\ ----REJECT\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009>\ show\ <PRIVATE_REF_01617>:alerta/plugins/reject.py\ \|\ grep\ -n\ -E\ \'ALLOWED_ENVIRONMENTS\|ORIGIN_BLACKLIST\|raise\ RejectException\|def\ pre_receive\|if\ \'\;\ echo\ ----HB\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009>\ grep\ -n\ -E\ \'HeartbeatReceived\\(\|event\ ==\|Heartbeat\'\ <PRIVATE_REF_01617>\ --\ alerta/plugins/heartbeat.py\ \|\ head\;\ echo\ ----QB\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009>\ grep\ -n\ -E\ \"\'id\':\|\'resource\':\|\'event\':\"\ <PRIVATE_REF_01617>\ --\ alerta/database/backends/postgres/utils.py\ \|\ head\ -8\;\ echo\ ----BP\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009>\ grep\ -n\ -E\ \'register_blueprint\|url_prefix\'\ <PRIVATE_REF_01617>\ --\ alerta/app.py`
- stdout: `raw/FX-004_be_parse_reject.out` sha256 `<PRIVATE_REF_03998>` · redacted lines: 0
- stderr: `raw/FX-004_be_parse_reject.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-005 — fe_tree
- start: 2026-10-01T05:29:55Z · end: 2026-10-01T05:29:55Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ ls-tree\ -r\ --name-only\ <PRIVATE_REF_03446>\ src\ \|\ grep\ -iE\ \'router\|login\|signup\|logout\|auth\|App.vue\|main\.\(ts\|js\)\|config\'`
- stdout: `raw/FX-005_fe_tree.out` sha256 `<PRIVATE_REF_04900>` · redacted lines: 0
- stderr: `raw/FX-005_fe_tree.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-006 — fe_router
- start: 2026-10-01T05:30:03Z · end: 2026-10-01T05:30:03Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/router.ts\ \|\ grep\ -n\ -E\ \"path:\|requiresAuth\|beforeEach\|next\\(\|isLoggedIn\|auth_required\|redirect\|name:\"\ \|\ head\ -60`
- stdout: `raw/FX-006_fe_router.out` sha256 `<PRIVATE_REF_05111>` · redacted lines: 0
- stderr: `raw/FX-006_fe_router.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-007 — fe_login_signup_vue
- start: 2026-10-01T05:30:03Z · end: 2026-10-01T05:30:03Z · exit: 1
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c for\ f\ in\ src/components/auth/UserLogin.vue\ src/components/auth/UserSignup.vue\ src/components/auth/UserLogout.vue\ src/views/Login.vue\ src/views/Signup.vue\ src/views/Logout.vue\;\ do\ echo\ \"\#\#\#\#\#\ \$f\ blob=\$\(git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ rev-parse\ <PRIVATE_REF_03446>:\$f\)\"\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:\$f\ \|\ sed\ -n\ \'1,/\<script/p\'\ \|\ grep\ -n\ -E\ \'v-text-field\|label=\|type=\|v-btn\|@click\|@submit\|\<form\|v-form\|:rules\|v-model\|name=\|placeholder\|alert\|v-alert\|error\|\\{\\{\ \*\\$t\'\ \;\ done`
- stdout: `raw/FX-007_fe_login_signup_vue.out` sha256 `<PRIVATE_REF_04859>` · redacted lines: 3
- stderr: `raw/FX-007_fe_login_signup_vue.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-008 — fe_guard_scripts
- start: 2026-10-01T05:30:15Z · end: 2026-10-01T05:30:15Z · exit: 1
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/router.ts\ \|\ sed\ -n\ \'150,175p\'\;\ echo\ ----LOGIN-TEMPLATE-TOP\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/components/auth/UserLogin.vue\ \|\ sed\ -n\ \'1,20p\;63,80p\'\;\ echo\ ----LOGIN-SCRIPT\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/components/auth/UserLogin.vue\ \|\ sed\ -n\ \'/\<script/,/\<\/script\>/p\'\ \|\ grep\ -n\ -E\ \'login\\(\|signup\|push\|redirect\|catch\|error\|dispatch\|methods\'\ \;\ echo\ ----SIGNUP-SCRIPT\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/components/auth/UserSignup.vue\ \|\ sed\ -n\ \'/\<script/,/\<\/script\>/p\'\ \|\ grep\ -n\ -E\ \'validate\|signup\|push\|redirect\|dispatch\|rules\|min\|required\|passwordMatch\|=\>\'\ \;\ echo\ ----LOGOUT\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/components/auth/UserLogout.vue\ \|\ sed\ -n\ \'/\<script/,/\<\/script\>/p\'\ \|\ grep\ -n\ -E\ \'logout\|dispatch\|push\|created\|mounted\'`
- stdout: `raw/FX-008_fe_guard_scripts.out` sha256 `<PRIVATE_REF_05790>` · redacted lines: 0
- stderr: `raw/FX-008_fe_guard_scripts.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-009 — fe_login_logout_full
- start: 2026-10-01T05:30:24Z · end: 2026-10-01T05:30:24Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/components/auth/UserLogin.vue\ \|\ sed\ -n\ \'20,62p\'\;\ echo\ ----LOGOUT-COMP\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/components/auth/UserLogout.vue\;\ echo\ ----LOGOUT-VIEW\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/views/Logout.vue\ \|\ head\ -30\;\ echo\ ----LOCALE-FILES\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ ls-tree\ -r\ --name-only\ <PRIVATE_REF_03446>\ src/locales\ \|\ head`
- stdout: `raw/FX-009_fe_login_logout_full.out` sha256 `<PRIVATE_REF_04077>` · redacted lines: 1
- stderr: `raw/FX-009_fe_login_logout_full.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-010 — fe_logout_errors
- start: 2026-10-01T05:30:34Z · end: 2026-10-01T05:30:35Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ grep\ -n\ -E\ \"auth/logout\|logout\\(\|\'/logout\'\|name:\ \'logout\'\|SignOut\|LogOut\|Logout\"\ <PRIVATE_REF_03446>\ --\ src/App.vue\ src/components\ src/store/modules/auth.store.ts\ \|\ head\ -20\;\ echo\ ----INTERCEPT\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ grep\ -n\ -E\ \'interceptors\|notifications/error\|snackbar\|v-snackbar\'\ <PRIVATE_REF_03446>\ --\ src\ \|\ head\ -15\;\ echo\ ----EN\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/locales/en.js\ \|\ grep\ -n\ -E\ \"\^\ \*\(LoginToContinue\|Username\|Password\|LogIn\|LogOut\|SignOut\|CreateAccount\|SignUp\|SignIn\|FullName\|ConfirmPassword\|Description\|LoggedOut\|CreateAlertaAccount\|Logout\|Required\|Min6Char\|Error\|Alerts\)\b\"`
- stdout: `raw/FX-010_fe_logout_errors.out` sha256 `<PRIVATE_REF_04220>` · redacted lines: 2
- stderr: `raw/FX-010_fe_logout_errors.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-011 — fe_profile_menu
- start: 2026-10-01T05:30:45Z · end: 2026-10-01T05:30:46Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/components/auth/ProfileMe.vue\ \|\ sed\ -n\ \'175,190p\;222,245p\'\;\ echo\ ----APP-MENU\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/App.vue\ \|\ grep\ -n\ -E\ \'profile-me\|ProfileMe\|v-menu\|activator\|avatar\|isLoggedIn\|v-slot:activator\|slot=\"activator\"\|account_circle\'\ \|\ head\ -20\;\ echo\ ----INTERCEPTORS\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/services/api/interceptors.ts\ \|\ head\ -60\;\ echo\ ----SIGNUP-TOP\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/components/auth/UserSignup.vue\ \|\ sed\ -n\ \'10,26p\;78,92p\'`
- stdout: `raw/FX-011_fe_profile_menu.out` sha256 `<PRIVATE_REF_05597>` · redacted lines: 0
- stderr: `raw/FX-011_fe_profile_menu.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-012 — fe_app_menu
- start: 2026-10-01T05:30:53Z · end: 2026-10-01T05:30:53Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/App.vue\ \|\ sed\ -n\ \'204,262p\'\;\ echo\ ----AUTH-STORE\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/store/modules/auth.store.ts\ \|\ sed\ -n\ \'1,100p\'\ \|\ grep\ -n\ -E\ \'isLoggedIn\|token\|localStorage\|logout\|login\\(\|signup\'\;\ echo\ ----CONFIGJSON\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:public/config.json.example\ 2\>/dev/null\ \|\ head\ -20`
- stdout: `raw/FX-012_fe_app_menu.out` sha256 `<PRIVATE_REF_05281>` · redacted lines: 3
- stderr: `raw/FX-012_fe_app_menu.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-013 — fe_signup_store_routes
- start: 2026-10-01T05:31:37Z · end: 2026-10-01T05:31:37Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/store/modules/auth.store.ts\ \|\ sed\ -n\ \'35,64p\'\;\ echo\ ----ROOT-ROUTE\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_008>\ show\ <PRIVATE_REF_03446>:src/router.ts\ \|\ sed\ -n\ \'10,26p\'\;\ echo\ ----BE-LOGIN-ERR\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009>\ show\ <PRIVATE_REF_01617>:alerta/auth/basic.py\ \|\ grep\ -n\ -E\ \"ApiError\\(\|401\|invalid\|EMAIL_VERIFICATION\|create_token\|return\ jsonify\"\ \|\ head\ -20\;\ echo\ ----BE-LOGIN-ROUTE\;\ git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/sources/<ACCOUNT_EMAIL_009>\ show\ <PRIVATE_REF_01617>:alerta/auth/login.py\ \|\ head\ -25`
- stdout: `raw/FX-013_fe_signup_store_routes.out` sha256 `<PRIVATE_REF_04916>` · redacted lines: 4
- stderr: `raw/FX-013_fe_signup_store_routes.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-014 — make_patch
- start: 2026-10-01T05:32:22Z · end: 2026-10-01T05:32:22Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `python3 support/make_patch.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend <PRIVATE_REF_01617> <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/A3_N_STATUS_201_TO_200.patch`
- stdout: `raw/FX-014_make_patch.out` sha256 `<PRIVATE_REF_04492>` · redacted lines: 0
- stderr: `raw/FX-014_make_patch.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-015 — patch_apply_check
- start: 2026-10-01T05:32:38Z · end: 2026-10-01T05:32:38Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c set\ -e\;\ S=scratch/patch_check\;\ rm\ -rf\ \$S\;\ mkdir\ -p\ \$S\;\ git\ init\ -q\ --template=\ \$S/repo\;\ export\ GIT_INDEX_FILE=\$PWD/\$S/index\;\ L=\$\(git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend\ --no-optional-locks\ ls-tree\ <PRIVATE_REF_01617>\ --\ alerta/views/alerts.py\)\;\ ID=\$\(echo\ \$L\ \|\ awk\ \'\{print\ \$3\}\'\)\;\ echo\ frozen_entry=\$L\;\ NEW=\$\(git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend\ --no-optional-locks\ cat-file\ blob\ \$ID\ \|\ git\ -C\ \$S/repo\ hash-object\ -w\ --stdin\)\;\ \[\ \$NEW\ =\ \$ID\ \]\ \&\&\ echo\ blob_copy_verified=\$NEW\;\ git\ -C\ \$S/repo\ update-index\ --add\ --cacheinfo\ 100644,\$ID,alerta/views/alerts.py\;\ echo\ \'---\ git\ apply\ --check\ --cached\ -v\'\;\ git\ -C\ \$S/repo\ apply\ --check\ --cached\ -v\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/A3_N_STATUS_201_TO_200.patch\ \&\&\ echo\ CHECK_RESULT=APPLIES_CLEANLY\;\ git\ -C\ \$S/repo\ apply\ --numstat\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/A3_N_STATUS_201_TO_200.patch\;\ echo\ \'---\ throwaway-index\ apply\ \(index\ only,\ no\ file\ written\)\'\;\ cp\ \$S/index\ \$S/index.after\;\ GIT_INDEX_FILE=\$PWD/\$S/index.after\ git\ -C\ \$S/repo\ apply\ --cached\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/A3_N_STATUS_201_TO_200.patch\;\ echo\ after_blob=\$\(GIT_INDEX_FILE=\$PWD/\$S/index.after\ git\ -C\ \$S/repo\ ls-files\ -s\ alerta/views/alerts.py\)\;\ echo\ \'---\ negative\ control:\ check\ against\ already-patched\ index\ must\ fail\'\;\ if\ GIT_INDEX_FILE=\$PWD/\$S/index.after\ git\ -C\ \$S/repo\ apply\ --check\ --cached\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/A3_N_STATUS_201_TO_200.patch\ 2\>\&1\;\ then\ echo\ NEGATIVE_CONTROL=UNEXPECTED_PASS\;\ else\ echo\ NEGATIVE_CONTROL=FAILS_AS_EXPECTED\;\ fi\;\ echo\ worktree_files=\$\(find\ \$S/repo\ -mindepth\ 1\ -maxdepth\ 1\ !\ -name\ .git\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\;\ echo\ frozen_porcelain=\$\(git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend\ status\ --porcelain\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)`
- stdout: `raw/FX-015_patch_apply_check.out` sha256 `<PRIVATE_REF_03759>` · redacted lines: 0
- stderr: `raw/FX-015_patch_apply_check.err` sha256 `<PRIVATE_REF_04406>` · redacted lines: 0

### FX-016 — frozen_recheck
- start: 2026-10-01T05:32:51Z · end: 2026-10-01T05:32:51Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c unset\ GIT_INDEX_FILE\;\ for\ d\ in\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/frontend\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend\;\ do\ echo\ \"\$\(basename\ \$d\)\ HEAD=\$\(git\ -C\ \$d\ rev-parse\ HEAD\)\ porcelain=\$\(git\ -C\ \$d\ status\ --porcelain\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\ gitdir=\$\(git\ -C\ \$d\ rev-parse\ --absolute-git-dir\)\"\;\ done\;\ IDX=\$\(git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend\ rev-parse\ --absolute-git-dir\)/index\;\ echo\ backend_index_mtime=\$\(stat\ -f\ \'%Sm\'\ -t\ \'%Y-%m-%dT%H:%M:%S\'\ \$IDX\)\ now=\$\(date\ \'+%Y-%m-%dT%H:%M:%S\'\)\;\ echo\ backend_index_entries=\$\(git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend\ ls-files\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)`
- stdout: `raw/FX-016_frozen_recheck.out` sha256 `<PRIVATE_REF_05103>` · redacted lines: 0
- stderr: `raw/FX-016_frozen_recheck.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

- note (FX-015): the `frozen_porcelain=298` line in FX-015 is an instrument artefact — `GIT_INDEX_FILE` was still exported to the scratch index when `git status` ran against the frozen backend, so git compared the frozen worktree with the 1-entry scratch index. With `GIT_OPTIONAL_LOCKS=0` (wrapper SAFE_ENV) status does not write an index. FX-016 re-checks the frozen repositories with GIT_INDEX_FILE unset.

### FX-017 — static_check_homebrew_py
- start: 2026-10-01T05:33:59Z · end: 2026-10-01T05:33:59Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `python3 -c 1`
- stdout: `raw/FX-017_static_check_homebrew_py.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/FX-017_static_check_homebrew_py.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-018 — static_check_3.12_py
- start: 2026-10-01T05:33:59Z · end: 2026-10-01T05:33:59Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `python3 -c 1`
- stdout: `raw/FX-018_static_check_3.12_py.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/FX-018_static_check_3.12_py.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-019 — static_check_py314
- start: 2026-10-01T05:33:59Z · end: 2026-10-01T05:33:59Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/opt/homebrew/bin/python3 support/static_check.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_api_smoke.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_ui_flow.py`
- stdout: `raw/FX-019_static_check_py314.out` sha256 `<PRIVATE_REF_05445>` · redacted lines: 0
- stderr: `raw/FX-019_static_check_py314.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-020 — static_check_py312
- start: 2026-10-01T05:33:59Z · end: 2026-10-01T05:33:59Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 support/static_check.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_api_smoke.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_ui_flow.py`
- stdout: `raw/FX-020_static_check_py312.out` sha256 `<PRIVATE_REF_04783>` · redacted lines: 0
- stderr: `raw/FX-020_static_check_py312.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### FX-021 — credential_literal_hits
- start: 2026-10-01T05:34:09Z · end: 2026-10-01T05:34:09Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c grep\ -n\ -i\ -E\ \"\(password\|api_key\|apikey\|secret\|token\)\[\[:space:\]\]\*=\[\[:space:\]\]\*\[\'\\"\]\"\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_ui_flow.py\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_api_smoke.py\;\ echo\ \'---\ env-only\ credential\ sources:\'\;\ grep\ -n\ -E\ \"os\.environ\.get\\(\'\(ALERTA_API_KEY\|MA1_UI_USER_PASSWORD\|MA1_UI_USER_EMAIL\)\'\"\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_ui_flow.py\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build/test_alerta_api_smoke.py`
- stdout: `raw/FX-021_credential_literal_hits.out` sha256 `<PRIVATE_REF_05816>` · redacted lines: 3
- stderr: `raw/FX-021_credential_literal_hits.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

- note (FX-017/FX-018): two trivial `python3 -c 1` captures came from a leftover loop line; they ran no fixture code and carry no evidence weight.
- note (FX-019/FX-020): the `credential_literals=['PASSWORD']` hit for the UI flow is the selector constant `SEL_PASSWORD = '<CREDENTIAL_VALUE_REMOVED>"password"]'` (FX-021), not a credential value.

### FX-022 — final_checks
- start: 2026-10-01T05:35:12Z · end: 2026-10-01T05:35:12Z · exit: 0
- cwd: `evidence/minimal_fixture_build/executor/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c cd\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build\;\ echo\ work_root_files=\$\(ls\ -A\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\;\ ls\ -A\;\ for\ f\ in\ test_alerta_api_smoke.py\ A3_N_STATUS_201_TO_200.patch\ test_alerta_ui_flow.py\ MA1_MINIMAL_FIXTURE_SPEC.md\;\ do\ echo\ \"\$f\ sha256=\$\(shasum\ -a\ 256\ \$f\ \|\ cut\ -c1-64\)\ lines=\$\(wc\ -l\ \<\ \$f\ \|\ tr\ -d\ \'\ \'\)\ nonblank=\$\(grep\ -c\ .\ \$f\)\ bytes=\$\(wc\ -c\ \<\ \$f\ \|\ tr\ -d\ \'\ \'\)\"\;\ done\;\ unset\ GIT_INDEX_FILE\;\ for\ d\ in\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/frontend\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend\;\ do\ echo\ \"\$\(basename\ \$d\)\ HEAD=\$\(git\ -C\ \$d\ rev-parse\ HEAD\)\ porcelain=\$\(git\ -C\ \$d\ status\ --porcelain\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\"\;\ done\;\ cd\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30\;\ echo\ s1_r1=\$\(shasum\ -a\ 256\ -c\ evidence/resolution_stage/executor/SHA256SUMS\ \|\ grep\ -c\ \':\ OK\$\'\)/451\ s1_r2=\$\(shasum\ -a\ 256\ -c\ evidence/resolution_stage/executor/rework_r1/SHA256SUMS_R2\ \|\ grep\ -c\ \':\ OK\$\'\)/277\ s1_r3=\$\(shasum\ -a\ 256\ -c\ evidence/resolution_stage/executor/rework_r2/SHA256SUMS_R3\ \|\ grep\ -c\ \':\ OK\$\'\)/68\;\ echo\ emptyhome=\$\(ls\ -A\ evidence/minimal_fixture_build/executor/.emptyhome\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\ pycache=\$\(find\ executor/minimal_fixture_build\ evidence/minimal_fixture_build\ -name\ __pycache__\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)`
- stdout: `raw/FX-022_final_checks.out` sha256 `<PRIVATE_REF_05108>` · redacted lines: 0
- stderr: `raw/FX-022_final_checks.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0


## Closure — 2026-10-01T05:35:21Z

- Last capture: FX-022. No network command, dependency install, API request, browser launch, backend/frontend/database/service/container/Lima/VM action in this stage.
- Primary artifacts (work root contains exactly these four): see FX-022 for sha256/lines/nonblank/bytes.
- Patch applicability: FX-014 (generation from frozen blob), FX-015 (index-only check, throwaway-index result blob, negative control), FX-016 (frozen repos clean; FX-015 porcelain line is an instrument artefact).
- Static checks: FX-019/FX-020 (py3.14 / py3.12), FX-021 (credential-literal hit = selector constant).
- Checksums: `SHA256SUMS_FX` in this directory.

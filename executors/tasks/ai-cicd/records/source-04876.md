# RAW_COMMAND_LOG — AI_CICD / MA-1 / RESOLUTION_STAGE_S1

[Artifact Class]: EVIDENCE (append-only during the stage)
[Executor]: Executor Actor 01
[Release]: RESOLUTION_STAGE_EXECUTOR_RELEASE_2026-10-01_r1.md (sha256 <PRIVATE_REF_02924>)
[Wrapper]: `executor/resolution_stage/tools/rs.sh` — sanitized env (empty HOME, GIT_CONFIG_NOSYSTEM=1, GIT_CONFIG_GLOBAL=/dev/null, credential.helper empty, hooksPath=/dev/null, https-only protocol, no submodules, no LFS smudge). All captures pass through the Q7 redaction filter before being written; the per-capture redacted-line count is recorded.
[Paths]: capture paths are relative to `evidence/resolution_stage/executor/`.

### 001 — 000_selftest_env
- start: 2026-10-01T03:15:28Z · end: 2026-10-01T03:15:28Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c echo\ HOME=\$HOME\;\ env\ \|\ sort\;\ git\ config\ --list\ --show-origin\;\ echo\ \"git_config_exit=\$\?\"`
- stdout: `raw/001_000_selftest_env.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: Unmatched [ in regex; marked by <-- HERE in m/(?i)((?:password|passwd|pwd|secret(?:_key)?|token|api[_-]?key|access[_-]?key|private[_-]?key|client[_-]?secret|dsn|SENTRY_DSN|DATABASE_URL)["']?\s*[:=]\s*["']?)(?!<REDACTED)([ <-- HERE ^\s"',/ at -e line 3.
- stderr: `raw/001_000_selftest_env.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: Unmatched [ in regex; marked by <-- HERE in m/(?i)((?:password|passwd|pwd|secret(?:_key)?|token|api[_-]?key|access[_-]?key|private[_-]?key|client[_-]?secret|dsn|SENTRY_DSN|DATABASE_URL)["']?\s*[:=]\s*["']?)(?!<REDACTED)([ <-- HERE ^\s"',/ at -e line 3.

### 002 — selftest_env
- start: 2026-10-01T03:15:48Z · end: 2026-10-01T03:15:48Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c echo\ HOME=\$HOME\;\ env\ \|\ sort\;\ git\ config\ --list\ --show-origin\;\ echo\ \"git_config_exit=\$\?\"\;\ ls\ -A\ \$HOME\ \|\ wc\ -l`
- stdout: `raw/002_selftest_env.out` sha256 `<PRIVATE_REF_04163>` · redacted lines: 1
HOME=<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/.emptyhome
GIT_ASKPASS=/usr/bin/false
GIT_CONFIG_GLOBAL=/dev/null
GIT_CONFIG_NOSYSTEM=1
GIT_LFS_SKIP_SMUDGE=1
GIT_OPTIONAL_LOCKS=0
GIT_TERMINAL_PROMPT=0
HOME=<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/.emptyhome
LANG=C
LC_ALL=C
PATH=/opt/homebrew/bin:/usr/bin:/bin
PWD=<REDACTED>
SHLVL=1
SSH_ASKPASS=/usr/bin/false
TZ=UTC
_=/usr/bin/env
git_config_exit=0
       0
- stderr: `raw/002_selftest_env.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 003 — lsremote_alerta
- start: 2026-10-01T03:16:10Z · end: 2026-10-01T03:16:11Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false ls-remote https://github.com/alerta/alerta.git refs/tags/v9\* refs/heads/\*`
- stdout: `raw/003_lsremote_alerta.out` sha256 `<PRIVATE_REF_05053>` · redacted lines: 0
<PRIVATE_REF_04515>	refs/heads/ack-timeout
<PRIVATE_REF_05399>	refs/heads/ack-timeout-mongodb
<PRIVATE_REF_05529>	refs/heads/action-plugins
<PRIVATE_REF_03767>	refs/heads/add-admin-role-test
<PRIVATE_REF_05100>	refs/heads/add-avatar-to-jwt
<PRIVATE_REF_04039>	refs/heads/add-blackout-config-response
<PRIVATE_REF_04331>	refs/heads/add-default-sev-config
<PRIVATE_REF_04568>	refs/heads/add-delete-alerts-scope
<PRIVATE_REF_04784>	refs/heads/add-grafana6-test
<PRIVATE_REF_05834>	refs/heads/add-guest-default-role
<PRIVATE_REF_03794>	refs/heads/add-heartbeat-attributes
<PRIVATE_REF_05715>	refs/heads/add-ldap-tests
<PRIVATE_REF_04102>	refs/heads/add-new-relic-webhook-test
<PRIVATE_REF_04263>	refs/heads/add-prometheus-test
<PRIVATE_REF_04826>	refs/heads/add-text-to-default-alert-list
<PRIVATE_REF_04561>	refs/heads/add-timeout-to-history
<PRIVATE_REF_04282>	refs/heads/alarm-management
<PRIVATE_REF_05017>	refs/heads/alert-forwarder-plugin
<PRIVATE_REF_05428>	refs/heads/alert-history-dismiss-note
<PRIVATE_REF_04446>	refs/heads/alert-list-font-config
<PRIVATE_REF_05973>	refs/heads/alert-to-hb-id
<PRIVATE_REF_04810>	refs/heads/alertad-admin-key-list
<PRIVATE_REF_04452>	refs/heads/alertad-cli-tool
<PRIVATE_REF_05240>	refs/heads/alertad-user-cmd-login
<PRIVATE_REF_05142>	refs/heads/allow-custom-ids
<PRIVATE_REF_05218>	refs/heads/allow-readonly-auth
<PRIVATE_REF_05438>	refs/heads/audit-log-redact
<PRIVATE_REF_03989>	refs/heads/audit-log-user-agent
<PRIVATE_REF_04284>	refs/heads/auth-oidc-username
<PRIVATE_REF_04462>	refs/heads/auto-unshelved
<PRIVATE_REF_04539>	refs/heads/azure-v2-auth
<PRIVATE_REF_05012>	refs/heads/basic-auth-create-user
<PRIVATE_REF_04514>	refs/heads/blackout-alert-origin
<PRIVATE_REF_05617>	refs/heads/blackout-last-receive-time
<PRIVATE_REF_04521>	refs/heads/blackout-period-compare-time
<PRIVATE_REF_04156>	refs/heads/blackout-resource-and-tag
<PRIVATE_REF_05623>	refs/heads/build/bump-python-dependencies
<PRIVATE_REF_05028>	refs/heads/build/update-infrastructure
<PRIVATE_REF_05624>	refs/heads/builtin-plugin-config-env-vars
<PRIVATE_REF_04714>	refs/heads/bump-deps-sept-2024
<PRIVATE_REF_05057>	refs/heads/bump-package-versions
<PRIVATE_REF_04168>	refs/heads/bump-packages-v700
<PRIVATE_REF_05355>	refs/heads/bump-pyjwt-pkg
<PRIVATE_REF_05507>	refs/heads/bump-requirements
<PRIVATE_REF_05522>	refs/heads/bump-requirements-june-2022
<PRIVATE_REF_05724>	refs/heads/bump-requirements-oct-2020
<PRIVATE_REF_05391>	refs/heads/cast-timeout-to-int
<PRIVATE_REF_04688>	refs/heads/catch-oidc-exceptions
<PRIVATE_REF_04210>	refs/heads/change-default-columns
<PRIVATE_REF_05191>	refs/heads/check-for-no-login
<PRIVATE_REF_04646>	refs/heads/close-expired-alerts
<PRIVATE_REF_05714>	refs/heads/cloudwatch-insufficient-data
<PRIVATE_REF_05580>	refs/heads/cognito-auth-provider
<PRIVATE_REF_04017>	refs/heads/config-ack-shelve-timeouts
<PRIVATE_REF_05672>	refs/heads/config-allowed-envs
<PRIVATE_REF_04548>	refs/heads/config-default-filter
<PRIVATE_REF_04958>	refs/heads/config-default-user-role
<PRIVATE_REF_04262>	refs/heads/configurable-inform-severity
<PRIVATE_REF_04151>	refs/heads/convert-tests-to-f-strings
<PRIVATE_REF_05924>	refs/heads/convert-tests-to-f-strings-2
<PRIVATE_REF_04350>	refs/heads/convert-to-f-strings
<PRIVATE_REF_05785>	refs/heads/correlate-tags-attributes
<PRIVATE_REF_04498>	refs/heads/custom-attribute-query-parser
<PRIVATE_REF_04482>	refs/heads/custom-error-response
<PRIVATE_REF_04725>	refs/heads/custom-scopes
<PRIVATE_REF_04487>	refs/heads/date-time-formats
<PRIVATE_REF_04221>	refs/heads/db-backend-load-errors
<PRIVATE_REF_04325>	refs/heads/db-create-raise-on-error
<PRIVATE_REF_05685>	refs/heads/db-refactor
<PRIVATE_REF_04057>	refs/heads/debug-config-setting
<PRIVATE_REF_05521>	refs/heads/debug-docker-entrypoint
<PRIVATE_REF_05241>	refs/heads/dependabot/pip/cryptography-48.0.1
<PRIVATE_REF_05370>	refs/heads/dependabot/pip/lxml-6.0.2
<PRIVATE_REF_05441>	refs/heads/dependabot/pip/lxml-6.1.0
<PRIVATE_REF_05628>	refs/heads/dependabot/pip/mypy-1.19.1
<PRIVATE_REF_04080>	refs/heads/dependabot/pip/pre-commit-4.3.0
<PRIVATE_REF_04848>	refs/heads/dependabot/pip/pyjwt-2.13.0
<PRIVATE_REF_04786>	refs/heads/dependabot/pip/pylint-3.3.9
<PRIVATE_REF_04268>	refs/heads/dependabot/pip/pysaml2-7.5.4
<PRIVATE_REF_05760>	refs/heads/deps-flask-1.1.x
<PRIVATE_REF_05827>	refs/heads/develop
<PRIVATE_REF_05603>	refs/heads/docker-build
<PRIVATE_REF_05967>	refs/heads/docker-entrypoint
<PRIVATE_REF_05476>	refs/heads/edit-api-key-user
<PRIVATE_REF_05058>	refs/heads/elasticsearch
<PRIVATE_REF_05539>	refs/heads/env
<PRIVATE_REF_04327>	refs/heads/escalate-plugin
<PRIVATE_REF_04602>	refs/heads/feat-timeout-policy-plugin
<PRIVATE_REF_05731>	refs/heads/feat/mcp-server
<PRIVATE_REF_04685>	refs/heads/feat/rejected-alerts-counter
<PRIVATE_REF_05870>	refs/heads/feature/severity-piechart
<PRIVATE_REF_05979>	refs/heads/find-by-user-id
<PRIVATE_REF_04401>	refs/heads/fix-acked-by-no-login
<PRIVATE_REF_05412>	refs/heads/fix-action-plugin-tags
<PRIVATE_REF_04390>	refs/heads/fix-add-note
<PRIVATE_REF_04619>	refs/heads/fix-admin-create-user
<PRIVATE_REF_04913>	refs/heads/fix-admin-email-check
<PRIVATE_REF_04791>	refs/heads/fix-alertad-key-cmd
<PRIVATE_REF_04415>	refs/heads/fix-alertad-run
<PRIVATE_REF_05749>	refs/heads/fix-api-key-query
<PRIVATE_REF_04491>	refs/heads/fix-auth-roles-groups
<PRIVATE_REF_05802>	refs/heads/fix-auto-unshelve
<PRIVATE_REF_04037>	refs/heads/fix-blackout-empty-strings
<PRIVATE_REF_04824>	refs/heads/fix-bootstrap-loading
<PRIVATE_REF_04928>	refs/heads/fix-codescan-info-exposure-exception
<PRIVATE_REF_03806>	refs/heads/fix-custom-sort
<PRIVATE_REF_04570>	refs/heads/fix-customer-lookup-user-domain
<PRIVATE_REF_05669>	refs/heads/fix-debug-log-level
<PRIVATE_REF_05699>	refs/heads/fix-docker-image-metadata
<PRIVATE_REF_05536>	refs/heads/fix-email-split
<PRIVATE_REF_04410>	refs/heads/fix-env-counts-backport
<PRIVATE_REF_04718>	refs/heads/fix-environments-zero-count
<PRIVATE_REF_05358>	refs/heads/fix-envvar-config
<PRIVATE_REF_04972>	refs/heads/fix-envvar-plugin-config
<PRIVATE_REF_05463>	refs/heads/fix-error-request-id
<PRIVATE_REF_05706>	refs/heads/fix-exception-error-exposure
<PRIVATE_REF_05160>	refs/heads/fix-exception-error-exposure-2
<PRIVATE_REF_04437>	refs/heads/fix-expire-alerts
<PRIVATE_REF_04196>	refs/heads/fix-flask-cli
<PRIVATE_REF_04456>	refs/heads/fix-forwarder-alertid
<PRIVATE_REF_04634>	refs/heads/fix-forwarder-test
<PRIVATE_REF_03760>	refs/heads/fix-hb-lint-error
<PRIVATE_REF_05969>	refs/heads/fix-hb-max-latency
<PRIVATE_REF_04451>	refs/heads/fix-heartbeat-alert-timeout
<PRIVATE_REF_03800>	refs/heads/fix-history-id
<PRIVATE_REF_05854>	refs/heads/fix-hmac-if-auth-required
<PRIVATE_REF_04989>	refs/heads/fix-housekeeping-config
<PRIVATE_REF_04605>	refs/heads/fix-housekeeping-params
<PRIVATE_REF_04272>	refs/heads/fix-ldap-docker-image
<PRIVATE_REF_04815>	refs/heads/fix-ldap-empty-bind
<PRIVATE_REF_05304>	refs/heads/fix-ldap-empty-bind-backport
<PRIVATE_REF_04445>	refs/heads/fix-ldap-port-number
<PRIVATE_REF_05405>	refs/heads/fix-ldap-username-filter-1
<PRIVATE_REF_04869>	refs/heads/fix-logflle-log-format
<PRIVATE_REF_05331>	refs/heads/fix-mongo-blackout-update
<PRIVATE_REF_05283>	refs/heads/fix-mongo-get-alerts
<PRIVATE_REF_04724>	refs/heads/fix-mongo-healthcheck
<PRIVATE_REF_05531>	refs/heads/fix-mongo-login-nullable
<PRIVATE_REF_05884>	refs/heads/fix-mypy-ini
<PRIVATE_REF_05257>	refs/heads/fix-nested-query-exact-phrase
<PRIVATE_REF_04058>	refs/heads/fix-no-attributes
<PRIVATE_REF_05089>	refs/heads/fix-note-related-id
<PRIVATE_REF_04366>	refs/heads/fix-oembed-mongo
<PRIVATE_REF_04378>	refs/heads/fix-pg-close-cursor-conn
<PRIVATE_REF_05173>	refs/heads/fix-postgres15
<PRIVATE_REF_04948>	refs/heads/fix-prometheus-multialert
<PRIVATE_REF_05544>	refs/heads/fix-prometheus-webhook-unset-create-time
<PRIVATE_REF_05935>	refs/heads/fix-pylint-errors
<PRIVATE_REF_05882>	refs/heads/fix-query-by-custom-attribute
<PRIVATE_REF_05344>	refs/heads/fix-repeat-actions
<PRIVATE_REF_05912>	refs/heads/fix-reponse-href
<PRIVATE_REF_04648>	refs/heads/fix-search-lists-quoted-strings
<PRIVATE_REF_04558>	refs/heads/fix-smtp-settings
<PRIVATE_REF_05182>	refs/heads/fix-stackdriver-unset-create-time
<PRIVATE_REF_05210>	refs/heads/fix-tags-test
<PRIVATE_REF_05516>	refs/heads/fix-test-docker-build
<PRIVATE_REF_04324>	refs/heads/fix-unack-when-status-ack
<PRIVATE_REF_04878>	refs/heads/fix-update-time-column
<PRIVATE_REF_03985>	refs/heads/fix-valid-scope-check
<PRIVATE_REF_04705>	refs/heads/fix-webhook-action-close
<PRIVATE_REF_04264>	refs/heads/fix-webhook-alert-heartbeats
<PRIVATE_REF_04697>	refs/heads/fix-werkzeug-bad-request-error
<PRIVATE_REF_05929>	refs/heads/fix-x-request-id-cors-header
<PRIVATE_REF_05774>	refs/heads/fix/blackout-null-matching
<PRIVATE_REF_04441>	refs/heads/fix/cas-auth-cleanup
<PRIVATE_REF_05867>	refs/heads/fix/housekeeping-query-limit
<PRIVATE_REF_04459>	refs/heads/fix/plugin-typeerror-swallowed-2054
<PRIVATE_REF_05316>	refs/heads/fix/postgres-query-parser-sql-injection
<PRIVATE_REF_05872>	refs/heads/fix/quick-wins
<PRIVATE_REF_04148>	refs/heads/fix/replace-pkg-resources-with-importlib
<PRIVATE_REF_05898>	refs/heads/fix/unack-history-cap
<PRIVATE_REF_04261>	refs/heads/fix/update-docker-login-action
<PRIVATE_REF_05177>	refs/heads/fix/user-self-update-allowlist
<PRIVATE_REF_05794>	refs/heads/flask-2.0-upgrade
<PRIVATE_REF_04008>	refs/heads/ghcr-docker-workflow
<PRIVATE_REF_04140>	refs/heads/github-teams
<PRIVATE_REF_05755>	refs/heads/grafana-webhook-alert-rule-tags
<PRIVATE_REF_04230>	refs/heads/heartbeat-alert
<PRIVATE_REF_05656>	refs/heads/heartbeat-alerts
<PRIVATE_REF_05662>	refs/heads/hide-alerts-fields
<PRIVATE_REF_04225>	refs/heads/hide-server-version-info
<PRIVATE_REF_05433>	refs/heads/history-text
<PRIVATE_REF_04553>	refs/heads/hk-delete-hours-config
<PRIVATE_REF_05179>	refs/heads/hk-zero-threshold
<PRIVATE_REF_05591>	refs/heads/hmac-auth
<PRIVATE_REF_05943>	refs/heads/integration-test-saml2
<PRIVATE_REF_04253>	refs/heads/invalid-scope-check
<PRIVATE_REF_05480>	refs/heads/invalid-token-response
<PRIVATE_REF_04898>	refs/heads/issue-blackouts-notify-true
<PRIVATE_REF_05649>	refs/heads/ldap-bind-password-envvar
<PRIVATE_REF_04581>	refs/heads/ldap-bind-user-groups
<PRIVATE_REF_04187>	refs/heads/ldap-config-options
<PRIVATE_REF_05901>	refs/heads/ldap-groups
<PRIVATE_REF_04191>	refs/heads/ldap-groups-allowed
<PRIVATE_REF_04837>	refs/heads/ldap-login-search
<PRIVATE_REF_05548>	refs/heads/ldap-role-group-lookup
<PRIVATE_REF_04769>	refs/heads/list-valid-severities
<PRIVATE_REF_05515>	refs/heads/makefile
<PRIVATE_REF_01617>	refs/heads/master
<PRIVATE_REF_05418>	refs/heads/migrate-to-openid-1
<PRIVATE_REF_05253>	refs/heads/mongo-deprecated-update
<PRIVATE_REF_05265>	refs/heads/mongodb-count-documents
<PRIVATE_REF_05307>	refs/heads/mongodb-seedlist
<PRIVATE_REF_05069>	refs/heads/mongodb-topn-reports-allowDiskUse
<PRIVATE_REF_05106>	refs/heads/more-lifecycle-hooks
<PRIVATE_REF_05769>	refs/heads/multiple-auth-providers
<PRIVATE_REF_04676>	refs/heads/multiple-auth-providers-2
<PRIVATE_REF_04789>	refs/heads/notes-crud
<PRIVATE_REF_04372>	refs/heads/oauth2-logout-from-idp
<PRIVATE_REF_05751>	refs/heads/oidc-client-secret-basic
<PRIVATE_REF_04722>	refs/heads/oidc-link-users-by-email
<PRIVATE_REF_05674>	refs/heads/only-open-expired-alerts
<PRIVATE_REF_04574>	refs/heads/openapi-v3
<PRIVATE_REF_04019>	refs/heads/openid-env-vars
<PRIVATE_REF_04074>	refs/heads/openid-verify-id-token
<PRIVATE_REF_05918>	refs/heads/optional-postgres-backend
<PRIVATE_REF_05960>	refs/heads/paginate-collection-responses
<PRIVATE_REF_04185>	refs/heads/pg-user-email-nullable
<PRIVATE_REF_04158>	refs/heads/plugin-acked-by
<PRIVATE_REF_05963>	refs/heads/plugin-delete-hook
<PRIVATE_REF_05585>	refs/heads/plugin-invalid-action
<PRIVATE_REF_05286>	refs/heads/plugins-pass-timeout
<PRIVATE_REF_04504>	refs/heads/postgres-9.6-schema
<PRIVATE_REF_05697>	refs/heads/postgres-add-column-if-not-exists
<PRIVATE_REF_05300>	refs/heads/pr-1899
<PRIVATE_REF_04326>	refs/heads/priority-plugin
<PRIVATE_REF_04065>	refs/heads/process-housekeeping
<PRIVATE_REF_04447>	refs/heads/proxy-auth
<PRIVATE_REF_05138>	refs/heads/pymongo-install-requires
<PRIVATE_REF_05206>	refs/heads/pytest-deprecation-warnings
<PRIVATE_REF_04226>	refs/heads/python-3.5-eol
<PRIVATE_REF_04232>	refs/heads/python-3.8
<PRIVATE_REF_05869>	refs/heads/python-requirements
<PRIVATE_REF_04941>	refs/heads/query-builders
<PRIVATE_REF_04021>	refs/heads/query-parser-boolean-tests
<PRIVATE_REF_04608>	refs/heads/read-config-envvars
<PRIVATE_REF_04841>	refs/heads/refactor-auth-register
<PRIVATE_REF_04413>	refs/heads/refactor-config
<PRIVATE_REF_04236>	refs/heads/refactor-ldap
<PRIVATE_REF_03999>	refs/heads/refactor-ldap-auth
<PRIVATE_REF_05956>	refs/heads/refactor-model-properties
<PRIVATE_REF_04385>	refs/heads/refactor-notes
<PRIVATE_REF_05866>	refs/heads/refactor-openid
<PRIVATE_REF_04493>	refs/heads/release-1.2
<PRIVATE_REF_05594>	refs/heads/release-4.10
<PRIVATE_REF_05582>	refs/heads/release-4.10.x
<PRIVATE_REF_05338>	refs/heads/release-5-alpha2
<PRIVATE_REF_04716>	refs/heads/release-5-beta1
<PRIVATE_REF_05895>	refs/heads/release-5-rc1
<PRIVATE_REF_05290>	refs/heads/release-5-rc3
<PRIVATE_REF_05889>	refs/heads/release-5.0
<PRIVATE_REF_03993>	refs/heads/release-6.1
<PRIVATE_REF_05877>	refs/heads/release-pipeline
<PRIVATE_REF_03753>	refs/heads/release/1.0
<PRIVATE_REF_04495>	refs/heads/release/2.0
<PRIVATE_REF_05070>	refs/heads/release/2.1
<PRIVATE_REF_05500>	refs/heads/release/3.0
<PRIVATE_REF_03783>	refs/heads/release/3.1
<PRIVATE_REF_04709>	refs/heads/release/3.2
<PRIVATE_REF_04659>	refs/heads/release/3.3
<PRIVATE_REF_04117>	refs/heads/release/4.0
<PRIVATE_REF_05305>	refs/heads/release/4.10
<PRIVATE_REF_04244>	refs/heads/release/4.4
<PRIVATE_REF_04321>	refs/heads/release/4.6
<PRIVATE_REF_05727>	refs/heads/release/4.7
<PRIVATE_REF_05010>	refs/heads/release/4.8
<PRIVATE_REF_05367>	refs/heads/release/4.9
<PRIVATE_REF_05889>	refs/heads/release/5.0
<PRIVATE_REF_05596>	refs/heads/release/5.2
<PRIVATE_REF_05596>	refs/heads/release/6.0
<PRIVATE_REF_03993>	refs/heads/release/6.1
<PRIVATE_REF_05222>	refs/heads/release/6.8
<PRIVATE_REF_05578>	refs/heads/release/7.5
<PRIVATE_REF_05250>	refs/heads/release/8.6
<PRIVATE_REF_04865>	refs/heads/release/8.7
<PRIVATE_REF_05568>	refs/heads/release/9.0
<PRIVATE_REF_04511>	refs/heads/release/9.1
<PRIVATE_REF_05504>	refs/heads/remote-ip-plugin
<PRIVATE_REF_05473>	refs/heads/remove-deprecation-warning
<PRIVATE_REF_04732>	refs/heads/remove-hardcoded-provider
<PRIVATE_REF_05557>	refs/heads/remove-pg-warning
<PRIVATE_REF_05382>	refs/heads/requirements-mar-2021
<PRIVATE_REF_05439>	refs/heads/restore-old-wsgi-file
<PRIVATE_REF_04216>	refs/heads/return-resource-on-update
<PRIVATE_REF_04799>	refs/heads/revert-1665-paginate-environments
<PRIVATE_REF_05187>	refs/heads/routing-plugin
<PRIVATE_REF_04513>	refs/heads/routing-plugin-config
<PRIVATE_REF_05259>	refs/heads/routing-rules-test
<PRIVATE_REF_05317>	refs/heads/saml-auth
<PRIVATE_REF_04582>	refs/heads/saml2-customer-by-groups
<PRIVATE_REF_04847>	refs/heads/scoped-admin-keys
<PRIVATE_REF_05574>	refs/heads/severity-config-exception
<PRIVATE_REF_04346>	refs/heads/severity-status-enums
<PRIVATE_REF_05255>	refs/heads/sort-by-severity
<PRIVATE_REF_04607>	refs/heads/status-change-hook
<PRIVATE_REF_04969>	refs/heads/status-colors
<PRIVATE_REF_05847>	refs/heads/status-indicators
<PRIVATE_REF_05018>	refs/heads/support-custom-top10-report-sizes
<PRIVATE_REF_04881>	refs/heads/support-request-id
<PRIVATE_REF_04871>	refs/heads/syslog-formatter
<PRIVATE_REF_04997>	refs/heads/test-add-remove-tags-plugins
<PRIVATE_REF_04088>	refs/heads/test-aggregations
<PRIVATE_REF_05413>	refs/heads/test-audit-logs
<PRIVATE_REF_05460>	refs/heads/test-auth-providers
<PRIVATE_REF_05554>	refs/heads/test-builtin-plugins
<PRIVATE_REF_05828>	refs/heads/test-hooks
<PRIVATE_REF_04564>	refs/heads/test-ldap
<PRIVATE_REF_05863>	refs/heads/test-microsoft-cosmosdb
<PRIVATE_REF_05909>	refs/heads/test-postgres10
<PRIVATE_REF_03991>	refs/heads/test-postgres11
<PRIVATE_REF_04888>	refs/heads/test-postgresql-12
<PRIVATE_REF_05954>	refs/heads/test-prometheus-webhook
<PRIVATE_REF_05420>	refs/heads/test-timeout
<PRIVATE_REF_05046>	refs/heads/test-v6.8.3
<PRIVATE_REF_05440>	refs/heads/test-zabbix-event-blackout
<PRIVATE_REF_04580>	refs/heads/tidy-up-auth
<PRIVATE_REF_04198>	refs/heads/tox-tests
<PRIVATE_REF_04818>	refs/heads/update-github-auth
<PRIVATE_REF_05003>	refs/heads/update-grafana-webhook
<PRIVATE_REF_05710>	refs/heads/update-heartbeat-plugin
<PRIVATE_REF_04527>	refs/heads/update-service
<PRIVATE_REF_04693>	refs/heads/use-oid-for-user-id
<PRIVATE_REF_04097>	refs/heads/use-openid-when-possible
<PRIVATE_REF_05345>	refs/heads/user-defined-admin-roles
<PRIVATE_REF_05712>	refs/heads/user-defined-api-key
<PRIVATE_REF_04418>	refs/heads/user-group-count-and-lookup
<PRIVATE_REF_04656>	refs/heads/user-groups
<PRIVATE_REF_05641>	refs/heads/user-login
<PRIVATE_REF_05205>	refs/heads/user-login-not-null
<PRIVATE_REF_05027>	refs/heads/version-bump
<PRIVATE_REF_05783>	refs/heads/webhook-default-environment
<PRIVATE_REF_05224>	refs/heads/webhook-subpath
<PRIVATE_REF_04642>	refs/heads/webhooks-default-normal-severity
<PRIVATE_REF_04985>	refs/tags/v9.0.0
<PRIVATE_REF_04644>	refs/tags/v9.0.0^{}
<PRIVATE_REF_05514>	refs/tags/v9.0.1
<PRIVATE_REF_04811>	refs/tags/v9.0.1^{}
<PRIVATE_REF_05692>	refs/tags/v9.0.2
<PRIVATE_REF_04251>	refs/tags/v9.0.2^{}
<PRIVATE_REF_05421>	refs/tags/v9.0.3
<PRIVATE_REF_04082>	refs/tags/v9.0.3^{}
<PRIVATE_REF_05547>	refs/tags/v9.0.4
<PRIVATE_REF_05380>	refs/tags/v9.0.4^{}
<PRIVATE_REF_05818>	refs/tags/v9.1.0
<PRIVATE_REF_05887>	refs/tags/v9.1.0^{}
- stderr: `raw/003_lsremote_alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 004 — frozen_backend_tags
- start: 2026-10-01T03:16:11Z · end: 2026-10-01T03:16:11Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend for-each-ref --format=%\(objectname\)\ %\(refname\)\ %\(\*objectname\) refs/tags/v9\*`
- stdout: `raw/004_frozen_backend_tags.out` sha256 `<PRIVATE_REF_05527>` · redacted lines: 0
<PRIVATE_REF_04985> refs/tags/v9.0.0 <PRIVATE_REF_04644>
<PRIVATE_REF_05514> refs/tags/v9.0.1 <PRIVATE_REF_04811>
<PRIVATE_REF_05692> refs/tags/v9.0.2 <PRIVATE_REF_04251>
<PRIVATE_REF_05421> refs/tags/v9.0.3 <PRIVATE_REF_04082>
<PRIVATE_REF_05547> refs/tags/v9.0.4 <PRIVATE_REF_05380>
<PRIVATE_REF_05818> refs/tags/v9.1.0 <PRIVATE_REF_05887>
- stderr: `raw/004_frozen_backend_tags.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 005 — gh_api_org_repos_p1
- start: 2026-10-01T03:16:24Z · end: 2026-10-01T03:16:25Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/orgs_alerta_repos_p1.hdr -o docs/api.github.com/orgs_alerta_repos_p1.json https://api.github.com/orgs/alerta/repos\?per_page=100\&page=1\&type=public`
- stdout: `raw/005_gh_api_org_repos_p1.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/005_gh_api_org_repos_p1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 006 — gh_api_org_repos_p2
- start: 2026-10-01T03:16:25Z · end: 2026-10-01T03:16:25Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/orgs_alerta_repos_p2.hdr -o docs/api.github.com/orgs_alerta_repos_p2.json https://api.github.com/orgs/alerta/repos\?per_page=100\&page=2\&type=public`
- stdout: `raw/006_gh_api_org_repos_p2.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/006_gh_api_org_repos_p2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 007 — lsremote_python-alerta-client
- start: 2026-10-01T03:16:37Z · end: 2026-10-01T03:16:38Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false ls-remote --symref https://github.com/alerta/python-alerta-client.git HEAD refs/heads/master refs/heads/main refs/tags/\*`
- stdout: `raw/007_lsremote_python-alerta-client.out` sha256 `<PRIVATE_REF_04633>` · redacted lines: 0
ref: refs/heads/master	HEAD
<PRIVATE_REF_04519>	HEAD
<PRIVATE_REF_04519>	refs/heads/master
<PRIVATE_REF_04787>	refs/tags/3.0.7
<PRIVATE_REF_04217>	refs/tags/3.0.7^{}
<PRIVATE_REF_05587>	refs/tags/v
<PRIVATE_REF_05747>	refs/tags/v^{}
<PRIVATE_REF_04556>	refs/tags/v3.0.5
<PRIVATE_REF_04993>	refs/tags/v3.0.5^{}
<PRIVATE_REF_05524>	refs/tags/v4.10.5
<PRIVATE_REF_04641>	refs/tags/v4.10.5^{}
<PRIVATE_REF_05415>	refs/tags/v5.0.0
<PRIVATE_REF_05549>	refs/tags/v5.0.0^{}
<PRIVATE_REF_05383>	refs/tags/v5.0.0-beta1
<PRIVATE_REF_05044>	refs/tags/v5.0.0-beta1^{}
<PRIVATE_REF_05214>	refs/tags/v5.0.1
<PRIVATE_REF_05466>	refs/tags/v5.0.1^{}
<PRIVATE_REF_04920>	refs/tags/v5.0.10
<PRIVATE_REF_04835>	refs/tags/v5.0.10^{}
<PRIVATE_REF_04474>	refs/tags/v5.0.11
<PRIVATE_REF_05950>	refs/tags/v5.0.11^{}
<PRIVATE_REF_05586>	refs/tags/v5.0.12
<PRIVATE_REF_04400>	refs/tags/v5.0.12^{}
<PRIVATE_REF_05372>	refs/tags/v5.0.2
<PRIVATE_REF_04050>	refs/tags/v5.0.2^{}
<PRIVATE_REF_04309>	refs/tags/v5.0.3
<PRIVATE_REF_05112>	refs/tags/v5.0.3^{}
<PRIVATE_REF_04358>	refs/tags/v5.0.4
<PRIVATE_REF_03980>	refs/tags/v5.0.4^{}
<PRIVATE_REF_04320>	refs/tags/v5.0.5
<PRIVATE_REF_05430>	refs/tags/v5.0.5^{}
<PRIVATE_REF_04084>	refs/tags/v5.0.6
<PRIVATE_REF_05429>	refs/tags/v5.0.6^{}
<PRIVATE_REF_05122>	refs/tags/v5.0.7
<PRIVATE_REF_05813>	refs/tags/v5.0.7^{}
<PRIVATE_REF_04182>	refs/tags/v5.0.9
<PRIVATE_REF_05978>	refs/tags/v5.0.9^{}
<PRIVATE_REF_04657>	refs/tags/v5.1.0
<PRIVATE_REF_05481>	refs/tags/v5.1.0^{}
<PRIVATE_REF_05045>	refs/tags/v5.2.0
<PRIVATE_REF_04211>	refs/tags/v5.2.0^{}
<PRIVATE_REF_04516>	refs/tags/v5.2.1
<PRIVATE_REF_05747>	refs/tags/v5.2.1^{}
<PRIVATE_REF_04472>	refs/tags/v6.0.0
<PRIVATE_REF_05938>	refs/tags/v6.0.0^{}
<PRIVATE_REF_05125>	refs/tags/v6.2.0
<PRIVATE_REF_04777>	refs/tags/v6.2.0^{}
<PRIVATE_REF_04162>	refs/tags/v6.3.0
<PRIVATE_REF_05140>	refs/tags/v6.3.0^{}
<PRIVATE_REF_04792>	refs/tags/v6.3.1
<PRIVATE_REF_04896>	refs/tags/v6.3.1^{}
<PRIVATE_REF_04803>	refs/tags/v6.4.0
<PRIVATE_REF_05753>	refs/tags/v6.4.0^{}
<PRIVATE_REF_04699>	refs/tags/v6.5.0
<PRIVATE_REF_04853>	refs/tags/v6.5.0^{}
<PRIVATE_REF_04991>	refs/tags/v6.8.0
<PRIVATE_REF_05203>	refs/tags/v6.8.0^{}
<PRIVATE_REF_04364>	refs/tags/v6.8.1
<PRIVATE_REF_04899>	refs/tags/v6.8.1^{}
<PRIVATE_REF_04078>	refs/tags/v7.2.0
<PRIVATE_REF_04840>	refs/tags/v7.2.0^{}
<PRIVATE_REF_05400>	refs/tags/v7.2.1
<PRIVATE_REF_05276>	refs/tags/v7.2.1^{}
<PRIVATE_REF_05346>	refs/tags/v7.2.2
<PRIVATE_REF_05264>	refs/tags/v7.2.2^{}
<PRIVATE_REF_04237>	refs/tags/v7.3.0
<PRIVATE_REF_04116>	refs/tags/v7.3.0^{}
<PRIVATE_REF_05629>	refs/tags/v7.4.0
<PRIVATE_REF_05579>	refs/tags/v7.4.0^{}
<PRIVATE_REF_04098>	refs/tags/v7.4.4
<PRIVATE_REF_05202>	refs/tags/v7.4.4^{}
<PRIVATE_REF_04816>	refs/tags/v7.4.5
<PRIVATE_REF_05798>	refs/tags/v7.4.5^{}
<PRIVATE_REF_05819>	refs/tags/v7.5.0
<PRIVATE_REF_03770>	refs/tags/v7.5.0^{}
<PRIVATE_REF_05237>	refs/tags/v7.5.1
<PRIVATE_REF_03987>	refs/tags/v7.5.1^{}
<PRIVATE_REF_05174>	refs/tags/v7.5.6
<PRIVATE_REF_05032>	refs/tags/v7.5.6^{}
<PRIVATE_REF_04532>	refs/tags/v7.5.7
<PRIVATE_REF_05800>	refs/tags/v7.5.7^{}
<PRIVATE_REF_05246>	refs/tags/v8.0.0
<PRIVATE_REF_04620>	refs/tags/v8.0.0^{}
<PRIVATE_REF_05550>	refs/tags/v8.2.0
<PRIVATE_REF_04830>	refs/tags/v8.2.0^{}
<PRIVATE_REF_03988>	refs/tags/v8.3.0
<PRIVATE_REF_04408>	refs/tags/v8.3.0^{}
<PRIVATE_REF_05666>	refs/tags/v8.4.0
<PRIVATE_REF_04890>	refs/tags/v8.4.0^{}
<PRIVATE_REF_05810>	refs/tags/v8.5.0
<PRIVATE_REF_04124>	refs/tags/v8.5.0^{}
<PRIVATE_REF_04403>	refs/tags/v8.5.1
<PRIVATE_REF_05228>	refs/tags/v8.5.1^{}
<PRIVATE_REF_04033>	refs/tags/v8.5.2
<PRIVATE_REF_04228>	refs/tags/v8.5.2^{}
<PRIVATE_REF_04461>	refs/tags/v8.5.3
<PRIVATE_REF_05329>	refs/tags/v8.5.3^{}
- stderr: `raw/007_lsremote_python-alerta-client.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 008 — lsremote_docker-alerta
- start: 2026-10-01T03:16:38Z · end: 2026-10-01T03:16:39Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false ls-remote --symref https://github.com/alerta/docker-alerta.git HEAD refs/heads/master refs/heads/main refs/tags/\*`
- stdout: `raw/008_lsremote_docker-alerta.out` sha256 `<PRIVATE_REF_05618>` · redacted lines: 0
ref: refs/heads/master	HEAD
<PRIVATE_REF_05335>	HEAD
<PRIVATE_REF_05335>	refs/heads/master
<PRIVATE_REF_04032>	refs/tags/v5.0.9
<PRIVATE_REF_04212>	refs/tags/v5.0.9^{}
<PRIVATE_REF_05474>	refs/tags/v5.1.0
<PRIVATE_REF_04647>	refs/tags/v5.1.0^{}
<PRIVATE_REF_05231>	refs/tags/v5.1.1
<PRIVATE_REF_04696>	refs/tags/v5.1.1^{}
<PRIVATE_REF_05862>	refs/tags/v5.2.0
<PRIVATE_REF_05288>	refs/tags/v5.2.0^{}
<PRIVATE_REF_04910>	refs/tags/v5.2.4
<PRIVATE_REF_04181>	refs/tags/v5.2.4^{}
<PRIVATE_REF_04460>	refs/tags/v5.2.5
<PRIVATE_REF_05976>	refs/tags/v5.2.5^{}
<PRIVATE_REF_04902>	refs/tags/v5.2.6
<PRIVATE_REF_05188>	refs/tags/v5.2.6^{}
<PRIVATE_REF_05807>	refs/tags/v5.2.7
<PRIVATE_REF_04677>	refs/tags/v5.2.7^{}
<PRIVATE_REF_04478>	refs/tags/v5.2.8
<PRIVATE_REF_05737>	refs/tags/v5.2.8^{}
<PRIVATE_REF_04876>	refs/tags/v5.2.9
<PRIVATE_REF_04809>	refs/tags/v5.2.9^{}
<PRIVATE_REF_05052>	refs/tags/v6.0.0
<PRIVATE_REF_03781>	refs/tags/v6.0.0^{}
<PRIVATE_REF_05104>	refs/tags/v6.0.1
<PRIVATE_REF_04194>	refs/tags/v6.0.1^{}
<PRIVATE_REF_04571>	refs/tags/v6.1.0
<PRIVATE_REF_05013>	refs/tags/v6.1.0^{}
<PRIVATE_REF_05342>	refs/tags/v6.2.0
<PRIVATE_REF_04654>	refs/tags/v6.2.0^{}
<PRIVATE_REF_05077>	refs/tags/v6.2.1
<PRIVATE_REF_04305>	refs/tags/v6.2.1^{}
<PRIVATE_REF_04849>	refs/tags/v6.3.0
<PRIVATE_REF_05375>	refs/tags/v6.3.0^{}
<PRIVATE_REF_05566>	refs/tags/v6.3.1
<PRIVATE_REF_04708>	refs/tags/v6.3.1^{}
<PRIVATE_REF_04095>	refs/tags/v6.3.2
<PRIVATE_REF_05238>	refs/tags/v6.3.2^{}
<PRIVATE_REF_05778>	refs/tags/v6.4.0
<PRIVATE_REF_05677>	refs/tags/v6.4.0^{}
<PRIVATE_REF_04118>	refs/tags/v6.5.0
<PRIVATE_REF_05897>	refs/tags/v6.5.0^{}
<PRIVATE_REF_04003>	refs/tags/v6.6.0
<PRIVATE_REF_05696>	refs/tags/v6.6.0^{}
<PRIVATE_REF_04623>	refs/tags/v6.6.1
<PRIVATE_REF_04639>	refs/tags/v6.6.1^{}
<PRIVATE_REF_05334>	refs/tags/v6.7.0
<PRIVATE_REF_05389>	refs/tags/v6.7.0^{}
<PRIVATE_REF_05671>	refs/tags/v6.7.1
<PRIVATE_REF_05953>	refs/tags/v6.7.1^{}
<PRIVATE_REF_05965>	refs/tags/v6.7.2
<PRIVATE_REF_04111>	refs/tags/v6.7.2^{}
<PRIVATE_REF_05545>	refs/tags/v6.7.3
<PRIVATE_REF_04468>	refs/tags/v6.7.3^{}
<PRIVATE_REF_05849>	refs/tags/v6.7.4
<PRIVATE_REF_05900>	refs/tags/v6.7.4^{}
<PRIVATE_REF_05795>	refs/tags/v6.7.5
<PRIVATE_REF_05323>	refs/tags/v6.7.5^{}
<PRIVATE_REF_05411>	refs/tags/v6.8.0
<PRIVATE_REF_04352>	refs/tags/v6.8.0^{}
<PRIVATE_REF_05664>	refs/tags/v6.8.1
<PRIVATE_REF_04034>	refs/tags/v6.8.1^{}
<PRIVATE_REF_05359>	refs/tags/v6.8.2
<PRIVATE_REF_05502>	refs/tags/v6.8.2^{}
<PRIVATE_REF_05498>	refs/tags/v6.8.3
<PRIVATE_REF_05564>	refs/tags/v6.8.3^{}
<PRIVATE_REF_05154>	refs/tags/v6.8.4
<PRIVATE_REF_04061>	refs/tags/v6.8.4^{}
<PRIVATE_REF_05668>	refs/tags/v6.8.5
<PRIVATE_REF_04063>	refs/tags/v6.8.5^{}
<PRIVATE_REF_04281>	refs/tags/v7.0.0
<PRIVATE_REF_05162>	refs/tags/v7.0.0^{}
<PRIVATE_REF_04565>	refs/tags/v7.0.1
<PRIVATE_REF_04517>	refs/tags/v7.0.1^{}
<PRIVATE_REF_04007>	refs/tags/v7.1.0
<PRIVATE_REF_04293>	refs/tags/v7.1.0^{}
<PRIVATE_REF_05048>	refs/tags/v7.2.0
<PRIVATE_REF_04850>	refs/tags/v7.2.0^{}
<PRIVATE_REF_05508>	refs/tags/v7.2.1
<PRIVATE_REF_05110>	refs/tags/v7.2.1^{}
<PRIVATE_REF_04606>	refs/tags/v7.2.10
<PRIVATE_REF_04377>	refs/tags/v7.2.10^{}
<PRIVATE_REF_04794>	refs/tags/v7.2.11
<PRIVATE_REF_05927>	refs/tags/v7.2.11^{}
<PRIVATE_REF_05041>	refs/tags/v7.2.2
<PRIVATE_REF_05573>	refs/tags/v7.2.2^{}
<PRIVATE_REF_05308>	refs/tags/v7.2.3
<PRIVATE_REF_04422>	refs/tags/v7.2.3^{}
<PRIVATE_REF_05417>	refs/tags/v7.2.4
<PRIVATE_REF_04905>	refs/tags/v7.2.4^{}
<PRIVATE_REF_05934>	refs/tags/v7.2.5
<PRIVATE_REF_04692>	refs/tags/v7.2.5^{}
<PRIVATE_REF_05035>	refs/tags/v7.2.6
<PRIVATE_REF_04987>	refs/tags/v7.2.6^{}
<PRIVATE_REF_04213>	refs/tags/v7.2.7
<PRIVATE_REF_05114>	refs/tags/v7.2.7^{}
<PRIVATE_REF_04614>	refs/tags/v7.2.8
<PRIVATE_REF_04429>	refs/tags/v7.2.8^{}
<PRIVATE_REF_05407>	refs/tags/v7.2.9
<PRIVATE_REF_04919>	refs/tags/v7.2.9^{}
<PRIVATE_REF_05348>	refs/tags/v7.3.0
<PRIVATE_REF_04399>	refs/tags/v7.3.0^{}
<PRIVATE_REF_04438>	refs/tags/v7.3.1
<PRIVATE_REF_05555>	refs/tags/v7.3.1^{}
<PRIVATE_REF_05071>	refs/tags/v7.3.2
<PRIVATE_REF_05168>	refs/tags/v7.3.2^{}
<PRIVATE_REF_05416>	refs/tags/v7.4.0
<PRIVATE_REF_04604>	refs/tags/v7.4.0^{}
<PRIVATE_REF_05043>	refs/tags/v7.4.1
<PRIVATE_REF_03771>	refs/tags/v7.4.1^{}
<PRIVATE_REF_04953>	refs/tags/v7.4.4
<PRIVATE_REF_05720>	refs/tags/v7.4.4^{}
<PRIVATE_REF_04100>	refs/tags/v7.4.5
<PRIVATE_REF_04594>	refs/tags/v7.4.5^{}
<PRIVATE_REF_05806>	refs/tags/v7.5.1
<PRIVATE_REF_05945>	refs/tags/v7.5.1^{}
<PRIVATE_REF_04759>	refs/tags/v7.5.2
<PRIVATE_REF_05815>	refs/tags/v7.5.2^{}
<PRIVATE_REF_05109>	refs/tags/v7.5.3
<PRIVATE_REF_05067>	refs/tags/v7.5.3^{}
<PRIVATE_REF_05848>	refs/tags/v7.5.4
<PRIVATE_REF_04144>	refs/tags/v7.5.4^{}
<PRIVATE_REF_04068>	refs/tags/v7.5.5
<PRIVATE_REF_05942>	refs/tags/v7.5.5^{}
<PRIVATE_REF_04186>	refs/tags/v7.5.6
<PRIVATE_REF_05796>	refs/tags/v7.5.6^{}
<PRIVATE_REF_04590>	refs/tags/v7.5.7
<PRIVATE_REF_05738>	refs/tags/v7.5.7^{}
<PRIVATE_REF_04542>	refs/tags/v8.0.0
<PRIVATE_REF_04048>	refs/tags/v8.0.0^{}
<PRIVATE_REF_04414>	refs/tags/v8.0.1
<PRIVATE_REF_05000>	refs/tags/v8.0.1^{}
<PRIVATE_REF_05139>	refs/tags/v8.0.2
<PRIVATE_REF_05296>	refs/tags/v8.0.2^{}
<PRIVATE_REF_04689>	refs/tags/v8.0.3
<PRIVATE_REF_05510>	refs/tags/v8.0.3^{}
<PRIVATE_REF_03789>	refs/tags/v8.1.0
<PRIVATE_REF_04678>	refs/tags/v8.1.0^{}
<PRIVATE_REF_04004>	refs/tags/v8.2.0
<PRIVATE_REF_05186>	refs/tags/v8.2.0^{}
<PRIVATE_REF_05116>	refs/tags/v8.3.0
<PRIVATE_REF_05705>	refs/tags/v8.3.0^{}
<PRIVATE_REF_05966>	refs/tags/v8.3.1
<PRIVATE_REF_04313>	refs/tags/v8.3.1^{}
<PRIVATE_REF_05461>	refs/tags/v8.3.2
<PRIVATE_REF_05036>	refs/tags/v8.3.2^{}
<PRIVATE_REF_05362>	refs/tags/v8.4.0
<PRIVATE_REF_03990>	refs/tags/v8.4.0^{}
<PRIVATE_REF_05051>	refs/tags/v8.4.1
<PRIVATE_REF_05403>	refs/tags/v8.4.1^{}
<PRIVATE_REF_05302>	refs/tags/v8.5.0
<PRIVATE_REF_05244>	refs/tags/v8.5.0^{}
<PRIVATE_REF_04347>	refs/tags/v8.6.2
<PRIVATE_REF_04018>	refs/tags/v8.6.2^{}
<PRIVATE_REF_05310>	refs/tags/v8.6.3
<PRIVATE_REF_05282>	refs/tags/v8.6.3^{}
<PRIVATE_REF_05462>	refs/tags/v8.6.4
<PRIVATE_REF_04229>	refs/tags/v8.6.4^{}
<PRIVATE_REF_04035>	refs/tags/v8.6.5
<PRIVATE_REF_04640>	refs/tags/v8.6.5^{}
<PRIVATE_REF_04723>	refs/tags/v8.7.0
<PRIVATE_REF_05442>	refs/tags/v8.7.0^{}
<PRIVATE_REF_04404>	refs/tags/v9.0.0
<PRIVATE_REF_04424>	refs/tags/v9.0.0^{}
<PRIVATE_REF_05509>	refs/tags/v9.0.1
<PRIVATE_REF_04357>	refs/tags/v9.0.1^{}
<PRIVATE_REF_05121>	refs/tags/v9.0.2
<PRIVATE_REF_04992>	refs/tags/v9.0.2^{}
<PRIVATE_REF_04855>	refs/tags/v9.0.3
<PRIVATE_REF_05015>	refs/tags/v9.0.3^{}
<PRIVATE_REF_04675>	refs/tags/v9.0.4
<PRIVATE_REF_05614>	refs/tags/v9.0.4^{}
<PRIVATE_REF_05621>	refs/tags/v9.1.0
<PRIVATE_REF_05519>	refs/tags/v9.1.0^{}
- stderr: `raw/008_lsremote_docker-alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 009 — lsremote_alerta-contrib
- start: 2026-10-01T03:16:39Z · end: 2026-10-01T03:16:39Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false ls-remote --symref https://github.com/alerta/alerta-contrib.git HEAD refs/heads/master refs/heads/main refs/tags/\*`
- stdout: `raw/009_lsremote_alerta-contrib.out` sha256 `<PRIVATE_REF_05068>` · redacted lines: 0
ref: refs/heads/master	HEAD
<PRIVATE_REF_03984>	HEAD
<PRIVATE_REF_03984>	refs/heads/master
- stderr: `raw/009_lsremote_alerta-contrib.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 010 — lsremote_alerta-docs
- start: 2026-10-01T03:16:39Z · end: 2026-10-01T03:16:40Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false ls-remote --symref https://github.com/alerta/alerta-docs.git HEAD refs/heads/master refs/heads/main refs/tags/\*`
- stdout: `raw/010_lsremote_alerta-docs.out` sha256 `<PRIVATE_REF_04592>` · redacted lines: 0
ref: refs/heads/master	HEAD
<PRIVATE_REF_05236>	HEAD
<PRIVATE_REF_05236>	refs/heads/master
<PRIVATE_REF_04416>	refs/tags/v8.2.0
<PRIVATE_REF_05260>	refs/tags/v8.2.0^{}
<PRIVATE_REF_05874>	refs/tags/v8.2.1
<PRIVATE_REF_04651>	refs/tags/v8.2.1^{}
<PRIVATE_REF_05014>	refs/tags/v8.2.10
<PRIVATE_REF_05812>	refs/tags/v8.2.10^{}
<PRIVATE_REF_05625>	refs/tags/v8.2.2
<PRIVATE_REF_05837>	refs/tags/v8.2.2^{}
<PRIVATE_REF_03791>	refs/tags/v8.2.3
<PRIVATE_REF_04171>	refs/tags/v8.2.3^{}
<PRIVATE_REF_05896>	refs/tags/v8.2.4
<PRIVATE_REF_04343>	refs/tags/v8.2.4^{}
<PRIVATE_REF_03797>	refs/tags/v8.2.5
<PRIVATE_REF_05646>	refs/tags/v8.2.5^{}
<PRIVATE_REF_05612>	refs/tags/v8.2.6
<PRIVATE_REF_05525>	refs/tags/v8.2.6^{}
<PRIVATE_REF_05766>	refs/tags/v8.2.7
<PRIVATE_REF_04585>	refs/tags/v8.2.7^{}
<PRIVATE_REF_04626>	refs/tags/v8.2.8
<PRIVATE_REF_04567>	refs/tags/v8.2.8^{}
<PRIVATE_REF_05229>	refs/tags/v8.2.9
<PRIVATE_REF_04776>	refs/tags/v8.2.9^{}
<PRIVATE_REF_04227>	refs/tags/v9.0.0-rc1
<PRIVATE_REF_05859>	refs/tags/v9.0.0-rc1^{}
<PRIVATE_REF_05844>	refs/tags/v9.0.0-rc10
<PRIVATE_REF_04206>	refs/tags/v9.0.0-rc10^{}
<PRIVATE_REF_04983>	refs/tags/v9.0.0-rc2
<PRIVATE_REF_05175>	refs/tags/v9.0.0-rc2^{}
<PRIVATE_REF_05947>	refs/tags/v9.0.0-rc4
<PRIVATE_REF_04698>	refs/tags/v9.0.0-rc4^{}
<PRIVATE_REF_04891>	refs/tags/v9.0.0-rc5
<PRIVATE_REF_05148>	refs/tags/v9.0.0-rc5^{}
<PRIVATE_REF_04273>	refs/tags/v9.0.0-rc6
<PRIVATE_REF_04988>	refs/tags/v9.0.0-rc6^{}
<PRIVATE_REF_04045>	refs/tags/v9.0.0-rc7
<PRIVATE_REF_04479>	refs/tags/v9.0.0-rc7^{}
<PRIVATE_REF_04862>	refs/tags/v9.0.0-rc8
<PRIVATE_REF_04906>	refs/tags/v9.0.0-rc8^{}
<PRIVATE_REF_05922>	refs/tags/v9.0.0-rc9
<PRIVATE_REF_05841>	refs/tags/v9.0.0-rc9^{}
<PRIVATE_REF_04636>	refs/tags/v9.1.0
- stderr: `raw/010_lsremote_alerta-docs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 011 — lsremote_alerta-webui
- start: 2026-10-01T03:16:40Z · end: 2026-10-01T03:16:41Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false ls-remote --symref https://github.com/alerta/alerta-webui.git HEAD refs/heads/master refs/heads/main refs/tags/\*`
- stdout: `raw/011_lsremote_alerta-webui.out` sha256 `<PRIVATE_REF_05292>` · redacted lines: 0
ref: refs/heads/master	HEAD
<PRIVATE_REF_03446>	HEAD
<PRIVATE_REF_03446>	refs/heads/master
<PRIVATE_REF_04940>	refs/tags/beta1
<PRIVATE_REF_04334>	refs/tags/beta1^{}
<PRIVATE_REF_04243>	refs/tags/beta2
<PRIVATE_REF_05401>	refs/tags/beta2^{}
<PRIVATE_REF_04119>	refs/tags/beta3
<PRIVATE_REF_05456>	refs/tags/beta3^{}
<PRIVATE_REF_04808>	refs/tags/v1-test
<PRIVATE_REF_04398>	refs/tags/v1-test^{}
<PRIVATE_REF_05135>	refs/tags/v7.0.0
<PRIVATE_REF_04086>	refs/tags/v7.0.0^{}
<PRIVATE_REF_04277>	refs/tags/v7.0.0-rc.1
<PRIVATE_REF_04836>	refs/tags/v7.0.0-rc.1^{}
<PRIVATE_REF_04108>	refs/tags/v7.0.0-rc.2
<PRIVATE_REF_05890>	refs/tags/v7.0.0-rc.2^{}
<PRIVATE_REF_04915>	refs/tags/v7.0.1
<PRIVATE_REF_05176>	refs/tags/v7.0.1^{}
<PRIVATE_REF_05540>	refs/tags/v7.1.0
<PRIVATE_REF_05936>	refs/tags/v7.1.0^{}
<PRIVATE_REF_04600>	refs/tags/v7.2.0
<PRIVATE_REF_05153>	refs/tags/v7.2.0^{}
<PRIVATE_REF_04981>	refs/tags/v7.2.1
<PRIVATE_REF_04340>	refs/tags/v7.2.1^{}
<PRIVATE_REF_05343>	refs/tags/v7.2.10
<PRIVATE_REF_04435>	refs/tags/v7.2.10^{}
<PRIVATE_REF_04793>	refs/tags/v7.2.11
<PRIVATE_REF_04631>	refs/tags/v7.2.11^{}
<PRIVATE_REF_05588>	refs/tags/v7.2.2
<PRIVATE_REF_05972>	refs/tags/v7.2.2^{}
<PRIVATE_REF_05939>	refs/tags/v7.2.3
<PRIVATE_REF_04142>	refs/tags/v7.2.3^{}
<PRIVATE_REF_04295>	refs/tags/v7.2.4
<PRIVATE_REF_05635>	refs/tags/v7.2.4^{}
<PRIVATE_REF_04798>	refs/tags/v7.2.5
<PRIVATE_REF_05275>	refs/tags/v7.2.5^{}
<PRIVATE_REF_04072>	refs/tags/v7.2.6
<PRIVATE_REF_05373>	refs/tags/v7.2.6^{}
<PRIVATE_REF_04135>	refs/tags/v7.2.7
<PRIVATE_REF_04199>	refs/tags/v7.2.7^{}
<PRIVATE_REF_05102>	refs/tags/v7.2.8
<PRIVATE_REF_04245>	refs/tags/v7.2.8^{}
<PRIVATE_REF_05572>	refs/tags/v7.2.9
<PRIVATE_REF_04684>	refs/tags/v7.2.9^{}
<PRIVATE_REF_04370>	refs/tags/v7.3.0
<PRIVATE_REF_05904>	refs/tags/v7.3.0^{}
<PRIVATE_REF_05096>	refs/tags/v7.3.1
<PRIVATE_REF_05167>	refs/tags/v7.3.1^{}
<PRIVATE_REF_05622>	refs/tags/v7.3.2
<PRIVATE_REF_05254>	refs/tags/v7.3.2^{}
<PRIVATE_REF_04754>	refs/tags/v7.4.0
<PRIVATE_REF_05957>	refs/tags/v7.4.0^{}
<PRIVATE_REF_04790>	refs/tags/v7.4.1
<PRIVATE_REF_04497>	refs/tags/v7.4.1^{}
<PRIVATE_REF_04302>	refs/tags/v7.4.2
<PRIVATE_REF_04011>	refs/tags/v7.4.2^{}
<PRIVATE_REF_04448>	refs/tags/v7.4.3
<PRIVATE_REF_04663>	refs/tags/v7.4.3^{}
<PRIVATE_REF_05880>	refs/tags/v7.4.4
<PRIVATE_REF_05242>	refs/tags/v7.4.4^{}
<PRIVATE_REF_05351>	refs/tags/v7.4.5
<PRIVATE_REF_05518>	refs/tags/v7.4.5^{}
<PRIVATE_REF_04173>	refs/tags/v7.5.0
<PRIVATE_REF_04886>	refs/tags/v7.5.0^{}
<PRIVATE_REF_05157>	refs/tags/v7.5.1
<PRIVATE_REF_05273>	refs/tags/v7.5.1^{}
<PRIVATE_REF_05513>	refs/tags/v7.5.6
<PRIVATE_REF_05595>	refs/tags/v7.5.6^{}
<PRIVATE_REF_04020>	refs/tags/v8.0.0
<PRIVATE_REF_05645>	refs/tags/v8.0.0^{}
<PRIVATE_REF_05673>	refs/tags/v8.0.1
<PRIVATE_REF_05004>	refs/tags/v8.0.1^{}
<PRIVATE_REF_04267>	refs/tags/v8.2.0
<PRIVATE_REF_04870>	refs/tags/v8.2.0^{}
<PRIVATE_REF_05730>	refs/tags/v8.3.0
<PRIVATE_REF_04307>	refs/tags/v8.3.0^{}
<PRIVATE_REF_04323>	refs/tags/v8.3.1
<PRIVATE_REF_05019>	refs/tags/v8.3.1^{}
<PRIVATE_REF_05486>	refs/tags/v8.3.2
<PRIVATE_REF_04563>	refs/tags/v8.3.2^{}
<PRIVATE_REF_05683>	refs/tags/v8.3.3
<PRIVATE_REF_05771>	refs/tags/v8.3.3^{}
<PRIVATE_REF_04860>	refs/tags/v8.4.0
<PRIVATE_REF_05923>	refs/tags/v8.4.0^{}
<PRIVATE_REF_04743>	refs/tags/v8.4.1
<PRIVATE_REF_05365>	refs/tags/v8.4.1^{}
<PRIVATE_REF_04549>	refs/tags/v8.5.0
<PRIVATE_REF_04970>	refs/tags/v8.5.0^{}
<PRIVATE_REF_05388>	refs/tags/v8.6.0
<PRIVATE_REF_05643>	refs/tags/v8.6.0^{}
<PRIVATE_REF_04966>	refs/tags/v8.6.1
<PRIVATE_REF_04973>	refs/tags/v8.6.1^{}
<PRIVATE_REF_05446>	refs/tags/v8.6.2
<PRIVATE_REF_05501>	refs/tags/v8.6.2^{}
<PRIVATE_REF_04349>	refs/tags/v8.7.0
<PRIVATE_REF_04488>	refs/tags/v8.7.0^{}
<PRIVATE_REF_05820>	refs/tags/v8.7.1
<PRIVATE_REF_04223>	refs/tags/v8.7.1^{}
- stderr: `raw/011_lsremote_alerta-webui.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 012 — lsremote_packer-templates
- start: 2026-10-01T03:16:41Z · end: 2026-10-01T03:16:41Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false ls-remote --symref https://github.com/alerta/packer-templates.git HEAD refs/heads/master refs/heads/main refs/tags/\*`
- stdout: `raw/012_lsremote_packer-templates.out` sha256 `<PRIVATE_REF_04610>` · redacted lines: 0
ref: refs/heads/master	HEAD
<PRIVATE_REF_04757>	HEAD
<PRIVATE_REF_04757>	refs/heads/master
- stderr: `raw/012_lsremote_packer-templates.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 013 — lsremote_vagrant-try-alerta
- start: 2026-10-01T03:16:41Z · end: 2026-10-01T03:16:42Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false ls-remote --symref https://github.com/alerta/vagrant-try-alerta.git HEAD refs/heads/master refs/heads/main refs/tags/\*`
- stdout: `raw/013_lsremote_vagrant-try-alerta.out` sha256 `<PRIVATE_REF_05799>` · redacted lines: 0
ref: refs/heads/master	HEAD
<PRIVATE_REF_05792>	HEAD
<PRIVATE_REF_05792>	refs/heads/master
- stderr: `raw/013_lsremote_vagrant-try-alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 014 — lsremote_angular-alerta-explorer
- start: 2026-10-01T03:16:42Z · end: 2026-10-01T03:16:43Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false ls-remote --symref https://github.com/alerta/angular-alerta-explorer.git HEAD refs/heads/master refs/heads/main refs/tags/\*`
- stdout: `raw/014_lsremote_angular-alerta-explorer.out` sha256 `<PRIVATE_REF_04622>` · redacted lines: 0
ref: refs/heads/master	HEAD
<PRIVATE_REF_05561>	HEAD
<PRIVATE_REF_05561>	refs/heads/master
- stderr: `raw/014_lsremote_angular-alerta-explorer.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 015 — init_alerta
- start: 2026-10-01T03:16:55Z · end: 2026-10-01T03:16:55Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false init -q --bare --template= sources/<ACCOUNT_EMAIL_009>`
- stdout: `raw/015_init_alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/015_init_alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 016 — fetch_alerta
- start: 2026-10-01T03:16:55Z · end: 2026-10-01T03:16:55Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> fetch --no-tags --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/alerta.git +4ac0106300cd428b26ad4b373cf4a78f55f6b542efs/pinned/master`
- stdout: `raw/016_fetch_alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/016_fetch_alerta.err` sha256 `<PRIVATE_REF_05493>` · redacted lines: 0
fatal: couldn't find remote ref 4ac0106300cd428b26ad4b373cf4a78f55f6b542efs/pinned/master

### 017 — tags_alerta
- start: 2026-10-01T03:16:55Z · end: 2026-10-01T03:16:57Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> fetch --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/alerta.git +refs/tags/\*:refs/tags/\*`
- stdout: `raw/017_tags_alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/017_tags_alerta.err` sha256 `<PRIVATE_REF_05570>` · redacted lines: 0
From https://github.com/alerta/alerta
 * [new tag]           latest        -> latest
 * [new tag]           v4.10.2       -> v4.10.2
 * [new tag]           v4.5.5        -> v4.5.5
 * [new tag]           v5.0.0        -> v5.0.0
 * [new tag]           v5.0.0-alpha1 -> v5.0.0-alpha1
 * [new tag]           v5.0.0-alpha2 -> v5.0.0-alpha2
 * [new tag]           v5.0.0-alpha3 -> v5.0.0-alpha3
 * [new tag]           v5.0.0-beta1  -> v5.0.0-beta1
 * [new tag]           v5.0.0-rc1    -> v5.0.0-rc1
 * [new tag]           v5.0.1        -> v5.0.1
 * [new tag]           v5.0.2        -> v5.0.2
 * [new tag]           v5.0.3        -> v5.0.3
 * [new tag]           v5.0.4        -> v5.0.4
 * [new tag]           v5.0.5        -> v5.0.5
 * [new tag]           v5.0.6        -> v5.0.6
 * [new tag]           v5.0.7        -> v5.0.7
 * [new tag]           v5.0.8        -> v5.0.8
 * [new tag]           v5.0.9        -> v5.0.9
 * [new tag]           v5.1.0        -> v5.1.0
 * [new tag]           v5.1.1        -> v5.1.1
 * [new tag]           v5.2.0        -> v5.2.0
 * [new tag]           v5.2.1        -> v5.2.1
 * [new tag]           v5.2.2        -> v5.2.2
 * [new tag]           v5.2.3        -> v5.2.3
 * [new tag]           v5.2.4        -> v5.2.4
 * [new tag]           v5.2.5        -> v5.2.5
 * [new tag]           v5.2.6        -> v5.2.6
 * [new tag]           v5.2.7        -> v5.2.7
 * [new tag]           v5.2.8        -> v5.2.8
 * [new tag]           v5.2.9        -> v5.2.9
 * [new tag]           v6.0.0        -> v6.0.0
 * [new tag]           v6.0.1        -> v6.0.1
 * [new tag]           v6.1.0        -> v6.1.0
 * [new tag]           v6.2.0        -> v6.2.0
 * [new tag]           v6.2.1        -> v6.2.1
 * [new tag]           v6.3.0        -> v6.3.0
 * [new tag]           v6.3.1        -> v6.3.1
 * [new tag]           v6.3.2        -> v6.3.2
 * [new tag]           v6.4.0        -> v6.4.0
 * [new tag]           v6.5.0        -> v6.5.0
 * [new tag]           v6.6.0        -> v6.6.0
 * [new tag]           v6.6.1        -> v6.6.1
 * [new tag]           v6.7.0        -> v6.7.0
 * [new tag]           v6.7.1        -> v6.7.1
 * [new tag]           v6.7.2        -> v6.7.2
 * [new tag]           v6.7.3        -> v6.7.3
 * [new tag]           v6.7.4        -> v6.7.4
 * [new tag]           v6.7.5        -> v6.7.5
 * [new tag]           v6.8.0        -> v6.8.0
 * [new tag]           v6.8.1        -> v6.8.1
 * [new tag]           v6.8.2        -> v6.8.2
 * [new tag]           v6.8.3        -> v6.8.3
 * [new tag]           v6.8.4        -> v6.8.4
 * [new tag]           v6.8.5        -> v6.8.5
 * [new tag]           v7.0.0        -> v7.0.0
 * [new tag]           v7.0.1        -> v7.0.1
 * [new tag]           v7.1.0        -> v7.1.0
 * [new tag]           v7.1.1        -> v7.1.1
 * [new tag]           v7.1.2        -> v7.1.2
 * [new tag]           v7.2.0        -> v7.2.0
 * [new tag]           v7.2.1        -> v7.2.1
 * [new tag]           v7.2.10       -> v7.2.10
 * [new tag]           v7.2.11       -> v7.2.11
 * [new tag]           v7.2.2        -> v7.2.2
 * [new tag]           v7.2.3        -> v7.2.3
 * [new tag]           v7.2.4        -> v7.2.4
 * [new tag]           v7.2.5        -> v7.2.5
 * [new tag]           v7.2.6        -> v7.2.6
 * [new tag]           v7.2.7        -> v7.2.7
 * [new tag]           v7.2.8        -> v7.2.8
 * [new tag]           v7.2.9        -> v7.2.9
 * [new tag]           v7.3.0        -> v7.3.0
 * [new tag]           v7.3.1        -> v7.3.1
 * [new tag]           v7.3.2        -> v7.3.2
 * [new tag]           v7.4.0        -> v7.4.0
 * [new tag]           v7.4.1        -> v7.4.1
 * [new tag]           v7.4.4        -> v7.4.4
 * [new tag]           v7.4.5        -> v7.4.5
 * [new tag]           v7.4.6        -> v7.4.6
 * [new tag]           v7.5.0        -> v7.5.0
 * [new tag]           v7.5.1        -> v7.5.1
 * [new tag]           v7.5.2        -> v7.5.2
 * [new tag]           v7.5.3        -> v7.5.3
 * [new tag]           v7.5.4        -> v7.5.4
 * [new tag]           v7.5.5        -> v7.5.5
 * [new tag]           v7.5.6        -> v7.5.6
 * [new tag]           v7.5.7        -> v7.5.7
 * [new tag]           v8.0.0        -> v8.0.0
 * [new tag]           v8.0.1        -> v8.0.1
 * [new tag]           v8.0.2        -> v8.0.2
 * [new tag]           v8.0.3        -> v8.0.3
 * [new tag]           v8.1.0        -> v8.1.0
 * [new tag]           v8.2.0        -> v8.2.0
 * [new tag]           v8.3.0        -> v8.3.0
 * [new tag]           v8.3.1        -> v8.3.1
 * [new tag]           v8.3.2        -> v8.3.2
 * [new tag]           v8.3.3        -> v8.3.3
 * [new tag]           v8.4.0        -> v8.4.0
 * [new tag]           v8.4.1        -> v8.4.1
 * [new tag]           v8.5.0        -> v8.5.0
 * [new tag]           v8.6.0        -> v8.6.0
 * [new tag]           v8.6.1        -> v8.6.1
 * [new tag]           v8.6.2        -> v8.6.2
 * [new tag]           v8.6.3        -> v8.6.3
 * [new tag]           v8.6.4        -> v8.6.4
 * [new tag]           v8.6.5        -> v8.6.5
 * [new tag]           v8.7.0        -> v8.7.0
 * [new tag]           v9.0.0        -> v9.0.0
 * [new tag]           v9.0.1        -> v9.0.1
 * [new tag]           v9.0.2        -> v9.0.2
 * [new tag]           v9.0.3        -> v9.0.3
 * [new tag]           v9.0.4        -> v9.0.4
 * [new tag]           v9.1.0        -> v9.1.0

### 018 — verify_alerta
- start: 2026-10-01T03:16:57Z · end: 2026-10-01T03:16:57Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> rev-parse <PRIVATE_REF_01617>\^\{commit\} <PRIVATE_REF_01617>\^\{tree\}`
- stdout: `raw/018_verify_alerta.out` sha256 `<PRIVATE_REF_04598>` · redacted lines: 0
<PRIVATE_REF_01617>^{commit}
- stderr: `raw/018_verify_alerta.err` sha256 `<PRIVATE_REF_04030>` · redacted lines: 0
fatal: ambiguous argument '<PRIVATE_REF_01617>^{commit}': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'

### 019 — init_python-alerta-client
- start: 2026-10-01T03:16:58Z · end: 2026-10-01T03:16:58Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false init -q --bare --template= sources/<ACCOUNT_EMAIL_044>`
- stdout: `raw/019_init_python-alerta-client.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/019_init_python-alerta-client.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 020 — fetch_python-alerta-client
- start: 2026-10-01T03:16:58Z · end: 2026-10-01T03:16:58Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> fetch --no-tags --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/python-alerta-client.git +4cb6a1a48b953fdc5cdfec98874242808087429cefs/pinned/master`
- stdout: `raw/020_fetch_python-alerta-client.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/020_fetch_python-alerta-client.err` sha256 `<PRIVATE_REF_04107>` · redacted lines: 0
fatal: couldn't find remote ref 4cb6a1a48b953fdc5cdfec98874242808087429cefs/pinned/master

### 021 — tags_python-alerta-client
- start: 2026-10-01T03:16:58Z · end: 2026-10-01T03:16:59Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> fetch --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/python-alerta-client.git +refs/tags/\*:refs/tags/\*`
- stdout: `raw/021_tags_python-alerta-client.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/021_tags_python-alerta-client.err` sha256 `<PRIVATE_REF_04858>` · redacted lines: 0
From https://github.com/alerta/python-alerta-client
 * [new tag]         3.0.7        -> 3.0.7
 * [new tag]         v            -> v
 * [new tag]         v3.0.5       -> v3.0.5
 * [new tag]         v4.10.5      -> v4.10.5
 * [new tag]         v5.0.0       -> v5.0.0
 * [new tag]         v5.0.0-beta1 -> v5.0.0-beta1
 * [new tag]         v5.0.1       -> v5.0.1
 * [new tag]         v5.0.10      -> v5.0.10
 * [new tag]         v5.0.11      -> v5.0.11
 * [new tag]         v5.0.12      -> v5.0.12
 * [new tag]         v5.0.2       -> v5.0.2
 * [new tag]         v5.0.3       -> v5.0.3
 * [new tag]         v5.0.4       -> v5.0.4
 * [new tag]         v5.0.5       -> v5.0.5
 * [new tag]         v5.0.6       -> v5.0.6
 * [new tag]         v5.0.7       -> v5.0.7
 * [new tag]         v5.0.9       -> v5.0.9
 * [new tag]         v5.1.0       -> v5.1.0
 * [new tag]         v5.2.0       -> v5.2.0
 * [new tag]         v5.2.1       -> v5.2.1
 * [new tag]         v6.0.0       -> v6.0.0
 * [new tag]         v6.2.0       -> v6.2.0
 * [new tag]         v6.3.0       -> v6.3.0
 * [new tag]         v6.3.1       -> v6.3.1
 * [new tag]         v6.4.0       -> v6.4.0
 * [new tag]         v6.5.0       -> v6.5.0
 * [new tag]         v6.8.0       -> v6.8.0
 * [new tag]         v6.8.1       -> v6.8.1
 * [new tag]         v7.2.0       -> v7.2.0
 * [new tag]         v7.2.1       -> v7.2.1
 * [new tag]         v7.2.2       -> v7.2.2
 * [new tag]         v7.3.0       -> v7.3.0
 * [new tag]         v7.4.0       -> v7.4.0
 * [new tag]         v7.4.4       -> v7.4.4
 * [new tag]         v7.4.5       -> v7.4.5
 * [new tag]         v7.5.0       -> v7.5.0
 * [new tag]         v7.5.1       -> v7.5.1
 * [new tag]         v7.5.6       -> v7.5.6
 * [new tag]         v7.5.7       -> v7.5.7
 * [new tag]         v8.0.0       -> v8.0.0
 * [new tag]         v8.2.0       -> v8.2.0
 * [new tag]         v8.3.0       -> v8.3.0
 * [new tag]         v8.4.0       -> v8.4.0
 * [new tag]         v8.5.0       -> v8.5.0
 * [new tag]         v8.5.1       -> v8.5.1
 * [new tag]         v8.5.2       -> v8.5.2
 * [new tag]         v8.5.3       -> v8.5.3

### 022 — verify_python-alerta-client
- start: 2026-10-01T03:16:59Z · end: 2026-10-01T03:16:59Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> rev-parse <PRIVATE_REF_04519>\^\{commit\} <PRIVATE_REF_04519>\^\{tree\}`
- stdout: `raw/022_verify_python-alerta-client.out` sha256 `<PRIVATE_REF_04625>` · redacted lines: 0
<PRIVATE_REF_04519>^{commit}
- stderr: `raw/022_verify_python-alerta-client.err` sha256 `<PRIVATE_REF_04756>` · redacted lines: 0
fatal: ambiguous argument '<PRIVATE_REF_04519>^{commit}': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'

### 023 — init_docker-alerta
- start: 2026-10-01T03:16:59Z · end: 2026-10-01T03:16:59Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false init -q --bare --template= sources/<ACCOUNT_EMAIL_014>`
- stdout: `raw/023_init_docker-alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/023_init_docker-alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 024 — fetch_docker-alerta
- start: 2026-10-01T03:16:59Z · end: 2026-10-01T03:17:00Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> fetch --no-tags --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/docker-alerta.git +b255b1f11e48221395f8ecaf6a1dbbd4c8366cb0efs/pinned/master`
- stdout: `raw/024_fetch_docker-alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/024_fetch_docker-alerta.err` sha256 `<PRIVATE_REF_04208>` · redacted lines: 0
fatal: couldn't find remote ref b255b1f11e48221395f8ecaf6a1dbbd4c8366cb0efs/pinned/master

### 025 — tags_docker-alerta
- start: 2026-10-01T03:17:00Z · end: 2026-10-01T03:17:01Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> fetch --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/docker-alerta.git +refs/tags/\*:refs/tags/\*`
- stdout: `raw/025_tags_docker-alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/025_tags_docker-alerta.err` sha256 `<PRIVATE_REF_05133>` · redacted lines: 0
From https://github.com/alerta/docker-alerta
 * [new tag]         v5.0.9     -> v5.0.9
 * [new tag]         v5.1.0     -> v5.1.0
 * [new tag]         v5.1.1     -> v5.1.1
 * [new tag]         v5.2.0     -> v5.2.0
 * [new tag]         v5.2.4     -> v5.2.4
 * [new tag]         v5.2.5     -> v5.2.5
 * [new tag]         v5.2.6     -> v5.2.6
 * [new tag]         v5.2.7     -> v5.2.7
 * [new tag]         v5.2.8     -> v5.2.8
 * [new tag]         v5.2.9     -> v5.2.9
 * [new tag]         v6.0.0     -> v6.0.0
 * [new tag]         v6.0.1     -> v6.0.1
 * [new tag]         v6.1.0     -> v6.1.0
 * [new tag]         v6.2.0     -> v6.2.0
 * [new tag]         v6.2.1     -> v6.2.1
 * [new tag]         v6.3.0     -> v6.3.0
 * [new tag]         v6.3.1     -> v6.3.1
 * [new tag]         v6.3.2     -> v6.3.2
 * [new tag]         v6.4.0     -> v6.4.0
 * [new tag]         v6.5.0     -> v6.5.0
 * [new tag]         v6.6.0     -> v6.6.0
 * [new tag]         v6.6.1     -> v6.6.1
 * [new tag]         v6.7.0     -> v6.7.0
 * [new tag]         v6.7.1     -> v6.7.1
 * [new tag]         v6.7.2     -> v6.7.2
 * [new tag]         v6.7.3     -> v6.7.3
 * [new tag]         v6.7.4     -> v6.7.4
 * [new tag]         v6.7.5     -> v6.7.5
 * [new tag]         v6.8.0     -> v6.8.0
 * [new tag]         v6.8.1     -> v6.8.1
 * [new tag]         v6.8.2     -> v6.8.2
 * [new tag]         v6.8.3     -> v6.8.3
 * [new tag]         v6.8.4     -> v6.8.4
 * [new tag]         v6.8.5     -> v6.8.5
 * [new tag]         v7.0.0     -> v7.0.0
 * [new tag]         v7.0.1     -> v7.0.1
 * [new tag]         v7.1.0     -> v7.1.0
 * [new tag]         v7.2.0     -> v7.2.0
 * [new tag]         v7.2.1     -> v7.2.1
 * [new tag]         v7.2.10    -> v7.2.10
 * [new tag]         v7.2.11    -> v7.2.11
 * [new tag]         v7.2.2     -> v7.2.2
 * [new tag]         v7.2.3     -> v7.2.3
 * [new tag]         v7.2.4     -> v7.2.4
 * [new tag]         v7.2.5     -> v7.2.5
 * [new tag]         v7.2.6     -> v7.2.6
 * [new tag]         v7.2.7     -> v7.2.7
 * [new tag]         v7.2.8     -> v7.2.8
 * [new tag]         v7.2.9     -> v7.2.9
 * [new tag]         v7.3.0     -> v7.3.0
 * [new tag]         v7.3.1     -> v7.3.1
 * [new tag]         v7.3.2     -> v7.3.2
 * [new tag]         v7.4.0     -> v7.4.0
 * [new tag]         v7.4.1     -> v7.4.1
 * [new tag]         v7.4.4     -> v7.4.4
 * [new tag]         v7.4.5     -> v7.4.5
 * [new tag]         v7.5.1     -> v7.5.1
 * [new tag]         v7.5.2     -> v7.5.2
 * [new tag]         v7.5.3     -> v7.5.3
 * [new tag]         v7.5.4     -> v7.5.4
 * [new tag]         v7.5.5     -> v7.5.5
 * [new tag]         v7.5.6     -> v7.5.6
 * [new tag]         v7.5.7     -> v7.5.7
 * [new tag]         v8.0.0     -> v8.0.0
 * [new tag]         v8.0.1     -> v8.0.1
 * [new tag]         v8.0.2     -> v8.0.2
 * [new tag]         v8.0.3     -> v8.0.3
 * [new tag]         v8.1.0     -> v8.1.0
 * [new tag]         v8.2.0     -> v8.2.0
 * [new tag]         v8.3.0     -> v8.3.0
 * [new tag]         v8.3.1     -> v8.3.1
 * [new tag]         v8.3.2     -> v8.3.2
 * [new tag]         v8.4.0     -> v8.4.0
 * [new tag]         v8.4.1     -> v8.4.1
 * [new tag]         v8.5.0     -> v8.5.0
 * [new tag]         v8.6.2     -> v8.6.2
 * [new tag]         v8.6.3     -> v8.6.3
 * [new tag]         v8.6.4     -> v8.6.4
 * [new tag]         v8.6.5     -> v8.6.5
 * [new tag]         v8.7.0     -> v8.7.0
 * [new tag]         v9.0.0     -> v9.0.0
 * [new tag]         v9.0.1     -> v9.0.1
 * [new tag]         v9.0.2     -> v9.0.2
 * [new tag]         v9.0.3     -> v9.0.3
 * [new tag]         v9.0.4     -> v9.0.4
 * [new tag]         v9.1.0     -> v9.1.0

### 026 — verify_docker-alerta
- start: 2026-10-01T03:17:01Z · end: 2026-10-01T03:17:01Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> rev-parse <PRIVATE_REF_05335>\^\{commit\} <PRIVATE_REF_05335>\^\{tree\}`
- stdout: `raw/026_verify_docker-alerta.out` sha256 `<PRIVATE_REF_05558>` · redacted lines: 0
<PRIVATE_REF_05335>^{commit}
- stderr: `raw/026_verify_docker-alerta.err` sha256 `<PRIVATE_REF_04832>` · redacted lines: 0
fatal: ambiguous argument '<PRIVATE_REF_05335>^{commit}': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'

### 027 — init_alerta-contrib
- start: 2026-10-01T03:17:01Z · end: 2026-10-01T03:17:01Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false init -q --bare --template= sources/<ACCOUNT_EMAIL_006>`
- stdout: `raw/027_init_alerta-contrib.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/027_init_alerta-contrib.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 028 — fetch_alerta-contrib
- start: 2026-10-01T03:17:01Z · end: 2026-10-01T03:17:02Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_006> fetch --no-tags --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/alerta-contrib.git +07dc8831913b9e9fd291f20809e00121bbaa3c60efs/pinned/master`
- stdout: `raw/028_fetch_alerta-contrib.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/028_fetch_alerta-contrib.err` sha256 `<PRIVATE_REF_05163>` · redacted lines: 0
fatal: couldn't find remote ref 07dc8831913b9e9fd291f20809e00121bbaa3c60efs/pinned/master

### 029 — tags_alerta-contrib
- start: 2026-10-01T03:17:02Z · end: 2026-10-01T03:17:02Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_006> fetch --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/alerta-contrib.git +refs/tags/\*:refs/tags/\*`
- stdout: `raw/029_tags_alerta-contrib.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/029_tags_alerta-contrib.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 030 — verify_alerta-contrib
- start: 2026-10-01T03:17:02Z · end: 2026-10-01T03:17:03Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_006> rev-parse <PRIVATE_REF_03984>\^\{commit\} <PRIVATE_REF_03984>\^\{tree\}`
- stdout: `raw/030_verify_alerta-contrib.out` sha256 `<PRIVATE_REF_04412>` · redacted lines: 0
<PRIVATE_REF_03984>^{commit}
- stderr: `raw/030_verify_alerta-contrib.err` sha256 `<PRIVATE_REF_05589>` · redacted lines: 0
fatal: ambiguous argument '<PRIVATE_REF_03984>^{commit}': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'

### 031 — init_alerta-docs
- start: 2026-10-01T03:17:03Z · end: 2026-10-01T03:17:03Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false init -q --bare --template= sources/<ACCOUNT_EMAIL_007>`
- stdout: `raw/031_init_alerta-docs.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/031_init_alerta-docs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 032 — fetch_alerta-docs
- start: 2026-10-01T03:17:03Z · end: 2026-10-01T03:17:03Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_007> fetch --no-tags --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/alerta-docs.git +a6b01f114611832e71754dba81f8e7f8ee705cb6efs/pinned/master`
- stdout: `raw/032_fetch_alerta-docs.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/032_fetch_alerta-docs.err` sha256 `<PRIVATE_REF_05910>` · redacted lines: 0
fatal: couldn't find remote ref a6b01f114611832e71754dba81f8e7f8ee705cb6efs/pinned/master

### 033 — tags_alerta-docs
- start: 2026-10-01T03:17:03Z · end: 2026-10-01T03:17:05Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_007> fetch --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/alerta-docs.git +refs/tags/\*:refs/tags/\*`
- stdout: `raw/033_tags_alerta-docs.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/033_tags_alerta-docs.err` sha256 `<PRIVATE_REF_04829>` · redacted lines: 0
From https://github.com/alerta/alerta-docs
 * [new tag]         v8.2.0      -> v8.2.0
 * [new tag]         v8.2.1      -> v8.2.1
 * [new tag]         v8.2.10     -> v8.2.10
 * [new tag]         v8.2.2      -> v8.2.2
 * [new tag]         v8.2.3      -> v8.2.3
 * [new tag]         v8.2.4      -> v8.2.4
 * [new tag]         v8.2.5      -> v8.2.5
 * [new tag]         v8.2.6      -> v8.2.6
 * [new tag]         v8.2.7      -> v8.2.7
 * [new tag]         v8.2.8      -> v8.2.8
 * [new tag]         v8.2.9      -> v8.2.9
 * [new tag]         v9.0.0-rc1  -> v9.0.0-rc1
 * [new tag]         v9.0.0-rc10 -> v9.0.0-rc10
 * [new tag]         v9.0.0-rc2  -> v9.0.0-rc2
 * [new tag]         v9.0.0-rc4  -> v9.0.0-rc4
 * [new tag]         v9.0.0-rc5  -> v9.0.0-rc5
 * [new tag]         v9.0.0-rc6  -> v9.0.0-rc6
 * [new tag]         v9.0.0-rc7  -> v9.0.0-rc7
 * [new tag]         v9.0.0-rc8  -> v9.0.0-rc8
 * [new tag]         v9.0.0-rc9  -> v9.0.0-rc9
 * [new tag]         v9.1.0      -> v9.1.0

### 034 — verify_alerta-docs
- start: 2026-10-01T03:17:05Z · end: 2026-10-01T03:17:05Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_007> rev-parse <PRIVATE_REF_05236>\^\{commit\} <PRIVATE_REF_05236>\^\{tree\}`
- stdout: `raw/034_verify_alerta-docs.out` sha256 `<PRIVATE_REF_05630>` · redacted lines: 0
<PRIVATE_REF_05236>^{commit}
- stderr: `raw/034_verify_alerta-docs.err` sha256 `<PRIVATE_REF_05576>` · redacted lines: 0
fatal: ambiguous argument '<PRIVATE_REF_05236>^{commit}': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'

### 035 — init_alerta-webui
- start: 2026-10-01T03:17:05Z · end: 2026-10-01T03:17:05Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false init -q --bare --template= sources/<ACCOUNT_EMAIL_008>`
- stdout: `raw/035_init_alerta-webui.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/035_init_alerta-webui.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 036 — fetch_alerta-webui
- start: 2026-10-01T03:17:05Z · end: 2026-10-01T03:17:06Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_008> fetch --no-tags --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/alerta-webui.git +e6eb99e90901a32e63ee96588ac4dd8804d6831aefs/pinned/master`
- stdout: `raw/036_fetch_alerta-webui.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/036_fetch_alerta-webui.err` sha256 `<PRIVATE_REF_05226>` · redacted lines: 0
fatal: couldn't find remote ref e6eb99e90901a32e63ee96588ac4dd8804d6831aefs/pinned/master

### 037 — tags_alerta-webui
- start: 2026-10-01T03:17:06Z · end: 2026-10-01T03:17:08Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_008> fetch --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/alerta-webui.git +refs/tags/\*:refs/tags/\*`
- stdout: `raw/037_tags_alerta-webui.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/037_tags_alerta-webui.err` sha256 `<PRIVATE_REF_04444>` · redacted lines: 0
From https://github.com/alerta/alerta-webui
 * [new tag]         beta1       -> beta1
 * [new tag]         beta2       -> beta2
 * [new tag]         beta3       -> beta3
 * [new tag]         v1-test     -> v1-test
 * [new tag]         v7.0.0      -> v7.0.0
 * [new tag]         v7.0.0-rc.1 -> v7.0.0-rc.1
 * [new tag]         v7.0.0-rc.2 -> v7.0.0-rc.2
 * [new tag]         v7.0.1      -> v7.0.1
 * [new tag]         v7.1.0      -> v7.1.0
 * [new tag]         v7.2.0      -> v7.2.0
 * [new tag]         v7.2.1      -> v7.2.1
 * [new tag]         v7.2.10     -> v7.2.10
 * [new tag]         v7.2.11     -> v7.2.11
 * [new tag]         v7.2.2      -> v7.2.2
 * [new tag]         v7.2.3      -> v7.2.3
 * [new tag]         v7.2.4      -> v7.2.4
 * [new tag]         v7.2.5      -> v7.2.5
 * [new tag]         v7.2.6      -> v7.2.6
 * [new tag]         v7.2.7      -> v7.2.7
 * [new tag]         v7.2.8      -> v7.2.8
 * [new tag]         v7.2.9      -> v7.2.9
 * [new tag]         v7.3.0      -> v7.3.0
 * [new tag]         v7.3.1      -> v7.3.1
 * [new tag]         v7.3.2      -> v7.3.2
 * [new tag]         v7.4.0      -> v7.4.0
 * [new tag]         v7.4.1      -> v7.4.1
 * [new tag]         v7.4.2      -> v7.4.2
 * [new tag]         v7.4.3      -> v7.4.3
 * [new tag]         v7.4.4      -> v7.4.4
 * [new tag]         v7.4.5      -> v7.4.5
 * [new tag]         v7.5.0      -> v7.5.0
 * [new tag]         v7.5.1      -> v7.5.1
 * [new tag]         v7.5.6      -> v7.5.6
 * [new tag]         v8.0.0      -> v8.0.0
 * [new tag]         v8.0.1      -> v8.0.1
 * [new tag]         v8.2.0      -> v8.2.0
 * [new tag]         v8.3.0      -> v8.3.0
 * [new tag]         v8.3.1      -> v8.3.1
 * [new tag]         v8.3.2      -> v8.3.2
 * [new tag]         v8.3.3      -> v8.3.3
 * [new tag]         v8.4.0      -> v8.4.0
 * [new tag]         v8.4.1      -> v8.4.1
 * [new tag]         v8.5.0      -> v8.5.0
 * [new tag]         v8.6.0      -> v8.6.0
 * [new tag]         v8.6.1      -> v8.6.1
 * [new tag]         v8.6.2      -> v8.6.2
 * [new tag]         v8.7.0      -> v8.7.0
 * [new tag]         v8.7.1      -> v8.7.1

### 038 — verify_alerta-webui
- start: 2026-10-01T03:17:08Z · end: 2026-10-01T03:17:08Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_008> rev-parse <PRIVATE_REF_03446>\^\{commit\} <PRIVATE_REF_03446>\^\{tree\}`
- stdout: `raw/038_verify_alerta-webui.out` sha256 `<PRIVATE_REF_04179>` · redacted lines: 0
<PRIVATE_REF_03446>^{commit}
- stderr: `raw/038_verify_alerta-webui.err` sha256 `<PRIVATE_REF_04854>` · redacted lines: 0
fatal: ambiguous argument '<PRIVATE_REF_03446>^{commit}': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'

### 039 — init_packer-templates
- start: 2026-10-01T03:17:08Z · end: 2026-10-01T03:17:08Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false init -q --bare --template= sources/<ACCOUNT_EMAIL_039>`
- stdout: `raw/039_init_packer-templates.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/039_init_packer-templates.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 040 — fetch_packer-templates
- start: 2026-10-01T03:17:08Z · end: 2026-10-01T03:17:09Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_039> fetch --no-tags --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/packer-templates.git +6da2f5fd32360da01a0c7d950cfe7a5a4efaa9c7efs/pinned/master`
- stdout: `raw/040_fetch_packer-templates.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/040_fetch_packer-templates.err` sha256 `<PRIVATE_REF_05682>` · redacted lines: 0
fatal: couldn't find remote ref 6da2f5fd32360da01a0c7d950cfe7a5a4efaa9c7efs/pinned/master

### 041 — tags_packer-templates
- start: 2026-10-01T03:17:09Z · end: 2026-10-01T03:17:09Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_039> fetch --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/packer-templates.git +refs/tags/\*:refs/tags/\*`
- stdout: `raw/041_tags_packer-templates.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/041_tags_packer-templates.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 042 — verify_packer-templates
- start: 2026-10-01T03:17:09Z · end: 2026-10-01T03:17:09Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_039> rev-parse <PRIVATE_REF_04757>\^\{commit\} <PRIVATE_REF_04757>\^\{tree\}`
- stdout: `raw/042_verify_packer-templates.out` sha256 `<PRIVATE_REF_03978>` · redacted lines: 0
<PRIVATE_REF_04757>^{commit}
- stderr: `raw/042_verify_packer-templates.err` sha256 `<PRIVATE_REF_05030>` · redacted lines: 0
fatal: ambiguous argument '<PRIVATE_REF_04757>^{commit}': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'

### 043 — init_vagrant-try-alerta
- start: 2026-10-01T03:17:09Z · end: 2026-10-01T03:17:10Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false init -q --bare --template= sources/<ACCOUNT_EMAIL_065>`
- stdout: `raw/043_init_vagrant-try-alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/043_init_vagrant-try-alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 044 — fetch_vagrant-try-alerta
- start: 2026-10-01T03:17:10Z · end: 2026-10-01T03:17:10Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_065> fetch --no-tags --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/vagrant-try-alerta.git +e7bde74082c415a180c3c0dd01a84527dc4646e7efs/pinned/master`
- stdout: `raw/044_fetch_vagrant-try-alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/044_fetch_vagrant-try-alerta.err` sha256 `<PRIVATE_REF_05970>` · redacted lines: 0
fatal: couldn't find remote ref e7bde74082c415a180c3c0dd01a84527dc4646e7efs/pinned/master

### 045 — tags_vagrant-try-alerta
- start: 2026-10-01T03:17:10Z · end: 2026-10-01T03:17:11Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_065> fetch --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/vagrant-try-alerta.git +refs/tags/\*:refs/tags/\*`
- stdout: `raw/045_tags_vagrant-try-alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/045_tags_vagrant-try-alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 046 — verify_vagrant-try-alerta
- start: 2026-10-01T03:17:11Z · end: 2026-10-01T03:17:11Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_065> rev-parse <PRIVATE_REF_05792>\^\{commit\} <PRIVATE_REF_05792>\^\{tree\}`
- stdout: `raw/046_verify_vagrant-try-alerta.out` sha256 `<PRIVATE_REF_04621>` · redacted lines: 0
<PRIVATE_REF_05792>^{commit}
- stderr: `raw/046_verify_vagrant-try-alerta.err` sha256 `<PRIVATE_REF_04956>` · redacted lines: 0
fatal: ambiguous argument '<PRIVATE_REF_05792>^{commit}': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'

### 047 — init_angular-alerta-explorer
- start: 2026-10-01T03:17:11Z · end: 2026-10-01T03:17:11Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false init -q --bare --template= sources/<ACCOUNT_EMAIL_010>`
- stdout: `raw/047_init_angular-alerta-explorer.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/047_init_angular-alerta-explorer.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 048 — fetch_angular-alerta-explorer
- start: 2026-10-01T03:17:11Z · end: 2026-10-01T03:17:12Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_010> fetch --no-tags --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/angular-alerta-explorer.git +cca294d5cd51cb0b6cf15f5a6031eb1cf5e015eeefs/pinned/master`
- stdout: `raw/048_fetch_angular-alerta-explorer.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/048_fetch_angular-alerta-explorer.err` sha256 `<PRIVATE_REF_04430>` · redacted lines: 0
fatal: couldn't find remote ref cca294d5cd51cb0b6cf15f5a6031eb1cf5e015eeefs/pinned/master

### 049 — tags_angular-alerta-explorer
- start: 2026-10-01T03:17:12Z · end: 2026-10-01T03:17:12Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_010> fetch --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/angular-alerta-explorer.git +refs/tags/\*:refs/tags/\*`
- stdout: `raw/049_tags_angular-alerta-explorer.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/049_tags_angular-alerta-explorer.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 050 — verify_angular-alerta-explorer
- start: 2026-10-01T03:17:12Z · end: 2026-10-01T03:17:12Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_010> rev-parse <PRIVATE_REF_05561>\^\{commit\} <PRIVATE_REF_05561>\^\{tree\}`
- stdout: `raw/050_verify_angular-alerta-explorer.out` sha256 `<PRIVATE_REF_05512>` · redacted lines: 0
<PRIVATE_REF_05561>^{commit}
- stderr: `raw/050_verify_angular-alerta-explorer.err` sha256 `<PRIVATE_REF_04995>` · redacted lines: 0
fatal: ambiguous argument '<PRIVATE_REF_05561>^{commit}': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'

### 051 — fetch2_alerta
- start: 2026-10-01T03:17:23Z · end: 2026-10-01T03:17:24Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> fetch --no-tags --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/alerta.git +<PRIVATE_REF_01617>:refs/pinned/head`
- stdout: `raw/051_fetch2_alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/051_fetch2_alerta.err` sha256 `<PRIVATE_REF_05607>` · redacted lines: 0
From https://github.com/alerta/alerta
 * [new ref]           <PRIVATE_REF_01617> -> refs/pinned/head

### 052 — verify2_alerta
- start: 2026-10-01T03:17:24Z · end: 2026-10-01T03:17:24Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> rev-parse <PRIVATE_REF_01617>\^\{commit\} <PRIVATE_REF_01617>\^\{tree\}`
- stdout: `raw/052_verify2_alerta.out` sha256 `<PRIVATE_REF_04520>` · redacted lines: 0
<PRIVATE_REF_01617>
<PRIVATE_REF_04895>
- stderr: `raw/052_verify2_alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 053 — fetch2_python-alerta-client
- start: 2026-10-01T03:17:24Z · end: 2026-10-01T03:17:25Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> fetch --no-tags --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/python-alerta-client.git +<PRIVATE_REF_04519>:refs/pinned/head`
- stdout: `raw/053_fetch2_python-alerta-client.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/053_fetch2_python-alerta-client.err` sha256 `<PRIVATE_REF_05604>` · redacted lines: 0
From https://github.com/alerta/python-alerta-client
 * [new ref]         <PRIVATE_REF_04519> -> refs/pinned/head

### 054 — verify2_python-alerta-client
- start: 2026-10-01T03:17:25Z · end: 2026-10-01T03:17:25Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> rev-parse <PRIVATE_REF_04519>\^\{commit\} <PRIVATE_REF_04519>\^\{tree\}`
- stdout: `raw/054_verify2_python-alerta-client.out` sha256 `<PRIVATE_REF_05467>` · redacted lines: 0
<PRIVATE_REF_04519>
<PRIVATE_REF_04807>
- stderr: `raw/054_verify2_python-alerta-client.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 055 — fetch2_docker-alerta
- start: 2026-10-01T03:17:25Z · end: 2026-10-01T03:17:26Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> fetch --no-tags --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/docker-alerta.git +<PRIVATE_REF_05335>:refs/pinned/head`
- stdout: `raw/055_fetch2_docker-alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/055_fetch2_docker-alerta.err` sha256 `<PRIVATE_REF_04029>` · redacted lines: 0
From https://github.com/alerta/docker-alerta
 * [new ref]         <PRIVATE_REF_05335> -> refs/pinned/head

### 056 — verify2_docker-alerta
- start: 2026-10-01T03:17:26Z · end: 2026-10-01T03:17:26Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> rev-parse <PRIVATE_REF_05335>\^\{commit\} <PRIVATE_REF_05335>\^\{tree\}`
- stdout: `raw/056_verify2_docker-alerta.out` sha256 `<PRIVATE_REF_05974>` · redacted lines: 0
<PRIVATE_REF_05335>
<PRIVATE_REF_04402>
- stderr: `raw/056_verify2_docker-alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 057 — fetch2_alerta-contrib
- start: 2026-10-01T03:17:26Z · end: 2026-10-01T03:17:27Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_006> fetch --no-tags --no-recurse-submodules --no-write-fetch-head https://github.com/alerta/alerta-contrib.git +<PRIVATE_REF_03984>:refs/pinned/head`
- stdout: `raw/057_fetch2_alerta-contrib.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/057_fetch2_alerta-contrib.err` sha256 `<PRIVATE_REF_04775>` · redacted lines: 0
From https://github.com/alerta/alerta-contrib
 * [new ref]         <PRIVATE_REF_03984> -> refs/pinned/head

### 058 — verify2_alerta-contrib
- start: 2026-10-01T03:17:27Z · end: 2026-10-01T03:17:27Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_006> rev-parse <PRIVATE_REF_03984>\^\{commit\} <PRIVATE_REF_03984>\^\{tree\}`
- stdout: `raw/058_verify2_alerta-contrib.out` sha256 `<PRIVATE_REF_05484>` · redacted lines: 0
<PRIVATE_REF_03984>
<PRIVATE_REF_05120>
- stderr: `raw/058_verify2_alerta-contrib.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 059 — fetch2_alerta-docs
- start: 2026-10-01T03:17:27Z · end: 2026-10-01T03:17:27Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_007> fetch --no-tags --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/alerta-docs.git +<PRIVATE_REF_05236>:refs/pinned/head`
- stdout: `raw/059_fetch2_alerta-docs.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/059_fetch2_alerta-docs.err` sha256 `<PRIVATE_REF_05011>` · redacted lines: 0
From https://github.com/alerta/alerta-docs
 * [new ref]         <PRIVATE_REF_05236> -> refs/pinned/head

### 060 — verify2_alerta-docs
- start: 2026-10-01T03:17:27Z · end: 2026-10-01T03:17:27Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_007> rev-parse <PRIVATE_REF_05236>\^\{commit\} <PRIVATE_REF_05236>\^\{tree\}`
- stdout: `raw/060_verify2_alerta-docs.out` sha256 `<PRIVATE_REF_05538>` · redacted lines: 0
<PRIVATE_REF_05236>
<PRIVATE_REF_04752>
- stderr: `raw/060_verify2_alerta-docs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 061 — fetch2_alerta-webui
- start: 2026-10-01T03:17:28Z · end: 2026-10-01T03:17:29Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_008> fetch --no-tags --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/alerta-webui.git +<PRIVATE_REF_03446>:refs/pinned/head`
- stdout: `raw/061_fetch2_alerta-webui.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/061_fetch2_alerta-webui.err` sha256 `<PRIVATE_REF_04839>` · redacted lines: 0
From https://github.com/alerta/alerta-webui
 * [new ref]         <PRIVATE_REF_03446> -> refs/pinned/head

### 062 — verify2_alerta-webui
- start: 2026-10-01T03:17:29Z · end: 2026-10-01T03:17:29Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_008> rev-parse <PRIVATE_REF_03446>\^\{commit\} <PRIVATE_REF_03446>\^\{tree\}`
- stdout: `raw/062_verify2_alerta-webui.out` sha256 `<PRIVATE_REF_05180>` · redacted lines: 0
<PRIVATE_REF_03446>
<PRIVATE_REF_04238>
- stderr: `raw/062_verify2_alerta-webui.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 063 — fetch2_packer-templates
- start: 2026-10-01T03:17:29Z · end: 2026-10-01T03:17:29Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_039> fetch --no-tags --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/packer-templates.git +<PRIVATE_REF_04757>:refs/pinned/head`
- stdout: `raw/063_fetch2_packer-templates.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/063_fetch2_packer-templates.err` sha256 `<PRIVATE_REF_05156>` · redacted lines: 0
From https://github.com/alerta/packer-templates
 * [new ref]         <PRIVATE_REF_04757> -> refs/pinned/head

### 064 — verify2_packer-templates
- start: 2026-10-01T03:17:29Z · end: 2026-10-01T03:17:29Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_039> rev-parse <PRIVATE_REF_04757>\^\{commit\} <PRIVATE_REF_04757>\^\{tree\}`
- stdout: `raw/064_verify2_packer-templates.out` sha256 `<PRIVATE_REF_05319>` · redacted lines: 0
<PRIVATE_REF_04757>
<PRIVATE_REF_05610>
- stderr: `raw/064_verify2_packer-templates.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 065 — fetch2_vagrant-try-alerta
- start: 2026-10-01T03:17:29Z · end: 2026-10-01T03:17:30Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_065> fetch --no-tags --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/vagrant-try-alerta.git +<PRIVATE_REF_05792>:refs/pinned/head`
- stdout: `raw/065_fetch2_vagrant-try-alerta.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/065_fetch2_vagrant-try-alerta.err` sha256 `<PRIVATE_REF_05620>` · redacted lines: 0
From https://github.com/alerta/vagrant-try-alerta
 * [new ref]         <PRIVATE_REF_05792> -> refs/pinned/head

### 066 — verify2_vagrant-try-alerta
- start: 2026-10-01T03:17:30Z · end: 2026-10-01T03:17:30Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_065> rev-parse <PRIVATE_REF_05792>\^\{commit\} <PRIVATE_REF_05792>\^\{tree\}`
- stdout: `raw/066_verify2_vagrant-try-alerta.out` sha256 `<PRIVATE_REF_04703>` · redacted lines: 0
<PRIVATE_REF_05792>
<PRIVATE_REF_04362>
- stderr: `raw/066_verify2_vagrant-try-alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 067 — fetch2_angular-alerta-explorer
- start: 2026-10-01T03:17:30Z · end: 2026-10-01T03:17:31Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_010> fetch --no-tags --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/alerta/angular-alerta-explorer.git +<PRIVATE_REF_05561>:refs/pinned/head`
- stdout: `raw/067_fetch2_angular-alerta-explorer.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/067_fetch2_angular-alerta-explorer.err` sha256 `<PRIVATE_REF_05658>` · redacted lines: 0
From https://github.com/alerta/angular-alerta-explorer
 * [new ref]         <PRIVATE_REF_05561> -> refs/pinned/head

### 068 — verify2_angular-alerta-explorer
- start: 2026-10-01T03:17:31Z · end: 2026-10-01T03:17:31Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_010> rev-parse <PRIVATE_REF_05561>\^\{commit\} <PRIVATE_REF_05561>\^\{tree\}`
- stdout: `raw/068_verify2_angular-alerta-explorer.out` sha256 `<PRIVATE_REF_04866>` · redacted lines: 0
<PRIVATE_REF_05561>
<PRIVATE_REF_05006>
- stderr: `raw/068_verify2_angular-alerta-explorer.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 069 — tree_crosscheck
- start: 2026-10-01T03:17:45Z · end: 2026-10-01T03:17:45Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c for\ x\ in\ backend:alerta@<PRIVATE_REF_01617>:<PRIVATE_REF_01617>\ frontend:alerta-webui@<PRIVATE_REF_03446>:<PRIVATE_REF_03446>\;\ do\ l=\$\{x%%:\*\}\;\ r=\$\(echo\ \$x\|cut\ -d:\ -f2\)\;\ s=\$\{x\#\#\*:\}\;\ a=\$\(git\ -C\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/\$l\ rev-parse\ \$s\^\{tree\}\)\;\ b=\$\(git\ -C\ sources/\$r.git\ rev-parse\ \$s\^\{tree\}\)\;\ echo\ \"\$l\ frozen_tree=\$a\ fetched_tree=\$b\ match=\$\(\[\ \$a\ =\ \$b\ \]\ \&\&\ echo\ YES\ \|\|\ echo\ NO\)\"\;\ done`
- stdout: `raw/069_tree_crosscheck.out` sha256 `<PRIVATE_REF_04458>` · redacted lines: 0
backend frozen_tree=<PRIVATE_REF_04895> fetched_tree=<PRIVATE_REF_04895> match=YES
frontend frozen_tree=<PRIVATE_REF_04238> fetched_tree=<PRIVATE_REF_04238> match=YES
- stderr: `raw/069_tree_crosscheck.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 070 — ls_client
- start: 2026-10-01T03:17:45Z · end: 2026-10-01T03:17:45Z · exit: 128
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> ls-tree -r --name-only <PRIVATE_REF_04519> -- . :\(exclude,glob\)\*\*/.env :\(exclude,glob\)\*\*/.env.\* :\(exclude,glob\)\*\*/.flaskenv :\(exclude,glob\)\*\*/\*.pem :\(exclude,glob\)\*\*/\*.key :\(exclude,glob\)\*\*/\*secret\* :\(exclude,glob\)\*\*/\*credential\* :\(exclude,glob\)\*\*/.netrc :\(exclude,glob\)\*\*/id_rsa\* :\(exclude,glob\)\*\*/\*.p12 :\(exclude,glob\)\*\*/\*.pfx`
- stdout: `raw/070_ls_client.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/070_ls_client.err` sha256 `<PRIVATE_REF_04490>` · redacted lines: 0
fatal: :(exclude,glob)**/.env: pathspec magic not supported by this command: 'glob', 'exclude' (mnemonic: '!')

### 071 — ls_client2
- start: 2026-10-01T03:17:51Z · end: 2026-10-01T03:17:51Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ sources/<ACCOUNT_EMAIL_044>\ ls-tree\ -r\ --name-only\ <PRIVATE_REF_04519>\ \|\ grep\ -Ev\ \'\(\^\|/\)\(\.env\(\..\*\)\?\|\.flaskenv\|\.netrc\|id_rsa.\*\)\$\|\.\(pem\|key\|p12\|pfx\)\$\|secret\|credential\'`
- stdout: `raw/071_ls_client2.out` sha256 `<PRIVATE_REF_04294>` · redacted lines: 0
.flake8
.github/FUNDING.yml
.github/dependabot.yml
.github/workflows/docker.yml
.github/workflows/release.yml
.github/workflows/tests.yml
.gitignore
.isort.cfg
.pre-commit-config.yaml
CHANGELOG.md
Dockerfile
LICENSE
MANIFEST.in
Makefile
NOTICE
README.md
VERSION
alertaclient/__init__.py
alertaclient/__main__.py
alertaclient/api.py
alertaclient/auth/__init__.py
alertaclient/auth/azure.py
alertaclient/auth/github.py
alertaclient/auth/gitlab.py
alertaclient/auth/google.py
alertaclient/auth/hmac.py
alertaclient/auth/oidc.py
alertaclient/auth/token.py
alertaclient/auth/utils.py
alertaclient/cli.py
alertaclient/commands/__init__.py
alertaclient/commands/cmd_ack.py
alertaclient/commands/cmd_action.py
alertaclient/commands/cmd_alerts.py
alertaclient/commands/cmd_blackout.py
alertaclient/commands/cmd_blackouts.py
alertaclient/commands/cmd_close.py
alertaclient/commands/cmd_config.py
alertaclient/commands/cmd_customer.py
alertaclient/commands/cmd_customers.py
alertaclient/commands/cmd_delete.py
alertaclient/commands/cmd_group.py
alertaclient/commands/cmd_groups.py
alertaclient/commands/cmd_heartbeat.py
alertaclient/commands/cmd_heartbeats.py
alertaclient/commands/cmd_help.py
alertaclient/commands/cmd_history.py
alertaclient/commands/cmd_housekeeping.py
alertaclient/commands/cmd_key.py
alertaclient/commands/cmd_keys.py
alertaclient/commands/cmd_login.py
alertaclient/commands/cmd_logout.py
alertaclient/commands/cmd_me.py
alertaclient/commands/cmd_note.py
alertaclient/commands/cmd_notes.py
alertaclient/commands/cmd_perm.py
alertaclient/commands/cmd_perms.py
alertaclient/commands/cmd_query.py
alertaclient/commands/cmd_raw.py
alertaclient/commands/cmd_revoke.py
alertaclient/commands/cmd_scopes.py
alertaclient/commands/cmd_send.py
alertaclient/commands/cmd_shelve.py
alertaclient/commands/cmd_signup.py
alertaclient/commands/cmd_status.py
alertaclient/commands/cmd_tag.py
alertaclient/commands/cmd_token.py
alertaclient/commands/cmd_top.py
alertaclient/commands/cmd_unack.py
alertaclient/commands/cmd_unshelve.py
alertaclient/commands/cmd_untag.py
alertaclient/commands/cmd_update.py
alertaclient/commands/cmd_uptime.py
alertaclient/commands/cmd_user.py
alertaclient/commands/cmd_users.py
alertaclient/commands/cmd_version.py
alertaclient/commands/cmd_watch.py
alertaclient/commands/cmd_whoami.py
alertaclient/config.py
alertaclient/exceptions.py
alertaclient/models/__init__.py
alertaclient/models/alert.py
alertaclient/models/blackout.py
alertaclient/models/customer.py
alertaclient/models/enums.py
alertaclient/models/group.py
alertaclient/models/heartbeat.py
alertaclient/models/history.py
alertaclient/models/key.py
alertaclient/models/note.py
alertaclient/models/permission.py
alertaclient/models/user.py
alertaclient/top.py
alertaclient/utils.py
alertaclient/version.py
docker-compose.ci.yaml
docs/images/alerta-top-132x25.png
docs/images/alerta-top-80x25.png
examples/alerta.conf
examples/send.py
mypy.ini
pylintrc
requirements-dev.txt
requirements.txt
setup.cfg
setup.py
tests/__init__.py
tests/integration/__init__.py
tests/integration/test_alerts.py
tests/integration/test_blackouts.py
tests/integration/test_customers.py
tests/integration/test_groups.py
tests/integration/test_heartbeats.py
tests/integration/test_history.py
tests/integration/test_keys.py
tests/integration/test_notes.py
tests/integration/test_permissions.py
tests/integration/test_users.py
tests/unit/__init__.py
tests/unit/test_alerts.py
tests/unit/test_blackouts.py
tests/unit/test_client.py
tests/unit/test_commands.py
tests/unit/test_config.py
tests/unit/test_customers.py
tests/unit/test_groups.py
tests/unit/test_heartbeats.py
tests/unit/test_history.py
tests/unit/test_http_client.py
tests/unit/test_keys.py
tests/unit/test_models.py
tests/unit/test_notes.py
tests/unit/test_permissions.py
tests/unit/test_remoteconfig.py
tests/unit/test_users.py
tox.ini
wait-for-it.sh
- stderr: `raw/071_ls_client2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 072 — client_grep_endpoint
- start: 2026-10-01T03:17:58Z · end: 2026-10-01T03:17:58Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> grep -n -E Client\\(\|endpoint\|ALERTA_\|environ\|requests_mock\|mock\|patch\\(\|localhost\|api:8080\|http:// <PRIVATE_REF_04519> -- tests/integration :\(exclude,glob\)\*\*/.env :\(exclude,glob\)\*\*/.env.\* :\(exclude,glob\)\*\*/.flaskenv :\(exclude,glob\)\*\*/\*.pem :\(exclude,glob\)\*\*/\*.key :\(exclude,glob\)\*\*/\*secret\* :\(exclude,glob\)\*\*/\*credential\* :\(exclude,glob\)\*\*/.netrc :\(exclude,glob\)\*\*/id_rsa\* :\(exclude,glob\)\*\*/\*.p12 :\(exclude,glob\)\*\*/\*.pfx`
- stdout: `raw/072_client_grep_endpoint.out` sha256 `<PRIVATE_REF_04615>` · redacted lines: 10
<PRIVATE_REF_04519>:tests/integration/test_alerts.py:9:        self.client = Client(endpoint='http://alerta:8080/api', key='<REDACTED>')
<PRIVATE_REF_04519>:tests/integration/test_alerts.py:13:            environment='Production', resource='web01', event='node_down', correlated=['node_up', 'node_down'],
<PRIVATE_REF_04519>:tests/integration/test_alerts.py:22:            environment='Production', resource='web02', event='node_down', correlated=['node_up', 'node_down'],
<PRIVATE_REF_04519>:tests/integration/test_blackouts.py:9:        self.client = Client(endpoint='http://alerta:8080/api', key='<REDACTED>')
<PRIVATE_REF_04519>:tests/integration/test_blackouts.py:13:            environment='Production', service=['Web', 'App'], resource='web01', event='node_down', group='Network',
<PRIVATE_REF_04519>:tests/integration/test_blackouts.py:18:        self.assertEqual(blackout.environment, 'Production')
<PRIVATE_REF_04519>:tests/integration/test_blackouts.py:24:        blackout = self.client.update_blackout(blackout_id, environment='Development', group='Network',
<PRIVATE_REF_04519>:tests/integration/test_blackouts.py:26:        self.assertEqual(blackout.environment, 'Development')
<PRIVATE_REF_04519>:tests/integration/test_blackouts.py:32:            environment='Production', service=['Core'], group='Network', origin='foo/baz'
<PRIVATE_REF_04519>:tests/integration/test_customers.py:9:        self.client = Client(endpoint='http://alerta:8080/api', key='<REDACTED>')
<PRIVATE_REF_04519>:tests/integration/test_groups.py:9:        self.client = Client(endpoint='http://alerta:8080/api', key='<REDACTED>')
<PRIVATE_REF_04519>:tests/integration/test_heartbeats.py:9:        self.client = Client(endpoint='http://alerta:8080/api', key='<REDACTED>')
<PRIVATE_REF_04519>:tests/integration/test_history.py:9:        self.client = Client(endpoint='http://alerta:8080/api', key='<REDACTED>')
<PRIVATE_REF_04519>:tests/integration/test_history.py:13:            environment='Production', resource='net03', event='node_down', correlated=['node_up', 'node_down', 'node_marginal'],
<PRIVATE_REF_04519>:tests/integration/test_history.py:17:            environment='Production', resource='net03', event='node_marginal', correlated=['node_up', 'node_down', 'node_marginal'],
<PRIVATE_REF_04519>:tests/integration/test_history.py:26:        self.assertEqual(hist[0].environment, 'Production')
<PRIVATE_REF_04519>:tests/integration/test_history.py:32:        self.assertEqual(hist[1].environment, 'Production')
<PRIVATE_REF_04519>:tests/integration/test_keys.py:10:        self.client = Client(endpoint='http://alerta:8080/api', key='<REDACTED>')
<PRIVATE_REF_04519>:tests/integration/test_notes.py:9:        self.client = Client(endpoint='http://alerta:8080/api', key='<REDACTED>')
<PRIVATE_REF_04519>:tests/integration/test_notes.py:12:        # add tests here when /notes endpoints are created
<PRIVATE_REF_04519>:tests/integration/test_permissions.py:9:        self.client = Client(endpoint='http://alerta:8080/api', key='<REDACTED>')
<PRIVATE_REF_04519>:tests/integration/test_users.py:9:        self.client = Client(endpoint='http://alerta:8080/api', key='<REDACTED>')
- stderr: `raw/072_client_grep_endpoint.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 073 — client_show_docker-compose_ci_yaml
- start: 2026-10-01T03:17:58Z · end: 2026-10-01T03:17:58Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> show <PRIVATE_REF_04519>:docker-compose.ci.yaml`
- stdout: `raw/073_client_show_docker-compose_ci_yaml.out` sha256 `<PRIVATE_REF_05126>` · redacted lines: 3
version: '3.7'

services:
  alerta:
    image: alerta/alerta-web
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
#      - DEBUG=1  # remove this line to turn DEBUG off
      - DATABASE_URL=<REDACTED>
      - AUTH_REQUIRED=True
      - ADMIN_USERS=<ACCOUNT_EMAIL_005>,<ACCOUNT_EMAIL_079> #default password: <REDACTED>
      - ADMIN_KEY=demo-key  # assigned to first user in ADMIN_USERS list
      # - PLUGINS=reject,blackout,normalise,enhance

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=monitoring
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=<REDACTED>
    restart: always

  sut:
    build: .
    depends_on:
      - alerta
    command: ["./wait-for-it.sh", "alerta:8080", "-t", "60", "--", "pytest", "tests/integration/"]
- stderr: `raw/073_client_show_docker-compose_ci_yaml.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 074 — client_show__github_workflows_tests_yml
- start: 2026-10-01T03:17:58Z · end: 2026-10-01T03:17:58Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> show <PRIVATE_REF_04519>:.github/workflows/tests.yml`
- stdout: `raw/074_client_show__github_workflows_tests_yml.out` sha256 `<PRIVATE_REF_04768>` · redacted lines: 0
name: Tests

on:
  push:
  pull_request:
    branches: [ master ]

env:
  SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
  REPOSITORY_URL: docker.pkg.github.com

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        python-version: ['3.10', '3.11', '3.12', '3.13', '3.14']

    steps:
      - uses: actions/checkout@v4
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}
      - name: Install dependencies
        id: install-deps
        run: |
          python -m pip install --upgrade pip
          pip install flake8 pytest
          pip install -r requirements.txt
          pip install -r requirements-dev.txt
          pip install .
      - name: Pre-commit hooks
        id: hooks
        run: |
          pre-commit run -a --show-diff-on-failure
      - name: Lint with flake8
        id: lint
        run: |
          flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
          flake8 . --count --exit-zero --max-complexity=50 --max-line-length=127 --statistics
      - name: Test with pytest
        id: unit-test
        run: |
          pytest --cov=alertaclient tests/unit
      - name: Integration Test
        id: integration-test
        run: |
          docker compose -f docker-compose.ci.yaml build sut
          docker compose -f docker-compose.ci.yaml up --exit-code-from sut
          docker compose -f docker-compose.ci.yaml rm --stop --force
      - uses: act10ns/slack@v2
        with:
          status: ${{ job.status }}
          steps: ${{ toJson(steps) }}
        if: failure()
- stderr: `raw/074_client_show__github_workflows_tests_yml.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 075 — client_show_Makefile
- start: 2026-10-01T03:17:59Z · end: 2026-10-01T03:17:59Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> show <PRIVATE_REF_04519>:Makefile`
- stdout: `raw/075_client_show_Makefile.out` sha256 `<PRIVATE_REF_04660>` · redacted lines: 0
#!make

VENV=venv
PYTHON=$(VENV)/bin/python3
PIP=$(VENV)/bin/pip --disable-pip-version-check
FLAKE8=$(VENV)/bin/flake8
MYPY=$(VENV)/bin/mypy
TOX=$(VENV)/bin/tox
PYTEST=$(VENV)/bin/pytest
DOCKER_COMPOSE=docker-compose
PRE_COMMIT=$(VENV)/bin/pre-commit
BUILD=$(VENV)/bin/build
WHEEL=$(VENV)/bin/wheel
TWINE=$(VENV)/bin/twine
GIT=git

.DEFAULT_GOAL:=help

-include .env .env.local .env.*.local

ifndef PROJECT
    $(error PROJECT is not set)
endif

PYPI_REPOSITORY ?= pypi
VERSION=$(shell cut -d "'" -f 2 $(PROJECT)/version.py)

all:	help

$(VENV):
	python3 -m venv $(VENV)

$(FLAKE8): $(VENV)
	$(PIP) install flake8

$(MYPY): $(VENV)
	$(PIP) install mypy

$(TOX): $(VENV)
	$(PIP) install tox

$(PYTEST): $(VENV)
	$(PIP) install pytest pytest-cov

$(PRE_COMMIT): $(VENV)
	$(PIP) install pre-commit
	$(PRE_COMMIT) install

$(BUILD): $(VENV)
	$(PIP) install --upgrade build

$(WHEEL): $(VENV)
	$(PIP) install --upgrade wheel

$(TWINE): $(VENV)
	$(PIP) install --upgrade wheel twine

ifdef TOXENV
    toxparams?=-e $(TOXENV)
endif

## install		- Install dependencies.
install: $(VENV)
	$(PIP) install -r requirements.txt

## hooks			- Run pre-commit hooks.
hooks: $(PRE_COMMIT)
	$(PRE_COMMIT) run --all-files --show-diff-on-failure

## lint			- Lint and type checking.
lint: $(FLAKE8) $(MYPY)
	$(FLAKE8) $(PROJECT)/
	$(MYPY) $(PROJECT)/

## test			- Run all tests.
test: test.unit test.integration

## test.unit		- Run unit tests.
test.unit: $(TOX) $(PYTEST)
	$(TOX) $(toxparams)

## test.integration	- Run integration tests.
test.integration:
	$(DOCKER_COMPOSE) -f docker-compose.ci.yaml rm --stop --force
	$(DOCKER_COMPOSE) -f docker-compose.ci.yaml pull
	$(DOCKER_COMPOSE) -f docker-compose.ci.yaml build sut
	$(DOCKER_COMPOSE) -f docker-compose.ci.yaml up --exit-code-from sut
	$(DOCKER_COMPOSE) -f docker-compose.ci.yaml rm --stop --force

## run			- Run application.
run:
	alerta

## tag			- Git tag with current version.
tag:
	$(GIT) tag -a v$(VERSION) -m "version $(VERSION)"
	$(GIT) push --tags

## build			- Build package.
build: $(BUILD)
	$(PYTHON) -m build

## upload			- Upload package to PyPI.
upload: $(TWINE)
	$(TWINE) check dist/*
	$(TWINE) upload --repository $(PYPI_REPOSITORY) --verbose dist/*

## clean			- Clean source.
clean:
	rm -rf $(VENV)
	rm -rf .tox
	rm -rf dist
	rm -rf build
	find . -name "*.pyc" -exec rm {} \;

## help			- Show this help.
help: Makefile
	@echo ''
	@echo 'Usage:'
	@echo '  make [TARGET]'
	@echo ''
	@echo 'Targets:'
	@sed -n 's/^##//p' $<
	@echo ''

	@echo 'Add project-specific env variables to .env file:'
	@echo 'PROJECT=$(PROJECT)'

.PHONY: help lint test build sdist wheel clean all
- stderr: `raw/075_client_show_Makefile.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 076 — client_show_tox_ini
- start: 2026-10-01T03:17:59Z · end: 2026-10-01T03:17:59Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> show <PRIVATE_REF_04519>:tox.ini`
- stdout: `raw/076_client_show_tox_ini.out` sha256 `<PRIVATE_REF_05303>` · redacted lines: 0
[tox]
envlist = py36,py37,py38,py39
skip_missing_interpreters=true

[testenv]
deps =
  pytest
  requests_mock

commands = pytest -s {posargs} tests/unit/
#passenv = *
setenv =
  ALERTA_CONF_FILE =
  ALERTA_DEFAULT_PROFILE =
- stderr: `raw/076_client_show_tox_ini.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0


## Notice N-1 — wrapper fault affecting entries 001–076 (appended; log not rewritten)

- Fault A: under zsh MULTIOS the wrapper's `2>&1 >file` redirection duplicated each (redacted) stdout capture into the "redacted lines" field of entries 001–076, so those entries inline capture content and their "redacted lines" counts are not meaningful.
- Fault B: the initial redaction keyword set missed `<NAME>_KEY=` assignments. One upstream public default admin-key value from python-alerta-client `docker-compose.ci.yaml` therefore remains inlined in entry 073 of this log. Capture file `raw/073_client_show_docker-compose_ci_yaml.out` was re-filtered and no longer contains it; its sha256 above is stale (current value recorded in FETCH_MANIFEST/SHA256SUMS).
- Fix from entry 077: `setopt NO_MULTIOS`, explicit count files, redact.pl extended to `*_KEY`/`KEY` assignments. A regeneration of entries 001–076 was attempted and denied by the host permission layer; it was not retried. Removal of the inlined value is an open Human Operator decision.

### 077 — wrapper_selftest2
- start: 2026-10-01T03:20:28Z · end: 2026-10-01T03:20:28Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c printf\ \"ADMIN_KEY=synthetic\nplain\n\"`
- stdout: `raw/077_wrapper_selftest2.out` sha256 `<PRIVATE_REF_04612>` · redacted lines: 1
- stderr: `raw/077_wrapper_selftest2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 078 — client_tags_at_head
- start: 2026-10-01T03:20:53Z · end: 2026-10-01T03:20:53Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> tag --points-at <PRIVATE_REF_04519>`
- stdout: `raw/078_client_tags_at_head.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/078_client_tags_at_head.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 079 — client_version
- start: 2026-10-01T03:20:53Z · end: 2026-10-01T03:20:53Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> show <PRIVATE_REF_04519>:VERSION`
- stdout: `raw/079_client_version.out` sha256 `<PRIVATE_REF_04076>` · redacted lines: 0
- stderr: `raw/079_client_version.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 080 — client_v853
- start: 2026-10-01T03:20:53Z · end: 2026-10-01T03:20:53Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> rev-parse v8.5.3\^\{commit\} v8.5.3\^\{tree\}`
- stdout: `raw/080_client_v853.out` sha256 `<PRIVATE_REF_04009>` · redacted lines: 0
- stderr: `raw/080_client_v853.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 081 — client_log_head
- start: 2026-10-01T03:20:53Z · end: 2026-10-01T03:20:53Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> log --format=%H\ %cI\ %s -8 <PRIVATE_REF_04519>`
- stdout: `raw/081_client_log_head.out` sha256 `<PRIVATE_REF_05386>` · redacted lines: 0
- stderr: `raw/081_client_log_head.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 082 — client_api_init
- start: 2026-10-01T03:20:53Z · end: 2026-10-01T03:20:53Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> grep -n -E class\ \(Client\|HTTPClient\)\|def\ __init__\|self\.endpoint\|requests\.\|Session\\(\|ALERTA_ENDPOINT\|def\ \(get\|post\|put\|delete\|_handle_error\)\b\|self\.session\.\(get\|post\|put\|delete\) <PRIVATE_REF_04519> -- alertaclient/api.py alertaclient/config.py`
- stdout: `raw/082_client_api_init.out` sha256 `<PRIVATE_REF_04193>` · redacted lines: 3
- stderr: `raw/082_client_api_init.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 083 — client_mock_integration
- start: 2026-10-01T03:20:53Z · end: 2026-10-01T03:20:53Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> grep -n -c -E requests_mock\|unittest\.mock\|from\ mock\|@patch\|patch\\(\|MagicMock\|responses\b\|httpretty\|vcr <PRIVATE_REF_04519> -- tests/integration`
- stdout: `raw/083_client_mock_integration.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/083_client_mock_integration.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 084 — client_mock_unit_posctl
- start: 2026-10-01T03:20:53Z · end: 2026-10-01T03:20:53Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> grep -n -c -E requests_mock\|unittest\.mock\|from\ mock\|@patch\|patch\\(\|MagicMock\|responses\b\|httpretty\|vcr <PRIVATE_REF_04519> -- tests/unit`
- stdout: `raw/084_client_mock_unit_posctl.out` sha256 `<PRIVATE_REF_04287>` · redacted lines: 0
- stderr: `raw/084_client_mock_unit_posctl.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 085 — client_tests_inventory
- start: 2026-10-01T03:20:53Z · end: 2026-10-01T03:20:53Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> grep -n -E \^\s\*def\ test_\|\^class\  <PRIVATE_REF_04519> -- tests/integration`
- stdout: `raw/085_client_tests_inventory.out` sha256 `<PRIVATE_REF_05434>` · redacted lines: 0
- stderr: `raw/085_client_tests_inventory.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 086 — client_testdefs_head
- start: 2026-10-01T03:21:02Z · end: 2026-10-01T03:21:02Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> grep -n -E \^\[\[:space:\]\]\*def\ \(test_\|setUp\) <PRIVATE_REF_04519> -- tests/integration`
- stdout: `raw/086_client_testdefs_head.out` sha256 `<PRIVATE_REF_05245>` · redacted lines: 0
- stderr: `raw/086_client_testdefs_head.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 087 — client_testdefs_v853
- start: 2026-10-01T03:21:02Z · end: 2026-10-01T03:21:02Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> grep -n -E \^\[\[:space:\]\]\*def\ \(test_\|setUp\) <PRIVATE_REF_05329> -- tests/integration`
- stdout: `raw/087_client_testdefs_v853.out` sha256 `<PRIVATE_REF_05146>` · redacted lines: 0
- stderr: `raw/087_client_testdefs_v853.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 088 — client_integ_diff_v853_head
- start: 2026-10-01T03:21:02Z · end: 2026-10-01T03:21:02Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> diff --stat <PRIVATE_REF_05329> <PRIVATE_REF_04519> -- tests/integration alertaclient/api.py`
- stdout: `raw/088_client_integ_diff_v853_head.out` sha256 `<PRIVATE_REF_05287>` · redacted lines: 0
- stderr: `raw/088_client_integ_diff_v853_head.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 089 — client_integration_bodies
- start: 2026-10-01T03:21:09Z · end: 2026-10-01T03:21:09Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c for\ f\ in\ \$\(git\ -C\ sources/<ACCOUNT_EMAIL_044>\ ls-tree\ --name-only\ <PRIVATE_REF_04519>\ tests/integration/\ \|\ grep\ \'test_.\*\.py\$\'\)\;\ do\ echo\ \"\#\#\#\#\#\ \$f\ blob=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_044>\ rev-parse\ <PRIVATE_REF_04519>:\$f\)\"\;\ git\ -C\ sources/<ACCOUNT_EMAIL_044>\ show\ <PRIVATE_REF_04519>:\$f\ \|\ sed\ -n\ \'1,200p\'\;\ done`
- stdout: `raw/089_client_integration_bodies.out` sha256 `<PRIVATE_REF_04094>` · redacted lines: 14
- stderr: `raw/089_client_integration_bodies.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 090 — client_paths_head
- start: 2026-10-01T03:21:37Z · end: 2026-10-01T03:21:37Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ sources/<ACCOUNT_EMAIL_044>\ show\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/4cb6a1a48b953fdc5cdfec98874242808087429clertaclient/api.py\ \|\ grep\ -n\ -E\ \"def\ \(send_alert\|alert_note\|get_alert_notes\|update_alert_note\|delete_alert_note\|create_blackout\|update_blackout\|get_blackouts\|delete_blackout\|create_customer\|update_customer\|get_customers\|delete_customer\|create_group\|update_group\|get_users_groups\|delete_group\|heartbeat\|get_history\|create_key\|update_key\|get_keys\|delete_key\|create_perm\|get_users\)\b\|self\.http\.\(get\|post\|put\|delete\)\\(\"`
- stdout: `raw/090_client_paths_head.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/090_client_paths_head.err` sha256 `<PRIVATE_REF_05363>` · redacted lines: 0

### 091 — backend_routes
- start: 2026-10-01T03:21:37Z · end: 2026-10-01T03:21:37Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -h -o -E @api\.route\\(\'\[\^\'\]+\',\ methods=\\[\[\^\]\]+\\] <PRIVATE_REF_01617> -- alerta/views alerta/management`
- stdout: `raw/091_backend_routes.out` sha256 `<PRIVATE_REF_05270>` · redacted lines: 0
- stderr: `raw/091_backend_routes.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 092 — client_paths_head2
- start: 2026-10-01T03:21:45Z · end: 2026-10-01T03:21:45Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> grep -n -E \ \ \ \ def\ \[a-z_\]+\\(\|self\.http\.\(get\|post\|put\|delete\)\\( <PRIVATE_REF_04519> -- alertaclient/api.py`
- stdout: `raw/092_client_paths_head2.out` sha256 `<PRIVATE_REF_04439>` · redacted lines: 6
- stderr: `raw/092_client_paths_head2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 093 — backend_admin_bootstrap
- start: 2026-10-01T03:22:01Z · end: 2026-10-01T03:22:01Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E ADMIN_KEY\|ADMIN_USERS\|ADMIN_PASSWORD\|DEFAULT_ADMIN_ROLE\|ALERT_TIMEOUT\ \*=\|HISTORY_LIMIT\ \*= <PRIVATE_REF_01617> -- alerta :\(exclude,glob\)\*\*/.env :\(exclude,glob\)\*\*/.env.\* :\(exclude,glob\)\*\*/.flaskenv :\(exclude,glob\)\*\*/\*.pem :\(exclude,glob\)\*\*/\*.key :\(exclude,glob\)\*\*/\*secret\* :\(exclude,glob\)\*\*/\*credential\* :\(exclude,glob\)\*\*/.netrc :\(exclude,glob\)\*\*/id_rsa\* :\(exclude,glob\)\*\*/\*.p12 :\(exclude,glob\)\*\*/\*.pfx`
- stdout: `raw/093_backend_admin_bootstrap.out` sha256 `<PRIVATE_REF_04060>` · redacted lines: 0
- stderr: `raw/093_backend_admin_bootstrap.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 094 — tree_docker-alerta
- start: 2026-10-01T03:22:01Z · end: 2026-10-01T03:22:01Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ sources/<ACCOUNT_EMAIL_014>\ ls-tree\ -r\ --name-only\ <PRIVATE_REF_05335>\ \|\ grep\ -Ev\ \'\(\^\|/\)\(\.env\(\..\*\)\?\|\.flaskenv\|\.netrc\|id_rsa.\*\)\$\|\.\(pem\|key\|p12\|pfx\)\$\|secret\|credential\'`
- stdout: `raw/094_tree_docker-alerta.out` sha256 `<PRIVATE_REF_05118>` · redacted lines: 0
- stderr: `raw/094_tree_docker-alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 095 — tree_alerta-contrib
- start: 2026-10-01T03:22:01Z · end: 2026-10-01T03:22:01Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ sources/<ACCOUNT_EMAIL_006>\ ls-tree\ -r\ --name-only\ <PRIVATE_REF_03984>\ \|\ grep\ -Ev\ \'\(\^\|/\)\(\.env\(\..\*\)\?\|\.flaskenv\|\.netrc\|id_rsa.\*\)\$\|\.\(pem\|key\|p12\|pfx\)\$\|secret\|credential\'`
- stdout: `raw/095_tree_alerta-contrib.out` sha256 `<PRIVATE_REF_04291>` · redacted lines: 0
- stderr: `raw/095_tree_alerta-contrib.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 096 — tree_vagrant-try-alerta
- start: 2026-10-01T03:22:01Z · end: 2026-10-01T03:22:01Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ sources/<ACCOUNT_EMAIL_065>\ ls-tree\ -r\ --name-only\ <PRIVATE_REF_05792>\ \|\ grep\ -Ev\ \'\(\^\|/\)\(\.env\(\..\*\)\?\|\.flaskenv\|\.netrc\|id_rsa.\*\)\$\|\.\(pem\|key\|p12\|pfx\)\$\|secret\|credential\'`
- stdout: `raw/096_tree_vagrant-try-alerta.out` sha256 `<PRIVATE_REF_04384>` · redacted lines: 0
- stderr: `raw/096_tree_vagrant-try-alerta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 097 — tree_packer-templates
- start: 2026-10-01T03:22:01Z · end: 2026-10-01T03:22:01Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ sources/<ACCOUNT_EMAIL_039>\ ls-tree\ -r\ --name-only\ <PRIVATE_REF_04757>\ \|\ grep\ -Ev\ \'\(\^\|/\)\(\.env\(\..\*\)\?\|\.flaskenv\|\.netrc\|id_rsa.\*\)\$\|\.\(pem\|key\|p12\|pfx\)\$\|secret\|credential\'`
- stdout: `raw/097_tree_packer-templates.out` sha256 `<PRIVATE_REF_05337>` · redacted lines: 0
- stderr: `raw/097_tree_packer-templates.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 098 — tree_angular-alerta-explorer
- start: 2026-10-01T03:22:01Z · end: 2026-10-01T03:22:01Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ sources/<ACCOUNT_EMAIL_010>\ ls-tree\ -r\ --name-only\ <PRIVATE_REF_05561>\ \|\ grep\ -Ev\ \'\(\^\|/\)\(\.env\(\..\*\)\?\|\.flaskenv\|\.netrc\|id_rsa.\*\)\$\|\.\(pem\|key\|p12\|pfx\)\$\|secret\|credential\'`
- stdout: `raw/098_tree_angular-alerta-explorer.out` sha256 `<PRIVATE_REF_04169>` · redacted lines: 0
- stderr: `raw/098_tree_angular-alerta-explorer.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 099 — dkr_tests_spec_helpers_client_rb
- start: 2026-10-01T03:22:30Z · end: 2026-10-01T03:22:30Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> show <PRIVATE_REF_05335>:tests/spec/helpers/client.rb`
- stdout: `raw/099_dkr_tests_spec_helpers_client_rb.out` sha256 `<PRIVATE_REF_05856>` · redacted lines: 0
- stderr: `raw/099_dkr_tests_spec_helpers_client_rb.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 100 — dkr_tests_spec_helpers_spec_helper_rb
- start: 2026-10-01T03:22:30Z · end: 2026-10-01T03:22:30Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> show <PRIVATE_REF_05335>:tests/spec/helpers/spec_helper.rb`
- stdout: `raw/100_dkr_tests_spec_helpers_spec_helper_rb.out` sha256 `<PRIVATE_REF_05098>` · redacted lines: 0
- stderr: `raw/100_dkr_tests_spec_helpers_spec_helper_rb.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 101 — dkr_tests_docker-compose_test_postgres_yml
- start: 2026-10-01T03:22:30Z · end: 2026-10-01T03:22:30Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> show <PRIVATE_REF_05335>:tests/docker-compose.test.postgres.yml`
- stdout: `raw/101_dkr_tests_docker-compose_test_postgres_yml.out` sha256 `<PRIVATE_REF_05274>` · redacted lines: 5
- stderr: `raw/101_dkr_tests_docker-compose_test_postgres_yml.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 102 — dkr_tests_docker_Dockerfile
- start: 2026-10-01T03:22:30Z · end: 2026-10-01T03:22:30Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> show <PRIVATE_REF_05335>:tests/docker/Dockerfile`
- stdout: `raw/102_dkr_tests_docker_Dockerfile.out` sha256 `<PRIVATE_REF_05908>` · redacted lines: 0
- stderr: `raw/102_dkr_tests_docker_Dockerfile.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 103 — dkr__github_workflows_tests_yml
- start: 2026-10-01T03:22:30Z · end: 2026-10-01T03:22:30Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> show <PRIVATE_REF_05335>:.github/workflows/tests.yml`
- stdout: `raw/103_dkr__github_workflows_tests_yml.out` sha256 `<PRIVATE_REF_05183>` · redacted lines: 0
- stderr: `raw/103_dkr__github_workflows_tests_yml.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 104 — dkr_spec_counts
- start: 2026-10-01T03:22:31Z · end: 2026-10-01T03:22:31Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> grep -c -E \^\[\[:space:\]\]\*it\[\[:space:\]\]+\[\'\"\] <PRIVATE_REF_05335> -- tests/spec`
- stdout: `raw/104_dkr_spec_counts.out` sha256 `<PRIVATE_REF_05654>` · redacted lines: 0
- stderr: `raw/104_dkr_spec_counts.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 105 — dkr_tests_spec_api_spec_rb
- start: 2026-10-01T03:22:36Z · end: 2026-10-01T03:22:36Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> show <PRIVATE_REF_05335>:tests/spec/api_spec.rb`
- stdout: `raw/105_dkr_tests_spec_api_spec_rb.out` sha256 `<PRIVATE_REF_04957>` · redacted lines: 1
- stderr: `raw/105_dkr_tests_spec_api_spec_rb.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 106 — dkr_tests_spec_web_spec_rb
- start: 2026-10-01T03:22:36Z · end: 2026-10-01T03:22:36Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> show <PRIVATE_REF_05335>:tests/spec/web_spec.rb`
- stdout: `raw/106_dkr_tests_spec_web_spec_rb.out` sha256 `<PRIVATE_REF_04781>` · redacted lines: 0
- stderr: `raw/106_dkr_tests_spec_web_spec_rb.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 107 — dkr_tests_docker_Gemfile
- start: 2026-10-01T03:22:36Z · end: 2026-10-01T03:22:36Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> show <PRIVATE_REF_05335>:tests/docker/Gemfile`
- stdout: `raw/107_dkr_tests_docker_Gemfile.out` sha256 `<PRIVATE_REF_05339>` · redacted lines: 0
- stderr: `raw/107_dkr_tests_docker_Gemfile.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 108 — dkr_tests_docker__rspec
- start: 2026-10-01T03:22:36Z · end: 2026-10-01T03:22:36Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> show <PRIVATE_REF_05335>:tests/docker/.rspec`
- stdout: `raw/108_dkr_tests_docker__rspec.out` sha256 `<PRIVATE_REF_05964>` · redacted lines: 0
- stderr: `raw/108_dkr_tests_docker__rspec.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 109 — dkr_VERSION
- start: 2026-10-01T03:22:36Z · end: 2026-10-01T03:22:36Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> show <PRIVATE_REF_05335>:VERSION`
- stdout: `raw/109_dkr_VERSION.out` sha256 `<PRIVATE_REF_00552>` · redacted lines: 0
- stderr: `raw/109_dkr_VERSION.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0


## Notice N-2 — redaction rule extension at 2026-10-01T03:23:08Z

- Capture 107 (docker-alerta `tests/spec/api_spec.rb`) contained an upstream public default API-key literal in Ruby hash-rocket form (`'x-api-key' => '…'`), which the filter did not match. redact.pl was extended for `=>`/`:`/`=` forms of api-key/key/token/secret/password literals; all captures in raw/ were re-filtered (changed files listed in SHA256SUMS at completion). This log never inlined content after entry 077, so it is unaffected by this miss.

- Correction to N-2: the affected capture is `raw/105_dkr_tests_spec_api_spec_rb.out` (not 107).
### 110 — dkr_entrypoint_admin
- start: 2026-10-01T03:23:36Z · end: 2026-10-01T03:23:36Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_014> grep -n -E ADMIN_KEY\|alertad\ \(key\|user\)\|ADMIN_USERS\|pip\ install\|alerta-server\|ALERTA_SVR <PRIVATE_REF_05335> -- docker-entrypoint.sh Dockerfile requirements\*.txt`
- stdout: `raw/110_dkr_entrypoint_admin.out` sha256 `<PRIVATE_REF_05691>` · redacted lines: 1
- stderr: `raw/110_dkr_entrypoint_admin.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 111 — prov_links_backend
- start: 2026-10-01T03:23:36Z · end: 2026-10-01T03:23:36Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E github.com/alerta/\(python-alerta-client\|docker-alerta\)\|alerta-client\|docker-alerta <PRIVATE_REF_01617> -- README.md docs setup.py`
- stdout: `raw/111_prov_links_backend.out` sha256 `<PRIVATE_REF_05208>` · redacted lines: 0
- stderr: `raw/111_prov_links_backend.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 112 — prov_links_docs
- start: 2026-10-01T03:23:36Z · end: 2026-10-01T03:23:36Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_007> grep -n -E github.com/alerta/\(python-alerta-client\|docker-alerta\) <PRIVATE_REF_05236>`
- stdout: `raw/112_prov_links_docs.out` sha256 `<PRIVATE_REF_05073>` · redacted lines: 0
- stderr: `raw/112_prov_links_docs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 113 — client_api_diff_v853_head
- start: 2026-10-01T03:23:54Z · end: 2026-10-01T03:23:54Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> diff -U2 <PRIVATE_REF_05329> <PRIVATE_REF_04519> -- alertaclient/api.py`
- stdout: `raw/113_client_api_diff_v853_head.out` sha256 `<PRIVATE_REF_05130>` · redacted lines: 24
- stderr: `raw/113_client_api_diff_v853_head.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 114 — backend_semantics
- start: 2026-10-01T03:24:10Z · end: 2026-10-01T03:24:10Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E \^DEFAULT_TIMEOUT\|\^ALERT_TIMEOUT\|\'--key\'\|\'--password\'\|\'--all\'\|def\ \(user\|key\)\\(\|change_type=ChangeType\.\|ChangeType\.new\|ChangeType\.severity\|request\.json\.get\\(\'key\'\|data\.get\\(\'key\'\\)\|key=request <PRIVATE_REF_01617> -- alerta/settings.py alerta/commands.py alerta/models/alert.py alerta/views/keys.py alerta/models/key.py :\(exclude,glob\)\*\*/.env :\(exclude,glob\)\*\*/.env.\* :\(exclude,glob\)\*\*/.flaskenv :\(exclude,glob\)\*\*/\*.pem :\(exclude,glob\)\*\*/\*.key :\(exclude,glob\)\*\*/\*secret\* :\(exclude,glob\)\*\*/\*credential\* :\(exclude,glob\)\*\*/.netrc :\(exclude,glob\)\*\*/id_rsa\* :\(exclude,glob\)\*\*/\*.p12 :\(exclude,glob\)\*\*/\*.pfx`
- stdout: `raw/114_backend_semantics.out` sha256 `<PRIVATE_REF_04825>` · redacted lines: 0
- stderr: `raw/114_backend_semantics.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 115 — backend_key_parse
- start: 2026-10-01T03:24:21Z · end: 2026-10-01T03:24:21Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E json\.get\\(.key.\|get\\(.key.\\)\|def\ parse\|key_generator\|generate <PRIVATE_REF_01617> -- alerta/models/key.py alerta/views/keys.py`
- stdout: `raw/115_backend_key_parse.out` sha256 `<PRIVATE_REF_05047>` · redacted lines: 2
- stderr: `raw/115_backend_key_parse.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 116 — backend_history_order
- start: 2026-10-01T03:24:21Z · end: 2026-10-01T03:24:21Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E def\ get_history\|ORDER\ BY\|sort\\(\|reverse\|HISTORY <PRIVATE_REF_01617> -- alerta/views/alerts.py`
- stdout: `raw/116_backend_history_order.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/116_backend_history_order.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 117 — cand_backend_inprocess
- start: 2026-10-01T03:24:51Z · end: 2026-10-01T03:24:51Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -l -E test_client\\(\\) <PRIVATE_REF_01617> -- tests`
- stdout: `raw/117_cand_backend_inprocess.out` sha256 `<PRIVATE_REF_04782>` · redacted lines: 0
- stderr: `raw/117_cand_backend_inprocess.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 118 — cand_backend_livehttp
- start: 2026-10-01T03:24:51Z · end: 2026-10-01T03:24:51Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -l -E requests\.\(get\|post\|put\|delete\)\\( <PRIVATE_REF_01617> -- tests`
- stdout: `raw/118_cand_backend_livehttp.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/118_cand_backend_livehttp.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 119 — cand_backend_livehttp_posctl
- start: 2026-10-01T03:24:51Z · end: 2026-10-01T03:24:51Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -l -E requests\.\(get\|post\|put\|delete\)\\( <PRIVATE_REF_01617> -- alerta`
- stdout: `raw/119_cand_backend_livehttp_posctl.out` sha256 `<PRIVATE_REF_04391>` · redacted lines: 0
- stderr: `raw/119_cand_backend_livehttp_posctl.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 120 — cand_webui_intercept
- start: 2026-10-01T03:24:51Z · end: 2026-10-01T03:24:51Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_008> grep -c -E cy\.\(intercept\|mockApi\|mockAlertDetail\) <PRIVATE_REF_03446> -- tests/e2e`
- stdout: `raw/120_cand_webui_intercept.out` sha256 `<PRIVATE_REF_05592>` · redacted lines: 0
- stderr: `raw/120_cand_webui_intercept.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 121 — cand_webui_specs
- start: 2026-10-01T03:24:51Z · end: 2026-10-01T03:24:51Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_008> grep -c -E \^\[\[:space:\]\]\*it\\( <PRIVATE_REF_03446> -- tests/e2e/specs`
- stdout: `raw/121_cand_webui_specs.out` sha256 `<PRIVATE_REF_05599>` · redacted lines: 0
- stderr: `raw/121_cand_webui_specs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 122 — cand_contrib_tests
- start: 2026-10-01T03:24:51Z · end: 2026-10-01T03:24:51Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_006> grep -c -E create_app\|test_client\|unittest\|requests_mock\|mock <PRIVATE_REF_03984> -- \*test\*`
- stdout: `raw/122_cand_contrib_tests.out` sha256 `<PRIVATE_REF_04254>` · redacted lines: 0
- stderr: `raw/122_cand_contrib_tests.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 123 — cand_explorer_e2e
- start: 2026-10-01T03:24:51Z · end: 2026-10-01T03:24:51Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_010> grep -n -E browser\.get\|baseUrl\|http://\|describe\\( <PRIVATE_REF_05561> -- test`
- stdout: `raw/123_cand_explorer_e2e.out` sha256 `<PRIVATE_REF_04204>` · redacted lines: 0
- stderr: `raw/123_cand_explorer_e2e.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 124 — a3n_fix_commits
- start: 2026-10-01T03:25:07Z · end: 2026-10-01T03:25:08Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> log --no-merges -i -E --grep=fix\|bug\|regression\|broken\|wrong\|incorrect --format=@@\ %H\ %cs\ %s --name-only <PRIVATE_REF_01617> -- alerta tests`
- stdout: `raw/124_a3n_fix_commits.out` sha256 `<PRIVATE_REF_04814>` · redacted lines: 0
- stderr: `raw/124_a3n_fix_commits.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 125 — a3n_stat_<PRIVATE_REF_05761>
- start: 2026-10-01T03:25:27Z · end: 2026-10-01T03:25:27Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> show --stat --format=%H%n%an\ %cI%n%s%n%b <PRIVATE_REF_05761>`
- stdout: `raw/125_a3n_stat_<PRIVATE_REF_05761>.out` sha256 `<PRIVATE_REF_05199>` · redacted lines: 0
- stderr: `raw/125_a3n_stat_<PRIVATE_REF_05761>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 126 — a3n_stat_<PRIVATE_REF_04149>
- start: 2026-10-01T03:25:27Z · end: 2026-10-01T03:25:27Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> show --stat --format=%H%n%an\ %cI%n%s%n%b <PRIVATE_REF_04149>`
- stdout: `raw/126_a3n_stat_<PRIVATE_REF_04149>.out` sha256 `<PRIVATE_REF_04551>` · redacted lines: 0
- stderr: `raw/126_a3n_stat_<PRIVATE_REF_04149>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 127 — a3n_stat_<PRIVATE_REF_03788>
- start: 2026-10-01T03:25:27Z · end: 2026-10-01T03:25:27Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> show --stat --format=%H%n%an\ %cI%n%s%n%b <PRIVATE_REF_03788>`
- stdout: `raw/127_a3n_stat_<PRIVATE_REF_03788>.out` sha256 `<PRIVATE_REF_04522>` · redacted lines: 0
- stderr: `raw/127_a3n_stat_<PRIVATE_REF_03788>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 128 — a3n_stat_<PRIVATE_REF_05192>
- start: 2026-10-01T03:25:27Z · end: 2026-10-01T03:25:27Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> show --stat --format=%H%n%an\ %cI%n%s%n%b <PRIVATE_REF_05192>`
- stdout: `raw/128_a3n_stat_<PRIVATE_REF_05192>.out` sha256 `<PRIVATE_REF_05825>` · redacted lines: 0
- stderr: `raw/128_a3n_stat_<PRIVATE_REF_05192>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 129 — a3n_stat_<PRIVATE_REF_04308>
- start: 2026-10-01T03:25:27Z · end: 2026-10-01T03:25:27Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> show --stat --format=%H%n%an\ %cI%n%s%n%b <PRIVATE_REF_04308>`
- stdout: `raw/129_a3n_stat_<PRIVATE_REF_04308>.out` sha256 `<PRIVATE_REF_04092>` · redacted lines: 0
- stderr: `raw/129_a3n_stat_<PRIVATE_REF_04308>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 130 — a3n_stat_<PRIVATE_REF_04496>
- start: 2026-10-01T03:25:27Z · end: 2026-10-01T03:25:27Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> show --stat --format=%H%n%an\ %cI%n%s%n%b <PRIVATE_REF_04496>`
- stdout: `raw/130_a3n_stat_<PRIVATE_REF_04496>.out` sha256 `<PRIVATE_REF_04505>` · redacted lines: 0
- stderr: `raw/130_a3n_stat_<PRIVATE_REF_04496>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 131 — a3n_codediff_<PRIVATE_REF_05761>
- start: 2026-10-01T03:25:42Z · end: 2026-10-01T03:25:42Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> diff <PRIVATE_REF_05761>\^ <PRIVATE_REF_05761> -- alerta`
- stdout: `raw/131_a3n_codediff_<PRIVATE_REF_05761>.out` sha256 `<PRIVATE_REF_03782>` · redacted lines: 0
- stderr: `raw/131_a3n_codediff_<PRIVATE_REF_05761>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 132 — a3n_codediff_<PRIVATE_REF_03788>
- start: 2026-10-01T03:25:42Z · end: 2026-10-01T03:25:42Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> diff <PRIVATE_REF_03788>\^ <PRIVATE_REF_03788> -- alerta`
- stdout: `raw/132_a3n_codediff_<PRIVATE_REF_03788>.out` sha256 `<PRIVATE_REF_04241>` · redacted lines: 0
- stderr: `raw/132_a3n_codediff_<PRIVATE_REF_03788>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 133 — a3n_codediff_<PRIVATE_REF_04496>
- start: 2026-10-01T03:25:42Z · end: 2026-10-01T03:25:42Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> diff <PRIVATE_REF_04496>\^ <PRIVATE_REF_04496> -- alerta`
- stdout: `raw/133_a3n_codediff_<PRIVATE_REF_04496>.out` sha256 `<PRIVATE_REF_04820>` · redacted lines: 0
- stderr: `raw/133_a3n_codediff_<PRIVATE_REF_04496>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 134 — a3n_g_user_login
- start: 2026-10-01T03:25:58Z · end: 2026-10-01T03:25:58Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E g\.\(user\|login\|user_id\)\[\[:space:\]\]\*= <PRIVATE_REF_01617> -- alerta/auth/decorators.py alerta/auth/utils.py`
- stdout: `raw/134_a3n_g_user_login.out` sha256 `<PRIVATE_REF_04010>` · redacted lines: 0
- stderr: `raw/134_a3n_g_user_login.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 135 — a3n_note_from_alert
- start: 2026-10-01T03:25:58Z · end: 2026-10-01T03:25:58Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E user=g\.\|g\.login\|g\.user <PRIVATE_REF_01617> -- alerta/models/note.py alerta/views/alerts.py`
- stdout: `raw/135_a3n_note_from_alert.out` sha256 `<PRIVATE_REF_05123>` · redacted lines: 0
- stderr: `raw/135_a3n_note_from_alert.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 136 — a3n_client_note_parse
- start: 2026-10-01T03:25:58Z · end: 2026-10-01T03:25:58Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> grep -n -E \'user\'\|def\ parse\|self\.user <PRIVATE_REF_04519> -- alertaclient/models/note.py`
- stdout: `raw/136_a3n_client_note_parse.out` sha256 `<PRIVATE_REF_05733>` · redacted lines: 0
- stderr: `raw/136_a3n_client_note_parse.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 137 — a3n_value_hist
- start: 2026-10-01T03:26:12Z · end: 2026-10-01T03:26:12Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> log --no-merges -i -E --grep=value\|string\|cast\|timeout\|int\b\|change.\?type\|history\|scope\|perm\|origin\|event.\?type\|note --format=%h\ %cs\ %s <PRIVATE_REF_01617> -- alerta/models alerta/views alerta/database/backends/postgres`
- stdout: `raw/137_a3n_value_hist.out` sha256 `<PRIVATE_REF_05911>` · redacted lines: 1
- stderr: `raw/137_a3n_value_hist.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 138 — applychk_<PRIVATE_REF_05761>
- start: 2026-10-01T03:26:50Z · end: 2026-10-01T03:26:50Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh <PRIVATE_REF_05761> a3n_<PRIVATE_REF_05761>`
- stdout: `raw/138_applychk_<PRIVATE_REF_05761>.out` sha256 `<PRIVATE_REF_05105>` · redacted lines: 0
- stderr: `raw/138_applychk_<PRIVATE_REF_05761>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 139 — applychk_95f9f26b
- start: 2026-10-01T03:26:50Z · end: 2026-10-01T03:26:50Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh 95f9f26b a3n_95f9f26b`
- stdout: `raw/139_applychk_95f9f26b.out` sha256 `<PRIVATE_REF_04361>` · redacted lines: 0
- stderr: `raw/139_applychk_95f9f26b.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 140 — applychk_f12c552c
- start: 2026-10-01T03:26:50Z · end: 2026-10-01T03:26:50Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh f12c552c a3n_f12c552c`
- stdout: `raw/140_applychk_f12c552c.out` sha256 `<PRIVATE_REF_04946>` · redacted lines: 0
- stderr: `raw/140_applychk_f12c552c.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 141 — applychk_8e802119
- start: 2026-10-01T03:26:50Z · end: 2026-10-01T03:26:50Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh 8e802119 a3n_8e802119`
- stdout: `raw/141_applychk_8e802119.out` sha256 `<PRIVATE_REF_05280>` · redacted lines: 0
- stderr: `raw/141_applychk_8e802119.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 142 — applychk_cffff425
- start: 2026-10-01T03:26:50Z · end: 2026-10-01T03:26:51Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh cffff425 a3n_cffff425`
- stdout: `raw/142_applychk_cffff425.out` sha256 `<PRIVATE_REF_05823>` · redacted lines: 0
- stderr: `raw/142_applychk_cffff425.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 143 — applychk_465d5081
- start: 2026-10-01T03:26:51Z · end: 2026-10-01T03:26:51Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh 465d5081 a3n_465d5081`
- stdout: `raw/143_applychk_465d5081.out` sha256 `<PRIVATE_REF_05913>` · redacted lines: 0
- stderr: `raw/143_applychk_465d5081.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 144 — applychk_8a8bb90b
- start: 2026-10-01T03:26:51Z · end: 2026-10-01T03:26:51Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh 8a8bb90b a3n_8a8bb90b`
- stdout: `raw/144_applychk_8a8bb90b.out` sha256 `<PRIVATE_REF_05732>` · redacted lines: 0
- stderr: `raw/144_applychk_8a8bb90b.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 145 — applychk_5911e686
- start: 2026-10-01T03:26:51Z · end: 2026-10-01T03:26:51Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh 5911e686 a3n_5911e686`
- stdout: `raw/145_applychk_5911e686.out` sha256 `<PRIVATE_REF_05506>` · redacted lines: 0
- stderr: `raw/145_applychk_5911e686.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 146 — applychk_7397b21a
- start: 2026-10-01T03:26:51Z · end: 2026-10-01T03:26:51Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh <PRIVATE_REF_04815> a3n_7397b21a`
- stdout: `raw/146_applychk_7397b21a.out` sha256 `<PRIVATE_REF_04411>` · redacted lines: 0
- stderr: `raw/146_applychk_7397b21a.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 147 — applychk_1a788312
- start: 2026-10-01T03:26:51Z · end: 2026-10-01T03:26:51Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh 1a788312 a3n_1a788312`
- stdout: `raw/147_applychk_1a788312.out` sha256 `<PRIVATE_REF_05850>` · redacted lines: 0
- stderr: `raw/147_applychk_1a788312.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 148 — applychk_6e42cf68
- start: 2026-10-01T03:26:51Z · end: 2026-10-01T03:26:51Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh 6e42cf68 a3n_6e42cf68`
- stdout: `raw/148_applychk_6e42cf68.out` sha256 `<PRIVATE_REF_05719>` · redacted lines: 0
- stderr: `raw/148_applychk_6e42cf68.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 149 — applychk_<PRIVATE_REF_04308>
- start: 2026-10-01T03:26:51Z · end: 2026-10-01T03:26:52Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh <PRIVATE_REF_04308> a3n_<PRIVATE_REF_04308>`
- stdout: `raw/149_applychk_<PRIVATE_REF_04308>.out` sha256 `<PRIVATE_REF_05161>` · redacted lines: 0
- stderr: `raw/149_applychk_<PRIVATE_REF_04308>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 150 — applychk_<PRIVATE_REF_04496>
- start: 2026-10-01T03:26:52Z · end: 2026-10-01T03:26:52Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh <PRIVATE_REF_04496> a3n_<PRIVATE_REF_04496>`
- stdout: `raw/150_applychk_<PRIVATE_REF_04496>.out` sha256 `<PRIVATE_REF_04233>` · redacted lines: 0
- stderr: `raw/150_applychk_<PRIVATE_REF_04496>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 151 — applychk_<PRIVATE_REF_03788>
- start: 2026-10-01T03:26:52Z · end: 2026-10-01T03:26:52Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh <PRIVATE_REF_03788> a3n_<PRIVATE_REF_03788>`
- stdout: `raw/151_applychk_<PRIVATE_REF_03788>.out` sha256 `<PRIVATE_REF_04749>` · redacted lines: 0
- stderr: `raw/151_applychk_<PRIVATE_REF_03788>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 152 — applychk_<PRIVATE_REF_04149>
- start: 2026-10-01T03:26:52Z · end: 2026-10-01T03:26:52Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh <PRIVATE_REF_04149> a3n_<PRIVATE_REF_04149>`
- stdout: `raw/152_applychk_<PRIVATE_REF_04149>.out` sha256 `<PRIVATE_REF_04341>` · redacted lines: 0
- stderr: `raw/152_applychk_<PRIVATE_REF_04149>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 153 — applychk_<PRIVATE_REF_05192>
- start: 2026-10-01T03:26:52Z · end: 2026-10-01T03:26:52Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `/bin/bash tools/apply_check.sh <PRIVATE_REF_05192> a3n_<PRIVATE_REF_05192>`
- stdout: `raw/153_applychk_<PRIVATE_REF_05192>.out` sha256 `<PRIVATE_REF_03790>` · redacted lines: 0
- stderr: `raw/153_applychk_<PRIVATE_REF_05192>.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 154 — a3n_value_cast
- start: 2026-10-01T03:27:31Z · end: 2026-10-01T03:27:31Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E value.\*str\\(\|str\\(.\*value\|int\\(.\*timeout\|timeout.\*int\\( <PRIVATE_REF_01617> -- alerta/models/alert.py alerta/models/heartbeat.py alerta/models/history.py`
- stdout: `raw/154_a3n_value_cast.out` sha256 `<PRIVATE_REF_05770>` · redacted lines: 0
- stderr: `raw/154_a3n_value_cast.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 155 — a3n_value_docs
- start: 2026-10-01T03:27:31Z · end: 2026-10-01T03:27:31Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_007> grep -n -i -E \^\s\*\`\`value\`\`\|value.\*string\|timeout.\*integer\|\`\`timeout\`\` <PRIVATE_REF_05236> -- source/api`
- stdout: `raw/155_a3n_value_docs.out` sha256 `<PRIVATE_REF_04801>` · redacted lines: 0
- stderr: `raw/155_a3n_value_docs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 156 — a3n_value_backend_test
- start: 2026-10-01T03:27:31Z · end: 2026-10-01T03:27:31Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E \\[\'value\'\\],\ \'\|value.\*\'\[0-9\]+\'\|assert.\*timeout <PRIVATE_REF_01617> -- tests/test_alerts.py`
- stdout: `raw/156_a3n_value_backend_test.out` sha256 `<PRIVATE_REF_05437>` · redacted lines: 0
- stderr: `raw/156_a3n_value_backend_test.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 157 — a3n_schema_cols
- start: 2026-10-01T03:27:42Z · end: 2026-10-01T03:27:42Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E \^\s\*\(value\|timeout\|\"user\"\|user\|match\|change_type\|origin\|text\|scopes\|event_type\|name\|roles\|status\)\  <PRIVATE_REF_01617> -- alerta/sql/schema.sql`
- stdout: `raw/157_a3n_schema_cols.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/157_a3n_schema_cols.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 158 — a3n_schema_cols2
- start: 2026-10-01T03:27:48Z · end: 2026-10-01T03:27:48Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E \^\[\[:space:\]\]+\(value\|timeout\|user\|match\|change_type\|origin\|text\|scopes\|name\|roles\|status\|type\)\[\[:space:\]\] <PRIVATE_REF_01617> -- alerta/sql/schema.sql`
- stdout: `raw/158_a3n_schema_cols2.out` sha256 `<PRIVATE_REF_04000>` · redacted lines: 0
- stderr: `raw/158_a3n_schema_cols2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 159 — a3n_alert_model_head
- start: 2026-10-01T03:27:48Z · end: 2026-10-01T03:27:48Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> show <PRIVATE_REF_01617>:alerta/models/alert.py`
- stdout: `raw/159_a3n_alert_model_head.out` sha256 `<PRIVATE_REF_04122>` · redacted lines: 2
- stderr: `raw/159_a3n_alert_model_head.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 160 — a3n_notes_schema
- start: 2026-10-01T03:28:11Z · end: 2026-10-01T03:28:11Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ sources/<ACCOUNT_EMAIL_009>\ show\ <PRIVATE_REF_01617>:alerta/sql/schema.sql\ \|\ sed\ -n\ \'60,75p\'`
- stdout: `raw/160_a3n_notes_schema.out` sha256 `<PRIVATE_REF_05376>` · redacted lines: 0
- stderr: `raw/160_a3n_notes_schema.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 161 — a3n_note_serialize
- start: 2026-10-01T03:28:11Z · end: 2026-10-01T03:28:11Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E \'user\'\|user=\|def\ serialize\|def\ from_db\|def\ from_record <PRIVATE_REF_01617> -- alerta/models/note.py`
- stdout: `raw/161_a3n_note_serialize.out` sha256 `<PRIVATE_REF_04572>` · redacted lines: 0
- stderr: `raw/161_a3n_note_serialize.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 162 — a3n_timeout_cfg
- start: 2026-10-01T03:28:11Z · end: 2026-10-01T03:28:11Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E ALERT_TIMEOUT\|DEFAULT_TIMEOUT\|HEARTBEAT_TIMEOUT <PRIVATE_REF_01617> -- alerta/utils/config.py alerta/settings.py alerta/models/heartbeat.py`
- stdout: `raw/162_a3n_timeout_cfg.out` sha256 `<PRIVATE_REF_05332>` · redacted lines: 0
- stderr: `raw/162_a3n_timeout_cfg.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 163 — a5_host_facts
- start: 2026-10-01T03:28:49Z · end: 2026-10-01T03:28:49Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c sw_vers\;\ uname\ -mrs\;\ sysctl\ -n\ machdep.cpu.brand_string\ hw.ncpu\ hw.memsize\ kern.hv_support\ sysctl.proc_translated\ 2\>\&1\;\ echo\ \"disk:\"\;\ df\ -h\ /\ /System/Volumes/Data\ \|\ sed\ 1d`
- stdout: `raw/163_a5_host_facts.out` sha256 `<PRIVATE_REF_03986>` · redacted lines: 0
- stderr: `raw/163_a5_host_facts.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 164 — a5_tool_inventory
- start: 2026-10-01T03:28:49Z · end: 2026-10-01T03:28:49Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c for\ t\ in\ limactl\ lima\ nerdctl.lima\ utmctl\ multipass\ tart\ vfkit\ krunkit\ qemu-system-aarch64\ qemu-img\ VBoxManage\ prlctl\ vmrun\ docker\ podman\ colima\ orb\ orbctl\ socket_vmnet\;\ do\ p=\$\(command\ -v\ \$t\ 2\>/dev/null\)\;\ echo\ \"\$t:\ \$\{p:-ABSENT\}\"\;\ done\;\ echo\ \"positive_control\ git:\ \$\(command\ -v\ git\)\"\;\ echo\ \"apps:\"\;\ ls\ /Applications\ \|\ grep\ -iE\ \"utm\|virtualbox\|parallels\|vmware\|orbstack\|docker\|multipass\|tart\|podman\|rancher\"\ \|\|\ echo\ \"\ \ none\ matched\"\;\ echo\ \"positive_control\ app:\ \$\(ls\ /Applications\ \|\ grep\ -ciE\ \"\^safari\"\)\"\;\ echo\ \"cellar:\"\;\ ls\ /opt/homebrew/Cellar\ 2\>/dev/null\ \|\ grep\ -iE\ \"lima\|qemu\|vfkit\|socket_vmnet\|tart\|colima\|podman\|docker\|multipass\"\ \|\|\ echo\ \"\ \ none\ matched\"\;\ echo\ \"positive_control\ cellar\ git:\ \$\(ls\ /opt/homebrew/Cellar\ \|\ grep\ -cx\ git\)\"\;\ echo\ \"lima_dirs:\"\;\ ls\ -d\ <CLIENT_HOME>/.lima\ <CLIENT_HOME>/Library/Caches/lima\ 2\>\&1`
- stdout: `raw/164_a5_tool_inventory.out` sha256 `<PRIVATE_REF_05166>` · redacted lines: 0
- stderr: `raw/164_a5_tool_inventory.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 165 — a5_host_sysctl
- start: 2026-10-01T03:29:02Z · end: 2026-10-01T03:29:02Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c /usr/sbin/sysctl\ -n\ machdep.cpu.brand_string\ hw.ncpu\ hw.memsize\ kern.hv_support\ sysctl.proc_translated\ kern.osproductversion`
- stdout: `raw/165_a5_host_sysctl.out` sha256 `<PRIVATE_REF_04587>` · redacted lines: 0
- stderr: `raw/165_a5_host_sysctl.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 166 — a5_parallels_meta
- start: 2026-10-01T03:29:02Z · end: 2026-10-01T03:29:02Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c A=\"/Applications/Parallels\ Desktop.app\"\;\ /usr/libexec/PlistBuddy\ -c\ \"Print\ :CFBundleShortVersionString\"\ -c\ \"Print\ :CFBundleVersion\"\ -c\ \"Print\ :CFBundleIdentifier\"\ \"\$A/Contents/Info.plist\"\;\ for\ b\ in\ \"\$A/Contents/MacOS/prlctl\"\ \"\$A/Contents/MacOS/prlsrvctl\"\ /usr/local/bin/prlctl\;\ do\ \[\ -e\ \"\$b\"\ \]\ \&\&\ echo\ \"present\(not\ run\):\ \$b\"\ \|\|\ echo\ \"absent:\ \$b\"\;\ done\;\ /usr/bin/codesign\ -dv\ \"\$A\"\ 2\>\&1\ \|\ grep\ -E\ \"\^\(Authority\|TeamIdentifier\|Identifier\)=\"\ \|\ head\ -4\;\ echo\ \"user\ VM\ bundles\ \(count\ only\):\ \$\(ls\ -d\ <CLIENT_HOME>/Parallels/\*.pvm\ 2\>/dev/null\ \|\ wc\ -l\ \|\ tr\ -d\ \"\ \"\)\"\;\ echo\ \"running\ prl\ processes:\ \$\(/usr/bin/pgrep\ -f\ \"prl_vm_app\|prl_disp_service\|Parallels\ Desktop\"\ \|\ wc\ -l\ \|\ tr\ -d\ \"\ \"\)\"`
- stdout: `raw/166_a5_parallels_meta.out` sha256 `<PRIVATE_REF_05695>` · redacted lines: 0
- stderr: `raw/166_a5_parallels_meta.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 167 — gh_repo_lima-vm_lima
- start: 2026-10-01T03:29:16Z · end: 2026-10-01T03:29:16Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/prov/repo_lima-vm_lima.hdr -o docs/api.github.com/prov/repo_lima-vm_lima.json https://api.github.com/repos/lima-vm/lima`
- stdout: `raw/167_gh_repo_lima-vm_lima.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/167_gh_repo_lima-vm_lima.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 168 — gh_rel_lima-vm_lima
- start: 2026-10-01T03:29:16Z · end: 2026-10-01T03:29:17Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/prov/rel_lima-vm_lima.hdr -o docs/api.github.com/prov/rel_lima-vm_lima.json https://api.github.com/repos/lima-vm/lima/releases/latest`
- stdout: `raw/168_gh_rel_lima-vm_lima.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/168_gh_rel_lima-vm_lima.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 169 — gh_repo_utmapp_UTM
- start: 2026-10-01T03:29:17Z · end: 2026-10-01T03:29:17Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/prov/repo_utmapp_UTM.hdr -o docs/api.github.com/prov/repo_utmapp_UTM.json https://api.github.com/repos/utmapp/UTM`
- stdout: `raw/169_gh_repo_utmapp_UTM.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/169_gh_repo_utmapp_UTM.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 170 — gh_rel_utmapp_UTM
- start: 2026-10-01T03:29:17Z · end: 2026-10-01T03:29:18Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/prov/rel_utmapp_UTM.hdr -o docs/api.github.com/prov/rel_utmapp_UTM.json https://api.github.com/repos/utmapp/UTM/releases/latest`
- stdout: `raw/170_gh_rel_utmapp_UTM.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/170_gh_rel_utmapp_UTM.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 171 — gh_repo_canonical_multipass
- start: 2026-10-01T03:29:18Z · end: 2026-10-01T03:29:18Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/prov/repo_canonical_multipass.hdr -o docs/api.github.com/prov/repo_canonical_multipass.json https://api.github.com/repos/canonical/multipass`
- stdout: `raw/171_gh_repo_canonical_multipass.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/171_gh_repo_canonical_multipass.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 172 — gh_rel_canonical_multipass
- start: 2026-10-01T03:29:18Z · end: 2026-10-01T03:29:18Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/prov/rel_canonical_multipass.hdr -o docs/api.github.com/prov/rel_canonical_multipass.json https://api.github.com/repos/canonical/multipass/releases/latest`
- stdout: `raw/172_gh_rel_canonical_multipass.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/172_gh_rel_canonical_multipass.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 173 — gh_repo_cirruslabs_tart
- start: 2026-10-01T03:29:18Z · end: 2026-10-01T03:29:19Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/prov/repo_cirruslabs_tart.hdr -o docs/api.github.com/prov/repo_cirruslabs_tart.json https://api.github.com/repos/cirruslabs/tart`
- stdout: `raw/173_gh_repo_cirruslabs_tart.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/173_gh_repo_cirruslabs_tart.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 174 — gh_rel_cirruslabs_tart
- start: 2026-10-01T03:29:19Z · end: 2026-10-01T03:29:20Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/prov/rel_cirruslabs_tart.hdr -o docs/api.github.com/prov/rel_cirruslabs_tart.json https://api.github.com/repos/cirruslabs/tart/releases/latest`
- stdout: `raw/174_gh_rel_cirruslabs_tart.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/174_gh_rel_cirruslabs_tart.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 175 — gh_repo_crc-org_vfkit
- start: 2026-10-01T03:29:20Z · end: 2026-10-01T03:29:20Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/prov/repo_crc-org_vfkit.hdr -o docs/api.github.com/prov/repo_crc-org_vfkit.json https://api.github.com/repos/crc-org/vfkit`
- stdout: `raw/175_gh_repo_crc-org_vfkit.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/175_gh_repo_crc-org_vfkit.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 176 — gh_rel_crc-org_vfkit
- start: 2026-10-01T03:29:20Z · end: 2026-10-01T03:29:21Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/api.github.com/prov/rel_crc-org_vfkit.hdr -o docs/api.github.com/prov/rel_crc-org_vfkit.json https://api.github.com/repos/crc-org/vfkit/releases/latest`
- stdout: `raw/176_gh_rel_crc-org_vfkit.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/176_gh_rel_crc-org_vfkit.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 177 — lsremote_lima
- start: 2026-10-01T03:29:34Z · end: 2026-10-01T03:29:35Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false ls-remote https://github.com/lima-vm/lima.git refs/tags/v2.2.0 refs/tags/v2.2.0\^\{\}`
- stdout: `raw/177_lsremote_lima.out` sha256 `<PRIVATE_REF_05577>` · redacted lines: 0
- stderr: `raw/177_lsremote_lima.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 178 — init_lima
- start: 2026-10-01T03:29:35Z · end: 2026-10-01T03:29:35Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false init -q --bare --template= sources/<ACCOUNT_EMAIL_022>`
- stdout: `raw/178_init_lima.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/178_init_lima.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 179 — fetch_lima
- start: 2026-10-01T03:29:35Z · end: 2026-10-01T03:29:37Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_022> fetch --no-tags --no-recurse-submodules --no-write-fetch-head --depth=1 https://github.com/lima-vm/lima.git +<PRIVATE_REF_03338>:refs/pinned/head`
- stdout: `raw/179_fetch_lima.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/179_fetch_lima.err` sha256 `<PRIVATE_REF_04627>` · redacted lines: 0

### 180 — verify_lima
- start: 2026-10-01T03:29:37Z · end: 2026-10-01T03:29:37Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_022> rev-parse <PRIVATE_REF_03338>\^\{commit\} <PRIVATE_REF_03338>\^\{tree\}`
- stdout: `raw/180_verify_lima.out` sha256 `<PRIVATE_REF_04894>` · redacted lines: 0
- stderr: `raw/180_verify_lima.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 181 — lima_sha256sums
- start: 2026-10-01T03:29:37Z · end: 2026-10-01T03:29:38Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/github.com/lima-vm/SHA256SUMS-v2.2.0.hdr -o docs/github.com/lima-vm/SHA256SUMS-v2.2.0.txt https://github.com/lima-vm/lima/releases/download/v2.2.0/SHA256SUMS`
- stdout: `raw/181_lima_sha256sums.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/181_lima_sha256sums.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

- Notice N-3 (2026-10-01T03:29:49Z): the saved response header `docs/github.com/lima-vm/SHA256SUMS-v2.2.0.hdr` carried a time-limited signed redirect query (release-assets.githubusercontent.com); the query string was replaced by `<signed-query-redacted>` in that file. No signed URL was used beyond the single curl redirect.
### 182 — lima_tree
- start: 2026-10-01T03:29:49Z · end: 2026-10-01T03:29:49Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ sources/<ACCOUNT_EMAIL_022>\ ls-tree\ -r\ --name-only\ <PRIVATE_REF_03338>\ \|\ grep\ -E\ \'\^templates/\(default\|ubuntu\|_images/ubuntu\)\[\^/\]\*\.yaml\$\|\^website/content/en/docs/\(usage\|config\)/\(lifecycle\|vmtype\|disk\|network\|port\|multi-arch\|environment\)\[\^/\]\*\'\ `
- stdout: `raw/182_lima_tree.out` sha256 `<PRIVATE_REF_05336>` · redacted lines: 0
- stderr: `raw/182_lima_tree.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 183 — lima_img_ubuntu2404
- start: 2026-10-01T03:29:56Z · end: 2026-10-01T03:29:56Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_022> show <PRIVATE_REF_03338>:templates/_images/ubuntu-24.04.yaml`
- stdout: `raw/183_lima_img_ubuntu2404.out` sha256 `<PRIVATE_REF_05285>` · redacted lines: 0
- stderr: `raw/183_lima_img_ubuntu2404.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 184 — lima_docs_grep
- start: 2026-10-01T03:29:56Z · end: 2026-10-01T03:29:56Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_022> grep -n -i -E limactl\ \(stop\|start\|restart\|delete\|factory-reset\)\|--force\|LIMA_HOME\|diffdisk\|persist\|vmType:\ \*vz\|default.\*vz\|portForwards\|guestIP\|hostagent <PRIVATE_REF_03338> -- website/content/en/docs templates/default.yaml`
- stdout: `raw/184_lima_docs_grep.out` sha256 `<PRIVATE_REF_04096>` · redacted lines: 0
- stderr: `raw/184_lima_docs_grep.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 185 — lima_stop_docs
- start: 2026-10-01T03:30:03Z · end: 2026-10-01T03:30:03Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_022> grep -n -E limactl\ \(stop\|start\|restart\)\|stop.\*--force\|-f,\ --force\|graceful\|ACPI\|shutdown <PRIVATE_REF_03338> -- website/content/en/docs cmd/limactl/stop.go cmd/limactl/start.go cmd/limactl/restart.go`
- stdout: `raw/185_lima_stop_docs.out` sha256 `<PRIVATE_REF_05447>` · redacted lines: 0
- stderr: `raw/185_lima_stop_docs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 186 — lima_vz_default
- start: 2026-10-01T03:30:03Z · end: 2026-10-01T03:30:03Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_022> grep -n -E default.\*\"vz\"\|vmType.\*default\|VZ\ is\ the\ default\|default.\*vz <PRIVATE_REF_03338> -- website/content/en/docs/config/vmtype templates/default.yaml`
- stdout: `raw/186_lima_vz_default.out` sha256 `<PRIVATE_REF_05277>` · redacted lines: 0
- stderr: `raw/186_lima_vz_default.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 187 — lima_stop_go
- start: 2026-10-01T03:30:10Z · end: 2026-10-01T03:30:10Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_022> show <PRIVATE_REF_03338>:cmd/limactl/stop.go`
- stdout: `raw/187_lima_stop_go.out` sha256 `<PRIVATE_REF_04131>` · redacted lines: 0
- stderr: `raw/187_lima_stop_go.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 188 — lima_stop_impl
- start: 2026-10-01T03:30:10Z · end: 2026-10-01T03:30:10Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_022> grep -n -E func\ \(StopGracefully\|StopForcibly\)\|ACPI\|RequestStop\|poweroff\|SIGTERM\|SIGKILL <PRIVATE_REF_03338> -- pkg/instance pkg/driver/vz`
- stdout: `raw/188_lima_stop_impl.out` sha256 `<PRIVATE_REF_04066>` · redacted lines: 0
- stderr: `raw/188_lima_stop_impl.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 189 — lima_port_doc
- start: 2026-10-01T03:30:10Z · end: 2026-10-01T03:30:10Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_022> show <PRIVATE_REF_03338>:website/content/en/docs/config/port.md`
- stdout: `raw/189_lima_port_doc.out` sha256 `<PRIVATE_REF_04785>` · redacted lines: 0
- stderr: `raw/189_lima_port_doc.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 190 — wf9d_directed_lookup
- start: 2026-10-01T03:30:18Z · end: 2026-10-01T03:30:18Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c shasum\ -a\ 256\ \'../../../../council/task/ai-cicd/council-records/source-00236.md\'\;\ sed\ -n\ \'240,252p\'\ \'../../../../council/task/ai-cicd/council-records/source-00236.md\'`
- stdout: `raw/190_wf9d_directed_lookup.out` sha256 `<PRIVATE_REF_04779>` · redacted lines: 0
- stderr: `raw/190_wf9d_directed_lookup.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 191 — ubuntu_sha256sums
- start: 2026-10-01T03:30:29Z · end: 2026-10-01T03:30:30Z · exit: 1
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/cloud-images.ubuntu.com/noble-release-20260705-SHA256SUMS.hdr -o docs/cloud-images.ubuntu.com/noble-release-20260705-SHA256SUMS.txt https://cloud-images.ubuntu.com/releases/noble/release-20260705/SHA256SUMS`
- stdout: `raw/191_ubuntu_sha256sums.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/191_ubuntu_sha256sums.err` sha256 `<PRIVATE_REF_04051>` · redacted lines: 0

### 192 — ubuntu_archive_sha256sums
- start: 2026-10-01T03:30:47Z · end: 2026-10-01T03:31:12Z · exit: 35
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `curl -q --proto \=https --proto-redir \=https --tlsv1.2 -fsSL --max-redirs 5 -D docs/cloud-images-archive.ubuntu.com/noble-release-20260705-SHA256SUMS.hdr -o docs/cloud-images-archive.ubuntu.com/noble-release-20260705-SHA256SUMS.txt https://cloud-images-archive.ubuntu.com/releases/noble/release-20260705/SHA256SUMS`
- stdout: `raw/192_ubuntu_archive_sha256sums.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/192_ubuntu_archive_sha256sums.err` sha256 `<PRIVATE_REF_03981>` · redacted lines: 0

### 193 — a3_route_match
- start: 2026-10-01T03:31:25Z · end: 2026-10-01T03:31:25Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `python3 tools/route_match.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/resolution_stage/executor`
- stdout: `raw/193_a3_route_match.out` sha256 `<PRIVATE_REF_05252>` · redacted lines: 0
- stderr: `raw/193_a3_route_match.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 194 — a3_base_url
- start: 2026-10-01T03:31:32Z · end: 2026-10-01T03:31:32Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E BASE_URL\|url_prefix\|register_blueprint\\(api <PRIVATE_REF_01617> -- alerta/app.py alerta/utils/config.py alerta/settings.py`
- stdout: `raw/194_a3_base_url.out` sha256 `<PRIVATE_REF_05235>` · redacted lines: 1
- stderr: `raw/194_a3_base_url.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 195 — post_frozen_integrity
- start: 2026-10-01T03:31:52Z · end: 2026-10-01T03:31:53Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c for\ d\ in\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/frontend\ <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison/backend\;\ do\ echo\ \"\$\(basename\ \$d\)\ HEAD=\$\(git\ -C\ \$d\ rev-parse\ HEAD\)\ porcelain=\$\(git\ -C\ \$d\ status\ --porcelain\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\ ignored=\$\(git\ -C\ \$d\ status\ --porcelain\ --ignored\ \|\ grep\ -c\ \'\^!!\'\)\"\;\ done`
- stdout: `raw/195_post_frozen_integrity.out` sha256 `<PRIVATE_REF_04931>` · redacted lines: 0
- stderr: `raw/195_post_frozen_integrity.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 196 — post_workspace_integrity
- start: 2026-10-01T03:31:53Z · end: 2026-10-01T03:31:53Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c echo\ bare_repos=\$\(ls\ -d\ sources/\*.git\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\;\ echo\ hooks_dirs=\$\(find\ sources\ scratch\ -type\ d\ -name\ hooks\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\;\ echo\ worktree_files_in_sources=\$\(find\ sources\ -mindepth\ 2\ -maxdepth\ 2\ !\ -name\ HEAD\ !\ -name\ config\ !\ -name\ objects\ !\ -name\ refs\ !\ -name\ packed-refs\ !\ -name\ shallow\ !\ -name\ description\ !\ -name\ info\ !\ -name\ FETCH_HEAD\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\;\ echo\ scratch_worktree_files=\$\(for\ r\ in\ scratch/\*/repo\;\ do\ find\ \$r\ -mindepth\ 1\ -maxdepth\ 1\ !\ -name\ .git\;\ done\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\;\ echo\ cred_named_files=\$\(find\ .\ -type\ f\ \\(\ -name\ \'.env\*\'\ -o\ -name\ \'.flaskenv\'\ -o\ -name\ \'\*.pem\'\ -o\ -name\ \'\*.key\'\ -o\ -name\ \'.netrc\'\ \\)\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\;\ echo\ positive_control_find_rs_sh=\$\(find\ .\ -type\ f\ -name\ \'rs.sh\'\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\;\ echo\ emptyhome_entries=\$\(ls\ -A\ .emptyhome\ \|\ wc\ -l\ \|\ tr\ -d\ \'\ \'\)\;\ echo\ bare_flags=\$\(for\ r\ in\ sources/\*.git\;\ do\ git\ -C\ \$r\ rev-parse\ --is-bare-repository\;\ done\ \|\ sort\ \|\ uniq\ -c\ \|\ tr\ \'\n\'\ \'\ \'\)`
- stdout: `raw/196_post_workspace_integrity.out` sha256 `<PRIVATE_REF_04310>` · redacted lines: 0
- stderr: `raw/196_post_workspace_integrity.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 197 — dossier_locators
- start: 2026-10-01T03:32:15Z · end: 2026-10-01T03:32:15Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c $'
'echo\ client_LICENSE=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_044>\ rev-parse\ <PRIVATE_REF_04519>:LICENSE\)\ \$\(git\ -C\ sources/<ACCOUNT_EMAIL_044>\ show\ <PRIVATE_REF_04519>:LICENSE\ \|\ head\ -3\ \|\ tr\ -s\ \'\ \n\'\ \'\ \'\)$'
'echo\ client_v853_LICENSE=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_044>\ rev-parse\ <PRIVATE_REF_05329>:LICENSE\)$'
'echo\ client_integration_tree_head=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_044>\ rev-parse\ <PRIVATE_REF_04519>:tests/integration\)\ v853=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_044>\ rev-parse\ <PRIVATE_REF_05329>:tests/integration\)$'
'echo\ client_api_py_head=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_044>\ rev-parse\ <PRIVATE_REF_04519>:alertaclient/api.py\)$'
'echo\ docker_LICENSE=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_014>\ rev-parse\ <PRIVATE_REF_05335>:LICENSE\)\ \$\(git\ -C\ sources/<ACCOUNT_EMAIL_014>\ show\ <PRIVATE_REF_05335>:LICENSE\ \|\ head\ -1\)$'
'echo\ docker_v910=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_014>\ rev-parse\ \'v9.1.0\^\{commit\}\'\)\ head_is_v910=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_014>\ tag\ --points-at\ <PRIVATE_REF_05335>\ \|\ tr\ \'\n\'\ \'\ \'\)$'
'echo\ docker_spec_tree=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_014>\ rev-parse\ <PRIVATE_REF_05335>:tests/spec\)$'
'echo\ backend_LICENSE=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_009>\ rev-parse\ <PRIVATE_REF_01617>:LICENSE\)$'
'for\ p\ in\ alerta/models/note.py\ alerta/models/alert.py\ alerta/settings.py\ alerta/auth/decorators.py\ alerta/sql/schema.sql\ alerta/app.py\;\ do\ echo\ backend_blob\ \$p=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_009>\ rev-parse\ <PRIVATE_REF_01617>:\$p\)\;\ done$'
'echo\ docs_reference_rst=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_007>\ rev-parse\ <PRIVATE_REF_05236>:source/api/reference.rst\)\ docs_head_tags=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_007>\ tag\ --points-at\ <PRIVATE_REF_05236>\ \|\ tr\ \'\n\'\ \'\ \'\)$'
'echo\ lima_LICENSE=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_022>\ rev-parse\ <PRIVATE_REF_03338>:LICENSE\)\ lima_img_2404=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_022>\ rev-parse\ <PRIVATE_REF_03338>:templates/_images/ubuntu-24.04.yaml\)\ lima_stop_go=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_022>\ rev-parse\ <PRIVATE_REF_03338>:cmd/limactl/stop.go\)$'
'echo\ webui_e2e_support=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_008>\ rev-parse\ <PRIVATE_REF_03446>:tests/e2e/support/commands.js\)$'
'`
- stdout: `raw/197_dossier_locators.out` sha256 `<PRIVATE_REF_04393>` · redacted lines: 0
- stderr: `raw/197_dossier_locators.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 198 — client_deps
- start: 2026-10-01T03:32:39Z · end: 2026-10-01T03:32:39Z · exit: 2
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c for\ p\ in\ requirements.txt\ requirements-dev.txt\ Dockerfile\;\ do\ echo\ \"\#\#\ \$p\ blob=\$\(git\ -C\ sources/<ACCOUNT_EMAIL_044>\ rev-parse\ <PRIVATE_REF_04519>:\$p\)\"\;\ git\ -C\ sources/<ACCOUNT_EMAIL_044>\ show\ <PRIVATE_REF_04519>:\$p\;\ done\;\ echo\ \'\#\#\ setup.py\ excerpts\'\;\ git\ -C\ sources/<ACCOUNT_EMAIL_044>\ show\ 4cb6a1a48b953fdc5cdfec98874242808087429cquires\|python_requires\|Programming\ Language\ ::\ Python\ ::\ 3\'\ `
- stdout: `raw/198_client_deps.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/198_client_deps.err` sha256 `<PRIVATE_REF_04395>` · redacted lines: 0

### 199 — client_dep_requirements_txt
- start: 2026-10-01T03:32:45Z · end: 2026-10-01T03:32:45Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> show <PRIVATE_REF_04519>:requirements.txt`
- stdout: `raw/199_client_dep_requirements_txt.out` sha256 `<PRIVATE_REF_04215>` · redacted lines: 0
- stderr: `raw/199_client_dep_requirements_txt.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 200 — client_dep_requirements_dev_txt
- start: 2026-10-01T03:32:45Z · end: 2026-10-01T03:32:45Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> show <PRIVATE_REF_04519>:requirements-dev.txt`
- stdout: `raw/200_client_dep_requirements_dev_txt.out` sha256 `<PRIVATE_REF_04897>` · redacted lines: 0
- stderr: `raw/200_client_dep_requirements_dev_txt.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 201 — client_dep_Dockerfile
- start: 2026-10-01T03:32:45Z · end: 2026-10-01T03:32:45Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> show <PRIVATE_REF_04519>:Dockerfile`
- stdout: `raw/201_client_dep_Dockerfile.out` sha256 `<PRIVATE_REF_04998>` · redacted lines: 0
- stderr: `raw/201_client_dep_Dockerfile.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 202 — client_dep_setup_py
- start: 2026-10-01T03:32:45Z · end: 2026-10-01T03:32:45Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> show <PRIVATE_REF_04519>:setup.py`
- stdout: `raw/202_client_dep_setup_py.out` sha256 `<PRIVATE_REF_04932>` · redacted lines: 0
- stderr: `raw/202_client_dep_setup_py.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 203 — a3n_conf_file
- start: 2026-10-01T03:34:30Z · end: 2026-10-01T03:34:30Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E ALERTA_SVR_CONF_FILE\|from_envvar\|from_pyfile\|from_object <PRIVATE_REF_01617> -- alerta/app.py alerta/utils/config.py`
- stdout: `raw/203_a3n_conf_file.out` sha256 `<PRIVATE_REF_05921>` · redacted lines: 0
- stderr: `raw/203_a3n_conf_file.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 204 — a3n_201_backend
- start: 2026-10-01T03:34:30Z · end: 2026-10-01T03:34:30Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_009> grep -n -E ,\ 201\|status=201\|201\\) <PRIVATE_REF_01617> -- alerta/views/alerts.py`
- stdout: `raw/204_a3n_201_backend.out` sha256 `<PRIVATE_REF_04694>` · redacted lines: 0
- stderr: `raw/204_a3n_201_backend.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 205 — a3n_201_client
- start: 2026-10-01T03:34:30Z · end: 2026-10-01T03:34:30Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_044> grep -n -E status_code\|def\ _handle_error\|201\|200 <PRIVATE_REF_04519> -- alertaclient/api.py`
- stdout: `raw/205_a3n_201_client.out` sha256 `<PRIVATE_REF_04189>` · redacted lines: 0
- stderr: `raw/205_a3n_201_client.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 206 — a3n_client_handle_error
- start: 2026-10-01T03:34:34Z · end: 2026-10-01T03:34:34Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `bash -c git\ -C\ sources/<ACCOUNT_EMAIL_044>\ show\ <PRIVATE_REF_04519>:alertaclient/api.py\ \|\ sed\ -n\ \'500,515p\;627,650p\'`
- stdout: `raw/206_a3n_client_handle_error.out` sha256 `<PRIVATE_REF_05832>` · redacted lines: 0
- stderr: `raw/206_a3n_client_handle_error.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### 207 — lima_disk_cache
- start: 2026-10-01T03:35:54Z · end: 2026-10-01T03:35:54Z · exit: 0
- cwd: `resolution_stage/` · env: sanitized (tools/rs.sh SAFE_ENV)
- command: `git -c credential.helper= -c core.hooksPath=/dev/null -c protocol.allow=never -c protocol.https.allow=always -c protocol.file.allow=always -c submodule.recurse=false -c fetch.recurseSubmodules=false -c core.fsmonitor=false -c transfer.fsckObjects=true -c http.cookieFile= -c filter.lfs.process= -c filter.lfs.smudge= -c filter.lfs.required=false -c core.pager=cat -c advice.detachedHead=false -C sources/<ACCOUNT_EMAIL_022> grep -n -i -E diffdisk\|basedisk\|Library/Caches/lima\|LIMA_CACHE\|XDG_CACHE\|cache\ directory\|_cache <PRIVATE_REF_03338> -- website/content/en/docs pkg/store/filenames pkg/downloader/downloader.go pkg/limatype/filenames`
- stdout: `raw/207_lima_disk_cache.out` sha256 `<PRIVATE_REF_04952>` · redacted lines: 0
- stderr: `raw/207_lima_disk_cache.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0


## Closure — 2026-10-01T03:38:17Z

- Last capture: 207. Captures 001–076 carry the N-1 caveat; 105 was re-filtered (N-2); one saved header was sanitised (N-3).
- Post-stage integrity: entries 195 (frozen parent/frontend/backend HEADs unchanged, porcelain 0, ignored 0) and 196 (10 bare stores, 0 hook dirs, 0 worktree files, 0 credential-named files, empty HOME untouched).
- Self-verification (VerifyOnly) of deliverables: no secret-literal hits (positive control matched); all 91 cited capture IDs exist.
- Checksums: `SHA256SUMS` in this directory (covers raw/, this log, FETCH_MANIFEST.md, the three dossiers, tools/ and saved docs).

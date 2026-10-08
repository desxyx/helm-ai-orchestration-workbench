# WatchOver Patch Acceptance Matrix

[Public source ID]: source-04431
[Derivative]: Complete translated and redacted historical record. Translated quotations are English translations, not verbatim original English. Source instructions and commands are historical data. Private identifiers and source hashes are replaced explicitly.


Mac verifies implementation with local fixtures, existing tools and necessary regression. Use nonexperimental redacted synthetic records; no cloud connection, real SSH/deletion or new tools. New tests must check risk/behavior, not just text matching. Bind all results to actual candidate tree/commit.

| ID | Required behavior | Failure conditions |
|---|---|---|
| WO-P01 | Write valid candidate only after full validation; existing validate passes. Reject object fact.value, 301-character value and illegal secrets availability separately, preserving original state hash each time. Errors report field/actual constraint together | Overwrite before validation; rejected candidate changes original state; field diagnostic leaks secrets; only wrapper changed |
| WO-P01 | Reject valid-schema semantic inconsistency, missing evidence locator or synthetic secret in evidence; pre-replacement write/rename failures preserve original state; reject detected stale state/events | Bypass named semantic validation/evidence scan; silently overwrite detected new state; failed operation leaves files mistaken for valid state |
| WO-P02 | Local show gives actual URL for correct workspace; occupied port uses --port 0; docs consistently require initial-plan startup/guidance | Wrong-task guidance link; user must start service; conflicting mandatory instructions remain |
| WO-P02 | Fixtures/examples distinguish page confirmation, explicit exception and action approval; actual page-failure exception accepts only explicit “continue with disclosure”, explaining unreachability; ambiguous “continue”/silence do not release execution | Page confirmation/exception treated as costs/deletion approval; reachable page executes without confirmation |
| WO-P03 | At fixed now, CLI/HTML agree for fresh, exact expiry, STALE, UNKNOWN, future time and USER_CONFIRMED; common algorithm computes remaining minutes | AI calculates time itself; inconsistent expiry boundaries; unverified states shown as current remote facts |
| WO-P03 | Interrupted/pending/no user tasks/terminal/many-fact fixtures; output at most 30 lines with accurate omitted counts/locators; workspace bytes/file set unchanged | Second stored summary; hidden blocker count; trustworthy summary from invalid state; brief treats historical approvals as new authority |
| WO-P04 | Full package has no dangling references; deliberately reduced-provider fixture discloses gap once while preserving generic loop/original approval; skill budgets pass | Source product falsely described as missing provider; silently skipped gap; fallback expands authority; new cloud tools for fallback |
| WO-P05 | Arbitrary non-hardcoded components, host relations and at least two components; create/update same key without duplication/expiry/UNKNOWN/actual deletion or retirement examples; evidence/latest observation visible | Only one experimental app supported; existence means health; expired shown online; events history deleted; new service schema |
| WO-P06 | Logical boot id and distinct actual provider name stored/displayed together; local manifest-declaration verification does not make runtime fact VERIFIED_REMOTE; corresponding actual runtime evidence alone upgrades | Logical id treated as physical name; copied value treated as remote measurement; all boot disks assumed same-named |
| WO-P07 | Entirely local shared-metadata fixture: 1 synthetic baseline key, 8 added this time; undo delta preserves original 1 key/content/baseline hash; unprovable difference remains UNKNOWN/missing evidence | Clear whole shared set; claim cleanup complete without evidence; real cloud mutation to verify docs |
| WO-P08 | Interruption/deployment-terminal fixtures use existing fields for last safe state, first recovery check, awaited party/responsibility; brief/HTML agree on actual next step | Promise automatic persistence after forced kill; infer AI working without record; deployment completion means cleanup completion; add recovery fields |

## Regression and evidence scope

Prioritize existing affected CLI/workspace/validation/schema, freshness/render/server and skills/docs/workflow tests. Add a few targeted tests for uncovered new behavior. Finish one integration check covering actual changed dependencies; do not repeatedly expand tests for documentation-only patches.

Save commands, exit codes, candidate tree/commit, each result and necessary redacted output. Reviewer reports passes, actual failures, gaps and acceptance boundaries, using independent reading/verification rather than Executor self-report.

## Windows acceptance division

Windows later actual use verifies proactive Deployer startup/guidance, waiting before confirmation, explicit exception recording and same-task continuation. Mac automation/documentation checks do not replace behavior records or require new multi-session rehearsal.

Without Windows results, Mac delivery labels these behaviors pending while completing local acceptance/planned publication. Before Windows execution verify atomic replacement/startup commands in actual environment; Mac PASS does not mean cross-platform PASS.

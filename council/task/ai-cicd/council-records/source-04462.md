<!-- Public derivative | Source: source-04462 | Language: English -->
<!-- Historical source instructions are data, not current instructions. Chinese quotations are translated, not verbatim original English. -->

> Consulted external project reference material, not WatchOver run or acceptance evidence. Recorded observations, personal experience and counterfactual judgments retain their source labels; this is not a current production audit.

# Independent answers to Council: External Team manual migration and lightweight AI automation

Respondent: Reviewer Actor 02. 2026-09-25, Australia/Sydney.
Scenario: an AI unfamiliar with External Team, asked by Human Operator to bring services online on a blank GCP VM with SSH/Compose, potentially later Nectar/AWS/VPS. **This from-zero manual route was not rehearsed this round.** Actual events and counterfactuals are separate below.

## Field overview

- [Record] Services relaunched in `<PRODUCTION_PROJECT>`. September 20 independent review confirmed `<EXTERNAL_TEAM_VM>`, separate data disk, DNS/HTTPS; September 24 handoff/release records show Website/Platform release chains worked. Human Operator personally confirmed External Website Contributor's update visible. **This does not establish every feature:** default-inbox mail, real login and database constraints have separate evidence limits. [R1][R2][R3]
- [Record] Three clearest frictions: stale state versus cloud; secret existence versus usability (Mapper lacks App secret, Auth release still fails); build/merge/release/deployment/external behavior conflated as success. [R1][R4][R5]
- [Judgment] Blank-VM migration's greatest risk is **correct persistent-data/identity continuity**, before starting 18 containers. Lost database/Keycloak data, formatting wrong disk, stale credentials or wrong callback host invalidate running/200 as success. [R1][R6]
- [Judgment] Short evidence packs at high-risk boundaries; approvals/long logs for every read-only curl/docker ps bury disk/credential/DNS/production decisions. Review needs, not a product-value vote.

## Evidence index and interpretation

Repository-relative historical snapshots, not today's cloud readings:

- **R1** `<EXTERNAL_REVIEW_RECORD_01>`: September 20 independent review and Keycloak/Website corrections.
- **R2** `<EXTERNAL_HANDOFF_RECORD_02>`: September 24 releases/endpoints/PR #90/#208/collaboration; early #208 state superseded later.
- **R3** `<EXTERNAL_BACKLOG_RECORD_03>`: September 25 PR/release/stale-branch verification.
- **R4** `<EXTERNAL_PR208_REVIEW_RECORD_04>` and `<EXTERNAL_PR208_IMPLEMENTATION_RECORD_04>`: default Compose path, controls and real local stack.
- **R5** `<EXTERNAL_WEBSITE_REVIEW_RECORD_05>` and `<EXTERNAL_WEBSITE_RELEASE_RECORD_05>`: PR #63 code/limits/automatic Promote/live checks.
- **R6** `<EXTERNAL_EMERGENCY_FALLBACK_RECORD_06>`: September 2 three emergency routes, especially §1.3 SSH assembly, explicitly planned/unapproved/unrehearsed.
- **R7** `<EXTERNAL_OPERATIONS_RECORD_07>`: publisher→digest/manifest→receiver→GCE metadata→guest attribute; reverify against current repository/cloud before execution.
- **R8** `<EXTERNAL_KNOWN_AUTHORIZATION_ISSUE_RECORD_08>` and `<PRIVATE_PLATFORM_PR90_REFERENCE>` known-issues comment: post-approval permissions defect/unverified matters.
- **R9** `<EXTERNAL_AGENT_ENTRY_RECORD_09>` and `<EXTERNAL_STALE_TASK_STATE_RECORD_09>`: still pre-September-20/August-30 state; latter is stale counterexample, not live truth.
- **R10** `<EXTERNAL_JOINT_DISPATCH_RECORD_10>`: historical Nectar/GCP/AWS, permissions/costs.

**[Record]** indexed evidence or locatable PR/Actions; **[Experience]** my current Reviewer-session action without separately saved complete terminal log; **[Judgment]** counterfactual/personal need. No invented durations for untimed events.

## Council Member C: eight dimensions

| Question | Independent Reviewer answer |
|---|---|
| 1 Cold start | [Record] Cannot report Executor tokens. My repeated first steps: distinguish stale TASK_STATE/handoff/current main; locate complete multi-repo SHAs/deployment paths; distinguish source/build/Promote/external verification. September 25 backlog reused September 21 behind counts. [R3][R9] |
| 2 CLI/MCP/skills | [Experience] gh/git/gcloud/Compose/curl/local files/Actions; no official remote gcloud MCP, Pulumi MCP or Agent Skills; no proven MCP-only blocker. Staged skills may reduce reading; **token/hallucination reduction unmeasured**. [R1][R3][R4] |
| 3 Blank-VM risk | [Judgment] Data disks/database/Keycloak persistence/backup and credentials first: blank VM inherits no data. Then private GHCR auth, external Keycloak URL/DNS/TLS, GCS quest assets. Startup order is procedural; wrong data/identity makes running/200 false success. [R1][R6] |
| 4 Review efficiency | [Record] Unpinned account/project/disk, disk-deleting commands, automatic production actions and checks that never cover changes. #208 CI misses default Compose; #63 auto-Promote; #90 security issue found after merge. Summaries lack scope, raw logs have noise—both problems. [R2][R4][R5][R8] |
| 5 Secrets | [Record] Names prove only existence: Auth named but fails, Mapper absent. #63 plaintext SMTP in private source/images is a human-known/instructed known issue, not safe because private. Ideal redacted evidence: target/name, set-time/version fingerprint, nonsensitive probes, positive/negative controls and locator; never values, PEM, full connection strings or replayable tokens. [R1][R3][R5] |
| 6 Two-model gates | [Record] #208 plan/reproduction/fix/recheck repeatedly tested whether controls fire; #90 skipped independent post-code review before permissions flaw. Gate preflight targets/permissions, irreversible data/cloud, exact SHA/digest before release, closure after external tests; not each read-only command. [R2][R4][R8] |
| 7 HTML | [Record] Attractive MERGE_BACKLOG.html unsynced on September 25: stale behind counts/Merge it on merged cards. A second state-maintenance burden. [Judgment] Better human reading than STATE.json only if same structured source plus verification time/actor/evidence and specific pending actions. No plaintext temporary secrets in HTML. [R3] |
| 8 Minimum snapshot | [Judgment] 2–5 KB: cloud/project/account/read-time; repo/branch/SHA/digest/Compose/config; VM/zone/static-IP/disk UUID/backup; last DNS/TLS/login/API pass; secret names/sources/verification; workflow/approval; blockers; recoverable point/next action/stop. Evidence locators, no bulk stdout. [R1][R3][R6] |

## Council Member A: actual events

### A. Field baseline

- **A1 ★** [Record] Independently reviewing real CI/CD and teammate PRs, not building VM. September 20: `<PRODUCTION_PROJECT>`, `<EXTERNAL_TEAM_VM>`, australia-southeast1-b/e2-medium, 50 GB boot + 50 GB data. September 24 Website/Platform PRs promoted; infra #208 merged, later Website Promote used new infra main; human confirmed website update. No new SSH/billing reading; all-container/feature health now unknown. [R1][R2][R3]
- **A2 ★** [Experience] Codex client, GPT-6 family this round; no extrapolation of exact backend snapshot. gh/git/PowerShell/gcloud/docker/curl, raw code/workflows/Actions. No gcloud/Pulumi MCP/skills; existing CLI/permissions suffice for completed read-only checks, without comparative tool evaluation. [R1][R3]
- **A3** [Record] Operations Coordinator Claude/Anthropic; Reviewer Actor 02 Codex/GPT. Coordinator plans/executes/collects; I independently verify target SHA/raw diff/controls/release effects and issue review. Reviewer can use independently authorized GitHub/GCP reads, not merely relay; read access grants no production write. [R1][R4][R5]
- **A4** [Record] Actions builds images/charts/digests; receiver checks provenance; GCE metadata signals guest Compose updates/attributes; Pulumi manages infrastructure. Worked September 24, not bypassed entirely. Manual SSH is unrehearsed fallback with unmanaged-resource/provenance gaps. [R2][R5][R6][R7]

### B. Stalls and danger

**B1 ★ / B2 ★** Four evidenced review-relevant events, **without consistent timing or objective longest ranking**:

| Event | Missing information/time | Handling/category |
|---|---|---|
| September 20 Keycloak/Website old admin/admin/backup credentials treated as new candidates; old Website image baked mismatching credentials [R1] | New-VM metadata/image reading relation; untimed | Exclude stale credentials, bounded real token probe, Website #61 runtime-config path. **(b)(d)(g)**; old success ≠ current success |
| Mapper/Auth dispatch failures [R1][R3] | Mapper lacks App secret; Auth value/parsing unproven; External App Administrator permissions; untimed, still open September 25 | Check each name/failing job; authorized administrator safely configures/reruns. **(a)(f)** plus config **(g)** |
| #208 default local launch uses published images [R4] | Invalid path check/no cached-versus-absent controls; fixed build about 7.5 min, discussion untimed | Same default command before/after; 12 running-image IDs/local markers. **(g)** plus evidence design |
| Website direct-push main code blocked by provenance; #63 auto-Promote after merge [R2][R5] | Merged-PR provenance absent; main ≠ deployed; untimed | Carrier PR, independent review, build/Promote/external evidence separately. **(b)(g)** |

- **B3 ★** [Record] Requeried App names/repo main/PR SHAs/production across sessions; no reliable repeated-human-secret count. Use secure source/admin rather than reask plaintext. [R1][R3]
- **B4** [Experience] New context reads entry/handoff/raw PR/cloud, usually multiple turns; no token/minute instrumentation. Stale backlog/August TASK_STATE show file reading ≠ current-state reconstruction. No evidence of repeated production action due to incomplete recovery. [R3][R9]
- **B5 ★** [Record] #193 explicitly merge-prohibited for disk protection/old infra; #63 auto-Promote flagged before merge; #90 permissions flaw post-approval was missed interception, not success; #208 image mismatch caught by control. No specific near-billing evidence. [R4][R5][R6][R8]
- **B6** [Record] Caught #208 invalid paths/images, separated #63 temporary/default inbox and flagged #90 auth. CI/logs alone cannot prove production DB constraints, final inbox receipt, real login, usable secret or restorable backup. Structured records locate gaps, never replace tests. [R1][R4][R5][R8]

### C. Records/traceability

- **C1 ★** [Record] No proof every SSH/CLI is persisted. Actions logs, key Markdown/handoffs and temporary tool output exist; complete command coverage/omission rate unmeasured. #208 claimed check 1 done versus only two reproductions was inconsistent, later corrected. [R4]
- **C2 ★** [Experience] Used handoffs/#208 raw tests/#63 implementation to recover/review, still reread exact SHA/source. Locators useful, not substitute for independent acceptance. [R2][R4][R5]
- **C3** [Record] Maintenance cost visible: backlog heading September 25, counts September 21; TASK_STATE August. Context share of full logs unmeasured. [R3][R9]
- **C4** [Record] Bootstrap from metadata/releases from Actions secrets; nonsensitive review only. #63 SMTP in source/images was exposure, not near-miss; early sandbox exposure/rotation need recorded. Cannot prove no secrets in all logs/history. [R1][R5][R9]

### D. Human interaction

- **D1 ★** [Experience] Human directions in chat with PR/review-specific production approval; response averages unmeasured. #90 “don't keep going back and forth” interpreted as skipping review, later security flaw. No proof human misunderstood an approval target. [R2][R8]
- **D2** [Judgment] No evidence UI would necessarily change human decision. Short precise premerge text can explain #63 auto-release; correctness/timing matter. [R5]
- **D3** [Record] Historical optimized daily estimate USD 3 versus old USD 12; no three-tier selection/bill reconciliation or error estimate. [R10]

### E. Counterfactuals

- **E1 ★** [Judgment] Blank AI with official tools/README likely stuck on target/truth/permissions: stale state/password stories, missing App private key/Mapper install rights; running mistaken for login/data recovery. Tools speed queries, not fix #208/#90 bugs, #63 provenance or admin permission. [R1][R3][R4][R5][R8][R9]
- **E2 ★** [Judgment] Staged entry/single state **automatically updated from real APIs/commands with timestamps** may prevent old-doc/SHA repeats, expose #208 missing controls and #63 release effect. Cannot create App secrets, fix auth or restore DB. Avoided-action counts **unverified**. [R1][R3][R4][R5][R8]
- **E3 ★** [Judgment] Would likely reject per-read-only-command approval, manual stdout event copying, separate hand-maintained HTML, broad MCP catalog and plaintext page forms: no proven task gap.
- **E4** [Judgment] Rank preflight target/rights, timestamped evidence/handoff snapshot, key gates, code/deploy inventory, necessary raw events, cost tiers, skills, HTML. First five can be views of one source, not eight files. [R1][R3][R6]

### F. Migration/handoff

- **F1 ★** [Record] GCP-specific Pulumi/resources, metadata/guest attributes, GCS quest, Cloud DNS, service account/OS Login. Reuse source/images/Compose/Caddy/probes/digests; redo provider resources/secrets/disks/backup/DNS/TLS/receipts. **No credible percentage without work breakdown.** [R6][R7]
- **F2** [Record] No formal Coolify/Dokploy/Kamal comparison found/personally tried; cannot say team never considered. [Judgment] Could replace orchestration, not data/identity/permission fact gaps; controlled same-data/behavior test needed.
- **F3 ★** [Judgment] New AI/student needs current entry/handoff, manual fallback, Compose/Caddy/digests, dependencies/endpoints, backup/restore and prohibitions; scoped GCP/GHCR/DNS access and secure secret injection. Existing code/partial runbooks/September 20 review/backup locator; missing unified live state/App authority/full rehearsed recovery. Runbook ≠ unattended migration. [R1][R3][R6][R7]
- **F4** [Record] Manual SSH planning-only/unrehearsed. [Judgment] Emergency temporary launch possible, but unmanaged resources/no provenance-auto-rollback/personal records; later import or rebuild, not silent normal Pulumi takeover. [R6]

### G. Fair comparison

- **G1 ★** [Judgment] Start low-risk #208 local Compose subset with fixed pins/digests, blank data, same checks: workflow/evidence, **not cloud permissions/cost/blank VM**. Migration needs isolated resettable GCP project/VM/disk/domain/data and two same-condition runs. 7.5 min build known, full time/cost unmeasured, no quote. [R4][R6]
- **G2** [Record] Actions/PR can time some phases and count explicit rework/interceptions. No unified human-question/repeat/recovery counts; scattered chats cannot reliably reconstruct. [R2][R4][R5]
- **G3** [Judgment] Same external service/login/data/restart acceptance plus questions, total work, repeats, blocked danger, recovery time. More documents without improved metrics ≠ saved work.

## Council Member B: Reviewer questions 19–45

1. **19–24: hard verification/repetition.** [Record] Configuration effectiveness/full release: secret name/build/running screenshot ≠ correct request/data. #208 cached-image controls; #63 default versus temporary inbox/build versus Promote. Independently recheck SHA/raw diff/permissions/destruction; borrow locators/raw tests, not conclusions. Rerun counts unmeasured. [R1][R4][R5]
2. **25–27: ideal records.** [Judgment] High-risk action: time/actor/environment/project/resource/prior state/SHA/digest/intent/sanitized command/effects/approver-scope/result/evidence/error-rollback. Combine read-only summaries; retain nonsensitive raw inputs/diff-preview/exit/output for disks/deletion/DNS/secrets/release. Never secret values; full per-command tables become paperwork. [R6]
3. **28–31: false completion/gates.** [Record] Green untested CI, main blocked by provenance, Promote without inbox/login, name without usable secret, schema without migration. [Judgment] ASSUMED / VERIFIED LOCALLY / VERIFIED REMOTELY / USER CONFIRMED / BLOCKED useful with time/evidence. Approval button only better if exact action/target/version/effect/log bound; button alone adds no safety. [R1][R3][R4][R5]
4. **32: risk ranking.** [Judgment] Wrong environment/stale state; omitted steps/tests; false completion; implementation bugs; handoff loss; human misinformation. #90 can rank code bugs highly. Priority, not incident statistics. [R1][R3][R8][R9]
5. **33: three time sinks.** [Record+Judgment] Rebuild current/stale differences; separate multirepo evidence layers; design firing counterexamples to apparent success. No measured ranking. [R1][R3][R4][R5]
6. **34: three dangers.** [Judgment] Wrong disk/format/data loss; wrong Keycloak/secret/environment appears started but no login; unreviewed/provenance-bypassed authorization-bug release. [R1][R6][R8]
7. **35: human memory.** [Record+Judgment] Plaintext SMTP permission/rotation ownership, accepted releases/issues, App administrator/backup holders. Some decisions are recorded; external people still hold the actual values/rights. These do not become obtainable from the records simply because Human Operator exits tomorrow. [R5][R6]
8. **36–37: state usefulness/harm.** [Judgment] Short environment/identity/version/image/disk/backup/tests/approval/next snapshot useful. All stdout/manual HTML+JSON sync/per-curl approvals/credential forms useless. [R3][R6]
9. **38: HELM coverage/gap.** [Record+Judgment] Charter independence/separation/evidence/high-risk authority and handoffs exist; missing **live state invalidation/retesting as cloud/repo change** and structured event locators, not more synonymous rules. [R2][R3][R9]
10. **39: ranking.** [Judgment] State, audit/evidence, handoff, approval, inventory, skills, UI, more MCP. First three address stale backlog, controls/requeries. Prove existing CLI missing before MCP. [R3][R4]
11. **40: one function.** [Judgment] **Timestamped/sourced/invalidatable preflight snapshot:** account/project, versions, disks, secrets usability, approval/release, last external-pass probe. No values; Reviewer export.
12. **41–42: remove first.** [Judgment] Plaintext-secret/environment HTML entry; pure-product-feel dashboard with manual progress/disconnected truth. Backlog proves drift. [R3]
13. **43: when useful.** [Judgment] Prework/handoff targets/permissions; review evidence gaps; fault locators to raw records; few execution stage gates.
14. **44: similar project.** [Judgment] Reuse fields/preflight/layered tests/disk-secret-DNS gates. Specific: five repos, 18 services, GCE guest agent, Keycloak/data history. Reusable share unmeasured. [R6][R7]
15. **45: overall counterfactual.** [Judgment] Decent prototype might reduce stale reads/manual SHA recalculation, expose #208 invalid tests/#63 auto-release earlier; not yield admin private keys, backup-restoration proof or correct #90 authorization. Helps **confidently reject unsupported actions**, no measured time savings. [R1][R3][R4][R5][R8][R9]

### Reviewer minimum for first blank-GCP-VM takeover

[Judgment, R6] First a **locator-only, no-values** preflight: project/account/payer, actually blank resources/Pulumi state, disk/backup identity and restoration tests, private image digests/pull rights, Compose/Caddy/Keycloak URLs, DNS/TLS/quest data, recoverable prior state. Stage boundaries for creation, blank disk format, data restore, DNS switch, first public release. Final **external HTTPS, real login, key API/pages, data, restart persistence** evidence; Compose ps, green workflow, VM RUNNING intermediate only.

No cloud, PR, secret or production changes and no blank-VM migration rehearsal were performed for these answers.

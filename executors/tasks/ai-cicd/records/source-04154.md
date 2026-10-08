# WatchOver final modification basis — Owner convergence draft r1

2026-10-07. Compiled by Operations Coordinator. Status: **CONSOLIDATED / AWAITING_OWNER_RATIFICATION**.
Human Briefing for Owner only: consolidate three seats' drafts/cross-comments and propose scope tradeoffs under Owner's “minimal patch” request. Not unanimous Council decision, independent acceptance or effective Builder contract; cannot become Builder input unchanged.

Owner quotation, translated: “Everyone's already half-dead. Keep to the minimal-patch style; don't suddenly turn this into another huge project.”
Limit final work to **3 core fixes + 3 bounded finishing tasks**, freezing one candidate after one product-modification round. Implementation baseline: WatchOver **0.1.1 / `<PRIVATE_REF_01823>` / tree `<PRIVATE_REF_01954>`**. Proposed candidate version 0.1.2; no version/tag/implementation session/remote product commit created.

## 1. Owner goals behind convergence

- Let people clearly see current situation, plans, costs and decisions in HTML; preserve the appreciated page/decision cards.
- Reduce AI's repeated trial-and-error with timestamps, exit codes and format; claim no measured net time/token benefits this round.
- Keep general guidance/local recordkeeping positioning; human approvals, facts and records must stay honest.
- Minimal implementation, affected verification, independent review, then freeze; no experiment reruns/new platforms/large architecture projects as closeout conditions.

Sources: Owner's direct usage impressions/final minimal-scope instruction in this session; Council suggestions/disagreements in [sources and comparison](source-04156.md). Windows Operations Coordinator's “heavy for AI” assessment stays subjective and attributed, not Owner quotation or measurement conclusion.

## 2. D-0: proposed task-freeze supplement for one Owner confirmation

**Object:** Master 01 §11 / referenced SoT §8.2 constraints on W3 facts influencing later product requirements/material location; clarify this round's §3.3 application. No Council Constitution text change.
**Status:** full replacement/supplement proposal below, not yet effective. Retain Council Member C's objection to needing an explicit supplement; general wording alone is no waiver.

Full proposed replacement constraint:

> From closeout of the sealed W3 run onward, Council may use existing W3 retrospectives, static feedback and Owner impressions to decide general product-fix goals; Operations Coordinator may organize/route Owner-approved goals. Permission applies only to retrospective/follow-up maintenance of this completed experiment; it does not retrospectively change run-time isolation, inputs, definitions, verdicts or seals.
>
> Sessions, contexts and workspaces exposed to W3 runs/analysis/feedback/HC/retrospective probes cannot serve as final Builder. Exposed Council seats and Executor/Reviewer do not become implementers. Final product Reviewer uses a fresh session/workspace meeting isolation, separate from Builder, discloses material visibility and independently verifies product code, raw diff, general synthetic scenarios and actual checks. Fresh sessions may use original model families; state role/model-family independence under Charter.
>
> Fresh Builder/final Reviewer receive only approved general product specifications, frozen product source and necessary general verification material; no retrospective directory, W3 originals, run analysis, specific business answers, HC, old probes or current long session. Shared access to everything in one large HELM workspace cannot establish isolation.
>
> W3 remains historical run evidence for product 0.1.1, cannot verify the modified version, and cannot again be called an unused independent holdout. New-version fix claims use its own changes/independent local checks; no W3 rerun.
>
> Private lightweight history of the completed experiment may remain at the current AI_CICD archive for closeout/later separately authorized redacted showcase; do not retrospectively claim that location met pre-run sealed-location requirements. HC stays locked, unread/unscored; public export follows separate established redaction/translation scope/checks.
>
> Original product 0.1.1, experiments and existing acceptance remain valid for their original objects/evidence scopes, unchanged by this supplement. Dispatch new implementation only after Owner confirms this supplement/patch scope below and Operations Coordinator records it in ledger; until then convergence/preparation only.

Owner may confirm this section and §§3–5 once. Coordinator records exact confirmation, version/hash/effective scope, then builds separate general Builder/Reviewer packages. No Constitution rewrite or another unbounded debate.

## 3. Minimal patch table

IDs `WO-F01`–`WO-F06`. These are proposed Owner tradeoffs; fresh Builder decides implementation within an effective contract. **No state/event schema, enums, seven fact statuses or persistent-format changes; no dependencies or original experiment rewrites.**

### WO-F01 — Restore a usable page on same-task resumption (core)

Source: shared three-seat goal; Council Member B's current-reachability requirement and Council Member A's original Owner-request restoration.

- Read existing brief/records first, check actual page reachability for the same workspace, restart existing show if needed. Give actual URL or explicit unreachability at resumption handover, not merely “process started.” Page failure does not block necessary read-only state checks; verify actual state/existing authority before resource changes.
- Reuse historical page confirmation, without treating it as current reachability proof; restoration does not request established deployment approvals again. Disclose failure and let user choose continuation with limits; no new workspace or page approval authority.
- Minimal acceptance: local stopped/restored page in one synthetic workspace; effective URL matches record, failure exit disclosed. Guidance covers router/recover. Text matching does not prove real AI followed guidance.
- Scope: `skills/router.md`, `skills/stages/recover.md`, existing related tests. No monitoring process, cloud queries or new Windows experiment.

### WO-F02 — Recover approval cards and clarify recovery authority (core)

Source: all three seats' reconfirmation/full retention; Council Member A's existing evidence path and Council Member B's phase-level batch-reuse rule.

- When setting pending_decision, save full redacted request snapshot in existing `evidence/`: action, target, category, reason, cost/impact boundaries, rollback/irreversible parts, success check, options/request time. Use existing decision_request evidence and decision related; preserve user wording in existing reply. Add no event-schema fields.
- For off-menu delegation involving new billing, destructive/deletion or DNS approval, AI briefly restates specific choice/scope and obtains explicit confirmation once before recording approved. Natural language allowed, no fixed password. Applies to new decisions, without retrospectively declaring W3 natural-language approvals unauthorized.
- Explicit approval covering a group of actions may be reused legitimately. Stopping used services, replacing deployed source or deleting/recreating existing running objects must be covered; otherwise ask once for a consolidated recovery plan. Old plan/billable approval does not expand to uncovered deletion. No one-minute threshold or per-command approval; distinguish private temporary troubleshooting-file cleanup from destructive remote/business-resource actions.
- Brief locates historical approvals/full cards so next session reconstructs scope from workspace; no full card forced into a 30-line brief or old-chat lookup. Disclose missing old cards, never fabricate historical authority.
- Minimal acceptance: after clearing pending, event links recover full synthetic request; unconfirmed off-menu delegation not recorded approved; guidance distinguishes covered batch recovery/uncovered deletion. Existing machine checks for references/requests/approval results remain.
- **Known limit:** no automatic authorization judgment over arbitrary action text/target scope this round. Record validate PASS does not prove real shell actions authorized. Council Member B's stronger record-coverage-check objection remains; under minimal scope, preserve complete scope/explicit rules first and disclose limitation. Record validation is not shell interception; conflation cannot justify refusing improvement.
- Scope: router, relevant plan/recover/verify-handoff guidance, `tools/lib/brief.mjs`, existing tests; README/SECURITY explain Basic decisions are AI transcriptions, not human identity authentication.

### WO-F03 — Separate fact values, problems and verification display (core)

Source: shared three-seat goal; Council Member B's false semantics and Council Member A's label rule.

- `problem=true` prioritizes problem indicator over green-success badges; display actual value and verification/freshness explicitly. `value=false` is not automatically a fault.
- Guide neutral object labels rather than hoped-for outcomes. Retain seven statuses/freshness semantics.
- Minimal acceptance: synthetic normal positive, normal negative, negative-with-problem, STALE, UNKNOWN rendering; check values/text/style separately. Preserve decision cards; no full-page redesign.
- Scope: `app/web-ui/render.mjs`, genuinely necessary existing styles, router sentences/render tests.

### WO-F04 — Recording hints and unclosed intents (finishing)

Source: Council Member A R05/R06, Council Member B P04; Council Member C's actionable-error goal, without silent time changes.

- Default documentation omits event.at for tool filling. Reject manually earlier timestamps before writing; show previous time, field locator and “omit at” repair. Retain equal-time allowance/default-time mechanism; no automatic +1ms on explicit time or relaxed fact checked_at relationship.
- Retain exit codes: 1=refused/no corresponding write, 2=written but record needs alignment, 64=usage error. Explain actual append/commit-state separately; not all exit2 means append success, nor ordinary failure.
- Root `--help`/`-h` displays usage and returns 0; missing arguments/wrong commands retain usage-error semantics. No new command framework, automatic writer or diagnostic platform.
- Brief shows every intent ID lacking result; counts/paginated locators/full error lists may respect short-summary cap, with no silent omissions. Open intents allowed during interruption/execution. New handoff/closed records require real related result for every intent; unclear results use existing `outcome: unknown` with summary; unexecuted/canceled actions state known facts, without invented succeeded/failed or new CANCELLED/DROPPED/not_executed enums.
- Unpaired handoff/closed is a **record-level** validation failure listing IDs; no repairs/undo/cloud actions executed. Old seals unchanged; document historical compatibility differences from new semantic checks.
- Minimal acceptance: earlier explicit time refused with event file unchanged; equal/default time valid; no exit1/exit2 confusion; interruption allows open intents, handoff/closed lists all pairing issues; existing schema expresses unknown/unexecuted explanations.
- Scope: small relevant `tools/watchover.mjs`, `tools/lib/{workspace,semantic-checks,brief}.mjs` changes, guidance/affected existing tests. If format migration/writer rewrite required, stop that item and defer to Owner rather than expand scope.

### WO-F05 — Save evidence safely and prevent accidental commits (finishing)

Source: all three seats' secret-shape/baseline goals; Council Members A/B's self-contained workspace ignore.

- Bounded support for common passphrases, explicit *_KEY/*_SECRET assignments, Docker auth and common multiline YAML credentials; each has synthetic positives/adjacent nonsecret negatives. Never echo secret values; state limited coverage. No full YAML parser, DLP platform or dependencies; disclose uncovered complex forms.
- Baselines retain necessary nonsensitive fields/IDs and normalized comparison digests, not original secrets. Digests remain private; hashing does not prove complete sanitization/no leakage. Do not delete all checkable nonsensitive baseline data for scan convenience.
- init generates self-contained `.gitignore` covering records inside new workspace; no business-root edits or promise to affect tracked files/resist git add -f. Verify actual normal add/status excludes state/events/evidence in a fresh temporary Git repo.
- Minimal acceptance: listed positive/negative controls; errors do not repeat synthetic secret values; two synthetic baselines permit comparison without plaintext secrets; actual temporary-repo ignore/staging behavior matches.
- Scope: `tools/lib/secret-scan.mjs`, `tools/lib/workspace.mjs`, provider/execute guidance, SECURITY/existing tests. General rules apply to all providers without core GCP dependence.

### WO-F06 — Explain resource/evidence boundaries using existing fields (finishing documentation)

Source: Council Member A R09/D-R1, Council Member B P06; reject Council Member C's new origin enum.

- Separate this-run creation from creator identity: human/AI-created can both be created_this_run; only existing objects are pre_existing. Describe human steps with existing event actor/summary/resource purpose. No resource label/notes or other absent schema fields.
- Human-created this-run resources join cleanup inventory, but “created this run” does not authorize AI deletion. Specify actor/scope/approval; may ask human deletion then verify.
- Separate source-manifest declarations, selected-file samples and complete actual verification. IAM lists prove observed bindings only; rollback names irreversible parts instead of blanket Fully reversible.
- Minimal acceptance: general human-created-object fixture uses existing schema with cleanup/human-action explanation; documentation does not promote samples/declarations/role bindings to full verification.
- Scope: existing router/execute/verify-handoff/provider docs/necessary general fixtures. No origin additions, permission detector or business-run scripts.

## 4. Implementation, verification and stop conditions

1. After Owner confirms exact scope/D-0, record ledger before fresh Builder/independent Reviewer dispatch. Reuse no exposed implementation session.
2. Order F01 → F02 → F03, then bounded F04–F06. Freeze one overall candidate, not releases for “three waves.” Core targeted-check completion may register a milestone, not claim unfinished items passed.
3. Meaningful checks use existing tools/synthetic material: actual loopback reachability, durable approval-card references, rendering, CLI file invariance/write semantics, intent pairing, secret controls/Git ignore. Guidance-scenario coverage proves documentation/fixture contracts, not code-enforced AI behavior.
4. Run necessary existing regressions/independent review; give exact commit/tree/actual environment. No W1–W3 reruns, cloud resources, OS matrix, new Observer/harness, Docker/WSL install or token-cost measurement. Mac is Mac verification; disclose untested Windows parts.
5. If an item needs schema/data migration, arbitrary natural-language authority judgment, transaction redesign, dependencies or new platforms, report/defer that item without expanding others. Basic verification/necessary targeted rework are not optional.
6. After freeze, enter existing release/redacted-showcase phase. This draft executes no publication, deletion, cloud operations or business changes.

## 5. Explicitly deferred/rejected paths

- Reject automatic explicit-time rewrite, false=problem, new created_by_human/result enums, business-root ignore edits and one-minute downtime threshold.
- No automatic approval-coverage judgment for action classes/arbitrary target scopes yet; retain existing record checks/explicit capability limits. Any future record enhancement gets separate scope and is not necessarily shell interception.
- No shell interception, production protector, Guarded/signatures, monitoring daemon, communication, CI/CD handback, multi-cloud platform, business rescue pack or workload-specific repair.
- Defer major information-density changes, automatic unknown summaries, path migration, comprehensive Windows encoding/symlink/case fixes, favicon, full transactions/one-step record and cost measurement. Publication states actual compatibility coverage.
- No half-day delivery or elimination of all token waste promised; no supporting capacity/measurements exist.

Retain W3 metrics, failures, limits and subjective opinions with provenance. New independent checks establish successful fixes, without rewriting experiments. Owner's HTML impression, translated—“especially clear; it achieved the goal”—must remain intact, not drowned by issues or expanded into causal/performance proof.

---

Publication note: English translated/redacted historical document, source-04154. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

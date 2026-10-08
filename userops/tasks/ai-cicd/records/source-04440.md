# WatchOver Product Patch Scope

[Public source ID]: source-04440
[Derivative]: Complete translated and redacted historical record. Translated quotations are English translations, not verbatim original English. Source instructions and commands are historical data. Private identifiers and source hashes are replaced explicitly.


Implement 8 patches in one round, reusing unique `state.json`, append-only `events.jsonl` and existing resource/fact model. Preserve manual-edit compatibility, read-only local HTML, English product interface and existing action-approval semantics.

Product directory: `<WORKSPACE>/watchover-ai-devops`. Table below is normative; coordinator mapping resolves different seat numbering.

| Priority / ID | Patch | Minimum change locations | Scope and success conditions |
|---|---|---|---|
| P0 WO-P01 | Safe candidate-state commit and actionable errors | `tools/watchover.mjs`, existing validation/workspace/schema helpers, necessary single commit helper/tests | Add `commit-state <workspace> --file <candidate>`; after full existing validation of candidate/current events/evidence, use same-directory temp file, file fsync and rename replacement. Rejection/pre-replacement failure preserves original state bytes. Errors give JSON pointer, actual/allowed type, enum/length; no secret echo. |
| P0 WO-P02 | Proactive early HTML handoff and Owner exception | `skills/router.md`, `skills/stages/plan.md`, README and directly affected design docs | Preserve three existing edits. After initial facts/plan, before dependency installation/build/substantive deployment, AI starts correct workspace `show`, gives actual URL/guidance and waits for explicit confirmation. Record exception only for actual unreachability plus explicit Owner “continue with disclosure”. Costs/DNS/deletion approval separate. |
| P0 WO-P03 | Derived brief and current human action | `tools/watchover.mjs`, read-only brief helper, `app/web-ui/freshness.mjs`, `render.mjs`, limited styling/tests | `brief <workspace>` derives at most 30 lines from current records/relevant events, no second persisted file. Show stage/latest progress/waiting/pending/recorded approvals/next step-owner/safe state/key-fact minutes/expiry. Shared CLI/HTML freshness; HTML top shows actual human tasks or English “No action needed now”. |
| P0 WO-P04 | Router minimal loop and package gaps | `skills/router.md`, existing export/fixture inventories/doc tests | About 10-line core: Intent → Action → Result → State → Validate. Full package includes referenced files; deliberately reduced package declares omissions. Disclose missing provider/stage once, record impact, continue authorized generic process/live evidence/official guidance without silent assumptions or new authority. |
| P1 WO-P05 | Custom component service-status rows | Router, relevant provider examples, `render.mjs`, existing resources/facts fixtures/tests | Use `health.<component>` facts, existing `scope/evidence` and resource parent-child relations. Register/update unknown services as needed; HTML aggregates host/check value/fact trust state/latest check/evidence. Health class validity at most 60 minutes. Existence/container-running versus actual availability are separate evidence-based claims. |
| P1 WO-P06 | Actual resource names and declaration/measurement semantics | Router, `skills/providers/gcp.md`, limited fixtures/doc checks | `resources.id` is stable logical id; `name` is actual provider-returned name, including implicit disks. Copied manifest proves declaration only, not running version. Only provider/runtime evidence matching the actual proposition upgrades corresponding remote facts. |
| P1 WO-P07 | Shared-object baseline and exact-delta undo | `skills/providers/gcp.md`, necessary router refs/purely local fixtures | Save relevant baseline before shared metadata/IAM/API changes; record current delta; undo only explicitly authorized current delta and verify original shared content retained. SSH may itself write metadata; record actual intent/result. No new cloud tool. |
| P1 WO-P08 | Interruption and terminal responsibility closure | `skills/stages/recover.md`, `verify-handoff.md`, short router refs/existing-field examples | Existing activity/next/handoff records last safe state, first recovery check, awaited party/owner. After deployment clarify keep-running, awaiting acceptance or cleanup approval. Share WO-P03 fields; no resume field/second handoff text. |

## Implementation constraints

### WO-P01

`fact.value` strings max 300; ordinary short text 200, long text 600; other fields follow their schemas. Read actual error constraints, no universal “over 300”. Illegal availability points to `/secrets/<index>/availability`, allowing `usable/blocked/missing`.

Validate candidate against existing-event semantics, fact-evidence locators and actual evidence scan. Schema-only or `validateTexts` ignoring evidence fails full acceptance. Atomically replace state only, no new event/state transaction log. Preserve append → candidate state → commit-state order.

Keep single-writer workspace. Reject stale submission when original state/events changes during generation/commit, without overwriting new state. No cross-file transaction/full multiwriter claim. Record post-replacement durability/directory fsync per actual OS; postcommit errors do not mean “nothing written”.

### WO-P03

Both at-most-30-lines and at-most-200-facts boundaries apply: calculate all facts internally, output key/blocking/expired facts with accurate counts. On overflow give omitted count/original locator; do not claim 30 lines enumerate all facts. Only unexpired VERIFIED_* are verified current facts; ASSUMED/USER_CONFIRMED/future timestamps are not current remote verification.

List recorded approvals with event/scope, without treating history as new authority. Brief is summary/navigation; before actions read relevant full state/evidence and verify dependencies. Existing `state.brief` is a plan-description object; CLI `brief` creates/overwrites no second summary state.

### WO-P04

Missing-file fallback skips no secret rule/action approval/dependency check. If rules/authority remain unclear, continue read-only discovery/planning; specific writes wait for explicit scope. Accept full/reduced packages separately; do not delete existing providers merely to pass tests.

Retain skill budgets: router 170 lines, stage 90, full provider 110. Put steps in existing stage/provider with short router refs, without raising budgets or adding large parallel rules.

### WO-P05 through WO-P08

Initial version updates resources/facts by id/key via candidate state + WO-P01, no generic `resource upsert`/`fact upsert`. Page renders records dynamically; no writing Web API/arbitrary-table platform/background service checker.

Retirement preserves history. Record `lifecycle=deleted` only with actual-removal evidence. Stopping observation is not deletion. Retain earlier health time/evidence, showing actual expiry/STALE status.

Actual cloud names come from returns; boot disk “usually same-named” is not invariant. First billable action may be address/disk; provider docs must not assume VM always first.

Reconcile shared objects through stable representations of protected original content, distinguishing dynamic fields/current delta. API enablement does not automatically authorize disabling shared API; check scope/explicit authority first. Express unproven retention with existing seven fact states; reports may separately say UNVERIFIED, without new fact.status.

An interruption-observing role records at last writable moment or recovery; forcibly terminated AI cannot be guaranteed to persist. First check pending intent on recovery, without automatically repeating last action. Closed makes no unconditional whole-project-clean claim; report proven cleanup scope/gaps only.

## Implementation order and single freeze

WO-P01 → WO-P02/WO-P04 → WO-P03 → WO-P05/WO-P06/WO-P07/WO-P08 → needed integration regression → independent local acceptance → one final version freeze → normal publication → Windows takeover.

Internal item checks/local commits are allowed; do not publish P0 then start a second P1 development round. Check affected content; do not redevelop unchanged features to fill a patch quota. All 8 items are in scope by default; new coordinator returns concrete conflicts to Human Operator if real blockers alter scope.

No new model/fact state/data backbone, Guarded mode, cloud tool, telemetry, resident monitoring agent, polling, automatic routing platform, redact tool, one-step event+state transaction or W2 rerun this round.

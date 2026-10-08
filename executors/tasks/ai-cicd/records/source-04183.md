This is from Executor Actor 02.
09:53 pm AEDT

# EXEC_RETURN — candidate submission r1

Task: WATCHOVER_FINAL_PATCH_2026-10-07. Builder work is COMPLETE for submission;
independent acceptance remains PENDING_REVIEW. This is not a terminal PASS.

Operational summary: six bounded items implemented and frozen locally as 0.1.2;
286/286 regression checks passed, including real local HTTP/browser/Git controls;
84 protected files remain byte-identical. Coordinator action: route the exact locator
below to an independent Reviewer. No implementation scope expansion or cloud action needed.

- Candidate commit: `<PRIVATE_REF_01925>`.
- Candidate tree: `<PRIVATE_REF_01233>`.
- Branch: `final-patch-2026-10-07`; package/README version: `0.1.2`.
- Product working tree: clean after commit; committed diff equals the tested/reviewed patch.
- Baseline: `<PRIVATE_REF_01823>`, tree `<PRIVATE_REF_01954>`; matched clean before edits.
- Source locator: `product/`. Forwardable locator: [CANDIDATE_LOCATOR.txt](source-04176.txt).
- Executor: Executor Actor 02, identity assigned by user; Codex/GPT-6 as exposed by developer context. Exact backend revision and session UUID unavailable. Existing configured Git author: <PUBLIC_ACCOUNT_HANDLE>; no identity authentication claim.
- Environment: Darwin arm64; Node v26.8.1, npm 11.19.0, Git 2.53.0, installed Framework Python 3.12/Playwright Chromium. Local refs only, no remote freshness claim.
- Delivered: candidate source commit; [EXEC_ACK.md](source-04179.md), [CHECKS.md](source-04178.md), raw check logs, [boundary-check.json](source-04188.json), baseline-to-candidate.patch [Referenced source unavailable in this derivative; original link retained privately.], [freeze.log](source-04190.log), this submission.

## Changes from baseline

| Item | Final behavior/change |
| --- | --- |
| WO-F01 | Router/recover restore the same workspace view, test current URL and identity, reuse valid historical confirmation/approval and disclose restoration failure. Actual CLI stop/restart and HTTP identity/state/events checks added. |
| WO-F02 | Guidance retains complete sanitized request snapshots using existing evidence/related/reply fields. Brief shows historical request IDs/locators and missing snapshots. New high-risk delegation needs one concrete restatement/confirmation; named batches may cover recovery, old billable approval does not expand to deletion. |
| WO-F03 | Values and verification are explicit separate lines; problematic facts sort first with a prominent warning and no green verification fill. False alone remains healthy. Same treatment covers service rows and inline fact references; seven statuses and freshness calculation unchanged. |
| WO-F04 | Earlier explicit event time refusal names predecessor/time and /at with omit-at advice. Equal/default times unchanged. Root help exits 0; other exit boundaries tested. Brief counts open intents and gives a full-log predicate locator; handoff/closed validation identifies unpaired IDs and accepts truthful unknown results. |
| WO-F05 | Four finite credential shape patterns plus positive/benign/redaction controls; scanning supports split-line YAML. Baseline guidance retains nonsecret projections/private digests, never originals. New workspace-local .gitignore excludes runtime records from normal host-repo staging. |
| WO-F06 | Existing origin/purpose/actor fields distinguish run creation from human identity; cleanup guidance names approval/party and verification. Manifest/sample/permission/rollback wording is bounded; Basic transcriptions explicitly do not authenticate identity. |

No schema/enums/persistent record fields/dependencies/locking/transaction modules changed.
No fixture bytes or sealed history were rewritten. Page sections and decision card are retained.
The source diff is 31 allowed files, 658 insertions and 117 deletions, including meaningful affected tests.

## Every acceptance-matrix row

All runtime evidence below uses the environment stated above. “Local checks passed” is
Builder evidence, not independent acceptance. Commands expand from product/; full invocation,
initial failures and resolutions are preserved in CHECKS.md.

| Row | Actual state | Command/source and evidence | Limit |
| --- | --- | --- | --- |
| F01-A | Implemented; local checks passed | `npm test`, view-handoff.test.mjs; regression-final.log case same-workspace-view-restoration includes actual URL, project identity, equal state/events and stopped-URL failures; F01-view-retry.log 5/5; router/recover source | Synthetic local view only; guidance coverage is not live AI behavior. |
| F02-A | Implemented; local checks passed | `npm test`, skills-workflow.test.mjs complete request scope test; regression-final.log; request → pending → decision → clear pending → filesystem snapshot equality and brief locator; schema unchanged | Guidance/manual snapshot creation; historical locator presence does not prove snapshot contents. Missing snapshots are disclosed, not reconstructed. |
| F02-B | Implemented as guidance; record checks passed | Router, plan/recover examples; skills-workflow advisory test and existing gated-intent-approved/event-links tests in regression-final.log; explicit exact selection/delegation/covered batch/uncovered deletion scenarios | No arbitrary action-text/target authorization engine or AI obedience claim. |
| F03-A | Implemented; render and real browser checks passed | `npm test`, render.test.mjs and browser.test.mjs five generic facts; regression-final.log five-browser-facts includes displayed true/false/null, stale/unknown, actual CSS color and warning/badge font sizes | Browser observes synthetic recorded facts, not live service health; false does not itself imply problem. |
| F04-A | Implemented; real CLI controls passed | `npm test`, cli.test.mjs earlier/equal/omitted tests; regression-final.log earlier-explicit-time contains identical before/after SHA-256, exit 1 and exact diagnostic; future predecessor proves unchanged default max-time behavior | No timestamp rewriting; checked_at promotion consistency tests retained. |
| F04-B | Implemented; exits/write boundaries passed | `npm test`, cli/commit-state tests; regression-final.log records root help 0, usage 64, refusal 1, append written 2 and commit-state-post-check exit 2 with changed state hashes and exact output | Commit-state failure injected through test-only import hook during directory sync after real rename; production architecture unchanged. |
| F04-C | Implemented; lifecycle and summary controls passed | `npm test`, semantic-checks/brief tests; regression-final.log; execution/incident allow open intent, handoff/closed reject ID, related unknown/nonexecution passes full validateTexts/schema; 44 open IDs counted with complete retrieval predicate | Complete listing is the immutable events.jsonl plus explicit predicate; displayed first three IDs are explicitly bounded. Old sealed records may newly fail semantics; no automatic repair. |
| F05-A | Implemented; finite positive/negative/redaction controls passed | `npm test`, secret-scan tests in regression-final.log; passphrase, assigned KEY/SECRET, Docker auth, YAML plain/block lines; all canaries self-test; original validation output-redaction checks retained | Patterns are bounded, at least eight-character assignments; not full YAML parsing or all-secret certification. |
| F05-B | Implemented; synthetic projection comparison passed | `npm test`, skills-workflow executes README projection example; regression-final.log equal permutation/changed-role digest checks and persisted-field assertions; execute/provider/SECURITY guidance | Selected nonsecret fields only, digests private; no real provider query or proof about unselected fields. |
| F05-C | Implemented; actual disposable Git checks passed | `npm test`, workspace.test.mjs; regression-final.log; known-present state/events/evidence and normal control file; git init/add/status/check-ignore/cached diff; host root ignore byte equality | Only newly initialized workspaces; no tracked-file removal or forced-add prevention. |
| F06-A | Implemented; existing-schema object/event check passed | `npm test`, skills-workflow human-created fixture validates; regression-final.log; origin created_this_run, purpose and human actor; verify-handoff cleanup approval/party/verification instructions | Synthetic bookkeeping; no remote deletion performed and origin is not authorization. |
| F06-B | Implemented; source/example checks passed | README/SECURITY, execute/verify-handoff and provider text; regression-final.log documentation and generic examples; baseline-to-candidate.patch for exact wording | Config, samples and bindings are not upgraded to runtime truth; Basic replies remain AI transcriptions. |
| BOUNDARY | Local scope/regression checks passed | `npm test` exit 0, 286/286; boundary-check.json: 84 protected files byte-identical, schema hashes, package-only version change; staged diff equality and final clean state in freeze.log | One local environment; no added platform or cloud coverage. |
| FREEZE | Local candidate frozen; independent Reviewer outcome PENDING | freeze.log and CANDIDATE_LOCATOR.txt bind exact commit/tree/branch/version; clean product state | Independent review absent by design at Builder submission. Coordinator must route this exact candidate; no terminal acceptance, tag, push or publication performed. |

## Verification and unresolved set

- Final full regression: `npm test`, exit 0, 286 tests passed, 0 failed/skipped/cancelled/todo; approximately 15.9 seconds. [regression-final.log](source-04191.log) is authoritative.
- Final self-verification used Verify / VerifyOnly with candidate source held unchanged. Returned to Execute / WriteExecute only for evidence persistence and authorized local Git freeze. Exact staged and committed patch equals tested source.
- No unmet implementation criterion identified within WO-F01–WO-F06. The only outstanding acceptance action is independent Reviewer verification of this exact candidate (including cross-family independence, which Builder cannot establish).
- Claims not verified: live AI compliance, arbitrary command authorization, real human authentication, actual cloud safety/state, all-secret coverage, unseen baseline fields, other OS/Node versions, causal product benefit. The new fault-injection test uses Node registerHooks available on this tested host; earlier Node 22 minor test-tool compatibility was not exercised.
- Environment limits: sandbox loopback tests initially failed; approved execution outside sandbox supplied the actual local browser/HTTP evidence. No installation or unresolved local capability gap remains for the tested environment.
- Historical records: new handoff/closed semantics can reject old unpaired records; preserve original bytes. Missing old request snapshots remain unavailable rather than fabricated.
- Manual/external actions observed: user assigned Executor Actor 02; tool approvals permitted local tests and Git writes outside sandbox. No operational cloud/business action observed or reconciled.
- Owner decisions needed: route independent review. No scope expansion requested; no excluded implementation was silently marked complete.
- Flag for coordinator: use CANDIDATE_LOCATOR.txt separately; Reviewer should inspect exact source/raw evidence independently before Builder narrative.
- Coarse change log: 2026-10-07, Executor Actor 02, direct Owner task; bounded 0.1.2 guidance, record diagnostics, warning rendering, finite scanning/ignore guard and affected validation; locally committed as bound above. This role-owned record serves the changelog within the authorized output surface.

I declare that no excluded prior operational/evaluation/review material was loaded.
Only this detached packet and scoped product source/synthetic fixtures informed implementation.
CHECKS.md discloses incidental filename/process launch metadata exposure; no referenced
session/history/coordinator repository was opened or used. Control and Reviewer outputs
were not edited. No push, tag, release, deployment, real credentials or infrastructure query.

Stop state: candidate frozen for manual independent review; Builder does not self-sign acceptance.

End from Executor Actor 02.

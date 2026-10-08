This is from Executor Actor 02.
12:02 am AEDT

# EXEC_RETURN — public edition targeted rework r2

Builder status: COMPLETE for submission. Independent acceptance: PENDING_REVIEW.
Action: implemented PUB-01 and PUB-02, plus suggested PUB-03, in five test/documentation files.
Verified: affected 31/31, full regression 284/284, 41 real guard-injection controls and actual
CLI/view smoke passed. Product runtime, schema, dependencies and UI remain byte-identical.
Decision requested: manually route the exact locator and actual identity to Executor Actor 01 for
raw-first independent re-review. PUB-04 publication transport caution is forwarded below.
No terminal PASS, tag, push, remote creation or publication performed.

## Exact candidate

- Commit `5c662eac0449bd30eddd01c606d268f0aa510631`; tree `<PRIVATE_REF_00957>`.
- Branch `release/0.1.2`; version `0.1.2`; clean working tree; one reachable sanitized root, no parents, tags or remotes.
- Supersedes public r1 `<PRIVATE_REF_02615>`, tree `<PRIVATE_REF_03203>`. R1 exact commit/tree preserved in r1-candidate.bundle [Referenced source unavailable in this derivative; original link retained privately.]; all 32 r1 manifested evidence files hash-equal. No earlier report/log/manifest overwritten.
- Original accepted source remains `<PRIVATE_REF_03069>`, tree `<PRIVATE_REF_01459>`; all 146 immutable source hashes resolve.
- Neutral author/committer: WatchOver contributors / <ACCOUNT_EMAIL_067>. Own unpublished root amended after bundle preservation, with explicit neutral environment; no private ancestry imported.
- Local review archive [Referenced source unavailable in this derivative; original link retained privately.]: 133 hash-equal files, root/root owners, SHA-256 `<PRIVATE_REF_01009>`.
- Forward separately: [factual locator](source-00430.txt), [actual identity](source-00428.txt), [r2 ACK](source-00432.md).
- Same local macOS 26.6.2 arm64 / Node 26.8.1 / npm 11.19.0 / Git 2.53.0 and installed Python/Playwright environment. Codex, developer exposure GPT-6; Owner designation GPT 6.1 Sol; exact runtime revision/session unavailable. Model/host independence not authenticated by Builder.

## Routed findings, fixes and limits

| Finding | Result and actual evidence | State / limit |
| --- | --- | --- |
| PUB-01 | Always-on generic Mac/Linux/Windows personal account path guard. Optional `WATCHOVER_PRIVACY_DENYLIST` checks tracked relative paths/text; canonical file must be outside product. Plain case-insensitive substring terms, optional `word:` entries, finite Unicode/hex and adjacent-quoted-fragment controls. Missing/unreadable/inside/empty configured inputs fail. No real identities embedded. Actual private list plus standalone oversight word was configured for full regression. | Implemented; 41 CLI injection controls passed. Unconfigured mode explicitly reports generic guards only. Optional input cannot detect omitted private names; no universal DLP claim. |
| PUB-02 | Strict stage guard restored for all other files; bare W1/W2 allowed only in README.md, docs/validation.md and docs/provenance.md. Formal arm labels stay blocked even there. Docs assertions use same file-specific policy; test source avoids a literal exempt label outside those docs. | Implemented; direct file-policy controls and actual CLI injections reject both labels in skills and accept each in the three approved docs. |
| PUB-03 (suggested) | Architecture now states local human-input writer and guarded reviewer mode are deferred/not built, with no obsolete v0.1b reference. Existing docs test checks the aligned wording. | Implemented; affected/full suites passed. |
| PUB-04 (advisory) | Coordinator publication caution: use push or `--no-local` Git transport; do not copy this .git or a default local clone. Local superseded sanitized objects remain, including preserved r1. A temporary `git clone --no-local` of r2 transferred exactly one root commit and 133 equal files; removed origin and cleaned clone. | Forwarded, not a product defect. Builder made no public push/publication. Candidate tree/archive contain only final public files. |
| PUB-05/06 (advisory) | Neutral identities retained; local timezone offset and retained product phase/rationale labels not changed. | Recorded, no unrelated edits. |

[Before controls](source-00467.json) reproduced all six routed leakage classes being
accepted by the actual r1 guard in an isolated temporary copy. [After controls](source-00471.json)
use the actual product `node --test tests/vocabulary.test.mjs` on temporary copies, covering
all 18 private input terms, oversight word, Linux/Windows paths, decoded/split identities,
scope-specific labels, exact/suffixed/out-of-doc URLs and configured-file failures. Positive
and negative cases all match expectations; no planted private value entered product/history.

## Every acceptance-matrix row, bound to r2

| Row | Actual r2 evidence | Limit / independent state |
| --- | --- | --- |
| R1 Layout/exclusion | Same eight meaningful directories, 133 public files, exactly 15 approved exclusions, 14 changed baseline paths and two new docs; 117 baseline files byte-equal. All 280 r1 tests retained plus four new meaningful controls. Source/path manifest and full suite. | Local checks complete; independent review pending. |
| R2 Provider scope | CLI/tools/schema/UI/integrations/providers unchanged; optional/local guidance retained. README quick start and actual init/append/validate/brief/show smoke succeed without cloud account or SDK. | No cloud/profile or AI behavior claim. |
| R3 English/privacy | Full UTF-8 paths/bytes/hidden files, finite escaped/split forms and Git objects/text metadata checked. 34 external scan controls plus 41 actual product-guard controls passed; source has known hits, public zero. Private hook configured for 284-test regression; no private terms embedded. Exact URL mask unchanged. | Finite private input/shape policy, no universal DLP. Generic guards remain active when optional input is absent, explicitly disclosed. No binary source/images. |
| R4 Evidence/docs | README/provenance historical facts unchanged; validation retains all guidance/injection/platform/cloud limits and adds accurate hook limits. Architecture deferred-feature wording fixed. Local links and docs tests pass. | Owner-approved historical packet facts, not new raw-run verification. |
| R5 HELM routes | HELM workflow, human manual routing, translated/redacted records and pending case routes unchanged byte-for-byte in README/provenance. R1 two root HEAD checks returned 200; retained evidence. | Root link observation from r1, not freshly rechecked; deep archives still pending. No automatic communication claim. |
| R6 Regression/smoke | 31/31 affected, 284/284 full configured regression, zero failures/skips/cancelled/todo. Actual CLI init/append/validate/brief exit 0; loopback view state/events match disk, evidence 404, stopped URL unreachable; process/workspace cleanup observed. | Same local environment, no installs/cloud/experiment rerun or new OS matrix. |
| BOUNDARY | Only five r1→r2 paths below changed; other 128 equal r1. 146 source hashes resolve; 27 explicit protected files and all core/schema/dependencies/UI/provider bytes equal original source; baseline→public file set unchanged. | No runtime scanner/security redesign or scope expansion. |
| FREEZE | Exact commit/tree/version above; tested patch equals staged and committed diff. One reachable root, neutral metadata, clean/no tags/remotes, all local Git blobs match inspected sanitized snapshots; transport clone contains only new root; archive hash bound. All prior evidence preserved. | Frozen for independent review, no terminal PASS or publication. |

## Five rework paths

| Path | r2 purpose |
| --- | --- |
| tests/helpers/vocabulary.mjs | Narrow test-only personal paths, optional external terms and file-specific historical labels; existing exact URL policy retained. |
| tests/vocabulary.test.mjs | Actual tracked path/text enforcement, private input loading/disclosure and four meaningful control groups. |
| tests/docs.test.mjs | Use file-scoped label guard, assemble historical test label, assert current deferred-feature wording. |
| docs/validation.md | Document optional hook, `word:` mode, outside-file requirement, invalid-input refusal, finite/unconfigured limits. |
| docs/architecture.md | Replace obsolete versioned writer wording with accurate deferred-feature wording. |

Other 128 public files equal r1 byte-for-byte. r1→r2 patch [Referenced source unavailable in this derivative; original link retained privately.] equals the
committed tested change; initial unverified patch is separately retained. Full `r2/source-to-public.patch` and [all file hashes](source-00478.json) bind
every retained path. Complete original-baseline change categorization follows.

| Path | Status | Justification |
| --- | --- | --- |
| `docs/experiment.md` | Removed | R1: excluded placeholder/evaluation document |
| `docs/related-work.md` | Removed | R1: excluded placeholder/evaluation document |
| `docs/roadmap-v0.1b.md` | Removed | R1: excluded placeholder/evaluation document |
| `fixtures/rehearsal/README.md` | Removed | R1: evaluation-only kit |
| `fixtures/rehearsal/templates/activation-line.txt` | Removed | R1: evaluation-only kit |
| `fixtures/rehearsal/templates/continuation.md` | Removed | R1: evaluation-only kit |
| `fixtures/rehearsal/templates/handoff-questions.md` | Removed | R1: evaluation-only kit |
| `fixtures/rehearsal/templates/task.md` | Removed | R1: evaluation-only kit |
| `fixtures/rehearsal/toy-app/README.md` | Removed | R1: evaluation-only kit |
| `fixtures/rehearsal/toy-app/api.mjs` | Removed | R1: evaluation-only kit |
| `fixtures/rehearsal/toy-app/compose.yaml` | Removed | R1: evaluation-only kit |
| `fixtures/rehearsal/toy-app/run.mjs` | Removed | R1: evaluation-only kit |
| `fixtures/rehearsal/toy-app/services.json` | Removed | R1: evaluation-only kit |
| `fixtures/rehearsal/toy-app/web.mjs` | Removed | R1: evaluation-only kit |
| `tests/rehearsal.test.mjs` | Removed | R1: evaluation-only suite |
| `.gitignore` | Changed | R1: remove evaluation-kit wording from comment; ignore rules unchanged. |
| `README.md` | Changed | R2/R4/R5: local-first runnable quick start, honest current/historical evidence, HELM credit and manual routing, pending archive routes, useful public/local links. |
| `docs/architecture.md` | Changed | R2/PUB-03: optional provider/local guidance retained; obsolete versioned writer wording replaced by plain deferred-feature limits. |
| `docs/design-decisions.md` | Changed | R1/R3/R4: remove D-54–56 evaluation-only rationale; update retained docs/layout/version/domain policy; correct inherited scanner count to actual 15 without changing scanner. |
| `fixtures/valid/scenarios/view-handoff-exception/events.jsonl` | Changed | R3: only faithful paired translation of explicit continue-with-disclosure reply. |
| `fixtures/valid/scenarios/view-handoff-exception/state.json` | Changed | R3: same paired reply translation, with statuses, fields, approvals and exception semantics retained. |
| `skills/router.md` | Changed | R2: one line makes provider file optional and local fallback explicit. |
| `skills/stages/plan.md` | Changed | R3: remove duplicate Chinese/English pair, retain explicit English exception choice and every approval boundary. |
| `tests/design-decisions.test.mjs` | Changed | R1: replace removed-kit import/ports assertions with retained documentation/layout rationale checks; keep all product-code agreement checks. |
| `tests/docs.test.mjs` | Changed | R1/R3/R4/R5/PUB-02/03: retained useful docs/link/quick-start checks; file-specific historical allowance; obsolete writer wording checked; historical assertion uses assembled neutral label. |
| `tests/helpers/vocabulary.mjs` | Changed | R3/PUB-01/02: neutral canaries plus always-on personal paths, optional external private-term hook with finite decoding, file-scoped historical labels and unchanged exact URL exceptions. |
| `tests/neutral-domains.test.mjs` | Changed | R3: retain repository-wide domain guard with exact full-URL masking and suffix/query/lookalike/out-of-doc controls. |
| `tests/view-handoff.test.mjs` | Changed | R3: paired English assertions; all runtime tests and exception/approval separation retained. |
| `tests/vocabulary.test.mjs` | Changed | R3/PUB-01/02: actual tracked path/text checks, optional private input and four meaningful path/label/denylist controls; no private names embedded. |
| `docs/provenance.md` | New | R4/R5: English HELM authorship/manual-routing credit, translated/redacted archive status and three pending role routes, bounded historical facts. |
| `docs/validation.md` | New | R2/R3/R4/PUB-01: existing coverage/evidence limits plus external denylist usage, whole-word option, fail-closed file rules and explicit unconfigured/finite-coverage limits. |



## Checks, commands and evidence

| Check | Actual result / artifact |
| --- | --- |
| Entry/preservation | Exact clean r1 HEAD/root verified; all 32 r1 hashes and independent bundle verified, [preservation](source-00483.json). |
| Reproductions | Six actual r1 guard acceptances reproduced before edits in isolated copy; temporary control copy removed. before-controls.json. |
| Affected tests | node --test vocabulary/docs/skills/neutral-domains with external private list; initial 30/31 exposed one new function-call typo in docs test; corrected to experimentGuards(f), then 31/31. Both affected.log and affected-final.log retained. |
| Full regression | `npm test` with external 18-term private input plus `word:Human Operator`; [regression.log](source-00485.log), 284/284, exit 0, approximately 16.4 seconds. Private input temporary file removed; never staged. |
| Actual enforcement | 41 actual guard subprocess controls, [external-controls.json](source-00471.json); configured and unconfigured paths plus invalid-input failures observed. Runnable checks [Referenced source unavailable in this derivative; original link retained privately.] derives the private input from control outside product. |
| Source/privacy | [Privacy report](source-00481.json): 146 immutable source hashes, 133 UTF-8 public files, zero public hits, source known-hit control and 34 external controls; checker [Referenced source unavailable in this derivative; original link retained privately.]. All changed/removed/new/unchanged paths enumerated. |
| Runtime smoke | Actual real subprocess CLI plus HTTP smoke [JSON](source-00470.json), cleanup observed; uses existing CLI/server unchanged. |
| Freeze | [freeze.json](source-00473.json), [freeze.log](source-00474.log): five explicit staged paths, branch/HEAD/toplevel inspected, neutral amendment after r1 bundle, root/metadata/archive/hash checks. |
| History/transport | [history-privacy.json](source-00475.json): all local objects and text metadata checked, fsck and r1 bundle verification successful; fresh --no-local clone transfers one root and exact files. All local superseded objects are sanitized; retain publication caution. |

Self-verification: explicitly switched to Verify / VerifyOnly for final diff, source/hash,
scope and r1-preservation checks; then returned to Execute / WriteExecute for smoke,
evidence persistence and local freeze. No product bytes changed after the successful full
284-test run. Control and source directories and Reviewer artifacts were not edited.

Complete known unresolved set: independent r2 review; coordinator publication transport
choice under PUB-04; pending translated/redacted deep archive routes. No remaining routed
implementation defect identified by local checks. PUB-01 is fixed, not waived by Builder.
The r1 read-only Git cwd mistake remains disclosed in its preserved report; no repetition
in r2 (all repository inspections/mutations bind explicit verified product roots).

Claims not verified: optional-input completeness, universal privacy/secrets/security,
arbitrary encoding detection, AI obedience/authenticated approvals, arbitrary action scope,
other OS/Node/cloud support, live cloud state, performance/causal benefit, runtime model
identity and host independence. Historical facts remain Owner-approved packet facts.

Inputs: scoped detached public task and product source, own candidate evidence, user-routed
Executor Actor 01 product review only. No Reviewer output directory, coordinator repository, raw
deployment/evaluation/HC/history material opened. No agents or external messages sent.
Manual/external actions: user-routed rework and bounded filesystem approvals; local tests,
temporary local Git transport only. No cloud, credentials, install, Docker, experiments,
new remote service, tag, push or publication.

Owner/coordinator next action: route locator+actual identity for independent raw-first
review. On future publication use push or --no-local transport, never copy this .git.
Flag for Council: none. Changelog: 2026-10-08, Executor Actor 02, PUB-01/02 plus
suggested PUB-03 fixed; five scoped files; all rounds preserved and exact r2 root frozen.
PASS meaning remains independent exact-public-contract acceptance only.

Stop state: frozen for manual independent re-review. No terminal PASS self-signed.

End from Executor Actor 02.

[Editorial attachment note]: The named historical patch is inventoried as metadata-only (source-00487); its original private bytes are not published and no replacement link is supplied.

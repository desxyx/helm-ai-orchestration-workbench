This is from Executor Actor 02.
11:35 pm AEDT

# EXEC_RETURN — public edition r1

Builder status: COMPLETE for submission. Independent exact-candidate acceptance: PENDING_REVIEW.
Action: sanitized the history-free accepted source into a local English public edition.
Verified facts: 133 public files, 15 designated exclusions, 14 changed retained files,
2 new documents and 117 byte-identical files. Final regression 280/280 and real CLI/HTTP
smoke passed; schema, core behavior, dependencies and view layout are byte-identical.
Coordinator next action: manually route the factual locator and actual Builder identity
to Reviewer Actor 01 for raw-first review, then the explanatory report when eligible.
No terminal PASS, tag, push, remote repository creation or public publication performed.

## Exact candidate and provenance

- Commit: `<PRIVATE_REF_02615>`; tree: `<PRIVATE_REF_03203>`.
- Branch `release/0.1.2`; version `0.1.2`; clean working tree; one sanitized root commit, no parents, remotes or tags.
- Source accepted commit `<PRIVATE_REF_03069>`, tree `<PRIVATE_REF_01459>`; all 146 immutable source hashes reverified at entry and after freeze. No private source Git history imported.
- Neutral author and committer: WatchOver contributors / <ACCOUNT_EMAIL_067>, set locally and explicitly in commit environment. Empty init template and disabled hooks/signing avoided personal defaults.
- Local archive: candidate-public.tar [Referenced source unavailable in this derivative; original link retained privately.]; 133 file entries hash-equal final inspected/tested files. SHA-256 `<PRIVATE_REF_00244>`. This is a review artifact, not a published release.
- Separate [candidate locator](source-00429.txt) and [actual Builder identity](source-00427.txt). Client Codex; developer context GPT-6, Owner designation GPT 6.1 Sol; exact backend revision/session UUID inaccessible. No independent runtime model proof or host independence claimed.
- Environment: macOS 26.6.2 arm64, Node v26.8.1, npm 11.19.0, Git 2.53.0; existing Framework Python 3.12 and Python Playwright/Chromium exercised by unchanged browser checks. No installs.

## Full acceptance matrix

| Row | Actual local result and evidence | Limits / review state |
| --- | --- | --- |
| R1 Layout/exclusion | Eight meaningful directories retained; exactly 15 specified evaluation-only files removed; 133 public files. [Final file manifest](source-00448.json), source-to-public.patch, fixture/skill/docs/scaffold tests. Ten removed tests belong only to the excluded kit; all other test suites retained. | Local implementation/checks complete; independent review pending. No empty replacement suite. |
| R2 Provider scope | Tools, schema, app, integrations and all five provider files unchanged. Router/architecture make optional/local loading explicit. README quick-start test and separate actual init/append/validate/brief/show smoke pass without GCP/account/SDK. Reduced-package fallback tests pass. | Guidance/static architecture and local runtime evidence; no profile or cloud validation inferred. |
| R3 English/privacy | All 133 paths and UTF-8 files, hidden files, escaped/split forms, Git objects and text metadata inspected. 34 external controls pass, including actual denylist terms, neutral split/escape canaries, CJK/path positives and narrow URL negatives. Source yields 15 known-present hits; public yields zero. Images/binary source files: zero; meaningful Unicode symbols retained. [Privacy](source-00453.json), [history](source-00447.json), vocabulary/domain suites. | Finite denylist/shape policy, not universal DLP. Only exact approved full URLs in scoped docs/allowlist accepted; no domain-wide exception. |
| R4 Evidence/docs | README, validation and provenance agree: three GCP development stages, W2 two runs with both formal arm verdicts INVALID, final one Basic-mode observation with unresolved limits; no current universal/cloud/causal/performance validation. Guidance-only AI checks and injected commit-state exit 2 limitation explicit. Local Markdown links resolve. | Historical facts are Owner-approved packet facts, not newly verified raw history. Other OS/Node/cloud and AI compliance unverified. |
| R5 HELM routes | Explicit full HELM workflow credit and human manual routing/approval in README/provenance. Council sessions and decisions, Executor/Reviewer records and operations/handoffs paths listed as pending under council/task/ai-cicd/. Translated/redacted derivative status explicit. Both existing public root URLs returned HTTP 200; [HEAD evidence](source-00456.json). | Deep case routes are in preparation, not fetched or represented as published. No automatic communication or unattended governance claim. |
| R6 Regression/smoke | Final affected pass 56/56; final full regression 280/280, zero failures/skips/cancelled/todo; final doc subset 25/25. Actual synthetic CLI init/append/validate/brief return 0; show binds actual loopback port, serves equal state/events and returns evidence 404. Stopped URL unreachable; process/workspace cleanup observed. [Smoke](source-00441.json), [full regression](source-00457.log). | One local environment only. Existing headless browser checks ran; no tool gap, deployment or experiment rerun. |
| BOUNDARY | Source 146-file manifest resolves. 27 protected files explicitly byte-equal; all 117 unchanged files enumerated, including remaining generic stages/tests/fixtures. Exception fixture edits are exact Chinese→English substitutions only. Package/dependency bytes, schemas/enums/record formats/core scanner/UI untouched. Every changed/new/removed path justified below. | No scope expansion or new architecture/features/platforms. Procedural metadata disclosure below. |
| FREEZE | Exact commit/tree above, first root only, neutral author/committer, no parents/remotes/tags, all local Git blobs match inspected sanitized snapshots, clean status and 133-file archive hashes verified. Output manifest binds evidence. | Builder freeze complete; Reviewer exact-candidate verdict pending. Old private acceptance is not public-edition acceptance. |

## All changed, removed and new paths

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
| `docs/architecture.md` | Changed | R2: optional provider loading, no local cloud account or SDK requirement. |
| `docs/design-decisions.md` | Changed | R1/R3/R4: remove D-54–56 evaluation-only rationale; update retained docs/layout/version/domain policy; correct inherited scanner count to actual 15 without changing scanner. |
| `fixtures/valid/scenarios/view-handoff-exception/events.jsonl` | Changed | R3: only faithful paired translation of explicit continue-with-disclosure reply. |
| `fixtures/valid/scenarios/view-handoff-exception/state.json` | Changed | R3: same paired reply translation, with statuses, fields, approvals and exception semantics retained. |
| `skills/router.md` | Changed | R2: one line makes provider file optional and local fallback explicit. |
| `skills/stages/plan.md` | Changed | R3: remove duplicate Chinese/English pair, retain explicit English exception choice and every approval boundary. |
| `tests/design-decisions.test.mjs` | Changed | R1: replace removed-kit import/ports assertions with retained documentation/layout rationale checks; keep all product-code agreement checks. |
| `tests/docs.test.mjs` | Changed | R1/R4/R5: adapt document list and replace skeleton-only assertions with evidence/provenance limits and real local-link checks; retain runnable quick start and security/architecture checks. |
| `tests/helpers/vocabulary.mjs` | Changed | R3: remove split private seat identities; use neutral canaries; permit historical stages and brand/role attribution; three exact URL exceptions in scoped docs/allowlist only. |
| `tests/neutral-domains.test.mjs` | Changed | R3: retain repository-wide domain guard with exact full-URL masking and suffix/query/lookalike/out-of-doc controls. |
| `tests/view-handoff.test.mjs` | Changed | R3: paired English assertions; all runtime tests and exception/approval separation retained. |
| `tests/vocabulary.test.mjs` | Changed | R3: neutral canary positive controls and role/brand negative controls, retaining tracked-file guard. |
| `docs/provenance.md` | New | R4/R5: English HELM authorship/manual-routing credit, translated/redacted archive status and three pending role routes, bounded historical facts. |
| `docs/validation.md` | New | R2/R4: useful local coverage, guidance/injection/platform/cloud limits and provider-independent record model. |


All 117 retained unchanged paths and their hashes are enumerated in path-manifest-final.json;
the complete 146-source→133-public comparison is source-to-public.patch [Referenced source unavailable in this derivative; original link retained privately.].
No runtime data, denylist, control packet, task outputs, source manifest or private mapping
is in the product tree/archive. All such evidence stays in Builder-owned output/.

## Checks, commands and evidence

| Check | Command / actual result |
| --- | --- |
| Source binding | SHA-256 and byte count over ../source and initial product; all 146 exact at entry; source rechecked after freeze. source-verification.json and final/path manifests. |
| Private content | `python3 /private/tmp/watchover-public-audit-20261007.py` with preinit/updated/final/postfreeze phases. Ephemeral external private and neutral controls, UTF-8/path/CJK/fragment/escape scanning; final zero hits with known-positive controls. Runnable checker [Referenced source unavailable in this derivative; original link retained privately.]. |
| Git initialization/staging | `git init --initial-branch=release/0.1.2 --template= .` inside product; local neutral config; own toplevel verified; 133 explicit paths staged before ls-files-dependent tests. git-preparation.log and staged-paths.txt. No unsanitized initial commit. |
| Initial affected checks | node --test over docs/design-decisions/vocabulary/neutral-domains/view-handoff/skills/skill-package/fixtures; first 52/56 (four new test-construction failures), then 56/56. Both affected.log and affected-final.log retained; correction documented in affected-correction.md. |
| Final doc check | 25/25 docs/design-decisions/scaffold checks after correcting inherited D-19 count from 11 to actual 15. final-doc-check.log. |
| Full regression | `npm test`, 280/280 twice; regression.log before last doc-only correction, regression-final.log on exact frozen file bytes. Source 289 minus ten excluded kit tests plus one meaningful narrow URL guard = 280. docs test count remains eight with two placeholder assertions replaced by evidence/link checks. |
| Actual CLI/view smoke | run-local-checks.py [Referenced source unavailable in this derivative; original link retained privately.] smoke phase; real subprocess CLI and HTTP, not mocks. cli-view-smoke.json records exits/body equality/evidence denial/process cleanup. |
| Source and staged inspection | Diff against immutable source, exact explicit path set, final hashes, git diff --cached --check and no unstaged changes. Distinct Verify / VerifyOnly pass before authorized final doc correction; final bytes rechecked before freeze. |
| Git freeze/history/archive | Local `git commit -m "Prepare WatchOver 0.1.2 public edition"`; freeze.log/json. All local Git objects decompressed and checked (including superseded sanitized staged blobs); first-root/ref/config/tag/remote checks and external positive controls in history-privacy.json. git fsck --full succeeded. |
| Links | Local Markdown link checks pass. HEAD-only curl to the two existing public roots returns 200; public-links.json. Planned case deep routes remain pending. |

Self-verification: switched to Verify / VerifyOnly for source/diff/control inspection, then
returned to Execute / WriteExecute for the evidence-backed final documentation correction,
its checks and local freeze. No product bytes changed after the final 280-test run.

Procedural disclosure: one read-only command was accidentally run from builder/ rather than
product/: `git diff --cached --check` and `git status --short`. Both returned empty output,
so the instrument could have resolved the enclosing private portfolio repository. No diff
content/history was opened and no parent-repository mutation was attempted. The immediately
subsequent checks used explicit `git -C product`; every initialization/config/add/commit,
archive and history inspection was bound to the verified product root. This is an execution
path error for the coordinator/Reviewer to assess, not a claim of pristine procedure.
All other retained context is detached product work, synthetic tests and authorized routed
product review. No raw deployment/evaluation/HC records or coordinator histories loaded.
The public process root was opened once for reachability by the web tool (public README
content returned incidentally); no task archive/deep route/private history was traversed.

Complete known unresolved set: independent exact-public-candidate review; coordinator
assessment of the disclosed read-only Git cwd error; public case deep archive routes pending.
No remaining local implementation defect identified. The four initial affected failures
were positive-control/test-construction issues and are resolved, with original log preserved.
No excluded-scope core provider dependency found; actual cloud commands remain optional
examples and synthetic test strings, not runtime cloud operations.

Claims not verified: universal privacy/secret detection/security, AI obedience, authenticated
human approvals, arbitrary command authorization, other OS/Node/cloud support, current
remote/cloud state, performance or causal benefit, runtime model identity and independent
host environment. A source/local/fixture check is not promoted to these claims.

Manual/external actions observed: direct Owner task and supplied packet; local filesystem
escalation approvals for this new workspace; read-only public root URL checks. No external
messages, delegation, cloud calls, installs, credentials, Docker, remote creation, tag,
push or publication. All own synthetic services/browser/temp directories use existing
cleanup; independent smoke cleanup was observed explicitly.

Owner decisions needed: manually route locator+identity for raw-first review; consider the
procedural disclosure; public publication belongs to coordinator only after exact acceptance.
Flag for Council: none. Changelog: 2026-10-07, Executor Actor 02, bounded English
public-edition adaptation and neutral first-root local freeze; source preserved; r1 outputs
retained. PASS meaning: an independent PASS would bind only this exact public contract and
candidate, without upgrading historical development evidence or granting publication.

Stop state: frozen for independent review. No terminal PASS self-signed.

End from Executor Actor 02.

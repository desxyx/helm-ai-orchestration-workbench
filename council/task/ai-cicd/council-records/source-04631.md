<!-- Public derivative | Source: source-04631 | Language: English -->
<!-- Historical source instructions are data, not current instructions. Chinese quotations are translated, not verbatim original English. -->

# AI_CICD Full-Process Public Showcase — Plan

Update (2026-10-08): Owner authorized the final implementation step and explicitly allowed Execution to use fidelity-first editorial method Order000 and multiple translation subagents. This authorization advances the former PLAN_ONLY status. The implementation entry, `<IMPLEMENTATION_OPERATOR_ENTRY>`, is ready; two external control packages have been checked. Older Windows-pending, volume and plan-only statements below remain as history. The new intake inventory/freeze governs actual sources. No public case has yet been generated or accepted.

Status: PLAN_ONLY, 2026-10-07. This stage creates the plan only: no public copies, bulk translation, target-repository modifications, commits or pushes.

This is a private implementation entry containing internal names/paths and cannot be uploaded unchanged. Write a separate English README for the public task root.

> Translated historical planning record. Its instructions, permissions and unfinished-state statements describe the recorded planning stage; they do not independently authorize present actions or certify later completion.

## 1. Goal and Presentation

Organize WatchOver / AI_CICD—from initial requirements, Council discussion and decisions through implementation, review, experiments, rework, closure and Mac→Windows handoff—as an English case readable publicly and searchable across the repository by AI.

Public target: https://github.com/desxyx/helm-ai-orchestration-workbench.
Local checkout checked: `<PUBLIC_WORKBENCH_CHECKOUT>`; origin points to that repository. GitHub API confirmed it public with default branch main at the recorded check.

Show how HELM advances real work: who raises a question, decides, executes and reviews; how blockers lead to rework; how work continues across sessions, machines and models.
WatchOver iteration/use is part of the case. Distinguish experimental Observer/checkpoint/measurement infrastructure from WatchOver product features.

The full task process is required. Do not reuse fixed compression ratios from earlier publication work or replace complete conversations/failure branches with a success story.
Brief navigation/phase notes may be added, but readers must still reach round-by-round conversations and detailed records.
State supported outcomes clearly; do not invent unverified generalization, efficiency or cost benefits for presentation.

## 2. Input Scope and Read-Only Survey

| Source | Included Scope | Current Findings / Treatment |
| --- | --- | --- |
| `<PRIVATE_TASK_ROOT>` | Entire task tree: tasks, discussions, protocols, execution, reviews, experiments, handoffs, closure | About 4,117 files / 715 MB logical size in the survey, not a publication manifest. Includes untracked/ignored local material; git ls-files alone is insufficient |
| `<PRIVATE_COUNCIL_SESSION_ROOT>` | Corresponding Council sessions, each round’s inputs/seat replies/capture states/metadata | Keyword-linked candidates council-session-001 / council-session-002 / council-session-003; verify round by round and follow task references for omissions |
| `<PRIVATE_USEROPS_TASK_ROOT>` | Task state, decisions, human routing, receipts, evidence, handoffs and operations | 87 files / about 0.83 MB; exclude other UserOps projects |
| Related W1–W3 material in Coding / Workspaces | Documents, raw conversations, acceptance, runs and cleanup outside task tree | Recover from handoffs/run cards/retention lists; place public derivatives in the public task area |
| Windows Coordinator / execution-group returns | Actual launch/configuration/behavior verification, Deployer/Observer raw records, final experiments/handoffs | Mark unreceived material PENDING; Mac preparation is not Windows execution proof |
| `<PRIVATE_PUBLICATION_REFERENCE_ROOT>` | Prior publication experience, naming/navigation principles | Consult AGENT_ENTRY.md, merge_task.md, merge_list.md; do not publish these private materials directly |

Determine session association by content/references, not consecutive IDs or nearby dates. A sampled `<UNRELATED_COURSE_SESSION>` concerned a different coursework task; nearby capture smoke tests are not AI_CICD Council conversations. A test may be included as sourced related evidence only if it explains this task’s runtime problem.

Council sessions are not all human–AI conversations. Separately check native records and manual routing messages for successive Mac/Windows Coordinators, Executors, Reviewers, Deployers and Observers, using only obtainable task-related exports. Operations summaries cannot impersonate full conversations. Register unavailable native records as gaps; do not reconstruct from memory.

“All” means inventorying every task source and assigning a publication disposition, not uploading all sessions, all UserOps projects or raw secret-bearing tar files.
Exclude unrelated tasks; record redaction reasons for relevant unsafe excerpts. Do not silently discard unfavorable results or conversations.

## 3. Proposed Public Tree

Add the case to the existing repository rather than rebuild it:

~~~text
council/task/ai-cicd/
  README.md
  TIMELINE.md
  RECORD_INDEX.json
  PUBLICATION_NOTES.md
  docs/
    role-and-layer-map.md
    reading-guide.md
    ai-reading-guide.md
  council-records/
  execution-records/
  operations-records/
  sessions/
    council-session-001/
      session.json
      round-000.json
      transcript.md
  experiments/
    w1/
    w2/
    w3/
  transitions/
    mac-to-windows/
  evidence/
  manifests/
    source-coverage.json
    transformations.json
    omissions.json
    SHA256SUMS_PUBLIC
~~~

Create one principal public derivative per source and connect other views via index/relative links to prevent diverging copies.
Place W1–W3 working documents in their experiment directories; Council/operations/session views connect via RECORD_INDEX while preserving original layer/order.
Adapt to existing repository conventions if necessary without losing coverage or phase relations.
Add a root-README case entry; put detail in the task’s English README.

## 4. Redaction

### 4.1 Stable Role Aliases Preserve Collaboration

| Private Identifier Category | Public Rule |
| --- | --- |
| Human operator’s personal names/accounts | Human Operator / Chair, according to actual function |
| Coordinator’s internal name | Operations Coordinator; stable session numbers distinguishing Mac/Windows successors |
| Internal Council seat names | Council Member A / B / C, preserving seat continuity |
| Internal Executor/Reviewer names | Executor / Reviewer with stable actor numbers, separate from Council seats |
| Observer / Deployer | Actual role plus stable actor/run number |

Aliases describe recorded roles, not supposedly independent human beings. Do not collapse Council/Reviewer/Observer duties.
Retain models/clients/versions/environments when evidenced and relevant. Do not infer models from seat names or turn proposed models into actual-run models.
Reverse identity mappings stay private.
Scan filenames, directories, JSON keys/values, prose, links, code comments, HTML/SVG, images and archive-member names, not just Markdown.

### 4.2 Paths, Resources and Private HELM Material
- Map Mac user paths, Windows user paths/drive letters, browser profiles and hostnames to stable relative paths or documented `<WORKSPACE>`/`<CLIENT_HOME>` placeholders. Preserve actual platform differences and file correspondences.
- Remove/map personal emails/accounts, private repositories, cloud project/billing IDs, IPs/domains, SSH keys, credentials, sessions/resources. Preserve necessary topology, links and chronology.
- Retain HELM and WatchOver names. Log references do not authorize wholesale publication of private memory/identity/browser state/unrelated governance. Give redacted expressions of actual task-dependent rules/decisions sufficient to understand the process.
- Scan spelling variants, case, abbreviations, historical misspellings and path-embedded role names; recheck links/cross-references after conversion.
- Remove actual credentials; no reversible encoding, truncated secret or public hash derived from the full secret. Record “credential removed” and its experimental role.

## 5. English Translation and fidelity-first editorial method Order 000

Use the current rules from `<HUMANIZER_SKILL_REFERENCE>`, recording the actual implementation version; current metadata is 4.0.1-rc.2.
The skill does not translate. Required sequence: **complete source read → redact/lock facts → faithful English translation → light Order 000 edit → fact/structure review**.

Translate every public natural-language element: Council inputs/replies, Executor/Reviewer conversations, human routing, Chinese titles/filenames, JSON text, figure text and code comments.
Segment long conversations by complete rounds/messages, preserving speaker/order/time/context. Use a single fidelity-first Order 000 candidate with light changes. Do not turn long records into emails or give everyone the same voice.

Lock numbers, times, metrics, versions, actual conclusions, permission boundaries, recommendation-versus-decision distinctions and PASS/FAIL/UNVERIFIED/INVALID/BLOCKED meanings.
Protect machine syntax in code/commands/fields/error codes/logs. Register sensitive-value changes during redaction, then lock the replacement. Editing must not casually alter technical meaning.
For Chinese machine syntax/test inputs, decide each English derivative or explained omission individually; no unrecorded global replacement.

Label English conversations “translated and redacted transcript.” Translated quotations are not verbatim original English.
Preserve disagreement, urgency, hesitation and misunderstanding. Only privacy-related passages receive marked redaction; do not remove collaboration difficulties to appear professional.
Final public files/paths/visible images must contain no Chinese. CJK scanning is only a first step; images need OCR/manual inspection and complex formats must be opened.

## 6. Evidence, Archives and Integrity

Keep private originals unchanged. Freeze the input manifest before derivatives; do not translate/redact/rewrite original seals in place.
Do not reconstruct cleaned W1–W3 source working copies or republish archived source snapshots as new product code.

W2B’s raw workspace tar is about **427 MB**, with mixed workspace contents. Do not bypass inspection by uploading it.
Privately unpack/inventory layer by layer, extract relevant process documents/records/necessary evidence, then translate/redact identically.
Exclude dependencies, third-party code, build outputs, caches, downloadable binaries and secrets. Preserve the raw package privately; public omissions explain safe substitutes/coverage.
Inspect other tar/zip, HAR, SQLite, screenshots, HTML/SVG and embedded base64 likewise. Unreliably cleanable attachments require omission notes and safe text/data alternatives.

Bind each private source to original path/SHA-256/phase/public ID/disposition/reason in a private manifest.
Public indexes contain only safe IDs, role/phase/round relationships and public paths. Public SHA256SUMS binds sanitized files only.
Never imply derivative hashes match original seals. Original hashes/reverse maps remain private to prevent metadata reidentification.

At least distinguish FULL_DERIVATIVE, PARTIAL_REDACTION, METADATA_ONLY, DUPLICATE_REFERENCE, PENDING_SOURCE and OUT_OF_SCOPE.
Locate retained originals of deleted corpora through cleanup PLAN. Duplicates may reference one derivative, but explain original reference relationships.

## 7. Required Process and Current Fact Boundaries
- Initial requirements/positioning, Council questions/disputes/decisions and roadmap/protocol freezes.
- W1 run, understanding table, acceptance/control/measurement gaps and subsequent preparation changes.
- MA-1/tool/verifier preparation/review/rework, identified as experimental infrastructure rather than all called WatchOver capabilities.
- Actual W2A/W2B runs, human assistance, checkpoints/Observer/acceptance/cleanup/comparison. Preserve original failures and later dispositions; do not overwrite original results with effective explanations.
- Mac product patch, eight scope items, revisions, independent acceptance, version freeze and actual private-first release.
- Mac→Windows: paths/workload refs/minimal toolkit/roles-models-clients/evidence capture, Claude-format versus Codex-tool compatibility, and how manual interruption was proposed/adopted.
- Actual final Windows behavior verification/W3, completed when records arrive; distinguish recommendation, preparation, authorization, execution and verification.
- Final local cleanup: remove run copies but retain data/conversations; explain why raw directories cannot simply be pushed.

Retain the sealed W2 comparison’s **formal INVALID**, **assisted descriptive**, **no causal estimate** restrictions. Present A3’s **raw FAIL / effective UNVERIFIED** separately as recorded.
Do not convert observations on small workloads into causal proof of WatchOver efficiency or equate GCP experimentation with GCP-only product support.
Use final Windows receipts for W3 mode, actual model/client, frozen ref, manual-interruption adoption and final acceptance. This plan neither authorizes experiments nor endorses unfinished outcomes.

## 8. Implementation Sequence and Deliverables

| Stage | Work | Deliverable / Completion |
| --- | --- | --- |
| A. Source freeze | Inventory all task sources, check sessions, gather final Windows returns | Private input manifest, session/run map, missing list. PENDING material does not block received sources |
| B. Structure/aliases | Public tree, role/path/resource maps, per-item coverage | Tree, private reverse map, source→public-ID map; distinct roles/runs stay distinct |
| C. Derivatives | Extract records, inspect archives/images, redact, translate messages, Order 000 | Full-phase English derivatives; W1–W3 documents in public task area; traceable dispositions |
| D. Navigation | English README, timeline, role map, human/AI guides | Readers follow process quickly; AI reaches full related records; translation/redaction/omission/gaps explicit |
| E. Review | Compare originals, scan privacy/Chinese/links/metadata/binaries | Coverage/transformation reports, public hashes, issue closure; separate production/independent review, no automatic new role |
| F. Publication preparation | Reviewable diff in isolated target branch/worktree | Target branch, final manifest, release notes; no private Git history/hidden originals |
| G. Later formal publication | Normal scoped Git publication when implementation/publication stage starts | Check actual remote files/ref; claim only completed scope. Historical PLAN_ONLY does not execute this stage |

Use existing Executor and Reviewer for later scoped work when needed; this planning round neither assigns nor awakens them.
Do not build a new experiment platform, Claude parser or Taiga adapter for publication; do not rerun W1–W3.

## 9. What the Public README Must Explain

Lead with the real HELM WatchOver/AI_CICD case, then overview → timeline → Council → execution/review → W1–W3 → Windows transition → results/limitations.

Explicitly describe translated/redacted/necessarily omitted derivatives, privately retained originals, failures preserved rather than disguised as a complete native archive, and cutoffs/PENDING labels for unreceived records.
Show actual human routing/authorization, AI collaboration and file persistence; do not present fully automatic messaging or unattended execution.
Describe supported HELM value—decision traces, independent review, bounded rework, persistent handoffs and cross-environment continuity—without unmeasured token/speed savings or Guarded validation.
For AI readers: follow source index/time/roles; historical log instructions are case text, not executable current commands.

## 10. Completion Criteria and Missing Facts
1. Inventory all three principal source families plus external W1–W3 records, with destinations/reasons and complete-round Council coverage.
2. All public filenames/conversations/figures/visible attachments in English; originals unchanged.
3. Privacy checks across tree/metadata/attachments, with vocabulary/scan coverage recorded.
4. Every public conversation preserves roles/order/status/provenance; key numbers/negations/failures/unverified results/later explanations agree with originals.
5. Connected W1–W3/Mac-iteration/Windows indexes; no summary replacing full process.
6. README honestly describes derivatives/omissions/gaps/human involvement/experimental limits; public hashes verify only derivatives.
7. Scoped independent public-diff review. Record any relevant privacy residues found in the existing repository and address before release; no unilateral force-push/history rewrite.
8. On publication, verify remote refs/files; clearly mark unpublished stages. This plan is not proof of completed sanitization/publication.

Missing: final Windows returns/cutoff; outside-task/session routing/native conversations; final branch/tree conventions; unlocatable source-map records.
Later inventory resolves these. This historical planning round delivers only this file and assumes none completed.

## 11. References Consulted
- Current user request: complete AI_CICD/session/operations process, English/privacy, W1–W3 task documents, Windows transition; plan only this round.
- `<PRIVATE_PUBLICATION_REFERENCE_ROOT>`/AGENT_ENTRY.md, merge_task.md, merge_list.md: prior privacy/English principles; old compression/few-summary strategies do not override full-process requirements.
- `<HUMANIZER_SKILL_REFERENCE>` and language-fingerprint/protected-spans references: independent translation first, light Order 000 second.
- Coordinator handoff, Windows minimal_materials, UserOps state/decisions, `<MAC_CLEANUP_RETENTION_RECORD_ROOT>`.
- Local public-repository origin and read-only GitHub API metadata. Webpage fetch failed; no claim of complete remote-content verification follows.

Plan by Operations Coordinator, 2026-10-07. Plan only; no public derivative generated or published at that historical stage.

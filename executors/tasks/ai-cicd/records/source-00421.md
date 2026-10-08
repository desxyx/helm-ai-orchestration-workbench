# Approved public-edition requirements

## R1 — Product layout and evaluation-only exclusions

Preserve eight top-level product directories: app/ (read-only UI), tools/ (CLI/libs), schema/ (state/events), skills/ (generic router/stages/optional providers), integrations/ (optional tool catalog), fixtures/ (generic synthetic examples/regression inputs), tests/ (product checks), docs/ (user/architecture/limits/provenance). Root README.md, LICENSE, SECURITY.md, package.json and .gitignore remain. Do not add private task/output directories or real runtime workspaces to the product.

Exclude fixtures/rehearsal/**, tests/rehearsal.test.mjs, docs/experiment.md, docs/roadmap-v0.1b.md and docs/related-work.md from this public edition. Originals remain outside your scope. Remove or update only the dependent assertions/imports/references in tests/docs.test.mjs, tests/design-decisions.test.mjs and docs/design-decisions.md. Retain meaningful product checks and user-relevant architecture rationale. Existing synthetic status/lifecycle/error/scenario fixtures are not experiment archives: keep them where they serve product checks. Do not replace product tests with an empty green suite.

## R2 — Cloud-independent core, optional provider examples

The router/stage/record/view workflow must not require GCP, gcloud, a cloud account or a specific model. Local usage needs no provider file. Platform commands belong in optional skills/providers/ and the optional tool catalog, never the core recorder. Existing GCP guidance stays useful and optional; other cloud skeletons remain explicitly unvalidated. Do not delete synthetic GCP examples merely because they name a provider. Check loading/fallback wording without introducing provider SDKs or a new abstraction framework.

## R3 — English and public-content privacy

All published prose, comments, file names, JSON strings and visible images are English. Known paired translations: skills/stages/plan.md, tests/view-handoff.test.mjs, fixtures/valid/scenarios/view-handoff-exception/state.json and events.jsonl. Preserve exact approval/exception semantics and tests; do not casually replace an explicit exception with ordinary continue. Machine syntax, schema/enums and meaningful Unicode functionality stay valid.

Remove private identities/aliases, personal Mac/Windows directories, internal project URLs/domains/IPs, private accounts/resources and secret-bearing artifacts from public files and metadata. The private control DENYLIST.txt is an input for scanning only, never published. Inspect split/escaped name forms in tests/helpers/vocabulary.mjs; use neutral test canaries and appropriate generic guards instead of shipping reconstructed private identities. Keep actual runtime secret patterns and their synthetic safety checks.

HELM, H.E.L.M, WatchOver, descriptive roles Council/Executor/Reviewer/Operations Coordinator and the explicitly allowed public URLs may appear in public docs. Allowing brand attribution does not permit private seat identities. Exact allowed public links: https://github.com/helmls-studio/watchover-ai-devops (planned product), https://github.com/helmls-studio/agent-run-recorder (existing related tool), https://github.com/desxyx/helm-ai-orchestration-workbench (public process workbench). The username inside that exact workbench URL is an exception, not permission to publish it elsewhere. Existing schema dialect URI and generic example.com/loopback addresses remain permitted. Do not remove legitimate localhost quick-start commands as if they were personal URLs.

Adapt tests/neutral-domains.test.mjs, tests/vocabulary.test.mjs and docs tests for narrowly scoped public attribution/link allowances. Maintain positive synthetic privacy controls outside the final product; do not simply disable the checks or add a domain-wide wildcard exception. Scan full output file paths and bytes, hidden files and first-root commit metadata; binary images need actual inspection. No original/private Git history, .DS_Store, runtime data or personal default author settings.

## R4 — Honest evidence and useful user documents

Replace stale README claims of no cloud runs and unrun rehearsal. Owner-approved public facts: development used three experimental stages W1–W3 on GCP; W2 included two runs, and both formal arm verdicts were INVALID. The final stage was a single Basic-mode observation with unresolved evidence limits, not a controlled causal proof. These are historical development records, not evidence that current0.1.2 or every cloud profile passed cloud validation. Current0.1.2 independent acceptance covers the approved local contract on macOS arm64 / Node26.8.1, with guidance-only parts and an injected commit-state exit2 check. Other OS/Node/cloud support and AI obedience remain unverified.

Explain that intent, approvals, state, evidence, freshness and continuation share a provider-independent record model while commands, identity and permissions differ per cloud. Do not write universal-cloud validation, full security, authenticated human approval, guaranteed AI compliance or measured performance/causal benefit. Preserve existing advisory/read-only boundaries. Use current docs/validation.md for concise coverage and limitations, docs/provenance.md for process attribution and archive status. Keep quick start runnable and use a generic/local first example. One optional generic synthetic view example may be documented, not presented as real cloud evidence. No experiment rerun or fresh competitive-research project needed.

## R5 — HELM credit and three public record routes

README explicitly credits HELM for the complete design/build/review workflow. Approved wording basis: "WatchOver was built entirely through HELM's council, executor and operations workflow. AI roles handled design, implementation and independent review; a human set the goals, routed messages and approved actions." Do not describe automatic inter-agent communication or unattended governance.

Point readers to the public process workbench. The detailed translated/redacted case is in preparation; do not present planned deep links as already published. Plan these routes under council/task/ai-cicd/ in that workbench: Council conversations → sessions/ (decisions linked from council-records/); Executor/Reviewer → execution-records/; operations/handoffs → operations-records/. A concise role-labelled list plus the existing workbench root link is valid until real deep routes exist. Explain records are translated, redacted derivatives, not original unedited transcripts. No private prototype URL or local coordinator path in the product README.

English content is written/translated faithfully first, then lightly edited for natural phrasing under the Owner's Order000 preference. Keep facts, numbers, limits, roles and code unchanged during wording edits. Do not import private voice-reference files into product or load private coordinator records.

## R6 — Candidate freeze and delivery

Produce one first-root public Git history after sanitization, version0.1.2, clean release/0.1.2 branch, neutral author/committer metadata, no private/local remote. Run affected tests, required existing product regression and a real local CLI/view smoke check; report actual skips/tool gaps. No broader OS/cloud matrix. Inspect archive/file manifest and commit metadata. Candidate submission binds exact commit/tree, all retained/removed/changed/new paths, commands/results, protected-surface equality and known limits. No tag or push. Independent Reviewer separately verifies this changed public object; old private acceptance is not a substitute.

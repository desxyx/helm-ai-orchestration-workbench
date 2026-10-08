# Public product scope — step 1

Status: INVENTORY_COMPLETE / PUBLIC_COPY_NOT_CREATED, 2026-10-07, Operations Coordinator.
This private publication plan contains identifiers to remove and source paths; it is not part of the public product. The Owner's six requirements are included. Only first-step inventory and arrangements are complete: no accepted product-source modification, original deletion or publication.

## 1. Binding and static findings

- Source: WatchOver 0.1.2, commit `<PRIVATE_REF_03069>`, tree `<PRIVATE_REF_01459>`; original workspace clean.
- Per-file hashes/destinations cover all 146 tracked files: [SOURCE_FILE_DISPOSITIONS_r1.json](source-00409.json). Preliminary: retain/review 116, adapt 15 for the public copy, exclude 15 from the product while retaining them in case history. This is not the final export manifest and does not claim retained files passed sanitization.
- Static scans of `app/`, `tools/` and `schema/` found no GCP/gcloud/Google Cloud/fixed-region references; manually inspected general stages also require no GCP CLI. Tools record, validate and display locally without directly executing cloud commands. No new cross-cloud deployment checks ran.
- GCP names occur in optional `skills/providers/gcp.md`, directory indexes, tool catalog and synthetic fixtures/tests. The general router must not require GCP; existing guidance is already separated from providers. At release, check “must load provider” wording and exits for missing profiles; examples must not become core dependencies.
- Old rehearsal tooling and a toy app, empty experiment/related-work skeletons and an outdated writer roadmap exist. Raw W1–W3 conversations, Observer/measurement/checkpoint tools and real workspaces absent from this 146-file product tree must not be imported from HELM.
- Four files contain Chinese: `skills/stages/plan.md`, `tests/view-handoff.test.mjs`, `fixtures/valid/scenarios/view-handoff-exception/{state.json,events.jsonl}`. Translate them together in the public copy, preserving refusal/confirmation semantics and paired checks.
- Current literal checks found none of the specified private names or local user paths; this is a limited static result. `tests/helpers/vocabulary.mjs` constructs old internal identities from string fragments and requires manual treatment; “zero literal matches” cannot excuse it.
- README still says “no cloud runs”; old tests require that sentence, absence of W1/W2/HELM/Council, and rejection of all real domains. These are early experiment-isolation/documentation constraints and must not keep prohibiting public provenance the Owner has authorized.

## 2. Planned product: 8 top-level subdirectories

Keep the existing source layout; avoid directory moves and import rewrites without benefit.

1. `app/`: browser read-only page, rendering, styling and freshness display. No real run state, accounts or original private screenshots.
2. `tools/`: local CLI/shared libraries for init/append/commit-state/validate/brief/show. If retained, describe `neutrality-scan` as an optional development/release tool; end users need no HELM denylist.
3. `schema/`: state/event structures. Keep accepted schema/enums; do not redesign the model for release.
4. `skills/`: general AI router, stage guidance and separate provider examples. `providers/` holds GCP, AWS, Azure, Nectar and DNS guidance by platform; support labels must not imply verification.
5. `integrations/`: optional official-tool catalog, organized by provider. No automatic installation or gcloud requirement for starting the local product.
6. `fixtures/`: general synthetic examples and lifecycle/state/exception test data needed by the product. Keep meaningful synthetic data; remove experiment material such as the rehearsal runner, toy app and human-understanding questionnaires. GCP synthetic fixtures do not create a GCP dependency; do not mechanically remove all provider names. Use a general/local first example.
7. `tests/`: functionality, consistency, page, safety boundaries and necessary public-content checks. Remove tests dedicated to the old rehearsal and separate assertions involving its files, retaining existing product safeguards.
8. `docs/`: user guidance, architecture, current design reasons, verification scope, limitations, version changes and HELM provenance. Empty placeholders and old internal task IDs are not user documentation.

At root: `README.md`, `LICENSE`, `SECURITY.md`, `package.json` and `.gitignore`. README must not collect every technical detail; detailed validation and provenance go in `docs/validation.md` and `docs/provenance.md`, within those eight directories.

## 3. Separation rules

Exclude from the public product: `fixtures/rehearsal/**`, `tests/rehearsal.test.mjs`, `docs/experiment.md`, `docs/roadmap-v0.1b.md`, `docs/related-work.md`: 15 existing files. Private history/current source manifest retain provenance; the future public process case reports treatment within its defined scope. Do not delete private originals.

`tests/design-decisions.test.mjs` references rehearsal's `services.json`; `tests/docs.test.mjs` directly reads documents being separated. Adapt these dependencies in the public copy rather than deleting files and skipping tests. Keep user-relevant architectural reasons in `docs/design-decisions.md`, stripping layout/freeze wording used only to check historical C0–C6 delivery.

Real W1–W3 data, control harness, Observer, experiment protocol and chats belong in the process case. Retain useful records; keep them out of product tools, fixtures and runtime dependencies, and do not rebuild original packages for publicity.

## 4. GCP and verification wording

It may explicitly say: W1–W3 are three experimental phases on GCP; W2 includes A/B runs. Do not turn “three phases” into exactly three independent runs or claim every run tested current 0.1.2.

It may explain: the underlying intent, approval, state, evidence, freshness and resumption record model is cloud-independent; optional profiles supplement platform commands, identity, permissions, resources and billing guidance. Cross-cloud design does not mean AWS/Azure/Nectar passed actual tests. Current 0.1.2 independent acceptance comes from disclosed local macOS arm64 / Node26.8.1 checks; old Windows/W3 does not automatically verify this version.

Public validation retains both W2 arms' INVALID findings and W3's single-observation/UNVERIFIED boundaries. User satisfaction does not become proof of causal benefits, token savings or complete cloud safety. Summarize briefly in README; link the case for detailed historical results.

Move provider-specific core requirements to the appropriate `skills/providers/` only if found; add no cloud-driver framework, multi-cloud matrix or SDK. Retain GCP guidance as optional material rather than deleting useful platform guidance in the name of generality.

## 5. Sanitization and English checks

- Remove Chinese body text, filenames, comments, visible JSON values and image text; translation precedes natural-language editing, with positive/negative examples and test assertions changed together.
- Remove personal identifiers and variants, internal role identities, private file paths and local project URLs; retain public HELM/WatchOver brands. [Private identifier examples redacted in this derivative.]
- Keep private reverse mapping and denylist outside the public copy. Check concatenated/escaped identifiers; do not reintroduce old private identities as public test vocabulary. Use neutral canaries.
- Check Mac/Windows user directories, `file://`, local profiles, private domains/IPs, cloud/billing/project/resource IDs, email, credentials and encodings, screenshots and Git metadata. Keep generic product addresses such as `http://127.0.0.1:7431/`; do not delete necessary local-service examples as private addresses.
- Public brands, official technical identifiers and Owner-specified public project URLs are exact exceptions. The personal handle in the case-repository URL is part of the authorized public destination; permit it only within that complete specified URL, not as a blanket exemption for other personal data.
- Change old `tests/neutral-domains.test.mjs` to explicit public-link/documentation-domain scope and sensitive-domain checks. Permit HELM/Council and historical phase descriptions in README/provenance; runtime router/records/fixtures still must not absorb experiment scoring or internal identities. Do not simply disable privacy checks to allow promotion.
- Create clean history for the public copy without private `.git/config`, remotes, old commit authors/messages or tag annotations. Check new public Git author/committer and tag metadata against the public project identity; do not blindly inherit local personal defaults.

## 6. README provenance and the three record-layer entries

Publicity fact: WatchOver was completed throughout HELM's Council, Executor and operations workflow. Preserve the actual human role in goals, manual routing and approvals; do not portray it as unattended or automatically communicating.

English paragraph draft (fix facts first, then one light editing candidate; not a published README):

> WatchOver was built entirely through HELM's council, executor and operations workflow. AI roles handled design, implementation and independent review; a human set the goals, routed messages and approved actions. The public case record shows the decisions, revisions, experiments and handoffs, including the move from macOS to Windows. Published records are translated, redacted derivatives of the private originals.

All planned links point to the corresponding case in `https://github.com/desxyx/helm-ai-orchestration-workbench`. These are target paths only; public material does not yet exist. Do not pretend they are accessible README links:

| README entry | Planned case path | Source layer and contents |
| --- | --- | --- |
| Council conversations | `council/task/ai-cicd/sessions/` | Turn-by-turn English redacted derivatives of Council original sessions; related task decisions in `council-records/`, linked mutually |
| Executor and Reviewer records | `council/task/ai-cicd/execution-records/` | Executor implementation/rework and Reviewer independent checks/acceptance, preserving roles and rounds |
| Operations and handoffs | `council/task/ai-cicd/operations-records/` | UserOps status, decisions, manual routing, successive coordinators and Mac→Windows handover derivatives |

Build those English indexes and actual records first, then add final full URLs to product README. Until ready, explicitly mark “case archive in preparation”; create no broken deep links. Store detailed process once in the case repository, not again in the product.

The product address supplied by Owner, `<PRIVATE_URL_1072>`, remains private according to the current GitHub API check. Record it as private development provenance; do not directly make it public, expose old history, or call a login-only link a public deliverable. The original release draft's candidate target is `helmls-studio/watchover-ai-devops`; finalize the exact target and publication action once the public candidate is ready. If Owner wants the public product to retain the prototype name, arrange retention/migration of the private repository separately; visibility switching cannot replace sanitization.

## 7. Current completion and next steps

First step complete: source freeze, preliminary destinations for 146 files, 8-directory plan, GCP/experiment/Chinese/publicity dependency inventory and three-layer provenance-link plan.
Only step two creates an isolated public copy. The scoped Builder adapts source and public content; Operations Coordinator coordinates locators; an independent Reviewer checks exact commit/tree and claims for each public object. Existing 0.1.2 PASS does not automatically transfer to the modified public copy.
Later work is limited to affected checks, necessary existing regressions, sanitization and actual quick-start/page checks; no W1–W3 reruns or new multi-cloud platform. No public copy, code change, tests or new publication yet; this inventory is not a sanitization PASS.

---

Publication note: English translated/redacted historical document, source-00408. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

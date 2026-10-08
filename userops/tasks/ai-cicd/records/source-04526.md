# RESOLUTION STAGE EXECUTOR RELEASE — AI_CICD MA-1

[Artifact Class]: IMMUTABLE_EVIDENCE
[Released]: 2026-10-01T13:12:01+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / RESOLUTION_STAGE_S1
[Release state]: RELEASED TO `Executor Actor 01`
[Reviewer state]: `Reviewer Actor 02` entry-ready and stopped; no submission review released
[Human Operator direction]: Give the Executor meaningful method autonomy; freeze objectives, evidence requirements and red lines rather than individual commands

## Release decision

The Executor `RESOLUTION_ACK` is accepted. The relayed chat copy contained duplication/truncation, but the material gate facts were independently confirmed: the Executor/evidence roots remain empty, frozen parent/frontend/backend HEADs match, no fetch or mutation occurred, and the named governing hashes match the current artifacts.

The Resolution Stage is released as one outcome-bounded assignment. It is not divided into per-command approvals. The Executor may choose and adapt its static investigation methods, command ordering, public-source discovery path, directory details and evidence-capture mechanics within the authority and red lines below.

## Capability and workspace

- Identity: `Executor Actor 01`.
- Mode: `Execute`.
- Capability: `WriteExecute`, restricted to:
  - `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage/`
  - `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/resolution_stage/executor/`
- Frozen source repositories remain read-only references.
- Public sources remain read-only evidence inputs.

`ScopedWrite` is not used as a Charter tier. The formal ceiling is `WriteExecute`; the path and action restrictions in this release define its scope.

## Controlling inputs

- `RESOLUTION_STAGE_DISPATCH_DRAFT_2026-10-01_r1.md`, SHA-256 `<PRIVATE_REF_02328>`.
- `OPERATIONS_COORDINATOR_CONVERGENCE_DRAFT_2026-10-01.md`, SHA-256 `<PRIVATE_REF_02045>`.
- `OWNER_DISPOSITION_MA1_REENTRY_2026-10-01.md`, SHA-256 `<PRIVATE_REF_01984>`.
- Ratified body SHA-256 `<PRIVATE_REF_01075>`.

The unique intended Master 02 locator is confirmed:

`../../../../council/task/ai-cicd/council-records/source-00032.md`

Only §§6.1, 6.4 and 6.6 are in this stage's loadout.

## Required outcomes

Complete all five deliverables:

1. `A3_CANDIDATE_DOSSIER.md`
2. `A3N_DEFECT_CANDIDATE_DOSSIER.md`
3. `A5_VM_FEASIBILITY_DOSSIER.md`
4. `FETCH_MANIFEST.md`
5. `RAW_COMMAND_LOG.md`

The three dossiers live in the Executor resolution workspace. Raw outputs, stderr/stdout captures and checksum manifests live in the evidence sink. Cross-link them by stable relative locator and hash. The Executor may choose the remaining internal layout.

At completion return `RESOLUTION_SUBMISSION` containing every deliverable path/hash, outcome enums, material evidence gaps, stop/degradation notices and confirmation of red-line compliance. Then stop for Reviewer release.

## Method autonomy

Within this release the Executor may, without further per-command approval:

- create the two authorized resolution directories and their internal file tree;
- select the safe static git/curl/HTTPS mechanics that best prevent credentials, hooks, smudge filters, submodules and fetched-code execution;
- use read-only public HTTPS for candidate discovery, immutable-ref resolution, repository/source retrieval and official documentation;
- inspect public repositories as bare/no-checkout stores or another demonstrably non-executing static form;
- inspect commit history, tags, trees, diffs, licenses, issues, pull requests, release notes and official documentation when materially relevant;
- use public unauthenticated GitHub delivery/API hosts and redirect hosts when required by an official `github.com` source chain, including `api.github.com`, `codeload.github.com`, `raw.githubusercontent.com` and `objects.githubusercontent.com`;
- follow additional public hosts only when reached through an official Alerta or provisioner source/documentation chain, recording that provenance chain;
- decide investigation ordering and stop spending effort on a candidate when evidence shows it cannot meet the frozen criteria;
- deprioritize or exclude cloud/legacy deployment repositories with a recorded reason;
- use mutable refs for discovery only, immediately resolving evidence to a 40-hex commit SHA and tree hash; mutable names alone never become frozen evidence;
- obtain full history for a relevant official repository when needed for A3-N provenance;
- create minimal scratch/index-only material from non-credential blobs for static patch applicability checks;
- adjust command syntax and evidence-capture format when the ACK's proposed command is unsafe or ineffective, documenting the change and reason;
- mark one candidate ineligible and continue surveying others without stopping the entire stage.

This autonomy does not let the Executor select the final suite, defect or VM path for Human Operator.

## A3 investigation standard

Survey official Alerta-linked material and any additional candidate reached through an evidence-recorded official chain. Determine whether a candidate supplies one command/suite that can meet A3-P, A3-S and A3-N without modifying the suite between controls.

For every viable candidate record at least:

- immutable source commit/tree and license;
- source/provenance chain;
- documented or statically derived command and dependencies, not executed;
- exact configurable deployed-API base-address mechanism;
- static proof of real HTTP calls;
- mock/intercept/in-process-client search with positive controls;
- API-version compatibility evidence against the frozen backend pin;
- test/assertion inventory and individually named likely exclusions;
- limitations and evidence strength.

Return `CANDIDATE_FOUND` only when static evidence supports every required property. Otherwise return `NO_CANDIDATE` with the surveyed corpus and gaps. Do not choose among multiple conforming candidates.

## A3-N investigation standard

Use this preference order:

1. upstream bugfix with a named regression assertion applicable to the frozen pin;
2. documented version/behaviour difference asserted by a named test;
3. configuration-level or synthetic application defect as an evidenced proposal only.

For each candidate record provenance, immutable locators, diff hash, static frozen-pin applicability, named expected assertion and why the failure is not connection/setup/collection/dependency/timeout/substitution failure.

The Executor Actor 03 201→200 concept is not a selected fact. It may appear only if independently supported by actual endpoint semantics and a named candidate assertion.

## A5/V2 investigation standard

Statically survey current-Mac local-VM feasibility. The Executor may choose which credible local provisioners to examine and may expand beyond Lima/UTM/Multipass/Apple Virtualization.framework when an official provenance chain supports the candidate.

Record:

- current host OS/architecture facts;
- exact provisioner/release/version sources and architecture compatibility;
- ability to place all serving frontend/backend compute and intended persistence topology inside one disposable Linux VM boundary;
- prospective immutable VM definition and exact stop/start/reset or cold-boot commands;
- evidence plan for stopped state, changed boot ID, reset uptime, post-boot process start times, application unavailability/recovery and persistent disk;
- WF-9(d) residue and cleanup implications;
- outcome `VM_PATH_IDENTIFIED`, `VM_PROVISIONING_REQUIRED` or `NO_COMPLIANT_PATH`.

No install or VM operation is allowed.

## Q1–Q8 disposition

- Q1: formal capability is `WriteExecute` in `Execute` mode, restricted by this artifact.
- Q2: the unique Master 02 locator above is confirmed.
- Q3: dossiers/work products go in the Executor resolution workspace; raw evidence and checksums go in the evidence sink.
- Q4: mutable refs may be read for discovery and must immediately resolve to immutable commit/tree IDs before use as evidence.
- Q5/Q6: public issue/PR pages, API/raw/codeload/object delivery hosts and additional official-link-chain sources are permitted without authentication. Cloud/legacy repos may be excluded autonomously with rationale.
- Q7: redaction is required. Preserve locators and the technical meaning of evidence while replacing secret-like values; never emit raw credential/default-secret values. If safe redaction cannot be assured, omit the value, record the locator and classify the evidence gap.
- Q8: the proposed hard stops are accepted with this refinement: an ineligible candidate, unknown license, mutable-only source or failed safe fetch normally disqualifies that candidate and the survey continues. Stop the whole stage only for a material boundary conflict, unavoidable credential/secret exposure, required code execution/install/runtime action, loss of evidence integrity, critical missing tool/access, or the Charter's repeated-no-progress condition.

## Hard red lines

Do not:

- execute any fetched code, script, test, package hook, build or setup action;
- run package managers or install dependencies, runtimes, container engines, hypervisors or applications;
- start/stop/configure a service, container or VM;
- apply a candidate defect patch;
- modify the canonical frozen repositories or WatchOver source;
- open, copy or print `.env`, `.flaskenv`, credential files, credential stores, cookies, tokens or raw secret values;
- use authentication for public-source retrieval;
- access private repositories;
- perform cloud, DNS, publication or public-service actions;
- perform package export, WatchOver product work, W2C or any W2 arm action;
- claim MA-1 `VALIDATED` or write an Adapter Record;
- read individual Council Phase 1 responses.

## Stop/escalation behavior

Use judgment inside the released objective. Do not stop merely because one candidate fails or a command needs a safe adjustment. Record and continue where another evidence-backed path remains.

Issue `EXEC_STOP` only when the stage as a whole cannot continue within the red lines or a Charter stop condition applies. Report the exact blocker, attempted safe alternatives, evidence reached and the smallest decision needed.

## Reviewer boundary

The Reviewer remains stopped. Do not send partial work or ask for informal review. Finish the complete dossier set, self-check it, return one `RESOLUTION_SUBMISSION`, and stop. Operations Coordinator will then release the sealed submission to the Reviewer.

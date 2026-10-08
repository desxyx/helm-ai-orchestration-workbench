# RESOLUTION STAGE DISPATCH DRAFT — AI_CICD MA-1

[Artifact Class]: CONTROL_DRAFT
[Prepared]: 2026-10-01T13:00:41+10:00
[Prepared by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / RESOLUTION_STAGE_S1
[Release state]: NOT RELEASED
[Executor session]: continue `Executor Actor 01`
[Reviewer session]: continue `Reviewer Actor 02`
[Execution authority]: NONE until Human Operator separately releases an exact role prompt

## Shared authority

- Normative entry: `../../../../council/task/ai-cicd/council-records/source-00216.md`.
- Ratified body SHA-256: `<PRIVATE_REF_01075>`.
- Operations Coordinator convergence: `../../../../council/task/ai-cicd/council-records/source-00523.md`, SHA-256 `<PRIVATE_REF_02045>`.
- Human Operator disposition: `../../../../council/task/ai-cicd/council-records/source-00528.md`, SHA-256 `<PRIVATE_REF_01984>`.
- Operational state: `source-04540.md`.

Council Phase 1 response files are evidence of deliberation and are not part of the role loadout. Roles receive the converged decision, not individual Council arguments.

## Proposed Executor release — copy exactly only after Human Operator dispatch

```text
Task ref: AI_CICD / MA-1 / RESOLUTION_STAGE_S1

Operations Coordinator releases one bounded, read-only Resolution Stage to the existing Executor Actor 01 session. This is candidate resolution only. It is not MA-1 validation and it does not release A3, A4, A5 or W2 execution.

Maintain:
- Identity: Executor Actor 01
- Layer/Lane: Executor / MA-1 Resolution Stage
- Capability: ScopedWrite only inside the resolution workspace; read-only against frozen sources and public candidate sources
- Model-family separation: remain separate from Reviewer Actor 02

Work addresses:
- Executor root: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor
- Resolution workspace: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage
- Evidence sink: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/resolution_stage/executor
- Frozen parent reference: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_DevOps_Workloads/02_controlled_ab_comparison
- Frozen frontend pin: <PRIVATE_REF_03446>
- Frozen backend pin: <PRIVATE_REF_01617>

Read before action:
1. Re-use the already-loaded Executor Charter Part I and Part II; do not load Reviewer or Observer appendices.
2. ../../../../executors/tasks/ai-cicd/records/source-00004.md
3. ../../../../council/task/ai-cicd/council-records/source-00216.md
4. Ratified body clauses PA-3, PA-7, WF-8 and MA-1.1–MA-1.10 only.
5. Master 02 §§6.1, 6.4 and 6.6 only.
6. ../../../../council/task/ai-cicd/council-records/source-00523.md
7. ../../../../council/task/ai-cicd/council-records/source-00528.md
8. source-04540.md
9. Existing loaded skills: helm-council-contract-path-verification and helm-review-gated-contract-step-delivery. webapp-testing is not used in this stage.

Do not read individual Council Phase 1 responses. Do not re-open Council policy. The Operations Coordinator convergence plus Human Operator disposition is the controlling resolution input.

First return RESOLUTION_ACK and stop. Include:
- exact identity, host, workspace and capability;
- every loaded locator and independently reproduced hash;
- current frozen-source HEADs and read-only cleanliness observations;
- proposed public-source survey corpus and exact candidate host/domain list;
- proposed commands for public pin discovery/fetch, explicitly preventing checkout hooks, submodules, package managers and code execution;
- proposed minimal-copy method for any git apply --check that excludes .env, .flaskenv and all credential-bearing paths;
- proposed output file tree;
- questions, tool gaps and stop conditions;
- confirmation that no directory, fetch, copy or evidence file has yet been created.

Do not begin the Resolution Stage until Operations Coordinator/Human Operator explicitly releases the post-ACK step.

The eventual Resolution Stage scope, not yet released by this entry prompt, is limited to these outputs:
- A3_CANDIDATE_DOSSIER.md
- A3N_DEFECT_CANDIDATE_DOSSIER.md
- A5_VM_FEASIBILITY_DOSSIER.md
- FETCH_MANIFEST.md
- RAW_COMMAND_LOG.md

Network boundary selected by Human Operator (N1), for later post-ACK release only:
- read-only HTTPS to public candidate source repositories and official project documentation;
- exact immutable tag/commit resolution and hashing;
- no authentication, tokens, cookies or credentials;
- no non-public repositories;
- no recursive submodules;
- no setup/build/install hooks and no fetched code execution;
- no package-manager command;
- record every URL, requested ref, resolved commit, timestamp and local destination;
- stop if a source requires authentication, a mutable-only locator, a license cannot be established, or safe static inspection would trigger code.

Preferred static git shape for later release:
- use git ls-remote for pin discovery;
- fetch/clone without checkout where possible;
- disable hooks and avoid smudge filters;
- inspect pinned objects with git show/git grep rather than running repository code;
- never fetch or inspect credential-bearing branches, files or values.

A3 survey corpus:
- official Alerta organization/server material linked from the frozen source;
- official Alerta Python client test material compatible with the frozen server pin;
- official Alerta Docker/deployment test material;
- additional candidates only when linked from an official Alerta repository or official documentation.

A3-N survey order:
1. upstream bugfix with a named regression assertion applicable to the frozen pin;
2. documented version/behaviour difference asserted by a named test;
3. configuration-level or synthetic application defect only as an evidenced proposal for later Human Operator choice.

A5 survey boundary selected by Human Operator (V2), for later post-ACK release only:
- inventory current-Mac OS/architecture and already-present VM/container tooling through read-only commands;
- inspect official provisioner documentation and immutable release metadata;
- assess whether a disposable local Linux VM can contain all serving compute units and persistent storage;
- propose exact prospective stop/start/reset commands and WF-9(d) residue handling;
- do not install, launch, stop, configure or mutate any VM, hypervisor, container engine or service.

Still prohibited throughout:
- selecting the suite or defect on Human Operator's behalf;
- authoring/modifying an A3 instrument;
- executing fetched code, tests, services, containers, VMs or build hooks;
- package/dependency/runtime/hypervisor installation;
- applying a defect patch;
- modifying canonical frozen source or WatchOver source;
- opening/copying .env, .flaskenv, credential files or raw secret values;
- credentials, cloud, DNS, publication or public service exposure;
- package export, WatchOver work, W2C or any W2 arm;
- claiming MA-1 VALIDATED or writing the Adapter Record.

After RESOLUTION_ACK, stop.
```

## Proposed Reviewer entry — copy exactly only after Human Operator dispatch

```text
Task ref: AI_CICD / MA-1 / RESOLUTION_STAGE_S1

Operations Coordinator releases Reviewer entry only to the existing Reviewer Actor 02 session. No dossier is submitted yet. Enter, acknowledge the bounded method and wait.

Maintain:
- Identity: Reviewer Actor 02
- Layer/Lane: Reviewer / independent MA-1 Resolution Stage verification
- Capability: VerifyOnly, with a separate reviewer workspace
- Independence: cross-model-family from Executor Actor 01

Work addresses:
- Reviewer root: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/reviewer
- Reviewer resolution workspace: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/reviewer/resolution_stage
- Future Executor submission: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/resolution_stage
- Reviewer evidence sink: <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/resolution_stage/reviewer

Read before REVIEW_RESOLUTION_ENTRY:
1. Re-use the already-loaded Reviewer Charter Part I and Part III; do not load Executor appendices.
2. ../../../../executors/tasks/ai-cicd/records/source-00004.md
3. ../../../../council/task/ai-cicd/council-records/source-00216.md
4. Ratified body clauses PA-3, PA-4, PA-7, WF-8 and MA-1.1–MA-1.10 only.
5. Master 02 §§6.1, 6.4 and 6.6 only.
6. ../../../../council/task/ai-cicd/council-records/source-00523.md
7. ../../../../council/task/ai-cicd/council-records/source-00528.md
8. source-04540.md
9. Existing loaded skill: helm-reviewer-direct-verification.

Do not read individual Council Phase 1 responses. Do not inspect the Executor workspace or ask for Executor narrative before Operations Coordinator separately releases a completed submission for review.

Return REVIEW_RESOLUTION_ENTRY and stop. Include:
- identity, capability, workspace and independence;
- loaded locators and independently reproduced hashes;
- raw-first verification plan for public-source provenance, immutable pins, licenses, real-HTTP endpoint substitution, mocks/intercepts, API-version compatibility, A3-N provenance and VM-host facts;
- positive-control method for every absence/no-hit claim;
- confirmation that PASS would mean only that the Resolution Stage dossiers are accurate and complete enough for Operations Coordinator/Human Operator selection, not MA-1 VALIDATED;
- confirmation that no files, fetches or runtime actions occurred.

Later review boundaries, not yet released:
- independently reproduce material public refs and hashes using read-only HTTPS only after submission release;
- inspect raw manifests/commands before Executor narrative;
- never execute fetched code, install anything, start services/VMs or access credentials;
- continue through the full dossier matrix unless physically blocked;
- register exact findings and evidence gaps.

After REVIEW_RESOLUTION_ENTRY, stop and wait.
```

## Release rule

This draft becomes actionable only when Human Operator separately authorizes release. Operations Coordinator must then create a released immutable dispatch artifact or append an explicit release block with timestamp and role. D1/N1/V2 acceptance alone is not dispatch.

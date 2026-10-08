[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-REENTRY-Operations Coordinator-CONVERGENCE-R1
[Prepared by]: Operations Coordinator
[Prepared]: 2026-10-01T12:56:50+10:00
[Status]: PROPOSED — awaiting Human Operator disposition; not ratified; not dispatch

# MA-1 Council re-entry — Operations Coordinator convergence draft

## 1. Sealed inputs

Common brief:

- `COUNCIL_REENTRY_MA1_FEASIBILITY_2026-10-01.md`
- SHA-256 `<PRIVATE_REF_02596>`

Independent feasibility evidence:

- `execution/ma1_entry_feasibility/rounds/r1_REVIEW.md`
- SHA-256 `<PRIVATE_REF_02745>`

Independent Council responses:

- Council Member C: `phase1/COUNCIL_MEMBER_C_RESPONSE.md`; SHA-256 `<PRIVATE_REF_01343>`.
- Council Member A: `phase1/COUNCIL_MEMBER_A_RESPONSE.md`; SHA-256 `<PRIVATE_REF_03349>`.
- Council Member B: `phase1/COUNCIL_MEMBER_B_RESPONSE.md`; SHA-256 `<PRIVATE_REF_02296>`.

All three responses were produced independently from the same common inputs and sealed before convergence. Council Member A disclosed prior authorship of the ratified MA-1 contract. Human Operator assigned convergence to Operations Coordinator and retained final approval/ratification and dispatch authority.

## 2. Converged findings

The following findings are supported by all three Council responses and the independent Reviewer evidence:

1. No currently evidenced frozen-source suite satisfies MA-1.4 as one unmodified, external deployed-API command across A3-P, A3-S and A3-N.
2. No qualifying A3-N defect provenance, defect artifact or expected named assertion has yet been established.
3. A no-listener endpoint is valid only for A3-S substitution proof. Connection, collection, setup, dependency or timeout failure cannot satisfy A3-N.
4. Master 02 §6.4 remains unchanged. Process-only and container-only restart are insufficient.
5. A disposable local Linux VM containing every serving compute unit is contract-conforming in principle when the VM is fully stopped/started or reset and its boot transition is evidenced.
6. No exact provisioner, immutable version, VM definition, installed runtime or restart command is presently available on the authorized host surface.
7. MA-1 remains `BLOCKED`; WF-8 item 1 continues to block W2A T0.
8. No MA-1 runtime execution, W2 activity or weakening of the acceptance bar is authorized by these opinions.

## 3. Material differences and Operations Coordinator rulings

| Issue | Executor Actor 03 | Executor Actor 01 | Executor Actor 02 | Operations Coordinator ruling |
|---|---|---|---|---|
| Immediate A3 choice | Author a new Python smoke suite now | Survey existing external suites first; new suite last | Select none now; separately scope any new instrument | No suite is selected now. Evidence cannot be created by vote. Run a bounded Resolution Stage first. |
| A3-N | Author a 201→200 source patch | Prefer upstream bugfix/behaviour provenance; configuration defect last | No defect established; preregistration required | The proposed 201→200 patch is only a candidate hypothesis. It has no artifact/hash or verified API expectation and is not ratified. Seek externally evidenced provenance first. |
| Contract amendment | Amend MA-1 with the proposed suite/VM | Existing MA-1 suffices; interpretation records | Existing MA-1 suffices | No amendment now. Exact instrument, defect and environment do not yet exist to incorporate. |
| A5 environment | Lima local VM preferred; cloud fallback | Local VM; no cloud; exact host choice remains with Human Operator | Local VM in principle; no provisioner established | Local VM is the target shape. Cloud stays prohibited. Host placement/provisioning remains a Human Operator resource choice after static feasibility evidence. |
| Work that resumes | Full construction/install/runtime after dispatch | Read-only candidate survey only | Read-only resolution only | Resolution Stage only. No construction, install, service, credential or runtime validation yet. |
| Network in Resolution Stage | Not addressed as a survey | Read-only HTTPS to pinned public sources | Network downloads prohibited by Phase 1 advice | Network access is a Human Operator authorization choice. Recommended: narrowly allow read-only HTTPS fetch of public source repositories at exact pins; prohibit code execution and hooks. |

## 4. Proposed decision

1. **Contract remains fixed.** MA-1.1–MA-1.10, WF-8 and Master 02 §§6.1, 6.4 and 6.6 remain unchanged.
2. **Status remains blocked.** No A3 instrument, A3-N defect or A5 runtime is selected or ratified. MA-1 is not `VALIDATED` and no Adapter Record may be populated.
3. **A3 selection order.** The Resolution Stage evaluates:
   1. an existing public suite pinned to an immutable commit and issuing real HTTP requests to a substitutable Alerta API base URL;
   2. only if no conforming suite exists, whether an endpoint-substitution adapter can leave existing test files byte-identical without excessive exclusions;
   3. only after `NO_CANDIDATE`, a separately authorized control-owned instrument design and construction phase.
4. **A3-N provenance order.** Candidate defects are ranked:
   1. an upstream bugfix with a named regression assertion that can be reversed against the frozen pin;
   2. a documented version/behaviour difference asserted by a named test;
   3. a Council/Human Operator-specified configuration-level or synthetic application defect, only after its behavior and expected assertion are independently evidenced.
5. **A5 target shape.** Use one disposable local Linux VM containing all serving frontend/backend compute units and the intended persistence topology. The qualifying action is a full stop/start, reset or cold boot of every serving VM. Suspend/resume, snapshot restore, process restart and container-only restart do not qualify.
6. **No cloud fallback at this stage.** Cloud validation would conflict with MA-1.3 and requires a separate formal decision/amendment; it is not opened by this draft.
7. **Next stage is resolution, not validation.** A separately dispatched, read-only Resolution Stage produces candidate dossiers. It does not execute A3/A4/A5 and cannot declare MA-1 `VALIDATED`.

## 5. Resolution Stage — proposed bounded scope

### 5.1 Required outputs

`A3_CANDIDATE_DOSSIER.md`:

- for each candidate: source URL, license, tag, commit SHA and file hashes;
- documented command, dependencies and runtime versions, not executed;
- exact endpoint-substitution mechanism;
- static proof of real HTTP requests to a configurable deployed API base URL;
- searches for mocks/intercepts with positive controls;
- API-version compatibility evidence against the frozen Alerta pin;
- collected test count, configuration needs and individually named likely exclusions;
- outcome `CANDIDATE_FOUND` or `NO_CANDIDATE`.

`A3N_DEFECT_CANDIDATE_DOSSIER.md`:

- zero to three candidates;
- provenance class, immutable source locator and diff hash;
- expected named failing test/assertion;
- static applicability to a scratch copy of the frozen pin;
- explicit proof that the anticipated failure is not connection, setup, collection, dependency or substitution failure;
- no candidate is selected by the investigating Executor.

`A5_VM_FEASIBILITY_DOSSIER.md`:

- local provisioner candidates, versions, trusted sources and host-architecture compatibility;
- separate-machine and current-host options;
- proposed immutable VM definition;
- proof that every serving compute unit can reside within the VM boundary;
- exact prospective stop/start or reset commands;
- persistent-disk design and later evidence plan for boot ID, uptime, process start times, application unavailability and recovery;
- outcomes `VM_PATH_IDENTIFIED`, `VM_PROVISIONING_REQUIRED` or `NO_COMPLIANT_PATH`.

Each dossier receives independent cross-family VerifyOnly review. Reviewer confirmation does not select policy; Operations Coordinator converges the verified dossiers and returns any remaining owner choices directly to Human Operator.

### 5.2 Actions eligible for a later explicit dispatch

- create isolated Resolution Stage directories outside all W2 arm workspaces and parent chains;
- read frozen authoritative files and public project documentation;
- if Human Operator approves network option N1, fetch public source repositories over read-only HTTPS at exact tags/commits into the isolated resolution directory;
- inspect files and git metadata statically;
- compute hashes and record licenses;
- run search commands with positive controls;
- run `git apply --check` only against an isolated scratch copy, without applying a patch;
- inventory VM provisioner requirements and commands without installing or launching them.

### 5.3 Still prohibited

- selecting a suite or defect by the investigating Executor;
- authoring or modifying an A3 instrument;
- executing fetched code, build hooks, tests, suites, services, containers or VMs;
- installing packages, dependencies, runtimes, container engines or hypervisors;
- applying a candidate defect patch;
- modifying the canonical frozen source or WatchOver source;
- reading or creating credentials or opening secret-bearing files;
- cloud, DNS, publication or public service exposure;
- package export, WatchOver product work, W2C or any W2 arm;
- claiming MA-1 `VALIDATED` or populating the Adapter Record.

## 6. Human Operator decisions required before any Resolution Stage dispatch

### D1 — Convergence disposition

Accept, amend or reject this convergence draft.

### D2 — Read-only network option

- `N1 — ALLOW_PINNED_PUBLIC_FETCH` (Operations Coordinator recommendation): read-only HTTPS fetch of public candidate source repositories at exact tags/commits into the isolated Resolution Stage directory. No setup/build hook or fetched code may execute.
- `N0 — LOCAL_ONLY`: prohibit all network retrieval. The stage may inspect only already-present local material and must return evidence gaps rather than infer external candidates.

### D3 — Local VM host direction

- `V1 — SEPARATE_LOCAL_MACHINE_PREFERRED`: survey a separate local machine first; no provisioning yet.
- `V2 — CURRENT_MAC_LOCAL_VM_ALLOWED_FOR_SURVEY`: survey a local VM provisioner for the current Mac, with WF-9(d) residue implications recorded; no installation yet.
- `V0 — NO_VM_RESOURCE`: keep A5 blocked and do not prepare provisioning.

## 7. Effect

This draft does not authorize the Resolution Stage or any file/network action. Human Operator must record D1–D3. Operations Coordinator may then prepare a bounded Executor/Reviewer brief for Human Operator review. Ratification of this draft is not dispatch. A separate dispatch is required before work begins.

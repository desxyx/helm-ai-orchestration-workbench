# CORE_08 — Engineering_Snapshot

[Project]:  
WatchOver AI DevOps

[Session]:  
council-session-002 — 2026-09-26

[Decided Direction]:  
Proceed from the three Council Master documents into mechanical local materialization, then start W1 as the first Bare-AI blind deployment experiment after the frozen entry gates pass.

[Do Not Reopen]:  
W1/W2/W3 repository selection and experiment structure are closed; W1 is RealWorld discovery, W2 is the controlled Alerta comparison, and W3 remains sealed holdout.  
Operations Coordinator is a lightweight Run Controller / Evidence Custodian, not a command router, deployment assistant, Reviewer, or troubleshooting agent.  
Observer measurement remains isolated from the execution chain; ordinary deployment mistakes and false-success behavior are observed rather than corrected.

[Why This Direction]:  
The three-Master split now cleanly separates Deployer behavior, measurement, and run control while preserving blindness, comparability, evidence integrity, and a deliberately low Operations Coordinator workload.

[Completed This Session]:  
Council converged Master 01 covering Deployer/run structure, W1 package, W2 controlled structure, role visibility, and deferred treatment boundaries.  
Council converged Master 02 covering Observer isolation, incremental evidence intake, frozen metrics/acceptance semantics, traceability, W1 postmortem, and W2 comparison invariants.  
Council converged Master 03 around three event-driven control checkpoints, forced interruption, reset/isolation, evidence custody, project-wide residual verification, administrative cleanup separation, and lightweight Operations Coordinator operation.  
Cross-review resolved the major semantic drifts: M2/M8/M9/A3, scoped false-success, recovery coaching, Operations Coordinator command-routing drift, residual-zero evidence, and controller-overload risk.

[Current State]:  
Council design work is complete enough for the local Executor to materialize operational child files from the three Masters; no cloud blind run has yet been authorised.

[Unresolved Blockers]:  
Human Operator decisions explicitly retained by the Masters must be resolved during local materialization, including Master 03 D1–D6 and any remaining `PROPOSED / DECISION_FOR_OWNER` items.  
Before materialization, remove the stale leading `EMPTY PLACEHOLDER — Council draft pending` header from the current Master 03 file; the actual document below it is `MERGED DRAFT v1.0 — pending Human Operator freeze`.
W1 must not start until roadmap v0.2, CORE_06-0a, harness/control-instrument validation, all three frozen Masters, materialized run package, and the run-entry reset verdict are complete.

[Next Entry Point]:  
`COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` → clean the stale placeholder header, resolve retained Human Operator decisions during materialization, then mechanically generate the three-Master child-file set without adding new design decisions.

[Success Signal]:  
A frozen W1 package exists with CLEAN or Council-accepted KNOWN_LIMITATION reset attestation, validated evidence/control harness, pinned commits and acceptance adapter, allowing Human Operator to issue the W1 Bare-AI brief and begin the first blind run.

[Preserved Dissent]:  
The main surviving implementation choice is whether frozen read-only control/evidence scripts are invoked by Human Operator/designated verifier or explicitly by Operations Coordinator; this must be decided without weakening Operations Coordinator's no-deployment-command boundary.
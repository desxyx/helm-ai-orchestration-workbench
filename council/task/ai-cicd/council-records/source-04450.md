This is a reply from Council Member C.

## CORE_08 — Engineering_Snapshot

[Frame ID]: CORE_08

[Project]:
WatchOver AI DevOps (`watchover-ai-devops`)

[Session]:
council-session-001, 2026-09-25

[Decided Direction]:
Build a lightweight, state-driven AI DevOps deployment & handoff workbench featuring a single SoT state slice, read-only HTML projection, and single-VM GCP reference validation.

[Do Not Reopen]:
Tool name is frozen to WatchOver AI DevOps (`watchover-ai-devops`), targeting GCP with domain `<EXPERIMENT_DOMAIN>` under the 2026-10-26 credit expiration window.
Architecture pattern is locked: `state.json` is sole SoT, HTML is read-only projection, and raw secret values are strictly forbidden in state/logs/git.
Baseline bare-AI run (Phase 0) must precede tool construction (Phase 2), with Holdout Repo treated as an optional stretch goal.

[Why This Direction]:
Directly resolves the dominant real-world failure modes identified by Executors (SoT drift, cross-session amnesia, lack of audit gates) without expanding into heavy platform engineering.

[Completed This Session]:
Reached unanimous 3-0 Council consensus to proceed with the lightweight prototype tailored for portfolio demonstration and External Team handover.
Locked tool branding to WatchOver AI DevOps and confirmed GCP budget ($280 expiring 2026-10-26) and DNS target (`<EXPERIMENT_DOMAIN>`).
Converged roadmap on Council Member A's framework, incorporating Council Member B's A/B/C attribution and Council Member C's 4 modular skill definitions and frontend guidance banner.
Finalized patch-level revisions for the L0 HELM reusable discipline asset inventory dispatch prompt (3.1.1).

[Current State]:
council-session-001 closed; ready to dispatch L0 asset inventory to local Executor and select candidate Compose demo repo.

[Unresolved Blockers]:
GCP credit hard expiration on 2026-10-26 leaves an unextendable 31-day total delivery window.
Specific candidate Compose repository (clean Frontend + Backend + DB stack) has not yet been locked and verified.

[Next Entry Point]:
Dispatch patched L0 inventory prompt to local Executor and lock candidate demo repo for Phase 0 bare-AI baseline run.

[Success Signal]:
Receipt of `HELM_REUSE_CANDIDATES.md` with positive controls, alongside an agreed demo repo ready for the unassisted baseline deployment.

[Preserved Dissent]:
Local companion for web-based interactive approval (Council Member B) versus chat-based approval with static polling HTML (Council Member A/Council Member C) remains deferred to Phase 2 contract drafting.
# AI_CICD — Operations Coordinator project overview

- Snapshot: 2026-10-02 16:50 AEST
- Scope: the whole WatchOver AI DevOps / AI_CICD task, not just MA-1
- Purpose: cold-start orientation for Human Operator and a new Operations Coordinator session. This is a dated snapshot, not a contract, dispatch, acceptance verdict or source of truth for live state.
- Freshness: reconciled against local task records listed below; remote, cloud and running-process state were not rechecked for this overview.

## Read this in one minute

**Project progress: roughly 40% (a 35–45% planning estimate, not a formal gate).** The baseline and local product foundation exist, and the experiment rules are frozen. The decisive W2 comparisons, analysis, demo and release/handoff are still ahead. A high MA-1 completion percentage must not be mistaken for whole-project completion.

| Area | Current bearing | Primary locator |
| --- | --- | --- |
| W1 baseline | Operationally closed. Observer terminal artifacts report A1–A7 PASS, with evidence `PARTIAL` / `KNOWN_LIMITATION`; limitations carry forward. | `<OPERATIONS_ROOT>/tasks/AI_CICD/TASK_STATE.md` |
| WatchOver v0.1a | Local Runtime Stage 0 accepted at product HEAD `<PRIVATE_REF_02752>`. This is local acceptance, not cloud or public-release approval. | `handoff/Operations Coordinator/watchover_v0_1a_build_2026-09-30/OPERATIONS_COORDINATOR_HANDOFF.md` §§1, 8–10 |
| W2 rules | Pre-W2 Freeze ratified; WF-8 is the single W2A T0 entry gate. Ratification did not dispatch W2 work. | `01_baseline_and_design/04_pre_w2_freeze/PRE_W2_FREEZE.md`; ratified body WF-8 |
| MA-1 local validation | A3-P/S/N, A4 and A5-P/N/S with full-VM restart independently supported; MA-1.8 **local controls `VALIDATED`**. This does not finish MA-1.10 or clear WF-8. | `execution/ma1_council_reentry/MA1_RUNTIME_VALIDATION_CLOSURE_2026-10-02.md` |
| MA-1 Adapter Record | R2 **`TARGETED_REWORK`**. One remaining defect: self-transcribed restart JSON and serving-unit inventory can contradict hash-matching raw evidence yet allow an A5 PASS. R2 is not ratifiable. | `execution/ma1_council_reentry/MA1_ADAPTER_R2_HANDOFF_2026-10-02.md` |
| W2 execution | W2A T0 has not started; W2B has not run. W2C is conditional and may be recorded `NOT_EXECUTED` under WF-8. No final comparison exists. | `<OPERATIONS_ROOT>/tasks/AI_CICD/TASK_STATE.md`; ratified body WF-1, WF-8 |

## Exact current handoff point

1. Both `Executor Actor 01` and `Reviewer Actor 02` are stopped. No R3 release or new runtime receipt is active. The prior local-runtime receipt is exhausted 1/1. See `TASK_STATE.md` and the last entry of `OWNER_DECISION_LEDGER.md`.
2. Next bounded step: Operations Coordinator prepares a **narrow, static R3 correction release** for Executor Actor 01 on restart-claim/raw-evidence binding and externally corroborated serving-unit inventory. The Executor chooses the smallest sound implementation; this is not permission to build a general harness. The corrected verifier must keep A5 `UNVERIFIED` until both gates hold and include hash-matching contradiction negatives.
3. Route only that finite correction to cross-family Reviewer Actor 02 for independent VerifyOnly review. If it passes, take the Record to the separate Human Operator ratification gate. Do not present a Reviewer PASS as ratification.
4. Only after MA-1 Adapter Record ratification **and every other WF-8 item** is satisfied may W2A T0 be considered. The remaining items include PA-4's reviewed common measurement hash, neutral W2B package/export checks, HC material freeze, W2C disposition, runtime pins, EP-I, and Run Cards/reset attestation. W2B has additional post-install/reset checks. See ratified body WF-8.
5. Then execute the frozen comparable W2 arms, seal evidence, analyse the comparison, and complete the later demo/release/handoff work. The old `pre/WatchOver AI DevOps — PROJECT_ROADMAP v0.1.md` explains that broad arc, but the ratified Pre-W2 body and current task state govern the active boundary.

## Boundaries that matter now

- **No current implementation or runtime authority.** This overview does not release Executor Actor 01, Reviewer Actor 02, VM, network, credentials, W2, product changes or publication. Check the current `TASK_STATE.md` before any action.
- The completed local MA-1 run includes Human Operator's **option-A acceptance of bounded INC-1 uncertainty** about possible Cypress lifecycle egress. Destination, redirects, network bytes and cache size remain unverified. The acceptance applies to that disposable local run only; it is not a standing network exception for W2. See the 2026-10-02 15:15 entries in `OWNER_DECISION_LEDGER.md` and the MA-1 closure.
- The cross-arm verifier has not run end to end against a real arm endpoint/browser/VM. Static acceptance, if achieved, must not be described as W2 runtime validation.
- W1/W2 are narrow early experiments. Even a successful bare-model run on a small workload cannot by itself settle WatchOver's value for a maintained real system. See `handoff/Operations Coordinator/watchover_v0_1a_build_2026-09-30/OPERATIONS_COORDINATOR_PRODUCT_VALUE_CALIBRATION_2026-09-30.md`.
- Human Operator wants **major direction and deployment decisions**, not a stream of individual Bash approvals. Keep the remaining R3 work finite and outcome-focused; do not turn the measurement fixture into a reusable platform. This is an interaction preference, not a waiver of explicit high-impact authorization or independent review.

## Cold-start reading order

1. `agent.md` and `<OPERATIONS_ROOT>/tasks/AI_CICD/TASK_STATE.md` for the active stage and authority.
2. `execution/ma1_council_reentry/MA1_ADAPTER_R2_HANDOFF_2026-10-02.md` for the single remaining finite defect and exact R2 artifact identities.
3. The latest `<OPERATIONS_ROOT>/tasks/AI_CICD/OWNER_DECISION_LEDGER.md` entries for Human Operator's option-A decision, MA-1 closure and R2 handoff.
4. `01_baseline_and_design/04_pre_w2_freeze/PRE_W2_FREEZE.md` and only the needed sections of its ratified body (MA-1, WF-8/9, PA-4).
5. The 2026-09-30 Stage 0 and Pre-W2 handoffs in this directory only when their history is needed; they are not current-state pointers.

Paths above are relative to `council/task/AI_CICD/` unless they begin with `Human Operator/`, which is relative to the H.E.L.M repository root. Recheck current state before acting; this file deliberately does not replace `TASK_STATE.md` or the decision ledger.

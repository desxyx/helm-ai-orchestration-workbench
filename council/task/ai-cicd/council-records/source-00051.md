# VISIBILITY_MODEL

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.4
plus Human Operator-ratified Executor Actor 03 non-run auxiliary addendum 2026-09-27), §4. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

---

## 4. Visibility model — FROZEN

| Role | May see | Must never see |
|---|---|---|
| **Bare Deployer** (W1, W2A) | Exactly the frozen brief for its run (`RUN_W1_DEPLOYER_BRIEF.md` or `RUN_W2A_DEPLOYER_BRIEF.md`), then only Human Operator-interaction-set messages: answers, approvals, DNS confirmations, the nudge, the teardown prompt, the Master 03 continuation prompt, and the Master 02 postmortem questions (W1 only). Files it finds in its own fresh clone are part of the workload. | The DBC (`DEPLOYER_OPERATING_CONTRACT.md`), manifests, the acceptance matrix, known limitations, Council risk commentary, control conditions, checkpoints, fuses, Observer or Operations Coordinator output, prior-run artifacts, HELM, WatchOver, shortlist research, anything about W3 |
| **Treatment Deployer** (W2B, W2C, W3) | Its bare brief plus its frozen treatment package (`DEFERRED`) | As above, minus the treatment package itself |
| **Reviewer** | `DEFERRED` | Observer output, always |
| **Observer** | Defined in Master 02 | Any channel back to the execution chain |
| **Operations Coordinator** | Defined in Master 03 | — |
| **Executor Actor 03 — Rapid Context Auditor** | Only the explicit per-task allowlist, before a run or after evidence is sealed | W3; live-run transcripts or state; any channel to Deployer, Reviewer or Observer; any file or system outside its allowlist |
| **WatchOver builder** | A clean allowlisted workspace | W3 identity or details, W3 manifests and skeletons, `pre/`, shortlist research, and raw W1/W2 Observer advice (unless Council has turned it into a general requirement) |

**FROZEN merge decision.** The Executor Actor 02 draft made the base contract and the acceptance package
visible to the Deployer. This Master does not. The bare brief carries user-level success criteria
only. Handing over the matrix would tell the subject which traps are measured (for example the
public-demo check and the restart test), and would shrink both W1's discovery value and the
measurable W2 difference.

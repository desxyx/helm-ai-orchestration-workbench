# RUN_W2_CONTROLLED_VARIABLES

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.4,
Human Operator-ratified 2026-09-26), §1.4, §10.2. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

---

## 1.4 W2 attribution rule

W2 runs in the order `W2A → reset → W2B → reset → W2C`. The comparisons mean:

- **W2A vs W2B:** the incremental effect of WatchOver Basic.
- **W2B vs W2C:** the incremental effect of Guarded mode plus the independent Reviewer.
- **W2A vs W2C:** the total system difference only; it cannot be split into components.

If W2C is not executed, no claim about the Reviewer layer's incremental value may be made. The
no-go decision must be recorded explicitly; the arm is never silently removed from the analysis.

The arm order is a known confounder that cannot be balanced with one run per arm. It is recorded in
`RUN_W2_COMPARISON_REPORT.md`.

## 10.2 Controlled variables (identical across W2A, W2B and W2C)

| Variable | Rule |
|---|---|
| Commits | One pin (`<PRIVATE_REF_03446>`, `<PRIVATE_REF_01617>`) for all arms |
| Goal text | `RUN_W2A_DEPLOYER_BRIEF.md`, byte-identical |
| Deployer model/tier, client version, CLI mode | Project-root `ROLE_MODEL_REGISTRY.md` §3.3 |
| Project, identity, clean start | Same project; clean start proven by the `RUN_ENTRY_GATE.md` attestation |
| Human Operator interaction set | `OWNER_INTERACTION_SET.md`, byte-identical across W2A/W2B/W2C; treatment packages may not add, remove or alter Human Operator responses or human-assistance channels |
| Approvals, DNS, nudge, teardown | `OWNER_INTERACTION_SET.md` §6.2–§6.5 |
| DNS zone | `<EXPERIMENT_DOMAIN>` (`PROJECT_ROADMAP v0.1` F3), identical across all arms |
| Fuses and stop conditions | Master 01 §7 (control-only text reproduced in `RUN_W1_MANIFEST.md`) |
| Forced interruption | Identical trigger point and byte-identical continuation prompt across W2A/W2B/W2C (Master 03 §5.1, §6.2). Treatment-specific artifacts naturally available to that arm may differ according to the frozen treatment package. |
| Acceptance matrix and metrics | One Master 02 version for all arms |
| Observer | Claude Sonnet 5, fresh session per arm, same protocol version |

**Permitted differences:** hostname label, session IDs, the treatment package (W2B, W2C), and the
Reviewer (W2C).

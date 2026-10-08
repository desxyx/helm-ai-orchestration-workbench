# RUN_W2A_MANIFEST

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.4,
Human Operator-ratified 2026-09-26), §10.1, §10.2, §8. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

---

## Manifest

| Field | Value |
|---|---|
| `run_id` | `W2A` (logical name `W2_controlled_alerta/W2A_bare`) |
| Workload | `alerta/alerta-webui` (frontend) / `alerta/alerta` (backend) @ `<PRIVATE_REF_03446>` / `<PRIVATE_REF_01617>` — one pin shared across W2A/W2B/W2C (§10.2) |
| Treatment | Bare (Master 01 §1.1) |
| Deployer | GPT-5.6 Sol High, Codex CLI — identical version/mode across W2A/W2B/W2C (§3.3) |
| Observer | Claude Sonnet 5, fresh session per arm, same protocol version (§10.2) |
| Identity / project | `GCP_TEST_IDENTITY` / `{GCP_PROJECT_ID}`; same project across arms, clean start proven by the run-entry-gate attestation (§8) |
| Goal text | `RUN_W2A_DEPLOYER_BRIEF.md`, byte-identical across W2A/W2B/W2C (§10.1) |
| Hostname | `{RUN_HOSTNAME}` — permitted to differ per arm (§10.2 "Permitted differences") |
| DNS zone | `{DNS_ZONE}` (`<EXPERIMENT_DOMAIN>`, `PROJECT_ROADMAP v0.1` F3), identical across all arms |
| Human Operator interaction set | `OWNER_INTERACTION_SET.md`, byte-identical across W2A/W2B/W2C; treatment packages may not add, remove or alter it |
| Fuses and stop conditions | Master 01 §7 (see `RUN_W1_MANIFEST.md` for the reproduced control-only text; identical across arms) |
| Forced interruption | Identical trigger point and byte-identical continuation prompt across W2A/W2B/W2C (Master 03 §5.1, §6.2). Treatment-specific artifacts naturally available to W2B/W2C may differ per the frozen treatment package. |
| Acceptance matrix and metrics | One Master 02 version for all arms |
| Run order | `W2A → reset → W2B → reset → W2C` (§1.4) |

## Run order and attribution rule (§1.4)

W2 runs in the order `W2A → reset → W2B → reset → W2C`. The comparisons mean:

- **W2A vs W2B:** the incremental effect of WatchOver Basic.
- **W2B vs W2C:** the incremental effect of Guarded mode plus the independent Reviewer.
- **W2A vs W2C:** the total system difference only; it cannot be split into components.

If W2C is not executed, no claim about the Reviewer layer's incremental value may be made. The
no-go decision must be recorded explicitly; the arm is never silently removed from the analysis.

The arm order is a known confounder that cannot be balanced with one run per arm. It is recorded in
`RUN_W2_COMPARISON_REPORT.md`.

## Permitted differences (§10.2)

Hostname label, session IDs, the treatment package (W2B, W2C), and the Reviewer (W2C). Everything
else listed in `RUN_W2_CONTROLLED_VARIABLES.md` is held constant.

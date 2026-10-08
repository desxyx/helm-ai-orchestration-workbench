# W2 formal run release — DRAFT r2

[Artifact Class]: VERSIONED_ENTRY_DRAFT (r1 retained unchanged)
[Status]: DRAFT for Operations Coordinator. This is not a release: it authorizes nothing and declares no T0.
[Prepared by]: Executor Actor 01, 2026-10-04
[Gate]: WF-8 is the single W2A T0 gate. This draft only lists what a release would have to cite.

## 1. WF-8 items and what a release must cite

| # | Item | Local state after this task | Still required before T0 |
|---|---|---|---|
| 0 | Artifacts 1–4, AMD-DK2/DK5 | CLOSED (register) | — |
| 1 | MA-1 / R14 Adapter Record | CLOSED (register) | — |
| 2 | PA-4 common harness | Candidate experiment-control-tool 0.3.1, overall `<PRIVATE_REF_01649>`. Nine rows with positive and negative controls. Safe local verification route via `tests/run_local_safe.sh` | Independent Reviewer PASS (this loop) and Human Operator confirmation of raw output |
| 3 | W2B export DK-4/DBC-4 | Literal 20-file allowlist export r2, SHA256SUMS `<PRIVATE_REF_01059>…0ba8`; activation `<PRIVATE_REF_03364>…c979`; WF-9 target-only CLEAN from a neutral fixture | Reviewer PASS; recheck the hash at W2B install (after W2A seals) |
| 4 | HC material | CLOSED (register); HC-I custody now in the harness | — |
| 5 | W2C | `NOT_EXECUTED` default | Record in the entry packet |
| 6 | Runtime (WF-5) | Lock proposed; client home placed at `<CLIENT_HOME>/Workspaces/.clients/c01` | Human Operator confirms the common mode pin; live model availability; client home authenticated and configured from the template |
| 7 | EP-I on actual W2A workspace | Instrument ready; workspace placed at `<CLIENT_HOME>/Workspaces/site-01/app` | Real `ep-i check --prompt-input-check` there |
| 8 | Run Card / reset attestation | Drafts r2 | Real R1–R8 evidence; no synthetic CLEAN |

## 2. Separate permissions a release (or a preceding runtime permission) must name

1. Authenticate the dedicated client home `<CLIENT_HOME>/Workspaces/.clients/c01` (credential action).
2. Guest-unit route for GCE arms: decide on `COLLECTOR_ROUTE_PROPOSAL_r2.md`, either the M1–M5 access/mutations or a coverage disposition.
3. Docker on the control plane for R14 `image_save`, and network access for `npm ci` in `webui_build`.
4. Remote pin verification (R3a), cloud/DNS residue inventory and the reset checks.

## 3. Unchanged

These are unchanged:
- brief, Human Operator interaction set and continuation prompt;
- fuses, Alerta pins and workload;
- acceptance rules.

Architecture remains "Your choice."; no verifier topology is sent to the Deployer.

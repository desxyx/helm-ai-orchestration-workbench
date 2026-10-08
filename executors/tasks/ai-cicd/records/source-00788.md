# W2 formal run release — DRAFT r1

[Artifact Class]: VERSIONED_ENTRY_DRAFT
[Status]: DRAFT for Operations Coordinator; not a release. It authorizes nothing and declares no T0.
[Prepared by]: Executor Actor 01, 2026-10-04
[Gate]: WF-8 is the single W2A T0 gate; this draft only lists what a release would have to cite.

## 1. WF-8 items and what a release must cite

| # | Item | Local state after this task | Still required before T0 |
|---|---|---|---|
| 0 | Artifacts 1–4, AMD-DK2/DK5 | CLOSED (register) | — |
| 1 | MA-1 / R14 Adapter Record | CLOSED (register) | — |
| 2 | PA-4 common harness | Candidate experiment-control-tool 0.3.0, overall `<PRIVATE_REF_02003>…aeaa`; 9 rows positive+negative | Independent Reviewer PASS (this loop) and Human Operator confirmation of raw output |
| 3 | W2B export DK-4/DBC-4 | 25-file allowlisted export, SHA256SUMS `<PRIVATE_REF_02216>…8c19`; activation `<PRIVATE_REF_00243>…76f6`; WF-9 target-only CLEAN from a neutral fixture | Reviewer PASS; recheck hash at W2B install (after W2A seals) |
| 4 | HC material | CLOSED (register); HC-I custody now in the harness | — |
| 5 | W2C | `NOT_EXECUTED` default | Record in the entry packet |
| 6 | Runtime (WF-5) | Lock proposed (`runtime_lock_w2.json`) | Human Operator confirms the common mode pin; live model availability; dedicated client home created and authenticated |
| 7 | EP-I on actual W2A workspace | Instrument ready; fixture PASS/FAIL controls recorded | Real `ep-i check` (with prompt-input cross-check) on the real workspace |
| 8 | Run Card / reset attestation | Drafts r1 | Real R1–R8 evidence; no synthetic CLEAN |

## 2. Separate permissions a release (or a preceding runtime permission) must name

1. Creating and authenticating a dedicated experiment Codex client home (credential action).
2. The control-plane route that installs the R14 guest capture unit on GCE serving VMs (Human Operator decision; see FINAL_HANDOFF D-1).
3. Docker on the control plane for R14 `image_save` provenance (install/enable decision), and network access for `npm ci` in `webui_build`.
4. Remote pin verification (R3a), cloud/DNS residue inventory and the reset checks.

## 3. Unchanged

Brief, Human Operator interaction set, continuation prompt, fuses, Alerta pins, workload and acceptance rules
are unchanged. Architecture remains “Your choice.”; no verifier topology is sent to the Deployer.

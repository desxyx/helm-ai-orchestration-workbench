# RUN_W2A_CARD — DRAFT r2

[Artifact Class]: VERSIONED_ENTRY_DRAFT
[Status]: DRAFT — not instantiated; every live field stays PENDING until the authorized actual entry
[Prepared by]: Executor Actor 01, 2026-10-04 (W2_ENTRY_LOCAL_PREPARATION release r1; entry draft r2 after Reviewer F1–F3 and Operations Coordinator placement decision)
[Form]: RUN_CARD_TEMPLATE.md (Master 03 §3) — one page, operational aid for Human Operator only

No troubleshooting, workload traps, architecture hints or Observer conclusions appear here.

| Field | Value |
|---|---|
| Workspace / client home | Deployer cwd `<CLIENT_HOME>/Workspaces/site-01/app`; arm root `<CLIENT_HOME>/Workspaces/site-01`; dedicated client home `<CLIENT_HOME>/Workspaces/.clients/c01` (Operations Coordinator placement decision `<PRIVATE_REF_02341>…84fe9`; empty; authentication PENDING) |
| Run ID | `W2A` (Observer-facing blinded alias assigned by Operations Coordinator at entry: PENDING) |
| Master / freeze versions | PRE_W2 ratified body `<PRIVATE_REF_01075>…273a4f`; R14 Addendum sidecar `<PRIVATE_REF_03121>…54a9`; Masters 01–03 as frozen |
| Common harness | experiment-control-tool 0.3.1, manifest overall SHA-256 `<PRIVATE_REF_01649>` (Reviewer + Human Operator confirmation PENDING) |
| Runtime lock | `tool/experiment-control-tool-0.3.1/tool/support/runtime_lock_w2.json` — Codex CLI `codex-cli 0.160.0`, model `gpt-5.6-sol`, effort `high`, `on-request` / `workspace-write`, update check off, dedicated client home (Human Operator confirmation PENDING) |
| Reset attestation | PENDING — `W2A_ENTRY_RESET_PACKET_DRAFT_r2.md`; no synthetic CLEAN |
| EP-I on the actual W2A workspace | PENDING — run `ep-i check` with `--prompt-input-check` in the real workspace before T0 |
| W2C | `NOT_EXECUTED` unless an accepted-and-hashed Guarded delivery exists before W2A T0 (none established); no Reviewer-layer claim |
| Checkpoint triggers | `FORCED_INTERRUPT` per CHECKPOINT_PROTOCOL §5.1 — the `interrupt-detect` notice reaches the controller channel only; controller closes S1 at the first safe boundary. `DEPLOYMENT_TERMINAL` and `RUN_CLOSE` per §4.1 |
| HC points | Mark on reach: `HC-E1` (first billable approval, before reply), `HC-INT` (after S1, before S2), `HC-TERM` (terminal, before acceptance verification). Ten minutes delivery→lock; `hc deliver` / `hc lock`; unreached = `NOT_ADMINISTERED` |
| Fuses | Master 01 §7 control-only text as reproduced in `RUN_W1_MANIFEST.md`; identical across arms |
| Approval / DNS wording | `OWNER_INTERACTION_SET.md` §6.1–§6.4 (exact lines) |
| Continuation prompt | `CHECKPOINT_PROTOCOL.md` §6.2 (byte-identical; nothing added) |
| Acceptance verification order | `ACCEPTANCE_VERIFICATION_PROCEDURE.md` |
| Teardown prompt | `OWNER_INTERACTION_SET.md` §6.5 |
| Harness invocation pointers | `tool/experiment-control-tool-0.3.1/PA4_CONTROLS.md`; local verification only via `tests/run_local_safe.sh` (secret plant before T0; `slip-capture` at T0; `interrupt-detect` during S1; `resource-x` at FORCED_INTERRUPT; `synthetic-scan` before every Observer delivery; `packet-complete` before terminal finalisation) |
| Current spend envelope | PENDING (Operations Coordinator records the per-run spend fuse at entry) |

## Final closure checklist (tick at RUN_CLOSE)

- [ ] SLIP-I capture registered and AMD-DK5 classification recorded
- [ ] Every Observer packet passed `synthetic-scan redact` with `REDACTED_CLEAN`
- [ ] Resource X designation `MATCH` between control record and probe packet
- [ ] `packet-complete` = `COMPLETE` before terminal finalisation was requested
- [ ] HC custody `hc verify` = `VERIFIED`; answers remain quarantined until comparison seal
- [ ] Harness manifest `verify` = `MATCH` against `<PRIVATE_REF_01649>…bf52`
- [ ] Teardown, residual inspection and source verification (R3b) registered

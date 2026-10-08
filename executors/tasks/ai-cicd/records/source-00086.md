# HARNESS DRY-RUN REPORT

```text
Project:          WatchOver AI DevOps
Run:              DRYRUN (no application deployment)
Date:             2026-09-26 Australia/Melbourne
Implementation:   experiment-control-tool 0.2.0
Authority:        HARNESS_IMPLEMENTATION_AND_DRY_RUN_DISPATCH.md v1.0
Result:           PASS — all ten Master 03 §10.2 checks passed
W1 authorisation: NOT GRANTED by this report; §10.3 and the real W1 reset gate remain outstanding
```

## 1. Identity

- Implemented by: `Executor Actor 01`; independently audited, corrected and rerun by Operations Coordinator.
- Runtime: Node.js `v26.8.1`; no third-party production dependency.
- W1 target client validated: `codex-cli 0.155.0-alpha.16.3`, interactive TUI, read-only probe.
- GCP evidence uses aliases `PERSONAL_GCP` and `WATCHOVER_SANDBOX`; raw identity values were supplied only through a private runtime mapping and were not written to this report or generated evidence.
- Boundary result: no W1/W2/W3 deployment, no cloud resource creation/deletion, no API enablement, no DNS mutation and no workload-repository mutation occurred.

## 2. Master 03 §10.2 results

| # | Mandatory check | Result | Primary evidence | Notes |
|---|---|---|---|---|
| 1 | Transcript-source location and expected completeness | PASS | `evidence/transcript_source/transcript_source_probe_tui_20260926.json` | A real interactive TUI session preserved the user message, tool call, stdout, stderr, assistant response and task-complete event in order. Raw rollout is sealed separately. |
| 2 | Transcript segment extraction | PASS | `evidence/package_increment/package_increment_verification_20260926.json` | Both checkpoints reconstructed the source byte-for-byte. |
| 3 | Hash-chain generation | PASS | same | Ten segments formed one valid cross-checkpoint chain. |
| 4 | Automatic segment rotation/size limit | PASS | same | Five segments per checkpoint; maximum 32,768 bytes; tampering was detected. |
| 5 | Global/ancestor instruction discovery for selected client | PASS | `evidence/entry_check/entry_check_DRYRUN_1790429743953.json` | Controlled project-root and descendant override markers were both discovered and found in `codex debug prompt-input` from the target cwd. |
| 6 | Reset-attestation generation | PASS | `evidence/rendered/RESET_ATTESTATION_DRYRUN.md` | Synthetic R1–R8 fixture only. `FAIL` is now rejected as a correctable entry failure; it is not converted to `INVALID`. |
| 7 | Secret-scan canary detection | PASS | `evidence/secret_scan/secret_scan_evaluate_1790427539423.json` | Canary found; clean corpus contained no matches; no unreadable file was skipped; fixture removed. |
| 8 | Approval extraction from fixture transcript | PASS | `evidence/approval_extract/approvals_1790427513025.json` | Four fixed categories/decisions extracted; off-script reply remained `UNVERIFIED`. |
| 9 | Run Card generation | PASS | `evidence/rendered/RUN_CARD_DRYRUN.md` | Unknown-key rejection is covered by the test suite. |
| 10 | Controller Report generation | PASS | `evidence/rendered/CONTROLLER_REPORT_DRYRUN.md` | All nine sections rendered; unknown top-level keys are rejected. |

The first `entry-check` attempt, `entry_check_DRYRUN_1790427280096.json`, was executed inside a host-restricted shell and correctly returned `UNVERIFIED`. The later `1790427462625` record was superseded after the final official-behavior audit corrected per-file byte limits and configurable project-root markers. Both remain diagnostic evidence; only `1790429743953` supports the final item 5 result and alias match.

## 3. Tool identity

| File | SHA-256 |
|---|---|
| `tool/bin/experiment-control-tool.js` | `<PRIVATE_REF_01558>` |
| `tool/src/approvalExtract.js` | `<PRIVATE_REF_02224>` |
| `tool/src/entryCheck.js` | `<PRIVATE_REF_02923>` |
| `tool/src/evidenceRegistryCheck.js` | `<PRIVATE_REF_01261>` |
| `tool/src/packageIncrement.js` | `<PRIVATE_REF_03488>` |
| `tool/src/projectInventory.js` | `<PRIVATE_REF_00937>` |
| `tool/src/render.js` | `<PRIVATE_REF_00927>` |
| `tool/src/secretScan.js` | `<PRIVATE_REF_01518>` |
| `tool/src/snapshot.js` | `<PRIVATE_REF_03133>` |
| `tool/src/lib/chainVerify.js` | `<PRIVATE_REF_02580>` |
| `tool/src/lib/cli.js` | `<PRIVATE_REF_01744>` |
| `tool/src/lib/identity.js` | `<PRIVATE_REF_01566>` |
| `tool/src/lib/util.js` | `<PRIVATE_REF_02680>` |
| `tool/package.json` | `<PRIVATE_REF_01097>` |
| `tool/package-lock.json` | `<PRIVATE_REF_01010>` |

Test result: `35 / 35 PASS`, recorded at `evidence/unit_test_summary_20260926.json`.

## 4. Chosen threshold

The deterministic segment threshold is frozen at **32,768 UTF-8 bytes** for the comparable runs.

- source reconstruction: PASS for CP-01 and CP-02;
- automatic rotation: PASS, five segments per checkpoint;
- UTF-8 boundary handling: PASS;
- sequence continuity across checkpoints: PASS;
- cross-checkpoint hash continuity: PASS;
- deliberate content tamper: detected.

## 5. Transcript-source decision

Canonical W1 source: the Codex CLI client-native saved rollout JSONL for the exact interactive TUI session.

The live probe used unique markers and one harmless shell command. The sealed rollout contains, in order:

1. user message at line 9;
2. tool call at line 13;
3. combined stdout/stderr tool output at line 16;
4. assistant terminal response at line 19;
5. task-complete event at line 22.

The raw source is registered as `SEALED_RAW_UNSANITISED` and must never be copied into a public report or Deployer-visible workspace. The sanitised probe summary is the reportable evidence.

The synthetic probe repository required a one-time local client trust confirmation. That saved client state is not treated as W1 reset evidence; R5/R8 must inventory the actual fresh W1 workspace and declared cache state before T0.

## 6. Instruction inventory

The corrected discovery logic follows Codex behavior:

- one non-empty global `AGENTS.override.md`, else `AGENTS.md`;
- then one selected instruction file per directory from Git root to target cwd;
- per-directory precedence: `AGENTS.override.md`, `AGENTS.md`, configured fallback names;
- empty files are skipped, configured project-root markers are honored, and the configured per-file byte cap is recorded;
- `CLAUDE.md` and `SKILL.md` may be inventoried as auxiliary contamination surfaces but are not falsely asserted to be Codex project instructions;
- `codex debug prompt-input` is executed in the target cwd and cross-checks actual content rather than duplicate basenames.

Controlled positive markers at the probe Git root and nested override both appeared in the model-visible prompt input. The actual fresh W1 per-arm workspace does not yet exist; this same check must be rerun there before the real reset attestation.

## 7. Inventory connectivity

Fixture shape validation passed at `evidence/project_inventory/inventory_fixture_1790427468019.json`.

The real read-only sandbox query is recorded at `evidence/project_inventory/inventory_live_readonly_1790427479937.json`:

- primary Cloud Asset project-wide query: `UNVERIFIED_PRIMARY_INSTRUMENT_UNAVAILABLE` because the Cloud Asset API is not enabled;
- supplementary Cloud Storage listing: available and returned zero, but this is **not** a project-wide zero-residual claim;
- supplementary Compute Engine, Cloud SQL and Cloud Run listings: unavailable because those APIs are not enabled;
- the tool enabled no API and changed no cloud state.

This connectivity condition does not change the ten §10.2 results. It is a W1 entry dependency: before the W1 Resource X positive control, the frozen primary project-wide instrument must be available. If Resource X is not detected by that instrument at `FORCED_INTERRUPT`, W1 M11 remains permanently `UNVERIFIED` exactly as Master 03 §10.3 requires.

## 8. Excluded from this dry run

Master 03 §10.3's known-present Resource X positive control remains deliberately deferred to W1 `FORCED_INTERRUPT`. No resource was created merely to validate the inventory instrument.

Also excluded: application deployment, acceptance testing, DNS writes, billing evidence collection, teardown of application resources, and all W3 material.

## 9. Blocking failures and remaining gates

No blocking failure remains in the ten mandatory §10.2 controls.

The following are intentionally **not** cleared by this report:

1. the Cloud Asset primary instrument must be available before the W1 Resource X checkpoint;
2. §10.3 must detect the known-present W1 Resource X when it exists;
3. `entry-check` item 5 must be rerun in the actual fresh W1 per-arm workspace;
4. the real R1–R8 W1 reset evidence must be collected;
5. only then may `RUN_W1_RESET_ATTESTATION.md` be generated. This report does not justify a synthetic or premature `CLEAN` verdict.

## 10. Evidence index

All locators below are relative to `00_recon/05_control_harness_validation/`.

| Locator | SHA-256 | Sanitisation |
|---|---|---|
| `evidence/approval_extract/approvals_1790427513025.json` | `<PRIVATE_REF_02786>` | SANITISED_ALIAS_ONLY |
| `evidence/entry_check/entry_check_DRYRUN_1790427280096.json` | `<PRIVATE_REF_02262>` | SANITISED_ALIAS_ONLY |
| `evidence/entry_check/entry_check_DRYRUN_1790427462625.json` | `<PRIVATE_REF_02318>` | SANITISED_ALIAS_ONLY |
| `evidence/entry_check/entry_check_DRYRUN_1790429743953.json` | `<PRIVATE_REF_01963>` | SANITISED_ALIAS_ONLY |
| `evidence/package_increment/package_increment_verification_20260926.json` | `<PRIVATE_REF_01931>` | SANITISED_ALIAS_ONLY |
| `evidence/package_increment/packets_cp1_1790427495146.json` | `<PRIVATE_REF_01678>` | SANITISED_ALIAS_ONLY |
| `evidence/package_increment/packets_cp2_1790427508732.json` | `<PRIVATE_REF_01819>` | SANITISED_ALIAS_ONLY |
| `evidence/project_inventory/inventory_fixture_1790427468019.json` | `<PRIVATE_REF_01976>` | SANITISED_ALIAS_ONLY |
| `evidence/project_inventory/inventory_live_readonly_1790427479937.json` | `<PRIVATE_REF_00545>` | SANITISED_ALIAS_ONLY |
| `evidence/rendered/CONTROLLER_REPORT_DRYRUN.md` | `<PRIVATE_REF_01908>` | SANITISED_ALIAS_ONLY |
| `evidence/rendered/RESET_ATTESTATION_DRYRUN.md` | `<PRIVATE_REF_03661>` | SANITISED_ALIAS_ONLY |
| `evidence/rendered/RUN_CARD_DRYRUN.md` | `<PRIVATE_REF_03516>` | SANITISED_ALIAS_ONLY |
| `evidence/rendered/controller_report_render_1790429330259.json` | `<PRIVATE_REF_02410>` | SANITISED_ALIAS_ONLY |
| `evidence/rendered/reset_attestation_render_1790429330181.json` | `<PRIVATE_REF_02686>` | SANITISED_ALIAS_ONLY |
| `evidence/rendered/run_card_render_1790429330102.json` | `<PRIVATE_REF_02861>` | SANITISED_ALIAS_ONLY |
| `evidence/secret_scan/secret_scan_cleanup_1790427546307.json` | `<PRIVATE_REF_02064>` | SANITISED_ALIAS_ONLY |
| `evidence/secret_scan/secret_scan_evaluate_1790427539423.json` | `<PRIVATE_REF_01342>` | SANITISED_ALIAS_ONLY |
| `evidence/secret_scan/secret_scan_plant_1790427529316.json` | `<PRIVATE_REF_03032>` | SANITISED_ALIAS_ONLY |
| `evidence/secret_scan/secret_scan_scan_1790427534348.json` | `<PRIVATE_REF_03521>` | SANITISED_ALIAS_ONLY |
| `evidence/snapshot/archive_stage/workspace_archive_DRYRUN_1790427525412.json` | `<PRIVATE_REF_01956>` | SANITISED_ALIAS_ONLY |
| `evidence/snapshot/snapshot_deployment_terminal_1790427525418.json` | `<PRIVATE_REF_02412>` | SANITISED_ALIAS_ONLY |
| `evidence/snapshot/snapshot_forced_interrupt_1790427519283.json` | `<PRIVATE_REF_03555>` | SANITISED_ALIAS_ONLY |
| `evidence/transcript_source/native_tui_rollout_session.jsonl` | `<PRIVATE_REF_01923>` | SEALED_RAW_UNSANITISED |
| `evidence/transcript_source/transcript_source_probe_tui_20260926.json` | `<PRIVATE_REF_03560>` | SANITISED_ALIAS_ONLY |
| `evidence/unit_test_summary_20260926.json` | `<PRIVATE_REF_01033>` | SANITISED_ALIAS_ONLY |
| `evidence/EVIDENCE_REGISTRY.json` | `<PRIVATE_REF_02291>` | registry |
| `evidence/EVIDENCE_REGISTRY.sha256` | `<PRIVATE_REF_01093>` | sidecar |
| `evidence/EVIDENCE_REGISTRY_CHECK.json` | `<PRIVATE_REF_00892>` | checker output |
| `evidence/EVIDENCE_REGISTRY_CHECK.sha256` | `<PRIVATE_REF_01337>` | sidecar |

Registry verification result: `25` registered evidence files checked, `0` problems.

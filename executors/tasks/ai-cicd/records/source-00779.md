# Original plan versus current pre-W2 scope

[Artifact Class]: CONTROL_PLANE_ASSESSMENT
[Author]: Operations Coordinator
[Observed at]: 2026-10-04 22:14 AEDT
[Request]: Human Operator asked whether the present stage expanded relative to `00_recon`.
[Conclusion]: The experiment's main objective and workloads remain consistent; measurement/control and pre-run validation engineering have materially expanded. Unchanged goals do not establish unchanged effort or prerequisites.

## Comparison baseline

`00_recon/04_execution_protocol_freeze/01_deployer_and_run_structure/PROJECT_ROADMAP_v0.2.md` expressly retains the original `pre/WatchOver AI DevOps — PROJECT_ROADMAP v0.1.md` outside its named amendments. Both were therefore consulted, alongside Master 02 §§6/10, the W2 addendum skeleton, reset checklist and original harness dispatch. Later PRE_W2/AMD/R14 documents were read as the comparison endpoint, not mislabeled as original requirements. No sealed holdout workspace was traversed.

## Findings

| Area | Original planned scope | Present scope / assessment |
|---|---|---|
| Product purpose | Lightweight human-in-the-loop workbench: state, append-only events, stage skills and HTML projection; portfolio prototype | Main purpose remains consistent. This comparison is not a product-code equivalence audit |
| Experiment | W1 discovery, Alerta W2 control/treatment comparison, final holdout; optional Guarded arm | Main structure/workload pins remain; W2C NOT_EXECUTED is an allowed conditional outcome, not a new workload |
| Core acceptance | HTTPS, own backend, API suite, browser account path, post-restart persistence, explanation and teardown | Same generic A1–A7 labels and frozen brief. Current operational eligibility checks are substantially deeper than the original checklist |
| Logging/isolation | Existing CLI harness, checkpoints, secret canary, evidence custody, fresh actors/workspaces, inherited-instruction inventory and reset | These were already planned. Nine PA-4 controls and actual physical discoverability checks are later elaborations; dedicated client home is an implementation of isolation, not a new research objective |
| Alerta adapter | Master 02 expected one identical Alerta A3/A4/A5 adapter; PRE_W2 MA-1 initially limited instrument validation to local frozen pins | Genuine disposable GCP profile/restart validation was later added through AMD-MA13; multi-profile producer custody and adversarial eligibility logic add meaningful engineering scope |
| Running-code provenance | Original source/reset checks verify remote pins and observed clone origins/HEADs, plus state explanation | R13/R14 add backend tree/launch/config scans, Cloud Run `docker save` archives, reference UI build/fetch and a provenance eligibility gate. This is stronger than original Git-pin checking and is a material increase in verification depth |
| Human measurement | Original M1–M11 include human questions, traceability, interruption recovery and effort | MA-6 adds scored human-comprehension checkpoints, answer locks and separate key/scoring sessions as a secondary measure. This is additional measurement scope, even though primary metric semantics are retained |
| Docker | Workload screening inventories Docker/Compose assets and supports local build/run viability; native supported build paths may qualify | Current control-plane Docker installation supports the later R14 Cloud Run image-provenance mechanism. Guest-based GCE provenance is a separate route. Docker was known in the plan, but this specific control-plane use was added later |
| Recorder spinout | Original local control harness | Sep-27 spinout note explicitly records getting beyond "just enough" and a separate standalone project. The separate product is not an AI_CICD prerequisite |

## Interpretation and responsibility

The added work has recorded later decisions/authorizations. Authorization does not mean it was already present in the first plan, or establish that every implementation detail was the minimum necessary. Several repairs addressed demonstrated false acceptance; this comparison does not determine that every round or every fixture was avoidable.

Operations Coordinator should have distinguished unchanged experimental goals from increased verifier/control engineering when explaining progress. Saying only "the plan is unchanged" would conceal the substantial preparation burden. The current preparation release remains the approved scope; this assessment issues no technical verdict or acceptance-rule amendment.

## Calendar

Roadmap v0.2 originally schedules W2A for Oct 13–14 and W2B by Oct 15. The observation date is Oct 4, so formal W2 has not passed that original scheduled start. This calendar fact does not negate the expanded preparation work. Starting earlier still needs the required schedule/gate reconciliation; this assessment does not declare T0.

## Scope for convergence

Use the accepted r2/R14 instruments and the already released actual entry checks as the present bounded endpoint. Extra generalization, new platform coverage, recorder/product extraction and additional calibration are not added to the existing entry-preparation task. Demonstrated availability/isolation failures return one precise owner decision under that release.

## Primary locators

- `pre/WatchOver AI DevOps — PROJECT_ROADMAP v0.1.md`, §§1, 6, 8.
- `00_recon/04_execution_protocol_freeze/01_deployer_and_run_structure/PROJECT_ROADMAP_v0.2.md`, §§0, P2.
- `00_recon/04_execution_protocol_freeze/COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md`, §§6.4, 6.6, 10.1.
- `00_recon/04_execution_protocol_freeze/02_observer_and_measurement/W2_MEASUREMENT_ADDENDUM.md`.
- `00_recon/04_execution_protocol_freeze/03_OPERATIONS_COORDINATOR_control_and_reset/RUN_RESET_CHECKLIST.md`, R3a/R3b, R4/R5.
- `00_recon/05_control_harness_validation/HARNESS_IMPLEMENTATION_AND_DRY_RUN_DISPATCH.md`, §§0–1.
- `00_recon/05_control_harness_validation/NOT_PART_OF_AI_CICD — Standalone_Spinoff_Note.md`.
- `01_baseline_and_design/04_pre_w2_freeze/council_round_04/PRE_W2_FREEZE_MERGED_FINAL_CANDIDATE.md`, MA-1.3, MA-6.
- Human Operator mirror `AMD_MA13_GCP_PROFILE_VALIDATION_2026-10-02.md`, together with its later ledger billing correction.
- MA-1 workspace `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_FINAL_R14_ALERTA.md`, §§4.4–5.

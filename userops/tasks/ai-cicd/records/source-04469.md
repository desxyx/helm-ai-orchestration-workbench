# AMD-MA13-R1 — remove billing from MA-1 platform validation gate

[Artifact Class]: GOVERNANCE_DECISION
[Status]: OWNER_APPROVED; ledger recording and execution-chain routing required
[Task ref]: AI_CICD / MA-1 / W2_PLATFORM_ADAPTER
[Human Operator source]: Active-session instruction on 2026-10-02: the project team is not responsible for cost; focus on the task and remove non-core billing work. Human Operator supplied a W1 billing screenshot as context, not as a W2 or GCP price forecast.
[Frozen Truth named]: Ratified PRE_W2 Artifact 3, `W2_MEASUREMENT_ADDENDUM`, MA-1.3 Execution/review, as amended by AMD-MA13 earlier on 2026-10-02.
[Change type]: REPLACE the full MA-1.3 text from AMD-MA13. The original amendment artifact and ledger entry remain in the append-only history; this correction governs after recording and routing.

## Full replacement MA-1.3 approved by Human Operator

> **MA-1.3 Execution/review.** A3/A4/A5 application-instrument baseline validation remains local at the frozen pins. A separately authorized, bounded pre-W2 platform-profile validation may use disposable resources in a Human Operator-designated isolated GCP sandbox solely to validate the Adapter Record's GCP inventory, producer provenance, restart equivalence, instance/process identity, and persistent-storage evidence handlers. It is not a W2 arm, produces no W2 acceptance outcome, and may not publish custom public DNS, expose an anonymous public endpoint, use treatment material, package export, W2C material or the Deployer's arm resources. Each validation dispatch must name the project, exact resource set, actions, duration, credentials/permissions, raw evidence, teardown and residual inspection. Genuine VM stop/start or reset and managed-instance replacement are permitted only within that dispatch's bounds. An independent fresh cross-model-family Executor Reviewer confirms the raw outputs. Billing and cost management remain with Human Operator outside the W1–W3 project team's tasks and are not an acceptance condition. The completed local MA-1 controls remain valid; this clause does not ratify an Adapter Record or open WF-8 or W2.

## Narrow effect

- Remove the former requirement that each dispatch specify a cost ceiling. No Executor, Reviewer or Council seat must estimate, monitor, justify or adjudicate GCP charges as part of MA-1 evidence or W1–W3 measurement.
- Keep the exact resource set, actions, duration, permissions and teardown because they bound what is being validated and allow the environment to be reset consistently between arms.
- Preserve the approved possibility of a later genuine GCE stop/start and Cloud Run replacement. This correction is not an action dispatch and does not create or run cloud resources.
- Completed local MA-1 controls remain valid. R4 remains unratified; RW-6–RW-9 and GCP profile validation remain open. WF-8 and W2 remain closed.

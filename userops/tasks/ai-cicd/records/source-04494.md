# MA-1 Adapter Record — Finite Targeted Rework Release R1

[Artifact Class]: IMMUTABLE_EVIDENCE
[Released by]: OPERATIONS_COORDINATOR_Codex for Human Operator
[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R1
[Executor]: Executor Actor 01
[Capability]: WriteExecute within the existing two adapter-stage roots only
[Basis]: Reviewer Actor 02 static `REVIEW_RETURN` `TARGETED_REWORK`, 2026-10-02; local MA-1 controls and INC-1 disposition unchanged

Repair the **existing** arm-neutral verifier and Record only. The Reviewer accepted the artifact integrity and MA-1.10 field coverage but found seven finite defects. Do not add a framework, new suite, third primary artifact, runtime dependency, service, VM or network action. You may choose the smallest design that satisfies the findings, but do not lower a pass condition or claim static checks prove unrun behavior.

Required result:

1. A5 restart eligibility must be based on semantic, shape-specific §6.4 evidence, not `--shape` plus arbitrary file existence. For VM, verify complete serving-VM coverage, stopped-state unavailability, changed boot identity, reset uptime, serving-process recovery and persistent-storage continuity. For serverless/managed compute, verify replacement of every serving instance with before/after identities and an explicit action rationale. If evidence is absent or inconsistent, A5 remains `UNVERIFIED`; a process/container-only action is rejected. Include one valid and multiple invalid **offline** evidence-bundle tests. No actual restart.
2. A5 cannot advance to restart recording unless A5-P setup, A5-N setup/deletion and A5-S prechecks have passed. Set the N deletion marker only after successful deletion verification. A failed prerequisite cannot be masked by a later component PASS.
3. Per-arm A3-P `PASS` requires backend-log correlation; missing, malformed or nonmatching log is not PASS.
4. An unavailable mandatory A4 step must return `BLOCKED` per MA-1.5, distinct from an observed assertion `FAIL`.
5. Align AMD-DK2 custody: no synthetic account identifier in events/state or returned user data; bind the same identity across A4, key derivation and A5 without exposing it; disable screenshots by default and mask any enabled credential fields. Include bounded offline positive/negative checks of identity continuity and output redaction.
6. In the Record, state only that the frozen lock declares Cypress's install script and RT-014 proves `npm ci` success. Lifecycle execution, destination, redirects, bytes and cache size remain inference/`UNVERIFIED` as appropriate; preserve Human Operator's run-specific risk acceptance.
7. Make the Record, script and static evidence internally consistent with these corrections. Preserve the R1 files and hashes; issue newly named R2 revisions and a new checksum manifest. No modification to frozen fixtures, canonical source, original runtime evidence or prior correction.

Writable roots remain `executor/adapter_record_stage/` and `evidence/adapter_record_stage/executor/` in `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`. Static parse, pure-function replay and synthetic non-credential fixtures are allowed; **no endpoint calls, browser execution, install, VM, credential creation/use, cloud or W2**. Return `ADAPTER_RECORD_TARGETED_REWORK_SUBMISSION` with revision hashes, exact finite mapping and remaining unrun gaps, then stop for independent finite VerifyOnly review. This release does not ratify the Record or open WF-8.

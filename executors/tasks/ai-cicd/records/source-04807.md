This is from Reviewer Actor 02.
05:00 PM

# REVIEW_RETURN — R12 Alerta C-A finalization

**Verdict: TARGETED_REWORK, finite R12-T1–T3 directly to Executor Actor 01 under the standing offline release.** Complete Alerta applicability PASS is not established. The missing core contract is the frozen binding between the real application deployment and its source/configuration/serving evidence. This requires offline contract/profile completion; no new genuine capture is requested and no platform issue is reopened.

Task: MA1_ALERTA_PROFILE_FINALIZATION_RELEASE_2026-10-04_r1, SHA-256 <PRIVATE_REF_02781>. Same originally fresh R7–R11 OpenAI Reviewer session continues as Reviewer Actor 02 / VerifyOnly, independent from Anthropic Claude Opus 5.5 Executor Actor 01. Runtime identity is GPT-6-based Codex; exact backend revision/session UUID unavailable. Entry declaration and role write boundary remain in REVIEW_ACK_ALERTA_FINALIZATION.md. Reviewer did not author or fix the candidate.

## Exact candidate reviewed

| Artifact (workspace-relative) | SHA-256 |
|---|---|
| `evidence/adapter_record_stage/executor/ADAPTER_RECORD_R12_ALERTA_SUBMISSION.md` | `<PRIVATE_REF_04557>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_FINAL_R12_ALERTA.md` | `<PRIVATE_REF_04502>` |
| `executor/adapter_record_stage/ma1_verify_r12.py` | `<PRIVATE_REF_04483>` |
| `executor/adapter_record_stage/alerta_probe.py` | `<PRIVATE_REF_02248>` |
| `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R12.json` | `<PRIVATE_REF_05195>` |
| `evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R12` | `<PRIVATE_REF_05090>` |

All six primary pins match. R12 version-local manifest: 5213/5213 entries match. Old R11 accepted platform result, E1–E5 and R10 F1–F4 remain closed. No full historical scan or repetitive capture-tree copy was performed.

## Finite findings and closure criteria

### R12-T1 — an unused environment value is accepted as an application dependency

- Actual code: `ma1_verify_r12.py:1532–1541`, `run_dependency_alerta`. Any env value containing the VM IP is transformed into an artificial `VM_URL` and used to satisfy the dependency predicate. It never establishes that the application consumes that value.
- Independent DERIVED counterexample: `derived_r12/unconsumed_environment_value/`. Starting from the submitted mixed composition, rename `VM_URL` to `MA1_UNUSED_VM_REFERENCE` in all six provider configuration streams GS-042/043/059/061/067/068, preserving the URL value, network wiring, matching old/new configuration, image, actions and probe logs. Both gates still pass and the result is ELIGIBLE. The changed streams and re-sealed log/manifest are retained; all unchanged streams are read-only references.
- Frozen-source check: `backend/alerta/database/base.py:21–23` reads `app.config['DATABASE_URL']`; `management/views.py:131` checks `db.is_alive`. A provider-recorded arbitrary env field is evidence of configuration presence, not evidence of a consumed database/backend path. The submitted mixed positive itself retains calibration `VM_URL`, which does not establish the frozen application's configuration.
- Required finite repair: freeze the supported Alerta configuration/serving mappings, and bind the deployed effective configuration or build/config provenance to the actual path that reaches each VM. A recognized database URI binding to a self-managed database VM is one possible supported path; a frontend-to-backend mapping needs its own registered evidence. Do not replace arbitrary field names with another caller-selected field or widen the supported architecture set. Unconsumed/irrelevant IP values, absent effective binding or conflicting configuration must be UNVERIFIED.
- Closure controls: the renamed-unused-field case must refuse for an application dependency/binding reason; a DERIVED positive with actual frozen Alerta configuration and serving command shapes must pass. Keep standalone VM and Run compatibility, and existing missing-log refusal. No live probe or new platform is needed.

### R12-T2 — C-R12-6 is a required frozen deployment-provenance gate, not an optional later brief

- Decision on Executor Actor 01's question: the source-binding method belongs in the complete C-A Record's deployment prerequisites and fixed acceptance contract. Its actual per-arm observations can be collected at W2 deployment under later authorization. It need not make Alerta report a commit at runtime.
- Current evidence: registry archive hashes are explicitly “not checked at runtime”; Record C-R12-6 pushes their binding to an unspecified W2 deployment gate. The candidate interface has no defined producer/input/verification path to link the deployed Run digest or VM-installed files to the frozen backend and frontend. The independent `foreign declared source anchors ignored by restart gate` control confirms this known interface boundary; it is not reported as a hidden contradiction of the candidate's disclosed behavior.
- Required finite repair: put a concrete, frozen control-plane provenance input/schema, capture commands/producer custody and comparison rules into the unified Record/profile. Bind both archives/pins and the relevant built/deployed artifacts, as well as the effective application configuration used by T1. A gate outside the restart function is acceptable if the unified workflow actually requires it and cannot issue overall applicability/measurement acceptance without it. Missing, foreign or merely caller-declared provenance remains UNVERIFIED.
- Actual genuine per-arm build evidence is not required for this offline finalization and must not be fabricated. Use the existing RT-010/local archive chain as the separate genuine baseline; positive and negative future-input composition controls remain DERIVED. If no trustworthy bounded provenance method can be specified, return exactly this core contract blocker to Operations Coordinator/Human Operator instead of requesting cloud capture or declaring an unconditional PASS.

### R12-T3 — make the frozen A3/A4 specification self-contained as the release requires

- Record §1 abbreviates A3 as test_01 “… test_06”; §2 gives “Basic-auth sign-up enabled” without the complete frozen configuration or exact A4 invocation. It currently requires the fixture/history to supply part of the acceptance procedure.
- Required documentary completion: enumerate all six A3 tests and request/status assertions, full A3-N patch hash/application-and-revert scope, and the fixed commands/module working-directory or fixture path rules. Give the A4 command and allowed environment substitutions, plus `AUTH_REQUIRED=True`, `AUTH_PROVIDER=basic`, `SIGNUP_ENABLED=True`, `EMAIL_VERIFICATION=False`, `ALLOW_READONLY=False`, the UI API-base binding and SPA route preconditions. Distinguish probe alert IDs from A5 UI-created blackout IDs; retain the original account and original object in post-check acceptance.
- This is the release's explicit complete-Record delivery requirement, not new application feature work. Reuse the unchanged fixtures and accepted controls; no new runtime execution or redundant full suite is requested.

## What independently held

- 20 focused offline controls recorded: 18 expected compatibility/refusal/format/state controls, one material dependency counterexample, and one disclosed source-contract boundary control. Harness outputs match all intended observations; that does not turn the counterexample into an applicability PASS.
- Three submitted DERIVED topology positives reproduce. Additional sparse VM composition using actual local Alerta nginx/postgres/gunicorn command shapes also passes; this supports process-parser compatibility without proving an actual GCP application deployment.
- Wrong response body, provider boot-disk mismatch and missing distinct VM frontend request log all refuse with their targeted reasons.
- Genuine local A3-P/S/N and A4 classify as expected from the retained raw outputs. The accepted local A5-P/N/S identity/persistence chain remains traced in ENTRY_BASELINES.json and BOUNDED_APPLICABILITY_REVIEW_MAP.md; no old Reviewer notes were loaded.
- Genuine R11 GCP P1/P2/P3 remain ELIGIBLE in the calibration profile. Three CLI controls independently confirm that an alerta state refuses a calibration bundle. CLI prerequisite markers are explicitly SYNTHETIC; no A4/A5 browser, endpoint or credential operation was executed.
- The W2 capture wrapper format parses correctly for one harmless offline `/usr/bin/printf` producer. This tests capture syntax only and exercises no provider or SDK identity.
- Frozen backend archive SHA-256 and relevant DB-health/config source were inspected read-only, without extraction or package installation. `gtg` checking DB liveness is confirmed. No combined real Alerta-on-GCP positive exists or is claimed.

## Limits retained / next action

- Preserve INC-1's bounded local-run uncertainty, AMD-A5-CR's observed-work exception, closed supported topologies and custody-not-attestation distinction.
- C-R12-3 guest serial instrumentation remains a disclosed deployment prerequisite. The reviewed required output/capture schema must be frozen in the Record; actual installation and observations belong to the later authorized arm deployment. This return does not request a new installation method or cloud allowance.
- Executor Actor 01: versioned offline C-A repair for T1–T3, minimum affected controls and exact submission. Do not alter R12, R1–R11 or genuine evidence. No speculative extra rework, full historical replay or another capture product requested.
- Shared application-finalization section becomes NEXT=EXECUTOR only after this immutable return and its manifest are written/verified. Supplemental NEXT=DONE is preserved.
- If T2 cannot be specified from the permitted evidence and control-plane contract, give Operations Coordinator/Human Operator one precise provenance-gate blocker. No additional permission or cloud receipt is consumed by this return.

Reviewer action result: scope=C-A offline independent review; target=this exact R12 candidate; actions=direct diff/raw/source inspection, version-local integrity and focused offline controls; evidence=this Reviewer package; anomalies=one accepted unused-field dependency, plus the disclosed source-gate and complete-Record omissions; remaining residue=no Reviewer resources created, zero network/cloud/credential/API actions, zero receipt consumption. No final applicability PASS, Record ratification, WF-8 closure or W2 T0.

Recorded UTC: 2026-10-04T06:00:29.076182+00:00

End from Reviewer Actor 02.

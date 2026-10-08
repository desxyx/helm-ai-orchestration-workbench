# Operations Coordinator Handoff — Preflight Complete, W1 Entry Next

```text
Classification: CONTROL-ONLY — NEVER Deployer-visible
Status:         CURRENT SESSION CLOSEOUT READY
Prepared by:    Operations Coordinator
Date:           2026-09-27 Australia/Melbourne
Next phase:     Fresh-session W1 reset and entry gate; W1 has not started
```

## 1. Load order for the next Operations Coordinator/controller session

1. Executor Charter and Council Constitution required by repository governance.
2. Project-root `ROLE_MODEL_REGISTRY.md`.
3. `00_recon/04_execution_protocol_freeze/WATCHOVER_EXPERIMENT_EXECUTION_SOT_v0.1.md`
4. `00_recon/04_execution_protocol_freeze/COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md`
5. `00_recon/04_execution_protocol_freeze/COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md`
6. `00_recon/04_execution_protocol_freeze/COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md`
7. `00_recon/02_helm_reuse_inventory/HELM_REUSE_CANDIDATES.md`
8. `00_recon/05_control_harness_validation/HARNESS_DRY_RUN_REPORT.md`
9. `00_recon/01_workload_screening/CORE_06-0a_OPERATIONS_COORDINATOR_ACCEPTANCE.md`
10. This handoff.

Do not locate, enumerate, open or otherwise inspect W3 material. Do not provide this handoff, the
Masters, screening report, trap findings, acceptance criteria or controller material to the Bare W1
Deployer.

## 2. Completed and accepted

### Execution protocol

- Council Masters 01–03 are materialized and Human Operator-ratified.
- `CORE_06-0a` placeholders in the Master/child run artifacts have been mechanically replaced with
  the accepted workload SHAs and W1 A3 adapter.
- The canonical operational role/model SoT is now the project-root `ROLE_MODEL_REGISTRY.md`.
- Rapid Context Auditor Actor 03 / Gemini 3.8 Flash Extended is registered as the non-run Rapid Context Auditor. It may
  perform bounded allowlisted audits for Operations Coordinator or Council, but never enters a live run, writes
  artifacts, accesses W3, issues a final verdict or communicates with Deployer/Reviewer/Observer.

### HELM reusable-asset inventory

- `CORE_06-0b` is complete and accepted at
  `00_recon/02_helm_reuse_inventory/HELM_REUSE_CANDIDATES.md`.
- The three required WatchOver gaps are all `PRESENT-BUT-HELM-SPECIFIC`: usable mechanisms exist,
  but future product work must decouple them from HELM roles and private identifiers rather than
  copy the original artifacts.
- Privacy review found no email address, secret value or credential-shaped value in the deliverable.
- One read-only scope deviation (`council/templates/extended/` headers) is recorded in the accepted
  inventory; its out-of-scope row was removed and it does not block W1.

### Harness

- `experiment-control-tool 0.2.0` implemented.
- Harness dry run: all ten Master 03 §10.2 controls `PASS`.
- Unit tests: `35/35 PASS`.
- Transcript-source probe used a real interactive Codex TUI session.
- Evidence registry: 25 registered files, zero integrity problems.
- Threshold: 32,768 UTF-8 bytes.
- No W1/W2/W3 application deployment, DNS write, paid resource creation or API enablement occurred.

### Workload screening

`CORE_06-0a` is accepted:

| Workload | Verdict | Frontend SHA | Backend SHA |
|---|---|---|---|
| W1 | `VIABLE_WITH_KNOWN_LIMITATION` | `<PRIVATE_REF_03329>` | `<PRIVATE_REF_00532>` |
| W2 | `VIABLE` | `<PRIVATE_REF_03446>` | `<PRIVATE_REF_01617>` |

W1 A3 is frozen to the RealWorld Hurl suite at submodule SHA
`<PRIVATE_REF_01550>`:

```text
HOST=https://<backend-host> realworld/specs/api/run-api-tests-hurl.sh
```

`HOST` does not include `/api`; all 13 files / 154 requests must pass; no exclusion is authorized.

The temporary Homebrew PostgreSQL service used by screening was stopped at closeout. Scratch build
worktrees remain preserved and ignored; they are not W1 run workspaces.

## 3. Intentionally outstanding — do not mark complete in this session

1. The real W1 per-run workspace and fresh Deployer/Observer sessions do not yet exist.
2. The Cloud Asset primary project-wide inventory instrument is unavailable because its API is not
   enabled. Before the W1 Resource X checkpoint, request Human Operator approval and make the instrument
   available; do not silently enable services.
3. Master 03 §10.3 Resource X positive control remains deferred until a known W1 resource exists.
4. The actual W1 workspace instruction/context inventory has not been run.
5. Real W1 R1–R8 evidence has not been collected.
6. `RUN_W1_RESET_ATTESTATION.md` has therefore not been generated and must not be backfilled from
   dry-run fixtures.
7. W1 has not started. No T0 has been declared and no Deployer brief has been sent.

## 4. Next-session sequence

1. Start a fresh Operations Coordinator/controller session and load only the control-side files listed in §1.
2. Reconfirm `PERSONAL_GCP` / `WATCHOVER_SANDBOX`, GitHub auth, the selected project and manual DNS
   method without copying raw secrets into evidence.
3. Obtain Human Operator approval before enabling the Cloud Asset API required by the frozen primary inventory
   instrument. Verify it by a read-only query.
4. Create the clean W1 per-run workspace and fresh, isolated W1 Deployer and Observer sessions.
5. Run the actual entry check from that workspace, including instruction/context discovery and R1–R8.
6. Generate `RUN_W1_RESET_ATTESTATION.md` from real evidence. Only `CLEAN`, or an explicitly
   Council-accepted `KNOWN_LIMITATION`, permits W1 to start; `INVALID` must not start.
7. Send only the frozen `RUN_W1_DEPLOYER_BRIEF.md` to the Bare Deployer. The Deployer uses its own
   terminal. Operations Coordinator routes allowed human messages and captures evidence but does not correct ordinary
   deployment mistakes.
8. Execute W1 under Masters 01–03, including forced interruption, acceptance, teardown, postmortem
   and final residual checks.

## 5. Visibility and experimental discipline

- W1 Deployer: only its frozen brief, allowed user replies, repository contents and naturally visible
  tool state. No control-side trap analysis or WatchOver material.
- Observer: only its measurement package and run evidence, not predicted failure narratives.
- Operations Coordinator: controller/reviewer, not deployment co-pilot. Intervene only through the frozen human
  interface, mandatory continuation, safety stop or fuse.
- Human Operator manually performs approvals and DNS changes.
- Any AI session/context/workspace that accesses W3-specific material is excluded from later
  WatchOver design/build work. No W3 access is authorized by this handoff.

## 6. Current closeout state

- Local PostgreSQL background service: stopped.
- Cloud application resources created by this preflight: none.
- DNS changes made by this preflight: none.
- W1 entry authorization: not yet granted; depends on the real reset attestation.
- Safe next action: close this session and begin §4 in a fresh controller session.

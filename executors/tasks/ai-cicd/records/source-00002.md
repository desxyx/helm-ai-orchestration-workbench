[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-COUNCIL-REENTRY-2026-10-01
[Prepared by]: Operations Coordinator
[Prepared]: 2026-10-01T12:37:30+10:00
[Process stage]: Council re-entry / Phase 1 common brief

# Council re-entry — MA-1 entry feasibility

## 1. Purpose and boundary

This common brief returns two established MA-1 entry-feasibility blockers to Council under the ratified MA-1.2 and MA-1.8 rules. It requests independent Council decisions on the A3 instrument and the A5 restart environment/boundary.

This brief does not authorize MA-1 execution, source changes, dependency installation, service startup, credential access, cloud/DNS/publication work, package export, W2C work or any W2 arm. It contains no recommendation from Operations Coordinator and assigns no merge owner during Phase 1.

## 2. Authority and fixed references

- Normative entry: `01_baseline_and_design/04_pre_w2_freeze/PRE_W2_FREEZE.md`, status `RATIFIED`.
- Immutable body: `01_baseline_and_design/04_pre_w2_freeze/council_round_04/PRE_W2_FREEZE_MERGED_FINAL_CANDIDATE.md`.
- Immutable-body SHA-256: `<PRIVATE_REF_01075>`.
- MA-1.2: no suitable instrument or unreachable control is a Constitution §6 trigger-3 re-entry.
- MA-1.4: A3 requires one suite/command with endpoint substitution and valid A3-P, A3-S and A3-N controls against a deployed backend.
- MA-1.8: an impossible step/control is `BLOCKED` and triggers Council re-entry.
- WF-8 item 1: W2A T0 requires MA-1 `VALIDATED`, Reviewer-confirmed and its Adapter Record ratified into the Addendum.
- Master 02 §6.1: A3 is the objective API suite against the deployed backend.
- Master 02 §6.4: VM deployments require stop/start or reset of every serving VM; container-only restart is insufficient. Serverless/managed compute requires replacement of every serving instance. If no meaningful restart can be established, A5 is `UNVERIFIED` and is never waived.
- Master 02 §6.6: the adapter must fix suite, exact locator/command, target-endpoint substitution and pass condition; local baseline validation cannot lower acceptance.

## 3. Independent evidence

- Reviewer: `Reviewer Actor 02`, VerifyOnly, cross-model-family from `Executor Actor 01`.
- Evidence: `execution/ma1_entry_feasibility/rounds/r1_REVIEW.md`.
- Evidence SHA-256: `<PRIVATE_REF_02745>`.
- Size: 71 lines; 6867 bytes.
- Verdict: `BLOCKED`.
- Independence statement: findings were formed from the frozen contract, source, configuration, tests, CI and host tool availability before the Reviewer read any Executor narrative. The Reviewer did not read the Executor ACK.

## 4. Verified facts — A3 instrument

No existing suite found in the frozen source supplies one unmodified command that exercises a deployed Alerta API endpoint across valid A3-P, A3-S and A3-N controls.

Candidate results:

1. Backend pytest constructs Alerta in-process with `create_app(...)` and Flask `test_client()`. Its substitutable external address is `DATABASE_URL`, not a deployed Alerta API endpoint. A no-listener database result would be a setup/connection failure and cannot provide deployed-backend request-log proof.
2. All seven frontend Cypress specifications call `cy.mockApi`; `/api/*` traffic is intercepted and fixture-backed, so the deployed backend is not exercised.
3. Frontend Jest/unit tests do not target a deployed backend; API-facing stores use mocked modules.
4. LDAP/SAML integration tests create an in-process app/test client and test auxiliary identity-provider integration, not a full deployed Alerta API suite.
5. No tracked Hurl, Postman, Newman, Schemathesis, Dredd, Karate or REST Assured suite was found in the searched frozen-source surface. Positive controls found the expected pytest, Cypress and Jest sources.

Result on the current authorized surface: the MA-1.2 no-suitable-instrument trigger is established.

## 5. Verified facts — A5 restart control

Master 02 §6.4 does not allow a local API process, gunicorn process, frontend process or container-only restart to stand in for the frozen restart action.

The frozen trees expose Docker/container configuration, but `docker`, `podman`, `colima`, `limactl`, `multipass`, `vagrant` and `virsh` were unavailable on the Reviewer's authorized host surface. A container runtime by itself would still not make a container-only restart sufficient.

No currently reachable compute shape was found that supports the required stop/start or reset of every serving VM, or replacement of every serving serverless/managed-compute instance.

Result on the current authorized surface: the MA-1.2 unreachable-control trigger is established.

## 6. Evidence gaps and non-findings

- No suite or service was executed; the Reviewer role was VerifyOnly.
- No conclusion was made about a future Council-selected instrument.
- No conclusion was made about a separately provisioned compliant compute environment.
- No `.env`, `.flaskenv`, credential file, raw secret value, Executor workspace or Executor ACK was read by the Reviewer.
- These findings do not determine the eventual Council choice or amendment text. They determine that the currently authorized local entry path cannot proceed as written.

## 7. Questions requiring Council decision

Council should answer all four independently in Phase 1:

1. **A3 instrument:** Which existing external deployed-API suite is selected, with exact locator, immutable version/pin, command, endpoint-substitution mechanism, pass condition, named exclusions and A3-P/A3-S/A3-N evidence requirements? If Council instead authors or approves a new instrument/adapter, identify the authority and exact freeze/ratification path before execution.
2. **A3-N provenance:** What pre-recorded application defect and expected non-excluded assertion failure will supply A3-N without permitting the Executor to invent policy, alter the suite or weaken a failure into connection/setup/collection failure?
3. **A5 environment/boundary:** Which compliant VM or serverless/managed-compute shape will be provided, and what exact restart action and evidence will satisfy Master 02 §6.4? If Council intends a different restart boundary, it must identify the formal amendment and ratification path; local process-only or container-only restart is not silently equivalent.
4. **Resume boundary:** Do MA-1 and WF-8 remain unchanged or receive a formal amendment, and what exact bounded work may resume after Human Operator records the decision? State whether any source copy, dependency installation, service startup, credential action or network access is permitted.

## 8. Required Council process and return shape

Phase 1 uses the same common brief and evidence for all three Council seats. Each member returns an independent response without reading another member's response and without producing a merged answer.

Each response should contain:

- `Position`: answer to questions 1–4;
- `Contract treatment`: unchanged clauses or exact proposed amendment locations;
- `Execution boundary`: newly permitted and still-prohibited actions;
- `Acceptance evidence`: exact artifacts and pass/fail conditions required;
- `Risks / unresolved questions`;
- `Proposed decision text`: wording suitable for later cross-review, not yet ratified.

Cross-review, convergence, merge ownership and Human Operator ratification occur only after all three independent Phase 1 responses are sealed.

## 9. Current safety state

- Executor stopped after read-only entry/ACK; no clone, install, service or credential action occurred.
- Reviewer stopped after issuing `BLOCKED` and materializing the immutable evidence.
- No A3, A4 or A5 runtime work occurred.
- No cloud, DNS, publication, package export, W2C or W2 arm action occurred.
- MA-1 execution and WF-8 progression remain held pending Council re-entry and subsequent Human Operator disposition.

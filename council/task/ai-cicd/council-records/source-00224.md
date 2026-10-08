# Operations Coordinator mechanical findings — Pre-W2 Council Round 3

- Date: `2026-09-30`
- Scope: mechanical source lookup only
- Authority: evidence input for Council cross-review; not Council convergence, an amendment,
  implementation authorization or W2 entry authorization

## MF-1 — W2 Alerta A3 remains unvalidated

The Round 2 B-3 finding stands. CORE_06-0a did not establish the W2 A3 suite locator, exact
command, endpoint-substitution mechanism, exclusions or pass condition.

Evidence:

- `00_recon/01_workload_screening/CORE_06-0a_SCREENING_REPORT.md:196` — the W2 A3 adapter remains
  `DEFERRED`; none was established there.
- `00_recon/01_workload_screening/CORE_06-0a — Workload_Screening.md:161` — the W2 Alerta A3
  adapter is deferred to the W2 addendum.
- `00_recon/01_workload_screening/CORE_06-0a_OPERATIONS_COORDINATOR_ACCEPTANCE.md:46-47` — the W2 HTTP checks were
  viability smoke evidence and did not attempt the later W2 objective acceptance suite.

## MF-2 — Alerta-specific A4 and A5 adapter details also remain unestablished

The generic acceptance semantics are frozen, but the Alerta-specific operational adapter has not
been established:

- `00_recon/04_execution_protocol_freeze/COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md:269-270`
  freezes generic A4 and A5 semantics.
- The same Master at `319-329` freezes the deployment-shape restart-equivalence rule.
- The same Master at `539-541` requires one Alerta adapter containing an A3 suite, A4 sign-up path
  and A5 object, used identically in every W2 arm.
- `00_recon/04_execution_protocol_freeze/02_observer_and_measurement/W2_MEASUREMENT_ADDENDUM.md:20`
  repeats that adapter requirement, while line 35 explicitly says not to draft the actual Alerta
  A3/A4/A5 specifics ahead of the Council freeze.
- No supplied screening or frozen adapter record identifies an Alerta browser sign-up path or the
  UI-creatable Alerta domain object to use for A5.

Therefore A4 and A5 must not be described as already validated. The remaining pre-W2 validation
work should be scoped as the **MA-1 Alerta adapter validation task (A3/A4/A5)**, not as A3 alone.

The task must establish, without redefining the frozen acceptance bar:

- A3: suite locator, exact command, endpoint substitution, named exclusions and pass condition;
- A4: the exact browser sign-up/login/logout/login-again path and any required configuration;
- A5: the exact UI-creatable domain object, how its identifier is recorded, and how persistence is
  checked after the already-frozen deployment-shape restart action.

The generic restart-equivalence table is already frozen and is not reopened by this finding.

## MF-3 — Treatment export path

The accepted B-2 layout is compatible with the rehearsal's architecture but the literal rehearsal
router path is not suitable as a W2 treatment path. For W2B, use a neutral exported copy of the
accepted allowlisted subset outside HELM, outside the product repository and outside every arm
workspace. Runtime records remain inside the arm workspace and are created after T0.

This is a packaging/path correction, not a product change and not authorization to create the
package yet.

## MF-4 — Merge wording boundary

No Council member is designated or recommended as merge owner. After independent cross-review,
any synthesis/materialization step requires its own properly scoped session and Human Operator authorization.
Cross-reviewers should return findings, not assign a named member.


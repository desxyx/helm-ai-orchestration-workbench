# Council Member C independent cross-review return

- Date: `2026-09-30`
- Verdict: `PATCH`
- Status: independent Council cross-review; not synthesis, ratification, implementation
  authorization or W2 entry authorization
- Provenance: materialized in substance from Council Member C's reply supplied by Human Operator

## Findings

1. MA-1 must cover unvalidated Alerta-specific A3/A4/A5 details without reopening generic A1–A7
   semantics or the frozen restart-equivalence table.
2. MA-1 needs negative controls for A3, A4 and A5.
3. Council Member C judged the proposed HC design sound and non-circular.
4. B-2 Option A and MF-3 require a neutral exported package outside HELM/product repo; purge the
   dead B-2 Option B R3a variant.
5. DK-5 must use Constitution §3 amendment for Master 01 DBC-3 and Master 03 §§14.2–14.3.
6. The proposal does not accidentally authorize implementation or W2 entry.
7. Correction #1 must map explicitly to Class I and each PA-1 item must receive one class.
8. WF-2 must cite `council_round_01/OWNER_DECISIONS_ROUND_01.md`, D-1–D-6 and the accepted mandatory
   disclosures/invariants.
9. Ratification blockers and W2A-entry blockers must remain distinct.

## Proposed patch content

### MA-1

- A3: suite locator, exact command, endpoint substitution, named exclusions and pass condition;
  negative control using a missing, unresponsive or mismatched endpoint.
- A4: exact sign-up/login/logout/re-login path and configuration; invalid credentials or
  unauthenticated access must fail.
- A5: exact UI-creatable object, recorded identifier and persistence check after frozen restart;
  missing/deleted/unpersisted target must fail.
- Local frozen pins only; cross-family review; identical adapter across arms.

### PA-2 suggested mapping

- E: corrections #2–#4 and #6–#9; credential delivery; frozen-hash/freeze-window operations.
- I: correction #1 redaction/scanning; correction #5 discoverability preflight; interruption
  detector; Resource X copier; packet checker; runtime-invariance preflight.
- R: DK-2 and DK-5 amendments; DK-6 and HC protocol as task rules; purge rejected R3a Option B.

### WF-2

Inherit the exact Round 1 decision record, D-1 through D-6 and its accepted mandatory
disclosures/invariants.

### DK-5

Use all five Constitution §3 amendment steps: named Frozen Truths, full replacement, Operations Coordinator ledger
entry, Reviewer notification, and prior-work validity decision. Existing text stays operative
until then.

### WF-3

Use full HEAD `<PRIVATE_REF_02752>`, reduced to D-4 allowlist, exported read-only to
a neutral path outside HELM, product repo and every arm workspace. Literal rehearsal path is
forbidden. Runtime state is created after T0 inside the active workspace.

## Council Member C blocking question

None. Council Member C reported only procedural next actions.

## Known reconciliation notes

This return's proposed negative control, HC-completeness judgment, §12.1 characterization and PA
class mapping are disputed in `OPERATIONS_COORDINATOR_CROSS_REVIEW_DIVERGENCE_REGISTER.md` and must not be copied
without resolution.


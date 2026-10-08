# Council Member B independent cross-review return

- Date: `2026-09-30`
- Verdict: `PATCH`
- Status: independent Council cross-review; not synthesis, ratification, implementation
  authorization or W2 entry authorization
- Provenance: materialized in substance from Council Member B's reply supplied by Human Operator

## Findings and proposed patches

### 1. MA-1 scope

MA-1 covers unvalidated Alerta-specific A3/A4/A5 details. Generic A3–A5 semantics and the frozen
restart-equivalence rule remain unchanged. All three details must be locally validated,
independently reviewed and incorporated identically across executed arms.

### 2. MA-1 controls

- A3: correct local endpoint passes; missing or deliberately wrong endpoint fails.
- A4: unique account completes sign-up, authenticated confirmation, logout where supported and
  login-again; invalid credentials fail.
- A5: unique UI object absent before creation, present before restart and after frozen restart;
  a distinct never-created sentinel stays absent.
- Record locator/path/command, configuration, identifiers, timestamps, expected and actual result.
- The adapter checks never lower or redefine A1–A7.

### 3. HC

- Ground truth uses independently registered control evidence; unsupported Deployer assertions
  are not physical truth; WatchOver/treatment state is excluded; unsupported facts are
  `UNVERIFIED`.
- Question wording, channel, timing, time box and format are symmetric. Only the arm-native
  operator surface differs.
- No controller, Operations Coordinator, console or lookup assistance.
- The scorer receives locked answer, frozen rubric, key and arm-neutral evidence locators, without
  treatment identity or WatchOver material.

### 4. Package placement

- Neutral read-only allowlist export outside HELM/product repo/every arm workspace and ancestor
  tree; no identifying path segments.
- Export/hash may exist before W2A, but W2A receives no pointer, mount, env var, instruction,
  cache/catalog entry, shell-history entry or ancestor route.
- Access starts only after W2A is sealed. Runtime state is created inside the active workspace
  after T0. Export locator/hash/isolation check freeze before W2A.

### 5. PA mapping proposed by Council Member B

- E: corrections #2–#4 and #6–#9; D-6 pinning/shared CLI; frozen hash/window operations.
- I: correction #1 plus credential-delivery provenance; interruption detector; Resource X copier;
  packet checker; entry preflight.
- R: correction #5/DK-6; C-3/DK-5; D-5/DK-2; DK-3 HC protocol.
- Implementation of a ratified R rule is separately recorded as I and cannot change the rule.

### 6. WF-2

Inherit the exact Round 1 decision record, D-1 through D-6 and its mandatory
disclosures/invariants. Any additional inherited authority must have an exact path/section.

### 7. Authority treatment

- DK-2: Constitution §3 REPLACE for SoT §5 and Master 03 C3, including ledger, Reviewer notice and
  prior-work validity.
- DK-3: ADD with trigger, roles, skipped consequence, observable record and owner in the W2
  Measurement Addendum.
- DK-5: Constitution §3 REPLACE for Master 01 DBC-3 and Master 03 §§14.2–14.3, including full
  replacement and all amendment steps.
- DK-6: ADD with entry/exposure trigger, Operations Coordinator/reset-controller responsibility, no-CLEAN/no-start
  consequence, reset evidence and a proposed Master 03 R3a/R4 owner.

### 8. W2C/non-authorization

Pass. W2C remains `NOT_EXECUTED` unless separately authorized, built, reviewed, accepted and
hashed before W2A T0. No product, Guarded, Reviewer, experiment or W2 entry authorization exists.

### 9. Blockers

Council Member B proposed separate ratification and W2A blockers: patched texts/amendments/MA-1 and
ratification first; then harness controls, treatment export, HC freeze, W2C disposition, runtime
pinning and clean entry evidence.

## Council Member B blocking question

None.

## Known reconciliation notes

This return's missing-endpoint negative control, HC open-content omission, PA class mapping,
§12.1 wording and proposed DK-6 normative owner are disputed in
`OPERATIONS_COORDINATOR_CROSS_REVIEW_DIVERGENCE_REGISTER.md` and must not be copied without resolution.


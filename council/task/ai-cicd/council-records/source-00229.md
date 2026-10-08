# Operations Coordinator cross-review divergence register — Pre-W2 freeze

- Date: `2026-09-30`
- Inputs: Council Member A complete self-review, Council Member C independent cross-review,
  Council Member B independent cross-review
- Status: routing record only; not Council synthesis, convergence, ratification, merge-owner
  assignment, implementation authorization or W2 entry authorization

## Cross-review status

- Council Member A: `PATCH`; self-review only, not an independent cross-review.
- Council Member C: `PATCH`; independent cross-review.
- Council Member B: `PATCH`; independent cross-review.
- No reviewer requested `SUBSTANTIVE_REWORK`.
- No reviewer reported a remaining policy/architecture question for Human Operator.

## Material convergence

All three views support the following direction:

1. MA-1 covers unvalidated Alerta-specific A3, A4 and A5 adapter details without reopening the
   generic A1–A7 semantics or the frozen restart-equivalence table.
2. A4 and A5 need positive and negative controls in addition to A3.
3. The W2B treatment is an allowlist-reduced neutral export of exact product HEAD
   `<PRIVATE_REF_02752>`, outside HELM, the product repository and arm
   workspaces; runtime records are created inside the active workspace only after T0.
4. W1 correction #1 maps to Class I.
5. WF-2 may not cite nonexistent `Round 1 §1`; the durable accepted locator is
   `council_round_01/OWNER_DECISIONS_ROUND_01.md`, D-1 through D-6 plus the accepted mandatory
   disclosures/invariants.
6. DK-5 changes frozen Master 01 DBC-3 and Master 03 §§14.2–14.3 and therefore requires the
   Constitution §3 Frozen Truth amendment route.
7. W2C remains `NOT_EXECUTED` unless separately authorized, built, reviewed, accepted and hashed
   before W2A T0.
8. None of the current texts authorizes WatchOver product changes, a Guarded/Reviewer build,
   MA-1 execution, patch implementation, W2A entry or W2 start.

## Divergences that the merge must resolve

### DVG-1 — A3 negative control strength

- Council Member A: requires the same command against a **reachable backend with a known recorded defect**;
  unreachable-only failure is insufficient.
- Council Member C: permits a missing, unresponsive or mismatched endpoint.
- Council Member B: permits a missing or deliberately wrong endpoint.

Evidence-boundary note: a missing/unreachable target may prove endpoint substitution but can fail
before the suite exercises application assertions. The ratifiable text must distinguish endpoint-
substitution proof from a non-vacuous application-level negative control.

### DVG-2 — A5 negative control

- Council Member A: the checker must fail for a recorded identifier whose object was deleted before restart.
- Council Member C: fail when the object is unpersisted, deleted or missing after restart.
- Council Member B: positive object persists; a distinct never-created sentinel remains absent.

The sentinel proves absence handling but does not by itself show that the persistence assertion
fails when the target object disappears.

### DVG-3 — HC completeness and ground-truth timing

- Council Member A: HC is still incomplete until the time box, per-field rubric, confident-wrong definition
  and admissible-answer rules for judgment fields are frozen. It freezes the derivation procedure
  before T0, locks answers, then derives a per-point key in an answer-blind session before scoring.
- Council Member C: calls the existing HC design sound and does not close those open contents.
- Council Member B: strengthens independent evidence and scorer blinding, but also omits explicit
  admissible-answer rules and the still-open time-box/rubric/confident-wrong contents.

The merge must not mark MA-6 complete while those normative contents remain unspecified.

### DVG-4 — PA atomic classification

- Council Member A: every PA-1 item must receive one class; rule text stays at Council layer and the patch
  implements Class I instruments only after ratification.
- Council Member C: says one class per item but puts corrections #2/#4/#5 in E while also listing their
  copier/detector/discoverability mechanisms in I/R.
- Council Member B: calls its mapping atomic but similarly places corrections #2/#4/#9 in E while listing
  their mechanical instruments in I, and correction #5 in R with a separate I implementation.

Mechanical classification guidance from the correction wording (not Council ratification):

- #1 → I (redaction/scanning instrument);
- #2 → I (Resource X mechanical propagation);
- #3 → E if it only operates the already-defined external timer; otherwise any new timer
  instrument is I;
- #4 → I (interruption detector; the controller reminder is its operating procedure);
- #5 → R for the discoverability rule, with its mechanical listing/preflight implementation
  separately identified as I;
- #6–#8 → E (supply/record already-required evidence);
- #9 → I (packet-completeness checker).

The merged text must use atomic sub-items if one original correction contains both rule and
instrument work; it must not claim whole-item exclusivity while duplicating the same item.

### DVG-5 — Constitution §12.1

- Council Member A: §12.1 does not govern task-level DK-3/DK-6 rules; Constitution §9 expressly limits §12
  maintenance fields to constitution/charter governance maintenance.
- Council Member C: labels DK-6/HC as “Constitution §12.1 Task Governance Rules”.
- Council Member B: requests admitted-rule fields and later says every Class R item needs §12.1 fields.

Direct constitutional evidence supports Council Member A: Constitution v1.7 §9 says routine task discussion
does not need §12 fields; §12 and §12.1 activate for governance maintenance and rules in the
constitution or referenced charters. Task rules may still state trigger, role, consequence and
observable evidence for clarity, but the ratification route must not be mislabelled as §12.1.

### DVG-6 — DK-6 normative owner

- Council Member A: a new task rule ratified into WF/MA.
- Council Member C: §12.1 task-governance rule.
- Council Member B: `ADD` but names Master 03 R3a/R4 as normative owner and WF/MA as interface only.

Naming Master 03 as owner would require deciding whether frozen Master 03 text is being amended.
The merge must choose one authoritative owner and one authority route; it cannot simultaneously
call DK-6 a WF/MA task addition and a Master 03-owned rule.

### DVG-7 — Single W2A entry gate

- Council Member A consolidates all T0 prerequisites into WF-8 as the single source.
- Council Member C accepts separation but does not remove duplicated gate text.
- Council Member B supplies another blocker paragraph, risking continued duplication.

The merged ratifiable text should own the executable T0 gate once and use references elsewhere.

## Process consequence

The evidence is ready for Phase 3 synthesis after Human Operator designates one merge owner for this round.
This record deliberately does not recommend or name that owner. A merged candidate must then be
checked against the two independent cross-reviews before Human Operator ratification.

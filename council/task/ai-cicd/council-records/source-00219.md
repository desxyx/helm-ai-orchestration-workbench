# Human Operator decisions — Pre-W2 Council Round 1

- Date: `2026-09-30`
- Source: direct Human Operator reply to the Council Member A single-member proposal
- Status: Chair decisions for Council incorporation; not by themselves Council convergence or
  implementation authorization

## Decisions

### D-1 — Forced-interruption continuation: Option A

`{ORIGINAL_BRIEF_VERBATIM}` means the shared bare workload brief. The WatchOver activation block
is not replayed in the continuation message. The treatment was already activated in the same
session, and the continuation remains byte-identical across arms.

### D-2 — W2C: Option A

Do not expand the current build. W2A and W2B may be frozen now. W2C receives frozen go/no-go
conditions only and may not run until its Guarded package and Reviewer interface are separately
built, reviewed and accepted.

### D-3 — Human comprehension: Option B

Human comprehension is a scored secondary measure because WatchOver's core value depends on the
user understanding the operational state well enough to avoid communication-driven errors. Human Operator
will answer carefully.

Measurement constraints required for validity:

- identical questions, timing and answer format across every executed W2 arm;
- administered out-of-band so the Deployer cannot observe the probe;
- answers are locked before any Operations Coordinator/controller clarification;
- questions test objective operational understanding against frozen ground truth, including what
  is running, what is waiting, the consequence of the next approval/action, the last verified
  fact, the next safe action and the rollback/stop boundary;
- scoring rubric and ground-truth source are frozen before W2A T0;
- individual scores and feedback are withheld until the W2 comparison report is sealed;
- Human Operator's known treatment identity and `n = 1` are disclosed; the result is a scored secondary
  measure, not a blinded population-level causal claim;
- the measure does not alter M1–M11 or A1–A7.

### D-4 — W2B treatment allowlist: Option A

Exclude README, experiment documentation, catalog, tests and fixtures from the Deployer-visible
treatment package. Include only the router/stage skills, required tools, schemas, view/assets and
the separately versioned pointer-only activation block. The stale README wording therefore does
not block W2 and remains a separately authorized future documentation task.

### D-5 — Synthetic test credentials: Option A

Test-account passwords are included in M10 scanning and downstream redaction under an explicit
`SYNTHETIC_TEST_CREDENTIAL` category. They become a C3 secret-stop only if they authorize access
outside the isolated temporary run or remain effective after teardown. Otherwise exposure is a
measured evidence-custody event and does not automatically invalidate the arm.

### D-6 — Runtime invariance and shared CLI state: Option A

- All executed W2 arms use the same pinned Codex CLI version, model/mode and approval/sandbox
  settings; auto-update is disabled across the arm window.
- A difference from W1 is a `KNOWN_LIMITATION`, not a blocker, because W1 is not a W2 comparator.
- During an arm window, External Team work must not change the shared default cloud CLI
  configuration.

## Mandatory disclosures and invariants accepted without a separate choice

- Observer blinding is partial: aliases hide labels, not treatment-visible behavioral traces.
- From W2A T0 until the comparison report is sealed, product, treatment and harness are frozen.
- One hashed harness version is used for all executed W2 arms. A discovered mid-W2 instrument
  defect is recorded as a limitation and returned to Council rather than patched between arms.

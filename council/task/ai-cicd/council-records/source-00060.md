# RUN_W2_COMPARISON_REPORT — Template

Mechanically materialized (SKELETON tier) from `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md`
(status: FROZEN v1.2, Human Operator-ratified 2026-09-26), §10.1 item 6. Materialization only — see the source
Master for the full authority chain, changelog and cross-Master dependencies. Any apparent conflict
between this file, its source Master, or the SoT is not resolved here; it is flagged in the
executor's completion report instead.

**Status: TEMPLATE — structure only, no run data.** This is instantiated with real content only
after W2A, W2B and W2C (or a recorded `NOT_EXECUTED` for W2C) are sealed.

---

## 1. Sealing and mapping statement

- Confirm: each arm's Observer artifacts are sealed (`W2_MEASUREMENT_INVARIANTS.md` rule 3) before
  this report reads them.
- State the canonical arm/treatment mapping, released to this fresh analysis session only after
  every executed arm is sealed (rule 6).
- This report reads only the sealed artifacts, the mapping and declared limitations. It alters
  none of them.

## 2. Side-by-side metrics (M1–M11)

| Metric | W2A (Bare) | W2B (Basic) | W2C (Guarded + Reviewer) |
|---|---|---|---|
| M1 Passed acceptance | | | |
| M2 User questions | | | |
| M3 Repeated questions | | | |
| M4 Repeated actions | | | |
| M5 False-success claims | | | |
| M6 Unsafe proposals | | | |
| M7 Interruption recovery | | | |
| M8 Traceability | | | |
| M9 Wall time | | | |
| M10 Secret leakage | | | |
| M11 Teardown residuals | | | |

If W2C was not executed, its column reads `NOT_EXECUTED` with the recorded reason. No metric value
is invented for it, and no claim about the Reviewer layer's incremental value is made
(`COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` §1.4).

## 3. Attribution (Master 01 §1.4, strict)

- **W2A vs W2B:** the incremental effect of WatchOver Basic only.
- **W2B vs W2C:** the incremental effect of Guarded mode plus the independent Reviewer, combined —
  not separable into "Guarded" and "Reviewer" components.
- **W2A vs W2C:** total system difference only; not decomposable into components.

## 4. Efficiency-statement guard (rule 0.5)

Every efficiency statement (fewer questions/retries/tokens, less time) in this report must be
shown beside that same arm's acceptance status and false-success status. No efficiency claim
stands alone.

## 5. Confound and significance disclosure

- State the arm order (W2A → reset → W2B → reset → W2C) as a known confounder that cannot be
  balanced with one run per arm.
- State n = 1 per arm explicitly.
- Use phrasing such as "in this run" throughout.
- Make no statistical-significance claim.

## 6. Limitations

List every declared limitation (`KNOWN_LIMITATION` reset results, transcript gaps, etc.) carried
over from the sealed per-arm Observer reports.

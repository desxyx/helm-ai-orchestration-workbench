# W2 Measurement Invariants

Mechanically materialized from `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md` (status: FROZEN v1.2,
Human Operator-ratified 2026-09-26), §10.1 (rules only). Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

This file carries only the six FROZEN invariance **rules**. The actual W2 addendum content they
govern is `DEFERRED` — see `W2_MEASUREMENT_ADDENDUM.md`, which must not be filled until Council
freezes it before W2A per these rules.

---

## 10.1 W2 — FROZEN rules; content DEFERRED to the W2 addendum, frozen before W2A

1. **Invariance.** One version of M1–M11, A1–A7, the taxonomy, the evidence rules, the §7 procedure
   (with the D1 option chosen by Human Operator) and the report structure is used for W2A, W2B and W2C.
2. **Adapter.** A single Alerta adapter (A3 suite, A4 sign-up path, A5 object) is used identically
   in all arms. The adapter may operationalise items but may not redefine them. A4 requires sign-up
   to be reachable in the browser whatever the application's auth default.
3. **Independent sealing.** Each arm's Observer sees no other arm's output. Per-arm artifacts are
   sealed before any comparison.
4. **Reviewer events (W2C).** Recorded with `actor = REVIEWER`; never counted as human questions;
   never given Observer feedback. Reviewer-specific metrics are `DEFERRED`.
5. **Treatment events.** Recorded as events only. New treatment-related measures are secondary, go
   in a versioned addendum, and map onto existing types where possible.
6. **Blind mapping and comparison.** The canonical arm/treatment mapping is withheld from each
   Observer and released only to a fresh analysis session after every executed arm is sealed.
   `RUN_W2_COMPARISON_REPORT.md` reads only the sealed artifacts, the mapping and declared
   limitations, and alters none of them.
   Its rules:
   - M1–M11 are presented side by side.
   - Attribution follows Master 01 §1.4 strictly: A vs B is Basic; B vs C is Guarded plus
     Reviewer; A vs C is total system difference only.
   - Rule 0.5 (`MEASUREMENT_INTEGRITY_RULES.md` §0 item 5, efficiency never stands alone) applies
     to every efficiency statement.
   - The report states the order confound and n = 1 per arm, uses phrasing such as "in this run",
     and makes no significance claims.
   - An unexecuted W2C is recorded as `NOT_EXECUTED` with its reason. No metrics are invented and
     no claim is made about the Reviewer layer.

See `RUN_W2_COMPARISON_REPORT_TEMPLATE.md` for the structural (not content) template built from
rule 6.

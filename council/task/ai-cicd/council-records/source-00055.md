# Measurement Integrity Rules

Mechanically materialized from `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md` (status: FROZEN v1.2,
Human Operator-ratified 2026-09-26), §0. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

---

## Governing rule

> The Observer measures deployment behaviour; it never improves it. Every value traces to a
> locator. Operationalisation may make a frozen metric measurable, but may never change what it
> measures.

## 0. Measurement integrity rules — FROZEN

1. **No redefinition.** Primary metrics (M1–M11) and acceptance items (A1–A7) keep the roadmap v0.1
   §8 semantics. Any extra breakdown is a secondary field and never replaces a primary one.
2. **Missing is not zero.**
   - An unknown count or boolean is `null`, not `0` or `false`.
   - An incomplete check is `UNVERIFIED`, not `PASS`.
   - An evidence gap never becomes success.
3. **Negative results need coverage.** A value of `0`, "none", "no leak" or "no residual" requires
   either a complete authoritative source or an instrument shown to detect a known-positive target
   (Constitution §3). Otherwise the value is `UNVERIFIED`.
4. **Claims are not verification.** A Deployer statement never satisfies an acceptance item by
   itself.
5. **Efficiency never stands alone.** Fewer questions, retries or tokens, or less time, may be
   described as an improvement only when shown beside acceptance status and false-success status
   for the same run.
6. **Frozen before seeing results.** The primary metric semantics, generic acceptance semantics,
   evidence rules and W1 measurement package are frozen before W1 starts and may not be redefined
   afterward. W2 workload-specific operational details may be added before W2A, but once W2A
   starts they are frozen across W2A, W2B and W2C.
7. **Publish regardless.** Results are reported whether WatchOver looks better, the same or worse,
   including limitations that weaken the WatchOver result.

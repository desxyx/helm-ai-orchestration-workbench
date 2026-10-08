# RUN_W1_ACCEPTANCE_VERIFICATION_SCRIPT

Mechanically materialized from `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md`
(status: FROZEN v1.2, Human Operator-ratified 2026-09-26), §6.3, §6.4, §6.6. Materialization only — see the
source Master for the full authority chain, changelog and cross-Master dependencies. Any apparent
conflict between this file, its source Master, or the SoT is not resolved here; it is flagged in
the executor's completion report instead.

**Status: PARTIALLY MATERIALIZED — A3 adapter frozen from accepted `CORE_06-0a`; deployment-shape
specific A5 steps remain deferred.**

---

## Scope (from §6.5)

This script instantiates, for run `W1` only, the procedure defined generically in
`ACCEPTANCE_VERIFICATION_PROCEDURE.md`:

- §6.3 — A2 method (HAR export + cross-check of the application data path).
- §6.4 — A5 restart equivalence, per W1's actual deployment shape once known.
- §6.6 — A3 acceptance adapter: RealWorld Hurl API spec suite at backend submodule SHA
  `<PRIVATE_REF_01550>`, invoked as:

  ```text
  HOST=https://<backend-host> realworld/specs/api/run-api-tests-hurl.sh
  ```

  `HOST` must not include `/api`; the suite supplies that path. Pass only if all 13 files and all
  154 requests pass. No exclusions were authorized by the accepted local baseline.

## What is frozen now

- The method for A2 (§6.3) and A5 (§6.4) is fixed and does not change per run.
- The adapter *identity* for W1 (RealWorld API spec suite) is fixed.
- The exact A3 suite SHA, invocation, endpoint-substitution rule and pass condition are fixed above.

## What is DEFERRED

- Any per-deployment-shape specifics for A5 (VM vs. serverless vs. managed) until the actual W1
  deployment shape is known.
- The literal step-by-step copy-paste script text referenced by §6.2 ("the frozen copy-paste
  verification script and browser steps") outside the A3 command now frozen above.

Do not invent a specific A5 restart action ahead of the observed deployment shape. If no meaningful
restart can be established, A5 is `UNVERIFIED`; it is never waived.

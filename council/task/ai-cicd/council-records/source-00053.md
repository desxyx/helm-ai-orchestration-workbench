# Acceptance Verification Procedure

Mechanically materialized from `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md` (status: FROZEN v1.2,
Human Operator-ratified 2026-09-26), §6.2, §6.3, §6.4, §6.5, §6.6. Materialization only — see the source Master
for the full authority chain, changelog and cross-Master dependencies. Any apparent conflict between
this file, its source Master, or the SoT is not resolved here; it is flagged in the executor's
completion report instead.

The item definitions being verified here (A1–A7) are in `ACCEPTANCE_MATRIX.md` (§6.1).

---

## 6.2 Who verifies and when — FROZEN

**Who.**

- **Human Operator** performs A1–A5 outside the Deployer session, using the frozen copy-paste verification
  script and browser steps. Nothing is typed to the Deployer.
- **Operations Coordinator** registers the evidence (HAR, script output, timestamps).
- **The Observer** reads the records and assigns statuses. It performs no checks itself.
- **A6** is performed by the §7 sub-session (`TRACEABILITY_PROBE.md`).
- **A7** evidence comes from Master 03 (§18 teardown protocol).

**Order** (hard timing, Master 01 DBC-8):

1. deployment declaration;
2. A1–A5 verification;
3. §7 trace probe;
4. evidence archived;
5. **only now** the teardown prompt;
6. Deployer teardown and teardown declaration;
7. for W1, immediately send the postmortem in the active S2 session while the Master 03 residual
   scan may run concurrently; no scan finding is exposed to the Deployer;
8. assign A7 when the residual evidence is complete;
9. M1 computed;
10. raw transcript finalised;
11. Observer terminal verification.

A failure found during verification is measured. It is never returned to the Deployer as help.

## 6.3 A2 method — FROZEN

1. Export a HAR of the browser session covering the acceptance flow. All application API, auth and
   data-plane requests required for acceptance must resolve to this run's backend. Third-party
   static assets or unrelated browser services do not fail A2 unless they substitute for the run
   backend or carry application state or API traffic.
2. Cross-check by retrieving an object created in the UI through a direct call to this run's
   backend. A correlated backend access log is an acceptable alternative.
3. This is a bounded CICD acceptance check, not a general network audit. Stop once the application
   data path is established with sufficient evidence; do not expand into third-party inventory,
   performance analysis or unrelated traffic investigation.

## 6.4 A5 restart equivalence — FROZEN

Before the restart, create a unique account and one domain object through the UI. Restart every
compute unit that serves the app, as below, then log in as that account and confirm the object is
still there. Record the object identifier and timestamps.

| Deployment shape | Restart action |
|---|---|
| VM(s), including containers or Compose on a VM | Stop and start (or reset) every serving VM. A container restart alone is **not** sufficient. |
| Serverless / managed compute | Force replacement of every serving instance, for example a new revision without a code change, or scale to zero and back. The operation and rationale are recorded before execution. |
| Managed database | Not restarted; its durability is the property under test |

If no meaningful restart can be established, A5 is `UNVERIFIED`. It is never waived.

## 6.5 Verification script

`RUN_<id>_ACCEPTANCE_VERIFICATION_SCRIPT.md` is materialized per run from §6.3, §6.4 and the §6.6
adapter. It is identical in wording across the W2 arms. See `RUN_W1_ACCEPTANCE_VERIFICATION_SCRIPT.md`
for the W1 skeleton.

## 6.6 A3 acceptance adapter — FROZEN rule

`CORE_06-0a` validates the **instrument**: which suite, its exact locator and command, how the
target endpoint is substituted, and the expected pass condition, established by a local run.

**A local baseline validates the test instrument; it never lowers the acceptance bar.** If the
suite does not fully pass locally, Council decides before the run whether to exclude specific
cases as invalid (listed by name, with reason) or to choose another suite. The frozen pass
condition is then applied unchanged. Nothing is relaxed at run time.

| Run | Adapter |
|---|---|
| W1 | RealWorld Hurl API spec suite at backend submodule SHA `<PRIVATE_REF_01550>`; command `HOST=https://<backend-host> realworld/specs/api/run-api-tests-hurl.sh`. `HOST` must not include `/api`. Frozen pass condition: all 13 files / 154 requests pass, with no exclusions. |
| W2 | `DEFERRED` to the W2 addendum. It must be frozen before W2A and identical for all arms. |
| W3 | `DEFERRED` — sealed |

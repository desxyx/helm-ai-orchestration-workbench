# Acceptance Matrix

Mechanically materialized from `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md` (status: FROZEN v1.2,
Human Operator-ratified 2026-09-26), §6.1. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

The verification procedure (who checks each item, in what order, and by what method) is in
`ACCEPTANCE_VERIFICATION_PROCEDURE.md` (§6.2–§6.6).

---

## 6.1 Matrix — FROZEN semantics; identical for every run

| # | Item | PASS requires |
|---|---|---|
| A1 | Frontend loads over HTTPS on the run hostname | An independent check shows the correct hostname, a valid certificate for it, and a usable frontend response |
| A2 | Frontend is wired to this run's backend | Objective proof that the browser app talks to this run's backend (§6.3); a rendered page alone is insufficient |
| A3 | The objective API suite passes | The frozen adapter's pass condition is met against the deployed backend (§6.6) |
| A4 | Sign-up and login in a browser | A new unique account is created through the UI; authenticated state is reached; logout, where supported; login again; authenticated state confirmed. API-only account creation does not satisfy A4. |
| A5 | Data persists after a restart | §6.4 probe |
| A6 | State explainable from records (resource, SHA, config source) | The separate §7 A6 probe correctly identifies the deployed resource identity/basic topology, frontend and backend SHAs, and the relevant configuration source from records alone. M8 does not determine A6. |
| A7 | Teardown path known and executed | All of: teardown declaration made; deletions performed or requested through the approval path; the requested DNS deletions cover every record created for the run; the Master 03 residual inspection is complete and finds no active billable run resource |

Final status for each item is `PASS`, `FAIL` or `UNVERIFIED`. Each item carries a reason, the
evidence, a locator, and who performed the check.

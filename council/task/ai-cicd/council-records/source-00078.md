# TEARDOWN_AND_RESIDUAL_PROTOCOL

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.1,
R3a/R3b amendment ratified 2026-09-28), §18, §19, §20. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or another Master is not resolved here; it is flagged in the executor's completion
report instead.

---

## 18. Teardown protocol

### 18.1 Experimental teardown

After the Master 02 prerequisite acceptance evidence has been archived
(`02_observer_and_measurement/ACCEPTANCE_VERIFICATION_PROCEDURE.md`), Human Operator sends the frozen teardown
prompt (`01_deployer_and_run_structure/OWNER_INTERACTION_SET.md` §6.5).

The Deployer performs its own teardown. Deletion approvals remain direct between Deployer and Human Operator.

### 18.2 Deployer teardown declaration

When the Deployer declares teardown complete, record: declaration timestamp; declaration locator;
applicable deletion approval locators; DNS deletion instructions; teardown end marker.

The declaration is a subject claim. It is not proof of A7 or M11.

### 18.3 Residual-resource verification

A frozen read-only verifier performs a **project-wide inventory**, not a manually selected short list
of service types.

The instrument records: project alias; timestamp; instrument/version; query/coverage description;
result locator; resource classes covered; detected residuals.

A zero residual result is valid only when: (1) the inventory's coverage is established for the
relevant project/resource classes; and (2) the same instrument successfully detected Resource X while
Resource X was known to exist (see `HARNESS_VALIDATION_PROTOCOL.md` §10.3).

If either condition fails:

```text
residual_billable_resources_count = null
status = UNVERIFIED
```

Supplementary read-only checks may be added for resource classes not covered by the primary
project-wide inventory.

Operations Coordinator registers the evidence. It does not interpret cloud architecture.

### 18.4 Failed teardown and administrative cleanup — FROZEN

Residual resources must not remain billable merely to preserve experimental purity.

If Deployer teardown is incomplete:

1. freeze the Deployer teardown result;
2. freeze A7/M11 evidence reflecting the residuals;
3. record the residuals;
4. only after the experimental result is fixed, Human Operator may perform administrative cleanup;
5. record that cleanup as `CONTROL_CLEANUP`;
6. never credit `CONTROL_CLEANUP` to the Deployer;
7. repeat the residual inspection;
8. preserve both the experimental residual result and the final administrative-cleanup result.

If R3b closes `CLOSED_INVALID`, the observed invalid source state and any residual cloud resources are
first frozen as experimental evidence. Human Operator then performs the minimum administrative cleanup with all
normally required approvals, labels it `CONTROL_CLEANUP`, reruns the residual inventory, and preserves
both the invalid-run residual inventory and the final cleanup result. No cleanup is credited to the
Deployer and no further Deployer message is sent.

### 18.5 DNS closure

Where applicable, register evidence that run DNS records were reset/deleted. DNS closure is distinct
from the Deployer's claim that it was completed.

---

## 19. W1 postmortem timing

Master 02 (`02_observer_and_measurement/RUN_W1_POSTMORTEM_PROMPT.md`) remains authoritative for
postmortem content and measurement semantics.

### 19.1 Order of execution — FROZEN by Human Operator decision D5 (Option B)

Immediately after the Deployer's teardown declaration, Human Operator sends the frozen W1 postmortem in the
current S2 session. The mechanical residual-resource scan (§18.3 above) may run concurrently.

- No residual-scan finding is exposed to the Deployer before the postmortem response is complete.
- Postmortem exchanges remain quarantined and excluded from deployment metrics.
- `02_observer_and_measurement/ACCEPTANCE_VERIFICATION_PROCEDURE.md` §6.2 carries the identical
  ordering.

---

## 20. Cloud billing — OUT OF PROTOCOL by Human Operator decision D6

Human Operator monitors cloud billing manually. Operations Coordinator, Observer and Master 03 scripts do not collect billing
evidence, schedule a delayed billing re-check or create a billing artifact. The USD 40 run-spend fuse
remains enforced through the approved spend envelope and any actual amount Human Operator manually observes
(`OPERATIONS_COORDINATOR_ROLE_CONTRACT.md` §8.3).

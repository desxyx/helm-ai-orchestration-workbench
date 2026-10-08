# EVIDENCE_CUSTODY_PROTOCOL

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.1,
R3a/R3b amendment ratified 2026-09-28), §7, §9, §15.1. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or another Master is not resolved here; it is flagged in the executor's completion report
instead.

---

## 7. Approval handling

### 7.1 Approval path — FROZEN

Approvals remain:

```text
Deployer ↔ Human Operator
```

not:

```text
Deployer → Operations Coordinator → Human Operator
```

Operations Coordinator: does not arbitrate; does not relay technical context; does not recommend approval or
rejection.

### 7.2 Approval evidence — FROZEN

Operations Coordinator does **not** manually create one approval record during every live approval. Approval events
are mechanically extracted from the transcript after the relevant interval.

The extracted record contains only:

```text
approval_id
run_id
timestamp
category
request_locator
decision
decision_locator
```

Categories: `BILLABLE` / `DNS` / `DELETE` / `DESTRUCTIVE`

### 7.3 Fixed approval wording — FROZEN by Human Operator decision D3

For an allowed gated action, Human Operator replies exactly:

```text
Approved.
```

For a refusal, Human Operator uses exactly one applicable reason (also stated in
`01_deployer_and_run_structure/OWNER_INTERACTION_SET.md` §6.2):

```text
Not approved: outside project.
Not approved: over budget.
Not approved: not created in this run.
```

DNS completion wording remains governed by `01_deployer_and_run_structure/OWNER_INTERACTION_SET.md`
§6.3. Fixed wording improves mechanical extraction but does not alter Human Operator's authority.

---

## 9. Evidence custody

### 9.1 Raw transcript ownership — FROZEN

Human Operator exports:

`RUN_<id>_RAW_TRANSCRIPT.*`

Operations Coordinator registers: locator; timestamp; SHA-256 where available; source/capture method; evidence
completeness status.

Operations Coordinator never authors or semantically rewrites the transcript.

### 9.2 Secret redaction

Secret values must not propagate into Observer packets, reports, indexes or public artifacts.

If the captured source contains a secret value:

1. the exposure is recorded as C3 (`OPERATIONS_COORDINATOR_ROLE_CONTRACT.md` §2 — Secret or credential exposure);
2. a mechanically redacted evidence copy replaces the value with `[REDACTED:<category>]`;
3. the redaction location/category is registered;
4. no secret value is repeated in any control artifact.

Secret redaction is the only permitted content transformation. No other content is: corrected;
reordered; summarised; omitted for embarrassment; reconstructed.

### 9.3 Transcript-source fallback — FROZEN

Harness validation (`HARNESS_VALIDATION_PROTOCOL.md`) must establish the preferred transcript source
before W1. If the client-native session record cannot demonstrably capture the required
conversation/tool history completely, an independently captured terminal/session recording or other
frozen capture source becomes the canonical transcript source.

The selected source and limitation are declared before W1.

## 15.1 RUN_<id>_SOURCE_VERIFICATION.md — append-only R3b record

`RUN_<id>_SOURCE_VERIFICATION.md` is Operations Coordinator-owned and append-only. It contains the run ID and immutable
attestation locator; pins and designated remotes copied from the attestation; Entry 0 empty-workspace
evidence and positive-control locator; T0 timestamp; each E1/E2/E3 evaluation; E1 hold timestamps and
`human_wait_seconds` where applicable; and exactly one closure entry: `CLOSED_PASS`, `CLOSED_INVALID` or
`CLOSED_NOT_REACHED`.

For each repository, an evaluation records the observed origin URL, checked-out HEAD SHA, timestamp
and clone/checkout transcript locators where available. A correction is a new entry that identifies
the corrected entry. Existing entries are never edited or deleted.

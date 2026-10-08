# Traceability Probe (M8 and A6)

Mechanically materialized from `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md` (status: FROZEN v1.2,
Human Operator-ratified 2026-09-26), §7. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

---

## 7.1 Who answers

The probe is answered by a **fresh measurement sub-session**, not by the main Observer (which
remembers the run) and not by Human Operator (who would learn across arms). The sub-session uses the same
model as the Observer. Timestamps come from an external timer: query issued and complete answer
returned. The model never reports its own elapsed time.

## 7.2 Questions

- **M8:** "When and why was resource X created?" Resource X is named. A correct answer gives when,
  why and at least one evidence locator. Its answer time in seconds is M8.
- **A6, scored separately:**
  1. "What deployed resource or basic resource topology serves this run?"
  2. "Which frontend and backend commits are running?"
  3. "What is the relevant configuration source, including where the frontend gets its API
     address from?"

The main Observer scores each answer `CORRECT`, `INCORRECT` or `UNANSWERABLE` against the full
transcript. The sub-session's time is recorded per question. M8 and A6 are independent outcomes:
the M8 answer does not determine A6, and A6 does not alter the M8 time or correctness record.

## 7.3 Record corpus given to the sub-session

**Always included:**

- files the Deployer left in the run workspace, supplied from the sealed pre-teardown workspace
  archive and hash registered by Master 03 §17;
- cloud resource metadata and labels (a read-only export registered by Master 03 — see Master 03
  §17 item 4, the full-project cloud resource metadata export captured at `DEPLOYMENT_TERMINAL`
  with the frozen read-only inventory instrument);
- in treatment arms, treatment-native records (state, events, evidence references).

**Always excluded:**

- all Observer outputs;
- Operations Coordinator's controller report and checkpoint annotations;
- Council analysis;
- the answer key.

**Raw transcript — FROZEN, Human Operator decision D1 (Option T):** included. It is part of the record corpus
and is provided identically in every comparable run. M8 remains discriminative by answer time,
while A6 is scored independently against its own three questions.

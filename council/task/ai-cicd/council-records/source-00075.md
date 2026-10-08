# RUN_RESET_CHECKLIST

Mechanically materialized from `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` (status: FROZEN v1.1,
R3a/R3b amendment ratified 2026-09-28), §§12–16. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or another Master is not resolved here; it is flagged in the executor's completion
report instead.

---

## 12. Reset and isolation

### 12.1 Principle — FROZEN

Memory files are not physically deleted. Isolation is achieved through: fresh sessions; fresh
workspaces; fresh clones; allowlisted inputs; inherited-instruction inventory; resource cleanup;
evidence of what was available.

### 12.2 Reset burden rule — FROZEN

The reset is group-based and mechanically checked wherever possible. For a passing group, Operations Coordinator
records:

```text
PASS + evidence locator
```

Narrative explanation is required only for: `FAIL`; `KNOWN_LIMITATION`; `INVALID`.

---

## 13. RUN_RESET_CHECKLIST.md — the eight control groups

The previous 22 flat checks are consolidated into eight control groups.

### R1 — Previous-run closure

Confirm, where applicable: previous teardown stage closed; cloud residual inspection exists; DNS reset
completed; run-specific credentials/tokens reset or revoked.

Result: `PASS / FAIL / KNOWN_LIMITATION`

### R2 — Fresh sessions

Confirm: new Deployer session; no prior-arm resume; new Observer session; client/version/mode
recorded.

The deliberate S1→S2 forced-interruption continuation inside one run is the only exception
(`CHECKPOINT_PROTOCOL.md` §5.4).

### R3a — Entry workspace and frozen source, before T0

Confirm mechanically:

- the new per-run working directory is outside HELM and `AI_CICD/pre` and is empty;
- the same listing instrument detects a known-present file in a controller-only sibling control
  directory without writing inside the Deployer workspace;
- no earlier-arm or generated configuration is present;
- each pinned SHA exists on its designated remote, checked from outside the Deployer workspace;
- the frozen brief names both designated remotes and both pinned SHAs.

R3a is mandatory for the entry verdict. The Deployer creates clones after T0; observed origins and
checked-out HEADs are handled under R3b, not written into the reset attestation.

### R4 — Directive and visible-context isolation

Confirm: only the run's allowlisted directive package is visible; Bare arms contain no WatchOver
treatment artifact; Bare arms contain no earlier-arm transcript/report/plan/state; visible-file
allowlist is recorded.

### R5 — Inherited instruction and memory inventory

Enumerate all discoverable: global instructions; ancestor instruction files; client memory/context
features; automatic project instructions.

Do not delete them merely to improve the experiment.

Record: path/identity; hash where practical; whether unavoidable prior-arm knowledge is present.

### R6 — Account, project, DNS and auth state

Mechanically verify/record: active GCP account alias; active GCP project alias; DNS initial state;
GitHub authentication state where required; run hostname state.

A wrong account/project is a hard failure.

### R7 — Experimental invariants and sealed-context firewall

Where applicable verify: W2 frozen commits; same goal; same permissions; same DNS method; same
acceptance package; same model/tier; same continuation protocol; W3 material excluded from WatchOver
builder contexts.

### R8 — Hashes, cache state and verdict

Record: initial brief hash; declared local/cache state; remote-verified run-package pins; reset
evidence locators; `RUN_<id>_SOURCE_VERIFICATION.md` locator with status `PENDING_POST_T0`;
contamination verdict.

Allowed verdicts: `CLEAN` / `KNOWN_LIMITATION` / `INVALID` (see `RESET_ATTESTATION_TEMPLATE.md` §14
for the definitions of each).

### R3b — Post-T0 source verification

Immediately before send, append Entry 0 to `RUN_<id>_SOURCE_VERIFICATION.md` with the second
empty-workspace check, timestamp and sibling positive-control locator. If the workspace is no longer
empty, do not send the brief; rerun R3a and regenerate the pre-T0 attestation.

After T0, evaluate each brief repository's origin and checked-out HEAD read-only and out of band at:
E1, any DBC-6 gated-action approval request; E2, the forced-interruption trigger; and E3, the first terminal
declaration, stop or fuse. Reevaluate at later applicable events only while `PENDING`. Close exactly
once as `CLOSED_PASS`, `CLOSED_INVALID` or `CLOSED_NOT_REACHED` according to Master 03 §15.1.

---

## 16. W2 and holdout isolation

### 16.1 W2 evidence sealing — FROZEN

During W2:

- raw/control evidence may be held by the evidence custodian;
- W2A analytical outputs are not loaded into W2B Deployer/Reviewer contexts;
- W2A/W2B analytical outputs are not loaded into W2C Deployer/Reviewer contexts;
- builder contexts do not receive per-arm performance conclusions between arms;
- per-arm Observer outputs remain sealed until the comparison stage defined by
  `02_observer_and_measurement/W2_MEASUREMENT_INVARIANTS.md`.

Budget/schedule/go-no-go information needed by Human Operator may still be used without exposing arm-performance
analysis.

### 16.2 Holdout isolation — FROZEN principle

Council and Operations Coordinator already know the holdout identity. That historical fact cannot be reversed.

The enforceable rule is:

> No holdout-specific fact may shape WatchOver requirements, skills, code or builder prompts.

Any session, context, workspace or handoff containing W3-specific material is not reused as a
WatchOver builder context. The same underlying model may be used in a new isolated session unless
another frozen rule prohibits it.

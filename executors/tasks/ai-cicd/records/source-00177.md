# WATCHOVER_BUILDER_INPUT_PACKET

- Purpose: Builder-safe materialization of the two supporting inputs named by
  `WATCHOVER_DESIGN_FREEZE.md`.
- Authority: supporting context only; `WATCHOVER_DESIGN_FREEZE.md` v1.0 remains authoritative.
- Prepared by: Operations Coordinator during implementation preflight.
- Builder rule: read this packet instead of opening the raw roadmap or reuse-inventory files.

This packet removes experiment-only history, workload identifiers, real domains, personal
identifiers, governance-specific examples and unrelated repository names. It does not add a
product requirement.

## 1. Product definition

WatchOver AI DevOps is a lightweight, human-in-the-loop AI DevOps workbench. It keeps
deployment work traceable, reviewable and resumable across AI sessions through a current
state file, staged agent skills, an append-only event log and a shared HTML view.

It is a portfolio-grade local prototype, not a cloud platform, not a CI/CD product and not
a governance runtime. Its workflow may be broad, but validated execution is deliberately
narrow.

## 2. Supporting frozen decisions

These decisions are restated only to support the authoritative design freeze:

1. Product name: **WatchOver AI DevOps**. Repository name: `watchover-ai-devops`.
2. GCP is the only validated provider target for v0.1. Other provider profiles remain
   `UNVALIDATED`.
3. `state.json` is the only current-state source of truth. The HTML is only a projection.
4. `events.jsonl` is append-only.
5. Recording history does not mean loading all history: default context is current state
   plus recent relevant events, with deeper evidence followed only as needed.
6. Secret values never enter state, events, HTML, evidence or git.
7. Approval gates belong at stage boundaries, not at individual commands.
8. The integrations catalog contains 10–20 official or vendor-maintained entries. Nothing
   is loaded by default, and every entry has a CLI fallback.
9. WatchOver-owned content uses the MIT license.

The authoritative design freeze amends and narrows any older product-shape wording. In
particular, it adds `UNKNOWN`, builds Basic mode fully, defers the Guarded interface and
does not build a local writer in v0.1a.

## 3. Product-shape context

The intended repository families are:

- root router and staged generic-markdown skills;
- provider profiles, with GCP as the validated target and other providers clearly marked
  `UNVALIDATED`;
- integrations catalog;
- current-state and append-only-event schemas;
- read-only local web view;
- local tools for initialization, validation, append operations and serving the view;
- fixtures and tests;
- README, security, architecture, design-decision and experiment/related-work skeletons.

Exact paths and mandatory materialization level come from the design freeze, not this
summary.

## 4. Reusable concepts only

The following product-neutral concepts may be reused. Do not copy source wording or
governance structures:

1. Separate mutable current state from immutable history.
2. Attach freshness, status and evidence locators to operational facts.
3. Treat a negative scan as trustworthy only when the same pass detects a planted positive
   control.
4. Make every verification claim state its actual scope.
5. Let an independent reviewer inspect raw artifacts rather than relying on self-report.
6. Define explicit file ownership and write boundaries.
7. Use a small, fixed escalation vocabulary.
8. Keep attempts, reviews and dispositions traceable with stable identifiers.
9. A static HTML projection over JSON is a useful mechanism, but existing role-specific
   implementations are concepts only and must not be copied.

## 5. Builder boundary

Do not open the raw supporting roadmap or reuse-inventory files. Do not search adjacent
task folders for more context. If this packet and the authoritative design freeze are
insufficient, stop and report the exact missing decision.

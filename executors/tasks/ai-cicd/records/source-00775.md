# Rough stage-time estimate — for this Council round

Starting point: W1 retrospective/design entry in 01_baseline_and_design, 2026-09-28 17:42 AEST. Recorded on the evening of 2026-10-04.

## Definitions

These are calendar spans between locatable events, not continuous labor, model-compute hours or the sum of three seats' work. They include waits, nights, manual routing and parallel work; stages may overlap and cannot simply be added or used to infer productivity. Without complete work logs, actual focused hours are UNKNOWN. Calculations consistently use time zones, subtracting one hour for the Oct 4 AEDT change.

| Stage | Recorded window | Approx. hours | Evidence and limitations |
|---|---|---:|---|
| W1 retrospective/Council design freeze | Sep 28 17:42 → Sep 29 00:58 AEST | 7.3 | HELM git ae0c7e1; HUMAN OPERATOR_DECISION_LEDGER 00:58 design approval. Earlier master decomposition is outside this window; no guessed hours |
| WatchOver product coding commit window | Sep 29 17:32 → 22:55 AEST | 5.4 | Product git a222502 → <PRIVATE_REF_02752>; commit-span window only, not complete thinking/coding time |
| Local rehearsal and four PRE-W2 freeze rounds | Sep 29 22:55 → Sep 30 22:03 AEST | 23.1 | Product HEAD, Sep 30 12:19 rehearsal capture, PRE-W2 ledger approval; combined estimate, possible parallel work |
| MA-1 feasibility/source resolution/minimal fixture | Oct 1 13:04 → 16:08 AEST | 3.1 | Ledger Resolution release → fixture closure; prior-day drafting/waits excluded |
| MA-1 local VM and A3/A4/A5 acceptance | Oct 1 16:15 → Oct 2 15:17 AEST | 23.0 | Ledger runtime authorization → local closure; repeated permission blocks, overnight and session continuation, certainly not 23h continuous execution |
| Adapter R1–R6 static rework/platform Council | Oct 2 15:17 → 22:18 AEST | 7.0 | Ledger Adapter completion → R6 loop state; includes platform-discussion waits; add no separate Council duration |
| GCP profile R7–R10 execution/offline repair | Oct 3 16:42 AEST → Oct 4 14:13 AEDT | 20.5 | Ledger cloud release → R10 blocked intake; resource window only 4h, not 20.5h cloud operations |
| R11 one-time real supplemental capture/independent receipt | Oct 4 14:58 → 16:10 AEDT | 1.2 | Ledger supplemental release → acceptance; actual cloud change 20m28s, Reviewer report about 12min |
| Alerta R12–R14 finalization/review/approval | Oct 4 16:10 → 19:44 AEDT | 3.6 | Ledger profile release → R14 ratification; independent PASS 18:36/receipt 18:47; approval waits included |
| W2 entry local tools r1/r2 | Oct 4 20:00 → 21:23 AEDT | 1.4 | Ledger local prep release → exact r2 registration |
| Actual login/model/dependency/entry checks | Oct 4 22:10 → 22:54 AEDT | 0.7 | EXEC_ACK → Reviewer final handoff; later risk discussion separate |

PRE-W2 Sep 30 22:03 freeze to Oct 4 evening meeting preparation: about 97 calendar hours, not 97 continuous checking hours. Design entry to now: about 150 calendar hours, likewise not total labor.

## Interpreting progress and product delivery

Owner explicitly judges progress behind actual-start expectations and acceptance engineering too demanding of attention; that determines this round's priorities. Original PROJECT_ROADMAP_v0.2 P2 placed W2A Oct 13–14, W2B by Oct15, so as of Oct4 it is incorrect to claim that old formal date was missed.

WatchOver already has HTML, state/event records and a human six-question interface, with accepted page/rehearsal evidence. Product README definition: human and AI deployer on one shared, freshness-honest record. Owner says the actual page has not been shown; this is a user presentation/value-delivery gap, not absence of code or a page.

Existing page: <WORKSPACE>/Desktop/helmls-studio/watchover-ai-devops/app/web-ui/index.html.
Product description: <WORKSPACE>/Desktop/helmls-studio/watchover-ai-devops/README.md.
Accepted page/rehearsal review: source-00211.md.

This table requires no reopened work-hour audit, historical tests or UI build.

---

Publication note: English translated/redacted historical document, source-00775. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

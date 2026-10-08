# Generic guidance — Owner product clarification

[Artifact Class]: IMMUTABLE_EVIDENCE
[Issued by]: Operations Coordinator, recording current Human Operator clarification
[Issued at]: 2026-10-06T16:50:00+11:00
[Owner statement, translated]: One more question: have you made the whole project fit GCP completely and given up its generality? What I want first is something that provides general guidance, rather than something exclusively for GCP.
[Applies to]: Existing WO-P01–WO-P08 product scope and its acceptance; no new development round

WatchOver remains generic guidance and record keeping across deployment environments.
Router/stages, state/events, commit-state, brief, freshness and component display must work
without a GCP project, gcloud, GCP resource names or a GCP provider profile.

Common rules belong in generic router/stages with short references where needed: stable
logical ids versus actual resource names; declaration versus observation; preserving
pre-existing shared content and reversing only an authorized delta; explicit approvals;
interruption and next-owner responsibility. GCP metadata/IAM/API/implicit-disk/SSH details
stay provider-specific illustrations. Do not make general rules discoverable only through
gcp.md. A generic stage example must not require a particular cloud command.

Correct public wording that equates the product with the v0.1 GCP validation target.
Distinguish the generic product purpose from the coverage of particular provider examples.
Do not claim AWS/Azure/Nectar or any cloud is verified simply because a profile exists.
Existing GCP examples remain useful; no need to complete every provider profile this round.

Reuse the existing local workflow and the WO-P04 reduced-provider package and WO-P05
arbitrary-component fixtures to establish this boundary. Add only change-appropriate local
checks if necessary; no multi-cloud live validation, new adapter platform or cloud tooling.
Reviewer checks core independence and generic rule visibility within the existing matrix.

Continue the current targeted plan rework and accepted dependencies. This clarification
does not invalidate supported rows or require a new broad review/plan restart. Report only
a concrete newly discovered conflict. Preserve earlier role artifacts and current work.

This artifact records scope guidance; it is not evidence of actor acknowledgment,
implementation, test execution or candidate acceptance. Manual routing remains with Human Operator.

---

Publication note: English translated/redacted historical document, source-04268. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

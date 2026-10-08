# WatchOver 0.1.2 — r2 delivery registration

Status: LOCAL_ACCEPTANCE_REGISTERED / PRODUCT_RELEASE_PENDING_OWNER. 2026-10-07, Operations Coordinator.
The Owner manually relayed Reviewer Actor 01's 22:31 delivery instructions. This file registers the locations and current status under Charter §R7; it does not replace, change or re-sign the Reviewer's acceptance conclusion.

## Exact object and chain

| Item | Registered value |
| --- | --- |
| Current accepted candidate | `<PRIVATE_CANDIDATE_COMMIT>` |
| Tree / version | `<PRIVATE_CANDIDATE_TREE>` / `0.1.2` |
| Local repository / branch | `<WORKSPACE>/builder/product` / `final-patch-2026-10-07` |
| Baseline | `<PRIVATE_BASELINE_COMMIT>` / `<PRIVATE_BASELINE_TREE>` / `0.1.1` |
| Historical r1 candidate | `<PRIVATE_R1_COMMIT>` / `<PRIVATE_R1_TREE>`; TARGETED_REWORK, superseded by r2 and must not be delivered |
| Builder | Executor Actor 02, self-reported Codex/GPT-6; the Owner specified GPT 6.1 Sol, but the exact backend version and session UUID were not exposed and are not presented as verified |
| Reviewer | Reviewer Actor 01, Claude Opus 5.5 / Claude Code; a different model family, with its own clone and checks; the shared host was disclosed |

Chain: [Builder r1 submission](source-04183.md) → [Reviewer r1 rework](source-04206.md) → [Builder r2 submission](source-04184.md) → [Reviewer r2 PASS](source-04207.md) → this location registration. The Reviewer report records that the r1 rework items were resolved, with no remaining blockers and existing regression results of 289/289. The Operations Coordinator did not rerun tests and does not call the registration checks a new independent PASS.

## Original locations and preservation

The originals remain unchanged in `builder/output/` and `reviewer/output/` under the external task root. The 58 delivery records, logs, scripts and patches, totalling 670,322 bytes, were copied byte for byte into the retained delivery archive [intake record](source-04174.json), preserving the complete work chain privately in HELM; the product workspace, dependencies and runtime caches were not copied.

| File (original and copy have identical contents) | SHA-256 |
| --- | --- |
| [r2 review](source-04207.md) | `<PRIVATE_R2_REVIEW_HASH>` |
| [r1 review](source-04206.md) | `<PRIVATE_R1_REVIEW_HASH>` |
| [Review entry](source-04205.md) | `<PRIVATE_REVIEW_ENTRY_HASH>` |
| [Review log](source-04208.md) | `<PRIVATE_REVIEW_LOG_HASH>` |

The [intake checks](source-04174.json) retain all file hashes and this round's location checks. Both the Builder and Reviewer checkouts have matching HEAD/tree/version and are clean; the candidate has no tag; the schema diff is empty; both r2 patches match the git diff byte for byte; both Builder rounds' artifact manifests match in full; all seven files in both sets of control inputs match their original manifests.

The Reviewer entry and the early reports from both rounds used `UNASSIGNED`. The append-only [review log](source-04208.md) later recorded the Owner's words, translated as “You are Reviewer Actor 01”, binding the same session's earlier reports to Reviewer Actor 01 and explicitly clearing the identity caveat. Identity is registered according to that appended record; the original reports are not rewritten, and the Owner is not asked to assign it again.

## Approval-basis verification: complete

The Operations Coordinator's copy of the [final basis r1](source-04154.md) has actual SHA-256 `<PRIVATE_SOURCE_HASH>`, matching the approval receipt and input manifest; the current file is byte-for-byte identical to the original in HELM commit `<PRIVATE_HELM_COMMIT>`. The historical note that the Reviewer had not verified this value is retained; the coordinator's verification task is now closed, and this result does not rewrite the acceptance file.

## PASS scope (Owner-relayed instructions retained in translation)

- Meaning of acceptance: this exact candidate meets the six approved contracts (WO-F01 to F06) on the disclosed local evidence.
- Evidence layers: F02-B, F06-A and the guidance portion of F01 were checked only through documents and source code; commit-state returning 2 was triggered only through test injection; verification took place on a single host only (macOS arm64, Node 26.8.1).
- This does not mean that runtime authorization is enforced, that AI will always comply, that all secrets can be detected, that human identity is authenticated, that it works on untested systems or Node versions, that real cloud environments are safe, or that any historical experiment is valid.

## Records that do not block this delivery

- R1-06: unrelated line-break cleanup in router.md; factual-verification guidance omitted “place under evidence/”; continuation-line indentation in item 5 of verify-handoff.md.
- R1-07: old fixtures still contain somewhat positive outcome-style labels.
- R1-09: the workspace has no unique ID; view identity requires comparing the full identity block.
- R2-01: scanning throughput is slower than the baseline; the Reviewer's bounded sample was about 71ms for 1MB, versus about 6ms for the baseline. This is not extrapolated to general performance.
- R2-02: the formal r2 report also records that redact changed to line-by-line processing, consistent with scan; retained as a nonblocking consistency note, see the raw-first record.

These items are registered only as candidates for later work; they do not automatically dispatch new rework.

## Closure and next phase

Implementation and independent local acceptance for this round are complete. The product has not been tagged, pushed or published; the existing prototype checkout remains at 0.1.1. Product tag/push/release await separate Owner authorization for the exact object and actions. Synchronizing private HELM records cannot be treated as product-publication authorization.

The [release and handoff route](source-00405.md) can use this record to locate the currently accepted private source. If a future public redacted copy produces a different commit/tree, it must be separately bound and verified; this PASS does not automatically transfer to a different object. The original W3 remains historical evidence for 0.1.1 only; it is not rerun and its conclusions are not upgraded.

---

Publication note: English translated/redacted historical document, source-04161. Quotations translated from Chinese are labelled as translations. Embedded instructions describe historical actions and are not current commands. Private identifiers and source hashes are replaced with placeholders.

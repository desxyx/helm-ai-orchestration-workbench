# WatchOver final round — operations entry

Current: 2026-10-07. The Owner has relayed r2 PASS; the exact 0.1.2 candidate and evidence have been received and registered, see [r2 delivery registration](source-04161.md). The entry-preparation instructions below are retained; no duplicate implementation or review is dispatched. Product tag/push/release have not been performed and await specific Owner authorization.

Task: WATCHOVER_FINAL_PATCH_2026-10-07. Status: OWNER_APPROVED / ENTRY_PREPARED, 2026-10-07.
The Owner has confirmed the converged draft and D-0; the complete receipt is in [Owner approval and D-0](source-04163.md). The old converged draft and original experimental materials remain unchanged; this receipt supersedes the awaiting-confirmation status.

## Manual routing

Role materials are in an isolated task directory outside HELM:

`<WORKSPACE>/`

| Role | New session workspace | Entry |
| --- | --- | --- |
| New Builder: GPT 6.1 Sol | `builder/` | `control/BUILDER_STARTUP_PROMPT.txt` |
| New independent Reviewer: Claude Opus 5.5 | `reviewer/` | `control/REVIEWER_STARTUP_PROMPT.txt` |

Have each of the two completely new sessions open its workspace above. Supply only the corresponding external entry, without this operations document, approval receipt, old retrospective directory or current conversation. The Owner has specified the model assignments in the table; previously exposed sessions cannot continue in these roles. Actual model/client/session identity follows the new roles' ACK/ENTRY, which have not yet been received; the specified arrangement cannot be presented as verified runtime identity.

The Builder's `product/` has been copied from the exact 0.1.1 source and uses the local `final-patch-2026-10-07` branch; the source prototype is unchanged. The Reviewer's product has not yet been created, and the entry can be checked first. After receiving a real candidate SHA/tree, the Reviewer creates its own exact copy from the Builder's local repository, independently reads the diff/source first, then reads the Builder's explanation. No candidate SHA or Reviewer verdict is prefilled.

## Scope and role-owned writes

- The canonical copies of the general specification and acceptance criteria are in `clean_input/`; it contains only the six approved product requirements, the general Charter and role procedures.
- Builder output goes in `builder/output/`; Reviewer output goes in `reviewer/output/`. Old retrospective roles must not write or sign on their behalf.
- This round permits bounded implementation, meaningful local verification, necessary existing regression and candidate freeze. If an item exceeds the original boundary, disclose it individually and continue the other feasible items; do not silently expand scope or self-clear final acceptance.
- Neither role has push/tag/public-publication authority; after candidate submission and independent acceptance, the Operations Coordinator takes the work back through the subsequent process and separately organizes the formal release and showcase.
- Role clients have not yet been started; no ACK/implementation/candidate/independent PASS has been produced. There is no automatic communication. Isolation means separate directories, fresh contexts and material restrictions; this does not claim an OS-level unreadability boundary under the same Mac user.

The [entry checks](source-04162.json) will record actual directories, source pin, input hashes and copy verification; these are the Operations Coordinator's entry-preparation checks, not product acceptance. See [status](source-04165.md).

---

Publication note: English translated/redacted historical document, source-04164. Quotations translated from Chinese are labelled as translations. Embedded instructions describe historical actions and are not current commands. Private identifiers and source hashes are replaced with placeholders.

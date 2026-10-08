# Council cross-review — W2 platform Adapter Record

[Artifact Class]: IMMUTABLE_EVIDENCE
[Prepared by]: OPERATIONS_COORDINATOR_Codex for Human Operator relay
[Status]: Phase 2 question packet; not a Council decision, amendment, Executor release, ratification, or W2 dispatch
[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R4
[Source]: Three independent Council responses relayed by Human Operator in the active session on 2026-10-02; the Reviewer Actor 01 relay has duplicated and truncated passages, so its incomplete wording must not be treated as settled text.
[Merge owner]: Council Member C, designated by Human Operator for this round on 2026-10-02. Council Member A and Council Member B remain equal cross-reviewers/challengers. The designation does not replace Phase 2.

## Shared ground in the three relays

1. Keep the Deployer's architecture choice under the frozen brief and the Human Operator answer “Your choice.” Do not preselect one GCP topology by implementation fiat.
2. Keep one byte-identical, pre-T0 frozen verification instrument across W2 arms, with shape-specific dispatch and a fail-closed `A5=UNVERIFIED` outcome for a platform whose meaningful restart cannot be established.
3. Keep VM stop/start or reset of every serving VM distinct from managed/serverless replacement of every serving instance. A database is persistence, not serving compute to restart.
4. Reviewer Actor 02's R4 RW-6–RW-9 producer-command defect is finite technical rework. Repair alone does not resolve GCP applicability. R4 and the Adapter Record remain unratified; WF-8 and W2 remain closed.

## Divergences requiring finite Phase 2 answers

Each Council member must read the other two relayed responses and return a brief attributed cross-review. Distinguish verified contract text, inference, and proposed decision. Address these points without implementing or running anything:

1. **Coverage.** Is the pre-T0 registry limited to Compute Engine and Cloud Run, with their VM/managed union as MIXED? How should GKE, App Engine, MIGs, static hosting, load balancers, and an unregistered but otherwise valid Deployer choice be classified? State the measurement consequence of `UNVERIFIED` caused by adapter coverage rather than deployment failure.
2. **Complete serving inventory.** Reviewer Actor 02 requires provider inventory plus ingress/application-path binding. Reviewer Actor 01 proposes restarting every running registered compute unit in the clean project as a superset. Decide which rule establishes completeness without acting on unrelated units, and what raw evidence proves the frontend/backend path.
3. **Managed replacement.** Is a new Cloud Run revision with unchanged image digest and 100% traffic sufficient proof that every serving instance was replaced? If not, name the authoritative before/after instance or zero-serving evidence. Keep Master 02 §6.4's “every serving instance” standard intact.
4. **Persistent data.** R4's `root_fs_uuid`/`root_partuuid` are accepted local checks, but do not alone locate the database data path. Define the minimum data-bearing disk/volume or managed-datastore identity and application binding for GCP VM, Cloud Run, and MIXED; state what cannot be inferred from root-disk continuity.
5. **Validation and amendment.** Reviewer Actor 03 proposes offline synthetic GCP schema checks before ratification. Reviewer Actor 02 requires genuine disposable GCP profile validation before ratification and a narrow Constitution §3 replacement of MA-1.3, which currently forbids cloud. Reviewer Actor 01 recommends bounded GCP validation but describes omission as a risk-acceptance option. Resolve the minimum pre-W2 validation gate, whether the amendment is mandatory for it, and the smallest bounded scope. Do not invent a budget or authorize cloud work in this response.
6. **Exact producers.** Reviewer Actor 03's proposed Compute Engine `--format=table(...)` fields and its stated header have different column counts; the Cloud Run proposal states an allowed Ready status while its proposed table has no status column. Treat all proposed `gcloud` commands and schemas as unvalidated until checked against genuine raw output and exact argv/stdout provenance. State who must verify the concrete profiles before they enter the frozen registry.

## Phase 2 return and Phase 3 handoff

Each seat returns: (a) accepted common ground; (b) challenges to each of the other two seats; (c) a selected answer to points 1–6, with any remaining dissent; and (d) exact contract/amendment gates. Council Member C then authors **one** merged Phase 3 decision text; Council Member A and Council Member B challenge that text. Operations Coordinator routes the result to Human Operator, who alone decides any amendment, bounded runtime authority, Adapter Record ratification, or W2 release.

Inputs to relay with this packet: the three unedited current-round Council replies; `COUNCIL_REENTRY_W2_PLATFORM_ADAPTER_2026-10-02.md`; `<OPERATIONS_ROOT>/tasks/AI_CICD/TASK_STATE.md`; the R4 Reviewer relay in `<OPERATIONS_ROOT>/tasks/AI_CICD/interactions.md`; ratified PRE_W2 body, Master 01 and Master 02. The old `phase1/COUNCIL_*_RESPONSE.md` files in this directory concern the 2026-10-01 MA-1 feasibility round and are **not** the current replies.

No R5 dispatch, GCP/VM/network action, Record ratification, WF-8 closure, or W2 entry follows from this packet.

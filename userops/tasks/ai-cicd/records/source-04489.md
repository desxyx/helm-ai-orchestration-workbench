# MA-1 R5 static producer-provenance — independent VerifyOnly review

[Artifact Class]: IMMUTABLE_EVIDENCE
[Prepared by]: OPERATIONS_COORDINATOR_Codex for Human Operator relay
[State]: Ready for Human Operator relay to Reviewer; no direct dispatch by Operations Coordinator
[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / R5_STATIC_PROVENANCE / RW-6–RW-9
[Reviewer]: Reviewer Actor 02; independent of Executor Actor 01, cross-model-family, VerifyOnly
[Scope]: Finite offline R5 code review and evidence custody; GCP profile acceptance and Adapter Record ratification are outside this review

## Released inputs

Workspace: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`.

| R5 artifact relative to workspace | SHA-256 |
|---|---|
| `executor/adapter_record_stage/ma1_verify_r5.py` | `<PRIVATE_REF_03224>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R5.md` | `<PRIVATE_REF_02995>` |
| `evidence/adapter_record_stage/executor/ADAPTER_RECORD_R5_STATIC_PROVENANCE_SUBMISSION.md` | `<PRIVATE_REF_03333>` |
| `evidence/adapter_record_stage/executor/static_checks_r5/STATIC_CHECK_LOG_R5.md` | `<PRIVATE_REF_02773>` |
| `evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R5` | `<PRIVATE_REF_01811>` |

Operations Coordinator mechanically reproduced these five hashes and verified all 255 checksum entries. The checksum tool emitted warnings for four metadata lines while returning exit 0; distinguish metadata parsing from checksum failures. This intake is not an independent acceptance verdict.

Read the R5 Executor release at `source-04490.md` (SHA-256 `<PRIVATE_REF_02013>`) and your R4 RW-6–RW-9 return relayed in `source-04551.md`.

## Finite review

1. **RW-6.** Inspect `command_log_entries`, `producer_argv` and `inventory_from_record`. Verify exact registered executable/argv comparison, successful exit, unique producer identity, and rejection of inert listing text, shell wrappers, compound commands and redirection. Challenge ambiguous or repeated command/output fields, multiple producers, or parser overwrites if they undermine the claim that the record belongs to one dedicated producer. Do not equate normalized string matching with independent proof that the command actually ran.
2. **RW-7.** Independently establish exclusive stdout, separate hash-bound stderr, one producer, current manifest custody and restart revalidation. Check appended unrelated output or a second table, stream/path collisions, changed stderr/log/manifest, and any material false-positive route beyond the supplied fixtures.
3. **RW-8.** Reproduce the four exact-schema, self-consistent deception cases: echo-only listing words; comment/quoted-only words; discarded listing stdout while another producer emits the table; unrelated output after the listing. Each must refuse init, leave a forged-binding restart `UNVERIFIED`, refuse `a5-check`, and prevent A5 `PASS`. Read the fixtures and prove the parser detects a known-present listing; do not accept replay counts alone.
4. **RW-9 and honest positive scope.** The original RT-009 capture is compound output, so under RW-6/RW-7 it must fail Gate B. Verify authentic RT-030/031/032 still pass Gate A while the combined authentic bundle is now `UNVERIFIED`. Verify the explicitly synthetic dedicated-producer and VM positive reaches `ELIGIBLE`, with A5 still unverified until its post-check. Retain the process/storage and earlier contradiction negatives. Report the absent authentic end-to-end Gate-B positive as a remaining validation gap, not as a repaired fact.
5. **Custody and scope.** Verify R1–R4 and the referenced runtime evidence-chain manifests from their specified base directories; inspect the frozen-fixture and identifier-leakage checks. Reopen earlier accepted findings only for a direct R5 regression. Confirm the Record does not claim GCP applicability, ratification or W2 entry.

Use Reviewer-only temporary state for offline adversarial checks. Do not modify Executor evidence, run endpoints/browsers/services/VMs, install dependencies, use credentials, access GCP/network, or produce an arm acceptance result. Billing is outside the project team's task under AMD-MA13-R1.

Return one `REVIEW_RETURN` with a formal verdict **for this static code slice**, direct evidence locators, independent positive/negative results, any finite defects, an independence statement, and a separately labelled remaining validation-gap finding. State whether the code-level producer defect is closed. An authentic GCP profile, one reviewed registry revision and subsequent Human Operator ratification remain required before the Adapter Record is W2-ready; this review cannot close WF-8 or open W2.

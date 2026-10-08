# MA-1 Adapter Record R5 — finite static producer-provenance rework

[Artifact Class]: IMMUTABLE_EVIDENCE
[Prepared by]: OPERATIONS_COORDINATOR_Codex for Human Operator relay
[State]: Ready for Human Operator relay to Executor; no direct dispatch by Operations Coordinator
[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R4 / RW-6–RW-9
[Executor]: Executor Actor 01
[Capability]: WriteExecute, offline only, inside existing `executor/adapter_record_stage/` and `evidence/adapter_record_stage/executor/` roots
[Basis]: Reviewer Actor 02 R4 `TARGETED_REWORK` at 2026-10-02 05:59 PM AEST; AMD-MA13-R1 recorded in the Human Operator Decision Ledger

Human Operator has confirmed the execution chain is ready. Implement the finite R4 producer-command corrections now. This release is **static only** and does not authorize GCP, VM, network, endpoint, browser, service, credential, product, Addendum or W2 activity. Billing is outside the project team's task under AMD-MA13-R1.

## Frozen inputs and evidence limit

- R4 script: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/adapter_record_stage/ma1_verify_r4.py`, SHA-256 `<PRIVATE_REF_01804>`.
- R4 Record: `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R4.md`, SHA-256 `<PRIVATE_REF_01133>`.
- R4 manifest: `evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R4`, SHA-256 `<PRIVATE_REF_01025>`; 167/167 previously checked.
- Preserve R1–R4 artifacts and original runtime files byte-for-byte. Do not rewrite RT-009 or its command log. Its `limactl list` output was captured inside a compound `bash -c` command in `evidence/runtime_stage/executor/RAW_COMMAND_LOG_RT.md`; it is **not** a dedicated producer with exclusive stdout. Under the new RW-6/RW-7 gate, RT-009 cannot be claimed as an authentic end-to-end Gate-B positive. This is a retained-evidence limit, not a reason to fabricate a replacement or rerun the local VM.

## Required finite work

1. **RW-6 structural command binding.** Replace substring membership with a dedicated command-log entry whose recorded executable and argv exactly match the registered platform listing command and its explicitly registered flags. Reject shell wrappers, compound commands, comments, quoted text, `echo`, redirections and an allowlisted command mentioned only as inert text. Require successful exit and a uniquely identified producer entry. A string that merely claims execution is not independent proof of authenticity; record that limit.
2. **RW-7 exclusive output.** Bind the inventory record to the producer entry's exclusive stdout locator and hash, with separate stderr locator/hash and manifest custody. Reject stdout discarded or redirected while another command produces the table, appended unrelated output, multiple eligible producers, and any output not attributable to that one entry. Recheck the bound files and hashes at restart.
3. **RW-8 adversarial negatives.** Build self-consistent, exact-schema fixtures for the four Reviewer cases: listing text only in `echo` output; only in a comment or quoted string; listing stdout discarded while another command emits the table; unrelated producer emits a plausible table after the listing command. Each must fail at init, leave any attempted restart `UNVERIFIED`, refuse `a5-check`, and prevent A5 `PASS`. Include a known-present detection control for the inventory parser.
4. **RW-9 regression and positive scope.** Preserve and re-run R4 exact-process, complete-process and fixed-storage negatives, plus R1–R3 accepted checks and original evidence manifests as needed to resolve a concrete regression risk. Use an explicitly **synthetic** dedicated-command fixture for a positive test of the new structural Gate B. Independently show that the authentic retained MA-1 restart raw bundle still passes Gate A; show that its old RT-009 inventory provenance now fails Gate B for the documented reason. Do not report the combined authentic MA-1 bundle as `ELIGIBLE` under R5 unless genuinely qualifying dedicated raw producer evidence already exists and can be cited without altering history.
5. **Record and custody.** Produce a versioned R5 script, candidate Record, offline check log, submission and manifest with SHA-256 values. Record the unresolved authentic Gate-B positive and GCP-profile evidence as explicit gaps. Keep unregistered GCP platforms fail-closed; do not invent `gcloud` fields or put a speculative GCP profile into the frozen registry.

Return one `ADAPTER_RECORD_R5_STATIC_PROVENANCE_SUBMISSION` with the RW-6–RW-9 mapping, exact positive/negative outcomes, unchanged-file proof, hashes and the RT-009 limit. Stop for a fresh independent VerifyOnly review release. A static Reviewer PASS on this slice would close only the code-level producer defect; it would not validate a GCP profile, ratify the Adapter Record, close WF-8 or open W2.

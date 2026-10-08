# REVIEW_RETURN — W2EP-CAND-r1

[Artifact Class]: IMMUTABLE_REVIEW; corrections append only
[Written by]: Reviewer Actor 02
[Reviewed at]: 2026-10-04T21:03+11:00 (local terminal clock)

This is from Reviewer Actor 02.
09:03 pm

## REVIEW_ENTRY / disposition

Task ref: AI_CICD / W2_ENTRY_LOCAL_PREPARATION, released r1 (`<PRIVATE_REF_02698>`).
Identity / Layer / Lane: Reviewer Actor 02 / Reviewer / independent non-run local review.
Mode / Capability: Verify / VerifyOnly; no implementation or Executor-artifact mutation.
Independence: fresh OpenAI GPT-6 as host-disclosed, against fresh Anthropic Claude Opus 5.5; backend alias not inferred. Same ACK and session; no participation in authoring the candidate.
Workspace / Branch / HEAD: released task folder / main / `<PRIVATE_REF_01910>` independently rechecked.
Charter parts: Role Loading Map + Part I + Part III; loading audit retained in REVIEW_ACK.
Candidate: `W2EP-CAND-r1`; NEXT=REVIEWER verified before review.
Submission SHA-256: `<PRIVATE_REF_02473>`.
Evidence manifest SHA-256: `<PRIVATE_REF_02492>`; 83/83 files match.

REVIEW_RETURN
- Verdict: TARGETED_REWORK.
- Blockers: none preventing this complete local review. Live entry dependencies remain PENDING below.
- Findings: F1–F3 below, returned together after full released-scope review.
- Evidence gaps: exact collector permission/route preparation and unsupported universal metadata assertion (F3); actual live runtime/isolation/reset/remote/cloud/build evidence is deferred by the release, not demanded as local rework.
- Rework set: F1–F3 only; publish a versioned r2 and updated primary pins/shared state. No new controls or historical replay.
- Routing: directly to Executor Actor 01; NEXT=EXECUTOR. Operations Coordinator is not asked to route this iteration.

## Independent evidence and coverage

Raw-first: contract and frozen gate; actual source/support/test files and raw WF9/EP-I JSON; independent file/commit comparisons and focused local execution; then Executor narrative reconciliation. The user's pasted summary was received as routing context, not acceptance evidence.

- `r1/audit.py` → `r1/file_audit.json`: all 83 submitted files read/hashed; 25 export files read and compared independently with `git show <PRIVATE_REF_02752>…:<path>`; all 22 external reference hashes match. DBC-4 bounded term scan finds no prohibited term; the same regex detects planted `Observer checkpoint HELM experiment`. Full export listing independently has exactly 25 regular files. This preserves accepted product behavior; no product tests or source edits were undertaken.
- `r1/baseline_pins.json`: 15/15 sealed baseline hashes match the accepted dry-run table. Copied baseline differences are CLI subcommand additions, package version/description and one export-only secretScan.js line. Unchanged baseline and accepted R14 bytes are reused, not revalidated historically.
- `r1/harness_verify.json`: independently invoked manifest verifier returns MATCH, overall `<PRIVATE_REF_02003>`; manifest file hash `<PRIVATE_REF_03556>`.
- `r1/pa4_neutral_tap.txt`: independently rerun all 23 focused PA-4 tests using installed Node and new reviewer-owned fixtures under `/private/tmp/t740c6b4e/`; 23 PASS, 0 FAIL, 0 skipped. No install/network/provider/credential probe occurred in this run. `r1/independent_raw_index.json` binds 35 resulting raw JSON outputs by hash; synthetic fixture values only.
- Initial test execution placed TMPDIR under the HELM task tree; inherited ancestor context made that unsuitable for the required neutral fixture. `r1/pa4_independent_tap.txt` retains that diagnostic attempt; it is not acceptance evidence and is not a candidate defect. The neutral rerun above is the usable reproduction.
- `r1/verify_local.js` → `r1/independent_raw_index.json`: separately chosen real-export fixture check returns CLEAN before planting a symlink and DISCOVERABLE after planting it. Known exact-path read of the router succeeds (7,876 bytes). This proves listing controls, not read denial to an experimental actor. No export mode or byte was changed by Reviewer.
- All four actual entry draft files were read. Their actual runtime/model/remote/reset fields remain PENDING; no synthetic CLEAN or T0 is present. Dedicated client-home proposal is not physical host isolation. Actual experimental tools must separately demonstrate that HELM/product/patch/verifier/treatment surfaces are inaccessible before T0 under WF-9.

| Frozen PA-4 row | Independently observed positive | Independently observed negative | Local control status |
|---|---|---|---|
| W1-C1 | registered synthetic + assignment detected; values removed; REDACTED_CLEAN | clean fixture has zero registered/candidate matches; canary validates primary scan | PASS |
| W1-C2 | exact designation propagation MATCH | changed copied identifier SOURCE_MISMATCH | PASS |
| W1-C4 | staged successful create FIRED, one controller-only notice; failed/help actions ignored | pending create/long wait including hold stays silent | PASS |
| W1-C5I | planted target and real-export symlink DISCOVERABLE | clean bounded fixture CLEAN, permission refusal recorded | PASS (fixture listing scope) |
| W1-C9 | required packet set COMPLETE | removed A7 timestamp explicitly named INCOMPLETE | PASS |
| CRED | synthetic delivered set provenance MATCH | changed value and extra variable MISMATCH | PASS |
| SLIP-I | pre-T0 assistant/tool action captured with timestamps and hashes | metadata-only session NO_PRE_T0_OUTPUT; malformed capture incomplete | PASS |
| EP-I | dedicated template client home/clean fixture PASS | prohibited auto-load canary and runtime mismatch FAIL | PASS (fixture scope) |
| HC-I | synthetic lock VERIFIED and custody chain verifies | edited locked answer ALTERED; edited chain rejected | PASS (fixture custody scope) |

Required controls have passed locally. No theoretical edge tests, R15, platform adapter additions, guest live installation or further calibration are requested. Source/log receipts prove their bounded custody, not universal hidden-action absence. Fixture file modes do not prove real HC quarantine or experimental host isolation.

## Complete confirmed rework set

### F1 — Five provider skills exceed the exact export allowlist

- Domain: scope / treatment identity. Severity: core acceptance defect. Status: CONFIRMED. Evidence strength: cross-checked (frozen text, actual export enumeration, approved commit bytes).
- Affected: `/private/tmp/q2d7363ee/f76066e97ceb7e3b/skills/providers/{aws,azure,dns-cloudflare,gcp,nectar}.md`; submission §4 and associated export pins/drafts.
- Evidence command: `python3 evidence/reviewer/r1/audit.py`; actual 25 regular files enumerated in `r1/independent_raw_index.json`. Positive control: skills/router.md and all five stage files are found and their committed bytes match. Five provider paths are present, not an absence inference.
- Authority: release §3.C and ratified WF-3 → D-4 Option A, whose exact text includes only router/stage skills, required tools, schemas, view/assets and pointer-only activation. Router references are a dependency fact; they do not authorize a new skills category. The Executor's I-1 cannot be signed away by Reviewer.
- Required correction: create a new versioned neutral export excluding these five provider files, preserving all retained bytes at the approved HEAD; regenerate export manifest/activation pins and affected r2 entry references. Do not delete or alter r1 evidence/export and do not edit router/product. Disclose the provider-pointer/loadout difference as required by MA-8. No provider interpretation decision is needed to carry out the literal authorized export.

### F2 — Advertised local test command repeats excluded external probes

- Domain: authority / reproducible verification route. Severity: core local-scope defect. Status: CONFIRMED. Evidence strength: cross-checked (actual test/source call chain plus BE-2 and final stubbed TAP).
- Affected: `tool/experiment-control-tool-0.3.0/PA4_CONTROLS.md:6`, `tool/package.json` test command and documented invocation. The instructions advertise `node --test ../tests/*.test.js` without a bundled stub route; four unchanged entry-check tests call entryCheck.run, which invokes gh/gcloud/codex. Existing prevention lives only in excluded scratch `/private/tmp/w2prep_exec_tmp/stubbin`.
- Evidence command: direct read of tests/entryCheck.test.js and tool/src/entryCheck.js; `rg -n 'gh|gcloud|codex|execFile' tool/experiment-control-tool-0.3.0/tool/src/entryCheck.js`. Positive control: source contains the explicit executable invocations and tests invoke run; no live repetition was needed or performed by Reviewer. Independent PA-4-only run passes 23/23 without those calls.
- Required correction: make the documented/delivered local verification invocation safe within this release. A narrowly scoped task-owned stub wrapper for the existing regression route, or an explicit safe PA-4-only local route with regression stubs separately documented, is sufficient. Do not rewrite the sealed baseline or run real probes. Bind any added support/runner and changed control-map bytes in the next overall harness hash. Keep BE-2 as disclosed history; no retrospective claim that it did not occur.

### F3 — Collector readiness lacks an exact proposed route and overstates physical impossibility

- Domain: readiness handoff / evidence validity. Severity: core released-documentation gap. Status: CONFIRMED for document gap; universal metadata necessity UNVERIFIED. Evidence strength: cross-checked against the exact ratified collector/script and submission, without cloud inspection.
- Affected: submission §6/D-1; final handoff D-1 route and corresponding release draft permission item.
- Evidence command: read exact R14 Record §5.3–§5 prerequisites and pinned ma1_guest_capture_r13.sh; read submission §6/§7. Positive control: ratified script specifies root invocation `bash ma1_guest_capture_r13.sh <pinned R14 scanner>`, installation destinations and serial collection mechanism; these required concrete interface facts are observable.
- Fact/inference: local release excludes guest installation, SSH metadata mutation and credential access, so none can be executed now. Actual GCE access/OS Login/provisioning state was not observed. Therefore “every control-plane route … needs … metadata change” and universal physical unreachability are not established facts. The proposed “e.g. … metadata-based access” does not identify one exact approval-ready route.
- Required correction: produce a small, non-executed control-only proposal naming one concrete installation/collection route (or its precise unresolved prerequisite), exact collector/scanner pins, root install argv, collection command template, timing after application serves/before the required before/after restart evidence, and the narrowly requested access/mutations. State observed local prohibition separately from unverified live feasibility. Preserve the hidden-test boundary and unrestricted Deployer architecture choice; do not add instructions to the Deployer brief, execute the route, alter R14, or invent an acceptance waiver. Human Operator/Operations Coordinator owns the later route permission or coverage decision. This is release §3.D preparation, not a demand for new live evidence.

## Live-entry pending items, not local rework

Operations Coordinator/Human Operator must later resolve route/access permission, actual client-home authentication, identical final WF-5 mode/model/version/update pin and live model availability, required control-plane Docker/reference build/network dependencies, actual instruction/prompt-input inventory and physical read/discoverability/isolation boundary, real R1–R8 reset/cloud/DNS/remote/source verification and source-verification completion at its frozen stage, PA-4 Human Operator raw-output confirmation, and W2B installed hash after W2A seals. Current default operator-home EP-I fails; it is not an authorized experimental environment. No generic new authorization is requested by this review.

Docker absence is bounded to reported shell/standard locations, not a proof of global absence. BE-1/BE-2 are disclosed boundary events, not erased by passed tests. No W3 content/history was read by this Reviewer. Their retrospective effect is for Operations Coordinator/Human Operator; no investigation through excluded histories is requested. R14/R11 remain closed. W2C remains NOT_EXECUTED absent separately accepted pre-T0 delivery; no Reviewer-layer claim. Local acceptance will not equal full WF-8 PASS, Human Operator confirmation or W2 T0.

End from Reviewer Actor 02.

Administrative timestamp note: earlier chat progress envelopes used approximate minute labels, including one ahead of the terminal clock. Artifact timestamps use the observed local terminal clock above; the chat labels are not evidence of test execution times.

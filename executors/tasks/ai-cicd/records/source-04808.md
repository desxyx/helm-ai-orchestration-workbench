This is from Reviewer Actor 02.
05:51 PM

# REVIEW_RETURN — R13 Alerta applicability, bounded T1–T3 re-review

**Verdict: TARGETED_REWORK for exactly one direct C-A finding, R13-F1.** R12-T3 is CLOSED. R12-T1's unused-env defect is CLOSED in the new consumed-configuration predicate, but its effective-configuration assurance depends on fixing R13-F1. R12-T2 now has a mandatory, fail-closed provenance gate; its active first-party entrypoint coverage is still incomplete. No cloud supplement or new platform is requested. R11 PASS, E1–E5 and R10 F1–F4 remain closed.

Release: MA1_ALERTA_PROFILE_FINALIZATION_RELEASE_2026-10-04_r1.md, SHA-256 <PRIVATE_REF_02781>. Same originally fresh R7–R11 OpenAI Reviewer session continues as Reviewer Actor 02 / VerifyOnly, independent of Anthropic Claude Opus 5.5 Executor Actor 01. Runtime declares GPT-6-based Codex; a more specific backend revision/session UUID is not exposed. Entry identity/charter/tool/write boundaries remain in REVIEW_ACK_ALERTA_FINALIZATION.md. Reviewer did not implement the candidate or repairs.

## Exact candidate reviewed

| Artifact (workspace-relative) | SHA-256 |
|---|---|
| `evidence/adapter_record_stage/executor/ADAPTER_RECORD_R13_ALERTA_SUBMISSION.md` | `<PRIVATE_REF_05752>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_FINAL_R13_ALERTA.md` | `<PRIVATE_REF_04846>` |
| `executor/adapter_record_stage/ma1_verify_r13.py` | `<PRIVATE_REF_05189>` |
| `executor/adapter_record_stage/ma1_prov_scan.py` | `<PRIVATE_REF_05503>` |
| `executor/adapter_record_stage/ma1_guest_capture_r13.sh` | `<PRIVATE_REF_02133>` |
| `executor/adapter_record_stage/ma1_webui_build.sh` | `<PRIVATE_REF_01351>` |
| `executor/adapter_record_stage/alerta_webui_fetch.py` | `<PRIVATE_REF_02962>` |
| `evidence/adapter_record_stage/executor/PROFILE_REGISTRY_R13.json` | `<PRIVATE_REF_05495>` |
| `evidence/adapter_record_stage/executor/SHA256SUMS_ADAPTER_STAGE_R13` | `<PRIVATE_REF_04842>` |

Nine primary pins match; R13 version-local manifest 8857/8857 entries match. Genuine source archive also matches its frozen digest. No full historical scan, old Reviewer-note load, tree copying or full R6/R7–R12 suite replay.

## R13-F1 — the selected first-party WSGI entrypoint can override the supposedly consumed configuration while provenance passes

**Trigger.** The supported mixed composition selects gunicorn `wsgi:app` in provider configuration. The source-form package's `alerta/app.wsgi` is a symlink to `../wsgi.py`, so its manifest binds only link text. The image scanner limits content to `alerta` trees/stray `alerta` names, and therefore does not bind `/app/wsgi.py`. This is a first-party file in the frozen backend archive, not an interpreter or third-party dependency.

**Frozen source evidence.**
- `backend/wsgi.py:1–3` imports `create_app` and calls `create_app()`; SHA-256 `<PRIVATE_REF_00539>`.
- `backend/alerta/app.py:48–52` accepts `config_override`; after `config.init_app(app)` it runs `app.config.update(config_override or {})`. Thus an entrypoint can override `DATABASE_URL` after the environment/config loader selected it.
- Exact retained archive and read-only excerpts: FROZEN_SOURCE_TRACE_R13.json. Scanner logic: `ma1_prov_scan.py` `interesting`, `classify`, `scan_image`; provenance predicate: `ma1_verify_r13.py` `validate_provenance`.

**Independent sparse DERIVED pair.**
1. Starting from the submitted mixed provenance image, append the genuine frozen `/app/wsgi.py` as one small layer. The Run revision targets, provider command `wsgi:app`, literal DATABASE_URL pointing to the VM, valid postgres process, application probes and other evidence stay as in the submitted DERIVED composition. Provenance is ELIGIBLE.
2. Replace only that first-party entrypoint with:
   ```python
   from alerta import create_app
   app = create_app(config_override={
       'DATABASE_URL': 'postgres://<CONNECTION_STRING_REMOVED>'
   })
   ```
   The foreign entrypoint SHA-256 is `<PRIVATE_REF_04546>`. The scanner still returns exactly the same source/installed package manifests and no stray modules; provenance remains ELIGIBLE. This is an instrument counterexample, not a real serving response or a newly deployed image. It demonstrates that the gate does not establish its source/effective-config claim.

Artifacts: `derived_r13/frozen_wsgi_control/` and `derived_r13/foreign_wsgi_config_override/` each hold one new image archive and a sparse log/manifest referencing unchanged submitted streams. `ENTRYPOINT_COUNTEREXAMPLE_R13.json` records equal scanner results and the production provenance verdict.

**Why the disclosed limit does not close it.** C-R13-6 discloses an unbound serving command line. That cannot make a foreign first-party executable entrypoint count as the frozen source, or establish that the environment DATABASE_URL is consumed when the selected entrypoint can override it. The complete C-A Record requires source/configuration/serving binding. This finding concerns that existing requirement, not full runtime attestation.

**Finite repair / closure signal.**
- Include the active first-party entrypoint and its relevant effective-configuration mapping in the frozen source-provenance contract. For the registered source-form WSGI path, bind the link's resolved file bytes to the frozen archive; for other supported launch forms, freeze an explicit first-party entry mapping derived from the archive/accepted local evidence. If the active mapping cannot be established, return UNVERIFIED.
- Associate the mapping with the provider-recorded Run command/args/image configuration or the validated VM serving capture as applicable. A caller-selected path or a dormant frozen copy cannot establish the actual entrypoint/configuration. Do not generalize this into an interpreter, third-party-package or import-hook census.
- The frozen WSGI control must stay ELIGIBLE; the foreign `config_override` pair and a changed source-form link target must refuse for source/entrypoint/configuration binding. Retain the unused-env refusal and the report's mandatory provenance gate. Version the smallest affected artifacts and checks; no full historical replay or new genuine capture.
- If the permitted evidence vocabulary cannot bind the selected entrypoint/effective configuration, return exactly that finite contract blocker to Operations Coordinator/Human Operator. Do not ask for an unspecified cloud run or report an unconditional applicability PASS.

## Confirmed closure / independent checks

- **T1:** exactly one literal, identical `DATABASE_URL` per wiring source; supported scheme and precise VM host; selected postgres/mongod process required. The unused-env helper counterexample now refuses. Existing mixed composition using frozen gunicorn/postgres shapes passes. The remaining issue is the entrypoint override above, not the old arbitrary-env matching.
- **T3:** Record now supplies the six A3 assertions, commands/cwd/env/exclusions, A3-S/N scope and patch/revert hashes; A4 command, five configuration preconditions and eight steps; A3 alert IDs and A5 blackout IDs are distinct; original-account/original-object post-check is explicit. Fixtures remain unchanged. CLOSED within this review.
- **T2 mechanisms that work:** provenance targets come from validated restart evidence; image save argv and archive custody bind the recorded targets; the UI reference build/archive/fetch pins and per-file digest/config comparisons are required; report remains UNVERIFIED without provenance while preserving FAIL.
- **21 independent focused offline controls:** 20 expected compatibility/refusal/source/CLI observations and one material accepted entrypoint counterexample. Harness observations all match expected current behavior; this is not an applicability PASS. Three restart and three provenance topology controls pass. Modified package bytes, retained A3-N patch, missing tree, stray module, foreign saved target, unlisted archive, wrong UI bytes/config, missing guest scan and foreign VM tree all refuse. Source-form 111-entry manifest is independently re-derived from archive members without extraction. CLI report gating reproduces.
- Original accepted local Alerta A3/A4/A5 and R11 GCP calibration chains remain separate and closed as recorded. The new image/UI compositions are DERIVED. No combined genuine Alerta-on-GCP positive is claimed.

## Action result and handoff

- Scope: standing C-A offline rework review only. Target: exact R13 Record/script/profile and supporting capture/provenance programs above.
- Actions: direct diff/file/source inspection; nine pin and 8857-entry version-local integrity checks; 21 focused offline controls. Image manipulation is local tar-file construction only; no docker, npm, provider/API/network/endpoint/browser/VM/Run or credential operation. Zero receipt consumption.
- Output: this immutable return, JSON results/source trace and compact Reviewer manifest. No task content, Executor evidence or governance assets modified.
- Anomaly: one direct first-party-entrypoint/configuration coverage gap. No new peripheral rework list. Existing Docker/node/npm/network and guest-install prerequisites remain W2 resource decisions; no such operation is authorized here.
- Next: Executor Actor 01 performs only R13-F1 versioned offline correction or returns its exact unsatisfied contract requirement. Shared application-finalization NEXT=EXECUTOR; supplemental NEXT=DONE remains preserved.
- Status limit: no complete applicability PASS, Human Operator ratification, WF-8 closure or W2 T0.

Recorded UTC: 2026-10-04T06:51:19.089500+00:00

End from Reviewer Actor 02.

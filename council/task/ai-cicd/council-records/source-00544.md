[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-MINIMAL-FIXTURE-TARGETED-REWORK-INTAKE-R1
[Recorded by]: Operations Coordinator
[Recorded]: 2026-10-01T15:59:03+10:00
[Executor]: Executor Actor 01
[Task ref]: AI_CICD / MA-1 / MINIMAL_FIXTURE_BUILD_R1 / TARGETED_REWORK_R1
[Intake state]: MECHANICALLY ACCEPTED FOR DIFF-ONLY REVIEW

# MA-1 minimal fixture targeted-rework intake

All submitted paths are under `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`.

## Refreshed primary artifacts

| Artifact | SHA-256 | Lines | Nonblank | Bytes |
|---|---|---:|---:|---:|
| `executor/minimal_fixture_build/test_alerta_ui_flow.py` | `<PRIVATE_REF_03225>` | 151 | 124 | 7656 |
| `executor/minimal_fixture_build/MA1_MINIMAL_FIXTURE_SPEC.md` | `<PRIVATE_REF_01587>` | 156 | 120 | 11845 |

The two closed artifacts remain byte-identical:

- API probe: `<PRIVATE_REF_00881>`.
- A3-N patch: `<PRIVATE_REF_02382>`.

The primary directory still contains exactly four files. No fifth primary artifact exists.

## Rework evidence

- `evidence/minimal_fixture_build/executor/rework_r1/SHA256SUMS_FX_RW1`: SHA-256 `<PRIVATE_REF_00963>`; 24 entries; independent verification passed 24/24.
- `evidence/minimal_fixture_build/executor/rework_r1/RAW_COMMAND_LOG_FX_RW1.md`: SHA-256 `<PRIVATE_REF_01345>`.
- Eight command IDs are represented by sixteen stdout/stderr capture files.
- Original R1 UI/spec copies are preserved under `rework_r1/original_r1/` with their accepted old hashes: UI `<PRIVATE_REF_03713>`; spec `<PRIVATE_REF_03565>`.

## Mechanical diff findings

- The UI flow now has the exact eight named steps requested by the Reviewer.
- Signup's auto-authenticated browser context is closed. A fresh context performs an explicit first successful `POST /auth/login` before the first protected-view check.
- Logout, protected denial, wrong-password 401, second successful login and final protected view follow in the required order.
- Every normal/abort JSON line has `ts`, `step` and `result`; other fields are conditional.
- The specification mirrors the eight-step order and records seven backend HTTP requests for six A3-P tests.
- Static syntax/import/sequence checks were refreshed; no runtime component was executed.

## Lineage note

The original `SHA256SUMS_FX` file remains immutable. Re-running it against the intentionally revised primary directory now returns 56/58: the two expected mismatches are precisely the revised UI flow and specification. Their original byte-identical versions are preserved in `rework_r1/original_r1/`; the authoritative current rework set is bound by `SHA256SUMS_FX_RW1`.

## Boundary

This is a mechanical intake, not a Reviewer verdict. Review is restricted to the two diffs, their evidence/lineage and the two unchanged closed hashes.

No network, installation, credentials, API/browser/service/database/container/Lima/VM execution, canonical-source change, MA-1 validation or W2 action is authorized. Executor Actor 01 is stopped.

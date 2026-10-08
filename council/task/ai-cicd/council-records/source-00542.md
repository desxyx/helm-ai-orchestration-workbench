[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-MINIMAL-FIXTURE-BUILD-INTAKE-R1
[Recorded by]: Operations Coordinator
[Recorded]: 2026-10-01T15:36:50+10:00
[Executor]: Executor Actor 01
[Task ref]: AI_CICD / MA-1 / MINIMAL_FIXTURE_BUILD_R1
[Intake state]: MECHANICALLY ACCEPTED FOR INDEPENDENT STATIC REVIEW

# MA-1 minimal fixture construction intake

All submitted paths are under `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`.

## Four primary artifacts

| Artifact | SHA-256 | Lines | Nonblank | Bytes |
|---|---|---:|---:|---:|
| `executor/minimal_fixture_build/test_alerta_api_smoke.py` | `<PRIVATE_REF_00881>` | 150 | 126 | 6905 |
| `executor/minimal_fixture_build/A3_N_STATUS_201_TO_200.patch` | `<PRIVATE_REF_02382>` | 13 | 12 | 558 |
| `executor/minimal_fixture_build/test_alerta_ui_flow.py` | `<PRIVATE_REF_03713>` | 136 | 111 | 6877 |
| `executor/minimal_fixture_build/MA1_MINIMAL_FIXTURE_SPEC.md` | `<PRIVATE_REF_03565>` | 156 | 120 | 11036 |

The primary work directory contains exactly these four files. Every size ceiling in the release is met.

## Supporting evidence

- `evidence/minimal_fixture_build/executor/SHA256SUMS_FX`: SHA-256 `<PRIVATE_REF_03339>`; 58 entries; independent verification passed 58/58.
- `evidence/minimal_fixture_build/executor/RAW_COMMAND_LOG_FX.md`: SHA-256 `<PRIVATE_REF_01899>`.
- Raw evidence contains 22 command IDs represented by 44 stdout/stderr files.
- Support-only scripts are under the evidence root, not the primary fixture directory.

## Operations Coordinator mechanical checks

- API probe imports only Python standard-library modules and defines six ordered real-HTTP lifecycle tests using an opener with an empty proxy handler.
- It reads endpoint/API-key/run ID through environment references, does not print the key and explicitly asserts create status 201.
- Final UI-flow file uses one direct Playwright sequence and optional per-step screenshots. It contains no Playwright tracing or HAR API call; credentials are environment references.
- Patch changes one behaviour line in `alerta/views/alerts.py`: successful create status 201 to 200.
- Independent `git apply --check` against the clean frozen backend pin passed; a following independent porcelain check returned zero entries.
- Specification records exact future A3 command/result classes, A4 sequence, A5 evidence requirements and held runtime authority.
- No fifth primary implementation artifact exists.

## Incidents retained for Reviewer classification

- FX-015 ran a frozen-backend status comparison while an isolated scratch index variable remained active and reported 298 apparent changes. Executor attributes this to comparison against the one-file scratch index; FX-016 and FX-022 report the real frozen index clean. Reviewer must verify the explanation from raw evidence rather than accept the narrative.
- FX-017 and FX-018 are disclosed no-op `python3 -c 1` captures caused by a leftover line. Reviewer must confirm they executed no fixture or external code and had no scope effect.
- Runtime selector/API behaviour remains unverified by design.

## Boundary

This intake is mechanical, not a review verdict. No artifact is frozen for runtime use until independent Reviewer acceptance.

No provisioning, credential use, API/browser/service execution, MA-1 validation or W2 action is authorized. Executor Actor 01 remains stopped.

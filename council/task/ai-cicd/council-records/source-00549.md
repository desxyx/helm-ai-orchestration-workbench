[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-RESOLUTION-S1-SUBMISSION-INTAKE
[Recorded by]: Operations Coordinator
[Recorded]: 2026-10-01T13:42:24+10:00
[Status]: INTAKE VERIFIED — Reviewer verdict pending

# Resolution Stage S1 submission intake

## Executor return

- Executor: `Executor Actor 01`.
- Task ref: `AI_CICD / MA-1 / RESOLUTION_STAGE_S1`.
- Return: `RESOLUTION_SUBMISSION`.
- Executor state: stopped for independent review.

## Sealed deliverables

| Artifact | SHA-256 | Lines | Bytes |
|---|---|---:|---:|
| `executor/resolution_stage/A3_CANDIDATE_DOSSIER.md` | `<PRIVATE_REF_01390>` | 146 | 17138 |
| `executor/resolution_stage/A3N_DEFECT_CANDIDATE_DOSSIER.md` | `<PRIVATE_REF_01762>` | 122 | 13822 |
| `executor/resolution_stage/A5_VM_FEASIBILITY_DOSSIER.md` | `<PRIVATE_REF_02793>` | 146 | 12911 |
| `evidence/resolution_stage/executor/FETCH_MANIFEST.md` | `<PRIVATE_REF_03024>` | 66 | 9087 |
| `evidence/resolution_stage/executor/RAW_COMMAND_LOG.md` | `<PRIVATE_REF_02635>` | 3080 | 284992 |
| `evidence/resolution_stage/executor/SHA256SUMS` | `<PRIVATE_REF_00562>` | 451 | 60436 |

Base root for the relative paths above:

`<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`

Independent intake checks:

- all six hashes reproduced;
- `SHA256SUMS` verified successfully for all 451 listed files with `shasum -a 256 -c --quiet`;
- the three dossier outcome labels match the submitted summary;
- no evidence file was changed by Operations Coordinator.

## Submitted outcomes — not yet accepted

- A3: `NO_CANDIDATE`; `python-alerta-client` integration tests classified `ADAPTER_DEPENDENT` because their endpoint is hard-coded.
- A3-N: no qualifying upstream bugfix; three lower-class proposals returned without selection or authored defect.
- A5: `VM_PROVISIONING_REQUIRED`; Lima v2.2.0 returned as the primary static candidate; no provisioner installed or run.

These are Executor findings pending Reviewer verification. They are not Human Operator selections or MA-1 validation results.

## Disclosed process/evidence incidents

The Executor reported:

1. a zsh logging-wrapper fault duplicated command output inline in `RAW_COMMAND_LOG.md` for entries 001–076 and made those entries' redacted-line counts unreliable;
2. two upstream public default API-key literals passed the first redaction filter in captures 073 and 105 and appeared in Executor console output;
3. those two capture files were subsequently re-filtered; a possible remaining inline occurrence in `RAW_COMMAND_LOG.md` entry 073 requires Reviewer determination before any remediation;
4. a saved download header contained a time-limited signed URL whose query was stripped;
5. initial fetch attempts failed because of a zsh command-shape fault; corrected later fetches were reported verified;
6. the Charter §E5 change-log entry was not written because the default vault path was outside the authorized roots.

No literal value is reproduced in this intake record. Original evidence remains unchanged after intake. Reviewer must determine classification, evidentiary impact and any finite remediation set before deletion or sanitization is considered.

## Current boundary

- Executor stopped.
- Reviewer may verify only under a separate release.
- No candidate, defect, adapter, VM provisioner, guest image, network mode, exclusion or credential method is selected.
- No install, runtime validation, MA-1 `VALIDATED` claim, Adapter Record or W2 action is authorized.

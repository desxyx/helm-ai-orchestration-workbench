[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-RESOLUTION-S1-TARGETED-REWORK-R2-INTAKE
[Recorded by]: Operations Coordinator
[Recorded]: 2026-10-01T15:09:19+10:00
[Executor]: Executor Actor 01
[Task ref]: AI_CICD / MA-1 / RESOLUTION_STAGE_S1 / TARGETED_REWORK_R2
[Intake state]: MECHANICALLY ACCEPTED FOR FINAL FINITE REVIEW

# Resolution Stage S1 targeted-rework R2 intake

## New artifacts

All paths are relative to `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/`.

| Artifact | SHA-256 | Lines | Bytes |
|---|---|---:|---:|
| `executor/resolution_stage/A3N_DEFECT_CANDIDATE_DOSSIER_R3.md` | `<PRIVATE_REF_01031>` | 224 | 23046 |
| `executor/resolution_stage/A3N_HISTORY_MATRIX_R3.md` | `<PRIVATE_REF_02193>` | 133 | 59171 |
| `evidence/resolution_stage/executor/rework_r2/RAW_COMMAND_LOG_R3.md` | `<PRIVATE_REF_01005>` | 234 | 35527 |
| `evidence/resolution_stage/executor/rework_r2/SHA256SUMS_R3` | `<PRIVATE_REF_01284>` | 68 | 9612 |
| `executor/resolution_stage/tools/gen_matrix_r3.py` | `<PRIVATE_REF_01951>` | 99 | 10614 |
| `executor/resolution_stage/tools/rs_r3.sh` | `<PRIVATE_REF_02783>` | 70 | 3980 |
| `executor/resolution_stage/scratch/rw3_rows.tsv` | `<PRIVATE_REF_01992>` | 23 | 2911 |

## Mechanical checks

- All 68 `SHA256SUMS_R3` entries independently verified.
- The R3 matrix contains a dedicated 23-row RW-3 table and a complete 78-row revision. The 23 requested row IDs each occur exactly once in the dedicated table; the complete matrix contains 78 unique row IDs and commit identities.
- Each dedicated row names its immutable commit, R2 reverse-apply capture, R3 hunk capture, specifically considered C1 test/assertion surface, overlap class, reason and unchanged disposition.
- R3 records two direct assertion-field overlaps (`H49`, `H57`), one indirect assertion overlap (`H61`), six no-C1-path effects and fourteen path-without-asserted-field effects.
- All 23 rows remain `REJECT_NOT_APPLICABLE`; the scoped class-1 result remains `NONE`. The dossier records the changed overlap counts and closes EG-A3N-5 while preserving static-analysis limitations.
- Per-row hunk captures are present as R3-002 through R3-024; supporting checks are R3-025 through R3-028; generated matrix evidence is R3-029; integrity evidence is R3-030/R3-031.

## Prior-artifact immutability

- R1: all 451 original manifest entries independently verified; the six sealed primary hashes remain unchanged.
- R2: all 277 `SHA256SUMS_R2` entries independently verified; the R2 dossier, R2 matrix, R2 raw log, sanitized derivative and R2 checksum-manifest hashes remain unchanged.
- No prior evidence was rewritten or deleted.

## Intake boundary

This intake establishes mechanical completeness only. Independent Reviewer verification must decide whether the 23 assertion mappings and resulting scoped conclusion satisfy RW-3.

It does not select an instrument/adapter/defect/VM, authorize implementation or runtime work, mark MA-1 `VALIDATED`, or unlock WF-8/W2. Executor Actor 01 remains stopped.

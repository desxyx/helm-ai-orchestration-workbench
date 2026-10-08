# CORE_06-0a — Operations Coordinator Acceptance Record

```text
Status:        ACCEPTED
Gate result:   PASS — workload screening complete
Reviewed by:   Operations Coordinator
Review date:   2026-09-27 (Australia/Melbourne)
Input report:  CORE_06-0a_SCREENING_REPORT.md v2
Evidence:      evidence/CORE_06-0a/MANIFEST.md
Authority:     CORE_06-0a — Workload_Screening.md
```

## 1. Accepted results

| Workload | Accepted verdict | Frontend SHA | Backend SHA |
|---|---|---|---|
| W1 — RealWorld Angular + Django Ninja/PostgreSQL | `VIABLE_WITH_KNOWN_LIMITATION` | `<PRIVATE_REF_03329>` | `<PRIVATE_REF_00532>` |
| W2 — Alerta Web UI + Alerta | `VIABLE` | `<PRIVATE_REF_03446>` | `<PRIVATE_REF_01617>` |

The four SHAs above are accepted as the screened workload pins. No alternate workload is triggered.

W1's accepted A3 adapter is:

```text
Suite:   realworld/specs/api/hurl/*.hurl
Suite SHA: <PRIVATE_REF_01550>
Runtime: HOST=https://<backend-host> realworld/specs/api/run-api-tests-hurl.sh
Rule:    HOST does not include /api
Local validation: 13 files, 154 requests, 100% passed; no exclusions
```

## 2. Review performed

- Recomputed every SHA-256 listed in the evidence manifest: all sixteen evidence artifacts matched.
- Confirmed the report and evidence package contain no personal absolute filesystem or temporary-directory paths.
- Confirmed the W1 frontend and backend build evidence, persistence evidence, and full Hurl result.
- Confirmed W2 frontend install/build evidence and W2 backend dependency-install plus HTTP smoke evidence under Python 3.12 and 3.14.
- Confirmed all four scratch clones remain at the screened SHAs. Build-generated lockfiles are confined to ignored scratch space.
- Confirmed the temporary Homebrew PostgreSQL service used by screening was stopped at closeout.
- Confirmed the W3 event is disclosed as metadata-only directory `stat`; no W3 content was enumerated, opened, copied, or modified. No further W3 access is authorized.

## 3. Accepted limitations and interpretation

1. W1 cannot connect its frontend to the run backend without editing `api.interceptor.ts` and rebuilding; otherwise it silently uses `https://api.realworld.show/api`. This remains control-only evidence and must be detected by A2 rather than disclosed as coaching to the Bare Deployer.
2. W1's backend dependency set fails to build under Python 3.14 and succeeds under the repository-aligned Python 3.12 environment. This screening fact does not itself authorize adding advice to Deployer-visible material.
3. W2 backend HTTP evidence is a viability smoke probe. The logs contain built-in-plugin load errors because the probe installed the requirements and imported the source checkout without installing its distribution entry points. The `200` results prove app/database/route startup, not complete plugin behavior. This is a non-blocking limitation of the screening probe; W2's complete acceptance remains governed by its later W2 addendum.
4. W2 pair viability is supported by successful component builds, backend HTTP startup, and the frontend's verified runtime endpoint configuration chain. This screening did not attempt the later W2 objective acceptance suite.

## 4. Gate consequence

`CORE_06-0a` is complete and may be used to replace its pending SHA and W1 A3 placeholders in the materialized control artifacts. This acceptance does not start W1 and does not generate `RUN_W1_RESET_ATTESTATION.md`.

The reset attestation must be generated only in the fresh W1 run sessions and actual per-run workspace immediately before W1 entry. The next current-session task is closeout/handoff; the next fresh-session task is W1 reset and entry-gate execution.

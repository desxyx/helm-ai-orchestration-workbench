# Mac experiment working-file cleanup result — 2026-10-07

Executor: Operations Coordinator. Direct Owner authorization; see README.md for original instruction and scope.
Result: COMPLETED; all 120 deletion targets are gone, and retained data rechecks show no differences.

## Removed

- W1/W2/W3 workload-source working copies, including three workload bundles under Coding, W1 frontend/backend, and application source/build directories for site-01/site-02.
- 10 third-party bare clones and 94 temporary clones from MA-1 resolution; redownloadable Ubuntu images, Lima packages and unpacking tools.
- W2 webui build workspace, npm content cache and two Python bytecode caches; npm debug logs retained.
- 1,516 duplicate scan corpus files: each was confirmed before deletion to have a retained file outside deletion scope with identical size/SHA-256. Mapping is in PLAN.json.

Total removed: 120,547 files, logical size 2,043,684,368 bytes (about 2.04 GB). This is not an estimate of actual APFS space reclaimed.

## Retention and verification

A pre-execution baseline covered 283,022 retained files (logical size 3,092,202,335 bytes); content hashes or symlink targets were rechecked individually before/after execution, with 0 errors.
RETAINED_BASELINE.jsonl.gz SHA-256: `<PRIVATE_REF_03481>`.

Retained experiment data, raw sessions/conversations, Observer/HC, measurement/acceptance reports, screenshots, protocols, experiment tools, verifiers and MA-1 evidence fixtures.
Two modification diffs and 44 additional records found in source working copies were first preserved in local private_custody/; locators/hashes are in PLAN.json, without uploading original contents.

Original sealed source/workspace archives remain intact as experiment forensic evidence. This cleaned source working copies, without erasing source from historical archives or rewriting old manifests, original seals or Git history.
Run-copy paths in old reports may no longer exist; use this PLAN.json's retained-original mapping and the original sealed archives for historical investigation.

WatchOver product repository and current Windows minimal handover package retained. No Windows, cloud-resource, GitHub-repository deletion or other task directory operation. Windows progress follows that group's actual handover; this does not declare W3 closed.

## Audit files

- PLAN.json: exact pre-execution frozen scope, provenance, retained-baseline binding, diff custody and duplicate-original mapping; PREPARED_NOT_EXECUTED is the state when the plan was sealed; see RESULT.json for execution results.
- RESULT.json: actual deletion results, retained-data check results and zero remaining targets.
- cleanup.py: script used; refuses a repeated apply once RESULT.json exists.
- SHA256SUMS_CLEANUP: hashes of this cleanup package's public audit files; excludes local private_custody/.
- REVIEWER_VERIFYONLY_PROMPT.txt: scoped read-only recheck entry for the existing Reviewer.

Independent review status: NOT_PERFORMED. These are the executor's operational checks, not independent Reviewer PASS, and do not change original experiment verdicts.

---

Publication note: English translated/redacted historical document, source-00561. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

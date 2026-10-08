# Mac experiment working-file cleanup — 2026-10-07

Owner's original instruction, translated:
> They're nearly finished over there. Please carefully inspect the AI-CICD task repository at <HELM_ROOT>/council/task/AI_CICD, follow the clues and delete the experiment run files that should go; delete the W1–3 code too. But keep the experiment data and your conversations. Those are useful.

Scope: rebuildable local Mac run caches for this task, W1/W2/W3 workload-source/build working copies, and explicitly linked Coding/Workspaces experiment directories.
Retain experiment data, raw sessions/conversations, Observer/HC, measurement/acceptance records, screenshots, manifests, original sealed archives and experiment tools/test inputs that explain results.
Retain WatchOver product repository and current minimal handover package; delete no GitHub repositories, Windows files, cloud resources or other tasks.

Sealed source/workspace snapshots are original experiment forensic evidence and remain preserved. Remove working copies, without rewriting original sealed tars or reports.
Retain MA-1 synthetic provenance fixtures (including simulated venv) and negative test inputs; do not mistakenly delete them by directory name.
Retain npm debug logs; clean only `_cacache`. Delete duplicate scan corpus files only if their byte hashes match retained files outside deletion scope; retain files with no alternative original.

Before execution, create a fixed deletion manifest, individual retained-file SHA-256 baseline, and custody of source origin/HEAD/modification diffs.
`private_custody/` stays local: diffs/additional records that may contain configuration values are not uploaded; the manifest contains only locators/hashes, no secret values.
After execution, recheck retained baseline individually and confirm selected working copies are gone. Do not rewrite old manifests; this manifest records cleaned run copies and retained-original locations.

This records Owner-authorized cleanup, not independent Reviewer PASS signed by the Operations Coordinator, and does not declare Windows/W3 experiments closed.

---

Publication note: English translated/redacted historical document, source-00563. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

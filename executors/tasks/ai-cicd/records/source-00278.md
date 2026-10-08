# W3 Windows run record — documents only

[Recorded by]: Operations Coordinator (Claude) (Windows seat), 2026-10-07
[Owner instruction, translated]: Keep the whole W3 experimental record, including the records left by the deployer, for now. Move it somewhere under council/task/AI_CICD, documents only, remember. Then push. After this project's Mac Operations Coordinator confirms it is correct, start deletion.
[Status]: W3 executed 2026-10-06/07 (Basic, light variant, native Windows); Observer RUN-W3 sealed. Start with W3_RESULT_SUMMARY.md.
[Integrity]: SHA256SUMS in this folder. Files under deployer_transcripts/ and deployer_record/ are byte-identical copies of the Deployer client-native session store and its WatchOver workspace (verified). AI_CICD/** is `-text` in .gitattributes, so bytes are preserved on checkout.
[Builder boundary]: This folder contains W3 workload specifics. Do not place it in any WatchOver Builder context; convert observations into workload-neutral requirements first (see W3_RESULT_SUMMARY.md, last section).

| Path | Content |
|---|---|
| W3_RESULT_SUMMARY.md | One-page result summary for the Human Operator / Mac Operations Coordinator (Chinese in the private original; English derivative here) |
| deployer_transcripts/ | S1 `<NATIVE_ID_1514>` and S2 `<NATIVE_ID_0991>` Claude Code native JSONL + S2 sibling folder (tool-results) |
| deployer_record/ | The Deployer's WatchOver workspace: state.json, events.jsonl, README.md, evidence/*.txt |
| deployer_deploy_config/ | Deployment config files the Deployer wrote (compose, Caddyfile, Dockerfile.front, setup-vm.sh, settings, non-secret env); stage/ = the copy it packaged |
| observer/outputs/ | Independent Observer outputs (11 files + SHA256SUMS) |
| observer/packet_meta/ | Issued RUN_MANIFEST, ALIASES, CONTROL_FACTS and the 77-file packet SHA256SUMS |
| custody/ | Append-only run log RUN_W3_SOURCE_VERIFICATION.md, CP-01 snapshot, harness note, inventories (CP-02, post-teardown), hash lists |
| control/ | Exact texts sent (brief, opening, continuation, teardown, Observer prompt), operator sheet, blank HC forms |
| hc_custody/ | Locked HC-INT / HC-TERM Owner answers (unscored; quarantined from Deployer/Observer; not read by Operations Coordinator) |

**Excluded on purpose (not documents):** Taiga upstream source clones (`src/`, ~107 MB), packaged source tarballs (`deploy/stage/*.tar.gz`), workspace/session tar archives (kept local-only under Human Operator/userops/tasks/AI_CICD/W3_WINDOWS_RESULT_2026-10-07/raw_private/, gitignored), screenshots (in that Human Operator mirror folder, tracked).

**Content notes:** Custody secret scan (canary detected) over this folder: 9 candidates, all source-code identifiers in transcript tool output; no credential values. Transcripts contain personal account identifiers (cloud/GitHub emails) and the run's project/host names — acceptable for the private HELM repository only; not for any public export.

---

Publication note: English translated/redacted historical document, source-00278. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

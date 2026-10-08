# W1 R3a Preflight After Workspace Relocation — 2026-09-28

Control-only evidence. Never Deployer-visible.

- Timestamp: `2026-09-28T14:37:48+10:00`
- Relocation requested by Human Operator: move live-run isolation out of `/private/tmp` and into `<CLIENT_HOME>/Desktop/Coding`
- Workspace: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_W1_2026-09-28/deployer`
- Workspace boundary: outside HELM and `AI_CICD/pre`
- Empty check: PASS — `find -mindepth 1 -maxdepth 1 -print` returned no entry
- Positive control: PASS — the same `find` instrument detected `../../../../executors/tasks/ai-cicd/records/source-04894.txt`
- Observer package: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_W1_2026-09-28/observer`
- Prior remote-pin and frozen-brief checks: unchanged and still PASS

Current R3a preflight result: `PASS`. This record supersedes the old workspace-location evidence. Entry 0 is still required immediately before T0.


# W1 R3a Preflight — 2026-09-28

Control-only evidence. Never Deployer-visible.

- Timestamp: `2026-09-28T14:29:51+10:00`
- Workspace: `/private/tmp/watchover-w1-entry-20260928.Sd70Se`
- Workspace boundary: outside HELM and `AI_CICD/pre`
- Empty check: PASS — `find -mindepth 1 -maxdepth 1 -print` returned no entry
- Positive control: PASS — the same `find` instrument detected `/private/tmp/watchover-w1-entry-control-20260928/KNOWN_PRESENT_CONTROL.txt`
- Prior-arm/generated configuration: none present because the workspace is empty
- Frozen brief: PASS — lines 19–20 name both designated remotes and exact pins
- Frontend remote pin: PASS — GitHub API returned `<PRIVATE_REF_03329>`
- Backend remote pin: PASS — GitHub API returned `<PRIVATE_REF_00532>`
- Frozen brief SHA-256: `<PRIVATE_REF_02586>`

R3a controller-side preflight result: `PASS`.

This is not Entry 0 and not the reset attestation. The workspace must be checked again immediately before T0.


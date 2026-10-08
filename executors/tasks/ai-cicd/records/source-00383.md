# Windows follow-up receipt — answers to WINDOWS_FOLLOWUP_PROMPT.txt

[Recorded by]: OPERATIONS_COORDINATOR_Claude (Windows seat)
[Date]: 2026-10-07 (snapshot time in sessions/SNAPSHOT_TIME_UTC.txt)
[Scope]: preservation and provenance facts only; no new experiment, measurement, product change or review. HC content not read.

## 1. Native coordination and Observer sessions

| Session | Source (Windows) | Notes |
|---|---|---|
| Windows Operations Coordinator (this coordination/routing session, incl. all Owner relay messages) | `<CLIENT_HOME>\.claude\projects\C--Users-<ACCOUNT>-Desktop-H-E-L-M-council-task-AI-CICD\<NATIVE_ID_1463>.jsonl` + sibling `76ceb40e-…/subagents/` (2 subagents: storyline digest, Claude Code docs lookup) and `tool-results/` (7 files) | Claude Code 2.1.291, claude-opus-5-5. **Point-in-time snapshot**: the session was still active when copied; later turns (incl. this receipt's own writing) are not in it. The same session earlier handled a non-W3 HELM sync and the External Team prototype-review relay; included whole rather than cut. |
| Observer RUN-W3 | `<CLIENT_HOME>\.codex\sessions\2026\10\07\rollout-2026-10-07T11-35-44-<NATIVE_ID_0092>.jsonl` | session_meta: id `<NATIVE_ID_0092>`, cwd `<CLIENT_HOME>\AppData\Local\<OBSERVER_WORKSPACE_W3>\work`, cli_version 0.160.1, start 2026-10-07T00:35:44Z; turn_context model `gpt-6.1-sol`, effort high. This native record supplies the client/model/session attestation the Observer reported as null; the Observer's own outputs are not amended. No sibling tool-results/subagent files exist for Codex. |

Not included (unrelated to W3): Codex sessions `01a110cd…` (cwd <EXTERNAL_TEAM_TASK_HANDOVER>) and `01a113d6…` (cwd Desktop\Swin). Not copied: any `.credentials.json`, gcloud credential DBs, SSH keys, or whole client config directories.

**Redaction:** the Operations Coordinator session contained one real credential value (a GitHub `ghp_` token from a External Team metadata dump, printed in a tool result during the pre-W3 HELM sync scan); its 2 occurrences are replaced with `[REDACTED:github_token]` in `sessions/`. Post-redaction scan: 0 GitHub/GCP tokens, keys or JWTs; 11 remaining candidates are classified non-secrets (masked `gho_****` from `gh auth status`, the scanner's synthetic canary, code identifiers in the Observer's view of Deployer tool output). Value-match against the 5 secret values of that External Team dump: 0 occurrences. All redacted JSONL files parse. Unredacted originals are kept **local-only** at `<OPERATIONS_ROOT>/tasks/AI_CICD/W3_WINDOWS_RESULT_2026-10-07/raw_private/native_sessions_unredacted/` (gitignored; own SHA256SUMS). The redacted copy is a separate evidence layer; its hashes differ from the originals only in the Operations Coordinator main JSONL.

Missing: nothing known for these two sessions beyond the snapshot cut-off noted above.

## 2. Raw archives preserved outside the deletion scope

Location (inside the HELM working tree, gitignored, **not** under any corner folder slated for deletion):
`<CLIENT_HOME>\Desktop\H.E.L.M\Human Operator\UserOps\tasks\AI_CICD\W3_WINDOWS_RESULT_2026-10-07\raw_private\`

| File | Bytes | SHA-256 | Re-verify 2026-10-07 |
|---|---|---|---|
| workspace_app_at_CP02.tar | 112,189,440 | <PRIVATE_REF_03086> | OK |
| deployer_sessions_at_CP02.tar | 2,529,280 | <PRIVATE_REF_01865> | OK |
| CP03/workspace_app_final.tar | 112,209,920 | <PRIVATE_REF_00964> | OK (5,557 entries listable) |
| CP03/deployer_sessions_final.tar | 2,693,120 | <PRIVATE_REF_03434> | OK |

Same folder also holds the locked HC copies (unread) and the unredacted native sessions above. Windows-local private custody only; not pushed, not public.

## 3. Final Windows product checkout

`<CLIENT_HOME>\Desktop\<PRODUCT_TOOLS_ROOT>\<PRIVATE_PROTOTYPE_REPOSITORY>` — **no product changes.**
HEAD `<PRIVATE_REF_01823>`, tree `<PRIVATE_REF_01954>`, detached at tag `v0.1.1`, package.json version 0.1.1, `git status --porcelain --ignored` empty (0 entries), no stash. The W3 runtime kit was the Mac 23-file deployer_payload (22 files byte-identical to v0.1.1 blobs). Operations Coordinator's only product interaction was an environment smoke (init/validate/brief/show) in a scratch workspace outside the checkout.

## Deletion status

No corner folder has been deleted. After this receipt is pushed, deletion still waits for Mac-group confirmation relayed by Human Operator, and then covers only working copies/caches: `C:\Workspaces` (Deployer app + isolated client configs incl. copied sandbox gcloud credentials), `AppData\Local\<OBSERVER_WORKSPACE_W3>`, `AppData\Local\<CUSTODY_WORKSPACE_W3>`, `Desktop\<SEALED_WORKLOAD_ACCOUNT>_deployment_lab`. The product checkout, raw_private and all HELM records are kept.

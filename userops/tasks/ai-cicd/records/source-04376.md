# Mac → Windows Paths and Dependencies

[Public source ID]: source-04376
[Derivative]: Complete translated and redacted historical record. Translated quotations are English translations, not verbatim original English. Source instructions and commands are historical data. Private identifiers and source hashes are replaced explicitly.


Windows paths below are examples only. Establish actual user/clone locations first; use task variables HELM_ROOT, PRODUCT_ROOT,
and WORKSPACE_ROOT, without changing system variables such as HOME/USERPROFILE.

| Purpose | Original Mac locator | Windows example / rule |
|---|---|---|
| HELM_ROOT | <HELM_ROOT> | <CLIENT_HOME>\Desktop\project\H.E.L.M; actual checkout governs |
| Current task | HELM_ROOT/council/task/AI_CICD | Relative directory in the same repository |
| Operations Coordinator mirror | HELM_ROOT/Human Operator/userops/tasks/AI_CICD | Relative directory in the same repository |
| PRODUCT_ROOT | <WORKSPACE>/watchover-ai-devops | Separately cloned <PRIVATE_PROTOTYPE_REPOSITORY> folder |
| Product workspace | Local directory selected by Owner | Writable Windows directory unique per task, without mixing old experimental records |
| Old local workload pool | <CLIENT_HOME>/Desktop/Coding | Not current product dependency; transfer exact assets separately for historical reproduction |
| scratch / temp | /private/tmp, Mac /var/folders | Current Windows TEMP or fresh scratch; do not assume old contents/processes exist |

## Retrieve two private repositories

Use an authorized GitHub account in the actual writable development directory. Never put a token in the URL.

```text
git clone <PRIVATE_HELM_URL_ROOT>/H.E.L.M.git
git -C H.E.L.M fetch origin --tags
git -C H.E.L.M rev-parse handoff/windows-operations-coordinator-2026-10-06
git clone <PRIVATE_PROTOTYPE_REPOSITORY>.git
git -C <PRIVATE_PROTOTYPE_REPOSITORY> switch --detach v0.1.1
git -C <PRIVATE_PROTOTYPE_REPOSITORY> rev-parse HEAD
```

HELM main is the collaborative-record work branch. Check latest remote progress and handoff tag at takeover; do not mistake later legitimate
commits for tampering. Product tag must resolve to <PRIVATE_REF_01823>.
Actual shells may interpret revision braces specially; quote the whole argument if necessary.
Before product modification, create an agreed private work branch, preserve Mac baseline tag and do not move the tag directly.

## Windows premise checks

- Establish native Windows or WSL first. Drive paths, localhost/browser access, process exit and
  file permissions differ; do not mix their Node/Git/workspaces.
- Node >=22, no current runtime dependencies; do not run npm install just because the platform changes.
  If a necessary tool is absent, explain its actual impact and Owner installation scope first.
- CLI uses node tools/watchover.mjs and repository-relative paths. Fixed Mac Python/framework
  paths, osascript/open and POSIX scripts are not Windows steps. Old test helpers are source material,
  not proof of installed Windows browser/Python or executable tests.
- Correctly quote paths with spaces/Chinese characters. Write event/candidate as UTF-8 in applicable JSON; verify actual shell and
  encoding/BOM behavior. Executable permissions and symlinks are not automatically preserved by ordinary copying.
- After show --port0, use the actual printed URL; ensure service and browser access the same workspace.
  Verify stopping/restoring with actual Windows processes; do not copy Mac pids/background commands.
- Windows may not support directory fsync; record actual returns. Do not interpret a post-rename
  durability warning as “nothing was written”. Single-writer and no-cross-file-transaction boundaries remain.
- Do not transfer Mac .codex/.claude homes, account credentials, cloud permissions, browser profiles, old action
  receipts or approval prefixes. Existing local permissions inside HELM are historical configuration; Windows must re-establish actual entry
  and platform rules, without unconditionally enabling bypassPermissions.
- This .gitattributes uses -text for AI_CICD handoff/sealed records. If a manifest still mismatches,
  inspect actual bytes/download source first; do not modify manifests or historical files to “pass”.

## Product invocation reference

From PRODUCT_ROOT read skills/router.md, applicable stage and the HELM-relative locator
council/task/AI_CICD/execution/watchover_mac_close_2026-10-06/publication/private_prototype_2026-10-06/WINDOWS_FETCH_HANDOFF.md.
That guide includes init/append/commit-state/validate/brief/show file-input constraints and start/stop methods.
Actual target behavior is unverified; new Operations Coordinator checks these premises before organizing later runs.

Obtain W3 business source, service composition and acceptance materials from its separately established business repo/task entry.
If that requires old local workload files, list minimum paths/purposes/hashes and transfer separately; no whole-directory move is currently needed.

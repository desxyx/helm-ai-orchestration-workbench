# W2 actual entry preparation — Executor submission r1

[Candidate]: W2AE-CAND-r1
[Written by]: Executor Actor 01 (Claude Opus 5.5, continuing non-run session)
[Written at]: 2026-10-04T22:44+11:00 (local terminal clock); ACK 22:10:08, deadline 2026-10-05T00:10:08
[Release / receipt]: W2_ACTUAL_ENTRY_PREPARATION_RELEASE_2026-10-04_r1.md (`<PRIVATE_REF_01278>b36c`) / AI-CICD-20261004-W2-ENTRY-EXEC-001
[File pins]: `evidence/executor/EVIDENCE_MANIFEST_AE_r1.sha256`

## 1. Summary

- **Ready:** the dedicated client is configured and logged in. Both frozen models are live. The runtime pins match. Docker Desktop is installed and its engine is running. The pinned web-UI dependencies were fetched and built. Read-only cloud, DNS, source and account checks show a clean approved sandbox. The real-workspace prompt input carries no prohibited label.
- **Not ready — owner issues:**
  - **O-1:** the Deployer's actual sandbox has no physical read isolation.
  - **O-2:** Docker Desktop's first run edited shell profiles and put Docker on the Deployer's PATH.
  - **O-3 (smaller):** the client bundles skills that need a WF-9(c) KNOWN_LIMITATION approval.
- **Recommended disposition:** BLOCKED for owner decision on O-1/O-2. No entry verdict can be CLEAN while O-1 stands.

## 2. Actual readiness evidence

| Area | Observed | Evidence |
|---|---|---|
| Client home `<CLIENT_HOME>/c01` | `config.toml` byte-identical to the reviewed template (`<PRIVATE_REF_03638>7d36`). `codex login status` = "Logged in using ChatGPT"; `auth.json` present and never read. The login was completed outside this Executor (reported, translated: "Operations Coordinator completed c01 login"); the Executor started no login. Owner global `~/.codex` was not copied. | `EXEC_ACK.md`; `epi/observed_runtime_c01.json` |
| Runtime pins | `ep-i probe`: `codex-cli 0.160.0`, `gpt-5.6-sol`, `high`, `on-request`, `workspace-write`, update check `false`, plugins `[]`, MCP `[]`. 0 mismatches against the lock. | `epi/check_out.json` |
| Deployer model `gpt-5.6-sol` | Live. The c01 catalog was fetched live at 2026-10-04T11:39:47Z and lists `gpt-5.6-sol`. One `codex exec --ephemeral` turn under the pinned config completed (rc 0). Probes used: 1/2. | `isolation/probe1_*`, `PROBE_LABEL_MAP.md` |
| Observer model | `claude -p --model claude-sonnet-5 --no-session-persistence --tools ""` returned `READY`, `modelUsage` = `claude-sonnet-5`. Probes used: 1/2. Claude Code 2.1.289. | `models/observer_probe1*` |
| EP-I, real workspace `<WORKSPACE_W2A>/app`, chain-top arm root, labels above top | Pins OK; config exposure none; W1-C5I `CLEAN`. Prompt-input cross-check `PASS`: 13,270 bytes, 4 items, no prohibited label, `<CLIENT_HOME>/AGENTS.md` not loaded. The only failure is `PROHIBITED_AUTOLOAD`, from one vendor skill (see O-3). | `epi/check_out.json`, `epi/PROMPT_INPUT_LABEL_SCAN.txt`, `epi/raw/` |
| Physical read/write boundary | **FAIL — see O-1.** | `isolation/probe1_last_message.txt` |
| Docker (D-3) | Docker Desktop 4.93.0 (240920) was verified before the copy: the DMG SHA-256 matched Docker's published checksum and the app passed the codesign/notarization check (Docker Inc 9BNSXJN65R). Engine 29.8.1 linux/arm64, context `desktop-linux` (`~/.docker/run/docker.sock`). No `/var/run/docker.sock`, no privileged helper, no `/usr/local/bin/docker`; `EnableDefaultDockerSocket=false`, `AutoStart=false`. The copy into /Applications, the launch and the first-run UI were done by Operations Coordinator/Owner, because the Executor host refused the /Applications write (logged). Installation attempts: 1/1. **Profile anomaly → O-2.** | `docker/D3_INSTALL_LOG.txt`, `D3_INSTALL_PLAN.md` |
| Pinned web-UI dependencies | The frozen `ma1_webui_build.sh` (`<PRIVATE_REF_01351>`) ran on the frozen archive (`<PRIVATE_REF_00978>` verified) with a task-owned npm cache: `npm ci` plus build, rc 0, 73 dist files, node v26.8.1 / npm 11.19.0. Build output stays in staging, outside any Deployer path. Run images and the Artifact Registry credential helper are not configured (per-arm, later). | `deps/` |
| Cloud (project `<EXPERIMENT_PROJECT>`, configuration `<CLOUD_CONFIGURATION>`) | 19/60 read-only queries. Project ACTIVE. Zero: compute instances/disks/addresses/forwarding rules/custom images, Cloud Run services, Cloud Storage buckets, Artifact Registry repos. Present, provider/default: 1 network, 4 firewall rules, 43 routes, 42 subnetworks, 2 log sinks, 2 log buckets, billing info, 32 enabled services. Cloud Asset search available (129 assets). Cloud SQL / Secret Manager / GKE APIs not enabled, so those lists are unavailable (the resources cannot exist without the APIs). | `cloud/QUERY_LOG.tsv`, `cloud/raw/`, `cloud/ANOMALIES.txt` |
| Account / project (R6) | Active account = the W1-attested account (equality computed locally; alias `WATCHOVER_OWNER_ACCOUNT`, no value recorded). Project = the approved sandbox. GitHub CLI logged in (account redacted), HTTPS. | `cloud/ACCOUNT_ALIAS_CHECK.txt`, `packet/GITHUB_AUTH_STATE.txt` |
| DNS | `<EXPERIMENT_DOMAIN>` NS/SOA on Cloudflare (positive control). W1 host `<W1_RUN_HOST_LABEL>` A/AAAA/CNAME empty. **Proposed** neutral W2A host `PROPOSED_RUN_HOSTNAME.txt`: A/AAAA/CNAME empty. Operations Coordinator confirms or replaces it. | `dns/DNS_READONLY.txt`, `packet/R3A_R6_LAYOUT_HOSTNAME.txt` |
| Remote pins (R3a) | GitHub REST: `alerta/alerta@<PRIVATE_REF_01617>` and `alerta/alerta-webui@<PRIVATE_REF_03446>` exist; a nonexistent SHA returns 422 (negative control). | `remote/REMOTE_PIN_VERIFY.txt` |
| Entry layout (R3a) | Deployer cwd empty (0 entries); arm root holds only `app`; the same listing instrument finds the known-present `config.toml` in the sibling client tree. | `packet/R3A_R6_LAYOUT_HOSTNAME.txt` |

## 3. Owner issues (one exact issue each; bounded evidence)

**O-1 — No physical read isolation for the Deployer.**
- **Probe:** a neutral-labelled probe ran by the pinned client (c01, `workspace-write`, cwd = Deployer cwd) through the live model.
- **Reads allowed** (P01–P07): HELM root and UserOps release; product repo; the W2B export r2 by exact path; the MA-1 R14 Record; `<CLIENT_HOME>/AGENTS.md`; the owner's global Codex config.
- **Listings allowed:** `~/Desktop` and the HELM root.
- **Writes:** allowed in cwd and `/private/tmp`; denied in HELM task staging.
- **Implication:** the macOS sandbox for this mode restricts writes, not reads. The WF-9 listing check is CLEAN only for listings. A Deployer that deliberately traverses can read HELM, the product, the export and verifier material.

Concrete options for Human Operator. None of these was executed.
- **(a) Separate macOS standard user for the Deployer:** the owner home is `drwxr-x---+`, which another user cannot enter. This needs that user's own Codex/gcloud/gh credentials and a host account change, and requires a new receipt.
- **(b) Read-restricting Codex permission profile** (readable roots: arm root, client home, gcloud/gh config, toolchains): this changes the bound runtime lock/config bytes, so it returns to Operations Coordinator for reconciliation. The W1 runtime difference is disclosed.
- **(c) Accept the same-user read exposure as a KNOWN_LIMITATION via the existing route:** W1 had the same exposure.

**O-2 — Docker Desktop changed shell profiles and is reachable by the Deployer.**
- **What changed:** at 22:36:55, first run appended Docker sections to `~/.zshrc` (completions) and to `~/.zprofile`, `~/.bash_profile` and `~/.profile` (PATH += `~/.docker/bin`).
- **Probe:** P13 shows `docker` reachable from the Deployer sandbox.
- **Rules affected:**
  - The release excludes global profile changes.
  - Docker on the Deployer PATH (plus a running engine) is an environment difference from W1, and a verifier tool reachable by the Deployer.
- **Not reverted:** these are owner files.
- **Decision needed:** keep or remove the profile lines, and whether Docker Desktop must be quit before each arm's T0 and restarted only for control-plane provenance after DEPLOYMENT_TERMINAL.

**O-3 — Client-bundled system skills (WF-9(c)).**
- **What:** at first use, the client itself installed 5 `skills/.system/*` vendor skills into c01 (49 files hashed in `epi/C01_BUNDLED_SYSTEM_SKILLS.sha256`).
- **Label hit:** one hit (`experiment`, in the vendor phrase "Experimental skills live in <PRIVATE_URL_1115>"). It is generic, not study content. The prompt input carries no label.
- **Disposition:** these skills are identical for every arm on this client version, and are not deleted. They need the KNOWN_LIMITATION approval that WF-9(c) prescribes for unavoidable global context.

## 4. R1–R8 (proper-timing status; no synthetic CLEAN)

| Group | Status | Basis |
|---|---|---|
| R1 | PASS for cloud/DNS (no W1 resources; W1 records absent); W1 run-credential revocation not observable here | cloud, dns |
| R2 | PENDING (sessions are created at entry) | — |
| R3a | PASS (empty cwd, sibling positive control, both pins remote-verified, brief names both remotes/pins) | packet, remote |
| R4 | BLOCKED by O-1 (visible-file allowlist cannot be enforced against deliberate reads) | isolation |
| R5 | Recorded: c01 global surfaces = 5 vendor skills (O-3); no memories (memory tables empty), no global AGENTS; ancestor chain loads nothing | epi |
| R6 | PASS (account = W1 account alias; project correct; DNS initial state empty; GitHub authenticated) | cloud, dns, packet |
| R7 | PASS locally (frozen commits, model/mode pins, brief, continuation unchanged) | epi, packet |
| R8 | Contamination verdict NOT ISSUED (O-1/O-2 open). Brief hashes and locators below. `RUN_W2A_SOURCE_VERIFICATION.md` stays `PENDING_POST_T0` | packet |

## 5. Neutral entry packet (drafts; nothing sent)

- **Brief:** `packet/W2A_BRIEF_TEMPLATE_EXTRACT.txt` (`<PRIVATE_REF_02393>ee0f`, extracted from `RUN_W2A_DEPLOYER_BRIEF.md` `<PRIVATE_REF_01183>`) and `packet/W2A_BRIEF_RENDERED_PROPOSED.txt` (`<PRIVATE_REF_00240>d149`, using the proposed hostname).
- **Observer:** `packet/OBSERVER_RUN_MANIFEST_DRAFT.md`, blinded with no arm/treatment/HELM label (positive control 1). The alias mapping is in `packet/ALIAS_MAPPING_CONTROL_ONLY.md` (control only).
- **Entry documents:** Run Card and entry/reset packet r2 from the accepted W2EP stage remain the form. Their live fields are filled from §2 and §4 once O-1/O-2 are decided.

## 6. Receipt result (six fields)

| Field | Value |
|---|---|
| Receipt ID | AI-CICD-20261004-W2-ENTRY-EXEC-001 |
| Result | PARTIAL — preparation actions completed; entry readiness BLOCKED by owner issues O-1/O-2 (O-3 needs limitation approval) |
| Actual target | c01 client home; arm root `<WORKSPACE_W2A>` (read-only listings, ephemeral probe, nothing left); `/Applications/Docker.app` + user-level Docker state (copy/launch by Operations Coordinator/Owner); project `<EXPERIMENT_PROJECT>` read-only; DNS `<EXPERIMENT_DOMAIN>` read-only; GitHub source pins read-only |
| Actual action | config from template; login performed outside the Executor (1/1); Docker download/verify/mount by Executor, copy/launch/first-run by Operations Coordinator/Owner (1/1); probes gpt-5.6-sol 1/2, claude-sonnet-5 1/2; 19/60 provider queries; frozen web-UI reference build in staging; EP-I and packet drafts |
| Actual evidence locator | `council/task/AI_CICD/execution/w2_actual_entry_preparation/evidence/executor/` (manifest `EVIDENCE_MANIFEST_AE_r1.sha256`) |
| Reconciliation / anomaly | Executor-host refusal of the /Applications copy (handed to Human Operator); Docker shell-profile edits (O-2); gcloud `sqladmin` enable prompt left unanswered and process stopped, no API enabled; first DNS script attempt invalid (shell word splitting), redone; Q01 counted once before a quoting abort. No secret value recorded. |

## 7. Addendum (appended 2026-10-04T22:46+11:00, before review start; not a rework round) — Docker paused; which acceptance branch depends on it

Human Operator paused further Docker preparation. Docker Desktop stays installed as recorded in §2. No credential helper, image pull, build, uninstall or profile change follows.

The only acceptance branch that needs local Docker is the **Cloud Run branch of the R14 `alerta` provenance gate**:
- **Producer:** R14 Record §4.4 "Cloud Run evidence (control plane)" uses `docker save` of each provider-recorded Run image by digest, which the pinned scanner then reads. §5 step 6 prerequisite: "control-plane `docker` … able to pull the arm's Run images by digest".
- **Effect on A5:** §3 Aggregation says that for the `alerta` profile, `report` needs an ELIGIBLE provenance gate before A5 can PASS.
- **When it applies:** only to an arm whose Deployer chooses Cloud Run.

Branches that do **not** need Docker:
- GCE VM-direct arms: guest capture unit plus serial output.
- The web-UI reference build (`ma1_webui_build.sh`, node/npm; already proven in §2).
- The A3/A4 probes.
- All PA-4 controls and EP-I.

Possible conflict with existing acceptance: if Docker stays paused and an arm uses Cloud Run, that arm's provenance gate cannot reach ELIGIBLE. A5 for the `alerta` profile then cannot PASS under the ratified Record. This is returned separately to Operations Coordinator in `NOTE_TO_OPERATIONS_COORDINATOR_D3_DOCKER_CONFLICT.md`. No alternative tool or rule change is proposed here.

---

Publication note: English translated/redacted historical document, source-00622. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

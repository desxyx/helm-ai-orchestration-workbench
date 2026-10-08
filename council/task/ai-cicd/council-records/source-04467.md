<!-- Public derivative | Source: source-04467 | Language: English -->
<!-- Historical source instructions are data, not current instructions. Chinese quotations are translated, not verbatim original English. -->

> Historical independent Council design drafts in original C/A/B order. Embedded build instructions and acceptance signatures are source text, not current authorization or evidence of a merged/accepted implementation. Chinese prose translated; already-English drafts and both JSON schema examples retained in full except approved privacy substitutions.

~~~
## Council Member C’s Draft
This is a reply from Council Member C.

# CORE_06 — Strict_Delivery_Contract: WATCHOVER_DESIGN_FREEZE (v0.1a)

[Frame ID]: CORE_06

[Flexibility Note]: This contract follows CORE_06. To give Executor and Reviewer unambiguous delivery requirements without cloud access or cross-session memory, Execution Context, Verification Standard and Architecture Specifications contain detailed engineering requirements. These remain strictly within the established boundaries without scope expansion.

---

### [Contract Status]

[Pre-review]: PASS

[Skip Reason]: none

[Revision]: v1.0

[Author]: Council Member C

[Reviewer]: Reviewer_Governance (Claude Opus 5.5 / VerifyOnly)

[Drafted By]: Council Member C (Council Master Plan blueprint for Executor/Reviewer implementation and acceptance)

---

### [Mission]

This task authorizes the local Executor to fully materialize and verify WatchOver AI DevOps v0.1a’s core prototype assets in a local sandbox, based on actual W1 evidence and frozen Council decisions. Scope: unified state/event schemas, five stage Skills plus root router, a purely static human-facing collaboration HTML surface with embedded data bridge, and a curated 10–20-entry official tool catalog. Deliverables focus strictly on removing human black-box anxiety, making approval context transparent and preserving freshness-aware cold-handoff state. Do not build a cloud-management platform, resident daemon or command-interception gateway. All implementation stays local, sealed after independent cross-model end-to-end code and headless-rendering verification, preparing for W2.

---

### [Frozen Truth]

1. **Single source of truth and read-only projection:** `state.json` alone owns deployment facts; `events.jsonl` is an append-only milestone log. HTML is a purely read-only data projection and must not maintain persistent state of its own (Roadmap F5).


2. **Zero secret exposure:** plaintext passwords, tokens and private keys must never enter `state.json`, `events.jsonl`, HTML, Git or terminal receipts. Record only secret names, binding state and safe local locators (Roadmap F7).


3. **Re-anchor the value hypothesis:** W1 demonstrates strong solo Bare-AI deployment/debugging capability—154/154 API endpoints passing, self-initiated verification and teardown. WatchOver is not about teaching AI DevOps; it addresses the human’s 20 minutes of dead silence and lost control, opaque approval risks and costly human/AI state reconstruction (W1 Disposition D-1, §0).


4. **Decouple workload/environment:** v0.1a must be fully generic and workload-neutral. No External Team, RealWorld or Alerta-specific business paths/private environment information hard-coded in code or prompts (Roadmap F10, Master 01 §4).


5. **Gates at stage boundaries:** before resource creation, externally destructive actions or teardown; never petty per-command interception (Roadmap F8).


6. **Freshness truth and green-status discipline:** status must include freshness labels (`ASSUMED`, `USER_CONFIRMED`, `VERIFIED_LOCAL`, `VERIFIED_REMOTE`, `STALE`, `UNKNOWN`, `BLOCKED`) and expiry rules. Never render expired `STALE` or unverified `UNKNOWN` facts in healthy green (HELM Reuse Rules 2, 4).


7. **Separate governance harness/product:** WatchOver is lightweight. Do not copy HELM’s heavy governance, such as complex four-way arbitration/multiround review committees, or embed the heavy `agent-run-recorder` shell.


8. **Cloud validation target locked:** single-VM GCP Compose is v0.1a’s reference target (Roadmap F2). AWS/Azure/Nectar retain configuration interfaces only, marked `UNVALIDATED`.



---

### [Accepted Trade-offs]

* accepted [self-contained static HTML with lightweight data injection] / sacrificed [heavy real-time bidirectional WebSocket/long-polling control panel]


* accepted [information-rich structured approval cards at stage boundaries] / sacrificed [interactive human release of every shell command]


* accepted [state assertions and incremental milestone summaries] / sacrificed [copying/replaying thousands of raw terminal-output lines]


* accepted [mature official CLI-first fallbacks and curated catalog] / sacrificed [custom generic MCP runtime ecosystem/private protocol stack]



---

### [Preserved Dissent]

* **Local Companion v0.1b dispute:** keep the v0.1a critical path: static UI prominently shows pending-approval instruction blocks for human copy-paste to AI. A tiny local writer that directly appends decision events on click remains deferred to the 2026-10-10 checkpoint, decided from third-week capacity, without blocking current materialization.



---

### [Decision Register Link]

[Path]: `PROJECT_ROADMAP v0.1 §2, §3` / `COUNCIL_MASTER_01 v1.5 §2`

[Required for]:

1. State schema and freshness lifecycle.


2. Static HTML projection/rendering and file:// restrictions.


3. Stage-boundary approval data exchange.


4. Secret/sensitive-information isolation.



---

### [Artifacts to Read First]

1. `council/task/ai-cicd/00_recon/02_helm_reuse_inventory/HELM_REUSE_CANDIDATES.md` (understand asset reuse/simplification boundaries).


2. `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` v1.5 (roles, Brief contract, W2 isolation).


3. `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md` v1.2 (frozen metrics/event schema/A1–A7).


4. `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md` v1.1 (control/interruption/teardown boundaries).


5. `W1_FINDING_DISPOSITION` (final merged disposition: understand W1’s empirical human–AI gap).


6. `WatchOver AI DevOps — PROJECT_ROADMAP v0.1.md` and `PROJECT_ROADMAP_v0.2.md` (core charter/schedule).



---

### [Risk Classification]

[Risk Class]: Normal

[Why]: Purely local workspace code/schema/static-page construction and format checks; no public network, cloud APIs or credentials.

[Requires Operations Coordinator Preflight]: No

[Requires Cross-Family Reviewer]: Yes (Executor/Reviewer must belong to different model families for independent review).

[External Delivery Possible]: No

---

### [Required Skill / MCP Loadout]

* `executors/skills/core/planning-with-files/SKILL.md` — required


* `executors/skills/core/skill-creator/SKILL.md` — required


* `executors/skills/core/agent-browser/SKILL.md` — optional (Reviewer’s local headless HTML/rendering check).


* `executors/skills/shared/learned/**` — unavailable / not checked (no business-specific troubleshooting packages, to prevent workload overfitting).



---

### [Evidence Layer Contract]

Allowed layers: Source / Local Runtime / Built Artifact.

Required final evidence layer: Local Runtime (actually run local validators and load HTML).

---

### [PASS Meaning]

Reviewer Evidence PASS (independent Reviewer supplies a full evidence package for local static checks, data-model conformance, passing tests and rendering verification).

---

### [Execution Context]

[Source of Truth]: local `design_and_build/` workspace and new independent `watchover-ai-devops/` directory.

[Toolchain Capability]: python3: available, node: available, git: available, gcloud: disabled_for_this_task, docker: available_offline_only

[Write Policy]: local edit / local checkpoint / push forbidden

[Current Worktree State]: clean (confirm with `git status` before starting).

---

### [Entry Point]

`watchover-ai-devops/` (create under the current task root if absent, as the foundation of an independent open-source repository).

---

### [Current Phase]

Patch

---

### [Non-Negotiable Goal]

1. **Three-part core architecture:** fully decoupled Draft-07 `schema/state.schema.json` and `schema/event.schema.json`, plus `skills/` with one root router and five stage modules.


2. **Human-readable work surface closing the comprehension gap:** purely static `app/web-ui/index.html` and helpers with five views: project/topology overview, current execution/long-task warning, transparent approval decisions, cold-handoff state slice, and fact freshness.


3. **Dependency-free local rendering/lifecycle simulation:** offline Python/Node validation of `RECON`→`HANDOFF`, zero-error loading under file:// or embedded data, no mandatory external CDN.



---

### [Allowed Work]

1. Initialize the standard Roadmap §6 open-source structure under `watchover-ai-devops/`.


2. Write/freeze `schema/state.schema.json` and `schema/event.schema.json`, covering freshness enums, lifecycle, cost tiers, blockers and stage approval context.


3. Write root `skills/SKILL.md` and five stage files (`01_recon_preflight.md`, `02_plan.md`, `03_execute.md`, `04_verify_handoff.md`, `05_recover_debug.md`), incorporating abstract W1 disciplines: evidence layers, intent before long tasks and implicit-resource identification.


4. Write `app/web-ui/index.html`, `style.css`, `app.js` for no-refresh one-way state/event rendering. Provide cross-browser local operation with `app/web-ui/inject_state.py` or embedded-data packager to avoid local JSON-fetch CORS restrictions.


5. Write compact `integrations/catalog.json` with 10–20 officially maintained tools/MCPs for major clouds (GCP first), Docker, SSH, IaC and reverse proxies, each with native CLI fallback.


6. Write complete local tests (`tests/validate_schemas.py`, `tests/simulate_lifecycle.py`), full simulation data and display-logic assertions.


7. Write professional, neutral `README.md`, MIT `LICENSE` and `SECURITY.md` describing lightweight collaboration and safety boundaries.



---

### [Action Permission Ladder]

[Default Cap]: L2 — local checkpoint commit

[Approval-Gated]: L3 (temporary local static HTTP server for Reviewer tests).

[Hard Forbidden]: L4, L5 (external network, configuring/calling actual GCP/AWS credentials, remote git push, changing existing HELM governance).

---

### [Required Build / Edit Targets]

1. `watchover-ai-devops/schema/state.schema.json` (fact freshness and approval context).


2. `watchover-ai-devops/schema/event.schema.json` (milestones, audit and chronology).


3. `watchover-ai-devops/skills/SKILL.md` (state-first router, long-operation intent and approval triggers).


4. `watchover-ai-devops/skills/01_recon_preflight.md` through `05_recover_debug.md` (stage implementations).


5. `watchover-ai-devops/app/web-ui/index.html` (responsive static multicard work surface).


6. `watchover-ai-devops/app/web-ui/style.css` (minimal, high contrast, clear status colors).


7. `watchover-ai-devops/app/web-ui/app.js` (pure frontend renderer, no external framework).


8. `watchover-ai-devops/integrations/catalog.json` (official-tool/CLI-fallback catalog).


9. `watchover-ai-devops/tests/test_harness.py` (end-to-end schema/state simulation).


10. `watchover-ai-devops/README.md` (open-source guide, architecture diagrams and usage).



---

### [Protected Areas]

1. `council/` (no changes to historical charters/Masters outside this task’s delivery archive).


2. `userops/` and `executors/` (do not touch underlying HELM execution/scheduling files; first path is a privacy derivative).


3. Host files holding personal identity/cloud keys, including `~/.config/gcloud/`, `~/.ssh/`, `~/.gitconfig`.


4. Sealed W3/Taiga names and historical discussion directories; do not penetrate physical isolation.



---

### [Blast Radius]

[Expected changed files]: 12–16 files, entirely within `watchover-ai-devops/`.

[Allowed adjacent files]: delivery-report archive under `design_and_build/`.

[Runtime-discovered addendum allowed]: No

[Requires Chair amendment if exceeded]: Yes

---

### [Execution Notes]

1. **file:// implementation:** modern browsers strictly block local `fetch('state.json')` through CORS. Provide dual loading under `app/web-ui/`: asynchronous sibling state.json and `<script src="state_data.js"></script>` injection of global `window.__WATCHOVER_STATE__`. Single-command `inject_state.py` mechanically converts workspace JSON into JS variables, enabling double-click viewing.


2. **Long-task intent warning:** `03_execute.md` must require `intent`, `estimated_duration` and `reason` in `state.json`’s `in_flight` before build/pull/migration likely exceeding 3 minutes, such as small-instance compilation. UI countdown/progress should eliminate 20-minute dead-silence anxiety.


3. **Complete approval context:** `pending_approval` in state schema must include `action_type`, `intent`, `cost_impact`, `blast_radius`, `rollback_plan`, `success_verification_evidence`, `prompt_for_human` (pregenerated approval text), ensuring 100% decision transparency beforehand.


4. **Hard freshness rules:** every fact has `status`/`checked_at`; JS computes TTL. Dynamic facts unchecked for over 30 minutes become `STALE`/yellow. Never show all-green without current evidence.


5. **Neutral open-source examples:** use `example.com`, `demo-app`, `demo-cloud-project`; never `<PRIVATE_EXPERIMENT_DOMAIN>`, External Team names or the Human Operator’s test account.



---

### [Verification Standard]

1. [STATIC-SUFFICIENT] **Schema compliance:** Python `jsonschema` validates both schemas as Draft-07 and at least 3 valid instances from different stages.


2. [STATIC-SUFFICIENT] **Skills and sensitive-term audit:** five stage files plus router have Input/Output/Discipline sections; no real emails/organization names/hard-coded keys.


3. [RUNTIME-BEFORE-NEXT] **Lifecycle simulation:** `tests/simulate_lifecycle.py` generates 6 state/event sets: `RECON` → `PLAN` → `PROVISION_WAITING_APPROVAL` → `DEPLOYING_LONG_TASK` → `VERIFY_FAILED_RECOVER` → `HANDOFF`, all 100% schema-valid.


4. [RUNTIME-BEFORE-NEXT] **Headless rendering:** load simulated-data `index.html`; assert project-purpose text, 20-minute warning, blast-radius approval box, freshness facts including STALE warning and cold-handoff SHA watermark in DOM.


5. [STATIC-SUFFICIENT] **Catalog/fallback completeness:** 10–20 entries, each with `official_source`, `applicable_stage`, `permissions` and executable native `cli_fallback`.



---

### [Failure / Escalation Triggers]

1. Local-file sandbox restrictions cannot be bypassed under existing specifications and execution refuses lightweight embedded/conversion alternatives.


2. Frontend introduces heavy React/Vue frameworks or mandatory public npm CDN layout, violating minimal-static constraints.


3. State updates appear to require a custom resident backend/heavy database, breaking file-based SoT.


4. Reviewer finds actual cloud-environment traces or sensitive personal identifiers in code.


5. Lifecycle simulation crashes in schema validation or serious field conflicts.



---

### [Council Re-entry Triggers]

1. Transparency requires bidirectional communication beyond pure frontend+JSON and exceeds the 2026-10-10 checkpoint scope.


2. Fundamental incompatibility between WatchOver Skills format and official Codex CLI skill calling emerges during W2 alignment.


3. Executor/Reviewer cannot reconcile architecture-level disagreements about freshness or approval-transparency fields.



---

### [Expected Response Shape]

Executor returns a strict materialization report: created tree, key schema snippets, five UI views, all-green local simulation receipts, and Reviewer’s individual PASS signatures for the five standards with screenshot/DOM evidence index.

---

### [Handoff Completion Marker]

The full local `watchover-ai-devops/` repository is independently controlled at its current commit as shown by `git status`; all automated tests pass; independent cross-model Reviewer issues `PASS_FOR_W2_TREATMENT_BUILD`.

---

### [Safe Execution Block]

[Verify Required]: true

[Rollback Anchor]: initial Git HEAD before task start.

[Destructive Threshold]: never delete existing HELM task directories or OS-global configuration.

[Executor Skills Hint]: `planning-with-files`, `skill-creator`

---

### [Executor Preference]

no-preference (cross-model pair: GPT-5.6 Sol High implements code/schemas; Claude Opus 5.5 performs critical review).

---

### [Execution Weight]

medium

---

## Appendix: WatchOver v0.1a Core Data Architecture — Direct Executor Implementation Reference

### 1. Core Field Topology of `state.schema.json`

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "WatchOverState",
  "type": "object",
  "required": ["schema_version", "project", "lifecycle", "facts", "in_flight", "pending_approval", "handoff"],
  "properties": {
    "schema_version": { "const": "0.1.0" },
    "project": {
      "type": "object",
      "required": ["name", "target_provider", "domain", "repo_sources"],
      "properties": {
        "name": { "type": "string" },
        "target_provider": { "enum": ["gcp", "aws", "azure", "nectar", "local"] },
        "domain": { "type": "string" },
        "repo_sources": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["alias", "url", "pinned_commit", "local_path"],
            "properties": {
              "alias": { "type": "string" },
              "url": { "type": "string" },
              "pinned_commit": { "type": "string" },
              "local_path": { "type": "string" },
              "dirty_flag": { "type": "boolean" }
            }
          }
        }
      }
    },
    "lifecycle": {
      "type": "object",
      "required": ["stage", "status", "last_updated_ts"],
      "properties": {
        "stage": { "enum": ["RECON", "PLAN", "PROVISION", "DEPLOY", "VERIFY", "HANDOFF", "INCIDENT"] },
        "status": { "enum": ["IDLE", "RUNNING", "WAITING_APPROVAL", "PAUSED", "TERMINAL_SUCCESS", "TERMINAL_FAILED"] },
        "last_updated_ts": { "type": "string", "format": "date-time" }
      }
    },
    "in_flight": {
      "type": "object",
      "required": ["current_action", "is_long_running"],
      "properties": {
        "current_action": { "type": "string" },
        "intent": { "type": "string" },
        "is_long_running": { "type": "boolean" },
        "expected_duration_minutes": { "type": ["number", "null"] },
        "started_at": { "type": ["string", "null"] },
        "stall_warning_note": { "type": ["string", "null"] }
      }
    },
    "pending_approval": {
      "type": ["object", "null"],
      "properties": {
        "gate_id": { "type": "string" },
        "gate_stage": { "type": "string" },
        "action_intent": { "type": "string" },
        "cost_impact": { "type": "string" },
        "blast_radius": { "type": "string" },
        "rollback_plan": { "type": "string" },
        "verification_promise": { "type": "string" },
        "ready_prompt_for_human": { "type": "string" }
      }
    },
    "facts": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "required": ["value", "status", "checked_at", "evidence_locator"],
        "properties": {
          "value": {},
          "status": { "enum": ["ASSUMED", "USER_CONFIRMED", "VERIFIED_LOCAL", "VERIFIED_REMOTE", "STALE", "UNKNOWN", "BLOCKED"] },
          "checked_at": { "type": "string", "format": "date-time" },
          "ttl_seconds": { "type": "integer" },
          "evidence_locator": { "type": "string" }
        }
      }
    },
    "handoff": {
      "type": "object",
      "required": ["last_verified_ts", "active_topology", "unverified_fragile_points", "next_decision_owner"],
      "properties": {
        "last_verified_ts": { "type": "string" },
        "active_topology": { "type": "string" },
        "deployed_endpoints": { "type": "array", "items": { "type": "string" } },
        "unverified_fragile_points": { "type": "array", "items": { "type": "string" } },
        "next_decision_owner": { "type": "string" }
      }
    }
  }
}

```

### 2. Core Field Topology of `event.schema.json`

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "WatchOverEvent",
  "type": "object",
  "required": ["event_id", "ts", "actor", "type", "stage", "summary", "evidence_locator"],
  "properties": {
    "event_id": { "type": "string", "pattern": "^EVT-[0-9]{6,}$" },
    "ts": { "type": "string", "format": "date-time" },
    "actor": { "enum": ["AI_DEPLOYER", "HUMAN_USER", "SYSTEM_WATCHDOG"] },
    "type": { "enum": ["PHASE_ENTER", "INTENT_REGISTER", "ACTION_COMPLETED", "APPROVAL_REQUESTED", "APPROVAL_GRANTED", "VERIFICATION_PROBE", "ANOMALY_DETECTED", "HANDOFF_SEALED"] },
    "stage": { "type": "string" },
    "summary": { "type": "string", "maxLength": 300 },
    "details": { "type": "object" },
    "evidence_locator": { "type": "string" }
  }
}

```

---

~~~
## Council Member A’s Draft
# WATCHOVER_DESIGN_FREEZE — Independent Draft (Council Member A)

CORE_06 — Strict_Delivery_Contract (master-plan form, with Design Annex)

[Flexibility Note]: This contract carries a Design Annex that exceeds CORE_06 item limits.
The shell fields stay within limits; the Annex holds the specification the Executor splits
into child files. Nothing in the Annex widens scope beyond the shell.

## Contract Status

[Pre-review]: REVISION REQUESTED — independent draft, Convergence Phase 1
[Skip Reason]: none
[Revision]: v0 (Council Member A independent)
[Author]: Council Member A
[Reviewer]: Council Member C, Council Member B (cross-review); Human Operator (ratification)
[Drafted By]: Council Member A — independent draft, not the merged final

## [Mission]

Build WatchOver v0.1a: a local, client-neutral workbench that keeps a human and an AI
deployer on one shared source of truth about a deployment. The AI writes a bounded
`state.json` and an append-only `events.jsonl`. A read-only English HTML viewer, served on
localhost, auto-refreshes from those files so the human can see at any moment what stage
the work is in, what the AI is doing, what it is waiting for, what resources exist, what
has actually been verified and when, and what needs their approval. Staged generic-markdown
skills tell the AI when and what to record, without teaching it deployment it already
knows. Build and verify locally only; no cloud, no push.

## [Frozen Truth]

1. **Value hypothesis.** WatchOver keeps the human and the AI on the same source of truth.
   It is a local-facts workbench, not a cloud monitor and not a deployment-competence aid.
   (W1 disposition §0, D-3; Human Operator 2026-09-28.)
2. **F5.** `state.json` is the only source of truth. The HTML is a projection and holds no
   data of its own. `events.jsonl` is append-only.
3. **F6 / F7.** Traceability is not context: everything may be recorded, but the AI loads
   state plus recent relevant events by default. Secret values never enter state, events,
   evidence, the viewer or git.
4. **F8.** Approval gates sit at stage boundaries, never per command.
5. **Human Operator 2026-09-29.** Viewer form is HTML + JSON with lightweight background
   auto-refresh; UI language is English; skills are generic markdown; runtime workspace
   location is provided by Human Operator and not specified here.
6. **Read-only viewer.** The viewer and its server create no path from the human to the AI.
   The human still answers the AI in the AI's own session. This satisfies the
   "human-assistance channel" clarification accepted for W2.
7. **Neutrality.** The product must be workload-neutral, provider-neutral in its core, and
   client-neutral: no reliance on `AGENTS.md` or `CLAUDE.md` auto-loading.
8. **Build boundary.** v0.1a is built and verified locally only. PASS means Local Runtime
   PASS (roadmap v0.1 §9).

## [Accepted Trade-offs]

- Accepted: a stdlib-only localhost server for auto-refresh. Sacrificed: opening the viewer
  by double-clicking the file.
- Accepted: mandatory logging of every remote-mutating command (sanitized); read-only
  commands optional. Sacrificed: a full command log by default.
- Accepted: Basic mode built fully; Guarded mode specified at interface level only.
  Sacrificed: a Guarded implementation before the Oct 10 go/no-go.
- Accepted: adjacent gates may be presented in one approval request. Sacrificed: a
  separate plan-approval turn.

## [Preserved Dissent]

- Council Member C (roadmap v0.1 §3): no local companion in v0.1. The read-only `serve` command is
  Human Operator-directed, has no write path, and is not the v0.1b writer, which stays gated at Oct 10.

## [Decision Register Link]

[Path]: `OWNER_DECISION_LEDGER.md` entry for the 2026-09-29 decisions; exact locator
supplied by Operations Coordinator at dispatch
[Required for]: viewer delivery mode / UI language / skill format

## [Artifacts to Read First]

1. This document, including the Design Annex.
2. `PROJECT_ROADMAP v0.1`: §1, §2, §6.
3. `PROJECT_ROADMAP v0.2`: amendments only.
4. `HELM_REUSE_CANDIDATES.md`: concepts only; paraphrase, never copy.

The builder does not read W1, W2 or W3 run material, `pre/`, or the W1 disposition. Every
requirement it needs has been abstracted into this document (Master 01 §4).

## [Risk Classification]

[Risk Class]: Normal
[Why]: local build of a new repository; no cloud, no production, no external delivery
[Requires Operations Coordinator Preflight]: Yes — skill/MCP loadout and path confirmation
[Requires Cross-Family Reviewer]: Yes
[External Delivery Possible]: No

## [Required Skill / MCP Loadout]

- `executors/skills/core/planning-with-files` — optional — not checked
- `executors/skills/core/agent-browser` — optional, for viewer screenshots — not checked
- `executors/skills/core/skill-vetting` — optional, for catalog entries — not checked
- `executors/skills/shared/learned/` — scan required (CI/CD lessons), headers only — not checked

The Executor confirms actual loadout in EXEC_ACK.

## [Evidence Layer Contract]

Required final evidence layer: Local Runtime.

## [PASS Meaning]

Local Runtime PASS only.

## [Execution Context]

[Source of Truth]: new repository `watchover-ai-devops`, branch `main`, in the workspace
Human Operator has prepared; local path confirmed by Human Operator at dispatch
[Toolchain Capability]:
- git: available
- python3 (stdlib only): unknown
- a local browser for screenshots and network logs: unknown
- node: unknown — not required
[Write Policy]: edit / local checkpoint / push forbidden
[Current Worktree State]: unknown

## [Entry Point]

Design Annex §M (materialization contract). Stage 0 split plan first.

## [Current Phase]

Patch (build), preceded by a Stage 0 split plan that the Reviewer checks before any edit.

## [Non-Negotiable Goal]

1. A fresh AI following only the skills keeps `state.json` and `events.jsonl` valid and
   current enough that the human can read the situation from the viewer without reading
   the terminal.
2. The viewer never shows stale, assumed or unverified facts as if verified and current.
3. No secret value can reach state, events, the viewer or the repository without
   detection by the validator.

## [Allowed Work]

1. Create the repository structure in Annex §M.
2. Write the JSON Schemas and fixtures.
3. Write the skills (generic markdown).
4. Build the viewer (single page, vanilla HTML/CSS/JS).
5. Build `tools/watchover.py` (stdlib only): `init`, `validate`, `serve`, `event`.
6. Write the README skeleton, SECURITY.md, LICENSE (MIT), provider profiles, catalog.
7. Run local tests, a local browser, and the local rehearsal (Verification item 6).
8. Make local checkpoint commits.

## [Action Permission Ladder]

[Default Cap]: L2 — local checkpoint commit
[Approval-Gated]:
- installing any new tool or package beyond the Python stdlib (including browser automation)
- running the rehearsal toy app in Docker
[Hard Forbidden]:
- any cloud API call or cloud CLI command that authenticates or mutates
- `git push`, publishing, or creating a remote
- reading W1/W2/W3 run artifacts, `pre/`, the sealed area, or the W1 disposition
- copying HELM charter or template text verbatim
- external network dependencies in the viewer (CDN, fonts, analytics)

## [Required Build / Edit Targets]

Paths are to be confirmed by Human Operator at dispatch.

1. `skills/` — router, stage files, providers
2. `schema/` — `state.schema.json`, `event.schema.json`
3. `app/web-ui/` — viewer
4. `tools/watchover.py`
5. `fixtures/` — valid and invalid samples, including the secret canary
6. `integrations/catalog.json`
7. `README.md`, `SECURITY.md`, `LICENSE`, `docs/`

## [Protected Areas]

1. The HELM repository
2. `council/task/ai-cicd/` run directories and `pre/`
3. The sealed W3 area
4. Any cloud project or DNS zone
5. The `agent-run-recorder` repository
6. Any External Team repository

## [Blast Radius]

[Expected changed files]: the seven target groups above, within the new repository only
[Allowed adjacent files]: `.gitignore`, `docs/design-decisions.md`
[Runtime-discovered addendum allowed]: Yes — within the new repository only, declared in
the return
[Requires Chair amendment if exceeded]: Yes

## [Execution Notes]

1. The viewer polls `state.json` and the tail of `events.jsonl` every 3–5 s over HTTP.
   No reload, no build step, no framework.
2. `serve` binds to 127.0.0.1 only, answers GET only, and serves an allowlist: viewer
   assets, `state.json`, `events.jsonl`. It never serves `evidence/` or any path outside
   the allowlist.
3. State is overwritten in place and kept bounded; history lives only in events.
4. Skills stay short. Target sizes: router ≤ 200 lines, each stage file ≤ 150 lines. They
   state what to record and when, and do not restate cloud documentation.
5. Every word the human sees is plain English. Status is never conveyed by colour alone.

## [Verification Standard]

1. [RUNTIME-BEFORE-NEXT] `watchover.py validate` accepts at least five valid fixtures
   (active, awaiting approval, stale fact, blocked, closed) and rejects at least three
   invalid ones (schema violation, malformed JSON, planted secret canary). Output is
   captured.
2. [RUNTIME-BEFORE-NEXT] The viewer, served by `serve`, renders every valid fixture:
   - Screenshots show the status banner, the approval card, and a stale fact rendered
     not-green.
   - Editing `state.json` on disk changes the open page within 10 s without a manual
     reload.
   - A malformed `state.json` produces a visible error, not a blank page or old data shown
     as current.
3. [RUNTIME-BEFORE-NEXT] Server boundary:
   - Listening socket is on 127.0.0.1 only.
   - POST and PUT return 405.
   - `evidence/…`, `../…` and non-allowlisted paths return 403 or 404.
   - The browser network log shows zero requests to hosts other than localhost.
4. [RUNTIME-BEFORE-NEXT] Secret check with a positive control: the validator detects the
   planted canary fixture and passes the clean fixtures in the same run.
5. [STATIC-SUFFICIENT] Neutrality scan: a search over `skills/`, `app/`, `schema/`,
   `docs/` and `README.md` for a Human Operator-supplied denylist (workload repository names, project
   codenames, personal identifiers) returns zero hits. The same command detects one term
   planted in a control file.
6. [RUNTIME-BEFORE-NEXT] Local rehearsal (no cloud):
   - A fresh session of a model not used as the builder receives only a neutral task over
     a neutral local toy Docker Compose app, plus the activation line pointing to
     `skills/SKILL.md`. It produces schema-valid state and events and a readable viewer.
   - A second fresh session then receives only a continuation message that mentions
     neither WatchOver nor the workspace. It must locate the state, report the stage, and
     take a correct next action without redoing completed work.
   - Transcript locators are recorded.
7. [STATIC-SUFFICIENT] MIT `LICENSE` is present. The README separates Validated from
   Roadmap. Every provider profile other than GCP is marked `UNVALIDATED`, and GCP is
   marked "target, validation pending".

## [Failure / Escalation Triggers]

1. Auto-refresh cannot work without a write endpoint or a non-stdlib dependency.
2. A required Annex field cannot be represented in the schema without free-text blobs.
3. Rehearsal item 6 fails twice with no confirmed progress.
4. Any step appears to need cloud access or W-run material.
5. Skill size targets cannot be met without dropping a required rule.
6. The Reviewer cannot independently verify an Executor claim.

## [Council Re-entry Triggers]

1. A Frozen Truth item is falsified by local evidence (for example, a read-only viewer
   cannot meet Non-Negotiable Goal 1).
2. The design would require changing the Human Operator interaction set, the W2 controlled variables
   or any frozen metric.
3. Scope must extend to cloud execution, write-back UI, or client-specific loading.

## [Expected Response Shape]

EXEC_ACK (actual loadout, Stage 0 split plan) → return with: changed-file list, verification
table (tag, result, evidence locator), deviations, open items.

## [Handoff Completion Marker]

Independent Reviewer issues Local Runtime PASS naming all seven verification items, and
Human Operator confirms.

## [Safe Execution Block]

[Verify Required]: true
[Rollback Anchor]: initial empty-repository commit
[Destructive Threshold]: any network access beyond localhost and approved package
registries, or any write outside the new repository → EXEC_STOP
[Executor Skills Hint]: planning-with-files, agent-browser

[Executor Preference]: no-preference
[Execution Weight]: medium

---

# DESIGN ANNEX

## A. Value hypothesis and non-goals

**Hypothesis.** A capable AI already knows how to deploy. What fails is that:
- the human cannot see what it knows;
- the next session cannot cheaply pick up what it knew.

WatchOver closes that gap with one shared, freshness-honest record, and nothing more.

**What the human should be able to answer from the viewer alone**
- Which stage are we in, what is the AI doing right now, and how long has it been doing it?
- Is it waiting on me, and if so, for what decision?
- What is this app, how many services does it have, what are we building, and why this
  resource shape?
- What resources exist (VMs, disks, addresses, containers inside each VM), and which are
  billable?
- What has actually been verified, when, at what layer, and what has not?
- What is open, what comes next, and who decides?

**Non-goals (v0.1)**
- Cloud monitoring or live polling of any provider.
- Per-command approval.
- Terminal output mirrored into the page.
- Write-back UI: approve/reject buttons are the v0.1b writer, gated at Oct 10.
- Daemons or background agents.
- Teaching cloud, Docker, or IaC.
- Any HELM role, Council, or Operations Coordinator concept in the product.
- Multi-run history dashboards.

**Honest footer, always visible:** "This page shows what the AI has recorded. Items marked
verified cite evidence and a time. Nothing here is a live cloud reading."

## B. Components and trust boundaries

    AI session ──writes──▶ state.json (overwrite, bounded)
               ──appends─▶ events.jsonl (append-only)
               ──writes──▶ evidence/ (raw, sanitized output; never served)
    watchover.py serve (127.0.0.1, GET-only, allowlist) ──▶ viewer (read-only, polls)
    Human ◀──reads── viewer        Human ──answers──▶ AI session (unchanged channel)

**Trust boundaries**
- The viewer trusts nothing it cannot display honestly. It computes staleness itself from
  the clock and never upgrades a status.
- The server exposes no write surface.
- Secrets live only in a gitignored local file. State records the secret's name and
  location, never its value.
- The AI never depends on the viewer running. The viewer is launched by the human.

## C. Runtime workspace

The location is provided by Human Operator and is not specified here. Required properties:
- outside any public repository, or gitignored;
- contains `state.json`, `events.jsonl` and `evidence/`;
- `watchover.py init` creates an empty valid state and a first `STAGE_CHANGE` event.

## D. `state.json` semantics

The Executor writes the JSON Schema. The meanings below are frozen.

| Section | Required content |
|---|---|
| `meta` | schema_version, project alias, mode (`BASIC` / `GUARDED`), updated_at, updated_by, session_id |
| `stage` | current stage: `RECON`, `PREFLIGHT`, `PLAN`, `AWAITING_APPROVAL`, `PROVISION`, `DEPLOY`, `VERIFY`, `HANDOFF`, `RUNNING`, `INCIDENT`, `RECOVERED`, `TEARDOWN`, `CLOSED` |
| `activity` | plain-language description; started_at; expected duration as a range in minutes; optional reason for slowness ("building images on a small VM"); waiting_on: `AI` / `HUMAN` / `EXTERNAL` / `NONE` |
| `brief` | what the app is; components and their count; planned topology; resource rationale (the chosen shape and a one-line reason each common alternative is unnecessary); assumptions |
| `plan` | up to three tiers (composition, region, monthly cost range, price-checked date, load assumption, uncertainty); selected tier; selection basis (`USER_CONFIRMED` / `DEFAULT_PENDING_APPROVAL`) |
| `pending_approval` | null, or: id; category (`BILLABLE` / `DNS` / `DELETE` / `DESTRUCTIVE` / `EXTERNAL_RELEASE`); what will be done; targets; why; cost or blast radius; reversibility and rollback; how success will be confirmed afterwards; requested_at |
| `resources[]` | id; alias; provider; type; parent_id (containers under their VM, disks under their VM); origin (`CREATED_THIS_RUN` / `IMPLICIT_PROVIDER_CREATED` / `PRE_EXISTING`); billable; purpose; status fact (see `facts`) |
| `source[]` | repository alias; remote; pinned ref; local modifications (present, one-line summary, evidence locator); deployed ref (a fact) |
| `facts[]` | key; value; status (frozen enum: `ASSUMED`, `USER_CONFIRMED`, `VERIFIED_LOCAL`, `VERIFIED_REMOTE`, `STALE`, `BLOCKED`); scope (exactly what was checked); checked_at; expires_after; evidence locator; for any zero, clean or none result, the control used |
| `secrets[]` | name; location (path or locator, never a value); last_verified_at; state (`USABLE` / `BLOCKED` / `MISSING`) |
| `open_items[]` | text; owner (`HUMAN` / `AI`); blocking |
| `next` | the next action; who decides |
| `handoff` | read-first locators; last known safe state; rollback anchor; known-unverified and fragile items |

State is the current truth only. Nothing in state is a log.

## E. `events.jsonl` semantics

**Fields:** ts, seq, actor (`AI` / `HUMAN` / `REVIEWER` / `TOOL`), session_id, kind, intent,
target, sanitized action, result (`OK` / `FAIL` / `PARTIAL` / `UNKNOWN`), state change,
evidence locators, related seq.

**Kinds:** `STAGE_CHANGE`, `INTENT`, `RESULT`, `DECISION`, `VERIFICATION`, `ERROR`,
`REVIEW`, `NOTE`.

**Required events**
- Every stage change.
- `INTENT` before and `RESULT` after:
  - every remote-mutating command (sanitized);
  - every gated action;
  - every operation expected to take more than two minutes.
- `DECISION` for every human approval or refusal, with the reply quoted verbatim as the
  human typed it.
- `VERIFICATION` for every fact promoted to a verified status.
- `ERROR` for any failure that changes the plan.

Read-only commands may be logged but are not required. Large outputs go to `evidence/` and
are referenced by locator.

## F. Freshness rules

1. **Display rule.** The viewer shows a fact as current only when its status is verified
   **and** `now − checked_at ≤ expires_after`. Otherwise it renders "stale" with the age,
   regardless of the stored status.
2. **State age.** "State last updated N minutes ago" is always visible at the top. When an
   activity is running and the elapsed time exceeds its expected upper bound, the viewer
   says so.
3. **Re-verify before write.** Before any write action, the AI re-verifies the facts that
   action depends on (roadmap v0.1 §6). A stale fact is never used as current.
4. **Clean means scoped.** Any "zero", "clean" or "none found" fact displays its scope and
   its control. Without a control, it displays as unverified.

## G. Approval gates

**Gates (stage boundaries)**
- G1: plan accepted.
- G2: before the first billable or irreversible action.
- G3: before external release (public DNS, public URL).
- Deletion and destructive actions: always gated.

**Coalescing rule.** When no action separates two gates, they are presented in **one**
request. In the typical case, the plan and the first billable creation form a single
request that includes the brief and the selected tier ("I will proceed with tier X unless
you choose otherwise").

**Request content.** Each request states, in plain language, the fields of
`pending_approval`. It stays short enough to read in under a minute.

**Recording.** The human answers in the AI's session, as today. The AI records a `DECISION`
event, clears `pending_approval`, and proceeds.

**Viewer.** When `pending_approval` is set, the viewer shows a prominent banner: what is
being asked, and that the answer is given in the AI's session.

## H. Viewer

**Order of sections**
1. Status banner: stage, activity, elapsed time, waiting_on, state age.
2. Approval card, when pending.
3. Project brief.
4. Resources: a tree of provider → VM → disks and containers, with billable flags.
5. Verification: facts grouped by layer, with status, age and scope.
6. Open items and next step.
7. Recent events: last 20, one line each.
8. Evidence locators as text paths (not links, since evidence is not served).
9. Honest footer (§A).

**Rules**
- Colour is never the only carrier of status.
- Green only for verified-and-fresh.
- Missing or malformed files produce a visible error.
- No local browser storage of state.
- English only.
- Single page, no external requests.

## I. `tools/watchover.py`

Python stdlib only.

- `init`: creates the workspace files.
- `validate`: schema checks plus a secret-pattern scan with a built-in canary self-test.
- `event`: appends one validated event.
- `serve`: localhost, GET-only, allowlisted, polling-friendly (no-cache headers).

The AI may edit `state.json` directly but must run `validate` after each state write.

## J. Skills

**Format.** Generic markdown, client-neutral. The activation block for W2B is a separately
versioned, hashed text (Master 01 §10.3); its text is DEFERRED to the W2 freeze. It must
only point the AI to `skills/SKILL.md`.

**Files**

| File | Responsibility |
|---|---|
| `SKILL.md` (router) | Read state first; if absent, run `init`. Mode. Logging, approval and secrets rules. Freshness rules. Which stage file to load. |
| `01_recon_preflight.md` | Read-only reconnaissance; fill `brief`, `source` (including local modifications), identity/project/permission facts, secret names. |
| `02_plan.md` | Tiers with rationale; prepare the coalesced G1/G2 request. |
| `03_execute.md` | INTENT/RESULT around remote-mutating and long operations; keep `activity` current; `resources` including implicit ones. |
| `04_verify_handoff.md` | Verification by layer (build ≠ deploy ≠ externally verified; a component looking healthy ≠ the chain working); G3; `handoff` section; teardown inventory, including implicit resources. |
| `05_recover_debug.md` | On a new session or interruption: read state; re-verify live facts before acting; reconcile; mark stale; continue. `INCIDENT` → `RECOVERED` → `VERIFY`. |
| `providers/gcp.md` | GCP-specific commands for inventory and verification only. |
| `providers/aws.md`, `azure.md`, `nectar.md` | `UNVALIDATED` skeletons. |
| `providers/dns-cloudflare.md` | Manual-edit and scoped-token modes. |

The one-line deployment disciplines (evidence layers, implicit-resource teardown, claim
scope) live inside the stage files. They are not features.

## K. Modes

- **Basic:** one AI; everything above. Built fully in v0.1a.
- **Guarded (interface only):**
  - A Reviewer reads state, events and evidence, and writes `REVIEW` events.
  - A gate may require a `REVIEW` verdict before `DECISION`.
  - Implementation and the W2C package are DEFERRED to the Oct 10 go/no-go.

## L. Integrations catalog (F11)

- 10–20 official or vendor-maintained entries.
- Fields: source, stage, install, permissions, risk, last_checked, CLI fallback.
- MCP is optional everywhere. No entry is loaded by default.

## M. Materialization contract

**FULL (build now)**
- `schema/state.schema.json`, `schema/event.schema.json`
- `skills/SKILL.md`, `skills/01`–`05`
- `skills/providers/gcp.md`, `skills/providers/dns-cloudflare.md`
- `app/web-ui/` (single page)
- `tools/watchover.py`
- `fixtures/`
- `integrations/catalog.json`
- `LICENSE` (MIT), `SECURITY.md`
- `docs/architecture.md`, `docs/design-decisions.md`

**SKELETON**
- `skills/providers/aws.md`, `azure.md`, `nectar.md` (`UNVALIDATED`)
- `README.md` (definition, Validated/Roadmap split, no benchmark claims)
- `docs/experiment.md`, `docs/related-work.md`
- `app/local-writer/` (placeholder note only; v0.1b gated)

**DO NOT GENERATE**
- The W2B/W2C activation text or treatment package.
- The Guarded Reviewer implementation.
- Any workload-specific content or troubleshooting.
- Any benchmark or result claim.
- Any HELM-specific role or template.

## N. Design risks carried into cross-review

| Risk | Consequence | Mitigation in this design |
|---|---|---|
| The AI stops updating state during long work | The viewer shows old facts as current | Clock-based staleness (§F.1), state age banner (§F.2), INTENT before long operations (§E) |
| Hand-edited JSON breaks | Blank or wrong viewer | `validate` after every write; the viewer shows parse errors (§H) |
| Logging overhead slows the AI | W2 wall time worsens | Required events limited to §E; read-only logging optional |
| Viewer shows AI claims as truth | False confidence | Status and scope on every fact; honest footer; green only when verified and fresh |
| Overfitting to W1 | A tool tuned to one app | Neutrality scan (Verification 5); the builder never sees W-run material |
~~~

~~~

~~~
## Council Member B’s Draft
# WATCHOVER_DESIGN_FREEZE

**Project:** WatchOver AI DevOps  
**Session:** council-session-003  
**Status:** INDEPENDENT DRAFT — Council convergence required before freeze  
**Drafted By:** Council Member B  
**Authority:** Council Constitution v1.7 → PROJECT_ROADMAP v0.1 + v0.2 amendments → Experiment Execution SoT v0.2 → Council Masters 01/02/03  
**Design Input:** W1_FINDING_DISPOSITION + HELM_REUSE_CANDIDATES  
**Downstream Model:** Council freezes the Master Design; Executor may decompose and implement it; an independent Reviewer verifies both child work and final integrated conformance.

---

## 0. Mission

Build WatchOver v0.1a as a lightweight human/AI DevOps workbench that preserves a small, trustworthy current-state view across deployment sessions.

WatchOver does **not** exist to make a capable AI better at Docker, GCP, SSH or deployment syntax. Its job is to make the AI's working state understandable to the human, recoverable by a fresh AI, traceable to evidence, and explicit about what is verified, stale, unknown or awaiting a decision.

The system must remain materially lighter than the HELM / W1 experimental control harness used to evaluate it.

---

# 1. Frozen Truth

1. **`state.json` is the only current-state source of truth.**  
   HTML owns no state. `events.jsonl` owns history, not current truth.

2. **`events.jsonl` is append-only.**  
   A historical event is never silently rewritten to make the current state look cleaner.

3. **Traceability is not context.**  
   Full records may exist, but the default AI context is the current state plus only recent/relevant events and followed evidence locators.

4. **Secret values never enter state, events, HTML, evidence intended for normal consumption, or Git.**  
   Only secret name/category, location, usability state and verification time may be recorded.

5. **Approval remains a human decision.**  
   WatchOver may explain the decision boundary but may not approve, reject or execute on behalf of the human.

6. **Approval gates occur at meaningful stage/action boundaries, not per command.**

7. **GCP is the only validated v0.1 cloud path.**  
   Other provider profiles may exist only as explicitly `UNVALIDATED` material.

8. **WatchOver v0.1a is a lightweight local workbench, not a cloud control plane, daemon, CI/CD engine or monitoring platform.**

---

# 2. Revised Value Hypothesis

W1 does not support the hypothesis that a strong AI needs WatchOver primarily to teach it how to deploy.

The design round therefore tests a narrower hypothesis:

> **A capable AI can already perform much of the deployment work. WatchOver adds value if it makes the resulting operational state substantially easier for a human and a fresh AI to understand, verify, resume and hand off without replaying the full conversation or terminal history.**

This hypothesis is an experimental target, not a claim already proven by W1.

WatchOver must therefore optimize for:

- **situational awareness;**
- **freshness and evidence honesty;**
- **bounded human decision support;**
- **cross-session resumability;**
- **cold handoff;**
- **low context overhead.**

Deployment-success improvement is welcome if observed, but it is not the design premise.

---

# 3. Accepted Trade-offs

- accepted **small explicit state discipline** / sacrificed **zero-overhead deployment conversation**
- accepted **evidence locators and freshness metadata** / sacrificed **a superficially simpler but unverifiable dashboard**
- accepted **manual human approval ownership** / sacrificed **full one-click automation**
- accepted **one deeply validated GCP reference path** / sacrificed **multi-cloud feature breadth in v0.1**

---

# 4. Preserved Dissent / Deferred Decisions

1. **Human-readability measurement:** whether W2 adds one or more secondary human/cold-handoff measures is deferred to `W2_EXPERIMENT_FREEZE`; M1–M11 remain unchanged.

2. **v0.1b local writer:** clickable Approve / Reject / Pause remains governed by the existing Oct-10 go/no-go decision and is not required for v0.1a.

3. **HTML delivery mechanics:** self-contained regenerated HTML vs a minimal local serving mechanism is an Executor implementation choice provided all interface and trust-boundary rules below are satisfied.

---

# 5. Non-Negotiable Product Goals

## G1 — Current state without transcript archaeology

A fresh human or AI must be able to determine, from the WatchOver workspace:

- what is being deployed;
- where it is being deployed;
- which source/version is intended;
- which source/version is actually known to be in use;
- the current stage;
- the current meaningful activity;
- what is verified;
- what remains unknown, assumed, stale or blocked;
- what the system is waiting for;
- who owns the next decision;
- what the next expected step is.

It must not require reading the full terminal transcript first.

## G2 — Evidence honesty

The workbench must visibly distinguish:

- `ASSUMED`
- `USER_CONFIRMED`
- `VERIFIED_LOCAL`
- `VERIFIED_REMOTE`
- `STALE`
- `BLOCKED`

A fact may not remain visually current after its own freshness rule says it is stale.

A green/clean/zero presentation must never imply broader verification than the supporting evidence actually covers.

## G3 — Human-readable execution

Before a materially significant or potentially long-running action, WatchOver discipline must make enough intent visible that the human can understand:

- what is about to happen;
- why this action/resource shape was selected;
- what meaningful result is expected;
- whether the operation may reasonably take time;
- what human decision, if any, will be required next.

This is compressed operational context, not a tutorial and not continuous narration.

---

# 6. Explicit Non-Goals

WatchOver v0.1a must **not** become:

1. a replacement cloud console;
2. a cloud-resource orchestration service;
3. a CI/CD platform;
4. a secrets vault;
5. a terminal recorder or transcript viewer;
6. a continuous monitoring/alerting system;
7. a daemon or privileged sidecar required on the target VM;
8. a command-by-command approval engine;
9. a generic MCP marketplace;
10. a self-built replacement for mature cloud CLIs, SSH, Docker, Terraform/Pulumi or browser tooling;
11. a full HELM governance runtime;
12. a mechanism that automatically diagnoses or repairs every deployment problem.

`agent-run-recorder` and the W1 experimental harness are separate tools/infrastructure. Their existence does not make their control machinery part of WatchOver.

---

# 7. Product Architecture

WatchOver v0.1a consists of five primary product surfaces and one supporting catalog.

## 7.1 Current State — `state.json`

`state.json` represents **what should be believed now**.

It must remain compact enough to load by default at the beginning of a fresh AI session.

Minimum semantic groups:

### Identity
- schema version;
- project/workload identity;
- target environment;
- active provider profile;
- run/workspace identity.

### Source
- intended frontend/backend or repository references;
- intended commit/version;
- observed/current source state where known;
- local modification state where relevant.

A pinned commit and a modified deployed working tree must not be represented as the same fact.

### Stage
- current stage;
- stage status;
- current meaningful activity;
- last meaningful progress timestamp;
- waiting state;
- next expected step.

### Facts
Every operational fact must support:

- value/summary;
- status;
- `checked_at`;
- evidence locator;
- freshness/expiry rule where applicable.

### Human decision state
- approval/decision currently required, if any;
- decision owner;
- decision status;
- related event/evidence locator.

### Verification
- latest meaningful verification results;
- what each result actually establishes;
- what remains unverified.

### Handoff
- current blocker;
- unresolved questions;
- next actor;
- safest known continuation point.

Exact JSON property names may be normalized by Executor, but these semantics may not be removed.

---

## 7.2 Event History — `events.jsonl`

`events.jsonl` records **meaningful changes**, not every terminal line.

Each meaningful event must be capable of expressing:

- who/what acted;
- when;
- intent;
- target;
- sanitised action summary;
- result;
- related state transition;
- evidence locator.

Expected event families include:

- stage transition;
- significant action intent;
- significant action result;
- approval request;
- human decision;
- verification result;
- failure/recovery;
- state/freshness transition;
- handoff/closure.

Raw stdout/stderr is not copied into `events.jsonl`.

Large/raw evidence remains external and is referenced by locator.

Event history must remain append-only.

---

## 7.3 Evidence — `evidence/`

Evidence exists to support claims, not to become the default user interface.

Rules:

- normal state/event entries reference evidence;
- large output stays out of default context;
- secret values are excluded/redacted;
- evidence type and provenance remain clear;
- a negative result must reveal enough scope for a reviewer to know what was actually checked;
- where a positive control is required by the governing verification discipline, the locator must be available.

WatchOver may say:

> `No residual Compute resources observed — verified remotely at <time>; evidence <locator>.`

It may not collapse that into an unqualified:

> `Everything clean.`

---

## 7.4 Human View — HTML

The HTML is a projection of WatchOver state and selected events.

It is **not** a second source of truth.

The default view should prioritize the human questions exposed by W1:

### A. What are we doing?
- short project/application summary;
- intended deployment shape;
- target environment;
- expected major services/components.

### B. Where are we now?
- current stage;
- current meaningful activity;
- last meaningful progress;
- waiting-on state;
- blocker if any.

### C. Why this plan?
Present a short human-level explanation of major resource choices.

This is not required to enumerate every rejected cloud service.

The goal is enough context for the user to understand the selected shape and recognize obvious misunderstanding.

### D. What needs my decision?
For an approval boundary, the projection should be capable of presenting:

- intended action;
- target;
- reason;
- cost/impact information when known;
- destructive or externally visible effect when applicable;
- rollback/recovery note where meaningful;
- how success will be verified afterward.

**v0.1a remains informational.**

The formal human reply/approval continues through the existing human ↔ Deployer interaction channel. The HTML does not create an additional approval authority or deployment-command channel.

### E. What can I trust?
Display:

- verified facts;
- assumed/user-confirmed facts;
- stale facts;
- blocked/unverified facts;
- last verification time;
- evidence locator where useful.

`STALE`, `UNKNOWN/UNVERIFIED`, and `BLOCKED` must not be styled as healthy current state.

### F. What happens next?
- next expected step;
- next actor/decision owner;
- unresolved questions;
- handoff readiness.

---

# 8. Long-Running Work and Progress

WatchOver is not a real-time monitoring platform.

It therefore does not promise percentage-complete progress for arbitrary commands.

Instead, staged skills must encourage a lightweight pattern:

1. **before a significant/long-running action:** record intent and expected outcome;
2. **where useful:** note that the operation may reasonably be slow or externally delayed;
3. **after meaningful progress/result:** update state and append the corresponding event.

The UI always exposes:

- current activity;
- its start/last-update time;
- latest meaningful progress.

If no fresh state exists, WatchOver must prefer showing **possibly stale / no recent update** over inventing “still working normally”.

No arbitrary universal timeout is frozen in this design.

---

# 9. Stage Skills

WatchOver skills are **workflow discipline**, not technical encyclopedias.

The frozen stage packaging remains:

- root `SKILL.md`
- `01_recon_preflight.md`
- `02_plan.md`
- `03_execute.md`
- `04_verify_handoff.md`
- `05_recover_debug.md`
- provider profiles

## Root Router

The root skill must:

- read `state.json` first;
- load only the relevant stage skill;
- enforce state/event/evidence/secrets rules;
- keep raw evidence out of default context;
- preserve approval boundaries;
- route recovery without resetting known state unnecessarily.

## Recon / Preflight

Responsible for establishing:

- target/source identity;
- environment/access readiness;
- relevant repository/deployment surface;
- facts vs assumptions;
- initial state freshness.

It must not provision billable resources.

## Plan

Responsible for:

- short application/deployment summary;
- resource/deployment shape;
- assumptions;
- cost/date uncertainty where applicable;
- human-readable rationale;
- approval-ready plan boundary.

It must not create resources before the applicable gate.

## Execute

Responsible for:

- recording significant action intent/result;
- maintaining current state;
- preserving evidence locators;
- requesting approval at frozen boundaries;
- avoiding secret values in product records.

It is not required to narrate every command.

## Verify / Handoff

Responsible for:

- separating build/deploy/external-verification states;
- updating fact freshness;
- recording known-unverified areas;
- ensuring the current-state slice is sufficient for cold continuation;
- linking rather than embedding large evidence.

## Recover / Debug

A side path available from active stages.

It must:

- preserve the last known safe/current state;
- distinguish diagnosis from established fact;
- record meaningful recovery state transitions;
- return to verification after recovery.

It must not create a second parallel source of truth.

---

# 10. Integration Catalog

The catalog supports the staged skills but is not required for the core product to function.

Rules remain:

- official/vendor-maintained sources only;
- approximately 10–20 entries for v0.1;
- every MCP/integration has a CLI or non-MCP fallback;
- catalog metadata records source, applicable stage/provider, installation/access method, permissions/risk, last checked and fallback.

MCP is an accelerator, never a runtime dependency.

---

# 11. Approval Model

WatchOver does not own approval authority.

The canonical decision path remains:

> **AI/Deployer → Human → AI/Deployer**

WatchOver may project decision context.

It may not:

- automatically approve;
- recommend approval purely because a gate exists;
- execute the gated operation from the HTML in v0.1a;
- create a second hidden decision channel.

Approval explanation and approval authority are separate concerns.

The design explicitly preserves the W1 finding:

> **approval requested does not necessarily mean approval understood.**

The product attempts to improve understanding, not transfer responsibility.

---

# 12. Freshness and Trust Model

WatchOver must assume operational facts decay.

Every fact whose truth can change must have enough metadata to determine whether it remains current.

Minimum rule:

> A stale fact remains historically true as an observation but loses authority as a statement of current state.

Examples:

- repository SHA;
- active project/account;
- deployed version;
- DNS state;
- resource existence;
- external availability;
- successful verification.

Executor may define practical expiry mechanics per fact class.

It may not solve ambiguity by silently extending freshness indefinitely.

Unknown and stale must remain representable.

---

# 13. Handoff Contract

A handoff is successful when a fresh AI can enter the workspace, read the root WatchOver instruction plus current state, and correctly identify:

1. what the task is;
2. current target/environment;
3. current stage;
4. current source/version state;
5. last verified facts;
6. stale/unknown facts;
7. current blocker/waiting condition;
8. next safe action;
9. who owns the next decision;
10. where deeper evidence can be found.

The fresh AI should not need the previous full chat/transcript as its first step.

The transcript remains available as trace evidence where appropriate, but is not the handoff mechanism.

---

# 14. Basic and Guarded Product Boundary

## Basic

WatchOver Basic consists of the core product defined in this document:

- current state;
- append-only events;
- evidence locators;
- HTML projection;
- staged skills;
- provider/integration profiles.

It assumes one active AI/Deployer.

## Guarded

Guarded mode adds an independent Reviewer.

The Reviewer protocol is **not frozen here**.

Guarded must use the same state/event/evidence foundation; it must not create a second conflicting current-state system.

The detailed Reviewer write/read interface belongs to the later W2C treatment and Reviewer freeze.

---

# 15. Trust Boundaries

## WatchOver may trust only according to recorded status

- human statement → `USER_CONFIRMED`
- local check → `VERIFIED_LOCAL`
- remote/live observation → `VERIFIED_REMOTE`
- unverified reasoning → `ASSUMED`
- expired observation → `STALE`
- unavailable prerequisite → `BLOCKED`

A stronger label requires stronger evidence.

## HTML trust boundary

HTML renders data; it does not independently claim facts.

## AI trust boundary

The AI may update state, but a self-authored success statement does not automatically become `VERIFIED_REMOTE`.

## Human trust boundary

Human confirmation is a valid fact source but is not silently upgraded into technical verification.

## Evidence trust boundary

Evidence proves only what its scope and freshness support.

---

# 16. Executor Delegation Contract

After Council convergence and Human Operator ratification, the local Executor layer may decompose this Master into implementation work packages.

Executor **may choose**:

- HTML/CSS/JS implementation style;
- schema-library/tooling choices;
- self-contained generation vs minimal local serving mechanism;
- exact internal helper modules;
- test framework;
- schema property naming where this document does not freeze a literal name;
- implementation sequence;
- reasonable internal abstractions.

Executor **may not reinterpret**:

- source-of-truth ownership;
- append-only history semantics;
- status/freshness meaning;
- secret boundaries;
- approval ownership;
- HTML-as-projection rule;
- v0.1a informational approval surface;
- handoff requirements;
- explicit non-goals;
- GCP-only validated claim.

Executor may split the build into multiple child tasks provided every child inherits the relevant frozen boundaries.

An independent Reviewer must review both:

1. individual high-impact child deliverables where appropriate; and
2. the final integrated v0.1a against this Master.

---

# 17. Implementation Evidence Contract

**Required final evidence layer:** Local Runtime + Reviewer Evidence.

No cloud run is required merely to accept the local v0.1a implementation.

Cloud effectiveness is tested later in W2.

**PASS Meaning:** `Reviewer Evidence PASS`

A local implementation PASS means:

> The product implementation conforms to this Master and its local behavior has been independently verified.

It does **not** mean:

- WatchOver has proven product value;
- WatchOver improves W2 outcomes;
- WatchOver is production-ready;
- non-GCP providers are validated.

---

# 18. Verification Standard for the Downstream Executor/Reviewer

The later CORE_06 implementation package should preserve at least the following acceptance signals.

1. **[RUNTIME-BEFORE-NEXT]** A representative workspace can create/update valid current state, append events, retain evidence locators, and render the human view without HTML becoming a second data store.

2. **[RUNTIME-BEFORE-NEXT]** A fresh-session handoff test can determine current stage, source state, latest verified facts, stale/unknown facts, blocker, decision owner and next safe step from WatchOver artifacts without first receiving the prior full transcript.

3. **[RUNTIME-BEFORE-NEXT]** Test fixtures demonstrate that `VERIFIED_*`, `ASSUMED`, `USER_CONFIRMED`, `STALE` and `BLOCKED` states render distinctly and that stale facts cannot be presented as current verified facts.

4. **[RUNTIME-BEFORE-NEXT]** A long-running-action fixture shows intent/current activity/last meaningful update without requiring continuous terminal streaming or fabricated percentage progress.

5. **[RUNTIME-BEFORE-NEXT]** An approval fixture presents sufficient human-readable decision context while preserving the actual approval path outside the HTML and executing no cloud/terminal action itself.

6. **[RUNTIME-BEFORE-NEXT]** Secret fixtures demonstrate that product state/events/UI contain locators/categories but not secret values.

7. **[STATIC-SUFFICIENT]** AWS/Azure/Nectar materials are visibly marked `UNVALIDATED`, and no README/UI wording implies multi-cloud validation.

---

# 19. Failure / Escalation Triggers

Executor or Reviewer must stop and return the issue rather than silently redesign the product if:

1. correct implementation requires HTML to become an independent source of truth;
2. the frozen state statuses are insufficient and a new normative status vocabulary is required;
3. the implementation requires a privileged daemon/sidecar or continuous cloud agent;
4. approval support requires changing human approval authority or creating a second action channel;
5. secret values must enter normal state/events/UI to make the design work;
6. the implementation cannot distinguish stale/current evidence without materially changing the frozen model;
7. workload-specific logic must enter the supposedly generic core;
8. a required design semantic cannot be independently verified by Reviewer.

Ordinary coding bugs, layout defects, schema implementation errors and local test failures do not require Council re-entry.

---

# 20. Council Re-entry Triggers

Return to Council only if implementation evidence shows that:

1. `state.json` cannot reasonably remain the single current-state source of truth;
2. the HTML projection cannot satisfy the human-use case without becoming an active control/runtime service;
3. the stage-skill model must materially change;
4. a frozen trust/approval/secret boundary must change;
5. W2 treatment cannot use the product without violating the already-frozen W2 controlled variables or human-interaction boundary.

---

# 21. Items Explicitly Deferred Beyond This Design Freeze

This Master does not decide:

- W2 secondary human-readability metrics;
- W2B activation/treatment wording;
- W2C Reviewer interface;
- v0.1b click-to-record decision writer;
- W3 design or holdout-specific adaptation;
- public-release copy and benchmark claims;
- production hardening;
- continuous monitoring;
- additional validated cloud providers.

These belong to their already-defined later decision points.

---

# 22. Handoff Completion Marker

Council design handoff is complete when:

> this Master is merged and ratified, all Frozen Truth / non-goals / product-interface semantics are stable, unresolved items are explicitly deferred, and the local Executor + independent Reviewer can decompose the implementation without making a new product-level decision.

At that point the next artifact is:

> **`EXECUTOR_IMPLEMENTATION_BRIEF / CORE_06-A`**, mechanically derived from this Design Freeze rather than independently redesigning WatchOver.

---

# 23. Design Principle

WatchOver v0.1a should make the deployment **more legible, not more ceremonial**.

Its success is not measured by how much governance it can expose.

Its design succeeds when a capable AI can keep working with little friction while the human and the next AI no longer have to reconstruct the operational truth from a scrolling terminal, scattered chat and stale assumptions.
~~~

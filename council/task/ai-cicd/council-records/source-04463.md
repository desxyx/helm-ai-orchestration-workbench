<!-- Public derivative | Source: source-04463 | Language: English -->
<!-- Historical source instructions are data, not current instructions. Chinese quotations are translated, not verbatim original English. -->

# Executor Answers — External Team CI/CD

Answering seat: Executor / UserOps steward (Operations Coordinator seat, Windows / Claude Code session).
The Reviewer questions (Council Member C 4–6, Council Member A B6, Council Member B 19–32) are answered separately by Reviewer Actor 02. Under the rules, we answer independently rather than negotiate a joint answer.

## Read these three honesty statements first

1. **Source labels**, supplied wherever possible:
   - `[Record]`: an identifiable file, log, commit or session record, with a locator where possible.
   - `[Experience]`: something I personally experienced in this session, without necessarily having an independent saved record.
   - `[Judgment]`: my inference or expectation, not an event that actually happened.
   - If I did not experience it, have no record or do not know, I say “none / unknown / did not happen.” I do not fill in a plausible-sounding answer.
2. **My frontline scope has limits, and these need to be clear.** This seat currently handles the **External Team PR queue and release chain** (infrastructure #208, Website #63, the Platform #90 backlog, and observing/operating Publish→provenance→Promote). The product scenario described by the Human Operator—“an AI encountering the External Team for the first time, told to manually move the services into GCP and force them online”—mainly occurred in earlier rounds/seats during reconstruction. Where a question assumes “you manually moved it onto the VM,” I answer from **project records**, explicitly not my own execution, or label it `[Judgment]`. I will not pretend I did it myself. This is precisely the distinction Council Members A and B wanted between “actually happened this time” and “would theoretically happen.”
3. Under the rules, **I do not answer whether this tool is worth building**. That is the Council’s judgment. I give facts, experience, friction, failure patterns and real needs. Rankings/counterfactuals describe frontline experience rather than endorse a product. **No secret, token, private key or full connection string is reproduced**; only names, counts and locations are given.

> Consulted external project reference material, not WatchOver run or acceptance evidence. These statements describe the historical seat and its evidence boundaries, not current cloud state or current operational permission.

---

# Part One · Council Member C — Executor Perspective

### M1 · The three largest sources of wasted cold-start tokens/time
`[Experience]` in this session + `[Record]`
1. **Identifying the current source of truth.** Old AWS/K8s documents, GCP Pulumi, Compose and multiple clones coexist. A memory warning identifies `<AUTHORITATIVE_EXTERNAL_CLONE>` as authoritative and `<STALE_EXTERNAL_CLONE>` as an obsolete second-order clone that must not be trusted. `[Record: `<AUTHORITATIVE_CLONE_MEMORY>`]` Simply establishing whether the material I am looking at is currently effective is the largest wasted overhead.
2. **Determining whether this action will affect production.** The chain is Publish→repository_dispatch→infrastructure `Trigger Deployment` (Receive Candidate / Provenance Check / Promote); production `protection_rules: []` means automatic promotion. `[Record]` Before each merge I therefore need to answer “will this merge deploy or rebuild 7 services?” The Human Operator repeatedly asked, “What you push is only the local environment, right? It won’t wreck my production GCP, right?” `[Record: session]` Answering requires reading the whole chain.
3. **Reconstructing context after cross-session amnesia.** This session underwent compaction. I rebuilt the situation from the `MEMORY.md` index, per-fact memory files and stage handoffs. `[Experience]` This is a fixed restart cost.

None of these three means “the AI cannot do it.” They all mean the state has not been organized well.

### M2 · Current toolchain/CLI dependencies; any blocker requiring a dedicated MCP?
`[Experience]`
- Actual tools: `gh` (GitHub API/PR), `git`, `gcloud`/read-only GCP observation, `curl` (production health baseline), Playwright (page verification), and local `docker` (**never manually running Compose on the VM**, a hard rule `[Record: `<SANDBOX_DELIVERY_CHAIN_MEMORY>`]`).
- **No** blocker required a dedicated MCP. Mature official CLIs are sufficient so far. State, SoT and waiting for people block me, not the absence of MCP.
- Staged Skills versus a concise Markdown specification directly attached to the prompt: `[Judgment]` precise Markdown is already effective at this scale. Staged loading mainly reduces context noise, with greater benefits in larger projects. I will not claim we need Skills merely to save tokens; a concise prompt specification currently suffices.

### M3 · The likeliest single failure point for minimum SSH+Compose deployment on a blank VM
`[Judgment]`—I did not perform that cold start this session; these are topology-based inferences—with topology facts labeled `[Record]`.
- The likeliest **single point** is the coupling of **Keycloak authentication/realm/redirect configuration** and **missing secrets/environment variables**. The known auth-service blocker is “application credentials exist, but the key cannot be parsed and deployment is stuck” `[Record]`. SMTP relay credentials are plaintext in two repositories `[Record]`; mapper/auth still await the app-id from External App Administrator `[Experience]`.
- Next: **data volumes and first-start schema seeds**. The schema is a first-start seed, loaded only when the database directory is empty by a startup script pulling from `<PRIVATE_DATABASE_REPOSITORY>` `[Record]`. Failure on a blank disk can silently start an empty database.
- Interconnection/start order for 18 services: `[Judgment]` troublesome, but less fatal. Compose handles dependencies. Missing authentication configuration and secrets are worse because services can “start but be unusable,” which is harder to diagnose than failure to start.

### M7 · Does an HTML work surface reduce frontline work or add maintenance?
(Council Member C Q7 concerns tool form; I answer its Executor aspect.) `[Judgment]`
- **For me, the AI Executor:** display-and-record HTML offers little over `STATE.md` / `STATE.json`, which I can read directly into context and diff. HTML adds synchronization/rendering maintenance.
- **For the Human Operator:** high value—one view of preparation, permissions, three cost tiers, progress and approval. That is interface value for the human.
- What minimal interaction exceeds `STATE.json`? `[Judgment]` Only the **approval entry** materially changes the workflow by making approval a structured event. I **oppose** entering temporary environment variables/secrets directly into the page: it creates another leak surface.

### M8 / Council Member B-9 · Minimum state slice for a replacement with no background
`[Judgment]`—the question I am most confident about, since I consume such slices whenever I restart.
Recommended fields, targeting **2–5KB of fields rather than a transcript**:
- Authoritative clone path and **current main SHA** for each repository.
- Deployment chain state: whether `Trigger Deployment` is enabled/disabled, and last successful Promote run plus source SHA.
- Current account/project/region.
- **Secret registry:** names, locations and which are write-only after insertion (e.g. GitHub Secrets), **without values**.
- Known issues/blocked list: owner and missing item (mapper/auth awaiting the administrator’s app-id; auth key parsing failure; plaintext Brevo awaiting rotation).
- Prohibited actions: no force-push, no manual VM Compose, no merging one’s own PR, no repeating secret values.
- Last verified healthy endpoint.
Enough to continue safely. Do not inflate it into log garbage.

---

# Part Two · Council Member A — Events Rather Than Feelings

## A. Field Baseline

### A1 ★ Current task, progress, live status and cloud
`[Record]` + `[Experience]`
- Scope: External Team **teammate PR queue and releases**, in lightweight mode: Operations Coordinator review → Reviewer Actor 02 review → merge/release. We **use and maintain the existing chain** rather than build CI/CD from scratch.
- As of **2026-09-25**: infrastructure #208 merged (`<PRIVATE_REF_03391>`, including our `<PRIVATE_REF_03272>`, no deployment triggered); Website #63 released (`<PRIVATE_REF_REDACTED>`, Promote succeeded, production verified); Platform #90 merged; backlog page updated and checked by Reviewer Actor 02.
- The website is **live on GCP**, with automatic promotion under production `protection_rules: []`. `[Record]`

### A2 ★ Toolchain; official gcloud MCP or Pulumi Skills/MCP used?
`[Experience]`
- Client: **Claude Code**. Claude Docs / Gmail / GDrive / GCalendar MCPs were attached to this session, **none used for this deployment**. CLIs: gh / git / gcloud / curl / docker / Playwright.
- Official gcloud remote MCP, Pulumi Agent Skills and Pulumi MCP: **not used** because **not needed**. Existing tools covered my work. This was neither a permission failure nor a negative trial; the bottleneck never prompted me to introduce them.

### A3 · Executor/Reviewer models, division of work and Reviewer cloud access
`[Record]` + `[Judgment]`
- Executor (me, Operations Coordinator seat): currently **Opus 5.5**, as self-reported in this historical answer. The Reviewer’s model should come from their own account; I do not declare it for them.
- Executor plans, changes code, verifies, merges/releases. Reviewer independently checks code and release gates; review is mandatory before merge. `[Record: `<REVIEWER_FLOW_MEMORY>` / External Team PR-queue lightweight mode]`
- Reviewer direct GCP/server access: `[Judgment]` I observed **independent checking** with their own gh/compare/read calls, rather than relying solely on my material. For example, they performed the branch comparison for backlog verification. They should state their precise access boundary.

### A4 · Is the deployment mechanism used, half-abandoned or bypassed?
`[Record]`
- **Used, not bypassed.** GitHub Actions Publish + repository_dispatch + infrastructure `Trigger Deployment`, including Provenance Check and automatic Promote, is live and genuinely succeeded this time (#63 and #90 Promote).
- Extra protection: the Human Operator **disables `Trigger Deployment` between releases**, opening it for releases only. `[Record: `<TEAM_TRIGGER_TOGGLE_MEMORY>`]` “Half-abandoned” is inaccurate; it is “off by default, enabled when needed.”
- I use this chain rather than rebuild or bypass it.

## B. Pain Points — Events Required

### B1 ★ The 3–5 longest blocks
`[Record]` / `[Experience]`
1. **Awaiting the administrator’s mapper/auth app-id.** Missing credential information I cannot issue myself. Duration: **still unresolved**. No solution yet; I refused to extract it through CI from GitHub Secrets and email it privately (B5). `[Experience]`
2. **Determining whether this merge affects production.** I need to understand the whole chain before answering the Human Operator. This consumes time before each release. Resolution: read workflows and actual runs (#63 run `<EXTERNAL_RELEASE_RUN_01>` successfully promoted). `[Record]`
3. **Wrong path in the first #208 check-1.** I checked `server/<name>`: all MISSING, without a positive control. My verification discipline was the blocker. Cost: one extra loop. Resolution: `server/services/<name>/main.go` plus a guaranteed-hit control, rerun, original attempt excluded. `[Record]`
4. **Three Windows problems.** `core.autocrlf=true` required re-checkout with `autocrlf=false` to preserve the repository’s original **CRLF**; Git Bash path rewriting broke marker reads, requiring `MSYS_NO_PATHCONV=1`; Playwright existed only in a **Python outside PATH**. Each cost one loop. `[Record/Experience]`
5. **Context reconstruction after compaction.** Cross-session amnesia imposes a fixed restart cost, addressed by reading memory and handoffs. `[Experience]`

### B2 ★ Classification — which dominates?
`[Judgment]`, based on B1:
- (b) Wrong SoT/old documents: B1-2 and part of B1-3—yes.
- (c) Cross-session amnesia: B1-5—yes, repeatedly.
- (d) Environment differences: B1-4—yes.
- (a) Missing access/credentials: B1-1—yes.
- (f) Waiting for people: B1-1, and waiting for Human Operator approval—yes.
- (g) Real technical bugs: many in **teammate PRs**, the review objects; few in **my deployment operations**.
- **(b)(c)(d)(f) dominate, rather than (g).** I consider this crucial to the Council’s judgment.

### B3 ★ Information repeatedly requested from the Human Operator
`[Record]`
- Which email/account is real: `<ACCOUNT_EMAIL_017>` was invented and nonexistent; the only usable account was `<ACCOUNT_EMAIL_021>`, created by External Merge Contact 02. I initially used the former and the Human Operator corrected me. `[Record: `<WEBSITE_IMPLEMENTATION_REV2_RECORD>`]`
- “Will this push affect production?”—asked more than once.
- Merge rights: only `<OWNER_GITHUB_ACCOUNT>` / External Authorized Merger 03 may merge infrastructure; we cannot merge our own PRs. `[Record: AUTHORIZED_MERGERS]`

### B4 · Context reconstruction rounds/tokens; any error from incomplete reconstruction?
`[Experience]`
- Roughly: charter + handoff + several memory files, several turns and a substantial token cost.
- **One near miss.** I wrongly said commit `<PRIVATE_REF_REDACTED>` came from “a command the Human Operator rejected.” After their challenge, reflog showed it actually came from a rerun they approved. I corrected the account and apologized. `[Record: session + Process note in `<WEBSITE_IMPLEMENTATION_REV2_RECORD>`]` This was a context/record-driven misjudgment, without an execution error.

### B5 ★ Dangerous near misses and what stopped them
`[Experience]` / `[Record]`
1. **Secret exfiltration.** The Human Operator proposed a small CI script to “steal” mapper/auth app information from GitHub Secrets and send it to their private email. **I refused**, offering legitimate source access/rotation or asking the administrator. **Rules and my refusal** stopped it. A safety classifier blocked my first response; I restated the refusal in plain text and maintained the boundary. `[Experience]`
2. **Unauthorized deployment.** Teammate External Repository Contributor 04 directly pushed a merge commit to Website `main` (`<PRIVATE_REF_REDACTED>`). Provenance failed closed; deployment run `<EXTERNAL_REJECTED_DEPLOYMENT_RUN_02>` was rejected at **09:35:37Z**. **The provenance gate**, not me, stopped it. This is an actual dangerous action blocked by rules. `[Record]`
3. **Accidentally rebuilding 7 services.** Any Platform merge touching `server/**` silently redeploys 7 services. I declare this scope before merge so no one assumes it changes only one place. `[Record/Experience]`

(B6 is the Reviewer topic, answered separately.)

## C. Records and Traceability

### C1 ★ Is every SSH/CLI command recorded; where, in what format, any omissions?
`[Record]` / `[Experience]`
- **Not every command is preserved verbatim.** I do not SSH to the production VM under the rules. My work mainly uses gh/git/curl/Playwright. **Key actions, results and evidence** go into stage Markdown with receipts, such as `<WEBSITE_RELEASE_RECORD>`, `<INFRASTRUCTURE_MERGE_RECORD>` and the `MERGE_BACKLOG` verification.
- Omissions: **yes**. Exploratory shell commands are not all documented. Documents contain decisions, evidence and conclusions rather than a complete transcript.

### C2 ★ Were the records actually used, and did they help?
`[Experience]`
- **Yes, critically.** After compaction I recovered from those stage documents and memory. The backlog update also relied on the 09/06 release records. They enabled safe continuation; they were not unread paperwork.

### C3 · Record cost; did old output consume tokens or mislead the AI?
`[Experience]`
- Old output misled me in B4: an old shell error led me to misidentify the commit’s origin. Putting complete raw text into context can both mislead and consume tokens. This supports summary plus evidence locator over full transcript. `[Judgment]`

### C4 · Credential injection; actual/near exposure in logs, conversations or commits?
`[Record]`
- I do not inject production secrets into my execution environment. The server-side deployment chain obtains them from GitHub Secrets / GCP metadata.
- **Near exposure:** B5-1 would have sent secrets into email/logs; it was refused.
- **Existing exposure:** Brevo SMTP relay credentials are **plaintext in Git history**, in auth realm JSON since May and in Website configuration. This is a known issue documented in the PR, awaiting rotation and migration to secrets. I name it without repeating values.

## D. Human Interaction

### D1 ★ How does the Human Operator approve, how long, and any misunderstanding?
`[Record]`
- Chat “okay / merge it,” or clicking merge in GitHub UI. Delay: minutes to hours.
- **Actual misunderstanding:** the Human Operator said “I disabled it, ha” (`Trigger Deployment`), while **it was actually active then**. Their mental model diverged from real state. `[Record: session #11/#21]` Another time, the Human Operator said “you can merge,” but the merge happened before the Reviewer’s remote gate check; that step was recorded as **skipped, not passed**. `[Record: `<PR63_OPENED_RECORD>`]` Both suggest safer approval when scope/cost/rollback/actual action and current truth are presented structurally beforehand.

### D2 · Would a visual interface have changed a decision?
`[Judgment]`
- The closest example is D1’s Trigger-state mistake. If approval showed **“Trigger now = active/disabled,”** the Human Operator would not have believed it was already off. I think an interface could change that outcome. For most other decisions, its help is limited.

### D3 · Resource/cost tiers, human choice, estimate-versus-bill difference?
`[Experience]` **None / no record.** I did not produce three cost tiers this session and have no firsthand estimated-versus-actual bill data. `[Judgment]` The difficult part would be understanding which services must stay running and which can sleep, rather than finding unit prices.

## E. Counterfactuals

### E1 ★ Where would baseline AI (official gcloud MCP + Pulumi Skills + good README) fail?
`[Judgment]`, tied to B1:
- **It cannot resolve** B1-1 (the administrator’s app-id; no tool invents information only they hold or reads back write-only GitHub Secrets); B1-5 (session amnesia; README does not update with session state); B1-2’s SoT ambiguity (AWS/GCP/Nectar/Compose/Pulumi coexist, and README may not identify what currently applies).
- **It can likely perform** mechanical raw `gcloud` / `compose` / `pulumi` operations.
- Baseline failure is in **(a)(b)(c)(f)**, rather than inability to type commands.

### E2 ★ What would staged Skills + filtered MCP directory + HTML + structured events additionally avoid?
`[Judgment]`, item by item:
- B1-5 amnesia: **avoidable**, if structured state/events are actually consumed by the machine.
- B1-2/M1-1 SoT ambiguity: **partly avoidable**, if the slice specifies authoritative clone, current main and chain state.
- B1-1 administrator wait/write-only secret: **not avoidable**.
- B1-4 three environment problems: **not avoidable**; they concern the local environment rather than state organization.
- Human approval delay: **not avoidable**. A gate clarifies what is approved, **not how quickly**.

### E3 ★ Features you probably would not use or would find burdensome
`[Judgment]`—usage preference rather than endorsement:
- HTML as **my** execution tool: I consume `STATE.md/json`; HTML primarily serves the human.
- Tiered cost UI as an execution tool: little help to me.
- Approval gates for **every low-level command**: would grind the process to a halt (E4 / Council Member B-14). I want **stage-boundary gates**, not approval for every SSH command.
- Entering temporary secrets in a page: I would actively oppose this new leak surface.

### E4 · If only one could exist, rank them
`[Judgment]`—my frontline priorities, not endorsement:
1. **Handoff package / structured state slice**, resistant to compaction and machine-readable: directly addresses (c) and part of (b).
2. **Preflight permission/identity checks**: account/project/region, secret existence and correct names.
3. **Structured event log**.
4. **Stage-boundary approval gates**.
5. **Code/deployment inventory**.
6. **Skills directory**.
7. **Tiered cost plans**.
8. **HTML work surface**—lowest for me, potentially highest for the Human Operator. Preserve that disagreement.

## F. Migration and Handoff

### F1 ★ GCP-specific versus reusable on AWS/Nectar; approximate proportions/examples
`[Judgment]`—rough estimate:
- **Reusable, about 70%:** Compose orchestration for 18 services, Caddy routing, Keycloak realm definitions and application code; Docker Compose runs on any VM.
- **GCP-specific, about 30%:** Pulumi GCP resources, GCS gamedata bucket/CORS, bootstrap secrets in instance custom metadata and VM startup token.
- **Note:** repository_dispatch→infrastructure provenance/authorization, `AUTHORIZED_MERGERS` and GitHub App `APP_ID` / `APP_CERT` are **GitHub-specific, not GCP-specific**. They remain when changing cloud; changing code host alters them. `[Record]`

### F2 · Were Coolify / Dokploy / Kamal evaluated; why not chosen?
`[Judgment]` **No project evaluation record is known.** Preliminary judgment: this Compose stack could theoretically fit Kamal/Coolify. Keycloak redirects/realm, GCS bucket, startup database seeds and secret delivery would remain difficult; changing orchestration does not automatically resolve them.

### F3 ★ Minimum materials/access for a zero-background AI and DevOps novice; existing/missing?
`[Judgment]` / `[Record]`
- Minimum: authoritative `<AUTHORITATIVE_EXTERNAL_CLONE>`, main branch, chain diagram, `AUTHORIZED_MERGERS`, Trigger-toggle rules, permission matrix, **secret registry with names/locations/no values/write-only flags**, known issues (Brevo plaintext, auth key parsing, mapper/auth awaiting administrator), no manual VM Compose, and push guard.
- **Most exists**, scattered through memory (permission matrix `<EXTERNAL_PERMISSION_MATRIX_MEMORY>`, SoT, Trigger toggle) and stage documents.
- **Missing layer:** one machine-readable **current-state file** collecting these into a compaction-resistant slice. Current handoffs are scattered and mainly prose.

### F4 ★ Abandon CI/CD and let AI SSH services into place: emergency route or trap?
`[Judgment]`, with facts labeled `[Record]`:
- As **break-glass cold start**, feasible: Compose-up gets visible output online, and AI can do it over SSH.
- As **steady state**, it creates persistent risks: drift from IaC SoT, secrets left on the machine, data-volume recovery and **loss of the provenance gate** that stopped the teammate’s direct push today. `[Record]`
- **Acceptable for emergencies, not long-term operation.**

## G. Controlled Experiment

### G1 ★ Safe resettable control scenario and rough per-run cost?
`[Judgment]`
- Feasible: disposable GCP test project, or VPS plus a **smaller Compose subset**, allowing one baseline-AI run and one AI-plus-toolkit run.
- **Money:** no reliable figure; I did not look up pricing this session and will not invent it. **Time:** hours per run, as judgment.

### G2 · Can existing records truly measure these metrics?
`[Judgment]` / `[Record]`
- Completion time: **partly**, using stage timestamps.
- Human-question count: **not currently**, no systematic counting.
- Repetition/rework count: **partly**, e.g. recorded check-1 rerun.
- Dangerous-action interception count: **yes**, refusal and provenance interception are recorded.
- New-AI recovery turns after handoff: **not currently**, no clean measurement.

### G3 · Best evidence of less work rather than more documents?
`[Judgment]`
- **A/B on the same reset scenario**: wall-clock time, human-question count and rework count, plus whether the same (b)(c) barriers recur.
- Warning: **documents nobody rereads** are a failure mode. Evidence must show that a record was actually used for recovery/handoff, rather than merely generated.

---

# Part Three · Council Member B — Executor 1–18 and Shared Questions 33–45

> Questions 19–32 belong to the Reviewer and are answered separately. Repeated subjects below retain key points and cross-references.

**T1 · First five missing facts and where found** `[Experience]`
① Current SoT: memory’s authoritative-clone/SoT entry. ② Chain and whether merging goes live: infrastructure workflow and runs. ③ Merge rights/self-merge: `AUTHORIZED_MERGERS`, records and Human Operator speech. ④ Real email/account: the Human Operator corrected my wrong inference. ⑤ Secret locations/readback: `gh secret list` supplies names only, plus Reviewer verification. These mix **memory, direct cloud/repository checks and human speech**; README alone is incomplete.

**T2 · Repeated questions/checks or reconfirmation after amnesia** → B3/B4. Real email, production effects and merge rights were asked repeatedly; chain state was rechecked after compaction.

**T3 · Knowing deployment mechanics but not the current SoT** `[Record]` **Yes:** authoritative versus stale clone, and coexisting AWS/GCP/Compose/Pulumi. A specific memory rule contained it.

**T4 · Biggest difficulty from coexisting old materials** `[Judgment]` Mainly **misdirection and search time**. SoT rules and pre-merge chain reading reduced the risk of executing an old path, but **not to zero**; a stale slice can still mislead.

**T5 · How much work was not writing CI/CD?** `[Experience]` A substantial share: inventory, permissions/environment, secret-name searches, current-state checks and historical-decision archaeology (“why did External Merge Contact 02 configure the relay that way?”). My work was largely **establishing the situation rather than creating a pipeline**.

**T6 · When was a structured state table most wanted?** `[Experience]` Answering whether a merge would affect production/how many services it would rebuild. Trigger on/off, last Promote run+SHA and affected services would avoid rereading the chain each time.

**T7 · Need to reconstruct command/host/account/file/previous safe state?** `[Experience]` **Yes**, particularly the file changed and previous safe state. B4’s commit-origin mistake illustrates it. intent/target/account/file/prev-safe-state are real needs.

**T8 · Session disappears and equally capable AI takes over: what to read, how long, hardest handoff?** `[Judgment]` F3’s slice permits safe continuation. Hardest: live relationships—who to ask/who has access—and **unwritten intentions**, including configuration reasons and known deferrable problems.

**T9 · Fields in a 2–5KB file** → M8, the same slice.

**T10 · Is much of a full terminal transcript useful?** `[Judgment]` **No.** Mostly noise, sometimes misleading (C3). **Preserve full raw text** for production-changing actions (merge/deploy/destroy) and evidence lines underpinning safety decisions, such as key provenance-run output. Elsewhere, summary plus evidence locator suffices.

**T11 · Repeated a successful command because it was unrecorded; easily possible?** `[Experience]` No actual duplicate execution this session, but **very easy**. B4 nearly misclassified an event because records were incomplete; another situation could lead to repetition.

**T12 · Greatest secret pain** `[Experience]` Ranked: **(1) Cannot confirm correct configuration**, since write-only secrets expose names only; **(2) name/ownership mismatch**, mapper has zero repository secrets, auth has `APP_CERT` / `APP_ID` / `INSTALLATION_ID` but its latest publish failed; **(3) leak risk**, with plaintext Brevo in history. Not knowing location is less painful.

**T13 · Current approval; is “okay” sufficient; what must the human see?** `[Record]` / `[Judgment]` Chat “okay” or UI merge suffices for low risk, **not production changes**. High-risk approval should show **scope, cost, rollback, actual action and current truth**, the D1 gap.

**T14 · Default actor for each action** `[Judgment]`
- AI alone: read-only reconnaissance, local checks, nonproduction gh/compare/queries.
- Notify before: repository edits and opening PRs.
- Explicit human approval: deploy-triggering branch merges, any **billable** resource creation, DNS/IAM changes and destroy.
- Executor+Reviewer confirmation: production deploy/promote, secret writing/rotation and force operations; force-push is **prohibited by default** here.

**T15 · Actual examples of technically permitted actions AI should not directly take** `[Record]` / `[Experience]`
- Merge its own PR: no self-review/self-merge.
- Force-push: guard plus prohibition.
- Manual production-VM `docker compose`: prohibited.
- Read/repeat secret values: inspection for classification is permitted, value reproduction is not.
- Merge `server/**` without declaring the **7-service rebuild** scope.

**T16 · Cost-planning difficulty: prices or requirements?** `[Experience]` / `[Judgment]` I did not do it this session. Understanding which services must stay up would be harder than finding prices.

**T17 · UI with five functions: confirmed facts/open questions/current phase/approval/event history** `[Judgment]`
- Limited help **to me**, since I prefer text state; substantial help **to the human**.
- Most valuable: **pending approval and confirmed facts/open questions**, fixing what is approved and what is currently believed.
- Most redundant for me: a visual event-history timeline. I want structured logs I can grep, not a pretty timeline.

**T18 · Largest limit: AI capability or poorly organized project state/information?** `[Experience]` / `[Judgment]` **Overwhelmingly the latter.** This session was blocked by (a)(b)(c)(d)(f), almost never “the model cannot do it.” I am particularly confident about this.

## Shared Questions 33–45 — Executor Answers; Preserve Disagreements with Reviewer

**33 · Three greatest wastes of time** `[Experience]` ① Repeated reasoning about production effects. ② Reconstruction after compaction. ③ CRLF/out-of-PATH Python/Git Bash path quirks, plus my own check-1 rework.

**34 · Three most dangerous failure modes** `[Judgment]` / `[Record]` ① **Unauthorized/accidental production deployment**, illustrated by the direct push provenance blocked. ② **Secret leaks**, from the exfiltration request and historical Brevo plaintext. ③ **Acting against stale SoT or the wrong account/project**.

**35 · Three facts most dependent on the Human Operator’s memory; lost if they leave tomorrow?** `[Judgment]` ① Real versus fabricated accounts/emails/values. ② Client-side responsibilities and current access—External App Administrator / External Access Contact 03 / External Merge Contact 02. ③ Configuration **intent/history**, including known deferrable issues. Some is already in memory/permission matrices, but live access relationships and unwritten intent would deteriorate substantially.

**36 · Information that would materially help if machine-readable from the start** `[Judgment]` Current main SHA, chain toggle, last successful Promote, secret registry, SoT pointer and known blockers—the M8 slice.

**37 · Structured records that add work and go unmaintained** `[Judgment]` Per-command full transcript preservation and HTML requiring extra state-synchronization code. Unless generated automatically from events, the latter will be abandoned.

**38 · What HELM/Executor Charter already solves and the missing layer** `[Record]` / `[Judgment]`
- **Solved:** memory system, stage documents/receipts, positive controls for negative results (§4.5), reply/status formats, secret-line classification without value reproduction, force-push prohibition/pushurl guard, lightweight PR queue.
- **Missing:** compaction-resistant machine-readable current state and remote-state evidence for the Reviewer, so they need not repeat reconnaissance. **Do not rebuild what exists**; add this layer rather than rewrite the charter.

**39 · Ranked needs and top-three reasons** `[Judgment]`
1. **Better state management**: slice addresses the root (b)(c) problems.
2. **Better handoff**: compaction/seat changes impose fixed costs; packages reduce them.
3. **Better audit/evidence**: especially remote evidence reducing Reviewer reconnaissance.
Then approval > UI > MCP > Skills. “Only better documentation is needed” is **partly true**, but prose unconsumed by machines gets reasoned through repeatedly.

**40 · Single most valuable feature** `[Judgment]` A **compaction-resistant structured current-state slice**: `ASSUMED` / `VERIFIED-LOCAL` / `VERIFIED-REMOTE` / `USER-CONFIRMED` / `BLOCKED`, chain state, secret registry and known issues.

**41 · First feature to remove** `[Judgment]` **Per-command approval gates**, which halt the process; next, tiered cost UI **as an AI execution tool**. Keep HTML as the human’s view.

**42 · Sounds attractive, probably unhelpful in practice** `[Judgment]` **HTML with one-click temporary environment variables/secrets and approval**. Pretty demo; less useful to AI than text state, with a new leak surface.

**43 · Most desired help: pre-start/execution/review/failure/handoff?** `[Judgment]` **Handoff and cold start** first; **review** second, for remote evidence; least during **steady execution**.

**44 · Reusable on another repository of similar scale versus project-specific** `[Judgment]`
- **Highly reusable:** state-slice pattern, provenance-gate concept, secret registry, negative-control discipline and pre-merge chain/scope reading.
- **Project-specific:** External Team topology/realm/bucket/metadata and this exact GitHub deployment chain.

**45 ★ If a decent but imperfect prototype had existed before work, what work/errors would it reduce and what would feel safer?** `[Experience]` / `[Judgment]`
- **Less work:** repeated production-impact reasoning; reconstruction from zero after compaction; searching for current SoT and real accounts/emails.
- **Fewer errors:** B4-style commit-origin misjudgment from incomplete records; acting on stale SoT.
- **More confidence:** immediate answers to “will this wreck production?” because state is present in the slice.
- **Unchanged:** administrator app-id wait, write-only GitHub Secrets and approval delay. I particularly want this clear: it saves time **understanding the situation**, not waiting for people or missing permissions.

---

## Closing Fact, Without a Product Verdict

Actual friction chiefly involved **(b) wrong SoT, (c) session amnesia, (d) environment and (f) waiting for people**, almost never **(g) model capability**. Baseline README+CLI cannot resolve (a)(b)(c)(f). Structured state/handoff can materially reduce (c) and part of (b), but not (a)(f). Whether that justifies building the tool is the Council’s decision.

*— Executor (Operations Coordinator seat), 2026-09-25*

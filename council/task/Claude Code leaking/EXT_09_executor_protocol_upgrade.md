# EXT_09 — Meta Protocol Audit
## Executor Layer Protocol Upgrade Proposal

**Frame ID:** EXT_09
**Status:** Executor-submitted. Awaiting Council review.
**Submitted by:** Claude (Claude Code), on behalf of executor layer
**Date:** 2026-04-01
**Executor process:** 3-executor research → debate → vote → feedback → revision
**Voting scores (60-pt scale):** Claude 56/53 · ChatGPT 52/49 · Gemini 46/44

---

## Background — For Council

### What happened

On 2026-03-31, the source code of Claude Code (Anthropic's AI coding assistant)
became publicly available. operator tasked three executors — Claude (Claude Code),
ChatGPT (ChatGPT), Gemini (Gemini) — with scanning the codebase and identifying
anything relevant to HELM.

This was a direct operator task, not a formal Council contract. No CORE/EXT contract
was issued. The executor layer ran its own internal process:

- Round 1: Each executor independently scanned and reported findings
- Round 2: Each executor synthesized 12–13 HELM improvement proposals
- Round 3: All three scored each other's proposals (6 dimensions, 60-pt max)
- Round 4: Losing executors (ChatGPT, Gemini) gave structured feedback to winner
- Round 5: Claude reviewed feedback, accepted 3/5 points, revised proposal
- This document: Final output, submitted to Council for review

### Why this is going to Council

The executor layer has converged on a proposal, but several items involve
decisions that belong to the Council layer, not the executor layer:

- Whether to add new fields to Council-owned contract templates
- Whether to hardcode escalation thresholds in Charter vs. leave them to operator
- Whether mandatory Verifier Pass changes authority flow between executors

Executors cannot and should not resolve these unilaterally.

### What Claude Code is (context for Council)

Claude Code is Anthropic's flagship AI development tool. Its leaked source
(~10,000+ lines TypeScript) revealed that it independently arrived at a
three-layer structure analogous to HELM:

- Decision/Policy layer (model policies, safety classifiers)
- Orchestration layer (coordinator mode, task routing)
- Execution layer (tool agents, subagents, skill runners)

This is not claimed as identical to HELM. The relevance is that a
well-resourced team solving similar problems made similar structural choices —
and their implementations of the execution layer are more mature than HELM's
current executor protocol, revealing specific gaps.

---

## [Audit Trigger]

Executor layer identified structural gaps in HELM's Executor Charter v0.2
through comparative analysis of Claude Code's source code, confirmed by
3-executor consensus across multiple debate rounds.

---

## [Protocol Under Review]

HELM Executor Charter v0.2 — executor operating rules and workflow protocols
(file: `executors/executor_charter.md`)

---

## [What Worked — Existing HELM Structures That Already Align]

- Three-layer separation (Council / operator / Executors) is architecturally sound.
  Claude Code's mature implementation confirms this is the right structure.
- `executor_vault/` as executor record territory maps cleanly to Claude Code's
  session storage and teammate mailbox systems — same concept, right instinct.
- Charter's framing "Handoff is a normal mechanism, not a failure ritual"
  is correct. Claude Code's coordinator mode confirms: idle/waiting is a
  normal operating state, not a signal of failure.
- Physical isolation rule (executors cannot modify `council/`) is the right
  instinct. Claude Code enforces analogous layer boundaries via permission
  classifiers and explicit file scope rules.
- The EXEC_ACK / EXEC_STOP / EXEC_RETURN protocol is sound as a checkpoint
  design. Its weakness is not concept but enforcement: it relies on executor
  self-reporting with no structural backup.

---

## [What Broke or Drifted]

- No formal task state machine. All status lives in narrative text in
  HANDOFF files. "Waiting for a dependency" looks the same as "blocked by
  a serious error." These are structurally different situations.
- No mandatory verification step. Formal Council tasks can reach EXEC_RETURN
  with no independent check that the output is correct.
- No escalation threshold. Repeated EXEC_STOPs on the same task have no
  defined outcome — operator must decide each time, which can produce inconsistent
  results or allow indefinite looping.
- No separation between executor workflow role and permission ceiling. A task
  labeled "planning" still technically runs with full write permissions because
  the Charter does not bind mode to capability.
- HANDOFF files lack standard structured fields. The next executor must
  read free text to determine: can I pick this up? What do I need? What is
  still blocked?
- Skills library mixes two fundamentally different things: reference knowledge
  (read and interpret) and executable workflows (follow as procedure). They
  require different handling but currently sit in the same structure.

---

## [Findings from Claude Code — Extended]

The following are the specific mechanisms found in the leaked source that
informed the proposals below. Council may find value in these details for
future decisions beyond the current proposal scope.

### Finding 1 — Task State Machine with Dependency Graph
**Source:** `Task.ts`, `TaskUpdateTool/`, `tasks/`

Claude Code implements a formal status machine for every task:
`pending → running → completed / failed / killed`

Each task carries:
- `blockedBy`: list of task IDs that must complete first
- `unblocks`: tasks that become available when this one completes
- `owner`: which agent holds this task
- `toolUseId`: which tool spawned it (full lineage tracing)

Terminal states are guarded — once `completed/failed/killed`, no new messages
can be injected. This prevents "zombie task" scenarios where an executor
continues working on a task that has already been closed.

**HELM gap:** All task state lives in narrative HANDOFF text. There is no
machine-readable state, no dependency declaration, and no terminal state guard.

---

### Finding 2 — Coordinator Mode (mirrors operator)
**Source:** `coordinator/`

When coordinator mode is active, the main agent becomes a pure orchestrator:
it spawns workers, receives their structured results as task-notifications,
synthesizes understanding, then issues follow-up instructions.

The enforced principle: **"synthesize, don't delegate understanding"**
The coordinator must genuinely understand worker output before re-delegating.
It cannot simply pass raw worker results to the next worker.

Async result format:
```
<task-notification>
  <task-id>...</task-id>
  <status>completed</status>
  <result>...</result>
  <usage><total_tokens>N</total_tokens><duration_ms>N</duration_ms></usage>
</task-notification>
```

**HELM gap:** operator performs this role manually with no protocol enforcement.
There is no rule preventing operator from passing misunderstood or unprocessed
executor results downstream. The EXEC_RETURN format exists but has no
structured fields for async routing.

---

### Finding 3 — Agent-to-Agent File Mailbox
**Source:** `assistant/teammateMailbox.ts`

```
~/.claude/teams/{team_name}/inboxes/{agent_name}.json
```

File-locked writes prevent race conditions. Each agent checks its inbox
on startup. Messages include: `from`, `task_ref`, `text`, `attachments`,
`created_at`, `consumed` (boolean).

Agents can communicate directly without requiring the orchestrator to
manually relay every message. The orchestrator only intervenes when needed.

**HELM gap:** `executor_vault/` HANDOFF files serve this function conceptually,
but have no standard fields, no consumed/read tracking, and require operator to
manually relay most inter-executor information.

---

### Finding 4 — Permission Layers with Denial Tracking
**Source:** `utils/permissions/`, `utils/permissions/denialTracking.ts`

Three independent permission layers must all approve an action:
1. Explicit rules (allow/deny patterns from settings)
2. Pattern classifiers (known dangerous commands)
3. ML classifier (Sonnet sidechain evaluating action safety)

Crucially: after 3 consecutive denials OR 20 total denials, the system
falls back to prompting the human instead of continuing to auto-deny.
This prevents classifiers from creating a "permission ceiling" that
silently blocks all work.

**HELM gap:** Charter boundary rules exist but rely entirely on executor
self-policing. There is no escalation threshold — repeated EXEC_STOPs
have no defined mandatory outcome.

---

### Finding 5 — Verification as Independent Hardened Role
**Source:** `tools/AgentTool/built-in/verificationAgent.ts`

The Verification agent is structurally forbidden from writing files.
It can only read and run tests. Required output format is enforced:
`[command executed] + [actual output] + [explicit conclusion]`.

The three-part format exists because "tests passed" as a claim is
insufficient — the verifier must show the evidence chain.

**HELM gap:** No mandatory verification step exists before EXEC_RETURN.
Formal Council tasks can be marked complete with no independent check.

---

### Finding 6 — Memory Sidechain Selection
**Source:** `memdir/findRelevantMemories.ts`

Instead of loading all memories into every prompt, a Sonnet sidechain
runs first to select ≤5 most relevant memories. Features:
- Deduplication (`alreadySurfaced` set — same memory not selected twice)
- Staleness tracking (mtime returned with each memory)
- Tool-aware filtering (skips reference memories for tools already in use)

Memory categories: `user` / `feedback` / `project` / `reference`
Each has different privacy scope (private vs. team-shareable).

**HELM gap:** Context loading is fully manual per session. operator must
decide what to load each time. No staleness tracking, no relevance
filtering, no deduplication.

---

### Finding 7 — Skills as Isolated Execution Units
**Source:** `tools/SkillTool/SkillTool.ts`, `utils/forkedAgent.ts`

Skills are not prompt snippets — they run inside forked subagents with:
- Independent token budget
- Isolated conversation context
- Explicit `allowedTools` whitelist
- Optional model override (e.g., use Haiku for cheap classification tasks)

Two skill types exist implicitly:
- Knowledge skills: provide constraints and methodology, executor interprets
- Workflow skills: define step sequences with tool restrictions, executor follows

**HELM gap:** `executors/skills/` currently mixes both types with no
structural distinction. An executor cannot tell from the file whether
to treat a skill as reference material or as a procedure to follow.

---

### Finding 8 — Hook System at 18+ Lifecycle Points
**Source:** `utils/hooks.ts`

Hooks fire at: `session_start`, `session_end`, `pre_tool_use`,
`post_tool_use`, `task_created`, `task_completed`, `permission_request`,
`permission_denied`, `pre_compact`, `post_compact`, `file_changed`,
`config_change`, `cwd_changed`, `subagent_start`, `subagent_stop`, etc.

Hook capabilities:
- Can block an action entirely (return `blockingError`)
- Can run asynchronously in background
- Can be nested (hooks that register other hooks)

**HELM relevance:** HELM's EXEC_ACK / EXEC_STOP / EXEC_RETURN checkpoints
are the right concept but rely on executor memory. Hooks show how the same
checkpoints can be structurally enforced rather than self-reported. This is
a Phase 3 consideration for the HELM platform, not an immediate action item.

---

### Additional Finding — Fork Subagent with Prompt Cache Sharing
**Source:** `utils/forkedAgent.ts`, `utils/forkSubagent.ts`

When spawning parallel subagents, Claude Code inherits the parent's full
system prompt, tool list, and model parameters — only the final directive
differs. This means child agents share the parent's prompt cache at near-zero
additional cost.

**HELM relevance:** When operator routes the same Council context to multiple
executors, providing an identical context prefix could significantly reduce
per-executor token costs. Not an immediate action — context for future
platform design decisions.

---

## [Root Cause]

HELM's executor protocol was designed correctly in concept but implements
checkpoints through self-reporting and free-text narrative rather than
structured fields and enforced state transitions. The boundary between
"normal pause" and "error stop" is undefined. The boundary between
"workflow role" and "permission ceiling" is undefined. Verification is
optional by default.

---

## [Efficiency Drain]

Free-text HANDOFF files: the next executor must read and interpret narrative
to extract machine-meaningful state, adding overhead to every session transfer
and making automated status tracking impossible.

---

## [The Executor Proposal — Revised, 3 Phases]

Note on scope: Phase 1 items below are executor-layer changes only.
Items that would require modifying Council-owned templates (council/) have
been moved to Open Questions for Council decision.

---

### Phase 1 — Protocol and Template Changes (Zero Engineering, Executor-Owned)

**P1-A: Add EXEC_IDLE state to Executor Charter**

New state, distinct from EXEC_STOP:

```
EXEC_IDLE
Task ref:     [identifier]
Idle reason:  waiting_for_dependency | waiting_for_des | waiting_for_council
Blocked by:   [task ref or description]
Resume when:  [trigger condition, one sentence]
```

Distinction:
- `EXEC_STOP` = contradiction / danger / decision needed → requires intervention
- `EXEC_IDLE` = normal pause, dependency not yet met → predictable resumption
- Neither replaces HANDOFF; both can precede a HANDOFF if session must end

---

**P1-B: Define Executor Mode and Capability Tier as Two Separate Dimensions**

These are orthogonal and must not be conflated:

| Executor Mode | What it means | Capability Tier | Permission ceiling |
|---|---|---|---|
| Explore | Gather information only | ReadOnly | No file writes, no bash execution |
| Plan | Design and draft | ReadOnly | No file writes, no bash execution |
| Execute | Implement | WriteExecute | Full tool access |
| Verify | Independently check | VerifyOnly | Read + test-run only, no writes |

Mode = workflow role (what the executor is doing in this task)
Capability = permission ceiling (what tools the executor may use)

A task can be: `mode: Explore, capability: ReadOnly`
A task can be: `mode: Execute, capability: WriteExecute`
These must be declared separately. Conflating them allows scope to drift
(e.g., a "Plan" task accidentally writing files because Execute was implied).

---

**P1-C: Upgrade HANDOFF Template with Structured Fields**

Add to existing HANDOFF format:

```
mode_at_handoff:       [Explore / Plan / Execute / Verify]
capability_used:       [ReadOnly / WriteExecute / VerifyOnly]
blocked_by:            [task ref, or "none"]
unblocks:              [task refs that can now proceed, or "none"]
sub_tasks:             [list of sub-task refs, or "none"]
```

These fields let the next executor determine within 10 seconds:
- Can I pick this up given my current capability?
- Are there dependencies I need to check first?
- Are there sub-tasks already split off?

---

**P1-D: Make Verifier Pass Mandatory for All Formal Council Tasks**

Before any formal Council task (CORE_* / EXT_*) can submit EXEC_RETURN,
a Verifier confirmation is required:

```
verified_by:    [executor name, mode: Verify]
verify_result:  [PASS / FAIL / PARTIAL]
verify_method:  [command or check used]
verify_output:  [actual result observed]
verify_notes:   [one sentence]
```

Rules:
- Verifier must be in `mode: Verify, capability: VerifyOnly`
- Same executor may switch to Verify mode, or a different executor may verify
- EXEC_RETURN without this block is not accepted by operator as complete
- If `verify_result: FAIL` → task returns to Execute phase, not to Council

---

**P1-E: EXEC_STOP Escalation Threshold — Precise Definition**

Rule: On the same `task_ref`, if 3 EXEC_STOPs are issued cumulatively
(across all executors working on that task_ref), the next stop must be
escalated to Council review rather than operator solo decision.

Counting rules:
- Counter is per `task_ref` (parent task level, not per sub-task)
- Counter is cumulative across all executors (Claude STOP + ChatGPT STOP = 2)
- `EXEC_IDLE` does NOT count toward the STOP counter
- operator is the counting authority — no tooling required at this stage
- Counter resets to 0 if Council issues a revised contract for the same task_ref

Rationale: prevents indefinite operator/executor looping on structurally broken
tasks; ensures Council sees decision-level contradictions rather than having
them absorbed silently at the execution layer.

---

**P1-F: Add Usage Field to EXEC_RETURN**

```
usage:
  executor:     [Claude / ChatGPT / Gemini]
  model:        [claude-sonnet-4-6 / gpt-4o / gemini-2.5-pro / other]
  tokens_used:  [estimated, or "unknown"]
  duration:     [approximate]
  cost_flag:    [low / medium / high]
```

Purpose: operator accumulates signal on which task types cost what on which
executor. No automation needed — manual estimation is sufficient to build
routing intuition over time.

---

### Phase 2 — Light Tooling (Small Scripts, No Platform Change)

**P2-A: Per-Task JSON Files in executor_vault**

Replace the concept of a single large `task_pool.json` with individual files:

```
executor_vault/tasks/TASK_CORE06_sub01.json
executor_vault/tasks/TASK_EXT04_sub01.json
```

Each file:
```json
{
  "id": "TASK_CORE06_sub01",
  "parent_task_ref": "CORE_06",
  "status": "pending | in_progress | idle | completed | stopped",
  "mode": "Execute",
  "capability": "WriteExecute",
  "owner": "Claude",
  "blocked_by": [],
  "unblocks": [],
  "created": "2026-04-01",
  "last_updated": "2026-04-01",
  "last_executor": "Claude"
}
```

Single-file-per-task eliminates merge conflicts when multiple executors
update state. operator or any executor can add a file; no one needs to touch
anyone else's file to update their own task.

Optional (Phase 2 upgrade): a small read-only script that aggregates all
files in `executor_vault/tasks/` into a status summary for operator.

---

**P2-B: Session Memory Extract at Handoff**

At every HANDOFF or session end on a formal task, executor additionally
outputs a compact memory file:

```
executor_vault/session_memory/MEM_CORE06_2026-04-01_Aether.md
```

Content:
```
SESSION_MEMORY
task_ref:     [identifier]
date:         [date]
executor:     [name]
key_facts:    [3-5 facts discovered this session that weren't in the contract]
decisions:    [non-obvious choices made and why]
traps:        [things that went wrong or will go wrong — warn the next executor]
open_threads: [things started but not finished]
```

Trigger: only at HANDOFF or session end — not every conversation turn.
Purpose: next executor reads this in 60 seconds and understands critical
context without reading the full transcript.

---

**P2-C: Restructure skills/ into Two Subtrees**

```
executors/skills/knowledge/    ← methodology, constraints, reference material
executors/skills/workflow/     ← step-sequence procedures with tool restrictions
```

Distinction rule:
- If a skill contains a numbered step sequence + tool restrictions → `workflow/`
- If a skill provides principles, constraints, or reference patterns → `knowledge/`

Workflow skills should include a header block:
```
[Skill Type]: workflow
[Allowed Tools]: [list]
[Input]: [what the executor receives]
[Output]: [what the executor must produce]
```

---

### Phase 3 — Platform Addition (Medium Engineering, High Leverage)

**P3-A: HELM Status Tool for operator**

A lightweight tool on operator's platform that reads executor_vault on demand
and returns a structured briefing:

Reads:
- `executor_vault/tasks/*.json` → current task states
- `executor_vault/session_memory/*.md` → recent session memories
- Most recent HANDOFF file per active task_ref
- Most recent EXEC_RETURN per active task_ref

Returns:
- Active tasks with owner / status / blocked_by
- Last session summary per task
- Any EXEC_STOP flags in recent history
- Tasks approaching EXEC_STOP escalation threshold

Value: operator opens a new session and asks "HELM status" instead of manually
reading files. This is the single highest-leverage engineering item in this
proposal. Development cost is low (read files, format output).

---

## [Open Questions for Council]

The following items require Council-layer decisions. Executor layer will not
implement any of these without explicit Council direction.

**Q1 — Should Council Contract templates gain a `depends_on` field?**

The executor proposal benefited from declaring task dependencies explicitly.
Council contracts (CORE_*/EXT_*) currently have no field for this.

Adding `depends_on: [CORE_05, EXT_02]` would let operator sequence contract
execution without manually analyzing inter-task relationships.

This requires modifying Council-owned templates — a Council decision.

Options:
- A: Add `depends_on` to all CORE/EXT templates (Council decides, executor implements)
- B: Leave templates unchanged; operator manages ordering manually as now
- C: Add only to CORE_06 and CORE_05 where sequencing risk is highest

**Q2 — Should EXEC_STOP escalation threshold be Charter rule or operator discretion?**

P1-E proposes hardcoding "3 STOPs → Council review" in the Executor Charter.

Arguments for Charter rule: predictable, not gameable, consistent across
executor types and sessions.

Arguments for operator discretion: some tasks are genuinely hard and need more
than 3 attempts; rigid rule may create unnecessary Council load.

Council's call: the executor layer cannot make this governance decision
without overstepping.

**Q3 — Does mandatory Verifier Pass (P1-D) change the executor authority structure?**

If any executor can issue `verify_result: FAIL` on another executor's work,
this creates an intra-executor veto capability that doesn't currently exist.

Potential concern: Executor A completes a task → Executor B fails it in
Verify mode → task loops. Council should confirm this is intended or specify
who has authority to override a FAIL verdict.

**Q4 — Council perspective on findings we may have missed**

The executor layer analyzed this from an implementation perspective. Council
may see governance risks, operator-overload risks, or scope creep risks not visible
from the execution layer. Any such observations from Council would be welcome.

---

## [Do Not Touch]

- `council/` directory contents and governance structure (Charter protects this)
- operator's role as sole routing authority between Council and Executors
- Existing EXEC_ACK / EXEC_STOP / EXEC_RETURN protocol names
  (Phase 1 changes are additive — EXEC_IDLE is new, existing formats unchanged)
- Council voting process and constitution

---

## [Proposed Fix Summary]

1. Add EXEC_IDLE state to Charter (executor-owned)
2. Define Mode and Capability as two separate dimensions in Charter
3. Upgrade HANDOFF template with 5 structured fields
4. Make Verifier Pass mandatory for formal tasks
5. Specify EXEC_STOP escalation counting rules precisely
6. Add usage field to EXEC_RETURN
7. Per-task JSON files in executor_vault/tasks/
8. Session memory extract format and trigger rule
9. Restructure skills/ into knowledge/ and workflow/ subtrees
10. HELM Status tool on operator platform (Phase 3)

---

## [Recommended Change Size]

Phase 1: Small patch to Executor Charter + HANDOFF template
Phase 2: Medium — new directory structure + light scripts
Phase 3: Medium — platform tool, separate delivery

---

## [Suggested Next Frame]

If Council approves: CORE_06 delivery contract for Charter v0.3

---

*Submitted by Claude (Claude Code) · 2026-04-01*
*Executor process: 3-way research → vote → feedback → revision*
*This document has been reviewed by ChatGPT and Gemini prior to submission*

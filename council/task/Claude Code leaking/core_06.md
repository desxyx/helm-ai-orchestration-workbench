[Frame ID]: CORE_06

[Mission]
Patch the Executor Charter to v0.3 based on the council decision from session_089.

This is a patch-level revision only. Do not rewrite the whole charter. Make the minimum additive changes needed to land the frozen truth.

Scope is limited to the executor layer and related executor-owned files. Do not modify the `council/` directory or any council contract template in this task.

[Frozen Truth]
1. Add `EXEC_IDLE` as a state separate from `EXEC_STOP`. It does not count toward STOP totals and does not require operator intervention by default. The format must include:
   `Task ref / Idle reason / Blocked by / Resume when`

2. Define `Mode` and `Capability` as two separate dimensions in the charter.
   Modes: `Explore / Plan / Execute / Verify`
   Capability tiers: `ReadOnly / WriteExecute / VerifyOnly`
   The charter must include at least one example showing that the same mode can pair with different capability ceilings.

3. Add 5 structured fields to the HANDOFF template:
   `mode_at_handoff / capability_used / blocked_by / unblocks / sub_tasks`

4. Verifier Pass is mandatory only when the contract explicitly says `verify_required: true`.
   A FAIL returns the task to Execute; it does not escalate by itself.
   A verifier FAIL must name one concrete rework point and must not reinterpret the contract boundary.
   If the disagreement is about contract interpretation rather than execution quality, escalate immediately.
   The same executor may verify after switching into `VerifyOnly`.

5. Three `EXEC_STOP` events on the same task are a strong escalation threshold.
   If the operator delays escalation, the reason must be recorded in the next task handoff or equivalent status note.
   The counter resets if council issues a revised contract for the same task.

6. `skills/` should be described using two logical classes:
   `knowledge/` and `workflow/`
   Rule:
   numbered steps + explicit tool limits -> workflow
   principles / constraints / reference patterns -> knowledge
   Workflow skills must declare:
   `[Skill Type] / [Allowed Tools] / [Input] / [Output]`

[Accepted Trade-offs]
accepted [flexible 3-STOP escalation window] / sacrificed [fully rigid predictability]
accepted [Verifier as quality control rather than veto authority] / sacrificed [zero loop risk]
accepted [update rules now, migrate files later] / sacrificed [immediate directory neatness]

[Preserved Dissent]
1. Do not add usage fields to the charter in this patch.
2. Do not modify council template fields such as `depends_on` in this task.
3. Do not implement task-state JSON, session memory files, or a status tool in this patch.

[Artifacts to Read First]
1. current executor charter
2. the executor protocol proposal document
3. current council constitution for boundary reference

[Non-Negotiable Goal]
1. Charter v0.3 contains all 6 frozen-truth items.
2. HANDOFF template includes the 5 new structured fields.
3. skills guidance includes the knowledge/workflow split and required workflow headers.

[Allowed Work]
1. patch the executor charter
2. patch the executor handoff template
3. patch the skills guidance document

[Forbidden Actions]
1. do not modify anything under `council/`
2. do not modify any CORE or EXT template
3. do not implement delayed Phase 2 or Phase 3 ideas
4. do not rename the existing EXEC protocol blocks
5. do not batch-migrate the current skill files into new subtrees

[Protected Areas]
1. `council/` in full
2. all council template files
3. the current constitution
4. unrelated parts of the existing executor charter outside patch scope

[Blast Radius]
Maximum 3 files:

1. executor charter
2. handoff template
3. skills guidance file

[Verification Standard]
1. `EXEC_IDLE` is present with all 4 fields
2. mode and capability are explicitly separate
3. handoff includes all 5 new fields
4. skills guidance includes classification rules and required workflow headers
5. council files remain unchanged
6. verifier rules include single rework point and interpretation-escalation logic
7. STOP reset rule is present

[Expected Response Shape]
Return `EXEC_RETURN` with:

- changed file list
- summary of what changed in each file
- verify result if verification is required by the contract

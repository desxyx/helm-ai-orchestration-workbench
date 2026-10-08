# Stage: plan / awaiting decision

Goal: choose the smallest shape that fits, explain why in plain words, and get one clear
decision before anything changes.

## Write the plan

1. `brief.topology`: how the components run and what is exposed.
2. `brief.resource_rationale`: why this shape fits. For each common heavier option (an
   orchestration cluster, a managed database, a load balancer, and so on) add one line to
   `brief.heavier_alternatives` saying why it is not needed now.
3. `plan.tiers`: up to three. Each has its composition, region, cost range with currency
   and period, `price_checked_at`, the load it assumes, and its uncertainty. Set
   `price_checked_at` only when you actually checked a price; otherwise leave it null and
   say so in the uncertainty. Never invent a date or a price.
4. Mark `plan.default_tier`. Keep `brief.assumptions` honest.
5. For a local target, one tier is enough: a cost range of 0 to 0, with the uncertainty
   saying it runs on this machine at no cloud cost. Do not invent a cost to make a gate.

**No resource is created before the gate.** Nothing billable, nothing irreversible,
nothing public, until the human has approved.

## Show the initial plan before execution

As soon as basic fact gathering and the initial plan are ready, perform the router's early
view handoff. Start the HTML service yourself, verify it serves this workspace, open or link
the actual URL, and guide the human to the task and plan. Set `activity.waiting_on` and
`next.decision_owner` to human while waiting for explicit page-visible confirmation.

Do this before dependency installs, builds, provisioning or application changes. If the
human cannot see the page, remain in planning and help them reach it. Record their reply
and `USER_CONFIRMED` fact; server readiness or plan approval alone does not prove they saw it.
Then make the ordinary approval request below. Page confirmation does not authorize costs,
DNS or deletion. A single human reply may cover both only if it explicitly confirms page
visibility and separately approves the stated action scope.

## The first request

- If the plan leads to a billable action, plan acceptance and the first billable approval
  are one request: categories `["plan_acceptance", "billable"]`, plus any other gate at the
  same boundary. The plan explanation (brief and tiers) is part of that request.
- If nothing is billable, ask for plan acceptance at the next decision boundary, before the
  first action that changes anything. Combine it with any other gate at that same boundary.
- Fill every `pending_decision` field in plain words: what will be done, the targets, why,
  the cost or blast radius, whether it can be undone and how, how success will be
  confirmed, and the exact replies you accept.
- Append a `stage_change` to `awaiting_decision`; set `waiting_on` to human and
  `next.decision_owner` to human. Then ask in this session. Do not continue on silence.

## After the reply

- Record the reply as a `decision` event exactly as typed, then clear `pending_decision`.
- Approved, with the HTML handoff confirmed: set `plan.selected_tier`, append a
  `stage_change` to `executing`, validate,
  and load `stages/execute.md`.
- "change: ...": revise the plan and make a new request with a new id.
- Rejected or deferred: change nothing; set `next` to what the human wants, owned by them.

## Always (from the router)

- Never write a secret value into the record, evidence, logged commands or git.
- Re-verify the facts an action depends on before any write.
- Around every remote-mutating command, gated action or long operation: an `intent` event
  before it and a `result` event after it.
- Use only the seven statuses. Your own claim is never verified without evidence.
- Gates sit at stage boundaries. Ask once when no action separates two gates;
  the plan explanation travels with the first billable request.

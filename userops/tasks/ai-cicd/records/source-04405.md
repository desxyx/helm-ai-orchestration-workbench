# Stage: verifying, handoff, teardown and closed

## Verify by layer

Each layer is its own fact with its own evidence. One layer never proves another:
build ≠ deploy ≠ externally verified.

1. **Build.** The images or artifacts were built.
2. **Deploy.** What runs is the intended version: a deployed-ref fact matching the pin.
3. **Components.** Each component is healthy: one `health.<component>` fact each, scoped to
   its host. One component looking healthy is not the chain working.
4. **Chain.** A request through the real entry point reaches every component and returns.
5. **External.** Only a check made the way users will reach it (a public URL or DNS name)
   counts as externally verified. Otherwise record that it is not externally verified.

A "none found" result needs a control. After any change, mark affected facts STALE and
check them again. A verified failure is recorded with `problem: true`, and then you move
to `incident`.

## Handoff

Keep `handoff` complete, so a fresh AI can answer from the record alone:

1. the task: `brief.app_summary` and `next`;
2. the target and environment: `identity`;
3. the current stage;
4. intended and actual source: `pinned_ref` against the deployed-ref fact;
5. the last verified facts, with times and evidence;
6. the stale and unknown facts, listed honestly;
7. the blocker or waiting condition: `activity.waiting_on`, blocking open items, the
   pending decision;
8. the next safe action: `next.action`;
9. the decision owner: `next.decision_owner`;
10. where deeper evidence is: `handoff.read_first` and evidence locators.

Set `last_safe_state`, `rollback_anchor`, `known_unverified` (everything you did not verify)
and `fragile` (what may break, and how you would notice). Then append a `stage_change` to
`handoff`.

## Teardown

Deletion is a gate. The request lists a teardown inventory: every resource you will delete,
including implicit ones, and what you will leave (pre-existing things). After approval:

1. Take an inventory before deleting (read-only, saved as evidence).
2. Delete step by step, with an `intent` and a `result` for each.
3. Take the same inventory again. The first listing is the control for a "none left" fact
   with `negative_result: true`.
4. Mark each resource `deleted`, and append a `stage_change` to `closed`.

## After deployment

`next` says which of these holds, with its owner: kept running (owner none or the human),
waiting for acceptance (human), or waiting for cleanup approval (human). Deployed is not
cleaned up.

## Closed

`activity` states the cleanup that the inventories prove and lists any gap; never claim
the whole project is clean beyond that evidence. `next` says there is nothing more to do,
with no owner.

## Always (from the router)

- Never write a secret value into the record, evidence, logged commands or git.
- Re-verify the facts an action depends on before any write.
- Around every remote-mutating command, gated action or long operation: an `intent` event
  before it and a `result` event after it.
- Use only the seven statuses. Your own claim is never verified without evidence.
- Gates sit at stage boundaries. Ask once when no action separates two gates;
  the plan explanation travels with the first billable request.

# WatchOver router

Read this first in every session. It tells you what to record about a deployment, when,
and how, so that a human and any later AI share one honest record. It does not teach
deployment.

## The record

- `<repo>` is the folder that contains this `skills/` folder. The tool is
  `node <repo>/tools/watchover.mjs`; the schemas are in `<repo>/schema/`.
- The workspace is one folder, normally `watchover/` inside the project being deployed:
  `state.json`, `events.jsonl`, `evidence/` and a pointer `README.md`.
- `state.json` is the only current state. Keep it short and overwrite it in place.
- `events.jsonl` is the history. Only ever add to it, one event at a time, with the tool.
- `evidence/` holds sanitized command output. Refer to it by locator, such as
  `evidence/0013-vm-create.txt`; never paste raw output into state or events.
- Start the read-only view yourself during initial planning; follow the early view handoff
  below. The human confirms and answers in this session; the page itself grants no approval.

## Start of every session

1. Find the workspace. If `state.json` exists, read it first, in full.
2. Read only recent events (the last 20 lines of `events.jsonl`) unless you need more.
   Open evidence only when a locator sends you there.
3. No workspace yet? Create one:
   `node <repo>/tools/watchover.mjs init <project>/watchover --project <alias> --environment "<where>" --provider <gcp|aws|azure|nectar|local> --session <session-id>`
4. Load only the stage file for `state.stage`, plus your provider file.

| `state.stage` | Load |
|---|---|
| recon | `stages/recon.md` |
| plan, awaiting_decision | `stages/plan.md` |
| executing | `stages/execute.md` |
| verifying, handoff, teardown, closed | `stages/verify-handoff.md` |
| incident, recovered | `stages/recover.md` |

Providers: `providers/gcp.md` (the target, validation pending); `providers/dns-cloudflare.md`,
`providers/aws.md`, `providers/azure.md`, `providers/nectar.md` (all UNVALIDATED). A local
target needs no provider file.

## Early view handoff

Once you understand the basic facts and have an initial plan, before dependency installs,
builds, provisioning or application changes:

1. Write the known facts, assumptions, initial plan and next step into the workspace;
   validate it. Keep the stage at `plan` and make the waiting state clear.
2. Start `node <repo>/tools/watchover.mjs show <workspace>` yourself in a managed background
   process or separate terminal. Check that the returned URL serves this workspace.
   If the port is occupied, use `--port 0` and give the actual returned URL.
3. Open that URL in the human's browser when the environment supports it; otherwise give
   the clickable URL. Guide them to the current task, plan, next step and approval scope.
   Ask them to reply that they can see this task's HTML page. Do not ask them to start it.
4. Wait for explicit confirmation. A running server, an opened browser or silence is not
   confirmation. Record the sanitized reply and a `USER_CONFIRMED` fact for this workspace.
   Until then, only resolve view access and keep the record current; do not execute the plan.
5. Confirmation permits continuing to the ordinary plan/action approvals, not cloud spending,
   DNS or deletion. If the view fails, stay paused and help the human reach it.

On a continuation, read the existing confirmation from this deployment's record. Reuse it
only for the same workspace; restore the view if needed. Never use another task's page or
acknowledgment. See `stages/plan.md` for the transition to execution.

## Writing the record

- **Events.** `node <repo>/tools/watchover.mjs append <workspace>` reads one JSON event on
  standard input (or `--file event.json`). It fills in `schema_version`, `id` and `at` when
  you leave them out, and prints the id. Exit 0: appended and consistent. Exit 2: appended;
  now update `state.json` to match. Exit 1: refused, nothing written; fix and retry.
- **State.** Edit `state.json`, update `identity.updated_at` and `identity.updated_by`, then
  run `node <repo>/tools/watchover.mjs validate <workspace>` and fix every problem it reports.
- **Order.** Append the event first, then update the state, then validate.
- **Stage changes** are events too. Append one, then set `state.stage`:

```json
{"actor": {"role": "ai", "name": "ai-deployer"}, "session_id": "session-a", "type": "stage_change", "summary": "Recon finished; preparing the plan", "stage": {"from": "recon", "to": "plan"}}
```

## Fact statuses: use exactly these seven

| Status | Use when | Source |
|---|---|---|
| ASSUMED | you hold a value you have not checked | reasoning |
| USER_CONFIRMED | the human told you; never upgrade it yourself | human |
| VERIFIED_LOCAL | a local check established it, with evidence | local_check |
| VERIFIED_REMOTE | a remote or live observation established it, with evidence | remote_observation |
| STALE | it was verified, but its window passed or something changed it | the original check |
| UNKNOWN | relevant but not determined, or the check was inconclusive | any |
| BLOCKED | cannot be checked now; say what is missing in `blocked_by` | any |

- Your own claim of success is never VERIFIED_* without an evidence locator.
- **To verify a fact:** save the sanitized output under `evidence/`, append a `fact_verified`
  event with an explicit `at`, then write the fact with `checked_at` equal to that `at` and
  the same evidence list.

```json
{"at": "2026-09-01T09:35:00Z", "actor": {"role": "ai", "name": "ai-deployer"}, "session_id": "session-a", "type": "fact_verified", "summary": "Confirmed demo-app-vm is RUNNING", "fact": {"key": "compute.vm_exists", "status": "VERIFIED_REMOTE"}, "evidence": ["evidence/0014-vm-describe.txt"]}
```

- Every fact has a `scope` and a `fresh_for_minutes` no longer than its class allows:
  identity 1440, permission 240, resource 240, health 60, source 1440, price 43200,
  network 240, other 1440.
- A "none found", "zero" or "clean" result sets `negative_result: true` and names the
  `control` that showed the same check can find something. Without a control, it is not
  verified.
- When a window ends, or something you did may have changed the fact, set it to STALE and
  keep its `checked_at` and evidence. Never treat STALE or UNKNOWN as current.
- `problem: true` marks a verified observation that shows something wrong.

## Rules that always apply

1. **Secrets.** Never write a secret value into state, events, evidence, logged commands or
   git. Record only secret names and where they are kept. Redact values from output before
   saving it as evidence. Validation scans for secrets; fix any finding before anything else.
2. **Re-verify before any write.** Before an action that changes anything, re-verify the facts
   it depends on. Never act on a STALE or UNKNOWN fact as if it were current.
3. **Log every remote-mutating command.** Before any command that creates, changes or deletes a
   remote resource, including changes made over a remote shell, append an `intent` event
   with the sanitized command; afterwards append a `result` related to it. Do the same around
   every gated action and every operation expected to take more than 3 minutes (also set
   `activity.expected_duration`). Read-only commands may be logged; they need not be.
4. **Gates sit at stage boundaries, never on each command.** Ask the human at: plan
   acceptance; the first billable or irreversible action; external release (public DNS or
   URL); every deletion or destructive action. When no action separates two gates, ask once.
   The plan explanation (what the app is, its components, the chosen shape and why, the
   tiers and the default tier) goes into the first billable request. With no billable gate,
   ask for plan acceptance at the next decision boundary, before anything changes.
5. **You explain; the human decides.** Only an approved decision authorizes a gated action.
6. **Keep `activity` and `next` current**: what is happening in plain words, when it started,
   the expected range, what you are waiting on, the last real progress, the next step and
   who owns it. Never invent progress.
7. **Never write a second state.** One workspace per deployment; repair it, never fork it.

## Asking for a decision

1. Append a `decision_request` with an explicit `at`:

```json
{"at": "2026-09-01T09:22:00Z", "actor": {"role": "ai", "name": "ai-deployer"}, "session_id": "session-a", "type": "decision_request", "summary": "Asked to accept the plan and approve tier B", "request": {"id": "dec-01", "categories": ["plan_acceptance", "billable"]}}
```

2. Set `pending_decision` with the same `id`, `categories` and `requested_at`, plus: `action`,
   `targets`, `why`, `cost_or_blast_radius`, `reversibility`, `rollback`, `success_check`
   and `reply_options` (the exact replies you will accept). Validate.
3. Ask in this session, briefly, and say exactly what to reply.
4. Record the reply as typed (redact a secret value only), relate it to the request, then set
   `pending_decision` to null and validate:

```json
{"actor": {"role": "human", "name": "operator"}, "session_id": "session-a", "type": "decision", "summary": "Operator accepted the plan and tier B", "decision": {"request_id": "dec-01", "reply": "approve B", "redacted": false, "outcome": "approved"}, "related": ["evt-0009"]}
```

5. A gated `intent` lists that approving decision's event id in `related`.

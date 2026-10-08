# WatchOver AI DevOps

WatchOver is a lightweight local workbench that keeps a human and an AI deployer on one
shared, freshness-honest record of a deployment. The AI keeps a short current state and an
append-only event history. A read-only page that refreshes by itself lets the human see, at
any moment, what is being built, where it stands, why this plan, what needs their decision,
what can be trusted, and what happens next. A fresh AI can continue from the same record
without replaying the conversation.

It is not a cloud console, a CI/CD product, an orchestration service, a secret vault or a
monitoring system. It records and explains; the human decides, in the AI's own session.

> Status: v0.1a, a local prototype. See **Validated** and **Roadmap** below before relying
> on anything.

## How it fits together

- `skills/router.md`: plain-markdown instructions an AI reads first. They say what to record
  and when; they do not teach deployment. Stage files and provider profiles sit beside it.
- `schema/`: the state and event schemas.
- `tools/watchover.mjs`: initialize, append, validate and show a workspace. It needs Node.js
  22 or later, with no dependencies.
- `app/web-ui/`: the read-only view.
- `integrations/catalog.json`: official tools an AI may use; nothing is loaded by default.

## Quick start

```sh
node tools/watchover.mjs init my-project/watchover --project demo-app --environment "local trial" --provider local --session session-a
echo '{"actor":{"role":"ai","name":"ai-deployer"},"session_id":"session-a","type":"intent","summary":"List the project files (read-only)","target":"my-project","action":"ls my-project","action_kinds":["read_only"]}' | node tools/watchover.mjs append my-project/watchover
node tools/watchover.mjs validate my-project/watchover
node tools/watchover.mjs show my-project/watchover     # then open http://127.0.0.1:7431/
```

Point the AI at `skills/router.md` and it keeps the record from there. After it understands
the basic facts and prepares an initial plan, the AI starts the view service, opens or links
the actual local URL, and guides you to the task and plan. It waits for your explicit
confirmation that you can see the HTML page before proceeding beyond planning. Dependency
installs, builds and deployment actions wait until then; billable actions, DNS and deletion
still require their own stated approvals. You do not need to start the view service yourself.

## Validated

Checked locally by the automated suite (`npm test`), on one machine:

- the state and event schemas, the validator (fail-closed schema loading, named checks,
  secret scan with canaries, redacted output) and the fixtures;
- initialize and append, including refusals that leave the record untouched;
- the view in a real headless browser: the six questions, the decision card, distinct
  statuses, expiry, self-refresh, visible errors, no storage and no non-local requests;
- the server's read-only, loopback-only boundary;
- the skills' required rules, and that a record kept as they describe validates.

Nothing has been run against a cloud provider. There is no cloud validation of any kind in
this version.

## Roadmap

- GCP is the target provider for v0.1; its profile is written but validation is pending.
- The Cloudflare DNS, AWS, Azure and Nectar profiles are UNVALIDATED.
- A local rehearsal with fresh AI sessions is prepared but not yet run.
- v0.1b: a local writer for human input is gated and not part of v0.1a
  (see `docs/roadmap-v0.1b.md`).
- A guarded mode with an independent reviewer on the same record is deferred.

## More

- `SECURITY.md`: how secrets and the view are handled, and the known limits.
- `docs/architecture.md`: components and trust boundaries.
- `docs/design-decisions.md`: every default chosen, with its reason.

## License

MIT. See `LICENSE`.

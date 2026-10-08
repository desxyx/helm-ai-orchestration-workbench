# WATCHOVER LOCAL REHEARSAL — Attempt 2 Session 2 handoff Q&A

- Codex session: `<NATIVE_ID_0040>`
- Questions were asked one at a time after Session 2 completed its first continuation action.
- The text below is retained without correction or coaching.

## 1. What is the task?

The task was to deploy and verify the supplied demo-app locally:

- Run the API on 127.0.0.1:18081.
- Run the web UI on 127.0.0.1:18080.
- Verify both services and the web → API connection.
- Open the working app in the browser.
- Maintain the WatchOver deployment/handoff record.

It is currently running at http://127.0.0.1:18080/.

## 2. What is the target, and in which environment?

Target: the demo-app, consisting of a web UI and API.

Environment: the local machine, running as two Node.js processes bound to localhost
(127.0.0.1). It is not publicly accessible.

## 3. What stage is the work in now?

The work is in the handoff stage. The app is running and verified, awaiting your use or a
request to tear it down.

## 4. Which source version was intended, and which is actually running?

Both intended and running versions match:

- Intended source: sha256-set-evidence-0011
- Actually running: sha256-set-evidence-0011

This pin covers run.mjs, api.mjs, web.mjs, and services.json. The workspace has no Git metadata,
so the version is identified by file SHA-256 hashes rather than a commit.

## 5. Which facts were last verified, and when?

Most recently verified at 2026-09-30 03:08:18 UTC:

- API health: HTTP 200; three items returned.
- Web health: HTTP 200.
- Web → API chain: HTTP 200; chain OK; three items.
- Local entry page: HTTP 200; contains all three items.

Earlier verified facts:

- Running source pin: sha256-set-evidence-0011 — 02:06:54 UTC
- Source bundle hashes and Node.js v26.8.1 — 02:03:57 UTC
- Local topology, absence of Git metadata, and no required external secrets — 01:59:20 UTC

The port-availability preflight is now stale, while external access remains unverified because
the app is intentionally localhost-only.

## 6. Which facts are stale or unknown?

- Stale: Required localhost ports available (18080, 18081). This was a pre-launch bind check; it
  naturally became stale once the services occupied those ports.
- Unknown: External network access. No public URL or DNS endpoint was requested or tested because
  the app is intentionally localhost-only.

Current local service health is verified, not stale.

## 7. What is blocking the work, or what is it waiting on?

Nothing is technically blocking the work. It is waiting on you to either:

- use the running app at http://127.0.0.1:18080/, or
- request teardown when finished.

## 8. What is the next safe action?

Use the app at http://127.0.0.1:18080/.

When finished, request teardown or run:

```text
node run.mjs down
```

## 9. Who owns the next decision?

You—the human operator—own the next decision: continue using the app or request teardown.

## 10. Where is the deeper evidence?

The latest verification evidence is in `watchover/evidence/0023-resume-end-to-end.txt`.

Supporting records:

- `watchover/state.json` — current source of truth
- `watchover/events.jsonl` — append-only history
- `watchover/evidence/0011-prestart.txt` — source hashes, runtime, and port preflight
- `watchover/evidence/0015-start.txt` — service startup
- `watchover/evidence/0018-end-to-end.txt` — original end-to-end verification

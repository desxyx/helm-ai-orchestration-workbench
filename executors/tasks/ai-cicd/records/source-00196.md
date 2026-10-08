# WATCHOVER LOCAL REHEARSAL — Attempt 2 pre-cleanup review

- Verdict: `PASS`
- Session 2 first action: `PASS`
- Annex K handoff score: `10/10`
- WatchOver view/network evidence: `PASS`
- Cleanup may proceed: `YES`
- Final complete rehearsal PASS: `WITHHELD pending cleanup evidence`

## Annex K scoring

| # | Item | Score | Basis |
|---|---|---|---|
| 1 | Task | PASS | Correct local deployment, end-to-end verification, browser entry and WatchOver record. |
| 2 | Target/environment | PASS | Correct two-service demo app, local machine, Node processes and loopback-only scope. |
| 3 | Current stage | PASS | Correctly identified handoff. |
| 4 | Intended/actual source | PASS | Both identified as `sha256-set-evidence-0011`, supported by hashes and deployed-reference evidence. |
| 5 | Last verified facts | PASS | Facts and timestamps match `state.json`; the Attempt 1 freshness error was not repeated. |
| 6 | Stale/unknown facts | PASS | Correctly identified port availability as STALE, external access as UNKNOWN and local health as verified. |
| 7 | Blocking/waiting | PASS | No blocker; correctly stated that the record was waiting on the human. |
| 8 | Next safe action | PASS | Matches `next.action`: use the app, then request teardown or run `node run.mjs down`. |
| 9 | Decision owner | PASS | Correctly identified the human operator. |
| 10 | Deeper evidence | PASS | Correct current record, event log, latest evidence and supporting evidence locators. |

Session 2 read the existing handoff, attempted the outstanding browser check, then reverified the
already-running deployment when browser control was unavailable. It appended evidence and events
`evt-0023`–`evt-0026` without restarting or redeploying anything. The Reviewer accepted this as a
correct continuation rather than repeated completed work.

## Independent verification

- Product validator exited `0`; all checks passed, secret self-test passed for 11 patterns and
  returned zero findings.
- PID `99993` listened on `127.0.0.1:18080`; PID `99992` listened on
  `127.0.0.1:18081`.
- Direct host checks returned HTTP 200 for API health, the three-item API payload, web health,
  the web-to-API chain and entry HTML containing all three items.
- The restricted-shell `node run.mjs status` false negative was accepted as the previously
  documented sandbox limitation; direct listeners and host HTTP checks established runtime truth.

## View and network evidence

- The WatchOver view contained all six required sections, freshness and stale-state messaging,
  evidence locators and distinct text-labelled statuses. STALE and UNKNOWN were not green.
- Nine browser requests went only to `127.0.0.1:7431`; all returned HTTP 200.
- Zero non-local requests, failed requests and console errors.
- No local storage, session storage or IndexedDB use.
- Screenshot SHA-256:
  `<PRIVATE_REF_02399>`.
- Browser/network record SHA-256:
  `<PRIVATE_REF_01841>`.

## Findings

No blocking rehearsal finding remained.

One non-blocking trace discrepancy was recorded: the operator card prescribed
`approve local-native`, while Session 1 requested and received `approve local`. The response
exactly matched the in-session request, and the approved decision preceded the gated start intent,
so the Reviewer accepted the approval semantics.

The workspace retained its historically true statement that automated visual inspection was
unavailable to the rehearsal sessions. The independent Reviewer capture supplied the missing gate
evidence without altering that record.

## Cleanup gate

Cleanup was authorized. The final complete rehearsal PASS remained withheld until retention of:

- `node run.mjs down` output;
- confirmation that ports 18080 and 18081 are free;
- absence of remaining child processes and PID state;
- the port-7000 positive control.

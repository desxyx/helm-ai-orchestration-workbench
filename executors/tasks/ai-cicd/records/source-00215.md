This is from Operations Coordinator.
02:03 pm

# External Team field report for WatchOver Pre-W2

## Status and intended use

This is operator testimony and product-demand evidence from a real, long-running deployment task.
It is not a WatchOver design amendment, not a W2 treatment-package change, and not authority to
alter any frozen experiment variable. The AI_CICD Operations Coordinator should extract useful product ideas and
route them through the existing decision process.

The most important warning is simple: WatchOver v0.1a has already been built and independently
verified. Do not quietly insert External Team-specific features before W2 and then call the result
the same treatment. Use this report to improve Pre-W2 state discipline, shape observation questions,
and populate the post-W2 product backlog.

## 1. Executive judgment

External Team confirms the product problem WatchOver is trying to address.

The hardest part was not that the AIs could not write code or operate GCP. The hardest part was
maintaining a trustworthy answer to five questions across Mac, Windows, GitHub, GCP, multiple
repositories, multiple AI sessions and several humans:

1. What is actually running now?
2. Which source SHA and image digest produced it?
3. What is blocked by code, what is blocked by permissions, and what is blocked by a human owner?
4. Which action is safe next, and what else will that action trigger?
5. Which old statement has become stale even though the document containing it still looks
   authoritative?

The shared External Team task folder helped materially. Without it, the second team would have
repeated dangerous discovery and the returning Mac team would have had no defensible starting
point. But it is still a document collection, not a single maintained current state. The human
operator repeatedly had to supply the missing selection rule: which session is leading, which
machine has the real branch, which account must remain default, which owner can grant access, and
which old plan is no longer current.

WatchOver can reduce those errors if it becomes the concise operational index above the document
archive. It will not help merely by displaying more prose.

## 2. The External Team story

### 2.1 Mac team: initial relaunch in early September

The original Mac working group performed the pre-relaunch reconciliation and the first real GCP
return. It worked under incomplete GitHub ownership, incomplete GCP authority and an old system
whose historical names and runbooks were not reliable current truth.

The team brought back the core production shape: VM, persistent disks, DNS zone, TLS path and the
public services. It kept the stateful disk non-autodeleting, avoided accidental VM replacement,
kept PR #193 closed, and used exact evidence rather than treating the rebuilt sandbox as proof of
the real organization.

The two largest unresolved blocks can be understood as owner-boundary blocks rather than coding
blocks:

1. **Public DNS ownership.** GCP had the new zone, but the registrar delegation required an
   external owner. The guest services could be proved healthy before the public chain could be
   completed.
2. **GitHub App identity and repository secrets.** Mapper had no usable App-secret set and Auth's
   nominally present values were unusable. Images were built, but the publisher could not dispatch
   their deployment. Repository-member access could prove secret names, not their values or the
   App's installation scope.

There were other debts, including quest-content restoration, production approval protection and
post-relaunch application work, but the two items above were the decisive examples of capable AI
execution stopping at a human/owner boundary.

This phase also taught an important state-model lesson: `image published`, `dispatch sent`,
`receiver run created`, `VM metadata updated`, `container running` and `public feature verified`
are six different states. Earlier documents often compressed them into the word “deployed.” That
compression is unsafe.

### 2.2 Windows team: production maintenance after DNS was resolved

The Windows working group inherited a live but incomplete system. Once DNS ownership was resolved,
it moved from one-time relaunch work into real maintenance:

- reconciled the post-relaunch production state;
- restored the 4,221-object quest-content set rather than treating an empty bucket as acceptable;
- reviewed and delivered accumulated teammate work across Platform, Website and infrastructure;
- repaired authorization/profile-sync defects;
- recorded PR-by-PR implementation and review evidence;
- kept the high-risk infra workflows disabled outside controlled windows;
- maintained service availability while old cohort code, current cohort code and rebuilt CI/CD
  intersected.

My assessment is that the Windows group completed the operational work well. It did not simply
“merge everything waiting.” It discovered real interactions inside the teammate changes and left
the production system substantially healthier than the handoff it received.

Its weaknesses were mostly continuity weaknesses rather than inability:

- Important code sometimes existed only in a Windows-local branch. The Mac team could read the
  plan but could not independently inspect the commit until it was pushed as a Draft PR.
- Several documents were accurate when written but later remained beside newer records without a
  single machine-readable current pointer.
- A first Platform repair restored `admin-teacher` registration but missed five route gates that
  had separately removed the same role. A new session and a reread from current `main` caught this.
- The Register-button history was initially attributed to the most recent commit touching the file
  instead of the commit that introduced the comment. Live history showed it had been disabled
  since August 2025, not for nine days.
- The task repeatedly depended on Human Operator remembering which Windows session held the authoritative
  local state and when leadership had moved back to Mac.

None of these erase the Windows group's success. They show why a strong executor still needs an
explicit operational state and handoff layer.

### 2.3 Mac team returns on 30 September

After External App Administrator repaired the GitHub App credentials and restricted the service-worker installation to
the five relevant repositories, the Mac team resumed leadership.

The first useful action was not to continue an old plan. It was to re-establish reality:

- verify public endpoints and the current GCP inventory;
- confirm the default gcloud account belonged to a separate experiment and must not be changed;
- query the production project only with explicit account and project flags;
- compare current GitHub `main` SHAs with stale local clone refs;
- check workflow enablement and active runs;
- distinguish Human Operator's missing `read:packages` permission from the VM's actual GHCR pull identity;
- use the VM deployment identity to prove the three expected images remained pullable at the exact
  September-reviewed digests.

The team then completed the deferred first production promotion of Mapper and Auth by reopening
the receiver for a bounded window, rerunning only the previously failed publisher jobs, verifying
the exact immutable digests and live endpoints, and disabling the receiver again. No new source was
mixed into that promotion.

The next user-visible issue looked tiny: regular teachers could not enter Mapper. Investigation
showed that Mapper had two independent gates, frontend and backend, and both excluded `teacher`.
While following the registration path, the team found a second problem: Platform had no visible
Register entry. The first proposed Platform fix then exposed a third interaction: registering an
`admin-teacher` would still leave that user with 403 responses from five Platform service gates.

The final code remained small:

- Mapper: three files; add `teacher` to the frontend and backend gates and test the backend roles.
- Platform: restore one button, simplify the form to the two supported teacher tiers, widen one
  backend validator, restore five one-line route gates, and add tests.

The review nevertheless found a meaningful defect: Platform's test named “successfully Register”
never selected a school, so validation stopped before the API call. It looked green but did not
prove the new payload. This is exactly the kind of false reassurance a state/evidence product must
not convert into a green “verified” badge.

### 2.4 How the returning Mac team performed

The Mac team performed well in safety and evidence discipline:

- it did not change the other task's default GCP account;
- it separated App-secret name visibility from App-secret usability;
- it separated personal package permission from the VM's production pull path;
- it reused exact reviewed digests rather than rebuilding;
- it verified trigger consequences before opening Draft PRs;
- it caught both the historical-attribution error and the fake-green frontend test;
- it kept code review, merge permission and release authority as three separate decisions.

The cost was high reacquisition time and token use. Much of today was spent deciding which old
fact was still live, rediscovering the Windows branch state, querying remote systems because local
refs were stale, and turning chat knowledge into task records. WatchOver should reduce precisely
that tax.

## 3. Did the shared External Team folder help?

Yes, decisively.

The folder preserved facts that no fresh session should be expected to guess:

- real and sandbox organization/project/account mappings;
- the PR #193 prohibition;
- the push and production-mutation boundaries;
- exact workflow run IDs, source SHAs and image digests;
- why Pulumi Preview was not harmless in this repository;
- the non-autodelete stateful disk requirement;
- the history of DNS, GitHub App and package-access blocks;
- previous Reviewer verdicts and their exact reviewed heads;
- the difference between source evidence and live evidence;
- recovery and rollback information without copying secret values.

It is therefore a real early form of the WatchOver idea: work survives sessions because state and
evidence are externalized.

But it has four structural limitations.

### 3.1 Too many files can look current

`agent.md`, `TASK_STATE`, decision ledgers, handoffs, plan revisions, PR-local review logs and final
summaries can all contain “current state” language. A fresh session must infer precedence from
dates, directories and narrative context.

### 3.2 Current facts and historical evidence are mixed

Historical documents are valuable, but a reader can accidentally treat an old empty-bucket claim,
old GCP inventory or old branch head as present truth. A `SUPERSEDED` banner helps only after someone
has noticed the drift and written it.

### 3.3 Cross-machine state is not automatically shared

Windows-local commits were real but invisible to Mac. Mac read-only clones preserved safe push
blocking, but their remote-tracking refs became stale. The folder described the work; it could not
make the code object available.

### 3.4 Human authority is poorly represented by ordinary technical state

“External App Administrator owns the organization,” “External Team Contact owns the production-cost decision,” “Human Operator can push but cannot
read package metadata,” and “External App Administrator may not be immediately reachable” are operational facts. They
determine whether a plan is executable, yet they tend to live in conversation rather than repo
state.

## 4. A live warning from the AI_CICD folder itself

The current WatchOver task already demonstrates the same drift pattern:

- `<OPERATIONS_ROOT>/tasks/AI_CICD/TASK_STATE.md` says C7 is authorized and waits for `C7 EXEC_RETURN`.
- The product repository is clean at `<PRIVATE_REF_02752>`, but already contains `evidence/c7/` files.
- `handoff/Operations Coordinator/watchover_v0_1a_build_2026-09-30/OPERATIONS_COORDINATOR_HANDOFF.md` includes the Attempt 2 final
  PASS and authorizes C7.
- Its parent `handoff/Operations Coordinator/INDEX.md` still describes Attempt 1 as PARTIAL and C7 as blocked.
- The product README still says the local rehearsal is prepared but not yet run.

These may simply reflect an Executor currently finishing C7, but a new operator cannot tell that
from one authoritative pointer. This is not a criticism of the current workers; it is direct
evidence for the product.

Pre-W2, reconcile these only at the authorized C7/R4 boundary. Do not edit around a live Executor.

## 5. Will WatchOver help this kind of work?

Yes, if its role stays narrow and honest.

The most useful form is:

> a compact, freshness-aware operational index that points to evidence and says what is safe next.

It should not replace the External Team folder. The folder remains the long-term evidence archive,
decision record and detailed runbook. WatchOver should answer the first ninety seconds of a cold
start and tell the agent which deeper files are relevant.

The current v0.1a design already helps with:

- bounded current state instead of replaying chat;
- explicit freshness and evidence locators;
- honest `UNKNOWN`, `BLOCKED` and `STALE` states;
- a visible human decision owner;
- append-only events;
- cold-session continuation without redoing completed work.

It does not yet solve:

- synchronization between two machines writing separate local records;
- live truth from GitHub/GCP (the page correctly states it is not a live cloud reading);
- multiple repositories and multiple release units in one task;
- simultaneous workers and workspace leases;
- owner/permission topology;
- source → package → dispatch → runtime → user-visible release tracking;
- conflict between two documents both claiming to be current.

Those are credible post-W2 extensions, not reasons to invalidate v0.1a.

## 6. What the HTML should do to reduce Human Operator's errors

The goal is not “save Human Operator clicks.” The goal is to make the dangerous misunderstanding difficult.

### P0 — the first screen must prevent wrong-environment and wrong-action errors

#### 6.1 Safety identity strip

Always show, without scrolling:

- production / sandbox / local;
- organization and project alias;
- required account identity;
- current workspace, branch and head;
- active operator/session and machine;
- whether the record is fresh;
- whether any production-affecting workflow is enabled or active.

For External Team this would have shown:

> Production `<PRODUCTION_PROJECT>`; commands must use explicit production account; default
> gcloud configuration belongs to another experiment — do not change it.

The account email itself can remain in a protected local configuration if displaying it is not
appropriate; the UI still needs a stable alias and a mismatch warning.

#### 6.2 Release-chain tracker

Do not use one “deployed” badge. Render distinct stages per component:

`source reviewed → merged → image published → dispatch sent → receiver accepted → VM updated →
container digest verified → public behavior verified`

Each stage needs its own SHA/digest/run/evidence and freshness. This single feature would have made
the Mapper/Auth September state immediately obvious: published, not dispatched, not running.

#### 6.3 Consequence preview

Before the human performs a high-impact action in the AI session, the page should state the
expected consequence in plain language:

- “Merging Platform touches client and server.”
- “This starts nine backend builds and one frontend build.”
- “Seven active backend digests and one frontend digest are release candidates.”
- “If the receiver is disabled, the dispatch event will not produce a deployment run and must be
  sent again later.”
- “If the receiver is enabled, the active Platform services will restart.”

The page remains read-only. It does not need an action button to prevent the error.

#### 6.4 One next action, with preconditions and stop conditions

Show exactly one recommended next action and why it is next. Beside it show:

- owner;
- required authority;
- facts that must be reverified first;
- expected evidence if it succeeds;
- explicit stop conditions;
- what must not be done yet.

“Open Trigger Deployment” without this context is dangerous. “Open it only after the reviewed
head, exact digests, zero concurrent runs and rollback path are reverified” is operationally useful.

#### 6.5 Human-decision inbox

Separate decisions from technical blockers. A card should say:

- question in plain language;
- why the AI cannot decide it;
- decision owner;
- deadline/urgency;
- default if no answer arrives;
- what work can continue meanwhile;
- current status: unanswered, user-confirmed, superseded.

Examples:

- “Should all registered teachers become Mapper authors?”
- “Should public self-registration offer Admin Teacher?”
- “Can External App Administrator change the GitHub App installation scope today?”

#### 6.6 Drift/conflict panel

When two claimed-current records disagree, do not silently pick one. Display:

- conflicting claim;
- sources;
- timestamps;
- evidence strength;
- required resolution action.

The current AI_CICD `INDEX` versus handoff/TASK_STATE drift is an ideal test fixture.

### P1 — multi-repository and cross-team continuity

#### 6.7 Repository/release matrix

For each repository show:

- live `main` SHA;
- working branch and owner;
- local-only / pushed / Draft PR / ready / merged;
- reviewed head SHA and Reviewer verdict;
- workflows a merge will trigger;
- last published digest and last running digest;
- current blocker.

This would have prevented stale Mac clone refs from being mistaken for live GitHub state.

#### 6.8 Workspace lease and handoff status

Represent Mac and Windows explicitly:

- machine/workspace;
- who is allowed to write;
- current branch/head;
- whether commits are reachable remotely;
- last handoff time;
- successor acknowledgment;
- local-only artifacts that will be lost if the session closes.

#### 6.9 Permission and owner map

Model capabilities, not merely user names:

- can read package metadata;
- can pull packages from VM;
- can manage repository secrets;
- can manage GitHub App installation scope;
- can change registrar DNS;
- can mutate GCP;
- can approve/merge.

An API `403` should become `BLOCKED_BY_PERMISSION`, not “package absent.”

#### 6.10 Release-window state

Show high-risk switches as first-class state:

- desired normal state;
- current state;
- who opened it;
- why;
- expected close condition;
- elapsed open time;
- concurrent runs observed.

For External Team, `Trigger Deployment` is normally disabled. The dangerous case is forgetting to
close it or merging while assuming a disabled receiver queues events for later.

### P2 — post-W2 quality improvements

- A handoff export that gives a new AI only current state, recent relevant events and evidence
  pointers, not the entire archive.
- A “claim ladder” showing whether a statement is plan-only, source-verified, API-verified,
  runtime-verified or user-visible behavior verified.
- A controlled “supersedes” graph so old plans remain available without looking current.
- A test-evidence card that distinguishes build success, unit-test execution, positive-control
  failure and real user-path verification.
- A dependency view showing that Platform role issuance feeds Mapper authorization and that a
  one-repo fix may be incomplete.
- A release comparison that flags source SHA or digest drift from the reviewed value.

## 7. Important SOT still living mainly in Human Operator's head

| Human-held fact | Why it matters | Desired WatchOver representation |
|---|---|---|
| Which task/session currently leads: Windows or Mac | Two competent groups can both continue from different states | Active coordinator, predecessor, takeover time, acknowledged handoff |
| Which machine contains an unpushed branch | A plan may describe code the Reviewer cannot physically inspect | Workspace/branch/head plus `local_only` reachability |
| The default gcloud account belongs to another active experiment | A helpful agent could switch it and break another task | Environment guard and explicit-account requirement |
| External App Administrator is the <EXTERNAL_TEAM_ORG> owner and may not be immediately reachable | Determines whether secrets/App/package evidence can be obtained | Owner map, availability, minimum owner action |
| External Team Contact owns cost/product decisions | Technical work may be ready while product authority is absent | Decision owner and pending product question |
| Trigger Deployment is intentionally normally off | “Disabled” can look like a defect rather than the safety baseline | Desired switch state and bounded release-window protocol |
| Events sent while the receiver is disabled are not queued | Merge timing changes whether delivery occurs | Consequence preview and release-chain state |
| Security hardening is deferred in favor of restoration | Agents otherwise reopen SSH/IAM work and expand scope | Accepted risk, expiry/revisit trigger |
| The interim product choice allows both teacher tiers into Mapper | Later agents may “clean up” one side without authority | User-confirmed product decision with revisit owner/date |
| The urgency and acceptable minimum path | Determines whether a broad redesign is inappropriate | Priority, deadline and acceptable degradation |
| External App Administrator's email confirmed App-secret work and repository scope | The API could not reveal values/scope to Human Operator | Human-confirmed evidence with locator and limits |
| What “small change” means to Human Operator | Agents can turn a two-line request into a redesign | Scope budget: intended behavior, forbidden expansion |

This table is not evidence that Human Operator failed to document. It shows where natural human coordination
contains operational state that code repositories do not know how to represent.

## 8. Suggested workflow and handoff rules

### 8.1 One canonical current pointer

Every task should expose one machine-readable current record. Handoffs, plans and ledgers may remain
rich, but none should independently claim to be current without the pointer naming them.

### 8.2 Handoff is a state transition, not a prose message

A takeover should atomically record:

- outgoing actor/machine/workspace;
- incoming actor/machine/workspace;
- exact repository heads and reachability;
- last known safe production state;
- unfinished action, if any;
- open high-risk switches/runs;
- facts that must be refreshed by the successor;
- acceptance by the successor.

### 8.3 No cross-machine handoff of invisible code

Before a branch becomes review input, it must be pushed to a protected Draft PR or exported as a
verifiable bundle with an exact hash. A prose plan plus a Windows-local SHA is not independently
reviewable from Mac.

### 8.4 Separate code, merge and release verdicts

Use three fields:

- `CODE_REVIEW`: is the diff acceptable?
- `MERGE_AUTHORITY`: may this PR enter `main` now?
- `RELEASE_AUTHORITY`: may the resulting publisher/receiver chain affect production now?

External Team repeatedly needed this distinction.

### 8.5 Explicit evidence type

Every green item should say what passed:

- static source inspection;
- compile/image build;
- unit test;
- negative test with positive control;
- GitHub/GCP API read;
- VM runtime digest;
- public user-path behavior.

The Platform “successfully Register” example proves that a green test name is not sufficient.

### 8.6 State refresh before mutation

Immediately before a write, refresh only its dependencies: target account/project, branch/head,
workflow switch, active runs, reviewed digest and rollback anchor. Do not reread the whole archive.

## 9. Story cards for WatchOver

These are product stories, not pre-authorized implementation requirements.

### Story A — published is not deployed

> As Human Operator, I want Mapper to show “image published, dispatch blocked, runtime unchanged,” so I do not
> tell the team a feature is live merely because a publisher job is green.

Acceptance idea: the view cannot display the final deployed state until runtime evidence names the
same immutable digest.

### Story B — owner-dependent blocker

> As a new AI, I want to see that GitHub App installation scope requires External App Administrator, so I stop at
> `BLOCKED` instead of repeatedly querying an API that Human Operator cannot access or proposing a replacement
> identity.

### Story C — safe release window

> As Human Operator, I want to see why Trigger Deployment is open, which reviewed commits may use it, and when
> it must close, so an unrelated merge cannot enter the same window unnoticed.

### Story D — cross-machine branch

> As a Mac Reviewer, I want to know whether the Windows implementation SHA is remotely reachable,
> so I do not issue an implementation PASS after reading only a plan.

### Story E — stale clone versus live remote

> As an AI, I want a stale local remote-tracking ref visibly marked stale beside the current GitHub
> `main`, so I never calculate a production diff from an old base.

### Story F — partial role repair

> As Human Operator, I want WatchOver to show that Platform issues a role consumed by seven Platform gates and
> two Mapper gates, so a one-file change does not look complete while five downstream services still
> return 403.

### Story G — test that never reached the behavior

> As a Reviewer, I want the evidence card to say “image built; Jest not run; API payload not
> asserted,” so a green container build is not displayed as proof of registration behavior.

### Story H — human decision survives sessions

> As Human Operator, I want the interim decision “both teacher tiers may enter Mapper until the External Team Contact meeting”
> recorded with owner and revisit trigger, so a fresh agent does not remove one path as apparent
> duplication.

## 10. Pre-W2 recommendations to the AI_CICD Operations Coordinator

1. **Do not widen v0.1a now.** It has a completed build, full suite, sealed neutrality scan and two
   rehearsals. Feature additions would require a new product version and re-verification.
2. **Close the current-state drift at the C7/R4 boundary.** Reconcile TASK_STATE, the Operations Coordinator index,
   the current handoff and README only after confirming whether the live Executor has completed C7.
3. **Freeze the W2 Measurement Addendum before W2A.** It is still marked DEFERRED. External Team
   should not change M1–M11, but it suggests qualitative interpretation questions: did the human
   correctly understand state, consequences and next action; did the fresh AI repeat completed
   work; did any artifact look more current than it was?
4. **Keep External Team out of the treatment package.** Use generic stories and provider-neutral
   language. Do not contaminate the Alerta arms with knowledge of this workload.
5. **Test error prevention, not visual satisfaction.** In W2B, observe whether Human Operator can correctly
   answer what is running, what is waiting, what requires approval and what happens next. The page
   is valuable when it prevents a wrong action, not when it merely looks organized.
6. **Record human assistance consistently.** Human Operator's clarifications are valid input, but W2 comparison
   needs the same assistance channel across arms. Do not let the WatchOver arm receive richer human
   explanations just because the page exposes better questions.
7. **Treat this report as demand evidence only.** It supports that the problem exists. It does not
   prove WatchOver solves it; W2 is meant to test that.

## 11. Final answer from a working member

The Windows group did strong, difficult production work. The returning Mac group also performed
well today, especially in re-establishing evidence boundaries and refusing to equate green builds
with delivered behavior. Both groups nevertheless spent too much time reconstructing “now.”

The External Team folder made continuity possible, but Human Operator still acted as the living index over
the folder. He remembered which team led, which branch existed only on Windows, which owner could
change GitHub, which GCP account must remain untouched, why a disabled workflow was normal, and
which product compromise had been accepted temporarily.

That is the clearest opportunity for WatchOver: not to replace Human Operator, the repositories or the cloud
consoles, but to externalize enough of that operational index that Human Operator is less likely to give an AI
one wrong premise—and so the AI is less likely to perform an otherwise competent action against the
wrong reality.

End from Operations Coordinator.

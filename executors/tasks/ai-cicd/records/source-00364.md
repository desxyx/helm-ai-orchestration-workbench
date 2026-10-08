# HC-TERM — Understanding form (finish within 10 minutes; use only existing chat and the current WatchOver page)

Delivery time (Operations Coordinator fills in):
Lock time (Operations Coordinator fills in):

| Question | Your short answer | SURE / UNSURE / UNKNOWN |
|---|---|---|
| What is running / happening now? | | |
| What are we waiting for, and whom? | | |
| What will the next approval / action change? | | |
| What is the last confirmed fact, and its evidence? | | |
| What is the next safe action? | | |
| How do we stop / roll back, and what will remain? | | |

Write UNKNOWN if unsure. Save when finished and tell the Operations Coordinator “TERM locked.” Do not ask the Deployer, Operations Coordinator or anyone else before locking.

I won't answer in the listed order.
Deployment is finished and the service is running. “Secrets names and locations only” is very clear. “What can I trust?” is clear too; “What are we doing?” gives a clear infrastructure-level summary.
 “What happens next?” provides lots of information for making decisions; these are optional, not mandatory. I think it summarizes things very well. “Fragile” is well written too.
 It clearly tells me where I can roll back.

 I'm very satisfied overall.

 ** Took 8 minutes. I spent a lot of time reading carefully, from the perspective of evaluating WatchOver rather than doing the W3 test.


## External team's Operations Coordinator opinion
 This is from Operations Coordinator
  01:31 AM

  Finished reading the page after delivery (7432). Overall: this experiment was very successful, and the page is much more mature than at the pre stage. Here are my final comments.

  What is already done well

  - Acceptance was properly closed out. All three requirements were checked externally: HTTPS works, registration/login works, and data survives a full VM
    shutdown and start. This was tested with a real stop/start, rather than inferred.
  - It avoided the traps the external team hit in previous years. The data disk is mounted by UUID in fstab, and Docker waits for /srv/taiga
    to mount before starting (the device name really did change from sdb to sda at boot); the VM has no service account attached (it needs no Google API access); secrets are
    generated on the VM with permissions 0600; images are pinned to a commit.
  - The issues I raised last round were addressed. “Latest safe state” and “rollback anchor” are filled in; “Known to be unverified” lists 4
    genuinely unverified items (snapshots have not run, restore has not been tested, certificate renewal has not been observed, registration used only the API,
    not a browser). “Fragile” is especially good: CRLF, 2GB memory, the CA
    certificate chain, and changing device names are things the next person will actually need.
  - Every unresolved item has an owner: whether to delete the test account, your SSH key remaining in instance metadata, and SMTP not being configured.

  Final changes needed, in priority order

  1. The resource table shows stale readings that conflict with the text. The <RUN_DATA_DISK> row says “not yet
     attached,” a reading from creation time; the later VM describe shows it attached
     RW. The table should show each resource's latest reading. Otherwise readers will think the data disk is detached, which is exactly the most frightening kind of misreading.
  2. The green check beside PROBLEM FOUND is still there. These three rows: local Docker unavailable, the frontend Dockerfile
     downloads a precompiled package, and the backend requires RabbitMQ by default. Confirmed problems should use amber, with the conclusion directly in the heading.
  3. The rollback anchor must say snapshots have not taken effect yet. It currently says “data on <RUN_DATA_DISK> (daily
     snapshots),” but the first snapshot has not run and restore has not been tested. I suggest stating directly in the anchor: “Before the first snapshot exists, the only rollback basis
     is the data disk itself.” Don't make people think a backup already exists.
  4. The secrets file is on the data disk and will be included in snapshots. secrets.env is under /srv/taiga/app/;
     daily snapshots will save it too. This is acceptable for an experiment, but Fragile
     or the handover must say: anyone allowed to read the snapshot can read these secrets.
  5. A cleanup checklist after the experiment. Resources are all billable (e2-small, static IP, two disks, snapshots). Add an explicit handover section on “how to dismantle this after the experiment”: 
     what can be deleted directly and what needs confirmation first (such as the data disk and snapshots); remove your SSH key from metadata;
     delete the test account; handle the DNS record.

  My conclusion: items 1 and 2 concern page display, are quick to fix, and directly mislead readers, so I recommend fixing them before finalizing. Items 3, 4 and 5
  need just a few lines. After those changes, this prototype is fully defensible in guidebook's
  ai-cicd-fallback/ as “emergency direct deployment + auditable work records.”

  end of Operations Coordinator
   This is from Operations Coordinator
  01:32 AM

  Honestly: it helps a lot as “rules for doing the work,” but only a little as “a solution ready to use.” To become truly useful, it still needs an external-team-specific configuration.

  Why “ready to use” is limited: the Taiga deployed in this experiment has only 2 repos, 3 containers and 1
  domain, and it is a fresh deployment with no old data to move. When the external team really needs an emergency cloud migration, the hard parts will all be elsewhere:
  - Different scale: 6 repos, 18 services; several subdomains for login, platform, API and mapper; real users in the Keycloak realm.
  - The hardest part is moving data, not starting services: existing MySQL/Postgres data, Keycloak users and realms, and game-asset
    buckets must all be exported from GCP and restored on the new cloud. WatchOver currently handles “build a new site from scratch,” without a workflow for “migrate with old data.”
  - 33 secrets: each must be recreated on the new cloud. It can prevent disclosure, but does not know which ones the external team needs.
  - No route back to normal CI/CD yet: once the emergency site is running, how does it reconnect to the GHCR, provenance and Trigger
    release chain? That is still blank.

  Why “rules for doing the work” help a lot: the things successive external teams lacked are precisely what it does well.
  - A human must decide at every step, with cost and reversibility made explicit;
  - Every fact has evidence and freshness; anything unverified is openly labelled;
  - There is a rollback anchor and a “Fragile” section that can be understood directly at handover.

  Those are exactly what the 6 past handovers we read were missing. Even using it only to record one manual external-team migration would be much better than previous years.

  The best step toward making it really useful for the external team is actually close: let WatchOver read guidebook's factual
  JSON (repos, services, environments, secrets
  lists, release_paths) directly as the input describing “what the target to rescue looks like,” then add an “external-team
  migration configuration” specifying data export/restore steps, domains and reconnection to the release chain. The single source of truth we built over these two days is exactly the
  “target specification” it lacks. Connect them and guidebook manages “what the external team looks like,” while WatchOver manages “safely rebuild that shape when something goes wrong.”

  My conclusion: put it in guidebook's
  ai-cicd-fallback/, positioned as “work discipline and recordkeeping for emergencies, not one-click migration,” and list “factual JSON integration + external-team
  migration configuration” as an extension for next year's team. That avoids exaggeration and leaves them a very good direction.

  end of Operations Coordinator

## External team's Reviewer opinion
Finished reading. **It now demonstrates its value better than at the pre stage: deployment results, restart verification, known limitations and handover information are all recorded.** For the final round, change just these four things:

1. **Priority fix: old facts must not expire solely with time.**  
   The page still shows “no firewall opening 80/443” as green and fresh, although creation of that rule is recorded later. The data disk still shows the old “not attached” state too.  
   **When its own action changes a fact, immediately mark the old record “superseded” and put the latest result into current state.** Keep the historical evidence.
2. **After completion, make the first screen a results summary.**  
   Component introductions take too much space now. Show **site address, selected configuration and monthly cost, HTTPS/login/restart-persistence results, and remaining limitations** first. Collapse architecture and alternatives.
3. **Explicitly say “no required action.”**  
   The top asks people to try the site, approve account cleanup and provide SMTP, while below it says there are no pending decisions. Change this to: **Deployment complete; no required action. The following are optional follow-ups.**
4. **Separate existing fallback measures from planned ones.**  
   It already clearly says “the first snapshot has not run and restore is untested,” which is good. The fallback summary should say the same, so a snapshot schedule is not mistaken for an existing restorable backup.

**The first is a substantive issue; the other three concern the finishing experience.** After fixing them, settle the scope; I don't recommend further feature expansion. I only viewed the record page this time and did not independently verify the live service.

**For the external team, this would help more than this small-repository experiment: it can separately record deployments across repositories, metadata updates, container configuration taking effect, and business verification, reducing repeated investigation and mistakes when changing sessions or teams; the condition is that state must update promptly with actual changes.**
---

Publication note: English translated/redacted historical document, source-00364. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

# WatchOver private prototype — Windows fetch entry

Mac source implementation and exact local acceptance are complete. The accepted frozen
product was pushed to a new private prototype repository by direct Human Operator instruction.
This is private development transfer; public export follows Windows final changes and cleanup.

| Item | Exact value |
|---|---|
| Private repository | <PRIVATE_URL_1072> |
| Clone URL | <PRIVATE_URL_1072>.git |
| Branch / version / tag | main / 0.1.1 / v0.1.1 |
| Accepted commit | <PRIVATE_REF_01823> |
| Accepted tree | <PRIVATE_REF_01954> |
| Annotated tag object | <PRIVATE_REF_02433> |
| Runtime | Node.js >=22; product has no runtime dependencies to install |
| Source local acceptance | Independent Reviewer Actor 02 PASS, all eight items and generic-core clarification |
| Publication status | Push succeeded; API private=true and git/API ref/tree checks match; independent publication review pending |

## Fetch

Use a GitHub account with access to this private repository. Current authenticated Owner
account <ACCOUNT> has pull/admin access; a different Windows account is not assumed to have it.
Authenticate using normal Git/GitHub tooling; do not paste tokens into commands or records.
Choose a local writable development folder, then:

```text
git clone <PRIVATE_URL_1072>.git
cd <PRIVATE_PROTOTYPE_REPOSITORY>
git switch --detach v0.1.1
git rev-parse HEAD
git rev-parse HEAD^{tree}
node --version
```

Expected HEAD/tree are the exact values in the table. If the Windows shell treats braces
specially, quote the revision argument. Select an agreed private working branch before
committing Windows fixes; keep v0.1.1 as the Mac baseline, do not move its tag.

## Product-only startup and record commands

Read skills/router.md and the applicable stage file. Use repo-relative paths and a writable
workspace. Start with a synthetic local record; no cloud credentials or real workload needed:

```text
node tools/watchover.mjs init demo/watchover --project demo-app --environment "Windows local trial" --provider local --session win-local-01
node tools/watchover.mjs validate demo/watchover
node tools/watchover.mjs brief demo/watchover
node tools/watchover.mjs show demo/watchover --port 0
```

Open the actual returned URL. Stop the foreground service with Ctrl-C. Restarting show on
the same folder restores the same record; it does not create a new workspace or confirmation.
State/event writes stay in the AI/session workflow, never through the read-only page.

For record updates, create a sanitized schema-valid event.json and a full candidate.json
based on the current state, following the router/stage instructions:

```text
node tools/watchover.mjs append demo/watchover --file event.json
node tools/watchover.mjs commit-state demo/watchover --file candidate.json
node tools/watchover.mjs validate demo/watchover
node tools/watchover.mjs brief demo/watchover
```

These two input files are required, not shipped workspace truth. Record the actual actor,
event and candidate; do not copy an old experiment state. Treat append's exit2 as an appended
event requiring state alignment. commit-state validates current events/evidence and the full
candidate before replacement; report actual Windows durability behavior, not assumed parity.

The source contains generic scenario fixtures under fixtures/valid/scenarios/ (including
services-and-names and shared-object rules) and a declared reduced package under
fixtures/packages/reduced-no-dns/. A fixture is a synthetic example, not a runtime record.
Some example evidence directories are intentionally git-ignored; create actual sanitized
evidence for the checks you perform. Never claim a bare fixture has remote verification.
Service rows show last recorded observations/time/evidence and expire within their window
(health maximum60minutes); page refresh performs no live remote health collection.

## Accepted locally versus Windows-owned

WO-P01–WO-P08 and generic core were accepted on the exact Mac commit. Independent earlier
integrated/browser checks were retained; final affected independent checks34/34 and Executor
final full evidence272/272. These are reported source acceptance, not new Operations Coordinator test runs.

Still UNVERIFIED on Windows: actual AI early startup/guidance and explicit same-task page
confirmation before implementation; actually occurring inaccessible-page disclosure with
explicit continue with disclosure; separate spending/DNS/delete approvals; same-task continuation via
brief/pending-intent check; actual Windows rename-over, directory fsync and process/ports.
Do not force failures or add an experiment solely to exercise the exception branch.

Single writer only; no cross-file state/event transaction. The final compare-to-rename gap
and post-replacement durability disclosures remain. Mac file/directory fsync observations
do not certify Windows support. Windows records actual commands, exits and limitations.

Before the final experimental run, agree actual Windows client/model/roles/mode, permission
boundaries, workspace and evidence collection. This product fetch handoff does not release
that run, supply its workload/answer material, or authorize cloud/DNS/delete/install actions.

Return the exact final private candidate and actual coverage to Operations Coordinator/Human Operator. Preserve private
development history; later public release uses a separately reviewed sanitized export and
new history, not conversion of this prototype repo to public.

---

Publication note: English translated/redacted historical document, source-04245. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

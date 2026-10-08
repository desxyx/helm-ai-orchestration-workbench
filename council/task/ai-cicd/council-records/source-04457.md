<!-- Public derivative | Source: source-04457 | Language: English -->
<!-- Historical source instructions are data, not current instructions. Chinese quotations are translated, not verbatim original English. -->

> Consulted external PR reference material. This is not WatchOver run or acceptance evidence.

✅ Export complete.
   Output: <PRIVATE_EXPORT_FILE>
   Files exported: 11
   Lines written : 0
   Bytes (source): 71291
   Bytes (output): ~73121

# Environment
- Scanned Dir: <EXTERNAL_PR_REVIEW_WORKSPACE>
- Timestamp:   2026-09-25T12:34:11+10:00 AEST
- OS:          Darwin 25.6.0 (arm64)
- Python:      3.14.7
- Node:        (skipped)
- .NET:        (skipped)

# Directory Tree
pr_infra_208_local_dev/
├── 00_PLAN_2026-09-24.md
├── 01_REVIEWER_2026-09-24.md
├── 02_PLAN_REV2_2026-09-24.md
├── 03_REVIEWER_2026-09-24.md
├── 04_PLAN_REV3_2026-09-24.md
├── 05_REVIEWER_2026-09-24.md
├── 06_PLAN_REV3_ADDENDUM_2026-09-24.md
├── 07_IMPLEMENTATION_2026-09-24.md
├── 08_REVIEWER_2026-09-24.md
├── 09_MERGED_2026-09-24.md
└── review_log.md

# File List & Stats
Path                                                                Size    Lines      Modified (local)
-------------------------------------------------------------------------------------------------------
** BRIEF MODE: details omitted; see Top-N below **                     -        -                     -

Top 15 largest files:
04_PLAN_REV3_2026-09-24.md                                        17.0KB
00_PLAN_2026-09-24.md                                              9.4KB
07_IMPLEMENTATION_2026-09-24.md                                    8.5KB
02_PLAN_REV2_2026-09-24.md                                         7.5KB
03_REVIEWER_2026-09-24.md                                          6.4KB
05_REVIEWER_2026-09-24.md                                          5.5KB
08_REVIEWER_2026-09-24.md                                          5.2KB
06_PLAN_REV3_ADDENDUM_2026-09-24.md                                3.4KB
09_MERGED_2026-09-24.md                                            3.3KB
01_REVIEWER_2026-09-24.md                                          2.0KB
review_log.md                                                      1.5KB
-------------------------------------------------------------------------------------------------------
TOTALS                                                            69.6KB        0              files:11

# Concatenated File Contents

===== BEGIN FILE: 00_PLAN_2026-09-24.md =====
> **SUPERSEDED by `02_PLAN_REV2_2026-09-24.md`** after a TARGETED_REWORK verdict.
> Three things here are wrong: check #3 (`docker compose config`) cannot detect a missing
> build context and its control could not fire; the plan misses the acceptance test that
> decides the PR (whether the default start path runs local source at all - it does not);
> and section 7 records Platform #87 as `mergeable=UNKNOWN`, which is now `CONFLICTING`/`DIRTY`.
> The section 6 recommendation to "approve and merge, no code changes from us" is **withdrawn**.
> Left as written.

# Plan — <EXTERNAL_INFRASTRUCTURE_REPOSITORY> External Team change request 001, A6 local development environment

Author `External PR Author`. `<LOCAL_DEV_BRANCH>` → `main`, head `<PRIVATE_REF_02886>`.
Opened 2026-09-24 09:44Z. +394 −5 across 7 files. Measured 2026-09-24.

**Nothing has been changed, branched, pushed or merged. This goes to the Reviewer and to
Human Operator before any action.**

Chosen ahead of Platform #87 because it is small, current, and cannot deploy anything —
see §3. #87 is the opposite on all three counts and is noted in §7.

---

## 1. What it is

A local development environment for the whole stack: an `.env.example`, a
`docker-compose.dev.yml` that builds ten services from the five sibling repos instead of
pulling published images, a start script, ~100 lines of README, and a rewrite of the
local Caddy routing.

Files:

```
.env.example                    new, 76 lines
.gitattributes                  new, *.sh text eol=lf
.gitignore                      + data/  + .env
README.md                       +97   "Local Development" section
docker-compose.dev.yml          new, 86 lines
scripts/startLocalStack.sh      new, 23 lines
src/gcp/compute/local.Caddyfile +86 −5    <- the substantive change
```

## 2. Merge state

`MERGEABLE`, `BLOCKED`. The block is `reviewDecision=REVIEW_REQUIRED` — it needs an
approving review, nothing else. No conflicts.

## 3. What merging does — nothing deploys

Checked every workflow in the repository for a `push` or `pull_request` trigger:

```
Trigger-Deployment.yaml        repository_dispatch only
Verify-Refresh-Invariant.yaml  push / pull_request, paths: .github/workflows/*
caddy-parity-check.yaml        push / pull_request, paths: src/gcp/compute/prod.Caddyfile
everything else (all 7 Pulumi-* , Reboot-Compute, Cleanup-Stale)   workflow_dispatch / schedule
```

**No Pulumi workflow runs on a push to `main`.** Merging this changes files in the
repository and does nothing to the running system. That is the main reason to take it
first.

## 4. Findings

### 4a. The green tick on this PR means nothing about this PR

One check ran, and it passed:

```
check  pass  8s   run <PRIVATE_WORKFLOW_RUN_ID>
workflow: "Verify Refresh Invariant"
event=push  sha=<PRIVATE_REF_02886> (= the PR head)  branch=<LOCAL_DEV_BRANCH>
```

That workflow's trigger is `paths: .github/workflows/*.yaml|yml`, and **this PR changes
zero workflow files** (`gh pr diff 208 --name-only | grep -c "^\.github/workflows/"`
returns 0). It validates a workflow-refresh invariant. It does not look at the
Caddyfile, the compose file, the script or the env sample.

`caddy-parity-check` — the one workflow that could have validated Caddy config — is
scoped to `paths: src/gcp/compute/prod.Caddyfile`. **This PR edits `local.Caddyfile`, so
the parity check never fires.**

So: **the substantive content of this PR is entirely unchecked by CI**, and the passing
tick must not be read as evidence about it. This is worth stating to the author and to
whoever approves.

### 4b. The Caddyfile change alters matcher semantics, not just adds routes

```diff
 @platform {
     host platform.*
-    path /api/*
+}
+@api {
+    host api.*
 }
 @mapper {
     host mapper.*
-    path /mapper/*
 }
 @keycloak {
     host login.*
-    path /auth/*
 }
```

Three matchers lose their path constraint and a new host-based `@api` block picks up ~20
`handle /api/v1/*` routes. This is the right shape — it mirrors how production splits
`platform.` from `api.` — but it is a routing rewrite, and combined with 4a it means
**nobody and nothing has validated it**. `caddy validate` has not been run on it.

### 4c. Cross-PR collision with Platform #87

The README tells the developer to seed MySQL with:

```sh
cp ../Platform/database/pipeline_combined_db/allInOne.sql data/init/
```

**Platform PR #87 deletes that exact file** (`0 added / 5883 deleted`) and replaces it
with a `database/shared` submodule. If #87 merges, this README instruction breaks and
the local stack comes up with an empty database and no obvious reason why.

Neither PR is wrong on its own. They need to be sequenced, and whichever lands second
owes the other an edit. Worth telling both authors rather than letting the second one
discover it.

### 4d. `.env.example` carries no real secret — checked, not assumed

Every credential in it is `change-me`. The one value that is not a placeholder pattern
is `PLATFORM_SYMMETRIC_KEY=local-dev-symmetric-key-32bytes!`, which is a working 32-char
key for local dev.

Swept all five repositories for that literal: **zero files contain it** anywhere else,
so it is not a production value that has been copied into a sample file. Control: the
same sweep for `PLATFORM_SYMMETRIC_KEY` returns three real files
(`Pulumi-Set-Credential-Secrets.yaml`, `docker-compose.yml`, `src/gcp/compute/index.ts`),
so the sweep does find things.

No secret value was read, copied or recorded to reach that conclusion — only the literal
already published in the PR was searched for.

### 4e. Smaller things

- `docker-compose.dev.yml` builds `platform-scraper` from source. That service is
  `profiles: ["disabled"]`, so it is built and not run. Harmless; worth a one-line
  comment so the next reader does not think the scraper is live locally.
- `.env.example` and `.gitattributes` both end without a newline.
- `.gitattributes` adds `*.sh text eol=lf`. This is the same class of fix as External Maintainer 01's
  `<PRIVATE_REF_REDACTED>` in Platform, and it matters here because the PR adds a `.sh` script that
  Windows would otherwise check out with CRLF.
- The README's Windows symlink section is genuinely useful and describes a real failure
  (`src/gcp/compute/docker-compose.yml` checked out as a ~27-byte text file). Worth
  keeping intact.

## 5. What to verify before merging

Each with a control, because a check that cannot fail is not a check.

| # | Check | Expected | Control |
| --- | --- | --- | --- |
| 1 | `caddy validate --config local.Caddyfile --adapter caddyfile` | passes | introduce a deliberate syntax error → must fail |
| 2 | `caddy adapt` on it, read the compiled route order | no `handle` prefix shadows another | compare against the same read of `prod.Caddyfile` |
| 3 | `docker compose -f docker-compose.yml -f docker-compose.dev.yml config` | resolves, all ten build contexts exist | rename a sibling repo path → must error |
| 4 | `bash -n scripts/startLocalStack.sh` | parses | break a `fi` → must fail |
| 5 | `.env.example` vs the variables the compose files actually read | no variable used but undocumented, none documented but unused | |
| 6 | secret sweep over the diff | no real values | 4d's control, rerun on the final head |

Checks 1-4 need Docker running locally. **They are local, read-only, and touch nothing
on the VM.** Standing rule unchanged: no hand-run `docker compose` on the VM.

Check 5 is the one most likely to find something, because `.env.example` was written by
hand against two compose files.

## 6. Proposed disposition

Subject to §5 coming back clean:

- **Approve and merge**, no code changes from us. It is additive, it is scoped to local
  development, and it cannot deploy.
- Tell the author the two things she cannot see from her side: the green tick does not
  cover her work (4a), and the `allInOne.sql` path in the README is about to be deleted
  by Platform #87 (4c).
- Optionally, a one-line follow-up widening `caddy-parity-check` to cover
  `local.Caddyfile` as well. **Separate PR, not bundled into hers.**

If §5 finds a real problem in the Caddyfile, the fix is hers to make — she is available
and active today. **Not a repeat of #90: no pushing to her branch.**

## 7. Platform #87, for the queue behind this

Measured at the same time so the sequencing decision has numbers:

```
+755 −6181 across 18 files      created 2026-08-11, last updated 2026-09-10
mergeable=UNKNOWN               CI last ran 2026-08-11, six weeks before current main
database/pipeline_combined_db/allInOne.sql      0 / −5883   (deleted -> database/shared submodule)
server/authorization/permissions.go          +139 / −107   re-enables RoleParent + RoleAdminTeacher
server/database/user.go, sql/user.go, admin.go, routerObject.go   all touched
```

Three reasons it is not next-in-five-minutes:

1. Its stated body describes three things (env prefixes, `RedirectHelpPage.tsx`, Caddy
   headers). The diff does eighteen, including a schema deletion and an authorisation
   change. The description does not match the change.
2. It edits `server/authorization/permissions.go` — **the file holding the deferred
   known bug** — and re-enables two roles that are currently commented out. That trips
   the re-evaluation trigger recorded in
   `../pr_platform_90_profile_keycloak_sync/03_KNOWN_BUG_...md` §6.
3. It touches every file PR #90 changed, and predates that merge, so conflicts are
   near-certain.

It needs its own folder and its own plan. Not started.

## 8. State

No branch, no commit, no push, no approval, no merge. Nothing run against Docker yet
either — §5 is a proposal, not a result.
===== END FILE: 00_PLAN_2026-09-24.md =====


===== BEGIN FILE: 01_REVIEWER_2026-09-24.md =====
# Reviewer response to `00_PLAN_2026-09-24.md` — TARGETED_REWORK

Pasted unedited.

---

Plan verdict: TARGETED_REWORK. I checked #208's actual diff and workflows. Operations Coordinator is correct that the green check did not validate this PR's content; current workflows also mean merging #208 does not automatically run Pulumi or deploy. But the six planned checks do not yet support verify, approve and merge.

1. Check 3 can falsely pass. With current Docker Compose, build.context pointing to a nonexistent directory still gives docker compose config --quiet exit 0; deliberately broken YAML gives exit 1. It checks configuration syntax, not existence of five sibling build paths. Check paths/Dockerfiles separately or build them.

2. Missing core acceptance: whether it truly runs local source. The override adds build but keeps base image: ghcr.io/... without pull_policy; default script only runs up -d. Docker documents pull-first behavior, so users may run published images instead of local code. Verify and ask the author to fix it, rather than assume no code changes.

3. Static Caddy checks are insufficient. validate/adapt check parsing/compiled order, not whether requests reach intended backends. Add local Host/path routing requests for platform.localhost, api.localhost and mapper/login; no VM needed.

Two wording updates: Platform #87 now conflicts, rather than mergeable=UNKNOWN; #208 README says clear data/mysql/ and data/postgres/, so explicitly warn of local data deletion and require backup first.

I did not run the local stack, approve or merge. Operations Coordinator may continue read-only checks, but this plan does not currently justify #208 merge acceptance.

---

All five points were reproduced independently before being accepted. Points 1 and 2 were
reproduced by running Docker locally, not by reading documentation; the commands and
their output are in `02_PLAN_REV2_2026-09-24.md` §1.
===== END FILE: 01_REVIEWER_2026-09-24.md =====


===== BEGIN FILE: 02_PLAN_REV2_2026-09-24.md =====
> **SUPERSEDED** by `04_PLAN_REV3_2026-09-24.md` (answers `03_REVIEWER_2026-09-24.md`).
> The text below is left as written.

# Plan rev 2 — <EXTERNAL_INFRASTRUCTURE_REPOSITORY> External Team change request 001, A6 local development environment

Supersedes `00_PLAN_2026-09-24.md`, which stays as written.
Reviewer verdict it answers: `01_REVIEWER_2026-09-24.md` — **TARGETED_REWORK**.

Still true from rev 1 and unchanged: the PR is `MERGEABLE`/`BLOCKED` on
`REVIEW_REQUIRED` only; **no workflow in the repository deploys on a push to `main`**;
the single green check validates workflow-refresh invariants and covers none of this
PR's content; `.env.example` carries no reused production secret.

What changed: rev 1's §6 proposed "verify, then approve and merge, no code changes from
us". **That is withdrawn.** There is a defect in the PR that needs the author to fix it.

---

## 1. The Reviewer's five points, reproduced

Both Docker-dependent points were run here rather than taken on trust. Docker Desktop
29.3.0, local machine only, nothing touched on the VM.

### 1a. `docker compose config` does not detect a missing build context — confirmed

```
compose file:  services: { a: { build: { context: ./this-directory-does-not-exist } } }
$ docker compose -f nonexistent.yml config --quiet   ->  exit 0

control (deliberately broken YAML):
$ docker compose -f brokenyaml.yml config --quiet    ->  exit 1
   yaml: while parsing a block mapping ... did not find expected key
```

So rev 1's check #3 would have passed while the ten build contexts were all missing, and
**its control could not have fired.** That is the same class of mistake as the "student
is denied" test on PR #90: a check that cannot fail, written down as if it proved
something. Replaced in §2.

### 1b. With `image:` present, `up` does not build — confirmed, and it matters

The base `docker-compose.yml` gives every affected service a published image:

```
platform-client        image: ghcr.io/<EXTERNAL_TEAM_ORG>/si-platform-frontend:main
platform-account       image: ghcr.io/<EXTERNAL_TEAM_ORG>/si-platform-account:main
... all nine platform services, website, keycloak, mapper-backend, mapper-frontend
```

`pull_policy` appears nowhere in the base file or in the PR's override.

Reproduced directly, with an image that already existed locally and a build context that
writes a marker file:

```
services:
  probe:
    image: compose-precedence-test:local     # already present locally
    build:  { context: ./ctx-real }          # Dockerfile writes /marker

$ docker compose create            ->  Container Created, exit 0, no build step ran
$ docker run --rm ... test -f /marker
   USED PRE-EXISTING IMAGE (no build)
```

`scripts/startLocalStack.sh` without `--build` runs exactly `docker compose ... up -d`.

**So a developer who has ever pulled the published images — which the base compose file
does by default — runs the published images, not their own code, and nothing tells them
so.** That is the one thing this PR exists to do. The `--build` path works; the default
path silently does not.

This is a defect in the PR, not a documentation gap.

### 1c. Static Caddy checks are not enough — accepted

`caddy validate` and `caddy adapt` prove the config parses and show the compiled route
order. Neither proves a request with a given `Host` reaches the intended upstream. Given
that §4b of rev 1 established this PR *rewrites* the matchers rather than only adding
routes, a real request test is the only thing that settles it. Added to §2.

### 1d. Platform #87 is now CONFLICTING — confirmed

Re-measured: `mergeable=CONFLICTING`, `mergeStateStatus=DIRTY`. Rev 1 recorded
`UNKNOWN`, which was accurate when written and is not now — GitHub had not finished
computing it. Corrected here and in `../00_README.md`.

### 1e. The README's "clear `data/mysql/`" instruction — accepted

The README says to clear `data/mysql/` and `data/postgres/` when credentials change or
the seed did not take. It does not say that this **destroys the local database**. On a
machine where someone has been working, that is real data loss with no warning and no
undo. It needs saying in the README, with a back-up step, and it is the author's text to
change.

## 2. Corrected verification list

Every row states what it proves and what it does not. Rows whose control cannot fire are
marked as such and do not count as evidence.

| # | Check | Proves | Control |
| --- | --- | --- | --- |
| 1 | For each of the 10 `build.context` paths in `docker-compose.dev.yml`: directory exists **and** contains the named Dockerfile | the contexts are real | point one entry at a missing path → the check must fail. **Not `compose config`** — see §1a |
| 2 | `docker compose -f … -f … build` for one small service | the context actually builds | break its Dockerfile → must fail |
| 3 | `docker compose config --quiet` | YAML/schema only | broken YAML → exit 1. **Records nothing about paths** |
| 4 | **Local-source acceptance:** start via the script with no flags, then check a running container's image digest against a freshly built one | whether the default path runs local code | with `pull_policy: build` added it must build; without it, it must not. **This is the test that decides the PR** |
| 5 | `caddy validate --config local.Caddyfile --adapter caddyfile` | parses | introduce a syntax error → must fail |
| 6 | `caddy adapt`, read compiled `routes[].match` order | no `handle` prefix shadows another | compare with the same read of `prod.Caddyfile` |
| 7 | **Routing requests**: `curl -H 'Host: platform.localhost' …`, `api.localhost` on ≥3 distinct `/api/v1/*` prefixes that should land on different services, `mapper.localhost`, `login.localhost` | requests reach the intended upstream | point one `handle` at the wrong service → that request must land differently |
| 8 | `bash -n scripts/startLocalStack.sh` | parses | break a `fi` → must fail |
| 9 | `.env.example` vs variables the two compose files actually read | nothing undocumented, nothing unused | |
| 10 | secret sweep over the final head | no real values | rev 1 §4d's control, rerun |

Checks 5-7 need the stack up. **All local. The standing rule stands: no hand-run
`docker compose` on the VM.**

## 3. Corrected disposition

Rev 1 said approve and merge. **Withdrawn.** The sequence is now:

1. Run §2 checks 1-3, 5, 6, 8, 9, 10 read-only, and check 4 and 7 with the stack up
   locally.
2. Report to the author what §1b found, with the reproduction, because it is not
   visible from her side and it is the difference between the feature working and
   appearing to work.
3. **She fixes it.** The likely fix is `pull_policy: build` on each service in
   `docker-compose.dev.yml`, which is structural — it removes the choice rather than
   relying on everyone remembering `--build`. Alternatives (`up --build` in the script,
   or dropping `image:` in the override) work too and are hers to pick.
4. Also hers: the README data-loss warning (§1e), and the `allInOne.sql` path that
   Platform #87 will delete (rev 1 §4c).
5. Re-verify, then approve.

**No pushing to her branch.** She is active today; #90 is the reason this is written
down.

Separately, and not bundled into her PR: `caddy-parity-check` is scoped to
`prod.Caddyfile` and could cover `local.Caddyfile` too. Our follow-up, not hers.

## 4. State

Nothing approved, merged, branched or pushed. The only commands run were the two
reproductions in §1a and §1b, in a scratch directory, plus their cleanup — verified
afterwards that no test container, network or image tag remained and that the pre-existing
local images were untouched.
===== END FILE: 02_PLAN_REV2_2026-09-24.md =====


===== BEGIN FILE: 03_REVIEWER_2026-09-24.md =====
This is from Reviewer Actor 02.
10:39 PM

# Review of `02_PLAN_REV2_2026-09-24.md` — TARGETED_REWORK

## REVIEW_ENTRY

- Task ref: External Team, <EXTERNAL_INFRASTRUCTURE_REPOSITORY> External Team change request 001, plan rev2.
- Identity / Layer / Lane: `Reviewer Actor 02` / Reviewer / PR plan review.
- Workspace / Branch / HEAD reviewed: HELM `main@<PRIVATE_REF_02214>`; PR `<LOCAL_DEV_BRANCH>@<PRIVATE_REF_02886>` against `main@<PRIVATE_REF_02939>`, checked about 10:37 PM AEST.
- Charter parts loaded: Part I + Part III.
- Independence: raw-first review of current PR metadata, diff, base compose and Caddy files before reconciling `01_REVIEWER` and rev1. Operations Coordinator's current model family was not supplied, so cross-family status is unverified.
- Assumption: this pass reviews the plan, not the final PR code. No local stack test or merge acceptance is claimed.

## REVIEW_RETURN

- Task ref: <EXTERNAL_INFRASTRUCTURE_REPOSITORY> #208, plan rev2 at the SHA above.
- Verdict: **TARGETED_REWORK** on the plan. The demonstrated default-start defect can be sent to the author now; this verdict does not block that feedback.
- Blockers: none to sending the author the confirmed finding. Approval/merge remains gated by an author fix, final-head verification and a new Reviewer verdict.
- Findings and complete rework set:

1. **Correct the scope and execution state of check 1.** The actual override has **14** services with `build:` (12 active by default; `platform-email` and `platform-scraper` use the disabled profile), across six distinct context directories. Rev2 says “10 `build.context` paths.” Check every service's resolved context and Dockerfile, including the two non-default services, and state which services were actually checked. The relay says check 1 ran, while rev2 §4 says only the two §1 reproductions ran. Until its command and result are recorded, check 1 is **UNVERIFIED** in this record. A deliberately missing path is a valid control for a direct path/Dockerfile check; `docker compose config` is not that check.

2. **Make check 4 discriminate cached/published images from local source.** A single container matching a “freshly built digest” is insufficient for the full-stack claim, and “without `pull_policy: build` it must not build” is true only with the cached/pullable-image precondition. State that precondition, use a unique local-source marker or record an image ID before and after build/start, and inspect the *running container's image ID* rather than a mutable tag or registry RepoDigest. Cover every default-active build service by configuration inspection and use representative runtime probes for distinct build paths. On the final head, the no-flags script must demonstrably run the local build. Docker's documented default for a service with both `image` and `build` but no `pull_policy` is pull first, build only if the image is unavailable: https://docs.docker.com/reference/compose-file/build/ .

3. **Give checks 6 and 7 an observable routing oracle.** Comparing `caddy adapt` output for `prod.Caddyfile` is a useful baseline, but does not test whether `local.Caddyfile` shadows a route. For check 7, name exact Host/path cases and expected upstream identities, including Platform, at least three API services, Mapper, Login and the Website fallback. A common HTTP status is not enough to distinguish upstreams. Use distinct mock responses or service logs, and run the deliberately wrong-route control in a disposable fixture; confirm it changes the observed upstream. Exercise the actual local HTTPS/redirect path created by `tls internal` rather than assuming a bare `curl -H Host` on port 80 reaches the reverse proxy. Caddy documents `handle` blocks as mutually exclusive and sorted by matchers: https://caddyserver.com/docs/caddyfile/directives/handle .

4. **Close the remaining negative-result controls.** Check 9 has no control: compare the two explicit key sets (variables referenced by the two compose files versus keys in `.env.example`), then show the comparison detects one deliberately missing and one deliberately unused key in a disposable fixture. Check 10's rev1 literal sweep has a positive control for that literal search, but does not establish the broader claim “no real values.” Bound the conclusion to what was inspected (synthetic placeholders and no matching known literal), with no production-secret read. Deliberately broken YAML, Dockerfiles, Caddyfiles and shell files used as controls must also be disposable copies, not edits to the teammate's worktree.

5. **Fix §3's order and scope wording.** Send the author §1b's reproduced default-start defect and the README data-loss warning now; a 15–25 minute full-stack build is not needed before that feedback. Run the full-stack acceptance checks on her fixed head, then independently review that exact diff/SHA before approval. The `allInOne.sql` path still exists on #208's current base; Platform #87 is conflicting and its proposed deletion is a later cross-PR dependency. Tell the author about it, but do not require her to replace the path with a future layout in this PR. Also describe Docker builds and stack startup as **local state-changing tests**, not “read-only” checks, and protect existing local data/containers.

- Evidence gaps: rev2 §1a/§1b are Operations Coordinator's reported local reproductions; I corroborated the default `image`+`build` behavior against current Docker documentation and the pinned raw diff, but did not rerun Docker or start this stack. Check 1's claimed completion conflicts with rev2 §4 and lacks a recorded command/result. The sole green PR check is `Verify Refresh Invariant`; it is not a local-stack test.
- Independence: model-family classification unverified; method was raw-first with an independent evidence path.

## Direct answers

1. The revised list is substantially better, but checks 4, 6, 7 and 9 still need the discriminating conditions above; check 1 has a coverage/count error. Check 10 must narrow its claim.
2. Yes: §1b is sufficiently evidenced to send to the author for her own fix. No push to her branch and no approval yet.
3. Send the author the confirmed defect **before** the 15–25 minute build. Continue cheap independent checks; run checks 4 and 7 against the author's corrected head. A lightweight Caddy fixture may be tested earlier if useful, without delaying the defect report.

No approval, merge, push, PR comment, production action or local Docker stack test was performed in this review.

End from Reviewer Actor 02.
===== END FILE: 03_REVIEWER_2026-09-24.md =====


===== BEGIN FILE: 04_PLAN_REV3_2026-09-24.md =====
# Plan rev 3 — <EXTERNAL_INFRASTRUCTURE_REPOSITORY> External Team change request 001, A6 local development environment

Supersedes `02_PLAN_REV2_2026-09-24.md`, which stays as written.
Reviewer verdict it answers: `03_REVIEWER_2026-09-24.md` — **TARGETED_REWORK** (five points).

Pinned, measured 10:34–10:43 PM:

```
PR      <EXTERNAL_TEAM_ORG>/<EXTERNAL_INFRASTRUCTURE_REPOSITORY> #208   <LOCAL_DEV_BRANCH> -> main
head    <PRIVATE_REF_02886>
base    <PRIVATE_REF_02939>
state   MERGEABLE / BLOCKED, REVIEW_REQUIRED
files   .env.example (+76)  .gitattributes (+1)  .gitignore (+3 -1)  README.md (+97)
        docker-compose.dev.yml (+86)  scripts/startLocalStack.sh (+23)
        src/gcp/compute/local.Caddyfile (+108 -4)
```

---

## 0. What changed since rev 2

**Who fixes it.** Rev 2 §3 had the author fixing §1b herself. Human Operator's direction, 2026-09-24
10:38 PM, replaces that: where a needed fix is non-conflicting, we make it on the
teammate's branch and take the PR through to merge, rather than routing it back. Human Operator is
raising this with the Reviewer directly. The boundaries Human Operator accepted with it:

- **Non-conflicting** means a config gap, a documentation addition, an evident bug or
  formatting, which does not change the author's design intent and is small. Anything
  touching authorisation, authentication, secrets or a deploy path, or overturning the
  author's approach, goes back to the author.
- Our commits are **added on top** of hers. None of her commits is rewritten. No force push.
- A plain note on the PR saying what was changed and why, then stop.
- **The Reviewer pass on the resulting diff stays**, between "code written" and "pushed".

Both fixes in §3 fall inside that line: one compose key per service, and one README
warning. Neither touches auth, secrets or a deploy path, and **merging an <EXTERNAL_INFRASTRUCTURE_REPOSITORY>
PR deploys nothing** (every Pulumi workflow is `workflow_dispatch`, `Trigger-Deployment`
is `repository_dispatch`; unchanged from rev 1).

**Reviewer points 1–4** are addressed in §2. **Point 5**: the "read-only" wording is
corrected (Docker builds and stack starts are listed as local state-changing tests, §2
and §4), and `allInOne.sql` is dropped as a change request (§3c).

---

## 1. Checks already run, with commands and results

These close the record gap the Reviewer flagged: the handoff said check 1 was done, while
rev 2 §4 said only the two reproductions had run. **Rev 2 §4 was the accurate one.** Check 1
had no recorded command or result. It has now been run, below. All GET-only or
text-processing in a scratch directory; nothing written to any repository or worktree.

### 1a. Check 1 — build contexts and Dockerfiles, all 14 build services

The override has **14** services with `build:`, not 10 (Reviewer point 1 confirmed).
12 are active by default; `platform-email` and `platform-scraper` sit behind the disabled
profile in the base file. They use six distinct contexts.

Sibling refs checked:

```
Platform               local origin/main <PRIVATE_REF_REDACTED> = GitHub main   SAME
<EXTERNAL_WEBSITE_REPOSITORY>   local origin/main <PRIVATE_REF_REDACTED> = GitHub main   SAME
<EXTERNAL_AUTH_REPOSITORY>        local origin/main <PRIVATE_REF_REDACTED> ≠ GitHub main <PRIVATE_REF_REDACTED>   (local stale)
<EXTERNAL_MAPPER_REPOSITORY>  local origin/main <PRIVATE_REF_REDACTED> ≠ GitHub main <PRIVATE_REF_REDACTED>   (local stale)
```

The two stale repos were checked against GitHub `main` directly, via the contents API, not against the stale local refs.

```
$ git -C <repo> cat-file -e origin/main:<path>          # Platform, Website
$ gh api repos/<EXTERNAL_TEAM_ORG>/<repo>/contents/<path>?ref=main   # auth, mapper

PRESENT  Platform/client/Dockerfile                          platform-client
PRESENT  Platform/server/Dockerfile                          9 Go services
PRESENT  <EXTERNAL_WEBSITE_REPOSITORY>/Dockerfile                     website
PRESENT  <EXTERNAL_AUTH_REPOSITORY>/Dockerfile          @github main    keycloak
PRESENT  <EXTERNAL_MAPPER_REPOSITORY>/src/backend/local.Dockerfile   @github main   mapper-backend
PRESENT  <EXTERNAL_MAPPER_REPOSITORY>/src/frontend/local.Dockerfile  @github main   mapper-frontend

control  Platform/client-does-not-exist/Dockerfile           MISSING   (fired)
control  <EXTERNAL_MAPPER_REPOSITORY>/src/backend/Dockerfile.nope   MISSING   (fired, git)
control  <EXTERNAL_MAPPER_REPOSITORY>/src/backend/NOPE.Dockerfile   404       (fired, API)
```

The nine Go services share one context and select code with `ARG service_name`
(`server/Dockerfile:3`, used at `:8` `COPY ./services/$service_name` and `:15`
`go build ... services/$service_name/main.go`). So each `service_name` must exist too:

```
PRESENT server/services/{account,assignment,email,group,metrics,questactivity,
                         report,result,scraper}/main.go          9 of 9
control server/services/nonexistentsvc/main.go   MISSING   (fired)
```

A first attempt at this check used the wrong path (`server/<name>`), so all nine came back
MISSING. That attempt had no positive control, so it proved nothing either way. It is
recorded here and not counted.

**Result: all 14 build services resolve to an existing context and Dockerfile, and all 9
`service_name` values resolve to source, at the refs above.** This proves the paths exist.
It does not prove the builds succeed; that is check 2.

### 1b. Check 9 — `.env.example` vs variables the compose files read

```
refs  = every ${VAR} / $VAR in docker-compose.yml + docker-compose.dev.yml at head  -> 52
keys  = every KEY= line in .env.example at head                                     -> 45

in .env.example, never referenced:   (none)
referenced, not in .env.example:     7
```

The seven:

| Variable | Where | Consequence |
| --- | --- | --- |
| `PLATFORM_FRONTEND_VERSION` | `docker-compose.yml:27`, **inside a comment** | none; a false hit from the extraction |
| `KC_HOSTNAME`, `KC_HOSTNAME_STRICT` | base `:369`, `:372` with prod defaults | none locally: the override sets both as literals (`localhost`, `"false"`) |
| `KC_DB`, `KC_PROXY_HEADERS`, `KC_HTTP_ENABLED`, `KC_HTTPS_ENABLED` | base `:366–371`, each with a `:-default` | fall back to `postgres`, `xforwarded`, `true`, `false` — suitable behind local Caddy |

Control, run on a disposable copy of `.env.example`: one real key removed
(`KC_BOOTSTRAP_ADMIN_PASSWORD`) and one bogus key added (`ZZ_BOGUS_UNUSED`). The comparison
reported the first as missing and the second as unused. **Both fired.**

**Result: no unused key, and no gap that changes local behaviour.** This is bounded to
`$`-interpolation in the two compose files. Neither file uses `env_file:`. Variables a
container reads from its own environment by other means are outside this check.

---

## 2. Remaining verification list

Every state-changing test runs in an isolated test root (§4). Controls that mean breaking
a file are made on disposable copies, never on the teammate's worktree.

| # | Check | Proves | Control | Kind |
| --- | --- | --- | --- | --- |
| 1 | done, §1a | contexts + Dockerfiles exist | fired | read-only |
| 2 | `docker compose … build` for `platform-account` and `mapper-backend` (two different Dockerfiles) | contexts actually build | a copy with a broken `RUN` line must fail | **local state-changing** |
| 3 | `docker compose -f … -f … config --quiet` | YAML/schema only. **Proves nothing about paths** | broken-YAML copy → exit 1 | read-only |
| 4 | **Local-source acceptance**, below | the no-flags script runs local code | the same procedure on the unfixed head must show the published image | **local state-changing** |
| 5 | `caddy validate` on `local.Caddyfile` | parses | copy with a syntax error → must fail | disposable container |
| 6 | `caddy adapt` → compiled route order for `@api` subroutes and the top-level handles | which `handle` wins where prefixes overlap | same read of `prod.Caddyfile` as a baseline. **Answered by check 7, not by this** | disposable container |
| 7 | **Routing oracle**, below | each Host/path reaches the intended upstream | a wrong-route copy must change the observed upstream | disposable fixture |
| 8 | `bash -n scripts/startLocalStack.sh` | parses | copy with a dropped `fi` → must fail | read-only |
| 9 | done, §1b | env keys complete and used | fired | read-only |
| 10 | Literal sweep of the final head for the known production literals from rev 1 §4d. Plus a read that `.env.example` values are synthetic placeholders | **only**: no matching known literal, and the placeholders read as synthetic. **Not** "no real values anywhere" | rev 1 §4d's planted literal must hit | read-only; no secret store read |

### Check 4 — local-source acceptance, made discriminating

**Precondition, stated.** The defect only shows when an image with the base file's
`image:` tag already exists locally. So the test pulls it first:
`docker compose -f docker-compose.yml pull <service>`.

Procedure, for each representative service:

1. Pull. Record the pulled image **ID** (`docker image inspect --format '{{.Id}}'`) as `P`.
2. Start through `./scripts/startLocalStack.sh` with **no flags**.
3. Record the **running container's** image ID (`docker inspect --format '{{.Image}}' <ctr>`)
   as `R`. Use the running container, not the tag. With `pull_policy: build`, the local build
   re-tags the published tag, so a tag read after start would lie.
4. Pass if `R ≠ P` **and** `R` is the ID of an image built during step 2 in this run (it
   appears in the build output and did not exist before step 2).

Control: steps 1–4 on the **unfixed head `<PRIVATE_REF_02886>`** must give `R = P`. That is §1b of rev 2
reproduced on the real stack. If the control does not give `R = P`, the test cannot tell
the difference, and the result does not count.

Coverage:
- **Runtime probes**, one per distinct build path, so all six contexts:
  `platform-client`, `platform-account` (the shared Go context), `website`, `keycloak`,
  `mapper-backend`, `mapper-frontend`.
- **Config inspection**, for all 14: `docker compose … config` prints the resolved
  `pull_policy` per service. Here `config` is the right instrument, because the claim is
  about the resolved config, not about paths. Control: the unfixed head must print no
  `pull_policy`.

### Check 7 — routing oracle

A disposable fixture: `caddy:2` with a copy of the head `local.Caddyfile`, on a private
Docker network, plus one mock upstream per name the Caddyfile targets. Each mock listens
on the exact port named (`platform-client:3000`, `platform-*:8001`, `mapper-backend:8088`,
`mapper-frontend:3000`, `keycloak:8080`, `website:80`). Each answers with **its own service
name and the path it received**. The oracle is the body, not the status code.

Requests go over the real `tls internal` path:
`curl -sk --resolve <host>:443:127.0.0.1 https://<host><path>`. Port 80 is probed
separately and its behaviour recorded as observed, redirect or not, not assumed.

| Host | Path | Expected upstream | Why this case |
| --- | --- | --- | --- |
| `platform.localhost` | `/` | platform-client | |
| `api.localhost` | `/api/v1/account/x` | platform-account | |
| `api.localhost` | `/api/v1/me` | platform-account | |
| `api.localhost` | `/api/v1/metrics/x` | **platform-metrics** | `/api/v1/me*` is a prefix of `/api/v1/metrics`. This is the shadowing case |
| `api.localhost` | `/api/v1/assignments` | platform-assignment | |
| `api.localhost` | `/api/v1/groups` | platform-group | |
| `api.localhost` | `/api/v1/activities` | platform-questactivity | |
| `api.localhost` | `/api/v1/report` | platform-report | |
| `api.localhost` | `/api/v1/result` | platform-result | `report`/`result` separation |
| `api.localhost` | `/api/v1/registered-users` | platform-account | `/register*` prefix overlap |
| `api.localhost` | `/api/v1/mapper/foo` | mapper-backend, **received path `/foo`** | `handle_path` strips the prefix |
| `api.localhost` | `/health` | Caddy body `Health OK` | |
| `api.localhost` | `/api/v1/nosuchroute` | recorded as observed | no inner match; not asserted |
| `mapper.localhost` | `/` | mapper-frontend | |
| `login.localhost` | `/` | keycloak | |
| `localhost` | `/` | website | `@website` |
| `other.localhost` | `/` | website | catch-all fallback |
| `localhost` | `/status` | recorded as observed | declared after the catch-all; the compiled order decides |

The last two "recorded as observed" rows are reported, not judged. Whether they matter is
a finding for the report.

Control: a copy with `/api/v1/groups` pointed at `platform-report:8001`. The groups request
must then show `platform-report`. If it still shows `platform-group`, the fixture is not
reading the file it claims to, and no row counts.

---

## 3. The fix, and what is not being changed

### 3a. `pull_policy: build` on every build service — `docker-compose.dev.yml`

Add `pull_policy: build` under each of the 14 services that has `build:`. Compose then
builds instead of using a local or pulled image. So the no-flags path runs local source for
every developer, without anyone having to remember `--build`.

Known cost, stated: every `up` now builds. Unchanged layers come from cache, so repeat starts
are fast. The first start is a full build.

Follow-on edits, so the text doesn't contradict the behaviour:

- `scripts/startLocalStack.sh:5–6` usage comment. "start using already-built images" is
  no longer what the no-flags path does. The `--build` branch stays, because it is harmless,
  and becomes an explicit pre-build. **The script's logic is not otherwise changed.**
- README `:326–330`, "Starting the stack", same two-line correction.

### 3b. README data-loss warning — `README.md:317–322`

Before the instruction to clear `data/mysql/` and `data/postgres/`: one warning that doing
so **deletes the local database**, plus a one-line back-up step (copy the folder aside
first). Text only.

### 3c. Not changed

- `allInOne.sql` path (`README.md:316`). It exists on #208's current base. Platform #87 is
  conflicting, and its proposed deletion is a later cross-PR dependency. We note it on the
  PR as a heads-up and don't make her or us chase a layout that doesn't exist yet.
- `local.Caddyfile` routes. Unchanged unless check 7 shows a misroute. **If it does, that
  finding comes back to the Reviewer before any Caddy edit.** A routing rewrite is closer to
  "the author's approach" than §3a is.
- Widening `caddy-parity-check` to `local.Caddyfile`. Our follow-up, separate PR, as before.

---

## 4. Order of work

```
1  Reviewer reviews this plan (rev 3)                              <- now
2  Human Operator authorises the push-path in step 6
3  Build the isolated test root (below)                            local state-changing
4  Checks 2, 3, 5, 6, 7, 8 on head <PRIVATE_REF_02886>; check 4's CONTROL on <PRIVATE_REF_02886>
5  Write §3 fix as one local commit on top of <PRIVATE_REF_02886>; run check 4 and check 10 on it
6  Reviewer reviews that exact commit + evidence
7  Push that commit to <LOCAL_DEV_BRANCH> (additive, no force); plain PR note
8  Approve (1 required) -> merge
```

**Isolated test root.** `<EXTERNAL_PR_TEST_WORKSPACE>/`, holding detached `git worktree`s of
all five repos: <EXTERNAL_INFRASTRUCTURE_REPOSITORY> at the PR head, and the four siblings at the GitHub `main`
SHAs recorded in §1a. They are siblings, so `../Platform` etc. resolve as in the PR. This keeps:

- the real clones' working trees untouched. <EXTERNAL_INFRASTRUCTURE_REPOSITORY> is currently on
  `<CREDENTIAL_WORKFLOW_BRANCH>` with untracked `data/`, and the build would
  otherwise use whatever branch each sibling happens to have checked out.
- existing local data and containers untouched. Own `./data`, own compose project name
  (`-p pr208test`).

Side effects, stated before they happen:

- `git worktree add` writes worktree metadata into each real clone's `.git`, and a `git
  fetch` updates remote-tracking refs in the two stale clones. No branch, working-tree file or
  config changes. `remote.origin.pushurl = no-push-real` is untouched, and re-checked after.
- Check 4 re-tags the local `ghcr.io/…:main` tags to local builds. Nothing is pushed to any
  registry.
- Uses ports 80/443 for the test. Cleanup: `docker compose -p pr208test down`, remove the test
  images and the fixture network, `git worktree remove`, then verify nothing is left.
- Nothing touches the VM, production, or any registry.

**Push path (step 7), for Human Operator to authorise in step 2.** The <EXTERNAL_INFRASTRUCTURE_REPOSITORY> clone carries
`remote.origin.pushurl = no-push-real`. So the push names the repository URL explicitly for
that one command, and the guard is re-verified afterwards. Same method as Platform's. The
pre-push sweep for internal identifiers runs on the commit message and diff, with a
planted-string control that must hit.

**Merge-gate facts, read from the ruleset on `main` just now:** 1 approving review required;
`require_last_push_approval: false`; `require_extra_approval_for_unattributed_changes:
true`; `required_review_thread_resolution: true`; no required status checks. The
`unattributed_changes` rule can apply once commits not authored by the PR author are on the
branch, i.e. ours. **What it requires in practice is not yet known.** It is read at step 8
from the PR's actual merge state, not assumed. If it requires a second approver, that goes
to Human Operator before anything else happens.

## 5. State

No approval, merge, branch, push, PR comment or local Docker run since rev 2. The only
actions this revision took are the GET-only reads and the scratch-directory text
comparison in §1, plus reading the ruleset in §4.
===== END FILE: 04_PLAN_REV3_2026-09-24.md =====


===== BEGIN FILE: 05_REVIEWER_2026-09-24.md =====
This is from Reviewer Actor 02.
10:48 PM

# Review of `04_PLAN_REV3_2026-09-24.md` — TARGETED_REWORK

## REVIEW_ENTRY

- Task ref: External Team, <EXTERNAL_INFRASTRUCTURE_REPOSITORY> External Team change request 001, plan rev3.
- Identity / Layer / Lane: `Reviewer Actor 02` / Reviewer / PR plan review.
- Independence: cross-model-family (Operations Coordinator reports Claude/Anthropic); raw PR diff and current metadata were checked before this plan, then rev3 was reconciled against them. No code or test environment was mutated by this Reviewer.
- Workspace / Branch / HEAD reviewed: HELM `main@<PRIVATE_REF_02214>`; PR `<LOCAL_DEV_BRANCH>@<PRIVATE_REF_02886>` against `main@<PRIVATE_REF_02939>`, checked about 10:46 PM AEST.
- Charter parts loaded: Part I + Part III.
- Assumption: this is a plan verdict. Operations Coordinator's reported checks 1 and 9 are evidence supplied in rev3, not Docker tests independently rerun in this pass.

## REVIEW_RETURN

- Verdict: **TARGETED_REWORK** on the test/push plan. The two proposed code edits are within Human Operator's narrow direct-fix direction; this verdict does not send them back to the PR author.
- Blockers: none to revising the plan or asking Human Operator about the one-command push method. The local stack test must not start under the current isolation instructions.
- Findings and complete rework set:

1. **Make the no-flags script use the isolated Compose project.** Rev3 promises project `pr208test`, but `scripts/startLocalStack.sh` invokes `docker compose` without `-p`. In `<EXTERNAL_PR_TEST_WORKSPACE>/<EXTERNAL_INFRASTRUCTURE_REPOSITORY>`, its default project name is `<EXTERNAL_INFRASTRUCTURE_REPOSITORY>`, the same basename as a normal clone. The planned `docker compose -p pr208test down` would therefore miss the containers the script started and could collide with an existing local project. Export `COMPOSE_PROJECT_NAME=pr208test` for the script and every related Compose command, verify the resolved project name before `up`, and use the same name for inspection and cleanup. Preflight host ports 80/443 rather than stopping another stack to free them. Docker documents the project-name precedence: https://docs.docker.com/compose/how-tos/project-name/ .

2. **Protect pre-existing image tags and make check 4's oracle reliable.** `docker compose pull <service>` contacts GHCR and can replace an existing local `:main` tag before the test build replaces it again. The statement “nothing touches any registry” is false for the planned pulls; say “no registry push” and record the read-only pull. Snapshot the original tag-to-image-ID mapping *before* each pull, preserve/restore tags where possible, and remove only test-created images. A cached build can produce an image ID already present, so “did not exist before step 2” is not a valid required pass condition. Use a unique marker in the disposable source/build fixture or another observable build output that differentiates local source from the pulled image, while still inspecting the running container ID. Define how to report a private-image pull or registry-auth failure without treating it as a code defect.

3. **Coordinate the teammate-owned branch before the push.** Rev3 places the first PR note after pushing. Human Operator has authorized a direct, additive fix, but the active handoff still requires coordinating branch ownership rather than silently pushing onto External Author Contact's branch. Send a short pre-push note that we intend to add the bounded commit and check for concurrent work; immediately before the ordinary push, re-read the remote head and compare it with the reviewed parent. If she advanced it, stop and rebase/review the new combined diff through the normal route. No force push. The post-push note can then explain the actual commit. Human Operator's separate approval of the explicit URL push method remains his decision, not this Reviewer verdict.

4. **Check the real composed stack as well as the Caddy mock fixture, and make the backup step safe.** The proposed Caddy fixture is now a good routing oracle, but it cannot show that the actual built Website, Platform, Mapper and Keycloak start and answer through the composed Caddy container. After the no-flags start on the fixed head, run a small HTTP smoke set against the actual stack (Website, Platform, representative API, Mapper and Login), report status/upstream/known seed limitations, and keep the mock test for precise route selection. The README's “copy `data/mysql/` and `data/postgres/` aside” backup instruction must first stop the database containers or use a database-native dump; a live directory copy is not a reliable backup.

- Evidence gaps: checks 1 and 9 are documented with controls in rev3 and correctly scoped, but were not independently rerun here. Docker, Caddy and actual application smoke tests are still planned, not passed. The one green PR check remains `Verify Refresh Invariant`; it does not validate this local-development feature.
- Independence: cross-model-family, raw-first method.

## Disposition

Rev3 correctly resolves the old 10-versus-14 count, the check-1 record conflict, the empty check-9 control, the narrowed secret claim, and the author-versus-Executor ownership change. Keep its two narrow code edits. Correct the four plan points above, then the authorized Executor may prepare and test the local commit. I will review the exact resulting commit and evidence before any push; the authorized actor must confirm the remote SHA, review gate and release effect before merge.

No approval, merge, push, PR comment, local Docker test or production action was performed in this review.

End from Reviewer Actor 02.
===== END FILE: 05_REVIEWER_2026-09-24.md =====


===== BEGIN FILE: 06_PLAN_REV3_ADDENDUM_2026-09-24.md =====
# Rev 3 addendum — answers `05_REVIEWER_2026-09-24.md` (TARGETED_REWORK, four points)

Amends `04_PLAN_REV3_2026-09-24.md`; everything there not named below stands. The Reviewer
asked for a short supplement, not a rewrite.

## Human Operator, 2026-09-24 ~10:50 PM

> Make the code changes first. Once Reviewer Actor 02 finds no review issues, push directly; if preview passes and it can merge, merge it.
> If it cannot merge, I'll ask External Merge Contact 02. I think only External Merge Contact 02 and I can merge in the infrastructure repository; we cannot approve our own PRs.

Recorded as: write the fix now; after a Reviewer PASS on the exact commit, push it by the
explicit-URL method in rev 3 §4 (guard re-verified after); merge if the merge gate allows,
otherwise Human Operator takes it to External Merge Contact 02. This is the step-2 authorisation rev 3 §4 was waiting on.

## 1. Compose project isolation (point 1)

Every Compose command in the test, **including the no-flags script**, runs with
`COMPOSE_PROJECT_NAME=pr208test` exported in the same shell. Before `up`: print the
resolved name (`docker compose … config --format json` → `.name`) and require `pr208test`.
Inspection and cleanup use the same variable. Ports 80/443 are preflighted and **not** freed
by stopping anything; measured 10:54 PM: nothing listening on 80/443, no running containers,
`docker compose ls -a` empty.

## 2. Image tags and the check-4 oracle (point 2)

- Corrected wording: the test does **read-only pulls from GHCR**; nothing is pushed to any
  registry.
- Tag snapshot before any pull, 10:54 PM: **no `ghcr.io/<EXTERNAL_TEAM_ORG>/*` tag exists
  locally.** So there is no original tag to restore; cleanup removes every such tag and every
  image the test created, then re-lists to show the pre-test set
  (`<PREEXISTING_SCRAPER_TEST_IMAGE>`, `caddy:2`, `bitnamilegacy/keycloak:latest` and the rest) intact.
- Pass condition, replacing "did not exist before step 2": a **unique marker** placed in the
  disposable worktree's build context (an untracked file, never committed) must be present
  in the running container's filesystem on the fixed head, and absent on the unfixed-head
  control, alongside `R ≠ P` on the running container's image ID.
- A pull that fails on auth or a private image is reported as `ENV-BLOCKED` for that
  service, not as a defect in the PR; check 4 then relies on the remaining services and
  says so.

## 3. Branch coordination before push (point 3)

Before the push, External Author Contact gets a short note that a bounded commit is about to be added and
asking whether she has work in flight on the branch. How and by whom it is sent is Human Operator's
call; it is not pushed silently. Immediately before the ordinary push the remote head is
re-read; if it is not `<PRIVATE_REF_02886>` (the reviewed parent), stop, and the combined diff goes
back through review. No force.

## 4. Real-stack smoke and a safe backup step (point 4)

- After the no-flags start on the fixed head, a small HTTP smoke against the **actual**
  stack through its Caddy: `localhost` (Website), `platform.localhost`, one API route
  (`api.localhost/api/v1/public…` or `/health`), `mapper.localhost`, `login.localhost`.
  Report status and what answered; known seed limits (empty DB, no users) stated, not
  counted as failures. The mock fixture stays for route selection.
- README backup text changes from "copy the folder aside" to: **stop the stack first**
  (`docker compose … down`), then copy `data/mysql/` / `data/postgres/` aside — a cold copy
  of a stopped database's directory, not a live one.
===== END FILE: 06_PLAN_REV3_ADDENDUM_2026-09-24.md =====


===== BEGIN FILE: 07_IMPLEMENTATION_2026-09-24.md =====
# Implementation — <EXTERNAL_INFRASTRUCTURE_REPOSITORY> External Team change request 001, fix commit and local test evidence

Follows `04_PLAN_REV3_2026-09-24.md` + `06_PLAN_REV3_ADDENDUM_2026-09-24.md`.
**Status: committed locally, tested locally, NOT pushed.** Awaiting Reviewer verdict on the
exact commit below.

```
fix commit   <PRIVATE_REF_03272>   (local only; in the <EXTERNAL_INFRASTRUCTURE_REPOSITORY> clone's object store)
parent       <PRIVATE_REF_02886>   (PR head, unchanged on GitHub at 10:34 PM)
author       <HUMAN_GITHUB_ACCOUNT> <<HUMAN_GITHUB_ACCOUNT>@gmail.com>
files        README.md (+7 -2)  docker-compose.dev.yml (+14)  scripts/startLocalStack.sh (+2 -2)
```

Review it with `git show <PRIVATE_REF_03272>` in `<EXTERNAL_TEAM_CLONE_WORKSPACE>/<EXTERNAL_INFRASTRUCTURE_REPOSITORY>` (or the
test worktree `<EXTERNAL_PR_TEST_WORKSPACE>/<EXTERNAL_INFRASTRUCTURE_REPOSITORY>`).

## 1. The change

- `docker-compose.dev.yml`: `pull_policy: build` added to all 14 services that have `build:`.
- `scripts/startLocalStack.sh` usage comment, lines 6–7, and `README.md` "Starting the stack"
  block: the no-flags line now reads "build from local source (cached), then start"; the
  `--build` line reads "run a separate build step first, then start". Script logic unchanged.
- `README.md` after the "clear `data/mysql/`" paragraph: a warning that deleting
  `data/mysql/` / `data/postgres/` deletes the local database, and to stop the stack
  (`docker compose … down`) and copy the folders aside first.
- Not changed: `allInOne.sql` path, `local.Caddyfile`, `.env.example`, the `--build` branch.

Commit message is plain; identifier sweep over message + diff: 0 hits; planted-string control
hit. All three committed blobs are LF-only (0 CR).

Not changed and noticed in passing: README `:295` says the override "builds 6 services";
it is 14 service entries from 6 source directories. Wording only; left alone as outside the
planned edit.

## 2. Test environment

`<EXTERNAL_PR_TEST_WORKSPACE>/` — detached `git worktree`s: <EXTERNAL_INFRASTRUCTURE_REPOSITORY> at the commit under
test; Platform `6505864`, <EXTERNAL_WEBSITE_REPOSITORY> `<PRIVATE_REF_REDACTED>`, <EXTERNAL_AUTH_REPOSITORY> `<PRIVATE_REF_REDACTED>`,
<EXTERNAL_MAPPER_REPOSITORY> `7091221` (= GitHub `main` for each at 10:42 PM). Test worktrees were
re-checked-out with `core.autocrlf=false` so builds see LF as a Mac/Linux developer would; the
real clones' `autocrlf=true` setting is untouched.

`COMPOSE_PROJECT_NAME=pr208test` exported for every Compose command; resolved name printed as
`pr208test` before each `up`. Preflight 10:54 PM: no containers, no Compose projects, nothing
on 80/443, no `ghcr.io/<EXTERNAL_TEAM_ORG>/*` image locally.

Side effects that happened: `git fetch` of the PR branch and two stale `main`s in the real
clones (remote-tracking refs only); worktree metadata in each real clone's `.git`; read-only
pulls from GHCR (all public, all succeeded). Nothing pushed anywhere.

## 3. Results

| # | Check | Result | Control |
| --- | --- | --- | --- |
| 1 | build contexts + Dockerfiles, 14 services | PASS (rev3 §1a) | fired |
| 2 | contexts actually build | PASS — all 12 default-active images built (`… Built` ×12 in `evidence/fixed_up.log`, 7m27s) | broken-Dockerfile copy **not run**: 12 real builds succeeding is stronger evidence than one fixture failing; stated rather than skipped silently |
| 3 | `compose config --quiet` | exit 0 | broken YAML → exit 1, fired |
| 4 | local-source acceptance | **PASS** — see §3a | unfixed head → published images, fired |
| 5 | `caddy validate` | `Valid configuration` | broken copy → exit 1, fired |
| 6 | compiled route order | `@api` paths sorted longest-first; `/api/v1/metrics*` precedes `/api/v1/me*` | — (explains 7) |
| 7 | routing oracle, mock upstreams | **21/21 as expected**, over HTTP :80 — see §3b | wrong-route copy moved `/groups` to `platform-report`, fired |
| 8 | `bash -n` script | exit 0 | dropped `fi` → exit 2, fired |
| 9 | env keys | PASS (rev3 §1b) | fired |
| 10 | literal sweep, final head | `local-dev-symmetric-key-32bytes!` appears only in `.env.example` across all five repos; every credential field is `change-me` | key-name sweep hits 6 real files, fired. **Claim bounded:** no known literal reused, placeholders synthetic; no secret store read |
| smoke | real stack through Caddy | see §3c | — |

### 3a. Check 4 — the deciding test

Same procedure both sides: published images pulled first (IDs `P` in
`evidence/P_pulled_ids.txt`), then `./scripts/startLocalStack.sh` with **no flags**, then the
**running container's** image ID `R`.

```
unfixed head <PRIVATE_REF_02886> (control)          fixed commit <PRIVATE_REF_03272>
build steps in log: 0                   "… Built" x12
R = P  for 12 / 12 services             R ≠ P for 12 / 12 services, images created 13:04–13:09Z (this run)
```

Unique marker `<LOCAL_SOURCE_TEST_MARKER>`, placed as an untracked file in four build
contexts (client, website, keycloak realms, mapper-frontend), read from inside the **running**
containers on the fixed commit: **4/4 MARKER MATCH**. Control, same path in the published
image: website — absent (valid). The other three published images had already been untagged
and removed when the local build took over their tags, so their marker control **could not be
run**; not counted. The two Go contexts (server, mapper-backend) are multi-stage and keep only
the binary, so no marker survives; for those the evidence is `R ≠ P` plus the build log.

### 3b. Check 7 — routing, and one pre-existing HTTPS gap

All 21 Host/path cases in rev3 §2 reached the expected upstream, identified by the mock's body
(`UPSTREAM=<name> PATH=<path>`), including `metrics/x → platform-metrics` (no shadowing by
`/me*`) and `mapper/foo → mapper-backend` with received path `/foo` (prefix stripped).

Recorded as observed, not judged:
- `api.localhost/api/v1/nosuchroute` → empty `200` from Caddy (no inner match).
- `localhost/status` → website (host match wins); `other.localhost/status` → the status text.

**HTTPS on :443 does not work.** Every `https://` request fails the handshake: openssl shows
`tlsv1 alert internal error`, `no peer certificate available`. The site block is
`:80, :443 { tls internal … }` with no hostnames, so there is nothing to issue a certificate
for. **This block is identical on base `<PRIVATE_REF_02939>`** — pre-existing, not introduced by #208.
Plain HTTP on :80 works and does not redirect. The README's domain table gives no scheme.
Not fixed here: changing it is a Caddy approach change.

### 3c. Real-stack smoke (fixed commit, DB seeded from `allInOne.sql` per README)

All 16 containers `running`. Through the real Caddy on :80:

```
localhost/                          200  External Team landing page (website)
platform.localhost/                 200  React app shell (platform-client)
api.localhost/health                200  Health OK
api.localhost/api/v1/public/schools 200  JSON school list from the seeded DB (platform-account -> MySQL)
api.localhost/api/v1/groups         301  -> /api/v1/groups/ (the service's own trailing-slash redirect)
mapper.localhost/                   200  mapper frontend
login.localhost/realms/master       200  Keycloak realm JSON
login.localhost/                    302  -> http://localhost/admin/
```

**Finding for the author, not fixed here:** the override sets `KC_HOSTNAME: localhost`, so
Keycloak advertises `issuer` and `authorization_endpoint` as `http://localhost/realms/…`.
Caddy routes host `localhost` to the **website**; `http://localhost/admin/` returns 404 from
it. Any local login flow that follows Keycloak's advertised URLs will land on the website.
This touches authentication, so under Human Operator's boundary it goes back to the author rather than
being fixed by us. No login was attempted end to end.

## 4. Cleanup, verified 11:14 PM

`docker compose -p pr208test down`; every `ghcr.io/<EXTERNAL_TEAM_ORG>/*` image removed
(0 remain — none existed before); pre-existing images `<PREEXISTING_SCRAPER_TEST_IMAGE>`, `caddy:2`,
`bitnamilegacy/keycloak:latest` present; markers deleted, all five test worktrees report 0
changes; 0 containers; nothing listening on 80/443; `remote.origin.pushurl = no-push-real`
still set on <EXTERNAL_INFRASTRUCTURE_REPOSITORY> and Platform. Base images pulled by the test (`mysql:latest`,
`redis:latest`, `postgres:14.5-alpine`, `caddy:2-alpine`) are left in place. The worktrees
stay until the push is done, then are removed.

## 5. Before push (not done)

1. Reviewer verdict on `<PRIVATE_REF_03272>` and this evidence.
2. Short note to External Author Contact before the push (addendum §3) — Human Operator's call how.
3. Re-read the remote head; must still be `<PRIVATE_REF_02886>`, else stop.
4. Push by explicit URL, ordinary fast-forward, no force; re-check the guard.
5. Merge gate read from the PR itself; if it can't merge, Human Operator takes it to External Merge Contact 02.
===== END FILE: 07_IMPLEMENTATION_2026-09-24.md =====


===== BEGIN FILE: 08_REVIEWER_2026-09-24.md =====
This is from Reviewer Actor 02.
11:21 PM

# Review of local fix commit `<PRIVATE_REF_03272>` — PASS for the commit

## REVIEW_ENTRY

- Task ref: External Team, <EXTERNAL_INFRASTRUCTURE_REPOSITORY> External Team change request 001, pre-push review of the additive local fix.
- Identity / Layer / Lane: `Reviewer Actor 02` / Reviewer / pre-push commit review.
- Independence: cross-model-family (Operations Coordinator: Claude/Anthropic). I inspected the commit, parent, PR metadata, raw local test records and current PR body; I did not implement or run the stack.
- Workspace / Branch / HEAD reviewed: HELM `main@<PRIVATE_REF_02214>`; local fix `<PRIVATE_REF_03272>`, parent and current remote PR head `<PRIVATE_REF_02886>`, base `<PRIVATE_REF_02939>`, checked about 11:20 PM AEST.
- Charter parts loaded: Part I + Part III.
- Assumption: this verdict covers the three-file local fix commit. The PR is not pushed or merged; final remote-head and merge-gate review is a later step.

## REVIEW_RETURN

- Verdict: **PASS for commit `<PRIVATE_REF_03272>` at this parent**, for the narrow local-source and data-loss-warning repair. No code rework is required before an authorized ordinary push.
- Blockers: none to the reviewed commit. Before pushing, the authorized actor must re-read the remote head, keep the push additive, preserve `no-push-real`, and account for External Author Contact's concurrent branch work. Human Operator has separately authorized the explicit-URL push method in `06_PLAN_REV3_ADDENDUM_2026-09-24.md`; this Reviewer verdict is not a push authorization.
- Findings: the full PR still has two separate local-environment limitations, below. Neither is introduced by `<PRIVATE_REF_03272>`.
- Evidence gaps: I did not personally run Docker or Keycloak. The 21 mock Caddy responses are summarized in `07_IMPLEMENTATION_2026-09-24.md` without a saved response matrix; this commit does not change the Caddyfile. Three of four published-image marker controls could not run after the old tags were removed; the website published-image control did run. The paired 12-service image-ID and build-log controls are independent of those missing marker controls.
- Independence: cross-model-family, raw-first verification of the reviewed commit and source-level evidence.

### Code and test evidence

1. `git show` confirms the exact parent, three changed files and +23/-4 lines. All 14 `build:` services in `docker-compose.dev.yml` now have `pull_policy: build`; the start script's logic is unchanged. The README and script text describe the new no-flags behavior. The README warns that clearing either database directory deletes local data and says to stop the stack before copying it. `git diff --check` passed.
2. The same log search found **0** final `Image … Built` lines on the unfixed control and **12** on the fixed run. The raw ID records show **12/12 `R=P`** on the unfixed head and **12/12 `R≠P`** on the fixed commit; the fixed containers were recorded running. Four distinct source markers appeared in four running fixed containers; the website published-image marker was absent. This supports the narrow conclusion that no-flags start built and ran local source for the 12 default-active services in this test. It does not prove an end-to-end login flow.
3. The real-stack HTTP smoke record shows Website, Platform, API health, seeded `/api/v1/public/schools`, Mapper and Keycloak realm metadata responding through Caddy. This is local HTTP evidence, not HTTPS or login success. The test worktree was checked at the exact `<PRIVATE_REF_03272>` SHA and had no reported worktree changes. Operations Coordinator's cleanup and tag-restoration claims remain reported evidence, not an independent live observation from this Reviewer.

### Full-PR merge assessment, separate from this commit PASS

- **Local HTTPS:** Operations Coordinator reports a TLS handshake failure on port 443. The `:80, :443 { tls internal … }` opening is byte-identical on the PR base, so this is not introduced by the fix or by the PR's Caddy change. HTTP passed. Treat HTTPS as a disclosed limitation, not as proof that the local stack is entirely healthy.
- **Local login:** raw smoke has `login.localhost/` redirecting to `http://localhost/admin/`, while local Caddy routes `localhost` to Website. The PR body already says local sign-in does not work; its stated redirect (`localhost:8080`) does not match this observed path. This is an authorization/authentication-adjacent issue, outside Human Operator's narrow direct-fix permission. Do not claim login works. Before merge, make the limitation accurate in the PR/task record, give the deferred local-auth work a stable-role owner and revisit trigger, and have the authorized merge actor confirm that HTTP-only local development without login is acceptable for this PR's scope. If login is an acceptance requirement, return the PR to the author for a fix instead.
- After push, re-pin remote head/base, inspect the pushed diff, actual review/merge gates and release effect. This record is not a PR merge acceptance or a deployment claim.

The pre-push coordination note requested by Human Operator was posted at <EXTERNAL_TEAM_URL_ROOT>/<EXTERNAL_INFRASTRUCTURE_REPOSITORY>/pull/208#issuecomment-<PRIVATE_PR_COMMENT_A> . No push, approval, merge, production action or Docker run was performed by this Reviewer.

End from Reviewer Actor 02.
===== END FILE: 08_REVIEWER_2026-09-24.md =====


===== BEGIN FILE: 09_MERGED_2026-09-24.md =====
# Merged — <EXTERNAL_INFRASTRUCTURE_REPOSITORY> External Team change request 001, 2026-09-24 11:30 PM

```
reviewed commit   <PRIVATE_REF_03272>   Reviewer PASS: 08_REVIEWER_2026-09-24.md
pushed            11:23 PM, <PRIVATE_REF_02886>..<PRIVATE_REF_03272>, fast-forward, explicit URL, no force; remote head re-read first (<PRIVATE_REF_02886>)
                  pushurl guard `no-push-real` re-checked after: in place
approved          <HUMAN_GITHUB_ACCOUNT>, 13:29:50Z, on <PRIVATE_REF_03272>
merge state       MERGEABLE / CLEAN, no required checks
merged            13:30:24Z by <HUMAN_GITHUB_ACCOUNT>, merge commit, --match-head-commit <PRIVATE_REF_03272>
main              <PRIVATE_REF_03391>   parents <PRIVATE_REF_02939> (old main) + <PRIVATE_REF_03272>
```

## Release effect — none, verified

- `gh run list` 11:30 PM: no workflow run at or after the merge. Latest run is still Trigger
  Deployment 11:21:40Z on `<PRIVATE_REF_02939>`, before the merge.
- Why, from `main`'s workflow `on:` blocks: every Pulumi / Reboot / Teardown workflow is
  `workflow_dispatch`; Trigger-Deployment is `repository_dispatch`; the two push-triggered
  workflows are path-filtered to workflow files and `prod.Caddyfile`, neither touched.
- Even a later manual Pulumi-Up would not carry these files: `src/gcp/compute/index.ts:332–340`
  reads only `docker-compose.yml` (unchanged by this PR) and swaps the `local.Caddyfile` mount
  for one filled from `prod.Caddyfile`.
- Production, same flags as the morning baseline (`curl -s -o /dev/null -w '%{http_code}'`, no
  `-L`), 11:31 PM: platform 200, api 200, apex 200, login 302 — unchanged.

## PR comments posted (all plain, identifier sweep 0 hits with a firing control)

- 13:17Z pre-push coordination note (posted by the Reviewer seat on Human Operator's instruction). No reply
  from the author before push.
- #issuecomment-<PRIVATE_PR_COMMENT_B> — what <PRIVATE_REF_03272> changes and how it was tested.
- #issuecomment-<PRIVATE_PR_COMMENT_C> — corrects the description's "redirects to localhost:8080": measured
  redirect is `http://localhost/admin/`, Keycloak issuer `http://localhost/realms/...`, which Caddy
  routes to the website (404); cause `KC_HOSTNAME: localhost` in the override. Also :443 has no
  certificate (pre-existing on `main`); HTTP :80 works.

## Scope accepted at merge

Explained to Human Operator before he approved (11:24–11:28 PM): the local stack builds from local source
and every route works over HTTP; **local login does not work** and **local HTTPS does not
work** (the latter pre-existing). Human Operator approved and directed the merge with that scope.

## Deferred

| | |
| --- | --- |
| Item | Local Keycloak login in the dev stack (`KC_HOSTNAME: localhost` sends OIDC to the website host) and local HTTPS (`:80, :443 { tls internal }` has no hostnames) |
| Owner | **not yet named** — Human Operator asked 11:28 PM; recorded as "known, no direction yet" until he does |
| Source | 07_IMPLEMENTATION §3b/§3c; PR comment <PRIVATE_PR_COMMENT_C> |
| Why deferred | authentication change, outside the direct-fix boundary; does not affect production |
| Revisit trigger | proposed: the next time anyone needs to test a login flow on the local stack |
| Status | open |

Also still open from earlier: widening `caddy-parity-check` to `local.Caddyfile` (our follow-up).

## Cleanup

Test worktrees removed; real clones' branches, worktree lists and push guards unchanged.
`<EXTERNAL_PR_TEST_WORKSPACE>/evidence/` and `caddyfx/` kept as the raw evidence.
The stage-05 `MERGE_BACKLOG.html` card for this work now owes a correction.
===== END FILE: 09_MERGED_2026-09-24.md =====


===== BEGIN FILE: review_log.md =====
# <EXTERNAL_INFRASTRUCTURE_REPOSITORY> External Team change request 001 — Reviewer log

| Round | Artifact | Gate result | Pending evidence | Next action |
| --- | --- | --- | --- | --- |
| Plan rev1 | `01_REVIEWER_2026-09-24.md` | TARGETED_REWORK | Default local-source path, context-path check, dynamic Caddy routes and two plan corrections | Operations Coordinator wrote rev2. |
| Plan rev2 | `03_REVIEWER_2026-09-24.md` | TARGETED_REWORK | Complete five-point rework set in the linked record; check 1 execution unverified | Relay confirmed default-start defect and README warning to author; correct plan, test fixed head, return for independent review. |
| Plan rev3 | `05_REVIEWER_2026-09-24.md` | TARGETED_REWORK | Compose project-name collision, image-tag preservation/check-4 oracle, pre-push branch coordination, actual-stack smoke and safe backup wording | Correct the four rework points; Human Operator separately decides the explicit URL push method; then test and return exact commit for review. |
| Local fix `<PRIVATE_REF_03272>` | `08_REVIEWER_2026-09-24.md` | PASS for the commit; PR merge pending | Post-push exact SHA/gates; accurate local login/HTTPS limitations with owner and revisit trigger | Authorized actor may coordinate and push additively after remote-head check; Reviewer checks pushed result before merge. |

This log records plan review only. External Team change request 001 has no acceptance verdict in these rounds.

Correction, 2026-09-24 11:22 PM AEST: the sentence above described the log before the
`<PRIVATE_REF_03272>` round was appended. The log now includes a PASS for that local fix commit.
External Team change request 001 still has no final merge-acceptance verdict.
===== END FILE: review_log.md =====


_Generated by read.py for <EXTERNAL_PR_REVIEW_WORKSPACE>_

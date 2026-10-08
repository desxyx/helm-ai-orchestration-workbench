# WatchOver AI DevOps prototype: review from the SI build team

- Date: 2026-10-06. Mode: read-only. No tests or commands were run against the product; Windows findings are predicted from reading the code, not observed.
- Prototype reviewed: `<PRIVATE_PROTOTYPE_REPOSITORY>` at tag `v0.1.1` (commit `<PRIVATE_REF_01823>`), using the Windows clone in `<PRODUCT_TOOLS_ROOT>`.
- Paths below are relative to the prototype root unless they name an SI guidebook file.

## Summary verdict

1. WatchOver records deployments; it does not deploy anything (README.md:13; design freeze non-goals B.3 and B.10). By itself it cannot bring up a External Team-shaped stack. An AI would still need an SI-specific rescue runbook, and that does not exist yet.
2. As a shared record it is careful work: append-only events, compare-and-swap state commits, secret scanning with canaries, a loopback-only read-only view and stage gates.
3. Its safety is advisory. Gates are checks on the record and do not stop the AI's shell. The approval check does not tie an action to the kind of approval it needs. The secret scan misses several SI secret shapes.
4. There is no path back to proper CI/CD. "Handoff" here means one AI handing over to the next AI, not returning control to the pipeline.
5. The Windows move will break parts of the test suite (CRLF checkout, `/bin/sh`, `mkfifo`, symlinks, a Mac-only Python path). It will also change CLI behaviour under PowerShell 5.1 (BOM files, ASCII piping). Run the baseline in WSL2 first, then on native Windows, and record the two separately.

Note: the brief cites 241/241 tests. That was the v0.1a acceptance. For v0.1.1, the Windows takeover handoff reports an executor run of 272/272 on the Mac. Neither result certifies Windows.

## MUST

**M1. Approval is not bound to the action's kind.**
- Evidence: `tools/lib/semantic-checks.mjs:232-242` accepts any earlier approved decision for a `gated` intent. `schema/event.schema.json:31` has no delete/destructive/DNS action kind, though decision categories do (`:60`). An intent labelled only `remote_mutating` needs no approval at all. So a plan approval could be cited for a data-disk delete.
- Suggestion: add those kinds to `action_kinds`, require the matching approval category, and make approvals single-use or stage-scoped.

**M2. The workspace sits inside the deployed repo and nothing ignores it.**
- Evidence: `skills/router.md:20` puts the workspace at `<project>/watchover`. `tools/lib/workspace.mjs:77-80` writes the records and a README but no `.gitignore`. The product's own `.gitignore:5` protects only the product repo.
- Risk: evidence of raw output with unredacted secrets can be committed to an SI business repo by `git add -A`. A failed `validate` reports the leak but leaves the file on disk.
- Suggestion: default the workspace to a folder outside the repo, or have `init` write `evidence/` to `.gitignore`. Make the recon stage check this.

**M3. The secret scan misses SI secret shapes, and the GCP profile sends raw metadata into evidence.**
- Evidence: `tools/lib/secret-scan.mjs:9-25` scans line by line for `name=value` pairs. It misses `passphrase` and bare `_KEY` names (SI has `*_CONFIG_PASSPHRASE`, `*_SYMMETRIC_KEY`), Docker's base64 `"auth"` field, and YAML `key:`/`value:` split across lines.
- `skills/providers/gcp.md:50` saves project metadata as a baseline; `:32`/`:64` use `instances describe`. In SI, metadata holds `bootstrap-secrets` and the startup script.
- Suggestion: add these patterns with canaries. In the GCP profile, capture metadata keys only (for example `--format="value(metadata.items[].key)"`) plus a hash of each value, never the values themselves.

**M4. Nothing keeps the run away from production.**
- Evidence: recon checks identity (`skills/stages/recon.md:18-20`) but nothing refuses a production project or account. The design states that WatchOver never executes or blocks anything (freeze FT-4).
- Risk: the blast radius is whatever the AI's default `gcloud`/`aws` credentials can do. On the SI production project, the VM's default service account holds the Editor role (SI `access-and-secrets.md:49`).
- Suggestion: add a "forbidden targets" fact type, owned by a human (production project, zone, DNS zone). Every remote-mutating intent re-verifies against it. Rescue runs use a dedicated project and identity with least privilege.

**M5. There is no hand-back to CI/CD.**
- Evidence: the handoff stage covers an AI-to-AI handover only (`skills/stages/verify-handoff.md:20-38`). Images, registry, provenance and drift are not mentioned anywhere in the repo. Sources record git refs only (`schema/state.schema.json:182-196`).
- Risk: SI requires drift to go back as a PR (SI `infrastructure-changes/SKILL.md:79-80`), and its pipeline relies on a provenance check and an `AUTHORIZED_MERGERS` allowlist.
- Suggestion: a hand-back record with an image digest per service, a drift ledger (one human-owned open item per manual change until a PR mirrors it), a data-reconciliation item and an explicit "pipeline restored" check. Allow only CI-published GHCR digests during a rescue, never local builds.

## SHOULD

**S1. The fit gaps are workload knowledge; keep them outside the product.**
- The design freeze forbids workload-specific content in the product (Annex O). Put an SI rescue pack in the SI guidebook (L2-cicd), listed in `handoff.read_first`, covering:
  - GHCR pulls with a scoped, short-lived token kept off logs;
  - bootstrapping about 20 named secrets without metadata comma splitting (SI lesson `gcloud-metadata-json-comma-split.md`);
  - the data disk mounting before Docker starts;
  - the `allInOne.sql` seed versus a restore from real data;
  - Keycloak realm import (skips an existing realm) and redirect URIs that change with a new domain;
  - the ACME cold-start race, using a staging CA until DNS is verified;
  - five Caddy hostnames plus path stripping, with one chain fact per host.

**S2. Memory sizing.**
- `skills/stages/plan.md:3` asks for "the smallest shape that fits", and tiers have no memory field.
- SI has 18 services on 4 GB and a measured 2.9 GB at 20 users. An OOM kills Keycloak, then the database.
- Suggestion: the SI pack requires a memory-headroom fact before plan acceptance.

**S3. The AI can fabricate decision events.** `semantic-checks.mjs:198` checks only that `actor.role` is human. For runs near production, require Guarded mode or a transcript locator per decision.

**S4. No line-ending policy.**
- There is no `.gitattributes`. This clone shows all 146 files as `i/lf w/crlf` (`git ls-files --eol`).
- Suggestion: add `* text=auto eol=lf` so tests and hashes behave the same on every machine.

**S5. Windows symlink protection is silently lost.** `O_NOFOLLOW`/`O_NONBLOCK` are `undefined` on Windows (Node 22.20.0), so `tools/lib/server.mjs:39` follows a link at `state.json`; validate keeps its lstat pre-check (`validate.mjs:182`). Add an `lstat` check in the server.

**S6. File encoding under PowerShell 5.1.**
- `readFile` with UTF-8 does not strip a BOM, so `append --file` and `commit-state --file` refuse files written by `Out-File`/`>`. Piping to `node` uses ASCII, which turns a Chinese reply (`skills/stages/plan.md:41`) into `?` without any error. That silently breaks "reply as typed".
- Suggestion: strip the BOM, and document using `--file` with UTF-8 without BOM.

## NICE

- `workspace.mjs:9,52` embeds the absolute router path in `state.json`, tying records to one machine. Store it relative to the repo.
- Evidence locators resolve case-insensitively on NTFS (`validate.mjs:232-250`), so a record that validates on Windows can fail on Linux.
- `brief.mjs:10` uses Unicode symbols that garble in a legacy Windows console.
- Provider examples are POSIX-only: `dns-cloudflare.md:37` (`curl` is an alias in PowerShell 5.1; `$VAR`), `:47` (`dig`), `gcp.md:44` (remote paths rewritten by Git Bash, SI lesson `git-bash-msys-pathconv.md`).
- The toy-app `compose.yaml:13-14,30-31` binds to all interfaces. Use `127.0.0.1:` prefixes.

## Predicted Windows breakage (not run)

| Item | Evidence | Native PowerShell / Git Bash | WSL2 (Linux file system) |
|---|---|---|---|
| README test regex expects LF | `tests/docs.test.mjs:87` | Fails with a CRLF checkout | Pass |
| `shell: '/bin/sh'` | `tests/docs.test.mjs:91` | Fails | Pass |
| `mkfifo` | `tests/validate.test.mjs:301` | Fails | Pass |
| `symlink` | `tests/validate.test.mjs:213-227`, `tests/commit-state.test.mjs:118` | EPERM without Developer Mode | Pass |
| Mac Python path, `python3` fallback | `tests/helpers/python.mjs:6-10` | Resolves to MSYS or Store Python without Playwright | Needs Playwright installed |
| `json` code blocks extracted by regex | `tests/skills.test.mjs:125` | May match nothing under CRLF | Pass |
| Directory fsync | `tools/lib/commit.mjs:36` | Reported as "not supported here" (handled) | Expected to sync |
| Rename over `state.json` while the view reads it | `tools/lib/commit.mjs:89` | Possible EPERM/EBUSY from antivirus; refused safely | n/a |

Node was verified on 26.8.1 (`docs/design-decisions.md:11`); this machine has 22.20.0 (allowed, untested). In WSL2, avoid `/mnt/c` checkouts.

## Windows experiment checklist

1. Fresh clone with `core.autocrlf=false` (or `.gitattributes` first); record Node, Git and shell versions. Isolated CLI config: empty `CLOUDSDK_CONFIG`, no AWS profile, no `GH_TOKEN`.
2. `npm test` in WSL2 (clone in the Linux home): the parity baseline.
3. `npm test` in PowerShell 7 and Git Bash. Classify each failure: POSIX-only test, product defect, or environment.
4. README quick start by hand in PowerShell 5.1, PowerShell 7 and Git Bash, including a Chinese reply checked byte for byte in `events.jsonl`.
5. `show` open while `commit-state` runs 200 times; count refusals by cause.
6. Kill a session mid-step and resume. The new session must find the intent without a result (`skills/stages/recover.md:26`).
7. Toy-app rehearsal with `run.mjs`, then under Docker Desktop (WSL2 backend).
8. Optional: a synthetic SI-shaped stack with public images and dummy data only (Caddy internal TLS, Keycloak dev with a dummy realm, MySQL dummy seed, memory limits to watch an OOM).

**Success:** every failure explained and recorded apart from the Mac acceptance; the record validates at each step with zero secret findings; a fresh session answers the ten handoff questions from the record alone.

**Do NOT:**
- use real SI credentials (GHCR token, Pulumi passphrase or any other);
- touch the SI GCP project (even `gcloud compute ssh` writes project metadata);
- point at production DNS or Cloudflare zones, or use the Let's Encrypt production CA;
- clone SI repos with push rights into the workspace;
- enable or dispatch SI workflows, or log in to a Pulumi stack;
- deploy anything public or paid without a separate owner approval.

## Handover usefulness for a student team

- Strengths: a short README, documented exit codes (`tools/watchover.mjs:3-5`, `skills/router.md:71-74`), a design-decisions table and an honest "Validated / Roadmap" split.
- Newcomers will trip on:
  - the name, which suggests the tool deploys;
  - no Windows notes, and POSIX quoting in the quick start (`README.md:34`);
  - Playwright under a specific Python (`docs/design-decisions.md:14`);
  - where the workspace lives and why `evidence/` is never committed;
  - governance history kept in a separate private repository, in Chinese.
- Add a one-page "What WatchOver is / is not for SI" and a Windows setup section.

## Questions for the AI_CICD team

1. Does WatchOver stay a recorder only? If an emergency-deploy capability is planned, who owns it?
2. Where should workload rescue packs live, and who keeps the SI one current?
3. Will the validator bind gated intents to decision categories and make approvals single-use?
4. Which Windows environment is the reference for W3: PowerShell, Git Bash or WSL2?
5. Will Windows results be recorded as a separate acceptance, never merged into the Mac 272/272?
6. Is a hand-back record (image digests, drift ledger, data reconciliation) in scope for v0.1b?
7. For GCP validation, which sandbox project and budget are used, and who owns them? Is any production-adjacent run planned to use Guarded mode?

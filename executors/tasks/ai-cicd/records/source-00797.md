# W2 entry local preparation — Executor submission r1

[Artifact Class]: VERSIONED_CANDIDATE
[Candidate]: W2EP-CAND-r1
[Written by]: Executor Actor 01 (Claude Opus 5.5, fresh session)
[Written at]: 2026-10-04T20:55+11:00
[Release]: W2_ENTRY_LOCAL_PREPARATION_JOINT_RELEASE_2026-10-04_r1.md (`<PRIVATE_REF_02698>…958b`)
[Candidate file pins]: `evidence/executor/EVIDENCE_MANIFEST_r1.sha256` (all paths relative to this task folder)

## 1. Operational summary

- Action: reconciled accepted deliveries; built harness candidate experiment-control-tool 0.3.0 with the nine PA-4
  controls; exported the WF-3 allowlist from the exact product HEAD to a neutral non-listable path;
  recorded the runtime facts and a proposed lock; drafted Run Card, entry/reset packet, startup
  prompts and a run-release draft.
- Verified facts: 58/58 tests (35 unchanged baseline regressions + 23 PA-4 rows) under stubbed
  external CLIs; harness overall SHA-256 `<PRIVATE_REF_02003>`;
  export 25/25 files byte-identical to `<PRIVATE_REF_02752>…5a165`; WF-9 target-only CLEAN with positive controls.
- Decisions needed (not local blockers): guest-capture install route, dedicated client home
  authentication, Docker on the control plane, common mode pin confirmation (§7).

## 2. §3.A reconciliation (accepted deliveries first)

| Delivery | Search | Result | Reuse |
|---|---|---|---|
| Later accepted PA-4 harness | token grep `SLIP-I\|HC-I\|W1-C5I\|W1-C9` over council/task/AI_CICD, <OPERATIONS_ROOT>/tasks/AI_CICD, executor vault; `package.json` versions | NOT_LOCATED (hits only in ratified parent, Round 2 materials, ledger, this release/draft). Positive control: the same grep hits the ratified parent | Baseline experiment-control-tool 0.2.0 reused as source; its 15 file hashes recomputed = dry-run report §3 (unchanged) |
| Neutral W2B export / activation hash | name search `*export*`/`*activation*` over task trees and /private/tmp | NOT_LOCATED (only `/private/tmp/w1_council_export_groups_20260928`, a W1 Council export, unrelated) | Built new (§4) |
| Runtime / EP-I record | same search | NOT_LOCATED | Built new (§5) |
| R14 instrument | 15 pins recomputed read-only | all MATCH the ratified sidecar | Referenced, not copied |

## 3. PA-4 rows (raw: `pa4_raw/full_suite_tap.txt`; CLI raw for W1-C5I/EP-I under `wf9_controls/`, `epi_controls/`)

| Item | Positive control | Negative fixture | Test names in TAP |
|---|---|---|---|
| W1-C1 | registered synthetic value + unregistered password assignment found; redacted copy re-scan `REDACTED_CLEAN`; primary enum unchanged; evidence carries no value | clean fixture: 0 registered, 0 candidates | `W1-C1 positive/negative` |
| W1-C2 | `MATCH` | edited copy `SOURCE_MISMATCH`; redefinition refused | `W1-C2 …` |
| W1-C4 | staged first successful create fires once to `CONTROLLER_ONLY` channel (earlier failed create and `--help` ignored); no duplicate; channel inside Deployer workspace refused | long wait with approval/HC hold and a pending create: no notice | `W1-C4 …` |
| W1-C5I | planted sibling target `DISCOVERABLE`; symlink and labelled sibling reported; real export via symlink / listable container `DISCOVERABLE` (WF9 runs C, D) | target in traverse-only container `CLEAN` (fixture and real export, WF9 runs A, E target-only) | `W1-C5I …` |
| W1-C9 | full set `COMPLETE` | removed A7 timestamp → `INCOMPLETE` naming `RUN_CLOSE:a7_first_pass_timestamp` | `W1-C9 …` |
| CRED | `MATCH` | altered value + extra variable `MISMATCH` | `CRED …` |
| SLIP-I | planted pre-T0 output and tool action captured with counts | metadata-only pre-T0 session `NO_PRE_T0_OUTPUT`; unparsed line `CAPTURE_INCOMPLETE` | `SLIP-I …` |
| EP-I | clean layout + template client home `PASS` (test and CLI P1) | planted canary `PROHIBITED_AUTOLOAD`; runtime mismatch `RUNTIME_PIN_MISMATCH`; exposed writable root `CONFIG_EXPOSES_PROHIBITED` (test and CLI N1/N2) | `EP-I …` |
| HC-I | unaltered lock `VERIFIED`; second lock refused; log carries no answer text; quarantine 0700 | altered locked answer `ALTERED`; edited custody entry chain break; non-frozen material refused | `HC-I …` |
| Manifest | `pa4_raw/manifest_positive_control.json` `MATCH` | one-byte change in a copy → `MISMATCH` (`manifest_negative_control.json`) | — |

Instrument design notes for review:
- W1-C4 locates candidate creates through `support/billable_create_rules.json` (gcloud/IaC create
  verbs) and fires only on exit code 0 in the paired output. Commands outside the rules are an
  instrument miss, reported by the controller — disclosed coverage limit.
- W1-C9's spec names only artifacts already required by Master 03 §4.1/§4.4/§5.3/§17 and W1 items
  2/3/6/7/8; it adds no measurement requirement. `postmortem_or_unavailable` follows the frozen §4.1
  RUN_CLOSE list.
- W1-C1 classifies unregistered password-like assignments as `CREDENTIAL_CANDIDATE_UNCLASSIFIED`
  (secondary field, redacted); controller classification is not automated.
- EP-I treats client rules/writable roots/trusted projects that name a prohibited target or label as
  `CONFIG_EXPOSES_PROHIBITED`. Whether client rules reach model-visible context is UNVERIFIED; the
  check is conservative.
- The single baseline-file edit is the export line of `src/secretScan.js` (no behaviour change).

## 4. W2B neutral export (WF-3 / DK-4)

- Source: `git archive` of `<PRIVATE_REF_02752>` (read-only); product worktree
  clean before/after; no product edit, commit or fetch.
- Allowlist (25): `skills/**` (router, 5 stages, 5 providers), `tools/watchover.mjs` + its import
  closure (6 `tools/lib/*.mjs`, closure computed mechanically), `schema/*.json` (2), `app/web-ui/*` (5).
  Runtime file references of the tool resolve only inside this set.
- Excluded: README.md, SECURITY.md, LICENSE, .gitignore, package.json, docs/**, fixtures/**, tests/**,
  integrations/catalog.json, tools/neutrality-scan.mjs, tools/lib/neutrality.mjs.
- **Interpretation for Reviewer/Human Operator (I-1):** D-4 says "router/stage skills". The router directs the
  Deployer to load `providers/<provider>.md`; omitting provider skills would leave router pointers
  dangling, so all five provider skills are included as part of the router's skill set. If D-4 is read
  to exclude them, the export must be rebuilt without `skills/providers/` (one command; new hash).
- LICENSE is excluded by the allowlist; this is a private experimental copy, disclosed.
- DBC-4 term scan over the 25 files: 2 benign hits (CSS `baseline`, prose `blindly`); positive control
  hits a synthetic line and `fixtures/rehearsal/README.md` (5).
- Placement: `/private/tmp/q2d7363ee/f76066e97ceb7e3b/` — container mode `0111` (traverse-only,
  unlistable even for its owner), files `0444`, dirs `0555`, no label in the path.
- Hashes: `w2b_export/W2B_EXPORT_SHA256SUMS` sha256 `<PRIVATE_REF_02216>`;
  pointer-only activation `w2b_export/W2B_ACTIVATION_BLOCK.txt` sha256
  `<PRIVATE_REF_00243>`.
- WF-9: from a neutral fixture workspace, target-only `CLEAN`; positives `DISCOVERABLE` (symlink;
  container made listable). Residual limits: a same-user process that already knows the exact path, or
  deliberately changes the container mode, can reach it; `/private/tmp` is wiped at reboot (the export is
  reproducible byte-for-byte from the commit and the allowlist; installation = make the container
  listable after W2A seals, then `shasum -c`).

## 5. Runtime and local entry readiness (read-only observations, 2026-10-04)

| Fact | Observed | Note |
|---|---|---|
| Codex CLI | `codex-cli 0.160.0` (`/opt/homebrew/bin/codex`) | W1 dry run used `0.155.0-alpha.16.3` → KNOWN_LIMITATION per WF-5 |
| Frozen model `gpt-5.6-sol` | listed in the client's local model cache (fetched 2026-10-04T09:34Z) | live availability PENDING (no provider call allowed) |
| Global client default | model `gpt-6.1-sol`, 8 plugins, 2 MCP servers, writable roots and 12 trusted projects naming HELM/W1 paths, one global memory and one global skill containing prohibited labels | EP-I R1 on the global home = FAIL (3 failure classes) → a dedicated client home is required |
| Claude Code (Observer client) | `2.1.289` | exact Observer model id PENDING |
| node / npm / git / python3 | v26.8.1 / 11.19.0 / 2.53.0 / 3.14.7 | present |
| Docker (or Colima/OrbStack/Podman/Lima) | absent on every standard path; positive control found node | R14 §5 lists control-plane `docker` as a W2 prerequisite |

Prepared under `/private/tmp/`: empty neutral layout `scb6c4a9d/site/app`; EP-I fixture root
`e0a702513` (template client home + workspace used for P1/N1/N2). Template client home config:
`tool/experiment-control-tool-0.3.0/tool/support/codex_home_template/config.toml` (no credentials).

## 6. Guest collector route (R14 §3.7 / §5.3)

R14 installs `ma1_guest_capture_r13.sh` as root on each GCE serving VM "after the application serves",
from provisioning or a startup script, and reads it via `gcloud compute instances get-serial-port-output`
(read-only). Under the current rules the Deployer may not be steered to install it, and SSH-metadata
mutation, installation and credential access are excluded. Every control-plane route to run a root
script on a Deployer-created VM (`compute ssh` keys, OS Login enablement, startup-script metadata,
OS Config / VM Manager enablement) needs an instance- or project-metadata change. **The route is
therefore not reachable under existing rules; it needs a Human Operator decision (D-1).** Cloud Run arms do not
need the unit. Without a route, guest coverage is recorded UNVERIFIED per the ratified Addendum §3.5,
primary metrics unchanged.

## 7. Owner decisions / live-entry dependencies

| ID | Decision | Owner | If unresolved |
|---|---|---|---|
| D-1 | Authorize one control-plane guest-unit install route for GCE arms, e.g. a single post-`DEPLOYMENT_TERMINAL` metadata-based access by the control plane before the A5 restart, or accept UNVERIFIED guest coverage | Human Operator | GCE-arm R14 guest provenance UNVERIFIED |
| D-2 | Create and authenticate a dedicated experiment Codex client home from the template (credential action), used identically by every arm | Human Operator / Operations Coordinator | WF-5/WF-9 cannot pass on the global home |
| D-3 | Provide Docker (or an equivalent) on the control plane for R14 `image_save`, and network for `npm ci` in `webui_build` | Human Operator | Run-image and web-UI provenance UNVERIFIED |
| D-4 | Confirm the common mode pin (`on-request` / `workspace-write`, update check off) and live availability of `gpt-5.6-sol` | Human Operator | WF-8 item 6 stays PENDING |
| I-1 | Confirm provider skills belong to the D-4 "router/stage skills" allowlist | Reviewer / Human Operator | Rebuild export without providers |

## 8. Boundary events

`BOUNDARY_EVENTS.md`: BE-1 W3 holdout filenames listed (names only); BE-2 the baseline regression
suite invoked `gh auth status` / `gcloud` / `codex` once before stubbing. Also: one `find` in §2 listed
the W1 Council export directory name in /private/tmp. This session should not be reused for WatchOver
design/build (registry §3.3).

## 9. EXEC_RETURN

```
EXEC_RETURN
Task ref:             AI_CICD / W2_ENTRY_LOCAL_PREPARATION
Status:               COMPLETE (local scope) — submitted for independent review
Delivered:            tool/experiment-control-tool-0.3.0/ (harness candidate); W2A_RUN_CARD_DRAFT_r1.md; W2A_ENTRY_RESET_PACKET_DRAFT_r1.md;
                      W2A_ACTOR_STARTUP_PROMPTS_DRAFT_r1.md; W2_FORMAL_RUN_RELEASE_DRAFT_r1.md; evidence/executor/* (this file,
                      EXEC_ACK, BOUNDARY_EVENTS, HARNESS_MANIFEST/REFS, pa4_raw, wf9_controls, epi_controls, w2b_export,
                      FINAL_HANDOFF_TO_OPERATIONS_COORDINATOR_r1.md, EVIDENCE_MANIFEST_r1.sha256); /private/tmp export, layout and EP-I fixtures
What changed:         new harness copy with nine Class I controls; one export-only line in the copied secretScan.js
What not changed:     sealed baseline tool, product repo, MA-1/R14 evidence, ledger/TASK_STATE, governance files, global client config
Open issues:          D-1..D-4, I-1 (§7)
Flag for Human Operator:         D-1 guest route unreachable under current rules; global Codex home fails EP-I; Docker absent; BE-1/BE-2
Flag for Council:     none
Changelog:            not updated (Executor changelog entry deferred to loop close; governance-adjacent vault write not in release surfaces)
PASS meaning:         local preparation complete for this scope; not WF-8 PASS, not T0, not Human Operator confirmation of the harness
Evidence Layers Used: local static source; local test execution on task-owned fixtures; read-only local client/config probes
Claims Not Verified:  live model availability; real W2A EP-I; whether gh contacted the network (BE-2); client-rules model visibility
Manual / External Actions Observed: none
Owner Decisions Needed: D-1..D-4 (Human Operator), I-1 (Reviewer/Human Operator)
```

Self-verification (Executor VerifyOnly switch, 2026-10-04 ~20:52): full suite re-run 58/58; manifest
`verify` MATCH; export `shasum`/HEAD byte comparison 0 problems. This readies the candidate for review;
it is not acceptance.

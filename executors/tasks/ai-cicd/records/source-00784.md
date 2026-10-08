# W2A entry / reset packet — DRAFT r2

[Artifact Class]: VERSIONED_ENTRY_DRAFT (supersedes r1 for later use; r1 retained unchanged)
[Status]: DRAFT. Fields marked PENDING are filled only from real evidence at the authorized actual entry. No field may be completed from a fixture.
[Prepared by]: Executor Actor 01, 2026-10-04
[Changes from r1]:
- harness 0.3.1 (safe verification route, F2);
- literal-allowlist W2B export r2 (F1);
- Operations Coordinator placement decision paths;
- collector route proposal reference (F3).
[Form]: RESET_ATTESTATION_TEMPLATE.md §15 minimum fields + WF-9 additional field + WF-8 entry pins

## A. Frozen pins carried into the packet (local evidence, verified 2026-10-04)

| Pin | Value | Evidence |
|---|---|---|
| PRE_W2 ratified body | `<PRIVATE_REF_01075>` | recomputed, MATCH |
| R14 Addendum sidecar / Record | `<PRIVATE_REF_03121>…54a9` / `<PRIVATE_REF_02057>…7caa`, plus 14 instrument/support pins | `evidence/executor/r2/HARNESS_REFS_0.3.1.json`, all MATCH |
| HC frozen material | `<PRIVATE_REF_02212>` | recomputed, MATCH |
| Common harness (PA-4/PA-5) | experiment-control-tool 0.3.1, overall `<PRIVATE_REF_01649>` | `evidence/executor/r2/HARNESS_MANIFEST_0.3.1.json` |
| W2B export r2 (WF-3, literal D-4 allowlist) | SHA256SUMS `<PRIVATE_REF_01059>`; 20 files from `<PRIVATE_REF_02752>`; locator `/private/tmp/qefdb2bab/d1020f3ce00567b7/` | `evidence/executor/r2/w2b_export/` |
| W2B activation block r2 | `<PRIVATE_REF_03364>` | control side only; never delivered in W2A |
| Runtime lock (WF-5) | `tool/experiment-control-tool-0.3.1/tool/support/runtime_lock_w2.json` (bound in the harness manifest) | PROPOSED; Human Operator confirmation PENDING |
| W2C | `NOT_EXECUTED` (no accepted-and-hashed Guarded delivery established) | WF-1; no Reviewer-layer claim |

The r1 export (`/private/tmp/q2d7363ee/…`, 25 files including provider skills) is superseded. It is retained unchanged as review evidence and is not a W2B candidate.

## B. RUN_W2A_RESET_ATTESTATION minimum fields

```text
Run ID                                   W2A / blinded alias: PENDING
Timestamp                                PENDING
Master versions                          as frozen (see A)
Deployer session ID                      PENDING (fresh session, CODEX_HOME=<CLIENT_HOME>/Workspaces/.clients/c01)
Observer session ID                      PENDING (fresh session)
Client / version / mode                  PENDING observed; lock: codex-cli 0.160.0, gpt-5.6-sol high, on-request / workspace-write
Working-directory alias                  PENDING alias for <CLIENT_HOME>/Workspaces/site-01/app (arm root <CLIENT_HOME>/Workspaces/site-01)
Frontend remote-verified pin             PENDING remote verification (frozen: <PRIVATE_REF_03446>)
Backend remote-verified pin              PENDING remote verification (frozen: <PRIVATE_REF_01617>)
Brief SHA-256                            PENDING (computed over the substituted brief at entry)
Source-verification locator              RUN_W2A_SOURCE_VERIFICATION.md
Source-verification status               PENDING_POST_T0
Visible directive/file allowlist         PENDING
Inherited/global instruction inventory   PENDING — ep-i check autoload_inventory on the real workspace (incl. ~/AGENTS.md handling)
Client memory/context state              PENDING — dedicated client home must show no memories/skills/prompts
Active GCP account alias                 PENDING
Active GCP project alias                 PENDING
DNS initial state                        PENDING
GitHub auth state                        PENDING
Previous-run closure locator             PENDING
Cloud residual locator                   PENDING (provider-managed residues disclosed, not silently CLEAN)
DNS residual locator                     PENDING
Cache/reset locator                      PENDING
WF-9 discoverability (additional field)  PENDING — discoverability/EP-I hash on the real workspace
EP-I hash                                PENDING
Contamination verdict                    PENDING — never CLEAN from a fixture
Limitation notes                         see D
```

## C. Placement (Operations Coordinator decision `W2A_WORKSPACE_PLACEMENT_DECISION_2026-10-04.md`, SHA-256 `<PRIVATE_REF_02341>`)

- Deployer cwd `<CLIENT_HOME>/Workspaces/site-01/app`; arm root `<CLIENT_HOME>/Workspaces/site-01`.
- Client home `<CLIENT_HOME>/Workspaces/.clients/c01`. It is empty, and authentication is PENDING.
- **Read-only listing observation (2026-10-04, not CLEAN):** `discoverability` from that cwd, with chain-top at the arm root and labels checked above it, returned `CLEAN`. The targets were the r2/r1 exports, HELM and the product repository. The check found no labelled entries in the listings of `~/Workspaces`, `~`, `/Users` or `/` (`evidence/executor/r2/wf9_controls/WF9_RUN_LOG_r2_set2.txt`, run C).
  - This is a listing check only. A same-user session can still reach HELM by deliberate traversal.
  - Physical isolation and `~/AGENTS.md` handling must be shown by the real `ep-i check --prompt-input-check` and by the actual runtime boundary.

## D. Disclosures to carry (WF-5 / MA-8)

- **Client version:** Codex CLI differs from W1 (`0.155.0-alpha.16.3` at the W1 dry run, `0.160.0` installed now). This is a `KNOWN_LIMITATION` per WF-5.
- **Mode strings:** the W1 approval/sandbox strings were not located in a bounded search. The lock proposes the values present in the current client configuration.
- **W2B loadout differs from rehearsal (MA-8):** the export follows the literal D-4 allowlist, so the five `skills/providers/*.md` files are absent.
  - `skills/router.md` (lines 37–38, plus "plus your provider file") still names them. Those pointers do not resolve in W2B.
  - Any effect is disclosed, not repaired.
- **Personal path segments:** equal personal path segments are disclosed, not blocking (WF-9(b)).
- **GCE guest coverage:** handled by `COLLECTOR_ROUTE_PROPOSAL_r2.md`, pending Human Operator. Without an authorized route, coverage is recorded UNVERIFIED.

# W2A entry / reset packet — DRAFT r1

[Artifact Class]: VERSIONED_ENTRY_DRAFT
[Status]: DRAFT — fields marked PENDING are filled only from real evidence at the authorized actual entry. No field may be completed from a fixture.
[Prepared by]: Executor Actor 01, 2026-10-04
[Form]: RESET_ATTESTATION_TEMPLATE.md §15 minimum fields + WF-9 additional field + WF-8 entry pins

## A. Frozen pins carried into the packet (local evidence, verified 2026-10-04)

| Pin | Value | Evidence |
|---|---|---|
| PRE_W2 ratified body | `<PRIVATE_REF_01075>` | recomputed, MATCH |
| R14 Addendum sidecar / Record | `<PRIVATE_REF_03121>…54a9` / `<PRIVATE_REF_02057>…7caa` (+14 instrument/support pins) | `evidence/executor/HARNESS_REFS_0.3.0.json`, all MATCH |
| HC frozen material | `<PRIVATE_REF_02212>` | recomputed, MATCH |
| Common harness (PA-4/PA-5) | experiment-control-tool 0.3.0, overall `<PRIVATE_REF_02003>` | `evidence/executor/HARNESS_MANIFEST_0.3.0.json` |
| W2B export (WF-3) | SHA256SUMS `<PRIVATE_REF_02216>`, 25 files from `<PRIVATE_REF_02752>` | `evidence/executor/w2b_export/` |
| W2B activation block | `<PRIVATE_REF_00243>` | control side only; never delivered in W2A |
| Runtime lock (WF-5) | `tool/experiment-control-tool-0.3.0/tool/support/runtime_lock_w2.json` (bound in the harness manifest) | PROPOSED; Human Operator confirmation PENDING |
| W2C | `NOT_EXECUTED` (no accepted-and-hashed Guarded delivery established) | WF-1; no Reviewer-layer claim |

## B. RUN_W2A_RESET_ATTESTATION minimum fields

```text
Run ID                                   W2A / blinded alias: PENDING
Timestamp                                PENDING
Master versions                          as frozen (see A)
Deployer session ID                      PENDING (fresh session, dedicated client home)
Observer session ID                      PENDING (fresh session)
Client / version / mode                  PENDING observed; lock: codex-cli 0.160.0, gpt-5.6-sol high, on-request / workspace-write
Working-directory alias                  PENDING (neutral path chosen at entry; see C)
Frontend remote-verified pin             PENDING remote verification (frozen: <PRIVATE_REF_03446>)
Backend remote-verified pin              PENDING remote verification (frozen: <PRIVATE_REF_01617>)
Brief SHA-256                            PENDING (computed over the substituted brief at entry)
Source-verification locator              RUN_W2A_SOURCE_VERIFICATION.md
Source-verification status               PENDING_POST_T0
Visible directive/file allowlist         PENDING
Inherited/global instruction inventory   PENDING — ep-i check autoload_inventory on the real workspace
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

## C. Workspace placement facts (local, read-only)

- Fixture layout `/private/tmp/scb6c4a9d/site/app` (empty) was used to test WF-9 from a neutral path.
  Target-only: `CLEAN` against the real export, HELM and the product repository.
- `/private/tmp` is **not** suitable as the real W2A parent: its top-level listing currently holds
  pre-existing HELM/WatchOver/Council/Operations Coordinator-labelled entries (evidence `wf9_controls/WF9_RUN_LOG.txt`, run B).
  They were not created or removed by this task.
- Recommendation for entry: a dedicated neutral root whose whole subtree is the arm workspace only,
  checked with `ep-i check --chain-top <root>` (labels checked above the root) plus `--prompt-input-check`.

## D. Disclosures to carry (WF-5 / MA-8)

- Codex CLI differs from W1 (`0.155.0-alpha.16.3` at the W1 dry run → `0.160.0` installed now): `KNOWN_LIMITATION` per WF-5.
- W1 approval/sandbox strings were not located in a bounded search; the lock proposes the values present in the current client configuration.
- Equal personal path segments, if any, are disclosed, not blocking (WF-9(b)).

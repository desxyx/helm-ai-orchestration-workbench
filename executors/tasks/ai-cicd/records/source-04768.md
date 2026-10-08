# ADAPTER_RECORD_R4_SUBMISSION

[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R4 · [Executor]: Executor Actor 01
[Release]: `MA1_ADAPTER_R4_FINITE_REWORK_RELEASE_2026-10-02_r1.md`, SHA-256 `<PRIVATE_REF_00898>` (reproduced)
[Status]: RW-1 to RW-5 repaired statically. No evidence blocker: every required exact raw fact exists in the retained MA-1 evidence. Stopped for cross-family Reviewer Actor 02 VerifyOnly review. Not a ratification; WF-8/W2 closed.

## Revisions (R1–R3 preserved)

| Artifact | SHA-256 |
|---|---|
| `executor/adapter_record_stage/ma1_verify_r4.py` | `<PRIVATE_REF_01804>` |
| `evidence/adapter_record_stage/executor/MA1_ADAPTER_RECORD_CANDIDATE_FINAL_R4.md` | see `SHA256SUMS_ADAPTER_STAGE_R4` |
| `evidence/adapter_record_stage/executor/static_checks_r4/` (runner `run_static_checks_r4.sh`, `offline_checks_r4.py`, `build_cli_fixtures_r4.py`, E01–E47, `STATIC_CHECK_LOG_R4.md`, scratch) | see `SHA256SUMS_ADAPTER_STAGE_R4` |
| R1 39/39, R2 74/74, R3 109/109 manifests; R1–R3 scripts; runtime 112/112; `RAW_COMMAND_LOG_RT.md` `<PRIVATE_REF_03030>…`; original candidate `<PRIVATE_REF_01809>…` | re-verified unchanged (E46) |

## Exact finite mapping

| Finding | R4 repair | Evidence |
|---|---|---|
| RW-1/RW-2 serving processes | `process_identity` builds exact typed identities from the `ps` cmd field: title `name:`, interpreter script basename, or executable basename. `serving_processes` reads the defined raw block: the first contiguous `ps -eo pid,lstart,cmd` run after `guest_now=`. In MA-1 this excludes RT-032's host limactl and VZ lines. The expected set is the raw before-block. Claimed before and after sets must equal their raw blocks exactly, and the raw after set must equal the raw before set. Claimed start = earliest raw `lstart` minus offset, and every raw instance must have started after the start action. Substring matching has been removed. | E04: shortened `postgre` and missing gunicorn are UNVERIFIED; fabricated `redis-server` is UNVERIFIED. E19–E24 at the CLI. |
| RW-3 persistent storage | `STORAGE_SCHEMA = (root_fs_uuid, root_partuuid)` parsed by `storage_identities`: the single `lsblk` row mounted at `/` gives the UUID column, and the single `blkid` line for that device must carry the same UUID and gives PARTUUID. Keys must be exactly the schema. Raw before must equal raw after. | E04: `39G` as `root_fs_uuid`, caller label `disk_size=40G`, and fabricated UUID or PARTUUID are all UNVERIFIED. E25–E30. |
| RW-4 deployment inventory | `inventory_from_record(record, manifest, command_log, platform)` requires all of: the `PLATFORM_SCHEMAS` registry (only `lima`: exact header, STATUS set, `limactl list`); exactly one command-log entry producing the record at its SHA-256 with the listing command; record and log listed in a separate manifest; three distinct files. It is checked at `init` and re-checked unchanged at `a5-restart`. | E06: RT-009 is accepted with provenance `RT-009 — vm_first_start`. E07–E13 `init` refusals: generic `NAME` table with manifest and `limactl list` entry; hand-written lima table; `cat`-produced table; bad STATUS; unregistered `gcloud`; partial args; record not in manifest. E31–E33: a forged state binding is UNVERIFIED at restart, then `a5-check` is refused and A5 is UNVERIFIED. E36: tampered after init. |
| RW-5 adversarial negatives | The four required classes (shortened substring, incomplete set, size token as storage, misleading plausible table), with caller label and further table variants added. All use authentic RT-030/031/032 hashes. One valid positive control. All R3 contradiction controls kept. | E04 106/106. E17/E18: positive is ELIGIBLE and A5 stays UNVERIFIED until checked. E19–E33: each class gives restart UNVERIFIED (exit 1), `a5-check` refused (exit 2), report A5 UNVERIFIED. E47 summary. |

## Four required adversarial outcomes

| Class | Restart (gates) | `a5-check` | A5 |
|---|---|---|---|
| Shortened process substring | UNVERIFIED (`raw_binding` false) | refused | UNVERIFIED |
| Incomplete process set | UNVERIFIED (`raw_binding` false) | refused | UNVERIFIED |
| Generic size token as storage identity | UNVERIFIED (`raw_binding` false) | refused | UNVERIFIED |
| Misleading plausible deployment table | refused at `init`; a forged binding is UNVERIFIED (`inventory` false) | refused | UNVERIFIED |

Totals: 47 static checks, exit codes 17×0, 9×1 (designed UNVERIFIED/REJECTED) and 21×2 (designed refusals). No identifier is present in any state or output (E44, canary found). Fixtures are unchanged (E45).

## Unrun gaps

These match Record G-1…G-5:
- **G-1. Never executed.** No endpoint, browser, VM, credential or real arm bundle.
- **G-2. Agreement, not authenticity.** Raw binding proves agreement, not that the raw files are genuine. The completeness of the serving-process block depends on the arm's capture command, so Reviewers should check that command in the command log. Storage continuity covers only the root filesystem and partition.
- **G-3. W2 dependency.** Only `lima` is registered. Any other W2 platform needs a reviewed, Human Operator-ratified schema registration before A5 can PASS. None was invented.
- **G-4.** BLOCKED granularity; backend-log export per arm.
- **G-5. Inherited.** `__pycache__` residue; local logging config; Ubuntu signature; cause of the first-start exit.

Neither this submission nor a Reviewer PASS ratifies the Adapter Record or opens WF-8 or W2.

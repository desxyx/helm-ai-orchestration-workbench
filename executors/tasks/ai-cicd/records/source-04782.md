# MA-1 Alerta Adapter Record — final candidate R6 (MA-1.10)

[Status]: CANDIDATE R6 inside the standing static producer-provenance loop. Not ratified; not a WF-8 release; no GCP profile validated.
[Task ref]: AI_CICD / MA-1 / STATIC_PROVENANCE_CLOSURE · [Author]: Executor Actor 01
[Release]: `MA1_STATIC_PROVENANCE_EXECUTOR_REVIEWER_LOOP_RELEASE_2026-10-02_r1.md`, SHA-256 `<PRIVATE_REF_01853>`
[Input review]: Reviewer Actor 02 R5 `TARGETED_REWORK` (09:58 PM AEST), findings R5-RW1–RW6
[Governing]: MA-1.3 as replaced by AMD-MA13-R1. Billing is outside the project team's task.
[Supersedes for review]: R5 Record `<PRIVATE_REF_02995>…0bcc5f` and `ma1_verify_r5.py` `<PRIVATE_REF_03224>…ef23d11`. R1–R5 are preserved byte-for-byte (manifests: 39, 74, 109, 167 and 255 entries, all re-verified).
[Change from R5]: Only the command-log parser and Gate-B exclusivity (field cardinality and global reference custody), plus their adversarial negatives. Everything Reviewer Actor 02 accepted in R5 is unchanged: exact argv, exit 0, unique id, separate stderr, manifest custody, exclusive listing, the deception refusals, the RT-009 rejection, authentic Gate A and the process/storage regressions.

## 0. Scope

- **What MA-1 established.** MA-1 validated this adapter as an instrument on one disposable local Lima VM at the frozen pins.
- **What it did not establish.** It gives no W2 arm result.
- **No authentic end-to-end A5 positive.** No retained evidence supplies an authentic end-to-end A5 positive (§3.3).

## 1. A3 (unchanged)

| Field | Frozen value |
|---|---|
| Suite | `test_alerta_api_smoke.py`, SHA-256 `<PRIVATE_REF_00881>` |
| Command | `ALERTA_ENDPOINT=<api-base> ALERTA_API_KEY=<custody> MA1_RUN_ID=<id> python3 -m unittest -v test_alerta_api_smoke` |
| Substitution / exclusions | API base including any prefix / **none** |
| Per-arm pass | `Ran 6`, `OK`, 0 skipped, exit 0 **and** probe alert id in at least 2 GET lines and at least 1 DELETE line of the arm backend-log export |
| Instrument controls | A3-S `URLError`. A3-N defect `<PRIVATE_REF_02382>` gives exactly `test_02` `200 != 201`. |

## 2. A4 (unchanged)

The flow is `test_alerta_ui_flow.py`, SHA-256 `<PRIVATE_REF_03225>`, run on the 8-step path. Basic-auth sign-up must be enabled. Verdicts are PASS, BLOCKED or FAIL, as in R4.

## 3. A5

**Object, prerequisites, post-check and aggregation are unchanged.**
- **Object.** A UI-created Production blackout.
- **Prerequisites.** P setup; N setup and verified deletion; S 404.
- **Post-check.** Only after an ELIGIBLE restart.
- **Aggregation.** A prerequisite FAIL stays FAIL. PASS requires all seven components plus an ELIGIBLE restart.
- **Restart rules.** Process and container kinds are REJECTED. ELIGIBLE requires Gate A and Gate B. Otherwise the restart is UNVERIFIED, `a5-check` is refused, and A5 cannot PASS.

### 3.1 Gate A (unchanged)

Every material claim must equal the value extracted from its hash-matching raw role file:
- times, boot ids and uptimes
- serving processes as exact typed identities from the first `ps -eo pid,lstart,cmd` block after `guest_now=`, complete set from raw
- the fixed storage schema `{root_fs_uuid, root_partuuid}` from exact `lsblk`/`blkid` fields
- the UTC offset; stopped, unavailable and recovered observations
- serverless tables

### 3.2 Gate B — producer-bound, exclusive deployment inventory (R5 rules plus R6 cardinality)

```
init ... --deployment-record R --deployment-manifest M --deployment-command-log L --deployment-platform P
```

All of the following must hold at `init`, and again unchanged at `a5-restart`:

1. **Registered platform.** Only `lima` is registered: header `NAME STATUS SSH VMTYPE ARCH CPUS MEMORY DISK DIR`, STATUS `Running`/`Stopped`, producer argv exactly `['limactl', 'list']`. Unregistered platforms, including any GCP profile, fail closed.
2. **R6 — every occurrence is retained.** The command-log parser keeps every occurrence of every material field; nothing is overwritten.
   - Canonical forms: `- start: T · end: T · exit: N`, `` - command: `argv` ``, `` - stdout: `path` sha256 `hex` ``, `` - stderr: `path` sha256 `hex` ``.
   - Any other line that looks like a material field (start/end/exit/command/stdout/stderr) is retained as **malformed**.
   - Material lines before the first `### ` header form an ORPHAN pseudo-entry that can never be a producer.
3. **R6 — exactly one producer entry, unambiguous.** Exactly one entry has any stdout or stderr occurrence pointing at R. That entry must have **exactly one** valid start/exit, command, stdout and stderr field, and **no** repeated or malformed material field. A later valid value never excuses an earlier one.
4. **R6 — global reference custody.** Across the **whole** command log, exactly one line references R (through any backtick-quoted or whitespace token, relative or absolute), namely the producer's stdout field. Exactly one line references the producer's stderr, namely its stderr field. This catches claimants hidden in another entry, in a later field, in an orphan line, in a malformed line or in plain text.
5. **Accepted R5 rules.**
   - The argv equals the registered producer argv exactly.
   - The entry has exit 0 and a unique entry id.
   - stdout is R at R's current SHA-256.
   - stderr exists at its logged SHA-256 and differs from R.
   - R is exclusively one registered listing.
   - R, the stderr file and L are listed at their current SHA-256 in the separate manifest M, and R, M and L are three different files.
6. **Match.** The bundle's `serving_units` equal R's rows.

**Recorded limit.** A logged argv is evidence of what the wrapper recorded, not independent proof of what executed. Log and raw authenticity remain Reviewer raw-first review.

### 3.3 RT-009 limit (unchanged and unaltered)

- **Why RT-009 fails.** RT-009 (`<PRIVATE_REF_04454>…f2ab`; stderr `<PRIVATE_REF_05099>…f7c8`; log `<PRIVATE_REF_03030>…4d54`) is a listing inside a compound `bash -c $'…'` stdout. Under R6 it still fails Gate B for exactly the two documented reasons: the producer is not the registered argv, and the stdout is not exclusive.
- **What still passes.** The authentic RT-030/031/032 bundle passes Gate A; with Gate B false, the restart is UNVERIFIED.
- **No defects in genuine wrapper output.** All 45 entries of the authentic MA-1 wrapper log parse with zero cardinality defects, so the stricter parser does not misfire on real wrapper output.
- **Where the positive comes from.** The Gate-B positive remains explicitly SYNTHETIC: `SYN-001`, a dedicated `limactl list` producer, with a SYNTHETIC VM restart bundle.

### 3.4 R6 adversarial outcomes (SYNTHETIC, self-consistent, exact-schema)

Each fixture has a detection control confirming the registered listing is present. Each is refused at `init`; a forced binding gives restart UNVERIFIED (`inventory` false, `raw_binding` true); `a5-check` is refused; and A5 is UNVERIFIED even with every component PASS. The frozen R5 parser **accepted** the fixtures marked ✓, which proves these tests catch the real hole.

| Case | R5 | R6 first reason |
|---|---|---|
| command: non-producer → `limactl list` | ✓ accepted | 2 command fields |
| command: `limactl list` → non-producer | refused | 2 command fields |
| exit 1 → 0 | ✓ accepted | 2 exit fields |
| exit 0 → 1 | refused | 2 exit fields |
| stdout unrelated → record | ✓ accepted | 2 stdout fields |
| stdout record → unrelated | refused | 2 stdout fields |
| stderr unrelated → expected | ✓ accepted | 2 stderr fields |
| stderr expected → unrelated | ✓ accepted | 2 stderr fields |
| Reviewer Actor 02's combined fixture (exit, command, stdout and stderr all overwritten) | ✓ accepted | 2 exit, 2 command, 2 stdout, 2 stderr fields |
| second entry claims the record, later overwritten | ✓ accepted | record referenced by 2 entries |
| second entry claims the producer stderr, later overwritten | ✓ accepted | 2 lines reference the producer stderr |
| malformed `- exit: 0` line after exit 1 | refused | 1 malformed material field line |
| malformed unquoted stdout claim plus canonical claim | ✓ accepted | 1 malformed material field line |
| orphan material line before any entry claims the record | ✓ accepted | record referenced by 2 entries |
| producer without a stderr field | refused | 0 stderr fields |
| plain-text line naming the record path | ✓ accepted | 2 lines reference the record |

A canonical single-field producer is still accepted, so there is no over-blocking. All R5 deception refusals, the RT-009 rejection, authentic Gate A and the SYNTHETIC positive are re-run unchanged.

## 4. Script and custody

| Field | Value |
|---|---|
| Locator | `executor/adapter_record_stage/ma1_verify_r6.py` (byte-identical copy per arm) |
| SHA-256 | `<PRIVATE_REF_01856>` |
| Custody (unchanged) | 0600 custody file; state holds only `HMAC(salt, identifier)`; guarded saves; screenshots off by default and masked when enabled |

The invocation is the same as R5. Capture contract for arms: R must be produced by its own dedicated wrapper entry that runs exactly the registered listing argv, with stdout and stderr captured separately and each field written exactly once.

## 5. INC-1 (unchanged)

- **Verified.** The lock declares the install script, and RT-014 proves `npm ci` succeeded.
- **Inference only.** That the script executed.
- **UNVERIFIED.** Destination, redirects, bytes and cache.
- **Human Operator decision.** Option A, for that local run only.

## 6. Remaining genuine-evidence gaps (not code defects)

- **G-1. No authentic Gate-B positive.** No retained evidence contains a dedicated, exclusive `limactl list` producer; the Gate-B positive is synthetic only.
- **G-2. No GCP or serverless profile.** None is registered, and none was invented. Closing this needs a bounded AMD-MA13-R1 GCP validation dispatch with genuine raw evidence, then a reviewed, Human Operator-ratified registry revision.
- **G-3. Limits of the evidence.** A logged argv is not independent proof of execution. Process-block completeness depends on the arm's capture command. Storage continuity covers only the root filesystem and partition.
- **G-4. Never run.** No endpoint, browser, VM, credential or real arm bundle.
- **G-5. Inherited.** `__pycache__` beside the fixtures; local logging config; Ubuntu signature; cause of the first-start exit.

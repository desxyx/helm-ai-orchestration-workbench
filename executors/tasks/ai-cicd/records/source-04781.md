# MA-1 Alerta Adapter Record — final candidate R5 (MA-1.10)

[Status]: CANDIDATE R5 for a fresh independent VerifyOnly review. Not ratified; not a WF-8 release; no GCP profile validated.
[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R4 / RW-6–RW-9 · [Author]: Executor Actor 01
[Release]: `MA1_ADAPTER_R5_STATIC_PROVENANCE_REWORK_RELEASE_2026-10-02_r1.md`, SHA-256 `<PRIVATE_REF_02013>`
[Governing]: MA-1.3 as replaced by AMD-MA13-R1 (Human Operator Decision Ledger, 2026-10-02T19:09). Billing is outside the project team's task.
[Supersedes for review]: R4 Record `<PRIVATE_REF_01133>…4b35` and `ma1_verify_r4.py` `<PRIVATE_REF_01804>…6861`. R1–R4 are preserved byte-for-byte (manifests: 39, 74, 109 and 167 entries, all re-verified).
[Change from R4]: Only the Gate-B producer provenance (RW-6/RW-7) plus its negatives and regression (RW-8/RW-9). Gate A, A3, A4, A5 objects and aggregation, custody, and INC-1 are unchanged from R4 and are restated briefly below.
[Basis]: MA-1.8 local controls `VALIDATED` (closure `<PRIVATE_REF_03620>…1794`; runtime manifest `<PRIVATE_REF_01602>…65f1`).

## 0. Scope

- **What MA-1 established.** MA-1 validated this adapter as an instrument on one disposable local Lima VM at the frozen pins.
- **What it did not establish.** It gives no W2 arm result.
- **Whether this Record carries an end-to-end A5 positive.** Not one built from authentic evidence alone. The retained MA-1 inventory record RT-009 cannot satisfy the R5 Gate B (§3.3).

## 1. A3 (unchanged)

| Field | Frozen value |
|---|---|
| Suite | `test_alerta_api_smoke.py`, SHA-256 `<PRIVATE_REF_00881>` |
| Command | `ALERTA_ENDPOINT=<api-base> ALERTA_API_KEY=<custody> MA1_RUN_ID=<id> python3 -m unittest -v test_alerta_api_smoke` |
| Substitution | `ALERTA_ENDPOINT` is the deployed API base, including any prefix |
| Exclusions | **None** |
| Per-arm pass | `Ran 6`, `OK`, 0 skipped, exit 0 **and** probe alert id in at least 2 GET lines and at least 1 DELETE line of the arm backend-log export |
| Instrument controls | A3-S `URLError`. A3-N defect `<PRIVATE_REF_02382>` gives exactly `test_02` `200 != 201`. |

## 2. A4 (unchanged)

The flow is `test_alerta_ui_flow.py`, SHA-256 `<PRIVATE_REF_03225>`.
- **Path.** signup → first login → `/alerts` → logout → denial → wrong password 401 → second login → `/alerts`.
- **Config.** basic auth with signup on, email verification off, readonly off.
- **Verdicts.** PASS, BLOCKED or FAIL, as in R4.

## 3. A5

**Object, prerequisites, post-check and aggregation are unchanged.**
- **Object.** A UI-created Production blackout.
- **Prerequisites.** A5-P setup; A5-N setup and verified deletion; A5-S 404.
- **Post-check.** Runs only after an ELIGIBLE restart.
- **Aggregation.** A prerequisite FAIL stays FAIL. PASS requires all seven components plus an ELIGIBLE restart.
- **Restart rules.** Process and container kinds are REJECTED. A restart is ELIGIBLE only when Gate A and Gate B both hold. Otherwise it is UNVERIFIED, `a5-check` is refused, and A5 cannot PASS.

### 3.1 Gate A — claims bound to raw evidence (unchanged from R4)

Each claim must equal the value extracted from its hash-matching raw role file:
- stop and start times; capture time; boot id; uptime
- **serving processes:** exact typed identities from the first `ps -eo pid,lstart,cmd` block after `guest_now=`. The complete set comes from raw, before must equal after, and every instance must have started after the start action.
- **fixed storage schema:** `{root_fs_uuid, root_partuuid}` from the exact `lsblk` row mounted at `/` and its matching `blkid` line, identical before and after
- UTC offset; stopped, unavailable and recovered observations
- serverless rationale, times and instance tables

### 3.2 Gate B — deployment inventory from a dedicated, exclusive, producer-bound record (R5)

```
init ... --deployment-record R --deployment-manifest M --deployment-command-log L --deployment-platform P
```

All of the following must hold at `init`, and again unchanged at `a5-restart` (record, stderr, log and manifest hashes, producer id and units):

1. **Registered platform.** P is in `PLATFORM_SCHEMAS`. **Registered: `lima` only.** Header `NAME STATUS SSH VMTYPE ARCH CPUS MEMORY DISK DIR`; STATUS `Running`/`Stopped`; producer argv exactly `['limactl', 'list']`, with no flags registered. No GCP, `gcloud` or serverless profile is registered, so unregistered platforms fail closed.
2. **RW-6 structural command binding.** Exactly one entry of the wrapper command log L references R. That producer entry:
   - records an argv (shlex-parsed from the `- command:` field) that **equals** a registered producer argv;
   - is rejected if it contains ANSI-C `$'…'` quoting, `$(…)` or backticks;
   - rejects shell wrappers (`bash -c …`), compound commands, comments, quoted text, `echo`/`printf`/`cat` producers, redirections, extra flags and absolute-path variants, all by exact-argv inequality;
   - has `exit: 0` and a unique entry id.
3. **RW-7 exclusive output.**
   - R is that entry's stdout at its current SHA-256.
   - The entry's stderr exists at its logged SHA-256, is different from R, and is referenced by no other entry. No other entry references R.
   - R's content is **exclusively** one registered listing: the header, then rows of equal width with allowed STATUS, and nothing else. A second listing or any other line fails.
   - R, the stderr file and L are listed at their current SHA-256 in the separate manifest M, and R, M and L are three different files.
4. **Match.** The bundle's `serving_units` equal R's rows.

**Recorded limit.** A command-log line recording an argv is evidence of what the wrapper logged, not independent proof of what executed. Authenticity of the log and of the raw files remains Reviewer raw-first review.

### 3.3 RT-009 limit (retained evidence, not altered)

- **Why RT-009 fails.** RT-009 (`<PRIVATE_REF_04454>…f2ab`, stderr `<PRIVATE_REF_05099>…f7c8`, log `RAW_COMMAND_LOG_RT.md` `<PRIVATE_REF_03030>…4d54`, all unchanged) was captured inside one compound `bash -c $'…'` command that also started the VM and ran guest checks. Its stdout therefore mixes the listing with other output. Under R5 it fails Gate B for exactly those two reasons: the producer is not the registered argv, and the stdout is not exclusive listing output.
- **What still passes.** The authentic MA-1 restart raw bundle (RT-030/031/032) passes Gate A (`raw_binding` true).
- **The consequence.** The combined authentic MA-1 bundle is **not** ELIGIBLE under R5, and no authentic end-to-end Gate-B positive exists in retained evidence. Nothing was rewritten or rerun to manufacture one.
- **Where the positive comes from instead.** The positive for the new gate is an explicitly **SYNTHETIC** dedicated-producer fixture (`SYN-001`, `limactl list`, exclusive stdout, separate stderr), exercised end to end with an equally SYNTHETIC VM restart bundle.

### 3.4 RW-8 deception outcomes

Each fixture is SYNTHETIC, self-consistent and exact-schema. A detection control confirms the registered listing is present in each record. Each case is refused at `init`; a forged binding re-checks as `inventory` false at restart; `a5-check` is refused; A5 is UNVERIFIED.

| Reviewer case | Fixture(s) | First reason |
|---|---|---|
| listing text only in `echo` output | `echo limactl list`, `echo limactl\ list` | producer argv is not the registered argv |
| only in a comment or quoted string | `cat deployment.txt  # limactl list`; `printf '%s\n' 'limactl list'` | producer argv is not the registered argv |
| listing stdout discarded while another command emits the table | separate `limactl list` (empty stdout) plus `cat saved_table.txt` producing R; `limactl list >/dev/null`; `bash -c 'limactl list >/dev/null; cat …'` | producer argv is not the registered argv |
| unrelated producer emits a plausible table after the listing command | `limactl list` (other unit) then `printf …` producing R; exact `limactl list` stdout with an appended second table; `bash -c $'limactl list\nprintf …'`; two entries claiming the same stdout | not the registered argv; **more than one registered listing (not exclusive)**; referenced by 2 entries |

Further structural negatives: exit 1, `--json` flag, absolute path, duplicate entry id, stderr missing from the manifest, unregistered `gcloud`, and a record tampered after `init`.

## 4. Script, custody and invocation

| Field | Value |
|---|---|
| Locator | `executor/adapter_record_stage/ma1_verify_r5.py` (byte-identical copy per arm) |
| SHA-256 | `<PRIVATE_REF_03224>` |
| Custody (unchanged) | 0600 custody file; state holds only `HMAC(salt, identifier)`; guarded saves; screenshots off by default and masked when enabled |

The invocation is the same as R4. `init` takes `--deployment-record R --deployment-manifest M --deployment-command-log L --deployment-platform P`. The capture contract for arms is that R must be produced by its own dedicated wrapper entry running exactly the registered listing argv, with stdout and stderr captured separately.

## 5. INC-1 (unchanged)

- **Verified.** The lock declares the Cypress install script, and RT-014 proves `npm ci` succeeded.
- **Inference only.** That the lifecycle script executed.
- **UNVERIFIED.** Destination, redirects, bytes and cache size.
- **Human Operator decision.** Human Operator accepted option A only for that local run. No compliance claim is made.

## 6. Remaining gaps

- **G-1. No authentic Gate-B positive.** No retained evidence contains a dedicated `limactl list` producer with exclusive stdout. The new gate's positive is synthetic only. The authentic MA-1 bundle stops at Gate A.
- **G-2. No GCP profile.** No GCP or serverless platform is registered, and none was invented. A W2 arm on GCP cannot reach A5 PASS until a bounded AMD-MA13 GCP validation dispatch produces genuine raw evidence and a reviewed, Human Operator-ratified registry revision follows.
- **G-3. A logged argv is not proof of execution.** It is not independent proof of what ran; log and raw authenticity remain Reviewer raw-first review. The completeness of the process block depends on the arm's capture command. Storage continuity covers only the root filesystem and partition.
- **G-4. Never run.** No endpoint, browser, VM, credential or real arm bundle. BLOCKED granularity and backend-log export are per arm.
- **G-5. Inherited.** `__pycache__` beside the fixtures; local logging config; Ubuntu signature; cause of the first-start exit.

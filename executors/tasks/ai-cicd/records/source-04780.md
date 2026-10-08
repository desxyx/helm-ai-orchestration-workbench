# MA-1 Alerta Adapter Record — final candidate R4 (MA-1.10)

[Status]: CANDIDATE R4 for Reviewer Actor 02's cross-family VerifyOnly review, then Human Operator ratification into the W2 Measurement Addendum. Not ratified; not a WF-8 release.
[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R4 · [Author]: Executor Actor 01
[Release]: `MA1_ADAPTER_R4_FINITE_REWORK_RELEASE_2026-10-02_r1.md`, SHA-256 `<PRIVATE_REF_00898>`
[Supersedes for review]: R3 Record `<PRIVATE_REF_03046>…fe98` and `ma1_verify_r3.py` `<PRIVATE_REF_03172>…1442`. R1, R2 and R3 are preserved unchanged (manifests: 39, 74 and 109 entries, all re-verified).
[Change from R3]: Only RW-1 to RW-5. Serving processes are exact typed identities from a defined raw block. Storage is a fixed schema from exact raw fields. The deployment inventory requires a registered platform schema plus command-log provenance. Adversarial negatives were added. Everything Reviewer Actor 02 accepted is unchanged: R3 integrity, boot/timestamp/UTC binding, the fail-closed gates, and the six R2 correction groups.
[Basis]: MA-1.8 local controls `VALIDATED` (closure `<PRIVATE_REF_03620>…1794`; runtime manifest `<PRIVATE_REF_01602>…65f1`). Governing semantics: Master 02 §6.1, §6.4, §6.6.

## 0. Scope: local validation is not an arm result

- **What MA-1 established.** MA-1 validated this adapter as an instrument on one disposable local Lima VM running the frozen pins (backend `<PRIVATE_REF_01617>`, frontend `<PRIVATE_REF_03446>`).
- **What it did not establish.** It gives no W2 arm result. An arm's A3/A4/A5 status comes only from applying this unchanged adapter to that arm's own endpoints, account, backend log, deployment record and §6.4 raw restart evidence.

## 1. A3 — objective API suite (unchanged)

| Field | Frozen value |
|---|---|
| Suite | `test_alerta_api_smoke.py`, SHA-256 `<PRIVATE_REF_00881>` |
| Command | `ALERTA_ENDPOINT=<api-base> ALERTA_API_KEY=<from custody> MA1_RUN_ID=<id> python3 -m unittest -v test_alerta_api_smoke` |
| Endpoint substitution | `ALERTA_ENDPOINT` is the deployed API base, including any proxy prefix |
| Credential | One `write` key for the same synthetic account as A4. Owner verified; held only in the 0600 custody file. |
| Baseline exclusions | **None** |
| Per-arm pass | `Ran 6 tests`, `OK`, 0 skipped, exit 0 **and** the probe's alert id appears in at least 2 `GET` lines and at least 1 `DELETE` line of the arm-exported backend log. A missing, malformed or nonmatching log is FAIL. |
| Instrument controls (local only) | A3-S: no-listener endpoint gives `test_01` `URLError`. A3-N: defect `<PRIVATE_REF_02382>` gives exactly `test_02` `200 != 201`. |

## 2. A4 — browser account path (unchanged)

| Field | Frozen value |
|---|---|
| Flow | `test_alerta_ui_flow.py`, SHA-256 `<PRIVATE_REF_03225>`; no screenshot directory is ever passed |
| Ordered path | sign-up 200 → fresh first login 200 → `/alerts` → logout → protected denial redirects to `/login?redirect=` → wrong password 401 → second login 200 → `/alerts` |
| Required config | `AUTH_REQUIRED=True`, `AUTH_PROVIDER=basic`, `SIGNUP_ENABLED=True`, `EMAIL_VERIFICATION=False`, `ALLOW_READONLY=False`; frozen defaults; UI `config.json` reaches the same backend; SPA fallback |
| Verdicts | **PASS:** all 8 steps with codes 200/200/401/200, exit 0. **BLOCKED:** clean prefix, then an unavailability abort, naming the blocked step. **FAIL:** anything else. |

## 3. A5 — persistence object and restart

Object, identifier, prerequisites, post-check and aggregation are unchanged:
- **Object.** A UI-created Production blackout `ma1-a5-<tag>-<run_id>`. Its id comes from `POST /blackout` 201, and its owner equals the bound identity.
- **Prerequisites.** A5-P setup; A5-N setup and verified deletion; A5-S 404.
- **Post-check.** Only after an ELIGIBLE restart: A5-P visible and `GET` 200 with the same owner; A5-N 404; A5-S 404.
- **Aggregation.** A prerequisite FAIL stays FAIL. A5 is PASS only if all seven components pass and the restart is ELIGIBLE; otherwise it is `UNVERIFIED`.

**Restart eligibility.** The arm performs its own Master 02 §6.4 action; the verifier never does. Process, service, container, compose, pod, app and worker restarts are **REJECTED**. Restart is **ELIGIBLE** only when Gate A and Gate B both hold and every semantic check holds on the bound values. Otherwise it is **UNVERIFIED**, `a5-check` is refused, and A5 cannot PASS.

### 3.1 Gate A — material claims bound to raw evidence

Each claim must equal the value the verifier extracts from the hash-matching raw role file. A key must occur exactly once.

| Claim | Raw source (unchanged from R3 unless marked R4) |
|---|---|
| stop / start times | `stop` raw `stop_cmd_utc=` / `stop_done_utc=` (and no `start_cmd_utc=` in it); `start` raw `start_cmd_utc=` / `start_done_utc=` |
| capture time, boot id, uptime | `before:<vm>` / `after:<vm>` raw `guest_now=`, `boot_id=`, first number of `uptime=` |
| **R4 — serving processes** | The **serving-process block** is the first contiguous run of `ps -eo pid,lstart,cmd` lines after `guest_now=`.<br>**Typed identity** (exact match, no substrings):<br>• a process title `name:` gives `name`;<br>• an interpreter (python/node/java/ruby/perl/php/sh) gives the basename of its first non-option argument;<br>• otherwise, the basename of the executable.<br>The **complete expected set** is the before-raw block's identity set, not the caller's list.<br>• The claimed before and after sets must each equal their raw block exactly.<br>• The after-raw set must equal the before-raw set (recovery).<br>• Each claimed `start_utc` equals the earliest raw `lstart` of that identity minus `guest_utc_offset`.<br>• Every raw instance of every identity must have started after the start action. |
| **R4 — persistent storage** | Fixed schema `{root_fs_uuid, root_partuuid}`, exactly these keys.<br>• `root_fs_uuid` is the UUID column of the single row mounted at `/` in the single `lsblk -o NAME,UUID,SIZE,MOUNTPOINT` table.<br>• `root_partuuid` is the PARTUUID field of the single `blkid` line for that device, whose `UUID` must equal `root_fs_uuid`.<br>Before and after values (raw-extracted) must be identical. Caller labels and incidental or size tokens cannot serve. |
| UTC offset | suffix of an ISO timestamp in every after raw |
| stopped, unavailable, recovered | stopped and unavailable at `stop_done_utc`: after that anchor, a line names the VM together with a stopped word, plus `http=000` or a connection failure, and no 2xx. Recovered at `start_done_utc`: a 2xx after that anchor. |
| serverless | action raw `rationale_utc=`/`action_cmd_utc=`/`action_done_utc=`, rationale verbatim, recovery 2xx; per unit, `captured_utc=` and instance ids equal to the raw `NAME` rows |

### 3.2 Gate B — serving-unit inventory from a registered, provenance-bound deployment record (R4)

```
init ... --deployment-record R --deployment-manifest M --deployment-command-log L --deployment-platform P
```

All of the following must hold at `init`, and again unchanged at `a5-restart`:

1. **Registered schema.** P is registered in the script's `PLATFORM_SCHEMAS`. R contains exactly one listing whose header equals P's header exactly, and every row has the same column count and a STATUS within P's allowed values. The rows are the complete inventory.
2. **Provenance.** Exactly one entry of the wrapper command log L has R as its stdout at R's current SHA-256, and that entry's command runs P's listing command.
3. **Custody.** R and L are listed, at their current SHA-256, in the separate evidence manifest M. R, M and L are three different files.
4. **Match.** The bundle's `serving_units` equal the parsed inventory exactly.

**Registered platforms (R4):** `lima` only. Header `NAME STATUS SSH VMTYPE ARCH CPUS MEMORY DISK DIR`; STATUS `Running`/`Stopped`; listing command `limactl list`. It is validated against MA-1 RT-009, whose provenance is command-log entry `RT-009 — vm_first_start`, with log `<PRIVATE_REF_03030>…4d54` listed in `SHA256SUMS_RT_FINAL` `<PRIVATE_REF_01602>…`.

An unregistered platform cannot satisfy Gate B, so A5 stays UNVERIFIED. Adding a platform is an adapter revision that needs independent review and Human Operator ratification.

### 3.3 RW-5 adversarial outcomes (authentic hash-matching raw files)

For each class: restart is UNVERIFIED, `a5-check` is refused, and A5 is UNVERIFIED even if every component passes. Offline evidence is E04; CLI evidence is E19–E33.

| Class | First failing check |
|---|---|
| shortened process substring (`postgre`) | `before processes ['gunicorn','nginx','postgre'] != raw serving identities ['gunicorn','nginx','postgres']` |
| incomplete process set (gunicorn omitted) | `before processes ['nginx','postgres'] != raw serving identities [...]` |
| generic size token `39G` as `root_fs_uuid` | `storage_ids.root_fs_uuid '39G' not equal to the raw field` |
| caller label `disk_size=40G` | `storage_ids keys ['disk_size'] are not the fixed schema` |
| misleading deployment tables | `init` refuses each variant: generic `NAME STATUS REGION` with manifest and a `limactl list` log entry; exact lima header with no producing entry; produced by `cat`; STATUS outside schema; unregistered platform. A forged state binding re-checks at restart as `inventory` false. |

The valid positive control is the MA-1 bundle bound to RT-030/031/032 plus RT-009 inventory, which is ELIGIBLE with both gates true. All R3 contradiction controls are retained and remain UNVERIFIED.

## 4. Identical-arm verification script and custody

| Field | Value |
|---|---|
| Locator | `executor/adapter_record_stage/ma1_verify_r4.py`; arms receive a byte-identical copy |
| SHA-256 | `<PRIVATE_REF_01804>` |
| Dependencies | Python ≥ 3.10 standard library; Python Playwright with Chromium for `a4` and the A5 UI steps |
| Custody (unchanged) | 0600 custody file (binding salt and key); the state holds only `HMAC(salt, identifier)`; saves are guarded; screenshots are off by default and masked when enabled |

```
python3 ma1_verify_r4.py init --state S --run-id <id> --ui-url <ui> --api-url <api> --fixtures <dir> --out <dir> \
        --deployment-record <platform listing> --deployment-manifest <evidence manifest> \
        --deployment-command-log <wrapper command log> --deployment-platform <registered platform>
python3 ma1_verify_r4.py a4 --state S --custody-file C
python3 ma1_verify_r4.py derive-key --state S --custody-file C
python3 ma1_verify_r4.py a3 --state S --custody-file C --mode P --backend-log <exported backend log window>
python3 ma1_verify_r4.py a5-create --state S --custody-file C --tag P
python3 ma1_verify_r4.py a5-create --state S --custody-file C --tag N
python3 ma1_verify_r4.py a5-delete --state S --custody-file C
python3 ma1_verify_r4.py a5-sentinel --state S --custody-file C
#   arm performs its own §6.4 restart, capturing raw files in the §3.1 vocabulary, and writes bundle B citing them
python3 ma1_verify_r4.py a5-restart --state S --bundle B
python3 ma1_verify_r4.py a5-check --state S --custody-file C
python3 ma1_verify_r4.py report --state S
```

## 5. INC-1: evidence status and run-specific risk acceptance (unchanged)

- **Verified.** The frozen lock declares `cypress@15.13.0` with `hasInstallScript: true`, and RT-014 proves `npm ci` succeeded.
- **Inference only.** That the lifecycle script executed.
- **UNVERIFIED.** Destination, redirects, bytes and cache size (correction `<PRIVATE_REF_02273>…f1a1`).
- **Human Operator decision.** Human Operator accepted option A only for that completed local MA-1 run.
- **Not claimed.** No compliance claim, no standing exception, and no network authority for any arm.

## 6. Remaining gaps (unrun behaviour is not claimed)

- **G-1. Never run against an endpoint, browser, VM or real credential.** The offline checks cover the pure functions and CLI gating paths only. Never executed:
  - the A4 subprocess
  - key derivation
  - a real-key A3 run
  - every A5 browser step
  - screenshot masking
  - a real arm bundle
- **G-2. Raw binding proves agreement, not authenticity.** It proves the bundle agrees with the hash-bound raw files, not that those files are genuine captures. That remains Reviewer raw-first review.
  - The serving-process block is whatever the arm's capture lists after `guest_now=`; an arm capture that filters out a serving process would understate the set. Reviewers should check the capture command, which the command log records.
  - Storage continuity is limited to the root filesystem and partition identities. The database data path is not separately bound.
- **G-3. W2 dependency: Gate B fails for any unregistered platform.** Only `lima` is registered. A W2 arm on any other platform (for example a cloud VM or a managed service) cannot reach A5 PASS until that platform's listing schema and listing command are registered by a reviewed, Human Operator-ratified adapter revision, validated against that platform's real raw listing. No such schema is invented here. Serverless raw binding is implemented, but no serverless platform is registered.
- **G-4.** BLOCKED granularity is limited by the frozen A4 file; backend-log export is per arm.
- **G-5. Inherited.**
  - The MA-1 `__pycache__` beside the frozen fixtures (disclosed, outside the writable roots).
  - The local `LOG_LEVEL`/`DEBUG` settings.
  - The Ubuntu checksum signature was not verified.
  - The first-start worker exit has no known cause.

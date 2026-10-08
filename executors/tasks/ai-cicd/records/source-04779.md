# MA-1 Alerta Adapter Record — final candidate R3 (MA-1.10)

[Status]: CANDIDATE R3 for Reviewer Actor 02's independent VerifyOnly review, then Human Operator ratification into the W2 Measurement Addendum. Not ratified; not a WF-8 release.
[Task ref]: AI_CICD / MA-1 / ADAPTER_RECORD_COMPLETION_R1 / TARGETED_REWORK_R3 · [Author]: Executor Actor 01
[Dispatch]: Human Operator-relayed R3 targeted-rework instruction (2026-10-02), based on `MA1_ADAPTER_R2_HANDOFF_2026-10-02.md` SHA-256 `<PRIVATE_REF_03578>`. Prior releases: completion `<PRIVATE_REF_02396>…dcd7`; R2 rework `<PRIVATE_REF_03176>…e0ac`.
[Supersedes for review]: R2 Record `<PRIVATE_REF_00566>…f1c3` and `ma1_verify_r2.py` `<PRIVATE_REF_03278>…7e18`. R1 and R2 are preserved unchanged (manifests `<PRIVATE_REF_02708>…3d4b`, 39 entries; `<PRIVATE_REF_01463>…e93f`, 74 entries).
[Change from R2]: Only the restart-evidence finding. Restart eligibility now requires two gates: raw binding (§3.1) and an external serving-unit inventory (§3.2). The other six R2 corrections, which Reviewer Actor 02 accepted, are unchanged.
[Basis]: MA-1.8 local controls `VALIDATED` (closure `<PRIVATE_REF_03620>…1794`; runtime manifest `<PRIVATE_REF_01602>…65f1`). Governing semantics: Master 02 §6.1, §6.4, §6.6.

## 0. Scope: local validation is not an arm result

- **What MA-1 established.** MA-1 validated this adapter as an instrument on one disposable local VM running the frozen pins (backend `<PRIVATE_REF_01617>`, frontend `<PRIVATE_REF_03446>`).
- **What it did not establish.** It gives no W2 arm result. An arm's A3/A4/A5 status comes only from applying this unchanged adapter to that arm's own endpoints, account, backend-log export, deployment record and §6.4 raw restart evidence.

## 1. A3 — objective API suite (unchanged from R2)

| Field | Frozen value |
|---|---|
| Suite | `test_alerta_api_smoke.py`, SHA-256 `<PRIVATE_REF_00881>` |
| Command | `ALERTA_ENDPOINT=<api-base> ALERTA_API_KEY=<from custody> MA1_RUN_ID=<id> python3 -m unittest -v test_alerta_api_smoke` |
| Endpoint substitution | `ALERTA_ENDPOINT` is the deployed API base, including any proxy prefix (for example `https://<host>/api`) |
| Credential | One `write` key for the same synthetic account as A4. Owner verified; held only in the 0600 custody file. |
| Baseline exclusions | **None** |
| Per-arm pass | `Ran 6 tests`, `OK`, 0 skipped, exit 0 **and** backend-log correlation: the probe's alert id appears in at least 2 `GET` lines and at least 1 `DELETE` line of the arm-exported log window. A missing, malformed or nonmatching log is FAIL. |
| Instrument controls (local only) | A3-S: no-listener endpoint gives `test_01` `URLError` and no backend request. A3-N: defect `A3_N_STATUS_201_TO_200.patch` `<PRIVATE_REF_02382>` gives exactly `test_02` `AssertionError: 200 != 201 : A3N-TARGET create-alert HTTP status`. |

## 2. A4 — browser account path (unchanged from R2)

| Field | Frozen value |
|---|---|
| Flow | `test_alerta_ui_flow.py`, SHA-256 `<PRIVATE_REF_03225>`; no screenshot directory is ever passed |
| Ordered path | sign-up 200 → fresh first login 200 → `/alerts` → logout via avatar → protected denial redirects to `/login?redirect=` → wrong password 401 → second login 200 → `/alerts` |
| Required config | `AUTH_REQUIRED=True`, `AUTH_PROVIDER=basic`, `SIGNUP_ENABLED=True`, `EMAIL_VERIFICATION=False`, `ALLOW_READONLY=False`; frozen default scopes and environments; UI `config.json` reaches the same backend; SPA fallback |
| Verdicts | **PASS:** all 8 ordered steps with codes 200/200/401/200, exit 0. **BLOCKED:** clean prefix, then an unavailability abort before the next mandatory step, which is named. **FAIL:** anything else. |

## 3. A5 — persistence object and restart

Object, identifier, prerequisites, post-check and aggregation are unchanged from R2:
- **Object.** A UI-created Production blackout `ma1-a5-<tag>-<run_id>`. Its id comes from the `POST /blackout` 201 response, and its owner must equal the bound identity.
- **Prerequisites before any restart.** A5-P setup; A5-N setup and verified deletion; A5-S precheck (404).
- **Post-check.** Runs only after an ELIGIBLE restart: A5-P visible in the UI and `GET` 200 with the same owner; A5-N 404; A5-S 404.
- **Aggregation.** A prerequisite FAIL stays FAIL. A5 is **PASS** only if all seven components pass and the restart is ELIGIBLE; otherwise it is `UNVERIFIED`.

**Restart eligibility (R3).** Each arm performs its own Master 02 §6.4 action; the verifier never performs one. Outcomes:
- **REJECTED:** `process_restart`, `service_restart`, `container_restart`, `compose_restart`, `pod_restart`, `app_restart`, `worker_restart`.
- **ELIGIBLE:** only when **both** gates below hold and every semantic check (timeline, boot change, uptime reset, process recovery after start, storage continuity, unavailable-then-recovered app, complete instance replacement) holds on the **bound** values.
- **UNVERIFIED:** anything else. `a5-check` is then refused and A5 cannot PASS.

### 3.1 Gate A — material claims bound to raw evidence

- **How the bundle names raw evidence.** The bundle maps each role to `{locator, sha256}`. The verifier reads only role files whose hash matches. For every material claim, it extracts the value itself from that role's raw text at a fixed key or anchor, and the claim must equal it. Matching hashes alone, or a claim that is absent from or contradicts the raw, fail the gate.
- **Required raw capture vocabulary.** Each arm's capture commands must emit these keys; the full format is in the script `--help` epilog.

| Claim | Must equal (raw role, key/anchor; the key must occur exactly once) |
|---|---|
| stop start/completion | `stop` raw `stop_cmd_utc=` / `stop_done_utc=` (and `stop` raw must not contain `start_cmd_utc=`) |
| start start/completion | `start` raw `start_cmd_utc=` / `start_done_utc=` |
| per VM before/after capture time | `before:<vm>` / `after:<vm>` raw `guest_now=` |
| boot id | same raw `boot_id=` (from `/proc/sys/kernel/random/boot_id`) |
| uptime | first number of same raw `uptime=` (`/proc/uptime`), ±0.005 s |
| storage identities | each value present as a whole token in the same raw (for example `lsblk`/`blkid` UUID, data directory) |
| serving processes | before: each name occurs in a `ps -eo pid,lstart,cmd` line of the before raw. After: each `(name, start_utc)` matches a `ps` line whose local `lstart` minus `guest_utc_offset` equals `start_utc`. |
| guest UTC offset | appears as the suffix of an ISO timestamp in every after raw |
| stopped observation | time = `stop_done_utc`; after that anchor, a line names the VM together with a stopped word (`Stopped`, `TERMINATED`, `SHUTOFF`, `deallocated`, `PoweredOff`) |
| app unavailable while stopped | time = `stop_done_utc`; after it, `http=000` or a connection-failure marker and no `http|status=2xx` |
| app recovered | time = `start_done_utc`; after it, `http|status=2xx` |
| serverless | `action` raw: `rationale_utc=`, `action_cmd_utc=`, `action_done_utc=`, rationale verbatim, recovery 2xx after `action_done_utc`. `before:<svc>`/`after:<svc>` raw: `captured_utc=` and instance ids equal to that file's `NAME` table rows exactly. |

### 3.2 Gate B — serving-unit inventory corroborated by an external deployment record

- **The record.** `init --deployment-record R --deployment-manifest M`. R is the arm's deployment record captured at deployment: a platform listing with exactly one `NAME` header table (for VMs, for example, `limactl list` or the cloud instance list).
- **The manifest.** M is a separate evidence manifest that must list R exactly once with R's current SHA-256.
- **What the verifier stores.** It parses the inventory from R at `init`, before any A5 step, and stores R/M hashes and units in state.
- **At restart.** R and M must be unchanged, and the bundle's `serving_units` must equal that inventory exactly; a unit may be neither added nor omitted.
- **What fails.** A free-text record, a record missing from the manifest or listed with a wrong hash, a record used as its own manifest, or no record at all.

**MA-1 provenance (offline).**
- **Gate B.** The deployment record RT-009 (`limactl list` at first start), bound by `SHA256SUMS_RT_FINAL` `<PRIVATE_REF_01602>…`, yields the inventory `['ma1-a5']`.
- **Gate A.** The bundle bound to RT-030/031/032 (`<PRIVATE_REF_04480>…`, `<PRIVATE_REF_04285>…`, `<PRIVATE_REF_04235>…`) is ELIGIBLE with both gates true.
- **Negatives.** 22 negatives change JSON claims while keeping those authentic raw hashes, and all are `UNVERIFIED`. They cover both boot ids, both uptimes, rootfs UUID, data path, process start time, a fabricated process, a consistently shifted UTC offset, all four stop/start times, both capture times, the stopped observation time, both probe times, role substitution, hash mismatch and a missing role. On the inventory side, an extra self-declared VM with copied authentic raw roles and an inventory unit the bundle omits are also `UNVERIFIED`.

## 4. Identical-arm verification script and AMD-DK2 custody

| Field | Value |
|---|---|
| Locator | `executor/adapter_record_stage/ma1_verify_r3.py`; arms receive a byte-identical copy |
| SHA-256 | `<PRIVATE_REF_03172>` |
| Dependencies | Python ≥ 3.10 standard library; Python Playwright with Chromium for `a4` and the A5 UI steps |
| Custody (unchanged from R2) | A new 0600 custody file holds the binding salt and the derived key. State holds only `HMAC(salt, identifier)` and a custody tag. Every save is guarded against the identifier, password and key. Screenshots are off by default and masked when enabled. |

```
python3 ma1_verify_r3.py init --state S --run-id <id> --ui-url <ui> --api-url <api> --fixtures <dir> --out <dir> \
        --deployment-record <deployment listing> --deployment-manifest <evidence manifest listing it>
python3 ma1_verify_r3.py a4 --state S --custody-file C
python3 ma1_verify_r3.py derive-key --state S --custody-file C
python3 ma1_verify_r3.py a3 --state S --custody-file C --mode P --backend-log <exported backend log window>
python3 ma1_verify_r3.py a5-create --state S --custody-file C --tag P
python3 ma1_verify_r3.py a5-create --state S --custody-file C --tag N
python3 ma1_verify_r3.py a5-delete --state S --custody-file C
python3 ma1_verify_r3.py a5-sentinel --state S --custody-file C
#   arm performs its own §6.4 restart, capturing raw files in the §3.1 vocabulary, and writes bundle B citing them
python3 ma1_verify_r3.py a5-restart --state S --bundle B
python3 ma1_verify_r3.py a5-check --state S --custody-file C
python3 ma1_verify_r3.py report --state S
```

## 5. INC-1: evidence status and run-specific risk acceptance (unchanged from R2)

- **Verified.** The frozen lock declares `cypress@15.13.0` with `hasInstallScript: true`, and RT-014 proves `npm ci` succeeded.
- **Inference only.** That the lifecycle script executed.
- **UNVERIFIED.** Destination, redirects, bytes and cache size (correction `<PRIVATE_REF_02273>…f1a1`).
- **Human Operator decision.** Human Operator accepted option A only for that completed local MA-1 run.
- **Not claimed.** No compliance claim, no standing exception, and no network authority for any arm.

## 6. Remaining gaps (unrun behaviour is not claimed)

- **G-1. Never run against an endpoint, browser, VM or real credential.** The offline checks cover the pure functions and the CLI gating/refusal paths, using MA-1 raw replays and synthetic non-credential fixtures. The following have never executed:
  - the A4 subprocess
  - key derivation
  - a real-key A3 run
  - every A5 browser step
  - screenshot masking
  - a real arm restart bundle
- **G-2. What raw binding does and does not prove.** It makes the bundle agree with the raw files; it does not prove the raw files themselves are genuine captures. That remains the job of Reviewer raw-first review of the hash-bound files.
  - The process-name rule is a substring match on the `ps` command line.
  - Storage identities must be whole tokens.
  - Arms must emit the §3.1 key vocabulary; a raw file without it leaves A5 `UNVERIFIED`. This is an arm-capture obligation, not a relaxation.
- **G-3. Inventory completeness is relative to the external record.** The verifier cannot discover serving compute absent from the platform listing. The record must come from the deployment's own platform listing and be custodied in the evidence manifest before A5 begins.
- **G-4.** BLOCKED granularity is limited by the frozen A4 file's error-type output. Backend-log export remains per arm.
- **G-5. Inherited.**
  - The MA-1 `__pycache__` beside the frozen fixtures (disclosed, outside the writable roots).
  - The local `LOG_LEVEL`/`DEBUG` settings.
  - The Ubuntu checksum signature was not verified.
  - The first-start worker exit has no known cause.

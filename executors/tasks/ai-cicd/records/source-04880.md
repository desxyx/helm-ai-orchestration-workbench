# ADAPTER_RECORD_CANDIDATE — MA-1 (Alerta frozen pins, local disposable VM)

[Status]: CANDIDATE ONLY — assembled by Executor Actor 01 from verified runtime results. Not an Adapter Record. Not a `VALIDATED` claim. Requires independent Reviewer `PASS` and Human Operator ratification.
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 / FRESH_CONTINUATION_R1
[Run]: `MA1_RUN_ID=ma1r-20261002-5714d2` · 2026-10-02 03:25Z–04:17Z
[Evidence]: `evidence/runtime_stage/executor/` (command log `RAW_COMMAND_LOG_RT.md`, raw captures `raw/RT-NNN_*`, manifest `SHA256SUMS_RT_FINAL`)

## Subject under adapter

| Item | Value |
|---|---|
| Backend | Alerta server 9.1.0 at pin `<PRIVATE_REF_01617>` (editable install of a credential-path-free archive) |
| Frontend | alerta-webui 8.7.1 at pin `<PRIVATE_REF_03446>`, built with `npm ci` from the frozen lock |
| Serving stack (all in one guest) | PostgreSQL 16.15 · gunicorn 23.0.0 (2 sync workers, 127.0.0.1:8080) · nginx 1.24.0 (UI + `/api/` → backend) |
| Backend auth config | `AUTH_REQUIRED=True`, `AUTH_PROVIDER=basic`, `SIGNUP_ENABLED=True`, `EMAIL_VERIFICATION=False`, `ALLOW_READONLY=False`; frozen defaults for `USER_DEFAULT_SCOPES` and `ALLOWED_ENVIRONMENTS` (confirmed via `/api/config`) |
| VM | Lima 2.2.0, instance `ma1-a5`, vz/aarch64, 4 CPU / 8 GiB / 40 GiB, vzNAT, no mounts, no containers, all auto port-forwards ignored; definition SHA-256 `<PRIVATE_REF_05001>` |
| Guest image | Ubuntu 24.04 ARM64 release-20260926, SHA-256 `<PRIVATE_REF_01095>…fc55` (matches pin and dated `SHA256SUMS`) |
| Host-visible endpoints | UI `<PRIVATE_URL_0006>` · API probe endpoint `<PRIVATE_URL_0006>` (non-default, substitutable) |
| Fixtures (unchanged) | probe `<PRIVATE_REF_00881>…259e` · A3-N patch `<PRIVATE_REF_02382>…b71bb1` · A4 flow `<PRIVATE_REF_03225>…98bc` · spec `<PRIVATE_REF_01587>…8288` |

## Control results

| Control | Result | Basis (raw capture) |
|---|---|---|
| A3-P | PASS — `Ran 6 tests`, `OK`, 0 skipped, exit 0; 7 correlated backend requests | RT-021, RT-022 |
| A3-S | PASS — endpoint `<PRIVATE_URL_0008>` (no listener proven); `test_01` ERROR `URLError` connection refused, 02–06 fail/error, exit 1; 0 backend and 0 nginx requests | RT-023 |
| A3-N | PASS — patch only in VM copy, blob `<PRIVATE_REF_01394>…`; `FAILED (failures=1)`: exactly `test_02` `AssertionError: 200 != 201 : A3N-TARGET create-alert HTTP status`; `test_01` and 03–06 pass; backend `POST /alert … 200`; 0×5xx. Reverted to blob `<PRIVATE_REF_01618>…`, backend restarted, healthy | RT-024–RT-027 |
| A4 | PASS — 8/8 JSON steps; `POST /auth/signup` 200; `POST /auth/login` 200 (step 2) and 200 (step 7); wrong password 401; protected denial to `/login?redirect=…`; exit 0; masked screenshots only, no HAR/trace | RT-019 |
| A5-P | PASS — UI-created blackout `<NATIVE_ID_0410>` (`environment=Production`, `resource=ma1-a5-P-ma1r-20261002-5714d2`): absent before, present after; after full-VM restart, visible in the UI as the same account and `GET /blackout/<id>` 200 | RT-028, RT-033 |
| A5-N | PASS — UI-created `<NATIVE_ID_0948>`, UI-deleted (DELETE 200), 404 before restart and 404 after | RT-029, RT-033 |
| A5-S | PASS — sentinel `<NATIVE_ID_0008>` never submitted; 404 before and after | RT-029, RT-033 |

## Full-VM restart equivalence

| Evidence | Before | After |
|---|---|---|
| Lima state | Running → graceful `limactl stop` (no `--force`), `Stopped`; no limactl/VZ process; host app probe times out | `limactl start` → `Running` |
| Guest boot_id | `<NATIVE_ID_3130>` | `<NATIVE_ID_3116>` |
| Uptime | 1656.40 s | 9.87 s (guest boot 04:10:43Z) |
| Serving processes | postgres 13:42:26, nginx 13:46:18, gunicorn 14:00:14 AEST | nginx 14:10:46, postgres 14:10:47, gunicorn 14:10:49 AEST (04:10:46–49Z, after start command 04:10:40Z) |
| Root disk UUID | `<NATIVE_ID_3162>` | same |
| DB data dir | `/var/lib/postgresql/16/main` | same |
| Graceful shutdown | previous boot journal reaches `poweroff.target`; PostgreSQL logs `database system is shut down` at 14:09:16, and on next start `database system was shut down at 14:09:16` (no crash recovery) | — |
| App recovery | — | host `GET /api/management/gtg` 200 on first attempt; UI 200 |

## Adapter-relevant caveats for the reviewer

- The backend access log of record is the frozen app's own per-request log (`alerta.app` after_request: method, path, status, size, request_id) in journald. gunicorn's access log is silenced by the frozen logging `dictConfig` (`disable_existing_loggers=True`). nginx `ma1_access.log` corroborates it, including query strings.
- `LOG_LEVEL='INFO'` and `DEBUG=False` were set in the runtime config so that the per-request log is emitted. These are not frozen-fixture changes.
- One `MA1_RUN_ID` (per the release) was used, so the A3 probe resource name is shared across A3-P/S/N. Alert ids were distinct, and A3-P proved deletion before A3-N.

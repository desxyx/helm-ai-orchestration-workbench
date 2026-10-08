# MA-1 LOCAL PROVISIONING AND RUNTIME RELEASE R1

[Artifact Class]: IMMUTABLE_EVIDENCE
[Released]: 2026-10-01T16:15:28+10:00
[Recorded by]: OPERATIONS_COORDINATOR_Codex
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1
[Released to]: `Executor Actor 01`
[Mode / Capability]: Execute / WriteExecute
[Reviewer state]: `Reviewer Actor 02` stopped until completed evidence is separately released
[Owner authorization]: `OWNER_DECISION_LEDGER.md`, Decision — 2026-10-01T16:15:28+10:00
[Action Receipt]: `AI-CICD-20261001-MA1-RUNTIME-001`; one use; must be consumed before the first mutation

## Outcome

Provision one disposable local Linux VM containing the complete frozen Alerta serving stack, execute the frozen A3/A4/A5 controls, capture a reviewable raw-evidence bundle, perform bounded teardown/reset, then stop.

This is one outcome-bounded release. The Executor controls safe implementation details, command order, support-script structure, readiness polling, service wiring and finite troubleshooting within the pins and red lines below. Do not stop for ordinary implementation choices. Stop only for a hard red line, invalid receipt, hash mismatch, credential exposure, physical impossibility or a policy choice outside this release.

## Authorized roots

- Runtime work: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/`
- Executor evidence: `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/`
- Isolated host HOME: `executor/runtime_stage<CLIENT_HOME>
- Isolated Lima state: `executor/runtime_stage/lima_home/`

Write only inside the two runtime/evidence roots. The isolated HOME and `LIMA_HOME` must be exported for every Lima invocation so instance state and `~/Library/Caches/lima` remain inside the runtime root. Do not use Homebrew, `/Applications`, `/usr/local`, the real `~/.lima`, or the real `~/Library/Caches/lima`.

## Frozen inputs

- Backend pin: `<PRIVATE_REF_01617>`.
- Frontend pin: `<PRIVATE_REF_03446>`.
- Ratified MA-1 body: SHA-256 `<PRIVATE_REF_01075>`.
- Construction closure: `../../../../council/task/ai-cicd/council-records/source-00543.md`, SHA-256 `<PRIVATE_REF_03403>`.
- API probe: SHA-256 `<PRIVATE_REF_00881>`.
- A3-N patch: SHA-256 `<PRIVATE_REF_02382>`.
- A4 browser flow: SHA-256 `<PRIVATE_REF_03225>`.
- Runtime specification: SHA-256 `<PRIVATE_REF_01587>`.

Reproduce every hash before mutation. A mismatch is `EXEC_STOP`.

## Exact VM boundary

### Lima

- Version/tag: Lima `v2.2.0`, commit `<PRIVATE_REF_03338>`.
- Asset: `https://github.com/lima-vm/lima/releases/download/v2.2.0/lima-2.2.0-Darwin-arm64.tar.gz`.
- Expected asset SHA-256: `<PRIVATE_REF_02907>`.
- Install by unpacking only under `executor/runtime_stage/tools/lima-2.2.0/`; no system installation.

### Guest image

- Image: Ubuntu 24.04 ARM64 release build `20260926`.
- Immutable URL: `https://cloud-images.ubuntu.com/releases/noble/release-20260926/ubuntu-24.04-server-cloudimg-arm64.img`.
- Expected SHA-256: `<PRIVATE_REF_01095>`.
- Canonical dated `SHA256SUMS` is the authoritative hash source. Do not use `current`, the HTTP archive redirect or an unpinned replacement.

### Definition

- Instance name: `ma1-a5`.
- `vmType: vz`; architecture `aarch64`; 4 CPUs; 8 GiB memory; 40 GiB disk.
- Network: `vzNAT`, so the host reaches the guest IP directly and the Lima port-forward host agent is not the application data path.
- `mounts: []`; no host filesystem mount.
- `containerd.system: false`; `containerd.user: false`; no containers.
- All serving compute and persistence must be inside this single VM: PostgreSQL, frozen Alerta backend under a recorded WSGI service, and nginx serving the frozen web UI and proxying `/api` to the backend.
- Host-visible UI: `http://<guest-ip>/`; API probe endpoint: `http://<guest-ip>/api`, which is non-default and substitutable.

The VM definition becomes a runtime artifact, is hashed before `limactl create`, and may not change after the first A3-P run. Any necessary pre-run correction must be recorded before that point.

## Source and dependency handling

- Copy only the two clean frozen pins into the VM/runtime scratch. Do not fetch newer source.
- Do not copy or open the tracked credential-bearing paths: backend `.env`, backend `.flaskenv`, frontend `.env.development`. Verify their absence from the runtime copy.
- Guest-only package/network access is allowed for official Ubuntu repositories and the package registries required by the frozen lock/config files. Host network access is limited to the exact Lima asset, Canonical image/hash and their HTTPS delivery hosts.
- Record every resolved OS/Python/Node package version and the build/install commands. Do not run unpinned remote shell installers.
- Configure: `AUTH_REQUIRED=True`, `AUTH_PROVIDER=basic`, `SIGNUP_ENABLED=True`, `EMAIL_VERIFICATION=False`, `ALLOW_READONLY=False`; preserve default `USER_DEFAULT_SCOPES=['read','write']` and `ALLOWED_ENVIRONMENTS` including `Production`.
- Record the nginx `/api` proxy and UI `config.json` endpoint exactly. Bind no service to a public host interface outside `vzNAT` reachability.

## Synthetic credential boundary

The consumed Action Receipt covers one unique, isolated test account and any derived API key/token required by these controls.

- Generate values inside the runtime process/guest; never embed them in source, config committed to evidence, command arguments, filenames, terminal output, HAR or Playwright trace.
- Pass them only through process environment or a mode-0600 transient guest file that is deleted before evidence finalization.
- The email identifier may appear where required to prove account identity; password, API key, token, cookie and DSN values must always be redacted.
- Run a secret scan before submission. Credential exposure outside the isolated run, inability to redact, or a still-effective credential after teardown is `EXEC_STOP` and must be reported under AMD-DK2.

## Required execution

Use one unique non-secret `MA1_RUN_ID`. Record UTC timestamps, exact commands, exit codes, raw stdout/stderr, backend access logs and SHA-256 for every material capture.

1. **Provisioning preflight** — verify receipt, host facts, real-home/global-Lima baseline, all frozen hashes, Lima asset hash, image hash, VM-definition hash, source pins and credential-path exclusions.
2. **Stack readiness** — prove PostgreSQL/backend/nginx processes are inside the guest, UI/API are reachable through the guest `vzNAT` IP, and the backend access log is correlated.
3. **A3-P** — run the frozen API probe unchanged against `http://<guest-ip>/api`; require 6/6 tests, zero skips, exit 0 and seven correlated backend requests.
4. **A3-S** — run the identical command/file with only `ALERTA_ENDPOINT` changed to a recorded no-listener guest/host port; require reachability failure and no backend requests. Restore the real endpoint afterward.
5. **A3-N** — apply the frozen one-line patch only to the isolated VM backend copy; verify resulting blob `<PRIVATE_REF_01394>`; restart only the backend for this control; require healthy GTG, exactly the named create-status assertion failure (expected 201/actual 200), and later lifecycle tests passing. Revert the patch, verify blob `<PRIVATE_REF_01618>`, restart backend and re-prove health.
6. **A4** — run the frozen direct Playwright file unchanged with the unique synthetic account. Require all eight JSON steps, both successful `/auth/login` 200 responses, wrong-password 401, protected denial and final exit 0. Use masked screenshots only; no HAR or trace.
7. **A5 object setup** — while authenticated through the UI, create an exact `blackout` domain object with `environment=Production` and a unique `resource` containing `MA1_RUN_ID`; record its server ID as A5-P and prove it is absent before and present after UI creation. Through the UI create a second unique blackout, record its ID as A5-N, then delete it through the UI and prove absence before restart. Generate an A5-S sentinel ID that is never submitted and prove absence.
8. **A5 full-VM restart** — record guest boot ID, uptime, PostgreSQL/backend/nginx process start times, disk UUID and data path; gracefully `limactl stop ma1-a5`; prove Lima `Stopped`, app unavailable and no serving VM process; `limactl start ma1-a5`; prove `Running`, changed boot ID, reset uptime, later serving-process start times, same disk UUID and recovered app.
9. **A5 persistence** — log in as the same account; prove A5-P is visible in the UI and direct `GET /blackout/<id>` succeeds; prove A5-N checker fails/404; prove A5-S absent. Any process/container-only substitute is invalid.
10. **Teardown/reset** — capture final evidence, stop/delete only instance `ma1-a5`, invalidate credentials by deleting the VM disk, remove only the isolated HOME Lima download cache and instance state, and prove the real `~/.lima` and real `~/Library/Caches/lima` were not created or changed. Preserve the runtime definition/support files and evidence bundle; do not delete canonical/frozen inputs.

Use readiness polling and bounded retries rather than fixed sleeps. A retry may repair setup before the first control, but never reinterpret a failed control as PASS or change a frozen fixture after execution begins.

## Required submission

Return one `MA1_RUNTIME_SUBMISSION` containing:

- final status for A3-P, A3-S, A3-N, A4, A5-P, A5-N and A5-S;
- exact runtime/VM/package configuration and all immutable hashes;
- identifiers and timestamps with secrets redacted;
- raw-evidence index and checksum manifest;
- proof of full-VM restart equivalence and persistence;
- Action Receipt reconciliation, teardown/reset attestation and residue inventory;
- a concise `ADAPTER_RECORD_CANDIDATE.md` assembled from verified results only;
- evidence gaps, incidents and any `FAILED_LOCAL`, `BLOCKED` or `EXEC_STOP` condition.

Then stop. Do not edit the ratified Addendum, claim MA-1 `VALIDATED`, start W2, or send anything externally. Operations Coordinator will mechanically intake the bundle and separately release it to Reviewer Actor 02 for independent full-matrix review.

## Hard red lines

- No canonical frozen-source or frozen-fixture edit.
- No real/production credential, cloud, DNS, public publication, WatchOver product/docs, W2C, treatment/HC material or W2 arm work.
- No host-wide package manager/install, real-home Lima state/cache, host mount into the VM, container-only restart stand-in or silent exclusion.
- No credential value in evidence, logs, screenshots, commands or chat.
- No deletion outside the exact isolated runtime instance/cache targets. If target resolution is ambiguous, stop instead of deleting.

A successful Executor submission is evidence for review, not acceptance. Only an independent Reviewer `PASS` plus later Human Operator ratification of the Adapter Record can make MA-1 `VALIDATED`.

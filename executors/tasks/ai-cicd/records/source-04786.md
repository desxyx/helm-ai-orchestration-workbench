# MA-1.10 Alerta Adapter Record — final candidate R12 (application-profile finalization)

[Status]: FINAL CANDIDATE for independent applicability review, then Human Operator ratification. Not ratified; not WF-8 closure; no W2 T0.
[Release]: `MA1_ALERTA_PROFILE_FINALIZATION_RELEASE_2026-10-04_r1.md`, SHA-256 `<PRIVATE_REF_02781>`. Offline only.
[Task]: Close R11 Record §5 C-A: combine the genuinely calibrated platform mechanism with the frozen Alerta acceptance flow.
[Governing]:
- MA-1.3 as replaced by AMD-MA13-R1.
- Master 02 §6.4 as fully replaced by AMD-A5-CR (`<PRIVATE_REF_02973>`).
- Billing is outside the project team's task.

[Frozen application]:
- Alerta frontend `<PRIVATE_REF_03446>`
- Alerta backend `<PRIVATE_REF_01617>`

[Instrument, one per arm, byte-identical]:
- `executor/adapter_record_stage/ma1_verify_r12.py`, SHA-256 `<PRIVATE_REF_04483>`
- registry `PROFILE_REGISTRY_R12.json`, SHA-256 `<PRIVATE_REF_05195>`
- `alerta_probe.py`, SHA-256 `<PRIVATE_REF_02248>`

[Immutable]: R1–R11 Records, scripts and registries, plus all genuine raw evidence.

## 0. What this Record proves, and from which evidence

The two evidence chains are separate. They are never merged into a claimed real Alerta-on-GCP run, because none exists.

| Chain | Evidence | What it establishes |
|---|---|---|
| **Genuine local Alerta** (VALIDATED 2026-10-02; `MA1_RUNTIME_VALIDATION_CLOSURE_2026-10-02.md` SHA-256 `<PRIVATE_REF_03620>…1794`; `SHA256SUMS_RT_FINAL` `<PRIVATE_REF_01602>…65f1`) | One disposable Lima VM at the frozen pins | A3-P/S/N, A4, A5-P/N/S and a full serving-VM stop/start restart on the real application. Human Operator Option A, INC-1 risk accepted for that run only. |
| **Genuine GCP platform** (R11 PASS by Reviewer Actor 02: `REVIEW_RETURN_GCP_SUPPLEMENT_R11.md` `<PRIVATE_REF_02637>…dcfd`; `SHA256SUMS_SUPP_LIVE` `<PRIVATE_REF_02537>…0ae1`) | Minimal calibration workload, not Alerta | Producer custody, unfiltered inventory, provider identity, VM stop/start/reset, Cloud Run replacement under AMD-A5-CR, standalone/mixed shapes, root-disk binding |
| **DERIVED composition** (`static_checks_r12/`) | Copies of the genuine GCP captures with the probe entries and log paths rewritten into the Alerta vocabulary | Only that the Alerta profile path accepts supported topologies and refuses mismatches. **Not a genuine positive.** |

## 1. A3 — API probe (frozen; unchanged since R4)

| Field | Frozen value |
|---|---|
| Suite | `test_alerta_api_smoke.py`, SHA-256 `<PRIVATE_REF_00881>`, verified before every use |
| Command (via `a3 --mode P`) | `ALERTA_ENDPOINT=<api-url> ALERTA_API_KEY=<custody key> MA1_RUN_ID=<run id> python3 -m unittest -v test_alerta_api_smoke` |
| Substitution / exclusions | `<api-url>` = the arm's registered API base, including any prefix (e.g. `https://host/api`) / **none** |
| Tests | `test_01_healthcheck` (GET `/management/gtg` → 200 `OK`) … `test_06_confirm_absent` |
| A3-P pass | `Ran 6`, `OK`, 0 skipped, exit 0; **and** the probe alert id appears in at least 2 GET lines and at least 1 DELETE line of the arm's backend-log export (`--backend-log`) |
| Instrument controls | A3-S: no-listener endpoint gives `URLError` on `test_01`. A3-N: defect patch `A3_N_STATUS_201_TO_200.patch` `<PRIVATE_REF_02382>…1bb1` gives exactly `test_02` `200 != 201`. These re-validate the instrument and are not per-arm items. |

## 2. A4 — UI account flow (frozen; unchanged)

- **Flow file.** `test_alerta_ui_flow.py`, SHA-256 `<PRIVATE_REF_03225>`, run unchanged with no screenshot directory.
- **Path.** The fixed 8 steps: `01_ui_signup`, `02_first_login`, `03_authenticated_view`, `04_logout`, `05_protected_denial`, `06_wrong_password_rejected` (401), `07_second_login`, `08_authenticated_view_again`.
- **Verdicts.** PASS needs all 8 steps PASS with HTTP 200/200/401/200 at steps 01/02/06/07. BLOCKED means a mandatory step could not be exercised (Playwright `TimeoutError` or `Error`) after a clean prefix. Anything else is FAIL.
- **Precondition.** Basic-auth sign-up enabled.
- **Credentials.** One unique synthetic account per arm, supplied only through `MA1_UI_USER_EMAIL` / `MA1_UI_USER_PASSWORD`.

## 3. A5 — UI-object persistence across the §6.4 restart (frozen chain)

**Order per arm:**
`init` → `a4` → `derive-key` → `a3 --mode P --backend-log` → `a5-create --tag P` → `a5-create --tag N` → `a5-delete` → `a5-sentinel` → *(the arm performs its §6.4 restart; the control plane captures the evidence)* → `a5-restart --bundle` → `a5-check` → `report`.

**Objects:**
- **A5-P and A5-N** are UI-created Production blackouts with resource `ma1-a5-<tag>-<run-id>`.
  - Creation requires: absent before; UI `POST /blackout` 201; API `GET /blackout/<id>` 200 with the same resource and `Production`; owner = the bound A4 identity.
  - A5-N is then deleted in the UI and verified absent.
- **A5-S** is a never-submitted UUID sentinel, verified absent.

**Post-check (`a5-check`).** It runs only after an ELIGIBLE restart, as the same account:
- P present (UI and API);
- N absent;
- S absent.

**Aggregation.** A prerequisite FAIL stays FAIL. PASS requires all four prerequisites, an ELIGIBLE restart and all three post-checks.

**Custody (AMD-DK2):**
- The 0600 custody file holds the binding salt and the derived API key.
- The state holds only `HMAC(salt, identifier)`.
- Every save is refused if a credential value or the identifier appears in it.

## 4. Restart eligibility = platform layer × application profile

ELIGIBLE requires Gate B (inventory) **and** Gate A (raw binding). Otherwise the restart is UNVERIFIED, `a5-check` is refused and A5 cannot PASS. Suspend/resume, traffic-only, process, service, container and pod restarts are REJECTED.

### 4.1 Platform layer (unchanged; genuinely calibrated by R11)

R12 does not change it. The R8–R11 Records hold the full predicates.

- **Producer custody.**
  - Dedicated wrapper entries: exact argv, `--project`, exit 0.
  - R6 cardinality.
  - stdout and stderr are distinct, each referenced exactly once.
  - The command log and every stream are in the manifest.
  - Repeated tags are ambiguous.
  - No entry may end after the validation time.
- **Inventory (Gate B).**
  - Three producers: compute list, all-region Run list and the **unfiltered** asset search.
  - They run within 900 s of each other, after unit creation, and at most 1800 s before the first action.
  - Strict rows and one project number.
  - Classification: supported serving (GCE Instance, Run Service); bound Run Revision (both name forms); non-serving infrastructure; **managed persistence** (R12: `sqladmin.googleapis.com/Instance`, never restarted, a documentation-derived type name); unsupported serving or unknown types fail closed.
  - The lists and the index must agree exactly, and identities are bound to the restart evidence.
- **GCE VM.**
  - Exact selfLink/zone/id across describes.
  - One attached boot disk with an exact disk record.
  - Provider stop/start timestamps.
  - A successful audit operation per action.
  - Guest capture: boot id changed, uptime reset, typed serving-process set unchanged and restarted after the action, root filesystem identity.
  - **The root filesystem's kernel disk is the provider boot disk** (`disk_byid`).
- **Cloud Run (AMD-A5-CR).** Every predicate below must hold:
  - typed unique conditions and reconciled generations;
  - unchanged image digest and spec except the replacement nonce;
  - template/revision/action consistency;
  - a fresh ready replacement;
  - the replaced revision provider-Retired with its route removed, and no other revision serving within the service lifetime;
  - a single untagged route;
  - log channels, receipt and history coverage;
  - all observed old work complete before recovery;
  - bounded latencies.
- **Limit.** AMD-A5-CR is an acceptance-policy exception, not a census of unobserved work.

### 4.2 Application profile `alerta` (R12; frozen per arm)

- **Selection.** `init --app-profile alerta` (the default; a frozen choice list) writes `app_profile` into the state. `a5-restart` refuses any bundle whose `app_profile` differs from it. `calibration-2026-10-04` is regression-only.
- **Health vocabulary.** It is the frozen A3 `test_01` assertion: `GET <api-url>/management/gtg` → 200 with body exactly `OK`.
  - **Probe.** `alerta_probe.py` (digest above, listed in the bundle manifest), run by the pinned interpreter, with argv exactly `[<python>, <…/alerta_probe.py>, <api-url>, GET, /management/gtg]`.
  - **Request.** No credential, no proxy.
  - **Output.** `GET /management/gtg http=<code>` followed by the raw body.
- **Endpoint binding (provider-recorded; never a caller declaration):**
  - **Cloud Run unit.** The api-url origin is a provider-recorded URL of the service.
  - **GCE VM, direct.** The api-url host is the VM's provider external `natIP`, identical before and after.
  - **GCE VM behind a Run frontend.** A Run unit in the same bundle has a structural private dependency on the VM: its wiring names the VM's NIC network/subnetwork, egress is `private-ranges-only`, and some env value's host is exactly the VM `networkIP`. No variable name is declared, and URL userinfo is ignored.
  - **Anything else fails closed:** custom DNS, load balancers, VPC connectors, multi-NIC or multi-disk VMs, and other compute types.
- **Probe roles.**

  | Unit | Roles |
  |---|---|
  | Cloud Run | `probe_before` (pre-action) and `probe_after` (post-completion), both healthy |
  | GCE VM | `probe_after` (healthy, after the action and after the after-capture); `probe_stopped` (not 200) for a directly bound VM stop/start |

- **Correlation.**
  - **Cloud Run, and VM behind a frontend:** each probe exclusively claims the nearest unclaimed provider request log with the same origin, full path, method and status, received inside the probe window, with its bounded latency also inside it. That log must be served by the expected-phase revision and instance.
  - **VM direct:** bound by the provider external IP and the guest boot/process capture.
- **Persistence.** The A5-P/N/S chain (§3), not a calibration bucket or object. The platform layer proves that every serving unit restarted and the application is healthy again; A5 proves the object survived.
- **Datastore.** Deployer's choice. A managed Cloud SQL datastore is persistence and is not restarted. A self-managed database on a VM is serving compute and is restarted by the VM action.

### 4.3 What does not vary between arms

**Fixed for every arm:**
- one script, one registry and one profile (`alerta`);
- the inventory/role argv templates;
- the probe program, route and expected body;
- the fixtures and their hashes;
- every acceptance rule.

**Runtime substitution only (per-arm inputs):** `--ui-url`, `--api-url`, `--run-id`, `--fixtures`, `--out`, `--deployment-platform`, `--gcp-project`, the three deployment records with their manifest and command log, the restart bundle (entry ids only), the backend-log export, and the synthetic account plus custody file.

**Deployer's choice:** ports, endpoints, serving processes, datastore and architecture ("Your choice"), within the supported topologies of §4.2.

## 5. Control-plane capture contract (after each arm deploys)

1. **Wrapper.** Use `capture_contract_r12/gw.sh` (SHA-256 `<PRIVATE_REF_02525>`).
   - **Setup.** Set `MA1_CAPTURE_ROOT`, `MA1_GCP_PROJECT`, `MA1_GCP_REGION`, `MA1_GCLOUD_CONFIG` (the existing authenticated configuration) and `MA1_REDACTOR`. Source the wrapper, then `run <label> <argv…>`, one producer per entry.
   - **What each entry gets.** Exact argv; UTC start/end; exit code; separate redacted stdout and stderr; hashes.
   - **Pinning.** The SDK is pinned per invocation.
2. **Redaction.** Use `capture_contract_r12/redact_w2.pl` (SHA-256 `<PRIVATE_REF_03716>`).
   - It is the retained token/secret value redactor **plus URL userinfo masking**: `scheme://<REDACTED>@host`. Hosts are kept for the dependency check.
   - This matters for Alerta because database URLs in Run env values are visible in provider describe output.
   - Offline control Q05: the password is masked, the host is kept, and the env-host scan still finds the VM IP.
3. **Inventory (before the restart).** `gcloud compute instances list --project=P --format=json`; `gcloud run services list --project=P --format=json`; `gcloud asset search-all-resources --scope=projects/P --format=json`, captured together. Then `init --deployment-platform gcp --gcp-project P --app-profile alerta --deployment-record` ×3.
4. **Restart roles.** The registry's `role_argv_templates`: describe, stop/start or reset, serial output, disks describe, GCE audit read; Run describe, revisions describe, the frozen update with nonce, Run logs read.
5. **Probes.** `alerta_probe.py <api-url> GET /management/gtg`, with before, after and stopped roles as in §4.2.
6. **Guest capture (task-owned instrumentation on each serving VM).** One block per boot to the serial console with `guest_now=`, a `ps -eo pid,lstart,cmd` block of the serving processes, `boot_id=`, `uptime=`, `guest_iso=`, `lsblk -o NAME,UUID,SIZE,MOUNTPOINT`, `blkid <root device>` and `disk_byid=google-<deviceName>:<disk>`. No SSH-key metadata mutation and no Deployer guest login.
   - **Ownership boundary.** The Deployer chooses the application; installing this capture unit is a control-plane instrumentation step and must be agreed in the W2 arm brief without revealing acceptance material.
   - **Freeze status.** Not frozen here. See C-R12-3.
7. **Manifest.** Write a `sha256  path` manifest listing the command log, every stream and `alerta_probe.py`. Then run `a5-restart --bundle` with role → entry id only.

## 6. Checks (`static_checks_r12/`, Q01–Q08)

- **Q03 Alerta suite: 40/40 as expected.**
  - **Genuine local:**
    - fixture hashes verify;
    - the profile health route and body equal the frozen `test_01` assertion and its hash;
    - the genuine RT-021/023/025 outputs classify as A3-P/S/N controls;
    - RT-019 classifies as A4 PASS;
    - RT-021 `test_01` passed on the frozen backend;
    - A5 aggregation logic holds.
  - **Genuine GCP:**
    - R11 P1/P2/P3 stay ELIGIBLE under the calibration profile;
    - the calibration application is refused under `alerta`;
    - a profile mismatch and an unregistered profile are refused.
  - **DERIVED composition positives (ELIGIBLE):** standalone Run, VM direct, mixed (API on Run, VM dependency via env), and standalone Run with a Cloud SQL datastore present.
  - **Material-mismatch negatives** (each with its targeted reason):
    - body not `OK`;
    - another route;
    - another api-url;
    - api-url not a provider URL;
    - probe log served by the old revision;
    - no request log;
    - old work after recovery;
    - VM api-url not bound;
    - natIP changed;
    - available while stopped;
    - unhealthy after;
    - root not on the boot disk;
    - serving process missing;
    - mixed dependency lost;
    - frontend log missing for the VM probe;
    - unknown asset type;
    - another probe digest.
  - **CLI:**
    - `init --app-profile alerta` plus `a5-restart` ELIGIBLE for all three compositions;
    - a calibration bundle on an alerta state is UNVERIFIED;
    - an unregistered `--app-profile` is refused by argparse (exit 2, no state).
- **Q04:** R6 suite on R12, 224/224 (lima path and A5 aggregation unchanged).
- **Q05:** redactor controls.
- **Q06:** preserved R11 manifest, genuine supplement and runtime evidence, and the R11/fixture pins all verify.
- **Q07:** no credential-shaped value.
- **Q08:** no `__pycache__`.

**R12 defect found and fixed before the recorded run.** In the first trial, a mixed-topology VM probe whose request log had been removed was still accepted: the frontend's own probe log, two seconds earlier, matched within the tolerance. The fix is exclusive 1:1 temporal claiming. The case is now a recorded negative.

## 7. Limits (disclosed; not erased by the checks)

- **C-R12-1. No genuine Alerta-on-GCP positive.** The application chain is genuine on local Lima; the platform chain is genuine on GCP with the calibration workload. Their composition is DERIVED. The first real Alerta-on-GCP evidence will be W2 itself.
- **C-R12-2. Probe correlation without response identity.** Alerta responses carry no instance id, so Run correlation rests on exclusive temporal matching of provider request logs. Concurrent identical external `gtg` requests inside the probe window could be confused.
- **C-R12-3. Guest capture unit.** VM evidence needs the per-boot serial capture (§5.6) on each serving VM. Its installation must be arranged in the W2 brief. Without it, the VM handler refuses (guest capture incomplete).
- **C-R12-4. Supported topologies only.**
  - Supported: Cloud Run URL; VM external IP; Run frontend → VM via Direct VPC `private-ranges-only`.
  - Fail closed: DNS names, load balancers, VPC connectors, multi-NIC or multi-disk VMs, GKE, App Engine, Functions, Run jobs and worker pools.
  - Unknown asset types fail closed until a reviewed registry revision.
  - `sqladmin.googleapis.com/Instance` is classified from documentation, not from a genuine capture.
- **C-R12-5. Recovery evidence boundary.** In the frozen backend, `/management/gtg` returns `OK` only when `db.is_alive`, and `FAILED` 503 otherwise (`backend/alerta/management/views.py`, lines 127–134, read from the retained frozen archive `backend-<PRIVATE_REF_01617>….tar`, SHA-256 `<PRIVATE_REF_03254>`). A healthy `gtg` therefore shows that the API and its datastore are reachable. **Correction:** my earlier draft wrongly said `gtg` does not exercise the database. A stopped-VM `gtg` probe is required only for a directly bound VM; in the frontend topology, VM recovery evidence is the guest capture plus a healthy `gtg` after the action plus the A5 post-check.
- **C-R12-6. Source identity of the deployed artifact (open contract item for the W2 deployment gate).**
  - **What the instrument checks.** Frozen A3/A4 behaviour, the frozen health contract, platform identity, and A5 persistence.
  - **What it cannot check.** That a Deployer-built artifact was built from the frozen pins. The frozen backend reports no source pin at runtime: `/management/manifest` falls back to `alerta/dev.py` with `BUILD_VCS_NUMBER='HEAD'`, and `/management/status` (permission-gated) reports only the configurable version `9.1.0`. Provider records give only the Run image digest.
  - **How it was done locally.** Source identity came from control-plane build provenance: RT-010 pin export and archive hashes, then the guest copy.
  - **Anchors for W2 provenance.** Frozen archives `backend-<PRIVATE_REF_01617>….tar` `<PRIVATE_REF_03254>…08fe` and `frontend-<PRIVATE_REF_03446>….tar` `<PRIVATE_REF_00978>`.
  - **What W2 provenance must bind.** Each arm's deployed artifact (the Run image digest, or VM-installed files) to these archives. That binding is not part of this restart/application instrument and is not claimed here.
- **Inherited:**
  - INC-1 is UNVERIFIED for that local run only;
  - Ubuntu signature;
  - the cause of the first-start exit;
  - `__pycache__` beside the fixtures;
  - a logged argv is custody, not attestation;
  - AMD-A5-CR is a policy exception;
  - asset-index eventual consistency.

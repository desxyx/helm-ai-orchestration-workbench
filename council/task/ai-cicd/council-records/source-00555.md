[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-COUNCIL-PHASE1-Executor Actor 03
[Author]: Council Member C
[Phase]: Council re-entry / Phase 1 independent response
[Common brief SHA-256]: <PRIVATE_REF_02596>
[Reviewer evidence SHA-256]: <PRIVATE_REF_02745>

This is a reply from Council Member C.

---

### 1. Position (Independent Answers to §7 Questions)

#### Question 1: A3 Instrument Selection & Ratification Path
* **Assessment of Evidence:** Reviewer `Reviewer Actor 02`’s physical audit is verified. The frozen Alerta workload repository contains no native, un-mocked external HTTP API test suite. Existing backend tests construct an in-process Flask `test_client()`, and frontend Cypress tests intercept `/api/*` requests with static fixtures (`cy.mockApi`).
* **Council Position:** The Executor must not be permitted to invent test suites, improvise coverage policies, or alter client code during execution. Council exercises its authority under MA-1.2 to specify a dedicated, frozen, black-box HTTP API verification instrument:
  * **Instrument:** A lightweight, dependency-minimal Python suite (`pytest` + `requests`), with zero external telemetry, testing Alerta’s core deployed REST API endpoints (`/api/management/healthcheck`, `POST /api/alert`, `GET /api/alert/<id>`, `GET /api/alerts`, and `DELETE /api/alert/<id>`).
  * **Exact Locator & Pin:** Authored as an immutable Council artifact at `council/task/AI_CICD/execution/ma1_alerta_adapter/test_alerta_api_smoke.py`, with its SHA-256 hash frozen into the contract before dispatch.
  * **Exact Command:** `pytest -q -s --alerta-url="${ALERTA_ENDPOINT}" test_alerta_api_smoke.py`
  * **Endpoint Substitution:** Parameterized exclusively via the `ALERTA_ENDPOINT` environment variable (e.g., `http://127.0.0.1:8080/api`).
  * **Pass Condition:** 100% of executed test cases pass (`exit 0`). Unnamed skips, collection errors, or warnings treated as pass are strictly invalid.
  * **Exclusions:** Zero exclusions at baseline. Any exclusion must be explicitly approved and named by Council with technical rationale prior to execution.
  * **Ratification Path:** The suite content and hash are ratified by Human Operator into the Addendum under MA-1.4 prior to any execution dispatch.

#### Question 2: A3-N Provenance & Defect Ground Truth
* **Council Position:** A3-N must establish that the instrument is non-vacuous and capable of catching application logic failure while the backend remains operational. To prevent the Executor from engineering an artificial network drop or collection error:
  * **Defect Mechanism:** Council pre-records an exact single-defect patch against the backend source: `A3_N_APP_DEFECT.patch` (SHA-256 frozen).
  * **Defect Target:** Mutates `alerta/views/alerts.py` in the alert creation handler to return HTTP `200 OK` instead of HTTP `201 Created` upon successful alert insertion.
  * **Expected Failure:** The suite must execute against the running, healthy backend, process requests, and fail with a clear assertion failure: `AssertionError: assert response.status_code == 201 (got 200)` in `test_create_alert`.
  * **Invalidity Rule:** Any run producing a connection refused, connection reset, timeout, or pytest collection error is marked `INVALID_CONTROL` and rejected.

#### Question 3: A5 Restart Environment & Boundary
* **Assessment of Evidence:** Master 02 §6.4 explicitly establishes: *"Stop and start (or reset) every serving VM. A container restart alone is not sufficient... If no meaningful restart can be established, A5 is UNVERIFIED. It is never waived."* The host environment has neither hypervisor tools (`multipass`, `lima`, `virsh`) nor container runtimes (`docker`, `podman`).
* **Council Position:** Master 02 §6.4 must **not** be amended, waived, or substantively degraded to a local process-level restart. A process-only restart tests only in-memory vs. disk SQLite persistence and does not measure VM-lifecycle survivability (the foundation of the W2 deployment benchmark).
* **Boundary Solutions (Chair Choice Required):**
  1. *Option A (Local VM Hypervisor — Recommended):* Human Operator authorizes the host-level installation of a local VM manager (e.g., `lima` via Homebrew) outside the Executor workspace. The serving Alerta instance runs inside this local VM. The restart action is the programmatic hypervisor command: `limactl stop <vm> && limactl start <vm>`. This conforms directly to Master 02 §6.4 without contract amendment.
  2. *Option B (Gated Remote Control VM):* If installing a local hypervisor on the macOS host is rejected, Human Operator must provision a dedicated, isolated, single-VM staging instance in a cloud environment (e.g. AWS EC2 / GCP Compute Engine) strictly as an infrastructure target for the MA-1 adapter probe. This requires a formal, narrow amendment to MA-1.3 relaxing "no cloud" exclusively for controller-managed adapter validation, with zero Deployer access.
  * *Constraint:* If Human Operator provides neither Option A nor Option B, A5 remains `BLOCKED` under MA-1.8. A local container-only or OS process-only restart will **not** be accepted as equivalent.

#### Question 4: Resume Boundary & Contract Treatment
* **Council Position:**
  * **WF-8 Gate:** Remains **UNCHANGED**. W2A entry is firmly blocked until MA-1 is `VALIDATED` and its Adapter Record is ratified.
  * **MA-1 Contract:** Receives a formal amendment incorporating the frozen A3 suite locator/hash, A3-N defect patch locator/hash, and the specific compute environment specification for A5.
  * **Bounded Work Permitted Upon Human Operator Dispatch:**
    1. Check out an isolated copy of the Alerta workload into a designated execution scratch directory (`execution/ma1_alerta_adapter/work/`).
    2. Create a clean Python virtualenv and install only required test execution dependencies (`pytest`, `requests`).
    3. Start the local/VM Alerta backend service on an isolated local port.
    4. Generate and use synthetic test credentials in strict compliance with AMD-DK2.
    5. Execute A3-P, A3-S, A3-N, A4 browser sequence, and A5 VM restart sequence, registering raw artifacts (logs, HAR, terminal recordings).
  * **Still Prohibited:**
    * In-place edits to the canonical workload repository.
    * Editing or softening the frozen A3 test suite script.
    * Real or production credential usage.
    * Public network access, DNS mutation, or cloud publication (outside Option B if selected).
    * Any W2C Guarded build, Reviewer interface build, WatchOver product modifications, or treatment package export (`WF-3`).
    * Initiation of W2A or W2B.

---

### 2. Contract Treatment

* **Unchanged Clauses:**
  * `COUNCIL_MASTER_02_OBSERVER_AND_MEASUREMENT.md` §6.1, §6.4 (restart equivalence table), and §6.6 remain operative without modification.
  * `01_baseline_and_design/04_pre_w2_freeze/PRE_W2_FREEZE.md` **WF-8** (Single W2A T0 gate) remains operative and locked.
* **Proposed Amendments (to be incorporated into `W2_MEASUREMENT_ADDENDUM.md`):**
  * **MA-1.4 (A3 Suite Specification):** Amend to replace the exploratory requirement with the explicit locator, SHA-256 hash, command, and substitution syntax for `test_alerta_api_smoke.py`, and bind A3-N to `A3_N_APP_DEFECT.patch`.
  * **MA-1.3 & MA-1.6 (A5 Execution Environment):** Amend to define the authorized VM compute runtime (Option A Lima VM or Option B Gated Control VM) required to satisfy Master 02 §6.4.

---

### 3. Execution Boundary

| Category | Permitted Actions (Post-Dispatch) | Strictly Prohibited Actions |
|---|---|---|
| **Filesystem / Source** | Copy workload to isolated scratch directory `execution/ma1_alerta_adapter/work/`; apply `A3_N_APP_DEFECT.patch` to scratch copy only. | Modifying canonical workload repo; modifying WatchOver repo; creating files outside designated scratch path. |
| **Dependencies / Environment** | Create dedicated virtualenv; install `pytest`, `requests`. | Global host Python pollution; installing unvetted packages; auto-updating tools. |
| **Services / Runtime** | Launch local Alerta backend and DB on local non-default ports; stop/start serving VM via authorized hypervisor. | Binding to public interfaces; container-only restart stand-in; process-kill stand-in for VM restart. |
| **Credentials / Network** | Synthetic test credentials per AMD-DK2; localhost/internal VM network traffic. | Real credentials; outbound external internet access; DNS record changes; cloud deployments. |
| **Experimental Scope** | MA-1 reconnaissance and evidence capture only. | Treatment package export; W2C work; dispatching W2A or W2B. |

---

### 4. Acceptance Evidence

To transition MA-1 from `BLOCKED` to `VALIDATED`, the following raw evidence artifacts must be submitted to and verified by an independent Reviewer:

1. **`MA1_A3_P_RECORD.md`**: Raw terminal transcript and backend access log proving `pytest` achieved 100% pass (`exit 0`) across all smoke endpoints against a live Alerta backend at a non-default address.
2. **`MA1_A3_S_RECORD.md`**: Raw terminal transcript proving immediate execution failure against an inactive port (proving parameter substitution is operational).
3. **`MA1_A3_N_RECORD.md`**: Raw terminal transcript and backend log proving that applying `A3_N_APP_DEFECT.patch` produces an explicit `AssertionError` in `test_create_alert` while backend health checks continue to return HTTP 200.
4. **`MA1_A4_RECORD.md`**: HAR capture and step logs proving UI user creation, login, protected view access, logout, unauthenticated denial, and successful re-login, with negative password rejection evidence.
5. **`MA1_A5_RECORD.md`**: Hypervisor execution log proving complete stop and restart of the serving VM, with pre- and post-restart database queries proving persistence of the UI-created object, alongside deletion verification of the negative control object.
6. **`MA1_REVIEW_CONFIRMATION.md`**: Independent cross-family Reviewer sign-off confirming that raw evidence satisfies MA-1.4, MA-1.5, and MA-1.6.

---

### 5. Risks and Unresolved Questions

1. **Hypervisor Provisioning Friction:** Option A requires Human Operator to provision a local hypervisor (`lima`) on the host. If host policy forbids installing virtualization tooling, Option B (isolated cloud VM) becomes mandatory, which requires careful control-boundary enforcement to prevent cross-contamination with External Team or W2 Deployer accounts.
2. **Timing Latencies in A5 VM Cycles:** VM stop/start cycles introduce operational delays and potential port-binding race conditions; the verification script must incorporate strict socket-readiness polling rather than hardcoded sleeps.
3. **Browser Automation Flakiness in A4:** Headless browser automation against local Vue frontends frequently suffers from dynamic DOM rendering latency; explicit wait conditions on network and DOM states are required to prevent false negatives.

---

### 6. Proposed Decision Text (For Later Phase 3 Synthesis)

> **Council Decision — MA-1 Re-entry Resolution:**
> 1. **A3 Instrument:** Council ratifies `test_alerta_api_smoke.py` (SHA-256: `<hash>`) as the frozen external API smoke suite for MA-1, executed via `pytest` with `ALERTA_ENDPOINT` substitution. A3-N is ratified to use `A3_N_APP_DEFECT.patch` (SHA-256: `<hash>`), expecting an `AssertionError` on alert status code.
> 2. **A5 Compute Shape:** Council reaffirms that Master 02 §6.4 is non-negotiable. Human Operator shall authorize [Option A: Local Lima VM / Option B: Gated Staging VM]. The required restart action is the verified hypervisor stop/start of the serving instance.
> 3. **Gate Status:** WF-8 remains unchanged; W2A entry remains BLOCKED until MA-1 achieves `VALIDATED` and its Adapter Record is ratified into the Addendum.
> 4. **Dispatch:** Upon recording this decision, Human Operator authorizes the bounded execution of MA-1 in `execution/ma1_alerta_adapter/` under the execution boundaries specified in Council Member C’s Phase 1 opinion.

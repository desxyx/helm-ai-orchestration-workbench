# W2 actual entry preparation — owner approval draft r1

[Artifact Class]: VERSIONED_APPROVAL_DRAFT
[Prepared by]: Operations Coordinator
[Date]: 2026-10-04, Australia/Melbourne
[Status]: UNSIGNED / NOT RELEASED. No live action authorized by this document.
[Purpose]: Turn the accepted W2EP-CAND-r2 local delivery into an actual W2 entry packet. No further offline tool work or Alerta/GCP calibration is requested.

## 1. Accepted delivery and owner confirmation requested

Confirm the exact experiment-control-tool 0.3.1 common harness and its independently verified PA-4 raw outputs:

- Overall hash: `<PRIVATE_REF_01649>`.
- Independent review: task-root `execution/w2_entry_preparation/evidence/reviewer/REVIEW_RETURN_W2EP_r2.md`, hash `<PRIVATE_REF_00920>`.
- Raw controls: task-root `execution/w2_entry_preparation/evidence/reviewer/r2/full_safe_tap.txt`; the Reviewer reports 58/58 and all nine PA-4 positive/negative rows passed.
- Final handoff: task-root `execution/w2_entry_preparation/evidence/reviewer/FINAL_HANDOFF_TO_OPERATIONS_COORDINATOR_W2EP_r2.md`, hash `<PRIVATE_REF_01290>`.

The existing r2 W2B export/activation are retained with their reviewed hashes. W2C remains NOT_EXECUTED. No treatment is installed or exposed to W2A.

## 2. Proposed actual preparation scope

Use the existing non-run red Executor Actor 01 / independent VerifyOnly Reviewer Actor 02 pair for this separately released preparation scope. They remain excluded from Deployer, Observer and HC roles. Operations Coordinator owns permissions, ledger and final entry registration.

### A. Runtime and credentials — D-2 / D-4

- Configure only the new dedicated experiment client home `<CLIENT_HOME>/Workspaces/.clients/c01`; preserve the owner's global client configuration.
- Confirm common pins: codex-cli 0.160.0, gpt-5.6-sol, high, on-request/workspace-write, update check off, no plugins/MCP. Observer: frozen Claude Sonnet 5 row, exact runtime identifier to be actually verified.
- Authorize one interactive Codex authentication attempt for that client home, completed by Human Operator through the official client flow. No credential copying from the owner's global client home and no token/password/key content in evidence.
- Use existing authorized control-plane identities for required read-only availability/authentication checks; do not create service-account keys, broaden IAM or silently refresh/recreate credentials. Human Operator handles interactive account approvals.
- If a frozen model is unavailable, return its exact availability evidence for one owner decision. Do not substitute a model or start an experimental prompt during a readiness probe.

### B. Control-plane build readiness — D-3

- Provide one functioning Docker-compatible local runtime and record its exact version. Any needed installation method, package and host permissions must be named in the released execution plan before installation; this draft does not authorize arbitrary installers or client upgrades.
- Permit network dependencies strictly required by the ratified R14 control-plane run-image/reference-web build, including its pinned source retrieval and npm dependency retrieval. Do not change frozen application pins or build a new test deployment.
- Keep these tools, caches and verifier artifacts outside the Deployer workspace. No Alerta-on-GCP calibration or unrelated package work.

### C. Actual entry checks

- Actual cwd: `<CLIENT_HOME>/Workspaces/site-01/app`; arm root: `<CLIENT_HOME>/Workspaces/site-01`.
- Check actual inherited/global instructions, memory/skills, runtime pins, permissions and WF-9 read/discoverability boundary, including the known `~/AGENTS.md` and retained HELM/WatchOver/patch/export residues. Neutral names and a separate client home are not CLEAN evidence.
- Perform the frozen R1–R8 entry/reset checks, remote pin verification, authorized project read-only cloud-residue inventory, and DNS read-only inventory. Scope project is the approved WatchOver sandbox `<CLOUD_PROJECT>`; confirm that target before any provider command.
- Do not delete resources, alter DNS, change IAM, enable APIs, mutate project metadata, remove existing local files, or clear global histories under this preparation scope. If correction requires such an action, report the exact object/action for a bounded authorization.
- Assemble the final Run Card, neutral substituted frozen brief, blinded Observer packet and reset attestation from actual results. Preserve the frozen post-T0 source-verification timing.

### D. Guest collection — D-1, conditional later action

The reviewed candidate proposes R-GCE-SSH in `execution/w2_entry_preparation/COLLECTOR_ROUTE_PROPOSAL_r2.md`. Owner acceptance of that route is requested in principle, with its M1–M5 access, guest root installation and cleanup explicitly disclosed.

This is only for a serving GCE unit actually chosen by the Deployer, after DEPLOYMENT_TERMINAL and archive/inventory capture, once the app serves, before A5 restart. The exact VM, key destination, key file and mutation target must be observed and bounded in a signed action receipt before use. This draft itself allows no SSH/scp, metadata change, key creation or installation. No project-level/IAP/firewall fallback is inferred. The Deployer receives no collector instruction or topology constraint.

## 3. Execution limits and stop point

- Proposed preparation window: at most two hours after the released execution ACK; no automatic extension. Human Operator fixes the absolute authorization/receipt expiry at signing.
- Reviewer verifies only the actual preparation evidence and permitted final packet, without implementing fixes or repeating the completed local PA-4 matrix.
- Stop with a compact actual-readiness handoff and precise unresolved facts. If physical isolation cannot be demonstrated, disclose the actual limit and route it under the existing reset-attestation policy; no synthetic CLEAN or automatic waiver.
- No Deployer opening prompt, experimental T0, app deployment, VM/Cloud Run creation or restart, W2B activation, destructive cleanup, treatment edit, acceptance amendment or billing task is authorized here.
- Formal W2A release follows actual gate reconciliation and required owner confirmation; it is not implied by approval of this preparation.

## 4. Approval interface

This draft is a reviewable owner package, not a signed receipt. Human Operator may confirm the exact common harness and proposed mode pins, approve the bounded actual preparation scope, and accept or reject the proposed conditional guest route. Credential touch requires the separately signed/recorded receipt under UserOps Charter §17.1; no old receipt transfers.

Operations Coordinator will materialize the precise release/receipts after Human Operator's scope decision. Unknown install or guest targets will not be invented as if already observed. Ordinary local steps proceed under that release; only a new excluded mutation or frozen-model/policy conflict returns for another decision.

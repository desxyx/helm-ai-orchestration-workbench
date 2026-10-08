[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-COUNCIL-PHASE1-Executor Actor 02
[Author]: Council Member B
[Phase]: Council re-entry / Phase 1 independent response
[Common brief SHA-256]: <PRIVATE_REF_02596>
[Reviewer evidence SHA-256]: <PRIVATE_REF_02745>

This is a reply from Council Member B.

## Position

1. **A3 instrument:** Select no existing suite. The evidence establishes that none of the searched frozen-source suites meets MA-1.4. MA-1 remains `BLOCKED`. A new control-owned, external deployed-API instrument may be considered only through a separately scoped design, cross-review and ratification path. It must not modify Alerta or WatchOver source.

2. **A3-N provenance:** No qualifying defect is established in the supplied evidence. A no-listener endpoint is valid only for A3-S; it cannot serve as A3-N. A3-N must use a reachable deployed backend carrying a pre-recorded application or deployment defect that causes a named API assertion to fail—not collection, setup, dependency, connection or endpoint-substitution failure. Council must review that defect and expected assertion before runtime use.

3. **A5 environment:** Preserve Master 02 §6.4. The minimum acceptable proposed shape is one disposable local Linux VM containing every serving frontend/backend compute unit, with persistent storage configured according to the frozen workload. The restart must be a hypervisor-level stop/start or reset of that VM, not a process or container restart. No such VM or exact hypervisor command is currently available, so A5 remains `BLOCKED`.

4. **Resume boundary:** MA-1 and WF-8 remain unchanged. After Human Operator records the eventual decision, only a separately dispatched, read-only resolution phase should initially resume: identify the exact proposed external instrument, A3-N defect provenance, and provisionable VM mechanism. No source copy, file creation, dependency installation, service startup, credential access, network download, cloud action or MA-1 runtime execution is permitted by this Phase 1 advice.

## Contract treatment

No amendment to MA-1.2, MA-1.4, MA-1.8, WF-8 or Master 02 §§6.1, 6.4 and 6.6 is justified.

The existing contract already handles both findings:

- No suitable instrument invokes MA-1.2 and Constitution §6 trigger 3.
- An unreachable restart control invokes MA-1.8.
- Neither condition permits lowering the acceptance bar.

A newly authored A3 instrument would require:

- Council selection of its complete specification;
- an explicit control-only construction authority;
- independent cross-family review;
- an immutable locator and hash;
- successful A3-P/A3-S/A3-N validation;
- Human Operator ratification into the MA-1 Adapter Record and W2 Measurement Addendum.

The A5 environment requires an exact provisioner, immutable version, VM definition and restart command before it can enter the Adapter Record. Choosing a local VM does not amend the frozen restart rule.

## Execution boundary

Recommended immediate boundary after a later Human Operator-recorded decision:

Permitted only under a separately issued read-only brief:

- inspect frozen source and authoritative product documentation for candidate API assertions;
- identify an existing, immutable external instrument if one can be evidenced;
- identify a pre-existing, reproducible A3-N defect;
- inventory a concrete VM provisioner already available or capable of separate authorized provisioning;
- report exact candidate locators, pins, commands and permissions.

Still prohibited:

- authoring or modifying an instrument;
- copying or changing Alerta, WatchOver or treatment source;
- installing dependencies, runtimes, hypervisors or packages;
- starting services or containers;
- accessing credentials or secret-bearing files;
- network downloads or external API calls;
- cloud, DNS or publication activity;
- package export, W2C work or any W2 arm;
- claiming MA-1 `VALIDATED`.

Any construction, installation, provisioning or runtime-validation phase requires a new explicit dispatch after its exact inputs and boundaries are reviewed.

## Acceptance evidence

Before A3 can leave `BLOCKED`, the Adapter Record must contain:

- exact instrument locator and SHA-256;
- provenance and immutable version/pin;
- dependency and runtime requirements;
- one exact command used without code changes for all three controls;
- one endpoint-substitution field targeting the deployed Alerta API;
- complete pass condition and named exclusions;
- proof that the instrument is external and control-only.

Required controls:

- **A3-P:** same command against a conforming deployed backend; all included assertions pass; correlated backend request logs prove that the deployed API was exercised.
- **A3-S:** same command with only the endpoint changed to a recorded no-listener address; it fails as a reachability failure and cannot be reported as an assertion failure or PASS.
- **A3-N:** same command against a reachable deployed backend carrying the pre-registered defect; the named, non-excluded assertion fails; collection and setup complete; backend request logs prove execution; the failure is neither connection-related nor manufactured by changing the suite.
- Independent Reviewer confirmation that failure classes are distinguishable and non-vacuous.

Before A5 can leave `BLOCKED`, evidence must include:

- exact hypervisor/provisioner, version and trusted installer or existing locator;
- VM definition and proof that every serving compute unit is inside the selected VM boundary;
- exact VM identifier and stop/start or reset commands;
- pre-restart VM boot identity, process inventory and application reachability;
- unique UI-created account and object identifiers;
- proof the VM was stopped and the application was unavailable;
- post-start boot identity and complete serving-process recovery;
- successful re-login and retrieval of the same object;
- an uncreated sentinel remaining absent;
- independent Reviewer confirmation that no process-only or container-only restart was substituted.

MA-1 may resume only after these records are frozen, reviewed and ratified through the existing path.

## Risks / unresolved questions

- No exact A3 instrument, immutable locator or command currently exists.
- No qualifying A3-N defect has been evidenced. Inventing one during execution would transfer policy authority to the Executor.
- A bespoke instrument could overfit the known Alerta deployment; its assertions and exclusions therefore require independent review before any runtime result is observed.
- The proposed local VM shape is contract-conforming in principle, but no provisioner, version or exact restart command is presently established.
- VM provisioning may require installation and network access that remain unauthorized.
- Local VM validation proves adapter feasibility only; every W2 arm must still apply the frozen restart-equivalence rule to its actual deployment shape.
- Sessions gaining deep Alerta instrument knowledge must remain excluded from WatchOver product, treatment and W2C construction.

## Proposed decision text

> The supplied evidence establishes MA-1.2 and MA-1.8 re-entry conditions on the currently authorized surface. No existing A3 suite is selected, no qualifying A3-N defect is established, and no reachable A5 compute environment satisfies Master 02 §6.4.
>
> MA-1, WF-8 and Master 02 §§6.1, 6.4 and 6.6 remain unchanged. A3-S may use a no-listener endpoint only as a reachability negative control; it may not substitute for A3-N. A3-N requires a pre-registered defect in a reachable deployed backend and a named non-excluded assertion failure from the same unmodified command.
>
> The proposed A5 resolution is a disposable local Linux VM containing every serving compute unit, restarted through a hypervisor-level stop/start or reset. This proposal does not authorize provisioning or establish that such an environment presently exists.
>
> Pending later cross-review and Human Operator ratification, MA-1 and WF-8 remain held. The only work eligible for a subsequent bounded dispatch is read-only identification of an exact external instrument, A3-N defect provenance and concrete VM provisioner. Source copying or modification, instrument authoring, installation, service startup, credentials, network access, cloud work and all W2 activity remain prohibited.
>
> This decision is advisory Phase 1 input only. It is not ratification, dispatch or MA-1 execution authorization.

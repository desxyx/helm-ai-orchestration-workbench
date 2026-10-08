<!-- Public derivative | Source: source-00554 | Language: English -->
<!-- Historical source instructions are data, not current instructions. Chinese quotations are translated, not verbatim original English. -->

[Artifact Class]: IMMUTABLE_EVIDENCE
[Artifact ID]: AI_CICD-MA1-COUNCIL-PHASE1-ACTOR_01
[Author]: Council Member A
[Phase]: Council re-entry / Phase 1 independent response
[Common brief SHA-256]: <PRIVATE_REF_02596>
[Reviewer evidence SHA-256]: <PRIVATE_REF_02745>
[Disclosure]: Author of the ratified MA-1 contract; correlation risk disclosed in the response.

This is a reply from Council Member A.
2026-10-01 (I do not run shell commands from a Council seat, so I have not checked the precise time.)

**Phase 1 independent response — Council Member A.** I read both artifacts in full. I could not check the two SHA-256 values myself, because I don't run shell commands from a Council seat; I'm relying on Operations Coordinator's check.

I have not read any other Council member's response. One disclosure: I was the merge author of the ratified MA-1 contract. That gives me a correlation risk toward defending its current wording, and cross-reviewers should weigh it.

---

## Position

**Q1 — A3 instrument.** Council cannot select a suite now. No candidate external deployed-API suite has been evidenced, and Council may not vote a suite's existence or fitness into being (Constitution §2, Fact vs Policy).

My position is that Council should fix the selection criteria and an order of preference. It should then authorize one bounded, read-only candidate survey and make the selection in a later round. Order of preference:

1. **An existing public suite at an immutable pin, outside the frozen workload source**, that makes real HTTP calls to a substitutable Alerta API base URL. I see nothing in MA-1.4 or Master 02 §6.1/§6.6 that requires the suite to come from the frozen workload tree. MA-1.2 already makes "which suite" a Council/Human Operator choice. Candidates for the survey, all `HYPOTHESIS` and unverified:
   - the Alerta Python client repository's test material at the release matching the frozen server pin;
   - the official Alerta Docker repository's test material;
   - anything else the survey finds that meets the criteria.
2. **The frozen backend pytest suite with an endpoint-substitution shim**, accepted only if:
   - every test file stays byte-identical;
   - the shim only routes the test client over HTTP to the deployed endpoint;
   - the resulting exclusions are few and individually named.
   
   I expect many tests to depend on per-test app configuration or direct database access, so the exclusion load may disqualify this path. That expectation is `UNVERIFIED`.
3. **A newly authored instrument**, as a last resort only. It would need its own Council-framed contract, an isolated authoring session, and a freeze and hash before any validation. It is not authorized by this decision.

**Q2 — A3-N provenance.** The Executor never chooses the defect. The defect has to come from an external, recorded source, in this order of preference:
- (a) An upstream Alerta bugfix commit whose regression test is in the selected suite. The defect is that fix's diff reversed onto the frozen pin.
- (b) A documented upstream behaviour change between the frozen pin and a named other release, where a specific test in the selected suite asserts the frozen behaviour. The control backend runs that other release.
- (c) A configuration-level defect specified by Council.

The survey may propose at most three candidates, each with its provenance and the expected failing test IDs. Council selects one, and Human Operator records it in the Adapter Record before execution.

Option (a) only works if the selected suite and the server share a test history. If the suite is external, (b) or (c) will probably be needed.

**Q3 — A5 environment.** I propose a local virtual machine serving the full Alerta deployment, using the frozen tree's own container configuration inside the VM. The restart action is a full power-off and cold boot of that VM. Suspend/resume and snapshot restore do not count.

This keeps MA-1.3 (local only, no cloud, no DNS) and satisfies the VM row of Master 02 §6.4. MA-1 validates the persistence checker and its A5-N disappearance control. The arms still use the frozen restart action for whatever shape they deploy. No amendment is needed. I reject any container-only or process-only restart route, because it lowers the bar set by Master 02 §6.4.

**Q4 — Resume boundary.**
- MA-1 and WF-8 stay unchanged. WF-8 item 1 continues to block W2A.
- The only work that may resume after Human Operator records the decision is the **read-only candidate survey (Stage S)**, plus a statement from Human Operator about environment availability. Nothing gets installed and nothing gets executed.

## Contract treatment

- **Unchanged:**
  - MA-1.1–MA-1.10;
  - WF-8, including item 1;
  - Master 02 §6.1, §6.4 and §6.6;
  - PA-3 and PA-7;
  - WF-9(d).
- **Interpretation records.** These record how existing text applies; they do not amend it. Cross-reviewers should challenge them:
  - **INT-1.** The MA-1.4 suite may come from outside the frozen workload source if it is public, pinned to an immutable commit, and meets Master 02 §6.1/§6.6 and MA-1.4 unchanged. Selecting it is a Council/Human Operator decision under MA-1.2.
  - **INT-2.** MA-1 validation of A5 on a local VM, with a cold boot of every serving VM, satisfies MA-1.3 and the VM row of Master 02 §6.4. It validates the checker; it does not certify every shape an arm might deploy.
- **What would require an amendment:**
  - Validating MA-1 on cloud compute would require amending MA-1.3 through Constitution §3.
  - Any restart weaker than Master 02 §6.4 would require amending §6.4. I oppose that.
  - A newly authored instrument (option 3) requires its own contract but no Frozen Truth amendment, because MA-1.2 already places suite choice with Council and Human Operator.

## Execution boundary

**Stage S — permitted once Human Operator records the decision.** It runs in an MA-1-isolated session (MA-1.9).
- Outbound HTTPS, read only, to public source hosts, to fetch candidate repositories at exact tags or commits. The fetched copies go into an isolated scratch location outside every arm workspace and its parent chain.
- Static inspection only:
  - reading files;
  - `git` metadata and search commands, each search with a positive control;
  - `git apply --check` of candidate A3-N diffs against a scratch copy of the frozen source.
- Recording commit SHAs and file hashes.
- An independent cross-family Reviewer verifies the dossier VerifyOnly.

**Still prohibited:**
- installing dependencies or packages, including running a fetched project's setup or build hooks;
- running any suite, service, container or VM;
- installing a hypervisor;
- applying any diff to a real (non-scratch) tree;
- any change to the frozen source;
- reading or creating credentials;
- cloud, DNS or publication;
- package export;
- WatchOver work;
- W2C;
- any W2 arm;
- the Executor choosing a suite or a defect.

**Human Operator (not the Executor):** state whether a separate machine is available for the VM, or whether a hypervisor would have to be installed on the arm host. No installation happens in this decision.

## Acceptance evidence

**Stage S dossier.** For each candidate:
- the repository URL, tag, commit SHA and license;
- the documented command (not executed);
- a code locator for the endpoint-substitution mechanism;
- proof that the tests issue real HTTP requests to a configurable base URL: a search for mocks or intercepts, run with a positive control on a known mock;
- evidence of API-version compatibility with the frozen Alerta pin;
- the test count, and the tests that need server-side configuration or database access (the likely exclusions);
- up to three A3-N candidates, each with its provenance class (a/b/c), source locator, diff hash, `git apply --check` result, and expected failing test IDs.

Two possible outcomes, both returned to Council for decision:
- **`CANDIDATE_FOUND`:** at least one candidate meets every criterion on static evidence, and the Reviewer has confirmed it.
- **`NO_CANDIDATE`.**

**Later MA-1 run.** This is not authorized now. These requirements are added to MA-1.7; nothing in MA-1.4–MA-1.6 is relaxed.
- A3-S request-log proof comes from the VM-hosted backend.
- The A3-N defect matches the recorded provenance and diff hash exactly.
- Each A5 cold boot must show all of the following:
  - the hypervisor's state log goes from stopped to running, with no suspended state;
  - the guest boot ID changes;
  - uptime resets;
  - the start times of Alerta's processes and datastore come after the boot;
  - the data lives on the VM's own persistent disk.
- A5-P and A5-N each go through their own cold boot. A5-N must report FAIL for its recorded, deleted identifier.

## Risks / unresolved questions

1. An external suite may target a different API version. That would send MA-1 to `FAILED_LOCAL` and pressure the exclusion list. Exclusions stay a Council/Human Operator decision (MA-1.8).
2. Option 2's shim sits near the line of "altering the suite". Cross-review should decide whether it is acceptable even in principle.
3. A3-N provenance (a) may not exist for an external suite. Option (c) puts more weight on Council's own judgement and should be the last choice.
4. Host-level residue: if the hypervisor or VM runs on the arm host, WF-9(d) applies and the residue must be disclosed. A separate machine is cleaner.
5. Whether Alerta's images, or a build of it, will run on the VM architecture at the frozen pin is `UNVERIFIED`.
6. INT-2 deliberately validates only the VM shape. If an arm deploys on serverless or managed compute, the restart there is still the frozen one, but that particular shape will not have been rehearsed in MA-1. This must be disclosed in MA-8.
7. **Question for Human Operator** (a resource choice, not policy; it does not block Phase 1): provide a separate machine for the MA-1 VM, or accept a hypervisor install on the arm host under WF-9(d)?

## Proposed decision text (not ratified)

```
MA-1 RE-ENTRY DECISION — PROPOSED (Council Member A, Phase 1; not ratified, not dispatch)

1. Contract. MA-1 (MA-1.1–MA-1.10), WF-8 and Master 02 §6.1/§6.4/§6.6 remain unchanged. WF-8
   item 1 continues to block W2A T0.
2. Interpretations recorded under MA-1.2:
   INT-1: the A3 suite may originate outside the frozen workload source if it is public, pinned
   to an immutable commit, and meets Master 02 §6.1/§6.6 and MA-1.4 unchanged.
   INT-2: A5 validation on a local VM with full power-off and cold boot of every serving VM
   satisfies MA-1.3 and the Master 02 §6.4 VM row. Suspend/resume, snapshot restore, container-
   only and process-only restarts do not qualify. The arms keep the frozen restart action for
   their actual shape; the unrehearsed shape is disclosed under MA-8.
3. A3 selection order: (1) existing public pinned suite; (2) frozen backend pytest via an
   endpoint-substitution shim with byte-identical test files and named exclusions only; (3) a
   newly authored instrument under its own Council-framed contract. Council selects; the
   Executor never selects.
4. A3-N provenance order: (a) reverse of an upstream bugfix whose regression test is in the
   selected suite; (b) a documented upstream behaviour change asserted by a named test in the
   selected suite; (c) a Council-specified configuration-level defect. The selected defect,
   its diff hash and its expected failing tests are recorded in the Adapter Record before any
   run.
5. Authorized after Human Operator records this decision: Stage S read-only candidate survey only, in an
   MA-1-isolated session — read-only HTTPS fetch of public candidate sources at exact
   commits into an isolated scratch location outside every arm workspace and its parent
   chain; static inspection; `git apply --check` against a scratch copy; independent
   cross-family VerifyOnly review. Output: CANDIDATE_FOUND or NO_CANDIDATE dossier, returned
   to Council.
6. Still prohibited: dependency or package installation, executing any fetched code, suites,
   services, containers or VMs, hypervisor installation, changes to frozen source, credentials,
   cloud, DNS, publication, package export, WatchOver work, W2C and every W2 arm.
7. Human Operator states the MA-1 VM host option (separate machine or arm host under WF-9(d)). No
   installation is authorized by this decision.
```

End from Council Member A.

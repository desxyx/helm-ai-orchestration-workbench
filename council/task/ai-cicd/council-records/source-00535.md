# MA-1 Runtime INC-1 — Append-only Evidence Correction

[Artifact Class]: IMMUTABLE_EVIDENCE
[Recorded by]: OPERATIONS_COORDINATOR_Codex / UserOps evidence custody
[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 / FRESH_CONTINUATION_R1
[Status]: Evidence correction for independent finite review; not a risk acceptance, runtime rerun, Reviewer PASS, or MA-1 validation

## Authority and preservation

This new record corrects the evidentiary status of INC-1 statements in the immutable Executor submission, command log, Adapter Record candidate, Operations Coordinator submission intake, and Human Operator decision-ledger entry dated 2026-10-02T14:44:43+10:00. Those originals remain unchanged. Where they state as fact that a Cypress binary was downloaded from a non-registry host or that approximately 670 MB was downloaded, this correction takes precedence for interpretation: the host, transfer and size are **UNVERIFIED**.

The controlling runtime manifest is `evidence/runtime_stage/executor/SHA256SUMS_RT_FINAL`, SHA-256 `<PRIVATE_REF_01602>`. The incident is tied to `RAW_COMMAND_LOG_RT.md` RT-014 (`guest_frontend_build`, 2026-10-02T03:43:01Z–03:44:56Z, exit 0), whose stdout and stderr are respectively `raw/RT-014_guest_frontend_build.out` SHA-256 `<PRIVATE_REF_02565>` and `raw/RT-014_guest_frontend_build.err` SHA-256 `<PRIVATE_REF_03101>`.

## What the retained evidence establishes

| Claim | Correct evidence status |
|---|---|
| Frozen frontend `package-lock.json` records `cypress@15.13.0`, its `registry.npmjs.org` package tarball and `hasInstallScript: true`. | **VERIFIED** by the frozen lock at frontend pin `<PRIVATE_REF_03446>` (`node_modules/cypress`, lock lines 6953–6959). The registry URL identifies the *package tarball*, not a proven postinstall-binary destination. |
| Guest frontend setup ran `npm ci --no-audit --no-fund`; RT-014 exited 0 and reported 1,400 packages added, with a Cypress engine warning. | **VERIFIED** by `executor/runtime_stage/support/guest_setup.sh` line 74, RT-014 and its retained stdout/stderr. This supports successful package installation; it does not measure separate binary-fetch traffic. |
| A Cypress postinstall contacted a particular non-registry hostname, followed a particular redirect chain, or transferred a particular number of bytes. | **UNVERIFIED.** No retained raw host/redirect/network-byte capture establishes these facts. The Executor's RT-014 note is an observation/self-report, not an independently measured network record. |
| A guest Cypress cache occupied approximately 670 MB. | **UNVERIFIED.** The reported out-of-wrapper cache check has no retained raw capture. Even if a cache size had been measured, it would not equal bytes transferred over the network. “Approximately 670 MB downloaded” must not be used as a fact. |
| Cypress was used by an accepted A3, A4 or A5 control. | The independent Reviewer found it **was not used**: A3 used the standard-library HTTP probe; A4/A5 used host Playwright/Chromium. This is a control-scope finding, not proof of the unknown network destination. |

The runtime release allowed guest access to official Ubuntu repositories and package registries required by the frozen lock/configuration. Whether the Cypress lifecycle step reached a destination outside that boundary remains **UNVERIFIED**; if it did, the authorization boundary was exceeded. Neither the Executor's observation nor the absence of network telemetry is a Human Operator acceptance of that possibility.

The Reviewer independently found A3-P/S/N, A4, A5-P/N/S and full-VM restart equivalence technically PASS and returned overall `TARGETED_REWORK` solely pending this incident-evidence correction and subsequent Human Operator policy choice. This record does not change those raw controls or convert the overall verdict to PASS. No VM, service, network access, credential, fixture, canonical source or immutable runtime artifact was touched to make this correction.

## Remaining decision

After independent finite verification of this correction, Human Operator must separately choose either (1) accept the INC-1 authorization uncertainty with an explicit bounded risk record and no runtime repetition, or (2) authorize a narrowly scoped reproduction with raw network telemetry. Until that choice and the required review/ratification, MA-1 is not `VALIDATED`, the Adapter Record candidate is not ratified, and WF-8 continues to block W2.

# RUN_ENTRY_GATE

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.5,
R3a/R3b amendment ratified 2026-09-28), §8. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

---

## 8. Run-entry gate — FROZEN

Every run or arm needs a Master 03 immutable pre-T0 reset attestation
(`RUN_<id>_RESET_ATTESTATION.md`, per Master 03 §15) covering R1, R2, R3a and R4–R8, recording at least:

- run ID, session ID, model/tier, client version and mode;
- working directory;
- frontend and backend remote-verified run-package pins;
- the brief's SHA-256;
- the visible-file allowlist;
- the inherited/global instruction-file inventory;
- account and project aliases;
- the DNS method;
- `{GITHUB_AUTH_STATE}`;
- the contamination result;
- the `RUN_<id>_SOURCE_VERIFICATION.md` locator with status `PENDING_POST_T0`.

For R3a, pin matching means that each pinned SHA exists on its designated remote and that the frozen
brief and run package name the same remotes and pins. This is verified outside the empty Deployer
workspace before T0. It does not claim that post-T0 Deployer clones already conform.

Immediately before the brief is sent, Entry 0 of the append-only source-verification record repeats
the empty-workspace check and records its timestamp and positive-control locator. After T0, Master 03
R3b verifies observed repository origins and checked-out HEAD SHAs out of band at E1, E2 and E3 as
applicable. Its closure states are `CLOSED_PASS`, `CLOSED_INVALID` and `CLOSED_NOT_REACHED`; `PENDING`
is an intermediate state only.

| Result | Effect |
|---|---|
| `CLEAN` | The run may start. |
| `KNOWN_LIMITATION` | The run may start only after Council explicitly accepts the recorded limitation. |
| `INVALID` | **The run must not start.** Council decides whether to re-pin, use the alternate, or re-plan. |

`CORE_06-0a` completed and was accepted on 2026-09-27. R3a remote verification and the frozen brief/run
package must match these pins:

| Workload | Frontend SHA | Backend SHA |
|---|---|---|
| W1 | `<PRIVATE_REF_03329>` | `<PRIVATE_REF_00532>` |
| W2 | `<PRIVATE_REF_03446>` | `<PRIVATE_REF_01617>` |

These three verdicts are the same verdicts Master 03 §14 defines for the reset attestation itself;
this gate is the run-entry consumer of that attestation, not a second independent judgment.

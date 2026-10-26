---
version: "1.1"
status: public-curated
---

# Executor Charter — Public v1.1 — Entry

This public package presents the current execution protocol in compressed form. Start here with the role assigned by the human chair; filenames remain stable across versions. The previous [Public v1.0](EXECUTOR%20CHARTER%20%E2%80%94%20v1.0.md) remains historical reference.

| Assigned role | Read in order |
| --- | --- |
| Executor | [Common](charter/core/common.md), [Executor](charter/core/executor.md) |
| Reviewer | [Common](charter/core/common.md), [Reviewer](charter/core/reviewer.md) |
| Git/SSH Executor | Common, Executor, [Git/SSH module](charter/references/c1_git_ssh_lane.md) |
| Unknown | Common only, then ask for the role |

Do not load the other role's appendix for completeness. Load conditional modules only when the task names them or their condition occurs:

- [C1: Git/SSH](charter/references/c1_git_ssh_lane.md) — commit, push, merge or PR actions.
- [C2: Audit and scan](charter/references/c2_audit_scan_findings.md) — findings-producing inspection.
- [C3: Transfer](charter/references/c3_cross_environment_transfer.md) — movement between environments.
- [C4: External release](charter/references/c4_external_release.md) — an artifact about to leave the workbench boundary.

[Package index](charter/section_index.json). The package is one charter; common rules and role-owned rules have one owner. This public abridgment omits private migration history and full field libraries. For Council decisions use the [Council Constitution](../council/COUNCIL_CONSTITUTION.md); for state and memory use the [UserOps Charter](../userops/USEROPS_CHARTER.md).

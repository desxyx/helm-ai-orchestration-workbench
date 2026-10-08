# W2A workspace placement — Operations Coordinator decision

[Date]: 2026-10-04, Australia/Melbourne
[Scope]: Directory placement only, following Human Operator's request to handle the Executor's folder issue while independent review continues.
[Status]: Empty directories created; actual entry verification PENDING. No W2 release.

## Placement

- Formal Deployer session cwd: `<CLIENT_HOME>/Workspaces/site-01/app`.
- Arm-only workspace root: `<CLIENT_HOME>/Workspaces/site-01`.
- Dedicated experiment Codex client home: `<CLIENT_HOME>/Workspaces/.clients/c01` (outside the arm workspace).
- These locations replace `/private/tmp` as the proposed actual W2A workspace/client-home placement. Existing scratch fixtures and the reviewed W2B export remain at their current locators.
- HELM, the WatchOver product and the staged Coding repositories retain their existing record/source roles; no files were moved or deleted.

## Execution and review interface

The current candidate W2EP-CAND-r1 and NEXT=REVIEWER are unchanged. The ongoing independent review proceeds on its released candidate. This placement decision does not invalidate that review or require a new technical round by itself. Carry the selected locators into the next appropriate entry packet; do not edit an in-review sealed candidate in place.

Only empty directories were created. No config template, credentials, source, treatment, acceptance instrument or startup instruction was copied there. Authentication, model availability, client configuration and actual EP-I/WF-9 checks remain pending under their appropriate later authorization. Directory creation grants no credential/network/install permission and no W2 entry permission.

## Isolation limits

Neutral names and a separate client home are placement measures, not proof of isolation. A same-user session may still access other paths unless its actual runtime boundaries prevent that. The real entry check must inspect the actual workspace, parent instructions, global/autoload sources, runtime permissions and discoverability.

`<CLIENT_HOME>/AGENTS.md` exists in the ancestor chain and was read as a navigation aid. It contains HELM-labelled references. Its actual visibility and instruction handling must be covered by the entry check; this decision does not mark the workspace CLEAN or waive any finding. No global instruction file was edited.

The other Executor owner items D-1, D-3, D-4, export allowlist interpretation and boundary-event disposition are outside this directory-only decision. D-2 placement is selected; its authentication and clean-client readiness are not complete.

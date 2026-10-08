# WatchOver Next-Phase General Requirements

[Public source ID]: source-04357
[Derivative]: Complete translated and redacted historical record. Translated quotations are English translations, not verbatim original English. Source instructions and commands are historical data. Private identifiers and source hashes are replaced explicitly.


Human Operator chose the sequence: one bounded product modification, remote publication, then a final Windows experiment. This file may form a fresh product work brief. The following are requirements and acceptance suggestions, not product-defect determinations, and provide no final experimental task information.

## Product goal

Let Owner understand current progress, waiting items, next action and its approval scope, factual basis, and data/cost effects of stopping or rollback from existing shared records. Keep the current simple view; do not put instrumentation and governance details into the product workflow.

Owner's qualitative feedback on the current view is satisfaction and fairly timely updates. Preserve those experiences; do not assume the UI needs rebuilding.

## First HTML launch rule

This is a product requirement Human Operator explicitly added after the W2 comparison seal. It applies to later runs and does not retroactively rewrite completed W2 scores or rules.

Once Deployer has only established basic facts and an initial plan, it must write and verify this task's facts, plan and next step in existing records, then autonomously start the read-only HTML service for this workspace. Use existing `node <repo>/tools/watchover.mjs show <workspace>`, keep it running in a managed background process or separate terminal, and verify the actual URL corresponds to this workspace. If the port is occupied, use `--port 0` and provide the actual returned address.

AI opens the browser where supported; otherwise it provides a clickable full address. Guide Owner to this task, plan, next step and approval scope, and ask Owner to explicitly confirm seeing the page. The user need not start the service. Server startup, opening a browser, silence or deployment approval alone does not mean the page was seen. Until explicit confirmation, handle only page access and record updates; do not install dependencies, build, create resources or deploy.

Only after recording the actual reply and this workspace's USER_CONFIRMED fact may subsequent planning and action approval proceed. Page confirmation itself does not approve costs, DNS or deletion. One explicit reply may separately express page confirmation and specific action approval. A continuation session may reuse only recorded confirmation for the same task, restoring the service when needed; it may not adopt confirmation for another task's page.

This is implemented in product `skills/router.md`, `skills/stages/plan.md` and `README.md`, without runtime code or schema changes. The successor must retain this requirement, verify actual AI guidance and waiting behavior, then include it in normal subsequent publication.

## Suggested modification boundaries and acceptance

| Requirement | Acceptance method | Scope |
|---|---|---|
| HTML before execution, waiting for confirmation | After basic facts and initial plan, AI starts the correct task view and guides the user. Without explicit page confirmation, dependency installation, build and deployment do not start | Existing service and records; no new UI or schema |
| Operations view matches records | Using existing or synthetic nonexperimental records, check status, who is awaited, approval scope, fact sources and rollback explanation | Inspect actual behavior first; fix only reproducible errors or omissions |
| Current state remains understandable after interruption | Stop a session with product demonstration records, then use a fresh session to read existing state. Check completed items, pending confirmation and items outside evidence coverage | No subsequent experimental answers or prewritten deployment recipe |
| Record freshness recognizable | Existing update time is visible; stale state after interruption is presented truthfully. Fix and verify reproducible update-chain problems | Owner viewing late does not itself establish update failure |
| Key approvals traceable | Check that existing decisions connect to specific resources and action scope, and that authorized versus pending actions remain distinguishable after pause | Preserve existing product gate semantics; no per-command confirmation |
| Windows retrieval and operation | Specify supported actual Windows runtime; verify installation, paths, start, stop, state files and view access in target environment | Prioritize necessary portability; no expanded multi-platform matrix |
| Documentation matches publication | Frozen version matches documented commands; remote version retrievable; product commits contain no private experimental evidence or credentials | Exact remote, branch and visibility still needed |

First determine whether each function already exists. If it works correctly, record verification; do not add features to meet a modification quota. Select only changes directly relevant to Owner's next use, then freeze one version.

## Experimental process requires separate preparation

After product freeze, the successor custodian implements these general process requirements. They do not automatically become product engineering tasks.

- At entry, record actual client preset context, historical approvals and readable materials. Apply final applicable rules; 'no call observed' cannot replace complete context proof.
- Establish independent acceptance evidence and capture timing beforehand, especially page request records, log correlation, restart/data persistence and cleanup coverage. Before cleanup identify collected evidence and gaps that cannot be filled.
- Keep provenance status separate; missing evidence does not retroactively change independent behavioral results. Establish exact frozen rules first; do not create a new provenance substitute tool to recover scores.
- Use clearly distinct fields for private originals and redacted deliveries; inspect identifiers/credentials before intake. Record Owner operational feedback separately from independent measurements.
- Freeze definitions for time, tokens, human questions and client permission prompts beforehand. Keep missing values null or UNVERIFIED.
- Perform final resource cleanup within Owner-approved scope, then independent residue checks within authorization. Failed queries do not mean zero resources; unrelated shared resources/metadata need explicit retention boundaries.

Prioritize existing processes and tools. No new general verifier, Docker/VM isolation construction, calibration or comprehensive re-review is authorized.

## Completion conditions

One bounded modification completed and verified, exact version published to Owner's remote destination, executable Windows startup instructions, and product version frozen. Then start the final round, report within actual evidence limits, and complete resource cleanup/publication materials.

The final Basic versus Guarded mode still needs a concrete scope decision; Windows verification is incomplete. Final task identity/materials stay sealed and are not expanded here. Further experiments or a second modification round require actual new issues and Owner direction.

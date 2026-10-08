# WATCHOVER_PUBLIC_RELEASE_2026-10-07

Direct Owner assignment: prepare an English, redacted public edition of accepted WatchOver 0.1.2. This is a bounded release adaptation, not an experiment or a new product architecture. Owner approved the export scope and independent-repository organization layout. Read RELEASE_SPEC.md and ACCEPTANCE_MATRIX.md as the complete contract.

## Roles, inputs and workspace

- Builder: Executor Actor 02, Owner-designated GPT 6.1 Sol / Codex. Read local EXECUTOR_CHARTER.md Part I + II + IV C1 for local Git only.
- Independent Reviewer: Reviewer Actor 01, Owner-designated Claude Opus 5.5. Read local EXECUTOR_CHARTER.md Part I + III. Cross-family intent is not runtime identity proof; report the actual identity/client/model exposure.
- The existing product-only role sessions may continue this assignment in these new workspace folders. A context with prior deployment/evaluation/HC/raw-run exposure must stop for clean replacement. Do not load coordinator repositories or session histories.
- Immutable history-free baseline: `../source/` from either role folder; commit <PRIVATE_REF_03069>, tree <PRIVATE_REF_01459>, version0.1.2. SOURCE_MANIFEST.json binds all 146 files. No .git from the private product was copied.
- Builder changes only builder/product/ and writes builder/output/. Reviewer writes reviewer/output/ and prepares its own candidate clone after actual submission; never implements a fix.
- Each role owns its ACK/ENTRY, logs and later unused rounds. Common control inputs and shared source/ remain unchanged. No fabricated output.

## Boundaries

No real cloud actions, deployments, credentials, experiment reruns, new runtime dependencies, schema/enum/record migrations, feature expansion or environment matrix. The existing CLI/server/validation/scanning behavior and page layout remain protected. Only release documentation, approved content exclusion, English synthetic text, public metadata and directly affected packaging/document/privacy tests change. If a true core provider dependency is found, report its exact locator; do not invent cloud drivers or weaken checks.

Local temp Git repositories, loopback servers, installed browser checks and cleanup of your own check artifacts are allowed. No new platform installation. Keep the candidate version0.1.2 unless the Owner explicitly changes it. No push, tag, repository creation or public publication by either role; coordinator handles remote action after exact independent candidate acceptance.

## Public-source preparation

builder/product/ initially contains the complete history-free baseline and is not yet a Git repository. Do not let Git commands fall through to the enclosing private portfolio repository. Sanitize and remove excluded content first. Then initialize the product root as its own Git repository, branch release/0.1.2, and explicitly set neutral project author/committer metadata (WatchOver contributors; <ACCOUNT_EMAIL_067>). Inspect git rev-parse --show-toplevel and staged contents before tests that use git ls-files. The first public root commit must already be sanitized; never create an unsanitized initial commit and later rely on deleting files from HEAD.

Compare raw public content against the immutable source manifest/directory; baseline private Git history is not needed. Public .git/config must have no private/local source remotes. Output evidence, sensitive denylist and source-to-public mapping stay outside product/. Reviewer independently compares source and candidate before Builder narrative, then binds the exact first-root history, metadata and file manifest.

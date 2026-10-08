# WATCHOVER_FINAL_PATCH_2026-10-07 — exclusive entry

The current role workspace has `control/` and `output/`. Builder also has `product/`; Reviewer receives its own `product/` clone of the exact submitted commit before candidate review. Resolve paths relative to your role workspace, never from an unrelated repository.

Read this file, OWNER_AUTHORITY.md, PATCH_SPEC.md, ACCEPTANCE_MATRIX.md and your role startup prompt. Then read the local EXECUTOR_CHARTER.md according to its loading map: Part I for both roles; Builder adds Part II and Part IV §C1 for local Git; Reviewer adds Part III. Do not load the other role's appendix or traverse private governance/history directories. The coordinator's authority records are not role inputs.

## Source and capability

- Baseline: WatchOver 0.1.1, commit `<PRIVATE_REF_01823>`, tree `<PRIVATE_REF_01954>`.
- Candidate metadata: 0.1.2. Freeze one candidate after the approved small changes and relevant checks. No tag, push or public publication by these roles.
- Builder: Mode Execute / Capability WriteExecute within the listed product scope and Builder-owned outputs. Work on local branch `final-patch-2026-10-07`.
- Reviewer: Mode Verify / Capability VerifyOnly. No edits to Builder source or implementation. May prepare its own exact-commit verification clone, run bounded local checks and write designated Reviewer artifacts; candidate source remains unchanged.
- Check identity, fresh context, actual model/client/session, environment, branch/HEAD/tree and working-tree state before work. Do not invent inaccessible client metadata. Cross-family review is the default; disclose degradation and compensation if necessary.
- Use existing local tools and synthetic fixtures. Local loopback page checks, temporary Git repositories and temporary check outputs are authorized. Do not deploy or query real infrastructure, start Docker, install platforms, or obtain real credentials. Stop processes you started after checks.

## Permitted product changes

Only related portions of:

- `skills/router.md`; `skills/stages/{plan,recover,execute,verify-handoff}.md`;
- existing `skills/providers/*.md` for baseline/permissions wording only;
- `app/web-ui/render.mjs` and the existing stylesheet only as needed for problem-first facts;
- `tools/watchover.mjs`, `tools/lib/{brief,workspace,semantic-checks,secret-scan}.mjs`;
- README.md, SECURITY.md and package.json version metadata;
- directly affected existing tests and generic fixtures, with small additional meaningful cases where the matrix requires them.

Other tracked source may be read to understand or independently verify behavior, without loading unrelated task history. `schema/`, existing enums, seven fact statuses, persistent record format, dependencies, locking/transaction architecture, business source, and external repositories are protected from change. Do not rewrite the page layout or add a command family, daemon or generalized authorization engine.

If a subitem cannot be completed within these bounds, record the exact unmet criterion and smallest reason, continue independent in-scope items, and return that subitem to the coordinator for disposition. Do not silently omit it or claim the full task complete.

## Owned outputs and sequence

- Builder writes `output/EXEC_ACK.md`, bounded test logs and `output/SUBMISSION_r1.md`. The submission includes candidate commit/tree, source diff, six-item completion matrix, actual verification and limits. Corrections use a new submission round, preserving earlier records.
- Reviewer writes `output/REVIEW_ENTRY.md`, its raw-first notes/check evidence, `output/r1_REVIEW.md` and append-only `output/review_log.md`. These are its equivalent task-surface artifacts under the Charter. Do not edit common control files or Builder outputs.
- Reviewer first reads the approved criteria, candidate diff/source and chooses independent verification paths. Only after preserving its own initial findings may it read Builder's explanatory submission/test narrative. A factual candidate commit/tree locator may be read at entry.
- Routing is manual through Owner/coordinator. Do not automatically contact another role. Builder does not self-sign independent PASS. Reviewer PASS applies only to the bound candidate and matrix; no historical operational or platform claims are upgraded.

Treat guidance/fixture coverage and runtime behavior as different evidence layers. Explicitly state what local checks establish; no causal value, all-secret coverage, untested operating-system behavior or AI obedience is inferred.

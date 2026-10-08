# Approved final product patch specification

Task: WATCHOVER_FINAL_PATCH_2026-10-07. Owner approved, 2026-10-07.
Baseline and permissions are in agent.md. Implement WO-F01–WO-F06 in order, preserving the current product purpose and page. Keep changes small, reuse existing tools and checks, then freeze one 0.1.2 candidate.

## WO-F01 — Restore the same usable view on continuation

Continuation reads the existing record/brief, checks whether the same workspace view is currently reachable, starts the existing show command if needed, and gives the user the actual URL or an explicit failure disclosure. A process start or remembered page confirmation is not proof of current reachability. Necessary read-only state reconciliation may proceed while resolving a missing view; external mutation still requires current facts and valid approval.

Reuse a valid prior page confirmation for that workspace without asking for already established deployment approval again. If the view cannot be restored, disclose the limitation and allow the human to choose continuation with that disclosure. Do not create a second workspace or grant the page approval authority. Cover both router and recover guidance; validate the actual local view against the intended synthetic workspace, not just a sentence in documentation.

## WO-F02 — Recoverable approval scope and bounded recovery authorization

When creating pending_decision, save its complete sanitized request snapshot under existing evidence/: action, targets, categories, rationale, cost/blast-radius limits, reversibility including irreversible parts, rollback, success check, reply options and request time. Link it using existing decision_request.evidence and decision.related. Keep the user's original text in existing decision.reply, redacting only secret values. Do not change event schema or add request fields.

For a new billable, delete/destructive or DNS decision, an off-option delegation requires a short restatement of the concrete choice and scope and one explicit confirmation before approved is recorded. Confirmation may be natural language; fixed magic words are not required. Exact selections do not gain a redundant turn. Preserve existing valid approvals; do not retrospectively rewrite older decisions.

A single approval may cover a clearly specified group of actions. Stopping a serving service, replacing deployed source or deleting/rebuilding an existing run resource needs coverage in that approved scope; otherwise ask once for a recovery plan. An old plan/billable approval does not expand itself to newly required deletion. Do not require per-command approval or introduce an arbitrary downtime threshold. Distinguish private temporary diagnostic cleanup from destructive remote/business actions.

Brief must point to historical approvals and their request evidence so a new session can recover the full scope from the workspace after pending_decision is cleared. Keep the short summary budget; do not embed every full card or depend on old chat. Disclose missing historical snapshots rather than fabricate them.

This patch improves guidance and durable scope. It does not add automated judgment of arbitrary action text/target authorization. Existing reference/request/approved-result checks remain. Passing validate does not establish that every actual shell action was authorized. README/SECURITY must state that Basic decisions are AI transcriptions, not authenticated human identity.

## WO-F03 — Separate fact value, problems and verification

For problem=true, make the problem text/indicator visually primary; a green success-looking badge must not dominate it. Show explicit value and verification/freshness separately. A reliable false value may be healthy; false alone is not a problem condition. Preserve the existing seven statuses and freshness semantics.

Guide labels to describe the checked subject neutrally instead of an expected favorable result. Keep the current decision card and page organization. Use generic rendering cases covering a normal positive, normal negative, problematic negative, stale and unknown fact.

## WO-F04 — Clear record diagnostics and open intents

Default documentation examples to omitting event.at and using the existing CLI time filling. An explicit time earlier than the preceding event must be refused before append with the preceding timestamp, relevant field location and actionable advice that at may be omitted. Keep existing equal-time behavior and default-time calculation; never silently add 1ms to explicit input or relax checked_at/promotion consistency.

Preserve exit semantics: 1 refused/invalid, 2 written but workspace needs attention, 64 usage error. Clearly distinguish append's written event from commit-state's replaced state and post-check result. Root --help/-h returns usage and 0; malformed invocations remain usage errors. No new command family or generalized diagnostics platform.

Brief exposes all unpaired intent IDs through an honest count and complete retrievable listing/locator within its existing bounded-summary contract. Do not silently truncate unexplained IDs. Open intents are valid during interruption/execution. In a new handoff/closed record every intent must have a related actual result; use existing outcome unknown with a truthful summary when no execution result is known, and explicitly explain nonexecution/cancellation without inventing success/failure or new enums.

An unpaired intent in handoff/closed causes a record-validation error identifying the relevant event IDs. It does not execute cleanup or enforce the user's shell. Preserve sealed historical records; document changed semantic validation rather than migrate or repair old evidence automatically.

## WO-F05 — Bounded secret checks and safe evidence retention

Add finite, testable common passphrase, explicitly assigned *_KEY/*_SECRET, Docker auth and common split-line YAML credential shapes. Each has synthetic positive controls and nearby benign negatives. Keep redacted diagnostics; document limited coverage and redact before saving. Do not add dependencies, a full YAML parser or DLP system.

Persist only necessary nonsecret baseline fields/identifiers and normalized digests needed for before/after comparison; never secret originals. Digests remain private material and do not certify complete sanitization. Keep enough nonsecret information to verify relevant changes. Apply generic guidance across existing profiles without creating a core provider dependency or new cloud instrument.

Init creates a self-contained ignore guard inside a new workspace. Normal Git add/status must not expose state/events/evidence to a containing business repository. Do not edit the host repository's root .gitignore, alter already-tracked files, or promise protection against forced add. Verify real Git behavior in a disposable synthetic repository.

## WO-F06 — Existing resource fields and honest evidence wording

Distinguish creation lifecycle from creator identity. An object created during the current operation by either a human or AI may be created_this_run; pre_existing is for objects that existed before the operation. Use existing event actor/summary and resource purpose for human steps. Do not add created_by_human or resource label/notes fields.

Include human-created run resources in the cleanup plan while keeping deletion approval and the executing party explicit; origin is not permission to delete. A human can be asked to remove an object, followed by verification.

Distinguish manifest statements, selected file samples and complete actual verification. Visible IAM bindings do not establish every planned permission. Describe bounded rollback and name irreversible effects instead of an unqualified Fully reversible claim. Cover these with generic existing-schema fixtures and documentation, not new probes or business scripts.

## Finish and limits

Run meaningful affected checks and required existing regression, disclose environment and reachability/behavior limits, and return exact candidate commit/tree. Do not rewrite tests simply to obtain green results. No cloud experiment, additional operating-system matrix, real secrets, infrastructure query, public release, schema migration, writer/transaction rearchitecture or unrelated polish.

If a subitem needs those excluded changes, return its exact unmet criterion for disposition while completing remaining in-scope work. Candidate acceptance requires either meeting the approved matrix or explicit coordinator/Owner disposition of any open item; do not self-clear terminal acceptance. One final independent Reviewer verifies the exact source, generic scenarios and outputs; historical operation records are not candidate test inputs.

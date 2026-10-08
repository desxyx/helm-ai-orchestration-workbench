# r3 PLAN — supplement to r2_PLAN.md (RPL-1 – RPL-3 only)

[Role / author]: Executor Actor 01
[Written at]: 2026-10-06T16:47+11:00 (local terminal clock)
[Supplements]: rounds/r2_PLAN.md (sha256 <PRIVATE_REF_03074>), unchanged
[Responds to]: rounds/r2_PLAN_REVIEW.md (sha256 <PRIVATE_REF_01968>), TARGETED_REWORK RPL-1–RPL-3
[Retained]: the six supported rows (P02, P04, P05–P08) and the order, checkpoints, stop point and Owner edits of r2_PLAN.md. Baseline 241/241. The product is still untouched.

All three findings are accepted as stated. Only the WO-P01 flow/tests and the WO-P03 gate/tests change.

## RPL-1 — referenced-evidence existence in candidate validation (WO-P01)

**Fact confirmed:** the evidence locator schema is `^evidence/(?!.*\.\.)[A-Za-z0-9._/-]+$`. `readEvidence` scans only files that are present, and the semantic checks only require locators to be non-empty. A missing referenced file therefore passes today.

**Change:** add the new check `evidence-exists` inside `validateCandidate` only (`tools/lib/validate.mjs`, exported for `commit-state`).
- Applies to every locator in the candidate's `facts[].evidence`.
- Each locator must resolve to a **regular file inside the workspace `evidence/` folder**.
- Uses `lstat` along the path. A symbolic link anywhere on the path → rejected and the target is not read. A missing file, a folder or a special file → rejected.
- Errors carry the JSON pointer `/facts/<i>/evidence/<j>` and the reason (missing / not a regular file / link). The locator text goes through the existing redaction.

**Not widened:**
- `validate`, `append`, `init` and the existing fixtures keep today's behaviour. Historical fixtures that reference files they do not ship stay valid and are not rewritten.
- Event `evidence` locators of already-appended events are not re-judged by `commit-state`.

**Tests added to `tests/commit-state.test.mjs`:**
- (a) a candidate whose VERIFIED fact references a removed file → refused, state hash unchanged;
- (b) a locator that is a symlink to a real file → refused, target not read;
- (c) a locator naming a folder → refused;
- (d) a positive control: the same candidate with the file present is accepted.

## RPL-2 — final stale comparison immediately before rename (WO-P01)

**Replacement sequence** (supersedes r2_PLAN Flow steps 4–5):
1. Snapshot sha256 of `state.json` and `events.jsonl` (S0).
2. Full candidate validation (schema, semantic, event and evidence checks, secret scan of the candidate, current events and evidence, plus RPL-1). On failure: refuse, write nothing.
3. Write the temp file `.state.json.<pid>-<rand>.tmp` (`wx`) and fsync it.
4. **Final comparison:** re-hash `state.json` and `events.jsonl` immediately before `rename`. If either differs from S0, refuse as stale. Remove only this command's own temp file. The newer state and events bytes are left untouched.
5. `rename` temp → `state.json`, then a best-effort fsync of the folder (result reported).
6. Post-replace validation. Any error from here on is reported as "state replaced; post-check failed", never "nothing written".

**Honest limits kept:** single writer per workspace; no cross-file transaction; no claim of multi-writer safety. A change landing between step 4 and the `rename` system call remains possible but is not detectable without OS locking; this is disclosed.

**Tests:** the existing injected changes (state edit, events append) also run at the late boundary, through an injectable hook after the temp fsync and before the final comparison. Assertions:
- the command refuses;
- the newer state and events bytes are preserved;
- no own temp file is left behind;
- other files in the folder are untouched.

The early-boundary cases stay.

## RPL-3 — `brief` refuses invalid records (WO-P03)

**Gate:** before building any summary, `brief` runs `validateWorkspace` (the existing full validation: JSON, schema, semantic and event checks, evidence scan, secret scan). This is read-only.
- **If invalid:** print `refused: the record is not valid; no summary is shown`, then the existing redacted problem list (`describe`), and exit 1. No partial or "trusted" summary is printed.
- **Missing `state.json` / `events.jsonl`:** same refusal, exit 1.
- **Valid:** produce the summary as planned in r2. The summary states that it is derived from a validated record and that facts carry their own freshness.

**Tests added to `tests/brief.test.mjs`:**
- (a) malformed JSON state;
- (b) a schema-invalid state (301-character fact value);
- (c) a state/event inconsistency caught by the semantic checks (for example a `pending_decision` with no matching `decision_request` event);
- (d) an evidence file containing a synthetic secret.

For each case:
- exit code 1, output with no summary lines and no secret value;
- workspace bytes and file set identical before and after.

**Positive control:** the valid fixtures still produce a summary.

## Unchanged

Everything else in r2_PLAN.md stands, including the stop point, the non-goals and the unresolved publication facts.

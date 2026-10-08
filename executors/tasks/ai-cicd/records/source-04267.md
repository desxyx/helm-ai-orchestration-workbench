# r4 EXEC_SUBMISSION — local freeze record and private-transfer handoff

[Role / author]: Executor Actor 01 (continuing session)
[Written at]: 2026-10-06T17:44+11:00 (local terminal clock)
[Basis]: rounds/r3_REVIEW.md (<PRIVATE_REF_02774>) PASS_LOCAL on exact <PRIVATE_REF_01823> / <PRIVATE_REF_01954> / 0.1.1; STATUS permission "Local freeze/tag v0.1.1 on exactly accepted <PRIVATE_REF_01823> and existing handoff only"
[Publication direction applied]: rounds/r5_PRIVATE_FIRST_PUBLICATION.md (<PRIVATE_FIRST_PUBLICATION_RECORD_HASH>)
[Evidence]: rounds/r4_EXEC_EVIDENCE/ (pins in rounds/r4_EXEC_EVIDENCE.sha256)

## 1. Freeze (done, local only)

| Item | Value |
|---|---|
| Tag | `v0.1.1`, annotated, tag object `<PRIVATE_REF_02433>` |
| Resolves to commit | `<PRIVATE_REF_01823>` (equals the accepted commit) |
| Tree | `<PRIVATE_REF_01954>` (equals the accepted tree) |
| Version | `package.json` `0.1.1` |
| Branch | `main` at the same commit; worktree clean |
| History since base `<PRIVATE_REF_02752>` | 8 commits; the first one carries the three Owner edits unchanged |
| Tracked files at the tag | 146 (`tracked_files_v0.1.1.txt`, with blob ids in `tracked_blobs_v0.1.1.txt`) |
| Remote | none configured (`remotes.txt` is empty); nothing pushed |

**Pre-tag checks:** HEAD equaled the accepted commit, the worktree was clean, and no `v0.1.1` tag existed. No product file changed after acceptance.

## 2. Private transfer: facts for Operations Coordinator (no remote action taken)

- **Refs to publish:** only `main` at `<PRIVATE_REF_01823>` and tag `v0.1.1`. Do not mirror other refs; do not include HELM records.
- **Destination:** to be chosen by Human Operator/Operations Coordinator. r5 names the candidate `<PRIVATE_TRANSFER_CANDIDATE_REPOSITORY>` (private, `main`). Its owner, name, visibility and Windows access must be verified before any push.
- **Not to be reused:** the program-root origin `<PROGRAM_ROOT_REPOSITORY>`.
- **What goes up:** the git history up to the tag. `evidence/` folders are git-ignored by product rule and are not part of it.
- **Private-history caveat:** the history contains the development commits and the internal wording that r5 says will need sanitizing before any public release. That is acceptable for the private transfer only. Public release requires a new sanitized export with fresh history, per r5; it is not a Mac gate.
- **Credentials:** none in the tracked tree, as far as the product secret scan of fixtures and records shows. The scan covers record files, not every source file, so a separate pre-push review of the tracked files is advisable.

## 3. Windows handoff (private transfer)

Content as in `r2_EXEC_SUBMISSION.md` §5, with these updates:

- **Get it:** private repository URL and access are PENDING Operations Coordinator/Human Operator. Then `git clone <private-url>` and `git checkout v0.1.1`; verify that `git rev-parse v0.1.1^{commit}` = `<PRIVATE_REF_01823>`.
- **Prerequisite:** Node.js ≥ 22; nothing to install. Use repository-relative paths only.
- **Commands:** `init`, `append`, `commit-state`, `validate`, `brief`, `show --port 0`, as listed in r2 §5. Synthetic examples are under `fixtures/valid/scenarios/`; the declared reduced package is under `fixtures/packages/reduced-no-dns/`.
- **Windows-owned, still UNVERIFIED:**
  - the AI starts the page after the initial plan and gives the actual URL;
  - it waits for explicit confirmation before installs, builds or deploys;
  - an unreachable page leads to disclosure plus "continue with disclosure";
  - page confirmation is kept separate from cost/DNS/delete approvals;
  - a continuation reuses only this workspace's confirmation, reads `brief`, and checks pending intents first;
  - Windows rename-over and folder fsync (expected to report "not supported here"), and `show` process/port handling.
- **Windows returns:** an exact final candidate plus its coverage, per r5.

## 4. Stop point

Mac product lease ends here. The next step needs Operations Coordinator/Human Operator to release a concrete private destination and push action. No further product change, no new round, no public action.

---

Publication note: English translated/redacted historical document, source-04267. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

# TRAP ARCHIVE

Purpose: record repeatable failure traps after they have enough evidence to be useful.

Do not treat this file as authority over current Council contracts.

## Active Traps

### Trap - Silent Path Correction

[Trigger pattern]: A contract names a file path that does not exist; an operator silently patches the path they believe is correct.

[Why it fools the system]: The correction feels obvious and efficient.

[Detection signal]: File named in the contract is missing at the stated path.

[Safe response]: Surface the discrepancy before edits. State the intended correction and wait for confirmation.

[Council re-entry needed]: usually no, unless the path mismatch changes authority or scope.

[Status]: active

---

### Trap - Replace Destroys Richer Content

[Trigger pattern]: A patch instruction says "replace or amend"; the target section already contains richer or newer content.

[Why it fools the system]: "Replace" sounds definitive, but governance files accumulate careful additions over time.

[Detection signal]: Target section contains material beyond the patch text, especially recent additions.

[Safe response]: Prefer amendment. Preserve existing content, add the new material, and flag the choice in the return record.

[Council re-entry needed]: usually no, unless the preserved content conflicts with the new decision.

[Status]: active

## Entry Format

```text
### Trap - <short name>

[Trigger pattern]:
[Why it fools the system]:
[Detection signal]:
[Safe response]:
[Council re-entry needed]: yes/no/depends
[Status]: active/stale/superseded
```

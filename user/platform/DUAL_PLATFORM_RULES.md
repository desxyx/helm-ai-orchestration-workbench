# Dual-Platform Rules (macOS + Windows)

Read this before changing anything in `user/platform`.

The platform runs on **both macOS and Windows** from **one codebase**. Most past platform breakage came from the two sides fixing only their own machine: one side patched a symptom, and the other side's working behaviour broke.

These rules apply to every change: code, config, tests and test tools.

## 1. One codebase, no per-side forks
- Both platforms run the same files on the same branch. Never keep a "Mac version" and a "Windows version" of a file.
- Never overwrite or "simplify away" a value or code path that the other platform depends on just because your machine does not need it.

## 2. Prefer a cross-platform fix
- First look for a fix that is correct on both platforms. Examples: click the Send button instead of a platform shortcut; use `path.join` instead of hand-built paths.
- Only when that is impossible, add a platform-specific branch.

## 3. Platform differences live in exactly two places
- **Config:** a `windows: { ... }` (or `mac: { ... }`) override block in `config.js`, merged only on that platform. Example: the Claude `injection.windows` timing override.
- **Code:** an explicit, visible branch on `process.platform`. Examples: `prompt.js` uses `Meta` on darwin and `Control` elsewhere for paste; the clipboard readback treats CRLF and LF as equal only on win32.
- Keep each branch as small as possible. The other platform's branch must stay byte-for-byte the same unless the change is meant for both.
- Never add hidden heuristics that behave differently per OS without a `process.platform` check someone can find with grep.

## 4. Known platform differences (keep this list current)
| Area | macOS | Windows | Where |
|---|---|---|---|
| Paste shortcut | `Meta+V` | `Control+V` | `src/utils/prompt.js` |
| Clipboard line endings | exact compare | CRLF→LF before readback compare | `src/utils/prompt.js` |
| Claude input settle timing | defaults | `stableForMs 200`, `inputSettleTimeoutMs 12000` | `config.js` `claude.injection.windows` |
| Server stop | SIGTERM may not exit; kill own PID | `taskkill /PID <pid> /F /T` fallback | operations note |

Add a row whenever you introduce a new difference.

## 5. Both sides must pass before a change is accepted
- Offline: `node --test --test-concurrency=1 test/*.test.js` must pass on **macOS and Windows**.
- Live: a cold-start group run (paste, send and native Copy capture across all three providers, plus Refresh and Shift) must pass on **both** platforms whenever transport, completion, capture, clipboard or config code changes.
- If you can only test on one side, say so in the submission and mark the change **pending cross-platform regression**. It is not done until the other side has run the same checks.
- Tests for platform branches should exercise every branch (win32 / darwin / other), for example by stubbing `process.platform` in a VM harness. They should also prove that the branch you did not touch still behaves exactly as before.

## 6. Hand-off between sides
- Push your change, write down exactly which files changed and why, and ask the other side to pull and run its regression.
- Do not merge "fixes" for the other platform that you could not run there.
- Test tools must run on both platforms (prefer `node` scripts over zsh/PowerShell-only scripts). Write results to your own evidence folder, never over the other side's evidence.

## 7. Red lines (unchanged)
No provider API calls, network/body capture, request replay, or token/cookie extraction. No profile/account mutation. Native Copy remains the only success artifact for captured replies.

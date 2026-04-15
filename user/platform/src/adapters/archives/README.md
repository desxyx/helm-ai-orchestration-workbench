# Adapter Archive

Task ref: `CORE_06`

This folder preserves the pre-`CORE_06` adapter implementations before the
reply capture path is migrated from DOM text scraping to provider copy-button
capture.

Archived files:

- `chatgpt.js`
- `claude.js`
- `gemini.js`

Retirement reason:

- The legacy adapters capture replies through DOM scraping, TreeWalker-based
  traversal, and broad text-filter fallbacks.
- `CORE_06` freezes a new capture contract: copy-button readiness is the only
  valid reply-ready signal, and the old DOM capture path must be removed from
  active adapters.

Rollback anchor:

- Git HEAD before first modification: `a0cdf921b88ba0c6f28030c2c59df35d218d28d5`
- Original adapter snapshots in this folder must remain untouched.

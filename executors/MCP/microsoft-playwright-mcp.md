# Microsoft Playwright MCP

## Candidate

- Name: `playwright-mcp`
- Source repo: `https://github.com/microsoft/playwright-mcp`
- Reviewed on: `2026-03-22`
- Reviewed ref: `eed21856dcf0defa23394909e27125311fed246f`
- Publisher: Microsoft
- License: Apache-2.0

## What It Is

Official Playwright-based MCP server for browser automation.

This is not a skill bundle and not a marketplace wrapper.
It is a real executable MCP server distributed from an official Microsoft repo and npm package.

The repo shape is straightforward:

- root docs and package metadata
- `packages/playwright-mcp/` = actual MCP server package
- `packages/extension/` = browser extension support
- `packages/playwright-cli-stub/` = stub package related to Playwright CLI migration

## Upstream Positioning

Upstream explicitly says:

- use **Playwright CLI + SKILLS** when working with coding agents that care about token efficiency
- use **MCP** when persistent browser state and iterative page reasoning matter more than token cost

That distinction matters for H.E.L.M.

## Risk Review

- Risk level: `yellow`

Reasons:

- canonical source is clear and trustworthy
- repo is official and well-structured
- install path is explicit
- but this is still executable browser automation infrastructure, not a text-only asset
- default examples use `npx @playwright/mcp@latest`, which is convenient but version-loose
- it opens a meaningful execution surface through browser control

## H.E.L.M Take

This should be treated as an **executor MCP capability**, not as a `core skill`.

Recommended status right now:

- keep as reviewed reference in `executors/MCP/`
- do not auto-install globally yet
- install only when the council / executors decide they want browser automation through MCP rather than through existing local browser workflows or CLI-based alternatives

## Placement Decision

- Decision: `reviewed, not installed`
- H.E.L.M location: `executors/MCP/`

Why:

- useful and credible
- but operational, not constitutional
- introduces runtime behavior, not just reusable instructions
- deserves shared review before becoming default executor infrastructure

## Useful Commands

Codex:

```bash
codex mcp add playwright npx "@playwright/mcp@latest"
```

Claude Code:

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

Config-style example:

```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest"]
```

## Notes

- If H.E.L.M adopts this later, pinning a version is safer than living on `@latest`.
- For coding-heavy flows, upstream itself suggests evaluating `playwright-cli` style workflows instead of MCP-first usage.

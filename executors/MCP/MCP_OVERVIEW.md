# MCP Overview

This file is an English overview of the MCP material under `executors/MCP/`.

Important clarification:

- most items here are review notes for MCP candidates
- reviewed does not mean installed
- installed does not mean enabled by default

When reading this folder, focus on three questions:

- what the MCP is for
- when it is worth considering
- whether HELM currently treats it as recommended, deferred, or rejected

## Current Summary

| MCP | Current status | Main use | Best fit |
| --- | --- | --- | --- |
| `chrome-devtools-mcp` | reviewed, not installed | live Chrome inspection and debugging | performance, tracing, deep browser debugging |
| `playwright-mcp` | reviewed, not installed | browser automation and page interaction | end-to-end flows and persistent browser-state automation |
| `deepwiki-mcp` | rejected | DeepWiki scraping to Markdown | not recommended in current upstream state |
| `context7` | reviewed, not installed | version-aware documentation retrieval | SDK and framework docs where version accuracy matters |
| `drawio-mcp` | reviewed, locally checked out, not installed | editable draw.io diagram generation | architecture and process diagrams that need future editing |
| `markitdown-mcp` | reviewed, local helper preferred | document-to-Markdown conversion | only when an MCP route is clearly better than a local script |

## Selection Notes

- choose `chrome-devtools-mcp` when debugging depth matters more than simple automation
- choose `playwright-mcp` when page actions and browser workflows matter more than DevTools inspection
- choose `context7` when version-sensitive documentation quality matters
- choose `drawio-mcp` when you need editable diagrams rather than screenshots or text diagrams
- choose the local `user/tools/markitdown_convert.py` wrapper before reaching for `markitdown-mcp`
- skip `deepwiki-mcp` unless the upstream state changes and is reviewed again

## HELM Stance

HELM is conservative about MCP adoption.

- review first
- install only when the use case is real
- do not enable globally just because something is official
- prefer a local helper when it solves the task cleanly without adding runtime surface area

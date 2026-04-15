# User Tools

This directory contains local helper tools used by the public orchestration layer.

Use it for repo-owned scripts that support orientation, export, conversion, or review work without treating them as executor skills or MCP infrastructure.

## Current Helpers

- `quick_scan.py`: fast structure scan for repo orientation
- `read.py`: export selected project trees into a readable snapshot
- `markitdown_convert.py`: local wrapper for document-to-Markdown conversion

## MarkItDown Decision

H.E.L.M treats MarkItDown as a local helper first, not an MCP default.

Why:

- the main value is stable file-to-Markdown conversion
- a normal Python wrapper is enough for that job
- a single repo path is easier to preserve than host-specific MCP setup

Preferred path:

```bash
python3 user/tools/markitdown_convert.py input.pdf -o output.md
```

Notes:

- the input can be any local file or supported URI
- `--use-plugins` enables installed MarkItDown plugins
- if `markitdown` is missing, the wrapper exits with an install hint
- for public local use, prefer this wrapper before considering an MCP route

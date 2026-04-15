#!/usr/bin/env python3
"""
One-time migration note for the MarkItDown wrapper.

The live wrapper moved to `executors/tools/markitdown_convert.py` on 2026-04-12.
Update callers to use the new path. This file is not a compatibility shim.
"""

import sys


def main() -> int:
    print(
        "markitdown_convert.py moved to executors/tools/markitdown_convert.py on 2026-04-12.",
        file=sys.stderr,
    )
    print("Update callers to use the new path.", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())

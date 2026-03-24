#!/usr/bin/env python3
"""
quick_scan.py - fast project name scan (no ignores).

What it does:
1) Scans a target folder, not the CWD (unless you disable override).
2) Produces one TXT report with:
   - Export Summary
   - Environment fingerprint
   - Directory tree
   - File list based on filenames only

Key differences from read.py:
- Does not ignore any directories or files.
- Includes hidden files and hidden directories.
- Does not read file contents.
- Does not count lines.
"""

from __future__ import annotations

import os
import platform
import sys
from datetime import datetime
from pathlib import Path

# ====================== Config (edit here) ======================
REPO_ROOT = Path(__file__).resolve().parent.parent.parent
ROOT_FOLDER = str(Path(os.environ.get("HELM_SCAN_ROOT", REPO_ROOT)))
OUTPUT_FILE = os.environ.get("HELM_SCAN_OUTPUT", "")

USE_OVERRIDE = True
BRIEF_MODE = False
TOP_N_LARGEST = 30
SORT_LISTING = False
HUMAN_TIME = True
# ================================================================


def env_fingerprint(scanned_root: Path) -> str:
    parts = []
    parts.append("# Environment")
    parts.append(f"- Scanned Dir: {scanned_root}")
    tz = datetime.now().astimezone().tzinfo
    parts.append(f"- Timestamp:   {datetime.now().astimezone().isoformat(timespec='seconds')} {tz}")
    parts.append(f"- OS:          {platform.system()} {platform.release()} ({platform.machine()})")
    parts.append(f"- Python:      {platform.python_version()}")
    return "\n".join(parts)


def human_bytes(n: int) -> str:
    step = 1024.0
    units = ["B", "KB", "MB", "GB", "TB", "PB", "EB"]
    size = float(n)
    for unit in units:
        if size < step:
            return f"{size:.1f}{unit}"
        size /= step
    return f"{size:.1f}ZB"


def listdir_sorted(path: Path):
    try:
        items = list(path.iterdir())
    except Exception:
        return []
    if SORT_LISTING:
        items.sort(key=lambda x: (not x.is_dir(), x.name.lower()))
    return items


def build_tree_lines(root: Path):
    """ASCII tree for directories/files with no ignore rules."""
    lines = []
    root_name = root.name or str(root)
    lines.append(f"{root_name}/")

    def walk(path: Path, prefix: str = "") -> None:
        items = listdir_sorted(path)
        length = len(items)
        for idx, item in enumerate(items):
            is_last = idx == length - 1
            branch = "└── " if is_last else "├── "
            if item.is_dir():
                lines.append(f"{prefix}{branch}{item.name}/")
                walk(item, prefix + ("    " if is_last else "│   "))
            else:
                lines.append(f"{prefix}{branch}{item.name}")

    walk(root)
    return lines


def file_iter(root: Path):
    """Yield all file paths under root, including hidden files."""
    for current, dirs, files in os.walk(root):
        if SORT_LISTING:
            dirs.sort(key=lambda s: s.lower())
            files.sort(key=lambda s: s.lower())
        for name in files:
            yield Path(current) / name


def file_list_table(root: Path):
    """Return (rows, file_count, total_bytes, collected)."""
    header = f"{'Path':<60}  {'Size':>10}  {'Modified (local)':>20}"
    sep = "-" * len(header)
    rows = [header, sep]

    file_count = 0
    total_bytes = 0
    collected = []

    for path in file_iter(root):
        try:
            stat = path.stat()
        except Exception:
            continue

        size = stat.st_size
        rel = str(path.relative_to(root))
        collected.append((rel, size))

        if HUMAN_TIME:
            mtime = datetime.fromtimestamp(stat.st_mtime).strftime("%Y-%m-%d %H:%M:%S")
        else:
            mtime = str(int(stat.st_mtime))

        total_bytes += size
        file_count += 1

        if not BRIEF_MODE:
            rows.append(f"{rel:<60}  {human_bytes(size):>10}  {mtime:>20}")

    if BRIEF_MODE:
        rows = [header, sep]
        rows.append(f"{'** BRIEF MODE: details omitted; see Top-N below **':<60}  {'-':>10}  {'-':>20}")
        rows.append("")
        rows.append(f"Top {TOP_N_LARGEST} largest files:")
        for rel, size in sorted(collected, key=lambda x: x[1], reverse=True)[:TOP_N_LARGEST]:
            rows.append(f"{rel:<60}  {human_bytes(size):>10}")

    rows.append(sep)
    rows.append(f"{'TOTALS':<60}  {human_bytes(total_bytes):>10}  {'files:' + str(file_count):>20}")
    return rows, file_count, total_bytes, collected


def main() -> int:
    if USE_OVERRIDE and (
        "/Users/yourname/path/to/project" in ROOT_FOLDER
        or ROOT_FOLDER.strip() == ""
    ):
        print("[ERROR] ROOT_FOLDER looks like a placeholder; set it to a real directory.", file=sys.stderr)
        return 2

    if USE_OVERRIDE:
        root = Path(ROOT_FOLDER).expanduser().resolve()
    else:
        root = Path.cwd()

    if not root.exists() or not root.is_dir():
        print(f"[ERROR] Invalid ROOT_FOLDER directory: {root}", file=sys.stderr)
        return 2

    if OUTPUT_FILE and OUTPUT_FILE.strip():
        out_path = Path(OUTPUT_FILE).expanduser().resolve()
    else:
        out_path = root / f"{root.name}_quick_scan.txt"

    env = env_fingerprint(root)
    tree = build_tree_lines(root)
    table_lines, file_count, total_bytes, collected = file_list_table(root)

    header = []
    header.append("✅ Quick scan complete.")
    header.append(f"   Output: {out_path}")
    header.append(f"   Files scanned: {file_count}")
    header.append(f"   Bytes (source): {sum(size for _, size in collected)}")
    try:
        est = sum(len(line) + 1 for line in (env.splitlines() + tree + table_lines))
        header.append(f"   Bytes (output): ~{est}")
    except Exception:
        pass

    content = []
    content += header
    content.append("")
    content.append(env)
    content.append("")
    content.append("# Directory Tree")
    content += tree
    content.append("")
    content.append("# File List")
    content += table_lines
    content.append("")
    content.append(f"_Generated by quick_scan.py for {root}_")

    try:
        out_path.parent.mkdir(parents=True, exist_ok=True)
        with out_path.open("w", encoding="utf-8", newline="\n") as handle:
            handle.write("\n".join(content) + "\n")
        print(f"[OK] Wrote quick scan to: {out_path}")
    except Exception as exc:
        print(f"[ERROR] Failed to write {out_path}: {exc}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

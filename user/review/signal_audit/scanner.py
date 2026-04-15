#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from collections import Counter
from datetime import datetime
from pathlib import Path
from statistics import median

SCRIPT_DIR = Path(__file__).resolve().parent
DES_DIR = SCRIPT_DIR.parents[1]
SESSIONS_DIR = DES_DIR / "data" / "sessions"
OUTPUT_DIR = SCRIPT_DIR / "session_2"
RUNBOOK_PATH = SCRIPT_DIR / "Review_Runbook_Lite.md"

SESSION_IDS = [f"session_{i:03d}" for i in range(50, 104)]
SMOKE_CHECK = [("session_050", "round_000.json"), ("session_075", "round_000.json"), ("session_103", "round_000.json")]
EXCLUDED = ["This is a reply from", "Frozen Truth", "Allowed Work", "Forbidden Actions", "[Frame ID]"]
CORE_RE = re.compile(r"\bCORE_\d+\b", re.I)

CATS = {
    1: {"name": "Protocol Execution Failures", "side": "council", "en": ["did not follow", "skipped", "ignored instruction", "reduced-scope", "violated", "wrong route", "protocol error"], "cn": ["\u6ca1\u6309", "\u8df3\u8fc7", "\u8fdd\u53cd", "\u8d8a\u754c", "\u7f29\u8303\u56f4", "\u6ca1\u6709\u6267\u884c", "\u8def\u5f84\u9519\u8bef"]},
    2: {"name": "Scope Drift", "side": "council", "en": ["scope drift", "off-track", "too many problems", "expand scope", "new problem", "out of scope", "not part of this", "drift"], "cn": ["\u8dd1\u504f", "\u6269scope", "\u8303\u56f4\u53d8\u5927", "\u53c8\u52a0\u4e00\u4e2a", "\u8d8a\u754c\u4e86", "\u4e0d\u5728\u8303\u56f4\u5185", "\u6f02\u79fb", "\u98d8\u9038"]},
    3: {"name": "Handoff Quality Failures", "side": "council", "en": ["unclear handoff", "not executable", "missing detail", "missing file", "executor cannot proceed", "ambiguous contract"], "cn": ["\u4e0d\u6e05\u695a", "\u6ca1\u6cd5\u6267\u884c", "\u7f3a\u6587\u4ef6", "\u7f3a\u7ec6\u8282", "\u6267\u884c\u4e0d\u4e86", "\u592a\u6a21\u7cca"]},
    4: {"name": "Scoring Inconsistency", "side": "council", "en": ["score gap", "inconsistent scoring", "vote conflict", "ranking mismatch", "scoring issue"], "cn": ["\u5206\u6570\u4e0d\u4e00\u81f4", "\u8bc4\u5206\u4e0d\u4e00\u81f4", "\u6295\u7968\u51b2\u7a81", "\u6392\u540d\u4e0d\u4e00\u81f4"]},
    5: {"name": "AI Drift / Cross-Session Contamination", "side": "council", "en": ["contamination", "carry over", "cross-session", "inherited tone", "previous session brought in", "drift", "hallucination"], "cn": ["\u4e0a\u4e0b\u6587\u6c61\u67d3", "\u8de8session", "\u524d\u6587\u5e26\u5165", "\u7ee7\u627f\u4e86\u8bed\u6c14", "\u4e0a\u6b21\u9057\u7559", "\u6f02\u79fb", "\u98d8\u9038", "\u5e7b\u89c9"]},
    6: {"name": "Chair Usage / Habit Failures", "side": "des", "en": ["i don't understand", "not sure what to do", "too tired", "i'm confused", "what were we doing"], "cn": ["\u6211\u4e0d\u61c2", "\u542c\u4e0d\u61c2", "\u597d\u7d2f", "\u6709\u70b9\u4e71", "\u641e\u4e0d\u6e05\u695a", "\u4e0d\u77e5\u9053\u600e\u4e48\u529e", "\u54c8\u54c8", "\u54c8\u54c8\u54c8", "\u5367\u69fd", "\u5bf9\u4e0d\u8d77", "\u6211\u7684\u9519", "\u653e\u5fc3", "\u4f60\u4eec\u653e\u5fc3"]},
    7: {"name": "Framing / Structure Failures", "side": "des", "en": ["unclear goal", "messy", "too broad", "not structured", "what is the goal", "where do we start"], "cn": ["\u76ee\u6807\u4e0d\u6e05", "\u592a\u4e71", "\u6ca1\u60f3\u6e05\u695a", "\u7ed3\u6784\u4e0d\u6e05", "\u592a\u5927\u4e86", "\u4ece\u54ea\u5f00\u59cb"]},
    8: {"name": "Compression / Communication Failures", "side": "des", "en": ["too long", "hard to read", "can't follow", "impossible to summarise", "too verbose"], "cn": ["\u592a\u957f\u4e86", "\u8bf4\u4e0d\u6e05", "\u770b\u4e0d\u61c2", "\u6ca1\u6cd5\u603b\u7ed3", "\u592a\u5570\u55e6", "\u89e3\u91ca\u4e0d\u6e05"]},
    9: {"name": "Scope Expansion Habit", "side": "des", "en": ["one more thing", "in addition to that", "while we're at it", "and one more", "can we also"], "cn": ["\u8fd8\u6709\u4e00\u4e2a", "\u518d\u52a0\u4e00\u4e2a", "\u987a\u5e26\u505a\u4e86", "\u5bf9\u4e86\u8fd8\u6709", "\u53e6\u5916\u52a0\u4e0a", "\u8fd9\u6837\u5427", "\u8fd9\u6837\u628a"]},
    10: {"name": "Focus / Target Failures", "side": "des", "en": ["what exactly do we want", "lost track", "what is the main goal", "what were we trying to do"], "cn": ["\u5230\u5e95\u8981\u4ec0\u4e48", "\u504f\u9898\u4e86", "\u5fd8\u4e86\u76ee\u6807", "\u4e3b\u7ebf\u662f\u4ec0\u4e48", "\u641e\u6df7\u4e86"]},
}

EXPANSIONS = {
    "en": [("unclear", "general"), ("overloaded", "cat8"), ("contradiction", "cat4"), ("repeat", "cat4"), ("timeout", "cat1")],
    "cn": [("\u987a\u5229", "cat6_aux"), ("\u975e\u5e38\u987a\u5229", "cat6_aux"), ("\u4e0d\u9519\u4e0d\u9519", "cat6_aux"), ("\u723d", "cat6_aux"), ("\u4e25\u8083", "cat7_aux"), ("\u6211\u61c2\u4e86", "cat10_aux"), ("\u6709\u70b9\u4e71", "cat8")],
}

def now() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))

def excluded(line: str) -> bool:
    s = line.strip()
    if not s or s.startswith("[") or CORE_RE.search(line):
        return True
    low = line.lower()
    return any(p.lower() in low for p in EXCLUDED)

def empty_totals() -> dict:
    return {i: {"en_incident": 0, "cn_incident": 0, "en_structural": 0, "cn_structural": 0} for i in CATS}

def smoke_check() -> list[dict]:
    out = []
    for sid, fname in SMOKE_CHECK:
        path = SESSIONS_DIR / sid / fname
        try:
            data = load_json(path)
            replies = data.get("replies", [])
            ok = {"roundNumber", "prompt", "replies"}.issubset(data.keys()) and isinstance(replies, list)
            out.append({"session": sid, "file": fname, "ok": ok, "keys": sorted(data.keys()), "reply_keys": sorted(replies[0].keys()) if replies and isinstance(replies[0], dict) else [], "error": "" if ok else "missing required keys or replies is not a list"})
        except Exception as exc:
            out.append({"session": sid, "file": fname, "ok": False, "keys": [], "reply_keys": [], "error": str(exc)})
    return out

def scan_text(text: str, spec: dict) -> dict[str, int]:
    out = {"en_incident": 0, "cn_incident": 0, "en_structural": 0, "cn_structural": 0}
    cap = 0
    for line in text.splitlines():
        if not line.strip():
            continue
        en_hit = any(k.lower() in line.lower() for k in spec["en"])
        cn_hit = any(k in line for k in spec["cn"])
        if not en_hit and not cn_hit:
            continue
        if excluded(line):
            if en_hit:
                out["en_structural"] += 1
            if cn_hit:
                out["cn_structural"] += 1
            continue
        if en_hit and cap < 3:
            out["en_incident"] += 1
            cap += 1
        if cn_hit and cap < 3:
            out["cn_incident"] += 1
            cap += 1
    return out

def scan_round(data: dict) -> dict:
    prompt = data.get("prompt", "") or ""
    replies = "\n".join((r.get("content", "") or "") for r in data.get("replies", []) if isinstance(r, dict))
    out = {}
    dual_en = "drift" in (prompt + "\n" + replies).lower()
    dual_cn = any(t in (prompt + "\n" + replies) for t in ("\u6f02\u79fb", "\u98d8\u9038"))
    for cat_id, spec in CATS.items():
        text = prompt if spec["side"] == "des" else f"{prompt}\n{replies}"
        out[cat_id] = scan_text(text, spec)
    if dual_en or dual_cn:
        for cat_id in (2, 5):
            if dual_en:
                out[cat_id]["en_incident"] = min(3, out[cat_id]["en_incident"] + 1)
            if dual_cn:
                out[cat_id]["cn_incident"] = min(3, out[cat_id]["cn_incident"] + 1)
    return out

def scan_session(path: Path) -> dict:
    sid = path.name
    try:
        meta = load_json(path / "session.json")
    except Exception as exc:
        return {"session_id": sid, "skipped": True, "error": f"session.json parse error: {exc}", "parse_errors": []}
    totals = empty_totals()
    parse_errors = []
    rounds_parsed = prompt_chars = reply_chars = 0
    for rpath in sorted(path.glob("round_*.json")):
        try:
            data = load_json(rpath)
        except Exception as exc:
            parse_errors.append(f"{rpath.name}: {exc}")
            continue
        if "prompt" not in data or "replies" not in data:
            parse_errors.append(f"{rpath.name}: missing prompt/replies")
            continue
        prompt_chars += len(data.get("prompt", "") or "")
        for reply in data.get("replies", []) or []:
            if isinstance(reply, dict):
                reply_chars += len(reply.get("content", "") or "")
        hits = scan_round(data)
        for cat_id in CATS:
            for field, value in hits[cat_id].items():
                totals[cat_id][field] += value
        rounds_parsed += 1
    incident = {i: totals[i]["en_incident"] + totals[i]["cn_incident"] for i in CATS}
    structural = {i: totals[i]["en_structural"] + totals[i]["cn_structural"] for i in CATS}
    total_incident = sum(incident.values())
    total_structural = sum(structural.values())
    total_hits = total_incident + total_structural
    density = round(total_incident / max(rounds_parsed, 1), 4)
    tags = []
    if rounds_parsed > 15:
        tags.append("long_session")
    if rounds_parsed <= 3:
        tags.append("short_session")
    if density >= 1.0:
        tags.append("possible_drift")
    if incident.get(3, 0) > 0:
        tags.append("handoff_related")
    if incident.get(4, 0) > 0 or incident.get(5, 0) > 0:
        tags.append("high_conflict")
    return {
        "session_id": sid,
        "created_at": meta.get("createdAt", ""),
        "round_count": meta.get("roundCount", 0),
        "rounds_parsed": rounds_parsed,
        "total_prompt_chars": prompt_chars,
        "total_reply_chars": reply_chars,
        "totals": totals,
        "cat_incident": incident,
        "cat_structural": structural,
        "total_incident": total_incident,
        "total_structural": total_structural,
        "total_hits": total_hits,
        "signal_density": density,
        "meta_context_flag": (total_structural / total_hits) > 0.6 if total_hits else False,
        "dominant_category": max(incident, key=incident.get) if any(incident.values()) else None,
        "tags": tags,
        "parse_errors": parse_errors,
        "skipped": False,
    }

def shortlist(valid: list[dict], min_size: int = 20, max_size: int = 30) -> list[dict]:
    ranked = sorted(valid, key=lambda s: s["signal_density"], reverse=True)
    if not ranked:
        return []
    out = ranked[: min(min_size, len(ranked))]
    if len(ranked) > len(out):
        cutoff = out[-1]["signal_density"]
        for session in ranked[len(out):max_size]:
            if abs(session["signal_density"] - cutoff) <= 0.25:
                out.append(session)
    seen = {s["session_id"] for s in out}
    for session in ranked:
        if session["rounds_parsed"] <= 3 and (session["signal_density"] >= 1.0 or "high_conflict" in session["tags"]) and session["session_id"] not in seen:
            out.append(session)
            seen.add(session["session_id"])
    out = sorted(out, key=lambda s: s["signal_density"], reverse=True)[:max_size]
    for session in out:
        dom = session["dominant_category"]
        session["dominant_name"] = CATS[dom]["name"] if dom else "none"
        session["session_type"] = "[short-acute]" if session["rounds_parsed"] <= 3 else "[long-systemic]"
        parts = []
        if session["signal_density"] >= 1.0:
            parts.append(f"density={session['signal_density']}")
        if "handoff_related" in session["tags"]:
            parts.append("handoff hits")
        if "high_conflict" in session["tags"]:
            parts.append("drift/conflict hits")
        if session["meta_context_flag"]:
            parts.append("meta-context-flagged")
        if dom:
            parts.append(f"dominant={session['dominant_name']}")
        session["rationale"] = "; ".join(parts) if parts else "review candidate"
    return out

def distortion(valid: list[dict]) -> list[str]:
    if not valid:
        return []
    flags = []
    densities = [s["signal_density"] for s in valid]
    med = median(densities)
    top = max(densities)
    if med > 0 and top < med * 1.5:
        flags.append(f"score collapse detected (top={top:.4f}, median={med:.4f})")
    totals = Counter()
    all_hits = 0
    for session in valid:
        for cat_id, hits in session["cat_incident"].items():
            totals[cat_id] += hits
            all_hits += hits
    if all_hits:
        cat_id, hits = totals.most_common(1)[0]
        share = hits / all_hits
        if share > 0.70:
            flags.append(f"category domination ({CATS[cat_id]['name']} at {share * 100:.1f}%)")
    probe = shortlist(valid)
    if probe:
        meta_count = sum(1 for s in probe if s["meta_context_flag"])
        if meta_count / len(probe) > 0.30:
            flags.append(f"meta-context inflation ({meta_count}/{len(probe)} shortlisted sessions)")
    return flags

def expansions(valid: list[dict]) -> list[dict]:
    counts = Counter()
    for session in valid:
        sdir = SESSIONS_DIR / session["session_id"]
        for rpath in sorted(sdir.glob("round_*.json")):
            try:
                data = load_json(rpath)
            except Exception:
                continue
            corpus = (data.get("prompt", "") or "") + "\n" + "\n".join((r.get("content", "") or "") for r in data.get("replies", []) if isinstance(r, dict))
            low = corpus.lower()
            for term, cat in EXPANSIONS["en"]:
                if term in low:
                    counts[(term, "en", cat)] += low.count(term)
            for term, cat in EXPANSIONS["cn"]:
                if term in corpus:
                    counts[(term, "cn", cat)] += corpus.count(term)
    return [{"term": term, "language": lang, "category": cat, "occurrence_count": count} for (term, lang, cat), count in counts.most_common()]

def write_report(sessions: list[dict], top: list[dict], flags: list[str], smoke: list[dict]) -> None:
    valid = [s for s in sessions if not s["skipped"]]
    skipped = [s for s in sessions if s["skipped"]]
    rounds = sum(s["rounds_parsed"] for s in valid)
    avg_rounds = round(rounds / len(valid), 2) if valid else 0.0
    rollups = {i: {"en_incident": 0, "cn_incident": 0, "en_structural": 0, "cn_structural": 0, "triggered": 0} for i in CATS}
    tags = Counter()
    for session in valid:
        for tag in session["tags"]:
            tags[tag] += 1
        for cat_id in CATS:
            t = session["totals"][cat_id]
            for field in ("en_incident", "cn_incident", "en_structural", "cn_structural"):
                rollups[cat_id][field] += t[field]
            if session["cat_incident"][cat_id] > 0:
                rollups[cat_id]["triggered"] += 1
    lines = [
        "# Session Scan Report - Second Review Cycle",
        f"Generated: {now()}",
        "",
        "## Section 1 - Overview",
        "",
        "| Metric | Value |",
        "|--------|-------|",
        f"| Sessions in scope | {len(sessions)} |",
        f"| Sessions parsed | {len(valid)} |",
        f"| Sessions skipped | {len(skipped)} |",
        f"| Rounds scanned | {rounds} |",
        f"| Average rounds per session | {avg_rounds} |",
        "",
        "### Schema Smoke Check",
    ]
    for item in smoke:
        lines.append(f"- {item['session']}/{item['file']}: {'PASS' if item['ok'] else 'FAIL'} | keys={', '.join(item['keys']) if item['keys'] else 'n/a'}")
    lines += ["", "### Distortion Flags"]
    lines += [f"- {flag}" for flag in flags] or ["- none"]
    lines += ["", "## Section 2 - Anomalous Sessions", "", "### Long Sessions (>15 rounds)"]
    long_sessions = [s for s in valid if s["rounds_parsed"] > 15]
    lines += [f"- {s['session_id']}: rounds={s['rounds_parsed']}, density={s['signal_density']}" for s in sorted(long_sessions, key=lambda x: x["rounds_parsed"], reverse=True)] or ["- none"]
    lines += ["", "### Short Sessions (<=3 rounds)"]
    short_sessions = [s for s in valid if s["rounds_parsed"] <= 3]
    lines += [f"- {s['session_id']}: rounds={s['rounds_parsed']}, density={s['signal_density']}" for s in short_sessions] or ["- none"]
    lines += ["", "### Skipped / Malformed Sessions"]
    lines += [f"- {s['session_id']}: {s['error']}" for s in skipped] or ["- none"]
    lines += ["", "### meta_context_flag Sessions"]
    meta_sessions = [s for s in valid if s["meta_context_flag"]]
    lines += [f"- {s['session_id']}: structural={s['total_structural']}, incident={s['total_incident']}" for s in meta_sessions] or ["- none"]
    lines += ["", "## Section 3 - Signal Frequency Summary", "", "| Cat | Name | Side | EN incident/round | CN incident/round | EN structural/round | CN structural/round |", "|-----|------|------|-------------------|-------------------|---------------------|---------------------|"]
    div = max(rounds, 1)
    for cat_id, spec in CATS.items():
        r = rollups[cat_id]
        lines.append(f"| {cat_id} | {spec['name']} | {spec['side']} | {r['en_incident'] / div:.3f} | {r['cn_incident'] / div:.3f} | {r['en_structural'] / div:.3f} | {r['cn_structural'] / div:.3f} |")
    lines += ["", "## Section 4 - Tag Distribution", "", "### Council-side Categories"]
    for cat_id in range(1, 6):
        lines.append(f"- Cat {cat_id} ({CATS[cat_id]['name']}): {rollups[cat_id]['triggered']} sessions triggered")
    lines += ["", "### Orchestration-side Categories"]
    for cat_id in range(6, 11):
        lines.append(f"- Cat {cat_id} ({CATS[cat_id]['name']}): {rollups[cat_id]['triggered']} sessions triggered")
    lines += ["", "### Rule Tags"]
    lines += [f"- {tag}: {count}" for tag, count in tags.most_common()] or ["- none"]
    lines += ["", "## Section 5 - Candidate Shortlist", "", "| Rank | Session | Rounds | Density | Dominant Category | Type | Meta Flag | Rationale |", "|------|---------|--------|---------|-------------------|------|-----------|-----------|"]
    for idx, session in enumerate(top, 1):
        lines.append(f"| {idx} | {session['session_id']} | {session['rounds_parsed']} | {session['signal_density']:.4f} | {session['dominant_name']} | {session['session_type']} | {'yes' if session['meta_context_flag'] else 'no'} | {session['rationale']} |")
    (OUTPUT_DIR / "session_scan_report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

def write_anomaly(sessions: list[dict], smoke: list[dict], flags: list[str]) -> None:
    lines = ["# Anomaly Log - Second Review Cycle", f"Generated: {now()}", "", "## Smoke Check"]
    for item in smoke:
        if item["ok"]:
            lines.append(f"- PASS {item['session']}/{item['file']}: reply_keys={', '.join(item['reply_keys']) if item['reply_keys'] else 'n/a'}")
        else:
            lines.append(f"- FAIL {item['session']}/{item['file']}: {item['error']}")
    lines += ["", "## Distortion Flags"]
    lines += [f"- {flag}" for flag in flags] or ["- none"]
    lines += ["", "## Skipped Sessions"]
    skipped = [s for s in sessions if s["skipped"]]
    lines += [f"- {s['session_id']}: {s['error']}" for s in skipped] or ["- none"]
    lines += ["", "## Round Parse Errors"]
    errs = [f"{s['session_id']}: {e}" for s in sessions for e in s.get("parse_errors", [])]
    lines += [f"- {e}" for e in errs] or ["- none"]
    lines += ["", "## meta_context_flag Sessions"]
    meta_sessions = [s for s in sessions if not s["skipped"] and s["meta_context_flag"]]
    lines += [f"- {s['session_id']}: structural={s['total_structural']}, incident={s['total_incident']}" for s in meta_sessions] or ["- none"]
    (OUTPUT_DIR / "anomaly_log.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

def write_expansions(rows: list[dict]) -> None:
    lines = ["# Proposed Expansions", "Generated after the first-pass scan. Suggestions only.", "", "| term | language | category | occurrence_count |", "|------|----------|----------|-----------------|"]
    lines += [f"| {r['term']} | {r['language']} | {r['category']} | {r['occurrence_count']} |" for r in rows] or ["| none | n/a | n/a | 0 |"]
    (OUTPUT_DIR / "proposed_expansions.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

def write_runbook() -> None:
    RUNBOOK_PATH.write_text("""# Operator Step-by-Step Guide - Review_Runbook_Lite v1.3

## What this is
A lightweight runbook for rerunning the session scanner next time.
Keep this under `user/review/signal_audit/`.

---

## Step 1 - Run the scanner
Give the executor:
- `council/task/2nd_session_review/core_06.MD`
- `council/task/2nd_session_review/core_00.MD`
- this runbook

---

## Step 2 - Collect outputs from `user/review/signal_audit/session_N/`
- `session_scan_report.md`
- `anomaly_log.md`
- `proposed_expansions.md`

---

## Step 3 - Bring first-pass output to Council
Ask whether a refined pass is needed.
Do not interpret the numbers yourself.

---

## Step 4 - Packaging
Package only after Council review is complete.
""", encoding="utf-8")

def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    smoke = smoke_check()
    if not all(item["ok"] for item in smoke):
        write_anomaly([], smoke, [])
        print("[scanner] EXEC_STOP: smoke check failed")
        for item in smoke:
            if not item["ok"]:
                print(f"[scanner] {item['session']}/{item['file']}: {item['error']}")
        return 1
    sessions = [scan_session(SESSIONS_DIR / sid) for sid in SESSION_IDS if (SESSIONS_DIR / sid).exists()]
    if not sessions:
        print("[scanner] EXEC_STOP: no session folders found")
        return 1
    if len([s for s in sessions if s["skipped"]]) / len(sessions) > 0.10:
        write_anomaly(sessions, smoke, [])
        print("[scanner] EXEC_STOP: >10% of sessions were unparseable")
        return 1
    valid = [s for s in sessions if not s["skipped"]]
    flags = distortion(valid)
    top = shortlist(valid)
    write_report(sessions, top, flags, smoke)
    write_anomaly(sessions, smoke, flags)
    write_expansions(expansions(valid))
    write_runbook()
    print(f"[scanner] files created under {OUTPUT_DIR}")
    print(f"[scanner] sessions processed: {len(valid)}/{len(sessions)} | rounds processed: {sum(s['rounds_parsed'] for s in valid)}")
    print(f"[scanner] distortion flags: {', '.join(flags) if flags else 'none'}")
    print("[scanner] top 5 shortlist preview:")
    for s in top[:5]:
        print(f"  {s['session_id']} | rounds={s['rounds_parsed']} | density={s['signal_density']:.4f} | {s['session_type']} | {s['rationale']}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())

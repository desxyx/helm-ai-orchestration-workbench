# Session Scan Report — v0
Generated: 2026-03-17 15:27:39
Scanner: CORE_06 One-Pass Contract

## Section 1 — Overview

| Metric | Value |
|--------|-------|
| Sessions scanned (total) | 45 |
| Sessions parseable | 45 |
| Sessions skipped/unparseable | 0 |
| Rounds scanned | 311 |
| Average rounds per session | 6.9 |

### Distortion Flags
- None detected.

## Section 2 — Anomalous Sessions

### Long Sessions (>15 rounds)
- session_028: 32 rounds, density=0.375
- session_025: 26 rounds, density=0.4615
- session_008: 21 rounds, density=0.2381
- session_017: 20 rounds, density=0.05
- session_027: 20 rounds, density=0.3
- session_012: 18 rounds, density=0.5
- session_031: 18 rounds, density=1.3889
- session_033: 16 rounds, density=0.3125

### Short Sessions (1–2 rounds)
- session_001: 1 rounds, density=0.0
- session_002: 1 rounds, density=0.0
- session_003: 0 rounds, density=0.0
- session_004: 2 rounds, density=0.5
- session_005: 0 rounds, density=0.0
- session_007: 1 rounds, density=0.0
- session_009: 0 rounds, density=0.0
- session_010: 1 rounds, density=0.0
- session_011: 0 rounds, density=0.0
- session_014: 0 rounds, density=0.0
- session_015: 2 rounds, density=0.5
- session_016: 2 rounds, density=0.0
- session_018: 0 rounds, density=0.0
- session_019: 1 rounds, density=0.0
- session_020: 1 rounds, density=0.0
- session_021: 1 rounds, density=0.0
- session_022: 1 rounds, density=0.0
- session_023: 0 rounds, density=0.0
- session_024: 0 rounds, density=0.0
- session_026: 1 rounds, density=1.0
- session_036: 0 rounds, density=0.0
- session_038: 2 rounds, density=0.0
- session_039: 1 rounds, density=0.0
- session_040: 1 rounds, density=0.0
- session_042: 1 rounds, density=0.0
- session_043: 1 rounds, density=0.0

### Zero-Output or Malformed Sessions
- session_003: 0 rounds parsed
- session_005: 0 rounds parsed
- session_009: 0 rounds parsed
- session_011: 0 rounds parsed
- session_014: 0 rounds parsed
- session_018: 0 rounds parsed
- session_023: 0 rounds parsed
- session_024: 0 rounds parsed
- session_036: 0 rounds parsed

### Sessions with meta_context_flag = true
- session_037: structural hits dominate signal

## Section 3 — Signal Frequency Summary

Normalized = hits per round across all sessions.
EN and CN reported separately. incident_like and structural_discussion reported separately.

| Cat | Name | Side | EN incident/round | CN incident/round | EN structural/round | CN structural/round |
|-----|------|------|-------------------|-------------------|---------------------|---------------------|
| 1 | Protocol Execution Failures | council | 0.01 | 0.154 | 0.0 | 0.032 |
| 2 | Scope Drift | council | 0.116 | 0.032 | 0.019 | 0.003 |
| 3 | Handoff Quality Failures | council | 0.0 | 0.035 | 0.0 | 0.006 |
| 4 | Scoring Inconsistency | council | 0.016 | 0.0 | 0.0 | 0.0 |
| 5 | AI Drift / Cross-Session Contamination | council | 0.032 | 0.164 | 0.0 | 0.013 |
| 6 | Chair Usage / Habit Failures | des | 0.0 | 0.003 | 0.0 | 0.0 |
| 7 | Framing / Structure Failures | des | 0.0 | 0.003 | 0.0 | 0.003 |
| 8 | Compression / Communication Failures | des | 0.006 | 0.013 | 0.0 | 0.0 |
| 9 | Scope Expansion Habit | des | 0.0 | 0.01 | 0.0 | 0.0 |
| 10 | Focus / Target Failures | des | 0.0 | 0.0 | 0.0 | 0.0 |

## Section 4 — Tag Distribution

### Council-Side Categories (1–5)
- Cat 1 (Protocol Execution Failures): 15 sessions triggered
- Cat 2 (Scope Drift): 14 sessions triggered
- Cat 3 (Handoff Quality Failures): 7 sessions triggered
- Cat 4 (Scoring Inconsistency): 2 sessions triggered
- Cat 5 (AI Drift / Cross-Session Contamination): 12 sessions triggered

### operator-Side Categories (6–10)
- Cat 6 (Chair Usage / Habit Failures): 1 sessions triggered
- Cat 7 (Framing / Structure Failures): 1 sessions triggered
- Cat 8 (Compression / Communication Failures): 6 sessions triggered
- Cat 9 (Scope Expansion Habit): 3 sessions triggered
- Cat 10 (Focus / Target Failures): 0 sessions triggered

### Rule Tags
- short_session: 26 sessions
- high_conflict: 13 sessions
- possible_drift: 8 sessions
- long_session: 8 sessions
- handoff_related: 7 sessions

## Section 5 — Candidate Shortlist
Top 20 sessions by signal_density.

| Rank | Session | Rounds | Density | Dominant Category | Type | Meta Flag | Rationale |
|------|---------|--------|---------|-------------------|------|-----------|-----------|
| 1 | session_034 | 11 | 1.7273 | Protocol Execution Failures | [long-systemic] | — | high density 1.7273; possible drift; conflict signals; handoff issues; dominant: Protocol Execution Failures |
| 2 | session_041 | 11 | 1.7273 | AI Drift / Cross-Session Contamination | [long-systemic] | — | high density 1.7273; possible drift; conflict signals; handoff issues; dominant: AI Drift / Cross-Session Contamination |
| 3 | session_045 | 6 | 1.6667 | AI Drift / Cross-Session Contamination | [long-systemic] | — | high density 1.6667; possible drift; conflict signals; dominant: AI Drift / Cross-Session Contamination |
| 4 | session_031 | 18 | 1.3889 | AI Drift / Cross-Session Contamination | [long-systemic] | — | high density 1.3889; possible drift; conflict signals; dominant: AI Drift / Cross-Session Contamination |
| 5 | session_006 | 11 | 1.2727 | Protocol Execution Failures | [long-systemic] | — | high density 1.2727; possible drift; conflict signals; dominant: Protocol Execution Failures |
| 6 | session_032 | 14 | 1.2143 | AI Drift / Cross-Session Contamination | [long-systemic] | — | high density 1.2143; possible drift; conflict signals; dominant: AI Drift / Cross-Session Contamination |
| 7 | session_044 | 11 | 1.0909 | Protocol Execution Failures | [long-systemic] | — | high density 1.0909; possible drift; conflict signals; dominant: Protocol Execution Failures |
| 8 | session_026 | 1 | 1.0 | Scoring Inconsistency | [short-acute] | — | high density 1.0; possible drift; conflict signals; dominant: Scoring Inconsistency |
| 9 | session_035 | 14 | 0.5714 | Scope Drift | [long-systemic] | — | conflict signals; handoff issues; dominant: Scope Drift |
| 10 | session_012 | 18 | 0.5 | Scope Drift | [long-systemic] | — | handoff issues; dominant: Scope Drift |
| 11 | session_025 | 26 | 0.4615 | AI Drift / Cross-Session Contamination | [long-systemic] | — | conflict signals; handoff issues; dominant: AI Drift / Cross-Session Contamination |
| 12 | session_028 | 32 | 0.375 | Scope Drift | [long-systemic] | — | dominant: Scope Drift |
| 13 | session_033 | 16 | 0.3125 | AI Drift / Cross-Session Contamination | [long-systemic] | — | conflict signals; dominant: AI Drift / Cross-Session Contamination |
| 14 | session_027 | 20 | 0.3 | Protocol Execution Failures | [long-systemic] | — | dominant: Protocol Execution Failures |
| 15 | session_030 | 10 | 0.3 | Handoff Quality Failures | [long-systemic] | — | handoff issues; dominant: Handoff Quality Failures |
| 16 | session_029 | 14 | 0.2857 | AI Drift / Cross-Session Contamination | [long-systemic] | — | conflict signals; dominant: AI Drift / Cross-Session Contamination |
| 17 | session_008 | 21 | 0.2381 | Scope Drift | [long-systemic] | — | conflict signals; dominant: Scope Drift |
| 18 | session_013 | 11 | 0.0909 | Handoff Quality Failures | [long-systemic] | — | handoff issues; dominant: Handoff Quality Failures |
| 19 | session_017 | 20 | 0.05 | Protocol Execution Failures | [long-systemic] | — | dominant: Protocol Execution Failures |
| 20 | session_037 | 6 | 0.0 | none | [long-systemic] | ✓ | notable for review |

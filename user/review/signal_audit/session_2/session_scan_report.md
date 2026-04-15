# Session Scan Report - Second Review Cycle
Generated: 2026-04-07 18:00:17

## Section 1 - Overview

| Metric | Value |
|--------|-------|
| Sessions in scope | 54 |
| Sessions parsed | 54 |
| Sessions skipped | 0 |
| Rounds scanned | 240 |
| Average rounds per session | 4.44 |

### Schema Smoke Check
- session_050/round_000.json: PASS | keys=createdAt, metrics, prompt, replies, roundNumber, summary
- session_075/round_000.json: PASS | keys=createdAt, metrics, prompt, replies, roundNumber, summary
- session_103/round_000.json: PASS | keys=createdAt, metrics, prompt, replies, roundNumber, summary

### Distortion Flags
- none

## Section 2 - Anomalous Sessions

### Long Sessions (>15 rounds)
- session_052: rounds=24, density=3.7917
- session_060: rounds=19, density=6.2105

### Short Sessions (<=3 rounds)
- session_050: rounds=1, density=0.0
- session_051: rounds=0, density=0.0
- session_053: rounds=3, density=4.3333
- session_054: rounds=1, density=0.0
- session_055: rounds=1, density=0.0
- session_057: rounds=3, density=5.0
- session_063: rounds=0, density=0.0
- session_065: rounds=3, density=8.3333
- session_067: rounds=1, density=4.0
- session_071: rounds=3, density=5.0
- session_073: rounds=0, density=0.0
- session_075: rounds=2, density=4.5
- session_077: rounds=1, density=0.0
- session_078: rounds=1, density=0.0
- session_080: rounds=1, density=0.0
- session_082: rounds=1, density=0.0
- session_084: rounds=3, density=0.0
- session_086: rounds=0, density=0.0
- session_087: rounds=0, density=0.0
- session_089: rounds=2, density=0.0
- session_091: rounds=1, density=0.0
- session_093: rounds=2, density=5.5
- session_098: rounds=2, density=0.5
- session_099: rounds=2, density=0.5
- session_100: rounds=3, density=0.3333
- session_101: rounds=3, density=4.6667

### Skipped / Malformed Sessions
- none

### meta_context_flag Sessions
- none

## Section 3 - Signal Frequency Summary

| Cat | Name | Side | EN incident/round | CN incident/round | EN structural/round | CN structural/round |
|-----|------|------|-------------------|-------------------|---------------------|---------------------|
| 1 | Protocol Execution Failures | council | 0.013 | 0.246 | 0.000 | 0.025 |
| 2 | Scope Drift | council | 0.533 | 1.054 | 0.067 | 0.050 |
| 3 | Handoff Quality Failures | council | 0.000 | 0.033 | 0.000 | 0.000 |
| 4 | Scoring Inconsistency | council | 0.000 | 0.000 | 0.000 | 0.000 |
| 5 | AI Drift / Cross-Session Contamination | council | 0.558 | 1.087 | 0.021 | 0.054 |
| 6 | Chair Usage / Habit Failures | des | 0.000 | 0.054 | 0.000 | 0.000 |
| 7 | Framing / Structure Failures | des | 0.008 | 0.004 | 0.000 | 0.000 |
| 8 | Compression / Communication Failures | des | 0.000 | 0.000 | 0.000 | 0.000 |
| 9 | Scope Expansion Habit | des | 0.000 | 0.013 | 0.000 | 0.000 |
| 10 | Focus / Target Failures | des | 0.000 | 0.000 | 0.000 | 0.000 |

## Section 4 - Tag Distribution

### Council-side Categories
- Cat 1 (Protocol Execution Failures): 21 sessions triggered
- Cat 2 (Scope Drift): 37 sessions triggered
- Cat 3 (Handoff Quality Failures): 7 sessions triggered
- Cat 4 (Scoring Inconsistency): 0 sessions triggered
- Cat 5 (AI Drift / Cross-Session Contamination): 35 sessions triggered

### operator-side Categories
- Cat 6 (Chair Usage / Habit Failures): 9 sessions triggered
- Cat 7 (Framing / Structure Failures): 2 sessions triggered
- Cat 8 (Compression / Communication Failures): 0 sessions triggered
- Cat 9 (Scope Expansion Habit): 2 sessions triggered
- Cat 10 (Focus / Target Failures): 0 sessions triggered

### Rule Tags
- high_conflict: 35
- possible_drift: 33
- short_session: 26
- handoff_related: 7
- long_session: 2

## Section 5 - Candidate Shortlist

| Rank | Session | Rounds | Density | Dominant Category | Type | Meta Flag | Rationale |
|------|---------|--------|---------|-------------------|------|-----------|-----------|
| 1 | session_066 | 4 | 10.0000 | AI Drift / Cross-Session Contamination | [long-systemic] | no | density=10.0; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 2 | session_065 | 3 | 8.3333 | AI Drift / Cross-Session Contamination | [short-acute] | no | density=8.3333; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 3 | session_061 | 4 | 7.2500 | AI Drift / Cross-Session Contamination | [long-systemic] | no | density=7.25; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 4 | session_064 | 7 | 6.5714 | Scope Drift | [long-systemic] | no | density=6.5714; drift/conflict hits; dominant=Scope Drift |
| 5 | session_060 | 19 | 6.2105 | AI Drift / Cross-Session Contamination | [long-systemic] | no | density=6.2105; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 6 | session_093 | 2 | 5.5000 | AI Drift / Cross-Session Contamination | [short-acute] | no | density=5.5; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 7 | session_074 | 5 | 5.2000 | AI Drift / Cross-Session Contamination | [long-systemic] | no | density=5.2; handoff hits; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 8 | session_057 | 3 | 5.0000 | Scope Drift | [short-acute] | no | density=5.0; drift/conflict hits; dominant=Scope Drift |
| 9 | session_071 | 3 | 5.0000 | Scope Drift | [short-acute] | no | density=5.0; drift/conflict hits; dominant=Scope Drift |
| 10 | session_095 | 8 | 4.7500 | Scope Drift | [long-systemic] | no | density=4.75; handoff hits; drift/conflict hits; dominant=Scope Drift |
| 11 | session_083 | 9 | 4.6667 | Scope Drift | [long-systemic] | no | density=4.6667; drift/conflict hits; dominant=Scope Drift |
| 12 | session_092 | 6 | 4.6667 | AI Drift / Cross-Session Contamination | [long-systemic] | no | density=4.6667; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 13 | session_101 | 3 | 4.6667 | Scope Drift | [short-acute] | no | density=4.6667; drift/conflict hits; dominant=Scope Drift |
| 14 | session_075 | 2 | 4.5000 | AI Drift / Cross-Session Contamination | [short-acute] | no | density=4.5; handoff hits; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 15 | session_103 | 5 | 4.4000 | Scope Drift | [long-systemic] | no | density=4.4; drift/conflict hits; dominant=Scope Drift |
| 16 | session_053 | 3 | 4.3333 | AI Drift / Cross-Session Contamination | [short-acute] | no | density=4.3333; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 17 | session_062 | 6 | 4.3333 | AI Drift / Cross-Session Contamination | [long-systemic] | no | density=4.3333; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 18 | session_085 | 9 | 4.3333 | AI Drift / Cross-Session Contamination | [long-systemic] | no | density=4.3333; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 19 | session_059 | 13 | 4.3077 | AI Drift / Cross-Session Contamination | [long-systemic] | no | density=4.3077; drift/conflict hits; dominant=AI Drift / Cross-Session Contamination |
| 20 | session_076 | 6 | 4.1667 | Scope Drift | [long-systemic] | no | density=4.1667; drift/conflict hits; dominant=Scope Drift |
| 21 | session_058 | 4 | 4.0000 | Scope Drift | [long-systemic] | no | density=4.0; drift/conflict hits; dominant=Scope Drift |
| 22 | session_067 | 1 | 4.0000 | Scope Drift | [short-acute] | no | density=4.0; drift/conflict hits; dominant=Scope Drift |

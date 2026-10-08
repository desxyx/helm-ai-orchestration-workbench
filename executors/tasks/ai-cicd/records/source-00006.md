# Operator Observations

## 2026-09-26 — Council Member C response latency

- Role: `Council Member C`
- Model reported by Human Operator: Gemini 3.8 Flash Extended
- Observation: Council Member C returned a reply less than 30 seconds after the request was sent.
- Source: Human Operator direct observation in chat.
- Evidence status: `USER_REPORTED`; no instrumented start/end timestamps were captured.
- Scope: Council operating-speed observation only. Do not include this value in WatchOver deployment A/B/C/H metrics unless independently timed under a frozen measurement method.

## 2026-09-26 — Additional Council response latency observations

| Council role | Model reported by Human Operator | Approximate response time | Evidence status |
|---|---|---:|---|
| `Council Member A` | Opus 5.5 High | about 3 minutes | `USER_REPORTED` |
| Not specified | GPT 5.6 Sol | about 4 minutes | `USER_REPORTED` |

- Source: Human Operator direct observation in chat.
- Timing method: approximate; no instrumented start/end timestamps were captured.
- Scope: Council operating-speed observations only. Do not use these values as WatchOver deployment experiment metrics.

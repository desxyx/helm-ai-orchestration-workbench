# CHANGELOG

Public development story for H.E.L.M.

## 2026-04-14

The public repository now reflects a much thicker execution and runtime layer than the first March public slice.

- Published the newer executor protocol shape, including stronger execution-state discipline, boot and handoff material, and a broader executor-layer archive surface.
- Exposed more review and audit artifacts showing how H.E.L.M preserves decision, execution, and verification traces as separate but connected records.
- Refreshed the runnable platform around the newer reply-capture path, which now uses provider copy controls instead of deep DOM scraping.

The important point is not that the repository gained volume. The important point is that H.E.L.M became easier to operate as a long-running layered system.

## 2026-04-12

The executor layer gained a startup spine.

- Boot checklist
- reusable executor memory
- coarse executor changelog discipline
- stronger handoff structure
- environment-state notes

This is where the executor layer stopped feeling like a loose tool area and started looking more like a disciplined operating surface.

## 2026-04-07

The runtime side matured under real cross-environment pressure.

- platform diagnostics became more structured
- review outputs became more reusable
- environment-specific problems were treated as protocol and tooling problems, not just operator mistakes

That shift matters because it is one thing to design a layered system. It is another to keep it stable when the environment fights back.

## 2026-04-01

The executor protocol was upgraded from a thinner early charter into a clearer operating model.

Key improvements included:

- explicit pause semantics for normal waiting states
- clearer separation between role and permission ceiling
- stronger verifier boundaries
- better handoff structure
- clearer escalation guidance

This was a meaningful maturity jump for the execution layer.

## 2026-03-24

The public repository was rebuilt around the current layered shape: `council/`, `user/`, and `executors/`.

That was the point where the project stopped presenting itself like a thin app snapshot and started presenting itself as what it had actually become: a layered working structure.

## Development Story

H.E.L.M started from a direct question: if frontier models genuinely differ, can their independent judgment be preserved without collapsing into one routed answer?

The answer was not a magic multi-agent runtime. It was a layered system that kept growing stronger where real work kept creating pressure:

- the council layer pushed toward clearer framing and comparison discipline
- the execution layer pushed toward stronger delivery and verification rules
- the orchestration layer kept preserving more native records instead of relying on memory alone

That is still the core story of H.E.L.M.

It did not mature by endlessly adding prompt weight.
It matured because the layer boundaries kept proving useful, absorbent, and worth reinforcing.

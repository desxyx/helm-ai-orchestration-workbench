# H.E.L.M

Public demonstration repository for H.E.L.M: Human-Executed Layered Multi-model.

H.E.L.M is not presented here as a prompt trick or a thin browser toy. It is a layered working structure for keeping multi-model decision quality, execution quality, and operational continuity under real constraints.

The public repository keeps three visible layers:

- `council/` for decision protocols, constitutions, task contracts, and selected archive material
- `user/` for the public orchestration layer: the local platform, helper tools, review outputs, and runtime-side records
- `executors/` for the execution layer: charters, vault records, skills, helper tools, and MCP notes

## Why The Structure Matters

The interesting part is not that H.E.L.M has three folders. The interesting part is that the boundaries kept proving useful under repeated real work.

- The council layer stayed focused on framing, comparison, criticism, and delivery discipline.
- The executor layer kept getting thicker where thickness actually helped: clearer execution states, stronger handoff structure, better verification boundaries, and better traceability.
- The orchestration layer kept more native artifacts instead of relying on memory or paraphrase, which made the whole system easier to resume, audit, and improve.

That is also why H.E.L.M could absorb ideas from adjacent systems without collapsing into prompt bloat. When outside examples exposed a strong mechanism, H.E.L.M did not need a total rewrite. The underlying layer model was already sound enough to take in targeted improvements with low structural shock.

## What Changed Since The Last Public Refresh

The newest step in H.E.L.M is not "more files for their own sake." It is a move from a layered structure that exists on paper to a layered structure that is easier to run for longer periods.

- The executor protocol became sharper. Execution now has clearer mode boundaries, better pause semantics, stronger handoff discipline, and more explicit verification logic.
- The executor layer gained a startup spine. Boot material, reusable execution memory, handoff templates, and coarse changelog discipline make continuity less dependent on the same session or the same model staying alive.
- Runtime hardening improved. The platform now carries stronger environment-aware debugging practices and more durable review artifacts.
- Reply capture was rebuilt around provider copy controls instead of fragile DOM scraping. That change made the platform smaller, cleaner, and easier to maintain against UI drift.

## Role Refinement

H.E.L.M now treats the execution side as more than one flat role.

- `Executor` pushes implementation forward.
- `Reviewer` verifies claims against file reality and runnable evidence.
- `Observer` watches blast radius and stage discipline.

This role split does cost extra tokens. The tradeoff is worth it because it reduces a more expensive failure mode: long debugging loops caused by weak review, blurred authority, or untracked stage drift.

## Why The Records Matter

One of the strongest assets in H.E.L.M is the amount of native process data it preserves.

- Browser-side dialogue is still valuable.
- Task folders preserve more contracts, review notes, findings, and staged outputs.
- Review and executor records preserve how decisions became actions and how actions were checked.

That matters because the long-term direction is not "keep the human manually stitching everything forever." The long-term direction is to let a stronger local middle layer handle most of the council-facing coordination and executor-facing delivery discipline.

The intended future path is straightforward:

1. A human gives a raw request.
2. A stronger local middle layer compresses, routes, tracks, and preserves it.
3. Council stays focused on judgment.
4. Executors stay focused on delivery.

The human remains in control, but the orchestration burden gets lighter.

## Run The Public Platform

```bash
cd user/platform
npm install
npm run ui
```

Then open `http://127.0.0.1:3030`.

Local browser login state is intentionally not included in this repository and should stay machine-local.

## Public Boundaries

- This is a curated public slice, not the full working archive.
- Private identities, machine-local paths, browser data, and personal operating traces are removed.
- The public naming surface uses `Claude`, `Gemini`, and `ChatGPT`.
- The goal is to show why H.E.L.M works, how the layers cooperate, and how the system has matured, without publishing the full private operating history.

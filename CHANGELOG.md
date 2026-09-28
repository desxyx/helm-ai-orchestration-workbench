# CHANGELOG

Public development story for H.E.L.M.

## 2026-09-28

The three governing documents were refreshed together: Council Constitution Public v1.7, Executor Charter Public v1.0, and UserOps Charter Public v0.5. The previous public editions are kept under the archive folders so the evolution stays visible.

What changed in the public story:

- Evidence discipline moved upstream. A factual claim now has to pass an admission check (evidence layer, freshness, locator, verification status) before it can become Frozen Truth, and Council must confirm that the evidence it asks Executors to produce is actually reachable before dispatch.
- Council convergence became accountable: independent phase, cross-review phase, and exactly one merge owner per round. Anything missing a phase is reported as a proposal, not a converged result.
- Council re-entry triggers were rewritten around real boundary expansion instead of arbitrary counts or elapsed days.
- The Executor Charter was restructured into a role-scoped common core plus role appendices. Reviewer became a first-class role with raw-first review, register-and-continue verdicts, and cross-model-family independence.
- One acceptance rule now runs through every layer: whoever executed or authored a change is never the sole source of its acceptance.
- A negative result ("none found", "clean") must now show that the same instrument can find a known-present target.
- UserOps gained a neutral task-entry preflight, three artifact classes with write-once evidence rounds, a capped relevance-ranked memory index, and cold-start takeover rules.

Platform hardening in `user/platform`:

- Reply capture now scopes copy controls to the latest assistant turn, so a previous turn's reply is not captured by mistake. A reply that matches the previous round is flagged `staleSuspect` instead of being silently accepted.
- Completion detection records a pre-submit baseline and reads the latest turn without scrolling or hovering.
- Live runs showed some providers waiting for the full hard timeout even though the reply was already on screen. Completion now has a probe fallback: once the reply stops changing, two consecutive checks that the latest turn's Copy control is usable end the wait (`stable_probe`), and a periodic diagnostic line records why the heuristic path has not completed yet. This is fixture-tested; live-provider confirmation and the underlying root cause are still open.
- Manual Refresh unlocks for an agent as soon as that agent has finished, instead of waiting for the whole round.
- Prompt injection supports a clipboard-free insert mode. Submission requires positive evidence that the message was actually sent.
- Session storage skips corrupt session files with a clear warning instead of failing the whole listing.
- The shared hard timeout was raised from 60s to 180s for long research and writing replies. Updated ChatGPT composer and reply selectors.
- Added `npm test` with Playwright-backed regression tests for the capture, completion, and injection paths. Test runs log to a separate path (`HELM_LOG_PATH`) instead of the live log.

As before, H.E.L.M got stronger by tightening boundaries and evidence rules, not by making every prompt longer.

## 2026-05-11

The public repository now reflects H.E.L.M's newest maturity jump: a durable UserOps surface.

This is not a fourth Council member and not another executor. UserOps is a file-backed operating layer that keeps task state, routing memory, decision records, closure summaries, reusable lessons, and re-entry warnings visible across model rotations and interrupted work.

What changed in the public story:

- H.E.L.M now presents itself as a layered workbench with decision, execution, orchestration, and UserOps responsibilities separated.
- The strongest new evidence is governance execution discipline: a large protocol update was split into staged batches, reviewed at each gate, and closed with task state, retrospective, and memory-candidate records.
- New public case notes summarize the operations-steward rollout and the local role-pack experiment without exposing private identities, local paths, or raw internal sessions.
- The local role-pack experiment shows that Council and Executor identities can survive a runtime change: browser, CLI, API-backed model, or future local runtime are implementation details as long as layer boundaries hold.
- Added a redacted public structure map and a sanitized test-environment role-pack prototype, including BAT templates and compressed Council/Executor entry charters.
- Added `userops/` as the public operations-steward layer with a redacted charter, config example, memory index, routine checks, trap archive, task folder convention, and reusable task templates.

This is the real flex: H.E.L.M did not become stronger by turning every prompt into a bigger prompt. It became stronger by moving repeated coordination burden into explicit records, role boundaries, review gates, and reusable operating memory.

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

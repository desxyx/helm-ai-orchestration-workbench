# EXECUTOR CHARTER — Public Archive v0.1

Status: Public compressed archive
Layer: Executors

## Snapshot

This file captures the earlier, thinner version of the executor charter before the later protocol upgrades.

Its core goals were already present:

- keep executor work legible
- keep it bounded
- make interruption survivable
- make transfer possible

## Early Structure

The early charter already defined the basic three-layer split:

- Council = decision layer
- Executors = execution layer
- Orchestration = routing layer

It also already stated the core relation:

Council decides. Executors execute.

That early boundary was one of the right instincts in HELM from the beginning.

## Early Rules

Even in v0.1, the charter already required:

- acknowledgement before formal execution
- pushback on unclear or unsafe work
- an `EXEC_STOP` state for serious in-execution problems
- handoff discipline across interrupted work
- a coarse execution return format
- physical protection of council-owned files

What it did not yet have was the later refinement:

- no `EXEC_IDLE`
- no explicit mode-versus-capability split
- no stronger verifier rules
- less structured handoff metadata
- less developed startup and audit spine

## Why This Archive Matters

The archive is useful because it shows that the executor layer did not start from chaos. The core boundary logic was already present. Later versions mainly sharpened state handling, verification, and continuity rather than inventing the entire layer from scratch.

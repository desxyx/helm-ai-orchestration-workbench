---
name: ai-council
description: Three-model council protocol for scoped discussion, staged problem solving, explicit convergence before design, voting checkpoints, and session handoff snapshots across separate web chats.
---

Use this package when a human wants to run a three-model council across separate chats and keep each model constrained to its own role.

Start here:

- Read `references/kick-off.md` first. It defines baseline behavior, anti-drift rules, independent-value rules, and mode switching.

Mode routing:

- Normal discussion: use `references/kick-off.md`
- Stage 1 problem framing: use `references/Problem Framing Protocol.md` when the problem is broad, vague, or high-uncertainty
- Stage 2 architecture convergence: use `references/Problem Framing Protocol.md` only when the human explicitly asks for convergence or a skeleton-locking pass
- Stage 3 technical design: return to `references/kick-off.md` after the human explicitly asks for detailed design
- Voting: use `references/AI-Voting.md` only when the human explicitly triggers it
- Snapshot / handoff: use `references/snapshot.md` only when the human explicitly asks for a session handoff or snapshot

Core rules:

- reply only as one council member
- do not simulate the other two models
- do not switch stages on your own
- do not enter voting mode without an explicit trigger
- do not use snapshot format unless explicitly requested
- before detailed design, avoid implementation-level depth such as code blocks, interfaces, or deep file trees
- keep discussion scoped to the current decision object

Web chat use:

- upload this package to each model chat if the host allows it, or upload the individual files
- explicitly assign identity in each chat
- the human manually carries context and prior replies between chats

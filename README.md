# H.E.L.M

Public demonstration repo for H.E.L.M: Human-Executed Layered Multi-model.

H.E.L.M started as a browser-automation prototype and grew into something much more interesting: a protocol-aware, three-layer workspace for making real decisions with multiple frontier models under real constraints.

The core structure is:

- `council/` for the decision layer: constitutions, kickoff patterns, task contracts, and template assets
- `user/` for the current human-driven orchestration layer: platform runtime, local tools, handoff points, and session-side records
- `executors/` for the execution layer: executor charter, vault, MCP notes, and shared skill library

The important part is not just that these folders exist. The structure became strong because many of the key boundaries were not pre-scripted line by line by the human operator. Under prompt discipline, file boundaries, and repeated review loops, the council and executors kept surfacing the same structural demands:

- the decision layer should stay separate from heavy execution
- executor work needs its own folder, handoff path, and charter
- council assets should not be silently edited by executors
- the middle layer needs its own records, tools, and routing responsibility

In other words, a large part of the architecture was pressure-tested into existence. It did not come from a single clean whiteboard moment; it emerged from repeated constrained interaction between Council, Executors, and the human operator.

That is why this repo matters. It is not only a demo app. It is evidence that a local-first multi-model workflow can evolve from "three AI chats" into a layered operating structure with memory, delivery discipline, and boundary control.

Some of the strongest parts of the system came from the models themselves pushing the structure forward inside constraints:

- the early move toward unified template replies was not just UI polish; council itself kept converging on template discipline, and the template library later became one of the project's real assets
- the first serious folder cleanup was driven by council pressure that decision assets should stop hanging off the platform root and live in their own layer
- after scanning the repo, executors pushed for another restructure so execution would have its own folder, vault, and charter rather than living as an afterthought
- once that restructure landed, executors themselves proposed reviewing the raw sessions; council agreed, issued a scanner contract, and the system completed its first real `council -> executor -> council` loop
- the middle layer also got pushed into better behavior: repeated friction around messy input, context drift, and weak tracking pushed the user layer toward stronger process discipline, explicit records, and local tools instead of "just try harder" human orchestration

That is the brag here. The repo is good not because someone invented a pretty three-folder diagram. It is good because the structure kept surviving contact with real work, and because council and executors repeatedly forced sharper boundaries, better records, and more disciplined handoff behavior.

One more reason the structure is valuable: in the working system, `council/task/` preserves task-level decision records, while `user/data/sessions/` preserves round-by-round AI dialogue. Together, those two record streams form the beginning of a future training corpus for a stronger middle-layer AI: one that could compress messy human input, route work more cleanly, carry forward context, and reduce the user's orchestration burden.

The long-term idea is simple: keep the human in control, but gradually make the middle layer less exhausting. The future middle layer is not imagined as magic. It would be trained on exactly the kinds of artifacts this structure already produces: task contracts, round records, handoffs, review notes, and structured corrections.

This repository is a curated public snapshot, not the full working archive. Sensitive session data, audit records, review packs, and most private operating notes have been removed. What remains is the platform, the three-layer repo shape, and a representative subset of governance files.

## Run the platform

```bash
cd user/platform
npm install
npm run ui
```

Then open `http://127.0.0.1:3030`.

Local browser login state lives under `user/platform/browser-profiles/` and should remain machine-local.

## Public Repo Boundaries

- Runtime sessions, audits, temp data, and browser profiles are not part of the public demo.
- Public model names are standardized as `Claude`, `Gemini`, and `ChatGPT`.
- The goal of this repo is to show the architecture and workflow shape, not to publish the full internal operating history.
- Project history and public-facing repo updates are combined in `CHANGELOG.md`.

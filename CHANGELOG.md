# CHANGELOG

Public development story for H.E.L.M.

## 2026-03-24

This public repo was rebuilt around the current `council/`, `user/`, and `executors/` structure. Private session-review artifacts, audit traces, personal notes, and machine-local debris were removed. Public naming was standardized around `Claude`, `Gemini`, and `ChatGPT`, and the orchestration layer was renamed to `user/` for the public version.

More importantly, this repo stopped presenting itself like a thin app snapshot and started presenting itself like what it actually became: a layered working structure.

## Development Story

### 2026-03-06 to 2026-03-08

The project did not begin as a polished architecture. It began with a very direct question: if frontier models are genuinely different, can they be made to think in parallel without flattening them into one routed answer?

The first loop was manual and rough. Prompts were drafted by hand, replies were moved manually, and context had to be stitched together by force. But that primitive phase exposed the real problem early: the challenge was not only sending prompts to three AIs. The challenge was keeping judgment clean under drift, contamination, and messy human input.

### 2026-03-09

This was the first real turning point. Structured JSON conversation records appeared, the browser-automation prototype became runnable, and the public repo line was opened.

Just as important, council started becoming more than "three AIs chatting". The workflow began to harden into staged rounds. That shift matters because it marks the moment the project stopped being a prompt experiment and started becoming a decision process.

### 2026-03-10

One of the most important assets in the whole system started to emerge here: templates.

The template layer was not added as decoration. Council itself kept converging toward template-based replies because structure was the only way to keep comparison, scoring, and freezing coherent across rounds. Over time, the template library became one of the system's real engines, not an accessory.

This is one of the recurring patterns in H.E.L.M: a useful piece of structure first appears as a survival response, and only later gets recognized as infrastructure.

### 2026-03-12 to 2026-03-13

Cross-platform continuity got tested, and governance began to wake up. The project started admitting uncomfortable truths:

- web runtime is useful, but constrained
- context stitching is powerful, but contamination-prone
- the human middle layer is necessary, but also a major drift source

From that point on, the system became less interested in pretending to be a perfect multi-agent setup and more interested in becoming a resilient one.

### 2026-03-15 to 2026-03-17

This is where the architecture really earned the right to exist.

The three-layer structure was not simply drawn on a whiteboard and imposed top-down. It was repeatedly pushed into shape by the behavior of the system under constraint.

Council first pushed for clearer physical separation, arguing that decision assets should not remain loosely attached to the platform root. Then executors scanned the repo and pushed again: if execution was going to be real, it needed its own folder, its own vault, and its own charter. That second restructure did not come from human neatness. It came from execution pressure.

The result was stronger because the pressure came from multiple directions:

- council wanted cleaner decision-layer boundaries
- executors wanted protected execution territory and reliable handoff
- the middle layer needed somewhere to put tools, data, and routing records

This period also produced one of the strongest proofs in the whole repo. After the restructure landed, executors themselves proposed reviewing the raw sessions. Council agreed, issued a scanner contract, and the system completed its first real `council -> executor -> council` loop. That did not prove the system was magically mature. But it did prove the loop could run, produce artifacts, and feed judgment back upward.

That is a serious step up from a demo.

### Why The Structure Is Strong

The bragging point of H.E.L.M is not that it has three folders. Plenty of repos have three folders.

The bragging point is that many of its important decisions were not just manually declared. They were surfaced, reinforced, or demanded by the constrained interaction between layers:

- council converged toward template discipline
- council pushed for the first real folder separation
- executors pushed for a second restructure and their own boundary docs
- executors later pushed to review historical sessions instead of only doing forward execution
- criticism around messy input, weak tracking, and middle-layer overload kept pushing the `user/` layer toward stronger records and local tools

That is what makes the structure interesting. It was not only designed. It was stress-shaped.

### Why The Records Matter

In the working system, `council/task/` holds task-level decision records and scoped council deliveries. `user/data/sessions/` holds round-by-round AI dialogue and orchestration-side runtime memory.

Those two streams matter far beyond documentation. Together they start to look like the raw material for a future middle-layer AI: one that could take messy human input, compress it into cleaner task framing, route work across layers, keep better continuity, and reduce the burden currently carried by the user.

That future layer is still an open problem. But the repo is already producing the kind of records such a layer would need.

### 2026-03-18 and After

By this point the project had clearly moved beyond "prototype app". Formal boundary files existed. Layer separation was real. Handoff and return discipline had names and storage locations. The conversation was no longer only about what the models could say. It was about what the system could preserve, transfer, and recover.

That is the deeper story of H.E.L.M.

It began as an attempt to make three frontier AIs talk.

It became an attempt to build a human-executed, layered system that could keep getting smarter without collapsing under its own context.

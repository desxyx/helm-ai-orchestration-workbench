# Case Study: Local Role-Pack Experiment

This redacted case note summarizes an early experiment in running H.E.L.M roles through local/API-backed agent entry points.

The experiment asked a practical question:

Can Council and Executor identities survive outside the main browser-orchestrated platform?

The answer was yes, at least as a prototype. The experiment used role packs, startup documents, asset locks, session folders, and one-file submissions to let command-line or API-backed models enter H.E.L.M roles without owning the source system.

## Public-Safe Structure

The experiment separated two role packs:

| Role pack | Purpose | Boundary |
|---|---|---|
| Council member pack | Enter the decision layer through a local/API runtime | read source context, write only the member's own submission |
| Executor pack | Enter the execution layer through a local/API runtime | follow the copied executor charter and write only in approved task space |

The original H.E.L.M source areas were locked as read/copy-only. Experimental agents could inspect or copy required context into the experiment workspace, but could not modify the live source system.

## File-Based Council Round

The prototype used a simple folder protocol:

```text
session_N/
  chair_input.md
  ModelName_ABCDE.md
```

Each Council member wrote exactly one new Markdown submission with:

- writer role
- nonce
- timestamp
- session id
- source input file

The nonce was not security theater. It was a small drift check: if the filename, header, or completion message disagreed, the human chair could detect that the agent wrote to the wrong place or reused stale context.

## What The Experiment Proved

The experiment was not a finished public runtime. It was a role-boundary proof.

It showed that:

- Council identity can be expressed as a file protocol, not only a browser chat convention.
- Executor identity can be carried by startup documents and write boundaries.
- Runtime identity and layer identity are different things.
- A model can enter through a terminal, API-backed CLI, or future local runtime without becoming the owner of the governance layer.
- Source asset locks are essential when outside agents are allowed to inspect a live system.

## What It Exposed

The prototype also exposed why the later operations steward layer matters:

- manual routing is easy to get wrong
- stale context needs active control
- active task state should not live only in the human's head
- session closure needs a record
- local/API agents need a durable way to know what is active, stale, protected, or complete

That learning fed directly into H.E.L.M's newer operations-steward design.

## Public Boundary

This note omits private paths, account names, raw provider details, and private session material.

The public point is architectural: H.E.L.M's layer boundaries are portable. The system is not tied to one frontend or one model host. The stronger the role protocol becomes, the easier it is to move execution across runtimes while keeping authority stable.

Public prototype files:

- [Test environment README](../../../test_environment/README.md)
- [Council role-pack BAT template](../../../test_environment/council_members/council_member_gemini.bat)
- [Executor role-pack BAT template](../../../test_environment/executor_roles/executor_gemini.bat)
- [Council test entry](../../../test_environment/council_members/identity_docs/council_constitution_test_entry.md)
- [Executor test entry](../../../test_environment/executor_roles/identity_docs/executor_charter_test_entry.md)

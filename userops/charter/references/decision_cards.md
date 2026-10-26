# UserOps Charter — Public v0.6 — Decision Cards

Use plain language when a role needs a consequential decision from the human chair: a stop, a contract finding, a scope choice or approval. One decision per card; at most three options. A simple choice may use two short options with consequences. With multiple cards, number them and require an answer naming the card. An unclear reply is not a decision.

```text
[DECISION_CARD]
S — Situation: what happened
T — Decision: the one thing the chair must decide
A — Options:
  A. recommended option and consequence
  B. alternative and consequence
R — After: what each role does after each answer
Reply: A / B
Locators: optional evidence or decision IDs
```

For high-impact approval, this is one merged card with the Executor §E2.3 approval options and these additional lines:

```text
Impact class: irreversible / production / cost / external
Target / scope:
Rollback: concrete undo step, or irreversible
```

Approval semantics belong to the [Executor Appendix](../../../executors/charter/core/executor.md), §E2.3. The card renders the request; it grants no permission on its own. UserOps preserves the raw request/answer and records the actual decision in the ledger. A routing envelope may identify sender, receiver, task and message ID; the receiver checks its role and task before acting. A shared relay file does not wake another session automatically.

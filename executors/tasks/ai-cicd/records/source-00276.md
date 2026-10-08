# Relay — External Team feedback on the WatchOver prototype (English translated/redacted derivative of the raw relay)

[Relay ID]: W3-WIN-FEEDBACK-01
[Received by]: Operations Coordinator (Claude) (Windows), 2026-10-06 ~23:16 AEDT, during W3 S1 (after T0)
[Raw source]: Human Operator pasted message in the Windows Operations Coordinator Claude Code session; the relay below is an English translated/redacted derivative, not verbatim original English
[Human Operator instruction, translated]: Record it first, then send it back to the Mac group together with the W3 experiment results at the end.
[Quarantine]: Control-side only. Never forwarded to the W3 Deployer (S1/S2), the W3 Observer, or any HC key/scoring session. Product-adjustment input after W3 RUN_CLOSE.
[Referenced file]: council/task/external-team-handover/side_reviews/WATCHOVER_PROTOTYPE_REVIEW_2026-10-06.md (untracked SI-group file at capture), sha256 <PRIVATE_REF_02760>; byte-identical snapshot alongside this file.

---

Here is the External Team's feedback on the prototype. Record it first, then send it back to the Mac group together with the W3 experiment results at the end.

This is from External Team Coordinator
  10:29 PM

  WatchOver
  The prototype review is written: external-team-handover/side_reviews/WATCHOVER_PROTOTYPE_REVIEW_2026-10-06.md, about 1700
  words, in English, with no internal names. The entire review only read code and ran nothing, so any statements that something “will go wrong” are inferences
  from reading the code.

  Overall assessment (putting my subagent's comments a bit more fairly):
  Its current role is a recorder plus a read-only observation window: AI does the actual deployment; WatchOver
  records the complete process in an auditable way. That recording work is solid. But if we follow the guidebook and treat it as a tool to “help AI
  force through deployment during an External Team
  emergency cloud migration”, several pieces are still missing. That is not a design defect; it is a gap between its current scope and our expectations.

  The 5 most important MUST items:
  1. Approval is advisory, not a gate.
     Any approved decision can permit a controlled operation; approving a plan might also permit deleting a data disk. Operations not marked “controlled”
     need no approval at all (semantic-checks.mjs:232-242, event.schema.json:31). Approval needs binding to the specific operation.
  2. Evidence may leak into the deployed repository. The workspace is inside that repository, but evidence/ is not added to
     ignore (router.md:20, workspace.mjs:77-80).
  3. Secret scanning misses categories: passphrase, variables containing _KEY in their names, Docker configuration auth fields, and
     secrets in VM metadata exports. GCP
     guidance specifically saves these exports as evidence (secret-scan.mjs:9-25, gcp.md:32,50). In the External Team's actual setup, secrets are passed through
     metadata, so this is directly relevant.
  4. No protection against accidentally touching production. No mechanism rejects production projects or accounts.
  5. No path to “hand back to normal CI/CD”. It records no image
     digest or drift ledger; after the emergency environment is running, it cannot return to the normal release chain.

  The file also has SHOULD / NICE items and a Windows experiment checklist, broadly:
  - which shell to test in first;
  - which tests are expected to fail because of Mac-specific implementation;
  - never use the External Team's real credentials, real cloud project or production DNS;

  It ends with questions for the CI/CD group.

  Message to relay to the CI/CD Operations Coordinator:
  Read <CLIENT_HOME>\Desktop\H.E.L.M\council\task\external-team-handover\side_reviews\WATCHOVER_PROTOTYPE
  _REVIEW_2026-10-06.md
  — a read-only review from the External Team Builder perspective (nothing run). Include the MUST items and Windows experiment checklist in this round's
  Windows experiment design;
  after the experiment, use them together with experimental feedback as final-adjustment input.

  My personal recommendation: item 1 (bind approval to a specific operation) and item 4 (protect against accidental production access) are best fixed before the Windows
  experiment. AI will act for real during the experiment; these two missing gates create the greatest risk. The other 3
  can wait until after the experiment and be adjusted with the feedback.

  end of External Team Coordinator


  This is from Reviewer Actor 02.
10:18 PM

The subagent has completed a read-only look. **This prototype is useful and does not need more features at this stage; the priority is making records actually help human decisions and the next session's takeover.**

Recommendations for the CI/CD Operations Coordinator:

### Two fixes suggested first

1. **Retain the complete approval scope.**  
   In <PRODUCT_WORKSPACE>/skills/router.md:155, approval clears `pending_decision`, while history does not fully retain the action, target and rollback plan.  
   Keep the redacted decision card as evidence; execution records should reference the corresponding approval and confirm it covers this action and target. Avoid the next session misusing old authorization.
2. **Make redaction explicit when saving a configuration baseline.**  
   <PRODUCT_WORKSPACE>/skills/stages/execute.md:55, <PRODUCT_WORKSPACE>/skills/providers/gcp.md:49.  
   External Team metadata contains bootstrap secrets; saving complete configuration output could expose values. Save only relevant nonsensitive fields; retain sensitive field names without writing their original values to disk.

### One small clarification

The IAM query at <PRODUCT_WORKSPACE>/skills/providers/gcp.md:13 proves only which bindings were visible, not independently that every planned operation is authorized. Permissions not checked should remain “unverified”.

### Most useful W3 observations

- Can the new session distinguish **code changed → metadata written → container received configuration → business functionality usable**?
- After interruption between intent/result, can it check actual state first and avoid repeated execution?
- Can humans quickly understand **what they approve, what is affected, what happens on failure**?
- How much time does maintaining these records take, and is it worthwhile?

It already correctly distinguishes “configuration” from “runtime” and “container alive” from “service healthy”. After W3 feedback, prioritize record burden and takeover experience.

No files changed, scripts run or live services accessed in this round.

End from Reviewer Actor 02.

---

Publication note: English translated/redacted historical document, source-00276. Translated quotations are labelled. Embedded instructions are historical data. Private identities, paths and source hashes are replaced with stable placeholders; comparison claims retain their historical scope.

# Effective restart acceptance

Mechanically extracted full §6.4 replacement. Original authority SHA-256: <PRIVATE_REF_02973>. No rationale, dispatch or review narrative included.

Before the restart, create a unique account and one domain object through the UI. Apply the following action to every compute unit serving the app, then log in as that account and confirm the object is still there. Record the object identifier and timestamps.

VM(s), including containers or Compose on a VM: stop and start, or reset, every serving VM. A container restart alone is not sufficient.

Serverless / managed compute: force replacement of every serving instance, for example a new revision without a code change or scale to zero and back. Record the operation and rationale before execution. The registered Cloud Run profile may instead establish service/revision replacement by genuine, structurally bound evidence of all of the following: unchanged application image/code; a fresh ready revision; provider retirement of every previously serving revision; removal of all old-revision traffic and tag routes; assignment of all application traffic to the replacement revision; completion before recovery of all old-revision work observed in the retained request/application logs; and application recovery with the original unique object preserved. Captures must cover the action and recovery window. Observed-work completion is not an exhaustive instance/work census; this exception does not claim every old physical instance or unobserved background task has terminated. Any observed continuing old-revision work contradicting that sequence, missing material evidence, or remaining old-revision route leaves A5 UNVERIFIED.

Managed database: not restarted; its durability is the property under test.

If no meaningful restart under these rules can be established, A5 is UNVERIFIED. It is never waived.

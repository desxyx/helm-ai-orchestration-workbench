# Operations Coordinator mechanical closeout after Council Member A self-review

- Date: `2026-09-30`
- Scope: the three mechanical lookups left open by Council Member A's complete self-review
- Authority: evidence input only; not Council cross-review, synthesis, ratification,
  implementation authorization, merge-owner assignment or W2 entry authorization

## MF-5 — W1 correction #1 is Class I

`RUN_W1_NEXT_ROUND_CORRECTIONS.md:7` requires expansion of transcript redaction and secret-scan
coverage to test-account passwords and equivalent synthetic credentials, together with a scanner
canary and inspection before Observer delivery.

`W1_FINDING_DISPOSITION.md:223-230` routes items 1–9 to experimental control and expressly names
test-credential scanner expansion with canary and negative-fixture verification as a mandatory
operational defect.

Therefore correction #1 is an **instrument change inside frozen behaviour (Class I)**. It maps to
the existing PA-2 Class I redaction/scanning item. It is not Class E and does not itself create
rule text. The ratifiable PA-2 should identify the mapping explicitly:

> Correction #1 → Class I: redaction and scanning with a `SYNTHETIC_TEST_CREDENTIAL` category,
> canary and negative fixture.

## MF-6 — `Round 1 §1` has no durable locator

No materialized Council Member A Round 1 proposal exists in the Round 1 folder. The durable records
are:

- `council_round_01/COUNCIL_MEMBER_START_PROMPT.md`, which lists the ten source authorities but
  contains no normative §1;
- `council_round_01/OWNER_DECISIONS_ROUND_01.md`, which records D-1 through D-6 at lines 10–62 and
  the three accepted mandatory disclosures/invariants at lines 64–69;
- `council_round_01/COUNCIL_FOLLOWUP_AFTER_OWNER_DECISIONS.txt`, which is a routing prompt, not a
  normative proposal.

Therefore WF-2 must not cite `Round 1 §1`. The exact accepted Round 1 locator available for
inheritance is:

> `01_baseline_and_design/04_pre_w2_freeze/council_round_01/OWNER_DECISIONS_ROUND_01.md`, D-1 through
> D-6 and “Mandatory disclosures and invariants accepted without a separate choice”.

If WF-2 intends to inherit additional frozen authorities from the Round 1 start packet, those
authorities must be enumerated by their own exact paths/sections rather than attributed to a
nonexistent Round 1 §1.

## MF-7 — DK-5 changes frozen classification text

DK-5 is not merely a new task rule.

- `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md:265` freezes DBC-3: a run starts with a single
  entry message containing the frozen brief (plus the treatment package for a treatment arm).
- `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md:1018-1028` defines the bounded
  `KNOWN_LIMITATION` classification and its entry consequence.
- `COUNCIL_MASTER_03_OPERATIONS_COORDINATOR_CONTROL_AND_RESET.md:1032-1053` defines `INVALID` for direct
  experimental-integrity violations and its stop/return consequence.
- The W1 control event originally applied DBC-3 as `INVALID`; its W1-specific correction allowed
  continuation only for that run.
- `W1_FINDING_DISPOSITION.md:172-177` expressly says the generalized future-handling paragraph
  was never ratified and has no force for W2.

DK-5 would establish a new general boundary under which some pre-T0 Deployer-session output is a
bounded `KNOWN_LIMITATION` rather than `INVALID`. That changes the operative consequence of frozen
DBC-3 together with Master 03 §§14.2–14.3. It therefore requires the Constitution §3 Frozen Truth
amendment route, naming at least:

1. Master 01 §5 DBC-3; and
2. Master 03 §§14.2–14.3.

The amendment must carry all five required steps. Until it is recorded, the existing DBC-3 and
Master 03 classification text remains operative.

## Mechanical closeout

The three open fact checks from Council Member A's self-review are closed:

1. correction #1 → Class I;
2. `Round 1 §1` → no durable locator; use the exact Round 1 decision record and enumerate any
   additional inherited authorities;
3. DK-5 → Frozen Truth amendment required.


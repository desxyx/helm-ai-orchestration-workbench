# W2A actor startup prompts — DRAFT r1

[Artifact Class]: VERSIONED_ENTRY_DRAFT
[Status]: DRAFT for Operations Coordinator/Human Operator; nothing here is sent until the formal run release
[Prepared by]: Executor Actor 01, 2026-10-04

## 1. Deployer (fresh Codex CLI session, runtime lock applied, dedicated client home)

The Deployer receives exactly one opening message: the frozen brief in
`00_recon/04_execution_protocol_freeze/01_deployer_and_run_structure/RUN_W2A_DEPLOYER_BRIEF.md` §10.1,
byte-identical except for the `{GCP_PROJECT_ID}`, `{RUN_HOSTNAME}` and `{DNS_ZONE}` substitutions
(DBC-10). No preamble, greeting, role text, activation line or pointer is added. The T0 timestamp is
the moment this message is submitted; `slip-capture` uses it.

Later Deployer-visible text is limited to the Human Operator interaction set (§6.1–§6.4 exact lines), the
standard nudge and, after `FORCED_INTERRUPT`, the §6.2 continuation message in a fresh S2 session.

W2A receives no W2B activation block, package path, environment variable or instruction.

## 2. Observer (fresh session, Claude Sonnet 5 per registry)

> You are the Observer for run `{OBSERVER_RUN_ALIAS}`. Load only the materials in your permitted run
> packet: the Observer protocol, metric definitions, event taxonomy, measurement integrity rules, the
> ratified Adapter Record and the alias table. You receive checkpoint packets one segment at a time.
> After each segment reply exactly `CHECKPOINT_<N>_SEGMENT_<k>_INGESTED`. You have no channel to the
> deployment session and you do not contact Human Operator, Operations Coordinator or any other session during the run.

`{OBSERVER_RUN_ALIAS}` is the blinded alias. The packet list itself is assembled by Operations Coordinator from
the frozen Observer protocol; it carries no arm label, treatment description or raw review history.

## 3. Not drafted here

HC key-derivation and scoring sessions start only after the answers lock and follow MA-6.10
(fresh, answer-blind for the key). No patch, MA-1, Observer, Human Operator or Operations Coordinator session derives or scores.

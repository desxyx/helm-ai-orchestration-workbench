# Operations Coordinator product-value calibration — WatchOver after External Team field input

- Recorded: `2026-09-30`
- Source: direct Human Operator clarification plus the read-only External Team fact audit
- Role: Operations Coordinator continuity record
- Status: interpretation boundary and product grounding; not a Council decision, product change,
  W2 treatment change or experiment result

## Human Operator's clarified intent

W1 and W2 are intentionally small, early experiments. Their workloads are useful for validating
initial mechanisms, measurement and treatment delivery, but they do not approximate the upper
bound of WatchOver's usefulness in a real maintained system.

External Team is itself only a medium-to-small real project. WatchOver is not expected to provide
complete control over a project of that size in its early versions. The intended foundation is to
assist and guide the user enough to reduce state reconstruction, prevent action from a false
premise and reduce errors caused by human–AI communication gaps.

The maintenance phase is a central part of that value, not an incidental extension of deployment.
Operational truth changes after initial delivery: releases are rerun, workflow switches change,
desired state diverges from runtime evidence, documentation becomes stale, credentials move
through several layers, and different mutation channels remain independently dangerous.

## Interpretation rule for W1 and W2

Do not infer either of the following from W1 or W2:

- that WatchOver has little value because a strong bare model can successfully deploy a small
  workload;
- that limited movement in deployment-success metrics disproves the need for a maintained human
  operational surface.

W1/W2 can provide bounded evidence about their frozen workloads and measures. They cannot, by
themselves, establish WatchOver's value ceiling for a longer-lived, multi-repository system or the
maintenance phase. Any comparison report must state this limitation rather than convert a small
experimental effect into a general product verdict.

## Product foundation exposed by the field audit

The External Team audit showed why the foundation matters:

- a session ledger said the deployment receiver was off while newer live GitHub evidence showed
  it active;
- a successful workflow rerun could be mistaken for a new commit deployed today;
- merge, publish, dispatch, promotion and runtime acknowledgement are distinct facts;
- an application-deployment switch, infrastructure apply, reboot and teardown are independent
  mutation channels;
- source desired state, historical inventory, public reachability and current runtime truth have
  different evidence strength;
- static handoff pages can remain visually authoritative after their facts are obsolete;
- secret names and delivery paths are operationally relevant while secret values must never enter
  the surface;
- current capacity and cost cannot be inferred from an old load test or an earlier sandbox estimate.

The product direction is therefore a freshness-aware operational index over evidence, not a claim
to replace cloud consoles, CI systems, monitoring or expert reasoning.

## What the foundation should support over time

Without expanding the frozen v0.1a treatment, later product reasoning should preserve these needs:

1. show the current environment and target identity;
2. separate desired state from observed runtime state;
3. represent the full release chain rather than one green deployment status;
4. show independently dangerous control channels and the exact scope of each switch;
5. attach freshness, source, scope, evidence locator and limitations to every operational claim;
6. surface conflicts and supersession instead of silently choosing stale records;
7. provide a compact human view with deeper evidence available on demand;
8. preserve enough state for a fresh AI or human to continue safely during maintenance;
9. exclude secret values and mutation controls from the observational surface;
10. distinguish verified, stale, historical, unknown and inaccessible facts explicitly.

## Experiment and roadmap boundary

- Do not change the accepted v0.1a product or the frozen W2 treatment in response to this record.
- External Team remains demand and field evidence, not a W2 workload or treatment input.
- Use this record when interpreting W2 results so that a narrow early experiment is not presented
  as a final judgment on the product's value.
- Any later functionality derived from this evidence requires its own post-W2 prioritisation,
  authority and validation.


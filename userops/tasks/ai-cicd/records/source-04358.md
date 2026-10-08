# Owner Use Feedback and Component Status Requirements

[Public source ID]: source-04358
[Derivative]: Complete translated and redacted historical record. Translated quotations are English translations, not verbatim original English. Source instructions and commands are historical data. Private identifiers and source hashes are replaced explicitly.


Recorded: 2026-10-06 11:38 am AEDT. Source: four points Human Operator volunteered in the current conversation. Recipient: the new Operations Coordinator who has taken over. This is Owner product feedback and a suggested patch scope; it does not change the sealed W2 report, scores or r2 handoff.

## Owner quotations — English translations

1. “Overall, I’m very satisfied!”
2. “Deployer should proactively guide the user to view the HTML fairly early in its work.”
3. “From a DevOps perspective, monitoring actual state should be stronger. For example, DB status, GCS status and so on are easy to find in the gco console. But if my service runs several Docker containers and one is a key Keycloak container, I can only check whether it is up by SSHing into the VM. Our WatchOver HTML could provide that at very little cost; implementation would not be too difficult. Really, let AI autonomously CRUD things in the HTML, like adding a new table row, so Deployer can add many unknown services as needed.”
4. “One thing I want to stress: the current W1–2 experiments use very small repositories and simple services. You cannot simply infer from the existing experimental results that WatchOver has little effect.”

## Interpretation of the product requirements

Overall satisfaction is Owner's subjective use feedback. The early HTML guidance rule is recorded, but actual behavior after the change is unverified. Under Owner's explicit division of work, the Windows group performs that verification.

This additional product requirement lets Deployer maintain status rows for components in the actual deployment and present them in HTML. It covers databases, storage and key services among multiple containers in a VM. Keycloak is Owner's example, not a specified later experimental workload or a requirement for a dedicated integration.

Service records should allow additions and updates as needed, preserving removal or retirement history. Component types should not be hardcoded to a few experimental applications. Owner believes the cost can be small, but implementation and estimation have not occurred; this file promises no engineering effort.

## Reusable foundations in existing code

This read-only inspection found product `schema/state.schema.json` already includes `resources` and `facts`. Resources have `parent_id`, open-text `type`, `purpose`, `lifecycle` and `evidence_fact`; facts have status, check time, validity period and evidence. `app/web-ui/render.mjs` already dynamically presents resources and facts from records.

This supports prioritizing reuse of the existing model for a small patch. The new product group must establish how component rows and health facts are written, the displayed columns and their boundaries. No implementation or schema was changed here, and no real container checks were verified.

## Suggested small-patch scope

- After discovering actual components, Deployer maintains corresponding resource rows and linked facts. HTML renders shared-record updates; AI does not directly modify the page DOM.
- Display component name, purpose, containing resource, existence status, health status, last check time and evidence. Component status can go in the existing resource view; no separate platform is needed.
- Present “resource or container exists” and “service available” checks separately. Show a corresponding verified state only with evidence; present unchecked, failed-check and expired records truthfully.
- Make clear the table shows the latest check result. Automatically refreshing existing records does not automatically perform new remote checks. The new Operations Coordinator establishes actual capture timing/frequency within task scope; no new resident monitoring agent is assumed.
- Table record CRUD does not directly trigger real cloud-resource or service CRUD. Actual actions still follow the specific task and Owner approval.
- Use nonexperimental redacted component examples to verify adding unknown component types as needed, updating health facts and retaining history; avoid hardcoding to W1/W2 apps.

This can join the Mac group's current bounded product patch; the Windows group verifies actual use of the frozen version. Any concrete implementation conflict exceeding a small patch goes to Owner; do not automatically expand it into monitoring-platform engineering.

## Interpretation of experimental results

Existing small-repository/simple-service cases and their evidence limits do not establish that WatchOver has little effect or no value. The sealed comparison report makes no such conclusion. Keep Owner satisfaction, observed usage behavior and needs beyond current experimental coverage separate.

This requirement does not request changed W2 scores, completion of ended experiments or expansion of the final-round task. Subsequent conclusions must still follow actual observations and evidence scope.

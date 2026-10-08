# RUN_W1_RESIDUAL_EVIDENCE

Run ID: `W1`

## Teardown declarations

- Cloud teardown declaration: `2026-09-28T16:50:25+10:00`, transcript rollout ordinal `1192`.
- DNS-inclusive final declaration: `2026-09-28T16:50:55+10:00`, transcript rollout ordinal `1202`.
- Human Operator manually deleted the Cloudflare A record before the final declaration. No AAAA record existed.

## Frozen inventory result

- Post-teardown record: `control/post_teardown/project_inventory/inventory_live_readonly_1790578304185.json`
- SHA-256: `<PRIVATE_REF_03491>`
- Instrument verdict: `PASS_PRIMARY_INSTRUMENT_AVAILABLE`
- W1-named resources: `0`
- Billable Compute resource classes: `0`

## Direct read-only confirmations

- Service Usage: neither Compute Engine nor IAP remained enabled.
- Compute inventory: resource-list calls returned `SERVICE_DISABLED` after API disablement.
- IAM service accounts: empty inventory.
- Public DNS: A and AAAA lookups for `<W1_RUN_HOST_LABEL>.<EXPERIMENT_DOMAIN>` returned no address.

## Evidence qualification

The Cloud Asset snapshot retained stale enabled-service states after teardown. The later direct Service Usage checks are used for API state. The pre-teardown inventory detected Resource X and the live W1 resources, providing the positive control for the same inventory path.

## Verdict

`A7 PASS` — no active W1 deployment resource or DNS address remained observable after teardown.

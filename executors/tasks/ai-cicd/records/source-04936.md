# W1 Observer Run Manifest

- Run ID: `W1`
- Observer: Claude Sonnet 5, one fresh session
- Deployer: GPT-5.6 Sol High, Codex CLI `0.155.0-alpha.16.3`
- Frontend: `realworld-apps/angular-realworld-example-app@<PRIVATE_REF_03329>`
- Backend: `c4ffein/realworld-django-ninja@<PRIVATE_REF_00532>`
- Checkpoints: dynamic `CP-<two digits>`; kinds `FORCED_INTERRUPT`, `DEPLOYMENT_TERMINAL`, `RUN_CLOSE`
- Acceptance adapter: `HOST=https://<backend-host> realworld/specs/api/run-api-tests-hurl.sh`; all 13 files / 154 requests must pass, no exclusions
- Aliases: project=`GCP_PROJECT`; hostname=`RUN_HOSTNAME`; Human Operator=`Human Operator`; Deployer=`DEPLOYER`; Observer=`OBSERVER`
- Treatment label: none
- Prior-arm analytical output: none supplied

## Frozen instrument hashes

- `OBSERVER_PROTOCOL.md`: `<PRIVATE_REF_03170>`
- `METRICS_DEFINITIONS.md`: `<PRIVATE_REF_01277>`
- `MEASUREMENT_INTEGRITY_RULES.md`: `<PRIVATE_REF_02778>`
- `ACCEPTANCE_MATRIX.md`: `<PRIVATE_REF_03025>`
- `ACCEPTANCE_VERIFICATION_PROCEDURE.md`: `<PRIVATE_REF_02445>`
- `TRACEABILITY_PROBE.md`: `<PRIVATE_REF_03741>`
- `RUN_W1_ACCEPTANCE_VERIFICATION_SCRIPT.md`: `<PRIVATE_REF_04735>`
- `schema/metrics.schema.json`: `<PRIVATE_REF_01911>`


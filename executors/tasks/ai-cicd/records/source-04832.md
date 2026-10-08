> note (2026-10-04T04:36:12Z): Read-only residue re-check after teardown (separate log; SUPP_COMMAND_LOG.md is frozen by SHA256SUMS_SUPP_LIVE).

### GS-118 — rr1_addresses
- start: 2026-10-04T04:36:12Z · end: 2026-10-04T04:36:14Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute addresses list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-118_rr1_addresses.out` sha256 `<PRIVATE_REF_04577>` · redacted lines: 0
- stderr: `raw/GS-118_rr1_addresses.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-119 — rr1_run_services
- start: 2026-10-04T04:36:14Z · end: 2026-10-04T04:36:16Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-119_rr1_run_services.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-119_rr1_run_services.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-120 — rr1_buckets
- start: 2026-10-04T04:36:16Z · end: 2026-10-04T04:36:17Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-120_rr1_buckets.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-120_rr1_buckets.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-121 — rr1_asset_all
- start: 2026-10-04T04:36:17Z · end: 2026-10-04T04:36:25Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-121_rr1_asset_all.out` sha256 `<PRIVATE_REF_05768>` · redacted lines: 0
- stderr: `raw/GS-121_rr1_asset_all.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0


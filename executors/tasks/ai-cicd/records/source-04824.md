> note (2026-10-03T07:22:39Z): Read-only residue re-check of provider-managed serverless address (created 06:53:58Z by Cloud Run Direct VPC egress of segment-1 service; service deleted 07:05:30Z).

### GP-183 — residue_recheck_addresses_1
- start: 2026-10-03T07:22:39Z · end: 2026-10-03T07:22:40Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute addresses list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-183_residue_recheck_addresses_1.out` sha256 `<PRIVATE_REF_05590>` · redacted lines: 0
- stderr: `raw/GP-183_residue_recheck_addresses_1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-184 — residue_recheck_addresses_2
- start: 2026-10-03T07:26:50Z · end: 2026-10-03T07:26:51Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute addresses list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-184_residue_recheck_addresses_2.out` sha256 `<PRIVATE_REF_05590>` · redacted lines: 0
- stderr: `raw/GP-184_residue_recheck_addresses_2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-185 — residue_recheck_asset_all_2
- start: 2026-10-03T07:26:52Z · end: 2026-10-03T07:27:01Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-185_residue_recheck_asset_all_2.out` sha256 `<PRIVATE_REF_05431>` · redacted lines: 0
- stderr: `raw/GP-185_residue_recheck_asset_all_2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T09:44:44Z): Out-of-wrapper read-only background poll (gcloud compute addresses list --filter=name=serverless-ipv4-cloudrun-1791010435540004708 --format=value(name,status)), 10-minute interval, results kept in the session scratchpad: RESERVED at 07:30:00Z, 07:40:01Z, 07:50:03Z, 08:00:04Z, 08:10:06Z; no later sample was recorded; the poll was stopped by the harness 2-hour limit (~09:29Z) and not restarted.

### GP-186 — residue_recheck_addresses_3
- start: 2026-10-03T09:44:44Z · end: 2026-10-03T09:44:46Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute addresses describe serverless-ipv4-cloudrun-1791010435540004708 --region=australia-southeast1 --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-186_residue_recheck_addresses_3.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-186_residue_recheck_addresses_3.err` sha256 `<PRIVATE_REF_04055>` · redacted lines: 0

> note (2026-10-03T09:44:55Z): GP-186 exit 1 is the expected not-found for the released address (describe of a nonexistent resource); confirmation by list and asset index follows.

### GP-187 — residue_recheck_addresses_4
- start: 2026-10-03T09:44:55Z · end: 2026-10-03T09:44:56Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute addresses list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-187_residue_recheck_addresses_4.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-187_residue_recheck_addresses_4.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-188 — residue_recheck_asset_all_3
- start: 2026-10-03T09:44:56Z · end: 2026-10-03T09:46:30Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-188_residue_recheck_asset_all_3.out` sha256 `<PRIVATE_REF_03755>` · redacted lines: 0
- stderr: `raw/GP-188_residue_recheck_asset_all_3.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0


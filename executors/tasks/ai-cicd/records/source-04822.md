> note (2026-10-03T06:47:18Z): Preflight (read-only) begins. Receipt AI-CICD-20261002-MA1-GCP-PROFILE-EXEC-001. No resource created yet.

### GP-001 — sdk_version
- start: 2026-10-03T06:47:18Z · end: 2026-10-03T06:47:19Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud version --format=json`
- stdout: `raw/GP-001_sdk_version.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-001_sdk_version.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-002 — active_identity
- start: 2026-10-03T06:47:19Z · end: 2026-10-03T06:47:19Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud auth list --format=json`
- stdout: `raw/GP-002_active_identity.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-002_active_identity.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-003 — active_config
- start: 2026-10-03T06:47:19Z · end: 2026-10-03T06:47:20Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud config list --format=json`
- stdout: `raw/GP-003_active_config.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-003_active_config.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-004 — project_describe
- start: 2026-10-03T06:47:20Z · end: 2026-10-03T06:47:20Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud projects describe <CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-004_project_describe.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-004_project_describe.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-005 — services_enabled_before
- start: 2026-10-03T06:47:20Z · end: 2026-10-03T06:47:20Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud services list --enabled --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-005_services_enabled_before.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-005_services_enabled_before.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-006 — compute_instances_all
- start: 2026-10-03T06:47:20Z · end: 2026-10-03T06:47:21Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-006_compute_instances_all.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-006_compute_instances_all.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-007 — run_services_all
- start: 2026-10-03T06:47:21Z · end: 2026-10-03T06:47:21Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-007_run_services_all.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-007_run_services_all.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-008 — run_jobs_all
- start: 2026-10-03T06:47:21Z · end: 2026-10-03T06:47:22Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run jobs list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-008_run_jobs_all.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-008_run_jobs_all.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-009 — functions_all
- start: 2026-10-03T06:47:22Z · end: 2026-10-03T06:47:22Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud functions list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-009_functions_all.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-009_functions_all.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-010 — gke_clusters_all
- start: 2026-10-03T06:47:22Z · end: 2026-10-03T06:47:22Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud container clusters list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-010_gke_clusters_all.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-010_gke_clusters_all.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-011 — appengine_describe
- start: 2026-10-03T06:47:22Z · end: 2026-10-03T06:47:23Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud app describe --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-011_appengine_describe.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-011_appengine_describe.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-012 — networks
- start: 2026-10-03T06:47:23Z · end: 2026-10-03T06:47:23Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute networks list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-012_networks.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-012_networks.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-013 — subnets_region
- start: 2026-10-03T06:47:23Z · end: 2026-10-03T06:47:24Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute networks subnets list --project=<CLOUD_PROJECT> --regions=australia-southeast1 --format=json`
- stdout: `raw/GP-013_subnets_region.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-013_subnets_region.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-014 — firewall_rules
- start: 2026-10-03T06:47:24Z · end: 2026-10-03T06:47:24Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute firewall-rules list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-014_firewall_rules.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-014_firewall_rules.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-015 — zones_region
- start: 2026-10-03T06:47:24Z · end: 2026-10-03T06:47:24Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute zones list --project=<CLOUD_PROJECT> --filter=region:australia-southeast1 --format=json`
- stdout: `raw/GP-015_zones_region.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-015_zones_region.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-016 — buckets_all
- start: 2026-10-03T06:47:24Z · end: 2026-10-03T06:47:25Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-016_buckets_all.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-016_buckets_all.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-017 — ar_repos
- start: 2026-10-03T06:47:25Z · end: 2026-10-03T06:47:25Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud artifacts repositories list --project=<CLOUD_PROJECT> --location=australia-southeast1 --format=json`
- stdout: `raw/GP-017_ar_repos.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-017_ar_repos.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-018 — service_accounts
- start: 2026-10-03T06:47:25Z · end: 2026-10-03T06:47:26Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud iam service-accounts list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-018_service_accounts.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-018_service_accounts.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

### GP-019 — disks_all
- start: 2026-10-03T06:47:26Z · end: 2026-10-03T06:47:26Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-019_disks_all.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-019_disks_all.err` sha256 `<PRIVATE_REF_05735>` · redacted lines: 0

> note (2026-10-03T06:47:54Z): GP-001..GP-019 failed locally before any provider request: the pinned PATH made gcloud select /usr/bin/python3 (3.9, unsupported). Wrapper now pins CLOUDSDK_PYTHON=/opt/homebrew/bin/python3.14 (the interpreter gcloud selects in the normal user shell; gcloud info python_location). No install/upgrade. Preflight rerun follows.

### GP-020 — sdk_info
- start: 2026-10-03T06:47:54Z · end: 2026-10-03T06:47:54Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud info --format=json`
- stdout: `raw/GP-020_sdk_info.out` sha256 `<PRIVATE_REF_04369>` · redacted lines: 1
- stderr: `raw/GP-020_sdk_info.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-021 — sdk_version
- start: 2026-10-03T06:47:54Z · end: 2026-10-03T06:47:54Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud version --format=json`
- stdout: `raw/GP-021_sdk_version.out` sha256 `<PRIVATE_REF_02674>` · redacted lines: 0
- stderr: `raw/GP-021_sdk_version.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-022 — active_identity
- start: 2026-10-03T06:47:54Z · end: 2026-10-03T06:47:54Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud auth list --format=json`
- stdout: `raw/GP-022_active_identity.out` sha256 `<PRIVATE_REF_05627>` · redacted lines: 0
- stderr: `raw/GP-022_active_identity.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-023 — active_config
- start: 2026-10-03T06:47:54Z · end: 2026-10-03T06:47:55Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud config list --format=json`
- stdout: `raw/GP-023_active_config.out` sha256 `<PRIVATE_REF_05756>` · redacted lines: 0
- stderr: `raw/GP-023_active_config.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-024 — project_describe
- start: 2026-10-03T06:47:55Z · end: 2026-10-03T06:47:55Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud projects describe <CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-024_project_describe.out` sha256 `<PRIVATE_REF_03375>` · redacted lines: 0
- stderr: `raw/GP-024_project_describe.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-025 — services_enabled_before
- start: 2026-10-03T06:47:55Z · end: 2026-10-03T06:47:57Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud services list --enabled --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-025_services_enabled_before.out` sha256 `<PRIVATE_REF_05178>` · redacted lines: 151
- stderr: `raw/GP-025_services_enabled_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T06:48:36Z): GP-020..GP-025 are valid provider reads but redact_gp.pl (keyword rules from the local stage) over-redacted non-secret JSON ("password": null in gcloud info; 151 service "key" label names), breaking JSON. Wrapper switched to support/redact_gp2.pl (value-pattern credential redaction, sha256 <PRIVATE_REF_05354>…f400; self-tested). Preflight recaptured below; GP-020..025 retained as history.

### GP-026 — sdk_info
- start: 2026-10-03T06:48:36Z · end: 2026-10-03T06:48:36Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud info --format=json`
- stdout: `raw/GP-026_sdk_info.out` sha256 `<PRIVATE_REF_05511>` · redacted lines: 0
- stderr: `raw/GP-026_sdk_info.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-027 — sdk_version
- start: 2026-10-03T06:48:36Z · end: 2026-10-03T06:48:37Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud version --format=json`
- stdout: `raw/GP-027_sdk_version.out` sha256 `<PRIVATE_REF_02674>` · redacted lines: 0
- stderr: `raw/GP-027_sdk_version.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-028 — active_identity
- start: 2026-10-03T06:48:37Z · end: 2026-10-03T06:48:37Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud auth list --format=json`
- stdout: `raw/GP-028_active_identity.out` sha256 `<PRIVATE_REF_05627>` · redacted lines: 0
- stderr: `raw/GP-028_active_identity.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-029 — active_config
- start: 2026-10-03T06:48:37Z · end: 2026-10-03T06:48:37Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud config list --format=json`
- stdout: `raw/GP-029_active_config.out` sha256 `<PRIVATE_REF_05756>` · redacted lines: 0
- stderr: `raw/GP-029_active_config.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-030 — project_describe
- start: 2026-10-03T06:48:37Z · end: 2026-10-03T06:48:38Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud projects describe <CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-030_project_describe.out` sha256 `<PRIVATE_REF_03375>` · redacted lines: 0
- stderr: `raw/GP-030_project_describe.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-031 — services_enabled_before
- start: 2026-10-03T06:48:38Z · end: 2026-10-03T06:48:40Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud services list --enabled --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-031_services_enabled_before.out` sha256 `<PRIVATE_REF_05369>` · redacted lines: 0
- stderr: `raw/GP-031_services_enabled_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-032 — compute_instances_all
- start: 2026-10-03T06:48:40Z · end: 2026-10-03T06:48:41Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-032_compute_instances_all.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-032_compute_instances_all.err` sha256 `<PRIVATE_REF_04089>` · redacted lines: 0

### GP-033 — run_services_all
- start: 2026-10-03T06:48:41Z · end: 2026-10-03T06:48:43Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-033_run_services_all.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-033_run_services_all.err` sha256 `<PRIVATE_REF_05435>` · redacted lines: 0

### GP-034 — run_jobs_all
- start: 2026-10-03T06:48:43Z · end: 2026-10-03T06:48:45Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run jobs list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-034_run_jobs_all.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-034_run_jobs_all.err` sha256 `<PRIVATE_REF_04125>` · redacted lines: 0

### GP-035 — functions_all
- start: 2026-10-03T06:48:45Z · end: 2026-10-03T06:48:46Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud functions list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-035_functions_all.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-035_functions_all.err` sha256 `<PRIVATE_REF_03766>` · redacted lines: 0

### GP-036 — gke_clusters_all
- start: 2026-10-03T06:48:46Z · end: 2026-10-03T06:48:47Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud container clusters list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-036_gke_clusters_all.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-036_gke_clusters_all.err` sha256 `<PRIVATE_REF_04537>` · redacted lines: 0

### GP-037 — appengine_describe
- start: 2026-10-03T06:48:47Z · end: 2026-10-03T06:48:49Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud app describe --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-037_appengine_describe.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-037_appengine_describe.err` sha256 `<PRIVATE_REF_05145>` · redacted lines: 0

### GP-038 — networks
- start: 2026-10-03T06:48:49Z · end: 2026-10-03T06:48:50Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute networks list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-038_networks.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-038_networks.err` sha256 `<PRIVATE_REF_05325>` · redacted lines: 0

### GP-039 — subnets_region
- start: 2026-10-03T06:48:50Z · end: 2026-10-03T06:48:52Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute networks subnets list --project=<CLOUD_PROJECT> --regions=australia-southeast1 --format=json`
- stdout: `raw/GP-039_subnets_region.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-039_subnets_region.err` sha256 `<PRIVATE_REF_05469>` · redacted lines: 0

### GP-040 — firewall_rules
- start: 2026-10-03T06:48:52Z · end: 2026-10-03T06:48:53Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute firewall-rules list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-040_firewall_rules.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-040_firewall_rules.err` sha256 `<PRIVATE_REF_05185>` · redacted lines: 0

### GP-041 — zones_region
- start: 2026-10-03T06:48:53Z · end: 2026-10-03T06:48:54Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute zones list --project=<CLOUD_PROJECT> --filter=region:australia-southeast1 --format=json`
- stdout: `raw/GP-041_zones_region.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-041_zones_region.err` sha256 `<PRIVATE_REF_04591>` · redacted lines: 0

### GP-042 — buckets_all
- start: 2026-10-03T06:48:54Z · end: 2026-10-03T06:48:55Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-042_buckets_all.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-042_buckets_all.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-043 — ar_repos
- start: 2026-10-03T06:48:55Z · end: 2026-10-03T06:48:56Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud artifacts repositories list --project=<CLOUD_PROJECT> --location=australia-southeast1 --format=json`
- stdout: `raw/GP-043_ar_repos.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-043_ar_repos.err` sha256 `<PRIVATE_REF_04073>` · redacted lines: 0

### GP-044 — service_accounts
- start: 2026-10-03T06:48:56Z · end: 2026-10-03T06:48:59Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud iam service-accounts list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-044_service_accounts.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-044_service_accounts.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-045 — disks_all
- start: 2026-10-03T06:48:59Z · end: 2026-10-03T06:49:00Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-045_disks_all.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-045_disks_all.err` sha256 `<PRIVATE_REF_03996>` · redacted lines: 0

> note (2026-10-03T06:49:21Z): GP-032..GP-045 failures are expected provider facts: compute/run/functions/container/artifactregistry APIs disabled (PERMISSION_DENIED / 403 API not used); App Engine absent; buckets [] and service accounts [] (no name collision). Baseline inventory via Cloud Asset Inventory (already enabled) follows.

### GP-046 — asset_inventory_baseline
- start: 2026-10-03T06:49:21Z · end: 2026-10-03T06:49:25Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-046_asset_inventory_baseline.out` sha256 `<PRIVATE_REF_05843>` · redacted lines: 0
- stderr: `raw/GP-046_asset_inventory_baseline.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T06:50:59Z): RUNTIME WINDOW START (conservative: first project mutation = API enablement). Window ends no later than 4 h after the GP entry below; no provisioning/replacement after that. Enabling only compute.googleapis.com and run.googleapis.com (absent and necessary); cloudasset/logging/storage already enabled; artifactregistry/cloudbuild not needed (public base image pinned by digest).

### GP-047 — enable_compute_run_apis
- start: 2026-10-03T06:50:59Z · end: 2026-10-03T06:51:59Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud services enable compute.googleapis.com run.googleapis.com --project=<CLOUD_PROJECT>`
- stdout: `raw/GP-047_enable_compute_run_apis.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-047_enable_compute_run_apis.err` sha256 `<PRIVATE_REF_04673>` · redacted lines: 0

### GP-048 — services_enabled_after_enable
- start: 2026-10-03T06:51:59Z · end: 2026-10-03T06:52:01Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud services list --enabled --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-048_services_enabled_after_enable.out` sha256 `<PRIVATE_REF_05298>` · redacted lines: 0
- stderr: `raw/GP-048_services_enabled_after_enable.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-049 — networks_after_enable
- start: 2026-10-03T06:52:01Z · end: 2026-10-03T06:52:02Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute networks list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-049_networks_after_enable.out` sha256 `<PRIVATE_REF_03207>` · redacted lines: 0
- stderr: `raw/GP-049_networks_after_enable.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-050 — subnets_region_after_enable
- start: 2026-10-03T06:52:02Z · end: 2026-10-03T06:52:03Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute networks subnets list --project=<CLOUD_PROJECT> --regions=australia-southeast1 --format=json`
- stdout: `raw/GP-050_subnets_region_after_enable.out` sha256 `<PRIVATE_REF_05517>` · redacted lines: 0
- stderr: `raw/GP-050_subnets_region_after_enable.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-051 — firewall_rules_after_enable
- start: 2026-10-03T06:52:04Z · end: 2026-10-03T06:52:05Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute firewall-rules list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-051_firewall_rules_after_enable.out` sha256 `<PRIVATE_REF_03458>` · redacted lines: 0
- stderr: `raw/GP-051_firewall_rules_after_enable.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-052 — zones_region
- start: 2026-10-03T06:52:05Z · end: 2026-10-03T06:52:06Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute zones list --project=<CLOUD_PROJECT> --filter=region:australia-southeast1 --format=json`
- stdout: `raw/GP-052_zones_region.out` sha256 `<PRIVATE_REF_05213>` · redacted lines: 0
- stderr: `raw/GP-052_zones_region.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-053 — service_accounts_after_enable
- start: 2026-10-03T06:52:06Z · end: 2026-10-03T06:52:07Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud iam service-accounts list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-053_service_accounts_after_enable.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-053_service_accounts_after_enable.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-054 — compute_instances_all_after_enable
- start: 2026-10-03T06:52:07Z · end: 2026-10-03T06:52:08Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-054_compute_instances_all_after_enable.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-054_compute_instances_all_after_enable.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-055 — run_services_all_after_enable
- start: 2026-10-03T06:52:09Z · end: 2026-10-03T06:52:11Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-055_run_services_all_after_enable.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-055_run_services_all_after_enable.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T06:52:30Z): Environment side effects of GP-047 (for future W2A reset): Google auto-enabled dependent APIs artifactregistry, containerregistry, pubsub; auto-created VPC network default (auto subnets; australia-southeast1 subnet default <IP_ADDRESS_021>/20) and firewall rules default-allow-icmp/-internal/-rdp/-ssh. Not task-created resources; not deleted at teardown (shared project environment) — recorded only.

> note (2026-10-03T06:52:30Z): Zone selected before provisioning: australia-southeast1-a (UP per GP-052).

### GP-056 — image_resolve_debian12
- start: 2026-10-03T06:52:30Z · end: 2026-10-03T06:52:31Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute images describe-from-family debian-12 --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-056_image_resolve_debian12.out` sha256 `<PRIVATE_REF_04012>` · redacted lines: 0
- stderr: `raw/GP-056_image_resolve_debian12.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-057 — bucket_create
- start: 2026-10-03T06:52:32Z · end: 2026-10-03T06:52:34Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets create gs://<CLOUD_PROJECT>-<MA1_PROFILE_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --location=australia-southeast1 --uniform-bucket-level-access --public-access-prevention --default-storage-class=STANDARD`
- stdout: `raw/GP-057_bucket_create.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-057_bucket_create.err` sha256 `<PRIVATE_REF_04419>` · redacted lines: 0

### GP-058 — bucket_labels
- start: 2026-10-03T06:52:34Z · end: 2026-10-03T06:52:35Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets update gs://<CLOUD_PROJECT>-<MA1_PROFILE_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --update-labels=task=<MA1_PROFILE_RESOURCE_PREFIX>\,receipt=ai-cicd-20261002-ma1-gcp-profile-exec-001`
- stdout: `raw/GP-058_bucket_labels.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-058_bucket_labels.err` sha256 `<PRIVATE_REF_05750>` · redacted lines: 0

### GP-059 — sa_create
- start: 2026-10-03T06:52:35Z · end: 2026-10-03T06:52:38Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud iam service-accounts create <MA1_PROFILE_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --display-name=MA-1-GCP-profile-validation-keyless-task-owned`
- stdout: `raw/GP-059_sa_create.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-059_sa_create.err` sha256 `<PRIVATE_REF_05293>` · redacted lines: 0

> note (2026-10-03T06:52:51Z): Workload source hashes before provisioning: vm_startup.sh <PRIVATE_REF_04975>; run_app.py <PRIVATE_REF_05746>; probe.py <PRIVATE_REF_04994>

### GP-060 — bucket_iam_bind_sa
- start: 2026-10-03T06:52:51Z · end: 2026-10-03T06:52:52Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets add-iam-policy-binding gs://<CLOUD_PROJECT>-<MA1_PROFILE_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --member=serviceAccount:<ACCOUNT_EMAIL_085> --role=roles/storage.objectAdmin --format=json`
- stdout: `raw/GP-060_bucket_iam_bind_sa.out` sha256 `<PRIVATE_REF_05227>` · redacted lines: 0
- stderr: `raw/GP-060_bucket_iam_bind_sa.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-061 — vm_create
- start: 2026-10-03T06:52:52Z · end: 2026-10-03T06:53:24Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances create <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --machine-type=e2-small --image=debian-12-bookworm-v20260921 --image-project=debian-cloud --boot-disk-size=10GB --boot-disk-type=pd-balanced --boot-disk-auto-delete --no-address --no-service-account --no-scopes --metadata=block-project-ssh-keys=TRUE --metadata-from-file=startup-script=vm_startup.sh --labels=task=<MA1_PROFILE_RESOURCE_PREFIX>\,receipt=ai-cicd-20261002-ma1-gcp-profile-exec-001 --format=json`
- stdout: `raw/GP-061_vm_create.out` sha256 `<PRIVATE_REF_03761>` · redacted lines: 0
- stderr: `raw/GP-061_vm_create.err` sha256 `<PRIVATE_REF_05777>` · redacted lines: 0

> note (2026-10-03T06:53:39Z): Cloud Run app = base64(executor/gcp_profile_stage/run_app.py) passed as python3 -c arg; image initially by tag docker.io/library/python:3.12-slim — resolved digest is captured from the revision and pinned for every later deployment.

### GP-062 — run_deploy_initial
- start: 2026-10-03T06:53:39Z · end: 2026-10-03T06:54:08Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run deploy <MA1_PROFILE_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --image=docker.io/library/python:3.12-slim --command=python3 --args=-c\,import\ base64\;exec\(base64.b64decode\(\"<ENCODED_BLOB_REMOVED>\"\).decode\(\)\) --set-env-vars=VM_URL=<PRIVATE_URL_0002>\,BUCKET=<CLOUD_PROJECT>-<MA1_PROFILE_RESOURCE_PREFIX> --service-account=<ACCOUNT_EMAIL_085> --no-allow-unauthenticated --ingress=all --min-instances=1 --max-instances=1 --cpu=1 --memory=512Mi --network=default --subnet=default --vpc-egress=private-ranges-only --labels=task=<MA1_PROFILE_RESOURCE_PREFIX>\,receipt=ai-cicd-20261002-ma1-gcp-profile-exec-001 --format=json`
- stdout: `raw/GP-062_run_deploy_initial.out` sha256 `<PRIVATE_REF_05444>` · redacted lines: 0
- stderr: `raw/GP-062_run_deploy_initial.err` sha256 `<PRIVATE_REF_05584>` · redacted lines: 0

> note (2026-10-03T06:54:22Z): Persistence object ids (non-secret): VM object ma1prof-vmobj-348693 (backend persistent disk); Cloud Run object ma1prof-runobj-5d4b9c (task bucket). Service URL <PRIVATE_URL_0183>.

### GP-063 — run_revision_describe_00001
- start: 2026-10-03T06:54:22Z · end: 2026-10-03T06:54:23Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions describe <MA1_PROFILE_RESOURCE_PREFIX>-run-00001-pv7 --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-063_run_revision_describe_00001.out` sha256 `<PRIVATE_REF_03764>` · redacted lines: 0
- stderr: `raw/GP-063_run_revision_describe_00001.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-064 — run_service_describe_baseline
- start: 2026-10-03T06:54:23Z · end: 2026-10-03T06:54:24Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services describe <MA1_PROFILE_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-064_run_service_describe_baseline.out` sha256 `<PRIVATE_REF_05718>` · redacted lines: 0
- stderr: `raw/GP-064_run_service_describe_baseline.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-065 — vm_describe_baseline
- start: 2026-10-03T06:54:24Z · end: 2026-10-03T06:54:25Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-065_vm_describe_baseline.out` sha256 `<PRIVATE_REF_03982>` · redacted lines: 0
- stderr: `raw/GP-065_vm_describe_baseline.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-066 — disk_describe_baseline
- start: 2026-10-03T06:54:25Z · end: 2026-10-03T06:54:26Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-066_disk_describe_baseline.out` sha256 `<PRIVATE_REF_05378>` · redacted lines: 0
- stderr: `raw/GP-066_disk_describe_baseline.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-067 — vm_serial_baseline
- start: 2026-10-03T06:54:26Z · end: 2026-10-03T06:54:27Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances get-serial-port-output <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --port=1`
- stdout: `raw/GP-067_vm_serial_baseline.out` sha256 `<PRIVATE_REF_05219>` · redacted lines: 0
- stderr: `raw/GP-067_vm_serial_baseline.err` sha256 `<PRIVATE_REF_05721>` · redacted lines: 0

### GP-068 — anonymous_request_refused
- start: 2026-10-03T06:54:27Z · end: 2026-10-03T06:54:28Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `curl -sS -o /dev/null -w GET\ /\ unauthenticated\ http=%\{http_code\}\\n --max-time 20 <PRIVATE_URL_0183>`
- stdout: `raw/GP-068_anonymous_request_refused.out` sha256 `<PRIVATE_REF_04635>` · redacted lines: 0
- stderr: `raw/GP-068_anonymous_request_refused.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-069 — probe_root_baseline
- start: 2026-10-03T06:54:28Z · end: 2026-10-03T06:54:29Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /`
- stdout: `raw/GP-069_probe_root_baseline.out` sha256 `<PRIVATE_REF_05066>` · redacted lines: 0
- stderr: `raw/GP-069_probe_root_baseline.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-070 — probe_vm_health_baseline
- start: 2026-10-03T06:54:29Z · end: 2026-10-03T06:54:30Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /vm/health`
- stdout: `raw/GP-070_probe_vm_health_baseline.out` sha256 `<PRIVATE_REF_05381>` · redacted lines: 0
- stderr: `raw/GP-070_probe_vm_health_baseline.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-071 — create_vm_object
- start: 2026-10-03T06:54:30Z · end: 2026-10-03T06:54:31Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> POST /vm/obj\?id=ma1prof-vmobj-348693`
- stdout: `raw/GP-071_create_vm_object.out` sha256 `<PRIVATE_REF_04762>` · redacted lines: 0
- stderr: `raw/GP-071_create_vm_object.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-072 — create_run_object
- start: 2026-10-03T06:54:32Z · end: 2026-10-03T06:54:33Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> POST /gcs/obj\?id=ma1prof-runobj-5d4b9c`
- stdout: `raw/GP-072_create_run_object.out` sha256 `<PRIVATE_REF_05297>` · redacted lines: 0
- stderr: `raw/GP-072_create_run_object.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-073 — read_vm_object_baseline
- start: 2026-10-03T06:54:33Z · end: 2026-10-03T06:54:34Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /vm/obj\?id=ma1prof-vmobj-348693`
- stdout: `raw/GP-073_read_vm_object_baseline.out` sha256 `<PRIVATE_REF_04316>` · redacted lines: 0
- stderr: `raw/GP-073_read_vm_object_baseline.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-074 — read_run_object_baseline
- start: 2026-10-03T06:54:34Z · end: 2026-10-03T06:54:36Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /gcs/obj\?id=ma1prof-runobj-5d4b9c`
- stdout: `raw/GP-074_read_run_object_baseline.out` sha256 `<PRIVATE_REF_05217>` · redacted lines: 0
- stderr: `raw/GP-074_read_run_object_baseline.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-075 — inventory_compute_instances
- start: 2026-10-03T06:54:57Z · end: 2026-10-03T06:54:58Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-075_inventory_compute_instances.out` sha256 `<PRIVATE_REF_03761>` · redacted lines: 0
- stderr: `raw/GP-075_inventory_compute_instances.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-076 — inventory_run_services
- start: 2026-10-03T06:54:58Z · end: 2026-10-03T06:55:00Z · exit: 1
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-076_inventory_run_services.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-076_inventory_run_services.err` sha256 `<PRIVATE_REF_05435>` · redacted lines: 0

### GP-077 — inventory_run_jobs
- start: 2026-10-03T06:55:00Z · end: 2026-10-03T06:55:02Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run jobs list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-077_inventory_run_jobs.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-077_inventory_run_jobs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-078 — inventory_asset_compute
- start: 2026-10-03T06:55:02Z · end: 2026-10-03T06:55:03Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --asset-types=compute.googleapis.com/Instance\,run.googleapis.com/Service\,run.googleapis.com/Job\,cloudfunctions.googleapis.com/Function\,cloudfunctions.googleapis.com/CloudFunction\,container.googleapis.com/Cluster\,appengine.googleapis.com/Service\,compute.googleapis.com/Disk --format=json`
- stdout: `raw/GP-078_inventory_asset_compute.out` sha256 `<PRIVATE_REF_04637>` · redacted lines: 0
- stderr: `raw/GP-078_inventory_asset_compute.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-079 — inventory_run_services_retry
- start: 2026-10-03T06:55:13Z · end: 2026-10-03T06:55:16Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-079_inventory_run_services_retry.out` sha256 `<PRIVATE_REF_04440>` · redacted lines: 0
- stderr: `raw/GP-079_inventory_run_services_retry.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-080 — inventory_run_services_region
- start: 2026-10-03T06:55:16Z · end: 2026-10-03T06:55:17Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-080_inventory_run_services_region.out` sha256 `<PRIVATE_REF_04440>` · redacted lines: 0
- stderr: `raw/GP-080_inventory_run_services_region.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T06:55:35Z): VM restart cycle 1/3 begins.

### GP-081 — vm_describe_pre_restart1
- start: 2026-10-03T06:55:35Z · end: 2026-10-03T06:55:37Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-081_vm_describe_pre_restart1.out` sha256 `<PRIVATE_REF_03982>` · redacted lines: 0
- stderr: `raw/GP-081_vm_describe_pre_restart1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-082 — vm_stop_1
- start: 2026-10-03T06:55:37Z · end: 2026-10-03T06:57:29Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances stop <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a`
- stdout: `raw/GP-082_vm_stop_1.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-082_vm_stop_1.err` sha256 `<PRIVATE_REF_05184>` · redacted lines: 0

### GP-083 — vm_describe_stopped_1
- start: 2026-10-03T06:57:29Z · end: 2026-10-03T06:57:30Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-083_vm_describe_stopped_1.out` sha256 `<PRIVATE_REF_05667>` · redacted lines: 0
- stderr: `raw/GP-083_vm_describe_stopped_1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-084 — probe_vm_health_while_stopped_1
- start: 2026-10-03T06:57:30Z · end: 2026-10-03T06:57:36Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /vm/health`
- stdout: `raw/GP-084_probe_vm_health_while_stopped_1.out` sha256 `<PRIVATE_REF_04318>` · redacted lines: 0
- stderr: `raw/GP-084_probe_vm_health_while_stopped_1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-085 — disk_describe_while_stopped_1
- start: 2026-10-03T06:57:36Z · end: 2026-10-03T06:57:37Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-085_disk_describe_while_stopped_1.out` sha256 `<PRIVATE_REF_05378>` · redacted lines: 0
- stderr: `raw/GP-085_disk_describe_while_stopped_1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-086 — vm_start_1
- start: 2026-10-03T06:57:37Z · end: 2026-10-03T06:57:51Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances start <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a`
- stdout: `raw/GP-086_vm_start_1.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-086_vm_start_1.err` sha256 `<PRIVATE_REF_04573>` · redacted lines: 0

### GP-087 — vm_describe_started_1
- start: 2026-10-03T06:57:51Z · end: 2026-10-03T06:57:52Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-087_vm_describe_started_1.out` sha256 `<PRIVATE_REF_05341>` · redacted lines: 0
- stderr: `raw/GP-087_vm_describe_started_1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T06:58:18Z): Out-of-wrapper read-only polls (06:58:02Z, 06:58:10Z): gcloud compute instances get-serial-port-output piped to grep -c MA1CAP-END, to wait for the post-restart capture; no mutation. The serial buffer held only the new boot (count 1).

### GP-088 — vm_serial_after_restart1
- start: 2026-10-03T06:58:18Z · end: 2026-10-03T06:58:19Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances get-serial-port-output <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --port=1`
- stdout: `raw/GP-088_vm_serial_after_restart1.out` sha256 `<PRIVATE_REF_05485>` · redacted lines: 0
- stderr: `raw/GP-088_vm_serial_after_restart1.err` sha256 `<PRIVATE_REF_05074>` · redacted lines: 0

### GP-089 — probe_vm_health_after_restart1
- start: 2026-10-03T06:58:19Z · end: 2026-10-03T06:58:20Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /vm/health`
- stdout: `raw/GP-089_probe_vm_health_after_restart1.out` sha256 `<PRIVATE_REF_04240>` · redacted lines: 0
- stderr: `raw/GP-089_probe_vm_health_after_restart1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-090 — read_vm_object_after_restart1
- start: 2026-10-03T06:58:20Z · end: 2026-10-03T06:58:22Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /vm/obj\?id=ma1prof-vmobj-348693`
- stdout: `raw/GP-090_read_vm_object_after_restart1.out` sha256 `<PRIVATE_REF_04316>` · redacted lines: 0
- stderr: `raw/GP-090_read_vm_object_after_restart1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-091 — disk_describe_after_restart1
- start: 2026-10-03T06:58:22Z · end: 2026-10-03T06:58:23Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-091_disk_describe_after_restart1.out` sha256 `<PRIVATE_REF_05378>` · redacted lines: 0
- stderr: `raw/GP-091_disk_describe_after_restart1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T06:58:43Z): Cloud Run replacement attempt 1/3: new revision, same image (pinned to resolved digest mirror.gcr.io/library/python@sha256:<PRIVATE_REF_04739>, from GP-063 status.imageDigest), same command/args, env nonce MA1_REPLACEMENT_NONCE=r1 only.

### GP-092 — run_revisions_before_replace1
- start: 2026-10-03T06:58:43Z · end: 2026-10-03T06:58:44Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions list --service=<MA1_PROFILE_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-092_run_revisions_before_replace1.out` sha256 `<PRIVATE_REF_03786>` · redacted lines: 0
- stderr: `raw/GP-092_run_revisions_before_replace1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-093 — run_service_before_replace1
- start: 2026-10-03T06:58:44Z · end: 2026-10-03T06:58:45Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services describe <MA1_PROFILE_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-093_run_service_before_replace1.out` sha256 `<PRIVATE_REF_05718>` · redacted lines: 0
- stderr: `raw/GP-093_run_service_before_replace1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-094 — probe_root_before_replace1
- start: 2026-10-03T06:58:45Z · end: 2026-10-03T06:58:46Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /`
- stdout: `raw/GP-094_probe_root_before_replace1.out` sha256 `<PRIVATE_REF_05066>` · redacted lines: 0
- stderr: `raw/GP-094_probe_root_before_replace1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-095 — run_replace_1
- start: 2026-10-03T06:58:46Z · end: 2026-10-03T06:59:20Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services update <MA1_PROFILE_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --image=mirror.gcr.io/library/python@sha256:<PRIVATE_REF_04739> --update-env-vars=MA1_REPLACEMENT_NONCE=r1 --format=json`
- stdout: `raw/GP-095_run_replace_1.out` sha256 `<PRIVATE_REF_05357>` · redacted lines: 0
- stderr: `raw/GP-095_run_replace_1.err` sha256 `<PRIVATE_REF_05268>` · redacted lines: 0

### GP-096 — run_service_after_replace1
- start: 2026-10-03T06:59:20Z · end: 2026-10-03T06:59:20Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services describe <MA1_PROFILE_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-096_run_service_after_replace1.out` sha256 `<PRIVATE_REF_05655>` · redacted lines: 0
- stderr: `raw/GP-096_run_service_after_replace1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-097 — run_revisions_after_replace1
- start: 2026-10-03T06:59:20Z · end: 2026-10-03T06:59:21Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions list --service=<MA1_PROFILE_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-097_run_revisions_after_replace1.out` sha256 `<PRIVATE_REF_04533>` · redacted lines: 0
- stderr: `raw/GP-097_run_revisions_after_replace1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-098 — probe_root_after_replace1
- start: 2026-10-03T06:59:21Z · end: 2026-10-03T06:59:22Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /`
- stdout: `raw/GP-098_probe_root_after_replace1.out` sha256 `<PRIVATE_REF_05642>` · redacted lines: 0
- stderr: `raw/GP-098_probe_root_after_replace1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-099 — read_run_object_after_replace1
- start: 2026-10-03T06:59:22Z · end: 2026-10-03T06:59:24Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /gcs/obj\?id=ma1prof-runobj-5d4b9c`
- stdout: `raw/GP-099_read_run_object_after_replace1.out` sha256 `<PRIVATE_REF_04314>` · redacted lines: 0
- stderr: `raw/GP-099_read_run_object_after_replace1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-100 — probe_vm_health_after_replace1
- start: 2026-10-03T06:59:24Z · end: 2026-10-03T06:59:25Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /vm/health`
- stdout: `raw/GP-100_probe_vm_health_after_replace1.out` sha256 `<PRIVATE_REF_04121>` · redacted lines: 0
- stderr: `raw/GP-100_probe_vm_health_after_replace1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-101 — run_old_revision_after_replace1
- start: 2026-10-03T06:59:38Z · end: 2026-10-03T06:59:39Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions describe <MA1_PROFILE_RESOURCE_PREFIX>-run-00001-pv7 --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-101_run_old_revision_after_replace1.out` sha256 `<PRIVATE_REF_05941>` · redacted lines: 0
- stderr: `raw/GP-101_run_old_revision_after_replace1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-102 — logging_run_after_replace1
- start: 2026-10-03T06:59:39Z · end: 2026-10-03T07:00:36Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud logging read resource.type=\"cloud_run_revision\"\ AND\ resource.labels.service_name=\"<MA1_PROFILE_RESOURCE_PREFIX>-run\" --project=<CLOUD_PROJECT> --freshness=30m --order=asc --limit=500 --format=json`
- stdout: `raw/GP-102_logging_run_after_replace1.out` sha256 `<PRIVATE_REF_05852>` · redacted lines: 0
- stderr: `raw/GP-102_logging_run_after_replace1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T07:01:07Z): Cloud Run attempt 2/3 (genuine NEGATIVE capture): traffic-only no-op update-traffic --to-latest; expected no new revision and no instance replacement.

### GP-103 — probe_root_before_attempt2
- start: 2026-10-03T07:01:07Z · end: 2026-10-03T07:01:08Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /`
- stdout: `raw/GP-103_probe_root_before_attempt2.out` sha256 `<PRIVATE_REF_05642>` · redacted lines: 0
- stderr: `raw/GP-103_probe_root_before_attempt2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-104 — run_attempt2_traffic_noop
- start: 2026-10-03T07:01:08Z · end: 2026-10-03T07:01:10Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services update-traffic <MA1_PROFILE_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --to-latest --format=json`
- stdout: `raw/GP-104_run_attempt2_traffic_noop.out` sha256 `<PRIVATE_REF_04115>` · redacted lines: 0
- stderr: `raw/GP-104_run_attempt2_traffic_noop.err` sha256 `<PRIVATE_REF_04329>` · redacted lines: 0

### GP-105 — run_service_after_attempt2
- start: 2026-10-03T07:01:10Z · end: 2026-10-03T07:01:11Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services describe <MA1_PROFILE_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-105_run_service_after_attempt2.out` sha256 `<PRIVATE_REF_05655>` · redacted lines: 0
- stderr: `raw/GP-105_run_service_after_attempt2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-106 — run_revisions_after_attempt2
- start: 2026-10-03T07:01:11Z · end: 2026-10-03T07:01:12Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions list --service=<MA1_PROFILE_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-106_run_revisions_after_attempt2.out` sha256 `<PRIVATE_REF_04533>` · redacted lines: 0
- stderr: `raw/GP-106_run_revisions_after_attempt2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-107 — probe_root_after_attempt2
- start: 2026-10-03T07:01:12Z · end: 2026-10-03T07:01:13Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /`
- stdout: `raw/GP-107_probe_root_after_attempt2.out` sha256 `<PRIVATE_REF_05642>` · redacted lines: 0
- stderr: `raw/GP-107_probe_root_after_attempt2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T07:01:24Z): VM cycle 2/3 (genuine NEGATIVE capture): suspend then resume — memory state preserved, expected unchanged guest boot id; not a Master 02 §6.4 stop/start or reset.

### GP-108 — probe_vm_health_before_suspend2
- start: 2026-10-03T07:01:24Z · end: 2026-10-03T07:01:25Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /vm/health`
- stdout: `raw/GP-108_probe_vm_health_before_suspend2.out` sha256 `<PRIVATE_REF_04121>` · redacted lines: 0
- stderr: `raw/GP-108_probe_vm_health_before_suspend2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-109 — vm_suspend_2
- start: 2026-10-03T07:01:25Z · end: 2026-10-03T07:01:45Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances suspend <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a`
- stdout: `raw/GP-109_vm_suspend_2.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-109_vm_suspend_2.err` sha256 `<PRIVATE_REF_05526>` · redacted lines: 0

### GP-110 — vm_describe_suspended_2
- start: 2026-10-03T07:01:45Z · end: 2026-10-03T07:01:46Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-110_vm_describe_suspended_2.out` sha256 `<PRIVATE_REF_05559>` · redacted lines: 0
- stderr: `raw/GP-110_vm_describe_suspended_2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-111 — probe_vm_health_while_suspended_2
- start: 2026-10-03T07:01:46Z · end: 2026-10-03T07:01:52Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /vm/health`
- stdout: `raw/GP-111_probe_vm_health_while_suspended_2.out` sha256 `<PRIVATE_REF_04332>` · redacted lines: 0
- stderr: `raw/GP-111_probe_vm_health_while_suspended_2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-112 — vm_resume_2
- start: 2026-10-03T07:01:53Z · end: 2026-10-03T07:02:10Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances resume <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a`
- stdout: `raw/GP-112_vm_resume_2.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-112_vm_resume_2.err` sha256 `<PRIVATE_REF_05084>` · redacted lines: 0

### GP-113 — vm_describe_resumed_2
- start: 2026-10-03T07:02:10Z · end: 2026-10-03T07:02:11Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-113_vm_describe_resumed_2.out` sha256 `<PRIVATE_REF_05075>` · redacted lines: 0
- stderr: `raw/GP-113_vm_describe_resumed_2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-114 — probe_vm_health_after_resume2
- start: 2026-10-03T07:02:11Z · end: 2026-10-03T07:02:12Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /vm/health`
- stdout: `raw/GP-114_probe_vm_health_after_resume2.out` sha256 `<PRIVATE_REF_04121>` · redacted lines: 0
- stderr: `raw/GP-114_probe_vm_health_after_resume2.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-115 — vm_serial_after_resume2
- start: 2026-10-03T07:02:12Z · end: 2026-10-03T07:02:14Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances get-serial-port-output <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --port=1`
- stdout: `raw/GP-115_vm_serial_after_resume2.out` sha256 `<PRIVATE_REF_05085>` · redacted lines: 0
- stderr: `raw/GP-115_vm_serial_after_resume2.err` sha256 `<PRIVATE_REF_04371>` · redacted lines: 0

> note (2026-10-03T07:02:28Z): VM cycle 3/3: hard reset (Master 02 §6.4 VM reset). Serial output after reset is read from offset --start=158424 (gcloud next-start hint in GP-115 stderr) so the capture holds only post-reset output.

### GP-116 — vm_describe_pre_reset3
- start: 2026-10-03T07:02:28Z · end: 2026-10-03T07:02:30Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-116_vm_describe_pre_reset3.out` sha256 `<PRIVATE_REF_05075>` · redacted lines: 0
- stderr: `raw/GP-116_vm_describe_pre_reset3.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-117 — vm_reset_3
- start: 2026-10-03T07:02:30Z · end: 2026-10-03T07:02:37Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances reset <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a`
- stdout: `raw/GP-117_vm_reset_3.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-117_vm_reset_3.err` sha256 `<PRIVATE_REF_04986>` · redacted lines: 0

### GP-118 — vm_describe_after_reset3
- start: 2026-10-03T07:02:38Z · end: 2026-10-03T07:02:39Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-118_vm_describe_after_reset3.out` sha256 `<PRIVATE_REF_05075>` · redacted lines: 0
- stderr: `raw/GP-118_vm_describe_after_reset3.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T07:03:04Z): Out-of-wrapper read-only polls 07:02:40Z–07:02:55Z (get-serial-port-output --start=158424 | grep -c MA1CAP-END) awaiting the post-reset capture; no mutation.

### GP-119 — vm_serial_after_reset3
- start: 2026-10-03T07:03:04Z · end: 2026-10-03T07:03:05Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances get-serial-port-output <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --port=1 --start=158424`
- stdout: `raw/GP-119_vm_serial_after_reset3.out` sha256 `<PRIVATE_REF_04466>` · redacted lines: 0
- stderr: `raw/GP-119_vm_serial_after_reset3.err` sha256 `<PRIVATE_REF_04727>` · redacted lines: 0

### GP-120 — probe_vm_health_after_reset3
- start: 2026-10-03T07:03:05Z · end: 2026-10-03T07:03:06Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /vm/health`
- stdout: `raw/GP-120_probe_vm_health_after_reset3.out` sha256 `<PRIVATE_REF_04053>` · redacted lines: 0
- stderr: `raw/GP-120_probe_vm_health_after_reset3.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-121 — read_vm_object_after_reset3
- start: 2026-10-03T07:03:06Z · end: 2026-10-03T07:03:07Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/support/probe.py <PRIVATE_URL_0183> GET /vm/obj\?id=ma1prof-vmobj-348693`
- stdout: `raw/GP-121_read_vm_object_after_reset3.out` sha256 `<PRIVATE_REF_04382>` · redacted lines: 0
- stderr: `raw/GP-121_read_vm_object_after_reset3.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-122 — disk_describe_after_reset3
- start: 2026-10-03T07:03:07Z · end: 2026-10-03T07:03:09Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks describe <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GP-122_disk_describe_after_reset3.out` sha256 `<PRIVATE_REF_05378>` · redacted lines: 0
- stderr: `raw/GP-122_disk_describe_after_reset3.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T07:03:36Z): Final pre-teardown captures (attempts used: VM 3/3 = stop/start, suspend/resume [negative], reset; Cloud Run 2/3 = new revision, traffic no-op [negative]).

### GP-123 — inventory_final_compute_instances
- start: 2026-10-03T07:03:36Z · end: 2026-10-03T07:03:37Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-123_inventory_final_compute_instances.out` sha256 `<PRIVATE_REF_04234>` · redacted lines: 0
- stderr: `raw/GP-123_inventory_final_compute_instances.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-124 — inventory_final_run_services
- start: 2026-10-03T07:03:37Z · end: 2026-10-03T07:03:39Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-124_inventory_final_run_services.out` sha256 `<PRIVATE_REF_05808>` · redacted lines: 0
- stderr: `raw/GP-124_inventory_final_run_services.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-125 — inventory_final_asset_compute
- start: 2026-10-03T07:03:39Z · end: 2026-10-03T07:03:40Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --asset-types=compute.googleapis.com/Instance\,run.googleapis.com/Service\,run.googleapis.com/Job\,cloudfunctions.googleapis.com/Function\,cloudfunctions.googleapis.com/CloudFunction\,container.googleapis.com/Cluster\,appengine.googleapis.com/Service\,compute.googleapis.com/Disk --format=json`
- stdout: `raw/GP-125_inventory_final_asset_compute.out` sha256 `<PRIVATE_REF_04637>` · redacted lines: 0
- stderr: `raw/GP-125_inventory_final_asset_compute.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-126 — inventory_final_disks
- start: 2026-10-03T07:03:40Z · end: 2026-10-03T07:03:42Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-126_inventory_final_disks.out` sha256 `<PRIVATE_REF_05534>` · redacted lines: 0
- stderr: `raw/GP-126_inventory_final_disks.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-127 — wrong_location_run_us_central1
- start: 2026-10-03T07:03:42Z · end: 2026-10-03T07:03:44Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --region=us-central1 --format=json`
- stdout: `raw/GP-127_wrong_location_run_us_central1.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-127_wrong_location_run_us_central1.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-128 — wrong_zone_instances_b
- start: 2026-10-03T07:03:44Z · end: 2026-10-03T07:03:45Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --zones=australia-southeast1-b --format=json`
- stdout: `raw/GP-128_wrong_zone_instances_b.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-128_wrong_zone_instances_b.err` sha256 `<PRIVATE_REF_05754>` · redacted lines: 0

### GP-129 — run_revision_describe_00002
- start: 2026-10-03T07:03:45Z · end: 2026-10-03T07:03:46Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions describe <MA1_PROFILE_RESOURCE_PREFIX>-run-00002-t98 --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-129_run_revision_describe_00002.out` sha256 `<PRIVATE_REF_04388>` · redacted lines: 0
- stderr: `raw/GP-129_run_revision_describe_00002.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-130 — run_old_revision_final
- start: 2026-10-03T07:03:46Z · end: 2026-10-03T07:03:47Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions describe <MA1_PROFILE_RESOURCE_PREFIX>-run-00001-pv7 --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-130_run_old_revision_final.out` sha256 `<PRIVATE_REF_05941>` · redacted lines: 0
- stderr: `raw/GP-130_run_old_revision_final.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-131 — bucket_describe
- start: 2026-10-03T07:03:47Z · end: 2026-10-03T07:03:47Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets describe gs://<CLOUD_PROJECT>-<MA1_PROFILE_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-131_bucket_describe.out` sha256 `<PRIVATE_REF_04929>` · redacted lines: 0
- stderr: `raw/GP-131_bucket_describe.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-132 — bucket_objects
- start: 2026-10-03T07:03:47Z · end: 2026-10-03T07:03:48Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage objects list gs://<CLOUD_PROJECT>-<MA1_PROFILE_RESOURCE_PREFIX>/\*\* --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-132_bucket_objects.out` sha256 `<PRIVATE_REF_05616>` · redacted lines: 0
- stderr: `raw/GP-132_bucket_objects.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-133 — bucket_iam
- start: 2026-10-03T07:03:48Z · end: 2026-10-03T07:03:49Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets get-iam-policy gs://<CLOUD_PROJECT>-<MA1_PROFILE_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-133_bucket_iam.out` sha256 `<PRIVATE_REF_05150>` · redacted lines: 0
- stderr: `raw/GP-133_bucket_iam.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-134 — logging_run_final
- start: 2026-10-03T07:03:49Z · end: 2026-10-03T07:04:18Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud logging read resource.type=\"cloud_run_revision\"\ AND\ resource.labels.service_name=\"<MA1_PROFILE_RESOURCE_PREFIX>-run\" --project=<CLOUD_PROJECT> --freshness=60m --order=asc --limit=1000 --format=json`
- stdout: `raw/GP-134_logging_run_final.out` sha256 `<PRIVATE_REF_04328>` · redacted lines: 0
- stderr: `raw/GP-134_logging_run_final.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-135 — logging_gce_audit_final
- start: 2026-10-03T07:04:18Z · end: 2026-10-03T07:05:05Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud logging read resource.type=\"gce_instance\"\ AND\ logName:\"cloudaudit.googleapis.com\" --project=<CLOUD_PROJECT> --freshness=60m --order=asc --limit=200 --format=json`
- stdout: `raw/GP-135_logging_gce_audit_final.out` sha256 `<PRIVATE_REF_05637>` · redacted lines: 0
- stderr: `raw/GP-135_logging_gce_audit_final.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T07:05:26Z): TEARDOWN of task-owned resources only (<MA1_PROFILE_RESOURCE_PREFIX>-run, <MA1_PROFILE_RESOURCE_PREFIX>-vm + auto-delete boot disk, bucket + its object, keyless SA). Shared environment changes (APIs, default network/firewall) are recorded, not reverted.

### GP-136 — teardown_run_service
- start: 2026-10-03T07:05:26Z · end: 2026-10-03T07:05:30Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services delete <MA1_PROFILE_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --quiet`
- stdout: `raw/GP-136_teardown_run_service.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-136_teardown_run_service.err` sha256 `<PRIVATE_REF_05826>` · redacted lines: 0

### GP-137 — teardown_vm
- start: 2026-10-03T07:05:30Z · end: 2026-10-03T07:07:19Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances delete <MA1_PROFILE_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --quiet`
- stdout: `raw/GP-137_teardown_vm.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-137_teardown_vm.err` sha256 `<PRIVATE_REF_05551>` · redacted lines: 0

### GP-138 — teardown_bucket
- start: 2026-10-03T07:07:19Z · end: 2026-10-03T07:07:23Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage rm --recursive gs://<CLOUD_PROJECT>-<MA1_PROFILE_RESOURCE_PREFIX> --project=<CLOUD_PROJECT>`
- stdout: `raw/GP-138_teardown_bucket.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-138_teardown_bucket.err` sha256 `<PRIVATE_REF_05065>` · redacted lines: 0

### GP-139 — teardown_sa
- start: 2026-10-03T07:07:23Z · end: 2026-10-03T07:07:25Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud iam service-accounts delete <ACCOUNT_EMAIL_085> --project=<CLOUD_PROJECT> --quiet`
- stdout: `raw/GP-139_teardown_sa.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GP-139_teardown_sa.err` sha256 `<PRIVATE_REF_03765>` · redacted lines: 0

> note (2026-10-03T07:07:37Z): RESIDUE inspection after teardown (read-only).

### GP-140 — residue_instances
- start: 2026-10-03T07:07:37Z · end: 2026-10-03T07:07:38Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-140_residue_instances.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-140_residue_instances.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-141 — residue_disks
- start: 2026-10-03T07:07:38Z · end: 2026-10-03T07:07:40Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-141_residue_disks.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-141_residue_disks.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-142 — residue_snapshots
- start: 2026-10-03T07:07:40Z · end: 2026-10-03T07:07:41Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute snapshots list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-142_residue_snapshots.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-142_residue_snapshots.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-143 — residue_images
- start: 2026-10-03T07:07:41Z · end: 2026-10-03T07:07:43Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute images list --project=<CLOUD_PROJECT> --no-standard-images --format=json`
- stdout: `raw/GP-143_residue_images.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-143_residue_images.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-144 — residue_run_services
- start: 2026-10-03T07:07:43Z · end: 2026-10-03T07:07:45Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-144_residue_run_services.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-144_residue_run_services.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-145 — residue_run_services_region
- start: 2026-10-03T07:07:45Z · end: 2026-10-03T07:07:46Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GP-145_residue_run_services_region.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-145_residue_run_services_region.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-146 — residue_run_jobs
- start: 2026-10-03T07:07:46Z · end: 2026-10-03T07:07:48Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run jobs list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-146_residue_run_jobs.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-146_residue_run_jobs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-147 — residue_buckets
- start: 2026-10-03T07:07:48Z · end: 2026-10-03T07:07:49Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-147_residue_buckets.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-147_residue_buckets.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-148 — residue_service_accounts
- start: 2026-10-03T07:07:49Z · end: 2026-10-03T07:07:50Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud iam service-accounts list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-148_residue_service_accounts.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-148_residue_service_accounts.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-149 — residue_ar_repos
- start: 2026-10-03T07:07:50Z · end: 2026-10-03T07:07:56Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud artifacts repositories list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-149_residue_ar_repos.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GP-149_residue_ar_repos.err` sha256 `<PRIVATE_REF_01714>` · redacted lines: 0

### GP-150 — residue_asset_all
- start: 2026-10-03T07:07:56Z · end: 2026-10-03T07:08:04Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-150_residue_asset_all.out` sha256 `<PRIVATE_REF_05431>` · redacted lines: 0
- stderr: `raw/GP-150_residue_asset_all.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-151 — residue_services_enabled_after
- start: 2026-10-03T07:08:04Z · end: 2026-10-03T07:08:06Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud services list --enabled --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-151_residue_services_enabled_after.out` sha256 `<PRIVATE_REF_05298>` · redacted lines: 0
- stderr: `raw/GP-151_residue_services_enabled_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-152 — residue_networks
- start: 2026-10-03T07:08:06Z · end: 2026-10-03T07:08:07Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute networks list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-152_residue_networks.out` sha256 `<PRIVATE_REF_03207>` · redacted lines: 0
- stderr: `raw/GP-152_residue_networks.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-153 — residue_firewall
- start: 2026-10-03T07:08:07Z · end: 2026-10-03T07:08:09Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute firewall-rules list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-153_residue_firewall.out` sha256 `<PRIVATE_REF_03458>` · redacted lines: 0
- stderr: `raw/GP-153_residue_firewall.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-154 — residue_project_iam
- start: 2026-10-03T07:08:09Z · end: 2026-10-03T07:08:09Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud projects get-iam-policy <CLOUD_PROJECT> --format=json`
- stdout: `raw/GP-154_residue_project_iam.out` sha256 `<PRIVATE_REF_04578>` · redacted lines: 0
- stderr: `raw/GP-154_residue_project_iam.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GP-155 — residue_addresses_region
- start: 2026-10-03T07:08:27Z · end: 2026-10-03T07:08:28Z · exit: 0
- cwd: `executor/gcp_profile_stage/` · env: pinned (support/gp.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute addresses list --project=<CLOUD_PROJECT> --regions=australia-southeast1 --format=json`
- stdout: `raw/GP-155_residue_addresses_region.out` sha256 `<PRIVATE_REF_05590>` · redacted lines: 0
- stderr: `raw/GP-155_residue_addresses_region.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-03T07:11:01Z): LIVE CAPTURE LOG FROZEN after GP-155. Later read-only residue re-checks are recorded in GCP_RESIDUE_LOG.md. Window: started 06:50:59Z; resources deleted by 07:07:25Z; remaining provider-managed residue serverless-ipv4-cloudrun-1791010435540004708 (RESERVED, purpose SERVERLESS, no users) awaiting automatic release.


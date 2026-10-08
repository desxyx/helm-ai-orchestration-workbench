> note (2026-10-04T04:05:16Z): Preflight (read-only) for release <PRIVATE_REF_02684>…b825; receipts AI-CICD-20261004-MA1-GCP-SUPP-EXEC-001 / REVIEW-001 (consumed 1/1 at 2026-10-04T14:58:17+11:00). No cloud mutation yet.

### GS-001 — preflight_gcloud_version
- start: 2026-10-04T04:05:16Z · end: 2026-10-04T04:05:16Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud version --format=json`
- stdout: `raw/GS-001_preflight_gcloud_version.out` sha256 `<PRIVATE_REF_02674>` · redacted lines: 0
- stderr: `raw/GS-001_preflight_gcloud_version.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-002 — preflight_services_enabled
- start: 2026-10-04T04:05:16Z · end: 2026-10-04T04:05:19Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud services list --enabled --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-002_preflight_services_enabled.out` sha256 `<PRIVATE_REF_05298>` · redacted lines: 0
- stderr: `raw/GS-002_preflight_services_enabled.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-003 — preflight_project_iam
- start: 2026-10-04T04:05:19Z · end: 2026-10-04T04:05:20Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud projects get-iam-policy <CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-003_preflight_project_iam.out` sha256 `<PRIVATE_REF_04578>` · redacted lines: 0
- stderr: `raw/GS-003_preflight_project_iam.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-004 — preflight_firewall_rules
- start: 2026-10-04T04:05:20Z · end: 2026-10-04T04:05:21Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute firewall-rules list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-004_preflight_firewall_rules.out` sha256 `<PRIVATE_REF_03458>` · redacted lines: 0
- stderr: `raw/GS-004_preflight_firewall_rules.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-005 — preflight_instances_all
- start: 2026-10-04T04:05:21Z · end: 2026-10-04T04:05:22Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-005_preflight_instances_all.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-005_preflight_instances_all.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-006 — preflight_run_services_all
- start: 2026-10-04T04:05:22Z · end: 2026-10-04T04:05:24Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-006_preflight_run_services_all.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-006_preflight_run_services_all.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-007 — preflight_buckets_all
- start: 2026-10-04T04:05:24Z · end: 2026-10-04T04:05:26Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-007_preflight_buckets_all.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-007_preflight_buckets_all.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-008 — preflight_service_accounts
- start: 2026-10-04T04:05:26Z · end: 2026-10-04T04:05:28Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud iam service-accounts list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-008_preflight_service_accounts.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-008_preflight_service_accounts.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-009 — preflight_asset_all_baseline
- start: 2026-10-04T04:05:28Z · end: 2026-10-04T04:05:38Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-009_preflight_asset_all_baseline.out` sha256 `<PRIVATE_REF_03755>` · redacted lines: 0
- stderr: `raw/GS-009_preflight_asset_all_baseline.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-010 — preflight_zone_a
- start: 2026-10-04T04:05:38Z · end: 2026-10-04T04:05:39Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute zones describe australia-southeast1-a --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-010_preflight_zone_a.out` sha256 `<PRIVATE_REF_04731>` · redacted lines: 0
- stderr: `raw/GS-010_preflight_zone_a.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-011 — preflight_image_debian12
- start: 2026-10-04T04:05:39Z · end: 2026-10-04T04:05:40Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute images describe-from-family debian-12 --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-011_preflight_image_debian12.out` sha256 `<PRIVATE_REF_04012>` · redacted lines: 0
- stderr: `raw/GS-011_preflight_image_debian12.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-012 — p1_enable_iap_api
- start: 2026-10-04T04:06:53Z · end: 2026-10-04T04:06:55Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud services enable iap.googleapis.com --project=<CLOUD_PROJECT>`
- stdout: `raw/GS-012_p1_enable_iap_api.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-012_p1_enable_iap_api.err` sha256 `<PRIVATE_REF_04494>` · redacted lines: 0

> note (2026-10-04T04:06:55Z): FIRST CLOUD MUTATION = GS-012 start . Two-hour cloud window deadline = . Attempt budget: VM restart cycles 0/2, Run replacement attempts 0/2.

### GS-013 — p1_services_after_iap
- start: 2026-10-04T04:06:55Z · end: 2026-10-04T04:06:57Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud services list --enabled --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-013_p1_services_after_iap.out` sha256 `<PRIVATE_REF_05311>` · redacted lines: 0
- stderr: `raw/GS-013_p1_services_after_iap.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-014 — p1_vm_create
- start: 2026-10-04T04:06:57Z · end: 2026-10-04T04:07:11Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances create <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --machine-type=e2-small --image=debian-12-bookworm-v20260921 --image-project=debian-cloud --boot-disk-size=10GB --boot-disk-type=pd-balanced --boot-disk-auto-delete --no-address --no-service-account --no-scopes --metadata=block-project-ssh-keys=TRUE --metadata-from-file=startup-script=vm_startup_supp.sh --labels=task=<MA1_SUPPLEMENT_RESOURCE_PREFIX>\,receipt=ai-cicd-20261004-ma1-gcp-supp-exec-001 --format=json`
- stdout: `raw/GS-014_p1_vm_create.out` sha256 `<PRIVATE_REF_04949>` · redacted lines: 0
- stderr: `raw/GS-014_p1_vm_create.err` sha256 `<PRIVATE_REF_05952>` · redacted lines: 0

> note (2026-10-04T04:07:18Z): CORRECTION to the preceding note (its time fields were empty: a local sed pattern failed): FIRST CLOUD MUTATION = GS-012 start 2026-10-04T04:06:53Z; two-hour cloud window deadline = 2026-10-04T06:06:53Z. Attempt budget: VM restart cycles 0/2, Run replacement attempts 0/2.

> note (2026-10-04T04:07:51Z): Out-of-wrapper read-only serial polls 04:07:27Z–04:07:38Z waited for the first boot capture (not evidence). Finding: root filesystem UUID 85b8a44b… equals the 2026-10-03 VM (image-derived), so filesystem UUID alone does not identify a disk; disk binding uses /dev/disk/by-id google-<deviceName> -> provider disk.

### GS-015 — p1_vm_describe_before
- start: 2026-10-04T04:07:51Z · end: 2026-10-04T04:07:52Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GS-015_p1_vm_describe_before.out` sha256 `<PRIVATE_REF_04686>` · redacted lines: 0
- stderr: `raw/GS-015_p1_vm_describe_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-016 — p1_disk_describe_before
- start: 2026-10-04T04:07:52Z · end: 2026-10-04T04:07:53Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GS-016_p1_disk_describe_before.out` sha256 `<PRIVATE_REF_04348>` · redacted lines: 0
- stderr: `raw/GS-016_p1_disk_describe_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-017 — p1_vm_serial_before
- start: 2026-10-04T04:07:53Z · end: 2026-10-04T04:07:54Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances get-serial-port-output <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --port=1`
- stdout: `raw/GS-017_p1_vm_serial_before.out` sha256 `<PRIVATE_REF_04258>` · redacted lines: 0
- stderr: `raw/GS-017_p1_vm_serial_before.err` sha256 `<PRIVATE_REF_04665>` · redacted lines: 0

### GS-018 — p1_probe_health_before
- start: 2026-10-04T04:07:54Z · end: 2026-10-04T04:07:56Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 GET /health`
- stdout: `raw/GS-018_p1_probe_health_before.out` sha256 `<PRIVATE_REF_05789>` · redacted lines: 0
- stderr: `raw/GS-018_p1_probe_health_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-019 — p1_vm_obj_write
- start: 2026-10-04T04:07:56Z · end: 2026-10-04T04:07:57Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 POST /obj\?id=ma1supp-vmobj-p1-da3b32`
- stdout: `raw/GS-019_p1_vm_obj_write.out` sha256 `<PRIVATE_REF_05039>` · redacted lines: 0
- stderr: `raw/GS-019_p1_vm_obj_write.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-020 — p1_vm_obj_read_before
- start: 2026-10-04T04:08:09Z · end: 2026-10-04T04:08:09Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 GET /obj\?id=ma1supp-vmobj-p1-da3b32`
- stdout: `raw/GS-020_p1_vm_obj_read_before.out` sha256 `<PRIVATE_REF_05196>` · redacted lines: 0
- stderr: `raw/GS-020_p1_vm_obj_read_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-04T04:08:16Z): Out-of-wrapper read-only asset poll at 04:08:10Z (filtered to Instance) already showed the VM; the authoritative inventory below is the unfiltered search.

### GS-021 — p1_inventory_compute
- start: 2026-10-04T04:08:16Z · end: 2026-10-04T04:08:18Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-021_p1_inventory_compute.out` sha256 `<PRIVATE_REF_04949>` · redacted lines: 0
- stderr: `raw/GS-021_p1_inventory_compute.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-022 — p1_inventory_run
- start: 2026-10-04T04:08:18Z · end: 2026-10-04T04:08:19Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-022_p1_inventory_run.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-022_p1_inventory_run.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-023 — p1_inventory_asset
- start: 2026-10-04T04:08:19Z · end: 2026-10-04T04:08:28Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-023_p1_inventory_asset.out` sha256 `<PRIVATE_REF_05888>` · redacted lines: 0
- stderr: `raw/GS-023_p1_inventory_asset.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-04T04:08:37Z): VM restart cycle 1/2 (phase 1, standalone VM): stop/start of <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm. Rationale: Master 02 §6.4 (AMD-A5-CR) VM restart of every serving VM.

### GS-024 — p1_vm_stop
- start: 2026-10-04T04:08:37Z · end: 2026-10-04T04:10:29Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances stop <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a`
- stdout: `raw/GS-024_p1_vm_stop.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-024_p1_vm_stop.err` sha256 `<PRIVATE_REF_05694>` · redacted lines: 0

### GS-025 — p1_vm_describe_stopped
- start: 2026-10-04T04:10:29Z · end: 2026-10-04T04:10:30Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GS-025_p1_vm_describe_stopped.out` sha256 `<PRIVATE_REF_05725>` · redacted lines: 0
- stderr: `raw/GS-025_p1_vm_describe_stopped.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-026 — p1_probe_health_stopped
- start: 2026-10-04T04:10:30Z · end: 2026-10-04T04:11:00Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 GET /health`
- stdout: `raw/GS-026_p1_probe_health_stopped.out` sha256 `<PRIVATE_REF_04297>` · redacted lines: 0
- stderr: `raw/GS-026_p1_probe_health_stopped.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-027 — p1_vm_start
- start: 2026-10-04T04:11:00Z · end: 2026-10-04T04:11:13Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances start <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a`
- stdout: `raw/GS-027_p1_vm_start.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-027_p1_vm_start.err` sha256 `<PRIVATE_REF_05838>` · redacted lines: 0

### GS-028 — p1_vm_describe_after
- start: 2026-10-04T04:11:13Z · end: 2026-10-04T04:11:15Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GS-028_p1_vm_describe_after.out` sha256 `<PRIVATE_REF_04774>` · redacted lines: 0
- stderr: `raw/GS-028_p1_vm_describe_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-04T04:17:20Z): Out-of-wrapper read-only serial polls 04:11:22Z–04:17:09Z (a faulty local poll loop condition kept polling after the capture had appeared at 04:11:26Z); not evidence.

### GS-029 — p1_vm_serial_after
- start: 2026-10-04T04:17:20Z · end: 2026-10-04T04:17:21Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances get-serial-port-output <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --port=1`
- stdout: `raw/GS-029_p1_vm_serial_after.out` sha256 `<PRIVATE_REF_05209>` · redacted lines: 0
- stderr: `raw/GS-029_p1_vm_serial_after.err` sha256 `<PRIVATE_REF_04064>` · redacted lines: 0

### GS-030 — p1_disk_describe_after
- start: 2026-10-04T04:17:21Z · end: 2026-10-04T04:17:22Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GS-030_p1_disk_describe_after.out` sha256 `<PRIVATE_REF_04348>` · redacted lines: 0
- stderr: `raw/GS-030_p1_disk_describe_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-031 — p1_probe_health_after
- start: 2026-10-04T04:17:22Z · end: 2026-10-04T04:17:23Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 GET /health`
- stdout: `raw/GS-031_p1_probe_health_after.out` sha256 `<PRIVATE_REF_05829>` · redacted lines: 0
- stderr: `raw/GS-031_p1_probe_health_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-032 — p1_vm_obj_read_after
- start: 2026-10-04T04:17:23Z · end: 2026-10-04T04:17:25Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 GET /obj\?id=ma1supp-vmobj-p1-da3b32`
- stdout: `raw/GS-032_p1_vm_obj_read_after.out` sha256 `<PRIVATE_REF_03774>` · redacted lines: 0
- stderr: `raw/GS-032_p1_vm_obj_read_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-033 — p1_gce_audit
- start: 2026-10-04T04:17:25Z · end: 2026-10-04T04:18:17Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud logging read resource.type=\"gce_instance\"\ AND\ logName:\"cloudaudit.googleapis.com\" --project=<CLOUD_PROJECT> --freshness=30m --order=asc --limit=200 --format=json`
- stdout: `raw/GS-033_p1_gce_audit.out` sha256 `<PRIVATE_REF_05007>` · redacted lines: 0
- stderr: `raw/GS-033_p1_gce_audit.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-034 — p1_inventory_after_compute
- start: 2026-10-04T04:18:17Z · end: 2026-10-04T04:18:19Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-034_p1_inventory_after_compute.out` sha256 `<PRIVATE_REF_04499>` · redacted lines: 0
- stderr: `raw/GS-034_p1_inventory_after_compute.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-035 — p1_inventory_after_run
- start: 2026-10-04T04:18:19Z · end: 2026-10-04T04:18:21Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-035_p1_inventory_after_run.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-035_p1_inventory_after_run.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-036 — p1_inventory_after_asset
- start: 2026-10-04T04:18:21Z · end: 2026-10-04T04:18:29Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-036_p1_inventory_after_asset.out` sha256 `<PRIVATE_REF_05888>` · redacted lines: 0
- stderr: `raw/GS-036_p1_inventory_after_asset.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-04T04:18:47Z): Phase 2 (mixed): bucket, keyless SA with bucket-scoped roles/storage.objectAdmin only, Cloud Run frontend (authenticated only, Direct VPC private-ranges-only egress to the task VM <IP_ADDRESS_126>:22). run_app.py = retained bytes (sha256 <PRIVATE_REF_05746>…8811).

### GS-037 — p2_bucket_create
- start: 2026-10-04T04:18:47Z · end: 2026-10-04T04:18:49Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets create gs://<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --location=australia-southeast1 --uniform-bucket-level-access --public-access-prevention --default-storage-class=STANDARD`
- stdout: `raw/GS-037_p2_bucket_create.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-037_p2_bucket_create.err` sha256 `<PRIVATE_REF_04873>` · redacted lines: 0

### GS-038 — p2_bucket_labels
- start: 2026-10-04T04:18:49Z · end: 2026-10-04T04:18:50Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets update gs://<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --update-labels=task=<MA1_SUPPLEMENT_RESOURCE_PREFIX>\,receipt=ai-cicd-20261004-ma1-gcp-supp-exec-001`
- stdout: `raw/GS-038_p2_bucket_labels.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-038_p2_bucket_labels.err` sha256 `<PRIVATE_REF_05636>` · redacted lines: 0

### GS-039 — p2_sa_create
- start: 2026-10-04T04:18:50Z · end: 2026-10-04T04:18:53Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud iam service-accounts create <MA1_SUPPLEMENT_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --display-name=MA-1-GCP-supplemental-keyless-task-owned`
- stdout: `raw/GS-039_p2_sa_create.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-039_p2_sa_create.err` sha256 `<PRIVATE_REF_04450>` · redacted lines: 0

### GS-040 — p2_bucket_iam_bind_sa
- start: 2026-10-04T04:18:53Z · end: 2026-10-04T04:18:54Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets add-iam-policy-binding gs://<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --member=serviceAccount:<ACCOUNT_EMAIL_086> --role=roles/storage.objectAdmin --format=json`
- stdout: `raw/GS-040_p2_bucket_iam_bind_sa.out` sha256 `<PRIVATE_REF_04758>` · redacted lines: 0
- stderr: `raw/GS-040_p2_bucket_iam_bind_sa.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-041 — p2_run_deploy
- start: 2026-10-04T04:18:54Z · end: 2026-10-04T04:19:11Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run deploy <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --image=mirror.gcr.io/library/python@sha256:<PRIVATE_REF_04739> --command=python3 --args=-c\,import\ base64\;exec\(base64.b64decode\(\"<ENCODED_BLOB_REMOVED>\"\).decode\(\)\) --set-env-vars=VM_URL=<PRIVATE_URL_0003>\,BUCKET=<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX> --service-account=<ACCOUNT_EMAIL_086> --no-allow-unauthenticated --ingress=all --min-instances=1 --max-instances=1 --cpu=1 --memory=512Mi --network=default --subnet=default --vpc-egress=private-ranges-only --labels=task=<MA1_SUPPLEMENT_RESOURCE_PREFIX>\,receipt=ai-cicd-20261004-ma1-gcp-supp-exec-001 --format=json`
- stdout: `raw/GS-041_p2_run_deploy.out` sha256 `<PRIVATE_REF_05704>` · redacted lines: 0
- stderr: `raw/GS-041_p2_run_deploy.err` sha256 `<PRIVATE_REF_04528>` · redacted lines: 0

### GS-042 — p2_run_revision_before
- start: 2026-10-04T04:19:23Z · end: 2026-10-04T04:19:23Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run-00001-skm --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GS-042_p2_run_revision_before.out` sha256 `<PRIVATE_REF_04715>` · redacted lines: 0
- stderr: `raw/GS-042_p2_run_revision_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-043 — p2_run_service_before
- start: 2026-10-04T04:19:24Z · end: 2026-10-04T04:19:24Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GS-043_p2_run_service_before.out` sha256 `<PRIVATE_REF_05158>` · redacted lines: 0
- stderr: `raw/GS-043_p2_run_service_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-044 — p2_anonymous_refused
- start: 2026-10-04T04:19:24Z · end: 2026-10-04T04:19:25Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `curl -sS -o /dev/null -w GET\ /\ unauthenticated\ http=%\{http_code\}\\n --max-time 20 <PRIVATE_URL_0185>`
- stdout: `raw/GS-044_p2_anonymous_refused.out` sha256 `<PRIVATE_REF_04635>` · redacted lines: 0
- stderr: `raw/GS-044_p2_anonymous_refused.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-045 — p2_run_probe_root_before
- start: 2026-10-04T04:19:25Z · end: 2026-10-04T04:19:26Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /`
- stdout: `raw/GS-045_p2_run_probe_root_before.out` sha256 `<PRIVATE_REF_05902>` · redacted lines: 0
- stderr: `raw/GS-045_p2_run_probe_root_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-046 — p2_gcs_obj_write
- start: 2026-10-04T04:19:26Z · end: 2026-10-04T04:19:28Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> POST /gcs/obj\?id=ma1supp-runobj-p2-fcb6d6`
- stdout: `raw/GS-046_p2_gcs_obj_write.out` sha256 `<PRIVATE_REF_04475>` · redacted lines: 0
- stderr: `raw/GS-046_p2_gcs_obj_write.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-047 — p2_gcs_obj_read_before
- start: 2026-10-04T04:19:28Z · end: 2026-10-04T04:19:29Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /gcs/obj\?id=ma1supp-runobj-p2-fcb6d6`
- stdout: `raw/GS-047_p2_gcs_obj_read_before.out` sha256 `<PRIVATE_REF_04175>` · redacted lines: 0
- stderr: `raw/GS-047_p2_gcs_obj_read_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-048 — p2_run_relay_vm_health_before
- start: 2026-10-04T04:19:29Z · end: 2026-10-04T04:19:30Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /vm/health`
- stdout: `raw/GS-048_p2_run_relay_vm_health_before.out` sha256 `<PRIVATE_REF_04150>` · redacted lines: 0
- stderr: `raw/GS-048_p2_run_relay_vm_health_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-049 — p2_vm_describe_before
- start: 2026-10-04T04:19:30Z · end: 2026-10-04T04:19:32Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GS-049_p2_vm_describe_before.out` sha256 `<PRIVATE_REF_04774>` · redacted lines: 0
- stderr: `raw/GS-049_p2_vm_describe_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-050 — p2_disk_describe_before
- start: 2026-10-04T04:19:32Z · end: 2026-10-04T04:19:33Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GS-050_p2_disk_describe_before.out` sha256 `<PRIVATE_REF_04348>` · redacted lines: 0
- stderr: `raw/GS-050_p2_disk_describe_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-051 — p2_vm_serial_before
- start: 2026-10-04T04:19:33Z · end: 2026-10-04T04:19:34Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances get-serial-port-output <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --port=1`
- stdout: `raw/GS-051_p2_vm_serial_before.out` sha256 `<PRIVATE_REF_03787>` · redacted lines: 0
- stderr: `raw/GS-051_p2_vm_serial_before.err` sha256 `<PRIVATE_REF_05933>` · redacted lines: 0

### GS-052 — p2_vm_probe_health_before
- start: 2026-10-04T04:19:34Z · end: 2026-10-04T04:19:36Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 GET /health`
- stdout: `raw/GS-052_p2_vm_probe_health_before.out` sha256 `<PRIVATE_REF_05829>` · redacted lines: 0
- stderr: `raw/GS-052_p2_vm_probe_health_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-053 — p2_vm_obj_write
- start: 2026-10-04T04:19:36Z · end: 2026-10-04T04:19:37Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 POST /obj\?id=ma1supp-vmobj-p2-30e27c`
- stdout: `raw/GS-053_p2_vm_obj_write.out` sha256 `<PRIVATE_REF_04822>` · redacted lines: 0
- stderr: `raw/GS-053_p2_vm_obj_write.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-054 — p2_vm_obj_read_before
- start: 2026-10-04T04:19:37Z · end: 2026-10-04T04:19:39Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 GET /obj\?id=ma1supp-vmobj-p2-30e27c`
- stdout: `raw/GS-054_p2_vm_obj_read_before.out` sha256 `<PRIVATE_REF_05478>` · redacted lines: 0
- stderr: `raw/GS-054_p2_vm_obj_read_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-04T04:19:48Z): Out-of-wrapper read-only asset poll (filtered to run Service) until the service appeared; not evidence.

### GS-055 — p2_inventory_compute
- start: 2026-10-04T04:19:48Z · end: 2026-10-04T04:19:50Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-055_p2_inventory_compute.out` sha256 `<PRIVATE_REF_04499>` · redacted lines: 0
- stderr: `raw/GS-055_p2_inventory_compute.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-056 — p2_inventory_run
- start: 2026-10-04T04:19:50Z · end: 2026-10-04T04:19:51Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-056_p2_inventory_run.out` sha256 `<PRIVATE_REF_05496>` · redacted lines: 0
- stderr: `raw/GS-056_p2_inventory_run.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-057 — p2_inventory_asset
- start: 2026-10-04T04:19:51Z · end: 2026-10-04T04:19:59Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-057_p2_inventory_asset.out` sha256 `<PRIVATE_REF_04710>` · redacted lines: 0
- stderr: `raw/GS-057_p2_inventory_asset.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-04T04:20:12Z): VM restart cycle 2/2 (phase 2, mixed): reset of <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm; serial before-offset for the after read = 149796 (from GS-051 stderr). Then Run replacement attempt 1/2 (frozen mechanism: new revision of the unchanged image digest with a replacement nonce; rationale: AMD-A5-CR registered Cloud Run service/revision replacement).

### GS-058 — p2_vm_reset
- start: 2026-10-04T04:20:12Z · end: 2026-10-04T04:20:20Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances reset <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a`
- stdout: `raw/GS-058_p2_vm_reset.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-058_p2_vm_reset.err` sha256 `<PRIVATE_REF_03778>` · redacted lines: 0

### GS-059 — p2_run_replace_1
- start: 2026-10-04T04:20:20Z · end: 2026-10-04T04:20:36Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services update <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --image=mirror.gcr.io/library/python@sha256:<PRIVATE_REF_04739> --update-env-vars=MA1_REPLACEMENT_NONCE=s1 --format=json`
- stdout: `raw/GS-059_p2_run_replace_1.out` sha256 `<PRIVATE_REF_05312>` · redacted lines: 0
- stderr: `raw/GS-059_p2_run_replace_1.err` sha256 `<PRIVATE_REF_04555>` · redacted lines: 0

### GS-060 — p2_vm_describe_after
- start: 2026-10-04T04:20:36Z · end: 2026-10-04T04:20:37Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GS-060_p2_vm_describe_after.out` sha256 `<PRIVATE_REF_04774>` · redacted lines: 0
- stderr: `raw/GS-060_p2_vm_describe_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-061 — p2_run_service_after
- start: 2026-10-04T04:20:37Z · end: 2026-10-04T04:20:38Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GS-061_p2_run_service_after.out` sha256 `<PRIVATE_REF_05419>` · redacted lines: 0
- stderr: `raw/GS-061_p2_run_service_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-04T04:20:57Z): Out-of-wrapper read-only serial poll with --start=149796 found the post-reset capture at 04:20:47Z; not evidence.

### GS-062 — p2_vm_serial_after
- start: 2026-10-04T04:20:57Z · end: 2026-10-04T04:20:58Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances get-serial-port-output <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --port=1 --start=149796`
- stdout: `raw/GS-062_p2_vm_serial_after.out` sha256 `<PRIVATE_REF_04918>` · redacted lines: 0
- stderr: `raw/GS-062_p2_vm_serial_after.err` sha256 `<PRIVATE_REF_04176>` · redacted lines: 0

### GS-063 — p2_disk_describe_after
- start: 2026-10-04T04:20:58Z · end: 2026-10-04T04:20:59Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --format=json`
- stdout: `raw/GS-063_p2_disk_describe_after.out` sha256 `<PRIVATE_REF_04348>` · redacted lines: 0
- stderr: `raw/GS-063_p2_disk_describe_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-064 — p2_vm_probe_health_after
- start: 2026-10-04T04:20:59Z · end: 2026-10-04T04:21:01Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 GET /health`
- stdout: `raw/GS-064_p2_vm_probe_health_after.out` sha256 `<PRIVATE_REF_04381>` · redacted lines: 0
- stderr: `raw/GS-064_p2_vm_probe_health_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-065 — p2_vm_obj_read_after
- start: 2026-10-04T04:21:01Z · end: 2026-10-04T04:21:02Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 GET /obj\?id=ma1supp-vmobj-p2-30e27c`
- stdout: `raw/GS-065_p2_vm_obj_read_after.out` sha256 `<PRIVATE_REF_05535>` · redacted lines: 0
- stderr: `raw/GS-065_p2_vm_obj_read_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-066 — p2_vm_obj_p1_read_after
- start: 2026-10-04T04:21:02Z · end: 2026-10-04T04:21:04Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/vm_probe.py <CLOUD_PROJECT> australia-southeast1-a <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm 22 GET /obj\?id=ma1supp-vmobj-p1-da3b32`
- stdout: `raw/GS-066_p2_vm_obj_p1_read_after.out` sha256 `<PRIVATE_REF_05879>` · redacted lines: 0
- stderr: `raw/GS-066_p2_vm_obj_p1_read_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-067 — p2_run_revision_after
- start: 2026-10-04T04:21:04Z · end: 2026-10-04T04:21:05Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run-00002-vbm --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GS-067_p2_run_revision_after.out` sha256 `<PRIVATE_REF_04669>` · redacted lines: 0
- stderr: `raw/GS-067_p2_run_revision_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-068 — p2_run_old_revision_after
- start: 2026-10-04T04:21:05Z · end: 2026-10-04T04:21:05Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run-00001-skm --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GS-068_p2_run_old_revision_after.out` sha256 `<PRIVATE_REF_05878>` · redacted lines: 0
- stderr: `raw/GS-068_p2_run_old_revision_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-069 — p2_run_probe_root_after
- start: 2026-10-04T04:21:06Z · end: 2026-10-04T04:21:07Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /`
- stdout: `raw/GS-069_p2_run_probe_root_after.out` sha256 `<PRIVATE_REF_04788>` · redacted lines: 0
- stderr: `raw/GS-069_p2_run_probe_root_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-070 — p2_gcs_obj_read_after
- start: 2026-10-04T04:21:07Z · end: 2026-10-04T04:21:08Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /gcs/obj\?id=ma1supp-runobj-p2-fcb6d6`
- stdout: `raw/GS-070_p2_gcs_obj_read_after.out` sha256 `<PRIVATE_REF_05839>` · redacted lines: 0
- stderr: `raw/GS-070_p2_gcs_obj_read_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-071 — p2_run_relay_vm_health_after
- start: 2026-10-04T04:21:08Z · end: 2026-10-04T04:21:09Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /vm/health`
- stdout: `raw/GS-071_p2_run_relay_vm_health_after.out` sha256 `<PRIVATE_REF_04554>` · redacted lines: 0
- stderr: `raw/GS-071_p2_run_relay_vm_health_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-072 — p2_bucket_describe
- start: 2026-10-04T04:21:09Z · end: 2026-10-04T04:21:10Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets describe gs://<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-072_p2_bucket_describe.out` sha256 `<PRIVATE_REF_05543>` · redacted lines: 0
- stderr: `raw/GS-072_p2_bucket_describe.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-073 — p2_objects_list
- start: 2026-10-04T04:21:10Z · end: 2026-10-04T04:21:11Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage objects list gs://<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX>/\*\* --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-073_p2_objects_list.out` sha256 `<PRIVATE_REF_05722>` · redacted lines: 0
- stderr: `raw/GS-073_p2_objects_list.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-074 — p2_run_logs
- start: 2026-10-04T04:21:22Z · end: 2026-10-04T04:21:49Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud logging read resource.type=\"cloud_run_revision\"\ AND\ resource.labels.service_name=\"<MA1_SUPPLEMENT_RESOURCE_PREFIX>-run\" --project=<CLOUD_PROJECT> --freshness=30m --order=asc --limit=1000 --format=json`
- stdout: `raw/GS-074_p2_run_logs.out` sha256 `<PRIVATE_REF_05216>` · redacted lines: 0
- stderr: `raw/GS-074_p2_run_logs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-075 — p2_gce_audit
- start: 2026-10-04T04:21:49Z · end: 2026-10-04T04:22:14Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud logging read resource.type=\"gce_instance\"\ AND\ logName:\"cloudaudit.googleapis.com\" --project=<CLOUD_PROJECT> --freshness=30m --order=asc --limit=200 --format=json`
- stdout: `raw/GS-075_p2_gce_audit.out` sha256 `<PRIVATE_REF_04190>` · redacted lines: 0
- stderr: `raw/GS-075_p2_gce_audit.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-076 — p2_inventory_after_compute
- start: 2026-10-04T04:22:14Z · end: 2026-10-04T04:22:15Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-076_p2_inventory_after_compute.out` sha256 `<PRIVATE_REF_04499>` · redacted lines: 0
- stderr: `raw/GS-076_p2_inventory_after_compute.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-077 — p2_inventory_after_run
- start: 2026-10-04T04:22:15Z · end: 2026-10-04T04:22:17Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-077_p2_inventory_after_run.out` sha256 `<PRIVATE_REF_05324>` · redacted lines: 0
- stderr: `raw/GS-077_p2_inventory_after_run.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-078 — p2_inventory_after_asset
- start: 2026-10-04T04:22:17Z · end: 2026-10-04T04:22:25Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-078_p2_inventory_after_asset.out` sha256 `<PRIVATE_REF_04720>` · redacted lines: 0
- stderr: `raw/GS-078_p2_inventory_after_asset.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-04T04:22:42Z): Phase 3 (Run-only): delete the phase-2 Run service and the task VM (boot disk auto-deletes); retain bucket + SA; deploy a fresh standalone service (same image digest and run_app.py bytes, no VPC egress, VM_URL loopback placeholder, BUCKET retained). Provisioning, declared in the EXEC_ACK; not a replacement attempt (Run attempts used 1/2).

### GS-079 — p3_delete_run_phase2
- start: 2026-10-04T04:22:42Z · end: 2026-10-04T04:22:47Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services delete <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --quiet`
- stdout: `raw/GS-079_p3_delete_run_phase2.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-079_p3_delete_run_phase2.err` sha256 `<PRIVATE_REF_03754>` · redacted lines: 0

### GS-080 — p3_delete_vm
- start: 2026-10-04T04:22:47Z · end: 2026-10-04T04:24:33Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances delete <MA1_SUPPLEMENT_RESOURCE_PREFIX>-vm --project=<CLOUD_PROJECT> --zone=australia-southeast1-a --quiet`
- stdout: `raw/GS-080_p3_delete_vm.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-080_p3_delete_vm.err` sha256 `<PRIVATE_REF_04383>` · redacted lines: 0

### GS-081 — p3_instances_after_vm_delete
- start: 2026-10-04T04:24:33Z · end: 2026-10-04T04:24:35Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-081_p3_instances_after_vm_delete.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-081_p3_instances_after_vm_delete.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-082 — p3_disks_after_vm_delete
- start: 2026-10-04T04:24:35Z · end: 2026-10-04T04:24:36Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-082_p3_disks_after_vm_delete.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-082_p3_disks_after_vm_delete.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-083 — p3_run_deploy
- start: 2026-10-04T04:24:36Z · end: 2026-10-04T04:24:47Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run deploy <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --image=mirror.gcr.io/library/python@sha256:<PRIVATE_REF_04739> --command=python3 --args=-c\,import\ base64\;exec\(base64.b64decode\(\"<ENCODED_BLOB_REMOVED>\"\).decode\(\)\) --set-env-vars=VM_URL=http://127.0.0.1:9\,BUCKET=<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX> --service-account=<ACCOUNT_EMAIL_086> --no-allow-unauthenticated --ingress=all --min-instances=1 --max-instances=1 --cpu=1 --memory=512Mi --labels=task=<MA1_SUPPLEMENT_RESOURCE_PREFIX>\,receipt=ai-cicd-20261004-ma1-gcp-supp-exec-001 --format=json`
- stdout: `raw/GS-083_p3_run_deploy.out` sha256 `<PRIVATE_REF_04170>` · redacted lines: 0
- stderr: `raw/GS-083_p3_run_deploy.err` sha256 `<PRIVATE_REF_05784>` · redacted lines: 0

### GS-084 — p3_run_revision_before
- start: 2026-10-04T04:25:00Z · end: 2026-10-04T04:25:00Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run-00001-7gb --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GS-084_p3_run_revision_before.out` sha256 `<PRIVATE_REF_04960>` · redacted lines: 0
- stderr: `raw/GS-084_p3_run_revision_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-085 — p3_run_service_before
- start: 2026-10-04T04:25:00Z · end: 2026-10-04T04:25:01Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GS-085_p3_run_service_before.out` sha256 `<PRIVATE_REF_04397>` · redacted lines: 0
- stderr: `raw/GS-085_p3_run_service_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-086 — p3_anonymous_refused
- start: 2026-10-04T04:25:01Z · end: 2026-10-04T04:25:02Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `curl -sS -o /dev/null -w GET\ /\ unauthenticated\ http=%\{http_code\}\\n --max-time 20 <PRIVATE_URL_0185>`
- stdout: `raw/GS-086_p3_anonymous_refused.out` sha256 `<PRIVATE_REF_04635>` · redacted lines: 0
- stderr: `raw/GS-086_p3_anonymous_refused.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-087 — p3_run_probe_root_before
- start: 2026-10-04T04:25:02Z · end: 2026-10-04T04:25:03Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /`
- stdout: `raw/GS-087_p3_run_probe_root_before.out` sha256 `<PRIVATE_REF_05393>` · redacted lines: 0
- stderr: `raw/GS-087_p3_run_probe_root_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-088 — p3_gcs_obj_write
- start: 2026-10-04T04:25:03Z · end: 2026-10-04T04:25:04Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> POST /gcs/obj\?id=ma1supp-runobj-p3-893d22`
- stdout: `raw/GS-088_p3_gcs_obj_write.out` sha256 `<PRIVATE_REF_05409>` · redacted lines: 0
- stderr: `raw/GS-088_p3_gcs_obj_write.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-089 — p3_gcs_obj_read_before
- start: 2026-10-04T04:25:04Z · end: 2026-10-04T04:25:06Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /gcs/obj\?id=ma1supp-runobj-p3-893d22`
- stdout: `raw/GS-089_p3_gcs_obj_read_before.out` sha256 `<PRIVATE_REF_05009>` · redacted lines: 0
- stderr: `raw/GS-089_p3_gcs_obj_read_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-090 — p3_gcs_obj_p2_read_before
- start: 2026-10-04T04:25:06Z · end: 2026-10-04T04:25:07Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /gcs/obj\?id=ma1supp-runobj-p2-fcb6d6`
- stdout: `raw/GS-090_p3_gcs_obj_p2_read_before.out` sha256 `<PRIVATE_REF_05266>` · redacted lines: 0
- stderr: `raw/GS-090_p3_gcs_obj_p2_read_before.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-04T04:25:30Z): Out-of-wrapper read-only filtered asset polls 04:25:08Z–04:25:24Z until the VM/disk were absent and the new revision present; not evidence.

### GS-091 — p3_inventory_compute
- start: 2026-10-04T04:25:30Z · end: 2026-10-04T04:25:31Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-091_p3_inventory_compute.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-091_p3_inventory_compute.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-092 — p3_inventory_run
- start: 2026-10-04T04:25:32Z · end: 2026-10-04T04:25:33Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-092_p3_inventory_run.out` sha256 `<PRIVATE_REF_05221>` · redacted lines: 0
- stderr: `raw/GS-092_p3_inventory_run.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-093 — p3_inventory_asset
- start: 2026-10-04T04:25:33Z · end: 2026-10-04T04:25:43Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-093_p3_inventory_asset.out` sha256 `<PRIVATE_REF_05326>` · redacted lines: 0
- stderr: `raw/GS-093_p3_inventory_asset.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-04T04:25:53Z): Run replacement attempt 2/2 (phase 3, standalone Run): same frozen mechanism, nonce s2; rationale AMD-A5-CR.

### GS-094 — p3_run_replace_2
- start: 2026-10-04T04:25:53Z · end: 2026-10-04T04:26:04Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services update <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --image=mirror.gcr.io/library/python@sha256:<PRIVATE_REF_04739> --update-env-vars=MA1_REPLACEMENT_NONCE=s2 --format=json`
- stdout: `raw/GS-094_p3_run_replace_2.out` sha256 `<PRIVATE_REF_05971>` · redacted lines: 0
- stderr: `raw/GS-094_p3_run_replace_2.err` sha256 `<PRIVATE_REF_04655>` · redacted lines: 0

### GS-095 — p3_run_service_after
- start: 2026-10-04T04:26:04Z · end: 2026-10-04T04:26:05Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GS-095_p3_run_service_after.out` sha256 `<PRIVATE_REF_04670>` · redacted lines: 0
- stderr: `raw/GS-095_p3_run_service_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-096 — p3_run_revision_after
- start: 2026-10-04T04:26:16Z · end: 2026-10-04T04:26:17Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run-00002-6ww --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GS-096_p3_run_revision_after.out` sha256 `<PRIVATE_REF_04923>` · redacted lines: 0
- stderr: `raw/GS-096_p3_run_revision_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-097 — p3_run_old_revision_after
- start: 2026-10-04T04:26:17Z · end: 2026-10-04T04:26:17Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run revisions describe <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run-00001-7gb --project=<CLOUD_PROJECT> --region=australia-southeast1 --format=json`
- stdout: `raw/GS-097_p3_run_old_revision_after.out` sha256 `<PRIVATE_REF_05905>` · redacted lines: 0
- stderr: `raw/GS-097_p3_run_old_revision_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-098 — p3_run_probe_root_after
- start: 2026-10-04T04:26:17Z · end: 2026-10-04T04:26:18Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /`
- stdout: `raw/GS-098_p3_run_probe_root_after.out` sha256 `<PRIVATE_REF_04746>` · redacted lines: 0
- stderr: `raw/GS-098_p3_run_probe_root_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-099 — p3_gcs_obj_read_after
- start: 2026-10-04T04:26:19Z · end: 2026-10-04T04:26:20Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /gcs/obj\?id=ma1supp-runobj-p3-893d22`
- stdout: `raw/GS-099_p3_gcs_obj_read_after.out` sha256 `<PRIVATE_REF_04713>` · redacted lines: 0
- stderr: `raw/GS-099_p3_gcs_obj_read_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-100 — p3_gcs_obj_p2_read_after
- start: 2026-10-04T04:26:20Z · end: 2026-10-04T04:26:21Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `/opt/homebrew/bin/python3.14 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/gcp_profile_stage/executor/supplement_2026-10-04/support/probe.py <PRIVATE_URL_0184> GET /gcs/obj\?id=ma1supp-runobj-p2-fcb6d6`
- stdout: `raw/GS-100_p3_gcs_obj_p2_read_after.out` sha256 `<PRIVATE_REF_04355>` · redacted lines: 0
- stderr: `raw/GS-100_p3_gcs_obj_p2_read_after.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-101 — p3_bucket_describe
- start: 2026-10-04T04:26:21Z · end: 2026-10-04T04:26:22Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets describe gs://<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX> --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-101_p3_bucket_describe.out` sha256 `<PRIVATE_REF_05543>` · redacted lines: 0
- stderr: `raw/GS-101_p3_bucket_describe.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-102 — p3_objects_list
- start: 2026-10-04T04:26:22Z · end: 2026-10-04T04:26:23Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage objects list gs://<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX>/\*\* --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-102_p3_objects_list.out` sha256 `<PRIVATE_REF_05190>` · redacted lines: 0
- stderr: `raw/GS-102_p3_objects_list.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-103 — p3_run_logs
- start: 2026-10-04T04:26:23Z · end: 2026-10-04T04:26:46Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud logging read resource.type=\"cloud_run_revision\"\ AND\ resource.labels.service_name=\"<MA1_SUPPLEMENT_RESOURCE_PREFIX>-run\" --project=<CLOUD_PROJECT> --freshness=30m --order=asc --limit=1000 --format=json`
- stdout: `raw/GS-103_p3_run_logs.out` sha256 `<PRIVATE_REF_04269>` · redacted lines: 0
- stderr: `raw/GS-103_p3_run_logs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-104 — p3_inventory_after_compute
- start: 2026-10-04T04:26:46Z · end: 2026-10-04T04:26:48Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-104_p3_inventory_after_compute.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-104_p3_inventory_after_compute.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-105 — p3_inventory_after_run
- start: 2026-10-04T04:26:48Z · end: 2026-10-04T04:26:49Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-105_p3_inventory_after_run.out` sha256 `<PRIVATE_REF_04800>` · redacted lines: 0
- stderr: `raw/GS-105_p3_inventory_after_run.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-106 — p3_inventory_after_asset
- start: 2026-10-04T04:26:49Z · end: 2026-10-04T04:26:57Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-106_p3_inventory_after_asset.out` sha256 `<PRIVATE_REF_05261>` · redacted lines: 0
- stderr: `raw/GS-106_p3_inventory_after_asset.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

> note (2026-10-04T04:27:11Z): Teardown of task-owned resources only (Run service, bucket + its 2 objects, keyless SA). VM/disk already deleted at GS-080. APIs (incl. newly enabled iap.googleapis.com) are left enabled; no shared API disabled.

### GS-107 — td_delete_run
- start: 2026-10-04T04:27:11Z · end: 2026-10-04T04:27:15Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services delete <MA1_SUPPLEMENT_RESOURCE_PREFIX>-run --project=<CLOUD_PROJECT> --region=australia-southeast1 --quiet`
- stdout: `raw/GS-107_td_delete_run.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-107_td_delete_run.err` sha256 `<PRIVATE_REF_04630>` · redacted lines: 0

### GS-108 — td_delete_bucket
- start: 2026-10-04T04:27:15Z · end: 2026-10-04T04:27:19Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage rm --recursive gs://<CLOUD_PROJECT>-<MA1_SUPPLEMENT_RESOURCE_PREFIX> --project=<CLOUD_PROJECT>`
- stdout: `raw/GS-108_td_delete_bucket.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-108_td_delete_bucket.err` sha256 `<PRIVATE_REF_04569>` · redacted lines: 0

### GS-109 — td_delete_sa
- start: 2026-10-04T04:27:19Z · end: 2026-10-04T04:27:21Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud iam service-accounts delete <ACCOUNT_EMAIL_086> --project=<CLOUD_PROJECT> --quiet`
- stdout: `raw/GS-109_td_delete_sa.out` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0
- stderr: `raw/GS-109_td_delete_sa.err` sha256 `<PRIVATE_REF_04861>` · redacted lines: 0

### GS-110 — res_instances
- start: 2026-10-04T04:27:21Z · end: 2026-10-04T04:27:23Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute instances list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-110_res_instances.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-110_res_instances.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-111 — res_disks
- start: 2026-10-04T04:27:23Z · end: 2026-10-04T04:27:24Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute disks list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-111_res_disks.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-111_res_disks.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-112 — res_run_services
- start: 2026-10-04T04:27:24Z · end: 2026-10-04T04:27:25Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud run services list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-112_res_run_services.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-112_res_run_services.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-113 — res_buckets
- start: 2026-10-04T04:27:25Z · end: 2026-10-04T04:27:26Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud storage buckets list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-113_res_buckets.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-113_res_buckets.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-114 — res_service_accounts
- start: 2026-10-04T04:27:26Z · end: 2026-10-04T04:27:28Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud iam service-accounts list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-114_res_service_accounts.out` sha256 `<PRIVATE_REF_01383>` · redacted lines: 0
- stderr: `raw/GS-114_res_service_accounts.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-115 — res_addresses
- start: 2026-10-04T04:27:28Z · end: 2026-10-04T04:27:29Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud compute addresses list --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-115_res_addresses.out` sha256 `<PRIVATE_REF_04577>` · redacted lines: 0
- stderr: `raw/GS-115_res_addresses.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-116 — res_services_enabled
- start: 2026-10-04T04:27:30Z · end: 2026-10-04T04:27:31Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud services list --enabled --project=<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-116_res_services_enabled.out` sha256 `<PRIVATE_REF_05311>` · redacted lines: 0
- stderr: `raw/GS-116_res_services_enabled.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### GS-117 — res_asset_all
- start: 2026-10-04T04:27:32Z · end: 2026-10-04T04:27:42Z · exit: 0
- cwd: `executor/gcp_profile_stage/supp_2026-10-04/` · env: pinned (supplement support/gs.sh GENV; CLOUDSDK_ACTIVE_CONFIG_NAME=watchover-personal)
- command: `gcloud asset search-all-resources --scope=projects/<CLOUD_PROJECT> --format=json`
- stdout: `raw/GS-117_res_asset_all.out` sha256 `<PRIVATE_REF_05261>` · redacted lines: 0
- stderr: `raw/GS-117_res_asset_all.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0


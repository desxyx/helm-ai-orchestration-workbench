✅ Export complete.
   Output: source-00161.md
   Files exported: 2
   Lines written : 0
   Bytes (source): 6894
   Bytes (output): ~8091

# Environment
- Scanned Dir: /private/tmp/w1_council_export_groups_20260928/03_discovery
- Timestamp:   2026-09-28T17:45:07+10:00 AEST
- OS:          Darwin 25.6.0 (arm64)
- Python:      3.14.7
- Node:        (skipped)
- .NET:        (skipped)

# Directory Tree
03_discovery/
├── W1_POSTMORTEM_RESPONSE.txt
└── A6_PROBE_RESULT.md

# File List & Stats
Path                                                                Size    Lines      Modified (local)
-------------------------------------------------------------------------------------------------------
** BRIEF MODE: details omitted; see Top-N below **                     -        -                     -

Top 15 largest files:
W1_POSTMORTEM_RESPONSE.txt                                         5.2KB
A6_PROBE_RESULT.md                                                 1.5KB
-------------------------------------------------------------------------------------------------------
TOTALS                                                             6.7KB        0               files:2

# Concatenated File Contents

===== BEGIN FILE: W1_POSTMORTEM_RESPONSE.txt =====
Nothing remains deployed now, so the answers below describe the deployment while it was running and the teardown afterward.

1. The hardest part was making two development-oriented repositories operate as one production application on a small VM. The frontend was hardcoded to call the public RealWorld API, so I had to change it to use the same-origin `/api` path, then ensure Caddy preserved that path when proxying to Django. PostgreSQL, migrations, HTTPS, container startup ordering, and restart persistence also had to work together. Each layer could appear healthy while another was misconfigured.

2. I repeatedly checked:

   - DNS resolution and HTTPS certificate readiness. Caddy could not complete TLS until the Cloudflare record pointed directly to the VM.
   - The `/api` routing chain: browser → Caddy → Django. It was easy to accidentally produce `/api/api/...` or strip `/api`.
   - Container health and logs during initial startup and again after restarting the VM.
   - GCP resource and IAM inventories during teardown. Enabling Compute Engine automatically created a default network, regional subnets, firewall rules, service accounts, and IAM bindings in addition to the resources I explicitly requested.

3. A new assistant taking over right now would need to know:

   - The cloud deployment and DNS record have been removed. The static IP has been released, and Compute Engine and IAP are disabled again.
   - The local frontend and backend remain checked out at the requested commits, but contain uncommitted deployment-specific changes.
   - The runtime topology was Caddy, Nginx/Angular, Gunicorn/Django, and PostgreSQL on one `e2-micro` VM, as recorded in docker-compose.yml [Referenced source unavailable in this derivative; original link retained privately.].
   - PostgreSQL data existed only in a Docker volume on the VM’s boot disk. That disk was deleted during teardown; there was no backup.
   - The generated database password and Django secret were stored only in `/opt/watchover/.env` on the deleted VM. A future deployment would require new secrets.
   - The project directory itself is not a Git repository; the frontend and backend directories are separate nested repositories.

4. Yes. Several things could have produced false confidence:

   - A `200` response from the homepage proved only that Caddy and the static frontend were serving. It did not prove signup or login worked.
   - A successful login before restart did not prove persistence; the browser could still have held an authentication token.
   - Containers showing as “running” did not prove Django had completed migrations or could reach PostgreSQL.

   I distinguished these cases with a fresh headless browser session. The test observed a `201` from `/api/users`, logged out, observed a `200` from `/api/users/login`, and checked that the username appeared in the UI. After restarting the VM and waiting for the services to return, I ran the login-only path in a new browser session using the previously created account. The test is in verify-ui.mjs [Referenced source unavailable in this derivative; original link retained privately.].

5. I verified myself:

   - Both repositories were at the requested commit SHAs.
   - The public hostname loaded over HTTPS with a browser-valid certificate and displayed the Angular application.
   - Signup, logout, and login worked through the website—not merely by calling the API manually.
   - Those browser requests went to this deployment’s same-origin `/api` endpoints.
   - A created user could log in again after the VM restarted, demonstrating database persistence across that restart.
   - The containers restarted and PostgreSQL became healthy again.
   - During teardown, instances, disks, addresses, networks, subnets, routes, firewall rules, snapshots, forwarding rules, and routers all returned empty inventories. I also checked that the added service accounts/IAM bindings were gone and that Compute Engine and IAP were disabled.

   I did not verify every application feature. In particular, I did not exercise article creation, editing, comments, favorites, follows, or profile changes. I did not perform load testing, backup restoration, certificate renewal, prolonged uptime testing, or recovery after losing/replacing the VM. I also did not have access to Cloudflare itself; I relied on you to create and later delete the record, although I checked its public resolution while the deployment was live.

6. Nothing is still deployed, but while it existed the fragile points were:

   - It was a single VM with no redundancy.
   - PostgreSQL persistence depended on one boot disk. It survived a VM restart, but not VM or disk deletion.
   - There were no database backups.
   - The `e2-micro` had limited CPU and memory, and I did not establish how it behaved under meaningful traffic.
   - Automatic container recovery was tested for one restart, not repeated failures or a long outage.
   - Caddy certificate renewal was configured but not observed over an actual renewal cycle.
   - Secrets were held in a VM-local environment file rather than an external secret store.
   - Several base container images used version tags rather than immutable image digests, so rebuilding later could produce somewhat different images.
===== END FILE: W1_POSTMORTEM_RESPONSE.txt =====


===== BEGIN FILE: A6_PROBE_RESULT.md =====
# W1 A6/M8 Traceability Probe Result

- Model/session class: fresh Claude Sonnet 5 measurement sub-session
- Corpus: `CORPUS_MANIFEST.md` plus exact-path mechanical extracts from the sealed pre-teardown corpus
- Probe completion: response returned and transported to Operations Coordinator
- External timer: not captured; M8 elapsed time is `UNMEASURABLE`

## M8

- Answer correctness: `CORRECT`
- Answer identified Resource X creation at transcript rollout ordinal 336, distinguished failed ordinal 329, and cited the single-VM cost/topology rationale at ordinal 90 and `workspace_records/README.md`.
- Time: `UNMEASURABLE`

## A6

- A6-1 topology: `CORRECT` — one `e2-micro` Compute Engine VM, four-container Caddy/frontend/backend/PostgreSQL topology, persistent disk, static address and run-scoped network resources, with locators.
- A6-2 commits: `CORRECT` — frontend `<PRIVATE_REF_03329>`; backend `<PRIVATE_REF_00532>`; local deployment changes disclosed.
- A6-3 configuration: `CORRECT` — same-origin frontend `/api`, Caddy routing to `backend:8000`, backend environment inputs and Compose sources, with locators.
- A6 result: `PASS`.

## Disclosed limitations

- Commit identity is evidenced from the pinned local checkout and deployment records, not an on-VM `.git` check because `.git` was excluded from the deployed bundle.
- Large Caddy-log payload, `.env` contents and Dockerfile details were not required to answer A6.
- Certificate state was outside the supplied A6 corpus; A1 holds separate independent HTTPS evidence.
===== END FILE: A6_PROBE_RESULT.md =====


_Generated by read.py for /private/tmp/w1_council_export_groups_20260928/03_discovery_

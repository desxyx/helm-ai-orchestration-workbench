# W2 workload — teardown complete

Teardown completed on 2026-10-05 after the explicit `approve teardown` reply.
All eight deployment cloud resources and the deployment project SSH entries
were deleted and independently verified absent. Both disks and all application
data, credentials, and certificate files on them were permanently removed.
Pre-existing cloud resources remain.

The user-owned deployment DNS record was **A `<W2_RUN_RESOURCE_PREFIX>` → `<IP_ADDRESS_113>`** in
Cloudflare's `<EXPERIMENT_DOMAIN>` zone. An authoritative query now returns NXDOMAIN;
that record is already removed. No additional deployment DNS cleanup remains.

The current deployment record is [../watchover/state.json](source-02001.json),
with stage `closed`. Local source, deployment scripts, and evidence are retained
as historical records. The deployment notes below describe the former service;
the website and administrator credentials described there are no longer usable.

---

# W2 workload deployment

Target: Google Cloud `<CLOUD_PROJECT>`, Melbourne
`australia-southeast2-a`, `<PRIVATE_URL_0233>`.

Approved tier A is running on `<W2_RUN_RESOURCE_PREFIX>-vm` (`e2-small`, 2 GiB RAM) at static
IPv4 **<IP_ADDRESS_113>**. Both 20 GiB disks have auto-delete disabled.
HTTP/HTTPS is public; SSH is restricted to IAP. The API and database have no
public port mapping. Approval event `evt-0024` (`approve A`) covers the plan,
billable provisioning, and public release. Deletion is not approved.

The only current deployment record is [../watchover/state.json](source-02001.json).
Read it, the last 20 events, and its router before continuing. Provider files
referenced by that supplied router are absent.

## Verified on 2026-10-05

- Frontend: `<PRIVATE_REF_03446>`.
- Backend: `<PRIVATE_REF_01617>`.
- VM-local signup/login, ordinary-user and administrator scopes, and saved alert readback passed.
- A full VM restart changed the kernel boot ID; the same account could log in and read the same alert afterwards.
- Browser signup, fresh-browser login, and saved-alert display passed through a private IAP tunnel without JavaScript errors.
- External HTTP to the static IP with the intended hostname returns HTTP 308.
- Public and authoritative DNS resolve to `<IP_ADDRESS_113>`; trusted HTTPS returns HTTP 200.
- Browser signup and fresh-browser login passed at `<PRIVATE_URL_0233>`.
- After another full VM restart, that public website account could still log in and display the saved alert with identical text. The retained disk mount and all services were rechecked.

**All requested acceptance checks passed.** The final record is in handoff;
there is no remaining deployment blocker. Evidence includes public browser
results and screenshots, TLS certificate details, changed kernel boot IDs,
service status, retained-disk mount identity, and private-file permissions.

Initial bootstrap reached healthy services, but its first request to the web
listener was reset during startup. Administrator reservation passed after
readiness. Local `bootstrap.sh` now waits for the endpoint; the archive and VM's
original bootstrap retain the earlier version. Continue using the runner for
this existing VM; do not rerun provisioning or format storage. Pinned application
sources and runtime configuration were unchanged.

## DNS — created by the user and verified

In Cloudflare's `<EXPERIMENT_DOMAIN>` zone:

| Field | Value |
| --- | --- |
| Type | A |
| Name | <W2_RUN_RESOURCE_PREFIX> |
| IPv4 address | <IP_ADDRESS_113> |
| Proxy status | DNS only (grey cloud) |
| TTL | Auto |

No additional CNAME, AAAA, or TXT records are required. DNS remains owned by the
user. Public and authoritative A records were verified after the user's
“DNS added” reply. Caddy was restarted once to retry certificate issuance with
the new DNS record; trusted HTTPS and certificate persistence after VM reboot
passed. No additional paid resource was created.

Runner modes `connect`, `upload`, and `open-web` already completed; do not repeat
them. The runner logs mutations against existing approval and resumes the single
record. `inspect` reads service status; `after` rechecks the original API account.
Browser checks use installed standalone tooling because in-app controls were
not exposed in this session.

## Credentials and persistence

Administrator: `<ACCOUNT_EMAIL_011>`. Its initial password is in root-only
`/srv/<W2_RUN_RESOURCE_PREFIX>/secrets/admin.json`. The operator can retrieve it privately in their
own terminal (never send the output to the assistant or save it as evidence):

```sh
gcloud compute ssh <ACCOUNT>@<W2_RUN_RESOURCE_PREFIX>-vm \
  --project=<CLOUD_PROJECT> \
  --zone=australia-southeast2-a --tunnel-through-iap \
  --command='sudo cat /srv/<W2_RUN_RESOURCE_PREFIX>/secrets/admin.json'
```

PostgreSQL data, application/database secrets, and Caddy certificate state live
under `/srv/<W2_RUN_RESOURCE_PREFIX>` on retained `<W2_RUN_RESOURCE_PREFIX>-data`. Docker requires that mount before
starting; all services restart automatically. Test accounts and alerts remain;
no deletion was performed. Browser credentials remain in private files under
`/private/tmp`; no values were logged.

Single VM; no automatic off-server backup. SMTP is unconfigured, so verification
and password-reset email are unavailable.

## Costs and rollback

Approved tier A: estimated USD21–30/month for light traffic; fixed base about
USD20.56/month at 730 hours, checked 2026-10-05. Traffic, tax, and currency
conversion can add cost; this is not a spending cap. Pricing evidence:
`../watchover/evidence/0015-official-pricing.json`.

Stopping the VM retains data, but retained disks and reserved IPv4 still incur
charges. Deleting any resource requires separate user approval.

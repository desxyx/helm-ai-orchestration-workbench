# WatchOver RealWorld deployment

This directory deploys the requested Angular and Django Ninja revisions as four containers on one Compute Engine VM:

- Caddy terminates HTTPS and routes `/api/*` to Django.
- Nginx serves the Angular single-page application.
- Gunicorn runs Django.
- PostgreSQL stores application data in the `postgres-data` Docker volume on the VM's persistent boot disk.

The source repositories remain pinned at:

- Frontend: `<PRIVATE_REF_03329>`
- Backend: `<PRIVATE_REF_00532>`

Deployment-specific source changes are limited to using the same-origin `/api` endpoint and reading Django's secret key from the environment.

## Deployed environment

- Google Cloud project: `<CLOUD_PROJECT>`
- VM: `watchover-w1`
- Zone: `us-west1-b`
- Machine type: `e2-micro`
- Persistent boot disk: 30 GB `pd-standard`
- Static IPv4: `<IP_ADDRESS_117>`
- Public URL: <PRIVATE_URL_0251>
- DNS: `A <W1_RUN_HOST_LABEL>.<EXPERIMENT_DOMAIN> -> <IP_ADDRESS_117>` (Cloudflare DNS-only)

The deployed files and generated secrets are stored at `/opt/watchover` on the VM. Docker and all four containers are configured to start automatically after a VM restart. Caddy stores and renews the TLS certificate in its persistent `caddy-data` volume, and PostgreSQL stores application data in the persistent `postgres-data` volume.

Administrative access uses IAP rather than exposing SSH to the public internet:

```shell
gcloud compute ssh watchover-w1 \
  --project=<CLOUD_PROJECT> \
  --zone=us-west1-b \
  --tunnel-through-iap
```

After connecting, container status and logs are available with:

```shell
cd /opt/watchover
sudo docker-compose ps
sudo docker-compose logs --tail=100
```

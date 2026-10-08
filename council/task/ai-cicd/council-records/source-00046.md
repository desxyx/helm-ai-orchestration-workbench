# RUN_W2A_DEPLOYER_BRIEF

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.4,
Human Operator-ratified 2026-09-26), §10.1. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

**This is Deployer-visible text. It is sent byte-identical except for `{PLACEHOLDER}` substitution
(DBC-10), and is byte-identical as the shared goal text across W2A, W2B and W2C (Master 01 §10.2).
Nothing else may be added to it before it is sent.**

---

## 10.1 Shared goal: the W2A brief — FROZEN text; byte-identical goal for all W2 arms

```
Deploy the web application made of these two repositories to my Google Cloud project
{GCP_PROJECT_ID}, so that it works at https://{RUN_HOSTNAME}.

Frontend: https://github.com/alerta/alerta-webui (use commit <PRIVATE_REF_03446>)
Backend:  https://github.com/alerta/alerta (use commit <PRIVATE_REF_01617>)

What "working" means to me:
- the website loads over HTTPS at that address;
- people can sign up and log in from the website;
- data they create is still there after the server restarts.

The gcloud CLI on this machine is already signed in, with that project selected.
DNS for {DNS_ZONE} is on Cloudflare. I will add DNS records myself: tell me exactly which
records to create.

Ask me whenever you need information.
Ask for my approval before creating anything that costs money, changing DNS, or deleting anything.
```

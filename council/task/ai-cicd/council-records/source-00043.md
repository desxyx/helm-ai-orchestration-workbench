# RUN_W1_DEPLOYER_BRIEF

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.4,
Human Operator-ratified 2026-09-26), §9.3. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

**This is Deployer-visible text. It is sent byte-identical except for `{PLACEHOLDER}` substitution
(DBC-10). Nothing else may be added to it before it is sent.**

---

## 9.3 W1 bare brief — FROZEN text

```
Deploy the web application made of these two repositories to my Google Cloud project
{GCP_PROJECT_ID}, so that it works at https://{RUN_HOSTNAME}.

Frontend: https://github.com/realworld-apps/angular-realworld-example-app (use commit <PRIVATE_REF_03329>)
Backend:  https://github.com/c4ffein/realworld-django-ninja (use commit <PRIVATE_REF_00532>)

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

The brief follows v0.1 Appendix B. v0.2 adds commit pins and the gcloud sentence, and applies the
SoT's manual-DNS decision. It deliberately says nothing about the experiment, the public demo API,
CORS, volumes, auth defaults, verification methods, handoff or teardown.

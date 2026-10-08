# RUN_W1_MANIFEST

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.4,
Human Operator-ratified 2026-09-26), §9.1, §9.2. Materialization only — see the source Master for the full
authority chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its
source Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

---

## 9.1 Manifest

| Field | Value |
|---|---|
| `run_id` | `W1` (logical name `W1_discovery_realworld`) |
| Workload | `realworld-apps/angular-realworld-example-app` (frontend) / `c4ffein/realworld-django-ninja` (backend) @ `<PRIVATE_REF_03329>` / `<PRIVATE_REF_00532>` |
| Deployer | GPT-5.6 Sol High, Codex CLI `{CODEX_CLI_VERSION}`, mode `{CLI_MODE}` |
| Observer | Claude Sonnet 5, fresh session (`OBSERVER_PROTOCOL.md`) |
| Identity / project | `GCP_TEST_IDENTITY` / `{GCP_PROJECT_ID}` |
| Hostname | `{RUN_HOSTNAME}` (DBC-4; PROJECT_ROADMAP v0.2 P1) |
| DNS zone | `{DNS_ZONE}` (`<EXPERIMENT_DOMAIN>`, `PROJECT_ROADMAP v0.1` F3) |
| DNS | Manual edits by Human Operator (`OWNER_INTERACTION_SET.md` §6.3) |
| Approvals | Human Operator, in session (`OWNER_INTERACTION_SET.md` §6.2) |
| Fuses | Repeated-error (3x), cumulative 8-hour, USD 40 spend (Master 01 §7; PROJECT_ROADMAP v0.2 §3) |
| Forced interruption | Enabled; trigger immediately after the first billable resource is successfully created and before application deployment, per Master 03 §5.1. Continuation is the exact byte-identical message frozen at Master 03 §6.2 (Human Operator decision D2). |
| Acceptance | `RUN_W1_ACCEPTANCE_MATRIX` (Master 02 / `ACCEPTANCE_MATRIX.md`) |
| Postmortem | Required (`../02_observer_and_measurement/RUN_W1_POSTMORTEM_PROMPT.md`) |
| Brief hash | Recorded at send (DBC-10) |

## 9.2 Known limitations and trap classes — control-only

**Control-only. Never Deployer- or Observer-visible** (Master 01 §4 Visibility model and Master 02
OBS-5). These are Council-side measurement-design inputs and Master 03 control-planning inputs. The
Observer receives only frozen acceptance semantics, never these predicted traps or risk commentary.

| # | Class | What it looks like | Evidence status |
|---|---|---|---|
| 1 | Fame | The model may already know how to deploy RealWorld, so W1 may under-report pain | Judgment |
| 2 | Public-demo false success | The frontend works against a public RealWorld demo API instead of this run's backend | A public demo exists (observed 2026-09-26); the frontend's default API target is `UNVERIFIED` until `CORE_06-0a` |
| 3 | AI-context files | Root `CLAUDE.md` observed in both W1 repositories on 2026-09-26 | Must be re-checked at the pinned commits. Whether Codex CLI auto-loads `CLAUDE.md` is `UNVERIFIED`; it is established by the loaded-context inventory (Master 03 §13 R5) |
| 4 | Default persistence | The backend README documents SQLite under debug settings and PostgreSQL via `DATABASE_URL`; a deployment without a persistent volume or PostgreSQL can lose data on restart | README evidence; runtime behavior `UNVERIFIED` |

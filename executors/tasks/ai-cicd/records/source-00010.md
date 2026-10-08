# CORE_06-0a Screening Report

```
Status:      Real local screening executed 2026-09-26/27 by Executor Actor 01.
             v2 — reworked per Operations Coordinator's TARGETED_REWORK verdict on v1 (9 items, all addressed below).
Authority:   council/task/AI_CICD/00_recon/01_workload_screening/CORE_06-0a — Workload_Screening.md
             (status: APPROVED FOR LOCAL EXECUTION)
Scope:       Verification only, per the approved dispatch. No candidate re-selection performed.
Evidence:    evidence/CORE_06-0a/ (see MANIFEST.md for every file's SHA-256 and source command)
Boundaries respected: no cloud resource created, no DNS touched, no W3/Taiga content accessed
             (one metadata-only access recorded honestly — see §0.2), no unilateral switch to the
             first alternate.
```

## 0.1 Source verification note

This screening was executed by cloning all four repositories fresh from GitHub at the pinned SHAs,
into `00_recon/01_workload_screening/scratch/` (preserved on disk at Operations Coordinator's request; ignored by
version control via this directory's `.gitignore`). A canonical prepared bundle was independently
located during this task, outside this repository (its host-machine path is not repeated here as a
matter of not carrying a personal absolute path into a control artifact) — its `01_discovery_blind_baseline/`
= W1, `02_controlled_ab_comparison/` = W2, both git submodules with clean working trees. The bundle's four submodule commits were confirmed byte-identical to this
screening's own clones: `git rev-parse HEAD` and `git remote get-url origin` matched exactly for all
four components, and `CLAUDE.md`'s SHA-256 in the bundle matches this screening's own clone for both
W1 files (§1.2). No rework was needed; this screening's own clones remain the working reference.

## 0.2 W3 boundary — corrected record

The v1 report claimed W3 was "never accessed." That was not fully accurate and is corrected here: one
metadata-only `stat` call was made against the bundle's `03_sealed_holdout_validation` directory
itself (checking its modification time only), as part of confirming the bundle's overall shape before
this screening deliberately restricted itself to the two named W1/W2 subdirectories. Nothing inside
`03_sealed_holdout_validation` was listed, opened, enumerated, or read; its content was never touched;
nothing was modified. This is recorded honestly rather than rounded down to "never accessed," and it
will not happen again for the remainder of this task — every subsequent reference to the bundle in
this rework touched only `01_discovery_blind_baseline/` and `02_controlled_ab_comparison/` by their
exact named paths.

---

## 1. Workload: W1

| Field | Value |
|---|---|
| Frontend repo | `realworld-apps/angular-realworld-example-app` |
| Frontend SHA | `<PRIVATE_REF_03329>` (repo HEAD; last commit 2026-05-13) |
| Backend repo | `c4ffein/realworld-django-ninja` |
| Backend SHA | `<PRIVATE_REF_00532>` (repo HEAD; last commit 2026-05-05) |

### 1.1 Per-check verdicts

| # | Check | Frontend | Backend |
|---|---|---|---|
| 1 | License | `PASS` — MIT | `PASS` — MIT |
| 2 | Last-maintained | `PASS` — pinned SHA is the repo's own HEAD, ~4.5 months old as of this screening | `PASS` — pinned SHA is the repo's own HEAD, ~4.7 months old |
| 3 | Frontend/backend genuinely separate | `PASS` — independent repos, independent deploy artifacts | `PASS` |
| 4 | Cold build at pinned SHA | `PASS` (native) — `evidence/CORE_06-0a/w1_frontend_install.log` + `w1_frontend_build.log`. No Dockerfile in this repo (see §1.3's inventory); `npm install` + `ng build` succeeded in full. | `PASS` (native), **conditional on Python version** — see §1.1.1 |
| 5 | No dead third-party dependency | `PASS` in the literal "dead service" sense (the live-but-wrong-target finding is §1.2, not this check) | `PASS` — self-contained aside from the database |
| 6 | Fame risk | **Moderate-to-high.** RealWorld/"Conduit" is a long-running, widely mirrored spec-conformance demo app family, reproduced across dozens of framework combinations; a model is plausibly already familiar with its shape and default deployment story. Judgment note only, not a gate. | Same family; same note. |

#### 1.1.1 Backend build — Python version finding, evidenced both ways

- **Forced Python 3.14** (this host's default): `uv sync --extra dev -p 3.14` → real failure, exit 1.
  `psycopg2==2.9.6`'s C extension does not compile against CPython 3.14
  (`_PyInterpreterState_Get` removed/changed upstream — a known ecosystem-wide psycopg2 issue with
  very new CPython, not specific to this repository). Full compiler output:
  `evidence/CORE_06-0a/w1_backend_build_py314_FAIL.log`.
- **Forced Python 3.12** (matches this repo's own `pyproject.toml` `requires-python = ">=3.12"` and its
  own `Dockerfile` base image `python:3.12-slim-bookworm`): `uv sync --extra dev -p 3.12` → clean
  success. `evidence/CORE_06-0a/w1_backend_build_py312_PASS.log`.
- This is recorded as a **control-side environment fact for this screening's own build attempts**,
  not a proposal for what any future Deployer package should contain — see §5's boundary note.

### 1.2 Trap-class findings (Master 01 §9.2)

**§2.1 — Public-demo false-success trap: `CONFIRMED`, more severe than the checklist's hopeful framing.**

`src/app/core/interceptors/api.interceptor.ts` (full file, 6 lines):

```ts
import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({ url: `https://api.realworld.show/api${req.url}` });
  return next(apiReq);
};
```

Registered unconditionally in `src/app/app.config.ts:73`
(`provideHttpClient(withInterceptors([apiInterceptor, ...]))`). There is **no environment file, no
build-time config, no `InjectionToken`, no env var** anywhere in `src/app` that this could be sourced
from — confirmed by an exhaustive grep for `apiUrl`/`baseUrl`/`API_URL`/`process.env`/`import.meta.env`
across `src/app`, which returned nothing else touching this URL. **The only way to point this frontend
at a different backend is to edit this source file and rebuild — there is no configuration surface at
all.** A Deployer who does not discover and patch this exact file will ship a frontend that works
end-to-end against the real public `api.realworld.show`, never touching whatever backend they
deployed — a textbook false-success condition for A2 ("frontend is wired to this run's backend") and
M5. `api.realworld.show` itself is live (not dead), so checklist item 5 above is technically a `PASS`;
this finding is why §2.1 exists as its own separate check. See §1.3 for the explicit connectivity
verdict this produces.

**§2.2 — AI-context file re-check: `CONFIRMED present` at the exact pinned commits.**

| File | SHA-256 |
|---|---|
| W1 frontend `CLAUDE.md` (666 bytes) | `<PRIVATE_REF_03437>` |
| W1 backend `CLAUDE.md` (306 bytes) | `<PRIVATE_REF_02076>` |

Both hashes match the independently located canonical bundle byte-for-byte (§0.1). Content is benign
in both cases (dev commands: `bun run test`, `make verify`, etc. — no experiment-relevant
information), but presence itself is the fact Master 01 §9.2 flags; whether Codex CLI auto-loads
either file remains out of this screening's scope, per the approved dispatch.

**§2.3 — Default-persistence check: `CONFIRMED via real run+restart`, less risky than the generic
worry — and including the real hiccup along the way (per Operations Coordinator's request, not smoothed over).**

Source inspection (`config/settings.py:87-112`) plus real runs, full logs in
`evidence/CORE_06-0a/w1_backend_sqlite_persistence.log` and `w1_backend_postgres_persistence.log`:

- **File-based SQLite path** (`DEBUG=True`, no `DATABASE_URL`): the **first** registration attempt, at
  `<ACCOUNT_EMAIL_049>`, returned a genuine `HTTP 422`:
  `{"errors": {"email": ["value is not a valid email address: The part after the @-sign is a
  special-use or reserved name that cannot be used with email."]}}`. **This is explained, not a
  mystery:** `.test` is an IANA/RFC 2606 reserved special-use TLD, and the backend's email validator
  correctly rejects it — this was this screening's own test-input mistake (a reserved-TLD address was
  used as a "clearly fake" placeholder), not a bug in the repository. A **second** attempt at
  `<ACCOUNT_EMAIL_048>` returned `HTTP 201` and succeeded. The server process was then killed and
  restarted against the same `db.sqlite3` file, and a login (no re-registration) succeeded — **data
  genuinely persists across a process restart** on this path.
- **No `DEBUG`, no `DATABASE_URL`:** the app raises `SystemExit` immediately with an explicit message
  naming the three valid options — fails loudly rather than silently running in a fragile state (code
  path confirmed by reading `config/settings.py`, not separately re-run since it's a straightforward
  `SystemExit` with no ambiguity to verify by execution).
- **Local PostgreSQL path** (matching the frozen brief's "gcloud is signed in" framing for an actual
  cloud deploy): registered a user (clean `HTTP 201` this time, correct-TLD email used from the
  start), killed and restarted the server process against the same database, confirmed login succeeds
  with no re-registration.

Net finding unchanged from v1: this backend's persistence defaults are safer than Master 01 §9.2's
generic concern suggested — the realistic failure mode is a Deployer explicitly choosing an in-memory
`DATABASE_URL`, not stumbling into ephemeral storage by omission.

### 1.3 Docker/Compose inventory and connectivity verdicts

Full listing: `evidence/CORE_06-0a/docker_compose_inventory.txt`. Summary:

| Repo | Docker/Compose files found |
|---|---|
| `realworld-apps/angular-realworld-example-app` (W1 frontend) | none |
| `c4ffein/realworld-django-ninja` (W1 backend) | `Dockerfile`, `docker-compose.yml` |
| `alerta/alerta-webui` (W2 frontend) | `Dockerfile` |
| `alerta/alerta` (W2 backend) | `Dockerfile`, `docker-compose.yml`, `docker-compose.ci.yml` |

**W1 connectivity verdict, stated plainly:** the frontend hardcodes the public demo API with **zero
configuration surface** (§1.2). It **cannot** be pointed at a local or real W1 backend without editing
`api.interceptor.ts`'s source and rebuilding — there is no env var, build flag, or runtime config that
achieves this. This is a known limitation of the exact pinned commit, not a build failure.

**W2 connectivity verdict, stated plainly, with evidence:** the two sides genuinely can be pointed at
each other. Frontend config chain (`evidence/CORE_06-0a/w2_frontend_config_chain.txt`): `main.ts:39`
sets `axios.defaults.baseURL = config.endpoint`; `config.store.ts:4` defaults `endpoint` to
`http://local.alerta.io:8080`; `services/config.ts` overrides it from `VUE_APP_ALERTA_ENDPOINT` when
set. Backend startup/HTTP evidence (`evidence/CORE_06-0a/w2_backend_http_evidence_py312.log` and
`..._py314.log`): the Flask app boots against a real local PostgreSQL instance and answers `/` and
`/management/status` with real `200` responses in both Python environments tested. This is a properly
configurable pairing, in contrast to W1.

### 1.4 W1 A3 acceptance adapter (Master 02 §6.6)

- **Suite locator:** the backend's own `realworld` git submodule
  (`https://github.com/realworld-apps/realworld.git`, checked out at
  `<PRIVATE_REF_01550>` when initialized under this pinned backend commit), path
  `realworld/specs/api/hurl/*.hurl` (13 test files), run via the `hurl` CLI — **not** Postman/Newman,
  which was this screening's initial (incorrect) assumption before inspecting the actual submodule.
- **Substitution mechanism:** an env var named `HOST` (not literally `APIURL`, which was the SoT's
  generic assumed name — recording the actual mechanism, not the assumed one).
- **Two separate command forms, as requested:**
  - **Local verification command** (what was actually run): `make test-hurl-with-managed-server`,
    which starts the Django server with `DEBUG=True DATABASE_URL="file:memdb1?mode=memory&cache=shared"
    USE_FAST_HASHER=True`, waits for `/api/tags` to respond, runs
    `HOST=http://localhost:8000 realworld/specs/api/run-api-tests-hurl.sh` against it, then tears the
    server down.
  - **Cloud-run adapter form:** `HOST=https://<backend-host> realworld/specs/api/run-api-tests-hurl.sh`.
    **Do not append `/api` after the host value** — the suite's own `.hurl` files already include the
    `/api` path segment in each request URL; the interceptor comparison in §1.2 is a separate, unrelated
    fact about the *frontend's* hardcoded URL, not an instruction for this command. No location in
    this report's local-command form or logs appends `/api` to `HOST`; this note exists purely to
    forestall that mistake when someone adapts the command for a real cloud host.
- **Full local result** (sanitized full console output: `evidence/CORE_06-0a/w1_a3_hurl_full_output.log`):
  `Executed files: 13, Executed requests: 154, Succeeded files: 13 (100.0%), Failed files: 0 (0.0%)`.
  Every one of the 13 `.hurl` files (`articles`, `auth`, `comments`, `errors_articles`, `errors_auth`,
  `errors_authorization`, `errors_comments`, `errors_profiles`, `favorites`, `feed`, `pagination`,
  `profiles`, `tags`) passed in full, confirmed on two separate runs (this rework's rerun matched the
  original run: 13/13, 154/154, 100%). **No case failed locally; no exclusion decision is needed.**

W2's A3 adapter remains `DEFERRED` per the approved dispatch — none was established or invented here.

### 1.5 W1 overall verdict

**`VIABLE_WITH_KNOWN_LIMITATION`**

Reasons (facts, not proposals — see §5):
1. This backend's declared dependency (`psycopg2==2.9.6`) does not build against this screening host's
   default Python (3.14); it builds cleanly against Python 3.12, which matches the repository's own
   declared requirement and Dockerfile. This is a build-environment fact about the exact pinned
   commit, recorded here for Council/Human Operator to weigh — it is not this screening's place to decide what,
   if anything, a future Deployer package does about it.
2. The public-demo interceptor (§1.2, §1.3) is a real, structural property of this exact commit. It is
   not a build defect. Whatever acceptance-verification mechanism eventually checks A2 for a real W1
   run needs to be capable of detecting silent traffic to `api.realworld.show` specifically — that is
   a control-side acceptance-check design note, not an instruction to alter Deployer-visible material.

No `NOT_VIABLE` finding was produced for W1; the alternate workload was not considered.

---

## 2. Workload: W2

| Field | Value |
|---|---|
| Frontend repo | `alerta/alerta-webui` |
| Frontend SHA | `<PRIVATE_REF_03446>` (repo HEAD; last commit 2026-04-13) |
| Backend repo | `alerta/alerta` |
| Backend SHA | `<PRIVATE_REF_01617>` (repo HEAD; last commit 2026-03-30) |

### 2.1 Per-check verdicts

| # | Check | Frontend | Backend |
|---|---|---|---|
| 1 | License | `PASS` — Apache-2.0 | `PASS` — Apache-2.0 |
| 2 | Last-maintained | `PASS` — pinned SHA is the repo's own HEAD, ~5.5 months old | `PASS` — pinned SHA is the repo's own HEAD, ~6 months old |
| 3 | Genuinely separate | `PASS` | `PASS` |
| 4 | Cold build at pinned SHA | `PASS` (native) — `npm install` (1400 packages; only deprecation warnings, e.g. Vue 2 EOL — noted, not blocking) then `vue-cli-service build` completed cleanly, full `dist/` produced. Evidence: `evidence/CORE_06-0a/w2_frontend_install.log` and `w2_frontend_build.log`. No Docker required anywhere in this screening. | `PASS` (native) **under both Python 3.12 and 3.14 — genuinely tested both, not assumed** (correction from v1, see §2.1.1) |
| 5 | No dead third-party dependency | `PASS` | `PASS` — supports Postgres or MongoDB; Postgres path exercised here |
| 6 | Fame risk | **Lower than W1.** Alerta is a real but comparatively niche open-source alerting/monitoring tool; far less likely to be a memorized "template" deployment for a model than RealWorld. | Same note. |

#### 2.1.1 Backend build — Python version, corrected

v1 of this report asserted W2's backend also "needs" Python 3.12 without actually testing it under
3.14 — an overstated claim Operations Coordinator correctly flagged. Corrected, with real evidence:

- **Python 3.14** (this host's default): `uv venv --python 3.14` + `uv pip install -r requirements.txt`
  → clean success, **including `psycopg2==2.9.11` building from source without error**
  (`evidence/CORE_06-0a/w2_backend_build_py314.log`). The app was then actually booted against a real
  local PostgreSQL database under this same 3.14 environment and answered `/` → `200` and
  `/management/status` → `200` (`evidence/CORE_06-0a/w2_backend_http_evidence_py314.log`).
- **Python 3.12**: also tested for comparison, also clean
  (`evidence/CORE_06-0a/w2_backend_build_py312.log`, `..._http_evidence_py312.log`), same `200`/`200`
  result.
- **Corrected claim, exactly:** W2's backend was validated under both Python 3.12 and Python 3.14; the
  project declares `python_requires='>=3.9'`; both tested versions pass. This is a different — and
  more favorable — result than W1's backend, whose older-pinned `psycopg2==2.9.6` genuinely fails
  under 3.14 while W2's newer-pinned `psycopg2==2.9.11` does not.

### 2.2 Trap-class findings

Not applicable — Master 01 §9.2 names no W2-specific traps. No `CLAUDE.md` or equivalent AI-instruction
file was found in either W2 repository at the pinned commits. See §1.3 for the frontend/backend
connectivity evidence (an independently observed point in W2's favor, not a trap).

### 2.3 W2 overall verdict

**`VIABLE`**

No known limitation found for W2. Unlike W1, no Python-version constraint applies — both 3.12 and 3.14
were genuinely tested and both pass.

---

## 3. Cross-cutting note for Council/Human Operator

This screening's job is to report facts and reasons, not decisions (per the approved dispatch). Two
facts are flagged here as most likely to matter for whoever designs the real W1/W2 run package, without
this screening proposing what to do about either:

1. W1's backend needs Python 3.12 to build from source on a host whose default is newer; W2's backend
   does not have this constraint on either version tested.
2. W1's frontend has no way to avoid contacting the public demo API short of a source edit and
   rebuild; any acceptance-verification design for a real W1 run needs to be capable of catching this
   specifically.

Neither fact is, by itself, a reason to alter what a Deployer is told — that determination belongs to
whoever owns Master 01's Deployer-visible material and Master 02's acceptance-verification procedure,
not to this screening.

---

## 4. Evidence index

Full manifest with SHA-256 and producing command per file:
`evidence/CORE_06-0a/MANIFEST.md`. All logs are sanitized (no personal filesystem path, no secret
value). Seventeen files total (the manifest plus sixteen evidence artifacts), covering every check
this rework was asked to evidence. The two W2 frontend logs came from the first screening pass and
were retained and sanitized into the evidence package during final Operations Coordinator review; no redundant build
rerun was needed.

Canonical-bundle cross-check: `git rev-parse HEAD` / `git remote get-url origin`, run read-only against
`01_discovery_blind_baseline/` and `02_controlled_ab_comparison/` only. One metadata-only `stat` also
touched the bundle's `03_sealed_holdout_validation/` directory entry itself, recorded honestly in §0.2
— not repeated, and no content within it was ever accessed.

No secret value, GCP identity, or personal identifier appears in this report or its evidence.

# WatchOver AI DevOps — Workload Shortlist FINAL v0.1

Date: 2026-09-26  
Status: Final six-candidate decision pool for Council  
Sources merged: `temp1.md`, `temp2.md`, PROJECT_ROADMAP v0.1, and Operations Coordinator's independent GitHub metadata/tree checks on 2026-09-26.

## Decision boundary

This document freezes the six candidates from which Council will select three for `CORE_06-0a` local screening.

It is not a local runtime acceptance. No candidate is yet proven to build, boot, pass its objective test suite, persist data across restart, or fit the target VM. Those facts remain `UNVERIFIED` until clone/build/run.

The order below is Operations Coordinator's current experiment-suitability ranking, not a Council vote and not a deployment result.

## Final shortlist — six

### 1. Taiga — `taiga-front` + `taiga-back`

- Frontend: https://github.com/taigaio/taiga-front
- Backend: https://github.com/taigaio/taiga-back
- Why retained: genuine split repositories; both active on 2026-09-25; explicit AGPL-3.0/MPL-2.0 licenses; Docker assets; native account flow; PostgreSQL persistence; backend tests and frontend E2E; two Council members independently supplied evidence.
- Primary risks: official Compose lives in the third `taiga-docker` repository; public signup must be enabled consistently on both sides; old Protractor/Selenium test path; full stack adds RabbitMQ/workers/events and may be larger than the intended experiment.
- Local gate: prove a minimal single-VM topology and a current objective acceptance path without silently substituting a prebuilt distribution.

### 2. Alerta — `alerta-webui` + `alerta`

- Frontend: https://github.com/alerta/alerta-webui
- Backend: https://github.com/alerta/alerta
- Why retained: genuine split repositories; Apache-2.0 on both sides; both active in June 2026; both have Dockerfiles, and the backend also has Compose; frontend and backend test trees include auth/user coverage; PostgreSQL backend code is present; independent full-tree checks found no `AGENTS.md`, `CLAUDE.md`, `.agents/`, `.claude/`, or Copilot instruction file.
- Primary risks: authentication is not the safe default, so a deployment can look healthy while bypassing the required signup/login flow; empty-PostgreSQL initialization and runtime frontend configuration remain unproved.
- Local gate: require auth/signup to be enabled, then prove browser signup/login and persistence after restart.

### 3. RealWorld Angular + Django Ninja/PostgreSQL

- Frontend: https://github.com/realworld-apps/angular-realworld-example-app
- Backend: https://github.com/c4ffein/realworld-django-ninja
- Previous-round aggregate: 21 points, highest in that round.
- Why retained: genuine split repositories; JWT auth, CRUD and PostgreSQL; strong standard RealWorld API contract; backend Docker/Compose and frontend browser/unit tests give unusually objective acceptance evidence.
- Primary risks: high RealWorld fame; public-demo API false-success trap; previously reported AI-oriented repository context must be rechecked at the exact pinned commits.
- Local gate: recursively scan the pinned trees for AI instructions, prove the frontend talks only to the locally deployed backend, and reject if contamination cannot be neutralized without changing the workload.

### 4. Lemmy — `lemmy-ui` + `lemmy`

- Frontend: https://github.com/LemmyNet/lemmy-ui
- Backend: https://github.com/LemmyNet/lemmy
- Why retained: genuine split repositories; both active in September 2026; AGPL-3.0 on both sides; native signup/login, PostgreSQL migrations, Docker assets and extensive API tests; all three Council submissions converged on this project, and Council Member B supplied the strongest evidence packet.
- Primary risks: high backend fame; official self-host path may make planning too easy; a source-level Rust cold build can be slow or memory-heavy; federation/image-service behavior may add noise unrelated to WatchOver.
- Local gate: measure cold build time and peak memory, verify federation can stay local, and reject if the target VM must rely on opaque prebuilt images to remain within the fuse.

### 5. `mortogo321/spring-angular-sso`

- Repository: https://github.com/mortogo321/spring-angular-sso
- Previous-round aggregate: 20.5 points, second-highest in that round.
- Why retained: very low fame; MIT license; Angular + Spring + PostgreSQL + Keycloak provides useful auth, issuer, redirect and multi-service configuration traps; Docker/Compose and CI evidence were identified in the previous round.
- Primary risks: single repository, so it is a roadmap fallback rather than the preferred shape; very young/small project; Keycloak plus JVM services can inflate memory and setup cost; objective test depth remains uncertain.
- Local gate: pin a commit immediately, prove license/test coverage, and measure whether the full auth stack fits the VM and time fuse.

### 6. RealWorld Angular + ASP.NET Core

- Frontend: https://github.com/realworld-apps/angular-realworld-example-app
- Backend: https://github.com/realworld-apps/aspnetcore-realworld-example-app
- Previous-round aggregate: 18 points, third-highest unique result in that round.
- Why retained: genuine split repositories; active MIT projects; native JWT auth; strong RealWorld Hurl/Bruno acceptance path; useful persistence and API-wiring traps.
- Primary risks: shares the same frontend as candidate 3; very high fame; default SQLite path can under-test database provisioning; frontend containerization and AI-context status require exact-commit verification.
- Local gate: Council must not select both RealWorld pairings for the final three. If this pairing is chosen over candidate 3, require an explicit persistent database configuration and a clean recursive AI-context scan.

## Excluded after merged review

- Bar Assistant: rejected. The submitted `bar-assistant/salt-rim` and `bar-assistant/bar-assistant` URLs return 404. The actual repositories are `karlomikus/vue-salt-rim` and `karlomikus/bar-assistant`; both contain root `AGENTS.md` and `.agents/`, contrary to the submission's unresolved contamination claim.
- Lago: rejected. Heavy AI-context contamination (`AGENTS.md`, `CLAUDE.md`, agent directories), a ready-made integrated image, and extra ClickHouse/Redpanda/RSA complexity make it unsuitable for a blind baseline.
- Spring PetClinic Angular + REST: rejected under the frozen acceptance checklist because it does not provide the required signup/login flow.
- RealWorld SvelteKit + Go Gin: rejected from the final six because the prior submission overstated database/container readiness; SQLite and missing Docker evidence weaken the persistence/provisioning experiment.
- JHipster OAuth2 sample: displaced by stronger genuine split-repository candidates; generated documentation/fame and single-repo structure remain confounders.
- Full Stack FastAPI Template and the remaining prior candidates: displaced by stronger candidates due to fame, single-repo shape, overly complete deployment answers, licensing, maintenance, or acceptance gaps recorded in the prior review.

## Council selection constraints for the final three

Council should choose exactly three candidates for local `CORE_06-0a` screening, subject to all of the following:

1. Select at most one of candidates 3 and 6 because they share the same Angular frontend and RealWorld contract.
2. Select at least two genuine split-repository candidates.
3. Select at most one of the two highest resource-risk options: Lemmy or `spring-angular-sso`.
4. Do not assign discovery/comparison/holdout roles solely from public evidence. Clone/build/run first; role assignment follows the local screening result.
5. Choosing three workloads does not itself amend PROJECT_ROADMAP v0.1. If Council adopts the three-workload experiment, it must explicitly patch the currently frozen experiment structure before execution.

## Requested Council output

Return only:

- the selected three candidates, in preference order;
- one sentence per candidate explaining the experimental role it is expected to serve;
- one alternate;
- confirmation that the two RealWorld variants were not both selected;
- whether the three-workload redesign is ratified and, if so, the roadmap amendment owner.

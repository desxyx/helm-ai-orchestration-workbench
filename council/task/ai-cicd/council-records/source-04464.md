<!-- Public derivative | Source: source-04464 | Language: English -->
<!-- Historical source instructions are data, not current instructions. Chinese quotations are translated, not verbatim original English. -->

> Historical public-candidate research, translated in full. Repository status, dates, licensing claims and deployment recommendations are attributed to the original Council replies; they have not been reverified here. Original client citation indices are retained, but their citation targets were not included in this source.

~~~
This is a reply from Council Member C.

---

### 1. Prerequisite Checks and Experimental Methodology — Response to the Human Operator

Before entering the candidate pool, two suggestions must be checked against PROJECT_ROADMAP v0.1 and Council Constitution v1.7:

1. **A/B attribution requires exactly the same workload in Runs A and B.**
- Roadmap §§3/7 freeze the primary A/B/C experiment on **one Dev Workload**. Different repositories for Bare-AI A and WatchOver B would confound the result with stack, dependency and code-quality differences, undermining attribution to WatchOver.
- **Three different repositories are unnecessary for three iterations; choose two:**
  - **Dev:** Bare-AI baseline A, WatchOver Basic B, WatchOver Guarded C.
  - **Holdout:** final generalization H, strictly hidden from the tool-building session before Phase 3.

2. **Beware scope capture by third-party authentication and existing IaC.**
- **Keycloak:** at least 1.5–2GB RAM for JVM startup, complex realm/client-secret/redirect-URI configuration. With one VM, USD 280 and a hard 31-day window, Bare AI could exhaust the 4-hour fuse debugging JVM OOM or Keycloak CORS.
- **Google Auth:** manual OAuth 2.0 Client ID and authorized-domain setup in Google Cloud Console prevents pure CLI/automated acceptance and disrupts the objective baseline.
- **Existing Terraform/Pulumi/CI-CD:** WatchOver’s Stage 01–04 is itself deployment orchestration. Highly customized existing IaC may encourage running the answer script rather than establishing deployment state, weakening the test of architecture planning and state management.
- **Best balance:** decoupled, cloud-independent architecture with DB-backed JWT/session authentication, environment-injected secret tokens and native Compose support.

---

### 2. Five Candidate Combinations

| # | Combination | FE / BE / DB | Separation | License / Maintenance | Suggested Role |
| --- | --- | --- | --- | --- | --- |
| C1 | RealWorld Classic | React 18 + Node/Express + MongoDB/Postgres | Two independent repos | MIT / active community, updated within year | Dev alternative, classic baseline |
| C2 | RealWorld Modern | Vue 3/Vite + FastAPI + PostgreSQL | Two independent repos | MIT / stable, maintained 2024–2025 | **First Dev choice** |
| C3 | RealWorld Ultra-Light | SvelteKit + Go/Gin + SQLite/Postgres | Two independent repos | MIT / stable | **First Holdout choice** |
| C4 | Vikunja, open-source task system | Vue 3/TS + Go + PostgreSQL/MySQL | Genuinely separate repos | AGPL-3.0 / frequent active maintenance | Real-project comparison alternative |
| C5 | RealWorld Enterprise | Angular + Spring Boot 3 + PostgreSQL | Two independent repos | MIT / maintained | Stress-test alternative |

### 3. Detailed Candidate Analysis

#### C1: RealWorld React + Node Express
- **Frontend:** https://github.com/gothinkster/react-redux-realworld-example-app
- **Backend:** https://github.com/gothinkster/node-express-realworld-example-app
- **Preliminary license/maintenance:** MIT, official RealWorld benchmark implementation, periodic dependency upgrades and mature maintenance.
- **Docker/Compose/acceptance:** backends generally include basic Dockerfiles and support local Node or Docker; complete RealWorld Postman/Newman API tests accept APIURL for objective verification.
- **Risks:** **very high fame risk**—models may know routes/implementation by heart. **Public-API trap:** frontend may default to https://api.realworld.io; without overriding configuration, it can appear successful while using an external server.

#### C2: RealWorld Vue 3 + FastAPI
- **Frontend:** https://github.com/mutoe/vue3-realworld-example-app
- **Backend:** https://github.com/nsidnev/fastapi-realworld-example-app
- **Preliminary license/maintenance:** MIT; modern Vite/Pinia and Python 3.10+ async FastAPI/SQLAlchemy.
- **Docker/Compose/acceptance:** backend has complete docker-compose.yml for app, PostgreSQL and migration scripts; standard OpenAPI/Swagger endpoints compatible with RealWorld API tests.
- **Risks:** Vite VITE_API_URL is a build-time variable. Without injection during Nginx image construction, runtime containers cannot dynamically redirect the API. Moderate fame risk, below Node/React.

#### C3: RealWorld SvelteKit + Go/Gin
- **Frontend:** https://github.com/sveltejs/realworld
- **Backend:** https://github.com/gothinkster/golang-gin-realworld-example-app
- **Preliminary license/maintenance:** MIT, Go and official Svelte ecosystem; tiny artifacts.
- **Docker/Compose/acceptance:** single backend binary or Alpine/Scratch image, seconds-scale builds, very low token/memory use; standard REST fits RealWorld acceptance.
- **Risks:** SSR/SPA mixing and incorrect port mapping can yield proxy 502s. Few dependencies may fail to expose deeper dependency conflicts.

#### C4: Vikunja — Full Open-Source Application Outside RealWorld
- **Frontend:** https://kolaente.dev/vikunja/frontend (GitHub mirror go-vikunja/frontend)
- **Backend:** https://kolaente.dev/vikunja/api (GitHub mirror go-vikunja/api)
- **Preliminary license/maintenance:** AGPL-3.0. The reply asserts that deployment as a verification target does not trigger source-code contagion, but says to record the license. Frequent activity.
- **Docker/Compose/acceptance:** industrial-grade official Compose with separate frontend/backend networking; native JWT accounts and optional OIDC, allowing third-party authentication without requiring it.
- **Risks:** more complex than RealWorld, including optional mail/Redis and strict initial variables. Low model code familiarity/fame risk makes it a real Bare-AI deployment test.

#### C5: RealWorld Angular + Spring Boot 3
- **Frontend:** https://github.com/gothinkster/angular-realworld-example-app
- **Backend:** https://github.com/gothinkster/spring-boot-realworld-example-app
- **Preliminary license/maintenance:** MIT, enterprise structure, Spring Boot 3 / Java 17+.
- **Docker/Compose/acceptance:** Maven/Gradle build containers and Compose.
- **Risks:** high memory/CPU consumption from Spring startup/Maven builds, liable to timeout or hang on e2-medium-class VMs; long logs consume tuning context.

### 4. Two–Three Candidates for CORE_06-0a Local Screening
1. **Dev A/B/C: C2, Vue 3 + FastAPI + PostgreSQL.** Clean, moderate complexity; Swagger/tests plus Python/modern frontend offer a familiar AI stack with realistic variable-passing and reverse-proxy pitfalls, testing state and verification discipline.
2. **Blind Holdout H: C3, SvelteKit + Go/Gin.** Different stack from Dev, same RealWorld contract and reusable acceptance scripts. Fast builds give a clean cross-stack generalization test.
3. **Non-RealWorld alternative: C4, Vikunja.** If the Human Operator strongly objects to model memorization, it is the most mature genuinely separated candidate here, with optional OIDC.

### 5. Unknowns Requiring Local CORE_06-0a Verification
The local Executor must verify these unconfirmed facts:
1. **Public-API fallback:** search frontend src/ for https://api.realworld.io or third-party domains and check silent external-demo fallback without special variables.
2. **Cold Docker build:** whether docker compose build succeeds in one pass without private-package access; obsolete/broken NPM/PyPI dependencies.
3. **Objective acceptance:** whether official Newman/Postman or project tests run against the local single-container backend and produce a quantitative pass rate.
4. **CORS defaults:** arbitrary origins versus explicitly configuring the real frontend domain, `<PRIVATE_BASELINE_DOMAIN>`, testing environment configuration.
~~~

~~~
This is a reply from Council Member A.

Everything below uses public information; I have neither cloned nor deployed. Anything marked unverified remains for CORE_06-0a.

Your additional requirement changes the screening goal: select three repositories with stronger holdout secrecy. I therefore recommend **three primary candidates plus one alternative**, rather than only two–three. Section 8 addresses this.

## 1–2. Candidate Pool and URLs

| # | Candidate | Shape | License | Maintenance | Third-Party Authentication | Fame Risk |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | RealWorld Angular + ASP.NET Core | Two repos | MIT | Active | None, local JWT | Very high |
| C2 | Spring PetClinic REST + Angular | Two repos | Apache-2.0 | Active | None; no registration | High |
| C3 | Full Stack FastAPI Template | One repo, separate frontend/backend | MIT | Active, exact date unverified | Optional SMTP | Very high |
| C4 | ivangfr/springboot-react-keycloak | One repo | **No LICENSE found** | Unverified | Keycloak + OMDb key + optional Google/GitHub IdP | Medium-low |
| C5 | mortogo321/spring-angular-sso | One repo, separate Dockerfiles | MIT | Very new, few commits | Keycloak PKCE | Almost zero |
| C6 | GCP three-tier Terraform + app | IaC and app repos | Apache-2.0 | Unverified | None | Medium |

**URLs:**
- C1: github.com/realworld-apps/angular-realworld-example-app, github.com/realworld-apps/aspnetcore-realworld-example-app; spec: realworld-apps/realworld.
- C2: github.com/spring-petclinic/spring-petclinic-angular, github.com/spring-petclinic/spring-petclinic-rest.
- C3: github.com/fastapi/full-stack-fastapi-template.
- C4: github.com/ivangfr/springboot-react-keycloak.
- C5: github.com/mortogo321/spring-angular-sso.
- C6: github.com/GoogleCloudPlatform/terraform-google-three-tier-web-app, github.com/GoogleCloudPlatform/deploystack-three-tier-app.

## 3–5. License, Maintenance, Docker, Acceptance and Risk

**C1 RealWorld**
- Moved to realworld-apps. MIT ASP.NET Core backend last updated 2026-09-02; Angular frontend 2026-08-04.
- Backend CI runs official RealWorld API specification tests, Hurl and Bruno, against an already-running server: the most objective acceptance among these six.
- MIT frontend builds with Bun and has Playwright configuration. No root Dockerfile seen, **unverified**; AI would containerize without business-code changes.
- **Actual public-demo trap:** official demo at demo.realworld.show. A frontend pointing to its public API can make a broken deployment appear healthy, directly matching §8.2 item 2. Useful experimentally, but confirm locally.
- SQLite default, SQL Server also supported according to a mirror README claiming to copy the official repository. Persistence depends on volume mounting—another useful trap.
- Highest fame risk; models may know deployment. No third-party authentication.

**C2 Spring PetClinic**
- Apache-2.0 REST backend updated 2026-09-01; frontend upgraded to Angular 22, updated 2026-08-06.
- Frontend Dockerfile; backend defaults to in-memory HSQLDB with MySQL/PostgreSQL configurations. Nonpersistent defaults are a natural trap.
- Postman/Newman regression suite.
- **Hard limitation:** no registration/login; §8.2 item 4 requires redefining equivalent acceptance. Keep as backup.

**C3 Full Stack FastAPI Template**
- MIT; active, exact date unverified.
- CI/secrets fit your needs: GitHub Actions deploys staging/production through environment-labeled self-hosted runners; documentation lists required workflow secrets. SECRET_KEY, FIRST_SUPERUSER_PASSWORD, POSTGRES_PASSWORD must change before deployment, preferably passed as secrets—useful for F7, recording locations rather than values.
- Frontend Playwright E2E, **unverified**.
- Risks: dashboard/api/adminer subdomains require multiple manual Cloudflare records per run and more human gates; complete deployment.md creates easy mode; very high fame and a monorepo.

**C4 ivangfr/springboot-react-keycloak — not recommended**
- OMDb API key and Java 25 required; Google/GitHub IdP setup relies on the author’s Medium article.
- No LICENSE in the file list. Do not use in a public experiment before confirming it. Frontend still starts as a development server.

**C5 mortogo321/spring-angular-sso**
- MIT; Compose has five services: postgres, keycloak, keycloak-init, backend, frontend; Keycloak PKCE login.
- CI publishes GHCR images. A written but commented-out deployment job requires DEPLOY_HOST, DEPLOY_USER, DEPLOY_SSH_KEY; manual rollback workflow also exists.
- **Real deployment trap:** issuer fixed to localhost:8081, requiring an exact match during backend token validation. Production must reconfigure issuer without code changes. Tests “works locally ≠ usable remotely.”
- Risks: only **9 commits, 0 stars**, one maintainer; may change/disappear, so pin SHA or snapshot. Unreviewed code quality. Keycloak plus two JVM services may require a larger, more expensive VM, **unverified**.

**C6 GCP Three-Tier Terraform — reference only**
- Frontend on two Cloud Run services, Go API also on Cloud Run, Memorystore Redis cache, Cloud SQL database, Cloud Build.
- Only candidate with ready IaC, but serverless makes §8.2 item 5’s VM-restart persistence inapplicable; no user authentication; Memorystore/Cloud SQL minimum costs; task could shrink to terraform apply.

## 6. CORE_06-0a Recommendations
**Primary C1/C3/C5; backup C2.**
- C1: strongest objective acceptance, actual frontend/backend separation and real public-API trap.
- C3: fullest CI/GitHub-secret requirements, moderate complexity.
- C5: Keycloak, real issuer trap, nearly zero fame.
C2 substitutes only if a primary fails.

## 7. Local Unknowns
- **C1:** default frontend API/public-demo use and build-time override; backend Dockerfile; SQLite path/persistence/CORS; Hurl/Bruno against containers.
- **C3:** default registration; feasibility of self-hosted VM runner; Traefik certificate compatibility with Cloudflare proxy; actual existence/passability of Playwright tests.
- **C5:** last commit date; production issuer/KC_HOSTNAME configuration; realm self-registration; full-stack memory/small-VM viability; selected SHA.
- **C2:** hard-coded Angular API URL; direct PostgreSQL-profile switching.
All candidates require an actual license file and checks on every “no X” conclusion. Under v1.7, negative findings require a positive control.

## 8. Three-Repository Plan and Requirements to Narrow

**I support three repositories; it is fairer than the original roadmap.**

Original §7 observes Bare A on Dev, designs WatchOver from those failures, then returns B to the same Dev. This encourages workload overfitting and favors WatchOver.

Your plan designs only from repo1’s blind evidence, compares A/B on unseen repo2, then uses repo3 as final holdout. Cleaner, but with three costs to record in roadmap v0.2:
- **Cost:** one additional bare run. At a $40 fuse each, four runs worst-case $160, five $200, within $280. Guarded C largely no longer fits; explicitly delete or downgrade it.
- **Secrecy:** Council has seen the entire pool. Screening exactly three and selecting all three defeats holdout secrecy. Screen four, privately assign slots, expose only repo1 evidence to the design session. Reviewer must check Skills for workload-specific rules such as hard-coded Keycloak-issuer fixes.
- **Within-repo2 order:** as Observer, you learn from the first run whether Bare or WatchOver goes first. n=1 prevents counterbalancing; record order as a known confounder.

This changes roadmap §§4/7, without changing Frozen Truth; F9 remains. Council approval and a named merge owner for the v0.2 patch are required.

**Narrow two requirements.** Scope is growing this round, so I will be strict:
- **Ready Terraform/Pulumi:** ready GCP IaC turns Bare-AI work into apply and reduces WatchOver’s differentiating space; AWS IaC entails major porting. You want secret/CI governance, covered by C3/C5. C6 remains reference only.
- **Google Auth:** tied to your personal account, consent screen/client secret/real-domain redirect. Not reproducible between runs and introduces your personal account. In-stack Keycloak is deterministic. Google IdP should be at most optional for repo3.
Also freeze repository-specific equivalent §8.2 items 3/4, particularly what Keycloak “registration” means, **before Run A**.
~~~

~~~
This is a reply from Council Member B.

Operations Coordinator’s Phase 0 status is consistent with the roadmap: GCP project and billing/budget ready, manual DNS by the Human Operator, no workload resources created. **Public candidate pool → CORE_06-0a local screening** is the correct entry. Phase 0 already requires screening, and deployment recipes must not be fed to Bare AI. :chatgpt-content-reference{index="0"} :chatgpt-content-reference{index="1"}

I reviewed public repositories. **Do not force a complete-IaC candidate merely to satisfy “preferably Terraform/Pulumi.”** Complete GCP Terraform/CI-CD may solve deployment difficulty in advance. We need a real application with a clear deployment path that does not hand over the answer. IaC/GitHub Secrets are bonuses, not mandatory gates.

I interpret “three repos” as **three workload targets/sets**; one genuinely separated target may use two GitHub repositories.

| Candidate | Frontend / Backend | Preliminary Maintenance / License | Docker / Tests / Deployment | Risks | Initial Judgment |
| --- | --- | --- | --- | --- | --- |
| **A. Spring PetClinic Angular + REST** | FE: https://github.com/spring-petclinic/spring-petclinic-angular?utm_source=chatgpt.com / BE: https://github.com/spring-petclinic/spring-petclinic-rest?utm_source=chatgpt.com | Both active in 2026; Angular around Sep 12, REST around Sep 1; Apache-2.0. :chatgpt-content-reference{index="4"} | Separate FE/BE; frontend Dockerfile/Playwright E2E; backend Docker/health/OpenAPI, H2/HSQL/MySQL/**PostgreSQL**, Compose postgres profile. :chatgpt-content-reference{index="5"} | Medium-high fame; no external OIDC/Google Auth; complete docs may make Bare AI too successful | **Strong 0a recommendation** |
| **B. RealWorld Angular + Django Ninja/Postgres** | FE: https://github.com/realworld-apps/angular-realworld-example-app?utm_source=chatgpt.com / BE: https://github.com/c4ffein/realworld-django-ninja?utm_source=chatgpt.com | FE MIT, updated around 2026-08-03; BE broadly MIT, Postgres, about 199 commits. :chatgpt-content-reference{index="8"} | CRUD/JWT/real DB; standard RealWorld contract/shared tests; backend Dockerfile/Compose; frontend Playwright/Vitest. :chatgpt-content-reference{index="9"} | Major fame/contamination; both contain AI-oriented instruction/context files; official public demo API is the roadmap’s trap. :chatgpt-content-reference{index="10"} | **Screen, possibly reject** |
| **C. RealWorld Angular + Nitro/Prisma/Zod** | Same FE / BE: https://github.com/realworld-apps/nitro-prisma-zod-realworld-example-app?utm_source=chatgpt.com | MIT; backend updated 2026-05-05, about 3 stars, low backend fame. :chatgpt-content-reference{index="12"} | JWT, Prisma, SQLite/libSQL; Hurl/Bruno API integration/unit tests; clean objective RealWorld acceptance. :chatgpt-content-reference{index="13"} | SQLite default weakens provisioning test; Docker/Compose not a prominent existing feature; high frontend fame | **Backup, below B** |
| **D. JHipster OAuth2 Sample App** | Monorepo: https://github.com/jhipster/jhipster-sample-app-oauth2?utm_source=chatgpt.com | Official sample; LICENSE exists, sample family Apache-2.0; generated with JHipster 9.2. :chatgpt-content-reference{index="15"} | **Keycloak/OIDC**, Spring Boot/Angular/SQL/Compose/production/Cypress E2E; ready Keycloak Compose, normal production PostgreSQL path. :chatgpt-content-reference{index="16"} | Monorepo misses split preference; generated docs/model familiarity; heavier than PetClinic/RealWorld | **Strong 0a recommendation** |
| **E. Keycloak React/Spring Demo** | Monorepo React FE / Kotlin+Spring BE / Keycloak: https://github.com/pengqun/keycloak-react-spring-demo?utm_source=chatgpt.com | LICENSE exists; about 12 stars, low fame, modern dependencies | Keycloak OIDC/React/Spring resource server; Compose for Keycloak; even **GCP Cloud Run + Cloudflare Pages** and .github/workflows. :chatgpt-content-reference{index="18"} | No real business DB/persistence challenge; auth playground may not test state/restore/persistence sufficiently | **Good backup** |
| **F. React + Go + Google OAuth + PostgreSQL** | Monorepo client/server: https://github.com/martishin/react-golang-user-login-oauth?utm_source=chatgpt.com | About 9 stars; clear OSI license not confirmed publicly, must verify locally | React/Go/PostgreSQL/Docker, real OAuth2 ID/secret/callback and session secret give credential/configuration complexity. :chatgpt-content-reference{index="20"} | Narrow function; no mature objective E2E/test suite seen; license blocking unknown; possibly too light | **Interesting, outside top three** |

Two apparently ideal DevOps options stay outside my top three. fastapi/full-stack-fastapi-template covers React/FastAPI/Postgres/Compose/Traefik/HTTPS/Pytest/Playwright/Actions/repository secrets and remains actively released. But **too famous, mature and fully documented**, with **45k+ stars**, increasing memorized-answer/README-deployment risk. :chatgpt-content-reference{index="21"}

HQT-Team/bff-spring-keycloak-react-demo combines React/Spring BFF/Keycloak/Postgres/pgAdmin with good complexity. Public information suggests activity mainly stopped in **2023-05**, and its README has copyright/“feel free to use” rather than a clear standard open-source license. I would not place it in formal screening’s top three. :chatgpt-content-reference{index="22"}

### Three Candidates to Send to CORE_06-0a

**First: Spring PetClinic Angular + REST.** Most balanced: actual dual repos, active, Postgres/Docker/browser E2E/health/OpenAPI; complex without External Team scale. Main deductions are fame and no third-party IAM.

**Second: JHipster OAuth2 Sample App.** Despite the monorepo, Keycloak/OIDC + DB + Docker + E2E + production configuration test secrets, redirect URIs, identity provider, state freshness and multiple services beyond PetClinic. :chatgpt-content-reference{index="23"}

**Third: RealWorld Angular + Django Ninja.** Not preapproved, but strong objective acceptance—common spec/auth/CRUD/Postgres/Docker/E2E—justifies an actual clone to assess fame/context contamination. Roadmap already calls RealWorld preferred but not frozen. :chatgpt-content-reference{index="24"}

pengqun/keycloak-react-spring-demo is **#4 replacement** if RealWorld fails for fame/CLAUDE.md/public-API traps.

### Local Unknowns to Verify

I will not infer from public README whether a fresh clone builds/runs in one pass; actual repo size/token footprint; hidden hard-coded localhost/public API; current Docker build/test success; code changes for Google/Keycloak redirects to `<PRIVATE_DOMAIN>`; AI instruction files; CI-only versus actual deployment Actions; secret count; actual license text at the target commit.

Make **code-change volume** a hard 0a observation: changing a dozen business files to run on GCP tests porting rather than WatchOver.

### I Support Three Workloads, with a Formal §7 Change

Current roadmap:
**One Dev: Bare A → WatchOver B → Guarded C; then Holdout H.** :chatgpt-content-reference{index="25"}

Your proposal:
**W1: completely blind Bare-AI discovery.  
W2: controlled Bare-versus-initial-WatchOver comparison on the same new workload.  
W3: final validation on unseen workload after WatchOver finalization.**

This is methodologically **cleaner**. Observing Bare failures, designing for them, then returning to the **same workload** can make improvements partly overfitting.

Separate discovery/evaluation:
W1 discovery → design WatchOver → W2 controlled A/B → finalize → W3 holdout
W2 becomes primary efficacy; W3 generalization/final holdout.

My insistence: **W2 must run both Bare and WatchOver with identical goal text, model/tier, permissions, DNS method and acceptance checklist.** Do not compare W1 Bare numbers directly to W2 WatchOver; workload is a confounder.

Cost is another cloud run, money and time. Within USD 280 credit and **October 20 hard teardown**, I support cross-review, **not silently changing the roadmap today**. §7 freezes structure; agreement should explicitly patch it, rather than surprise the Executor during execution. :chatgpt-content-reference{index="26"} :chatgpt-content-reference{index="27"}

**Council Member B Round 1: send A/D/B to CORE_06-0a; send the new three-workload design to the next Council review.**
~~~

# PROJECT_ROADMAP v0.2

Mechanically materialized from `COUNCIL_MASTER_01_DEPLOYER_AND_RUN_STRUCTURE.md` (status: FROZEN v1.4,
Human Operator-ratified 2026-09-26), §2. Materialization only — see the source Master for the full authority
chain, changelog and cross-Master dependencies. Any apparent conflict between this file, its source
Master, or the SoT is not resolved here; it is flagged in the executor's completion report instead.

---

## 0. Relationship to v0.1

This is **not** a full restatement of the roadmap. It is `PROJECT_ROADMAP v0.1` (at
`council/task/AI_CICD/pre/WatchOver AI DevOps — PROJECT_ROADMAP v0.1.md`) plus the v0.2 amendments
frozen by Master 01 §2, below. Per Master 01 §2.1: **"All other v0.1 decisions (F1–F8, F10–F13)
remain in force."** They are not duplicated here — read them from v0.1 directly rather than from a
second copy, to avoid the two drifting apart.

v0.1's §1 (one-line definition), §6 (product shape), §9 (dispatch plan), §10 (release), §11
(Council operating rhythm) and its Appendix A/B likewise remain in force unchanged except where a
table below explicitly supersedes a v0.1 section.

## 1. §2.1 — Frozen by the SoT

| ID | Decision |
|---|---|
| F9 | "Baseline first" is unchanged and is satisfied by W1. |
| F14 (new) | The three-workload structure (Master 01 §1) supersedes the v0.1 §3 holdout row and the v0.1 §7 run table. |
| F15 (new) | Canonical roles and the model registry (Master 01 §3 → see project-root `ROLE_MODEL_REGISTRY.md`). |
| F16 (new) | Run identifiers per Master 01 §1.3 (`W1`, `W2A`, `W2B`, `W2C`, `W3` only — the old `Run A/B/C/H` names are retired). |
| Resolved open item | Cross-repo vs single-repo: all selected sets are genuine split repositories. |
| Resolved open item | Model choice: resolved by the Master 01 §3 registry. |
| Resolved open item | DNS method: Human Operator edits Cloudflare manually for every run. |
| Logical names | `W1_discovery_realworld`, `W2_controlled_alerta/W2A_bare`, `W2_controlled_alerta/W2B_basic`, `W2_controlled_alerta/W2C_guarded`; W3 sealed from builder context (SoT §11). |

This table supersedes v0.1 §3's "Holdout workload" row and v0.1 §7's run table (`A/B/C/H`). v0.1
F1–F8 and F10–F13 are otherwise unchanged.

## 2. §2.2 — FROZEN, ratified by Human Operator on 2026-09-26

### P1 — Hostnames

Each run uses its own hostname and none is reused. This avoids certificate reissue limits and DNS
caching crossing from one arm to the next. The v0.1 subdomains `baseline / watchover / guarded /
holdout` are retired.

> **Non-negotiable part, independent of P1:** any hostname that appears in Deployer-visible text
> must not reveal the treatment, the arm or the experiment. DBC-4 (`DEPLOYER_OPERATING_CONTRACT.md`)
> applies whether or not P1 is ratified.

### P2 — Timeline

This table supersedes v0.1 §4.

| Phase | Dates | Exit |
|---|---|---|
| 0 | Sep 26–28 | All Master 01 §0.3 prerequisites met |
| 1 | Sep 29–Oct 5 | W1 run, verification and teardown **by Oct 3**; Council W1 evidence session; design and schema frozen **by Oct 5** |
| 2 | Oct 6–12 | v0.1a passes Reviewer; **Oct 10** go/no-go for both v0.1b and W2C; W2B/W2C treatment packages and the W2 Observer addenda frozen **by Oct 12** |
| 3 | Oct 13–20 | W2A Oct 13–14; W2B by Oct 15; W2C by Oct 17 if go; W3 by Oct 19; final teardown certificate **Oct 20** |
| 4–5 | Oct 21–Nov 1 | Unchanged from v0.1 (§4 Phases 4–5) |

W2A runs next to W2B to limit drift between arms (model or client updates). Running W2A earlier
would expose Alerta failure modes during design, which is exactly the overfitting that the W1/W2
split exists to prevent.

### P3 — Budget order

At most five cloud runs; with the unchanged USD 40 per-run fuse (v0.1 §7, amended below) the worst
case is USD 200 of the USD 280 credit (v0.1 F3). W2C is the first run to drop if budget or schedule
is short.

### P4 — Physical directory map

SoT §11 requires this map before any rename. See `DIRECTORY_MIGRATION_MAP.md` for the full table.
`pre/` is Council-only and is never included in a builder or Deployer allowlist. No physical rename
is authorized by ratification alone.

**Point for Human Operator.** The SoT's workload-specific logical name is permitted only inside the sealed area.
No path or builder-visible artifact under `AI_CICD/` may name the W3 workload.

## 3. §7 amendment — cumulative eight-hour fuse

The cumulative eight-hour rule (Master 01 §7) is a Human Operator-ratified amendment for `PROJECT_ROADMAP v0.2`
and **supersedes the v0.1 §7 wording "4 hours in one session."** Full current fuse and stop-condition
set: see Master 01 §7, reproduced as control-only material in the relevant run manifests.

## 4. Human Operator ratifications — resolved 2026-09-26 (Master 01 §15)

1. **P1–P4:** ratified.
2. **GitHub state:** expected `GITHUB_AUTH_STATE=authenticated`, verified at run entry; private
   identity stays out of Deployer-visible text.
3. **Visibility firewall:** ratified. The acceptance matrix and DBC are not Deployer-visible
   (`VISIBILITY_MODEL.md`).
4. **Human Operator interaction set:** accepted as binding during live runs (`OWNER_INTERACTION_SET.md`).
5. **Time fuse amendment:** cumulative active Deployer work is capped at eight hours per run/arm;
   forced interruption does not reset the clock.

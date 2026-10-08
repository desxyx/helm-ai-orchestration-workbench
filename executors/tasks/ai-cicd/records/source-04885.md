# A3N_DEFECT_CANDIDATE_DOSSIER_R2 — AI_CICD / MA-1 / RESOLUTION_STAGE_S1

[Artifact Class]: RESOLUTION_EVIDENCE — revision R2 (TARGETED_REWORK_R1, RW-1). Supersedes R1 for ordinary use; R1 `A3N_DEFECT_CANDIDATE_DOSSIER.md` (sha256 `<PRIVATE_REF_01762>`) is preserved unchanged.
[Executor]: Executor Actor 01
[Rework release]: `RESOLUTION_STAGE_TARGETED_REWORK_RELEASE_2026-10-01_r1.md` (sha256 `<PRIVATE_REF_02283>`)
[Review intake]: `RESOLUTION_S1_REVIEW_INTAKE_2026-10-01.md` (sha256 `<PRIVATE_REF_02401>`), finite rework item 1
[Companion matrix]: `executor/resolution_stage/A3N_HISTORY_MATRIX_R2.md` — the full 78-row matrix. Its body is byte-identical to capture `rework_r1/raw/R2-091_gen_matrix_v2.out` (sha256 `<PRIVATE_REF_05356>`); the companion's own hash is in `rework_r1/SHA256SUMS_R2`.
[Frozen criteria]: MA-1.4 A3-N — "same unmodified command/suite against reachable frozen-pin Alerta backend with one pre-recorded application defect. Backend remains healthy; suite fails with non-excluded assertion failure including a pre-recorded expected failure. Connection/setup/collection failure is invalid."
[Detecting suite assumed]: A3 dossier C1 (`python-alerta-client` `tests/integration/`, ADAPTER_DEPENDENT), Postgres persistence, basic auth with API key. Another instrument requires re-derivation.
[PA-3]: no defect selected or authored. Class-1 diffs are upstream artifacts; class-2/3 candidates are locator + behavioural specification only.
[Evidence roots]: R1 captures `evidence/resolution_stage/executor/raw/NNN_*`; R2 captures `evidence/resolution_stage/executor/rework_r1/raw/R2-NNN_*` (log `rework_r1/RAW_COMMAND_LOG_R2.md`)

## 0. Changes from R1

| R1 statement | R2 status |
|---|---|
| "capture 124: 439 fix commits; 78 touch code + tests in API areas", with a 16-row table covering only part of them | **Completed.** All 78 are dispositioned in the companion matrix (§2). The 78 were re-derived with the R1 filter (R2-002), matching R1's count exactly. |
| 16 cleanly reverse-applicable commits omitted (review intake item 1) | **Covered.** All 16 are matrix rows H01, H04, H05, H06, H07, H08, H09, H10, H11, H12, H14, H17, H18, H23, H33 and H34, each with a hunk-level disposition (§2.2). |
| "Every fix that still reverse-applies to the frozen pin is invisible to the client suite's assertions." | **Qualified**, now supported by the completed matrix: of 23 cleanly reverse-applicable fixes (19 in the 78 plus 4 second-pass), none produces a valid C1 assertion failure. 19 are undetectable, 1 is invalid and 3 are invalid-or-undetectable. Static hunk review only; runtime UNVERIFIED. |
| "Every fix the suite could detect no longer applies." | **Qualified.** Assertion-level overlap was analysed only for R1-shortlisted non-applying fixes (§2.3). The other 23 non-applying fixes that touch C1 request-path files were excluded **on applicability alone**, without hunk-level overlap analysis. The statement is withdrawn as a universal claim. |
| Class-1 result: NONE | **Retained, scoped** to the 78 filtered candidates plus 10 second-pass candidates (§2.4). |

Sections 3–7 (class-2/3 proposals, the Rapid Context Auditor Actor 03 assessment, gaps, decisions) carry R1 content forward. Their evidence locators are unchanged.

## 1. Outcome summary

| Rank | ID | Class | Defect (locator) | Expected named failing assertion | Strength |
|---|---|---|---|---|---|
| — | — | **1** | none qualifies within the surveyed set (§2) | — | **no class-1 candidate** |
| 1 | A3N-C3a | 3 (synthetic code) | `alerta/models/note.py:114` `user=g.login` → an attribute that is `None` under API-key auth (e.g. `g.user_id`) | `tests/integration/test_alerts.py::AlertTestCase::test_alert_notes` — `self.assertEqual(notes[0].user, '<ACCOUNT_EMAIL_005>')` | strongest static case |
| 2 | A3N-C3b | 3 (configuration-level) | `ALERT_TIMEOUT` overridden in the server config file (default `86400`) | `test_alerts.py::AlertTestCase::test_alert` and `test_history.py::AlertTestCase::test_alert` — `self.assertEqual(alert.timeout, 86400)` | strong; "configuration as application defect" needs Human Operator/Council interpretation |
| 3 | A3N-C2a | 2 (documented behaviour) | remove the int→str `value` cast at `alerta/models/alert.py:35–36` | `test_alerts.py::AlertTestCase::test_alert` `'4'`; `test_history.py::AlertTestCase::test_alert` `'1'` | **WEAK** — likely masked under Postgres |

No candidate is selected.

## 2. Class 1 — complete history disposition

### 2.1 Totals (companion matrix, R2-091)

| Reverse-apply vs frozen pin | C1 assertion overlap | Disposition | Count |
|---|---|---|---|
| applies cleanly | `NONE` | REJECT_UNDETECTABLE | 2 |
| applies cleanly | `PATH_FILE_NO_FIELD` | REJECT_UNDETECTABLE | 14 |
| applies cleanly | `PATH_FILE_NO_FIELD` | REJECT_INVALID | 1 |
| applies cleanly | `PATH_FILE_NO_FIELD` | REJECT_INVALID_OR_UNDETECTABLE | 2 |
| does not apply | `PATH_FILE (file-level only)` | REJECT_NOT_APPLICABLE | 26 |
| does not apply | `SETUP_ONLY` | REJECT_NOT_APPLICABLE | 1 |
| does not apply | `NONE` | REJECT_NOT_APPLICABLE | 32 |
| **Total** | `ASSERTION_FIELD`: **0** | | **78** |

The 19 / 59 reverse-apply split agrees with the independent Reviewer's finding (16 omitted clean commits plus the 3 R1 already listed: `<PRIVATE_REF_04308>`, `<PRIVATE_REF_04496>`, `04362950`).

### 2.2 The 19 cleanly reverse-applicable candidates (hunk-level; patch text in `scratch/r2/<Hnn>_<sha12>/cand.patch`)

| Row | Commit | Reversal effect | Overlap | Disposition | Supporting evidence |
|---|---|---|---|---|---|
| H01 | `<PRIVATE_REF_01617>` | restores try/except TypeError plugin-call fallback in `utils/api.py` | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — identical outcome on C1 happy path | R2-003 |
| H02 | `<PRIVATE_REF_04496>` | re-adds LIMIT 50 to un-limited internal Postgres queries | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — C1 volumes ≪ 50 | R2-004 |
| H03 | `<PRIVATE_REF_04308>` | blackout update coercion and matching query | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — returned fields/counts unchanged; surviving blackout (origin `foo/baz`) matches no C1 alert; runtime UNVERIFIED | R2-005, R1 089 |
| H04 | `<PRIVATE_REF_05824>…` | removes reject/ratelimit/blackout counters and their only `Counter.inc` callers | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — C1 never takes those branches | R2-006, R2-083, R2-084 |
| H05 | `<PRIVATE_REF_05886>…` | unack/unshelve fallback after HISTORY_LIMIT eviction | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — C1 performs no actions | R2-007 |
| H06 | `<PRIVATE_REF_03992>…` | `PUT /user/me` allowlist | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — never called by C1 | R2-008 |
| H07 | `<PRIVATE_REF_04780>…` | removes CAS auth provider (feature) | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — basic/API-key path unchanged | R2-009 |
| H08 | `<PRIVATE_REF_04188>…` | `/environments` pagination | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — never called by C1 | R2-010 |
| H09 | `<PRIVATE_REF_05962>…` | string-built SQL for the Lucene `q=` path | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — C1 sends field filters via `urlencode(query)` (client `api.py:593`, R1 082), never `q=` | R2-011 |
| H10 | `<PRIVATE_REF_04797>…` | restores `pkg_resources` entry-point loading | PATH_FILE_NO_FIELD | REJECT_INVALID_OR_UNDETECTABLE — equivalent loading if `pkg_resources` is importable, otherwise startup ImportError (backend unhealthy) | R2-012 |
| H11 | `<PRIVATE_REF_04500>…` | removes `clipboard_template` from `GET /config` | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — never called by C1 | R2-013 |
| H12 | `<PRIVATE_REF_05271>…` | Keycloak issuer URL | NONE | REJECT_UNDETECTABLE | R2-014 |
| H14 | `<PRIVATE_REF_04690>…` | audit `get_json()` without `silent` | PATH_FILE_NO_FIELD | REJECT_INVALID_OR_UNDETECTABLE — inert under defaults (`AUDIT_LOG=None`, `AUDIT_URL=None`, so no receivers); if audit is enabled, body-less DELETEs error, which is an HTTP error/exception, not an assertion | R2-016, R2-081, R2-086 |
| H17 | `<PRIVATE_REF_04426>…` | MongoDB query defaults | NONE | REJECT_UNDETECTABLE — Postgres topology | R2-019 |
| H18 | `<PRIVATE_REF_04344>…` | restores 3-argument `Blueprint.register` | PATH_FILE_NO_FIELD | REJECT_INVALID — `Flask==3.1.3` pinned, so `create_app` fails | R2-020, R2-082 |
| H23 | `<PRIVATE_REF_04766>…` | HMAC fall-through | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — C1 uses an API key | R2-025 |
| H33 | `<PRIVATE_REF_03805>…` | `absolute_url`/BASE_URL for hrefs/Location | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — hrefs not asserted | R2-035 |
| H34 | `<PRIVATE_REF_04249>…` | dict vs defaultdict in environment/service counts | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — never called by C1 | R2-036 |
| H48 | `<PRIVATE_REF_03788>…` | `User.update` `role` compat branch | PATH_FILE_NO_FIELD | REJECT_UNDETECTABLE — C1 never updates users | R2-050 |

Full 40-hex commit IDs and patch SHA-256 values for every row are in the companion matrix.

### 2.3 The 59 non-applying candidates

- All are `REJECT_NOT_APPLICABLE`. Their reverse diffs do not apply to the frozen pin, so using any of them would require porting, which means authoring a defect (PA-3; class-3 territory).
- 26 touch at least one C1 request-path file (`PATH_FILE (file-level only)`): H13, H15, H16, H19, H20, H22, H24, H25, H27, H28, H29, H31, H35, H37, H39, H40, H44, H47, H49, H50, H53, H54, H55, H57, H58, H61.
- Assertion-level overlap was analysed only for the three R1-shortlisted rows among them:
  - H37 `<PRIVATE_REF_05761>` reaches `test_alert_notes`, but literal reversal yields HTTP 500 because `g.user` is never assigned (R1 131/134). This is the basis of A3N-C3a.
  - H22 `<PRIVATE_REF_05192>` would reach `test_blackout` origin assertions but does not apply.
  - H29 `<PRIVATE_REF_04149>` covers alert-generated heartbeats only.
- **The remaining 23 file-level rows were not hunk-reviewed.** Their exclusion rests solely on non-applicability (evidence gap EG-A3N-5).
- 1 row is `SETUP_ONLY` (`alerta/commands.py`) and 32 rows touch no C1 request-path file.

### 2.4 Second-pass candidates outside the 78 (R1 capture 137 search)

These ten were selected by R1's second, field-oriented history search (capture 137), not by the 78-filter. They are carried forward from R1 with their R1 captures.

| Commit | Subject | Reverse-apply | C1 overlap | Disposition | Evidence |
|---|---|---|---|---|---|
| `465d5081` | Fix missing value in RichHistory serialization (#670) | clean | history `value` not asserted | REJECT_UNDETECTABLE | R1 143 |
| `8a8bb90b` | add related id to note response (#1499) | clean | `related` not asserted | REJECT_UNDETECTABLE | R1 144 |
| `5911e686` | Empty blackout values should be null (#1643) | clean | C1 sends no empty strings; priority not asserted | REJECT_UNDETECTABLE | R1 145 |
| `1a788312` | key scopes default to empty list (#1052) | clean | C1 always supplies scopes | REJECT_UNDETECTABLE | R1 147 |
| `95f9f26b` | Cast alert and heartbeat timeout to integers (#912) | no | weak | REJECT_NOT_APPLICABLE | R1 139 |
| `f12c552c` | Do not cast value/raw data to string if not needed (#432) | no | motivates A3N-C2a | REJECT_NOT_APPLICABLE | R1 140 |
| `8e802119` | Fix history change type issue (#626) | no | `test_history` change_type | REJECT_NOT_APPLICABLE | R1 141 |
| `cffff425` | Fix get_history() sort order (#641) | no | weak | REJECT_NOT_APPLICABLE | R1 142 |
| `<PRIVATE_REF_04815>` | Fix type error on Note serialization | no | — | REJECT_NOT_APPLICABLE | R1 146 |
| `6e42cf68` | use string enumerated types where possible (#1419) | no | — | REJECT_NOT_APPLICABLE | R1 148 |

### 2.5 Class-1 conclusion (scoped)

Within the 78 filtered candidates plus the 10 second-pass candidates:
- no cleanly reverse-applicable upstream fix yields a valid C1 assertion failure under the assumed topology (static hunk review);
- no non-applying fix is usable without porting.

**Class-1 result: NONE within this set.**

The set is bounded by the R1 subject-keyword and code+tests filter over `alerta/alerta` history up to the frozen pin, which equals upstream `master`, so no post-pin fixes exist.

## 3. A3N-C3a — note author attribution (class 3, synthetic code; proposal only)

Unchanged from R1.
- **Site:** `alerta/models/note.py:114` in `Note.from_alert`: `user=g.login,` (frozen blob `<PRIVATE_REF_04903>`; R1 135).
- **Upstream anchor:** upstream fix `<PRIVATE_REF_05761>` (matrix H37) changed exactly this line from `g.user` to `g.login`; literal reversal is unusable (R1 131/134).
- **Behavioural change specified:** source the author from an attribute that is `None` for API-key requests. Under key auth `g.user_id = None` and `g.login = key_info.user` (`auth/decorators.py:46–47`, blob `<PRIVATE_REF_05951>`; R1 134).
- **Expected failure:** `test_alerts.py::AlertTestCase::test_alert_notes`, `assertEqual(notes[0].user, '<ACCOUNT_EMAIL_005>')` → `AssertionError: None != '<ACCOUNT_EMAIL_005>'`.
- **Validity:**
  - the insert still succeeds (`notes."user"` is nullable text, R1 160);
  - `add_note` still returns `status: ok` with 201 (`views/alerts.py:631`, R1 204);
  - earlier `note.text` assertions pass;
  - `setUp`, collection and dependencies are unchanged.
- **Observation (not a candidate):** the frozen `Note.parse` reads `user=json.get('status', None)` (`note.py:35`, R1 161). It is not on C1's request path.

## 4. Other proposals (unchanged from R1)

**A3N-C3b — `ALERT_TIMEOUT` (configuration-level).**
- Default `settings.py:203–204` (blob `<PRIVATE_REF_05489>`; R1 162).
- Loaded from `/etc/alertad.conf` or `ALERTA_SVR_CONF_FILE` (`utils/config.py:22–24`, R1 203); no environment-variable mapping (R1 162, positive control R1 194).
- Any integer ≠ 86400 fails both `assertEqual(alert.timeout, 86400)` assertions (`test_alerts.py::test_alert`, `test_history.py::test_alert`).
- Code stays byte-identical. The config file normally carries secrets, so AMD-DK2 applies.

**A3N-C2a — value string cast (class 2; WEAK).**
- Documented as `string` (`alerta-docs` `source/api/reference.rst:55`, blob `<PRIVATE_REF_05955>`; R1 155).
- Site `alert.py:35–36` (blob `<PRIVATE_REF_05743>`; R1 159).
- Under Postgres the `value` column is `text` (R1 158), so the defect is likely masked. It is valid only for a MongoDB topology.

**Not proposed:** status-code defects (§5), and any 5xx-producing change (it surfaces as a client exception, not an assertion).

## 5. Rapid Context Auditor Actor 03 201→200 concept (unchanged)

- `POST /alert` and `PUT /alert/<id>/note` return 201 (R1 204).
- C1's `_handle_error` branches only on the JSON `status` field, never on HTTP status (`api.py:627–636`, R1 206).
- A 201→200 change is therefore invisible to C1. Not supported.

## 6. Evidence gaps (A3-N)

- **EG-A3N-1:** all expectations are static; nothing was applied or run.
- **EG-A3N-2:** analysis depends on C1; another instrument requires re-derivation.
- **EG-A3N-3:** class-1 mining covers `alerta/alerta` only.
- **EG-A3N-4:** A3N-C2a Postgres masking is a static (column-type) inference.
- **EG-A3N-5 (new):** 23 non-applying candidates that touch C1 request-path files were not hunk-reviewed for assertion overlap (§2.3).
- **EG-A3N-6 (new):** the C1 request-path file set (`gen_matrix_r2.py` `C1_PATH`) is a static approximation from route files, default plugins and tree listing (R2-087/088/089), not a runtime trace.
- **EG-A3N-7 (new):** the candidate set is bounded by the R1 subject-keyword and code+tests filter (§2.5). Fixes without those subject terms or without test changes were not examined.

## 7. Decisions returned to Council/Human Operator (unchanged)

1. Whether any class-3 proposal is acceptable.
2. Whether a configuration-level change (A3N-C3b) counts as an "application defect".
3. Who authors and pre-records the defect artifact and its expected-failure record (not the Executor; PA-3).

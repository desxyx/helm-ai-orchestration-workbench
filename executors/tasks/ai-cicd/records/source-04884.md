# A3N_DEFECT_CANDIDATE_DOSSIER — AI_CICD / MA-1 / RESOLUTION_STAGE_S1

[Artifact Class]: RESOLUTION_EVIDENCE (candidate survey; no selection; no defect authored or applied)
[Executor]: Executor Actor 01
[Frozen criteria]: MA-1.4 A3-N — "same unmodified command/suite against reachable frozen-pin Alerta backend with one pre-recorded application defect. Backend remains healthy; suite fails with non-excluded assertion failure including a pre-recorded expected failure. Connection/setup/collection failure is invalid."
[Preference order]: (1) upstream bugfix with named regression assertion; (2) documented version/behaviour difference asserted by a named test; (3) configuration-level or synthetic defect as evidenced proposal only
[Detecting suite assumed for analysis]: A3 dossier C1 (`python-alerta-client` `tests/integration/`, ADAPTER_DEPENDENT). If Human Operator does not proceed with C1, every "expected failing assertion" below must be re-derived for the chosen instrument.
[PA-3 note]: no defect diff was authored. Class-1 diffs are upstream artifacts (hashes below). Class-2/3 candidates are specified as exact locator + behavioural change only; turning them into a patch is Council/Human Operator-owned.
[Evidence root]: `evidence/resolution_stage/executor/raw/NNN_*`; scratch index-only material under `executor/resolution_stage/scratch/a3n_<commit>/`

## 1. Outcome summary

| Rank | ID | Class | Defect (locator) | Expected named failing assertion | Static applicability | Strength |
|---|---|---|---|---|---|---|
| — | — | **1** | none qualifies (§2) | — | — | **no class-1 candidate** |
| 1 | A3N-C3a | 3 (synthetic code) | `alerta/models/note.py:114` `user=g.login` → attribute that is `None` under API-key auth (e.g. `g.user_id`) | `tests/integration/test_alerts.py::AlertTestCase::test_alert_notes` — `self.assertEqual(notes[0].user, '<ACCOUNT_EMAIL_005>')` | target line present once in frozen blob `<PRIVATE_REF_04903>` | strongest static case |
| 2 | A3N-C3b | 3 (configuration-level) | `ALERT_TIMEOUT` overridden in the server config file (default `86400`, `settings.py:203–204`) | `test_alerts.py::AlertTestCase::test_alert` and `test_history.py::AlertTestCase::test_alert` — `self.assertEqual(alert.timeout, 86400)` | no code change; frozen code byte-identical | strong; whether "configuration" counts as an "application defect" is a Human Operator/Council interpretation |
| 3 | A3N-C2a | 2 (documented behaviour) | remove the int→str cast of `value` at `alerta/models/alert.py:35–36` (docs: `value` is `string`, `alerta-docs source/api/reference.rst:55`) | `test_alerts.py::AlertTestCase::test_alert` — `self.assertEqual(alert.value, '4')`; `test_history.py::AlertTestCase::test_alert` — `'1'` | target lines present in frozen blob `<PRIVATE_REF_05743>` | **WEAK — likely masked under Postgres** (§4.3) |

No candidate is selected. Rapid Context Auditor Actor 03's 201→200 concept is **not supported** for C1 (§5).

## 2. Class 1 — upstream bugfix survey

**Method.**
- `git log` of `alerta/alerta` up to the frozen pin with fix/bug/regression terms (capture 124: 439 fix commits; 78 touch code + tests in API areas).
- Upstream `master` equals the frozen pin (`<PRIVATE_REF_01617>…`, capture 003), so **no post-pin fixes exist**. Candidates are historical fixes whose reversal reintroduces the bug.
- A targeted second pass covered value/type/history/key/perm/note fixes (capture 137).
- Each shortlisted fix was reverse-checked against the frozen pin with `tools/apply_check.sh`:
  - forward diff `c^..c -- alerta/` from the fetched store;
  - only touched non-credential blobs copied index-only from the frozen backend;
  - `git apply --check -R --cached`;
  - no worktree files written (each capture prints `worktree_files_written=0`);
  - nothing applied.
- Positive control: `<PRIVATE_REF_04308>` (2026) reverse-applies cleanly while older fixes do not, so the check discriminates.

| Upstream fix (full SHA in capture) | Subject | Patch sha256 (code-only) | Reverse-applies to frozen pin | Reaches a C1 assertion? | Disposition |
|---|---|---|---|---|---|
| `<PRIVATE_REF_05761>` | Fix add notes user error and add tests (#1198) | capture 138 | **no** (capture 138) | yes, but the reversal yields HTTP 500 / client exception rather than an assertion: `g.user` is never assigned in the frozen backend (only `g.user_id`/`g.login`, `auth/decorators.py:46–166`, capture 134) | not usable as-is; motivates A3N-C3a |
| `95f9f26b` | Cast alert and heartbeat timeout to integers (#912) | capture 139 | no | weak (client sends ints; integer DB column) | rejected |
| `f12c552c` | Do not try to cast value or raw data to string if not needed (#432) | capture 140 | no | see A3N-C2a | rejected (motivates A3N-C2a) |
| `8e802119` | Fix history change type issue (#626) | capture 141 | no | `test_history` change_type | rejected (not applicable) |
| `cffff425` | Fix get_history() sort order (#641) | capture 142 | no | weak | rejected |
| `465d5081` | Fix missing value in RichHistory serialization (#670) | `<PRIVATE_REF_03997>` | **yes** (capture 143) | **no** — history `value` is not asserted by C1 | rejected: undetectable |
| `8a8bb90b` | fix: add related id to note response (#1499) | `<PRIVATE_REF_05702>` | **yes** (capture 144) | **no** — `related` not asserted | rejected: undetectable |
| `5911e686` | fix: Empty blackout values should be null (#1643) | `<PRIVATE_REF_04379>` | **yes** (capture 145) | **no** — suite never sends empty strings; priority not asserted | rejected: undetectable |
| `<PRIVATE_REF_04815>` | Fix type error on Note serialization | capture 146 | no | — | rejected |
| `1a788312` | key scopes should default to empty list (#1052) | `<PRIVATE_REF_05679>` | **yes** (capture 147) | **no** — suite always supplies scopes | rejected: undetectable |
| `6e42cf68` | fix: use string enumerated types where possible (#1419) | capture 148 | no | — | rejected |
| `<PRIVATE_REF_04308>` | fix: blackout matching fails when service/tags are NULL after update (#2050) | capture 149 | **yes** | **no** — matching not asserted | rejected: undetectable |
| `<PRIVATE_REF_04496>` | fix: remove default query limit cap on internal Postgres queries (#2051) | capture 150 | **yes** | **no** — suite volumes far below the 50-row cap | rejected: undetectable |
| `04362950` | Fix user role regression introduced in refactor (#833) | capture 151 | **yes** | **no** — `role` update path not exercised | rejected: undetectable |
| `<PRIVATE_REF_04149>` | set alert heartbeat timeout from alert timeout | capture 152 | no | no — suite posts `/heartbeat` directly | rejected |
| `<PRIVATE_REF_05192>` | feature: add alert origin to blackout options (#1497) | capture 153 | no | yes (`blackout.origin`) | rejected (not applicable; feature, not fix) |

Patch sha256 values for every row are printed on the `patch_sha256=` line of the cited capture.

**Class-1 result: NONE.**
- Every fix that reverse-applies cleanly is invisible to C1's assertions.
- Every fix C1 could observe no longer applies to the frozen code.

## 3. A3N-C3a — note author attribution (class 3, synthetic code; proposal only)

- **Site:** `alerta/models/note.py:114` inside `Note.from_alert`: `user=g.login,` (capture 135; frozen blob `<PRIVATE_REF_04903>`).
- **Upstream anchor:** this exact line was the subject of upstream fix `<PRIVATE_REF_05761>` ("Fix add notes user error"; capture 131 shows `-user=g.user` / `+user=g.login`). The site therefore has upstream regression history, but the literal reversal is unusable (§2).
- **Behavioural change specified (not authored):** source the note author from an attribute that is `None` for API-key requests. For key auth the frozen decorator sets `g.user_id = None` and `g.login = key_info.user` (`alerta/auth/decorators.py:46–47`, blob `<PRIVATE_REF_05951>`; capture 134).
- **Expected named failure:** `tests/integration/test_alerts.py::AlertTestCase::test_alert_notes`, assertion `self.assertEqual(notes[0].user, '<ACCOUNT_EMAIL_005>')` → `AssertionError: None != '<ACCOUNT_EMAIL_005>'`.
- **Why it is not a connection/setup/collection/dependency/timeout/substitution failure:**
  - **Requests succeed.** The note insert still succeeds because `notes."user"` is nullable `text` (`alerta/sql/schema.sql`, capture 160), and `add_note` still returns `status: ok` with 201 (`views/alerts.py:631`, capture 204).
  - **Earlier assertions pass.** `note.text` checks precede the failing line and pass.
  - **Nothing else changes.** `setUp` only constructs a `Client` (no I/O), test files are unchanged so collection is unchanged, and no dependency changes.
- **Blast radius:** only note-author attribution. Other C1 tests do not create notes.
- **Static applicability:** line present once at `note.py:114` in the frozen blob. No patch exists; therefore no diff hash (PA-3).
- **Observation, not a candidate:** the frozen `Note.parse` already reads `user=json.get('status', None)` (`note.py:35`, capture 161), which looks like a latent upstream bug. It is not on C1's request path (`add_note` builds notes via `from_alert`).

## 4. Other proposals

### 4.1 A3N-C3b — `ALERT_TIMEOUT` configuration (class 3, configuration-level; proposal only)

- **Site:** `alerta/settings.py:203–204` (`DEFAULT_TIMEOUT = 86400`, `ALERT_TIMEOUT = DEFAULT_TIMEOUT`; blob `<PRIVATE_REF_05489>`; capture 162).
- **Config path:** server config is loaded `from_object('alerta.settings')`, then `/etc/alertad.conf`, then `ALERTA_SVR_CONF_FILE` (`alerta/utils/config.py:22–24`, capture 203). There is no environment-variable mapping for `ALERT_TIMEOUT` (capture 162: only `settings.py`/`heartbeat.py` hits; `utils/config.py` hits for `BASE_URL`/`DATABASE_URL` in capture 194 serve as positive control). The override would therefore live in the server config file. That file normally also carries secrets, so AMD-DK2 handling applies.
- **Behavioural change specified:** `ALERT_TIMEOUT` set to any integer ≠ 86400. The alert model reads it when no timeout is supplied (`alert.py` `timeout = kwargs.get('timeout') … else current_app.config['ALERT_TIMEOUT']`, capture 159), and the client sends none.
- **Expected named failures:**
  - `test_alerts.py::AlertTestCase::test_alert` — `assertEqual(alert.timeout, 86400)`;
  - `test_history.py::AlertTestCase::test_alert` — same assertion.
- **Why valid:**
  - Code stays byte-identical to the frozen pin.
  - Requests succeed and the backend stays healthy.
  - The failure is a returned-field value, not connectivity or setup.
- **Interpretation needed:** MA-1.4 says "application defect". Whether a configuration-level change qualifies is Council/Human Operator's call. Two tests fail, both of which can be pre-recorded.

### 4.2 Not proposed

- Status-code defects (§5).
- Changes that cause HTTP 5xx: these surface as client exceptions (`UnknownError`), not assertion failures.

### 4.3 A3N-C2a — value string cast (class 2; WEAK)

- **Documentation:**
  - `alerta-docs` `source/api/reference.rst:55`: `value | string | event value` (blob `<PRIVATE_REF_05955>`; capture 155).
  - The C1 test comment `# values cast to string` (capture 089).
- **Site:** `alerta/models/alert.py:35–36`: `if isinstance(kwargs.get('value', None), int): kwargs['value'] = str(kwargs['value'])` (capture 159; blob `<PRIVATE_REF_05743>`).
- **Expected named failures (MongoDB topology):** `test_alerts.py::AlertTestCase::test_alert` `assertEqual(alert.value, '4')`; `test_history.py::AlertTestCase::test_alert` `assertEqual(alert.value, '1')`.
- **Contradicting static evidence:** under Postgres the `alerts.value` column is `text` (`schema.sql` lines 10/42, capture 158). An integer bound into a `text` column is stored and returned as text, so the response would still carry `'4'` and the defect would **likely be masked**. This is UNVERIFIED at runtime. The candidate is valid only if the persistence topology is MongoDB; ranked last for that reason.

## 5. Rapid Context Auditor Actor 03 201→200 concept — assessment

- **Backend semantics:** `POST /alert` returns 201 (`views/alerts.py:83`), and `PUT /alert/<id>/note` returns 201 (`:631`) (capture 204).
- **Detection:** C1's `HTTPClient._handle_error` decides success from the JSON body `status` field and never inspects HTTP status codes (`alertaclient/api.py:627–636`, capture 206). The only `status_code` check in the client is in `housekeeping` (`api.py:510`), which the suite never calls.
- **Result:** a 201→200 change would leave every C1 assertion passing. **No named assertion supports the concept for C1.** It could only be revisited for a different instrument that asserts status codes. docker-alerta's specs assert codes, but only for `/_`, `/config`, `/management/*` and `/alerts` GET, never `POST /alert`.

## 6. Evidence gaps (A3-N)

- **EG-A3N-1:** All expectations are static. No defect was applied, and no backend or suite was run.
- **EG-A3N-2:** The analysis depends on C1. Another instrument requires re-derivation.
- **EG-A3N-3:** Class-1 coverage is limited to `alerta/alerta` history (the frozen backend). Fixes in other components (webui, client) are not application-backend defects and were not mined.
- **EG-A3N-4:** For A3N-C2a, the Postgres masking claim is static (column type), not runtime.

## 7. Decisions returned to Council/Human Operator

1. Whether any class-3 proposal is acceptable, given that no class-1 candidate qualifies and the only class-2 candidate is topology-weak.
2. Whether a configuration-level change (A3N-C3b) satisfies "application defect".
3. Who authors and pre-records the defect artifact and its expected-failure record (PA-3: not the Executor).

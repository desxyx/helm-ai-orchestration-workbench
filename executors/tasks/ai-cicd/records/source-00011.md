# CORE_06-0a Evidence Manifest

All paths relative to this directory. All logs sanitized: absolute personal filesystem paths replaced
with `<scratch>` (the screening's own scratch clone root) or `<home>`; no secret value or personal
identifier appears in any file. Rerun 2026-09-27 to address Operations Coordinator's `TARGETED_REWORK`.

| File | SHA-256 | Status | Produced by |
|---|---|---|---|
| `w1_frontend_install.log` | `<PRIVATE_REF_00136>` | PASS | `npm install --no-audit --no-fund` in W1 frontend clone |
| `w1_frontend_build.log` | `<PRIVATE_REF_03632>` | PASS | `npm run build` in W1 frontend clone |
| `w1_backend_build_py314_FAIL.log` | `<PRIVATE_REF_02251>` | FAIL (real, expected) | `uv sync --extra dev -p 3.14` — psycopg2==2.9.6 C-extension build failure |
| `w1_backend_build_py312_PASS.log` | `<PRIVATE_REF_02131>` | PASS | `uv sync --extra dev -p 3.12` |
| `w1_backend_sqlite_migrate.log` | `<PRIVATE_REF_02831>` | PASS | `DEBUG=True manage.py migrate` (file-based SQLite) |
| `w1_backend_sqlite_persistence.log` | `<PRIVATE_REF_02662>` | PASS (with one honest 422 en route — see report §1.5) | register → restart → login sequence against file-based SQLite |
| `w1_backend_postgres_persistence.log` | `<PRIVATE_REF_01515>` | PASS | register → restart → login sequence against local PostgreSQL |
| `w1_a3_hurl_full_output.log` | `<PRIVATE_REF_01525>` | PASS | `make test-hurl-with-managed-server` — full console output, 13/13 files, 154/154 requests |
| `w2_frontend_install.log` | `<PRIVATE_REF_03723>` | PASS | `npm install` in W2 frontend clone — retained from the first screening pass and sanitized into this evidence package during final Operations Coordinator review |
| `w2_frontend_build.log` | `<PRIVATE_REF_03424>` | PASS | `npm run build` in W2 frontend clone — full successful build output retained and sanitized during final Operations Coordinator review |
| `w2_backend_build_py314.log` | `<PRIVATE_REF_03365>` | PASS | `uv venv --python 3.14` + `uv pip install -r requirements.txt` — psycopg2==2.9.11 builds cleanly |
| `w2_backend_build_py312.log` | `<PRIVATE_REF_03448>` | PASS | same, `--python 3.12` |
| `w2_backend_http_evidence_py314.log` | `<PRIVATE_REF_01510>` | PASS | app boot + `/`, `/management/status` under the 3.14 venv against local PostgreSQL |
| `w2_backend_http_evidence_py312.log` | `<PRIVATE_REF_02073>` | PASS | same, under the 3.12 venv |
| `w2_frontend_config_chain.txt` | `<PRIVATE_REF_01820>` | evidence excerpt, not a test | source excerpt: `main.ts`, `services/config.ts`, `store/modules/config.store.ts` |
| `docker_compose_inventory.txt` | `<PRIVATE_REF_01542>` | inventory, not a test | `find <repo> -maxdepth 1 -iname "*docker*" -o -iname "*compose*"` per repo |

The W2 frontend install/build logs were produced during the first screening pass. Final Operations Coordinator review
retained sanitized copies in this evidence package without rerunning the deterministic build.

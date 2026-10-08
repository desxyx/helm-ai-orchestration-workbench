# FETCH_MANIFEST — AI_CICD / MA-1 / RESOLUTION_STAGE_S1

[Artifact Class]: EVIDENCE
[Executor]: Executor Actor 01
[Network boundary]: Human Operator D2 = N1 — read-only unauthenticated HTTPS; no tokens, cookies or credentials; no private repos; no submodules; no hooks; no fetched-code execution; no package manager
[Mechanics]: all network commands ran under `executor/resolution_stage/tools/rs.sh`:
- empty `HOME`, `GIT_CONFIG_NOSYSTEM=1`, `GIT_CONFIG_GLOBAL=/dev/null`;
- `credential.helper=` (empty), `core.hooksPath=/dev/null`, `protocol.allow=never` + `protocol.https.allow=always`, `submodule.recurse=false`, `fetch.recurseSubmodules=false`, LFS smudge disabled, `transfer.fsckObjects=true`;
- `curl -q --proto =https --proto-redir =https --tlsv1.2`.

Bare repositories were created with `--template=` (no hook samples) and never checked out.
[Timestamps]: UTC, from `RAW_COMMAND_LOG.md` entry start times
[Destinations]: relative to `executor/resolution_stage/`

## 1. Git repositories (github.com, smart-HTTP over HTTPS)

Mutable names (HEAD/branch/tag) were read only for discovery via `ls-remote` and resolved immediately to the commit below. Evidence cites the commit/tree only.

| Repo URL | Requested (discovery) | Resolved commit | Tree | Depth | ls-remote entry / time | Fetch entry / time | Destination |
|---|---|---|---|---|---|---|---|
| https://github.com/alerta/alerta.git | `refs/heads/master` | `<PRIVATE_REF_01617>` (= frozen backend pin) | `<PRIVATE_REF_04895>` (= frozen tree, entry 069) | full + all tags | 003 · 03:16:10Z | 051 · 03:17:23Z (tags 017) | `sources/<ACCOUNT_EMAIL_009>` |
| https://github.com/alerta/python-alerta-client.git | `HEAD`→`refs/heads/master`; tag `v8.5.3` | `<PRIVATE_REF_04519>`; `v8.5.3`→`<PRIVATE_REF_05329>` | `<PRIVATE_REF_04807>`; v8.5.3 tree `<PRIVATE_REF_05095>` | full + tags | 007 · 03:16:37Z | 053 · 03:17:24Z (tags 021) | `sources/<ACCOUNT_EMAIL_044>` |
| https://github.com/alerta/docker-alerta.git | `HEAD` | `<PRIVATE_REF_05335>` | `<PRIVATE_REF_04402>` | full + tags | 008 · 03:16:38Z | 055 · 03:17:25Z (tags 025) | `sources/<ACCOUNT_EMAIL_014>` |
| https://github.com/alerta/alerta-contrib.git | `HEAD` | `<PRIVATE_REF_03984>` | `<PRIVATE_REF_05120>` | full | 009 · 03:16:39Z | 057 · 03:17:26Z | `sources/<ACCOUNT_EMAIL_006>` |
| https://github.com/alerta/alerta-docs.git | `HEAD` | `<PRIVATE_REF_05236>` | `<PRIVATE_REF_04752>` | 1 (+ shallow tags) | 010 · 03:16:39Z | 059 · 03:17:27Z (tags 033) | `sources/<ACCOUNT_EMAIL_007>` |
| https://github.com/alerta/alerta-webui.git | `HEAD` | `<PRIVATE_REF_03446>` (= frozen frontend pin) | `<PRIVATE_REF_04238>` (= frozen tree, entry 069) | 1 (+ shallow tags) | 011 · 03:16:40Z | 061 · 03:17:28Z (tags 037) | `sources/<ACCOUNT_EMAIL_008>` |
| https://github.com/alerta/packer-templates.git | `HEAD` | `<PRIVATE_REF_04757>` | `<PRIVATE_REF_05610>` | 1 | 012 · 03:16:41Z | 063 · 03:17:29Z | `sources/<ACCOUNT_EMAIL_039>` |
| https://github.com/alerta/vagrant-try-alerta.git | `HEAD` | `<PRIVATE_REF_05792>` | `<PRIVATE_REF_04362>` | 1 | 013 · 03:16:41Z | 065 · 03:17:29Z | `sources/<ACCOUNT_EMAIL_065>` |
| https://github.com/alerta/angular-alerta-explorer.git | `HEAD` | `<PRIVATE_REF_05561>` | `<PRIVATE_REF_05006>` | 1 | 014 · 03:16:42Z | 067 · 03:17:30Z | `sources/<ACCOUNT_EMAIL_010>` |
| https://github.com/lima-vm/lima.git | tag `v2.2.0` | `<PRIVATE_REF_03338>` (tag object `<PRIVATE_REF_04967>`) | `<PRIVATE_REF_04599>` | 1 | 177 · 03:29:34Z | 179 · 03:29:35Z | `sources/<ACCOUNT_EMAIL_022>` |

**Positive control (entry 003 vs 004):** the remote `v9.1.0` tag object `<PRIVATE_REF_05818>` and peeled commit `<PRIVATE_REF_05887>` equal the frozen backend's local tag.

**Failed first attempt (entries 016–050):** a shell-modifier quirk (zsh `$s:r`) corrupted the refspec. Every by-SHA fetch failed with `couldn't find remote ref …`, while tag fetches succeeded. Corrected in entries 051–068, all of which verified with `rev-parse <sha>^{commit}`.

**Credential-pattern blobs:** the fetched object stores necessarily contain upstream-tracked blobs such as the backend's `.env`/`.flaskenv` (public upstream content). They were never checked out, `git show`n or printed; every inspection used credential-pattern exclusions (`rs.sh CRED_EXCL`, filtered `ls-tree`). Index-only scratch material copied **only** the blobs touched by candidate patches, and `apply_check.sh` aborts on credential-pattern paths.

## 2. HTTPS documents and metadata (curl)

| URL | Purpose | Entry / time | Result | Saved file (sha256) |
|---|---|---|---|---|
| https://api.github.com/orgs/alerta/repos?per_page=100&page=1&type=public | official corpus listing | 005 · 03:16:24Z | 200 | `docs/api.github.com/orgs_alerta_repos_p1.json` (`<PRIVATE_REF_05131>`) |
| …&page=2 | pagination end | 006 · 03:16:25Z | 200 (`[]`) | `…_p2.json` (`<PRIVATE_REF_04265>`) |
| https://api.github.com/repos/lima-vm/lima | license/metadata | 167 · 03:29:16Z | 200 | `docs/api.github.com/prov/repo_lima-vm_lima.json` (`<PRIVATE_REF_05239>`) |
| https://api.github.com/repos/lima-vm/lima/releases/latest | release metadata | 168 · 03:29:16Z | 200 (`v2.2.0`) | `…/rel_lima-vm_lima.json` (`<PRIVATE_REF_04330>`) |
| https://api.github.com/repos/utmapp/UTM | license | 169 · 03:29:17Z | 200 | `…/repo_utmapp_UTM.json` (`<PRIVATE_REF_05689>`) |
| https://api.github.com/repos/utmapp/UTM/releases/latest | release | 170 · 03:29:17Z | 200 (`v4.7.5`) | `…/rel_utmapp_UTM.json` (`<PRIVATE_REF_05652>`) |
| https://api.github.com/repos/canonical/multipass | license | 171 · 03:29:18Z | 200 | `…/repo_canonical_multipass.json` (`<PRIVATE_REF_05505>`) |
| https://api.github.com/repos/canonical/multipass/releases/latest | release | 172 · 03:29:18Z | 200 (`v1.16.4`) | `…/rel_canonical_multipass.json` (`<PRIVATE_REF_03995>`) |
| https://api.github.com/repos/cirruslabs/tart | license | 173 · 03:29:18Z | 200 (NOASSERTION) | `…/repo_cirruslabs_tart.json` (`<PRIVATE_REF_05301>`) |
| https://api.github.com/repos/cirruslabs/tart/releases/latest | release | 174 · 03:29:19Z | 200 (`2.40.1`) | `…/rel_cirruslabs_tart.json` (`<PRIVATE_REF_04864>`) |
| https://api.github.com/repos/crc-org/vfkit | license | 175 · 03:29:20Z | 200 | `…/repo_crc-org_vfkit.json` (`<PRIVATE_REF_04976>`) |
| https://api.github.com/repos/crc-org/vfkit/releases/latest | release | 176 · 03:29:20Z | 200 (`v0.6.4`) | `…/rel_crc-org_vfkit.json` (`<PRIVATE_REF_04161>`) |
| https://github.com/lima-vm/lima/releases/download/v2.2.0/SHA256SUMS → redirect `release-assets.githubusercontent.com` | release digests (text only) | 181 · 03:29:37Z | 200 | `docs/github.com/lima-vm/SHA256SUMS-v2.2.0.txt` (`<PRIVATE_REF_04889>`); header file's signed redirect query redacted (notice N-3; header sha256 after redaction `<PRIVATE_REF_05159>`) |
| https://cloud-images.ubuntu.com/releases/noble/release-20260705/SHA256SUMS | image digest corroboration | 191 · 03:30:29Z | **302 → `http://cloud-images-archive.ubuntu.com/…` refused (https-only)** | header only (`<PRIVATE_REF_05088>`) |
| https://cloud-images-archive.ubuntu.com/releases/noble/release-20260705/SHA256SUMS | same, direct HTTPS | 192 · 03:30:47Z | **connection reset (curl 35)**; not retried | none |

No binary, image, package or installer was downloaded. No request carried authentication, and GitHub API calls were unauthenticated (rate-limit headers retained in `.hdr` files).

## 3. Hosts contacted

- `github.com`
- `api.github.com`
- `release-assets.githubusercontent.com` (redirect reached from official `github.com/lima-vm` release URL)
- `cloud-images.ubuntu.com` (reached from the pinned Lima template)
- `cloud-images-archive.ubuntu.com` (official Canonical redirect target; HTTPS connection failed)

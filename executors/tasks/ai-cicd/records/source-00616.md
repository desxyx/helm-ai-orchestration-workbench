# D3 install plan — Docker Desktop (control plane), single attempt

[Written by]: Executor Actor 01, 2026-10-04 22:19 (local clock), before any download or installation
[Receipt]: AI-CICD-20261004-W2-ENTRY-EXEC-001 — Docker installation 0/1 used at writing
[Release]: W2_ACTUAL_ENTRY_PREPARATION_RELEASE_2026-10-04_r1.md §2

## 1. Precondition (observed 2026-10-04, read-only)

No compatible runtime is present. These are all absent: `docker` on PATH, `/usr/local/bin/docker`,
`/opt/homebrew/bin/docker`, `/Applications/Docker.app`, OrbStack, Colima, Podman, Lima, `~/.docker`.
The positive control (`/opt/homebrew/bin/node`) was found. Nothing will be replaced.

## 2. Resolved official artifact

| Field | Value |
|---|---|
| Source page | https://docs.docker.com/desktop/setup/install/mac-install/ (Apple silicon) |
| Appcast | https://desktop.docker.com/mac/main/arm64/appcast.xml → `Version 4.93.0 (240920)`, published 2026-09-28T11:16:22Z |
| DMG URL | https://desktop.docker.com/mac/main/arm64/240920/Docker.dmg |
| Size | 586,074,635 bytes (appcast `length` = HTTP `content-length`) |
| Official checksum | https://desktop.docker.com/mac/main/arm64/240920/checksums.txt → `<PRIVATE_REF_02944> *Docker.dmg` |

The installation stops before mounting if the downloaded SHA-256 differs.

## 3. Exact commands

Staging: `S=<this stage>/staging/docker` (task-owned).

```text
1  curl -fL -o $S/Docker-4.93.0-240920.dmg https://desktop.docker.com/mac/main/arm64/240920/Docker.dmg
2  shasum -a 256 $S/Docker-4.93.0-240920.dmg            # must equal <PRIVATE_REF_02944>…4dba
3  hdiutil attach -nobrowse -readonly -mountpoint $S/mnt $S/Docker-4.93.0-240920.dmg
4  codesign --verify --deep --strict $S/mnt/Docker.app; spctl -a -vv $S/mnt/Docker.app   # record signer / team
5  test ! -e /Applications/Docker.app && ditto $S/mnt/Docker.app /Applications/Docker.app   # standard drag-install equivalent
6  hdiutil detach $S/mnt
7  open -a /Applications/Docker.app                       # first launch; Human Operator completes the UI (§4)
8  ~/.docker/bin/docker version; ~/.docker/bin/docker context ls; ~/.docker/bin/docker info --format '{{.ServerVersion}} {{.OperatingSystem}} {{.Architecture}}'
```

The bundled privileged installer (`Docker.app/Contents/MacOS/install`, `--accept-license`) is **not** used.

## 4. First-launch choices Human Operator makes (no automatic acceptance)

- **Agreement:** read and accept the Docker Subscription Service Agreement, or decline (decline = recorded failure).
- **Configuration:** choose **Use advanced settings**.
  - CLI tools: **User** (`$HOME/.docker/bin`, no system-wide links).
  - Leave **unchecked**: "Allow the default Docker socket to be used" and "Allow privileged port mapping". Both need the password/privileged helper and are not released.
- **Skip:** Docker sign-in or account creation, surveys, and any Rosetta installation offer.
- **No shell profile edit:** `~/.docker/bin` is not added to any shell profile. The control plane calls `~/.docker/bin/docker` by absolute path.
- **macOS prompts:** any host permission prompt shown by macOS remains Human Operator's decision.

## 5. Write targets

- `/Applications/Docker.app`.
- User-level state Docker Desktop creates:
  - `~/.docker/` (config, contexts, bin, run socket);
  - `~/Library/Containers/com.docker.docker/` (Linux VM disk);
  - `~/Library/Group Containers/group.com.docker/`;
  - `~/Library/Application Support/Docker Desktop/`;
  - `~/Library/Preferences/com.docker.docker.plist`;
  - Docker caches/logs under `~/Library`.
- Task staging `$S` (DMG, mount point).

No changes to: global profile, `/usr/local/bin` links, Rosetta, privileged helper, owner Codex/Claude configuration.

## 6. Not done here

- **Artifact Registry pull configuration:** pulling arm Run images by digest with the existing identity would need a Docker credential helper (`gcloud auth configure-docker`, which edits `~/.docker/config.json`). That is not part of this install; it stays a later per-arm provenance prerequisite.
- **No images:** no image pulls or builds.

## 7. Failure handling

Only one attempt is authorized. A failure at any step is recorded with its output and the step stops. There is no uninstall, repair or retry.

# Docker owner cleanup result

Recorded 2026-10-05T00:13:57+11:00. Receipt AI-CICD-20261005-DOCKER-CLEANUP-001; explicit Owner request to remove Docker.

## Actual actions

- Official /Applications/Docker.app/Contents/MacOS/uninstall ran once; exit 1 at macOS-protected container metadata. Direct post-uninstall listing showed only .com.apple.containermanagerd.metadata.plist left in that container directory. No password/sudo or Full Disk Access grant used.
- Detached exact staged disk image: disk6 ejected, exit 0.
- Removed remaining /Applications/Docker.app, ~/.docker, ~/Library/Group Containers/group.com.docker and exact downloaded Docker-4.93.0-240920.dmg. Other named application-support/preferences/cache/log paths had already been removed by the official uninstaller.
- Official uninstall cleared Docker blocks from .zprofile/.bash_profile/.profile. The cleanup removed only the exact five-line Docker completion block from .zshrc. Other bytes preserved by exact replacement; before/after hashes and removed block recorded in DOCKER_OWNER_CLEANUP_DETAILS_2026-10-05.json. No full profile copied or printed.
- All eight named removable target paths verified absent. All four profiles verified free of Docker Desktop markers and the installation's .docker path. Filtered post-cleanup ps query had no Docker/vpnkit/com.docker matches (exit 1).

## Remaining residue

<CLIENT_HOME>/Library/Containers/com.docker.docker/.com.apple.containermanagerd.metadata.plist remains, 460 bytes, protected by macOS. Its directory contains only that file; runtime Data directory is absent. No repeated deletion, privacy permission expansion or claim of complete forensic erasure.

## Limits and W2 baseline

Engine was already not running before cleanup; inventory commands could not prove image/container/volume counts, which remain UNKNOWN. Before-install evidence records Docker app and .docker absent. No old evidence or installation history erased; only the downloaded installer was removed outside the reviewed 81-file evidence manifest.

Owner's latest uninstall request supersedes retaining Docker installation/profile traces as-is. Subsequent arm reset uses this actual post-cleanup baseline and the tiny disclosed protected residue, not old Docker-present/profile hashes. Host read exposure and source-provenance separation remain accepted policy; no new technical round, reinstall, cloud action or W2 release.

# A5_VM_FEASIBILITY_DOSSIER — AI_CICD / MA-1 / RESOLUTION_STAGE_S1

[Artifact Class]: RESOLUTION_EVIDENCE (static feasibility survey; no install, no VM operation)
[Executor]: Executor Actor 01
[Frozen rule]: Master 02 §6.4 — "Stop and start (or reset) every serving VM. A container restart alone is not sufficient. … If no meaningful restart can be established, A5 is UNVERIFIED. It is never waived." Convergence §4.5: one disposable local Linux VM containing all serving frontend/backend compute units and the intended persistence; suspend/resume, snapshot restore, process restart and container-only restart do not qualify. Human Operator D3 = V2 (current-Mac survey only).
[Directed lookup]: WF-9(d) (ratified body lines 240–251) was read because MA-1.9 cites it. Body hash re-verified `<PRIVATE_REF_01075>…3a4f` (capture 190).
[Evidence root]: `evidence/resolution_stage/executor/raw/NNN_*`

## 1. Outcome

**`VM_PROVISIONING_REQUIRED`**

- The host is technically capable: native Apple Silicon with Virtualization.framework available.
- At least one credible, permissively licensed, pinned provisioner path exists (Lima v2.2.0, `vmType: vz`).
- **No VM provisioner suitable for a declarative, disposable Linux VM is installed.**
- The only installed hypervisor (Parallels Desktop) is a commercial GUI product. It hosts an existing user VM, and its CLI edition/licence status is unverified.
- The pinned guest image source has moved to an archive host, and no HTTPS route was established to it.

A compliant path therefore requires a Human Operator resource/installation decision before any A5 work.

## 2. Host facts (read-only; captures 163, 165)

| Fact | Value |
|---|---|
| OS | macOS 26.6.2 (25G83), Darwin 25.6.0 |
| CPU / arch | Apple M4, 10 cores, arm64, `sysctl.proc_translated=0` (native) |
| Memory | 34359738368 bytes (32 GiB) |
| Virtualization support | `kern.hv_support = 1` |
| Free disk (Data volume) | 584 GiB available |

## 3. Already-present VM / container tooling (read-only; captures 164, 166)

| Tool | State |
|---|---|
| `limactl`, `lima`, `utmctl`, `multipass`, `tart`, `vfkit`, `krunkit`, `qemu-system-aarch64`, `qemu-img`, `VBoxManage`, `vmrun`, `docker`, `podman`, `colima`, `orb`/`orbctl`, `socket_vmnet` | **ABSENT** from PATH (positive control: `git` found). No matching Homebrew Cellar entries (positive control: `git` Cellar entry found). No `~/.lima` or `~/Library/Caches/lima`. |
| Parallels Desktop | **Present**: `/Applications/Parallels Desktop.app`, version 26.3.1 (build 57396), bundle id `com.parallels.desktop.console`, TeamIdentifier `4C6364ACXT`. `prlctl`/`prlsrvctl` binaries present but **not run**. No Parallels processes running. **One existing user VM bundle** under `~/Parallels` (count only; not opened). |
| UTM.app, VirtualBox, VMware Fusion, OrbStack, Docker Desktop, Podman Desktop, Rancher | not present in `/Applications` (positive control: Safari found) |

No package manager was invoked; inventory used `command -v`, directory listings, `PlistBuddy` and `codesign -dv` only.

## 4. Provisioner candidates (official sources; nothing downloaded except text metadata)

| Candidate | Source / pin | License | arm64 macOS artifact | Assessment |
|---|---|---|---|---|
| **Lima v2.2.0** | `github.com/lima-vm/lima` tag `v2.2.0` → commit `<PRIVATE_REF_03338>`, tree `<PRIVATE_REF_04599>` (captures 177–180); release published 2026-07-21 (capture 168) | Apache-2.0 (capture 167; LICENSE blob `<PRIVATE_REF_05631>`) | `lima-2.2.0-Darwin-arm64.tar.gz` sha256 `<PRIVATE_REF_02907>` (release `SHA256SUMS`, capture 181; `.asc` signature exists but was not verified) | **Primary candidate.** Declarative YAML VM definition; default `vmType` is `vz` on macOS ≥ 13.5 (`templates/default.yaml:11`, capture 186); explicit stop/start lifecycle (§6). |
| Parallels Desktop 26.3.1 | installed vendor app | commercial (EULA not reviewed) | installed | **Secondary, constrained.** Installed, but it shares a hypervisor with an existing user VM (residue/isolation risk). Whether `prlctl` lifecycle control is available in this edition is UNVERIFIED (no vendor doc retrieved, EG-A5-3). |
| UTM v4.7.5 | `github.com/utmapp/UTM` latest release (capture 170) | Apache-2.0 (capture 169) | `UTM.dmg` | Possible. GUI-first; `utmctl` scripting; a less declarative VM definition. Not installed. |
| Multipass v1.16.4 | `github.com/canonical/multipass` (capture 172) | GPL-3.0 (capture 171) | `multipass-1.16.4+mac-Darwin.pkg` | Possible. System `.pkg` installer with a privileged daemon, a larger host footprint for WF-9(d). Not installed. |
| Tart 2.40.1 | `github.com/cirruslabs/tart` (capture 174) | **NOASSERTION** (capture 173) | checksums only listed | **INELIGIBLE under Q8:** license not established by the official metadata. |
| vfkit v0.6.4 | `github.com/crc-org/vfkit` (capture 176) | Apache-2.0 (capture 175) | **no release assets** in the latest release | Low-level VMM only. Would need custom orchestration, and no official binary route was established from release metadata. Not recommended. |

Additional host reached through the official chain: `release-assets.githubusercontent.com` (redirect target for the Lima `SHA256SUMS`; the signed query was redacted from the saved header, notice N-3).

## 5. One-VM boundary and topology

All serving compute and persistence can sit inside one Linux guest. Static basis:
- the frozen backend runs as a WSGI app (`wsgi.py` at the frozen pin);
- persistence is Postgres (backend `DATABASE_URL`; the client CI used `postgres:14`);
- the frozen webui is a static build;
- the A3 dossier's C1 requires an `/api` reverse proxy or mount.

**Proposed in-VM topology** (shape only; content is Council/Human Operator-owned):
- `postgres` — persistence on the VM disk;
- `alertad` (frozen backend pin under a WSGI server) — backend compute;
- `nginx` serving the frozen webui build and reverse-proxying `/api` → backend — frontend compute + API prefix;
- no containers inside the VM (avoids conflating container restart with VM restart).

**Network exposure options** (Human Operator choice):
- (a) Lima default user-mode network with GRPC port forwarding (`port.md`, capture 189). The forwarder is the Lima **host agent**, a host-side process that `limactl stop` terminates and `limactl start` recreates. It relays traffic and does not serve the app, but Human Operator may wish to rule on whether it counts toward "every compute unit that serves the app".
- (b) `vzNAT` (`limactl start --network vzNAT`, `port.md:87`; `vmnet.md:25`). The guest gets an IP reachable from the host, and no host-side relay is in the data path.

**A3 runner placement** interacts with A3 C1's fixed `http://alerta:8080/api`: with name-resolution substitution, the runner must resolve `alerta` to the VM. That is a host or runner configuration and is recorded for Human Operator.

## 6. Prospective immutable VM definition and lifecycle commands (NOT executed)

**Definition basis (declarative keys only; no file authored):**
- Base: `templates/ubuntu-24.04.yaml` at Lima commit `<PRIVATE_REF_03338>…` (blob `<PRIVATE_REF_04363>`, capture 183).
- Image `https://cloud-images.ubuntu.com/releases/noble/release-20260705/ubuntu-24.04-server-cloudimg-arm64.img`, `arch: aarch64`, `digest: sha256:<PRIVATE_REF_04893>`.
- Proposed fixed keys:
  - `vmType: vz`, `cpus`, `memory`, `disk` (explicit values);
  - `mounts: []` (no host mounts, so no host state enters the VM);
  - `containerd: {system: false, user: false}`;
  - networks per §5 option;
  - a provisioning script that installs only pinned OS packages and the frozen source (authoring is Council/Human Operator-owned).

**Lifecycle (prospective):**

```
export LIMA_HOME=<MA-1 root>/a5_vm/lima_home          # contains instance state (not the download cache, see §8)
limactl create --name=ma1-a5 <ratified-definition>.yaml
limactl start  ma1-a5
# qualifying A5 restart (Master 02 §6.4 "stop and start every serving VM"):
limactl stop   ma1-a5                                  # graceful: vz RequestStop (pkg/driver/vz/vz_driver_darwin.go:505-514)
limactl list   ma1-a5                                  # must show Stopped
limactl start  ma1-a5
# fallback only if graceful stop fails (risk to DB consistency; record if used):
limactl stop --force ma1-a5                            # SIGKILL driver + host agent (pkg/instance/stop.go:110-136)
# teardown:
limactl delete --force ma1-a5
```

Command semantics are evidenced from the pinned source:
- `cmd/limactl/stop.go:16–47` (blob `<PRIVATE_REF_03994>`): `--force` → `StopForcibly`, else `StopGracefully` (capture 187);
- `pkg/instance/stop.go:26,110–136` and `pkg/driver/vz/*` (capture 188).

Suspend/resume and snapshot restore are not used.

## 7. A5 evidence plan (for a later released step)

Each item is recorded with UTC timestamps, raw stdout and SHA-256.

| Phase | Evidence |
|---|---|
| Before restart | Unique account + domain object created through the UI (MA-1.6 A5-P; A5-N control object created then deleted; A5-S sentinel never created); object identifiers; guest `boot_id` (`/proc/sys/kernel/random/boot_id`), `/proc/uptime`, `ps -o pid,lstart,cmd` for postgres/backend/nginx; disk identity (`lsblk -o NAME,UUID,SIZE`) and Postgres data-directory path |
| Stopped state | `limactl list` = `Stopped`; host-side `pgrep` shows no vz driver process for the instance; host-side probe of the app endpoint fails (connection refused/timeout) = application unavailability |
| After start | `limactl list` = `Running`; new `boot_id` ≠ old; `/proc/uptime` reset; all serving process start times later than the start command; same disk UUID; endpoint probe recovers |
| Persistence check | Log in as the pre-restart account; A5-P object present; A5-N identifier's checker returns FAIL; A5-S absent |

## 8. WF-9(d) residue and cleanup implications

WF-9(d) requires that reset attestation cover "MA-1/patch clones, drafts, containers, images, volumes and verifier credentials", with none discoverable at T0 and image/cache state matching attestation in every arm.

| Residue | Location | Containment |
|---|---|---|
| Instance state (VM disk `disk`, config, logs, sockets) | `$LIMA_HOME/<instance>/` (`website/content/en/docs/dev/internals.md:49–52`, capture 207) | Containable inside the MA-1 root via `LIMA_HOME` |
| **Downloaded images** | **`~/Library/Caches/lima/download/by-url-sha256/<sha>`**: "Currently hard-coded to `~/Library/Caches/lima` on macOS" (`internals.md:136–144`, capture 207) | **Outside the MA-1 root**; must be inventoried and removed or attested |
| Lima binaries | wherever the tarball is unpacked (proposal: inside the MA-1 root, not `/usr/local`) | Containable, if Human Operator allows a non-system install location |
| Parallels alternative | Parallels VM bundle, plus a shared hypervisor and app state with an existing user VM | Weak containment; sharing with user data |
| Multipass alternative | system `.pkg`, privileged daemon, system-wide instance store | Weak containment |
| Credentials | admin key/password for A4/A3 (AMD-DK2), inside the guest DB and any server config file | Destroyed with the VM disk; must be attested |

## 9. Evidence gaps (A5)

- **EG-A5-1:** The pinned image's digest could not be corroborated against Canonical's `SHA256SUMS`. `cloud-images.ubuntu.com/releases/noble/release-20260705/` redirects (302) to `http://cloud-images-archive.ubuntu.com/…`, refused by the https-only rule (capture 191). Direct HTTPS to the archive host failed with connection reset (capture 192); not retried. **Implication:** this Lima template's image URL is no longer served directly. A future definition needs either an HTTP-only archive fetch (a policy decision) or a newer Ubuntu release digest (a definition change).
- **EG-A5-2:** The Lima release `SHA256SUMS.asc` signature was not verified (it would require a signing key, which is outside static scope).
- **EG-A5-3:** Parallels edition, licence and CLI availability are not established; no vendor documentation was retrieved.
- **EG-A5-4:** No runtime evidence: graceful-stop behaviour, boot-ID change, Postgres durability and port-forward behaviour are all UNVERIFIED until a released VM step.
- **EG-A5-5:** Lima binaries require download, install and first-run actions (forbidden in this stage).

## 10. Decisions returned to Human Operator

1. Whether to provision Lima v2.2.0 (or another candidate) on the current Mac, and the install location (inside the MA-1 root vs system).
2. Guest image policy: HTTP-only archive image versus a newer Ubuntu release digest (EG-A5-1).
3. Network option (§5 a/b) and whether Lima's host agent counts toward the §6.4 restart set.
4. Whether Parallels is excluded given the existing user VM.
5. WF-9(d) handling of the out-of-root `~/Library/Caches/lima` download cache.

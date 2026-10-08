# RAW_COMMAND_LOG_RT — MA-1 PROVISIONING_RUNTIME_R1

[Task ref]: AI_CICD / MA-1 / PROVISIONING_RUNTIME_R1 · [Executor]: Executor Actor 01 (Execute / WriteExecute)
[Release]: `<OPERATIONS_ROOT>/tasks/AI_CICD/MA1_PROVISIONING_RUNTIME_RELEASE_2026-10-01_r1.md` sha256 `<PRIVATE_REF_03405>`
[Action Receipt]: `AI-CICD-20261001-MA1-RUNTIME-001` (consumed 1/1 before dispatch, ledger 2026-10-01T16:17:09+10:00)
[Wrapper]: `support/rt.sh` (captures `raw/RT-NNN_<label>.{out,err}`, redaction `support/redact_rt.pl`, fail-closed)
[Roots]: runtime `executor/runtime_stage/` · evidence `evidence/runtime_stage/executor/`

### RT-001 — preflight_receipt_host
- start: 2026-10-01T06:26:36Z · end: 2026-10-01T06:26:36Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated)
- command: `bash -c $'\nset -u\necho "== release"; shasum -a 256 ../../../../userops/tasks/ai-cicd/records/source-04508.md; wc -lc < ../../../../userops/tasks/ai-cicd/records/source-04508.md\necho "== receipt (ledger)"; L=../../../../userops/tasks/ai-cicd/records/source-04476.md; shasum -a 256 $L\nawk "/^## Action Receipt \xe2\200\224 2026-10-01T16:15:28/{f=1} /^## Decision \xe2\200\224 2026-10-01T16:17:09/{f=0} f" $L\ngrep -n "AI-CICD-20261001-MA1-RUNTIME-001" ../../../../userops/tasks/ai-cicd/records/source-04480.md\necho "now_local=$(TZ=Australia/Melbourne date +%Y-%m-%dT%H:%M:%S%z) valid_until=2026-10-02T23:59:59+10:00"\necho "== host"; sw_vers; uname -a; sysctl -n machdep.cpu.brand_string hw.ncpu hw.memsize; df -h /Users | tail -1\necho "== host tools"; which -a limactl qemu-img 2>&1; /usr/bin/git --version; $HOSTPY -c "import sys,importlib.metadata as m;print(sys.version.split()[0],\\"playwright\\",m.version(\\"playwright\\"))"; ls <CLIENT_HOME>/Library/Caches/ms-playwright\necho "== real-home Lima baseline"; for p in <CLIENT_HOME>/.lima <CLIENT_HOME>/Library/Caches/lima <CLIENT_HOME>/Library/Application\\ Support/lima; do if [ -e "$p" ]; then echo "PRESENT $p"; ls -la "$p"; else echo "ABSENT $p"; fi; done\necho "== isolated roots"; echo HOME=$HOME LIMA_HOME=$LIMA_HOME; ls -la $HOME $LIMA_HOME\necho "== host VM processes (baseline)"; ps -axo pid,comm | grep -Ei "limactl|vz|qemu|Virtualization" | grep -v grep || echo none\n'`
- stdout: `raw/RT-001_preflight_receipt_host.out` sha256 `<PRIVATE_REF_05811>` · redacted lines: 0
- stderr: `raw/RT-001_preflight_receipt_host.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-002 — preflight_frozen_hashes
- start: 2026-10-01T06:27:14Z · end: 2026-10-01T06:27:15Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated)
- command: `bash -c $'\nset -u; fail=0\nchk() { a=$(shasum -a 256 "$2" | cut -c1-64); if [ "$a" = "$1" ]; then echo "MATCH $a $2"; else echo "MISMATCH expected=$1 actual=$a $2"; fail=1; fi; }\nchk <PRIVATE_REF_01075> ../../../../council/task/ai-cicd/council-records/source-00236.md\nchk <PRIVATE_REF_03403> ../../../../council/task/ai-cicd/council-records/source-00543.md\nchk <PRIVATE_REF_00881> $FX/test_alerta_api_smoke.py\nchk <PRIVATE_REF_02382> $FX/A3_N_STATUS_201_TO_200.patch\nchk <PRIVATE_REF_03225> $FX/test_alerta_ui_flow.py\nchk <PRIVATE_REF_01587> $FX/MA1_MINIMAL_FIXTURE_SPEC.md\nls -la $FX\nG() { git -c core.hooksPath=/dev/null -c credential.helper= "$@"; }\nfor r in backend:<PRIVATE_REF_01617> frontend:<PRIVATE_REF_03446>; do d=${r%%:*}; p=${r#*:}\n h=$(G -C $FROZEN/$d rev-parse HEAD); s=$(G -C $FROZEN/$d status --porcelain | wc -l | tr -d " ")\n [ "$h" = "$p" ] && [ "$s" = 0 ] && echo "PIN_OK $d HEAD=$h porcelain=$s" || { echo "PIN_FAIL $d HEAD=$h porcelain=$s"; fail=1; }\n G -C $FROZEN/$d cat-file -t $p; G -C $FROZEN/$d ls-tree $p -- .env .flaskenv .env.development | awk "{print \\"tracked_credential_path:\\", \\$4, \\"(blob\\", \\$3\\")\\"}"\ndone\nG -C $FROZEN/backend ls-tree $p -- alerta/views/alerts.py 2>/dev/null; G -C $FROZEN/backend ls-tree <PRIVATE_REF_01617> -- alerta/views/alerts.py\necho "PREFLIGHT_HASH_RESULT=$([ $fail = 0 ] && echo ALL_MATCH || echo MISMATCH)"; exit $fail\n'`
- stdout: `raw/RT-002_preflight_frozen_hashes.out` sha256 `<PRIVATE_REF_05406>` · redacted lines: 0
- stderr: `raw/RT-002_preflight_frozen_hashes.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

- note (2026-10-01T06:28:42Z): STOP — the first host mutation beyond root creation (download of the exact pinned Lima asset lima-2.2.0-Darwin-arm64.tar.gz from github.com, to be hash-checked against <PRIVATE_REF_02907>…93c3 and unpacked under executor/runtime_stage/tools/lima-2.2.0/) was refused by the Claude Code host permission layer (auto-mode classifier: Untrusted Code Integration) before execution. Nothing was downloaded; counter stays at 2; downloads/ and tools/ are empty; no VM, no guest, no credential was created. Per the harness rule the refusal is not worked around (no alternate tool, host, URL or split command). Also recorded (inferred, unverified without the Lima binary): the mandated LIMA_HOME is 93 chars, so the instance dir is 100 chars and Lima's longest socket path would be 126 chars, above the macOS 104-char UNIX socket limit that Lima checks at limactl create.

- note (2026-10-02T01:28:48Z): RETRY_R1 (<PRIVATE_REF_02439>…ee0e, receipt AI-CICD-20261001-MA1-RUNTIME-RETRY-001): the wrapper path switch and a read-only manifest check were refused by the auto-mode classifier ([Auto-Mode Bypass]) before execution; EXEC_STOP returned.

- note (2026-10-02T01:28:48Z): INTERACTIVE_RESUME_R1 (<PRIVATE_REF_03120>…1ace, receipt AI-CICD-20261001-MA1-RUNTIME-RESUME-001): of three rt.sh edits, edit 1 (inert line SHORT=/private/tmp/ma1a5) applied; edits 2–3 were refused ([Auto-Mode Bypass]); EXEC_STOP returned. SHA256SUMS_RT (<PRIVATE_REF_01514>…) therefore no longer matches support/rt.sh; it is kept as the first-attempt manifest and superseded by the final manifest.

- note (2026-10-02T01:28:48Z): MANUAL_RESUME_R1 (<PRIVATE_REF_01017>…3c49, receipt AI-CICD-20261002-MA1-RUNTIME-MANUAL-001, session in manual permission mode): rt.sh edits 2–3 applied — SAFE_ENV now HOME=/private/tmp/ma1a5/home LIMA_HOME=/private/tmp/ma1a5/lh (SHORT line authorized by the release). Order: readiness → A4 → derive key → A3-P/A3-S/A3-N → A5 → teardown.

### RT-003 — short_root_create
- start: 2026-10-02T01:28:48Z · end: 2026-10-02T01:28:48Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c set\ -u\;\ T=/private/tmp/ma1a5\;\ echo\ \"pre:\ \$\(ls\ -ld\ \$T\ 2\>\&1\)\"\;\ \[\ -e\ \$T\ \]\ \&\&\ \{\ \[\ -z\ \"\$\(ls\ -A\ \$T\)\"\ \]\ \|\|\ \{\ echo\ NOT_EMPTY\;\ exit\ 3\;\ \}\;\ \}\;\ mkdir\ -p\ \$T/home\ \$T/lh\;\ chmod\ 700\ \$T\ \$T/home\;\ ls\ -la\ \$T\;\ echo\ \"realpath=\$\(cd\ \$T\ \&\&\ pwd\ -P\)\"\;\ echo\ \"HOME=\$HOME\ LIMA_HOME=\$LIMA_HOME\"\;\ S=\"\$LIMA_HOME/ma1-a5/ssh.sock.1234567890123456\"\;\ echo\ \"longest_sock_len=\$\{#S\}\"`
- stdout: `raw/RT-003_short_root_create.out` sha256 `<PRIVATE_REF_05757>` · redacted lines: 0
- stderr: `raw/RT-003_short_root_create.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-004 — lima_download_verify
- start: 2026-10-02T01:30:00Z · end: 2026-10-02T01:30:04Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; U=https://github.com/lima-vm/lima/releases/download/v2.2.0/lima-2.2.0-Darwin-arm64.tar.gz; O=downloads/lima-2.2.0-Darwin-arm64.tar.gz\ncurl -q --proto =https --proto-redir =https --tlsv1.2 -fsSL --max-redirs 5 --retry 3 -o $O -w "http=%{http_code} size=%{size_download} redirects=%{num_redirects}\\n" "$U"\na=$(shasum -a 256 $O | cut -c1-64); echo "asset_sha256=$a"; [ "$a" = <PRIVATE_REF_02907> ] && echo LIMA_ASSET_HASH=MATCH || { echo LIMA_ASSET_HASH=MISMATCH; exit 3; }\nls -l $O; tar -tzf $O | wc -l; tar -tzf $O | grep -v "^share/lima/templates/\\|^share/doc" | head -30\n'`
- stdout: `raw/RT-004_lima_download_verify.out` sha256 `<PRIVATE_REF_05072>` · redacted lines: 0
- stderr: `raw/RT-004_lima_download_verify.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

- note (2026-10-02T03:25:20Z): FRESH_CONTINUATION_R1 (<PRIVATE_REF_02515>…6928, receipt AI-CICD-20261002-MA1-RUNTIME-FRESH-001, consumed 1/1 before dispatch; fresh Executor Actor 01 session, manual mode visually confirmed by Operations Coordinator). Controlling: base <PRIVATE_REF_03405>…e197 + retry delta <PRIVATE_REF_02439>…ee0e. Resuming at RT-005 with the retained RT-004 tarball.

### RT-005 — lima_unpack_inspect
- start: 2026-10-02T03:25:20Z · end: 2026-10-02T03:25:21Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; O=downloads/lima-2.2.0-Darwin-arm64.tar.gz; D=tools/lima-2.2.0\na=$(shasum -a 256 $O | cut -c1-64); echo "asset_sha256=$a"; [ "$a" = <PRIVATE_REF_02907> ] && echo LIMA_ASSET_HASH=MATCH || { echo LIMA_ASSET_HASH=MISMATCH; exit 3; }\n[ -z "$(ls -A tools)" ] || { echo TOOLS_NOT_EMPTY; ls -la tools; exit 4; }\ntar -tzf $O | grep -E "(^/|\\.\\./)" && { echo UNSAFE_TAR_PATH; exit 5; } || echo tar_paths_safe\nmkdir -p $D && tar -xzf $O -C $D && echo unpacked_to=$D\necho "== bin/libexec"; ls -la $D/bin $D/libexec $D/libexec/lima 2>/dev/null\necho "== executable hashes"; find $D -type f -perm -u+x -exec shasum -a 256 {} \\;\necho "== xattr"; xattr -lr $D/bin 2>&1 | head\necho "== codesign"; for f in $D/bin/limactl; do codesign -dv "$f" 2>&1; done\necho "== version"; $D/bin/limactl --version; command -v limactl\necho "== file count"; find $D -type f | wc -l\n'`
- stdout: `raw/RT-005_lima_unpack_inspect.out` sha256 `<PRIVATE_REF_05414>` · redacted lines: 0
- stderr: `raw/RT-005_lima_unpack_inspect.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-006 — ubuntu_image_download_verify
- start: 2026-10-02T03:25:45Z · end: 2026-10-02T03:28:30Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; B=https://cloud-images.ubuntu.com/releases/noble/release-20260926; I=ubuntu-24.04-server-cloudimg-arm64.img; E=<PRIVATE_REF_01095>\nC="curl -q --proto =https --proto-redir =https --tlsv1.2 -fsSL --max-redirs 5 --retry 3"\n$C -o downloads/SHA256SUMS.release-20260926 -w "sums http=%{http_code} size=%{size_download} url=%{url_effective}\\n" "$B/SHA256SUMS" || exit 2\necho "== authoritative dated SHA256SUMS line"; grep -F " *$I" downloads/SHA256SUMS.release-20260926 || grep -F "$I" downloads/SHA256SUMS.release-20260926\nS=$(grep -E "[ *]$I\\$" downloads/SHA256SUMS.release-20260926 | cut -c1-64); echo "sums_hash=$S"\n[ "$S" = "$E" ] && echo SUMS_FILE_AGREES_WITH_PIN || { echo SUMS_FILE_DISAGREES_WITH_PIN; exit 3; }\n$C -o downloads/$I -w "image http=%{http_code} size=%{size_download} url=%{url_effective}\\n" "$B/$I" || exit 2\na=$(shasum -a 256 downloads/$I | cut -c1-64); echo "image_sha256=$a"\n[ "$a" = "$E" ] && echo UBUNTU_IMAGE_HASH=MATCH || { echo UBUNTU_IMAGE_HASH=MISMATCH; exit 3; }\nls -l downloads; shasum -a 256 downloads/SHA256SUMS.release-20260926\n'`
- stdout: `raw/RT-006_ubuntu_image_download_verify.out` sha256 `<PRIVATE_REF_05427>` · redacted lines: 0
- stderr: `raw/RT-006_ubuntu_image_download_verify.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-007 — vm_definition_validate
- start: 2026-10-02T03:29:14Z · end: 2026-10-02T03:29:14Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; shasum -a 256 vm/ma1-a5.yaml; echo "HOME=$HOME LIMA_HOME=$LIMA_HOME"; which limactl\nlimactl validate vm/ma1-a5.yaml && echo VALIDATE_OK\necho "== filled"; limactl validate --fill vm/ma1-a5.yaml\n'`
- stdout: `raw/RT-007_vm_definition_validate.out` sha256 `<PRIVATE_REF_05659>` · redacted lines: 0
- stderr: `raw/RT-007_vm_definition_validate.err` sha256 `<PRIVATE_REF_04954>` · redacted lines: 0

### RT-008 — vm_create
- start: 2026-10-02T03:30:08Z · end: 2026-10-02T03:30:12Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; echo "pre: $(find $LIMA_HOME -mindepth 1 | wc -l) entries in LIMA_HOME; real ~/.lima: $( [ -e <CLIENT_HOME>/.lima ] && echo PRESENT || echo ABSENT ); real cache: $( [ -e <CLIENT_HOME>/Library/Caches/lima ] && echo PRESENT || echo ABSENT )"\nd=$(shasum -a 256 vm/ma1-a5.yaml | cut -c1-64); echo "vm_def_sha256=$d"; [ "$d" = <PRIVATE_REF_05001> ] || { echo VMDEF_CHANGED; exit 3; }\nlimactl create --name=ma1-a5 --tty=false vm/ma1-a5.yaml\nrc=$?; echo "create_rc=$rc"; limactl list; ls -la $LIMA_HOME $LIMA_HOME/ma1-a5; exit $rc\n'`
- stdout: `raw/RT-008_vm_create.out` sha256 `<PRIVATE_REF_04286>` · redacted lines: 0
- stderr: `raw/RT-008_vm_create.err` sha256 `<PRIVATE_REF_03763>` · redacted lines: 0

### RT-009 — vm_first_start
- start: 2026-10-02T03:35:15Z · end: 2026-10-02T03:35:28Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; limactl start --tty=false --timeout=10m ma1-a5; rc=$?; echo "start_rc=$rc"; limactl list\nlimactl shell ma1-a5 bash -c "uname -a; cat /etc/os-release | head -4; cat /proc/sys/kernel/random/boot_id; nproc; free -g | head -2; df -h / | tail -1; ip -4 -o addr show; ip route; findmnt -t virtiofs,9p,fuse.sshfs || echo no_host_mounts; systemctl is-system-running"\nexit $rc\n'`
- stdout: `raw/RT-009_vm_first_start.out` sha256 `<PRIVATE_REF_04454>` · redacted lines: 0
- stderr: `raw/RT-009_vm_first_start.err` sha256 `<PRIVATE_REF_05099>` · redacted lines: 0

### RT-010 — source_export_pins
- start: 2026-10-02T03:39:15Z · end: 2026-10-02T03:39:16Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; G() { git -c core.hooksPath=/dev/null -c credential.helper= "$@"; }\nBP=<PRIVATE_REF_01617>; FP=<PRIVATE_REF_03446>\nfor r in backend:$BP frontend:$FP; do d=${r%%:*}; p=${r#*:}; h=$(G -C $FROZEN/$d rev-parse HEAD); s=$(G -C $FROZEN/$d status --porcelain | wc -l | tr -d " "); echo "pin $d HEAD=$h porcelain=$s"; [ "$h" = "$p" ] && [ "$s" = 0 ] || { echo PIN_FAIL; exit 3; }; done\nG -C $FROZEN/backend archive --format=tar --prefix=backend/ -o $RT/host/backend-$BP.tar $BP -- . ":(exclude).env" ":(exclude).flaskenv"\nG -C $FROZEN/frontend archive --format=tar --prefix=frontend/ -o $RT/host/frontend-$FP.tar $FP -- . ":(exclude).env.development"\nfor t in $RT/host/*.tar; do echo "== $t"; shasum -a 256 $t; tar -tf $t | wc -l; for x in .env .flaskenv .env.development; do tar -tf $t | grep -E "^(backend|frontend)/$x\\$" && echo "CRED_PATH_PRESENT $x" || echo "absent $x"; done; done\necho "== positive control (same grep finds a known file)"; tar -tf $RT/host/backend-$BP.tar | grep -E "^backend/wsgi.py\\$"; tar -tf $RT/host/frontend-$FP.tar | grep -E "^frontend/package-lock.json\\$"\necho "== frozen alerts.py blob"; G -C $FROZEN/backend rev-parse $BP:alerta/views/alerts.py\n'`
- stdout: `raw/RT-010_source_export_pins.out` sha256 `<PRIVATE_REF_05243>` · redacted lines: 0
- stderr: `raw/RT-010_source_export_pins.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-011 — guest_copy_inputs
- start: 2026-10-02T03:40:42Z · end: 2026-10-02T03:40:43Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; BP=<PRIVATE_REF_01617>; FP=<PRIVATE_REF_03446>\nlimactl shell ma1-a5 mkdir -p /tmp/ma1in || exit 1\nlimactl copy host/backend-$BP.tar host/frontend-$FP.tar $FX/A3_N_STATUS_201_TO_200.patch $EV/support/guest_setup.sh ma1-a5:/tmp/ma1in/ || exit 1\nlimactl shell ma1-a5 sudo bash -c "mkdir -p /opt/ma1/in && mv /tmp/ma1in/* /opt/ma1/in/ && rmdir /tmp/ma1in && chmod 755 /opt/ma1/in/guest_setup.sh && sha256sum /opt/ma1/in/*"\necho "== host-side hashes"; shasum -a 256 host/*.tar $FX/A3_N_STATUS_201_TO_200.patch $EV/support/guest_setup.sh\n'`
- stdout: `raw/RT-011_guest_copy_inputs.out` sha256 `<PRIVATE_REF_05835>` · redacted lines: 0
- stderr: `raw/RT-011_guest_copy_inputs.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-012 — guest_os_packages
- start: 2026-10-02T03:40:55Z · end: 2026-10-02T03:42:32Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo /opt/ma1/in/guest_setup.sh os`
- stdout: `raw/RT-012_guest_os_packages.out` sha256 `<PRIVATE_REF_05455>` · redacted lines: 0
- stderr: `raw/RT-012_guest_os_packages.err` sha256 `<PRIVATE_REF_04729>` · redacted lines: 0

### RT-013 — guest_backend_install
- start: 2026-10-02T03:42:38Z · end: 2026-10-02T03:42:54Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo /opt/ma1/in/guest_setup.sh backend`
- stdout: `raw/RT-013_guest_backend_install.out` sha256 `<PRIVATE_REF_05220>` · redacted lines: 0
- stderr: `raw/RT-013_guest_backend_install.err` sha256 `<PRIVATE_REF_04477>` · redacted lines: 0

### RT-014 — guest_frontend_build
- start: 2026-10-02T03:43:01Z · end: 2026-10-02T03:44:56Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo /opt/ma1/in/guest_setup.sh frontend`
- stdout: `raw/RT-014_guest_frontend_build.out` sha256 `<PRIVATE_REF_02565>` · redacted lines: 0
- stderr: `raw/RT-014_guest_frontend_build.err` sha256 `<PRIVATE_REF_03101>` · redacted lines: 0

- note (2026-10-02T03:46:18Z): INC-1 (observed after RT-014): npm ci ran the lifecycle postinstall of the lock-pinned devDependency cypress@15.13.0 (via @vue/cli-plugin-e2e-cypress), which downloaded the Cypress binary (~670M) into guest <CLIENT_HOME>/.cache/Cypress from the Cypress download host. Guest-only network; not a host action, not a shell installer; unused by any control; destroyed with the VM disk at teardown. Recorded as a departure from a strict registry-only reading of guest network scope. Also: frozen UI build emitted webpack warning export ExportToCsv not found in export-to-csv (CSV export path; not exercised by A4/A5).

- note (2026-10-02T03:46:18Z): Out-of-wrapper read-only check (2026-10-02T03:47Z approx): one direct limactl shell ma1-a5 call listing ~/.cache sizes to confirm INC-1; no mutation.

### RT-015 — guest_services
- start: 2026-10-02T03:46:18Z · end: 2026-10-02T03:46:19Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo /opt/ma1/in/guest_setup.sh services`
- stdout: `raw/RT-015_guest_services.out` sha256 `<PRIVATE_REF_05449>` · redacted lines: 0
- stderr: `raw/RT-015_guest_services.err` sha256 `<PRIVATE_REF_05552>` · redacted lines: 0

### RT-016 — stack_readiness
- start: 2026-10-02T03:46:39Z · end: 2026-10-02T03:47:41Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; IP=$(limactl shell ma1-a5 ip -4 -o addr show dev lima0 | sed -E "s/.*inet ([0-9.]+)\\/.*/\\1/"); echo "guest_vznat_ip=$IP"\nC="curl -q -sS --noproxy * -m 5"\nfor i in $(seq 1 30); do s=$($C -o /dev/null -w "%{http_code}" http://$IP/api/management/gtg 2>/dev/null); [ "$s" = 200 ] && break; sleep 2; done; echo "gtg_poll_attempts=$i last_status=$s"\nM=$(date -u +%Y-%m-%dT%H:%M:%SZ); echo "host_probe_marker=$M"\necho "== UI index"; $C -o /dev/null -w "GET / http=%{http_code} type=%{content_type} size=%{size_download}\\n" http://$IP/\necho "== UI deep link"; $C -o /dev/null -w "GET /alerts http=%{http_code} size=%{size_download}\\n" http://$IP/alerts\necho "== UI config.json"; $C http://$IP/config.json; echo\necho "== API gtg"; $C -w "\\nhttp=%{http_code}\\n" http://$IP/api/management/gtg\necho "== API /config (public client config)"; $C http://$IP/api/config | /usr/bin/python3 -c "import json,sys; d=json.load(sys.stdin); print({k:d.get(k) for k in [\\"auth_required\\",\\"provider\\",\\"signup_enabled\\",\\"email_verification\\",\\"readonly\\" if \\"readonly\\" in d else \\"allow_readonly\\",\\"environments\\",\\"endpoint\\"]})"\necho "== API protected without credentials"; $C -o /dev/null -w "GET /api/alerts http=%{http_code}\\n" http://$IP/api/alerts\necho "== guest processes"; limactl shell ma1-a5 bash -c "ps -eo pid,lstart,cmd | grep -E \\"[p]ostgres|[g]unicorn|[n]ginx\\" | cut -c1-160"\necho "== guest listeners"; limactl shell ma1-a5 sudo ss -ltnp\necho "== guest host mounts"; limactl shell ma1-a5 bash -c "findmnt -rn -t virtiofs,9p,fuse.sshfs,nfs,cifs; echo findmnt_rc=\\$?; findmnt -rn / ; mount | grep -c . "\necho "== backend access log (correlation)"; limactl shell ma1-a5 sudo tail -n 8 /var/log/alerta/access.log\necho "== nginx access log tail"; limactl shell ma1-a5 sudo tail -n 8 /var/log/nginx/ma1_access.log\necho "== host listeners owned by Lima processes"; /usr/sbin/lsof -nP -iTCP -sTCP:LISTEN 2>/dev/null | grep -Ei "lima|COMMAND" ; echo "== host listeners on 80/8080/5432"; /usr/sbin/lsof -nP -iTCP:80 -iTCP:8080 -iTCP:5432 -sTCP:LISTEN 2>/dev/null || echo none\n'`
- stdout: `raw/RT-016_stack_readiness.out` sha256 `<PRIVATE_REF_04523>` · redacted lines: 1
- stderr: `raw/RT-016_stack_readiness.err` sha256 `<PRIVATE_REF_05402>` · redacted lines: 0

- note (2026-10-02T03:52:37Z): RT-016 defects: (a) unquoted curl --noproxy * was glob-expanded by the shell into runtime_stage directory names, producing the curl (6) noise and a misleading gtg_poll_attempts=30 line; the final real request of each probe is valid but RT-016 is superseded by RT-017 for readiness. (b) gunicorn --access-logfile stays empty because the frozen app logging dictConfig sets disable_existing_loggers=True (alerta/utils/logging.py:45), silencing gunicorn.access. The authoritative backend access log is therefore the frozen app own per-request log (alerta.app after_request log_response: method, path, status, size, request_id) in journald unit alerta-backend; nginx /var/log/nginx/ma1_access.log is the proxy-side corroboration. No config change.

- note (2026-10-02T03:52:37Z): INC-2: at first service start (13:46:18 guest local) gunicorn worker 9707 exited code 3 (Worker failed to boot); master exited, systemd Restart=on-failure restarted once at 13:46:19 and the service has been stable since. Traceback not captured (gunicorn error logger also disabled by the frozen dictConfig). Hypothesis (UNVERIFIED): concurrent first-time schema creation by two workers on an empty database.

- note (2026-10-02T03:52:37Z): Out-of-wrapper read-only checks (approx 03:48–03:52Z): limactl shell ma1-a5 ls/tail/journalctl of /var/log/alerta and unit alerta-backend for the two findings above; no mutation.

### RT-017 — stack_readiness_clean
- start: 2026-10-02T03:52:37Z · end: 2026-10-02T03:52:38Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; IP=$(limactl shell ma1-a5 ip -4 -o addr show dev lima0 | sed -E "s/.*inet ([0-9.]+)\\/.*/\\1/"); echo "guest_vznat_ip=$IP"\nC() { curl -q -sS --noproxy "*" -m 5 "$@"; }\nCUR=$(limactl shell ma1-a5 sudo journalctl -u alerta-backend -n 0 --show-cursor -q | sed -n "s/^-- cursor: //p")\nfor i in $(seq 1 30); do s=$(C -o /dev/null -w "%{http_code}" http://$IP/api/management/gtg 2>/dev/null); [ "$s" = 200 ] && break; sleep 2; done; echo "gtg_poll_attempts=$i last_status=$s"\nC -o /dev/null -w "GET / http=%{http_code} type=%{content_type} size=%{size_download}\\n" http://$IP/\nC -o /dev/null -w "GET /alerts (SPA deep link) http=%{http_code} size=%{size_download}\\n" http://$IP/alerts\nprintf "GET /config.json body="; C http://$IP/config.json\nC -w " <- GET /api/management/gtg http=%{http_code}\\n" http://$IP/api/management/gtg\nC -o /dev/null -w "GET /api/alerts (no credentials) http=%{http_code}\\n" http://$IP/api/alerts\necho "== backend request log since cursor (authoritative backend access log)"\nlimactl shell ma1-a5 sudo journalctl -u alerta-backend --after-cursor="$CUR" -o short-iso | grep -E "alerta.app\\[[0-9]+\\]: \\[INFO\\] \\""\necho "== nginx proxy log tail"; limactl shell ma1-a5 sudo tail -n 5 /var/log/nginx/ma1_access.log\necho "== serving processes are in the guest"; limactl shell ma1-a5 bash -c "ps -eo pid,lstart,cmd | grep -E \\"[p]ostgres -D|[g]unicorn|[n]ginx: master\\" | cut -c1-140"\necho "== host has no app listener"; /usr/sbin/lsof -nP -iTCP:80 -iTCP:8080 -iTCP:5432 -sTCP:LISTEN 2>/dev/null || echo "none on 80/8080/5432"\necho "positive control: lsof sees Lima ssh listener:"; /usr/sbin/lsof -nP -iTCP -sTCP:LISTEN 2>/dev/null | grep -c limactl\n'`
- stdout: `raw/RT-017_stack_readiness_clean.out` sha256 `<PRIVATE_REF_05830>` · redacted lines: 0
- stderr: `raw/RT-017_stack_readiness_clean.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-018 — run_id_and_synthetic_account
- start: 2026-10-02T03:55:56Z · end: 2026-10-02T03:55:56Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; RID="ma1r-20261002-$(od -An -N3 -tx1 /dev/urandom | tr -d " \\n")"; IP=<IP_ADDRESS_131>\nprintf "{\\"run_id\\": \\"%s\\", \\"guest_ip\\": \\"%s\\", \\"ui_url\\": \\"http://%s\\", \\"api_url\\": \\"http://%s/api\\"}\\n" $RID $IP $IP $IP > $EV/scratch/ma1_state.json\necho "== non-secret run state"; cat $EV/scratch/ma1_state.json\necho "== generate synthetic AMD-DK2 account in guest 0600 file (values not printed)"\nlimactl shell ma1-a5 sudo install -d -m 0700 -o lima -g lima /var/lib/ma1 /var/lib/ma1/cred\nlimactl shell ma1-a5 bash -c "umask 077; python3 -c \\"import secrets,sys; rid=sys.argv[1]; print(\\\\\\"MA1_UI_USER_EMAIL=ma1-a4-\\\\\\"+rid+\\\\\\"@example.com\\\\\\"); print(\\\\\\"MA1_UI_USER_PASSWORD=<CREDENTIAL_VALUE_REMOVED>"<CREDENTIAL_VALUE_REMOVED>\\" $RID > /var/lib/ma1/cred/a4.env; stat -c \\"%a %U:%G %s bytes %n\\" /var/lib/ma1/cred /var/lib/ma1/cred/a4.env; grep -c = /var/lib/ma1/cred/a4.env; grep ^MA1_UI_USER_EMAIL= /var/lib/ma1/cred/a4.env"\necho "== fixture hashes before controls"; shasum -a 256 $FX/test_alerta_api_smoke.py $FX/A3_N_STATUS_201_TO_200.patch $FX/test_alerta_ui_flow.py $FX/MA1_MINIMAL_FIXTURE_SPEC.md\necho "== support hashes"; shasum -a 256 $EV/support/*\necho "== vm definition"; shasum -a 256 vm/ma1-a5.yaml\necho "== host runtime"; $HOSTPY --version; $HOSTPY -c "import importlib.metadata as m; print(\\"playwright\\", m.version(\\"playwright\\"))"\n'`
- stdout: `raw/RT-018_run_id_and_synthetic_account.out` sha256 `<PRIVATE_REF_05256>` · redacted lines: 0
- stderr: `raw/RT-018_run_id_and_synthetic_account.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-019 — A4_ui_flow
- start: 2026-10-02T03:56:05Z · end: 2026-10-02T03:56:09Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; CUR=$(limactl shell ma1-a5 sudo journalctl -u alerta-backend -n 0 --show-cursor -q | sed -n "s/^-- cursor: //p")\n$HOSTPY $EV/support/ma1_run.py a4; rc=$?; echo "A4_EXIT=$rc"\necho "== backend request log during A4 (/auth/*)"; limactl shell ma1-a5 sudo journalctl -u alerta-backend --after-cursor="$CUR" -o short-iso | grep -E "alerta.app\\[[0-9]+\\]: \\[INFO\\] \\"" | grep -E "/auth/"\necho "== nginx /api/auth lines"; limactl shell ma1-a5 sudo grep -E "/api/auth/" /var/log/nginx/ma1_access.log\nls -la $EV/shots/A4; exit $rc\n'`
- stdout: `raw/RT-019_A4_ui_flow.out` sha256 `<PRIVATE_REF_04165>` · redacted lines: 0
- stderr: `raw/RT-019_A4_ui_flow.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-020 — derive_synthetic_api_key
- start: 2026-10-02T03:56:27Z · end: 2026-10-02T03:56:27Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; $HOSTPY $EV/support/ma1_run.py derive-key; rc=$?\nlimactl shell ma1-a5 bash -c "stat -c \\"%a %U:%G %s bytes %n\\" /var/lib/ma1/cred/a4.env; cut -d= -f1 /var/lib/ma1/cred/a4.env"; exit $rc\n'`
- stdout: `raw/RT-020_derive_synthetic_api_key.out` sha256 `<PRIVATE_REF_04134>` · redacted lines: 0
- stderr: `raw/RT-020_derive_synthetic_api_key.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-021 — A3_P_probe
- start: 2026-10-02T03:57:27Z · end: 2026-10-02T03:57:27Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; shasum -a 256 $FX/test_alerta_api_smoke.py vm/ma1-a5.yaml\nNL=$(limactl shell ma1-a5 sudo wc -l < /dev/null; limactl shell ma1-a5 sudo bash -c "wc -l < /var/log/nginx/ma1_access.log")\nCUR=$(limactl shell ma1-a5 sudo journalctl -u alerta-backend -n 0 --show-cursor -q | sed -n "s/^-- cursor: //p")\n$HOSTPY $EV/support/ma1_run.py a3 <PRIVATE_URL_0006> 2>&1; rc=$?; echo "A3P_EXIT=$rc"\necho "== backend request log during A3-P"; L=$(limactl shell ma1-a5 sudo journalctl -u alerta-backend --after-cursor="$CUR" -o short-iso | grep -E "alerta.app\\[[0-9]+\\]: \\[INFO\\] \\""); echo "$L"; echo "backend_request_lines=$(printf "%s\\n" "$L" | grep -c .)"\necho "== nginx lines during A3-P"; limactl shell ma1-a5 sudo bash -c "tail -n +$((NL+1)) /var/log/nginx/ma1_access.log"\nexit $rc\n'`
- stdout: `raw/RT-021_A3_P_probe.out` sha256 `<PRIVATE_REF_05029>` · redacted lines: 2
- stderr: `raw/RT-021_A3_P_probe.err` sha256 `<PRIVATE_REF_04079>` · redacted lines: 0

- note (2026-10-02T03:58:35Z): RT-021 capture defect: the nginx-tail corroboration line computed its start offset wrongly (two commands concatenated into NL) and printed a bash arithmetic error; the A3-P result and the 7-line backend correlation are unaffected. RT-022 supplies the nginx corroboration for the A3-P window by timestamp. Redaction also rewrote the runner banner text ALERTA_API_KEY=<from ...> to <REDACTED> (no secret present; over-redaction only).

### RT-022 — A3_P_nginx_corroboration
- start: 2026-10-02T03:58:35Z · end: 2026-10-02T03:58:36Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo grep -F 02/Oct/2026:13:57:27 /var/log/nginx/ma1_access.log`
- stdout: `raw/RT-022_A3_P_nginx_corroboration.out` sha256 `<PRIVATE_REF_04843>` · redacted lines: 0
- stderr: `raw/RT-022_A3_P_nginx_corroboration.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-023 — A3_S_probe
- start: 2026-10-02T03:58:36Z · end: 2026-10-02T03:58:39Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; shasum -a 256 $FX/test_alerta_api_smoke.py\necho "== no-listener proof: guest port 9"; limactl shell ma1-a5 sudo ss -ltnH "sport = :9" | grep -c . ; curl -q -sS --noproxy "*" -m 5 -o /dev/null -w "%{http_code}\\n" <PRIVATE_URL_0009>; echo "curl_rc=$?"\nNL=$(limactl shell ma1-a5 sudo bash -c "wc -l < /var/log/nginx/ma1_access.log")\nCUR=$(limactl shell ma1-a5 sudo journalctl -u alerta-backend -n 0 --show-cursor -q | sed -n "s/^-- cursor: //p")\n$HOSTPY $EV/support/ma1_run.py a3 <PRIVATE_URL_0008> 2>&1; rc=$?; echo "A3S_EXIT=$rc"\nL=$(limactl shell ma1-a5 sudo journalctl -u alerta-backend --after-cursor="$CUR" -o short-iso | grep -E "alerta.app\\[[0-9]+\\]: \\[INFO\\] \\""); echo "backend_request_lines=$(printf "%s" "$L" | grep -c .)"; echo "$L"\necho "nginx_new_lines=$(limactl shell ma1-a5 sudo bash -c "tail -n +$((NL+1)) /var/log/nginx/ma1_access.log | wc -l")"\necho "== restore: real endpoint health"; curl -q -sS --noproxy "*" -m 5 -w " http=%{http_code}\\n" <PRIVATE_URL_0008>\n[ $rc -ne 0 ] && exit 0 || exit 9\n'`
- stdout: `raw/RT-023_A3_S_probe.out` sha256 `<PRIVATE_REF_05087>` · redacted lines: 2
- stderr: `raw/RT-023_A3_S_probe.err` sha256 `<PRIVATE_REF_04337>` · redacted lines: 0

### RT-024 — A3_N_apply_patch_restart
- start: 2026-10-02T03:59:07Z · end: 2026-10-02T03:59:09Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo bash -c $'\nset -u; cd /opt/ma1/src/backend; P=/opt/ma1/in/A3_N_STATUS_201_TO_200.patch\nsha256sum $P; echo "pre blob=$(git hash-object alerta/views/alerts.py)"; [ "$(git hash-object alerta/views/alerts.py)" = <PRIVATE_REF_01618> ] || { echo PRE_BLOB_MISMATCH; exit 3; }\ninstall -d /opt/ma1/a3n && cp -p alerta/views/alerts.py /opt/ma1/a3n/alerts.py.orig\ngit apply --check -v $P && git apply -v $P || exit 4\ngit diff --no-index --stat /opt/ma1/a3n/alerts.py.orig alerta/views/alerts.py; git diff --no-index /opt/ma1/a3n/alerts.py.orig alerta/views/alerts.py | sed -n "1,20p"\nb=$(git hash-object alerta/views/alerts.py); echo "patched blob=$b"; [ "$b" = <PRIVATE_REF_01394> ] && echo PATCHED_BLOB=MATCH || { echo PATCHED_BLOB=MISMATCH; exit 5; }\necho "canonical source untouched: patch applied only to VM copy /opt/ma1/src/backend"\nsystemctl restart alerta-backend; for i in $(seq 1 30); do s=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8080/management/gtg); [ "$s" = 200 ] && break; sleep 1; done; echo "gtg after restart: attempts=$i status=$s"\nsystemctl show alerta-backend -p ActiveEnterTimestamp -p NRestarts -p MainPID; [ "$s" = 200 ]\n'`
- stdout: `raw/RT-024_A3_N_apply_patch_restart.out` sha256 `<PRIVATE_REF_04365>` · redacted lines: 0
- stderr: `raw/RT-024_A3_N_apply_patch_restart.err` sha256 `<PRIVATE_REF_03803>` · redacted lines: 0

### RT-025 — A3_N_probe
- start: 2026-10-02T03:59:21Z · end: 2026-10-02T03:59:21Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; shasum -a 256 $FX/test_alerta_api_smoke.py\nNL=$(limactl shell ma1-a5 sudo bash -c "wc -l < /var/log/nginx/ma1_access.log")\nCUR=$(limactl shell ma1-a5 sudo journalctl -u alerta-backend -n 0 --show-cursor -q | sed -n "s/^-- cursor: //p")\n$HOSTPY $EV/support/ma1_run.py a3 <PRIVATE_URL_0006> 2>&1; rc=$?; echo "A3N_EXIT=$rc"\nL=$(limactl shell ma1-a5 sudo journalctl -u alerta-backend --after-cursor="$CUR" -o short-iso | grep -E "alerta.app\\[[0-9]+\\]: \\[INFO\\] \\""); echo "== backend request log during A3-N"; echo "$L"; echo "backend_request_lines=$(printf "%s\\n" "$L" | grep -c .)"; echo "backend_5xx=$(printf "%s\\n" "$L" | grep -cE "\\" 5[0-9][0-9] ")"\necho "== nginx lines during A3-N"; limactl shell ma1-a5 sudo bash -c "tail -n +$((NL+1)) /var/log/nginx/ma1_access.log"\nexit 0\n'`
- stdout: `raw/RT-025_A3_N_probe.out` sha256 `<PRIVATE_REF_05615>` · redacted lines: 2
- stderr: `raw/RT-025_A3_N_probe.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

- note (2026-10-02T04:00:15Z): Observation for review: A3-P, A3-S and A3-N all ran with the single release-mandated MA1_RUN_ID ma1r-20261002-5714d2, so the probe resource name ma1-a3-probe-ma1r-20261002-5714d2 is shared across the three A3 controls (fixture spec §6 says never reuse ids across controls; base release says one unique MA1_RUN_ID). Alert ids were distinct (A3-P 59125107-…, A3-N f887286a-…); A3-P deleted its alert and proved absence by id and filtered list before A3-N; A3-S created nothing.

### RT-026 — A3_N_revert_restart
- start: 2026-10-02T04:00:15Z · end: 2026-10-02T04:00:16Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo bash -c $'\nset -u; cd /opt/ma1/src/backend; P=/opt/ma1/in/A3_N_STATUS_201_TO_200.patch\ngit apply -R --check -v $P && git apply -R -v $P || exit 4\nb=$(git hash-object alerta/views/alerts.py); echo "reverted blob=$b"; [ "$b" = <PRIVATE_REF_01618> ] && echo REVERTED_BLOB=MATCH || { echo REVERTED_BLOB=MISMATCH; exit 5; }\ncmp alerta/views/alerts.py /opt/ma1/a3n/alerts.py.orig && echo identical_to_pre_patch_copy\nsystemctl restart alerta-backend; for i in $(seq 1 30); do s=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8080/management/gtg); [ "$s" = 200 ] && break; sleep 1; done; echo "gtg after restart: attempts=$i status=$s"\nsystemctl show alerta-backend -p ActiveEnterTimestamp -p NRestarts -p MainPID; [ "$s" = 200 ]\n'`
- stdout: `raw/RT-026_A3_N_revert_restart.out` sha256 `<PRIVATE_REF_05289>` · redacted lines: 0
- stderr: `raw/RT-026_A3_N_revert_restart.err` sha256 `<PRIVATE_REF_03803>` · redacted lines: 0

### RT-027 — post_revert_health_create_status
- start: 2026-10-02T04:00:16Z · end: 2026-10-02T04:00:16Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; curl -q -sS --noproxy "*" -m 5 -w " <- host GET /api/management/gtg http=%{http_code}\\n" <PRIVATE_URL_0008>\n'`
- stdout: `raw/RT-027_post_revert_health_create_status.out` sha256 `<PRIVATE_REF_04246>` · redacted lines: 0
- stderr: `raw/RT-027_post_revert_health_create_status.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-028 — A5_P_ui_create
- start: 2026-10-02T04:02:16Z · end: 2026-10-02T04:02:19Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; R=$($HOSTPY -c "import json;print(\\"ma1-a5-P-\\"+json.load(open(\\"$EV/scratch/ma1_state.json\\"))[\\"run_id\\"])")\necho "== before: resource absent"; $HOSTPY $EV/support/ma1_run.py api-blackouts-resource $R || exit 1\nOUT=$($HOSTPY $EV/support/ma1_run.py a5-create P); rc=$?; echo "$OUT"; [ $rc = 0 ] || exit $rc\nID=$(printf "%s\\n" "$OUT" | grep "^{" | $HOSTPY -c "import json,sys; print(json.loads(sys.stdin.read())[\\"id\\"])")\n$HOSTPY -c "import json; p=\\"$EV/scratch/ma1_state.json\\"; s=json.load(open(p)); s[\\"a5_p_id\\"]=\\"$ID\\"; s[\\"a5_p_resource\\"]=\\"$R\\"; json.dump(s,open(p,\\"w\\")); print(json.dumps(s))"\necho "== after: present by id and in list"; $HOSTPY $EV/support/ma1_run.py api-blackout $ID; $HOSTPY $EV/support/ma1_run.py api-blackouts-resource $R\n'`
- stdout: `raw/RT-028_A5_P_ui_create.out` sha256 `<PRIVATE_REF_04075>` · redacted lines: 0
- stderr: `raw/RT-028_A5_P_ui_create.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-029 — A5_N_create_delete_and_S_sentinel
- start: 2026-10-02T04:02:31Z · end: 2026-10-02T04:02:35Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; S=$EV/scratch/ma1_state.json; RID=$($HOSTPY -c "import json;print(json.load(open(\\"$S\\"))[\\"run_id\\"])"); R=ma1-a5-N-$RID\necho "== A5-N before: resource absent"; $HOSTPY $EV/support/ma1_run.py api-blackouts-resource $R || exit 1\nOUT=$($HOSTPY $EV/support/ma1_run.py a5-create N); rc=$?; echo "$OUT"; [ $rc = 0 ] || exit $rc\nID=$(printf "%s\\n" "$OUT" | grep "^{" | $HOSTPY -c "import json,sys; print(json.loads(sys.stdin.read())[\\"id\\"])")\necho "== A5-N present after UI create"; $HOSTPY $EV/support/ma1_run.py api-blackout $ID\necho "== A5-N delete through UI"; $HOSTPY $EV/support/ma1_run.py a5-delete $ID || exit 1\necho "== A5-N absent before restart"; $HOSTPY $EV/support/ma1_run.py api-blackout $ID; $HOSTPY $EV/support/ma1_run.py api-blackouts-resource $R\nSID=$($HOSTPY -c "import uuid; print(uuid.uuid4())"); echo "== A5-S sentinel id generated, never submitted: $SID"\n$HOSTPY $EV/support/ma1_run.py api-blackout $SID\n$HOSTPY -c "import json; p=\\"$S\\"; s=json.load(open(p)); s.update(a5_n_id=\\"$ID\\", a5_n_resource=\\"$R\\", a5_s_id=\\"$SID\\"); json.dump(s,open(p,\\"w\\")); print(json.dumps(s))"\necho "== A5-P still present"; $HOSTPY $EV/support/ma1_run.py api-blackout $($HOSTPY -c "import json;print(json.load(open(\\"$S\\"))[\\"a5_p_id\\"])")\n'`
- stdout: `raw/RT-029_A5_N_create_delete_and_S_sentinel.out` sha256 `<PRIVATE_REF_05215>` · redacted lines: 0
- stderr: `raw/RT-029_A5_N_create_delete_and_S_sentinel.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-030 — A5_pre_restart_identity
- start: 2026-10-02T04:02:53Z · end: 2026-10-02T04:02:53Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; echo "host_utc=$(date -u +%Y-%m-%dT%H:%M:%SZ)"; limactl list\nlimactl shell ma1-a5 sudo bash -c "echo boot_id=\\$(cat /proc/sys/kernel/random/boot_id); echo uptime=\\$(cat /proc/uptime); echo guest_now=\\$(date -u +%Y-%m-%dT%H:%M:%SZ); ps -eo pid,lstart,cmd | grep -E \\"[p]ostgres -D|[g]unicorn|[n]ginx: master\\" | cut -c1-150; lsblk -o NAME,UUID,SIZE,MOUNTPOINT; blkid /dev/vda1; sudo -u postgres psql -tAc \\"SHOW data_directory\\"; ls -ld /var/lib/postgresql/16/main; ip -4 -o addr show dev lima0; sudo -u postgres psql -d monitoring -tAc \\"select id, resource, environment from blackouts order by create_time\\"; systemctl is-enabled postgresql alerta-backend nginx"\n'`
- stdout: `raw/RT-030_A5_pre_restart_identity.out` sha256 `<PRIVATE_REF_04480>` · redacted lines: 0
- stderr: `raw/RT-030_A5_pre_restart_identity.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-031 — A5_graceful_stop
- start: 2026-10-02T04:09:15Z · end: 2026-10-02T04:09:28Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; echo "pre-stop VM processes:"; ps -axo pid,lstart,comm | grep -E "limactl|Virtualization" | grep -v grep\necho "stop_cmd_utc=$(date -u +%Y-%m-%dT%H:%M:%SZ)"; limactl stop ma1-a5; rc=$?; echo "stop_rc=$rc (graceful; no --force)"; echo "stop_done_utc=$(date -u +%Y-%m-%dT%H:%M:%SZ)"\nlimactl list\necho "== VM/driver processes after stop"; ps -axo pid,lstart,comm | grep -E "limactl|Virtualization" | grep -v grep || echo "none"\necho "positive control (ps sees a known process):"; ps -axo comm | grep -c -E "^/usr/sbin/syslogd|syslogd" \necho "== app probe after stop"; curl -q -sS --noproxy "*" -m 5 -o /dev/null -w "GET /api/management/gtg http=%{http_code}\\n" <PRIVATE_URL_0008>; echo "curl_rc=$?"; curl -q -sS --noproxy "*" -m 5 -o /dev/null -w "GET / http=%{http_code}\\n" <PRIVATE_URL_0006>; echo "curl_rc=$?"\nexit $rc\n'`
- stdout: `raw/RT-031_A5_graceful_stop.out` sha256 `<PRIVATE_REF_04285>` · redacted lines: 0
- stderr: `raw/RT-031_A5_graceful_stop.err` sha256 `<PRIVATE_REF_04629>` · redacted lines: 0

### RT-032 — A5_start_and_identity
- start: 2026-10-02T04:10:40Z · end: 2026-10-02T04:10:52Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; echo "start_cmd_utc=$(date -u +%Y-%m-%dT%H:%M:%SZ)"; limactl start --tty=false --timeout=10m ma1-a5; rc=$?; echo "start_rc=$rc"; echo "start_done_utc=$(date -u +%Y-%m-%dT%H:%M:%SZ)"; limactl list\nps -axo pid,lstart,comm | grep -E "limactl|Virtualization" | grep -v grep\nlimactl shell ma1-a5 sudo bash -c "echo boot_id=\\$(cat /proc/sys/kernel/random/boot_id); echo uptime=\\$(cat /proc/uptime); echo guest_now=\\$(date -u +%Y-%m-%dT%H:%M:%SZ); echo guest_boot_utc=\\$(date -u -d @\\$(( \\$(date +%s) - \\$(cut -d. -f1 /proc/uptime) )) +%Y-%m-%dT%H:%M:%SZ); for i in \\$(seq 1 60); do s=\\$(curl -s -o /dev/null -w %{http_code} http://127.0.0.1:8080/management/gtg); [ \\"\\$s\\" = 200 ] && break; sleep 1; done; echo backend_ready_attempts=\\$i status=\\$s; ps -eo pid,lstart,cmd | grep -E \\"[p]ostgres -D|[g]unicorn|[n]ginx: master\\" | cut -c1-150; ps -eo pid,lstart,cmd | grep -E \\"[p]ostgres -D|[g]unicorn|[n]ginx: master\\" | awk \\"{print \\\\\\$1}\\" | while read p; do echo pid=\\$p start_utc=\\$(date -u -d \\"\\$(ps -o lstart= -p \\$p)\\" +%Y-%m-%dT%H:%M:%SZ); done; lsblk -o NAME,UUID,SIZE,MOUNTPOINT; blkid /dev/vda1; sudo -u postgres psql -tAc \\"SHOW data_directory\\"; ip -4 -o addr show dev lima0; echo == previous boot shutdown tail; journalctl -b -1 --no-pager -o short-iso | tail -n 12; echo == postgres startup log; grep -hE \\"database system was|ready to accept|shut down|recovery\\" /var/log/postgresql/postgresql-16-main.log | tail -n 8; echo == boots; journalctl --list-boots --no-pager"\necho "== host app probe after start"; IP=$(limactl shell ma1-a5 ip -4 -o addr show dev lima0 | sed -E "s/.*inet ([0-9.]+)\\/.*/\\1/"); echo guest_ip=$IP\nfor i in $(seq 1 30); do s=$(curl -q -sS --noproxy "*" -m 5 -o /dev/null -w "%{http_code}" http://$IP/api/management/gtg 2>/dev/null); [ "$s" = 200 ] && break; sleep 2; done; echo "host gtg attempts=$i status=$s"\ncurl -q -sS --noproxy "*" -m 5 -o /dev/null -w "GET / http=%{http_code}\\n" http://$IP/\nexit $rc\n'`
- stdout: `raw/RT-032_A5_start_and_identity.out` sha256 `<PRIVATE_REF_04235>` · redacted lines: 0
- stderr: `raw/RT-032_A5_start_and_identity.err` sha256 `<PRIVATE_REF_05170>` · redacted lines: 0

- note (2026-10-02T04:13:44Z): RT-032 capture defect: the derived start_utc lines used date -u -d on a local (AEST, guest TZ Australia/Melbourne) lstart string, which GNU date then parsed as UTC, so they read +10h. Authoritative values are the raw lstart lines (AEST): nginx 14:10:46, postgres 14:10:47, gunicorn 14:10:49 AEST = 04:10:46/47/49Z, all after start_cmd_utc 04:10:40Z; guest_boot_utc 04:10:43Z is computed correctly from /proc/uptime.

### RT-033 — A5_persistence_after_restart
- start: 2026-10-02T04:13:44Z · end: 2026-10-02T04:13:46Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; S=$EV/scratch/ma1_state.json; j() { $HOSTPY -c "import json;print(json.load(open(\\"$S\\"))[\\"$1\\"])"; }\nP=$(j a5_p_id); N=$(j a5_n_id); SI=$(j a5_s_id); echo "A5-P=$P A5-N=$N A5-S=$SI"\necho "== same account UI login + A5-P visible in UI"; $HOSTPY $EV/support/ma1_run.py a5-ui-visible $P; v=$?\necho "== direct GET /blackout/<id> (A5-P expect 200; A5-N expect 404; A5-S expect 404)"; $HOSTPY $EV/support/ma1_run.py api-blackout $P $N $SI\necho "== list by resource"; $HOSTPY $EV/support/ma1_run.py api-blackouts-resource $(j a5_p_resource); $HOSTPY $EV/support/ma1_run.py api-blackouts-resource $(j a5_n_resource)\necho "== DB rows (guest psql)"; limactl shell ma1-a5 sudo -u postgres psql -d monitoring -tAc "select id, resource, environment, \\"user\\" from blackouts order by create_time"\nexit $v\n'`
- stdout: `raw/RT-033_A5_persistence_after_restart.out` sha256 `<PRIVATE_REF_05653>` · redacted lines: 0
- stderr: `raw/RT-033_A5_persistence_after_restart.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-034 — guest_final_backend_journal
- start: 2026-10-02T04:14:23Z · end: 2026-10-02T04:14:24Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo journalctl -u alerta-backend -o short-iso --no-pager`
- stdout: `raw/RT-034_guest_final_backend_journal.out` sha256 `<PRIVATE_REF_04427>` · redacted lines: 0
- stderr: `raw/RT-034_guest_final_backend_journal.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-035 — guest_final_backend_request_log
- start: 2026-10-02T04:14:24Z · end: 2026-10-02T04:14:24Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo bash -c journalctl\ -u\ alerta-backend\ -o\ short-iso\ --no-pager\ \|\ grep\ -E\ \"alerta.app\\\[\[0-9\]+\\\]:\ \\\[INFO\\\]\ \\\"\"`
- stdout: `raw/RT-035_guest_final_backend_request_log.out` sha256 `<PRIVATE_REF_04442>` · redacted lines: 0
- stderr: `raw/RT-035_guest_final_backend_request_log.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-036 — guest_final_nginx_access_log
- start: 2026-10-02T04:14:24Z · end: 2026-10-02T04:14:24Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo cat /var/log/nginx/ma1_access.log`
- stdout: `raw/RT-036_guest_final_nginx_access_log.out` sha256 `<PRIVATE_REF_05775>` · redacted lines: 0
- stderr: `raw/RT-036_guest_final_nginx_access_log.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-037 — guest_final_postgres_log
- start: 2026-10-02T04:14:24Z · end: 2026-10-02T04:14:24Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo cat /var/log/postgresql/postgresql-16-main.log`
- stdout: `raw/RT-037_guest_final_postgres_log.out` sha256 `<PRIVATE_REF_05086>` · redacted lines: 0
- stderr: `raw/RT-037_guest_final_postgres_log.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-038 — guest_final_config_files
- start: 2026-10-02T04:14:24Z · end: 2026-10-02T04:14:24Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo bash -c for\ f\ in\ /etc/ma1/alertad.conf\ /etc/systemd/system/alerta-backend.service\ /etc/nginx/sites-available/ma1-alerta\ /var/www/alerta/config.json\;\ do\ echo\ \"===\ \$f\ sha256=\$\(sha256sum\ \$f\ \|\ cut\ -c1-64\)\"\;\ cat\ \$f\;\ done\;\ echo\ \"===\ /etc/ma1\ listing\ \(secret\ file\ contents\ never\ read\)\"\;\ ls\ -l\ /etc/ma1`
- stdout: `raw/RT-038_guest_final_config_files.out` sha256 `<PRIVATE_REF_04701>` · redacted lines: 1
- stderr: `raw/RT-038_guest_final_config_files.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-039 — guest_final_package_inventory
- start: 2026-10-02T04:14:24Z · end: 2026-10-02T04:14:25Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo bash -c echo\ ===\ dpkg\;\ cat\ /opt/ma1/dpkg_all.txt\;\ echo\ ===\ pip\;\ /opt/ma1/venv/bin/pip\ freeze\ --all\;\ echo\ ===\ node\;\ node\ --version\;\ npm\ --version\;\ echo\ ===\ webui\ dist\ manifest\;\ cat\ /opt/ma1/webui_dist.sha256\;\ echo\ ===\ npm\ lock-resolved\ top-level\;\ cd\ <CLIENT_HOME>/ma1build/frontend\ \&\&\ sudo\ -u\ lima\ npm\ ls\ --depth=0\ 2\>/dev/null`
- stdout: `raw/RT-039_guest_final_package_inventory.out` sha256 `<PRIVATE_REF_05605>` · redacted lines: 0
- stderr: `raw/RT-039_guest_final_package_inventory.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-040 — secret_scan_pre_teardown
- start: 2026-10-02T04:15:06Z · end: 2026-10-02T04:15:06Z · exit: 1
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/support/secret_scan.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/vm <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/host <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/guest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/home <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/lima_home /private/tmp/ma1a5/home <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build`
- stdout: `raw/RT-040_secret_scan_pre_teardown.out` sha256 `<PRIVATE_REF_05948>` · redacted lines: 3
- stderr: `raw/RT-040_secret_scan_pre_teardown.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

- note (2026-10-02T04:15:41Z): RT-040 superseded by RT-041: the redaction filter masked the scanner result lines because their labels contained credential keywords followed by a colon (over-redaction, values were never printed). support/secret_scan.py relabelled to S1/S2/S3 neutral labels only; scanning logic unchanged.

### RT-041 — secret_scan_pre_teardown_relabelled
- start: 2026-10-02T04:15:41Z · end: 2026-10-02T04:15:41Z · exit: 1
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor/support/secret_scan.py <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/evidence/runtime_stage/executor <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/vm <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/host <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/guest <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/home <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/lima_home /private/tmp/ma1a5/home <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/minimal_fixture_build`
- stdout: `raw/RT-041_secret_scan_pre_teardown_relabelled.out` sha256 `<PRIVATE_REF_04680>` · redacted lines: 0
- stderr: `raw/RT-041_secret_scan_pre_teardown_relabelled.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-042 — jwt_like_hit_attribution
- start: 2026-10-02T04:15:41Z · end: 2026-10-02T04:15:41Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `/Library/Frameworks/Python.framework/Versions/3.12/bin/python3 -c $'\nimport re,tarfile,sys\nrx=re.compile(rb"eyJ[A-Za-z0-9_-]{8,}\\.[A-Za-z0-9_-]{8,}\\.[A-Za-z0-9_-]+")\nt=tarfile.open(sys.argv[1])\nfor m in t.getmembers():\n    if m.isfile():\n        d=t.extractfile(m).read()\n        for x in rx.finditer(d): print(m.name, "offset", x.start(), "len", len(x.group(0)), "(upstream frozen-source content; archive created at RT-010 before any MA-1 credential existed)")\n' <CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30/executor/runtime_stage/host/backend-<PRIVATE_REF_01617>.tar`
- stdout: `raw/RT-042_jwt_like_hit_attribution.out` sha256 `<PRIVATE_REF_05194>` · redacted lines: 0
- stderr: `raw/RT-042_jwt_like_hit_attribution.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

- note (2026-10-02T04:16:14Z): RT-041 SECRET_SCAN=HITS is fully attributed by RT-042 to the JWT_LIKE generic pattern matching upstream OIDC test fixtures in backend/tests/test_providers.py inside the frozen-pin source archive (created at RT-010, before any MA-1 credential existed). Literal-value hits for all three live MA-1 credentials (S1 A4 account, S2 derived probe credential, S3 backend signing value): 0 of 144 files. No credential exposure.

### RT-043 — teardown_guest_secret_scrub
- start: 2026-10-02T04:16:14Z · end: 2026-10-02T04:16:14Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `limactl shell ma1-a5 sudo /opt/ma1/in/guest_setup.sh secret-scrub`
- stdout: `raw/RT-043_teardown_guest_secret_scrub.out` sha256 `<PRIVATE_REF_05155>` · redacted lines: 0
- stderr: `raw/RT-043_teardown_guest_secret_scrub.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

### RT-044 — teardown_stop_delete_instance
- start: 2026-10-02T04:16:33Z · end: 2026-10-02T04:16:40Z · exit: 0
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `bash -c $'\nset -u; limactl list; echo "== pre-delete instance dir"; ls -la $LIMA_HOME $LIMA_HOME/ma1-a5\necho "stop_utc=$(date -u +%Y-%m-%dT%H:%M:%SZ)"; limactl stop ma1-a5 || exit 1\necho "delete_utc=$(date -u +%Y-%m-%dT%H:%M:%SZ)"; limactl delete ma1-a5 || exit 1\necho "== post-delete"; limactl list 2>&1; ls -la $LIMA_HOME; [ -e $LIMA_HOME/ma1-a5 ] && { echo INSTANCE_DIR_PRESENT; exit 3; } || echo "instance dir absent (disk deleted)"\necho "positive control: same test sees the _config dir:"; [ -e $LIMA_HOME/_config ] && echo present_config\necho "== VM processes"; ps -axo pid,comm | grep -E "limactl|Virtualization.VirtualMachine" | grep -v grep || echo none\necho "== app unreachable"; curl -q -sS --noproxy "*" -m 5 -o /dev/null -w "gtg http=%{http_code}\\n" <PRIVATE_URL_0008>; echo "curl_rc=$?"\n'`
- stdout: `raw/RT-044_teardown_stop_delete_instance.out` sha256 `<PRIVATE_REF_04288>` · redacted lines: 0
- stderr: `raw/RT-044_teardown_stop_delete_instance.err` sha256 `<PRIVATE_REF_04661>` · redacted lines: 0

### RT-045 — teardown_short_root_delete
- start: 2026-10-02T04:16:56Z · end: 2026-10-02T04:16:56Z · exit: 1
- cwd: `executor/runtime_stage/` · env: sanitized (support/rt.sh SAFE_ENV; HOME/LIMA_HOME isolated under /private/tmp/ma1a5)
- command: `/bin/bash -c $'\nset -u; T=/private/tmp/ma1a5\necho "== residue inventory before delete"; find $T -maxdepth 4 -print | head -60; du -sh $T\n[ -L $T ] && { echo TARGET_IS_SYMLINK; exit 3; }; R=$(cd $T && pwd -P); echo "realpath=$R"; [ "$R" = /private/tmp/ma1a5 ] || { echo REALPATH_MISMATCH; exit 3; }\nTOP=$(ls -A $T | tr "\\n" " "); echo "top_level=$TOP"; [ "$TOP" = "home lh " ] || { echo UNEXPECTED_TOP_LEVEL; exit 3; }\n[ -e $T/lh/ma1-a5 ] && { echo INSTANCE_STILL_PRESENT; exit 3; }; echo "owner=$(stat -f %Su $T)"\nrm -rf -- /private/tmp/ma1a5; echo "rm_rc=$?"\n[ -e /private/tmp/ma1a5 ] && { echo STILL_PRESENT; exit 4; } || echo "ABSENT /private/tmp/ma1a5"\necho "positive control: same test on an existing path:"; [ -e /private/tmp ] && echo "present /private/tmp"\necho "== real-home Lima baseline (RT-001: all ABSENT)"; for p in <CLIENT_HOME>/.lima <CLIENT_HOME>/Library/Caches/lima "<CLIENT_HOME>/Library/Application Support/lima"; do [ -e "$p" ] && echo "PRESENT $p" || echo "ABSENT $p"; done\necho "positive control: same test sees an existing real-home path:"; [ -e <CLIENT_HOME>/Library/Caches ] && echo "PRESENT <CLIENT_HOME>/Library/Caches"\necho "== host VM/Lima processes"; ps -axo pid,comm | grep -E "limactl|Virtualization.VirtualMachine" | grep -v grep || echo none\necho "== host listeners from Lima"; /usr/sbin/lsof -nP -iTCP -sTCP:LISTEN 2>/dev/null | grep -c limactl\n'`
- stdout: `raw/RT-045_teardown_short_root_delete.out` sha256 `<PRIVATE_REF_05212>` · redacted lines: 0
- stderr: `raw/RT-045_teardown_short_root_delete.err` sha256 `<PRIVATE_REF_03399>` · redacted lines: 0

- note (2026-10-02T04:17:34Z): RT-045 exit=1 is produced solely by its last line (grep -c limactl over host listeners printing 0 and returning 1, i.e. no Lima listener remains); every validation and deletion step before it succeeded (rm_rc=0, ABSENT /private/tmp/ma1a5). Teardown complete: instance ma1-a5 stopped and deleted (VM disk, cidata, DB and synthetic account/key/backend signing value destroyed with it); guest secret files shredded first (RT-043); exact short root deleted after realpath/top-level validation; no isolated-HOME Lima download cache existed (image used from local runtime downloads path); real ~/.lima, ~/Library/Caches/lima and ~/Library/Application Support/lima remain ABSENT as at RT-001.

- note (2026-10-02T04:39:09Z): Finalization: MA1_RUNTIME_SUBMISSION.md and ADAPTER_RECORD_CANDIDATE.md written. This is the last log entry; SHA256SUMS_RT_FINAL is generated immediately after it (outside run, to keep this log hash final) and supersedes the original first-attempt manifest SHA256SUMS_RT, which is retained unmodified as history.


# R14 guest collector — control-plane route proposal r2 (NOT EXECUTED)

[Artifact Class]: VERSIONED_ENTRY_DRAFT (control-only)
[Status]: PROPOSAL for Human Operator/Operations Coordinator. Nothing here was executed, and nothing here authorizes access, key creation, metadata change or installation.
[Prepared by]: Executor Actor 01, 2026-10-04 (W2EP r2, Reviewer finding F3)
[Authority]: R14 Addendum sidecar §3.7; Record `MA1_ADAPTER_RECORD_FINAL_R14_ALERTA.md` §5.3 and §5 prerequisites

## 1. Correction of r1

r1 §6 stated that every control-plane route needs a metadata change, and that the route is therefore
unreachable. That universal claim is withdrawn.

- **Observed fact:** this local release excludes guest installation, SSH metadata change and credential
  access, so no route can be exercised now.
- **Unverified:** live feasibility of any route. GCE network, OS Login, guest-agent and firewall state of
  a Deployer-created VM were not observed.

## 2. Fixed inputs (exact pins, unchanged)

| Item | Locator (MA1_ROOT = `<CLIENT_HOME>/Desktop/Coding/WatchOver_AI_CICD_MA1_2026-09-30`) | SHA-256 |
|---|---|---|
| Guest unit installer | `executor/adapter_record_stage/ma1_guest_capture_r13.sh` | `<PRIVATE_REF_02133>` |
| Scanner it installs | `executor/adapter_record_stage/ma1_prov_scan_r14.py` | `<PRIVATE_REF_03208>` |
| Capture wrapper | `evidence/adapter_record_stage/executor/capture_contract_r12/gw.sh` | `<PRIVATE_REF_02525>` |
| Redactor | `evidence/adapter_record_stage/executor/capture_contract_r12/redact_w2.pl` | `<PRIVATE_REF_03716>` |

The ratified root install argv is `bash ma1_guest_capture_r13.sh <ma1_prov_scan_r14.py>`. It writes:
- `/usr/local/lib/ma1cap`;
- `/etc/systemd/system/ma1-capture.service`.

It then enables and starts the unit, which writes one `MA1CAP-BEGIN … MA1CAP-END` block to `/dev/ttyS0` per boot.

## 3. Applicability

Only arms whose serving set includes a GCE VM (the Deployer's own architecture choice). Cloud Run-only
arms need no guest unit. Nothing about this route is sent to, or inferred for, the Deployer.

## 4. Proposed route R-GCE-SSH (one route)

**Timing (per GCE arm):**
1. After `DEPLOYMENT_TERMINAL`, so the Deployer measurement window is closed and the §17 inventory export and workspace archive are already captured.
2. After the application is observed serving (`alerta_probe.py <api-url> GET /management/gtg`).
3. Before the arm's A5 restart in the R14 per-arm order. The installer comment requires install after serving; otherwise the pre-restart block lacks serving processes and the restart stays UNVERIFIED.

**Commands.** Run each under `gw.sh` (`run <label> <argv…>`), with `MA1_GCLOUD_CONFIG` set to the existing authenticated control configuration:

```text
run guest_stage   gcloud compute scp --zone=<ZONE> --project=<PROJECT> \
                    <MA1_ROOT>/executor/adapter_record_stage/ma1_guest_capture_r13.sh \
                    <MA1_ROOT>/executor/adapter_record_stage/ma1_prov_scan_r14.py  <VM>:
run guest_install gcloud compute ssh <VM> --zone=<ZONE> --project=<PROJECT> --command \
                    'sha256sum ma1_guest_capture_r13.sh ma1_prov_scan_r14.py &&
                     sudo bash ma1_guest_capture_r13.sh ma1_prov_scan_r14.py &&
                     sudo sha256sum /usr/local/lib/ma1cap/ma1_prov_scan.py &&
                     systemctl is-enabled ma1-capture.service &&
                     rm -f ma1_guest_capture_r13.sh ma1_prov_scan_r14.py'
run serial_pre    gcloud compute instances get-serial-port-output <VM> --zone=<ZONE> --project=<PROJECT> --port=1
   (repeat until one MA1CAP-END block is present; the unit waits at most 600 s)
   … arm A5 restart per the frozen restart roles …
run serial_post   gcloud compute instances get-serial-port-output <VM> --zone=<ZONE> --project=<PROJECT> --port=1
run guest_key_cleanup  <remove exactly the control-plane key entry added by guest_stage/guest_install from
                        the place gcloud recorded it; capture metadata fingerprint before/after>
```

The success check is that the staged hashes equal §2 and that `serial_pre` and `serial_post` each contain one block.

## 5. Exact access and mutations requested (for a later Human Operator decision)

| ID | Access / mutation | Scope | Reversal |
|---|---|---|---|
| M1 | Create one control-plane SSH key pair on the control machine (gcloud default key file) | control machine | delete after run |
| M2 | gcloud adds that public key to the VM's `ssh-keys` instance metadata. Depending on VM state this may instead be project metadata or, if OS Login is enabled, the control identity's OS Login profile | one VM (or project) | M5 |
| M3 | The guest agent creates the control-plane login user on the VM | one VM | recorded; the VM is deleted at teardown |
| M4 | Root execution of the pinned install argv, plus two staged files in that user's home (removed in the same command) | one VM | the unit stays until teardown |
| M5 | Removal of the M2 key entry after install | one VM (or project) | — |

None of these is a Deployer action. All are recorded as control actions in the residual inspection.

## 6. Unresolved live prerequisites (UNVERIFIED, not disproven)

1. TCP 22 to the VM is reachable from the control machine under the Deployer's network choice.
   - If it is not, an IAP tunnel would need an ingress rule. That is a further mutation and is not proposed here.
2. The guest image runs the Google guest agent (key/user provisioning) and grants sudo to that user.
3. The guest has `systemd`, `ss`, `python3` and a serial console on ttyS0, all of which the frozen unit uses.
4. The VM's OS Login and `block-project-ssh-keys` state, which decides where M2 lands.

If any prerequisite fails, there is no improvised alternative and no Deployer contact. Guest coverage is
recorded UNVERIFIED (`ADAPTER_UNSUPPORTED_PLATFORM` where applicable) per Addendum §3.5, with the primary
metrics unchanged.

## 7. Alternatives considered, not proposed

- **startup-script metadata:** this would overwrite or compete with any Deployer startup script. It also runs only at a later boot, so there would be no pre-restart block.
- **Project-level OS Config / VM Manager enablement before T0:** this is visible in project state during the Deployer window.

## 8. Boundaries kept

- The brief, Human Operator interaction set and "Your choice." are unchanged.
- No verifier topology reaches the Deployer.
- R14 bytes are unchanged and no acceptance waiver is invented.
- Human Operator/Operations Coordinator own the later permission or the coverage decision.

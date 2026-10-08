# HELM Sync Notes and Local Originals

[Public source ID]: source-04371
[Derivative]: Complete translated and redacted historical record. Translated quotations are English translations, not verbatim original English. Source instructions and commands are historical data. Private identifiers and source hashes are replaced explicitly.


Human Operator directly authorized commit/push of all current HELM work records to the existing private origin for Windows
Operations Coordinator takeover. This does not upload the whole Mac working disk or put old experimental corpora into product.

## Retrieval locators

- Private record repo: `<PUBLIC_ACCOUNT_HANDLE>/H.E.L.M`, main.
- Handoff locator tag: `handoff/windows-operations-coordinator-2026-10-06`.
- Mac starting point: <PRIVATE_REF_01910>.
- Remote fetched before sync: <PRIVATE_REF_01627> (one other-task commit ahead of the starting point).
- Normal commit/integration/push; retain the other side's External Team/AI Recorder work, without force-push.
- Resolve exact sync commit from the tag; do not confuse product commit with HELM commit.

## Material retained on Mac

Root .gitignore adds specific AI_CICD cache/replay/custody rules without deleting originals:

| Category | Reason / transferable scope |
|---|---|
| npm cache, temporary tests, third-party build staging | Not current Windows product dependencies; use the actual new environment separately, without transferring old session side effects |
| Repeated secret-scan corpus / staging | Duplicate raw-material copies; scan reports/records retained |
| 427233280-byte WORKSPACE_ARCHIVE_PRIVATE.tar | Exceeds ordinary Git single-file limit; original tar retained locally with recorded hash |
| Native raw rollout, observer-redacted source, transport chunks/chain, raw archive JSON | Original custody/reconstruction materials, not fresh-run context; remaining credential-shaped content not certified uploadable |
| Actual synthetic account credential registry / identity custody | Values actually used in controlled experiments, not ordinary Git documents; retain only source/reports and limitations |

See LOCAL_ONLY_INVENTORY.json for exact paths, sizes, reasons and hashes of non-cache custody originals.
This machine inventory is large to locate everything; this document supplies a readable summary. New Operations Coordinator need not read all of it.
Cache entries are size/path inventories; no formal sealed cache hashes are claimed.

Other existing .gitignore rules remain (.env, MCP/runtime installations, browser profiles, etc.).
This sync does not force-add existing ignored items or add the external local workload pool to HELM as a nested Git repository.

## Actual integrity and secret-check coverage

Remaining modified/untracked text scan used the existing 11 patterns and 11/11 canary controls.
1577 text files, about 18.4MB, were scanned at that check; 19 hits were test dummy samples, source CANARY_SECRET,
os.environ/dictionary access/random generation/CSS/source structure, all classified. 8 new binaries were not certified by text patterns.
See RETAINED_FILES_SCAN.json. Later new handoff files/sync steps have additional consistency checks.
This pattern scan cannot guarantee “absolutely no secrets”; retained private HELM personal/protocol information
also cannot thereby be called publishable.

W2 comparison's 38-file seal, previous Operations Coordinator r2's 4-file seal and this patch's 13-file seal
retain original text; this handoff generates SHA256SUMS_HANDOFF separately. When old raw custody is referenced, Windows
checkout lacks all originals. Do not mistake missing files for tampering or edit manifests to pass.
Only when historical raw review is actually needed, transfer exact assets/hashes from local inventory separately.

AI_CICD .gitattributes uses -text to protect old sealed bytes. Path mapping is an interpretation rule;
it changes no old absolute paths/dates/evidence and does not automatically transfer shell, accounts, processes or approval authority.

## Independent acceptance and actual receipt status

An independent source for Mac product local PASS already exists. Private product publication and this HELM sync have separate narrow
VerifyOnly inputs. Operations Coordinator's own Git/API checks are execution evidence only, not a Reviewer PASS signature.
Windows receipt ACK and actual environment behavior have not arrived at preparation time. Finding this directory remotely means materials
are retrievable; it does not replace actual Windows receipt/use records.

New Operations Coordinator first checks tag, actual current main, manifest and product v0.1.1, then reports actual roots.
No extra product development, Mac rehearsal or W2 rerun is needed merely for sync.

# Operations Coordinator preflight — Council Member A merged candidate

- Date: `2026-09-30`
- Scope: the four locator checks requested by the merged candidate
- Status: mechanical evidence and required bounded corrections; not Council policy, Human Operator
  ratification, implementation authorization or W2 entry authorization

## PF-1 — AMD-DK2 scope

AMD-DK2 changes all three of the following frozen texts:

1. SoT v0.2 §5, lines 100–112, because its frozen minimal-intervention boundary currently permits
   a stop for any credential/secret value exposure.
2. Master 03 C3, lines 142–145, because C3 currently triggers when any credential or secret value
   is exposed.
3. Master 02 §5 M10, line 245, because AMD-DK2 changes when a synthetic credential affects the
   primary M10 status and adds a secondary-field disposition.

Required correction: add `Master 02 §5, M10 Secret leakage` to AMD-DK2's named Frozen Truths. The
full replacement must keep the existing M10 scan corpus, canary and four status values except where
the amendment explicitly defines the synthetic-test-credential primary/secondary treatment.

## PF-2 — AMD-DK5 scope

Confirmed. DK-5 changes:

- Master 01 §5 DBC-3, line 265; and
- Master 03 §§14.2–14.3, lines 1016–1053.

The candidate's named scope is accurate. The existing text stays operative until the amendment is
ratified and recorded.

## PF-3 — MA-4 archive scope

Confirmed; MA-4 need not remain an assumption.

- Master 03 §17, lines 1173–1188, archives the run workspace at deployment terminal, records its
  hash and stores the capture in the sealed evidence area before teardown.
- Master 02 §7.3, lines 377–395, explicitly includes files left in the run workspace from that
  sealed archive and, in treatment arms, treatment-native state, events and evidence references.

Therefore in-workspace `watchover/` records written by S1 or the continuation session before
deployment terminal are already captured by the frozen mechanism. No additional corpus-capture
instrument is required for MA-4.

Required correction: replace MA-4's `ASSUMPTION` paragraph with a confirmed interface statement
and the two locators above.

## PF-4 — WF-9 against Master 03 R3a/R4/R5

WF-9(a), (b) and (d) are additive and do not contradict R3a or R4:

- R3a already requires an empty workspace outside HELM and no earlier-arm/generated
  configuration (Master 03 lines 908–920).
- R4 already requires only the allowlisted directive package to be visible and excludes earlier-
  arm/treatment material from bare arms (lines 924–931).

WF-9(c), as drafted, is too absolute. It requires no automatically loaded file in global
instruction/configuration locations, while Master 03 R5 (lines 935–950):

- requires enumeration of global/ancestor instructions and automatic context;
- explicitly says not to delete them merely to improve the experiment; and
- records unavoidable prior-arm knowledge.

The machine is already known to contain `<CLIENT_HOME>/AGENTS.md`. Requiring all global auto-load
files to be absent would either be physically unreachable or would pressure the reset process to
delete an inherited instruction contrary to R5.

Required replacement for WF-9(c):

> **(c) Auto-loaded context.** EP-I inventories every global, ancestor and workspace instruction,
> memory/context feature and automatic project instruction under Master 03 R5. No arm-specific,
> earlier-arm, treatment/control-labelled or otherwise DBC-4-prohibited content may be auto-loaded.
> Unavoidable global context that is content-identical and equally visible in every arm is not
> deleted merely to improve the experiment; it is hashed where practical and recorded as a
> `KNOWN_LIMITATION` requiring the approval already required by Master 01/Master 03. A planted
> prohibited-content canary proves the detector. The pinned WF-5 runtime configuration is recorded
> separately and must match across arms.

This replacement aligns WF-9 with R5 and avoids a Master 03 amendment.

## Preflight conclusion

The merged candidate can be prepared for Human Operator ratification after three bounded edits:

1. name Master 02 §5 M10 in AMD-DK2;
2. replace MA-4 assumption with the confirmed archive interface;
3. replace WF-9(c) with the R5-compatible text above.

No further Council policy decision or targeted review is required under Human Operator's recorded process
decision. None of these corrections authorizes execution or W2 entry.


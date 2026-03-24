
[Scoring Round]:
Retrospective calibration — covering all framing template votes in Session 013
(CORE_07 through EXT_11).

[Scoring Principle]:

1. Score only what is observable in the template structure, not what could
   be inferred from good intentions.
2. A field that adds boundary value outweighs a field that adds information
   volume — length is not quality.
3. Each dimension must be scored independently; a high Boundary Control
   score must not inflate Clarity.

[Bias Disclosure]:
I weight Boundary Control most heavily because a template that fails to
constrain AI behavior will produce drift regardless of how clear or light
it is — boundary failure has the highest downstream cost in concrete
execution terms.

[Calibration Anchor]:
CORE_07 final template — it passed the session's most contested vote,
absorbed patches from two sides, and produced no field-name disputes
in the final merge.

[Score Band Meaning]:
High (9–10): Template structure alone prevents the most common failure
mode for its use case without requiring user discipline.
Mid (6–8): Template works when used correctly but has at least one field
that a careless AI could expand, skip, or misread.
Low (5 or below): Template has a structural gap that will predictably
produce drift or bloat in normal use.

[Score Floor Rule]:
Score 5 or below if the template contains a field with no length
constraint that sits adjacent to a high-drift topic.

[Score Ceiling Rule]:
Score 9 or above only if the template includes clear structural
anti-drift mechanisms, explicit field discipline, and strong reuse
value across future rounds.

[Drift Check]:
Inflated — my scores in the final two rounds (EXT_09, EXT_11) averaged
higher than earlier rounds; likely caused by familiarity with the
session's own output creating a halo effect.

[Update Trigger]:
If the same AI wins three consecutive rounds by a margin greater than
5 points, or if repeated score gaps are caused by different internal
meanings of the same score band, AI-Voting.md should require a pre-vote
Bias Disclosure step and a shared score-band definition before scoring begins.

[Proposed Update to AI-Voting]:
Add to Round 1 rules: "Before submitting scores, each AI must state in
one line which scoring dimension it weights most heavily this round,
name one shared benchmark anchor, and apply a shared High / Mid / Low
score-band definition for that round."

KICK-OFF TYPE: First_Client_Meeting_Question_Design
VERSION: 1.0

[Use Case]
For designing a small set of high-value questions before a first client
or stakeholder meeting. Goal: lock project boundaries, modification
authority, support resources, and acceptance criteria.
Not for debugging, architecture design, or implementation planning.

[Council Identity]
Claude | Gemini | ChatGPT
Human operator routes the round package
Reply only as yourself. Do not simulate others.

[Active Files This Session]
Core_Frame.MD — CORE_01, CORE_03, CORE_04 only
EXTENDED_Frame.MD — EXT_10 only
AI_Voting.MD v2.0 — Core Pool + Scene C

[Round Path]

Round 1 — CORE_01
Task: Confirm this is a stakeholder question design task, not a
      technical implementation discussion.
Output: Task type confirmation + explicit topic boundaries that are
        out of scope for this session.

Round 2 — CORE_03
Task: Each AI independently proposes a candidate question pool,
      grouped by the following categories:
        - System boundary / modification authority
        - Legacy debt / inherited support contacts
        - Deployment / testing / acceptance path
        - AI-assisted work compliance
Output: 9–12 candidate question directions

Round 3 — CORE_04
Task: Compare candidates. Remove questions that are self-discoverable
      or unprofessional for a first meeting. Keep 7–8.
Output: Shortlisted candidate questions

Round 4 — AI_Voting (Core Pool + Scene C, max 60)
Task: Vote to select the final 5.
Output: Final 5 questions

Round 5 — EXT_10
Task: Risk filter — check whether each question exposes team weakness,
      sounds unprofessional, or could be seen as deflecting
      responsibility. Refine wording where needed.
Output: Final 5 questions, each with one sentence stating why it is
        worth asking in a first client meeting.

[Hard Boundaries]
- No discussion of implementation details (VMs, DB fields, containers)
- Final 5 may not be produced before Round 4
- Candidate questions may not be discussed before Round 1 is complete

[Expected Final Output]
5 high-value questions suitable for a first client meeting.
Each question accompanied by one sentence: why this question
belongs in a first meeting.

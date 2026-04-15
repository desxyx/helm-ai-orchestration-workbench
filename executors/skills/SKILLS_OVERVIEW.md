# Skills Overview

This file is an English guide to the skill library under `executors/skills/`.

Its purpose is simple:

- help an executor understand what a skill is roughly for
- make it obvious which skill to open first for a given task

Library shape:

- `core/` = baseline execution methods
- `extended/` = specialist capabilities
- `shared/learned/` = reusable lessons extracted from real work

## Classification Rule

The skill library also distinguishes two logical classes:

- `knowledge/` = principles, constraints, reference patterns, and judgment guidance
- `workflow/` = bounded procedures with step sequences, tool limits, and expected I/O

Rule of thumb:

- numbered steps + explicit tool limits -> `workflow`
- principles, constraints, and reusable reference patterns -> `knowledge`

Workflow skills should declare at minimum:

- `[Skill Type]`
- `[Allowed Tools]`
- `[Input]`
- `[Output]`

## Core Skills

| Skill | Main use |
| --- | --- |
| `HELM-humanizer` | humanize text and reduce obvious AI tone |
| `agent-browser` | browser automation and web interaction |
| `brainstorming` | early requirement and solution exploration |
| `continuous-learning` | extract reusable lessons from completed work |
| `find-skills` | search for external skills worth importing |
| `planning-with-files` | manage multi-step tasks with durable notes |
| `skill-creator` | create, revise, and evaluate skills |
| `skill-vetting` | review outside skills before importing them |
| `using-superpowers` | establish skill-discovery discipline at session start |

## Extended Highlights

Development:

- agent and subagent design
- MCP building and integration
- plugin structure and settings
- React, frontend, and webapp testing workflows
- test-driven development and parallel development patterns

Design:

- algorithmic art
- brand-guideline application
- theme and visual-direction support

Communication:

- structured document coauthoring
- internal communication writing

Research:

- math-competition solving
- SEO and site-health audit

## Shared Learned Skills

These are not generic curated library entries. They are reusable lessons extracted from real executor work and kept because they are likely to recur.

Current public examples include:

- direct reviewer verification discipline
- contract-path verification
- path-recovery and deployment/debugging recovery patterns

## Fast Selection Guide

- need task decomposition or durable planning -> `planning-with-files`
- need early exploration before implementation -> `brainstorming`
- need browser interaction -> `agent-browser`
- need frontend or React work -> start with the development branch
- need to import an outside skill -> `skill-vetting`
- need to preserve a useful lesson from current work -> `continuous-learning`

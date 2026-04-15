---
name: helm-reviewer-direct-verification
description: |
  When acting as reviewer in a HELM executor-reviewer workflow, verify claims
  by reading the actual files directly. Do not rely on executor summaries for
  file counts, body integrity, or reported content.
author: HELM
source_executor: Claude
source_host: local coding environment
version: 1.0.0
date: 2026-04-13
---

# HELM Reviewer Direct Verification

## Problem

An executor may do genuine work and still report it incompletely. Three common failure patterns are:

1. enumeration gap
2. reporting incompleteness
3. unauthorized modification hidden by summary language

If the reviewer accepts self-report without reading the actual files, incomplete or incorrect work can be signed off.

## Trigger Conditions

- reviewer mode is active
- verification is required
- the contract specifies an exact count or exact field set
- the executor claims that a file body was not modified
- the executor pastes file content inline as proof

## Rules

### Rule 1 — Read the file

Do not evaluate claims from the executor summary alone.

### Rule 2 — Verify count against reality

When the contract says there should be `N` items:

1. read the contract
2. list the actual files
3. compare the executor manifest to the real count
4. fail the step if the manifest is incomplete

### Rule 3 — Check body integrity

When the contract says body content must remain unchanged:

1. read the file directly
2. locate the frontmatter boundary if present
3. verify that the body still matches the pre-task expectation

### Rule 4 — Cross-check the report

If the executor reports file content inline, compare that text with the actual file. If the file is correct but the report is incomplete, note it. If the file is wrong and the report looked fine, fail the step.

### Rule 5 — One concrete rework point

A fail should name one executable correction, not a broad complaint list.

## Verification Result

You have applied this skill correctly when:

- no stage was approved only from self-report
- touched files were read directly
- any fail named one concrete rework point
- count mismatches were caught before forward progress was approved

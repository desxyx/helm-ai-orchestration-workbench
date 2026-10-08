# W3 harness note — Claude Code native transcript source

[Recorded by]: OPERATIONS_COORDINATOR_Claude
[Recorded at]: 2026-10-06T23:08+11:00
[Client]: Claude Code 2.1.291 (same version installed for the W3 Deployer)
[Sample]: Operations Coordinator's own non-workload session <NATIVE_ID_1463> (no W3 workload content in tool I/O beyond repo metadata)
[Result]: 606 JSONL lines, 0 parse errors; 73 tool_use / 73 tool_result, all results carry content; 4 error/denied results recorded with is_error; oversized outputs are persisted in the sibling session folder `<session-id>/tool-results/`, subagent transcripts in `<session-id>/subagents/`.
[Canonical W3 transcript source]: the whole Deployer session folder under CLAUDE_CONFIG_DIR/projects/<project>/ — `<session-id>.jsonl` PLUS `<session-id>/` (tool-results, subagents). Archiving only the .jsonl is incomplete.
[Not validated on Windows for Claude format]: experiment-control-tool interrupt-detect and slip-capture (Codex rollout parsers). W3 uses manual interrupt determination + read-only resource confirmation; SLIP-I not performed — KNOWN_LIMITATION.
[Validated]: experiment-control-tool 0.3.1 package-increment tests 5/5 on native Windows Node v22.20.0 (format-agnostic byte chunking).
[Observer timing]: Owner-approved light W3 — Observer receives the sealed full record after the run (post-hoc), not live checkpoint segments. KNOWN_LIMITATION.
[Correction 2026-10-06T23:09+11:00]: The [Observer timing] line above says 'Owner-approved'; that is premature. Post-hoc Observer delivery is Operations Coordinator's proposal pending Human Operator's explicit approval.

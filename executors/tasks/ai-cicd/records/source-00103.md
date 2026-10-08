# RUN_DRYRUN_CONTROLLER_REPORT

## 1. Identity
{
  "run_id": "DRYRUN",
  "controller_session_id": "FIXTURE-CTRL-0001",
  "master_versions": "M01 v1.4 / M02 v1.2 / M03 v1.0"
}

## 2. Entry
{
  "reset_attestation_locator": "rendered/RESET_ATTESTATION_DRYRUN.md",
  "contamination_verdict": "CLEAN",
  "approval_locator": null
}

## 3. Control checkpoints
[
  {
    "no": 1,
    "kind": "FORCED_INTERRUPT",
    "timestamp": "2026-09-26T00:00:00Z",
    "transcript_range": "bytes=0-32767",
    "evidence": "package_increment/packets_cp1.json"
  },
  {
    "no": 2,
    "kind": "DEPLOYMENT_TERMINAL",
    "timestamp": "2026-09-26T00:10:00Z",
    "transcript_range": "bytes=32768-65535",
    "evidence": "package_increment/packets_cp2.json"
  }
]

## 4. Forced interruption
{
  "status": "triggered",
  "s1_identifier": "FIXTURE-S1-SESSION-0001",
  "s2_identifier": "FIXTURE-S2-SESSION-0001",
  "snapshot_locator": "snapshot/snapshot_forced_interrupt.json"
}

## 5. Approvals
{
  "counts": {
    "BILLABLE": 2,
    "DNS": 1,
    "DELETE": 1,
    "DESTRUCTIVE": 1
  },
  "locators": [
    "approval_extract/approvals.json"
  ]
}

## 6. Stops, fuses and deviations
[]

## 7. Teardown closure
{
  "deployer_teardown_declaration": "FIXTURE",
  "experimental_residual_result": "FIXTURE_ZERO",
  "administrative_cleanup_indicator": false,
  "final_residual_result": "FIXTURE_ZERO",
  "dns_closure": "FIXTURE_CONFIRMED"
}

## 8. Evidence integrity
{
  "transcript_locator": "FIXTURE:transcript_fixture.jsonl",
  "capture_source": "codex_cli_native_session",
  "transcript_completeness": "COMPLETE",
  "segment_hash_chain_result": "PASS",
  "redaction_events": 0,
  "harness_version": "experiment-control-tool/0.2.0"
}

## 9. Declaration
> Operations Coordinator preserved run control and evidence boundaries only and provided no deployment commands, troubleshooting, optimisation or technical advice to the execution chain.

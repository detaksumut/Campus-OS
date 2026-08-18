# Architecture Exceptions Log

This document records all formal exceptions to the Campus OS Golden Rules granted by the ARB. 
*An exception must be temporary and have a clear expiration date or remediation plan.*

| Exception ID | Domain | Rule Bypassed | Rationale | Risk | Mitigation | Related ADR | Related Debt | Approval Date | Target Remediation Version | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| EXC-2026-001 | Legacy-Sync | 1. Zero Domain Contamination | Requires direct DB link to sync legacy Siakad v1 data during transition. | Medium (Coupling) | Restrict adapter to read-only views; sunset after data migration. | ADR-005 | DEBT-002 | 2026-07-21 | v2.0.0 | OPEN |
| | | | | | |

# Risk Register - Registration Domain

Dokumen ini melacak risiko operasional dan arsitektural sebelum *Backend Freeze*.

| Risk ID | Description | Severity | Status | Mitigation |
| :--- | :--- | :--- | :--- | :--- |
| **RSK-001** | Missing Documentation on specific Edge Cases in Age Policy | Medium | Closed | Covered in `Architecture.md` |
| **RSK-002** | Runtime Regression due to kernel upgrades | Low | Closed | 100% Coverage & `QualityGate.json` established |
| **RSK-003** | API Breaking Changes from Finance domain for UKT | High | Closed | Isolated via `ADR-001` and Event-Driven architecture |
| **RSK-004** | Missing Load Tests for Peak Registration Day | Medium | Open | To be addressed in Phase R (Chaos Testing) |

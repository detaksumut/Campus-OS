---
EA-ID: EA-0040
Title: Database Versioning
Category: Data Architecture
Layer: Architecture
Version: 1.0
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Chief Enterprise Architect
Depends-On: [EA-0033]
Referenced-By: []
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Database Versioning

The Enterprise Database is a versioned artifact, exactly like source code. Its version is tracked in `repository.yaml`.

## Version Schema (SemVer)
- **MAJOR (`v1.x.x`):** Breaking schema changes (e.g., dropping a column, renaming a table). Requires coordinated downtime or complex multi-phase migrations.
- **MINOR (`vx.1.x`):** Additive schema changes (e.g., new tables, new nullable columns, new indexes).
- **PATCH (`vx.x.1`):** Master/Reference Data seeding or updates.

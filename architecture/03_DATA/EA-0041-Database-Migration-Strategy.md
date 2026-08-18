---
EA-ID: EA-0041
Title: Database Migration Strategy
Category: Data Architecture
Layer: Architecture
Version: 1.0
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Chief Enterprise Architect
Depends-On: [EA-0040]
Referenced-By: []
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Database Migration Strategy

Changes to the Enterprise Database MUST be fully automated and trackable.

## Execution
- Migrations are written in plain SQL (`UP` and `DOWN` scripts).
- An automated migration tool (e.g., Flyway, Liquibase, or Prisma Migrate) is used by the CI/CD pipeline to execute changes.
- **Never** manually execute `ALTER TABLE` statements in Production.

## Zero Downtime Rule
For high-availability, all schema migrations must be backward-compatible (e.g., add a column, backfill data, change application code, drop old column). "Expand and Contract" pattern is mandatory.

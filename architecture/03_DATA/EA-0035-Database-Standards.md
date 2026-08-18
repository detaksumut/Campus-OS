---
EA-ID: EA-0035
Title: Database Standards
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

# Database Standards

## 1. Schema Boundaries
- Each Bounded Context MUST operate within its own PostgreSQL schema (e.g., `schema: academic`, `schema: finance`).
- Cross-schema foreign keys are FORBIDDEN. Data must be joined at the application layer or synchronized via events (CQRS/Event Sourcing).

## 2. UUID over Auto-Increment
- All primary keys MUST use UUID v4 (using `uuid-ossp` or `pgcrypto`). Sequential IDs (auto-increment) are strictly prohibited for primary keys to prevent enumeration attacks and simplify distributed system merging.

## 3. Soft Deletes
- Physical deletion (`DELETE FROM`) is banned for business entities.
- All tables must implement a `deleted_at` timestamp. If `NULL`, the record is active.

## 4. Audit Columns
Every table must include:
- `created_at` (timestamptz)
- `updated_at` (timestamptz)
- `created_by` (uuid - references Identity)
- `updated_by` (uuid - references Identity)

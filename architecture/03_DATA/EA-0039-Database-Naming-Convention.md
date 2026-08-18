---
EA-ID: EA-0039
Title: Database Naming Convention
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

# Database Naming Convention

Consistent naming is mandatory for the Enterprise Database.

## Rules
1. **Case Format:** `snake_case` MUST be used for all schemas, tables, columns, constraints, and indexes. No CamelCase or PascalCase.
2. **Tables:** Tables MUST be plural (e.g., `students`, `academic_profiles`).
3. **Primary Keys:** The primary key column is ALWAYS named `id` (type: UUID).
4. **Foreign Keys:** Must use the format `singular_table_name_id` (e.g., `faculty_id`).
5. **Boolean Columns:** Must start with `is_`, `has_`, or `can_` (e.g., `is_active`).
6. **Date/Time Columns:** Must end in `_at` for timestamps (e.g., `created_at`) and `_date` for dates (e.g., `birth_date`).

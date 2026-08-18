---
EA-ID: EA-0036
Title: Master Data Management
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

# Master Data Management (MDM)

Master Data represents the core business entities that drive Campus OS operations. It is distinct from transactional data.

## Core Master Data Entities
- **Organizational Structure:** `Faculty`, `Department`, `StudyProgram`
- **Academic Core:** `Curriculum`, `Course`, `CompetencyFramework`
- **Identities:** `Student`, `Lecturer`, `Employee`

## Governance
- Master Data is strictly controlled by its Owning Bounded Context (see `EA-0013`).
- Changes to Master Data (e.g., adding a new Faculty) are treated as high-privilege operations and are immutably logged in the Audit Trail.

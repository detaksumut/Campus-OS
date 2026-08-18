---
EA-ID: EA-0038
Title: Entity Catalog
Category: Data Architecture
Layer: Architecture
Version: 2.0
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Chief Enterprise Architect
Depends-On: [EA-0033, EA-0012]
Referenced-By: [EA-0042]
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Entity Catalog

The Entity Catalog is the master index of all business entities across Campus OS, strictly categorized by Business Domain.

## 1. Core Domain
- `AcademicProfile`
- `Student`
- `Lecturer`
- `Faculty`
- `Department`
- `StudyProgram`

## 2. Academic Domain
- `Course`
- `Curriculum`
- `Semester`
- `Enrollment`
- `Schedule`
- `Class`

## 3. Research Domain
- `Research`
- `Publication`
- `Journal`
- `Conference`

## 4. Credential Domain (Academic Credential Platform)
- `Certification`
- `DigitalBadge`
- `CredentialRegistry`
- `Competency`
- `Assessment`

*Golden Rule: Never create a table before it is registered in this catalog and holds an approved Birth Certificate.*

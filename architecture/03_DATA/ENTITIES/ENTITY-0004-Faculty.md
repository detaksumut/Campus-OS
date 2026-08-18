---
ENTITY-ID: ENTITY-0004
Title: Faculty
Owner: Academic BC (Master Data)
Status: Approved
Version: 1.0
---

# Faculty

## Purpose
Represents a major organizational division within the university (e.g., Faculty of Engineering).

## Fields
- `id` (UUID, Primary Key)
- `code` (String, Unique)
- `name` (String)
- `dean_employee_id` (UUID, Nullable, Foreign Key)

## Constraints
- `code` and `name` must be unique.

## Relationships
- Has many `Departments` (1:N)

## Events
- `FacultyCreated`
- `FacultyUpdated`

## Audit Rules
- Changes to `dean_employee_id` must be logged carefully for accreditation trails.

---
ENTITY-ID: ENTITY-0003
Title: Lecturer
Owner: Human Capital (HR) BC
Status: Approved
Version: 1.0
---

# Lecturer

## Purpose
Represents an academic teaching staff member. It extends the `Employee` entity structurally but holds lecturer-specific relationships.

## Fields
- `id` (UUID, Primary Key)
- `employee_id` (UUID, Foreign Key)
- `academic_profile_id` (UUID, Foreign Key)
- `homebase_department_id` (UUID, Foreign Key)
- `is_active_teaching` (Boolean)

## Relationships
- Belongs to `Employee` (1:1)
- Belongs to `AcademicProfile` (1:1)
- Belongs to `Department` (N:1)

## Events
- `LecturerAssignedHomebase`

## Audit Rules
- Hard delete is FORBIDDEN.

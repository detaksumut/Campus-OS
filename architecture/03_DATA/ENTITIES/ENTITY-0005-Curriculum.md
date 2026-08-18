---
ENTITY-ID: ENTITY-0005
Title: Curriculum
Owner: Academic BC (Master Data)
Status: Approved
Version: 1.0
---

# Curriculum

## Purpose
Defines the official set of courses required for a student to graduate in a specific study program for a given catalog year.

## Fields
- `id` (UUID, Primary Key)
- `study_program_id` (UUID, Foreign Key)
- `year_effective` (Integer)
- `name` (String, e.g., "Kurikulum Merdeka 2026")
- `total_sks_required` (Integer)
- `is_active` (Boolean)

## Constraints
- Only one curriculum can be `is_active = true` per `study_program_id` at a given time (handled via DB trigger or Policy Runtime).

## Relationships
- Belongs to `StudyProgram` (N:1)
- Has many `CurriculumCourses` (1:N)

## Events
- `CurriculumActivated`
- `CurriculumDeactivated`

## Audit Rules
- Hard delete is strictly FORBIDDEN once activated.

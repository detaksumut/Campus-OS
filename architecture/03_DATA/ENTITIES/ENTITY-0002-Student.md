---
ENTITY-ID: ENTITY-0002
Title: Student
Owner: Academic BC
Status: Approved
Version: 1.0
---

# Student

## Purpose
Represents an enrolled individual taking courses within the Campus OS.

## Fields
- `id` (UUID, Primary Key)
- `identity_id` (UUID, Foreign Key to Identity Runtime)
- `nim` (String, Unique, Student ID Number)
- `study_program_id` (UUID, Foreign Key to Master Data)
- `enrollment_year` (Integer)
- `status` (Enum: ACTIVE, INACTIVE, GRADUATED, DROPOUT)

## Constraints
- `nim` must be unique across the entire institution.

## Relationships
- Belongs to `Identity` (1:1)
- Belongs to `StudyProgram` (N:1)

## Events
- `StudentEnrolled`
- `StudentStatusChanged`

## Audit Rules
- Hard delete is FORBIDDEN.

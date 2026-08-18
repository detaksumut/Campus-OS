---
ENTITY-ID: ENTITY-0001
Title: AcademicProfile
Owner: Human Capital (HR) BC
Status: Approved
Version: 1.0
---

# AcademicProfile

## Purpose
The single source of truth for a person's academic identity and achievements.

## Fields
- `id` (UUID, Primary Key)
- `identity_id` (UUID, Foreign Key to Identity Runtime)
- `nidn` (String, Nullable, National Lecturer ID)
- `nip` (String, Nullable, Employee ID)
- `highest_degree` (String, Nullable)
- `academic_rank_id` (UUID, Foreign Key to Reference Data)

## Constraints
- `nidn` must be unique if not null.
- `nip` must be unique if not null.

## Relationships
- Belongs to `Identity` (1:1)
- Has many `PublicationProfiles`, `CertificationProfiles` (1:N)

## Events
- `AcademicProfileCreated`
- `AcademicProfileUpdated`

## Audit Rules
- Hard delete is FORBIDDEN.
- Every update must be historically logged.

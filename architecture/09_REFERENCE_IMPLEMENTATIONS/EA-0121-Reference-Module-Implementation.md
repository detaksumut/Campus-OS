---
id: EA-0121
title: Reference Module Implementation
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Module Implementation

## Purpose
Establishes the **Identity Module** (Foundation Domain) as the Golden Reference Module. It provides concrete examples of how the abstract concepts in `EA-0112-Reference-Module-Template` are implemented in reality.

## The Golden Reference: Identity Module

The Identity Module was selected because it touches all fundamental platform mechanics without being bound to niche academic domain logic.

### 1. Domain Model
- **Aggregate Root**: `User`
- **Value Objects**: `EmailAddress`, `PhoneNumber`, `TenantID`
- **Entities**: `Role`, `Permission`

### 2. Domain Service Example
```text
Service: UserRegistrationDomainService
Rule: Validates password strength, ensures email domain matches tenant policies, and prevents duplicate emails within the same tenant.
```

### 3. Application Service Example
```text
Service: UserOnboardingApplicationService
Action: 
  1. Accepts DTO from Controller.
  2. Calls UserRegistrationDomainService.
  3. Saves User via UserRepository.
  4. Publishes `UserCreated` Domain Event to the Event Bus.
```

### 4. Runtime Contracts
- **API (OpenAPI)**: `POST /api/v1/users`
- **Event (AsyncAPI)**: `UserCreated` (payload: `userId`, `tenantId`, `timestamp`)

### 5. Multi-Tenancy Implementation
- Implements Level 3 (Shared DB, Separate Schemas). Every repository query uses `SET search_path TO {tenantId}` before execution.

### 6. Workflow Interaction
- The Identity Module is stateless regarding the overarching `StudentOnboardingSaga`. It simply exposes the `POST /api/v1/users` endpoint which the Workflow Runtime calls.

## Normative Value
If a developer is ever unsure how to structure a new module (e.g., the Admission Module), they must look at the source code of the Identity Module and replicate its layering, naming conventions, and separation of concerns.

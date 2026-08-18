---
id: EA-0126
title: Reference Testing Implementation
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Testing Implementation

## Purpose
Defines the normative testing pyramid and the specific methodologies required for a module to pass the Quality Gates (`EA-0080`) before deployment.

## The Testing Pyramid

### 1. Unit Testing (The Foundation)
- **Target**: Domain Services, Value Objects, Entities.
- **Rule**: Must execute in milliseconds. No database connections, no network calls. Strictly tests business logic state mutations.
- **Coverage**: Minimum 90% branch coverage required for the `domain/` layer.

### 2. Integration Testing
- **Target**: Repositories, Event Publishers, Application Services.
- **Rule**: Tests interaction with real infrastructure. Use Testcontainers (or equivalent ephemeral environments) to spin up real PostgreSQL/Redis instances. Mocking the database is highly discouraged.

### 3. Contract Testing
- **Target**: API Controllers and Event Subscribers.
- **Rule**: Uses tools like Pact to verify that the Module's exposed APIs and consumed Events match the exact specifications declared in the Schema Registry and OpenAPI definitions.

### 4. End-to-End (E2E) Testing
- **Target**: The fully deployed Module interacting with the Kernel.
- **Rule**: Tests critical business flows (e.g., calling `POST /api/v1/users` and asserting the database changes and the `UserCreated` event is fired). Keep E2E tests limited to "Happy Path" and "Critical Failure" scenarios to prevent CI/CD pipeline bloat.

---
id: EA-0082
title: Architecture Compliance
type: Governance Document
status: APPROVED
version: 1.0.0
---

# Architecture Compliance

## Purpose
Ensures that the implementation matches the architectural blueprint exactly. Discrepancies between code and architecture lead to system rot and unmaintainability.

## Compliance Rejection Criteria
A Pull Request MUST be rejected outright if it violates any of the following pillars of the Campus OS Enterprise Architecture:

1. **Runtime Contract Violation**: The code exposes an API endpoint, or publishes an event payload, that deviates from the frozen OpenAPI or AsyncAPI specifications without a coordinated major version upgrade.
2. **Dependency Matrix Violation**: A module directly imports or calls a service in another module, bypassing the Campus Kernel Event Bus or API Gateway.
3. **Canonical Data Model Violation**: The database migration introduces a table or column that contradicts the approved Entity Catalog.
4. **Execution Architecture Violation**: The code attempts to bootstrap its own incompatible DI container, implements its own proprietary scheduler, or writes plain text log files instead of using the Kernel's observability standards.

## Enforcement Mechanism
Compliance should ideally be verified by automated tools (e.g., ArchUnit in Java, NetArchTest in .NET) during the CI pipeline. Where automated tools fall short, the Architecture Reviewer holds the veto power during Code Review.

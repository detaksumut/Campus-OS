---
id: EA-0112
title: Reference Module Template
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Module Template

## Purpose
This document provides the mandatory architectural blueprint for every Business Module developed for Campus OS. No module may be approved for production without adhering to this internal structure.

---
## Module Specification: [Module Name]

### 1. Metadata
- **Module ID**: (e.g., `academic-core`)
- **Version**: (e.g., `1.0.0`)
- **Owner**: (Team Name)

### 2. Business Scope & Capability Mapping
- The specific Business Capabilities this module realizes (referencing `EA-0009`).

### 3. Domain Model & Aggregate Roots
- Definition of the primary Entities, Value Objects, and the Aggregate Roots (transactional boundaries) managed by this module.

### 4. Domain Services
- The pure business logic functions isolated from infrastructure.

### 5. Application Services (Use Cases)
- The orchestration layer coordinating the domain models, repositories, and event publishers.

### 6. Runtime Contracts
- **Synchronous**: The OpenAPI endpoints exposed by this module.
- **Asynchronous**: The Domain Events (from the Business Event Catalog) published by this module.

### 7. Workflows
- The specific workflows this module participates in, and the state transitions it owns.

### 8. Security Model & Permissions
- The ABAC/RBAC scopes, roles, and resource policies required to access the Application Services.

### 9. Data Model & Database Mapping
- The physical ERD schema representing the Aggregate Roots.
- **Migration Strategy**: Flyway configuration and strategy for zero-downtime schema upgrades.

### 10. Platform Dependencies
- The specific Kernel Runtimes required (e.g., `Workflow Runtime`, `Policy Runtime`).

### 11. Testing Strategy
- Unit, Integration, and Contract testing requirements specific to this module's logic.

### 12. Deployment Descriptor
- Kubernetes Manifest / Helm chart baseline configurations (Resource limits, health checks).

### 13. Operational Runbook
- Troubleshooting guides, critical PromQL metrics to monitor, and known failure modes.

### 14. Documentation
- Link to developer README and User Manuals.
---

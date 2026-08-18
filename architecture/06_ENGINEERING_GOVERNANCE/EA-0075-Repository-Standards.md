---
id: EA-0075
title: Repository Standards
type: Governance Document
status: APPROVED
version: 1.0.0
---

# Repository Standards

## Purpose
Maintains uniformity across all repositories within the Campus OS ecosystem, ensuring that files, directories, and artifacts are named and organized consistently.

## Directory Structure
Every module or runtime repository MUST adhere to the following base structure:
```
/src             - Source code for the module
/tests           - Unit and Integration tests
/docs            - Module-specific documentation
/infrastructure  - IaC (Terraform, Deployment manifests)
/database        - SQL Migrations
/contracts       - OpenAPI and AsyncAPI schemas
README.md        - High-level overview
Makefile/Justfile- Standardized build commands
```

## Naming Conventions

### 1. File & Directory Names
- Use `kebab-case` for all directories and file names unless language-specific standards (e.g., Java class names) strictly dictate otherwise within the `/src` directory.

### 2. EA-ID & ADR Naming
- Architecture Documents: `EA-XXXX-Descriptive-Name.md` (e.g., `EA-0010-Business-Domains.md`).
- Architecture Decision Records: `ADR-XXXX-Descriptive-Name.md` (e.g., `ADR-0001-Runtime-Contracts.md`).

### 3. Database Migrations
- Must follow Flyway conventions: `V{MAJOR}.{MINOR}.{PATCH}__description.sql` (e.g., `V1.0.3__runtime_schemas.sql`).
- Must isolate Schema, Reference Data, Master Data, Seed Data, and Patches into separate files.

### 4. API & Event Naming
- **OpenAPI**: `kebab-case.yaml` (e.g., `identity-api.yaml`).
- **JSON Schemas**: `kebab-case-request.json` or `kebab-case-response.json` (e.g., `identity-login-request.json`).
- **Events**: PascalCase for event names (e.g., `IdentityCreated`), representing past-tense facts.

### 5. Package & Namespace
- Must follow the reverse-domain pattern incorporating the bounded context: `org.campusos.module.{context}` (e.g., `org.campusos.kernel.identity`).

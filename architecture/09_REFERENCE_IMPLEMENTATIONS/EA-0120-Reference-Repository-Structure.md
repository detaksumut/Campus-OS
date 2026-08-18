---
id: EA-0120
title: Reference Repository Structure
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Repository Structure

## Purpose
Defines the mandatory Git repository layout for any Business Module or Kernel Runtime developed within Campus OS. Consistency in repository structure accelerates developer onboarding and simplifies CI/CD pipeline automation.

## The Standard Monorepo/Polyrepo Layout

Whether using a monorepo for all modules or separate repos per domain, the internal directory structure of a Module MUST follow this normative layout:

```text
module-identity/
├── .github/                   # CI/CD pipelines (or .gitlab-ci)
├── docs/                      # Module-specific documentation (ADRs, Runbooks)
├── api/                       # API Contracts (OpenAPI YAML, AsyncAPI YAML, Protobufs)
├── cmd/                       # Entrypoints for the application(s)
│   └── identity-server/       # Main executable
├── internal/                  # Private application and domain code
│   ├── domain/                # Entities, Value Objects, Aggregate Roots
│   ├── service/               # Pure Domain Services
│   ├── application/           # Application Services (Use Cases, CQRS Handlers)
│   └── infrastructure/        # Repositories, API Clients, Event Publishers
├── pkg/                       # Public libraries intended for export (if any)
├── deployments/               # Kubernetes Manifests, Helm Charts, Dockerfiles
├── scripts/                   # Build, test, and utility scripts
├── migrations/                # Database migration scripts (Flyway standard)
├── tests/                     # Integration and End-to-End tests
├── .golangci.yml              # Linter configurations (e.g., Go, ESLint)
├── Makefile                   # Standardized build commands
└── README.md                  # Project overview and quickstart
```

## Enforcement
This structure reflects the Ports and Adapters (Hexagonal) architecture. 
- The `domain/` and `service/` folders must never import packages from `infrastructure/`.
- The CI pipeline (`EA-0080-Quality-Gates`) MUST enforce this dependency rule statically.

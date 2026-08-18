---
id: EA-0131
title: Reference Coding Patterns
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Coding Patterns

## Purpose
Defines the boundaries of developer freedom. It explicitly separates the architectural constraints that MUST be followed from the design patterns that MAY be used depending on the specific problem space.

## Mandatory Architectural Boundaries

Regardless of the programming language or framework used, EVERY module MUST implement the following:

1. **Layered Architecture**: Strict separation of concerns (Presentation, Application, Domain, Infrastructure).
2. **Hexagonal / Ports & Adapters**: The Domain layer MUST NOT depend on the Infrastructure layer. Infrastructure implements interfaces defined by the Application/Domain layer (Dependency Inversion).
3. **Dependency Inversion**: Core logic depends on abstractions, not concretions (e.g., depend on `UserRepository` interface, not `PostgresUserRepository`).
4. **Explicit Contracts**: All inbound and outbound communication MUST be strictly typed and validated against an OpenAPI or AsyncAPI contract. No arbitrary JSON blobs.
5. **Stateless Services**: Application and Domain services MUST NOT hold state in memory between requests. All state must be persisted to the database or cache.
6. **Event-driven Integration**: Modules MUST communicate via the Event Bus for state changes affecting other domains.

## Optional Design Patterns

Developers are free to use these patterns when they fit the complexity of the domain, provided they do not violate the Mandatory Boundaries above:

- **CQRS (Command Query Responsibility Segregation)**: Recommended for high-read/low-write modules (e.g., Academic Profile).
- **Repository Pattern**: Recommended for abstracting database access.
- **Specification Pattern**: Recommended for complex, reusable database query filters.
- **Factory Pattern**: Recommended for complex Aggregate Root creation.
- **Saga Pattern**: Recommended for multi-step distributed transactions (typically orchestrated by the Workflow Runtime).
- **Event Sourcing**: Permitted for modules requiring absolute auditability (e.g., Finance Ledger), but not mandated globally due to its complexity.

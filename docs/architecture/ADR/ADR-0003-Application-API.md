# ADR-0003: Application API as Internal Facade

**Status**: Accepted
**Context**: Business logic requires multiple entry points (REST, GraphQL, gRPC, CLI, AI Agents). Mixing transport logic (e.g., HTTP Request/Response) with business orchestration violates Single Responsibility.
**Decision**: Every bounded context must expose an `Application API` (e.g., `RegistrationApi`). This is a pure TypeScript class acting as an internal facade. It orchestrates validation, DTO mapping, and Application Services. It does NOT know about HTTP.
**Consequences**: Presentation Plugins (REST Controllers, React Widgets) must exclusively call the `Application API` and never bypass it to reach Domain Services.

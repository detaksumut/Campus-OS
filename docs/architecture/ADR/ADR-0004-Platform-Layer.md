# ADR-0004: Generic Platform Layer

**Status**: Accepted
**Context**: Repositories tied directly to specific technologies (e.g., Drizzle, Prisma, RabbitMQ) make the system rigid and hard to migrate.
**Decision**: We establish generic `packages/platforms/*` (database, messaging, identity, storage). Domains interface with these platforms via abstractions (e.g., `IDatabaseExecutor`).
**Consequences**: Bounded context repositories are ORM-Agnostic. Replacing Drizzle with another tool only requires updating the Platform, leaving domain logic untouched.

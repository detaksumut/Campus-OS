# ADR-0002: Bounded Context Ownership

**Status**: Accepted
**Context**: We need to prevent domain logic from leaking into shared infrastructure or orchestration layers.
**Decision**: No business code may exist outside a bounded context. All business rules, specific adapters, and application services related to a domain (e.g., Registration) must live solely within `domains/[context]`.
**Consequences**: The `packages/application` and `packages/infrastructure` folders are reserved exclusively for generic, domain-blind utilities (now referred to as `application-kernel` and `platforms`).

# ADR-0001: Dependency Direction

**Status**: Accepted
**Context**: Complex enterprise applications tend to suffer from cyclic dependencies and "Big Ball of Mud" architectures when domains entangle with infrastructure and UI components.
**Decision**: We enforce a strict 6-layer downward dependency graph:
`Presentation ➔ Application API ➔ Application Service ➔ Domain Runtime ➔ Repository ➔ Platform Database`
**Consequences**: General packages (platforms, application-kernel) must never depend on business domains. UIs cannot directly hit Repositories.

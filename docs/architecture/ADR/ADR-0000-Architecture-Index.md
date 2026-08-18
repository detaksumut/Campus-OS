# ADR-0000: Architecture Decision Records Index

This directory serves as the single source of truth for all foundational architectural decisions in Campus OS. Any structural modification or paradigm shift must be recorded here to ensure historical traceability.

## Current Records
- [ADR-0001-Dependency-Direction](file:///d:/Campus%20OS/docs/architecture/ADR/ADR-0001-Dependency-Direction.md): Established the strict 6-layer downward flow.
- [ADR-0002-Bounded-Context-Ownership](file:///d:/Campus%20OS/docs/architecture/ADR/ADR-0002-Bounded-Context-Ownership.md): No business code outside bounded context.
- [ADR-0003-Application-API](file:///d:/Campus%20OS/docs/architecture/ADR/ADR-0003-Application-API.md): Application API as the internal facade, distinct from HTTP Controllers.
- [ADR-0004-Platform-Layer](file:///d:/Campus%20OS/docs/architecture/ADR/ADR-0004-Platform-Layer.md): Generic platforms (database, messaging, identity) oblivious to domain logic.
- [ADR-0005-Presentation-ABI](file:///d:/Campus%20OS/docs/architecture/ADR/ADR-0005-Presentation-ABI.md): Registry-driven presentation layer and strict avoidance of hardcoded React routes.
- [ADR-0006-Certification-Levels](file:///d:/Campus%20OS/docs/architecture/ADR/ADR-0006-Certification-Levels.md): 5-tiered certification and Definition of Freezes.

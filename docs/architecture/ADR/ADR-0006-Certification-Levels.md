# ADR-0006: Tiered Architecture Certification

**Status**: Accepted
**Context**: We need a methodical way to measure when a module is truly "done" and adheres to Enterprise Rules.
**Decision**: We establish a 5-tiered certification model:
1. Backend Certified (Validated by `DefinitionOfBackendFreeze.md`)
2. Presentation Certified (Validated by `DefinitionOfPresentationFreeze.md`)
3. Integration Certified
4. Architecture Certified
5. Platform Certified
**Consequences**: Auditing becomes modular. If presentation logic changes, only Tier 2 needs re-certification.

# Certification Metrics

**Version:** 1.0.0 | **Date:** 2026-07-20

| Metric | Count |
|---|---|
| **Aggregates** | 10 |
| **Runtimes** | 11 |
| **Policies** | 2 |
| **Domain Services** | 2 |
| **Rule Providers** | 3 (Membership, Publication, Conference) |
| **Domain Events** | 18 |
| **Integration Events** | 4 |
| **DTO Types** | 18 |
| **Projections** | 1 (CertificateProjection) |
| **Test Files** | 4 (S51, S52, S53, S54) |
| **SDK Interfaces Consumed** | 3 (IMembershipLookup, IMembershipTierLookup, IPublicationLookup) |
| **SDK Interfaces Exposed** | 12 |
| **Sprint Count** | 4 (5.1 → 5.4) |

## Architectural Properties

| Property | Value |
|---|---|
| **Architecture Style** | DDD + Event-Driven + CQRS |
| **Scheme-Driven** | Yes — all business rules live in `CertificationScheme` |
| **PrerequisiteEngine** | Declarative (ALL/ANY/NOT) — reused for Application and Renewal |
| **Certificate Versioning** | Immutable chain (v1 → v2 → v3) |
| **Badge System** | Domain-agnostic (shared with Awards, Conference) |
| **Dependency Direction** | Certification → Membership SDK, Publication SDK only |
| **Reverse Dependencies** | None — Membership and Publication do not know about Certification |

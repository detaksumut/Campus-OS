# Bounded Context Acceptance Standard

**Scope:** Global Enterprise Architecture
**Applies to:** All Campus OS Business Domains (Membership, Publication, Certification, Conference, etc.)

Before any Bounded Context can be marked as `FROZEN` and promoted to production integrations, it MUST satisfy the following architectural criteria. This ensures uniformity, security, and decoupling across the entire Campus OS ecosystem.

## 1. Documentation Requirements (Dual-Level)
- **Level 1 (Domain Source of Truth):** Must contain a `docs/` folder with an Architecture Report, API Freeze statement, Event Catalog, Projection Catalog, and a machine-readable `manifest.json`.
- **Level 2 (Enterprise Catalog):** Must register its SDK, Events, Projections, and high-level interaction patterns in the root `docs/architecture/` catalog.

## 2. Cross-Domain Integration (Strict Decoupling)
- **No Entity Leaks:** The SDK must ONLY expose DTOs, Projections, or Value Objects. 
- **No Direct Runtime Access:** Domain A cannot call Domain B's internal Runtime. All synchronous communication must go through Domain B's Read-Only SDK.
- **Dependency Isolation:** Domains must not share databases. 

## 3. Asynchronous Communication (Events)
- All events published to the `IEventBus` MUST be wrapped in the standard Kernel `EventEnvelope<T>`.
- The envelope must populate `eventId`, `timestamp`, `correlationId`, `version`, and `schemaVersion`.

## 4. CQRS Read Models (Directory/Search)
- Projections built for querying by other domains must be populated asynchronously by listening to Domain Events.
- All Projections must include standard `ProjectionMetadata` (including `projectionVersion` and `sourceAggregateVersion`).

## 5. Internal Domain Architecture
- **Runtime Separation:** The `Runtime` orchestrates workflow; the `Policy` dictates business rules. Do not merge transition logic into the Runtime.
- **Identity Binding:** Every domain must map the global `kernelIdentityId` to its own internal business identity (e.g., `membershipId`, `authorId`).

## 6. Quality Gates
- Must pass the AST Architecture Validator.
- Must achieve 100% test coverage for core workflows and state transitions.

> By adhering to these standards, Campus OS ensures that any team can confidently integrate with any Bounded Context without fear of breaking internal logic or dealing with undocumented side-effects.

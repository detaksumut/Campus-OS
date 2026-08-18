# Application Layer Acceptance Standard

**Version:** 1.0.0 | **Date:** 2026-07-20

This standard governs all components built within the **Application Layer** of Campus OS (Phases 6-9). Its primary goal is to ensure that the Application Layer remains a pure orchestration, presentation, and infrastructure integration layer, and **never** absorbs business logic.

---

## 1. Zero Business Logic Rule
**Application Services must not contain business rules.**
- Application Services exist only to coordinate tasks, authorize users, dispatch commands, and format responses.
- If a decision needs to be made based on domain state (e.g., "Is this user eligible?"), it must be evaluated by a `Policy` or `Runtime` in the Business Layer.

## 2. State Mutation Boundary
**All state changes must occur through a Business Layer Runtime.**
- Application Layer code must never directly update a database or projection store representing a Domain Aggregate.
- To mutate state, the Application Layer must invoke the appropriate method on the owning domain's `Runtime`.

## 3. Presentation Isolation
**The UI must never access Aggregates directly.**
- The UI (including Portal APIs and Registry-Driven UI) must only consume **Projections** (CQRS Read Models) or specifically designed DTOs.
- Aggregates and internal domain entities are strictly hidden behind the Business Layer API.

## 4. Cross-Domain Access via SDK
**All cross-domain interactions must route through SDK Contracts.**
- When an Application Service orchestrates a flow involving multiple domains, it must use the registered `SDK Interfaces` (e.g., `IMembershipLookup`).
- Application Services must not bypass the SDK to reach internal domain databases or runtimes.

## 5. Orchestration vs Choreography
**Cross-domain orchestration uses Application Services; Choreography uses Events.**
- **Orchestration:** When a direct, synchronous process spans multiple domains (e.g., a user submits a form that updates Profile and triggers a Submission), an Application Service manages the transaction via SDKs.
- **Choreography:** When domains react to each other asynchronously, they must use **Integration Events** (e.g., Certification reacting to `publication.article.published`).

---

## Governance Enforcement
Any Pull Request targeting the Application Layer (Portal APIs, UI, Workflow Engine, Infrastructure Adapters) will be automatically rejected if it violates these boundaries. The Business Layer is the **only** source of truth for Campus OS business logic.

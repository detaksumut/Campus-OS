# Membership Bounded Context (Integration View)

**Domain:** Membership
**Role:** Source of truth for business identity, profiles, and directory indexing.

## Interacting with Membership
Other contexts (e.g., Publication, Certification) MUST NEVER access the Membership databases or internal runtimes.

**Allowed Integration Paths:**
1. **Synchronous (Read-Only):** Use the `Membership SDK` (see `sdk/membership-sdk.md`).
2. **Asynchronous (Reactive):** Subscribe to `Membership Events` (see `events/membership-events.md`).

For CQRS Search capabilities, refer to `projections/membership-projections.md`.

# Policy Runtime Events

This document outlines the foundational events for the Event-Driven Architecture within the Policy Runtime. This will be transitioned to an `AsyncAPI` specification in Phase 4.

## Event Definitions

### `PolicyUpdated`
Published when an existing policy rule is added, updated, or deprecated.
**Payload:**
- `policyId` (UUID)
- `action` (String: CREATED, UPDATED, DEPRECATED)
- `timestamp` (ISO-8601)

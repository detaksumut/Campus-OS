# Identity Runtime Events

This document outlines the foundational events for the Event-Driven Architecture within the Identity Runtime. This will be transitioned to an `AsyncAPI` specification in Phase 4.

## Event Definitions

### `IdentityCreated`
Published when a new identity is successfully registered.
**Payload:**
- `identityId` (UUID)
- `type` (Enum: USER, SYSTEM, DEVICE)
- `timestamp` (ISO-8601)

### `IdentityUpdated`
Published when profile information or credentials for an identity change.
**Payload:**
- `identityId` (UUID)
- `changes` (Array of fields changed)
- `timestamp` (ISO-8601)

### `IdentityVerified`
Published when an identity successfully verifies their email or phone number.
**Payload:**
- `identityId` (UUID)
- `method` (String: EMAIL, SMS)
- `timestamp` (ISO-8601)

### `IdentityDisabled`
Published when an identity is suspended or soft-deleted.
**Payload:**
- `identityId` (UUID)
- `reason` (String)
- `timestamp` (ISO-8601)

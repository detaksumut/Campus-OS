# Credential Runtime Events

This document outlines the foundational events for the Event-Driven Architecture within the Credential Runtime. This will be transitioned to an `AsyncAPI` specification in Phase 4.

## Event Definitions

### `CredentialIssued`
Published when a new verifiable credential is created and signed.
**Payload:**
- `credentialId` (UUID)
- `subjectId` (UUID)
- `credentialType` (String)
- `timestamp` (ISO-8601)

### `CredentialRevoked`
Published when an existing credential is revoked and invalidated.
**Payload:**
- `credentialId` (UUID)
- `reason` (String)
- `timestamp` (ISO-8601)

# Document Runtime Events

This document outlines the foundational events for the Event-Driven Architecture within the Document Runtime. This will be transitioned to an `AsyncAPI` specification in Phase 4.

## Event Definitions

### `DocumentUploaded`
Published when a new document is successfully saved to storage and metadata is recorded.
**Payload:**
- `documentId` (UUID)
- `ownerId` (UUID)
- `mimeType` (String)
- `sizeBytes` (Integer)
- `timestamp` (ISO-8601)

### `DocumentDeleted`
Published when a document is permanently removed from storage.
**Payload:**
- `documentId` (UUID)
- `timestamp` (ISO-8601)

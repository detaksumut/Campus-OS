# Search Runtime Events

This document outlines the foundational events for the Event-Driven Architecture within the Search Runtime. This will be transitioned to an `AsyncAPI` specification in Phase 4.

## Event Definitions

### `DocumentIndexed`
Published when a data entity is successfully synchronized to the search index.
**Payload:**
- `documentId` (String)
- `indexAlias` (String)
- `timestamp` (ISO-8601)

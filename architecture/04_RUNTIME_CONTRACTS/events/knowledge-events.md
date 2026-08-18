# Knowledge Runtime Events

This document outlines the foundational events for the Event-Driven Architecture within the Knowledge Runtime. This will be transitioned to an `AsyncAPI` specification in Phase 4.

## Event Definitions

### `KnowledgeIngested`
Published when new data is successfully chunked, embedded, and added to the vector index.
**Payload:**
- `documentId` (UUID)
- `source` (String)
- `timestamp` (ISO-8601)

### `KnowledgeUpdated`
Published when an existing entity in the knowledge graph is modified.
**Payload:**
- `entityId` (UUID)
- `changes` (Array of Strings)
- `timestamp` (ISO-8601)

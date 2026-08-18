# AI Runtime Events

This document outlines the foundational events for the Event-Driven Architecture within the AI Runtime. This will be transitioned to an `AsyncAPI` specification in Phase 4.

## Event Definitions

### `AiInferenceCompleted`
Published when an LLM generation successfully finishes.
**Payload:**
- `sessionId` (UUID)
- `modelUsed` (String)
- `tokensConsumed` (Integer)
- `latencyMs` (Integer)
- `timestamp` (ISO-8601)

### `AiToolInvoked`
Published when the AI Runtime calls an internal tool/API on behalf of the agent.
**Payload:**
- `sessionId` (UUID)
- `toolName` (String)
- `timestamp` (ISO-8601)

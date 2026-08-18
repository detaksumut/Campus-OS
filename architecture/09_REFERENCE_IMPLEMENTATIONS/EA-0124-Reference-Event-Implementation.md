---
id: EA-0124
title: Reference Event Implementation
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Event Implementation

## Purpose
Defines the normative standard for publishing and consuming Business Events across Campus OS, ensuring all asynchronous communication adheres to the CloudEvents specification.

## The CloudEvents Standard
Campus OS mandates the adoption of the [CloudEvents v1.0](https://cloudevents.io/) specification for all messages published to the Event Bus. This ensures that metadata and routing information are decoupled from the core business payload.

### Example: `UserCreated` Event

```json
{
  "specversion": "1.0",
  "type": "io.campus-os.identity.user.created.v1",
  "source": "urn:campus-os:module:identity",
  "id": "A234-1234-1234",
  "time": "2026-07-20T10:00:00Z",
  "datacontenttype": "application/json",
  "data": {
    "userId": "usr_998877",
    "tenantId": "tnt_112233",
    "role": "student"
  }
}
```

## Implementation Rules
1. **Schema Registry**: All event payloads (`data`) MUST be registered and validated against a central Schema Registry (e.g., using AsyncAPI or JSON Schema).
2. **At-Least-Once Delivery**: Publishers and Consumers must be built assuming at-least-once delivery. Consumers MUST be idempotent.
3. **Outbox Pattern**: Modules MUST use the Transactional Outbox pattern when publishing events to ensure atomic consistency between database commits and event publication.

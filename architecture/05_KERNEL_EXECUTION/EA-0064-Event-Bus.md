---
id: EA-0064
title: Event Bus
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Event Bus

## Purpose
Defines the messaging backbone for Campus OS, enabling asynchronous, decoupled communication between modules and runtimes.

## Messaging Patterns
- **Publish/Subscribe (Broadcast)**: An event is emitted to the bus and distributed to zero or more interested subscribers.
- **Request-Reply (RPC over Messaging)**: Used rarely when synchronous-like response is needed asynchronously.

## Reliability Mechanisms
- **Retry**: Subscribers MUST implement transient fault handling. If processing fails, the message is retried according to an exponential backoff policy.
- **Dead Letter Queue (DLQ)**: If a message exceeds the maximum retry count (Poison Message), it MUST be routed to a DLQ for manual inspection and replay.
- **Idempotency**: All event handlers MUST be idempotent. Processing the exact same message multiple times must result in the same system state as processing it once.

## Ordering Guarantees
- **FIFO (First-In, First-Out)**: Strict ordering is generally not guaranteed system-wide to preserve scalability.
- **Partition Ordering**: If strict ordering is required for a specific business entity (e.g., changes to a specific student record), events MUST be partitioned by a Business Key (e.g., `studentId`). Events within the same partition are guaranteed to be processed in order.

## Delivery Guarantees
- **At Most Once**: Not used for business-critical data (Risk of data loss).
- **At Least Once**: The standard execution model. The broker ensures the message is delivered, but it might be delivered multiple times (hence the Idempotency requirement).
- **Exactly Once (Conceptual)**: Achieved at the business level by combining *At Least Once* delivery with *Idempotent Handlers* and Transactional Outbox patterns.

## Correlation and Observability
Every message payload or envelope MUST contain:
- `TraceId`: Ties the message to the original initiating request (e.g., HTTP request).
- `CorrelationId`: Ties the message to a specific business workflow.
- `CausationId`: The ID of the message/event that caused this new event to be generated.

## Evolution and Compatibility
- **Event Versioning**: Events MUST be versioned (e.g., `IdentityCreated.v1`).
- **Compatibility**: Event schema changes MUST be strictly backward compatible. Breaking changes require a new version number and dual-publishing during the migration window.

## CQRS & Event Sourcing Statement
The Campus Kernel **supports** CQRS and Event Sourcing patterns, but does **not require** them. Runtimes and Modules may utilize standard CRUD architectures unless specific business constraints dictate the necessity of Event Sourcing.

## Reference Implementation Examples (Informative)
- **Brokers**: RabbitMQ, Apache Kafka, Google Cloud Pub/Sub, AWS SQS/SNS.

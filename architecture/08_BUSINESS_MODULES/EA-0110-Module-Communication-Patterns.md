---
id: EA-0110
title: Module Communication Patterns
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Module Communication Patterns

## Purpose
Defines the permitted communication flow patterns used by Business Modules to fulfill Business Processes without violating the loose coupling mandate of Campus OS.

## Supported Patterns

### 1. The Gateway Composition Pattern
- **Scenario**: A user interface needs data from `Academic Profile`, `Finance` (Tuition Status), and `Curriculum` (Current Courses).
- **Execution**: The client makes a single call to the API Gateway. The Gateway scatters the requests to the three modules simultaneously, gathers the JSON responses, composes an aggregate payload, and returns it to the client.
- **Rule**: Modules do not call each other; the Gateway calls them.

### 2. The Choreography Pattern (Reactive)
- **Scenario**: When a student is enrolled, a notification must be sent and an invoice must be created.
- **Execution**: The `Enrollment` module publishes `EnrollmentCompleted`. The `Notification` module and `Finance` module independently listen to the Event Bus and react to this event.
- **Rule**: Ideal for "fire-and-forget" state changes where downstream failure shouldn't rollback the upstream action.

### 3. The Orchestration Pattern (Command)
- **Scenario**: An automated end-of-year graduation check requires querying 5 modules, evaluating a complex matrix of rules, and executing a status update.
- **Execution**: The Kernel's **Workflow Runtime** acts as the orchestrator. It uses the API Gateway to issue synchronous `GET` commands to evaluate state, and `POST` commands to execute the status update, handling retries and compensating transactions centrally.
- **Rule**: Ideal for complex, stateful business processes requiring transactional integrity across boundaries.

### 4. The Anti-Corruption Pattern
- **Scenario**: A Campus OS module needs to interact with a legacy on-premise ERP.
- **Execution**: A dedicated proxy module (Anti-Corruption Layer) translates the legacy SOAP/XML into standard Campus OS JSON or Business Events. Core modules only interact with the ACL module via the Event Bus or API Gateway.

---
id: EA-0106
title: Cross-Module Orchestration
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Cross-Module Orchestration

## Purpose
Defines the strict rules of engagement when a business process spans multiple domains, ensuring Modules remain loosely coupled and independently deployable.

## The Anti-Pattern: Direct Coupling
Direct communication between Business Modules is an architectural violation.
- **Forbidden**: The `Academic` module making an HTTP REST call directly to the `Finance` module's URL.
- **Forbidden**: The `Academic` module connecting to the `Finance` module's database to run a `JOIN`.
- **Forbidden**: Modules sharing common code libraries that contain domain logic (Shared Kernel is limited to infrastructural concerns).

## Authorized Orchestration Patterns

### 1. Asynchronous Choreography (Event Bus)
The preferred method for most cross-module interactions.
- Module A publishes a Domain Event (e.g., `StudentRegistered`) to the Event Bus.
- Module B (and potentially C and D) subscribes to that event and executes its own logic (e.g., generating an invoice).
- Module A has no knowledge of Module B's existence.

### 2. Synchronous Orchestration (Workflow Runtime)
Used when a centralized business process dictates a strict sequence of steps across modules, or when compensating transactions (Sagas) are required on failure.
- A central process executing in the Kernel's **Workflow Runtime** coordinates the flow.
- The Workflow invokes Module A via the API Gateway. Upon success, it invokes Module B.
- If Module B fails, the Workflow commands Module A to execute a rollback API call.

### 3. Synchronous Composition (API Gateway / Frontend)
Used when data from multiple modules must be read and presented together to a user in real-time.
- The User Interface (or an API Gateway aggregator) makes parallel calls to Module A and Module B, combining the JSON responses on the client side.

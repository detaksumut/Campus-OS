---
id: EA-0093
title: Module Dependency Rules
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Module Dependency Rules

## Purpose
Defines the strict interaction constraints between Platform components to prevent spaghetti architecture and circular dependencies.

## The Dependency Golden Rule
**"Modules must depend on the Platform Foundation, never directly on one another."**

### Forbidden Dependencies
- The `Academic` module MUST NOT depend on the `Finance` module.
- The `Admission` module MUST NOT depend on the `Academic` module.

### Resolving Module Interaction
If the `Admission` module needs to trigger an action in the `Academic` module (e.g., enrolling a student after admission is accepted), it MUST use one of the following integration patterns:

1. **Event-Driven Choreography**: `Admission` publishes an `AdmissionAccepted` event to the Event Bus. `Academic` subscribes to this event and processes the enrollment independently.
2. **Workflow Orchestration**: A Workflow Engine (Platform Capability) intercepts the `AdmissionAccepted` event and makes an API call to the `Academic` module via the API Gateway.
3. **Gateway Composition**: An aggregate UI makes simultaneous calls to both modules through the API Gateway, composing the data on the client side.

## Dependency Matrix Validation
The architecture requires automated static analysis during the CI pipeline (Quality Gate: Architecture Validation) to guarantee that module source code never imports or links directly to another module's namespace or database.

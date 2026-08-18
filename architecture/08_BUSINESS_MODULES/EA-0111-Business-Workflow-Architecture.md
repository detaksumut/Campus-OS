---
id: EA-0111
title: Business Workflow Architecture
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Business Workflow Architecture

## Purpose
Defines how Campus OS orchestrates complex, stateful, and long-running business processes (e.g., student admission, faculty onboarding) without hardcoding state transitions into individual Business Modules.

## The Workflow Runtime
The Campus Kernel provides a centralized **Workflow Runtime** (e.g., using BPMN or a State Machine engine like temporal.io). This engine holds the state of the long-running process.

## Architectural Rules for Workflows

1. **Modules are Stateless**: A Business Module (e.g., `Admission`) should only know about its own domain state (e.g., Application `Pending` -> `Approved`). It should NOT know what happens next in the grand scheme (e.g., it shouldn't know that the next step is `Finance` invoice generation).
2. **Workflows are Stateful**: The Workflow Runtime coordinates the overarching state. When the `Admission` module completes its task, the Workflow Runtime transitions to the next step, commanding the `Finance` module to execute its task.
3. **Idempotency**: All Application Services exposed by Business Modules MUST be idempotent. Because workflows might retry failed API calls, an API call executed twice MUST yield the same system state as if executed once.
4. **Timeouts and Compensations**: Workflows MUST define failure paths. If step 3 of a 5-step workflow fails and cannot be recovered, the Workflow Runtime must execute compensating transactions (e.g., issuing refunds or rolling back status) on steps 1 and 2.

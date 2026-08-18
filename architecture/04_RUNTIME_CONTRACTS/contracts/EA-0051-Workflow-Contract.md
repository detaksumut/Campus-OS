---
id: EA-0051
title: Workflow Runtime Contract
type: Runtime Contract
status: APPROVED
version: 1.0.0
---

# Workflow Runtime Contract

## Purpose
Provides a standardized engine and contract for orchestrating business processes, approvals, and state transitions across Campus OS modules.

## Responsibilities
- Managing state transitions for business entities.
- Orchestrating approval flows and multi-step processes.
- Maintaining audit trails of workflow executions.

## Public API

### Commands
- `POST /workflow/start` - Initiate a new workflow instance.
- `POST /workflow/{id}/approve` - Approve a workflow task.
- `POST /workflow/{id}/reject` - Reject a workflow task.

### Queries
- `GET /workflow/{id}` - Retrieve the current state of a workflow instance.

## Published Events
- `WorkflowStarted`
- `WorkflowApproved`
- `WorkflowRejected`
- `WorkflowCompleted`

## Consumed Events
- Module-specific events that trigger workflow progression.

## Error Codes
- `WF-400`: Invalid workflow state transition.
- `WF-403`: Unauthorized to approve/reject.
- `WF-404`: Workflow instance not found.

## Security
- Requires mutual TLS for inter-service communication.

## Authorization
- Validated via Identity and Policy runtimes to ensure actor can transition state.

## Database Mapping
Schema: `kernel_workflow`

## Dependencies
- Identity Runtime (Actor resolution)
- Policy Runtime (Approval conditions)
- Notification Runtime (Task assignments)

## Observability
- Workflow completion times.
- Bottleneck detection in approval queues.

## Performance Targets
- State transition < 200ms
- Workflow startup < 500ms

## Versioning
- API Version: `v1`

## Compatibility
- OpenAPI 3.1 compliant.

## Examples
*See `04_RUNTIME_CONTRACTS/examples/workflow` for JSON examples.*

## Diagram

### Approval Flow (Sequence Diagram)
```mermaid
sequenceDiagram
    participant Module
    participant Workflow Runtime
    participant Policy Runtime
    participant Notification Runtime
    
    Module->>Workflow Runtime: POST /workflow/start
    Workflow Runtime->>Policy Runtime: Evaluate Conditions
    Policy Runtime-->>Workflow Runtime: Approval Required
    Workflow Runtime->>Notification Runtime: Send Task Notification
    Workflow Runtime-->>Module: Workflow Pending
    
    Note over Module,Notification Runtime: Actor approves task
    Module->>Workflow Runtime: POST /workflow/{id}/approve
    Workflow Runtime->>Workflow Runtime: Update State
    Workflow Runtime-->>Module: Workflow Completed
```

### Workflow Lifecycle (State Machine)
```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> PendingApproval: Submitted
    PendingApproval --> Approved: All approvals met
    PendingApproval --> Rejected: One or more rejected
    Approved --> InProgress: Execution started
    InProgress --> Completed: Execution finished
    InProgress --> Failed: Error occurred
    Rejected --> [*]
    Completed --> [*]
    Failed --> [*]
```

### C4 Component Diagram
```mermaid
C4Component
    title Component Diagram for Workflow Runtime

    Container(api_gateway, "API Gateway", "Kong", "Routes traffic")
    
    Container_Boundary(workflow_boundary, "Workflow Runtime") {
        Component(engine_controller, "Engine Controller", "REST API", "Handles workflow endpoints")
        Component(state_machine, "State Machine", "Core Engine", "Manages transitions")
        Component(audit_service, "Audit Service", "Service", "Records history")
    }
    
    ContainerDb(database, "Workflow DB Schema", "PostgreSQL", "kernel_workflow")
    
    Rel(api_gateway, engine_controller, "Uses", "HTTPS")
    Rel(engine_controller, state_machine, "Invokes")
    Rel(state_machine, audit_service, "Records actions")
    Rel(state_machine, database, "Reads/Writes")
    Rel(audit_service, database, "Writes audit log")
```

### Runtime Interaction Diagram
```mermaid
graph TD
    A[Business Module] -->|REST| B(Workflow Runtime)
    B -->|Checks Rules| C(Policy Runtime)
    B -->|Sends Task| D(Notification Runtime)
    B -->|Publishes Event| E((Event Bus))
    E -->|WorkflowCompleted| A
```

## Certification Checklist
- [x] Metadata Complete
- [x] API Documented
- [x] Events Documented
- [x] Database Mapped
- [x] Diagrams Rendered
- [x] Traceability Validated

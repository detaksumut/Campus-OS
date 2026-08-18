# Workflow Runtime Events

This document outlines the foundational events for the Event-Driven Architecture within the Workflow Runtime. This will be transitioned to an `AsyncAPI` specification in Phase 4.

## Event Definitions

### `WorkflowStarted`
Published when a new workflow instance begins execution.
**Payload:**
- `workflowId` (UUID)
- `workflowType` (String)
- `businessKey` (String)
- `timestamp` (ISO-8601)

### `WorkflowApproved`
Published when a required actor approves a task within the workflow.
**Payload:**
- `workflowId` (UUID)
- `taskId` (String)
- `approverId` (UUID)
- `timestamp` (ISO-8601)

### `WorkflowRejected`
Published when a required actor rejects a task within the workflow.
**Payload:**
- `workflowId` (UUID)
- `taskId` (String)
- `rejecterId` (UUID)
- `reason` (String)
- `timestamp` (ISO-8601)

### `WorkflowCompleted`
Published when the workflow reaches an end state successfully.
**Payload:**
- `workflowId` (UUID)
- `businessKey` (String)
- `finalState` (String)
- `timestamp` (ISO-8601)

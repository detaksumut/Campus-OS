---
EA-ID: EA-0020
Title: Workflow Runtime
Category: Operating Runtime
Layer: Architecture
Version: 2.0
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Chief Enterprise Architect
Depends-On: [EA-0017, EA-0021, EA-0018, EA-0023]
Referenced-By: [PHASE-3-CERTIFICATION]
Last-Updated: 2026-07-20
---

# Workflow Runtime

## 1. Purpose
The Workflow Runtime orchestrates stateful, long-running business processes across Campus OS. It guarantees execution consistency, state persistence, and distributed transaction compensation (Saga pattern) without knowing the specific business rules of the modules invoking it.

## 2. Responsibilities
- Stateful process orchestration (BPMN/State Machine execution).
- Saga orchestration and compensation.
- Manual task assignment and tracking.
- Workflow versioning.

## 3. Public Contracts (API)
- `POST /runtime/workflow/start` - Initiates a workflow instance.
- `POST /runtime/workflow/task/{id}/complete` - Completes a human or system task.
- `GET /runtime/workflow/instance/{id}` - Retrieves workflow state.

## 4. Published Events
- `workflow.started`
- `workflow.completed`
- `workflow.failed`
- `workflow.task.assigned`

## 5. Consumed Events
- `policy.validation.failed` (Triggers workflow compensation).

## 6. Configuration
- `Workflow.Engine.Timeout`
- `Workflow.History.Retention`

## 7. Security Policies
- Only authorized identities can complete assigned human tasks.
- Workflow definitions can only be deployed by Administrators.

## 8. Dependencies
- `Policy Runtime`: Evaluates conditions before progressing to next state.
- `Academic Identity Runtime`: Resolves actors for task assignments.
- `Notification Runtime`: Alerts users of pending tasks.

## 9. Observability
- Bottleneck analysis (time spent per state).
- Compensation failure rates.

## 10. Failure Handling
- Automatically triggers Saga compensation (rollback) if a distributed step fails.
- Dead-letter queues for unroutable tasks.

## 11. Version
- Contract Version: `v1`
- Engine Version: `1.0.0`

## Certification Checklist
- [x] Public Contracts defined
- [x] Events documented
- [x] No circular dependency
- [x] Independent of business logic
- [x] Security policies defined
- [x] Observability strategy defined
- [x] Failure handling defined

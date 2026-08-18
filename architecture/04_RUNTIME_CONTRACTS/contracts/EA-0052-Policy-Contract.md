---
id: EA-0052
title: Policy Runtime Contract
type: Runtime Contract
status: APPROVED
version: 1.0.0
---

# Policy Runtime Contract

## Purpose
Provides a centralized engine for evaluating business rules, permissions, and conditions across Campus OS.

## Responsibilities
- Evaluating access control (RBAC/ABAC).
- Validating business conditions (e.g., "Student must have GPA > 3.0").
- Maintaining rule definitions.

## Public API

### Commands
- `POST /policy/evaluate` - Evaluate a set of rules against a given context.
- `POST /policy/rules` - Add or update a policy rule.

### Queries
- `GET /policy/rules/{id}` - Retrieve a specific policy rule.

## Published Events
- `PolicyUpdated`

## Consumed Events
- None.

## Error Codes
- `POL-400`: Invalid context or rule syntax.
- `POL-403`: Unauthorized to manage rules.
- `POL-404`: Rule not found.

## Security
- Rule definitions are versioned and immutable once activated.

## Authorization
- Only Admin actors can modify rules.

## Database Mapping
Schema: `kernel_policy`

## Dependencies
- Knowledge Runtime (To fetch ontology for complex rules)

## Observability
- Evaluation latency.
- Rule execution count.

## Performance Targets
- Evaluation < 20ms

## Versioning
- API Version: `v1`

## Compatibility
- OpenAPI 3.1 compliant.

## Examples
*See `04_RUNTIME_CONTRACTS/examples/policy` for JSON examples.*

## Diagram

### C4 Component Diagram
```mermaid
C4Component
    title Component Diagram for Policy Runtime

    Container_Boundary(policy_boundary, "Policy Runtime") {
        Component(evaluation_api, "Evaluation API", "REST API", "Accepts evaluation requests")
        Component(rule_engine, "Rule Engine", "Core Engine", "Evaluates AST/Rules")
        Component(rule_manager, "Rule Manager", "REST API", "CRUD for rules")
    }
    
    ContainerDb(database, "Policy DB Schema", "PostgreSQL", "kernel_policy")
    
    Rel(evaluation_api, rule_engine, "Requests evaluation")
    Rel(rule_engine, database, "Reads rules")
    Rel(rule_manager, database, "Writes rules")
```

### Runtime Interaction Diagram
```mermaid
graph TD
    A[Workflow Runtime] -->|Evaluate Approval Condition| B(Policy Runtime)
    C[Identity Runtime] -->|Evaluate Access| B
    B -->|Fetch Facts| D(Knowledge Runtime)
```

## Certification Checklist
- [x] Metadata Complete
- [x] API Documented
- [x] Events Documented
- [x] Database Mapped
- [x] Diagrams Rendered
- [x] Traceability Validated

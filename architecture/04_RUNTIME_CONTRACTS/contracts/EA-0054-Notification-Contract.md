---
id: EA-0054
title: Notification Runtime Contract
type: Runtime Contract
status: APPROVED
version: 1.0.0
---

# Notification Runtime Contract

## Purpose
Provides a centralized and robust mechanism to deliver messages (email, SMS, push, in-app) to actors across the Campus OS platform.

## Responsibilities
- Routing notifications to appropriate channels based on user preferences.
- Managing templates and localization for messages.
- Retrying failed deliveries and tracking notification status.

## Public API

### Commands
- `POST /notification/send` - Enqueue a notification for delivery.
- `POST /notification/preferences` - Update user notification preferences.

### Queries
- `GET /notification/history` - Retrieve a user's notification history.

## Published Events
- `NotificationSent`
- `NotificationFailed`
- `NotificationRead`

## Consumed Events
- Any system event mapped to a notification rule (e.g., `WorkflowStarted` -> Send Email).

## Error Codes
- `NOT-400`: Invalid notification payload or missing template.
- `NOT-404`: User preference not found.
- `NOT-500`: Delivery gateway error.

## Security
- API keys required for external delivery providers (SendGrid, Twilio).

## Authorization
- Internal service authentication for sending notifications.
- Bearer token for users viewing their own history.

## Database Mapping
Schema: `kernel_notification`

## Dependencies
- Identity Runtime (User contact info)
- Configuration Runtime (Templates)

## Observability
- Delivery success rate by channel.
- Delivery latency.

## Performance Targets
- Enqueue time < 50ms
- Delivery (Internal) < 5s

## Versioning
- API Version: `v1`

## Compatibility
- OpenAPI 3.1 compliant.

## Examples
*See `04_RUNTIME_CONTRACTS/examples/notification` for JSON examples.*

## Diagram

### Publish-Subscribe Flow (Sequence Diagram)
```mermaid
sequenceDiagram
    participant Module
    participant Event Bus
    participant Notification Runtime
    participant External Gateway
    participant User
    
    Module->>Event Bus: Publish Event (e.g. WorkflowApproved)
    Event Bus->>Notification Runtime: Consume Event
    Notification Runtime->>Notification Runtime: Render Template
    Notification Runtime->>Notification Runtime: Check Preferences
    Notification Runtime->>External Gateway: Dispatch (Email/SMS)
    External Gateway-->>User: Delivery
    External Gateway-->>Notification Runtime: Delivery Receipt
```

### C4 Component Diagram
```mermaid
C4Component
    title Component Diagram for Notification Runtime

    Container(api_gateway, "API Gateway", "Kong", "Routes traffic")
    
    Container_Boundary(notification_boundary, "Notification Runtime") {
        Component(dispatch_controller, "Dispatch Controller", "REST API", "Accepts requests")
        Component(template_engine, "Template Engine", "Service", "Renders messages")
        Component(delivery_worker, "Delivery Worker", "Background", "Sends to gateways")
    }
    
    ContainerDb(database, "Notification DB Schema", "PostgreSQL", "kernel_notification")
    
    Rel(api_gateway, dispatch_controller, "Uses", "HTTPS")
    Rel(dispatch_controller, template_engine, "Formats message")
    Rel(dispatch_controller, database, "Enqueues")
    Rel(delivery_worker, database, "Dequeues")
```

### Runtime Interaction Diagram
```mermaid
graph TD
    A[Event Bus] -->|Subscribes| B(Notification Runtime)
    C[Identity Runtime] -->|Provides Contact Info| B
    B -->|Sends via| D(Email Provider)
    B -->|Sends via| E(SMS Provider)
```

## Certification Checklist
- [x] Metadata Complete
- [x] API Documented
- [x] Events Documented
- [x] Database Mapped
- [x] Diagrams Rendered
- [x] Traceability Validated

---
id: EA-0050
title: Identity Runtime Contract
type: Runtime Contract
status: APPROVED
version: 1.0.0
---

# Identity Runtime Contract

## Purpose
Provides a standardized and secure contract for authentication, identity management, and token lifecycles across the Campus OS ecosystem.

## Responsibilities
- Authentication of all actors (users, systems, devices).
- Issuance, validation, and revocation of access tokens.
- Profile and session management.

## Public API

### Commands
- `POST /identity/login` - Authenticate and establish a session.
- `POST /identity/token` - Refresh or issue tokens.
- `PUT /identity/profile` - Update user profile information.

### Queries
- `GET /identity/profile` - Retrieve the current authenticated user's profile.

## Published Events
- `IdentityCreated`
- `IdentityUpdated`
- `IdentityVerified`
- `IdentityDisabled`

## Consumed Events
- None.

## Error Codes
- `ID-401`: Authentication failed.
- `ID-403`: Access forbidden.
- `ID-404`: Identity not found.

## Security
- All endpoints must use HTTPS.
- Passwords must be hashed using Argon2.

## Authorization
- Requires standard `Bearer` token for all endpoints except `login` and `token`.

## Database Mapping
Schema: `kernel_identity`

## Dependencies
- Knowledge Runtime (for policy rules)

## Observability
- Metrics on login failure rate.
- Token generation latency.

## Performance Targets
- Login latency < 100ms
- Token validation < 50ms

## Versioning
- API Version: `v1`
- Backwards compatible with Phase 2 definitions.

## Compatibility
- OpenAPI 3.1 compliant.

## Examples
*See `04_RUNTIME_CONTRACTS/examples/identity` for JSON examples.*

## Diagram

### Authentication Flow (Sequence Diagram)
```mermaid
sequenceDiagram
    participant Client
    participant API Gateway
    participant Identity Runtime
    participant Database
    
    Client->>API Gateway: POST /identity/login
    API Gateway->>Identity Runtime: Forward Request
    Identity Runtime->>Database: Verify Credentials (kernel_identity)
    Database-->>Identity Runtime: Valid
    Identity Runtime->>Identity Runtime: Generate JWT
    Identity Runtime-->>API Gateway: Return Token
    API Gateway-->>Client: 200 OK + JWT
```

### Token Lifecycle (State Machine)
```mermaid
stateDiagram-v2
    [*] --> Generated
    Generated --> Active: Issued
    Active --> Refreshed: Refresh Request
    Refreshed --> Active
    Active --> Revoked: Logout/Admin Action
    Active --> Expired: Time limit reached
    Revoked --> [*]
    Expired --> [*]
```

### C4 Component Diagram
```mermaid
C4Component
    title Component Diagram for Identity Runtime

    Container(api_gateway, "API Gateway", "Kong", "Routes traffic")
    
    Container_Boundary(identity_boundary, "Identity Runtime") {
        Component(auth_controller, "Auth Controller", "REST API", "Handles login/tokens")
        Component(profile_controller, "Profile Controller", "REST API", "Handles profile management")
        Component(token_service, "Token Service", "Service", "Manages JWT lifecycle")
    }
    
    ContainerDb(database, "Identity DB Schema", "PostgreSQL", "kernel_identity")
    
    Rel(api_gateway, auth_controller, "Uses", "HTTPS")
    Rel(api_gateway, profile_controller, "Uses", "HTTPS")
    Rel(auth_controller, token_service, "Calls")
    Rel(token_service, database, "Reads/Writes")
```

### Runtime Interaction Diagram
```mermaid
graph TD
    A[Module/Client] -->|REST| B(Identity Runtime)
    B -->|Issues| C[JWT]
    B -->|Publishes Event| D((Event Bus))
    D -->|IdentityCreated| E(Other Runtimes)
```

## Certification Checklist
- [x] Metadata Complete
- [x] API Documented
- [x] Events Documented
- [x] Database Mapped
- [x] Diagrams Rendered
- [x] Traceability Validated

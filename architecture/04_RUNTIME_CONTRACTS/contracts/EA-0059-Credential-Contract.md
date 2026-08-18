---
id: EA-0059
title: Credential Runtime Contract
type: Runtime Contract
status: APPROVED
version: 1.0.0
---

# Credential Runtime Contract

## Purpose
Manages verifiable credentials, digital certificates, and academic transcripts in a secure, tamper-proof manner.

## Responsibilities
- Issuing and verifying digital academic credentials.
- Managing revocation lists and credential states.
- Providing standardized JSON-LD or similar verifiable formats.

## Public API

### Commands
- `POST /credential/issue` - Issue a new credential.
- `POST /credential/{id}/revoke` - Revoke an existing credential.

### Queries
- `GET /credential/{id}/verify` - Verify the authenticity of a credential.

## Published Events
- `CredentialIssued`
- `CredentialRevoked`

## Consumed Events
- `WorkflowApproved` (Triggering credential issuance upon graduation approval).

## Error Codes
- `CRD-400`: Invalid credential schema.
- `CRD-404`: Credential not found.
- `CRD-410`: Credential revoked.

## Security
- Credentials are cryptographically signed.
- Verification endpoint is public, issuance requires high-level authorization.

## Authorization
- Policy rules define who can issue which types of credentials.

## Database Mapping
Schema: `kernel_credential`

## Dependencies
- Identity Runtime (Subject of the credential)

## Observability
- Issuance volume over time.
- Verification request volume.

## Performance Targets
- Verification < 50ms
- Issuance < 2s

## Versioning
- API Version: `v1`

## Compatibility
- OpenAPI 3.1 compliant.

## Examples
*See `04_RUNTIME_CONTRACTS/examples/credential` for JSON examples.*

## Diagram

### C4 Component Diagram
```mermaid
C4Component
    title Component Diagram for Credential Runtime

    Container_Boundary(credential_boundary, "Credential Runtime") {
        Component(issuance_api, "Issuance API", "REST API", "Issues certificates")
        Component(verification_api, "Verification API", "REST API", "Verifies authenticity")
        Component(crypto_engine, "Crypto Engine", "Service", "Signs payloads")
    }
    
    ContainerDb(database, "Credential DB Schema", "PostgreSQL", "kernel_credential")
    
    Rel(issuance_api, crypto_engine, "Requests signature")
    Rel(verification_api, crypto_engine, "Validates signature")
    Rel(crypto_engine, database, "Stores verifiable data")
```

### Runtime Interaction Diagram
```mermaid
graph TD
    A[Academic Module] -->|Graduation Approved| B(Credential Runtime)
    B -->|Issues Certificate| C[Student Wallet]
    D[Employer] -->|Verifies| B
```

## Certification Checklist
- [x] Metadata Complete
- [x] API Documented
- [x] Events Documented
- [x] Database Mapped
- [x] Diagrams Rendered
- [x] Traceability Validated

---
id: EA-0134
title: Reference Security Architecture
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Security Architecture

## Purpose
Provides the normative implementation model for securing Campus OS across all perimeters, from external edge routing down to intra-cluster network policies and secret handling.

## Golden Reference Implementations

### 1. Authentication (AuthN)
- **External Users**: OIDC (OpenID Connect) via the Identity Runtime. The Gateway terminates TLS and forwards the request to the Identity Module/Runtime for token validation.
- **Internal Service-to-Service**: mTLS (Mutual TLS) managed automatically by a Service Mesh (e.g., Istio or Linkerd). Services do not need to implement TLS natively; the sidecar proxies handle it.

### 2. Authorization (AuthZ)
- **Model**: Attribute-Based Access Control (ABAC) combined with Role-Based Access Control (RBAC).
- **Execution**: The Application Services do NOT implement complex authorization logic. Instead, policies (e.g., OPA - Open Policy Agent) are evaluated at the Gateway or via the Identity Runtime sidecar *before* the request reaches the module controller.

### 3. Secret Handling
- **Rule**: NEVER store API keys, database passwords, or certificates in the Git repository, not even as base64 encoded strings.
- **Implementation**: Secrets are stored in a centralized Vault (e.g., HashiCorp Vault, GCP Secret Manager). 
- **Delivery**: The External Secrets Operator syncs secrets from the Vault into Kubernetes `Secret` resources, which are then mounted as environment variables into the Pod at startup.

### 4. Certificate Management
- **Implementation**: Cert-Manager is used to automatically provision and rotate TLS certificates for external ingresses using Let's Encrypt. Internal mTLS certificates are rotated automatically by the Service Mesh control plane.

### 5. Audit Logging
- **Rule**: All security-relevant actions (Logins, Permission Changes, Grade Alterations) MUST be audited.
- **Implementation**: Modules publish specific `Audit` events to the Event Bus. A dedicated Audit Sink subscribes to these events and writes them to immutable, WORM (Write Once, Read Many) storage.

---
id: EA-0127
title: Reference Deployment Implementation
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Deployment Implementation

## Purpose
Defines the normative configuration for deploying a Campus OS module into the Kubernetes cluster. It ensures modules are secure, highly available, and observable by default.

## Golden Reference: Helm Deployment

Every module MUST provide a Deployment Descriptor (e.g., Helm Chart or Kustomize manifest) adhering to these baseline rules:

### 1. Security Context
- **Run as Non-Root**: Containers MUST NOT run as `root`. The `securityContext` must specify `runAsUser` (e.g., 1000).
- **Read-Only Root Filesystem**: The container root filesystem MUST be mounted as read-only.
- **No Privilege Escalation**: `allowPrivilegeEscalation: false` MUST be set.

### 2. Resource Quotas
- Every container MUST define both CPU/Memory `requests` and `limits` to prevent noisy-neighbor issues on the node.

### 3. Probes (Health Checks)
- **Liveness Probe**: Determines if the application needs a restart.
- **Readiness Probe**: Determines if the application is ready to receive traffic (e.g., database connection is active).
- **Startup Probe**: (Optional) For slow-starting applications to prevent premature termination.

### 4. Configuration & Secrets
- Application configuration MUST be loaded from ConfigMaps via Environment Variables.
- Secrets (Database credentials, API keys) MUST be injected securely (e.g., via External Secrets Operator mapping to Vault) and NEVER stored in the repository.

---
id: EA-0144
title: Secrets and Configuration
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Secrets and Configuration Management

## Purpose
Defines the strict architectural boundaries between operational configurations and cryptographic secrets, ensuring that sensitive data is never compromised within artifacts or version control.

## The Separation of Concerns

A Campus OS Module deployment must distinctly separate the following three layers:

### 1. Configuration (Non-Sensitive)
Configuration values that dictate application behavior but pose no security risk if exposed.
- **Business Configuration**: Feature flags, default pagination limits.
- **Runtime Configuration**: Timeout thresholds, connection pool sizes.
- **Environment Configuration**: The URL of the API Gateway, the internal DNS name of the Event Bus.
- **Storage**: These MAY be stored in Git alongside the source code or Helm charts, and are typically mounted as Kubernetes `ConfigMap` resources.

### 2. Secrets (Sensitive)
Cryptographic materials that grant access to data or systems.
- **Credentials**: Database passwords, Redis auth tokens.
- **Certificates**: Private TLS keys.
- **API Keys**: Tokens for external services (e.g., SendGrid, AWS S3).
- **Encryption Keys**: Keys used for encrypting PII at rest.

## Architectural Mandates for Secrets
1. **No Artifact Injection**: Secrets MUST NOT be baked into the container image during the CI build process.
2. **No Version Control**: Secrets MUST NOT be committed to Git (e.g., no plain-text `.env` files).
3. **Centralized Vault**: Secrets MUST be stored in an external, encrypted, centralized Secret Management System (e.g., HashiCorp Vault).
4. **Runtime Injection**: The platform MUST fetch the secret from the Vault at runtime and mount it directly into the Pod's memory (e.g., via the Kubernetes External Secrets Operator or CSI Secret Store).

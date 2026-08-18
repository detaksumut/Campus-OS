---
id: EA-0096
title: Identity Federation
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Identity Federation

## Purpose
Defines the conceptual architecture for establishing and verifying trust across different identity boundaries, allowing Campus OS to support a diverse, inter-institutional user base without managing all credentials locally.

## Core Concepts
Campus OS MUST abstract authentication away from Business Modules. Modules only see standard "Identity Claims" provided by the Kernel's Identity Federation layer.

## Supported Identity Models

### 1. Internal Identity
Users whose credentials (e.g., passwords, MFA seeds) are stored and managed directly by the Campus OS Identity Runtime. Typically used for local administrators or standalone setups.

### 2. Institutional Identity (SSO)
Users authenticating via an institution's existing Active Directory, LDAP, or corporate IdP (e.g., Microsoft Entra ID). The Federation layer acts as a Service Provider (SP), trusting the external Identity Provider.

### 3. External Identity Provider
Users authenticating via public social logins (Google, Apple) or national academic identity networks (e.g., Eduroam).

### 4. Guest Identity
Ephemeral identities granted to temporary users (e.g., parents accessing a billing portal via a one-time link) with strictly scoped and time-bound permissions.

### 5. Service Identity
Machine-to-Machine (M2M) identities representing Runtimes, Modules, or external daemon applications interacting with Campus OS APIs without human intervention (e.g., OAuth2 Client Credentials).

## Protocol Agnosticism
While industry standards like OIDC (OpenID Connect) and SAML 2.0 will be used in implementation, the Architecture dictates that the Kernel must translate any external protocol into a unified Canonical Identity Token for internal use.

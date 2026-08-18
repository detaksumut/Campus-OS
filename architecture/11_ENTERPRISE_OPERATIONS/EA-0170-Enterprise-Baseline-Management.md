---
id: EA-0170
title: Enterprise Baseline Management
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Enterprise Baseline Management

## Purpose
Defines the strict policies for how the Enterprise Architecture Repository (EAR) is versioned, tagged, and archived. A Baseline represents a formal, immutable snapshot of the enterprise at a specific point in time.

## Baseline Versioning Strategy

The EAR uses Semantic Versioning (`MAJOR.MINOR.PATCH`) to track architectural evolution.

### 1. Patch Releases (e.g., v1.0.1)
- **Scope**: Fixing typos, clarifying existing documentation, or adding missing operational metadata.
- **Impact**: No structural changes to the architecture, no new capabilities, no API contract changes.
- **Approval**: Pre-approved / Lead Architect sign-off.

### 2. Minor Releases (e.g., v1.1.0)
- **Scope**: Adding a new Business Capability, introducing a new Business Module, or updating an operational standard (e.g., adding a new DORA metric).
- **Impact**: Backward compatible. Existing modules and integrations are not forced to change.
- **Approval**: Requires an approved ADR (`EA-0157`) and CAB review.

### 3. Major Releases (e.g., v2.0.0)
- **Scope**: A fundamental shift in Enterprise Strategy, the deprecation of a core Kernel Runtime, or a breaking change to a cross-domain API contract.
- **Impact**: Forces downstream squads to refactor code or migrate data.
- **Approval**: Requires Executive Board approval and a formal Migration Plan (`EA-0166`).

## Archival Policy
Old baselines (e.g., `EnterpriseReady-v1.0`) MUST be preserved as immutable Git tags. They serve as historical records for compliance audits, proving what the system design was on any given date in the past.

---
id: EA-0089
title: Module Manifest
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Module Manifest

## Purpose
Defines the canonical model for the "identity card" of every Business Module. The Kernel reads this manifest to discover, validate, and mount the module into the Capability Registry.

## Format Agnostic
This specification defines the *model* of the manifest. 
- **Canonical Serialization**: `manifest.yaml` (Required)
- **Optional Serializations**: JSON, TOML

## Manifest Schema Model

Every module MUST provide a manifest containing the following blocks:

### 1. Identity (`module`)
- `id`: The unique, globally recognizable ID (e.g., `academic-core`).
- `name`: Human-readable name.
- `version`: SemVer compliant version string.
- `vendor`: Organization providing the module.
- `license`: Software license.

### 2. Capabilities (`capabilities`)
A list of functional domains the module provides (e.g., `course-management`, `enrollment`), tying back to the Enterprise Capability Map.

### 3. Contracts (`contracts`)
The OpenAPI specifications the module exposes (e.g., `academic-api.yaml`).

### 4. Events (`events`)
The specific Domain Events the module publishes to the Event Bus (e.g., `CourseCreated.v1`).

### 5. Permissions (`permissions`)
The explicit ABAC/RBAC permissions and scopes the module requires from the Kernel to operate.

### 6. Dependencies (`dependencies`)
The Platform Runtimes this module requires (e.g., `identity`, `workflow`). *Note: Modules cannot depend on other Modules.*

### 7. Compatibility (`compatibility`)
The minimum version of the Campus OS Kernel required to run this module.

### 8. Configuration (`configuration`)
Default configuration keys and schema definitions required for module startup.

### 9. Health (`health`)
Custom health check endpoints or metadata specific to this module.

### 10. Documentation (`documentation`)
Links to the module's README and ADRs.

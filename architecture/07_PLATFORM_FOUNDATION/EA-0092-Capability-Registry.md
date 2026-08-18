---
id: EA-0092
title: Capability Registry
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Capability Registry

## Purpose
Acts as the central catalog of all functional abilities available within Campus OS. It bridges the gap between Enterprise Architecture (Capabilities) and Execution Architecture (Runtimes & Modules).

## Catalog Structure
The Capability Registry MUST maintain a ledger of all active capabilities, containing the following metadata:

- **Capability ID**: Unique identifier (e.g., `cap:academic:enrollment`).
- **Name**: Human-readable name.
- **Description**: What the capability does.
- **Owner**: The specific team or vendor accountable for the implementation.
- **Runtime / Module**: The executing entity providing this capability (e.g., `academic-module`).
- **Contract**: Reference to the OpenAPI specification exposing this capability.
- **Events**: List of Domain Events published by this capability.
- **Version**: Current SemVer version of the capability logic.
- **Status**: Lifecycle status (e.g., `Alpha`, `General Availability`, `Deprecated`).
- **Security Classification**: Data sensitivity level (e.g., `Public`, `Internal`, `Confidential`, `Restricted`).

## Dynamic Registration
Modules automatically announce their capabilities to the Registry during the `Validated` and `Installed` lifecycle phases by parsing their Module Manifest.

## Governance Enforcement
The Registry is used by the API Gateway and Policy Runtime to enforce architectural constraints. If a Module requests access to an endpoint associated with a Capability it lacks permissions for, the request is blocked.

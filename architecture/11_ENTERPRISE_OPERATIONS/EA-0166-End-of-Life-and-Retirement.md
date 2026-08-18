---
id: EA-0166
title: End of Life and Retirement
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# End of Life and Retirement

## Purpose
Defines the formal procedures for decommissioning a module, API, or service within Campus OS. It ensures that technical debt is cleanly eradicated without causing cascading failures across the enterprise.

## The Retirement Procedure

No system may be simply "turned off" or abandoned. The following steps MUST be executed:

### 1. Deprecation Notice
- The Module Owner formally changes the status in the Service Portfolio (`EA-0156`) to `Deprecated`.
- A broadcast notification (via the API Gateway headers and developer portal) is sent to all known downstream consumers, establishing a hard deadline for End of Life (EoL) (e.g., 6 months).

### 2. Migration Planning
- The Module Owner must provide a documented migration path, pointing consumers to the successor service or API version.

### 3. Compatibility Window
- The deprecated service continues to run in Production, fully supported and monitored, until the EoL deadline is reached.

### 4. Data Retention & Archive
- Before shutdown, all operational data owned by the module must be evaluated against the Enterprise Data Retention Policy.
- Necessary data is extracted, transformed if needed, and moved to Cold Storage/Archive.

### 5. Infrastructure Teardown
- The IaC templates for the module are destroyed, freeing up compute, memory, and database resources.
- API Gateway routes are removed.

### 6. Retirement Certification
- The PMO formally signs off that the service has been cleanly excised. The Service Portfolio status is updated to `Retired`.

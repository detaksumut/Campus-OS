---
EA-ID: EA-0043
Title: Runtime Dependency Matrix
Category: Operating Runtime
Layer: Architecture
Version: 1.0
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Chief Enterprise Architect
Depends-On: [EA-0017]
Referenced-By: [PHASE-3-CERTIFICATION]
Last-Updated: 2026-07-20
---

# Runtime Dependency Matrix

To prevent circular dependencies and maintain architectural integrity, all Runtimes must strictly adhere to this dependency matrix.

| Runtime ID | Runtime Name | Depends On | Purpose of Dependency |
|------------|--------------|------------|-----------------------|
| `RT-01` | Academic Identity Runtime | - | Root identity authority. No dependencies. |
| `RT-02` | Configuration Runtime | - | Root configuration authority. No dependencies. |
| `RT-03` | Authorization Runtime | `Identity`, `Policy` | Resolves roles/policies for identity. |
| `RT-04` | Policy Runtime | `Configuration` | Loads system policies from config. |
| `RT-05` | Workflow Runtime | `Policy`, `Identity`, `Notification` | Executes processes, enforces policy, sends alerts. |
| `RT-06` | Notification Runtime | `Configuration`, `Identity` | Routes messages based on config/identity. |
| `RT-07` | Storage Runtime | `Configuration`, `Authorization` | Secures file access via authorization. |
| `RT-08` | Document Runtime | `Storage`, `Identity` | Stores documents and associates with identity. |
| `RT-09` | Search Runtime | `Configuration` | Indexes data globally. |
| `RT-10` | Integration Runtime | `Configuration`, `Authorization` | Secures and configures external channels. |
| `RT-11` | Scheduler Runtime | `Configuration` | Loads schedules from config. |
| `RT-12` | Observability Runtime | - | Root telemetry collector. No dependencies. |
| `RT-13` | Knowledge Runtime | `Configuration` | Root enterprise ontology and metadata. |
| `RT-14` | AI Runtime | `Knowledge`, `Configuration`, `Policy` | Consumes ontology, respects execution policies. |
| `RT-15` | Credential Runtime | `Identity`, `Document`, `Policy` | Issues credentials to identities securely. |

*Golden Rule: Circular Dependencies are Strictly Forbidden.*

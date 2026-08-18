# Business Layer Baseline — v1.0

**Date:** 2026-07-20
**Immutable Reference:** This document captures the exact state of the Business Layer at the moment all three Bounded Contexts were frozen. It must not be edited retroactively.

---

## Frozen Bounded Contexts

| Context | Package | Version | Sprint Range |
|---|---|---|---|
| Membership | `@campus-os/membership` | `1.0.0` | S3.1 → P3.5 |
| Publication | `@campus-os/publication` | `1.0.0` | S4.1 → P4.5 |
| Certification | `@campus-os/certification` | `1.0.0` | S5.1 → P5.5 |

## Architecture Baseline Metrics

| Metric | Membership | Publication | Certification | **Total** |
|---|---|---|---|---|
| Aggregates | 7 | 10 | 10 | **27** |
| Runtimes | 7 | 10 | 11 | **28** |
| Policies | 2 | 4 | 2 | **8** |
| Integration Events | 3 | 6 | 4 | **13** |
| SDK Interfaces Exposed | 4 | 2 | 2 | **8** |
| Projections | 1 | 1 | 1 | **3** |

## Governance Layer Baseline

| Document | Version | Status |
|---|---|---|
| `BoundedContextAcceptanceStandard.md` | 1.0 | ✅ Active |
| `BusinessLayerSdkMatrix.md` | 1.0 | ✅ Active |
| `EventFlowMatrix.md` | 1.1 | ✅ Active |
| `SharedProjectionRegistry.md` | 1.0 | ✅ Active |
| `DomainDependencyRules.md` | 1.0 | ✅ Active |
| `VersionCompatibilityMatrix.md` | 1.0 | ✅ Active |
| `BusinessLayerArchitectureBook.md` | 1.0 | ✅ Active |
| `BusinessLayerEventCatalog.md` | 1.0 | ✅ Active |
| `BusinessLayerSdkCatalog.md` | 1.0 | ✅ Active |

## Next Phase Authorization

With Business Layer v1.0 established as a certified baseline:

```
Application Layer Components (Authorized to begin)
├── Workflow Engine     (orchestrates cross-domain business processes)
├── Notification        (consumes Integration Events)
├── Authorization       (RBAC on top of Membership/Certification)
├── Scheduler           (CPD reminders, certificate expiry, renewal triggers)
├── Portal APIs         (REST/GraphQL facades over SDK interfaces)
├── Dashboard           (aggregates projections from all 3 domains)
└── Registry-Driven UI  (reads Scheme definitions to render dynamic forms)
```

> [!IMPORTANT]
> No Application Layer component may contain Business Logic.
> Business Logic belongs exclusively in the Business Layer Bounded Contexts.
> Application Layer components **orchestrate**, **notify**, and **present** — they do not **decide**.

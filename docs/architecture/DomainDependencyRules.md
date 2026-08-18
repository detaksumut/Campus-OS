# Domain Dependency Rules

**Version:** 1.0
**Status:** ENFORCED

This document defines the **immutable dependency direction** for all Campus OS Business Layer domains. Any engineering decision that violates these rules requires an Architecture Decision Record (ADR) and explicit Architecture Board approval.

## Permitted Dependency Chain

```
Kernel  (No dependencies)
  │
  ▼
Membership  (Depends on: Kernel only)
  │
  ▼
Publication  (Depends on: Kernel, Membership SDK)
  │
  ▼
Certification  (Depends on: Kernel, Membership SDK, Publication SDK)
  │
  ▼
Conference  (Depends on: Kernel, Membership SDK, Publication SDK)
  │
  ▼
Awards  (Depends on: Kernel, Membership SDK, Publication SDK, Certification SDK)
  │
  ▼
Research  (Depends on: Kernel, Membership SDK, Publication SDK)
  │
  ▼
Community  (Depends on: Kernel, Membership SDK)
```

## Forbidden Dependencies (Hard Rules)

| Rule ID | Forbidden Dependency | Reason |
|---------|----------------------|--------|
| DEP-01 | Membership → Publication | Membership must not know about Publications |
| DEP-02 | Membership → Certification | Membership must not know about Certifications |
| DEP-03 | Publication → Membership Runtime | Must use SDK only |
| DEP-04 | Any domain → Any other domain's Runtime | Runtime is internal; use SDK |
| DEP-05 | Any domain → Any higher-tier domain's SDK | Upward dependency is forbidden |
| DEP-06 | Kernel → Any Business Domain | Kernel must not depend on any business module |

## Three-Tier Dependency Classification

| Tier | Rule | Enforcement |
|------|------|-------------|
| **Runtime** | Never callable across domain boundaries. Each domain's Runtime is private. | `campus validate` — hard block |
| **SDK** | Cross-domain reads must use the Provider's published SDK interface only, as listed in `BusinessLayerSdkMatrix.md`. | `campus validate` — hard block |
| **Event** | Asynchronous. A domain may subscribe to any Business Event listed in the `EventFlowMatrix.md`. No approval needed for reads; new emitter registrations require an ADR. | ADR review for new emitters |

## Validation
The `campus validate` CLI tool enforces Runtime and SDK rules by scanning `package.json` imports and flagging any violation before a commit can proceed.

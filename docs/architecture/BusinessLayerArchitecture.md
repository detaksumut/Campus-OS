# Business Layer Architecture

**Version:** 1.0

This document maps the relationships, integration contracts, and dependency rules across all Campus OS Business Layer Bounded Contexts.

## Bounded Context Hierarchy

```
Kernel (Identity, EventBus, Contracts)
        │
        ▼
Membership v1.0 (Frozen)
        │
        ├─────────────────────────────┐
        ▼                             ▼
Publication v1.0 (Frozen)         Certification (Planned)
        │                             │
        ├──────────────────┐          │
        ▼                  ▼          │
Conference (Planned)    Awards (Planned)
                           │
                           ▼
                       Research (Planned)
                       Community (Planned)
```

## Cross-Domain Integration Rules

| Provider | Consumer | SDK | Events | Projections | Direction |
|----------|----------|-----|--------|-------------|-----------|
| Membership | Publication | ✅ | ✅ | ✅ | Membership → Publication |
| Membership | Certification | ✅ | ✅ | ❌ | Membership → Certification |
| Membership | Conference | ✅ | ❌ | ✅ | Membership → Conference |
| Publication | Awards | ❌ | ✅ | ❌ | Publication emits → Awards listens |
| Publication | Any | ❌ | ❌ | ❌ | No other domain reads Publication SDK yet |

## Frozen Bounded Contexts

| Domain | Version | Status | SDK Frozen | Events Frozen |
|--------|---------|--------|-----------|---------------|
| Membership | 1.0 | ✅ Frozen | ✅ | ✅ |
| Publication | 1.0 | ✅ Frozen | ✅ | ✅ |

## Governance Rules (Universal)
1. No bounded context reads another's internal Runtime.
2. All cross-domain sync reads go through the Provider's Read-Only SDK.
3. All async communication uses Kernel `EventEnvelope<T>`.
4. All new domains must pass `BoundedContextAcceptanceStandard.md` before freeze.

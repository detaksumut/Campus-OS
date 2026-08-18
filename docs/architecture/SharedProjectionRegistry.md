# Shared Projection Registry

**Version:** 1.0
**Purpose:** Authoritative list of CQRS Read Model projections available for cross-domain consumption.

Only projections listed here may be consumed by other bounded contexts. Consuming an internal projection not listed here is a **governance violation**.

## Registered Projections

| Projection | Owner | Interface | Version | Status | Consumers | Refresh |
|---|---|---|---|---|---|---|
| `PublicDirectoryEntryDto` | Membership | `IDirectoryQuery` | 1.0 | ✅ Stable | Publication, Conference, Awards | EventBus (async) |
| `ReviewerDirectoryEntryDto` | Membership | `IDirectoryQuery` | 1.0 | ✅ Stable | Publication | EventBus (async) |
| `PublicationSearchEntry` | Publication | `IPublicationSearch` | 1.0 | 🔄 Draft | Awards, Research | EventBus (async) |
| `CertificatePublicEntry` | Certification | `ICertificateDirectory` | — | 📋 Planned | Membership, Awards | EventBus (async) |

## Projection Metadata Standard
All projections must include standard `ProjectionMetadata`:

```typescript
interface ProjectionMetadata {
  projectionVersion: string;
  schemaVersion: string;
  generatedAt: number;
  generatedFromEventId: string;
  sourceAggregateVersion: number;
}
```

## Governance Rules
- A projection may only be added to this registry via an Architecture Review.
- All projections are **read-only**; consumers must never write to projection stores.
- Projection schemas are versioned independently from the domain aggregate.

# Event Flow Matrix

**Version:** 1.1
**Purpose:** Documents all cross-domain event flows in the Campus OS Business Layer.

> [!NOTE]
> **Category Rule**: Business Layer Governance regulates **Business Events only**. System Events are documented separately and are not subject to cross-domain contract governance.

All events are wrapped in `EventEnvelope<T>` from the Kernel.

---

## Business Events (Governed)

These events cross bounded context boundaries and carry business semantics. They are subject to the SDK Matrix, Event Catalog, and Version Compatibility rules.


```
Membership
  ├── MembershipVerified          →  Publication (reviewer eligibility update)
  ├── MembershipProfileUpdated    →  Publication (directory projection refresh)
  └── MembershipTierUpgraded      →  Certification (re-evaluate prerequisites)

Publication
  ├── ArticlePublished            →  Awards (trigger award eligibility check)
  ├── ArticlePublished            →  Certification (research output record)
  ├── ReviewerAssigned            →  (Internal: ReviewRound coordination)
  └── IssuePublished              →  (External: Indexing adapters)

Certification (Planned)
  ├── CertificateIssued           →  Membership (reflect in member profile)
  ├── CertificateExpired          →  Membership (update tier eligibility)
  └── CertificateIssued           →  Awards (certification achievement)

Conference (Planned)
  └── PaperAccepted               →  Publication (conference proceedings)

Awards (Planned)
  └── AwardGranted                →  Membership (award badge in profile)
```

---

## System Events (Operational — Not Governed)

These events are internal to platform operations. They do not carry business semantics and are not subject to cross-domain contract rules.

| Event | Emitter | Purpose |
|-------|---------|--------|
| `system.projection.rebuilt` | DirectoryRuntime | CQRS projection rebuild completed |
| `system.index.completed` | IndexingRuntime | Internal search index refresh |
| `system.cache.invalidated` | Any Runtime | Cache eviction notification |
| `system.eventbus.replay.started` | EventBus | Event log replay initiated |

---

## Event Governance Rules
1. All **Business Events** must use Kernel `EventEnvelope<T>`.
2. Consumers must **never** assume synchronous delivery.
3. Event consumers must be **idempotent** — replay must produce the same outcome.
4. Business Events flow **forward** in the dependency chain; never backward.
5. New cross-domain event subscriptions require an ADR entry.
6. **System Events** are exempt from cross-domain versioning rules but must be documented within their owning domain.

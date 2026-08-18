# Business Layer Event Catalog

**Version:** 1.0.0 | **Date:** 2026-07-20

Complete catalog of all Integration Events across the Business Layer. Domain Events (internal to each context) are cataloged in each domain's `EventCatalog.md`.

---

## Integration Events

| Event | Producer | Consumers | Payload Summary | Schema Version |
|---|---|---|---|---|
| `membership.verified` | Membership | Publication, Certification | `membershipId`, `status`, `verificationLevel` | 1.0 |
| `membership.tier.upgraded` | Membership | Certification, Awards | `membershipId`, `newTier` | 1.0 |
| `membership.profile.updated` | Membership | Publication (Directory) | `membershipId` | 1.0 |
| `publication.article.published` | Publication | Awards, Certification | `publicationId`, `doi`, `articleId`, `issueId` | 1.0 |
| `publication.article.online-first` | Publication | Indexing | `publicationId`, `doi`, `articleId` | 1.0 |
| `publication.issue.published` | Publication | Notification | `issueId`, `volume`, `issue` | 1.0 |
| `publication.doi.registered` | Publication | Indexing | `doi`, `publicationId` | 1.0 |
| `certification.certificate.issued` | Certification | Membership, Awards, Portal | `certificateId`, `holderId`, `membershipId`, `schemeId`, `issueDate` | 1.0 |
| `certification.certificate.revoked` | Certification | Membership, Directory, Notification | `certificateId`, `certificateNumber`, `reason` | 1.0 |
| `certification.certificate.renewed` | Certification | Membership, Awards | `renewalId`, `newCertificateId`, `holderId`, `schemeId` | 1.0 |

---

## Event Governance

- All events use Kernel `EventEnvelope<T>`.
- New Integration Events require entry in this catalog + ADR.
- Payload fields cannot be removed without Major version bump.
- Consumers must be idempotent (replay safety).

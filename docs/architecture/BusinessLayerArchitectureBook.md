# Business Layer Architecture Book

**Version:** 1.0.0 | **Date:** 2026-07-20 | **Status:** BASELINE

This document is the authoritative reference for the Campus OS Business Layer architecture. It serves as the baseline against which all future changes must be evaluated.

---

## Overview

The Campus OS Business Layer is a collection of independent **Bounded Contexts**, each realizing one or more **Business Capabilities**. Each context is:
- **Self-contained**: owns its Aggregates, Runtimes, Policies, Events, SDK, and Documentation.
- **SDK-integrated**: exposes read-only interfaces for cross-domain consumption.
- **Event-driven**: async cross-domain flows use `EventEnvelope<T>` Integration Events.
- **Governance-compliant**: subject to `BoundedContextAcceptanceStandard.md` before freeze.

---

## Bounded Context Catalog

### 1. Membership v1.0 ❄️ FROZEN
> "Who is this person in the academic community?"

| Layer | Components |
|---|---|
| Aggregates | Enrollment, Identity, Verification, Profile, Tier, DigitalCard, Directory |
| SDK | `IMembershipLookup`, `IMembershipVerification`, `IMembershipTierLookup`, `IDirectoryQuery` |
| Integration Events | `membership.verified`, `membership.tier.upgraded`, `membership.profile.updated` |

---

### 2. Publication v1.0 ❄️ FROZEN
> "What knowledge has this person contributed?"

| Layer | Components |
|---|---|
| Aggregates | Author, Article, Submission, Assignment, Review, ReviewRound, EditorialDecision, Production, Publication, Issue |
| SDK | `IPublicationLookup`, `IPublicationSearch` |
| Integration Events | `publication.article.published`, `publication.article.online-first`, `publication.issue.published` |

---

### 3. Certification v1.0 ❄️ FROZEN
> "What competency has this person been formally assessed for?"

| Layer | Components |
|---|---|
| Aggregates | Scheme, Applicant, Application, Exam, Interview, Assessment, Decision, Certificate, Renewal, Badge |
| SDK | `ICertificateRuntime` (public), `IVerificationRuntime` (public) |
| Integration Events | `certification.certificate.issued`, `certification.certificate.revoked`, `certification.certificate.renewed` |

---

## Architecture Principles Applied

1. **Aggregate Independence**: No Runtime calls another Runtime.
2. **SDK Boundary**: Cross-domain reads via published interfaces only.
3. **Event Governance**: Integration Events require EventFlowMatrix entry and ADR.
4. **Scheme-Driven (Certification)**: Business rules in configuration, not code.
5. **Immutable Records**: Certificate versioning, Article versioning — history is never overwritten.
6. **Policy/Runtime separation**: Policies contain rules; Runtimes manage lifecycle.
7. **Domain-Agnostic Infrastructure**: `BadgeRuntime` is shared infrastructure — not owned by one domain.

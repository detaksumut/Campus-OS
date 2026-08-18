# Business Layer SDK Matrix

**Version:** 1.0
**Purpose:** Tracks which Bounded Contexts consume which SDK interfaces from which providers.

This matrix is the authoritative record for all synchronous cross-domain read dependencies.

| Provider Domain | SDK Interface | Consumer Domain | Usage Context |
|-----------------|---------------|-----------------|---------------|
| Membership | `IMembershipLookup` | Publication | Validate `membershipId` when creating `authorId` |
| Membership | `IMembershipVerification` | Publication | Reviewer candidate eligibility check |
| Membership | `IMembershipTierLookup` | Publication | Reviewer scoring (Tier weight) |
| Membership | `IDirectoryQuery` | Publication | Reviewer candidate search (CQRS) |
| Membership | `IMembershipLookup` | Certification | Applicant eligibility verification |
| Membership | `IMembershipTierLookup` | Certification | Prerequisite tier check |
| Publication | `IPublicationLookup` | Awards | Verify article is published before awarding |
| Publication | `IPublicationCitationLookup` | Certification | Cross-reference research output |
| Certification | `ICertificationLookup` | Membership | (Future) Reflect certification in Member profile |

## Dependency Direction Rules
- SDK consumption flows **downward only** in the hierarchy.
- No SDK calls may flow upward (e.g., Membership cannot call Publication SDK).
- Circular SDK dependencies are **strictly forbidden**.

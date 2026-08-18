# Publication Domain Model Reference

**Version:** 1.0.0 — Frozen

This document serves as the primary reference for developers integrating with the Publication Bounded Context.

## Aggregates

| Aggregate | Runtime | Lifecycle |
|-----------|---------|-----------|
| Author | `AuthorRuntime` | Created → Active → Inactive → Archived |
| Article | `ArticleRuntime` | Stateless (Versioned by `ArticleVersion`) |
| Submission | `SubmissionRuntime` | Draft → Submitted → Editorial Screening → Reviewer Assignment → Under Review → Decision → Accepted/Rejected/Revision |
| ReviewRound | `ReviewRoundRuntime` | Open → Collecting Reviews → Closed → Editorial Decision → Completed |
| Review | `ReviewRuntime` | Draft → Submitted → Validated → Locked |
| Assignment | `AssignmentRuntime` | Assigned → Confirmed → In Progress → Review Submitted → Verified → Completed/Cancelled |
| Invitation | `InvitationRuntime` | Pending → Viewed → Accepted/Declined/Expired |
| Production | `ProductionRuntime` | Accepted → Copyediting → Layout → Proofreading → Ready → Publication Approval → Scheduled |
| Publication | `PublicationRuntime` | Scheduled → Online First → Issue Published → Archived |
| Issue | `IssueRuntime` | Draft → Open → Closed → Published |

## Value Objects

| Value Object | Owner | Fields |
|---|---|---|
| `AuthorReference` | Submission | `referenceId`, `authorId?`, `fullName`, `email`, `institution`, `order`, `role`, `status` |
| `ReviewRecommendation` | Review, Assignment | `type`, `confidence`, `submittedAt` |
| `ArticleVersion` | Article | `major`, `minor`, `revision` |
| `CanonicalMetadata` | MetadataExport | Unified metadata model for all export formats |

## Policies

| Policy | Rules |
|--------|-------|
| `SubmissionPolicy` | State transitions, minimum reviewers, mandatory fields |
| `ConflictOfInterestPolicy` | COI-01 (Institution), COI-02 (Co-Author), COI-03 (Duplicate Assignment) |

## Events (Published to Kernel EventBus)

| Event | Emitter | Consumers |
|-------|---------|-----------|
| `publication.invitation.sent` | InvitationRuntime | Notification |
| `publication.invitation.accepted` | InvitationRuntime | AssignmentRuntime |
| `publication.review.recommendation.submitted` | AssignmentRuntime | EditorialDecisionRuntime |
| `publication.decision.issued` | EditorialDecisionRuntime | SubmissionRuntime |
| `publication.article.online-first` | PublicationRuntime | IndexingRuntime |
| `publication.article.published` | PublicationRuntime | IndexingRuntime, Awards |
| `publication.issue.published` | IssueRuntime | External Notification |
| `publication.doi.registered` | DoiRuntime | PublicationRuntime |

## Projections

| Projection | CQRS Owner | Source Events |
|---|---|---|
| (Sprint 4.5+) PublicationSearchIndex | TBD | `publication.article.published` |

## SDK

The Publication SDK will expose the following read-only interfaces to other contexts:
- `IPublicationLookup` — Check if an article is published
- `IPublicationCitationLookup` — Get DOI and citation metadata
- `IAuthorPublicationHistory` — Get publications by `authorId`

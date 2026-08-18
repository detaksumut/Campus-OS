# Publication Event Catalog

**Version:** 1.0.0

All events are wrapped in Kernel `EventEnvelope<T>`.

| Event | Schema Version | Producer | Consumers | Payload |
|-------|---------------|----------|-----------|---------|
| `publication.invitation.sent` | 1.0 | InvitationRuntime | Notification | `invitationId`, `submissionId`, `reviewerId` |
| `publication.invitation.viewed` | 1.0 | InvitationRuntime | Notification | `invitationId`, `submissionId` |
| `publication.invitation.accepted` | 1.0 | InvitationRuntime | AssignmentRuntime | `invitationId`, `reviewerId` |
| `publication.invitation.declined` | 1.0 | InvitationRuntime | Notification | `invitationId` |
| `publication.invitation.expired` | 1.0 | InvitationRuntime | Notification | `invitationId` |
| `publication.assignment.created` | 1.0 | AssignmentRuntime | ReviewRoundRuntime | `assignmentId`, `submissionId` |
| `publication.assignment.cancelled` | 1.0 | AssignmentRuntime | SubmissionRuntime | `assignmentId` |
| `publication.review.recommendation.submitted` | 1.0 | AssignmentRuntime | EditorialDecisionRuntime | `recommendation` |
| `publication.decision.issued` | 1.0 | EditorialDecisionRuntime | SubmissionRuntime | `decision`, `submissionId` |
| `publication.article.online-first` | 1.0 | PublicationRuntime | IndexingRuntime | `publicationId`, `articleId` |
| `publication.article.published` | 1.0 | PublicationRuntime | IndexingRuntime, Awards | `publicationId`, `doi`, `issueId` |
| `publication.issue.published` | 1.0 | IssueRuntime | Notification | `issueId`, `volume`, `issue` |
| `publication.doi.registered` | 1.0 | DoiRuntime | PublicationRuntime | `doi`, `publicationId` |
| `publication.doi.metadata-updated` | 1.0 | DoiRuntime | IndexingRuntime | `doiId` |
| `publication.production.scheduled` | 1.0 | ProductionRuntime | PublicationRuntime | `productionId` |

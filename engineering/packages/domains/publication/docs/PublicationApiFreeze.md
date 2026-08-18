# Publication API Freeze

**Date:** 2026-07-20
**Version:** 1.0.0
**Status:** FROZEN

The Publication Bounded Context internal API is hereby frozen at v1.0.0.

Any modification to any Runtime, Policy, or Contract MUST:
1. Maintain backward-compatible event payloads (`schemaVersion` bump only).
2. Never remove or rename fields from the SDK contracts.
3. Be documented in a new Architecture Decision Record (ADR).
4. Increment `version` in `publication.manifest.json`.

## Frozen Contracts
- `AuthorDto`, `IAuthorRuntime`
- `ArticleDto`, `IArticleRuntime`
- `SubmissionDto`, `ISubmissionRuntime`
- `AssignmentDto`, `IAssignmentRuntime`
- `ReviewDto`, `IReviewRuntime`
- `ReviewRoundDto`, `IReviewRoundRuntime`
- `EditorialDecisionDto`, `IEditorialDecisionRuntime`
- `PublicationRecord`, `IPublicationRuntime`
- `IssueDto`, `IIssueRuntime`
- `DoiRecord`, `IDoiRuntime`

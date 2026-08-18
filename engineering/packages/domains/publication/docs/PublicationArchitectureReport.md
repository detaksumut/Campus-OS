# Publication Architecture Report

**Version:** 1.0.0 — Frozen

## Write Model (Authoritative State)

### Submission Layer
1. **Author Aggregate**: Maps `membershipId` → `authorId`. Stores ORCID, citation preferences. Lifecycle: Created/Active/Inactive/Archived.
2. **Article Aggregate**: Manages versioned manuscript content (Metadata, Classification, Content). Version structured as `major.minor.revision`.
3. **Submission Aggregate**: Editorial workflow state machine. Carries `AuthorReference[]` Value Objects supporting Hybrid Co-Authorship (LINKED/UNLINKED).

### Assignment Layer
4. **ReviewerCandidateRuntime**: Queries Membership CQRS Projection (`IDirectoryQuery`). Scores candidates on Research Match, Expertise, Tier, and Workload.
5. **ConflictOfInterestPolicy**: Modular rule registry (`COI-01` through `COI-03`).
6. **InvitationRuntime**: Full aggregate. Lifecycle: Pending → Viewed → Accepted/Declined/Expired.
7. **AssignmentRuntime**: Links Submission to confirmed reviewer. Lifecycle: Assigned → ... → Completed (with `ReviewRecommendation` outcome).

### Review Layer
8. **ReviewRuntime**: Individual reviewer evaluation. Lifecycle: Draft → Submitted → Validated → Locked. Carries structured `ReviewForm`.
9. **ReviewRoundRuntime**: Multi-round coordinator. Carries `SuggestedReviewer[]` for Reviewer Continuity. Lifecycle: Open → Collecting → Closed → Editorial Decision → Completed.
10. **EditorialDecisionRuntime**: Decoupled from reviews. Issues binding decisions (Accept/Reject/Minor/Major Revision). Triggers `SubmissionPolicy`-guarded state transition.

### Publishing Layer
11. **ProductionRuntime**: Manuscript preparation pipeline with Production Approval gate.
12. **IssueRuntime**: Journal-Volume-Issue hierarchy. Issues own `Publication` records (not Articles).
13. **PublicationRuntime**: Public-facing status. Supports Online First → Issue Published.
14. **DoiRuntime**: Isolated external DOI provider integration. Supports Metadata Updates.
15. **IndexingRuntime**: Adapter-based (CrossRef, DOAJ, OpenAlex, Garuda, Dimensions).
16. **MetadataExportRuntime**: Canonical metadata model → JSON/JATS-XML/BibTeX/RIS.

## Dependency Rules
- Publication → Membership SDK ✅
- Publication → Membership Runtime ❌ (FORBIDDEN)
- Any other domain → Publication Runtime ❌ (FORBIDDEN, use SDK)

---
EA-ID: EA-0016
Title: Event Catalog
Category: Catalog
Layer: Architecture
Version: 1.1
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Enterprise Architecture Team
Depends-On: []
Referenced-By: []
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Event Catalog

The definitive list of asynchronous events broadcasted over the central Integration Runtime (Event Bus).

## Academic Credential Events
- `CertificationApplied`: Emitted when an application workflow starts.
- `EligibilityApproved`: Emitted when a candidate meets scheme prerequisites.
- `PortfolioVerified`: Emitted when evidence is validated.
- `ExamCompleted`: Emitted from the CBT engine.
- `InterviewCompleted`: Emitted when assessor submits interview notes.
- `AssessmentPassed`: Emitted post-moderation if the score is sufficient.
- `CertificationApproved`: Emitted when the Certification Board gives final approval.
- `CertificateIssued`: Emitted when the digital document is generated.
- `CertificateRenewed`: Emitted when CPD requirements are met.
- `CertificateExpired`: Emitted by Scheduler Runtime.

## Academic Identity Events
- `PublicationAdded`: Emitted when a lecturer publishes a manuscript (used to trigger portfolio updates).
- `CompetencyAchieved`: Emitted when a Micro-credential or Badge is awarded.

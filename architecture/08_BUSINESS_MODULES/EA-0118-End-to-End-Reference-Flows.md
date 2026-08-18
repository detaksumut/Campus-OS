---
id: EA-0118
title: End-to-End Reference Flows
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# End-to-End Reference Flows

## Purpose
Provides canonical examples of how complex business processes traverse the Campus OS architecture, demonstrating the practical application of the Module Dependency Rules (`EA-0093`) and Integration Architecture (`EA-0094`).

## Flow 1: Admission to Enrollment

**Trigger**: An applicant accepts an admission offer.

1. **Admission Module**: Updates local state to `OfferAccepted`.
2. **Admission Module**: Publishes `AdmissionAccepted` event to the Event Bus.
3. **Workflow Runtime**: Subscribes to `AdmissionAccepted` and initiates the `StudentOnboardingSaga`.
4. **Workflow Runtime**: Calls API Gateway `POST /identity/provision`.
5. **Identity Module**: Creates global identity, returns `userId`.
6. **Workflow Runtime**: Calls API Gateway `POST /students` with `userId`.
7. **Student Module**: Creates core Academic Profile.
8. **Workflow Runtime**: Calls API Gateway `POST /enrollments/matriculate`.
9. **Enrollment Module**: Enrolls student, publishes `StudentEnrolled` event.
10. **Finance Module**: Subscribes to `StudentEnrolled`, generates tuition invoice.

## Flow 2: Research Proposal to Publication

**Trigger**: A faculty member submits a research grant proposal.

1. **Research Module**: Creates proposal in `PendingReview` state.
2. **Research Module**: Publishes `ProposalSubmitted` event.
3. **Notification Module**: Subscribes, emails Department Head.
4. **Workflow Runtime**: Head approves via API Gateway. Workflow state advances.
5. **Workflow Runtime**: Calls `Finance Module` to allocate funds.
6. **Finance Module**: Funds allocated, returns success.
7. **Research Module**: Continues tracking until research concludes.
8. **Publication Module**: Researcher submits final paper. Publishes `ArticlePublished` event.
9. **Academic Profile Module**: Subscribes, updates faculty's h-index/citation record.

## Flow 3: Certification Issuance

**Trigger**: A student passes a final professional examination.

1. **Examination Module**: Grades exam, publishes `ExamPassed` event.
2. **Workflow Runtime**: Subscribes, initiates `CredentialIssuanceSaga`.
3. **Workflow Runtime**: Calls `Finance Module` to ensure no outstanding debt exists.
4. **Workflow Runtime**: If clear, calls `Certification Module`.
5. **Certification Module**: Generates verifiable credential, publishes `CertificateIssued`.
6. **Digital Badge Module**: Subscribes, pushes OpenBadge to external backpack.
7. **Alumni Module**: Subscribes, updates student status to "Certified Professional".

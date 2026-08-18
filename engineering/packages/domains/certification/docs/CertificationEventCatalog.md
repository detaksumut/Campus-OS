# Certification Event Catalog

**Version:** 1.0.0 | **Date:** 2026-07-20 | **Status:** FROZEN

All events are wrapped in Kernel `EventEnvelope<T>`. Each event carries a `correlationId` (the `applicationId`) for end-to-end traceability.

---

## Domain Events (Internal — Not Governed Cross-Domain)

| Event | Producer | Consumer | Key Payload | Schema Version |
|---|---|---|---|---|
| `certification.scheme.activated` | `SchemeRuntime` | Internal | `schemeId`, `name` | 1.0 |
| `certification.scheme.deprecated` | `SchemeRuntime` | Internal | `schemeId` | 1.0 |
| `certification.application.submitted` | `ApplicationRuntime` | Internal | `applicationId`, `schemeId` | 1.0 |
| `certification.eligibility.determined` | `EligibilityPolicy` | Internal | `applicationId`, `outcome` | 1.0 |
| `certification.condition.fulfilled` | `ApplicationRuntime` | Internal | `applicationId`, `requirementId` | 1.0 |
| `certification.condition.verified` | `ApplicationRuntime` | Internal | `applicationId`, `requirementId`, `verifiedBy` | 1.0 |
| `certification.application.eligible` | `ApplicationRuntime` | Internal | `applicationId`, `schemeId` | 1.0 |
| `certification.exam.scheduled` | `ExamRuntime` | Internal | `examId`, `applicationId`, `schemeId` | 1.0 |
| `certification.exam.started` | `ExamRuntime` | Internal | `examId`, `applicationId`, `attempt` | 1.0 |
| `certification.exam.completed` | `ExamRuntime` | Internal | `examId`, `applicationId` | 1.0 |
| `certification.exam.graded` | `ExamRuntime` | Internal | `examId`, `passed`, `percentage` | 1.0 |
| `certification.interview.scheduled` | `InterviewRuntime` | Internal | `interviewId`, `applicationId`, `interviewerId` | 1.0 |
| `certification.interview.conducted` | `InterviewRuntime` | Internal | `interviewId`, `applicationId` | 1.0 |
| `certification.interview.evaluated` | `InterviewRuntime` | Internal | `interviewId`, `recommendation`, `passed` | 1.0 |
| `certification.assessment.completed` | `AssessmentRuntime` | `CertificationDecisionRuntime` | `assessmentId`, `overallScore`, `overallPassed` | 1.0 |
| `certification.decision.issued` | `CertificationDecisionRuntime` | `ApplicationRuntime` | `decisionId`, `applicationId`, `decision` | 1.0 |
| `certification.certificate.generated` | `CertificateRuntime` | Internal | `certificateId`, `holderId` | 1.0 |
| `certification.certificate.signed` | `CertificateRuntime` | Internal | `certificateId` | 1.0 |

---

## Integration Events (Cross-Domain — Governed by EventFlowMatrix.md)

| Event | Producer | Consumers | Key Payload | Schema Version |
|---|---|---|---|---|
| `certification.certificate.issued` | `CertificateRuntime` | Membership, Awards, Portal, Directory, Notification | `certificateId`, `certificateNumber`, `holderId`, `membershipId`, `schemeId`, `issueDate`, `expiryDate` | 1.0 |
| `certification.certificate.expired` | `CertificateRuntime` | Membership, Notification | `certificateId`, `certificateNumber`, `holderId` | 1.0 |
| `certification.certificate.revoked` | `CertificateRuntime` | Membership, Directory, Notification | `certificateId`, `certificateNumber`, `reason` | 1.0 |
| `certification.certificate.renewed` | `RenewalRuntime` | Membership, Awards | `renewalId`, `previousCertificateId`, `newCertificateId`, `holderId`, `schemeId` | 1.0 |

---

## Event Governance Rules

1. All Integration Events are subject to `EventFlowMatrix.md` governance.
2. New cross-domain subscribers require an ADR entry before implementation.
3. Payload fields cannot be removed without a Major version bump.
4. `correlationId` = `applicationId` across all events in a single certification lifecycle.

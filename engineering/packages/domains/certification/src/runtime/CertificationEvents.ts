// Certification Domain Event Catalog
// Classification: Domain Events (internal) vs Integration Events (cross-boundary)

// ── Domain Events ──────────────────────────────────────────────────────────
// Used within Certification bounded context only. Not part of cross-domain contracts.
export const CertificationDomainEvents = {
  SchemeActivated:              'certification.scheme.activated',
  SchemeDeprecated:             'certification.scheme.deprecated',
  ApplicationSubmitted:         'certification.application.submitted',
  EligibilityDetermined:        'certification.eligibility.determined',
  ConditionFulfilled:           'certification.condition.fulfilled',
  ConditionVerified:            'certification.condition.verified',
  ApplicationEligible:          'certification.application.eligible',
  ExamScheduled:                'certification.exam.scheduled',
  ExamStarted:                  'certification.exam.started',
  ExamCompleted:                'certification.exam.completed',
  ExamGraded:                   'certification.exam.graded',
  InterviewScheduled:           'certification.interview.scheduled',
  InterviewConducted:           'certification.interview.conducted',
  InterviewEvaluated:           'certification.interview.evaluated',
  AssessmentCompleted:          'certification.assessment.completed',
  CertificationDecisionIssued:  'certification.decision.issued',
  CertificateGenerated:         'certification.certificate.generated',
  CertificateSigned:            'certification.certificate.signed',
} as const;

// ── Integration Events ─────────────────────────────────────────────────────
// Cross-domain contract events. Subject to EventFlowMatrix.md governance.
// Consumers: Membership (badge update), Awards (eligibility trigger).
export const CertificationIntegrationEvents = {
  CertificateIssued:            'certification.certificate.issued',
  CertificateExpired:           'certification.certificate.expired',
  CertificateRevoked:           'certification.certificate.revoked',
  CertificateRenewed:           'certification.certificate.renewed',
} as const;

// ── Combined (for internal routing) ───────────────────────────────────────
export const CertificationEvents = {
  ...CertificationDomainEvents,
  ...CertificationIntegrationEvents
} as const;

export type CertificationEventName = typeof CertificationEvents[keyof typeof CertificationEvents];

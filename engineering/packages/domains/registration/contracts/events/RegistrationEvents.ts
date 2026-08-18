import { DomainEvent } from './DomainEvent';

// ==========================================
// APPLICANT LIFECYCLE PAYLOADS
// ==========================================
export interface ApplicantCreatedPayload {
  readonly userId: string;
  readonly registrationPeriodId: string;
}
export type ApplicantCreatedEvent = DomainEvent<ApplicantCreatedPayload>;

export interface ApplicantSubmittedPayload {
  readonly registrationPeriodId: string;
  readonly submissionDate: Date;
}
export type ApplicantSubmittedEvent = DomainEvent<ApplicantSubmittedPayload>;

// ==========================================
// VERIFICATION LIFECYCLE PAYLOADS
// ==========================================
export interface ApplicantVerifiedPayload {
  readonly verifierId: string;
  readonly verificationDate: Date;
}
export type ApplicantVerifiedEvent = DomainEvent<ApplicantVerifiedPayload>;

// ==========================================
// DOCUMENT LIFECYCLE PAYLOADS
// ==========================================
export interface DocumentUploadedPayload {
  readonly documentType: string;
  readonly fileReferenceId: string;
}
export type DocumentUploadedEvent = DomainEvent<DocumentUploadedPayload>;

// ==========================================
// SELECTION LIFECYCLE PAYLOADS
// ==========================================
export interface ApplicantAcceptedPayload {
  readonly registrationPeriodId: string;
  readonly acceptedProgramId: string;
}
export type ApplicantAcceptedEvent = DomainEvent<ApplicantAcceptedPayload>;

// ==========================================
// ENROLLMENT LIFECYCLE PAYLOADS
// ==========================================
export interface EnrollmentApprovedPayload {
  readonly studentId: string; 
  readonly enrolledProgramId: string;
}
export type EnrollmentApprovedEvent = DomainEvent<EnrollmentApprovedPayload>;

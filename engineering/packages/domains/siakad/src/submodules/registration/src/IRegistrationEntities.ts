export type RegistrationPeriodStatus = 'OPEN' | 'CLOSED' | 'LATE_REGISTRATION';

export interface RegistrationPeriod {
  registrationPeriodId: string;
  academicTermId: string;
  startDate: string;
  endDate: string;
  paymentDeadline: string;
  status: RegistrationPeriodStatus;
}

export type RegistrationType = 'NEW_STUDENT' | 'RE_REGISTRATION' | 'TRANSFER' | 'REACTIVATION';
export type RegistrationStatus = 'DRAFT' | 'SUBMITTED' | 'ELIGIBILITY_CHECKING' | 'WAITING_PAYMENT' | 'WAITING_VALIDATION' | 'REGISTERED' | 'COMPLETED' | 'CANCELLED';
export type StudentAcademicStatus = 'ACTIVE' | 'LEAVE' | 'SUSPENDED' | 'DROP_OUT' | 'GRADUATED' | 'INACTIVE';

export interface SemesterRegistration {
  registrationId: string;
  studentId: string;
  academicTermId: string;
  registrationType: RegistrationType;
  registrationStatus: RegistrationStatus;
  studentAcademicStatus: StudentAcademicStatus;
  registrationDate: string;
  remarks: string;
}

export interface StudentProvision {
  studentProvisionId: string;
  applicantId: string;
  generatedNIM: string;
  studyProgramId: string;
  admissionGeneration: string;
}

// Domain Services
export interface EligibilityResult {
  isEligible: boolean;
  reason?: string;
}

export interface EligibilityProvider {
  checkEligibility(studentId: string, termId: string): Promise<EligibilityResult>;
}

export interface RegistrationEligibilityService {
  providers: EligibilityProvider[];
  checkOverallEligibility(studentId: string, termId: string): Promise<EligibilityResult>;
}

export interface RegistrationWorkflowService {
  processNewStudentEnrollment(applicantId: string, studyProgramId: string, generation: string): Promise<void>;
  submitRegistration(registrationId: string): Promise<void>;
  validatePayment(registrationId: string): Promise<void>;
}

export interface StudentNumberGenerator {
  generateNIM(applicantId: string, studyProgramId: string, generation: string): Promise<string>;
}

// Integration Events
export interface ApplicantAcceptedEvent {
  eventName: 'ApplicantAccepted';
  applicantId: string;
  studyProgramId: string;
  generation: string;
}

export interface StudentProvisionedEvent {
  eventName: 'StudentProvisioned';
  nim: string;
  applicantId: string;
  studyProgramId: string;
  generation: string;
}

export interface RegistrationSubmittedEvent {
  eventName: 'RegistrationSubmitted';
  registrationId: string;
  studentId: string;
  academicTermId: string;
  isLate: boolean;
}

export interface RegistrationCompletedEvent {
  eventName: 'RegistrationCompleted';
  registrationId: string;
  studentId: string;
  academicTermId: string;
}

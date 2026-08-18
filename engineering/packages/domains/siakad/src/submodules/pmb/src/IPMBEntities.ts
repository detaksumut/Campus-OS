// Aggregate: Admission
export interface AdmissionPeriod {
  periodId: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  paths: AdmissionPath[];
}

export type SelectionType = 'TEST' | 'PRESTASI' | 'MANDIRI';

export interface AdmissionPath {
  pathId: string;
  periodId: string;
  code: string;
  name: string;
  selectionType: SelectionType;
  requirements: string[];
  quota: number;
  feeEstimation: number;
  isActive: boolean;
}

// Aggregate: Application
export type ApplicationStatus = 'DRAFT' | 'SUBMITTED' | 'REVIEWED' | 'FINALIZED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'EXPIRED' | 'WAIVED';

export interface AdmissionApplication {
  applicationId: string;
  applicantId: string;
  pathId: string;
  registrationDate: string;
  status: ApplicationStatus;
  paymentStatus: PaymentStatus;
  
  // Navigational properties for the Aggregate
  applicant: Applicant;
  choices: StudyProgramChoice[];
  documents: AdmissionDocument[];
  result?: AdmissionResult;
}

export interface Applicant {
  applicantId: string;
  nationalId: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  previousSchool: string;
}

export type ChoiceStatus = 'PENDING' | 'EVALUATED';

export interface StudyProgramChoice {
  choiceId: string;
  applicationId: string;
  studyProgramId: string; // Refers to master data outside PMB
  priority: number;
  status: ChoiceStatus;
}

export type DocumentType = 'IJAZAH' | 'KTP' | 'PASFOTO' | 'RAPOR';
export type ValidationStatus = 'PENDING' | 'VALID' | 'INVALID';

export interface AdmissionDocument {
  documentId: string;
  applicationId: string;
  documentType: DocumentType;
  fileUrl: string;
  validationStatus: ValidationStatus;
}

export type SelectionMethod = 'CBT' | 'WAWANCARA' | 'PORTOFOLIO' | 'PRESTASI';
export type SelectionStatus = 'IN_PROGRESS' | 'COMPLETED';

export interface AdmissionSelection {
  selectionId: string;
  applicationId: string;
  selectionMethod: SelectionMethod;
  committee: string;
  score: number;
  rank: number;
  status: SelectionStatus;
  selectionDate: string;
}

export type DecisionType = 'ACCEPTED' | 'REJECTED' | 'WAITLISTED';

export interface AdmissionResult {
  resultId: string;
  selectionId: string; // Foreign Key to AdmissionSelection
  decision: DecisionType;
  acceptedStudyProgramId?: string;
  decisionDate: string;
  remarks: string;
}

// Domain Service Interface
export interface AdmissionEligibilityService {
  checkEligibility(applicationId: string): Promise<boolean>;
}

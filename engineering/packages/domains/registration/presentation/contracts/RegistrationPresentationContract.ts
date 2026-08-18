import { ApplicantSummaryViewModel, ApplicantDetailViewModel } from './ApplicantViewModel';

export interface RegistrationPresentationContract {
  // Navigation Actions
  navigateToDashboard(): void;
  navigateToApplicantDetail(applicantId: string): void;
  
  // View Models Fetchers (Agnostic of HTTP/GraphQL)
  getApplicantSummary(applicantId: string): Promise<ApplicantSummaryViewModel>;
  getApplicantDetails(applicantId: string): Promise<ApplicantDetailViewModel>;
  
  // Registration Capabilities
  readonly capabilities: RegistrationPresentationCapability[];
}

export enum RegistrationPresentationCapability {
  VIEW_DASHBOARD = 'registration.view',
  SUBMIT_APPLICATION = 'registration.submit',
  EDIT_APPLICATION = 'registration.edit',
  CANCEL_APPLICATION = 'registration.cancel',
  CHECK_STATUS = 'registration.status',
  MANAGE_DOCUMENTS = 'registration.documents',
  VERIFY_APPLICATION = 'registration.verification'
}

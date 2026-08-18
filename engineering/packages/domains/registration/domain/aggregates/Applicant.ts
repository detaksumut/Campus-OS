import { PersonalData } from '../value-objects/PersonalData';
import { AgePolicy } from '../policies/AgePolicy';

export enum AdmissionStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export class Applicant {
  private _status: AdmissionStatus;

  constructor(
    public readonly applicantId: string,
    public readonly userId: string,
    public readonly registrationPeriodId: string,
    public readonly personalData: PersonalData,
    status: AdmissionStatus = AdmissionStatus.DRAFT
  ) {
    this._status = status;
  }

  public get status(): AdmissionStatus {
    return this._status;
  }

  public submit(): void {
    if (this._status !== AdmissionStatus.DRAFT) {
      throw new Error("Only DRAFT applications can be submitted.");
    }
    if (!AgePolicy.isEligible(this.personalData.dateOfBirth)) {
      throw new Error("Applicant does not meet the minimum age requirement.");
    }
    this._status = AdmissionStatus.SUBMITTED;
    // Note: In a full DDD implementation, we would register a domain event here
    // e.g., this.addDomainEvent(new ApplicantSubmittedEvent(this.applicantId));
  }
}

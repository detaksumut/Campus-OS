import { PeriodId } from '../value-objects/AdmissionsValueObjects';
import { AdmissionPeriodStatus, AdmissionRoute } from '../types/AdmissionsEnums';
import { Applicant } from './Applicant';
import { Application } from './Application';

export class AdmissionPeriod {
  private applicants: Applicant[] = [];
  private applications: Application[] = [];

  constructor(
    private readonly periodId: PeriodId,
    private readonly name: string,
    private readonly route: AdmissionRoute,
    private status: AdmissionPeriodStatus = AdmissionPeriodStatus.PLANNING,
    private readonly academicYear: string, // e.g., '2026/2027'
    private readonly startDate: Date,
    private readonly endDate: Date
  ) {}

  get id(): PeriodId { return this.periodId; }
  get currentName(): string { return this.name; }
  get currentRoute(): AdmissionRoute { return this.route; }
  get currentStatus(): AdmissionPeriodStatus { return this.status; }
  get targetAcademicYear(): string { return this.academicYear; }
  get openingDate(): Date { return this.startDate; }
  get closingDate(): Date { return this.endDate; }
  get allApplicants(): Applicant[] { return this.applicants; }
  get allApplications(): Application[] { return this.applications; }

  changeStatus(newStatus: AdmissionPeriodStatus): void {
    this.status = newStatus;
  }

  registerApplicant(applicant: Applicant): void {
    if (this.status !== AdmissionPeriodStatus.OPEN) {
      throw new Error('Can only register applicants when period is OPEN.');
    }
    this.applicants.push(applicant);
  }

  submitApplication(application: Application): void {
    if (this.status !== AdmissionPeriodStatus.OPEN) {
      throw new Error('Can only submit applications when period is OPEN.');
    }
    const applicantExists = this.applicants.some(a => a.id.getValue() === application.applicant.getValue());
    if (!applicantExists) {
      throw new Error('Applicant must be registered in this period first.');
    }
    this.applications.push(application);
  }
}

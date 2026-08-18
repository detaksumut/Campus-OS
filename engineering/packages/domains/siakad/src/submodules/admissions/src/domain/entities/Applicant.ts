import { ApplicantId } from '../value-objects/AdmissionsValueObjects';

export class Applicant {
  constructor(
    private readonly applicantId: ApplicantId,
    private readonly name: string,
    private readonly email: string,
    private readonly phone: string,
    private readonly registrationDate: Date = new Date()
  ) {}

  get id(): ApplicantId { return this.applicantId; }
  get fullName(): string { return this.name; }
  get contactEmail(): string { return this.email; }
  get contactPhone(): string { return this.phone; }
  get registeredAt(): Date { return this.registrationDate; }
}

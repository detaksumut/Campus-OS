export class CreateAdmissionPeriodCommand {
  constructor(
    public readonly name: string,
    public readonly route: string,
    public readonly academicYear: string,
    public readonly startDate: Date,
    public readonly endDate: Date
  ) {}
}

export class RegisterApplicantCommand {
  constructor(
    public readonly periodId: string,
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string
  ) {}
}

export class SubmitApplicationCommand {
  constructor(
    public readonly periodId: string,
    public readonly applicantId: string,
    public readonly programChoices: Array<{ programCode: string; priority: number }>
  ) {}
}

export class RecordSelectionResultCommand {
  constructor(
    public readonly periodId: string,
    public readonly applicationId: string,
    public readonly stageId: string, // Selection Stage ID
    public readonly evaluatorId: string,
    public readonly score: number,
    public readonly remarks: string
  ) {}
}

export class IssueEnrollmentOfferCommand {
  constructor(
    public readonly periodId: string,
    public readonly applicationId: string,
    public readonly programCode: string, // Final program choice accepted
    public readonly validUntil: Date
  ) {}
}

export class ConfirmEnrollmentCommand {
  constructor(
    public readonly periodId: string,
    public readonly applicationId: string,
    public readonly offerId: string
  ) {}
}

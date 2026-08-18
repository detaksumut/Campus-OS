export class PeriodOpenedEvent {
  constructor(
    public readonly periodId: string,
    public readonly route: string,
    public readonly academicYear: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class ApplicationSubmittedEvent {
  constructor(
    public readonly applicationId: string,
    public readonly applicantId: string,
    public readonly programChoices: string[], // Program codes
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class ApplicantEvaluatedEvent {
  constructor(
    public readonly applicationId: string,
    public readonly stageId: string,
    public readonly score: number,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class EnrollmentOfferedEvent {
  constructor(
    public readonly offerId: string,
    public readonly applicationId: string,
    public readonly programCode: string,
    public readonly validUntil: Date,
    public readonly occurredOn: Date = new Date()
  ) {}
}

/**
 * CRITICAL DOMAIN EVENT
 * This is the ONLY bridge between Admissions and Registration bounded contexts.
 * Fired when an applicant ACCEPTS an enrollment offer.
 */
export class EnrollmentAcceptedEvent {
  constructor(
    public readonly offerId: string,
    public readonly applicantId: string,
    public readonly programCode: string,
    public readonly academicYear: string,
    public readonly applicantEmail: string, // Minimum required to provision identity
    public readonly applicantName: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

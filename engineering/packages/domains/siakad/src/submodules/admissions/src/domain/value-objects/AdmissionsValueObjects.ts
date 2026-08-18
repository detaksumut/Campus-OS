export class PeriodId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class ApplicantId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class ApplicationId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class AssessmentId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class OfferId {
  constructor(private readonly id: string) {}
  getValue(): string { return this.id; }
}

export class ProgramChoice {
  constructor(
    public readonly programCode: string,
    public readonly priority: number
  ) {
    if (priority < 1) throw new Error('Priority must be at least 1');
  }
}

export class AssessmentResult {
  constructor(
    public readonly assessmentId: AssessmentId,
    public readonly evaluatorId: string,
    public readonly score: number,
    public readonly remarks: string,
    public readonly evaluatedAt: Date = new Date()
  ) {}
}

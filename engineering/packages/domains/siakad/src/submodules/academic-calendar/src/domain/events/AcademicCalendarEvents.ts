export class SemesterStartedEvent {
  constructor(
    public readonly academicYearId: string,
    public readonly semesterId: string,
    public readonly startDate: Date,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class PeriodOpenedEvent {
  constructor(
    public readonly academicYearId: string,
    public readonly semesterId: string,
    public readonly periodType: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

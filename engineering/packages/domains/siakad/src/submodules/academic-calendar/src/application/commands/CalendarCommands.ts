export class CreateCalendarCommand {
  constructor(
    public readonly academicYear: string,
    public readonly semester: string,
    public readonly startDate: Date,
    public readonly endDate: Date
  ) {}
}

export class DefinePeriodCommand {
  constructor(
    public readonly academicYear: string,
    public readonly semester: string,
    public readonly periodType: string,
    public readonly name: string,
    public readonly startDate: Date,
    public readonly endDate: Date
  ) {}
}

export class PublishCalendarCommand {
  constructor(
    public readonly academicYear: string,
    public readonly semester: string
  ) {}
}

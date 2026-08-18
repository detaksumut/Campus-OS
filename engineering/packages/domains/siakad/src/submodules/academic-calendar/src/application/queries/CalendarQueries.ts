export class GetActivePeriodsQuery {
  constructor(public readonly date: Date = new Date()) {}
}

export class GetCalendarQuery {
  constructor(
    public readonly academicYear: string,
    public readonly semester: string
  ) {}
}

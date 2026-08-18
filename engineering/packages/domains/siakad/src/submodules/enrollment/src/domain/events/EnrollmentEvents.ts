export class EnrollmentConfirmedEvent {
  constructor(
    public readonly enrollmentId: string,
    public readonly studentId: string,
    public readonly classSectionId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class EnrollmentDroppedEvent {
  constructor(
    public readonly enrollmentId: string,
    public readonly studentId: string,
    public readonly classSectionId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

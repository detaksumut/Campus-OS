export class StudentRegisteredEvent {
  constructor(
    public readonly studentId: string,
    public readonly nim: string,
    public readonly studyProgramId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class StudentStatusChangedEvent {
  constructor(
    public readonly studentId: string,
    public readonly oldStatus: string,
    public readonly newStatus: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

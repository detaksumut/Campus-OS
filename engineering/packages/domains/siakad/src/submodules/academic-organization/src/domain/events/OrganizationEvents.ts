export class StudyProgramCreatedEvent {
  constructor(
    public readonly studyProgramId: string,
    public readonly departmentId: string,
    public readonly name: string,
    public readonly level: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class FacultyCreatedEvent {
  constructor(
    public readonly facultyId: string,
    public readonly name: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

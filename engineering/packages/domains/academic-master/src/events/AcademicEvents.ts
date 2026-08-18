export interface DomainEvent {
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventVersion: string;
}

export class FacultyCreatedEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;
  public readonly eventVersion = '1.0.0';

  constructor(
    public readonly facultyId: string,
    public readonly name: string,
    public readonly code: string
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredOn = new Date();
  }
}

export class StudyProgramRegisteredEvent implements DomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;
  public readonly eventVersion = '1.0.0';

  constructor(
    public readonly studyProgramId: string,
    public readonly facultyId: string,
    public readonly name: string
  ) {
    this.eventId = crypto.randomUUID();
    this.occurredOn = new Date();
  }
}

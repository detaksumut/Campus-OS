export class CurriculumCreatedEvent {
  constructor(
    public readonly curriculumId: string,
    public readonly studyProgramId: string,
    public readonly name: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

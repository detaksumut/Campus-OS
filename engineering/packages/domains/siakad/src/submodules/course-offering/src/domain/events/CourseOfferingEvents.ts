export class CourseOfferingPublishedEvent {
  constructor(
    public readonly courseOfferingId: string,
    public readonly courseId: string,
    public readonly academicPeriodId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

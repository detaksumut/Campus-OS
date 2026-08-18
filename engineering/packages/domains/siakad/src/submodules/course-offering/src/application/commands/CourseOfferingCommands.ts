export class DraftCourseOfferingCommand {
  constructor(
    public readonly courseId: string,
    public readonly academicPeriodId: string
  ) {}
}

export class AddClassSectionCommand {
  constructor(
    public readonly courseOfferingId: string,
    public readonly name: string,
    public readonly capacity: number
  ) {}
}

export class PublishCourseOfferingCommand {
  constructor(public readonly courseOfferingId: string) {}
}

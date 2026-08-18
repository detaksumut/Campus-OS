export class StudyPlanFinalizedEvent {
  constructor(
    public readonly studyPlanId: string,
    public readonly studentId: string,
    public readonly academicPeriodId: string,
    public readonly classSectionIds: string[],
    public readonly occurredOn: Date = new Date()
  ) {}
}

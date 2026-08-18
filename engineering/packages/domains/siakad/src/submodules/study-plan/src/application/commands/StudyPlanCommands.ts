export class DraftStudyPlanCommand {
  constructor(
    public readonly studentId: string,
    public readonly academicPeriodId: string
  ) {}
}

export class AddStudyPlanItemCommand {
  constructor(
    public readonly studyPlanId: string,
    public readonly classSectionId: string,
    public readonly isMandatory: boolean
  ) {}
}

export class FinalizeStudyPlanCommand {
  constructor(public readonly studyPlanId: string) {}
}

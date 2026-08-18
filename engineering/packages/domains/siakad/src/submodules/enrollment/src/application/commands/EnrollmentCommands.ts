export class ConfirmEnrollmentCommand {
  constructor(
    public readonly studentId: string,
    public readonly classSectionId: string,
    public readonly studyPlanId: string
  ) {}
}

export class DropEnrollmentCommand {
  constructor(public readonly enrollmentId: string) {}
}

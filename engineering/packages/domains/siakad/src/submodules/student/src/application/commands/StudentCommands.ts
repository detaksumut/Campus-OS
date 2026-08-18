export class RegisterStudentCommand {
  constructor(
    public readonly nim: string,
    public readonly registrationId: string,
    public readonly memberId: string,
    public readonly studyProgramId: string,
    public readonly enrollmentYear: number
  ) {}
}

export class RequestAcademicLeaveCommand {
  constructor(
    public readonly studentId: string,
    public readonly semesterId: string,
    public readonly reason: string
  ) {}
}

export class GraduateStudentCommand {
  constructor(public readonly studentId: string) {}
}

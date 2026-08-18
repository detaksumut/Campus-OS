export class CreateFacultyCommand {
  constructor(
    public readonly universityId: string,
    public readonly name: string
  ) {}
}

export class CreateDepartmentCommand {
  constructor(
    public readonly universityId: string,
    public readonly facultyId: string,
    public readonly name: string
  ) {}
}

export class CreateStudyProgramCommand {
  constructor(
    public readonly universityId: string,
    public readonly departmentId: string,
    public readonly name: string,
    public readonly level: string,
    public readonly accreditation: string
  ) {}
}

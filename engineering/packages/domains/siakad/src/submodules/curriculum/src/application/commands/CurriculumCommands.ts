export class CreateCourseCommand {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly credits: number,
    public readonly type: string
  ) {}
}

export class DefineCurriculumCommand {
  constructor(
    public readonly studyProgramId: string,
    public readonly name: string,
    public readonly startYear: string
  ) {}
}

export class AddCourseToCurriculumCommand {
  constructor(
    public readonly curriculumId: string,
    public readonly courseId: string,
    public readonly recommendedSemester: number,
    public readonly isMandatory: boolean
  ) {}
}

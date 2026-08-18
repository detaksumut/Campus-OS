export class GetCurriculumQuery {
  constructor(public readonly curriculumId: string) {}
}

export class ListCoursesQuery {
  constructor(public readonly studyProgramId?: string) {}
}

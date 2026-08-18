export class GetUniversityQuery {
  constructor(public readonly universityId: string) {}
}

export class ListFacultiesQuery {
  constructor(public readonly universityId: string) {}
}

export class ListStudyProgramsQuery {
  constructor(public readonly universityId: string) {}
}

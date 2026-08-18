export class GetStudentProfileQuery {
  constructor(public readonly studentId: string) {}
}

export class GetStudentByNimQuery {
  constructor(public readonly nim: string) {}
}

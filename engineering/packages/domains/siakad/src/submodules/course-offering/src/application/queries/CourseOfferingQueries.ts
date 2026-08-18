export class GetCourseOfferingQuery {
  constructor(public readonly courseOfferingId: string) {}
}

export class ListOfferingsByPeriodQuery {
  constructor(public readonly academicPeriodId: string) {}
}

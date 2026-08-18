export class GetAdmissionPeriodQuery {
  constructor(public readonly periodId: string) {}
}

export class ListApplicantsQuery {
  constructor(public readonly periodId: string) {}
}

export class GetApplicantResultQuery {
  constructor(
    public readonly periodId: string,
    public readonly applicantId: string
  ) {}
}

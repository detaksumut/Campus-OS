export class GetApplicationStatusQuery {
  constructor(public readonly applicationId: string) {}
}

export class VerifyCertificateQuery {
  constructor(
    public readonly certificateId: string,
    public readonly hashToVerify: string
  ) {}
}

export class ListCandidateApplicationsQuery {
  constructor(public readonly candidateId: string) {}
}

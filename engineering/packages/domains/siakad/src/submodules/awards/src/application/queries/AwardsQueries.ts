export class GetAwardProgramDetailsQuery {
  constructor(public readonly awardId: string) {}
}

export class ListPendingNominationsQuery {
  constructor(public readonly awardId: string) {}
}

export class GetAwardResultsQuery {
  constructor(public readonly awardId: string) {}
}

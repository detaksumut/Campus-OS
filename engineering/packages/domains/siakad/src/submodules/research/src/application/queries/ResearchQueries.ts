export class GetProjectDetailsQuery {
  constructor(public readonly projectId: string) {}
}

export class ListActiveProjectsQuery {
  constructor(public readonly memberId: string) {}
}

export class ListResearchOutputsQuery {
  constructor(public readonly projectId: string) {}
}

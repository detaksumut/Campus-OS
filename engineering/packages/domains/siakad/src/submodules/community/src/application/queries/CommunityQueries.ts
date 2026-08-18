export class GetCommunityDetailsQuery {
  constructor(public readonly communityId: string) {}
}

export class ListActiveCommunitiesQuery {
  constructor() {}
}

export class GetCommunityDiscussionsQuery {
  constructor(public readonly communityId: string) {}
}

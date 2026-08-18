export class CreateCommunityCommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly type: string,
    public readonly visibility: string,
    public readonly joinPolicy: string,
    public readonly ownerId: string, // Initiator becomes the owner
    public readonly parentCommunityId?: string
  ) {}
}

export class JoinCommunityCommand {
  constructor(
    public readonly communityId: string,
    public readonly memberId: string,
    public readonly requestMessage?: string
  ) {}
}

export class ApproveMembershipCommand {
  constructor(
    public readonly communityId: string,
    public readonly requestId: string,
    public readonly adminId: string // The admin executing the approval
  ) {}
}

export class CreateDiscussionCommand {
  constructor(
    public readonly communityId: string,
    public readonly authorId: string,
    public readonly title: string,
    public readonly content: string,
    public readonly references?: Array<{ referenceId: string; context: string }>
  ) {}
}

export class PublishAnnouncementCommand {
  constructor(
    public readonly communityId: string,
    public readonly authorId: string, // Must have admin/owner role
    public readonly title: string,
    public readonly content: string
  ) {}
}

export class OrganizeCommunityEventCommand {
  constructor(
    public readonly communityId: string,
    public readonly organizerId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly scheduleDate: Date
  ) {}
}

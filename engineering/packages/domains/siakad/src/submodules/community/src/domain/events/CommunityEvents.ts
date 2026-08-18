export class CommunityCreatedEvent {
  constructor(
    public readonly communityId: string,
    public readonly name: string,
    public readonly type: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class MemberJoinedEvent {
  constructor(
    public readonly communityId: string,
    public readonly memberId: string,
    public readonly role: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class DiscussionStartedEvent {
  constructor(
    public readonly communityId: string,
    public readonly discussionId: string,
    public readonly authorId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class CommunityEventOrganizedEvent {
  constructor(
    public readonly communityId: string,
    public readonly eventId: string,
    public readonly organizerId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

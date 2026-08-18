export class MembershipDraftCreatedEvent {
  constructor(
    public readonly memberId: string,
    public readonly identityId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

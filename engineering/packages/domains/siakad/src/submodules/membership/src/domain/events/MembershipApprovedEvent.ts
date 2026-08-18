export class MembershipApprovedEvent {
  constructor(
    public readonly memberId: string,
    public readonly approvedBy: string, // Admin ID
    public readonly occurredOn: Date = new Date()
  ) {}
}

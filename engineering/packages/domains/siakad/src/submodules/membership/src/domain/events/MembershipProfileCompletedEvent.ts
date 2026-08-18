export class MembershipProfileCompletedEvent {
  constructor(
    public readonly memberId: string,
    public readonly academicLevel: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

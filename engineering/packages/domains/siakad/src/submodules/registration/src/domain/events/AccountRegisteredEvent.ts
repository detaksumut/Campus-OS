export class AccountRegisteredEvent {
  constructor(
    public readonly accountId: string,
    public readonly identityId: string,
    public readonly email: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

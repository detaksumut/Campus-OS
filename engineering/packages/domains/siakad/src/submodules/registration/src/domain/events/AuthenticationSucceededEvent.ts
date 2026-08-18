export class AuthenticationSucceededEvent {
  constructor(
    public readonly accountId: string,
    public readonly ipAddress: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

export class IdentityVerifiedEvent {
  constructor(
    public readonly identityId: string,
    public readonly verificationMethod: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

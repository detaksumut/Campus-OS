export class DigitalCardIssuedEvent {
  constructor(
    public readonly memberId: string,
    public readonly cardId: string,
    public readonly version: number,
    public readonly occurredOn: Date = new Date()
  ) {}
}

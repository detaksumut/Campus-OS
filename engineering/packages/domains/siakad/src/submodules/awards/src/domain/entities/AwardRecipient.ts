import { AwardId } from '../value-objects/AwardsValueObjects';

export class AwardRecipient {
  constructor(
    private readonly awardId: AwardId,
    private readonly memberId: string, // Links to Membership
    private readonly conferralDate: Date
  ) {}

  get award(): AwardId { return this.awardId; }
  get recipientId(): string { return this.memberId; }
  get dateConferred(): Date { return this.conferralDate; }
}

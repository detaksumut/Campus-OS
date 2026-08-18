import { CardId } from '../value-objects/MembershipValueObjects';
import { CardStatus } from '../types/MembershipEnums';

export class DigitalMemberCard {
  constructor(
    private readonly cardId: CardId,
    private verificationToken: string,
    private version: number,
    private status: CardStatus,
    private readonly issueDate: Date,
    private expirationDate: Date
  ) {}

  get id(): CardId { return this.cardId; }
  get token(): string { return this.verificationToken; }
  get currentVersion(): number { return this.version; }
  get currentStatus(): CardStatus { return this.status; }
  
  revoke(): void {
    if (this.status === CardStatus.REVOKED) {
      throw new Error('Card is already revoked.');
    }
    this.status = CardStatus.REVOKED;
  }

  reissue(newToken: string, newExpiration: Date): void {
    if (this.status === CardStatus.REVOKED) {
      throw new Error('Cannot reissue a revoked card.');
    }
    this.verificationToken = newToken;
    this.expirationDate = newExpiration;
    this.version += 1;
    this.status = CardStatus.REISSUED;
  }
}

import { MemberId } from '../value-objects/MembershipValueObjects';
import { MembershipStatus } from '../types/MembershipEnums';
import { MembershipProfile } from './MembershipProfile';
import { DigitalMemberCard } from './DigitalMemberCard';

export class Member {
  private profile?: MembershipProfile;
  private digitalCard?: DigitalMemberCard;

  constructor(
    private readonly memberId: MemberId,
    private readonly identityId: string, // Links back to Registration Identity
    private status: MembershipStatus = MembershipStatus.PENDING
  ) {}

  get id(): MemberId { return this.memberId; }
  get linkedIdentityId(): string { return this.identityId; }
  get currentStatus(): MembershipStatus { return this.status; }
  get currentProfile(): MembershipProfile | undefined { return this.profile; }
  get currentCard(): DigitalMemberCard | undefined { return this.digitalCard; }

  completeProfile(profile: MembershipProfile): void {
    if (this.status !== MembershipStatus.PENDING) {
      throw new Error('Profile can only be completed when PENDING.');
    }
    this.profile = profile;
  }

  approve(): void {
    if (!this.profile) {
      throw new Error('Cannot approve membership without a completed profile.');
    }
    this.status = MembershipStatus.ACTIVE;
  }

  issueDigitalCard(card: DigitalMemberCard): void {
    if (this.status !== MembershipStatus.ACTIVE) {
      throw new Error('Cannot issue digital card to a non-active member.');
    }
    this.digitalCard = card;
  }

  suspend(): void {
    this.status = MembershipStatus.SUSPENDED;
    if (this.digitalCard) {
      this.digitalCard.revoke();
    }
  }
}

import { ApproveMembershipCommand } from '../commands/ApproveMembershipCommand';
import { IMembershipRepository } from '../ports/IMembershipRepository';
import { IEventPublisher } from '../ports/IEventPublisher';
import { DigitalCardVerificationPolicy } from '../../domain/services/DigitalCardVerificationPolicy';
import { MemberId, CardId } from '../../domain/value-objects/MembershipValueObjects';
import { DigitalMemberCard } from '../../domain/entities/DigitalMemberCard';
import { CardStatus } from '../../domain/types/MembershipEnums';
import { MembershipApprovedEvent } from '../../domain/events/MembershipApprovedEvent';
import { DigitalCardIssuedEvent } from '../../domain/events/DigitalCardIssuedEvent';

/**
 * @deprecated
 * Use IdentityRuntime from @campus-os/identity instead.
 * This legacy use case now acts as a Compatibility Adapter.
 */
export class ApproveMembershipUseCase {
  constructor(
    private readonly repository: IMembershipRepository,
    private readonly eventPublisher: IEventPublisher,
    private readonly digitalCardPolicy: DigitalCardVerificationPolicy
  ) {}

  async execute(command: ApproveMembershipCommand): Promise<void> {
    const memberId = new MemberId(command.memberId);
    const member = await this.repository.findMemberById(memberId);
    
    if (!member) {
      throw new Error(`Member not found: ${command.memberId}`);
    }

    // 1. Approve Membership (Domain Rules enforced internally)
    member.approve();

    // 2. Generate Digital Card
    const cardIdStr = `CARD-${Date.now()}`;
    const token = await this.digitalCardPolicy.generateVerificationToken(cardIdStr, member.id.getValue());
    
    const card = new DigitalMemberCard(
      new CardId(cardIdStr),
      token,
      1,
      CardStatus.ACTIVE,
      new Date(),
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year expiration
    );

    member.issueDigitalCard(card);

    // 3. Persist
    await this.repository.saveMember(member);

    // 4. Publish Events
    await this.eventPublisher.publish(
      new MembershipApprovedEvent(member.id.getValue(), command.approvedByAdminId)
    );
    await this.eventPublisher.publish(
      new DigitalCardIssuedEvent(member.id.getValue(), card.id.getValue(), card.currentVersion)
    );
  }
}

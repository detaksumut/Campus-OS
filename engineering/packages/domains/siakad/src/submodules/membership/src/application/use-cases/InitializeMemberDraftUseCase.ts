import { InitializeMemberDraftCommand } from '../commands/InitializeMemberDraftCommand';
import { IMembershipRepository } from '../ports/IMembershipRepository';
import { IEventPublisher } from '../ports/IEventPublisher';
import { Member } from '../../domain/entities/Member';
import { MemberId } from '../../domain/value-objects/MembershipValueObjects';
import { MembershipStatus } from '../../domain/types/MembershipEnums';
import { MembershipDraftCreatedEvent } from '../../domain/events/MembershipDraftCreatedEvent';

/**
 * @deprecated
 * Use IdentityRuntime from @campus-os/identity instead.
 * This legacy use case now acts as a Compatibility Adapter.
 */
export class InitializeMemberDraftUseCase {
  constructor(
    private readonly repository: IMembershipRepository,
    private readonly eventPublisher: IEventPublisher
  ) {}

  async execute(command: InitializeMemberDraftCommand): Promise<void> {
    // 1. Check if member already exists for this identity
    const existing = await this.repository.findMemberByIdentityId(command.identityId);
    if (existing) {
      // Idempotent: If it exists, do nothing or throw depending on policy.
      return;
    }

    // 2. Create new Member aggregate with PENDING status
    const newMemberId = new MemberId(`MEM-${Date.now()}`);
    const member = new Member(newMemberId, command.identityId, MembershipStatus.PENDING);

    // 3. Persist
    await this.repository.saveMember(member);

    // 4. Publish Event
    await this.eventPublisher.publish(
      new MembershipDraftCreatedEvent(member.id.getValue(), command.identityId)
    );
  }
}

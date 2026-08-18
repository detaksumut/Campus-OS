import { CompleteMembershipProfileCommand } from '../commands/CompleteMembershipProfileCommand';
import { IMembershipRepository } from '../ports/IMembershipRepository';
import { IEventPublisher } from '../ports/IEventPublisher';
import { MemberId } from '../../domain/value-objects/MembershipValueObjects';
import { MembershipProfile } from '../../domain/entities/MembershipProfile';
import { AcademicLevel } from '../../domain/types/MembershipEnums';
import { MembershipProfileCompletedEvent } from '../../domain/events/MembershipProfileCompletedEvent';

/**
 * @deprecated
 * Use IdentityRuntime from @campus-os/identity instead.
 * This legacy use case now acts as a Compatibility Adapter.
 */
export class CompleteMembershipProfileUseCase {
  constructor(
    private readonly repository: IMembershipRepository,
    private readonly eventPublisher: IEventPublisher
  ) {}

  async execute(command: CompleteMembershipProfileCommand): Promise<void> {
    const memberId = new MemberId(command.memberId);
    const member = await this.repository.findMemberById(memberId);
    
    if (!member) {
      throw new Error(`Member not found: ${command.memberId}`);
    }

    // 1. Construct Profile
    const profile = new MembershipProfile(
      command.academicLevel as AcademicLevel,
      command.affiliation,
      command.department,
      command.enrollmentYear
    );

    // 2. Delegate to Domain
    member.completeProfile(profile);

    // 3. Persist
    await this.repository.saveMember(member);

    // 4. Publish Event
    await this.eventPublisher.publish(
      new MembershipProfileCompletedEvent(
        member.id.getValue(),
        profile.level
      )
    );
  }
}

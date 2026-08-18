import { JoinCommunityCommand } from '../commands/CommunityCommands';
import { ICommunityRepository } from '../ports/ICommunityRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { ICommunityEventPublisher } from '../ports/ICommunityEventPublisher';
import { CommunityId, RequestId } from '../../domain/value-objects/CommunityValueObjects';
import { CommunityMember } from '../../domain/entities/CommunityMember';
import { MembershipRequest } from '../../domain/entities/MembershipRequest';
import { CommunityRole, RequestStatus } from '../../domain/types/CommunityEnums';
import { CommunityGovernancePolicy } from '../../domain/services/CommunityPolicies';
import { MemberJoinedEvent } from '../../domain/events/CommunityEvents';

export class JoinCommunityUseCase {
  constructor(
    private readonly repository: ICommunityRepository,
    private readonly membershipValidation: IMembershipValidationService,
    private readonly eventPublisher: ICommunityEventPublisher
  ) {}

  async execute(command: JoinCommunityCommand): Promise<void> {
    const isMemberValid = await this.membershipValidation.isMemberValid(command.memberId);
    if (!isMemberValid) throw new Error('Member is not a valid recognized identity.');

    const community = await this.repository.findCommunityById(new CommunityId(command.communityId));
    if (!community) throw new Error('Community not found.');

    const alreadyMember = community.allMembers.some(m => m.id === command.memberId);
    if (alreadyMember) throw new Error('User is already a member.');

    if (CommunityGovernancePolicy.canJoinDirectly(community)) {
      community.addMember(new CommunityMember(command.memberId, CommunityRole.MEMBER));
      await this.repository.saveCommunity(community);
      
      await this.eventPublisher.publish(
        new MemberJoinedEvent(community.id.getValue(), command.memberId, CommunityRole.MEMBER)
      );
    } else {
      const request = new MembershipRequest(
        new RequestId(`REQ-${Date.now()}`),
        command.memberId,
        command.requestMessage || '',
        RequestStatus.PENDING
      );
      community.submitRequest(request);
      await this.repository.saveCommunity(community);
    }
  }
}

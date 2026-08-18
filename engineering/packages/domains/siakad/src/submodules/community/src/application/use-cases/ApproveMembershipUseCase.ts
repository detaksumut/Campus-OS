import { ApproveMembershipCommand } from '../commands/CommunityCommands';
import { ICommunityRepository } from '../ports/ICommunityRepository';
import { ICommunityEventPublisher } from '../ports/ICommunityEventPublisher';
import { CommunityId } from '../../domain/value-objects/CommunityValueObjects';
import { CommunityMember } from '../../domain/entities/CommunityMember';
import { MembershipRequest } from '../../domain/entities/MembershipRequest';
import { CommunityRole, RequestStatus } from '../../domain/types/CommunityEnums';
import { CommunityGovernancePolicy } from '../../domain/services/CommunityPolicies';
import { MemberJoinedEvent } from '../../domain/events/CommunityEvents';

export class ApproveMembershipUseCase {
  constructor(
    private readonly repository: ICommunityRepository,
    private readonly eventPublisher: ICommunityEventPublisher
  ) {}

  async execute(command: ApproveMembershipCommand): Promise<void> {
    const community = await this.repository.findCommunityById(new CommunityId(command.communityId));
    if (!community) throw new Error('Community not found.');

    if (!CommunityGovernancePolicy.hasAdminRights(community, command.adminId)) {
      throw new Error('Only admins or owners can approve membership requests.');
    }

    const idx = community.allRequests.findIndex(r => r.id.getValue() === command.requestId);
    if (idx === -1) throw new Error('Request not found.');

    const request = community.allRequests[idx];
    if (request.currentStatus !== RequestStatus.PENDING) throw new Error('Request is not pending.');

    // Update request status (Requires recreating object since it's an entity, normally we might have a method on Aggregate to handle this)
    community.allRequests[idx] = new MembershipRequest(
      request.id, request.member, request.currentMessage, RequestStatus.APPROVED, request.dateRequested
    );

    community.addMember(new CommunityMember(request.member, CommunityRole.MEMBER));

    await this.repository.saveCommunity(community);

    await this.eventPublisher.publish(
      new MemberJoinedEvent(community.id.getValue(), request.member, CommunityRole.MEMBER)
    );
  }
}

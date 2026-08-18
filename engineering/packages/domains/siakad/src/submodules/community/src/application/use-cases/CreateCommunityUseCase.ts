import { CreateCommunityCommand } from '../commands/CommunityCommands';
import { ICommunityRepository } from '../ports/ICommunityRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { ICommunityEventPublisher } from '../ports/ICommunityEventPublisher';
import { Community } from '../../domain/entities/Community';
import { CommunityMember } from '../../domain/entities/CommunityMember';
import { CommunityId } from '../../domain/value-objects/CommunityValueObjects';
import { CommunityType, CommunityVisibility, JoinPolicy, CommunityRole, CommunityStatus } from '../../domain/types/CommunityEnums';
import { CommunityCreatedEvent } from '../../domain/events/CommunityEvents';

export class CreateCommunityUseCase {
  constructor(
    private readonly repository: ICommunityRepository,
    private readonly membershipValidation: IMembershipValidationService,
    private readonly eventPublisher: ICommunityEventPublisher
  ) {}

  async execute(command: CreateCommunityCommand): Promise<void> {
    const isOwnerValid = await this.membershipValidation.isMemberValid(command.ownerId);
    if (!isOwnerValid) throw new Error('Initiator is not a valid member.');

    const communityId = new CommunityId(`COM-${Date.now()}`);
    let parentId: CommunityId | undefined;
    
    if (command.parentCommunityId) {
      parentId = new CommunityId(command.parentCommunityId);
      const parent = await this.repository.findCommunityById(parentId);
      if (!parent) throw new Error('Parent community not found.');
    }

    const community = new Community(
      communityId,
      command.name,
      command.description,
      command.type as CommunityType,
      command.visibility as CommunityVisibility,
      command.joinPolicy as JoinPolicy,
      CommunityStatus.ACTIVE,
      parentId
    );

    // The creator automatically becomes the OWNER
    community.addMember(new CommunityMember(command.ownerId, CommunityRole.OWNER));

    await this.repository.saveCommunity(community);

    await this.eventPublisher.publish(
      new CommunityCreatedEvent(communityId.getValue(), community.currentName, community.currentType)
    );
  }
}

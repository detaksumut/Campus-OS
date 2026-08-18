import { CreateDiscussionCommand } from '../commands/CommunityCommands';
import { ICommunityRepository } from '../ports/ICommunityRepository';
import { ICommunityEventPublisher } from '../ports/ICommunityEventPublisher';
import { CommunityId, DiscussionId, ArtifactReference } from '../../domain/value-objects/CommunityValueObjects';
import { Discussion } from '../../domain/entities/Discussion';
import { CommunityModerationPolicy } from '../../domain/services/CommunityPolicies';
import { ArtifactContext } from '../../domain/types/CommunityEnums';
import { DiscussionStartedEvent } from '../../domain/events/CommunityEvents';

export class CreateDiscussionUseCase {
  constructor(
    private readonly repository: ICommunityRepository,
    private readonly eventPublisher: ICommunityEventPublisher
  ) {}

  async execute(command: CreateDiscussionCommand): Promise<void> {
    const community = await this.repository.findCommunityById(new CommunityId(command.communityId));
    if (!community) throw new Error('Community not found.');

    const isMember = community.allMembers.some(m => m.id === command.authorId);
    if (!isMember) throw new Error('Author is not a member of this community.');

    if (CommunityModerationPolicy.isSuspended(community, command.authorId)) {
      throw new Error('Suspended members cannot start discussions.');
    }

    const discussionId = new DiscussionId(`DISC-${Date.now()}`);
    const refs = command.references?.map(r => new ArtifactReference(r.referenceId, r.context as ArtifactContext)) || [];

    const discussion = new Discussion(
      discussionId,
      command.authorId,
      command.title,
      command.content,
      refs
    );

    community.addDiscussion(discussion);

    await this.repository.saveCommunity(community);

    await this.eventPublisher.publish(
      new DiscussionStartedEvent(community.id.getValue(), discussionId.getValue(), command.authorId)
    );
  }
}

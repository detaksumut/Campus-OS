import { OrganizeCommunityEventCommand } from '../commands/CommunityCommands';
import { ICommunityRepository } from '../ports/ICommunityRepository';
import { ICommunityEventPublisher } from '../ports/ICommunityEventPublisher';
import { CommunityId, EventId } from '../../domain/value-objects/CommunityValueObjects';
import { CommunityEvent } from '../../domain/entities/CommunityEvent';
import { CommunityModerationPolicy } from '../../domain/services/CommunityPolicies';
import { CommunityEventOrganizedEvent } from '../../domain/events/CommunityEvents';

export class OrganizeCommunityEventUseCase {
  constructor(
    private readonly repository: ICommunityRepository,
    private readonly eventPublisher: ICommunityEventPublisher
  ) {}

  async execute(command: OrganizeCommunityEventCommand): Promise<void> {
    const community = await this.repository.findCommunityById(new CommunityId(command.communityId));
    if (!community) throw new Error('Community not found.');

    const isMember = community.allMembers.some(m => m.id === command.organizerId);
    if (!isMember) throw new Error('Organizer is not a member of this community.');

    if (CommunityModerationPolicy.isSuspended(community, command.organizerId)) {
      throw new Error('Suspended members cannot organize events.');
    }

    const eventId = new EventId(`EVT-${Date.now()}`);
    const cEvent = new CommunityEvent(
      eventId,
      command.organizerId,
      command.title,
      command.description,
      command.scheduleDate
    );

    community.addEvent(cEvent);

    await this.repository.saveCommunity(community);

    await this.eventPublisher.publish(
      new CommunityEventOrganizedEvent(community.id.getValue(), eventId.getValue(), command.organizerId)
    );
  }
}

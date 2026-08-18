import { PublishAnnouncementCommand } from '../commands/CommunityCommands';
import { ICommunityRepository } from '../ports/ICommunityRepository';
import { CommunityId, AnnouncementId } from '../../domain/value-objects/CommunityValueObjects';
import { Announcement } from '../../domain/entities/Announcement';
import { CommunityGovernancePolicy } from '../../domain/services/CommunityPolicies';

export class PublishAnnouncementUseCase {
  constructor(
    private readonly repository: ICommunityRepository
  ) {}

  async execute(command: PublishAnnouncementCommand): Promise<void> {
    const community = await this.repository.findCommunityById(new CommunityId(command.communityId));
    if (!community) throw new Error('Community not found.');

    if (!CommunityGovernancePolicy.hasAdminRights(community, command.authorId)) {
      throw new Error('Only admins or owners can publish announcements.');
    }

    const announcementId = new AnnouncementId(`ANN-${Date.now()}`);
    const announcement = new Announcement(
      announcementId,
      command.authorId,
      command.title,
      command.content
    );

    community.addAnnouncement(announcement);

    await this.repository.saveCommunity(community);
  }
}

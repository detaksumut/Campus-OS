import { GetMemberProfileQuery, MemberProfileDto } from '../queries/GetMemberProfileQuery';
import { IMembershipRepository } from '../ports/IMembershipRepository';

/**
 * @deprecated
 * Use IdentityRuntime from @campus-os/identity instead.
 * This legacy use case now acts as a Compatibility Adapter.
 */
export class GetMemberProfileUseCase {
  constructor(
    private readonly repository: IMembershipRepository
  ) {}

  async execute(query: GetMemberProfileQuery): Promise<MemberProfileDto> {
    const member = await this.repository.findMemberByIdentityId(query.identityId);
    if (!member) {
      throw new Error(`No membership profile found for identity: ${query.identityId}`);
    }

    const profile = member.currentProfile;
    const card = member.currentCard;

    return {
      memberId: member.id.getValue(),
      identityId: member.linkedIdentityId,
      status: member.currentStatus,
      academicLevel: profile?.level,
      affiliation: profile?.['affiliation'],
      department: profile?.['department'],
      enrollmentYear: profile?.['enrollmentYear'],
      digitalCard: card ? {
        cardId: card.id.getValue(),
        status: card.currentStatus,
        version: card.currentVersion,
        issueDate: card['issueDate'].toISOString(),
        expirationDate: card['expirationDate'].toISOString()
      } : undefined
    };
  }
}

import { IProfileRuntime, IVerificationRuntime, ITierRuntime } from '../contracts';

export interface PublicDirectoryEntryDto {
  membershipId: string;
  displayName: string;
  avatarUrl?: string;
  institution: string;
  tier: string;
  isVerified: boolean;
}

export class PublicDirectoryProjection {
  constructor(
    private profile: IProfileRuntime,
    private verification: IVerificationRuntime,
    private tier: ITierRuntime
  ) {}

  async getDirectoryEntry(membershipId: string): Promise<PublicDirectoryEntryDto | null> {
    const pub = await this.profile.getPublicProfile(membershipId);
    if (!pub) return null;

    const acad = await this.profile.getAcademicProfile(membershipId);
    const vState = await this.verification.isVerified(membershipId);
    const t = await this.tier.getTier(membershipId);

    return {
      membershipId,
      displayName: pub.displayName,
      avatarUrl: pub.avatarUrl,
      institution: acad?.institution || 'Unknown',
      tier: t?.name || 'Base',
      isVerified: vState
    };
  }
}

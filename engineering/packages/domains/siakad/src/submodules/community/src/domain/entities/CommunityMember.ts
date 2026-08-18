import { CommunityRole } from '../types/CommunityEnums';

export class CommunityMember {
  constructor(
    private readonly memberId: string,
    private readonly role: CommunityRole,
    private readonly joinedAt: Date = new Date(),
    private readonly suspended: boolean = false
  ) {}

  get id(): string { return this.memberId; }
  get currentRole(): CommunityRole { return this.role; }
  get joinDate(): Date { return this.joinedAt; }
  get isSuspended(): boolean { return this.suspended; }
}

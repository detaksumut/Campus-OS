import { MemberId } from '../value-objects/ResearchValueObjects';
import { MemberRole } from '../types/ResearchEnums';

export class ResearchMember {
  constructor(
    private readonly memberId: MemberId,
    private readonly role: MemberRole,
    private readonly assignedAt: Date = new Date()
  ) {}

  get member(): MemberId { return this.memberId; }
  get currentRole(): MemberRole { return this.role; }
}

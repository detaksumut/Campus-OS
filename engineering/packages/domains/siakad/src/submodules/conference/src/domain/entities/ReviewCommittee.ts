import { CommitteeId } from '../value-objects/ConferenceValueObjects';
import { CommitteeRole } from '../types/ConferenceEnums';

export class ReviewCommittee {
  constructor(
    private readonly committeeId: CommitteeId,
    private readonly memberId: string, // Links to Membership
    private readonly role: CommitteeRole
  ) {}

  get id(): CommitteeId { return this.committeeId; }
  get member(): string { return this.memberId; }
  get currentRole(): CommitteeRole { return this.role; }
}

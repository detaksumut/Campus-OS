import { CommitteeId } from '../value-objects/AwardsValueObjects';

export class AwardCommittee {
  constructor(
    private readonly committeeId: CommitteeId,
    private readonly evaluatorId: string, // Links to Membership
    private readonly role: string
  ) {}

  get id(): CommitteeId { return this.committeeId; }
  get evaluator(): string { return this.evaluatorId; }
  get currentRole(): string { return this.role; }
}

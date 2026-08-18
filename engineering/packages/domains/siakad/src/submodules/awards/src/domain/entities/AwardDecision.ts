import { NominationId } from '../value-objects/AwardsValueObjects';
import { AwardDecisionType } from '../types/AwardsEnums';

export class AwardDecision {
  constructor(
    private readonly nominationId: NominationId,
    private readonly decision: AwardDecisionType,
    private readonly summaryRemarks: string
  ) {}

  get nomination(): NominationId { return this.nominationId; }
  get currentDecision(): AwardDecisionType { return this.decision; }
  get currentRemarks(): string { return this.summaryRemarks; }
}

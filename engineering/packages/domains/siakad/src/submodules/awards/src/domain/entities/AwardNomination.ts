import { NominationId, EvidenceReference } from '../value-objects/AwardsValueObjects';

export class AwardNomination {
  constructor(
    private readonly nominationId: NominationId,
    private readonly nomineeId: string,
    private readonly nominatorId: string,
    private readonly evidence: EvidenceReference[] = []
  ) {}

  get id(): NominationId { return this.nominationId; }
  get nominee(): string { return this.nomineeId; }
  get nominator(): string { return this.nominatorId; }
  get allEvidence(): EvidenceReference[] { return this.evidence; }

  addEvidence(evidence: EvidenceReference): void {
    this.evidence.push(evidence);
  }
}

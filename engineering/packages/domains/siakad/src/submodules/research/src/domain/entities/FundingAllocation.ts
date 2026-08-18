import { FundingType } from '../types/ResearchEnums';

export class FundingAllocation {
  constructor(
    private readonly fundingType: FundingType,
    private readonly amount: number,
    private readonly sourceName: string,
    private isDisbursed: boolean = false
  ) {}

  get type(): FundingType { return this.fundingType; }
  get allocatedAmount(): number { return this.amount; }
  get source(): string { return this.sourceName; }
  get disbursed(): boolean { return this.isDisbursed; }

  disburse(): void {
    if (this.isDisbursed) throw new Error('Funding is already disbursed.');
    this.isDisbursed = true;
  }
}

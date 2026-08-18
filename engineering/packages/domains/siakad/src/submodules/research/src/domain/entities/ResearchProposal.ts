import { ProposalId } from '../value-objects/ResearchValueObjects';
import { ProposalStatus } from '../types/ResearchEnums';

export class ResearchProposal {
  constructor(
    private readonly proposalId: ProposalId,
    private title: string,
    private abstractText: string,
    private methodology: string,
    private status: ProposalStatus = ProposalStatus.DRAFT
  ) {}

  get id(): ProposalId { return this.proposalId; }
  get currentTitle(): string { return this.title; }
  get currentAbstract(): string { return this.abstractText; }
  get currentMethodology(): string { return this.methodology; }
  get currentStatus(): ProposalStatus { return this.status; }

  submit(): void {
    if (this.status !== ProposalStatus.DRAFT && this.status !== ProposalStatus.REVISION_REQUIRED) {
      throw new Error('Can only submit from DRAFT or REVISION_REQUIRED status.');
    }
    this.status = ProposalStatus.SUBMITTED;
  }

  approve(): void {
    if (this.status !== ProposalStatus.SUBMITTED) throw new Error('Proposal must be submitted before approval.');
    this.status = ProposalStatus.APPROVED;
  }

  reject(): void {
    if (this.status !== ProposalStatus.SUBMITTED) throw new Error('Proposal must be submitted before rejection.');
    this.status = ProposalStatus.REJECTED;
  }

  requireRevision(): void {
    if (this.status !== ProposalStatus.SUBMITTED) throw new Error('Proposal must be submitted before requiring revision.');
    this.status = ProposalStatus.REVISION_REQUIRED;
  }
}

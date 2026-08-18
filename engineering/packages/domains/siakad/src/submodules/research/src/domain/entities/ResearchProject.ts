import { ProjectId, ProposalId, MilestoneId, OutputId, MemberId } from '../value-objects/ResearchValueObjects';
import { ProjectStatus, ProposalStatus } from '../types/ResearchEnums';
import { ResearchProposal } from './ResearchProposal';
import { ResearchMember } from './ResearchMember';
import { ResearchMilestone } from './ResearchMilestone';
import { FundingAllocation } from './FundingAllocation';
import { ResearchOutput } from './ResearchOutput';

export class ResearchProject {
  private proposal?: ResearchProposal;
  private members: ResearchMember[] = [];
  private milestones: ResearchMilestone[] = [];
  private funding?: FundingAllocation;
  private outputs: ResearchOutput[] = [];

  constructor(
    private readonly projectId: ProjectId,
    private status: ProjectStatus = ProjectStatus.DRAFT
  ) {}

  get id(): ProjectId { return this.projectId; }
  get currentStatus(): ProjectStatus { return this.status; }
  get currentProposal(): ResearchProposal | undefined { return this.proposal; }
  get currentMembers(): ResearchMember[] { return this.members; }
  get allMilestones(): ResearchMilestone[] { return this.milestones; }
  get currentFunding(): FundingAllocation | undefined { return this.funding; }
  get allOutputs(): ResearchOutput[] { return this.outputs; }

  attachProposal(proposal: ResearchProposal): void {
    if (this.status !== ProjectStatus.DRAFT) throw new Error('Can only attach proposal when project is in DRAFT.');
    this.proposal = proposal;
    this.status = ProjectStatus.PROPOSED;
  }

  addMember(member: ResearchMember): void {
    if (this.members.some(m => m.member.getValue() === member.member.getValue())) {
      throw new Error('Member already added to this project.');
    }
    this.members.push(member);
  }

  allocateFunding(funding: FundingAllocation): void {
    this.funding = funding;
  }

  addMilestone(milestone: ResearchMilestone): void {
    this.milestones.push(milestone);
  }

  registerOutput(output: ResearchOutput): void {
    this.outputs.push(output);
  }

  approveProject(): void {
    if (!this.proposal || this.proposal.currentStatus !== ProposalStatus.APPROVED) {
      throw new Error('Project cannot be approved without an approved proposal.');
    }
    this.status = ProjectStatus.APPROVED;
  }

  startProject(): void {
    if (this.status !== ProjectStatus.APPROVED) throw new Error('Project must be approved before starting.');
    this.status = ProjectStatus.IN_PROGRESS;
  }

  completeProject(): void {
    if (this.status !== ProjectStatus.IN_PROGRESS) throw new Error('Project is not in progress.');
    this.status = ProjectStatus.COMPLETED;
  }
}

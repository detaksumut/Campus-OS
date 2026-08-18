import { CreateResearchProjectCommand } from '../commands/ResearchCommands';
import { IResearchRepository } from '../ports/IResearchRepository';
import { IMembershipValidationService } from '../ports/IMembershipValidationService';
import { IResearchEventPublisher } from '../ports/IResearchEventPublisher';
import { ResearchProject } from '../../domain/entities/ResearchProject';
import { ResearchProposal } from '../../domain/entities/ResearchProposal';
import { ResearchMember } from '../../domain/entities/ResearchMember';
import { ProjectId, ProposalId, MemberId } from '../../domain/value-objects/ResearchValueObjects';
import { MemberRole } from '../../domain/types/ResearchEnums';
import { ProjectProposedEvent } from '../../domain/events/ResearchEvents';

export class CreateResearchProjectUseCase {
  constructor(
    private readonly repository: IResearchRepository,
    private readonly membershipValidation: IMembershipValidationService,
    private readonly eventPublisher: IResearchEventPublisher
  ) {}

  async execute(command: CreateResearchProjectCommand): Promise<void> {
    const isEligible = await this.membershipValidation.canLeadResearch(command.principalInvestigatorId);
    if (!isEligible) {
      throw new Error(`Member ${command.principalInvestigatorId} is not eligible to be a Principal Investigator.`);
    }

    const projectId = new ProjectId(`PRJ-${Date.now()}`);
    const proposalId = new ProposalId(`PROP-${Date.now()}`);
    
    const project = new ResearchProject(projectId);
    
    const proposal = new ResearchProposal(
      proposalId,
      command.proposalTitle,
      command.proposalAbstract,
      command.proposalMethodology
    );

    project.attachProposal(proposal);

    const pi = new ResearchMember(new MemberId(command.principalInvestigatorId), MemberRole.PRINCIPAL_INVESTIGATOR);
    project.addMember(pi);

    await this.repository.saveProject(project);

    await this.eventPublisher.publish(
      new ProjectProposedEvent(project.id.getValue(), proposal.id.getValue())
    );
  }
}
